import DebateItem from "@/components/ui/debate/DebateItem";
import { debatesService } from "@/services/debates.service";
import { getNumberFromString } from "@/utils/converter";
import styles from "@/styles/pages/debates-topic-debate.module.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debate | Paradigma",
};

export async function generateStaticParams({
  params,
}: {
  params: { topic: string };
}) {
  const { getAll } = debatesService;

  const all = await getAll()

  const idNumber = getNumberFromString(params.topic);
  const topic = all?.topics.find(el => el.id === idNumber);

  return (topic?.debates ?? []).map((debate) => ({
    debate: "debate-" + debate?.id,
    fallback: "blocking",
  }));
}

export default async function DebatePage({
  params,
}: {
  params: { debate: string; topic: string };
}) {
  const { getAll } = debatesService;
  const all = await getAll()

  const debateIdNumber = getNumberFromString(params.debate);
  const topicIdNumber = getNumberFromString(params.topic);

  const topic = all?.topics.find(el => el.id === topicIdNumber);

  const debate = topic?.debates.find(el => el.id === debateIdNumber);

  if (!debate) {
    notFound();
  }

  //console.log(debate.metadata?.answer_data)

  return (
    <div className={styles.debate}>
      {debate && <DebateItem id={topicIdNumber} debate={debate} />}
    </div>
  );
}
