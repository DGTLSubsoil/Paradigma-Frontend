import TopicItems from "@/components/ui/topic/TopicItems";
import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/screens/topics/topics.module.css";

export default function Topics({ topics }: ITopicsData) {
  console.log("topics on Topics.tsx");
  console.log(topics[0]?.debates[0]);
  console.log(topics[0]?.debates[0]);

  return (
    <div className={styles.topics}>
      <div className={styles.topics__container}>
        {topics && topics.length
          ? topics.map((topic) => {
              // Фильтруем дебаты с пустым uri
              const filteredDebates = topic?.debates?.filter(debate => debate.uri !== '');
              return filteredDebates && filteredDebates.length > 0 ? (
                <TopicItems key={topic.id} topic={{ ...topic, debates: filteredDebates }} />
              ) : null;
            })
          : "Not Found"}
      </div>
    </div>
  );
}