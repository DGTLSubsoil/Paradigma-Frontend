import BackButton from "@/components/buttons/Back";
import { ITopicData, IDebatesData } from "@/interfaces/debates.interface";
import DebateItems from "../debate/DebateItems";
import styles from "@/styles/components/ui/topic/topic-item.module.css";
import styleshotDebates from "@/styles/pages/debates.module.css";
import BackMobile from "@/components/buttons/BackMobile";
import PurpleButton from "@/components/buttons/Purple";
import { HotDebatesPreloaded } from "@/components/screens/debates/HotDebates";
import BuyParadTokensButtons from "@/components/buttons/BuyParadTokensButtons";

export default function TopicItem({ topic }: ITopicData) {
  const hotDebatesTopic: IDebatesData = {
    id: topic.id,
    debates: topic?.debates.filter((debate) => debate.isHot === true && debate.uri !== ''),
  };

  const coldDebatesTopic: IDebatesData = {
    id: topic.id,
    debates: topic?.debates.filter((debate) => debate.isHot === false && debate.uri !== ''),
  };

  const hotDebatesExist = hotDebatesTopic?.debates?.length > 0;
  const coldDebatesExist = coldDebatesTopic?.debates?.length > 0;

  console.log("coldDebatesTopic");
  console.log(coldDebatesTopic);
  
  console.log("\n\n\n");

  return (
    <div className={styles.topic_item}>
      <div className={styles.topic_item__head}>
        <div className={styles.topic_item__head__wrapper}>
          <h1
            className={`${styles.topic_item__head__wrapper__topic} "purple_color"`}
          >
            Topic {topic?.title || "Title"}
          </h1>
          <div className={styles.mobile}>
            <BackMobile title="Go Back" />
          </div>
          <div className={styles.pc}>{<BackButton title="Go Back" />}</div>
        </div>
      </div>
      <div className={styles.topic_item__container}>
        {
          hotDebatesExist &&
          <div id="hot-debates" className={styleshotDebates.debates__container__hot_debates}>
            <div>
              <h4 className="golden_color">Almost Finished</h4>
              <h1>Hot Debates</h1>
            </div>
            <HotDebatesPreloaded debates={hotDebatesTopic} topicId={topic.id} />
          </div>
        }

        <div className={styles.debates}>
          {coldDebatesExist && (
            <div>
              <div className={styles.topic_item__container__head}>
                <h1>{topic.title} - Debates</h1>
              </div>
              <div className={styles.topic_item__container__debates}>
                {coldDebatesTopic?.debates.map((debate) => (
                  <DebateItems key={debate.id} id={topic?.id} debate={debate} />
                ))}
              </div>
            </div>
          )}

          <BuyParadTokensButtons variant={"purple"} />
        </div>
      </div>
    </div>
  );
}