/* eslint-disable prefer-const */
import { Pair, Token } from "../generated/schema";
import { Pair as PairTemplate } from "../generated/templates";
import { PairCreated } from "../generated/Factory/Factory";
import {
  ZERO_BD,
  ZERO_BI,
  fetchTokenSymbol,
  fetchTokenName,
  fetchTokenDecimals,
} from "./utils";

export function handlePairCreated(event: PairCreated): void {
  let token0 = Token.load(event.params.tokenA.toHex());
  if (token0 === null) {
    token0 = new Token(event.params.tokenA.toHex());
    token0.name = fetchTokenName(event.params.tokenA);
    token0.symbol = fetchTokenSymbol(event.params.tokenA);
    let decimals = fetchTokenDecimals(event.params.tokenA);
    if (decimals === null) {
      return;
    }
    token0.decimals = decimals;
    token0.save();
  }

  let token1 = Token.load(event.params.tokenB.toHex());
  if (token1 === null) {
    token1 = new Token(event.params.tokenB.toHex());
    token1.name = fetchTokenName(event.params.tokenB);
    token1.symbol = fetchTokenSymbol(event.params.tokenB);
    let decimals = fetchTokenDecimals(event.params.tokenB);
    if (decimals === null) {
      return;
    }
    token1.decimals = decimals;
    token1.save();
  }

  let pairAAB = new Pair(event.params.pairAAB.toHex()) as Pair;
  pairAAB.token0 = token0.id;
  pairAAB.token1 = token1.id;
  pairAAB.reserve0 = ZERO_BD;
  pairAAB.reserve1 = ZERO_BD;
  pairAAB.token0Price = ZERO_BD;
  pairAAB.token1Price = ZERO_BD;
  pairAAB.createdAtBlockNumber = event.block.number;
  pairAAB.createdAtTimestamp = event.block.timestamp;
  pairAAB.save();

  let pairABB = new Pair(event.params.pairABB.toHex()) as Pair;
  pairABB.token0 = token1.id;
  pairABB.token1 = token0.id;
  pairABB.reserve0 = ZERO_BD;
  pairABB.reserve1 = ZERO_BD;
  pairABB.token0Price = ZERO_BD;
  pairABB.token1Price = ZERO_BD;
  pairABB.createdAtBlockNumber = event.block.number;
  pairABB.createdAtTimestamp = event.block.timestamp;
  pairABB.save();

  PairTemplate.create(event.params.pairAAB);
  PairTemplate.create(event.params.pairABB);
}