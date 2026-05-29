// ============================================================
// LY-OPS Hub — LLM Provider Registry
// 所有 API Key 均通过 apiKeyEnvName 引用环境变量，
// 前端不存储任何真实 Key。
// ============================================================

import type { LLMProviderConfig } from "../types/llm";

export const llmProviders: LLMProviderConfig[] = [
  // ── 海外 API ──────────────────────────────────────────────
  {
    id: "openai",
    name: "OpenAI",
    type: "openai",
    enabled: false,
    baseUrl: "https://api.openai.com/v1",
    apiKeyEnvName: "OPENAI_API_KEY",
    defaultModel: "gpt-4.1",
    models: [
      "gpt-4.1",
      "gpt-4.1-mini",
      "gpt-4-turbo",
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-3.5-turbo",
    ],
    region: "global",
  },
  {
    id: "anthropic",
    name: "Claude (Anthropic)",
    type: "anthropic",
    enabled: false,
    baseUrl: "https://api.anthropic.com",
    apiKeyEnvName: "ANTHROPIC_API_KEY",
    defaultModel: "claude-3-5-sonnet-20241022",
    models: [
      "claude-3-5-sonnet-20241022",
      "claude-3-opus-20240229",
      "claude-3-haiku-20240307",
    ],
    region: "global",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    type: "gemini",
    enabled: false,
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    apiKeyEnvName: "GEMINI_API_KEY",
    defaultModel: "gemini-1.5-pro",
    models: [
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      "gemini-1.0-pro",
    ],
    region: "global",
  },

  // ── 国内模型 ──────────────────────────────────────────────
  {
    id: "deepseek",
    name: "DeepSeek",
    type: "deepseek",
    enabled: false,
    baseUrl: "https://api.deepseek.com/v1",
    apiKeyEnvName: "DEEPSEEK_API_KEY",
    defaultModel: "deepseek-chat",
    models: [
      "deepseek-chat",
      "deepseek-reasoner",
      "deepseek-coder",
    ],
    region: "china",
    note: "性价比极高，推荐作为默认推理 Provider",
  },
  {
    id: "qwen",
    name: "通义千问 (Qwen)",
    type: "qwen",
    enabled: false,
    baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKeyEnvName: "QWEN_API_KEY",
    defaultModel: "qwen-max",
    models: [
      "qwen-max",
      "qwen-plus",
      "qwen-turbo",
      "qwen2.5-72b-instruct",
      "qwen2.5-32b-instruct",
    ],
    region: "china",
  },
  {
    id: "doubao",
    name: "豆包 (Doubao)",
    type: "doubao",
    enabled: false,
    baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
    apiKeyEnvName: "DOUBAO_API_KEY",
    defaultModel: "doubao-pro-32k",
    models: [
      "doubao-pro-32k",
      "doubao-pro-128k",
      "doubao-lite-32k",
    ],
    region: "china",
  },
  {
    id: "zhipu",
    name: "智谱 (ZhipuAI)",
    type: "zhipu",
    enabled: false,
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    apiKeyEnvName: "ZHIPU_API_KEY",
    defaultModel: "glm-4-plus",
    models: [
      "glm-4-plus",
      "glm-4",
      "glm-4-flash",
      "glm-4-air",
    ],
    region: "china",
  },
  {
    id: "moonshot",
    name: "Kimi (Moonshot)",
    type: "moonshot",
    enabled: false,
    baseUrl: "https://api.moonshot.cn/v1",
    apiKeyEnvName: "MOONSHOT_API_KEY",
    defaultModel: "moonshot-v1-8k",
    models: [
      "moonshot-v1-8k",
      "moonshot-v1-32k",
      "moonshot-v1-128k",
    ],
    region: "china",
    note: "超长上下文，适合大批量文档分析",
  },

  // ── 中转 API ──────────────────────────────────────────────
  {
    id: "openrouter",
    name: "OpenRouter",
    type: "openrouter",
    enabled: false,
    baseUrl: "https://openrouter.ai/api/v1",
    apiKeyEnvName: "OPENROUTER_API_KEY",
    defaultModel: "openai/gpt-4o",
    models: [
      "openai/gpt-4o",
      "anthropic/claude-3.5-sonnet",
      "google/gemini-pro-1.5",
      "meta-llama/llama-3.1-405b",
    ],
    region: "relay",
    note: "统一接入多模型，按量付费",
  },
  {
    id: "oneapi",
    name: "OneAPI",
    type: "oneapi",
    enabled: false,
    baseUrl: "https://your-oneapi-instance.com/v1",
    apiKeyEnvName: "ONEAPI_API_KEY",
    defaultModel: "gpt-4o",
    models: ["gpt-4o", "gpt-4-turbo", "claude-3-opus"],
    region: "relay",
    note: "自部署 OneAPI 实例，统一管理多供应商",
  },
  {
    id: "custom-relay",
    name: "自定义中转",
    type: "custom",
    enabled: false,
    baseUrl: "",
    apiKeyEnvName: "CUSTOM_RELAY_API_KEY",
    defaultModel: "",
    models: [],
    region: "relay",
    note: "自定义中转地址，兼容 OpenAI 格式即可接入",
  },

  // ── 自定义接口 ────────────────────────────────────────────
  {
    id: "custom-provider",
    name: "Custom Provider",
    type: "custom",
    enabled: false,
    baseUrl: "",
    apiKeyEnvName: "CUSTOM_PROVIDER_API_KEY",
    defaultModel: "",
    models: [],
    region: "local",
    note: "兼容 OpenAI API 格式的任何第三方或自部署模型",
  },
];

// ── Derived helpers ──────────────────────────────────────────

export function getProvidersByRegion(region: string): LLMProviderConfig[] {
  return llmProviders.filter((p) => p.region === region);
}

export function getProviderById(
  id: string,
): LLMProviderConfig | undefined {
  return llmProviders.find((p) => p.id === id);
}
