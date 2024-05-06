import sporeABIjson from "./sporeABI.json";
import sporeNFTABIjson from "./sporeNFTABI.json";
import paradABIjson from "./paradABI.json";
import { coreConfig } from "./coreConfig";
import { config } from "./config";
import { Abi } from "viem";

const sporeABI: Abi = sporeABIjson as Abi;
const sporeNFTABI: Abi = sporeNFTABIjson as Abi;
const paradABI: Abi = paradABIjson as Abi;

const sporeAddress: `0x${string}` =
  "0x94CdcabC64630dF1643Fff6EEC6Bd925dc76C161";
const sporeNFTAddress: `0x${string}` =
  "0x512a3ce8f6cC5155c0fad373245A7270F99aace7";
const paradAddress: `0x${string}` =
  "0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C";

export {
  sporeABI,
  sporeNFTABI,
  paradABI,
  sporeAddress,
  sporeNFTAddress,
  paradAddress,
  config,
  coreConfig,
};
