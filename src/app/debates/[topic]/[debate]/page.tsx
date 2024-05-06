import DebateItem from "@/components/ui/debate/DebateItem";
import { debatesService } from "@/services/debates.service";
import { getNumberFromString } from "@/utils/converter";
import styles from "@/styles/pages/debates-topic-debate.module.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debate | Paradigma",
};

export default async function DebatePage({
  params,
}: {
  params: { debate: string; topic: string };
}) {
  const { getDebateById } = debatesService;

  const debateIdNumber = getNumberFromString(params.debate);
  const topicIdNumber = getNumberFromString(params.topic);

  const debate = await getDebateById(debateIdNumber, topicIdNumber);

  if (!debate) {
    notFound();
  }

  return (
    <div className={styles.debate}>
      {debate && <DebateItem id={topicIdNumber} debate={debate} />}
    </div>
  );
}

export async function generateStaticParams({
  params,
}: {
  params: { topic: string };
}) {
  const { getTopicById } = debatesService;

  const idNumber = getNumberFromString(params.topic);
  const topic = await getTopicById(idNumber);

  return (topic?.debates ?? []).map((debate) => ({
    debate: "debate-" + debate?.id,
    fallback: "blocking",
  }));
}
