import TopicItem from "@/components/ui/topic/TopicItem";
import { debatesService } from "@/services/debates.service";

export async function generateStaticParams() {
  const { getAll } = debatesService;

  const data = await getAll();

  return (data?.topics ?? []).map((topic) => ({
    topic: "topic-" + topic?.id,
    fallback: "blocking",
  }));
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
