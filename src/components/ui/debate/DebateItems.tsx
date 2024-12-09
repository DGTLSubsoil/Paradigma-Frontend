import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/debate/debate-items.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import { formatUnits } from "viem";


export default function DebateItems({ id: topicID, debate }: IDebateData) {
  const formattedPrizePool = (value: number) => Number(
    formatUnits(BigInt(value), 18)
  ).toFixed(2);

  return (
    <Link href={`/debates/topic-${topicID}/debate-${debate?.id}`}>
      <div className={styles.debate_item_body}>
        <Image className={styles.debate_item_image} src={debate.metadata?.preview as string} width={100} height={100} alt="preview"/>
        <div>
          <p>{debate?.metadata?.point || debate.point}</p>
          <div className={styles.debate_item_text_with_image}>
            <Image src={SVG.dollarSquare} alt="dollar-square" width={16} height={16}/>
            <p className={styles.debate_item_text_thin}>Prize pool: {formattedPrizePool(debate.prizePool)} $Parad</p>
          </div>
          <div className={styles.debate_item_text_with_image}>
            <Image src={SVG.profile2User} alt="dollar-square" width={16} height={16}/>
            <p className={styles.debate_item_text_thin}>Participants: {debate.qtyMembers}/{debate.needQtyMembers}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

