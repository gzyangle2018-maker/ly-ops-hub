const FUTURE_MODULES = [
  {
    id: "supabase-auth",
    name: "Supabase 登录",
    icon: "🔐",
    description: "基于 Supabase Auth 的邮箱/Google/GitHub 登录，支持 RLS 行级安全策略。",
    phase: "Phase 2",
  },
  {
    id: "database",
    name: "数据库",
    icon: "🗄️",
    description:
      "Supabase PostgreSQL，存储 Agent 运行记录、用户偏好、操作日志、Agent 配置。",
    phase: "Phase 2",
  },
  {
    id: "file-storage",
    name: "文件存储",
    icon: "📁",
    description:
      "Supabase Storage / R2，用于 Agent 输入文件（Excel / CSV / 图片）和输出文件存储。",
    phase: "Phase 2",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    icon: "🔗",
    description:
      "统一 API 入口（Cloudflare Workers / Supabase Edge Functions），负责 LLM 调用代理和 Agent 编排。",
    phase: "Phase 2",
  },
  {
    id: "permissions",
    name: "权限角色",
    icon: "👥",
    description:
      "admin / operator / designer / assistant 多角色权限，控制 Agent 可见范围和操作权限。",
    phase: "Phase 3",
  },
  {
    id: "task-logs",
    name: "任务日志",
    icon: "📝",
    description:
      "Agent 运行全链路日志记录（输入/输出/耗时/错误），支持回放和审计。",
    phase: "Phase 3",
  },
];

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white">⚙️ 系统配置</h1>
        <p className="mt-1 text-sm text-gray-500">当前阶段：静态配置展示与预留</p>
      </div>

      {/* Current config */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">📋 当前系统配置</h2>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">认证状态</span>
            <span className="rounded bg-gray-500/20 px-2 py-0.5 text-xs text-gray-400">
              未启用
            </span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">数据库</span>
            <span className="rounded bg-gray-500/20 px-2 py-0.5 text-xs text-gray-400">
              未连接
            </span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">API Gateway</span>
            <span className="rounded bg-gray-500/20 px-2 py-0.5 text-xs text-gray-400">
              待部署
            </span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">文件存储</span>
            <span className="rounded bg-gray-500/20 px-2 py-0.5 text-xs text-gray-400">
              待配置
            </span>
          </div>
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">默认 LLM</span>
            <code className="rounded bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">
              custom-relay
            </code>
          </div>
          <div className="flex justify-between rounded-lg bg-white/5 px-4 py-3">
            <span className="text-gray-500">版本</span>
            <span className="text-xs text-gray-400">1.0.0 · Phase 1</span>
          </div>
        </div>
      </section>

      {/* Future modules */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">🔮 未来预留模块</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_MODULES.map((mod) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="text-2xl">{mod.icon}</div>
              <h3 className="mt-2 font-semibold text-white">{mod.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                {mod.description}
              </p>
              <span className="mt-3 inline-block rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-400">
                {mod.phase}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
