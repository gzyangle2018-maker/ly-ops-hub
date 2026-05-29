import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { AgentCategory, AgentStatus } from "../types/agent";
import { STATUS_META } from "../types/agent";
import { agents } from "../config/agents";
import AgentCard from "../components/AgentCard";
import CategoryFilter from "../components/CategoryFilter";

export default function Agents() {
  const [searchParams] = useSearchParams();

  const initialCategory = (searchParams.get("category") as AgentCategory | "all") ?? "all";
  const [category, setCategory] = useState<AgentCategory | "all">(initialCategory);
  const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
  const [search, setSearch] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const a of agents) {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return agents.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = a.name.toLowerCase().includes(q);
        const matchDesc = a.description.toLowerCase().includes(q);
        const matchTags = a.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTags) return false;
      }
      return true;
    });
  }, [category, statusFilter, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">🤖 Agent 中心</h1>
        <p className="mt-1 text-sm text-gray-500">
          全部 {agents.length} 个 Agent · 已上线 {agents.filter((a) => a.status === "online").length} · 开发中{" "}
          {agents.filter((a) => a.status === "developing").length} · 规划中{" "}
          {agents.filter((a) => a.status === "planned").length}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="搜索 Agent 名称 / 描述 / 标签…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
        />

        <CategoryFilter
          selected={category}
          onChange={setCategory}
          counts={categoryCounts}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              statusFilter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            全部状态
          </button>
          {STATUS_META.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === s.key
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 text-gray-400">没有匹配的 Agent</p>
          <p className="text-sm text-gray-600">尝试调整筛选条件</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
