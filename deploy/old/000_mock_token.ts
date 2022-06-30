import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { parseUnits } from 'ethers/lib/utils';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, execute } = deployments;
  const { deployer, user } = await getNamedAccounts();

  console.log('network', network);
  console.log('deployer', deployer);
  console.log('2ndParty', user);

  const T1 = await deploy('T1', {
    contract: 'MockERC20',
    from: deployer,
    log: true,
    args: ['T1 Coin', 'T1', 6],
  });

  const busd = await deploy('T2', {
    contract: 'MockERC20',
    from: deployer,
    log: true,
    args: ['T2 Coin', 'T2', 6],
  });

  const dai = await deploy('T3', {
    contract: 'MockERC20',
    from: deployer,
    log: true,
    args: ['T3 Coin', 'T3', 18],
  });


  const tusd = await deploy('T4', {
    contract: 'MockERC20',
    from: deployer,
    log: true,
    args: ['T4 Coin', 'T4', 18],
  });

  await execute('T1', { from: deployer, log: true }, 'mint', deployer, parseUnits('10000000', 6) );
  await execute('T2', { from: deployer, log: true }, 'mint', deployer, parseUnits('10000000', 6) );
  await execute('T3', { from: deployer, log: true }, 'mint', deployer, parseUnits('10000000', 18) );
  await execute('T4', { from: deployer, log: true }, 'mint', deployer, parseUnits('10000000', 18) );
  await execute('T1', { from: deployer, log: true }, 'mint', user, parseUnits('10000000', 6) );
  await execute('T2', { from: deployer, log: true }, 'mint', user, parseUnits('10000000', 6) );
  await execute('T3', { from: deployer, log: true }, 'mint', user, parseUnits('10000000', 18) );
  await execute('T4', { from: deployer, log: true }, 'mint', user, parseUnits('10000000', 18) );
};

export default func;
func.tags = ['deploy-mocks'];
