# Google SEO V13 — 现有时间换算工具的实时可读时长（2026-11-02）

## 决策：基于现有竞品和原始关键词记录

### 仓库已有实际竞争站 Semrush 证据
以下数据来自用户提供的 `convert-units.info` 竞品关键词导出（`src/data/seeds.json` 对应源行），**不是本站流量、Google 真实排名或更新后的搜索量**：

| 搜索词（原文） | US Volume（Semrush 竞品估计） | KD | 现有本站结果页 |
|---|---:|---:|---|
| 10000 minutes to hours | 2,400 | 21 | `/convert/minutes-to-hours/10000/` |
| 14400 seconds to hours | 1,000 | 19 | `/convert/seconds-to-hours/14400/` |
| 6000 seconds to minutes | 880 | 20 | `/convert/seconds-to-minutes/6000/` |
| 60000 ms to seconds | 880 | 24 | `/convert/milliseconds-to-seconds/60000/` |
| 3600000ms to min | 390 | 23 | `/convert/milliseconds-to-minutes/3600000/` |

五个现有方向工具是 `/convert/minutes-to-hours/`、`/convert/seconds-to-hours/`、`/convert/seconds-to-minutes/`、`/convert/milliseconds-to-seconds/` 和 `/convert/milliseconds-to-minutes/`。这些方向的**独立通用词搜索量尚未核实**，但相关数值查询有以上实际原始竞品证据。

### 独立公开竞品网页与实际功能

- [CalculatorSoup — Minutes to Hours Converter](https://www.calculatorsoup.com/calculators/conversions/minutes-to-hours.php)：同时给出小时＋分钟、`h:mm` 和十进制小时；包括 345 分钟 = 5:45 = 5.75 小时的例子。
- [Calculator Academy — Minutes To Hours Calculator](https://calculator.academy/minutes-to-hours-calculator/)：明确支持十进制小时、小时＋分钟与含时分秒转换模式。
- [StatGarden — Minutes to Hours](https://statgarden.com/conversion/minutes-hours.html)：明确同时显示十进制小时与小时＋分钟。
- [Lizely — Seconds to HMS](https://www.lizecheng.net/calculator/guides/convert-seconds-to-hours-minutes-seconds-hh-mm-ss/)：单独强调**超过 24 小时不取模回绕**，与时钟时间不同。

来源属于公开网页可见功能，不是地理固定的 Google US SERP Top 10 快照。仅用于判断真实功能需求，不推断对方广告收入或本站未来排名。

## V13 实际产品差异

之前数值结果页的 `practicalEquivalents()` 只在某些整数秒换算时生成固定的时分秒说明。用户打开核心方向工具输入新值后，仍主要只能查看十进制小时；这次为**五个已存在的时间方向工具**新增第二种真正可操作的实时结果：

1. 默认值的 `h:mm:ss` 由构建时相同的计算引擎直接预渲染，抓取器不需运行 JavaScript 即可看到答案。
2. 输入改变后立即重算；可单独复制 `166:40:00` 等纯时长，不影响原本的十进制单位结果与复制功能。
3. `10,000 min → 166:40:00`，`14,400 s → 4:00:00`，`90.5 min → 1:30:30`，`3,600,000 ms → 1:00:00`，`90,000 s → 25:00:00`（超过 24 小时不重置）。
4. 毫秒部分保留至 3 位：`1001 ms → 0:00:01.001`；若输入有低于 1 毫秒的精度，显示 `≈` 与“Rounded to the nearest millisecond”；不能准确显示的极小时间量及溢出值不虚构时钟结果。
5. 以 `Elapsed duration` 标识区别时间跨度与**真实一天中的时刻**，避免把 `25:00:00` 错读为不合法时间。
6. 新面板在主要换算复制按钮**之后**，保护 320px 手机首页的首屏可用性；不会为了附加内容改变原有界面任务优先级。

## SEO 和测试边界

- 这是 Google 所称以用户任务为目的的实用主内容改进，参考 [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)，**不是一次排名或 CTR 已经提升的实证结果**。
- 代码位置：`src/assets/engine.mjs`（纯计算）、`scripts/build.mjs`（真实 HTML）、`src/assets/app.mjs`（动态交互）、`src/assets/inner.css`（响应式样式）。
- `tests/time-elapsed-seo.test.mjs`、`scripts/browser-smoke.mjs`、`scripts/seo-content-audit.mjs` 会检查五个方向、毫秒舍入、拷贝、切换方向、异常输入和 HTML 首屏静态答案。
- 页面路由总数仍为 157，15 个数值页候选、77 个 noindex 决策不变。尚无获准正式域名，Cloudflare pages.dev 保持全站 noindex。
- 继续坚持零额外固定成本、不使用付费服务/API、不创建只为 SEO 重复覆盖数字的页面。
