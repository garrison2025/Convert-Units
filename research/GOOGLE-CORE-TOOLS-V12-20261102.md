# Core Converter SEO — 比较真实竞争页面并改进 lbs → kg · V12 · 2026-11-02

## 研究对象和数据边界

核心工具页面：`/convert/lbs-to-kg/`，以及复用同方向换算组件的首页 `/`。这轮先查实际竞争页面，再决定改哪些功能。以下来源仅证明**页面真实存在及其功能**；不是当前美国 Google Top 10 的固定快照，也不是 Semrush/Ahrefs 自然排名关键词或搜索量。本项目原有 600 行 Semrush 数据主要覆盖具体数值搜索词，不能用它来虚构通用词 `lbs to kg converter` 的 Volume/KD。

### 有独立网页可核查的竞争对象

| 原始竞争网页 | 实际可见内容 | 与本站比较 |
|---|---|---|
| [Metric Conversions — Pounds to Kilograms](https://www.metric-conversions.org/weight/pounds-to-kilograms.htm) | 计算器、0.45359237 精确因子、公式、可调小数精度及独立换算表 | 本站已有公式、精度及参考表；仅添加文字无明显用户收益 |
| [Metric Conversions — Pounds to Kilograms table](https://www.metric-conversions.org/weight/pounds-to-kilograms-table.htm) | 起始值、增量、准确度调节和长表 | 本站有交互计算器和 CSV 批处理；不宜制造几十个重复表格 URL |
| [RapidTables — lbs to kg](https://www.rapidtables.com/convert/weight/pound-to-kg.html) | 换算示例及 lb/kg/**kg＋g** 三栏表 | 本站原先缺少直观的“整千克＋整克”输出，值得补足 |

这些竞品已满足“精确答案、公式、换算表”基本意图。Google 官方鼓励有用、可靠、以实际用户任务为中心的内容，并反对单纯为了排名大规模生产页面：
[Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。

## 本轮交付

1. **可变的 kg＋g 辅助读数**：固定方向 `lbs → kg` 的工具及首页，除了十进制 kg 结果，增加 `≈ xx kg yy g`，并标明“Rounded to the nearest gram”。它来自相同换算引擎，不复制竞品数据。初始首页的 `149 lb` 显示 `≈ 67 kg 585 g`，`150 lb` 显示 `≈ 68 kg 39 g`。当两位小数无法表达整数克时，不误写成精确等式。
2. **修复原有复制换算式准确性缺陷**：此前在用户选择保留两位小数时仍会输出如 `150 lb = 68.04 kg`，但 68.04 kg 是四舍五入后的近似值。现使用 `displayRelation()` 输出 `150 lb ≈ 68.04 kg`；精确的 `1 lb = 0.45359237 kg` 保留等号。屏幕阅读器的辅助计算说明也同步区别 `equals` 与 `is approximately`。
3. **严格测试与复用**：`kgAndWholeGrams()` 对进位（如 1.9998 kg→2 kg 0 g）、0、千位分组、安全输入均有单元测试。实际 Chrome 测试覆盖输入更新、复制、切换方向后隐藏辅助读数。新的静态 HTML 审计保证不是仅依赖 JavaScript 才生成首屏数据。
4. **不扩大 SEO 页面**：现有 157 个路由、38 个方向工具、92 个数值结果页，以及 15 个候选/77 个 noindex 决策不变。正式域名与 GSC 仍按用户要求推后；临时 `pages.dev` 维持 noindex。

## 尚无证据支持的结论

当前没有该通用工具关键词的经本轮实际获取、可核对的 Semrush/Ahrefs US Volume/KD 或排名列表；没有实际 Google 展示/点击变化；不能声称这次增加 kg＋g 以后一定提高排名或流量。基于竞品页面功能差异完成的只是有真实操作价值的网页改进。

待官方域名发布且出现 GSC 数据后，再比较同一 URL 的 CTR、查询、排名及网页体验；不要在没有数据时继续堆砌重复文案。
