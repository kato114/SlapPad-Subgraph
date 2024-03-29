import { BigInt, bigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  Claim as ClaimEvent,
  CancelAirdrop as CancelAirdropEvent,
  SetStartTime as SetStartTimeEvent,
  SetVesting as SetVestingEvent,
  SetAllocations as SetAllocationsEvent,
  RemoveAllocations as RemoveAllocationsEvent
} from "../generated/templates/AirdropPool/AirdropPool"
import { Airdrop } from "../generated/schema"

export function handleClaim(event: ClaimEvent): void {
  const poolId = event.address.toString()
  let pool = Airdrop.load(poolId)
  if(pool) {
    pool.totalClaimedAmount = pool.totalClaimedAmount.plus(event.params.amount)
    pool.participants = pool.participants.plus(BigInt.fromI32(1))
    pool.save()
  }
}

export function handleCancelAirdrop(event: CancelAirdropEvent): void {
  const poolId = event.address.toString()
  let pool = Airdrop.load(poolId)
  if(pool) {
    pool.startTime = BigInt.fromI32(0)
    pool.save()
  }
}
export function handleSetStartTime(event: SetStartTimeEvent): void {
  const poolId = event.address.toString()
  let pool = Airdrop.load(poolId)
  if(pool) {
    pool.startTime = event.params.startTime
    pool.save()
  }
}
export function handleSetVesting(event: SetVestingEvent): void {
}
export function handleSetAllocations(event: SetAllocationsEvent): void {
  const poolId = event.address.toString()
  let pool = Airdrop.load(poolId)
  if(pool) {
    let sumAmts = BigInt.fromI32(0)
    for(let i = 0; i < event.params.amts.length; i++) {
      sumAmts = sumAmts.plus(event.params.amts[i])
    }
    pool.totalAllocationAmount = sumAmts
    pool.totalAllocationNumber = BigInt.fromU32(event.params.amts.length)
    pool.save()
  }
}
export function handleRemoveAllocations(event: RemoveAllocationsEvent): void {
  const poolId = event.address.toString()
  let pool = Airdrop.load(poolId)
  if(pool) {
    pool.totalAllocationAmount = BigInt.fromI32(0)
    pool.totalAllocationNumber = BigInt.fromI32(0)
    pool.save()
  }
}
