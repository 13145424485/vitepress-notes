# 代码示例

为了更具体地理解 ReAct 的实现，我们提供两个层面的代码示例：

- 一个简化的核心循环伪代码，帮助理解其底层逻辑；
- 一个基于 langchain 框架的实例，展示如何在工程中快速构建一个 ReAct Agent。

## 1. ReAct 核心循环伪代码

这段伪代码剥离了所有框架细节，旨在清晰地展示 TAO 循环的本质。

### 代码块

```python
def react_core_loop(task: str, tools: dict, max_steps: int = 5):
    """
    一个简化的ReAct核心循环伪代码。

    Args:
        task: 用户的初始任务。
        tools: 一个将工具名称映射到其可执行函数的字典。
        max_steps: 最大循环次数，防止无限循环。
    """
    # 1. 初始化上下文/历史记录
    context = f"任务：{task}\n"
    prompt_template = """
    你是一个 ReAct 智能体，请通过"思考->行动->观察"的循环来完成任务。
    你可以使用的工具有：{tool_descriptions}
    ---
    {context}
    思考：
    """

    tool_descriptions = "\n".join([f"- {name}: {func.__doc__}" for name, func in tools.items()])

    for i in range(max_steps):
        # 2. 生成思考和行动 (Thought & Action)
        # 将当前上下文和任务信息组合成提示，送入LLM
        prompt = prompt_template.format(tool_descriptions=tool_descriptions, context=context)

        # llm_call 是一个模拟函数，代表对大模型的API调用
        # 在真实场景中，这里会是 openai.Completion.create(...) 或类似调用
        response_text = llm_call(prompt)  # LLM返回包含"思考："和"行动："的文本

        try:
            thought = response_text.split("思考：")[1].replace("行动：", "").strip()
            action_str = response_text.split("行动：")[1].strip()
        except IndexError:
            # 如果LLM输出格式不正确，则终止
            print("LLM输出格式错误，循环终止。")
            break

        context += f"思考：{thought}\n行动：{action_str}\n"

        # 3. 解析并执行行动
        if action_str.lower().startswith("finish"):
            final_answer = action_str[len("finish"):].strip()
            print(f"任务完成，最终答案：{final_answer}")
            return final_answer

        tool_name, tool_input = action_str[:-1].split('[')

        if tool_name in tools:
            # 4. 获取观察结果 (Observation)
            try:
                observation = tools[tool_name](tool_input)
            except Exception as e:
                observation = f"工具执行失败：{e}"
        else:
            observation = f"错误：不存在名为{tool_name}的工具。"

        context += f"观察：{observation}\n"

    print("已达到最大循环次数，任务未能完成。")
    return None
```

### 伪代码解析：

这个循环清晰地展示了 ReAct 的核心三步：

1. **构建 Prompt**：将任务、历史（context）和可用的工具信息组合起来，引导 LLM 进行下一轮思考。
2. **调用 LLM**：获取包含**思考**和**行动**的文本输出。
3. 解析与执行：
   - 如果行动是 `finish[...]`，则任务结束。
   - 否则，解析出工具名称和参数，执行工具，并将返回的**观察**结果追加到历史记录中，进入下一轮循环。

# 2. LangChain/LangGraph 实现示例

LangChain 和 LangGraph 极大地简化了 ReAct Agent 的构建。`create_react_agent` 是一个高级 API，它将上述伪代码中的循环、解析、工具调用等逻辑都封装好了。

以下是一个使用 LangGraph 创建 ReAct Agent 的最小可运行示例：

```python
import os
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

# --- 1. 环境设置（需要设置API Keys）---
# os.environ["OPENAI_API_KEY"] = "sk-..."
# os.environ["TAVILY_API_KEY"] = "tvly-..."
# os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ["LANGCHAIN_API_KEY"] = "ls_..." # 用于LangSmith追踪, 可选

# --- 2. 定义工具 ---
# 这里我们只使用一个网络搜索工具
tools = [TavilySearchResults(max_results=2, name="web_search")]

# --- 3. 初始化模型和内存 ---
# 使用支持工具调用的模型
model = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# LangGraph的Agent会自动处理内存
checkpointer = None # 简单示例, 不使用持久化内存

# --- 4. 创建ReAct Agent ---
# create_react_agent 封装了ReAct的核心逻辑
agent_executor = create_react_agent(model, tools=tools, checkpointer=checkpointer)

# --- 5. 执行任务 ---
def run_agent(question):
    """运行Agent并打印每一步的流式输出"""
    inputs = {"messages": [HumanMessage(content=question)]}
    # 使用 stream 模式可以清晰地看到每一步的 Thought, Action, Observation
    for s in agent_executor.stream(inputs, stream_mode="values"):
        # s['messages'][-1] 是最新的消息
        s['messages'][-1].pretty_print()
        print("\n---\n")

# 运行一个需要多步推理和工具调用的任务
question = "现在篮球领域最受关注的两位新星是谁? 他们各自有什么显著成就? "
run_agent(question)
```

