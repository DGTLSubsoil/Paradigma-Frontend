import TopicItems from "@/components/ui/topic/TopicItems";
import { ITopicData } from "@/interfaces/debates.interface";

export default function Topic({ topic }: ITopicData) {
  return (
    <div>
      <TopicItems topic={topic} />
    </div>
  );
}
