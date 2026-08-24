以小说-agent为例







# 项目架构

LoreSmith-master/
├── ainovel_py/          # Python 核心 - AI 写作引擎
├── frontend-web/        # React 前端 - 用户界面
├── java-platform/       # Java 后端 - 平台服务
└── img/                 # 图片资源







# lang Graph

## Python 核心层 (ainovel_py/)
这是项目的 核心 AI 写作引擎 ，负责小说生成。

### 1. agents/ - AI 代理层
```
agents/
├── orchestrator/langgraph/  # 工作流编排（你正在看的）
│   ├── nodes/core.py        # 工作流节点定义
│   ├── core.py              # LangGraphRuntime 定义
│   ├── graph.py             # 图结构
│   └── state.py             # 状态管理
├── runner.py                # AI 代理运行器
├── llm_client.py            # 大模型客户端
├── context_manager.py       # 上下文管理
├── build.py                 # 构建相关
├── hints.py                 # 提示/建议系统
├── longform.py              # 长篇规划
├── post_commit.py           # 提交后处理
└── review_flow.py           # 审核流程
```
### 2. assets/ - 资源文件
```
assets/
├── prompts/           # AI 提示词模板
│   ├── coordinator.md     # 协调器提示词
│   ├── writer.md          # 写作提示词
│   ├── editor.md          # 编辑提示词
│   └── architect-*.md     # 架构师提示词（长/中/短篇）
├── references/        # 参考文档
│   ├── chapter-template.md    # 章节模板
│   ├── character-template.md  # 角色模板
│   ├── outline-template.md    # 大纲模板
│   └── quality-checklist.md   # 质量检查清单
└── styles/            # 风格定义
    └── default.md
```
### 3. bootstrap/ - 启动配置
```
bootstrap/
├── config.py          # 配置类
└── configfile.py      # 配置文件解析
```
### 4. domain/ - 领域模型
```
domain/
├── checkpoint.py      # 检查点
├── commit.py          # 提交
├── review.py          # 审核
├── runtime.py         # 运行时状态
├── runtime_events.py  # 运行时事件
├── story.py           # 故事/小说
├── transitions.py     # 状态转换
└── writing.py         # 写作相关
```
### 5. entry/ - 入口点
```
entry/
└── internal_api/
    └── run.py         # 运行入口
```
### 6. host/ - 宿主层
```
host/
├── events.py          # 事件系统
├── host.py            # 宿主接口
└── resume.py          # 恢复机制
```
### 7. internal_api/ - 内部 API
```
internal_api/
├── app.py             # FastAPI 应用
├── routes.py          # 路由定义
├── service.py         # 业务服务
├── worker.py          # 异步任务
├── dto.py             # 数据传输对象
├── persistence.py     # 持久化
└── workspace_*.py     # 工作空间相关
```
### 8. store/ - 数据存储
```
store/
├── store.py           # 存储总入口（你刚才看的）
├── io.py              # IO 操作
├── progress.py        # 进度存储
├── checkpoints.py     # 检查点存储
├── drafts.py          # 草稿存储
├── story_data.py      # 故事数据
└── ...
```
### 9. tools/ - AI 工具集
```
tools/
├── base.py                    # 工具基类
├── plan_chapter.py            # 规划章节
├── draft_chapter.py           # 起草章节
├── commit_chapter.py          # 提交章节
├── check_consistency.py       # 一致性检查
├── novel_context.py           # 小说上下文
├── save_arc_summary.py        # 保存弧段摘要
├── save_volume_summary.py     # 保存卷摘要
└── ...
```
## 二、前端层 (frontend-web/)
基于 React + TypeScript + Vite 的用户界面。

```
frontend-web/
├── src/
│   ├── app/               # 应用配置
│   │   ├── providers.tsx  # 全局 Provider
│   │   └── router.tsx     # 路由配置
│   ├── components/        # 通用组件
│   │   └── layout/        # 布局组件
│   ├── features/          # 功能模块
│   │   ├── stories/       # 故事管理
│   │   └── workspace/     # 工作空间
│   ├── lib/               # 工具库
│   │   ├── api/           # API 客户端
│   │   ├── query/         # React Query
│   │   ├── types/         # TypeScript 类型
│   │   └── utils/         # 工具函数
│   ├── pages/             # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── StoriesPage.tsx
│   │   ├── StoryWorkspacePage.tsx
│   │   └── ...
│   └── styles/            # 样式文件
├── index.html
├── package.json
└── vite.config.ts
```
## 三、Java 平台层 (java-platform/)
基于 Spring Boot 的平台服务，可能用于：

- 用户管理
- 故事管理
- 工作空间管理
- 持久化到数据库
```
java-platform/
└── src/main/java/com/ainovel/platform/
    ├── application/         # 应用服务
    │   └── StoryApplicationService.java
    └── domain/model/        # 领域模型
        ├── StoryRecord.java
        ├── RunRecord.java
        └── StoryWorkspace*.java
```

# 技术介绍

LangGraph 是由 LangChain 团队开发的一个**低层级 Agent 编排框架**，专为构建有状态（Stateful）、长时运行的 AI 工作流而设计。

与传统的线性 LLM 调用链不同，LangGraph 将工作流建模为**有向图（Directed Graph）**：

- **节点（Node）**：执行具体操作的函数（如调用 LLM、执行工具、处理数据）
- **边（Edge）**：定义节点之间的流转路径，支持条件分支
- **状态（State）**：在整个工作流中共享并传递的数据



想象你在玩一个 角色扮演游戏 ：

- 你（Agent）需要完成一系列任务（写小说）
- 每个任务有多个步骤（规划→写作→评审）
- 每个步骤完成后，根据结果决定下一步去哪
- 你需要记住之前发生的事情（状态）
LangGraph 就是帮你管理这个流程的工具，它用 状态机 的方式来组织 AI Agent 的工作流。

### State（状态）

State 是贯穿整个图的**共享数据结构**。每个节点可以读取和更新 State，更新后的 State 会传递给下一个节点。

```java
# state.py - 定义 Agent 需要记住的所有信息
class GraphState(TypedDict, total=False):
    seed_text: str              # 用户输入的提示
    current_chapter: int        # 当前写到第几章
    context: dict[str, Any]     # 上下文信息（前文摘要等）
    latest_plan: dict[str, Any] # 最新的章节计划
    latest_draft: str           # 最新的草稿内容
    pending_action: str         # 下一步要做什么
    out_lines: list[str]        # 日志输出
```

### Nodes（节点）

节点是普通的 Python 函数，接收当前 State，返回更新后的 State（部分字段）。

```python
# nodes/core.py 中的 plan_chapter_node

def plan_chapter_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    """
    章节规划节点
    职责：为当前章节生成写作计划
    """
    def _node(state: GraphState) -> GraphState:
        #-> GraphState返回值类型注解：这个函数执行完必须返回一个 GraphState 类型
        # 1. 从状态读取输入
        chapter = int(state.get("current_chapter") or 1)
        context = state.get("context") or {}
        seed_text = str(state.get("seed_text") or "")
        
        # 2. 判断当前模式（正常写作 vs 重写）
        progress = runtime.store.progress.load()
        if progress and progress.flow in {FlowState.REWRITING, FlowState.POLISHING}:
            summary = f"调用 plan_chapter (rewrite ch{chapter})"
        else:
            summary = f"调用 plan_chapter (ch{chapter})"
        
        # 3. 发送事件（前端展示）
        runtime.emit_event(Event(
            time=datetime.now(),
            category="TOOL",
            summary=summary,
            level="info"
        ))
        
        # 4. 调用 Tool 执行业务逻辑
        plan_payload = runtime._build_dynamic_plan(seed_text, chapter, context)
        plan_res = runtime.runner.call_tool("plan_chapter", plan_payload)
        
        # 5. 将结果写回状态
        latest_plan = plan_res.get("plan") or plan_payload
        state["latest_plan"] = latest_plan
        state["pending_action"] = "generate_draft"  # 设置下一步
        
        # 6. 返回更新后的状态
        return state
    
    return _node
```

****

#### 解析

**Callable` = 函数**

**`Callable[[A], B]` = 接收 A、返回 B 的函数**



**为什么节点函数需要 runtime ？**

```python
def plan_chapter_node(runtime: "LangGraphRuntime") -> Callable
[[GraphState], GraphState]:
```
因为每个节点都是 独立的处理单元 ，但它们需要访问共享的资源和服务。 runtime 就是把这些资源和服务**"注入"**到节点中。

**LangGraphRuntime的定义**

```python
@dataclass
class LangGraphRuntime(LLMCoordinatorBackend):
    cfg: Config #配置信息（API 密钥、模型选择等）
    runner: AgentRunner #AI 代理运行器，负责调用各种工具
    store: Store #数据存储（进度、草稿、检查点等）
    emit_event: Callable[[Event], None] #发送事件通知的函数
    emit_stream: Callable[[str, str], None] #发送流式输出的函数
```

Spring Boot 风格

```java
@Service
public class PlanChapterService {
    
    @Autowired
    private AgentRunner runner;      // 字段注入
    
    @Autowired
    private Store store;             // 字段注入
    
    public void planChapter(int chapter) {
        runner.callTool("plan_chapter", ...);
        store.progress().load();
    }
}
```
Python 项目风格

```python
@dataclass
class LangGraphRuntime:
    runner: AgentRunner   # 类似 @Autowired
    store: Store          # 类似 @Autowired
    cfg: Config           # 类似 @Autowired

def plan_chapter_node(runtime: "LangGraphRuntime"):  # 通过参数"注入"
    def _node(state: GraphState):
        runtime.runner.call_tool("plan_chapter", ...)  # 使用注入的依赖
        runtime.store.progress.load()                   # 使用注入的依赖
    return _node
```

| 方面     | Spring Boot              | Python 项目                     |
| -------- | ------------------------ | ------------------------------- |
| 实现机制 | 反射 + 注解              | 函数闭包 + 参数传递             |
| 类型检查 | 编译期 + 运行时          | 主要是运行时（Python 动态类型） |
| 配置方式 | XML / 注解 / Java Config | @dataclass + 直接实例化         |

#### 节点编写模式总结 ：

```python
def xxx_node(runtime) -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        # Step 1: 读状态
        input_data = state.get("xxx")
        
        # Step 2: 执行业务
        result = do_something(input_data)
        
        # Step 3: 写状态
        state["yyy"] = result
        state["pending_action"] = "next_node"  # 控制下一步
        
        # Step 4: 返回
        return state
    
    return _node
