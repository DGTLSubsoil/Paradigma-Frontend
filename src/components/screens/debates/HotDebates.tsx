"use client"
import HotDebateItem from "@/components/ui/debate/HotDebateItem";
import { useHotDisputes } from "@/hooks/useContractData";
import { IDebatesData, ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/screens/debates/hot-debates.module.css";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
import { Oval } from 'react-loader-spinner';
export function HotDebatesPreloaded(props: {
  debates: IDebatesData | undefined;
  topicId: string | number;
}) {
  const { debates, topicId } = props;
  return (
    <div className={styles.hot_debates}>
      {debates?.debates.map((debate) => (
        <HotDebateItem
          key={debate.id}
          id={topicId}
          debate={debate}
        />
      ))}
    </div>
  );
}

export default function HotDebates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true })
  ])

  const { topics, loading } = useHotDisputes();
  console.log(loading)
  return (
    <div ref={emblaRef} className={styles.wrapper}>
      <div className={styles.hot_debates}>
        {loading ? (
          <div className={styles.wrapper2}>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#212529"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>

        ) : topics?.topics.map((topic, indexTopic) => (
          topic.debates.map((debate, indexDebate) => (
            <HotDebateItem key={`${indexTopic}-${indexDebate}`} id={topic.id} debate={debate} />
          ))
        ))}

      </div>
    </div >

  );
}
