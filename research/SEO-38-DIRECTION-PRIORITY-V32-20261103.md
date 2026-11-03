# Convert-Units V32｜以原方案 600 条 Semrush 证据驱动的 38 个工具 SEO 优先级

**核验日期 2026-11-03｜只复用用户原有文件，不要求重新购买/导出 Semrush，也不新建网页。**

## 1. 证据清点：逐条源文件交叉校验

- 原始用户美国 Semrush 样本：`research/semrush-us-600.tsv` 600 条；可直接追溯到 `research/SEO-PLAN-V2.md` 附录的第 1—600 行。
- 原方案已逐条审核，其中 **162 条**被归为「数值+源单位+目标单位可识别、原URL源侧匹配」，对应 **147 个**不同的数值+方向+竞品源 URL 组合。
- 162 条严格有效记录全部归入 **15/38** 个已存在的方向工具，没有一条无法映射。
- `src/data/seeds.json` 中 **92/92** 已建数值页面均与原600条的关键词、US Volume、KD、竞品估算流量和源 URL **严格一致**；不存在未溯源种子。它们不是本次新建页面。
- 15 个未来的数值页条件候选与 77 个 noindex 数值页保留，**Cloudflare 预览所有 157 个页面仍全站 noindex**。
- **来源陷阱：** 其他 438 条没有通过严格数值页标准，但其中部分（例如 `convert kw hp`、`kn to pounds converter`）仍是现有方向工具的可用 SEO 证据；「不适合生成独立数值页」不代表「关键词数据无效」。

## 2. 38 个方向工具：根据真实样本安排现有页面的 SEO 检查顺序

以下表格中的 Volume、KD、排名、估算流量**只属于「代表性原始关键词」在 Semrush 对竞品的历史观测**；不可把 `240 kg to lbs` 的 8,100 月搜索量当成 `kg to lbs` 通用词的搜索量。P1/P2 是现有页面的 SEO 检查顺序，**不是分阶段开发、排名预测或增加 URL 的许可**。