```



# LangGraph 多步骤 Agent 编排:

设计并实现基于 LangGraph 的写作工作流，涵盖load_runtime_contextnovel context -plan_chapter generate_draft check_ consistency commit chapter review rewrite 等完整节点;支持条件分支、循环和并行执行，形成可回放的任务执行链路

这个项目里的 LangGraph 编排，本质上是在做一件事：

把“写一章小说”拆成一条可控制、可恢复、可回放的 agent 执行链。

它不是单次 prompt，而是一个 stateful workflow。核心目标有 4 个：

- 把复杂任务拆成单职责节点
- 用状态决定下一步，而不是写死顺序
- 让失败、重写、恢复都能进入统一流程
- 让每一步都留下痕迹，方便 replay 和调试

所以这里的重点不是 “LangGraph 能画图”，而是它把 agent 做成了 状态机 + 工具调用 + 持久化执行链

主流程：load_runtime_context -> novel_context -> plan_chapter -> generate_draft -> commit_chapter -> review/rewrite/checkpoint -> finish



## 图的注册代码

```python
graph.add_node("load_runtime_context", load_runtime_context(self))
graph.add_node("novel_context", novel_context_node(self))
graph.add_node("plan_chapter", plan_chapter_node(self))
graph.add_node("generate_draft", generate_draft_node(self))
graph.add_node("commit_chapter", commit_chapter_node(self))
graph.add_node("review", review_node(self))
graph.add_node("rewrite", rewrite_node(self))
graph.add_node("arc_summary", arc_summary_node(self))
graph.add_node("volume_summary", volume_summary_node(self))
graph.add_node("expand_arc", expand_arc_node(self))
graph.add_node("checkpoint", checkpoint_node(self))
graph.add_node("finish", finish_node(self))
```

- 节点是阶段化认知动作
- 节点之间的跳转不是纯线性，而是条件路由

## **图是怎么连起来的**

真正的 agent 编排价值，在 _build_graph() 的边定义里。

```python
graph.add_edge(START, "load_runtime_context")
```

先从运行时恢复入口开始。

```python
graph.add_conditional_edges(
    "load_runtime_context",
    route_after_load,
    {
        "novel_context": "novel_context",
        "generate_draft": "generate_draft",
        "commit_chapter": "commit_chapter",
        "rewrite": "rewrite",
        "polish": "rewrite",
        "finish": "finish",
    },
)
```

```python
graph.add_conditional_edges(
    "load_runtime_context",
    route_after_load,
    {
        "novel_context": "novel_context",
        "generate_draft": "generate_draft",
        "commit_chapter": "commit_chapter",
        "rewrite": "rewrite",
        "polish": "rewrite",
        "finish": "finish",
    },
)
```

这里说明 load_runtime_context 后不一定总去 novel_context。如果是恢复流程，可能直接跳到：

- generate_draft
- commit_chapter
- rewrite
- finish

这就是典型的 状态驱动入口恢复

**再看中间主链：**

```python
graph.add_edge("novel_context", "plan_chapter")
graph.add_conditional_edges(
    "plan_chapter",
    route_after_plan,
    {
        "generate_draft": "generate_draft",
        "finish": "finish",
    },
)
graph.add_edge("generate_draft", "commit_chapter")
```

正常写作路径是：

- 先组上下文
- 再规划
- 再生成
- 再提交

**然后 commit_chapter 后进入复杂分支：**

```python
graph.add_conditional_edges(
    "commit_chapter",
    route_after_commit,
    {
        "review": "review",
        "rewrite": "rewrite",
        "polish": "rewrite",
        "arc_summary": "arc_summary",
        "volume_summary": "volume_summary",
        "expand_arc": "expand_arc",
        "checkpoint": "checkpoint",
        "finish": "finish",
    },
)
```

这就体现了 agent workflow 的关键点：

- 一个节点执行完，不只是“去下一个”
- 而是“根据结果进入不同后续动作”



## **每个节点的设计职责**：

nodes/core.py  【load_runtime_context】

```python
progress = runtime.store.progress.load()
pending = runtime.store.signals.load_pending_commit()
pending_checkpoint = runtime.store.signals.load_pending_checkpoint()
latest = runtime.store.checkpoints.latest_global()
```

这一步先从 store 里恢复运行状态。它关心的不是业务内容，而是运行控制信息：

- 当前进度
- 是否有未提交内容
- 是否有待确认 checkpoint
- 最近一个 checkpoint 在哪

然后根据情况决定入口动作，比如

```python
if pending_checkpoint is not None:
    ...
elif state.get("resume_mode"):
    if pending is not None:
        ...
    elif progress and progress.in_progress_chapter > 0:
        ...
```

最后把结果写回 graph state：

```python
state["current_chapter"] = current_chapter
state["progress_snapshot"] = {...}
state["pending_action"] = next_action
```

### novel_context

：**负责 加载小说上下文**

```python
def novel_context_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        chapter = int(state.get("current_chapter") or 1)
        progress = runtime.store.progress.load()
        context = runtime.runner.call_tool("novel_context", {"chapter": chapter})
        if progress and progress.flow in {FlowState.REWRITING, FlowState.POLISHING} and progress.pending_rewrites:
            context = runtime._build_rewrite_context(progress, context)
        state["context"] = context
        return state

    return _node
```

设计思路：

- 这不是“读全部历史”
- 而是“构造当前章节真正需要的工作记忆”

**plan_chapter**：是 规划节点 ：根据上下文和用户输入，调用 plan_chapter 工具制定本章写作计划，设置下一步为生成草稿。

代码在 nodes/core.py 

核心逻辑：

```python
def plan_chapter_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        #获取输入数据
        chapter = int(state.get("current_chapter") or 1)
        context = state.get("context") or {}
        seed_text = str(state.get("seed_text") or "")
        progress = runtime.store.progress.load()
        #判断模式（正常/重写/润色）
        if progress and progress.flow in {FlowState.REWRITING, FlowState.POLISHING} and progress.pending_rewrites:
            summary = f"调用 plan_chapter (rewrite ch{chapter})"
        else:
            summary = f"调用 plan_chapter (ch{chapter})"
        runtime.emit_event(Event(time=datetime.now(), category="TOOL", summary=summary, level="info"))
        plan_payload = runtime._build_dynamic_plan(seed_text, chapter, context)
        plan_res = runtime.runner.call_tool("plan_chapter", plan_payload)
        latest_plan = plan_res.get("plan") or plan_payload
        state["latest_plan"] = latest_plan
        state["pending_action"] = "generate_draft"
        return state

    return _node
```

设计思路：

- 先规划，再生成
- plan 是 draft 的约束器，不是装饰品

### **generate_draft**

代码在 nodes/core.py (line 144)。

核心逻辑：草稿生成节点 ，负责 调用 LLM 生成本章内容 。



```python
def generate_draft_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
    chapter = int(state.get("current_chapter") or 1)      # 当前章节
    client = runtime.build_client()                        # 创建 LLM 客户端
    context = state.get("context") or {}                   # 小说上下文
     plan = state.get("latest_plan") or {}                  # 章节计划
        contract = (plan.get("contract") or {}) if isinstance(plan, dict) else {}
        draft, word_count = runtime._generate_chapter_with_context(
            client=client,
            seed_text=str(state.get("seed_text") or ""),
            chapter=chapter,
            context=context,
            plan=plan,
            contract=contract,
        )
        state["latest_draft"] = draft
        _append_line(state, f"[tool] draft_generation -> word_count={word_count}")
        return state

    return _node
```

设计思路：

- 这是执行节点，不是裁判节点
- 它只负责在既定 context 和 plan 下生成草稿

### **commit_chapter**

代码在 nodes/core.py (line 161)。

核心逻辑：章节提交节点 ，负责 保存草稿、生成摘要、决定下一步动作 。

```python
def commit_chapter_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        client = runtime.build_client()
        chapter = int(state.get("current_chapter") or 1)
        draft = str(state.get("latest_draft") or "")
        #防御式编程 ：草稿为空直接报错
        if not draft:
            draft = runtime.store.drafts.load_draft(chapter)
        if not draft:
            raise RuntimeError(f"chapter {chapter} draft is empty")
            #提取元数据
        metadata = _extract_commit_metadata(client, chapter, draft)
        summary = str(metadata.get("summary", "") or runtime._summarize_chapter(client, chapter, draft))
        draft_res, commit_res = _run_write_commit_cycle(runtime.runner, runtime.emit_event, chapter, draft, summary, metadata)
        state["latest_commit_result"] = commit_res
        #. 记录日志
        _append_line(state, f"[tool] plan_chapter -> chapter={chapter}")
        _append_line(state, f"[tool] draft_chapter -> word_count={draft_res.get('word_count', 0)}")
        _append_line(state, f"[tool] commit_chapter -> next={commit_res.get('next_chapter', chapter + 1)}")
        plan = plan_post_commit(commit_res, chapter)
        if plan.hints:
            _append_line(state, "[hints] " + " | ".join(plan.hints))
            
            #设置下一步动作
        next_action = _enqueue_hint_actions(state, plan.actions)
        #_enqueue_hint_actions 辅助函数，用于 处理提示动作队列 ，决定下一步执行什么动作。
        state["pending_review_for"] = plan.pending_review_for
        state["pending_action"] = next_action if plan.next_action == next_action or next_action != "checkpoint" else plan.next_action
        return state

    return _node
```

```
generate_draft_node（生成草稿）
           │
           ▼
    commit_chapter_node（提交章节）← 当前节点
           │
           ├── 保存草稿
           ├── 生成摘要
           └── 决定下一步
                   │
           ┌───────┼───────┐
           ▼       ▼       ▼
        review  arc_summary  checkpoint
```

设计思路：

- commit 不是“保存一下文件”
- 它是把临时产出变成系统正式状态的事务提交点



### **review**

代码在 nodes/core.py 

核心逻辑：评审节点 ，负责 对完成的章节进行质量评审 。

```python

def review_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        chapter = int(state.get("pending_review_for") or 0)
        if chapter <= 0:
            state["pending_action"] = "checkpoint"
            return state
        client = runtime.build_client()
        #. 构建评审参数 生成评审请求的参数（payload
        review_payload = _generate_review_payload(client, runtime.runner, chapter)
        runtime.emit_event(Event(time=datetime.now(), category="TOOL", summary=f"调用 save_review (ch{chapter})", level="info"))
        #调用工具
        review_res = runtime.runner.call_tool("save_review", review_payload)
        state["latest_review_result"] = review_res
        _append_line(state, f"[tool] save_review -> final_verdict={review_res.get('final_verdict', '')}")
        plan = plan_review_followup(review_res)
        next_action = _enqueue_hint_actions(state, plan.actions) if plan.actions else plan.next_action
        state["pending_review_for"] = None
        state["pending_action"] = next_action
        return state

    return _node
```

### rewrite

代码在 nodes/core.py (line 201)。

核心逻辑：准备重写状态并跳转到上下文加载 。

```python
def rewrite_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        progress = runtime.store.progress.load()
        chapter = int(state.get("current_chapter") or 1)
        #确定重写模式- rewrite ：完全重写
        #polish ：润色优化
        #其他：从 state 获
        rewrite_mode = str(state.get("pending_action") or state.get("rewrite_mode") or "rewrite")
        if progress and progress.pending_rewrites:
            chapter = progress.pending_rewrites[0]
        state["current_chapter"] = chapter
        state["rewrite_mode"] = rewrite_mode
        _append_line(state, f"[rewrite] mode={rewrite_mode} chapter={chapter}")
        state["pending_action"] = "novel_context"
        return state

    return _node
