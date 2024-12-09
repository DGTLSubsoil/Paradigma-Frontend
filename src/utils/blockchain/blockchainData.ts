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
  process.env.NEXT_PUBLIC_SPORE_ADDRESS as `0x${string}`;
const sporeNFTAddress: `0x${string}` =
  process.env.NEXT_PUBLIC_SPORE_NFT_ADDRESS as `0x${string}`;
const paradAddress: `0x${string}` =
  process.env.NEXT_PUBLIC_PARAD_ADDRESS as `0x${string}`;


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
