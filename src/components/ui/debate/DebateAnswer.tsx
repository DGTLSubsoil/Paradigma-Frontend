import BuyNFTButton from "@/components/buttons/BuyNFT";
import { IMetadata } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/debate/debate-answer.module.css";
import Image from "next/image";

interface DebateAnswerProps {
  topicId: number;
  debateId: number;
  answerId: number;
  metaData?: IMetadata;
}

export default function DebateAnswer({
  topicId,
  debateId,
  answerId,
  metaData,
}: DebateAnswerProps) {
  const price = answerId === 2 ? 1000 : answerId === 1 ? 100 : 10;
  const answerData = metaData?.answer_data?.[answerId];

  return (
    <div className={styles.debate_answer}>
      <div className={styles.debate_answer__container}>
        <div className={styles.debate_answer__container__image}>
          {answerData && (
            <Image
              src={answerData.image}
              alt="answer img"
              width={340}
              height={340}
            />
          )}
        </div>
        <div className={styles.debate_answer__container__info}>
          <h4 className="green_color">Answer #{answerId + 1}</h4>
          <h5>
            {answerData?.answer ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."}
          </h5>
          <h4 className="green_color">{price} $PARAD</h4>
        </div>
        <BuyNFTButton
          title="Buy"
          style={{ marginTop: 15, width: "100%" }}
          topicId={topicId}
          debateId={debateId}
          answerId={answerId}
          price={price}
        />
      </div>
    </div>
  );
}