```

### checkpoint

代码在 nodes/core.py 

设计思路：检查点/流程闸门节点 ，负责 决定工作流是继续、结束还是暂停等待用户 。

- 判断是否还有 pending action
- 判断是否已完成章节目标
- 判断是否被停止
- 决定继续还是 finish

所以 checkpoint 不只是“做个快照”，它其实是流程闸门。

对于长任务 agent，这是必要能力，因为它决定了：

- 是否分段执行
- 是否等待用户确认
- 是否从中断处继续

 

```python
def checkpoint_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        progress = runtime.store.progress.load()
        chapter = int(state.get("current_chapter") or 1)
        completed = list(progress.completed_chapters) if progress else []
        total = progress.total_chapters if progress else 0
        steps = len(completed)
        pending_actions = list(state.get("pending_actions") or [])
        #判断1：还有队列任务？
        if pending_actions:
            state["pending_action"] = pending_actions[0]
            return state
        #判断2：完成所有章节？
        if progress and total > 0 and chapter >= total and chapter in completed:
            state["pending_action"] = "finish"
            return state
        #判断3：超限或被中止？
        if steps >= MAX_STEPS or runtime._aborted:
            state["pending_action"] = "finish"
            return state
        next_chapter = progress.next_chapter() if progress else chapter + 1
        #判断4：每5章暂停（用户确认点）⭐
        if steps > 0 and steps % 5 == 0:
            pending = PendingRunCheckpoint(
                pause_after_chapter=max(completed) if completed else chapter,
                next_chapter=next_chapter,
                completed_count=steps,
            )
            runtime.store.signals.save_pending_checkpoint(pending)
            runtime.emit_checkpoint_pending(pending)
            state["current_chapter"] = next_chapter
            state["pending_action"] = "finish"
            return state
        state["current_chapter"] = next_chapter
        state["pending_action"] = "continue"
        return state

    return _node
```

```python
checkpoint_node
    │
    ├── pending_actions 不为空？
    │       └── 是 → pending_action = 队列[0] → 继续
    │
    ├── 完成所有章节？
    │       └── 是 → pending_action = "finish" → 结束
    │
    ├── 步数超限或被中止？
    │       └── 是 → pending_action = "finish" → 结束
    │
    ├── 完成5/10/15...章？
    │       └── 是 → 保存检查点 → 通知前端 → finish（暂停）
    │
    └── 默认 → pending_action = "continue" → 继续下一章
```



#### LangGraph 库提供的 API 方法 ，用于构建工作流图

##### 核心 API 列表
###### 1. 节点操作
`add_node(name, func)` 

添加节点 

`graph.add_node("plan_chapter", plan_chapter_node(self))`

###### 2. 边操作
`add_edge(start, end)` 

添加固定边

 `graph.add_edge("novel_context", "plan_chapter")`

------

 `add_conditional_edges(start, router, mapping)` 

添加条件边

 `graph.add_conditional_edges("commit_chapter", route_after_commit, {...})`

###### 3. 特殊节点
常量 用途 

START 图的起点 

END 图的终点

###### 4. 执行操作
API 用途 示例 

compile()  编译图为可执行对象 return graph.compile()

 invoke(state) 执行图（同步） result = self.graph.invoke(state)

 stream(state) 流式执行图（异步）

------

使用案例：

```python
# 1. 创建图
graph = StateGraph(GraphState)

# 2. 添加节点
graph.add_node("plan_chapter", plan_chapter_node(self))

# 3. 添加固定边（无条件跳转）
graph.add_edge(START, "load_runtime_context")
graph.add_edge("novel_context", "plan_chapter")
graph.add_edge("finish", END)

# 4. 添加条件边（根据状态动态跳转）
graph.add_conditional_edges(
    "commit_chapter",           # 起点
    route_after_commit,         # 路由函数
    {                           # 映射表
        "review": "review",
        "rewrite": "rewrite",
        "checkpoint": "checkpoint",
        "finish": "finish",
    },
)

# 5. 编译并执行
compiled_graph = graph.compile()
result = compiled_graph.invoke({"seed_text": "我的小说"})
```



# 上下文与记忆

不把长篇小说的历史正文反复塞给模型，而是把它提炼成对当前章节真正有用的结构化片段。

这就是为什么它能解决 prompt 膨胀问题，也解释了为什么压缩后还能保持连续性。

**1. 设计思路**

长篇写作里最容易失控的是这 4 类信息：

- 之前发生了什么
- 人物现在是什么状态
- 伏笔埋了哪些、回收了哪些
- 世界规则和当前章节目标是什么

如果每次都把前文全文塞回模型，会有 3 个问题：

- token 很快爆炸
- 重要信息被埋没在大量叙事文本里
- 模型更容易“记得细节但抓不住约束”

这个项目的做法是把上下文拆成两层：

**全量持久化层**
完整信息留在 store 里，供系统长期保存和恢复。

**当前工作记忆层**
只抽出本轮生成需要的摘要、约束、状态和近期变化，压成结构化包给模型。

也就是：

长期存储是原始世界状态，短期输入是压缩后的任务上下文。

这才是 agent 里真正的 memory engineering。

## novel_context.py数据收集层

核心职责 ：收集所有可能需要的前文信息  ----核心代码

```python
class NovelContextTool:
    def execute(self, args: dict[str, Any]) -> dict[str, Any]:
        chapter = int(args.get("chapter", 0) or 0)
        result: dict[str, Any] = {}
        
        # 1. 基础信息
        result["premise"] = self.store.outline.load_premise()  # 故事前提
        result["outline"] = self.store.outline.load_outline()  # 大纲
        result["characters"] = self.store.characters.load()     # 人物设定
        
        # 2. 章节相关（如果 chapter > 0）
        if chapter > 0:
            # 最近5章摘要
            result["recent_summaries"] = self.store.summaries.load_recent_summaries(chapter, 5)
            
            # 时间线事件（最近8章）
            result["timeline"] = self.store.world.load_timeline()
            
            # 活跃伏笔
            result["foreshadow_ledger"] = self.store.world.load_active_foreshadow()
            
            # 人物关系
            result["relationship_state"] = self.store.world.load_relationships()
            
            # 最新评审
            result["latest_review"] = self.store.world.load_review(latest)
        
        return result
```



完整版：**压缩素材来自哪里**

```python
class NovelContextTool:
    def __init__(self, store: Store, style: str = "default") -> None:
        self.store = store
        self.style = style
    def name(self) -> str:
        return "novel_context"

    def execute(self, args: dict[str, Any]) -> dict[str, Any]:
        chapter = int(args.get("chapter", 0) or 0)
        result: dict[str, Any] = {}
         # 加载提示词资源包
        bundle = load_bundle(self.style)
        # 加载当前进度（如果没有则创建空Progress）
        progress = self.store.progress.load() or Progress()
        #加载运行元数据（本次运行的配置）
        run_meta = self.store.run_meta.load()
        # 构建进度状态信息
        result["progress_status"] = {
            "phase": progress.phase,# 当前阶段
            "flow": progress.flow,# 当前流程状态
            "next_chapter": progress.next_chapter(),# 下一章编号
            "pending_rewrites": progress.pending_rewrites,# 待重写章节列表
            "rewrite_reason": progress.rewrite_reason,# 重写原因
        }

        premise = self.store.outline.load_premise()
        if premise:
            result["premise"] = premise
           # 从文件加载章节大纲
        outline = self.store.outline.load_outline()
        if outline:
            # asdict 函数：将 dataclass 对象转换为字典
            result["outline"] = [asdict(x) for x in outline]
            #加载 分层大纲 （长篇小说使用
        layered = self.store.outline.load_layered_outline()
        if layered:
            result["layered_outline"] = [asdict(x) for x in layered]
            # 指南针（Compass）文章的方向
        compass = self.store.outline.load_compass()
        if compass:
            result["compass"] = asdict(compass)
            #确定小说的 规划层级 （短篇/中篇/长篇
        explicit_tier = normalize_planning_tier(run_meta.planning_tier if run_meta else "")
        #设置或者自动判断
        result["planning_tier"] =  infer_planning_tier(
            progress,# 进度信息（获取总章节数）
            has_layered_outline=bool(layered),# 是否有分层大纲（True/False）
            has_compass=compass is not None,# 是否有指南针（True/False）
        )

        chars = self.store.characters.load()
        if chars:
            result["characters"] = [asdict(x) for x in chars]

        rules = self.store.world.load_world_rules()
        if rules:
            result["world_rules"] = [asdict(x) for x in rules]

        result["style_reference"] = style_text(self.style)

        '''
if chapter > 0:  ← 只有在写具体章节时才加载
    │
    ├── 写作参考（references）
    ├── 最近章节摘要（recent_summaries）     ← 核心！
    ├── 时间线（timeline）
    ├── 活跃伏笔（foreshadow_ledger）
    ├── 人物关系（relationship_state）
    ├── 状态变化（recent_state_changes）
    ├── 当前章节大纲（current_chapter_outline）
    └── 章节计划（chapter_plan）
'''4
        if chapter > 0:
            refs = writer_references(bundle, chapter)
            if refs:
                result["references"] = refs
            summaries = self.store.summaries.load_recent_summaries(chapter, 5)
            if summaries:
                result["recent_summaries"] = [asdict(x) for x in summaries]
            timeline = [x for x in self.store.world.load_timeline() if x.chapter < chapter and x.chapter >= max(chapter - 8, 1)]
            if timeline:
                result["timeline"] = [asdict(x) for x in timeline]
            foreshadow = self.store.world.load_active_foreshadow()
            if foreshadow:
                result["foreshadow_ledger"] = [asdict(x) for x in foreshadow]
            relationships = self.store.world.load_relationships()
            if relationships:
                result["relationship_state"] = [asdict(x) for x in relationships]
            state_changes = self.store.world.load_state_changes()
            if state_changes:
                result["recent_state_changes"] = [asdict(x) for x in state_changes[-50:]]
            entry = self.store.outline.get_chapter_outline(chapter)
            if entry:
                result["current_chapter_outline"] = asdict(entry)
            plan = self.store.drafts.load_chapter_plan(chapter)
            if plan:
                result["chapter_plan"] = asdict(plan)

            latest = progress.completed_chapters[-1] if progress.completed_chapters else 0
            if latest:
                review = self.store.world.load_review(latest)
                if review:
                    result["latest_review"] = asdict(review)

            if progress.current_volume > 0:
                arc_summaries = self.store.summaries.load_arc_summaries(progress.current_volume)
                if arc_summaries:
                    result["arc_summaries"] = [asdict(x) for x in arc_summaries]
            volume_summaries = self.store.summaries.load_all_volume_summaries()
            if volume_summaries:
                result["volume_summaries"] = [asdict(x) for x in volume_summaries]

            snapshots = self.store.world.load_latest_character_snapshots()
            if snapshots:
                result["character_snapshots"] = [asdict(x) for x in snapshots]
            style_rules = self.store.world.load_style_rules()
            if style_rules:
                result["style_rules"] = asdict(style_rules)

        if chapter <= 0:
            refs = architect_references(bundle)
            if refs:
                result["reference_pack"] = refs

        result["_loading_summary"] = f"chapter={chapter or 'none'} keys={len(result.keys())}"
        return result``
