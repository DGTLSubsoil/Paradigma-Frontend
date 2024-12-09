import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/debate/hot-debate-items.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import GreyButton from "@/components/buttons/Grey";

export default function HotDebateItems({ id: topicID, debate }: IDebateData) {
  return (
    <div className={styles.debate_items}>
      <div className={styles.debate_items__container}>
        <div className={styles.debate_items__container__left}>
          <h2>{debate.status}</h2>
          <p>{debate?.metadata?.point || debate.point}</p>
          <Link
            className={styles.pc}
            style={{ width: 200 }}
            href={`/debates/topic-${topicID}/debate-${debate?.id}`}
          >
            <GreyButton isDark title="Vote" />
          </Link>
        </div>
        <div className={styles.debate_items__container__right}>
          <Image
            className={`${styles.debate_items__container__right__line} ${styles.pc}`}
            src={SVG.verticalLine}
            alt="vertical line"
          />
          <Image
            className={`${styles.debate_items__container__right__line_x} ${styles.mobile}`}
            src={SVG.horizontalLine}
            alt="horizontal line"
          />
          <div className={styles.debate_items__container__right__details}>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>
                {debate.qtyMembers}/{debate.needQtyMembers}
              </h2>
              <h4>Amount Of Participants</h4>
            </div>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>{debate.prizePool} $Parad</h2>
              <h4>Prize Pool</h4>
            </div>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>{debate.qtyAnswers}</h2>
              <h4>Amount Of Answers</h4>
            </div>
            <Link
              className={styles.mobile}
              href={`/debates/topic-${topicID}/debate-${debate?.id}`}
            >
              <GreyButton isDark style={{ width: "100%" }} title="Vote" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