------

### 代码解析：

- **工具 (Tools)**: 我们定义了一个 `TavilySearchResults` 工具，Agent 可以用它来上网搜索信息。
- **模型 (Model)**: 选择一个支持工具调用的强大模型，如 `gpt-4o-mini`。
- **`create_react_agent`**: 这是 LangGraph 的魔法所在。它接收模型和工具列表，自动构建出包含 “思考 - 行动 - 观察” 循环的状态图（Graph）。开发者无需手动编写循环逻辑。
- **执行与流式输出**: 通过调用 `.stream()` 方法，我们可以实时观察到 Agent 的完整工作流程，包括它的每一次 `Thought`（思考独白）、`Action`（工具调用）和 `Observation`（工具返回的结果），极大地增强了透明度。





# 面试题与解答

## 第一部分：概念与原理对比

### 1. ReAct 与 CoT（Chain-of-Thought）的根本区别是什么？在什么场景下你会选择 CoT 而非 ReAct？

**核心区别**

- **CoT**：是纯粹的**内部推理过程**，仅引导 LLM 生成详细思考步骤，所有信息均源于模型自身知识库，属于 **“闭环系统”**，不与外部交互。
- **ReAct**：是 **“开放系统”**，将推理（Thought）与行动（Act）结合。模型不仅思考，还会通过行动（调用 API、查询数据库等）从外部获取实时信息（Observation），并将新信息融入下一轮思考。

**选择 CoT 的场景**

任务为纯逻辑推理、文本创作或知识总结，且**不依赖外部实时信息**时，优先选 CoT。原因是其更轻量、响应更快、成本更低。

- 示例：
  1. 解决数学应用题；
  2. 根据描述创作诗歌；
  3. 总结文章核心观点。

**补充说明**：此类场景引入 ReAct 的工具调用无必要，反而会增加延迟与开销。

### 2. ReAct 与 Plan-and-Execute（如 Plan-and-Solve）范式有何不同？各自的优缺点是什么？

两者核心差异在于**规划方式**：ReAct 是 “增量式规划，边想边干”，Plan-and-Execute 是 “一次性规划，分步执行”。

| 对比维度     | ReAct                                                        | Plan-and-Execute                                             |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **规划方式** | 增量式、交错式。**每步行动前进行简短思考，行动后根据观察结果动态调整下一步计划。** | 一次性、预先式。**任务开始时生成完整的多步骤计划，后续严格按计划执行。** |
| **灵活性**   | 高。可**根据环境反馈（如 API 失败、信息不足）动态调整策略**，鲁棒性强。 | 低。计划固定后难以中途调整；若初始计划有误或环境变化，整体任务可能失败。 |
| **适用场景** | **探索性强、环境动态、不确定性高的任务。**示例：网页浏览、交互式游戏、复杂故障排查。 | 流程固定、步骤明确、环境稳定的复杂任务。示例：生成多章节报告、执行固定数据处理流程。 |
| **缺点**     | 简单步骤上推理可能效率较低；短期视角易 “短视”，缺乏全局最优规划。 | 初始规划对 LLM 全局规划能力要求极高，规划出错则后续执行全错。 |

### 3. Reflection (或 Self-Refine) 机制如何与 ReAct 结合？它能解决 ReAct 的什么问题？

Reflection 是一种让 Agent 在行动后进行自我反思和批判的机制。它可以被看作是 ReAct 循环的一个强大 “插件”。

结合方式：在标准的 `Thought -> Action -> Observation` 循环之后，可以增加一个 `Reflection` 步骤。

1. **ReAct 循环**：Agent 执行一个或多个 TAO 步骤。
2. **反思 (Reflect)**：当 Agent 遇到失败、低效的行动或完成一个子任务后，启动反思。它会回顾刚才的 TAO 轨迹，并自问：“我做得对吗？有没有更好的方法？为什么失败了？”。
3. **记忆存储**：Agent 将反思得出的 “经验教训”（例如，“直接搜索 'A and B' 不如分别搜索 'A' 和 'B' 再整合”）存储到其记忆（通常是长期记忆）中。
4. **优化未来行动**：在后续的 ReAct 循环中，Agent 的 “Thought” 阶段会参考这些记忆，从而避免犯同样的错误，做出更优的决策。