```

`[asdict(x) for x in outline]`等价于

```python
result_list = []
for x in outline:           # 遍历每个 OutlineEntry 对象
    dict_x = asdict(x)      # 转为字典
    result_list.append(dict_x)  # 添加到列表
```

这段已经把压缩策略说得很清楚了：

- 不读全部章节正文
- 读 最近摘要
- 读 局部时间线
- 读 活跃伏笔
- 读 关系状态
- 读 状态变化
- 读 当前章节大纲
- 读 最近 review



也就是说，系统优先喂给模型的是“被提炼过的状态对象”，不是全文。

这些对象的定义本身就是压缩设计的一部分，例如：

- TimelineEvent (line 5)
- ForeshadowEntry (line 12)
- RelationshipEntry (line 25)
- StateChange (line 32)
- OutlineEntry (line 5)
- Character (line 13)
- WorldRule (line 44)

这些结构把叙事文本抽象成“可检索、可拼接、可裁剪”的状态单元。

## 摘要生成层 - commit_chapter.py



```html
┌─────────────────────────────────────────────────────────┐
│                     前端 / API 层                        │
│              (frontend-web / internal_api)               │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Agent / 协调器                        │
│    (orchestrator / runner / LangGraphRuntime)           │
│         调用工具、编排流程、与 AI 大模型交互               │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                      工具层 (Tools)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ plan_chapter│  │draft_chapter│  │  commit_chapter │ │  ← 当前文件
│  │   (规划)     │  │   (起草)     │  │   (提交/保存)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │ save_review │  │ novel_context│  │   check_consistency│ │
│  │  (审核)      │  │  (上下文)    │  │    (一致性检查)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                      存储层 (Store)                      │
│     (progress / drafts / signals / world / checkpoints) │
└─────────────────────────────────────────────────────────┘
```

章节提交时，生成结构化摘要并保存

核心代码：



```python
class CommitChapterTool:
    def execute(self, args: dict[str, Any]) -> dict[str, Any]:
        chapter = int(args.get("chapter", 0) or 0)
        
        # 1. 保存章节原文
        self.store.drafts.save_final_chapter(chapter, content)
        
        # 2. 生成并保存章节摘要（核心！）
        summary = ChapterSummary(
            chapter=chapter,
            summary=summary_text,           # 章节内容摘要
            characters=characters,          # 出场人物
            key_events=key_events,          # 关键事件
        )
        self.store.summaries.save_summary(summary)
        
        # 3. 更新时间线
        timeline_events = [...]
        self.store.world.append_timeline_events(timeline_events)
        
        # 4. 更新伏笔状态
        foreshadow_updates = [...]
        self.store.world.update_foreshadow(chapter, foreshadow_updates)
        
        # 5. 更新人物关系
        relationship_changes = [...]
        self.store.world.update_relationships(relationship_changes)
        
        # 6. 更新状态变化
        state_changes = [...]
        self.store.world.appen d_state_changes(state_changes)
        
        return {"committed": True, ...}
```

全部代码：

```python
class CommitChapterTool:
    def __init__(self, store: Store) -> None:
        self.store = store

    def name(self) -> str:
        return "commit_chapter"

    def execute(self, args: dict[str, Any]) -> dict[str, Any]:
        chapter = int(args.get("chapter", 0) or 0)
        if chapter <= 0:
            raise ValueError("chapter must be > 0")

        if self.store.progress.is_chapter_completed(chapter):
            pending = self.store.signals.load_pending_commit()
            if pending is not None and pending.chapter == chapter:
                self.store.signals.clear_pending_commit()

            progress = self.store.progress.load()
            #检查当前是否处于"重写"或"打磨"流程，且该章节在待重写列表中
            if progress and progress.flow in {"rewriting", "polishing"} and chapter in progress.pending_rewrites:
                self.store.progress.complete_rewrite(chapter)
                return {
                    "chapter": chapter,
                    "skipped": True,
                    "reason": f"第 {chapter} 章已完成，标记为重写/打磨完成",
                    "next_step": "已退出该章节重写队列，请继续下一章",
                }

            return {
                "chapter": chapter,
                "skipped": True,
                "reason": f"第 {chapter} 章已提交完成，无需重复提交",
                "next_step": "该章节已完成，请继续写下一章",
            }

        existing_pending = self.store.signals.load_pending_commit()
        if existing_pending is not None and existing_pending.chapter != chapter:
            raise ValueError(
                f"存在未恢复的章节提交：第 {existing_pending.chapter} 章（阶段 {existing_pending.stage}），请先恢复或重新提交该章"
            )
#如果用户尝试提交一个空章节，系统会报错阻止。
        content, word_count = self.store.drafts.load_chapter_content(chapter)
        if not content:
            raise ValueError(f"no content found for chapter {chapter}")

        summary_text = str(args.get("summary", "") or "").strip()
        if not summary_text:
            raise ValueError("summary is required")
            
            #创建并保存章节提交记录
        now = datetime.now(timezone.utc).isoformat()
        pending = PendingCommit(
            chapter=chapter,
            stage=CommitStage.STARTED,
            summary=summary_text,
            hook_type=str(args.get("hook_type", "") or ""),
            dominant_strand=str(args.get("dominant_strand", "") or ""),
            started_at=now,
            updated_at=now,
        )
        self.store.signals.save_pending_commit(pending)

        self.store.drafts.save_final_chapter(chapter, content)
        

        summary = ChapterSummary(
            chapter=chapter,
            summary=summary_text,
            characters=[str(x) for x in (args.get("characters") or [])],
            key_events=[str(x) for x in (args.get("key_events") or [])],
        )
        self.store.summaries.save_summary(summary)
          #世界线
        timeline_events = [
            parse_timeline_event(x, chapter_fallback=chapter)
            for x in (args.get("timeline_events") or [])
            if isinstance(x, dict)
        ]
        if timeline_events:
            for e in timeline_events:
                e.chapter = chapter
            self.store.world.append_timeline_events(timeline_events)

        foreshadow_updates = [
            parse_foreshadow_update(x)
            for x in (args.get("foreshadow_updates") or [])
            if isinstance(x, dict)
        ]
        foreshadow_updates = [
            x
            for x in foreshadow_updates
            if x.id and x.action in {"plant", "advance", "resolve"} and (x.action != "plant" or bool(x.description))
        ]
        if foreshadow_updates:
            self.store.world.update_foreshadow(chapter, foreshadow_updates)

        relationship_changes = [
            parse_relationship_entry(x, chapter_fallback=chapter)
            for x in (args.get("relationship_changes") or [])
            if isinstance(x, dict)
        ]
        relationship_changes = [x for x in relationship_changes if x.character_a and x.character_b and x.relation]
        if relationship_changes:
            for e in relationship_changes:
                e.chapter = chapter
            self.store.world.update_relationships(relationship_changes)

        state_changes = [
            parse_state_change(x, chapter_fallback=chapter)
            for x in (args.get("state_changes") or [])
            if isinstance(x, dict)
        ]
        if state_changes:
            for s in state_changes:
                s.chapter = chapter
            self.store.world.append_state_changes(state_changes)
   #标记章节完成并记录元数据
        pending.stage = CommitStage.STATE_APPLIED
        pending.updated_at = datetime.now(timezone.utc).isoformat()
        self.store.signals.save_pending_commit(pending)

        hook_type = str(args.get("hook_type", "") or "")
        dominant_strand = str(args.get("dominant_strand", "") or "")
        self.store.progress.mark_chapter_complete(
            chapter=chapter,
            word_count=word_count,
            hook_type=hook_type,
            dominant_strand=dominant_strand,
        )
        #更新提交阶段并初始化审核相关变量   PROGRESS_MARKED(阶段)  进度标记完成
        
        """
        提交流程的最后几步：

        1. 更新 pending 状态为'PROGRESS_MARKED'
        2. 处理可能的大纲反馈（偏差和建议）
        3. 打包所有信息成 CommitResult 返回
        告诉调用方：这章提交成功了，字数多少，下一章写第几章。
        """
        pending.stage = CommitStage.PROGRESS_MARKED
        pending.updated_at = datetime.now(timezone.utc).isoformat()

        progress = self.store.progress.load()
        review_required = False
        review_reason = ""
        #处理大纲反馈 允许用户/AI 提供对大纲的反馈，用于后续调整。
        feedback_raw = args.get("feedback")
        feedback = None
        if isinstance(feedback_raw, dict):
            dev = str(feedback_raw.get("deviation", "") or "")
            sug = str(feedback_raw.get("suggestion", "") or "")
            if dev or sug:
                feedback = OutlineFeedback(deviation=dev, suggestion=sug)

        result = CommitResult(
            chapter=chapter,
            committed=True,
            word_count=word_count,
            next_chapter=chapter + 1,
            review_required=review_required,
            review_reason=review_reason,
            hook_type=hook_type,
            dominant_strand=dominant_strand,
        )
        #生成系统提示信息（hints）
        hints: list[str] = []
            # 情况1：大纲偏离反馈
        if feedback and feedback.deviation:
            hints.append(
                f"[系统] writer_feedback: Writer 在第 {chapter} 章发现大纲偏离。偏离：{feedback.deviation}。建议：{feedback.suggestion}。"
            )
            # 情况2：重写/打磨模式
        if progress and progress.flow in {"rewriting", "polishing"}:
            verb = "打磨" if progress.flow == "polishing" else "重写"
            remaining = [x for x in progress.pending_rewrites if x != chapter]
            self.store.progress.complete_rewrite(chapter)
            if remaining:
                hints.append(f"[系统] {verb}完成: 第 {chapter} 章已完成{verb}。剩余待处理章节: {remaining}。")
            else:
                hints.append(f"[系统] {verb}全部完成: 第 {chapter} 章已完成{verb}，继续写第 {chapter + 1} 章。")
        else:
            if progress and progress.total_chapters > 0:
                hints.append(
                    f"[系统] continue: 第 {chapter} 章提交成功（{word_count} 字）。请继续写第 {chapter + 1} 章（共 {progress.total_chapters} 章）。"
                )
            else:
                hints.append(
                    f"[系统] continue: 第 {chapter} 章提交成功（{word_count} 字）。请继续写第 {chapter + 1} 章。"
                )

        result.system_hints = hints

        payload = asdict(result)
        if feedback:
            payload["feedback"] = asdict(feedback)

        pending.result = payload
        pending.stage = CommitStage.SIGNAL_SAVED
        pending.updated_at = datetime.now(timezone.utc).isoformat()
        self.store.signals.save_pending_commit(pending)
        self.store.signals.save_last_commit(payload)

        self.store.progress.clear_in_progress() # 清除"进行中"标记
        self.store.signals.clear_pending_commit()# 清除 pending 记录

        self.store.checkpoints.append(
            chapter_scope(chapter),
            "commit",
            artifact=f"chapters/ch{chapter:02d}.md",
        )
        return payload
