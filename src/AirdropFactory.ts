import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  AirdropCreated as AirdropCreatedEvent,
} from "../generated/AirdropFactory/AirdropFactory"
import { Airdrop } from "../generated/schema"
import { AirdropPool } from "../generated/templates"

export function handleAirdropCreated(event: AirdropCreatedEvent): void {
  const poolId = event.params._airdrop.toString()
  let pool = new Airdrop(poolId)
  if(pool) {
    pool.poolAddress = event.params._airdrop
    pool.poolDetails = event.params._airdropDetail
    pool.startTime = BigInt.fromI32(0)
    pool.token = event.params._token
    pool.totalClaimedAmount = BigInt.fromI32(0)
    pool.totalAllocationAmount = BigInt.fromI32(0)
    pool.totalAllocationNumber = BigInt.fromI32(0)
    pool.participants = BigInt.fromI32(0)
    pool.createdBy = event.params._owner
    pool.createdAt = event.block.timestamp
    pool.save()
  }
  AirdropPool.create(event.params._airdrop)
}