解决的问题：**Reflection 主要解决 ReAct 的短视和低效问题**。

- **克服局部最优**：标准的 ReAct 可能会陷入一个局部最优的行动循环里。Reflection 通过 “跳出画面看画面” 的批判性思考，帮助 Agent 识别并修正这种循环，寻找全局更优的路径。
- **从失败中学习**：ReAct 本身对失败的处理比较被动（例如，简单的重试）。Reflection 机制让 Agent 能够主动分析失败的原因，并形成可复用的经验，实现 “吃一堑，长一智”，从而提高长期任务的成功率。

## 第二部分：工程设计与实践

### 4. 在设计 ReAct Agent 时，如何选择合适的工具（Tools）？工具的粒度和描述有什么讲究吗？

工具的选择和设计是 ReAct Agent 成败的关键，需要遵循以下原则：

- **原子性与正交性**：**每个工具应该只做好一件事（原子性），并且功能之间尽量不要有过多重叠（正交性）**。例如，`search_web` 和 `query_database` 是好的工具，但 `search_web_and_then_query_database` 就不是一个好的工具，因为它耦合了两个独立操作。
- **合适的粒度**：工具的粒度不宜过大或过小。
  - 粒度过小：例如，提供 `add(a, b)`、`subtract(a, b)` 等基础运算工具，会让 Agent 完成一个复杂计算（如 `(a+b)*c`）需要太多步骤，效率低下。更好的做法是提供一个 `calculator(expression: str)` 工具。
  - 粒度过大：例如，一个 `analyze_market_and_generate_report()` 的 “黑盒” 工具，虽然强大，但失去了 ReAct 过程的可解释性和灵活性。
- **清晰且精确的描述（Description）**：工具的描述是 LLM 决定是否以及如何使用该工具的唯一依据。描述必须：
  - 清晰说明功能：明确说明工具 “能做什么”。例如，“用于查询实时天气信息”。
  - 详细描述参数：清楚说明每个参数的含义、格式和可能的值。例如，`get_stock_price(ticker: str)`，其中 `ticker` 是股票代码，如 `'AAPL'` 或 `'GOOG'`。
  - 给出示例（推荐）：如果参数格式复杂，在描述中给出一个示例会非常有帮助。例如，`plot_chart(type='line', data='[[1,2],[3,4]]')`。
- **为 LLM “量身定做”**：有时需要设计一些专门为了方便 LLM 思考的工具。例如，一个 `write_to_scratchpad(content: str)` 工具，可以让 Agent 在复杂的思考过程中临时 “记笔记”。

###  ReAct Agent 的上下文 (Context) 管理工程策略

上下文管理是平衡 “记忆完整性” 和 “成本 / 性能” 的艺术。当历史轨迹过长时，常用策略如下：

1. **滑动窗口 (Sliding Window)**

   最简单的方法，只保留最近的 `k` 轮 TAO 交互。优点是实现简单，缺点是会完全丢失早期的重要信息，导致 “长期失忆”。

2. **摘要化 (Summarization)**

   - **固定周期摘要**：每隔 N 轮，让一个独立的 LLM 调用将之前的历史记录总结成一段摘要，并用这个摘要替换原始记录。
   - **滚动摘要**：当上下文长度即将达到阈值时，将最旧的一轮或几轮交互进行摘要，然后拼接到当前上下文中。

3. **混合策略 (Hybrid Approach)**

   这是最常用也最有效的策略。

   - **保留近期，摘要早期**：保留最近的 `k` 轮（例如 3 轮）完整的 TAO 轨迹，以确保 Agent 对当前任务有充分的短期记忆。对于 `k` 轮之前的历史，则将其总结成一段高度浓缩的摘要。
   - **示例**：上下文 = `[早期历史摘要] + [倒数第3轮TAO] + [倒数第2轮TAO] + [最近一轮TAO]`

4. **向量化记忆 (Vectorized Memory / RAG)**

   将每一轮的 TAO 三元组（尤其是成功的或重要的）作为独立的 “记忆片段”，嵌入成向量并存储在向量数据库中。在每一轮思考前，根据当前任务和思考内容，从数据库中检索出最相关的几个历史记忆片段，并将其动态地插入到 Prompt 中。这种方法实现了真正意义上的 “长期联想记忆”。

