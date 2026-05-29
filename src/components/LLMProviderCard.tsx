import type { LLMProviderConfig } from "../types/llm";
import { getRegionMeta } from "../types/llm";

interface LLMProviderCardProps {
  provider: LLMProviderConfig;
}

export default function LLMProviderCard({ provider }: LLMProviderCardProps) {
  const regionMeta = getRegionMeta(provider.region);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {provider.name}
          </h3>
          <p className="text-xs text-gray-500">
            {regionMeta.label} · <code className="text-indigo-400">{provider.id}</code>
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
            provider.enabled
              ? "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30"
              : "bg-gray-500/20 text-gray-500 ring-gray-500/30"
          }`}
        >
          {provider.enabled ? "已启用" : "未启用"}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Base URL:</span>
          <code className="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-300">
            {provider.baseUrl || "(待配置)"}
          </code>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">默认模型:</span>
          <code className="rounded bg-white/5 px-2 py-0.5 text-xs text-indigo-400">
            {provider.defaultModel || "(待配置)"}
          </code>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">环境变量:</span>
          <code className="rounded bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400">
            {provider.apiKeyEnvName}
          </code>
        </div>

        {provider.models.length > 0 && (
          <div>
            <span className="text-xs text-gray-600">可用模型:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {provider.models.map((m) => (
                <code
                  key={m}
                  className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-gray-400"
                >
                  {m}
                </code>
              ))}
            </div>
          </div>
        )}

        {provider.note && (
          <p className="rounded-lg bg-indigo-500/10 px-3 py-2 text-xs text-indigo-300">
            💡 {provider.note}
          </p>
        )}
      </div>
    </div>
  );
}
