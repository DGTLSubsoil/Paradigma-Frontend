import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/topic/topic-items-account.module.css";
import ActiveDebateItem from "./ActiveDebateItem";
import { formatUnits } from "viem";
/* import { ActiveDebates } from "@/types/referral.type"; */


export default function ActiveDebatesItems(props: {
  topics: ITopicsData | undefined;
  activeDebatesComplexData: any
}) {
  const {topics, activeDebatesComplexData} = props;

  let itemsData

  if(activeDebatesComplexData){
    itemsData = activeDebatesComplexData.map((el: any) => {

      const topic = topics?.topics ? (topics.topics.find(topic => topic.id == el.topicId)) : null
      
      const getAnswer = () => {
        if(topic){
          return topic.debates[0].metadata?.answer_data.find(answer => answer.id === el.complexInfoForUserInDispute[1])
        }

        return topic
      }

      const getDebate = () => {
        return topic ? (topic.debates.find(debate => debate.id == el.disputeId)) : null
      }

      return {
        topicId: el.topicId,
        debateId: el.disputeId,
        userAnswer: el.complexInfoForUserInDispute[1],
        bet: el?.complexInfoForUserInDispute[0] ? formatUnits(el.complexInfoForUserInDispute[0], 18) : 0,
        tokenId: el?.complexInfoForUserInDispute[2],
        income: el?.complexInfoForUserInDispute[3] ? formatUnits(el.complexInfoForUserInDispute[3], 18) : 0,
        image: getAnswer()?.image,
        debate: getDebate()
      }
    })
  }

  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        
        <div className={styles.topic_items__container__info}>
          <h1>Active Debates</h1>
        </div>
          
        <div className={styles.topic_items__container__debates}>
          {itemsData ? (
            itemsData.map((el: any, index: any) => (
              <div
                key={`${index}`}
                className={styles.topic_items__container__debates__debate}
              >
                <ActiveDebateItem itemData={itemsData[index]} />
              </div>
            ))
          ) : (
            <div className={styles.topic_items__container__debates__not_found}>
              <h3>No Active Debates Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
