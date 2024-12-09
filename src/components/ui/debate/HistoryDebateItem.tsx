import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import { formatUnits } from "viem";
import styles from "@/styles/components/ui/debate/debate-item-profile.module.css";
import Image from "next/image";
import { useIsTokenIdWinner } from "@/hooks/useContractData";
/* import { useAccount } from "wagmi"; */

export default function HistoryDebateItem(
    {
        itemData
    }: {
        itemData: any
    }
) {
    const formattedTokens = (value: bigint) => Number(
        value ? formatUnits(value, 18) : 0
      ).toFixed(2);
      

    return (
        <>
            <div className={styles.debate_item}>
            <Link
                className={styles.debate_item__container}
                href={`/debates/topic-${itemData.groupId}/debate-${itemData.index}`}
            >
                {itemData?.image && 
                    <Image
                        src={itemData.image}
                        className={styles.debate_item__container__img}
                        alt="topic"
                        height={306}
                        width={306}
                    />
                }
                
                <div className={styles.debate_item__container__info}>
                <div className={styles.debate_item__container__info__text}>
            { <h4>{itemData?.point}</h4> }
            { <span>Participants: {Number(itemData?.qtyMembers)} / {Number(itemData?.needQtyMembers)}</span> }
                </div>
                </div>
            </Link>
            </div>
            <div className={styles.debate_item__container__info__bottom}>
                <div className={styles.debate_item__container__info__text__bottom}>

                     <h4>{Number(itemData?.indexPositionAnswer) ? Number(itemData?.indexPositionAnswer) + 1 : 1}</h4> 
                     <span>Bet: {formattedTokens(itemData?.nftPrice)} $PARAD </span>

                     <span>Status: {itemData?.isWin ? 'Won' : 'Lost'}</span>
                    <span>Income: {formattedTokens(itemData?.playerIncome)} $PARAD</span>
                </div>
            </div>
        </>
        
    );
}
