import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  PresaleCreated as PresaleCreatedEvent,
  FairCreated as FairCreatedEvent,
  PrivateCreated as PrivateCreatedEvent,
} from "../generated/PoolFactory/PoolFactory"
import { Pool } from "../generated/schema"
import { PoolState, PoolType } from "./common"
import { PresalePool } from "../generated/templates"

export function handlePresaleCreated(event: PresaleCreatedEvent): void {
  const poolId = event.params._presale.toString()
  let pool = new Pool(poolId)
  if(pool) {
    pool.poolAddress = event.params._presale
    pool.currencyAddress = event.params._addrs[3]
    pool.endTime = event.params._saleInfo[7]
    pool.hardCap = event.params._saleInfo[5]
    pool.liquidityListingRate = event.params._saleInfo[1]
    pool.liquidityPercent = event.params._saleInfo[14]
    pool.maxContribution = event.params._saleInfo[3]
    pool.minContribution = event.params._saleInfo[2]
    pool.poolState = PoolState.inUse
    pool.poolDetails = event.params._poolDetails
    pool.poolType = PoolType.presale
    pool.rate = event.params._saleInfo[0]
    pool.softCap = event.params._saleInfo[4]
    pool.startTime = event.params._saleInfo[6]
    pool.token = event.params._addrs[0]
    pool.totalRaised = BigInt.fromI32(0)
    pool.liquidityRaised = BigInt.fromI32(0)
    pool.totalValueRaised = BigInt.fromI32(0)
    pool.participants = BigInt.fromI32(0)
    pool.createdBy = event.params._creator
    pool.createdAt = event.block.timestamp
    pool.save()
  }
  PresalePool.create(event.params._presale)
}


export function handlePrivateCreated(event: PrivateCreatedEvent): void {
  const poolId = event.params._private.toString()
  let pool = new Pool(poolId)
  if(pool) {
    pool.poolAddress = event.params._private
    pool.currencyAddress = event.params._addrs[3]
    pool.endTime = event.params._saleInfo[6]
    pool.hardCap = event.params._saleInfo[4]
    pool.liquidityListingRate = event.params._saleInfo[1]
    pool.liquidityPercent = BigInt.fromI32(0)
    pool.maxContribution = event.params._saleInfo[2]
    pool.minContribution = event.params._saleInfo[1]
    pool.poolState = PoolState.inUse
    pool.poolDetails = event.params._poolDetails
    pool.poolType = PoolType.privatesale
    pool.rate = event.params._saleInfo[0]
    pool.softCap = event.params._saleInfo[3]
    pool.startTime = event.params._saleInfo[5]
    pool.token = event.params._addrs[0]
    pool.totalRaised = BigInt.fromI32(0)
    pool.liquidityRaised = BigInt.fromI32(0)
    pool.totalValueRaised = BigInt.fromI32(0)
    pool.participants = BigInt.fromI32(0)
    pool.createdBy = event.params._creator
    pool.createdAt = event.block.timestamp
    pool.save()
  }
  PresalePool.create(event.params._private)
}


export function handleFairCreated(event: FairCreatedEvent): void {
  const poolId = event.params._fair.toString()
  let pool = new Pool(poolId)
  if(pool) {
    pool.poolAddress = event.params._fair
    pool.currencyAddress = event.params._addrs[3]
    pool.endTime = event.params._saleInfo[3]
    pool.hardCap = BigInt.fromI32(0)
    pool.liquidityListingRate = BigInt.fromI32(0)
    pool.liquidityPercent = event.params._saleInfo[9]
    pool.maxContribution = BigInt.fromI32(0)
    pool.minContribution = BigInt.fromI32(0)
    pool.poolState = PoolState.inUse
    pool.poolDetails = event.params._poolDetails
    pool.poolType = PoolType.fairsale
    pool.rate = BigInt.fromI32(0)
    pool.softCap = event.params._saleInfo[0]
    pool.startTime = event.params._saleInfo[2]
    pool.token = event.params._addrs[0]
    pool.totalRaised = BigInt.fromI32(0)
    pool.liquidityRaised = BigInt.fromI32(0)
    pool.totalValueRaised = BigInt.fromI32(0)
    pool.participants = BigInt.fromI32(0)
    pool.createdBy = event.params._creator
    pool.createdAt = event.block.timestamp
    pool.save()
  }
  PresalePool.create(event.params._fair)
}
