import TopicItem from "@/components/ui/topic/TopicItem";
import { debatesService } from "@/services/debates.service";
import { getNumberFromString } from "@/utils/converter";
import styles from "@/styles/pages/debates-topic.module.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topic | Paradigma",
};

export default async function TopicPage({
  params,
}: {
  params: { topic: string };
}) {
  const { getTopicById } = debatesService;

  const idNumber = getNumberFromString(params.topic);
  const topic = await getTopicById(idNumber);

  if (!topic) {
    notFound();
  }

  return (
    <div className={styles.topic}>{topic && <TopicItem topic={topic} />}</div>
  );
}