```

## 上下文压缩层 - context_manager.py

将大量上下文信息压缩成适合 LLM 的格式，**真正做压缩的是 ContextManager**

它的职责不是取数据，而是把 novel_context 返回的大对象进一步压缩成适合写作模型输入的 ContextPack。

它的职责不是取数据，而是把 novel_context 返回的大对象进一步压缩成适合写作模型输入的 ContextPack。

先看返回结构：

```python
@dataclass
class ContextPack:
    summary_block: str = ""
    restore_block: str = ""
    compacted_keys: list[str] = field(default_factory=list)
```

这里已经体现了两层压缩结果：

- summary_block
  面向当前章节的核心摘要块
- restore_block
  用于恢复风格、伏笔、近期经验的轻量补充块

再看 build_writer_pack() 的核心逻辑：

```python
premise = str(context.get("premise", "") or "").strip()
characters = [...]
world_rules = [...]
outline = context.get("current_chapter_outline") or {}
chapter_plan = context.get("chapter_plan") or {}
```

它只挑几类最高价值信息做摘要：

- premise
- 主要角色
- 世界规则
- 当前章节大纲
- 当前章节计划

然后组装成 summary_lines：

```python
summary_lines.append("[premise] ...")
summary_lines.append("[characters] ...")
summary_lines.append("[world_rules] ...")
summary_lines.append("[current_chapter_outline] ...")
summary_lines.append("[chapter_plan] ...")
```

这一步的本质是：

从“大而全上下文”收缩成“本轮任务约束摘要”。

你会注意到这里有明显裁剪：

```python
premise[:300]
characters[:8]
world_rules[:8]
```

### **restore_block 为什么重要**

很多人只想到“摘要”，但这里还做了一个很有 agent 味道的设计：恢复包。

看 WriterRestorePack (line 14)。

它抽取的是 4 类“持续约束”：

```
recent_summaries style_rules foreshadow review_lessons
```

刷新逻辑在 refresh()：

```python
self.recent_summaries = ...[:4] 
self.style_rules = ...[:5] 
self.foreshadow = ...[:6] 
self.review_lessons = ...[:4]
```

这说明它不是给模型全量知识，而是给模型一组高价值“恢复提示”：

- 最近几章摘要
- 当前文风规则
- 未回收伏笔
- 最近 review 暴露出的常见问题

然后 build_text() 把这些拼成轻量文本块。

这层设计非常好，因为它保留了连续写作最重要的软约束，但避免把大量无关内容重新塞回 prompt。

你可以把它理解成：

summary_block 负责事实压缩，restore_block 负责写作惯性恢复。





```python


@dataclass
class ContextSnapshot:
    scope: str = ""              # 上下文范围（如 "chapter:5"）
    strategy: str = ""           # 使用的策略（如 "sliding", "summarize"）
    active_messages: int = 0     # 当前活跃消息数
    summary_messages: int = 0    # 摘要消息数
    compacted_count: int = 0     # 被压缩的消息数
    kept_count: int = 0          # 保留的消息数

@dataclass
class WriterRestorePack:
    recent_summaries: list[str] = field(default_factory=list)
    style_rules: list[str] = field(default_factory=list)
    foreshadow: list[str] = field(default_factory=list)#伏笔信息
    review_lessons: list[str] = field(default_factory=list)
        #用于 从上下文数据刷新恢复包内容 ：
    def refresh(self, context: dict[str, Any]) -> None:
        self.recent_summaries = [
            str(item.get("summary", "") or "")
            for item in (context.get("recent_summaries") or [])
            if isinstance(item, dict) and str(item.get("summary", "") or "").strip()
        ][:4]
        
        style = context.get("style_rules") or {}
        self.style_rules = [str(x) for x in (style.get("prose") or []) if str(x).strip()][:5]
        #处理 伏笔信息
        self.foreshadow = [
            f"{item.get('id', '')}:{item.get('description', '')}"
            for item in (context.get("foreshadow_ledger") or [])
            if isinstance(item, dict)
        ][:6]
        
        latest_review = context.get("latest_review") or {}
        self.review_lessons = [
            str(issue.get("description", "") or "")
            for issue in (latest_review.get("issues") or [])
            if isinstance(issue, dict) and str(issue.get("description", "") or "").strip()
        ][:4]

    def build_text(self) -> str:
        parts: list[str] = []
        if self.recent_summaries:
            parts.append("[最近章节摘要]\n" + "\n".join(f"- {x}" for x in self.recent_summaries))
        if self.style_rules:
            parts.append("[风格规则]\n" + "\n".join(f"- {x}" for x in self.style_rules))
        if self.foreshadow:
            parts.append("[活跃伏笔]\n" + "\n".join(f"- {x}" for x in self.foreshadow))
        if self.review_lessons:
            parts.append("[最近评审提醒]\n" + "\n".join(f"- {x}" for x in self.review_lessons))
        return "\n\n".join(parts).strip()

#用于 打包上下文信息 ：
@dataclass
class ContextPack:
    summary_block: str = ""                              # 摘要块
    restore_block: str = ""                              # 恢复块
    compacted_keys: list[str] = field(default_factory=list)  # 被压缩的键

#这是 ContextManager 类，用于 管理和构建 AI 写作所需的上下文 。
@dataclass
class ContextManager:
    context_window: int = 128000      # LLM 窗口大小
    reserve_tokens: int = 32000       # 预留 token（给输出）
    keep_recent_tokens: int = 30000   # 保留给最近内容的 token
    snapshots: list[ContextSnapshot] = field(default_factory=list)#维护上下文快照的历史记录列表
    restore: WriterRestorePack = field(default_factory=WriterRestorePack)#存储用于写作恢复/还原的上下文信息包
        #记录一个上下文快照。
    def record(self, snapshot: ContextSnapshot) -> None:
        self.snapshots.append(snapshot)
        #获取最新的上下文快照
    def latest(self) -> ContextSnapshot | None:
        if not self.snapshots:
            return None
        return self.snapshots[-1]

    def build_writer_pack(self, context: dict[str, Any]) -> ContextPack:
                """
        构建写作者上下文包
        将大量原始数据压缩成结构化的文本
        """
        # 1. 刷新恢复包（从原始数据中提取关键信息）
        self.restore.refresh(context)
         # 2. 构建摘要块（核心信息）
        summary_lines: list[str] = []
        compacted: list[str] = [] #记录哪些字段被"压缩"或"精简"处理过
          # 故事前提（压缩到300字）
        premise = str(context.get("premise", "") or "").strip()
        if premise:
            summary_lines.append("[故事前提]\n" + premise[:300])
            compacted.append("premise")
             # 主要人物（最多8个）
        characters = [
            item for item in (context.get("characters") or [])
            if isinstance(item, dict) and str(item.get("name", "") or "").strip()
        ][:8]
        if characters:
            summary_lines.append(
                "[主要人物]\n" + "\n".join(
                    f"- {item.get('name', '')} / {item.get('role', '')}: {item.get('description', '')}" for item in characters
                )
            )
            compacted.append("characters")
            # 世界规则（最多8条）
        world_rules = [
            item for item in (context.get("world_rules") or [])
            if isinstance(item, dict) and str(item.get("rule", "") or "").strip()
        ][:8]
        if world_rules:
            summary_lines.append(
                "[世界规则]\n" + "\n".join(
                    f"- {item.get('category', '')}: {item.get('rule', '')} {item.get('boundary', '')}".strip() for item in world_rules
                )
            )
            compacted.append("world_rules")=
            # 当前章节大纲
        outline = context.get("current_chapter_outline") or {}
        if outline:
            summary_lines.append(
                "[当前章节大纲]\n"
                + f"标题：{outline.get('title', '')}\n"
                + f"核心事件：{outline.get('core_event', '')}\n"
                + f"钩子：{outline.get('hook', '')}"
            )
            compacted.append("current_chapter_outline")
            # 章节计划
        chapter_plan = context.get("chapter_plan") or {}
        if chapter_plan:
            contract = chapter_plan.get("contract") or {}
            summary_lines.append(
                "[章节计划]\n"
                + f"目标：{chapter_plan.get('goal', '')}\n"
                + f"冲突：{chapter_plan.get('conflict', '')}\n"
                + f"必达推进：{', '.join(contract.get('required_beats') or [])}\n"
                + f"禁止项：{', '.join(contract.get('forbidden_moves') or [])}"
            )
            compacted.append("chapter_plan")

        summary_block = "\n\n".join(summary_lines).strip()
        # 3. 构建恢复块（写作者需要记住的）
        restore_block = self.restore.build_text()
        return ContextPack(summary_block=summary_block, restore_block=restore_block, compacted_keys=compacted)

```





### **压缩结果在哪里真正喂给模型**

这条链最后在 ainovel_py/agents/runner.py附近接入生成阶段。

核心代码：

```python
pack = self.context_manager.build_writer_pack(context)
```

然后在生成 prompt 时，只把压缩后的结构化块放进去：

```python
{pack.summary_block or ''}
... 
{pack.restore_block or ''}
```

同时再补少量高价值局部项，例如：

```python
recent = "\n".join(...)
review_focus = "\n".join(...)
rewrite_focus = "\n".join(...)
foreshadow = "\n".join(...)
character_lines = "\n".join(...)
world_rule_lines = "\n".join(...)
```

这说明系统不是“把 whole context dump 给模型”，而是：

1. 先由 NovelContextTool 聚合结构化上下文
2. 再由 ContextManager 做二次压缩
3. 最后只把压缩块和少量当前强相关字段送进 writer prompt

这就是完整压缩链路。

# 一致性检查与评审

## **一致性检查的入口**

核心代码：

```python
content, word_count = self.store.drafts.load_chapter_content(chapter)
...
rules = self.store.world.load_world_rules()
foreshadow = self.store.world.load_active_foreshadow()
relationships = self.store.world.load_relationships()
chars = self.store.characters.load()
summaries = self.store.summaries.load_recent_summaries(chapter, 2)
```

它会把这些上下文拼成一个结构化检查包：

- 当前章节草稿
- 世界规则
- 活跃伏笔
- 人物关系
- 别名映射
- 最近两章摘要

最后打一个 checkpoint：

```
self.store.checkpoints.append(chapter_scope(chapter), "consistency_check")
```

这里的重点不是“它判断了什么”，而是：

它先把一致性判断所需的事实材料准备好，并显式记录自己经过了 consistency_check 阶段。

这一步体现的是 agent 的 事实收集式检查，不是纯 prompt 瞎审

## 这个检查步骤在执行链里哪里触发

在当前实现里，它是在写作提交链里被显式调用的。关键代码在 ainovel_py/agents/runner.py 一段：

```python
draft_res = runner.call_tool("draft_chapter", {"chapter": chapter, "content": draft, "mode": "write"})

emit_event(... "check_consistency")
runner.call_tool("check_consistency", {"chapter": chapter})

