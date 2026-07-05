import Link from "next/link";
import { BrandCard, IngredientCard, ProductCard, TopicCard } from "@/components/Cards";
import { brands, healthTopics, ingredients, products } from "@/lib/data";

const entries = [
  {
    href: "/topics",
    title: "Health Topics 健康主题",
    text: "从睡眠、心血管、眼部、骨骼等问题出发，先看生活方式，再看营养因素。"
  },
  {
    href: "/ingredients",
    title: "Ingredients 成分",
    text: "理解镁、Omega-3、维生素 D3、锌等成分的证据、来源、边界与风险。"
  },
  {
    href: "/products",
    title: "Products 产品",
    text: "查看德国原装补剂演示条目、品牌、剂型、成分构成与注意事项。"
  },
  {
    href: "/brands",
    title: "Brands 品牌",
    text: "了解德国药房、药妆和大众补剂品牌的定位与产品覆盖。"
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">German Pharmacy Logic · 中文健康决策辅助</p>
            <h1>德国药房式健康知识与补剂决策平台</h1>
            <p className="lead">
              不是补剂商城，而是把健康主题、营养成分、科学证据、风险提示和德国原装产品连接起来的可信信息入口。
            </p>
          </div>
          <aside className="hero-panel">
            <strong>平台原则</strong>
            <p className="meta">
              生活方式优先，补剂作为辅助。风险提示优先于产品推荐。本 MVP 使用透明规则链路，不做 AI 诊断或黑盒推荐。
            </p>
          </aside>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="grid">
            {entries.map((entry) => (
              <Link className="card" href={entry.href} key={entry.href}>
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section stack">
          <h2>推荐逻辑</h2>
          <div className="chain">
            <div className="chain-step">健康主题：先解释生活方式和医疗边界</div>
            <div className="chain-step">相关成分：展示 evidence_level、relevance_level 和 caution</div>
            <div className="chain-step">产品匹配：仅因为含有相关成分而展示，并说明为什么相关</div>
          </div>
        </section>

        <section className="section stack">
          <h2>快速入口</h2>
          <div className="grid">
            <TopicCard topic={healthTopics[0]} />
            <IngredientCard ingredient={ingredients[2]} />
            <ProductCard product={products[1]} />
            <BrandCard brand={brands[0]} />
          </div>
        </section>
      </div>
    </main>
  );
}
