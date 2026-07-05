import { SearchBox } from "@/components/SearchBox";
import { TopicCard } from "@/components/Cards";
import { healthTopics, searchCollection } from "@/lib/data";

export default async function TopicsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const topics = searchCollection(healthTopics, q);

  return (
    <main className="container">
      <div className="toolbar">
        <div>
          <p className="eyebrow">Health Topics</p>
          <h1>健康主题</h1>
        </div>
        <SearchBox action="/topics" defaultValue={q} placeholder="搜索主题、生活方式或风险提示" />
      </div>
      <div className="grid">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </main>
  );
}
