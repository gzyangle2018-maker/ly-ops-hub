import { useNavigate } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";
import {
  agents,
  getOnlineAgentCount,
  getDevelopingAgentCount,
  getPlannedAgentCount,
  getCategoryCounts,
} from "../config/agents";
import { CATEGORY_META } from "../types/agent";
import StatusBadge from "../components/StatusBadge";

export default function Home() {
  const navigate = useNavigate();

  const onlineCount = getOnlineAgentCount();
  const developingCount = getDevelopingAgentCount();
  const plannedCount = getPlannedAgentCount();
  const categoryCounts = getCategoryCounts();

  const stockHelper = agents.find((a) => a.id === "stock-helper")!;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/40 via-surface to-purple-900/30 p-8 sm:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {SITE_CONFIG.phase}
          </div>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {SITE_CONFIG.brand}
          </h1>
          <p className="mt-2 text-xl text-gray-400">{SITE_CONFIG.subtitle}</p>
          <p className="mt-1 text-sm text-gray-500">{SITE_CONFIG.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/agents")}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              🤖 Agent 中心
            </button>
            <button
              onClick={() => navigate("/llm")}
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/20"
            >
              🧠 LLM 配置
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/20"
            >
              📖 项目文档
            </button>
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-white">📊 系统总览</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="text-3xl font-bold text-emerald-400">
              {onlineCount}
            </div>
            <div className="mt-1 text-sm text-gray-400">已上线 Agent</div>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="text-3xl font-bold text-amber-400">
              {developingCount}
            </div>
            <div className="mt-1 text-sm text-gray-400">开发中 Agent</div>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
            <div className="text-3xl font-bold text-sky-400">
              {plannedCount}
            </div>
            <div className="mt-1 text-sm text-gray-400">规划中 Agent</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-3xl font-bold text-white">
              {agents.length}
            </div>
            <div className="mt-1 text-sm text-gray-400">Agent 总数</div>
          </div>
        </div>
      </section>

      {/* Featured — 库存备货助手 */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          ⭐ 第一个已上线工具
        </h2>
        <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">
                  {stockHelper.name}
                </h3>
                <StatusBadge status="online" />
              </div>
              <p className="mb-1 text-sm text-gray-400">
                {stockHelper.version} · 后端支持 / 库存
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-gray-300">
                {stockHelper.description}
              </p>
              {stockHelper.details && (
                <p className="mt-2 max-w-xl text-xs text-gray-500">
                  {stockHelper.details}
                </p>
              )}
              {stockHelper.steps && (
                <div className="mt-3">
                  <span className="text-xs text-gray-500">
                    工作流 ({stockHelper.steps.length} 步)：
                  </span>
                  <ol className="mt-1 list-inside list-decimal text-xs text-gray-400">
                    {stockHelper.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <button
                onClick={() =>
                  window.open(stockHelper.url, "_blank")
                }
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-500"
              >
                进入工具 →
              </button>
              <a
                href={stockHelper.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/20"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category entries */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-white">📂 Agent 分类</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_META.map((cat) => (
            <button
              key={cat.key}
              onClick={() =>
                navigate(`/agents?category=${cat.key}`)
              }
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-indigo-500/30 hover:bg-indigo-500/5"
            >
              <div className="text-2xl">{cat.icon}</div>
              <h3 className="mt-2 font-semibold text-white">
                {cat.label}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {cat.description}
              </p>
              <span className="mt-3 inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                {categoryCounts[cat.key] ?? 0} 个 Agent
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
