# LY-OPS Hub

> **LeoYoung Ops Control Center** — 幕后操盘手 L 的亚马逊运营 AI 中台

## 项目概述

LY-OPS Hub 是亚马逊运营 AI Agent 的总控台 / Agent Hub。Phase 1 搭建纯前端总控台，展示已有 Agent、LLM Provider 配置、系统预留规划，部署于 Cloudflare Pages 免费服务。

### 技术栈

- **框架**: Vite + React 18 + TypeScript
- **样式**: Tailwind CSS（深色科技风）
- **路由**: React Router v6
- **部署**: Cloudflare Pages（免费）

---

## 本地启动

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd ly-ops-hub

# 2. 安装依赖
npm install

# 3. 复制环境变量（可选，Phase 1 不需要）
cp .env.example .env

# 4. 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 即可看到 LY-OPS Hub 首页。

---

## Cloudflare Pages 部署

### 方式一：通过 Cloudflare Dashboard（推荐）

1. 将项目推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Workers & Pages → Pages → **连接到 Git**
4. 选择 GitHub 仓库，配置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework preset**: None（或 Vite）
5. 点击部署 → 自动分配 `*.pages.dev` 免费域名

### 方式二：通过 Wrangler CLI

```bash
npx wrangler pages deploy dist
```

---

## GitHub 自动部署

Cloudflare Pages 默认支持 Git 集成：
- 每次推送到主分支，自动触发构建和部署
- 可在 Pages → Settings → Builds & deployments 配置分支规则

---

## 项目结构

```
ly-ops-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AgentCard.tsx          # Agent 卡片
│   │   ├── CategoryFilter.tsx     # 分类筛选
│   │   ├── Layout.tsx             # 全局布局
│   │   ├── LLMProviderCard.tsx    # LLM Provider 卡片
│   │   ├── Navbar.tsx             # 顶部导航
│   │   └── StatusBadge.tsx        # 状态标签
│   ├── config/
│   │   ├── agents.ts              # Agent 注册表（新增 Agent 改这里）
│   │   ├── llmProviders.ts        # LLM Provider 注册表
│   │   └── site.ts                # 站点配置
│   ├── pages/
│   │   ├── Agents.tsx             # Agent 中心
│   │   ├── Docs.tsx               # 文档
│   │   ├── Home.tsx               # 首页
│   │   ├── LLMSettings.tsx        # LLM 配置中心
│   │   └── Settings.tsx           # 系统配置
│   ├── types/
│   │   ├── agent.ts               # Agent 类型定义
│   │   └── llm.ts                 # LLM 类型定义
│   ├── utils/
│   ├── App.tsx                    # 路由配置
│   ├── index.css                  # 全局样式
│   └── main.tsx                   # 入口
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 如何新增 Agent

编辑 `src/config/agents.ts`，在 `agents` 数组中追加一条对象：

```ts
{
  id: "my-new-agent",
  name: "我的新 Agent",
  category: "data_analysis",
  version: "v1",
  description: "简要描述",
  status: "planned",
  entryType: "placeholder",
  tags: ["标签"],
  llmRequired: true,
  priority: 50,
}
```

添加后 Agent 中心和首页统计会自动更新。如果 Agent 已部署上线，设置：

```ts
entryType: "external_url",
url: "https://your-agent.pages.dev",
githubUrl: "https://github.com/...",
```

---

## 如何修改 LLM Provider

编辑 `src/config/llmProviders.ts`，修改 `llmProviders` 数组。每个 Provider 包含：

| 字段 | 说明 |
|------|------|
| `id` | 唯一标识 |
| `name` | 显示名称 |
| `type` | Provider 类型 |
| `baseUrl` | API 地址 |
| `apiKeyEnvName` | 环境变量名（不存真实 Key） |
| `defaultModel` | 默认模型 |
| `models` | 可用模型列表 |
| `region` | 地区分类 |

---

## 为什么第一阶段不在前端保存 API Key

1. 前端代码在浏览器中**完全可见** — 任何人都能通过 DevTools 查看
2. 将 Key 写死在前端等于**公开到互联网**
3. Phase 1 仅做 UI 展示，Key 通过环境变量占位
4. 后续通过后端代理调用 LLM，Key 始终保存在服务端

---

## 后续扩展路线

### Phase 2 — 后端接入

- Supabase Auth（登录 / 注册 / RLS）
- Supabase PostgreSQL（Agent 配置和运行记录持久化）
- Cloudflare Workers API Gateway（LLM 调用代理）
- 环境变量注入 API Key

### Phase 3 — 权限 + 审计

- 多角色权限（admin / operator / designer / assistant）
- Agent 运行日志 + 回放
- 用量统计 + 费用追踪

### Phase 4 — Agent 运行时

- Agent 编排引擎
- 定时任务调度
- 文件管理

---

## 许可证

MIT
