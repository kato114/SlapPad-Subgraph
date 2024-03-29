import { BigInt, bigInt, ethereum } from "@graphprotocol/graph-ts"
import {
    Cancelled as CancelledEvent,
    Claimed as ClaimedEvent,
    Contributed as ContributedEvent,
    Finalized as FinalizedEvent,
    LiquidityWithdrawn as LiquidityWithdrawnEvent,
    PoolUpdated as PoolUpdatedEvent,
    WithdrawnContribution as WithdrawnContributionEvent
} from "../generated/templates/PresalePool/PresalePool"
import { Pool, Contribute, Claim, Refund } from "../generated/schema"
import { PoolState } from "./common"

export function handleCancelled(event: CancelledEvent): void {
  const poolId = event.address.toString()
  let pool = Pool.load(poolId)
  if(pool) {
    pool.poolState = PoolState.cancelled
    pool.save()
  }
}

export function handleClaimed(event: ClaimedEvent): void {
  
}

export function handleContributed(event: ContributedEvent): void {
  const poolId = event.address.toString()
  let pool = Pool.load(poolId)
  if(pool) {
    pool.totalRaised = pool.totalRaised.plus(event.params.currencyAmount)
    pool.participants = pool.participants.plus(BigInt.fromI32(1))
    pool.save()
  }

  const contributedId = event.address.toString() + "-" + event.params.user.toString()
  let contribute = Contribute.load(contributedId)
  if(contribute) {
    contribute.currencyAmount = contribute.currencyAmount.plus(event.params.currencyAmount)
    contribute.save()
  } else {
    contribute = new Contribute(contributedId)
    contribute.poolAddress = event.address
    contribute.user = event.params.user
    contribute.currencyAmount = event.params.currencyAmount
    contribute.createdAt = event.block.timestamp
    contribute.save()
  }
}

export function handleFinalized(event: FinalizedEvent): void {
  const poolId = event.address.toString()
  let pool = Pool.load(poolId)
  if(pool) {
    pool.poolState = PoolState.completed
    pool.liquidityRaised = pool.liquidityRaised.plus(event.params.tvl)
    pool.totalValueRaised = pool.totalValueRaised.plus(event.params.tvl)
    pool.save()
  }
}

export function handleLiquidityWithdrawn(event: LiquidityWithdrawnEvent): void {
  const poolId = event.address.toString()
  let pool = Pool.load(poolId)
  if(pool) { 
    if(pool.liquidityRaised >= event.params.lpAmount) {
      pool.liquidityRaised = pool.liquidityRaised.minus(event.params.lpAmount)
      pool.save()
    } else {
      pool.liquidityRaised = BigInt.fromU32(0)
      pool.save()
    }
  }
}

export function handleWithdrawnContribution(event: WithdrawnContributionEvent): void {
  const poolId = event.address.toString()
  let pool = Pool.load(poolId)
  if(pool) {
    if(pool.totalRaised >= event.params.currencyAmount) {
      pool.totalRaised = pool.totalRaised.minus(event.params.currencyAmount)
      pool.save();
    } else {
      pool.totalRaised = BigInt.fromU32(0)
      pool.save();
    }
  }

  const contributedId = event.address.toString() + "-" + event.params.user.toString()
  let contribute = Contribute.load(contributedId)
  if(contribute) {
    if(contribute.currencyAmount >= event.params.currencyAmount) {
      contribute.currencyAmount = contribute.currencyAmount.minus(event.params.currencyAmount)
    } else {
      contribute.currencyAmount = BigInt.fromI32(0)
    }
    contribute.save()
  }
}

export function handlePoolUpdated(event: PoolUpdatedEvent): void {
  let pool = Pool.load(event.address.toString())
  if(pool) {
    pool.poolDetails = event.params.poolDetails
    pool.save()
  }
}