emit_event(... "commit_chapter")
commit_res = runner.call_tool("commit_chapter", {...})
```

执行顺序是：

draft_chapter -> check_consistency -> commit_chapter

这一点很关键，因为它说明：

- 草稿不是一生成就算通过
- 提交前必须经过一致性检查阶段
- 检查过程也进入 checkpoint 和 event 流

虽然在 LangGraph 图里它没有被单独画成独立 node，但在实际执行链上它是独立步骤。

##  **review 是怎么做的**

review 不是简单返回一个“通过/不通过”，而是生成结构化评审结果。

核心生成逻辑在 ainovel_py/agents/runner.py 

这里 _generate_review_payload(...) 会先拿两类输入：

```python
context = runner.call_tool("novel_context", {"chapter": chapter})
draft_read = runner.call_tool("read_chapter", {"chapter": chapter, "source": "draft"})
```

也就是：

- 当前章节的结构化上下文
- 当前草稿正文

然后要求模型输出结构化 review JSON，字段包括：

```python
chapter, scope, dimensions, issues, contract_status, contract_misses,
contract_notes, verdict, summary, affected_chapters
```

这里的 dimensions 很重要，它不是泛泛而谈，而是明确分成 7 个评估维度：

- consistency
- character
- pacing
- continuity
- foreshadow
- hook
- aesthetic

对应的数据结构定义在 ainovel_py/domain/review.py (line 49) 和 ainovel_py/domain/review.py (line 66)：

```python
class ConsistencyIssue:
    type: str
    severity: str
    description: str
    evidence: str = ""
    suggestion: str = ""
```

```python
class ReviewEntry:
    chapter: int
    scope: str
    issues: list[ConsistencyIssue]
    verdict: str
    summary: str
    dimensions: list[DimensionScore]
    contract_status: str = ""
    ...
```

这说明 review 结果不是自由文本，而是 结构化问题列表 + 评分卡 + 判决。

## **SaveReviewTool 为什么是关键**

真正把 review 变成可执行动作的是 ainovel_py/tools/save_review.py 

这个工具做了 4 件很工程化的事。

第一，校验 review 的合法性：

```python
self._validate_review_entry(review)
self._validate_dimensions(review)
```

也就是说，评审结果不是模型说了算，系统会检查：

- chapter 是否有效
- scope 是否存在
- summary 是否为空
- rewrite/polish 时是否给了 affected_chapters
- 每个维度是否完整
- 分数和 verdict 是否一致

第二，保存 review：

```
self.store.world.save_review(review) self.store.signals.save_last_review(asdict(review))
```

第三，做“升级判决”。

即使模型给了 accept，系统也可能因为 contract miss 或关键维度过低，自动升级成 polish 或 rewrite：

```python
if review.verdict == "accept":
    if review.contract_status == "missed":
        final_verdict = "rewrite"
    elif review.contract_status == "partial":
        final_verdict = "polish"
    ...
    gate = self._evaluate_scorecard_gate(review)
```

而 _evaluate_scorecard_gate() 会对关键维度做硬门控：

```
_CRITICAL_DIMENSIONS = {"consistency", "character", "continuity"}
```

如果这些维度 fail，直接改判成 rewrite。

这一步很重要，因为它说明系统不是“让 LLM 自我感觉良好”，而是用规则约束 LLM 的判决。

第四，真正触发 rewrite 状态。

```python
self.store.progress.set_pending_rewrites(affected, review.summary) self.store.progress.set_flow(flow)
```

这里把需要重写的章节写进进度状态，并记录 rewrite_reason。

这意味着 review 不是报告系统，而是 状态驱动器。

##  **rewrite 是怎么回流到主链的**

rewrite 状态保存在 progress 里，相关字段在 ainovel_py/store/progress.py (line 104)：

```python
    def set_pending_rewrites(self, chapters: list[int], reason: str) -> None:
        def op() -> None:
            p = self.load() or Progress()
            p.pending_rewrites = list(chapters)
            p.rewrite_reason = reason
            self.save(p)

        self.io.with_write_lock(op)
```

完成重写后会清掉：

```python
    def complete_rewrite(self, chapter: int) -> None:
        def op() -> None:
            p = self.load() or Progress()
            p.pending_rewrites = [x for x in p.pending_rewrites if x != chapter]
            if not p.pending_rewrites:
                validate_flow_transition(p.flow, FlowState.WRITING)
                p.flow = FlowState.WRITING
                p.rewrite_reason = ""
            self.save(p)

        self.io.with_write_lock(op)
```

然后在 LangGraph 节点里，系统会优先识别 rewrite 状态。
看 `ainovel_py/agents/orchestrator/langgraph/nodes/core.py (line 67)` 和 `ainovel_py/agents/orchestrator/langgraph/nodes/core.py (line 228)`：

- 如果当前 flow 是 REWRITING 或 POLISHING
- 并且有 pending_rewrites
- 就把 current_chapter 重定位到待重写章节
- 然后重新回到 novel_context

这说明 rewrite 不是孤立动作，而是：

review 改状态 -> graph 识别状态 -> 流程回流到写作链

这才是 agent 的反思闭环。

## 当前 LangGraph 图里 review/rewrite 怎么接

在 LangGraph 节点实现里，review 节点在 ainovel_py/agents/orchestrator/langgraph/nodes/core.py 左右。

它会：

```python
def review_node(runtime: "LangGraphRuntime") -> Callable[[GraphState], GraphState]:
    def _node(state: GraphState) -> GraphState:
        chapter = int(state.get("pending_review_for") or 0)
        if chapter <= 0:
            state["pending_action"] = "checkpoint"
            return state
        client = runtime.build_client()
        review_payload = _generate_review_payload(client, runtime.runner, chapter)
        runtime.emit_event(Event(time=datetime.now(), category="TOOL", summary=f"调用 save_review (ch{chapter})", level="info"))
        review_res = runtime.runner.call_tool("save_review", review_payload)
        state["latest_review_result"] = review_res
        _append_line(state, f"[tool] save_review -> final_verdict={review_res.get('final_verdict', '')}")
        plan = plan_review_followup(review_res)
        next_action = _enqueue_hint_actions(state, plan.actions) if plan.actions else plan.next_action
        state["pending_review_for"] = None
        state["pending_action"] = next_action
        return state

    return _node
```

而 rewrite 节点只是设置重写模式并把流程送回去

```
state["current_chapter"] = chapter
state["rewrite_mode"] = rewrite_mode
state["pending_action"] = "novel_context"
```

所以图层面的闭环是：

commit/review -> save_review -> pending_rewrites -> rewrite -> novel_context -> plan -> draft -> consistency -> commit

用 check_consistency 收集证据，用 review 结构化裁决，用 save_review 把裁决转成运行时状态，再用 rewrite 把问题章节送回主流程重做。

# 断点恢复与持久化架构

设计完整的运行时状态持久化方案，涵盖进度快照、检查点序列、待处理队列和章节草稿;支持服务中断后的精确恢复

## **1. 设计思路**

一个长任务 agent 真正需要恢复的，不只是“写到第几章”，而是下面 5 类状态：

- 进度快照
  当前章节、已完成章节、总字数、当前 flow、是否在 rewrite
- 检查点序列
  最近执行到哪个步骤，例如 plan、draft、consistency_check、review
- 待处理任务队列
  当前 run 还有哪些 start/resume/continue 任务没做完
- 中间信号
  是否有 pending commit、pending checkpoint、last review
- 章节产物
  草稿、正式章节、摘要、世界状态变化

恢复 = 找回运行上下文 + 定位最后稳定步骤 + 继续往下执行

## **2. 持久化容器总入口**

统一入口在 ainovel_py/store/store.py (line 1)。

Store 把不同类型的状态分开管理：

```python
self.progress = ProgressStore(IO(directory))
self.run_meta = RunMetaStore(IO(directory))
self.runtime = RuntimeStore(IO(directory))
self.outline = OutlineStore(IO(directory))
self.characters = CharacterStore(IO(directory))
self.drafts = DraftStore(IO(directory))
self.summaries = SummaryStore(IO(directory))
self.world = WorldStore(IO(directory))
self.signals = SignalStore(IO(directory))
self.checkpoints = CheckpointStore(IO(directory))
```

- progress 管运行进度
- runtime 管事件队列
- signals 管恢复信号
- checkpoints 管步骤序列
- drafts/summaries/world 管业务产物

这让恢复时可以精确判断，而不是粗暴重放。

## **3. 进度快照怎么存**

进度快照在 ainovel_py/store/progress.py (line 1)。

它实际落在：

meta/progress.json

这个对象保存了恢复最关键的运行态，例如：

- phase
- current_chapter
- completed_chapters
- in_progress_chapter
- flow
- pending_rewrites
- rewrite_reason
- total_word_count
- current_volume/current_arc

例如待重写状态就是这样进入的：

```python
def set_pending_rewrites(self, chapters: list[int], reason: str) -> None:
    p.pending_rewrites = list(chapters)
    p.rewrite_reason = reason
```

完成重写后会回收：

```python
def complete_rewrite(self, chapter: int) -> None:
    p.pending_rewrites = [x for x in p.pending_rewrites if x != chapter]
```

这说明 progress 不只是统计信息，而是恢复决策依据。

## **4. 检查点序列怎么存**

检查点在 ainovel_py/store/checkpoints.py (line 1)。

它落在：

meta/checkpoints.jsonl

每次 append 一个检查点：

```python
cp = Checkpoint(
    seq=self._next_seq,
    scope=scope,
    step=step,
    artifact=artifact,
    digest=digest,
    occurred_at=datetime.utcnow(),
)
```

你可以把 checkpoint 理解成 agent 的“执行足迹”。

例如一致性检查时就会记录：

```
self.store.checkpoints.append(chapter_scope(chapter), "consistency_check")
```

这个机制的价值在于，恢复时系统不必猜“上次做到哪”，而是可以明确知道：

- 这个 chapter 最近的 step 是 plan
- 还是 draft
- 还是 consistency_check
- 还是 review

这就把恢复从“模糊回溯”变成“精确定位”。

## **5. 事件流和回放队列怎么存**

运行事件队列在 ainovel_py/store/runtime.py (line 1)。runtime.py 是 运行时队列管理器 ，负责管理 异步任务队列 。

落在：

meta/runtime/queue.jsonl

每个运行事件 append 时都会分配 seq：

```python
    def append_queue(self, item: RuntimeQueueItem) -> RuntimeQueueItem:
        def op() -> RuntimeQueueItem:
            self._ensure_seq_loaded_locked()
            self._next_seq += 1
            item.seq = self._next_seq
            if not item.time:
                item.time = datetime.utcnow()
            payload = asdict(item)
            payload["time"] = item.time.isoformat()
            self.io.append_line(RUNTIME_QUEUE_PATH, (json.dumps(payload, ensure_ascii=False) + "\n").encode("utf-8"))
            return item

        return self.io.with_write_lock(op)
```

然后可以通过：

```
load_queue_after(after_seq)
```

增量回放。

这层的作用有两个：

- 给前端/SSE 提供可观测事件流
- 给恢复和排障提供完整执行轨迹

所以这不是附属日志，而是运行时的一部分

**任务入队方法（ append_queue ）的存在是为了实现 异步任务调度 和 系统解耦 。**

**没有任务队列会怎样？**

```
同步调用：
    用户点击 → 等待AI生成 → 页面卡住10分钟 → 完成
    
问题：
    1. 用户体验差（页面卡住）
    2. 系统耦合（前后端强绑定）
    3. 无法扩展（只能单线程）
    4. 容易丢失（崩溃后不知道做到哪）
