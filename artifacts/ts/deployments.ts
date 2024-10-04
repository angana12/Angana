/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { RunScriptResult, DeployContractExecutionResult } from '@alephium/cli'
import { NetworkId } from '@alephium/web3'
import { TokenFaucet, TokenFaucetInstance } from '.'
import { default as testnetDeployments } from '../.deployments.testnet.json'
import { default as devnetDeployments } from '../.deployments.devnet.json'

export type Deployments = {
  deployerAddress: string
  contracts: {
    TokenFaucet: DeployContractExecutionResult<TokenFaucetInstance>
  }
}

function toDeployments(json: any): Deployments {
  const contracts = {
    TokenFaucet: {
      ...json.contracts['TokenFaucet'],
      contractInstance: TokenFaucet.at(json.contracts['TokenFaucet'].contractInstance.address)
    }
  }
  return {
    ...json,
    contracts: contracts as Deployments['contracts']
  }
}

export function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments {
  const deployments =
    networkId === 'testnet' ? testnetDeployments : networkId === 'devnet' ? devnetDeployments : undefined
  if (deployments === undefined) {
    throw Error('The contract has not been deployed to the ' + networkId)
  }
  const allDeployments = Array.isArray(deployments) ? deployments : [deployments]
  if (deployerAddress === undefined) {
    if (allDeployments.length > 1) {
      throw Error(
        'The contract has been deployed multiple times on ' + networkId + ', please specify the deployer address'
      )
    } else {
      return toDeployments(allDeployments[0])
    }
  }
  const result = allDeployments.find((d) => d.deployerAddress === deployerAddress)
  if (result === undefined) {
    throw Error('The contract deployment result does not exist')
  }
  return toDeployments(result)
}
