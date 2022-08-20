# Requiem Decentralized Exchange
 
**General features:**
*Swaps*
 - Exact in swap
 - Exact out swap
 - Flash swap for exact in and out
 - Flash loans
 - Factories for pool deployment, free access for pairs, access management for pools with more than 2 tokens
*Governance*
 - Pools are designed to infuse a voting register
 - With this, pool lp become ERC20Votes tokens, where the vote tracking is done by the register
 - That logic is used to allow pool governance with voting based on pool lp token ownership
 - Pool parameters such as swap fees, flash loan fees, withdraw fees or even the trading logic itself can be changed as long as users vote for it
 - Voting implementation is done in the requiem-governance repository, here we only use mocks
*Router*
 - Efficient routing through multiple pools
 - All implemented pools behave similar to UniswapV2, i.e. to swap, ...
   1) ...the user needs to send the amount to the pool,
   2) Then the respective swap function of the pool has to be called,
   3) The pool then validates the trade and sends the requested or calculated output amount to the user.
 - The Router executes these multi-swaps with different pool types while preserving very low gas costs
 - Exact out routing can be done via flash swaps as long as it is more cost efficient
 
**The following pools are implemented here:**
*Pairs:*
 - Weights allow the user to supply liquidity at unequal amounts and still preserve uniswapV2 type prices
 - Amplification allows users to scale up the liquidity to improve the trading behaviour - this allows efficient pair-trading for exotic stablecoins
 - UniswapV2 swap compatible
*Balanced Pool:*
 - Pools with more than two tokens that follow pair-wise Uniswap V2 logic
 - Equivalent to weighted pool with
*Weighted Pools:*
 - Pools that has pair-wise weighted pair liquidity,but can contain more than just 2 tokens
*Stable Pool:*
 - Curve-type swable swap logic for pools with more than 2 tokens
 - Added Exact out swap feature
 - Added flash swaps and flash loans