```





## **6. 中间信号怎么存**

恢复时最关键的一组短期状态在 ainovel_py/store/signals.py (line 1)。

这里维护了：

- meta/last_commit.json
- meta/pending_commit.json
- meta/pending_checkpoint.json
- meta/last_review.json

例如：

```python
def save_pending_commit(self, pending: PendingCommit) -> None
def load_pending_commit(self) -> PendingCommit | None
```

```python
def save_pending_checkpoint(self, pending: PendingRunCheckpoint) -> None
def load_pending_checkpoint(self) -> PendingRunCheckpoint | None
```

这些信号的意义是：

- 上次是不是刚写完 draft，还没 commit
- 是不是卡在用户确认 checkpoint
- 最近一次 review 是什么
- 最近一次 commit 结果是什么

它们让系统能识别“半完成状态”，而不是只知道“做完了/没做完”。

## **7. 任务队列怎么持久化**

除了 run 内部状态，这个项目连外部任务队列也做了持久化。

入口在 ainovel_py/internal_api/persistence.py (line 1)。

有两个存储：

- RunRegistryStore
  持久化 run session 元数据
- RunTaskStore
  持久化待执行任务

```python
class RunTaskStore:
    def __init__(self, path: str) -> None:
        self.io = IO(".")
        self.path = path

    def load(self) -> List[Dict[str, Any]]:
        try:
            data = self.io.read_json(self.path)
        except FileNotFoundError:
            return []
        return data if isinstance(data, list) else []

    def save(self, rows: List[Dict[str, Any]]) -> None:
        self.io.write_json(self.path, rows)

    def upsert(self, row: Dict[str, Any]) -> None:
        rows = self.load()
        replaced = False
        for idx, existing in enumerate(rows):
            if str(existing.get("task_id", "")) == str(row.get("task_id", "")):
                rows[idx] = row
                replaced = True
                break
        if not replaced:
            rows.append(row)
        self.save(rows)
```

RunTaskStore 保存的是：

```python
{
    "task_id": task.task_id,
    "run_id": task.run_id,
    "op": task.op,
    "payload": task.payload,
    "status": task.status,
    ...
}
```

也就是说，即使服务重启，排队中的 start/resume/continue 任务仍然能恢复出来。

这一步非常关键，因为如果只恢复业务状态、不恢复任务队列，系统还是会丢执行意图。

## **8. 服务重启后怎么恢复 run/session**

恢复入口在 ainovel_py/internal_api/registry.py (line 1) 的 restore()。

它会先从持久化 store 中重建 RunSession：

- 读取 cfg
- 重建 Host
- 恢复每个 run_id 对应的 session

然后恢复 tasks：

- 加载所有 task
- 如果 task 之前是 running，重启后强制变回 queued

这一点很专业，因为进程中断后不可能信任“running 任务还在跑”，必须重新入队。

所以这里的恢复策略是：

session 恢复对象状态，task 恢复调度意图。

## **9. Host 层怎么做恢复提示**

恢复提示逻辑在 ainovel_py/host/resume.py (line 1)。

它会根据持久化状态判断当前恢复类型，比如：

- 有 pending_checkpoint
- 有 pending_commit
- 有 pending_rewrites
- 有 in_progress_chapter
- 最近 checkpoint step 是 plan / draft / consistency_check

也就是说，系统不仅能恢复，还能解释“自己为什么从这里恢复”。

这是非常典型的 agent 设计：

恢复不仅要正确，还要可解释。

## **10. LangGraph 是怎么根据持久化状态恢复的**

真正把这些状态转回 graph 执行入口的是 ainovel_py/agents/orchestrator/langgraph/nodes/core.py (line 47) 的 load_runtime_context。

它会先读：

```python
progress = runtime.store.progress.load() pending = runtime.store.signals.load_pending_commit() pending_checkpoint = runtime.store.signals.load_pending_checkpoint() latest = runtime.store.checkpoints.latest_global()
```

然后根据状态判断该从哪里接上：

- 如果有 pending_checkpoint，进入确认等待或继续下一章

- 如果是 resume_mode 且有 pending_commit，直接跳到 commit_chapter

- 如果 

  in_progress_chapter > ，再结合最近 checkpoint step 决定去：

  - generate_draft
  - commit_chapter
  - novel_context

- 如果有 pending_rewrites，进入 rewrite 链

这说明恢复不是“重新 start”，而是：根据持久化状态把 graph 路由到正确节点。

## **11. 为什么能做到“精确恢复”**

因为它保存的不是单一状态，而是 多层状态组合：

- progress 告诉你大阶段
- checkpoint 告诉你细步骤
- signals 告诉你未完成中间态
- tasks 告诉你调度动作
- drafts/chapters/summaries 告诉你已有产物

这几层叠加起来，恢复时就能区分：

- 章节开始了但还没 plan
- plan 完了但 draft 没落盘
- draft 已落盘但还没 consistency check
- consistency check 完了但 commit 没做
- review 已经判定，需要 rewrite
- 写完 5 章后正在 checkpoint 等确认

# API 操作 Host，Host 管理 Agent是怎么进行的

API 不直接操作 Agent。API 操作的是 Host；Host 才是 Agent 的运行容器，负责创建 Agent、管理状态、接收指令、发出事件、保存结果。

可以把它理解成：

```
用户 / 前端
   ↓
API 层 FastAPI
   ↓
RunService 应用服务
   ↓
Host 单次运行容器
   ↓
CoordinatorLoop / LangGraphRuntime
   ↓
Agent 工具链 / LLM / Store
```

**核心关系**这里有 3 个关键角色。

**API**
负责接收外部请求，比如创建 run、暂停、恢复、继续、查看事件。它不应该知道 Agent 内部怎么写小说、怎么 review、怎么 checkpoint。

对应代码：
app.py
routes.py

**Host**
Host 是一个 run 的运行宿主。你可以把它理解成“Agent 的外壳”或者“Agent 的容器”。它持有：



```
配置 cfg
状态存储 store
执行循环 loop
事件队列 events
流式输出 stream_ch
生命周期 lifecycle
```

对应代码：
`host.py` 

`Agent / Runtime`
真正负责执行写作流程的是 CoordinatorLoop 和 LangGraphRuntime。它们管理 LangGraph 节点，比如：

```
load_runtime_context
novel_context
plan_chapter
generate_draft
commit_chapter
review
rewrite
checkpoint
finish
```

对应代码：
build.py (line 1)
core.py (line 1)

**一次创建 Agent 的过程**

以 POST `/internal/v1/runs` 为例。

API 入口在 routes.py ：

```python
@router.post("/runs")
async def create_run(req: CreateRunRequest, service: RunService = Depends(get_run_service)):
    session = service.create_run(req)
    report = session.host.report()
    return envelope(map_create_run(session, report))
```

这段代码说明：

1. API 收到创建 run 请求
2. 把请求交给 RunService
3. RunService 创建或获取一个 RunSession
4. 返回 session.host.report() 给外部

API 没有直接 new Agent，也没有直接调用 LangGraph。

真正创建 Host 的地方在 service.py ：

```python
cfg = self._build_config(req)
host = Host(cfg)
self._seed_story_context(host, req)
session = RunSession(
    run_id=req.run_id,
    story_id=req.story.story_id or req.run_id,
    output_dir=cfg.output_dir,
    cfg=cfg,
    host=host,
    last_operation="create",
)
```

这里的关键是：

```
host = Host(cfg)
```

这一步就创建了一个 Agent 运行容器。

**Host 内部怎么管理 Agent**

看 host.py (line 24)：

```python
cfg = self._build_config(req)
host = Host(cfg)
self._seed_story_context(host, req)
session = RunSession(
    run_id=req.run_id,
    story_id=req.story.story_id or req.run_id,
    output_dir=cfg.output_dir,
    cfg=cfg,
    host=host,
    last_operation="create",
)
```

这段非常重要。

Host 初始化时做了 4 件事：

1. 保存配置 cfg
2. 创建持久化目录 Store
3. 初始化运行元数据
4. 创建真正的 Agent 执行循环 CoordinatorLoop

也就是说：

```
Host = 配置 + 状态存储 + 事件系统 + Agent 执行器
```

真正的 Agent 执行器来自这里：

```
self.loop = build_coordinator_loop(...)
```

再看 build.py (line 31)：

```python
class Host:
    def __init__(self, cfg: Config) -> None:
        cfg.fill_defaults()
        cfg.validate_base()
        self.cfg = cfg
        self.store = Store(cfg.output_dir)
        self.store.init()
        self.store.run_meta.init(cfg.style, cfg.provider, cfg.model)
        self.loop: CoordinatorLoop = build_coordinator_loop(
            self.cfg,
            self.store,
            emit_event=self._emit_event,
            emit_stream=self._emit_stream_chunk,
        )
```

这说明 Agent 的组成是：

```
AgentRunner：负责调用工具
ToolRegistry：保存工具能力
LangGraphRuntime：负责流程编排
CoordinatorLoop：对外统一 start/resume/follow_up/abort 接口
```

**API 怎么驱动 Host**

API 本身不跑 Agent，而是把任务放进队列。
创建 run 时，service.py (line 42) 会放入一个任务：

```python
self.registry.put_task(
    RunTask(
        task_id=str(uuid.uuid4()),
        run_id=req.run_id,
        op="start",
        payload={"prompt": prompt},
    )
)
```

后台 worker 会取出任务执行。对应 worker.py (line 17)：

```
task = self.registry.claim_next_task()
...
self._execute(task)
```

真正执行时：

```python
if task.op == "start":
    session.host.start_prepared(prompt)
elif task.op == "resume":
    session.host.resume()
elif task.op == "continue":
    session.host.continue_run(text)
```

所以完整链路是：

```
API 请求
   ↓
RunService 创建任务
   ↓
RunRegistry 保存任务
   ↓
WorkerManager 后台取任务
   ↓
调用 session.host.start_prepared()
   ↓
Host 调用内部 Agent loop
   ↓
LangGraph 开始执行
```

这就是企业架构里常见的设计：

请求层 和 执行层 解耦。

**为什么不让 API 直接调用 Agent**

从资深架构师视角看，这是为了降低系统风险。

如果 API 直接调用 Agent，会有几个问题

```
请求会被长时间阻塞 服务中断后任务丢失 无法暂停和恢复 无法统一记录事件 多个 run 不好管理 状态容易散落在内存里
```

这就是比较标准的 agent 后端架构。



```
API = 前台服务员
RunService = 大堂经理
RunRegistry = 订单系统
Worker = 后厨调度员
Host = 某一桌客人的专属厨师工作台
Agent/LangGraph = 真正做菜的厨师流程
Store = 备菜记录、菜谱、已完成菜品、订单状态
```

用户点菜时，前台不会亲自做菜。
前台只把订单交给系统。
系统分配到某个工作台。
工作台上的厨师流程开始一步步执行。

在这个项目里也是一样：

```
用户创建小说任务
API 收请求
RunService 生成 run
Host 管这个 run
LangGraph 执行写作 agent
Store 保存所有过程
```

这个项目里：

```
API 是控制入口
RunService 是业务调度层
Host 是 Agent 的运行容器
CoordinatorLoop 是 Agent 的统一执行接口
LangGraphRuntime 是 Agent 的大脑流程
Store 是 Agent 的长期记忆和恢复基础
```

# 多模型适配与流式输出

##  **1. 多模型适配的核心设计**

模型配置入口在 config.py (line 1)。

核心结构是：

```python
@dataclass
class ProviderConfig:
    type: str = ""
    api_key: str = ""
    base_url: str = ""
    models: list[str] = field(default_factory=list)
