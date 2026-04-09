# 关于skills精选博客以及网站

https://skillhub.tencent.com/#categories  --精选推荐，高速下载体验，轻松查找 ClawHub 2.5 万 个 AI Skills



https://javaguide.cn/ai/agent/skills.html#skills-%E6%98%AF%E4%BB%80%E4%B9%88  --skills基本介绍











## 编程skills



- brainstorming：做创意类实现前先澄清需求和方案
- code-review-expert：高级代码审查
- dispatching-parallel-agents：并行分派多个独立任务
- executing-plans：按既定实施计划执行
- finishing-a-development-branch：开发完成后的收尾与集成决策
- github：用 gh 操作 GitHub
- receiving-code-review：处理收到的 code review 意见
- requesting-code-review：在完成实现后请求代码审查
- self-improvement：记录失败、纠正和经验
- sigma：1 对 1 教学 / 辅导型 skill
- skill-forge：设计、改进、打包 skill
- subagent-driven-development：基于子代理执行独立实现任务
- systematic-debugging：系统化排查 bug
- test-driven-development：TDD 工作流
- using-git-worktrees：使用 git worktree 隔离开发
- using-superpowers：会话开始时检查并启用合适 skills
- verification-before-completion：完成前先做验证
- writing-plans：编码前先写实施计划
- writing-skills：创建或修改 skill 时的工作流
- imagegen：生成或编辑位图图像
- openai-docs：查询 OpenAI 官方文档与最新用法
- plugin-creator：创建或脚手架化 Codex 插件
- skill-creator：创建新 skill
- skill-installer：安装 skill







## 论文skills

- 20-ml-paper-writing
  触发方式：当你要从研究仓库写论文、改论文、补 related work、核 citation、套顶会 LaTeX 模板、做 camera-ready，或者在不同会议格式间转换时。
  适用场景：面向 NeurIPS / ICML / ICLR / ACL / AAAI / COLM / OSDI / NSDI / ASPLOS / SOSP 的论文写作全流程。它强调先理解 repo 和结果，再主动产出完整初稿；强制要求“不要凭记忆编 citation”，必须程序化检索和验证。
  参考：[SKILL.md](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/youzi/.vscode/extensions/openai.chatgpt-26.5325.31654-win32-x64/webview/)
- humanizer
  触发方式：当你要把一段文字改得更像人写的，去掉明显 AI 痕迹，或者审稿前做语言风格清洗时。
  适用场景：润色文章、说明文、评论、文档、博客、邮件等文本。它专门识别一类 AI 写作特征，比如空泛拔高、营销腔、过多 -ing 分析、模糊归因、破折号滥用、三段式堆砌、过度讨好语气等，然后重写成更自然、有个性、保留原意的版本。
  参考：[SKILL.md](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/youzi/.vscode/extensions/openai.chatgpt-26.5325.31654-win32-x64/webview/)
- docx
  触发方式：只要用户提到 Word doc、word document、.docx，或者要求把内容做成正式 Word 文档，就该用。也包括读/改现有 .docx、抽内容、替换图片、批量替换、处理 tracked changes/comments。
  适用场景：创建或编辑 Word 文档。它给的是很实操的工作流：新建文档时用 docx-js；改现有文档时解包 XML 再回包；还覆盖目录、页眉页脚、分页、表格、脚注、链接、批注、修订痕迹、LibreOffice 转换等细节。
  参考：[SKILL.md](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/youzi/.vscode/extensions/openai.chatgpt-26.5325.31654-win32-x64/webview/)
- doc-coauthoring
  触发方式：当用户说“写文档”“写 proposal”“写 spec”“写 RFC”“写决策文档”“写 PRD”这类结构化文档任务时。
  适用场景：协作写技术文档或业务文档。它不是单纯帮你写，而是走三阶段流程：Context Gathering 收集背景，Refinement & Structure 分节共创，Reader Testing 用“无上下文读者”验证文档是否真的能被别人读懂。适合设计文档、技术方案、提案、决策记录。
  参考：[SKILL.md](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/youzi/.vscode/extensions/openai.chatgpt-26.5325.31654-win32-x64/webview/)
