import TopicItems from "@/components/ui/topic/TopicItems";
import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/screens/topics/topics.module.css";

export default function Topics({ topics }: ITopicsData) {
  // const { getAll, getById } = debatesService;

  // const data = await getAll();
  // const debate = await getById(1);

  // console.log(debate);
  // console.log(data);

  const reversedTopics = topics.reverse();

  return (
    <div className={styles.topics}>
      <div className={styles.topics__container}>
        {reversedTopics && reversedTopics.length
          ? reversedTopics.map(
              (topic) =>
                topic?.debates?.length > 0 && (
                  <TopicItems key={topic?.id} topic={topic} />
                )
            )
          : "Not Found"}
      </div>
    </div>
  );
}