```

这里的关键字段是：

- provider：当前使用哪个供应商，比如 openrouter
- model：具体模型名
- base_url：兼容 OpenAI API 的服务地址
- api_key：供应商密钥
- models：可选模型列表

所以它不是写死 OpenAI，而是通过 base_url 把 OpenRouter、DeepSeek、Qwen 等兼容接口统一接进来。

真正创建客户端的位置在 core.py (line 92)：

```python
    def build_client(self) -> OpenAICompatClient:
        pc = self.cfg.providers.get(self.cfg.provider)
        if pc is None or not pc.api_key:
            raise RuntimeError(f"provider {self.cfg.provider} api_key 未配置")
        key_norm = pc.api_key.strip().lower()
        if key_norm in {"dummy-key", "dummy", "test", "placeholder", "changeme"}:
            raise RuntimeError(f"provider {self.cfg.provider} api_key 为占位值")
        return OpenAICompatClient(
            api_key=pc.api_key,
            model=self.cfg.model,
            base_url=pc.base_url,
            timeout=120.0,
        )
```

```
获取配置 pc
    │
    ▼
第1层验证：配置是否存在？
    │
    ├── pc is None? ──→ 抛异常："api_key 未配置"
    │
    └── not pc.api_key? ──→ 抛异常："api_key 未配置"
    │
    ▼
第2层验证：是否为占位符？
    │
    ├── 去除空格、转小写
    │
    └── 检查是否在 {"dummy-key", "dummy", "test", "placeholder", "changeme"}
            │
            └── 是 ──→ 抛异常："api_key 为占位值"
```

这说明 LangGraphRuntime 不关心底层是哪家模型，只关心：

```
api_key + model + base_url
```

这就是抽象 Provider 层的价值。

## **2. OpenAICompatClient 怎么统一调用不同模型**

核心客户端在 llm_client.py (line 1)。

它的 endpoint 是这样拼的：

```python
def _endpoint(self) -> str:
    base = (self.base_url or "https://api.openai.com/v1").rstrip("/")
    return f"{base}/chat/completions"
```

这就是兼容 OpenRouter 的关键。

如果 base_url 是空的，就走 OpenAI 默认地址。
如果 base_url 配成 OpenRouter，就走 OpenRouter 的 /chat/completions。

调用普通模型输出：

```python
payload = {
    "model": self.model,
    "temperature": temperature,
    "messages": [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ],
}
```

```python
    def complete(self, system_prompt: str, user_prompt: str, temperature: float = 0.7) -> str:
        payload = {
            "model": self.model,
            "temperature": temperature,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        }

        req = urllib.request.Request(
            url=self._endpoint(),
            method="POST",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
        )
        body = self._perform_request(req)

        try:
            data = json.loads(body)
            return (
                data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
                .strip()
            )
        except Exception as exc:
            raise RuntimeError(f"llm decode failed: {exc}") from exc
```

```
43    def complete(self, system_prompt: str, user_prompt: str, temperature: float = 0.7) -> str:
44        payload = {...}                              # 1. 构建请求体
54        req = urllib.request.Request(...)            # 2. 构建 HTTP 请求
62        body = self._perform_request(req)            # 3. 发送请求
64        data = json.loads(body)                      # 4. 解析响应
65        return data.get(...).get(...).get(...)       # 5. 提取内容
```

调用流式输出：

```python
payload = {
    "model": self.model,
    "temperature": temperature,
    "stream": True,
    "messages": [...],
}
```

所以从 Agent 角度看，所有模型都被包装成统一接口：

```
client.complete(...)
client.complete_stream(...)
```

Agent 不需要知道背后是 OpenRouter、OpenAI 还是其他兼容模型。

## **3. 模型切换怎么做**

Host 层提供了切换模型能力，在 host.py (line 166)：

```python
def switch_model(self, role: str, provider: str, model: str) -> None:
    ...
    self.cfg.provider = provider
    self.cfg.model = model

    self.loop = build_coordinator_loop(
        self.cfg,
        self.store,
        emit_event=self._emit_event,
        emit_stream=self._emit_stream_chunk,
    )
```

这里有两个关键点：

1. 切换的是 cfg.provider 和 cfg.model
2. 切换后会重新构建 CoordinatorLoop

这意味着后续 Agent 执行会用新的模型配置。

从架构上看，Host 是模型切换的控制点，LangGraphRuntime 是模型使用点，OpenAICompatClient 是模型调用适配器。

## **4. 流式 token 是怎么产生的**

真正生成章节时，会调用 complete_stream。入口在 runner.py (line 402)：

```python
draft = client.complete_stream(
    system_prompt,
    user_prompt,
    on_chunk=lambda channel, d: (
        draft_chunks.append(d) if channel == "content" else None,
        self.emit_stream(channel, d),
    ),
    temperature=0.7,
)
```

这段很关键。

模型返回的流式内容被分成两个 channel：

- content：正文 token
- thinking：推理/思考 token，如果供应商返回了相关字段

在 llm_client.py (line 75) 里可以看到解析逻辑：

```python
content_delta = self._extract_stream_text(delta_obj.get("content"))
thinking_delta = "".join([
    self._extract_stream_text(delta_obj.get("reasoning")),
    self._extract_stream_text(delta_obj.get("reasoning_content")),
    self._extract_stream_text(delta_obj.get("thinking")),
])
```

然后分别回调：

```python
if thinking_delta and on_chunk:
    on_chunk("thinking", thinking_delta)

if content_delta:
    chunks.append(content_delta)
    if on_chunk:
        on_chunk("content", content_delta)
```

这就是实时 token 流的源头。

## **5. Host 怎么接住流式输出**

Host 的流式接收逻辑在 host.py (line 397)：

```python
def _emit_stream_chunk(self, channel: str, text: str) -> None:
    channel_norm = (channel or "content").strip().lower()
    if channel_norm not in {"content", "thinking"}:
        channel_norm = "content"
    self._emit_delta(channel_norm, text)
    self._append_runtime_stream_chunk(channel_norm, text)
```

这一步做了两件事：

1. 放进内存队列，供当前运行实时消费
2. 写入 runtime 持久化队列，供 API 回放和 SSE 推送

持久化写入在 host.py (line 347)：

```python
RuntimeQueueItem(
    kind=RuntimeQueueKind.STREAM_CHUNK,
    priority=RuntimeQueuePriority.BACKGROUND,
    payload={"channel": channel, "delta": delta},
)
```

所以 token 流不是只存在内存里，而是也进入了 meta/runtime/queue.jsonl。

这对长任务很重要：前端断线后可以通过 after_seq 继续拉。

## **6. 节点状态事件怎么输出**

除了 token，系统节点状态也会发事件。Host 事件入口在 host.py (line 380)：

```python
def _emit_event(self, ev: Event) -> None:
    self._safe_put(self.events, ev)
    self._append_runtime_item(
        RuntimeQueueItem(
            kind=RuntimeQueueKind.UI_EVENT,
            priority=RuntimeQueuePriority.BACKGROUND,
            category=ev.category,
            summary=ev.summary,
            payload={"level": ev.level},
        )
    )
```

所以像这些动作都会被记录为 UI event：

```
调用 plan_chapter
调用 draft_chapter
调用 check_consistency
调用 commit_chapter
调用 save_review
进入 checkpoint
完成 / 暂停 / 失败
```

这就解释了“用户可观察节点状态变化”。

流式输出看的是 token，事件输出看的是 Agent 工作流状态。

**7. SSE 是怎么把这些推给前端的**

SSE 接口在 routes.py (line 94)：

```python
@router.get("/runs/{run_id}/events/stream")
async def stream_events(...):
    ...
    return StreamingResponse(_event_stream(), media_type="text/event-stream")
```

内部循环会不断读取事件队列：

```python
session, items, _ = service.get_events(run_id, current, 200)
mapped = [map_event(run_id, item) for item in items]
```

然后逐条 yield：

```
yield _format_sse_event(item)
```

SSE 格式化函数在 routes.py (line 14)：

```python
return f"event: {event_type}\ndata: {json.dumps(item, ensure_ascii=False)}\n\n"
```

所以前端收到的不是裸字符串，而是标准 SSE event：

```
event: ui.event data: {...} event: stream.chunk data: {...}
```

具体 event 类型来自 runtime queue 的映射层。







# 从用户输入 Prompt 到前端输出，做了哪些处理？

用户输入 Prompt 后，我主要做了五层处理。

第一层是输入处理。**先检查 Prompt 是否为空**，同时**带上当前作品、章节、模型和运行状态**等必要信息，避免模型只拿到一句孤立的用户指令。

第二层是**上下文组装**。系统会读取当前章节正文，以及作品设定、章节规划、人物信息、世界规则、人物关系和未完成伏笔。**这里不是把所有历史正文全部塞给模型，而是选择与当前任务相关的结构化信息，减少 token 消耗和上下文干扰。**

第三层是 **Prompt 构造**。我把提示词拆成**系统约束和用户任务**两部分。**系统约束负责规定模型角色、输出格式和禁止项**；用户任务负责描述这次要润色、续写还是改写，并附上当前正文和相关上下文。这样可以降低模型输出解释、日志或者无关内容的概率。

第四层是模型调用和容错。后端通过统一的模型客户端调用大模型，并使用流式生成。如果模型调用失败或者返回空结果，**系统会保留原正文或返回明确提示**，避免错误结果直接覆盖用户内容。

第五层是前端输出。模型生成的内容会以增量数据持续推送给前端，**前端一边接收一边更新编辑器**，所以用户不需要等待整篇内容生成完成。生成结束后，系统再用完整结果校准流式内容并保存到当前章节。

# 你是怎么理解长短期记忆的?

**短期记忆**：用于**完成当前任务。**在这个项目中，它包括**用户当前的 Prompt、当前章节规划、正在生成的草稿、工作流执行状态以及本轮审阅结果**。这些信息变化频繁，主要服务于当前章节，任务结束后不一定需要长期保留。

**长期记忆**：用于保证跨章节的一致性，包括**人物设定、世界规则、章节摘要、时间线、人物关系、伏笔状态和角色状态变化**。每章提交后，系统会从正文中提取这些结构化信息并持久化，供后续章节使用。

生成下一章时，我不会把全部历史正文直接放进 Prompt，而是选择最近章节摘要、当前人物状态、活跃伏笔、世界规则和审阅意见，重新组成当前任务的短期上下文。这样既能控制 token 成本，也能减少无关信息对模型的干扰。

所以我认为，短期记忆解决的是“当前正在做什么”，长期记忆解决的是“过去发生过什么，以及哪些事实现在仍然有效”。一个完整的记忆系统也不只是存储，还应该包括写入、召回、更新、遗忘和冲突处理。