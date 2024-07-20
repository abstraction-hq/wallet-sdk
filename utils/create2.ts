import { FACTORY } from "../constants";
import { Address, getContractAddress, Hex } from "viem";

export const computeNewContractAddress = (salt: Hex, bytecode: Hex): Address => {
  return getContractAddress({
    bytecode: bytecode,
    from: FACTORY,
    salt,
    opcode: "CREATE2",
  });
}
