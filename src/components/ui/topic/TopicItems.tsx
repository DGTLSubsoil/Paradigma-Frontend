import BackButton from "@/components/buttons/Back";
import { ITopicData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/topic/topic-items.module.css";
import VoteInSection from "@/components/buttons/VoteInSection";
import Image from "next/image";

export default function TopicItems({ topic }: ITopicData) {
  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        <div className={styles.topic_items__container__info}>
          <h1>Topic #{topic.id}</h1>
          <Link className={styles.pc} href={`/debates/topic-${topic.id}`}>
            <VoteInSection title="Vote In This Section" />
          </Link>
        </div>
        <div className={styles.topic_items__container__debates}>
          {topic?.debates.map((debate) => (
            <div
              key={debate.id}
              className={styles.topic_items__container__debates__debate}
            >
              <div
                className={styles.topic_items__container__debates__debate__img}
              >
                {debate?.metadata?.preview && (
                  <Image
                    src={debate?.metadata?.preview}
                    alt="debate preview"
                    height={280}
                    width={280}
                  />
                )}
              </div>
              <div
                className={styles.topic_items__container__debates__debate__text}
              >
                <div>
                  <h4 className="green_color">Topic </h4>
                  <h4>Debate #{debate.id}</h4>
                </div>
                <p>{debate?.metadata?.point || debate.point}</p>
              </div>
            </div>
          ))}
          {/* <BackButton title="hi" /> */}
        </div>
        <Link className={styles.mobile} href={`/debates/topic-${topic.id}`}>
          <VoteInSection
            title="Vote In This Section"
            style={{ height: 59, width: "100%" }}
          />
        </Link>
      </div>
    </div>
  );
}
