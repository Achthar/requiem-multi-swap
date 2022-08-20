// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolPair/IWeightedPairFactory.sol";
import "../interfaces/poolPair/IWeightedPairCreator.sol";
import "../interfaces/poolPair/IWeightedPair.sol";
import "../interfaces/poolPair/IWeightedPairAdmin.sol";
import "../interfaces/governance/IVotesRegister.sol";
import "../libraries/EnumerableSetLite.sol";

// solhint-disable no-inline-assembly

contract RequiemPairFactory is IWeightedPairFactory {
    using EnumerableSetLite for EnumerableSetLite.AddressSet;

    // admin that can set the default protocol fee and default governance
    // the admin is a contract that assigns governance contracts to pairs
    // these governance contracts then can make crucial changes to the pair
    // e.g. change the formula, amplification and swap fee
    address public pairAdmin;
    address public votingRegister;
    IWeightedPairCreator public pairCreator;

    // default formula for swap calculation
    address public formula;
    uint256 private _pairCount;

    // check whether pair was created by this contract
    mapping(address => bool) public isPair;

    // mapping that tracks existing pair configs for a token pair
    mapping(address => mapping(address => EnumerableSetLite.AddressSet)) private tokenPairs;
    mapping(bytes32 => address) private _pairSalts;

    constructor(
        IWeightedPairCreator _creator,
        address _register,
        address _admin,
        address _formula
    ) {
        pairAdmin = _admin;
        formula = _formula;
        pairCreator = _creator;
        votingRegister = _register;
    }

    // ===== views =====

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA
    ) external view returns (address pair) {
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        pair = _pairSalts[keccak256(abi.encodePacked(token0, token1, tokenWeight0))];
    }

    /**
     * @notice Function to get all deployed configs for a token pair
     * @param token0 first token
     * @param token1 second token
     * @return _tokenPairs array of deployed pairs
     */
    function getPairs(address token0, address token1) external view returns (address[] memory _tokenPairs) {
        uint256 length = tokenPairs[token0][token1].length();
        _tokenPairs = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _tokenPairs[i] = tokenPairs[token0][token1].at(i);
        }
    }

    function allPairsLength() external view returns (uint256) {
        return _pairCount;
    }

    /**
     * @notice Creates a new pair with specified parameters - only one pair for a fixed set of weights cabn exist
     * @param tokenA first token
     * @param tokenB second token
     * @param tokenWeightA first token weight
     * @param initialFee initial swapFee
     * @param initialAmp initial amplification parameter
     */
    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair) {
        require(tokenA != tokenB, "RLP: IA");
        require(tokenWeightA >= 2 && tokenWeightA <= 98 && (tokenWeightA % 2) == 0, "RLP: IW");

        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        require(token0 != address(0) && token1 != address(0), "RLP: ZA");
        pair = pairCreator.createPair();

        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        require(!isPair[pair], "RLP: PE");
        // initialize pair configuration
        IWeightedPair(pair).initialize(votingRegister, token0, token1, tokenWeight0);
        IWeightedPair(pair).switchAdmin(pairAdmin);

        // handle administrative initiallization
        IWeightedPairAdmin(pairAdmin).inititalizePairAdministration(pair, formula, initialFee, initialAmp);
        tokenPairs[token0][token1].add(pair);
        tokenPairs[token1][token0].add(pair);
        _pairSalts[salt] = pair;
        _pairCount += 1;
        isPair[pair] = true;
        IVotesRegister(votingRegister).registerToken(pair);
        emit PairCreated(token0, token1, pair, tokenWeight0);
    }

    function changeCreator(IWeightedPairCreator _newCreator) external {
        require(msg.sender == pairAdmin, "caller has to be the admin");
        pairCreator = _newCreator;
    }
}