| 工具 | 162 严格记录数 | 已建数值页 | 代表性原关键词 | US Vol | KD | 竞品排名 | 该词竞品估算流量/月 | SEO 检查顺序 |
|---|---:|---:|---|---:|---:|---:|---:|---|
| `kg-to-lbs` | 19 | 14 | `240 kg to lbs` | 8100 | 16 | 2 | 526 | P1_EXISTING_PAGE_SEO_REVIEW |
| `lbs-to-kg` | 121 | 56 | `126 pounds in kg` | 5400 | 20 | 5 | 162 | P1_EXISTING_PAGE_SEO_REVIEW |
| `ft-lbf-to-nm` | 1 | 1 | `400 pound feet to nm` | 480 | 29 | 1 | 119 | P1_EXISTING_PAGE_SEO_REVIEW |
| `celsius-to-fahrenheit` | 2 | 2 | `37.9 celsius to fahrenheit` | 5400 | 27 | 10 | 70 | P1_EXISTING_PAGE_SEO_REVIEW |
| `minutes-to-hours` | 2 | 2 | `10000 minutes to hours` | 2400 | 21 | 9 | 52 | P1_EXISTING_PAGE_SEO_REVIEW |
| `milliseconds-to-minutes` | 4 | 4 | `3600000ms to min` | 390 | 23 | 2 | 25 | P2_EXISTING_PAGE_SEO_REVIEW |
| `kpa-to-atm` | 1 | 1 | `50kpa to atm` | 1900 | 12 | 10 | 24 | P2_EXISTING_PAGE_SEO_REVIEW |
| `in-to-cm` | 1 | 1 | `17.7 inches to cm` | 880 | 23 | 6 | 21 | P2_EXISTING_PAGE_SEO_REVIEW |
| `seconds-to-minutes` | 2 | 2 | `6000 seconds to minutes` | 880 | 20 | 7 | 21 | P2_EXISTING_PAGE_SEO_REVIEW |
| `kpa-to-psi` | 1 | 1 | `108 kpa to psi` | 1000 | 29 | 9 | 19 | P2_EXISTING_PAGE_SEO_REVIEW |
| `milliseconds-to-seconds` | 4 | 4 | `60000 ms to seconds` | 880 | 24 | 8 | 19 | P2_EXISTING_PAGE_SEO_REVIEW |
| `ml-to-us-fl-oz` | 1 | 1 | `355 ml to fluid ounces` | 720 | 20 | 6 | 17 | P2_EXISTING_PAGE_SEO_REVIEW |
| `kmh-to-mph` | 1 | 1 | `330kmh to mph` | 1000 | 21 | 10 | 13 | P2_EXISTING_PAGE_SEO_REVIEW |
| `seconds-to-hours` | 1 | 1 | `14400 seconds to hours` | 1000 | 19 | 10 | 13 | P2_EXISTING_PAGE_SEO_REVIEW |
| `m-to-ft` | 1 | 1 | `8849 meters to feet` | 260 | 13 | 3 | 11 | P2_EXISTING_PAGE_SEO_REVIEW |
| `oz-to-g` | 0 | 0 | `3.5oz to grams` [非严格] | 2400 | 50 | 7 | 57 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `cm-to-in` | 0 | 0 | `cms into inches` [非严格] | 320 | 53 | 1 | 26 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `in-to-mm` | 0 | 0 | `2.35 inches to mm` [非严格] | 320 | 29 | 2 | 20 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `l-to-us-gal` | 0 | 0 | `6.7 liters to gallons` [非严格] | 210 | 26 | 3 | 9 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `psi-to-kpa` | 0 | 0 | `32 psi to kpa` [非严格] | 260 | 10 | 3 | 11 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `m2-to-ft2` | 0 | 0 | `47m2 to sq ft` [非严格] | 480 | 25 | 8 | 10 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `kn-to-lbf` | 0 | 0 | `kn to pounds converter` [非严格] | 320 | 8 | 1 | 26 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `kw-to-hp` | 0 | 0 | `convert kw hp` [非严格] | 480 | 25 | 3 | 11 | P2_NONSTRICT_DIRECTIONAL_QUERY_REVIEW |
| `ft-to-m` | 0 | 0 | `foot into meter` [非严格] | 390 | 43 | 2 | 25 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `us-fl-oz-to-ml` | 0 | 0 | `how many ml is an ounce of liquid` [非严格] | 480 | 32 | 2 | 21 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `us-gal-to-l` | 0 | 0 | `gallon in ml` [非严格] | 590 | 13 | 1 | 48 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `us-cup-to-ml` | 0 | 0 | `how many cups is 1.8 liters` [非严格] | 590 | 11 | 5 | 17 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `bar-to-psi` | 0 | 0 | `2.35 bar` [非严格] | 2400 | 20 | 1 | 316 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `mph-to-kmh` | 0 | 0 | `210 kph to mph` [非严格] | 2900 | 19 | 10 | 37 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `gb-to-mb` | 0 | 0 | `giga byte conversion` [非严格] | 320 | 14 | 3 | 11 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `kg-m3-to-g-cm3` | 0 | 0 | `g/cm3` [非严格] | 720 | 7 | 4 | 25 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `ms2-to-fts2` | 0 | 0 | `2 m/s2` [非严格] | 720 | 23 | 5 | 21 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `mpg-us-to-l-100km` | 0 | 0 | `mpg l/km` [非严格] | 1300 | 33 | 4 | 45 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `l-min-to-m3-h` | 0 | 0 | `m3/h to l/min` [非严格] | 90 | 15 | 1 | 11 | REFERENCE_ONLY_NOT_DIRECTIONAL_METRIC |
| `g-to-oz` | 0 | 0 | — | — | — | — | — | NO_US_KEYWORD_EVIDENCE_IN_600_SAMPLE |
| `us-tbsp-to-us-tsp` | 0 | 0 | — | — | — | — | — | NO_US_KEYWORD_EVIDENCE_IN_600_SAMPLE |
| `fahrenheit-to-celsius` | 0 | 0 | — | — | — | — | — | NO_US_KEYWORD_EVIDENCE_IN_600_SAMPLE |
| `nm-to-ft-lbf` | 0 | 0 | — | — | — | — | — | NO_US_KEYWORD_EVIDENCE_IN_600_SAMPLE |

## 3. 结论与可执行的既有页面优化顺序

**第一批优先核对（严格记录中竞争关键词估算流量较高）**：`kg-to-lbs`（240 kg to lbs，526/月）、`lbs-to-kg`（126 pounds in kg，162/月）、`ft-lbf-to-nm`（400 pound feet to nm，119/月）、`celsius-to-fahrenheit`（37.9 celsius to fahrenheit，70/月）、`minutes-to-hours`（10000 minutes to hours，52/月）。这里数字是**某个具体关键词对某个竞品的 Semrush 估算月访问量**，不是该主方向关键词总流量。

