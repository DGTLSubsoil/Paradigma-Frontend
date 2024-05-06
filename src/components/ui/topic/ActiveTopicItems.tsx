import { ITopicsData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/topic/topic-items.module.css";
import GreyButton from "@/components/buttons/Grey";

export default function ActiveTopicItems({ topics }: ITopicsData) {
  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        <div className={styles.topic_items__container__info}>
          <h1>Active Debates</h1>
        </div>
        <div className={styles.topic_items__container__debates}>
          {topics?.map((topic) =>
            topic?.debates.map((debate) => (
              <div
                key={debate.id}
                className={styles.topic_items__container__debates__debate}
              >
                <div
                  className={
                    styles.topic_items__container__debates__debate__img
                  }
                ></div>
                <div
                  className={
                    styles.topic_items__container__debates__debate__text
                  }
                >
                  <div>
                    <h4 className="green_color">Topic #{topic.id} </h4>
                    <h4>Debate #{debate.id}</h4>
                  </div>
                  <p>{debate.point}</p>
                  <Link href={`/debates/topic-${topic.id}/debate-${debate.id}`}>
                    <GreyButton style={{ width: "100%" }} title="Inspect" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
