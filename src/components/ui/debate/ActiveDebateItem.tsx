import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import { formatUnits } from "viem";
import styles from "@/styles/components/ui/debate/debate-item-profile.module.css";
import Image from "next/image";
/* import { useAccount } from "wagmi"; */

export default function ActiveDebateItem(
    {
        itemData
    }: {
        itemData: any
    }
) {
/*     const formattedPrizePool = (value: number) => Number(
        value ? formatUnits(BigInt(value), 18) : null
    ).toFixed(2);

    console.log(); */
    

    return (
        <>
            <div className={styles.debate_item}>
            <Link
                className={styles.debate_item__container}
                href={`/debates/topic-${itemData.topicId}/debate-${itemData.debateId}`}
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
            { <h4>{itemData?.debate?.metadata?.point || itemData?.debate?.point}</h4> }
            { <span>Participants: {itemData?.debate?.qtyMembers} / {itemData?.debate?.needQtyMembers}</span> }
                </div>
                </div>
            </Link>
            </div>
            <div className={styles.debate_item__container__info__bottom}>
                <div className={styles.debate_item__container__info__text__bottom}>
               {      <h4>{itemData?.userAnswer ? itemData?.userAnswer + 1 : ''}</h4> }
                     { <span>Bet: {itemData?.bet} $PARAD </span> } 
                </div>
            </div>
        </>
        
    );
}