**第二批保留现有页面，核对标题/说明/内链是否准确响应用户意图**：`milliseconds-to-minutes`、`kpa-to-atm`、`seconds-to-minutes`、`in-to-cm`、`kpa-to-psi`、`milliseconds-to-seconds`、`ml-to-us-fl-oz`、`seconds-to-hours`、`kmh-to-mph`、`m-to-ft`。不因长尾词有 Volume 就机械复制成新数值页。

**另有需要特别注意的历史通用方向词：**

- `kn to pounds converter`：US Volume **320**、KD **8**、竞品位置 **1**、该词估算流量 **26/月**，竞品实际排名链接为 `https://convert-units.info/force/kilonewton/438`。这能支持已有 `kn-to-lbf` 工具的方向词研究；但 `pounds` 必须结合力维度解释为 pound-force，不能宣称包含某个精确数值。
- `convert kw hp`：US Volume **480**、KD **25**、竞品位置 **3**、该词估算流量 **11/月**，真实来源 `https://convert-units.info/power/kilowatt/0.85`。这是已存在的 `kw-to-hp` 工具的真实关键词证据。
- `47m2 to sq ft`：US Volume **480**、KD **25**、竞品位置 **8**、该词估算流量 **10/月**。原 V2 把这条标记为「源单位或物理量与竞品URL不匹配」，**本版保留原审核结论**：只能作为页面方向研究，未经独立复核不得据此生成索引数值页。
- `3.5oz to grams`：历史 US Volume 2,400、KD50，不能将其伪装成低难度机会；原始文件中的多条排名行也不可重复叠加为搜索量。

## 4. 关键词覆盖警戒

- **121/162** 严格记录属于 `lbs-to-kg`，**19/162** 属于 `kg-to-lbs`：重量方向占样本绝大多数。因此其他工具没有样本不意味着没有真实搜索需求，不能得出这些工具应删除的结论。
- 一个关键词多个 Semrush 排名记录、同一数值多个变体关键词时，不直接求和 Volume/流量；本版在方向层面用单条代表性记录、记录数量和不同来源数值 URL 分别描述，不做假总流量预测。
- 若词属于泛意图、反向换算、源单位维度不匹配或数值错配，只保留原关键词的独立数据行和相应审核限制。没有真实主词数据的方向保留现有工具，不补造指标。
- 600 条原表中的历史数据不证明今日实际 Google 排名、不保证新站收录和广告收入；GSC尚未上线的流量未知。

## 5. 已生成并可核验的三层文件

- `research/SEMRUSH-162-STRICT-ROWS-BY-DIRECTION-V32-20261103.csv`：**162 行严格数值词**，每行保留原表行号、竞品 URL、US Volume、KD、历史名次、估算流量、审核决定、是否落在92个已建种子及15个未来条件候选。
- `research/SEO-38-DIRECTION-RESEARCH-MATRIX-V32-20261103.csv`：**38 行已建方向工具**，逐项给出严格样本数、不同数值 URL 数、现有种子页数、代表词、来源排名 URL、原 V31 相关词与缺陷标记、既有页面的 SEO 检查顺序。
- 本报告：保留查证逻辑和精简的SEO执行次序。原始数据仍由 `research/semrush-us-600.tsv` 和 `research/SEO-PLAN-V2.md` 唯一负责。

## 6. SEO 修改范围与安全门槛

- 本版**只新增 research 数据和研究报告，不动静态站代码**。现有 Meta、Title、H1、内链、功能不因未经用户授权的新关键词扩页而改变；更不会据此开放任何页面收录。
- 下一次实际 on-page 修订只针对已存在的方向工具和批准的数值页面，对照真实搜索意图、完整单位名称与 US/Imperial 说明；不制造无来源虚假FAQ。
- **正式域名暂缓**；`convert-units-bwa.pages.dev` 仍为 Cloudflare 临时预览域名，全站 `noindex`。15 个数值 SEO 条件候选不代表现时已经可索引。

**结论：原材料足够完成严格证据清点和第一轮既有页面 SEO 工作排序，不需要重复向用户索要这 600 条关键词。**
