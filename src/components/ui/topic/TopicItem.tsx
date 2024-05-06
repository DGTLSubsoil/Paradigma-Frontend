import BackButton from "@/components/buttons/Back";
import { ITopicData, IDebatesData } from "@/interfaces/debates.interface";
import DebateItems from "../debate/DebateItems";
import styles from "@/styles/components/ui/topic/topic-item.module.css";
import BackMobile from "@/components/buttons/BackMobile";
import HotDebateItems from "../debate/HotDebateItems";
import GreenButton from "@/components/buttons/Green";

export default function TopicItem({ topic }: ITopicData) {
  const hotDebatesTopic: IDebatesData = {
    id: topic.id,
    debates: topic?.debates.filter((debate) => debate.isHot === true),
  };

  const coldDebatesTopic: IDebatesData = {
    id: topic.id,
    debates: topic?.debates.filter((debate) => debate.isHot === false),
  };

  const hotDebatesExist = hotDebatesTopic?.debates?.length > 0;
  const coldDebatesExist = coldDebatesTopic?.debates?.length > 0;

  return (
    <div className={styles.topic_item}>
      <div className={styles.topic_item__container}>
        <div className={styles.topic_item__container__head}>
          <h4
            className={`${styles.topic_item__container__topic} "green_color"`}
          >
            Topic #{topic.id}
          </h4>
          <div className={styles.mobile}>
            <BackMobile title="Go Back" />
          </div>
        </div>
        <div className={styles.debates}>
          {hotDebatesExist && (
            <div>
              <div className={styles.topic_item__container__head}>
                <h1>Hot Debates</h1>
                <div className={styles.pc}>
                  <BackButton title="Go Back" />
                </div>
              </div>

              <div className={styles.topic_item__container__debates}>
                {hotDebatesTopic?.debates.map((debate) => (
                  <HotDebateItems
                    key={debate.id}
                    id={topic?.id}
                    debate={debate}
                  />
                ))}
              </div>
            </div>
          )}

          {coldDebatesExist && (
            <div>
              <div className={styles.topic_item__container__head}>
                <h1>Debates</h1>
                <div className={styles.pc}>
                  {!hotDebatesExist && <BackButton title="Go Back" />}
                </div>
              </div>

              <div className={styles.topic_item__container__debates}>
                {coldDebatesTopic?.debates.map((debate) => (
                  <DebateItems key={debate.id} id={topic?.id} debate={debate} />
                ))}
              </div>
            </div>
          )}

          <a
            style={{ height: 75 }}
            target="_blank"
            href="https://pancakeswap.finance/swap?outputCurrency=0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C"
          >
            <GreenButton
              style={{ width: "100%", height: "100%", fontSize: 18}}
              title="Buy PARAD Tokens"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
