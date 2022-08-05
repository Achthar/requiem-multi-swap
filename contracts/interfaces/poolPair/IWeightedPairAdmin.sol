// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

interface IWeightedPairAdmin {
    function feeTo() external view returns (address);

    function protocolFee(address _pair) external view returns (uint256);

    function pushGovernance(address _governance, address _pair) external;

    function inititalizePairAdministration(
        address _pair,
        address _formula,
        address _governance,
        uint256 _protocolFee,
        uint32 _swapFee,
        uint32 _amp
    ) external;
}
