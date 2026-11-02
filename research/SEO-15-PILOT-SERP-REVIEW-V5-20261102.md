# 15 个数值页面：公开搜索结果逐项对照与功能差异化核查（2026-11-02）

## 研究边界与结论

- 逐项检索了 `src/data/numeric-seo-policy.json` 的 **15 个拟索引数值查询**，每项至少保留 1 个可核对的实际外部竞争网页和可见功能；证据清单：`research/SEO-15-SERP-EVIDENCE-20261102.json`。
- **13 个**检索到以特定数字为标题/主内容的独立结果页，另 **2 个**（400 lb-ft→N·m、108 kPa→psi）在通用换算页面的表格/示例中明确覆盖该数字。
- 搜索引擎结果来自公开网页检索，不是固定地域、个性化控制、广告排除条件下的**Google 美国前十 SERP 快照**。不能从这些结果声称名次、自然流量、Google AI 摘要比例，或者低竞争。
- 原始竞品 Semrush Volume/KD 仍以用户提供的 600 行原始文件为准，**不由此次网页检索更新**。
- 对全部 15 个意图，基本答案、公式及参考表普遍早有竞争页面；“仅凭准确答案能超过它们”的结论**不成立**。
- 在尚未正式发布到真实域名、没有 GSC 结果前，维持 15 个**候选**，并继续让其他 77 个结果页 `noindex`。**不自动放大索引，不虚构内容差异化或数据。**

## 逐词核查（竞争网页及已观察到的内容）

| 数值搜索词 | 可核查竞争网页 | 已看到的具体内容 | 竞争观察 |
|---|---|---|---|
| 240 kg to lbs | [kg-to-lbs.appspot.com](https://kg-to-lbs.appspot.com/240-kg-to-lbs.html) | 独立 240 kg 结果、公式、其他质量单位 | 完整数值页 |
| 126 pounds in kg | [Measurements Calculator](https://www.measurementscalculator.com/126-pounds-to-kilograms-conversion/) | 独立结果、kg+g 表示、质量定义 | 完整数值页 |
| 400 pound feet to nm | [0-60calc](https://0-60calc.com/lb-ft-to-nm/) | lb-ft→Nm 通用换算表包括 400 lb-ft | 通用页覆盖具体数字 |
| 37.9 celsius to fahrenheit | [celsiusfahrenheit.co](https://www.celsiusfahrenheit.co/37.9) | 100.22°F、代入公式、附近数值 | 完整数值页；不建议跟随医疗判断文字 |
| 10000 minutes to hours | [Calculateme](https://www.calculateme.com/time/minutes/to-hours/10000) | 166.66667 小时、分数与自然语言表述 | 完整数值页 |
| 3600000ms to min | [Calculateme](https://www.calculateme.com/time/milliseconds/to-minutes/3600000) | 60 分钟的精确答案、科学记数法 | 完整数值页 |
| 50kpa to atm | [Convertools](https://www.convertools.net/plumbing/kpa-to-atm/50-kpa/) | 0.493462 atm、交互计算器、附近值 | 完整数值页 |
| 17.7 inches to cm | [FreeUnitConvert](https://freeunitconvert.com/en/length/in-to-cm/17.7/) | 44.958 cm、代入公式、长邻近表 | 完整数值页 |
| 6000 seconds to minutes | [Calculateme](https://www.calculateme.com/time/seconds/to-minutes/6000) | 精确 100 分钟、文字与科学记数法 | 完整数值页 |
| 108 kpa to psi | [kpatopsi.com](https://kpatopsi.com/) | 通用首页单独提及 108 kPa→15.66 psi | 通用页覆盖具体数字 |
| 60000 ms to seconds | [Convertilo](https://convertilo.com/60000-milliseconds-to-seconds) | 精确 60 秒、公式 | 完整数值页 |
| 355 ml to fluid ounces | [Calculateme](https://www.calculateme.com/volume/milliliters/to-fluid-ounces/355) | 约 12.003978 US fl oz；区分美制液盎司与质量盎司 | 完整数值页 |
| 330kmh to mph | [Convert-Top](https://convert-top.com/velocity-speed/kilometers-per-hour/km-h-to-mph/330/) | 约 205.0524934 mph；公式与多种格式 | 完整数值页 |
| 14400 seconds to hours | [Calculateme](https://www.calculateme.com/time/seconds/to-hours/14400) | 4 小时；文字、科学记数法 | 完整数值页 |
| 8849 meters to feet | [CoolConversion](https://coolconversion.com/length/8849-meter-to-foot) | 英尺结果、反向换算、其他单位 | 完整数值页 |

## 本轮选择的实际差异化：解释复制已舍入结果的回算误差

竞争页面已基本覆盖“答案、公式、附近表”，本站原本也有这些功能。继续注水无益。本轮针对 **15 个候选中的确实存在两位小数舍入损失的数值**，新增以同一换算引擎计算的简短说明：

1. 显示转换到目标单位后**四舍五入到至多两位小数**的数值；
2. 将这个数值换算回原始单位；
3. 报告相对原输入的差异，解释 **显示舍入误差 ≠ 原始测量误差**。

例如 `10,000 min` 的精确转换是 `166⅔ hr`。若只复制 `166.67 hr`，再转成分钟会得到 `10,000.2 min`，比原值多 `0.2 min`。对 `14,400 s → 4 hr` 等舍入后仍无损失的数值不显示面板。

这些只是**算术上的额外实用性**，并非已验证的唯一卖点或排名优势；不能代替对真实用户体验的后续评价。

## 为什么不改变现有发布策略

- 15 个查询都属于“直接求数值”，至少一个竞争网页已包含相关答案；没有证据显示应大规模追加其它随机数值页。
- 父方向工具与单个具体数字页面仍可能争夺相同的搜索结果展示机会；即使每方向仅选一个数字，也不能保证 Google 会同时收录父子页。
- 部分搜索有特殊语境但不能直接推定。37.9°C 的查询可能来自测温，本站只换算温度，不编造症状解释或医疗建议；400 lb-ft 的查询只换算扭矩，不提供未经原设备制造商确认的扭矩设定。
- 在正式域名未决定之前，`pages.dev` 保持全站 `noindex`；报告中的索引数量均指**未来候选**，不是当前 Google 收录量。

**下一次可核验的外部证据**：正式站点的 GSC 网页索引、具体关键词展示/点击、用户任务完成率和真实 Core Web Vitals。未取得数据之前，不预测收入或 SEO 排名。
