import { useState } from "react";
import type { LLMRegion } from "../types/llm";
import { REGION_META } from "../types/llm";
import { llmProviders } from "../config/llmProviders";
import LLMProviderCard from "../components/LLMProviderCard";

export default function LLMSettings() {
  const [region, setRegion] = useState<LLMRegion | "all">("all");

  const filtered =
    region === "all"
      ? llmProviders
      : llmProviders.filter((p) => p.region === region);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-white">🧠 LLM 配置中心</h1>
        <p className="mt-1 text-sm text-gray-500">
          管理所有 LLM Provider 配置 · 当前阶段仅展示，不真实保存 API Key
        </p>
      </div>

      {/* ⚠️ Security notice */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-amber-400">安全提示</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-400">
              API Key 决不能暴露在前端代码或浏览器环境中。Phase 1
              只展示配置界面，所有 Key 通过 <code className="text-amber-300">apiKeyEnvName</code>{" "}
              字段引用环境变量。后续阶段请将 Key
              放到以下任一后端服务中：
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
              <li>Cloudflare Workers Secrets</li>
              <li>Supabase Edge Functions / Vault</li>
              <li>Zeabur / Railway 等环境变量注入</li>
              <li>自建 API Gateway 反向代理</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setRegion("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            region === "all"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
        >
          全部
        </button>
        {REGION_META.map((r) => (
          <button
            key={r.key}
            onClick={() => setRegion(r.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              region === r.key
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Provider list */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <LLMProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
