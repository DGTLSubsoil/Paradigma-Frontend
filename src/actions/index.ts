"use server"

import { coreConfig } from "@/utils/blockchain/coreConfig";
import { waitForTransactionReceipt } from "@wagmi/core";
import { revalidatePath } from "next/cache";
import { Address } from "viem";

export async function resetCache(TX: Address) {    
    console.log(TX);
    

    await waitForTransactionReceipt(coreConfig, {
        hash: TX
    }); 

    console.log(555555);
    

    revalidatePath('/', 'layout')
    console.log('RESET CACHE');
}