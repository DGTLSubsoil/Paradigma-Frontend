import Participating from "@/components/blockchain/Participating";
import BackButton from "@/components/buttons/Back";
import GreyButton from "@/components/buttons/Grey";
import { IDebateData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/debate/debate-item.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import DebateAnswer from "./DebateAnswer";
import BackMobile from "@/components/buttons/BackMobile";
import AdminDebate from "../admin/AdminDebate";

export default function DebateItem({ id: topicID, debate }: IDebateData) {
  return (
    <div className={styles.debate_item}>
      <div className={styles.debate_item__container}>
        <div className={styles.debate_item__container__info}>
          <div className={styles.debate_item__container__info__first}>
            <div className={styles.debate_item__container__info__first__head}>
              <h4 className="green_color">Topic #{topicID}</h4>
              <div className={styles.mobile}>
                <BackMobile title="Go Back" />
              </div>
            </div>
            <div className={styles.debate_item__container__info__first__info}>
              <h1>{debate.status}</h1>
              <h4>{debate?.metadata?.point || debate.point}</h4>
            </div>
          </div>
          <div className={styles.debate_item__container__info__second}>
            <div className={styles.debate_item__container__info__second__info}>
              <h2 className="green_color">{debate.prizePool} $Parad</h2>
              <p className="green_color">Prize Pool</p>
            </div>
            <div className={styles.debate_item__container__info__second__info}>
              <h2>
                {topicID && (
                  <Participating topicId={topicID} debateId={debate.id} />
                )}
              </h2>
              <p>Status</p>
            </div>
            <div className={styles.debate_item__container__info__second__info}>
              <h2>
                {debate.qtyMembers}/{debate.needQtyMembers}
              </h2>
              <p>Amount Of Participants</p>
            </div>
            <div className={styles.pc}>
              <GreyButton style={{ marginTop: 25 }} title="Invite Friends" />
            </div>
            <div className={styles.mobile}>
              <GreyButton
                style={{ marginTop: 10, width: "100%" }}
                title="Invite Friends"
              />
            </div>
          </div>
          <div
            className={`${styles.debate_item__container__info__third} ${styles.pc}`}
          >
            <BackButton style={{ width: 150 }} title="Back" />
          </div>
        </div>

        <AdminDebate dispute={{ groupId: topicID, groupIndex: debate.id }} />

        <div className={styles.debate_item__container__answers}>
          <div className={styles.debate_item__container__answers__head}>
            <h1>Answers</h1>
            <Image
              className={styles.pc}
              src={SVG.horizontalLine2}
              alt="Horizontal Line"
            />
            <Image
              className={styles.mobile}
              src={SVG.horizontalLine3}
              alt="Horizontal Line"
            />
          </div>
          <div className={styles.debate_item__container__answers__body}>
            <div
              className={styles.debate_item__container__answers__body__items}
            >
              {debate?.qtyAnswers &&
                Array.from(Array(debate.qtyAnswers), (_, index) => (
                  <DebateAnswer
                    key={index}
                    topicId={Number(topicID ? topicID : 0)}
                    debateId={Number(debate.id)}
                    answerId={index}
                    metaData={debate.metadata}
                  />
                ))}
            </div>
          </div>
          <a
            style={{ height: 75 }}
            target="_blank"
            href="https://pancakeswap.finance/swap?outputCurrency=0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C"
          >
            <GreyButton
              style={{ width: "100%", height: "100%", fontSize: 18 }}
              title="Buy PARAD Tokens"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
