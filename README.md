# 记忆中

基于 `VitePress` 搭建的个人笔记站点，主要整理 Java 后端、面试八股、项目复盘、LeetCode、AI 应用和通信基础相关内容。

在线访问：

- GitHub Pages: `https://13145424485.github.io/vitepress-notes/`

## 项目特点

- 以 `work/` 为主，持续沉淀 Java 面试题、项目面经和 AI 相关笔记
- 同时保留 `front-end/`、`communition/` 等目录，整理学习型文档和基础知识
- 使用本地搜索，适合按关键词快速检索知识点
- 内容以个人复习、面试准备和项目回顾为主

## 当前内容

### 面试与项目

`work/` 目录目前主要包括：

- `Java.md`：Java 基础、注解、反射、HashMap、基本类型等
- `JUC.md`：线程安全、锁、线程池、进程线程关系等
- `JVM.md`：内存区域、垃圾回收、收集器
- `Mysql.md`：索引、事务、执行计划、慢查询优化
- `Redis.md`：IO 模型、淘汰策略、缓存问题
- `消息队列.md`：Kafka、延迟消息、死信队列等
- `Spring八股.md`：AOP、异常处理、依赖注入、自动装配
- `Springcloud.md`：微服务基础
- `操作系统.md`：进程调度、用户态内核态、Linux 指令
- `计算机网络.md`：HTTP/HTTPS、TCP、三次握手
- `设计模式.md`：策略模式、工厂模式等
- `AI.md`：RAG、Agent、Prompt、MCP 等 AI 应用题
- `leetcode.md`：常见题型与 Java 解法
- `项目面经.md`：项目链路、发布流程、认证、OSS、RAG 等复盘
- `优秀文章借鉴.md`：外部优质文章和书单整理

### 笔记与学习资料

- `front-end/`：Java 学习笔记、Spring Boot、Redis、JVM、JUC 等
- `communition/`：通信基础相关内容
- `image、/`：站点插图与文档配图
- `.vitepress/`：站点配置、导航、搜索和主题设置

## 本地启动

先安装依赖：

```bash
pnpm install
```

启动本地开发环境：

```bash
pnpm docs:dev
```

构建静态站点：

```bash
pnpm docs:build
```

本地预览构建结果：

```bash
pnpm docs:preview
```

## 目录结构

```text
.
├─ .vitepress/       # VitePress 配置
├─ front-end/        # 学习笔记
├─ communition/      # 通信基础
├─ work/             # 面试题、项目复盘、LeetCode、AI
├─ image、/          # 图片资源
├─ public/           # 静态资源
└─ README.md
```

## 使用说明

- 站点首页主要作为导航页使用
- `work/index.md` 已按当前文档结构维护入口
- 新增或重命名 `work/` 下文档后，建议同步更新首页导航
- 若构建失败，优先检查 Markdown 中是否存在未闭合 HTML 标签，或正文里是否直接写了类似 `List<Integer>` 这类尖括号内容

## 参考与致谢

- Redis 相关部分部分参考了黑马点评实战思路
- 部分学习资料和外部文章已整理在 [`work/优秀文章借鉴.md`](./work/优秀文章借鉴.md)

## 许可证

文档内容默认保留所有权；如需引用，请注明出处。代码片段可按需要自行使用。
