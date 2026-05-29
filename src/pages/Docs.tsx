import { SITE_CONFIG } from "../config/site";

export default function Docs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">📖 项目文档</h1>
        <p className="mt-1 text-sm text-gray-500">LY-OPS Hub 定位、开发与部署指南</p>
      </div>

      {/* 1. 定位 */}
      <Section title="1. LY-OPS 定位">
        <p>
          <strong>{SITE_CONFIG.brand}</strong> 是{" "}
          <strong>{SITE_CONFIG.tagline}</strong>。
        </p>
        <p>
          Phase 1 仅搭建总控台前端——Agent 卡片展示、LLM Provider
          配置界面、系统预留规划——不做真实后端、不接数据库、不做登录。
          所有 Agent 数据通过 <code>src/config/agents.ts</code> 静态驱动，
          未来接入数据库后数据源可平滑切换。
        </p>
      </Section>

      {/* 2. 新增 Agent */}
      <Section title="2. 如何新增一个 Agent">
        <p>编辑 <code>src/config/agents.ts</code>，在 <code>agents</code> 数组中追加一条对象：</p>
        <CodeBlock>{`{
  id: "my-new-agent",
  name: "我的新 Agent",
  category: "data_analysis",    // AgentCategory
  version: "v1",
  description: "简要描述 Agent 功能",
  status: "planned",            // "online" | "developing" | "planned" | "paused"
  entryType: "placeholder",     // "external_url" | "internal_route" | "api_agent" | "placeholder"
  tags: ["标签1", "标签2"],
  llmRequired: true,
  priority: 50,
}`}</CodeBlock>
        <ul>
          <li>添加后，Agent 中心页面和首页分类统计会自动更新。</li>
          <li>如果 Agent 已部署，设置 <code>entryType: "external_url"</code> 并填写 <code>url</code>。</li>
          <li>如果有 GitHub 仓库，填写 <code>githubUrl</code>。</li>
        </ul>
      </Section>

      {/* 3. 修改 LLM Provider */}
      <Section title="3. 如何修改 LLM Provider">
        <p>编辑 <code>src/config/llmProviders.ts</code>，在 <code>llmProviders</code> 数组中修改或追加：</p>
        <CodeBlock>{`{
  id: "my-provider",
  name: "我的 Provider",
  type: "custom",
  enabled: false,
  baseUrl: "https://my-api.example.com/v1",
  apiKeyEnvName: "MY_PROVIDER_API_KEY",
  defaultModel: "my-model",
  models: ["my-model", "my-model-lite"],
  region: "china",
}`}</CodeBlock>
        <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-amber-400">
            ⚠️ 请勿在 <code>baseUrl</code> 中夹带 API Key。Key 必须通过环境变量注入。
          </p>
        </div>
      </Section>

      {/* 4. 部署 */}
      <Section title="4. 部署到 Cloudflare Pages">
        <ol className="list-inside list-decimal space-y-2 text-sm">
          <li>将项目推送到 GitHub 仓库</li>
          <li>登录 Cloudflare Dashboard → Workers & Pages → Pages → "连接到 Git"</li>
          <li>选择 GitHub 仓库，构建设置：
            <ul className="ml-6 mt-1 list-inside list-disc space-y-1 text-xs text-gray-500">
              <li>Framework preset: <strong>None</strong>（或 Vite）</li>
              <li>Build command: <code>npm run build</code></li>
              <li>Build output directory: <code>dist</code></li>
            </ul>
          </li>
          <li>首次部署后，Cloudflare 会分配一个 <code>*.pages.dev</code> 免费域名。</li>
          <li>如需自定义域名，在 Pages → Custom domains 中绑定。</li>
          <li>
            环境变量在 Pages → Settings → Environment variables 中配置
            （参考 <code>.env.example</code>）。
          </li>
        </ol>
      </Section>

      {/* 5. 安全说明 */}
      <Section title="5. 为什么第一阶段不在前端保存 API Key">
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>前端代码在浏览器中完全可见——任何人都能通过 DevTools 查看。</li>
          <li>将 API Key 写死在前端等于将 Key 公开发布到互联网。</li>
          <li>Phase 1 仅做 UI 展示，所有 Key 通过环境变量占位。</li>
          <li>
            后续阶段通过 Cloudflare Workers / Supabase Edge Functions /
            Zeabur 等后端服务代理 LLM 调用，Key 始终保存在服务端。
          </li>
        </ul>
      </Section>

      {/* 6. 扩展说明 */}
      <Section title="6. 后续扩展路线">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg bg-white/5 p-4">
            <strong className="text-indigo-400">Phase 2 — 后端接入</strong>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-gray-500">
              <li>Supabase Auth（登录/注册）</li>
              <li>Supabase PostgreSQL（Agent 配置/运行记录持久化）</li>
              <li>Cloudflare Workers API Gateway（LLM 调用代理）</li>
              <li>环境变量注入 API Key</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/5 p-4">
            <strong className="text-indigo-400">Phase 3 — 权限 + 审计</strong>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-gray-500">
              <li>多角色权限（admin / operator / designer / assistant）</li>
              <li>Agent 运行任务日志 + 回放</li>
              <li>用量统计 + 费用追踪</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white/5 p-4">
            <strong className="text-indigo-400">Phase 4 — Agent 运行时</strong>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-gray-500">
              <li>Agent 编排引擎（链式调用、条件分支）</li>
              <li>Agent 输出文件管理</li>
              <li>定时任务调度</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ── Internal helpers ────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-gray-400">
        {children}
      </div>
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-xl bg-black/50 p-4 text-xs text-gray-300">
      <code>{children}</code>
    </pre>
  );
}