5. **Token 级别的智能裁剪**

   分析历史记录中每个 Token 的重要性，优先裁剪掉信息密度较低的部分（如冗长的 API 返回、重复的思考等），但这实现起来非常复杂。

### 6. 如果一个 ReAct Agent 在执行中陷入了无限循环（比如反复调用同一个工具得到相同结果），你会如何从工程上发现并打破这种循环？

发现和打破循环需要一套 “检测 - 干预” 机制：

------

#### 一、发现循环的机制

1. **状态哈希检测**：在每一轮循环后，对 Agent 的关键状态（如最近 N 轮的 `Action` 和 `Observation` 序列）计算一个哈希值。如果连续 M 次哈希值相同或出现重复，则判定为陷入循环。
2. **重复行动计数**：监控每个（工具 + 参数）组合的调用次数。如果在短时间内（例如，连续 3 轮内）完全相同的调用重复出现，且 `Observation` 也相同，则判定为循环。
3. **进度停滞检测**：定义一个衡量任务 “进展” 的指标（这比较困难，可以是代码行数增加、子任务完成数等）。如果连续多轮该指标没有变化，可能陷入了停滞 / 循环。
4. **LLM 自省**：在 `Prompt` 中加入指令，要求 LLM 在思考时自我检测是否在重复无效劳动。例如：“思考：... 我是否在重复之前的行动且没有得到新的有效信息？如果是，我应该尝试改变策略。”

------

#### 二、打破循环的干预策略

1. **强制注入错误 / 提醒**：一旦检测到循环，系统可以主动修改下一轮的 `Observation`，向其注入一条 “系统提示”，例如：“观察：你已经连续 3 次执行了相同的操作但没有取得进展，请改变你的思考方式或尝试其他工具。”
2. **增加探索性（Increase Temperature）**：临时调高 LLM 的 `temperature` 参数，鼓励它生成更多样化、不那么 “循规蹈矩” 的思考和行动。
3. **行动惩罚 / 禁用**：临时 “禁用” 那个被循环调用的工具，或者在 `Prompt` 中明确告知 LLM“请不要再使用 [工具名]，因为它无法提供新信息”，迫使它寻找替代方案。
4. **人类介入（Human-in-the-loop）**：在多次自动干预无效后，系统可以暂停 Agent，并将当前困境上报给人类操作员，由人类提供下一步的指导。这也是 ReAct 可解释性强所带来的优势。

### 7. 在 ReAct 中，Few-shot 示例的质量和结构至关重要。如果一个示例的执行轨迹是次优的，会对 Agent 产生什么影响？如何系统地构建和评估高质量的示例？https://arxiv.org/html/2405.13966v1

------

在 ReAct 智能体的 Prompt 里，给模型提供 **1~N 个「完整的思考 - 行动 - 观察（TAO）轨迹案例」**，让它模仿这种格式和逻辑，来解决当前任务。

#### 一、次优示例的影响

LLM 具有极强的模仿能力，如果 Few-shot 示例中的执行轨迹是次优的（例如，走了弯路、用了错误的工具但最终碰巧成功了），Agent 会倾向于模仿这种次优甚至错误的行为模式，导致：

- **效率低下**：Agent 会复现示例中的冗余步骤。
- **路径依赖**：Agent 可能学不会使用更优的工具或策略，思维被 “固化” 在示例的路径上。
- **在相似但有关键差异的场景下失败**：Agent 学到的是 “表象” 而非 “本质”，当新任务与示例有细微但关键的不同时，模仿来的次优策略会直接导致失败。相关研究表明，ReAct 的性能有时过度依赖示例和查询之间的表层相似性，而非真正的推理能力。

------

#### 二、构建和评估高质量示例的系统方法

1. **黄金路径构建（Golden Path Construction）**

   - 由领域专家为每个代表性任务手动编写 “最优化” 的 TAO 轨迹，确保是最高效、最直接的解法。
   - 也可让强大的 LLM（如 GPT-4）先生成解决方案，再由专家审查精炼，剔除冗余和错误。

2. **多样性与覆盖度**

   - 示例集应覆盖所有关键工具的使用方法。
   - 覆盖任务的不同成功路径和典型失败场景，加入 “如何从失败中恢复” 的示例，比只给成功示例更有价值。

