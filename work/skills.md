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