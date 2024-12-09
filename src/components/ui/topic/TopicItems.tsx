import { ITopicData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/topic/topic-items.module.css";
import Image from "next/image";
import { SVG } from "../../../../public/static/images/svg/svg";

export default function TopicItems({ topic }: ITopicData) {
  //const participants = topic?.debates.reduce
  //  ? topic.debates.reduce((acc, debate) => acc + debate.qtyMembers, 0)
  //  : 0;
  const participants = topic.participantsCount;

  return (
    <Link className={styles.topic_items} href={`/debates/topic-${topic.id}`}>
      <div className={styles.topic_items__container}>
        {topic?.image && (
          <Image
            src={topic.image}
            className={styles.topic_items__container__img}
            alt="topic"
            height={306}
            width={306}
          />
        )}
        <div className={styles.topic_items__container__info}>
          <div className={styles.topic_items__container__info__debates}>
            <span>
              <Image src={SVG.lightning} alt="lightning" />
              {topic?.debates.length || 0} Debates
            </span>
          </div>
          <div className={styles.topic_items__container__info__text}>
            <h4>{topic?.title || "Title"}</h4>
            <span>Participants: {participants}</span>
          </div>
        </div>

        {/* <h1>Topic #{topic.id}</h1> */}
        {/* <VoteInSection title="Vote In This Section" /> */}
      </div>
    </Link>
  );
}