3. **鲁棒性测试（Robustness Testing）**

   - **留一法评估（Leave-One-Out）**：假设有 N 个高质量示例，每次拿出一个，用剩下的 N-1 个作为 few-shots 测试被拿出的任务，评估示例集的泛化能力。
   - **扰动测试**：对任务描述进行微小的同义词替换或语法改写，观察 Agent 的行为是否依然稳定。若 Agent 因 “搜索” 被换成 “查找” 就失败，说明它学到的不是语义，而是模板。

4. **自动化评估框架**

   建立一个包含几十个到几百个测试用例的评测集。每次更新 Few-shot 示例后，都完整跑一遍评测集，通过成功率、平均步数、成本等指标来量化评估新示例集的好坏，从而进行持续迭代优化。

### 8. ReAct 延迟与成本优化策略

**ReAct 因多次 LLM 调用带来了显著的延迟和 API 成本问题**，以下是三种核心优化策略：

------

#### 1. 工具与行动的 “批量处理”（Tool & Action Batching）

- **并行工具调用**：利用模型的并行函数调用（Parallel Function Calling）能力，让 LLM 一次性生成多个互不依赖的 `Action`，由系统并行执行并批量返回 `Observation`，避免多轮 TAO 循环。例如同时查询两家公司的股价。
- **优化工具粒度**：**将多个高度相关、连续调用的细粒度工具合并为一个粗粒度工具**。例如将 `search_flight`、`search_hotel`、`search_car` 合并为 `plan_trip`，减少调用次数。

------

#### 2. 智能决策何时 “思考”（Selective Reasoning）

- **简单任务直出 Action**：通过轻量级分类模型或 LLM 自判断，对简单任务直接生成 `Action` 跳过 `Thought` 步骤，仅在复杂决策点或错误时才启动完整思考。
- **从 ReAct 到 Act-only 的动态切换**：在任务的确定性阶段，临时切换到 Act-only 模式连续执行多个 `Action`，之后再切回 ReAct 模式进行检查调整，减少不必要的思考步骤。

------

#### 3. 模型分层与缓存（Model Tiering & Caching）

- **模型分层（Model Cascading）**：为不同步骤使用不同成本 / 性能的模型。用廉价快速的模型（如轻量版 GPT）处理简单格式化的思考和行动生成；仅在任务卡住或需要复杂规划时，才升级到昂贵的强模型（如 GPT-4/5）。
- **结果缓存（Result Caching）**：对纯函数性质的工具调用（如计算器 `calculator("2+2")`）结果进行缓存，相同输入直接返回缓存结果，避免重复工具执行和 LLM 调用。

### 9. 如何对一个 ReAct Agent 的性能进行有效评测？你会关注哪些核心指标？

评测 ReAct Agent 是多维度任务，不能只看最终结果对错，核心关注以下三类指标：

------

#### 1. 任务完成质量（Task Success Metrics）

- **成功率（Success Rate）**：最核心指标，即 Agent 成功完成任务的比例。确定性任务（问答、代码生成）可通过精确匹配或单元测试评估；无唯一答案的任务（报告撰写）需人工评估或基于规则评估。
- **结果准确性 / 质量评分（Accuracy / Quality Score）**：即使任务 “成功”，结果质量也可能存在差异。例如代码是否高效、报告是否全面，通常由领域专家进行人工标注（如 1-5 分制）。

------

#### 2. 效率与成本（Efficiency & Cost Metrics）

- **LLM 调用次数（Number of LLM Calls）**：完成一次任务平均需要的 TAO 循环轮数，直接关联延迟与成本。
- **Token 消耗（Token Consumption）**：包括 Prompt Tokens 和 Completion Tokens 总量，是 API 成本的直接体现。
- **端到端延迟（End-to-End Latency）**：从用户发指令到 Agent 给出最终答案的总时间。
- **工具调用次数（Number of Tool Calls）**：反映 Agent 对外部工具的依赖程度。

------

#### 3. 行为与可解释性（Behavioral & Interpretability Metrics）

- **路径效率（Path Efficiency）**：Agent 选择的方案是否接近 “黄金路径”（最优解），是否存在冗余操作，可与专家定义的理想轨迹对比评估。
- **错误恢复能力（Error Recovery Rate）**：当工具调用失败或遇到非预期 Observation 时，Agent 能成功恢复并继续任务的比例。
- **幻觉率（Hallucination Rate）**：Thought 或最终答案中出现事实性错误的频率，需人工核查。
- **工具选择准确率（Tool Selection Accuracy）**：Agent 选择的工具是否是解决当前问题的最合适工具。

------

通过建立包含多个典型任务的评测集，持续追踪以上指标，即可系统、量化地评估和优化 ReAct Agent 的性能。