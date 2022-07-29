// SPDX-License-Identifier: MIT
pragma solidity >=0.8.12;


interface IWeightedPoolFactory {
    event SwapCreated(address[] pooledTokens, address indexed swap, uint256 length);
    event SetFeeTo(address indexed feeTo);
    event SetFeeToken(address indexed token);
    event SetFeeAmount(uint256 indexed amount);

    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function allPools(uint256) external view returns (address pool);

    function isPool(address) external view returns (bool);

    function allPoolsLength() external view returns (uint256);

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory name,
        string memory symbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external returns (address pool);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;
    
    function setFeeAmount(uint256 _token) external;
}
