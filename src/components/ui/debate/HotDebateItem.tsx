import Link from "next/link";
import { formatUnits } from "viem";
import Image from "next/image";

import styles from "@/styles/components/ui/debate/hot-debate-item.module.css";
import { IDebateData } from "@/interfaces/debates.interface";
import { SVG } from "../../../../public/static/images/svg/svg";

export default function TopicItems({ id: topicID, debate }: IDebateData) {
  const formattedPrizePool = Number(
    formatUnits(BigInt(debate.prizePool), 18)
  ).toFixed(2);

  return (
    <div className={styles.hot_debate_item}>
      <Link
        className={styles.hot_debate_item__container}
        href={`/debates/topic-${topicID}/debate-${debate.id}`}
      >
        {debate?.metadata?.preview && (
          <Image
            src={debate?.metadata?.preview}
            className={styles.hot_debate_item__container__img}
            alt="topic"
            height={306}
            width={306}
          />
        )}
        <div className={styles.hot_debate_item__container__info}>
          <div className={styles.hot_debate_item__container__info__debates}>
            <span>
              <Image src={SVG.people} alt="people" />
              {debate.qtyMembers}/{debate.needQtyMembers}
            </span>
          </div>
          <div className={styles.hot_debate_item__container__info__text}>
            <h4>{debate?.metadata?.point || debate.point}</h4>
            <span>Prize Pool: {formattedPrizePool} $PARAD</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
