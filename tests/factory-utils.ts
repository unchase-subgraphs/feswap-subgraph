import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { PairCreated } from "../generated/Factory/Factory"

export function createPairCreatedEvent(
  tokenA: Address,
  tokenB: Address,
  pairAAB: Address,
  pairABB: Address,
  allPairsLength: BigInt
): PairCreated {
  let pairCreatedEvent = changetype<PairCreated>(newMockEvent())

  pairCreatedEvent.parameters = new Array()

  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenB", ethereum.Value.fromAddress(tokenB))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("pairAAB", ethereum.Value.fromAddress(pairAAB))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam("pairABB", ethereum.Value.fromAddress(pairABB))
  )
  pairCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "allPairsLength",
      ethereum.Value.fromUnsignedBigInt(allPairsLength)
    )
  )

  return pairCreatedEvent
}