- canvas-design
  触发方式：当用户要做海报、艺术作品、静态视觉设计、单页视觉稿、概念图这类“以视觉为主”的产出时。
  适用场景：生成高完成度的静态视觉作品，输出 .md 设计哲学，再产出 .pdf 或 .png。它先要求建立一个“设计哲学/美学运动”，再把它表达成作品；强调视觉优先、文字极少、构图和工艺感要像花了很多时间打磨出来的成品，偏艺术海报、展陈视觉、概念封面，而不是普通排版。
  参考：[SKILL.md](https://file+.vscode-resource.vscode-cdn.net/c%3A/Users/youzi/.vscode/extensions/openai.chatgpt-26.5325.31654-win32-x64/webview/)







# Skills

## 一、概念解析：什么是 Skill？

## 1. Skill 的准确定义

一句话定义：Skill 是一种**结构化的**、**可复用的能力单元**，它将完成特定任务的 “标准作业流程”（SOP）封装起来，指导 Agent 如何一步步地执行复杂工作。

如果把 Agent 看作一个 “数字员工”，那么 Skill 就是我们为它编写的 “岗位说明书” 和 “标准作业流程”（Standard Operating Procedure）。它明确了在何种场景下（`when_to_use`），为了达成何种目标，需要分几步（Steps），每一步具体做什么。

与零散的提示词（Prompt）不同，Skill 是一个更加完备、独立的 “能力包”。它不仅包含指导模型思考的指令，还集成了必要的工具调用、逻辑判断和结果处理，构成了一个端到端（End-to-end）的任务解决方案。

------

## 2. Skill 与 Agent 的关系

在一个成熟的 Agent 系统中，Skill 扮演着 “能力库” 或 “技能树” 的角色。Agent 本身是一个调度和执行引擎，而 Skill 则是其可以调用的、解决具体问题的 “函数库”。

- **Agent 是 “调用方”**：当 Agent 接收到**用户意图后**，它的首要任务之一就是**理解意图**，并在自己的 “技能库” 中寻找最匹配的 Skill 来执行。
- **Skill 是 “执行方”**：一旦被选中，Skill 便接管任务，按照预设的流程开始执行，直至任务完成或遇到需要 Agent 进一步决策的节点。

这种 “引擎 + 技能” 的架构，使得 Agent 的能力可以被持续扩展、迭代和治理，就像我们可以随时为操作系统安装新的应用程序一样。每个 Skill 的沉淀，都意味着 Agent 在特定领域的专业能力得到了一次 “固化” 和 “增强”。

## 二、核心价值：Skill 解决了什么问题？

引入 Skill 机制，并非简单地将任务流程 “代码化”，其背后解决的是将 LLM 从 “通用模型” 转化为 “可靠生产力工具” 过程中的一系列核心痛点。

## 1. 稳定性与确定性

**问题：LLM 的输出具有不确定性（Non-deterministic）。**

对于同一个复杂任务，即便输入相同，两次运行的结果也可能大相径庭。这种 “自由发挥” 在创意场景下是优点，但在需要精确、可靠的业务流程中却是致命缺陷。

**Skill 的解法：** 通过预定义的步骤（Steps），**Skill 为任务执行提供了一个 “确定性框架”**。它将一个大任务拆解为一系列更明确的子任务，并在关键节点上约束模型的行为。

- **流程的确定性：** 无论模型版本如何迭代，任务的执行流程始终遵循 Skill 定义的 SOP。例如，“生成销售周报” 的 Skill 会确保 Agent 总是先抓取数据，再进行汇总分析，最后生成图表，这个顺序不会改变。
- **结果的确定性：** 通过在流程中加入明确的指令和工具调用，Skill 显著提升了最终产出的一致性。例如，通过调用固定的数据 API 并使用模板化的语言生成报告，可以保证报告格式和关键指标的准确无误。

## 2. 知识的沉淀与复用

**问题：团队的业务知识和最佳实践，往往以文档、代码片段、甚至 “口口相传” 的形式散落在各处，难以形成合力。新员工需要花费大量时间学习，而 Agent 更无从下手。**

**Skill 的解法：** Skill 成为了一个承载和复用 “领域知识” 的绝佳容器。

- **业务流程沉淀：** 将一个成熟的业务流程（如 “新员工入职 IT 配置”、“用户反馈分类与打标”）封装为 Skill，相当于将团队的集体智慧程序化，使其仅被 Agent 直接调用。
- **最佳实践固化：** 在 PE（提示工程）探索中发现的高效 Prompt 模式、效果最好的工具组合，都可以固化到 Skill 中，避免重复造轮子，让好的经验规模化复用。

## 3. 模块化与可治理性

**问题：随着 Agent 能力的增加，一个 “万能” 的、包含所有逻辑的庞大系统会迅速变得难以维护、迭代和审计。“牵一发而动全身” 的困境会严重制约其发展。**

**Skill 的解法：** Skill 将 Agent 的能力体系拆解为一个个独立的、高内聚的模块。

- **独立版本化：** 每个 Skill 都可以独立开发、测试、上线和回滚。对 “A 技能” 的修改不会影响到 “B 技能” 的稳定性，使得敏捷迭代成为可能。
- **权限与审计：** 可以对 Skill 进行细粒度的权限控制，例如，只有财务团队的 Agent 才能调用 “财务报销审批” 技能。同时，每个 Skill 的调用记录都清晰可查，便于问题追溯和安全审计。
- **跨团队共享：** 一个设计良好的 Skill，可以被发布到企业或团队的 “技能市场”，供其他业务线的 Agent 按需安装和使用，极大地促进了能力的跨团队共享与协作。

## 三、原理分析：Skill 是如何工作的？

理解了 Skill 的价值之后，我们继续深入探究其技术实现和核心原理。

#### 1. Skill 的核心构成

一个 Skill 通常以一个文件夹的形式存在，其核心是一个名为 **SKILL.md** 的清单文件，它定义了 Skill 的全部信息。

##### 示例：一个典型的 Skill 文件结构

一个 Skill 通常包含清单文件 **SKILL.md**，以及可选的 **scripts** 和 **assets** 目录，结构如下：

```
my_report_skill/
├── SKILL.md   # 必须：定义 Skill 的元信息和执行流程 (SOP)
├── scripts/   # 可选：存放 Skill 执行中可能用到的 Python/Shell 脚本
│   └── analyze.py
└── assets/    # 可选：存放报告模板、配置文件、示例数据等资源
    └── report_template.docx
```

##### SKILL.md 文件内部主要包含两大部分：

###### ① 元信息（Metadata）

这部分内容告诉 Agent “这个 Skill 是什么” 以及 “何时应该使用它”。

- **name**：技能的唯一标识符，如 `WeeklyReportGenerator`。
- **description**：对技能功能的简短描述，帮助 Agent 理解其用途。
- **when_to_use**：触发条件。这是 Skill 能否被正确调用的关键。它通常是一系列自然语言描述的场景，Agent 会根据这些描述来匹配用户意图。

###### ② 操作流程（Steps）

这是 Skill 的核心，定义了任务的具体执行步骤，即 **“SOP”**。

- 它是一系列有序的指令，按顺序指导 Agent 一步步地进行思考、调用工具或执行代码。
- 每一步都是一个原子操作，例如：“从用户问题中提取关键信息”、“调用 `get_data_api` 工具”、“总结分析结果” 等。

### 2. 与工具（Tool / MCP）和协议的衔接

Skill 本身定义了 “做什么”（What）和 “按什么顺序做”（When），但具体 “怎么做”（How）的技术细节，则通过与工具（Tool）的衔接来完成。

- **Skill 是流程编排者**：Skill 的步骤中会包含对工具的调用指令。例如：`Step 2: 使用 get_weather_api 工具，并将提取到的"城市名称"作为参数传入`。
- **MCP 是工具的 “驱动程序”**：`get_weather_api` 这个工具本身，是通过模型上下文协议（Model Context Protocol, MCP）注册到 Agent 系统中的。MCP 定义了工具的名称、功能描述、输入输出参数和调用方式。它像一个标准化的 “插座”，让任何外部 API 或服务都能安全、规范地被 Agent 调用。

因此，**Skill 负责业务流程，MCP 负责技术实现**。Skill 将业务逻辑与具体的工具实现解耦，使得两者可以独立演进。

------

### 3. 与 PE、MCP 的分工与边界

在 Agent 的架构中，PE、Skill、MCP 是不同层次、不同职责的组件。下面是三者的定位解析：

表格

| 组件                         | 定位     | 核心关注点                                                   |
| ---------------------------- | -------- | ------------------------------------------------------------ |
| **PE（Prompt Engineering）** | 交互层   | 优化单轮对话质量，引导模型思考与表达，关注 “对话的艺术”      |
| **MCP（模型上下文协议）**    | 连接器   | 标准化接入外部能力（API / 数据库 / 脚本），关注 “能力的接入标准” |
| **Skill（技能）**            | 能力核心 | 将复杂任务流程化、结构化，形成可复用的能力资产，关注 “如何成事” |

三者的协作逻辑可以这样理解：

- PE 是 “话术大师”，让模型听得懂、说得好；
- MCP 是 “万能接口”，让模型能安全地调用外部能力；
- Skill 是 “作战手册”，把单轮对话和零散工具，编排成一套可复用的完整解决方案。

## 四、实践应用：Skill 的落地场景

理论的价值在于指导实践。下面，我们通过一个具体的落地场景，来展示 Skill 在不同领域中的实际应用。这些例子经过简化和泛化，旨在说明核心思想，不涉及内部保密实现。

### 1. 场景一：研发运维 - “服务异常根因分析” Skill

**背景：** 线上服务出现告警后，SRE（网站可靠性工程师）同学通常需要执行一系列标准化的排查动作：查看告警详情、拉取服务日志、分析关键指标（QPS、Latency、Error Rate）、检查最近的发布变更等。这个过程耗时且高度依赖个人经验。

**Skill 设计思路：**

```html
⭐ `ServiceAnomaliesAnalysis` **Skill**

**元信息（`when_to_use`）：**

- 用户询问“服务为什么告警了？”
- 收到来自监控系统的告警通知
- 用户要求分析某个服务的异常表现

**执行流程（`Steps`）：**

1. **【思考】** 从用户输入或者告警信息中，提取“服务名称”和“时间范围”。若信息不足，则向用户询问。

2. **【工具】** 调用 `argos.get_alerts` 工具，获取指定服务的告警详情。

3. **【工具】** 调用 `sls.query_logs` 工具，拉取异常时间点前后的 `ERROR` 和 `WARN` 级别的日志。

4. **【工具】** 调用 `monitoring.get_metrics` 工具，获取服务的核心指标图表（QPS, Latency, Error Rate）。

5. **【工具】** 调用 `bits.get_deploy_history` 工具，查询该服务在异常发生前的发布记录。

6. **【思考】（关键步骤）** 综合以上所有信息（告警、日志、指标、变更），进行关联分析，并生成初步的根因推测。这一步会使用一个精心设计的 CoT (Chain of Thought) Prompt，引导模型像一个资深 SRE 一样思考。

7. **【产出】** 将分析过程、关键证据（日志片段、指标图）和初步结论，结构化地回复给用户，并提供深入排查的建议。
```

### 2. 场景二：运营分析 - “用户负反馈洞察” Skill

**背景：** 产品运营团队需要定期整理来自用户群、应用商店、工单系统等渠道的用户负反馈，进行归类、打标、统计，并提炼出高价值的洞察，作为产品迭代的输入。这个过程繁琐、重复性高。

**Skill 设计思路：**

```
⭐ `UserFeedbackInsight` **Skill**

**元信息（`when_to_use`）：**

- 用户要求“分析一下本周的用户负反馈”
- 每周一自动触发

**执行流程（`Steps`）：**

1. **【工具】** 并行调用多个工具，从不同渠道拉取数据：

   - `lark.im.get_messages`：获取指定用户群中包含“吐槽”、“建议”、“不好用”等关键词的聊天记录。
   - `app_store.get_reviews`：拉取应用商店的最新评论。
   - `zendesk.get_tickets`：获取客服工单系统中被标记为“产品问题”的工单。

2. **【思考】** 将所有来源的文本数据进行清洗和预处理。

3. **【思考】** 设计一个分类和打标的 Prompt，对每一条反馈进行多维度分类（如：功能 Bug、体验问题、新功能建议）和情感判断（如：强烈不满、一般抱怨）。

4. **【工具】** 调用 `bytedance_base.write_records` 工具，将处理后的数据写入一个多维表格，方便追溯和二次分析。

5. **【思考】** 对多维表格中的数据进行聚合统计，识别出本周 Top 3 的高频问题和值得关注的新增问题。

6. **【产出】** 生成一份简报，包含核心数据图表、典型用户原声和关键洞察摘要，并自动发送到运营团队的 Lark 群。
```

### 3. 场景三：人力资源 - “面试安排协调” Skill

**背景：** 为候选人安排多轮面试，需要协调面试官、候选人和 HR 三方的时间，预订会议室，并发送日历邀请。这个过程沟通成本极高，来回拉扯，效率低下。

**Skill 设计思路：**

```
⭐ `InterviewCoordinator` **Skill**

**元信息（`when_to_use`）：**

- HR 在招聘系统中点击“安排面试”按钮
- 用户在群里 @Agent 说“帮XX候选人约一下面”

**执行流程（`Steps`）：**

1. **【思考】** 提取“候选人”、“面试官列表”、“面试轮次”等关键信息。

2. **【工具】** 调用 `lark.calendar.get_free_busy` 工具，分别查询所有面试官和候选人在未来 3 个工作日的空闲时间段。

3. **【思考】** 找出所有人都有空的共同时间片（Time Slots）。

4. **【交互/产出】** 如果找到共同时间片，向 HR 或用户展示可选时间，并询问选择哪一个。如果未找到，则建议将面试官分组或提供更晚的时间选项。

5. **【工具】** 用户确认时间后，调用 `lark.calendar.create_event` 工具，创建日历事件，自动添加所有参与人。

6. **【工具】** 在日历事件的描述中，附上面试官的姓名、候选人的简历链接，并自动预订一个空闲会议室。

7. **【产出】** 在群里或通过 IM 告知 HR：`面试已安排在 [时间]，日历邀请已发送。`
```

## 五、问题与解答

### 问题 1：Agent 中的 Skill 和传统的函数/API 有什么本质区别？

- **核心定位不同：**
  - **函数/API** 是纯粹的技术实现。**它封装了一段确定的代码逻辑**，忠实地执行输入到输出的转换，不关心“为什么调用它”。
  - **Skill** 是一个业务解决方案。它封装了一个完整的、解决特定业务问题的“**流程**”（SOP）。它不仅包含对函数/API 的调用，还包含了业务逻辑、决策判断和上下文理解。

- **组成部分不同：**
  - 一个函数通常只有代码实现。
  - 一个 Skill 除了可以调用代码（工具），还包含元信息（`when_to_use`）用于意图识别，以及执行步骤（`Steps`）用于流程编排。这使得 Skill 具备了“自主”被 Agent 发现和调度的能力。

- **抽象层次不同：**
  - 函数/API 位于技术实现层。
  - Skill 位于业务逻辑层，更贴近最终用户的需求。一个 Skill 的执行过程中可能会调用多个不同的函数/API。