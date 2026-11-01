# Convert-Units 模式｜一次性完整开发、SEO 与低维护运营方案 V2.0
**版本日期：2026-11-01｜市场：美国英语｜交付方式：一轮开发→一轮验收→一次正式上线｜状态：具备实施方案，尚未验证新域名盈利**

> **用户最终约束（最高优先级）**：整个产品、设计、计算功能、正式页面、静态SEO、测试、基础合规、广告接入预留在**同一次开发**全部做好，不安排第二阶段补做；上线后不依赖定期维护、人工逐页更新、付费API、数据库或Cron任务。用户只在需要时做域名绑定、GSC站点验证与广告账号申请/配置等不可代办的账户操作。

## 0. 决策、数据口径与交付总量

| 项目 | 确认结果 | 证据口径 |
|---|---:|---|
| 竞品美国自然搜索关键词 | 47,744 | 用户 Semrush 截图，2026-10-31 |
| 竞品美国月自然搜索访问估算 | 25,200 | Semrush 估算，非GA4/GSC |
| 竞品流量成本估算 | US$2,100/月 | PPC等值，**不是广告收入** |
| 原始排名记录 | 600 | 用户 Semrush 文本导出 |
| 不同关键词（按小写去重） | 546 | 记录去重，不等于独立意图 |
| KD≤30 行数 | 536 | 逐行KD，仅作为工具难度信号 |
| 严格匹配且可提取明确方向的记录 | 162 | 数值+源单位+目标单位+原URL源侧同时匹配 |
| 严格匹配的不同规范数值意图 | 147 | 相同规范URL合并多个关键词 |
| **全部功能一次开发的定向工具页** | **37** | 清单完整见第4节 |
| **一次上线的数值SEO页面** | **92** | 70个重量 + 22个其他；详见第5节 |
| 任意数值换算能力 | 全部首发 | 对未独立索引的数值也能交互计算 |
| 新域名的SEO收入与获客 | 未证实 | 不保证收录、排名、AdSense或收入 |

**结论：建议直接建设完整、无需补功能的静态换算网站。** 已有证据证明存在长尾需求，但“竞品25.2K估算流量”不能等同我们能获得25.2K；尽量避免将程序化页面量当作收入预测。

## 1. 一次性交付的真正边界（不是分阶段路线图）

- **上线前必须完成**：品牌与设计系统、全站页面、所有定向工具、跨单位通用换算器、数值结果页、SEO元信息、内部链接、sitemap、robots、合规页、广告位预留、数据准确性测试、构建测试、GSC接入说明与部署文档。**不允许出现“Coming soon/以后做/下一版完善”**。
- **上线后无须补开发**：用户任意输入仍可使用转换；所有预选SEO页面已静态生成；访问不调用服务器或外部收费API；不需要定时抓取、新关键词搜集、数据库或人工维护单位系数。
- **仍然不可避免的少量运营工作**：域名续费；首次DNS部署与搜索验证；若申请AdSense则完成账号审核、真实publisher ID、ads.txt/同意管理配置；如服务条款、浏览器或浏览器安全政策变化，仍可能需要偶发修复。不可承诺“永久100%免维护”。
- 研究用关键词保留600行；**被审核排除的词仍可被普通换算器满足，但不会生成独立索引页**。这样一次性完成开发，并非把未完成工作延期。

## 2. 核心用户、差异化与变现逻辑

面向美国英语访客，第一流量目标是具体数值的磅/千克换算，同时提供长度、体积、压力、扭矩、时间、温度及相邻专业单位。用户输入内容后首屏立刻给答案，不要求注册或读长篇文章。

**必须一次性提供的、区别于Google即时答案的附加价值**：批量多行输入/CSV粘贴与导出、同值多单位对照表、区分US/Imperial单位、保留有效位数与工程计数法、可复制带结果分享链接、打印换算表、实时双向修改、适合手机的一键操作；复杂换算显示公式/说明/适用标准。

**主要变现**：AdSense（批准与实际RPM未知）；无收费墙、无登录、无订阅服务。核心换算和下载功能不会被广告遮挡。广告接入按真实账号信息配置，默认不可使用虚假的发布商ID。

## 3. 关键词分群与竞争含义

本方案**没有**把多个关键词Volume相加宣称市场规模。若两个不同关键词指向同一数字/单位/方向，就只构建一个数值页面；关键词行保留原各自搜索量、KD、竞品排名、流量、CPC、SERP与来源URL。

| 关键词（来自原文件） | 美国Volume | KD | 竞品名次 | 月流量估算 | 审核说明 |
|---|---:|---:|---:|---:|---|
| `240 kg to lbs` | 8,100 | 16 | 2 | 526 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `126 pounds in kg` | 5,400 | 20 | 5 | 162 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `149 lbs to kg` | 5,400 | 13 | 6 | 129 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `117 pounds to kg` | 2,400 | 19 | 4 | 84 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `144 pounds in kgs` | 1,900 | 18 | 4 | 66 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `138.8 lbs to kg` | 720 | 7 | 2 | 46 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `194 lbs to kg` | 3,600 | 17 | 10 | 46 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `37.9 celsius to fahrenheit` | 5,400 | 27 | 10 | 70 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `400 pound feet to nm` | 480 | 29 | 1 | 119 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `10000 minutes to hours` | 2,400 | 21 | 9 | 52 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `50kpa to atm` | 1,900 | 12 | 10 | 24 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `17.7 inches to cm` | 880 | 23 | 6 | 21 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `108 kpa to psi` | 1,000 | 29 | 9 | 19 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `355 ml to fluid ounces` | 720 | 20 | 6 | 17 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `330kmh to mph` | 1,000 | 21 | 10 | 13 | 数值+源单位+目标单位可识别、原URL源侧匹配 |
| `2.35 bar` | 2,400 | 20 | 1 | 316 | 目标单位未明确/泛查询 |
| `3.7 kilos to pounds` | 2,900 | 23 | 3 | 127 | 源单位或物理量与竞品URL不匹配 |
| `24 pounds to kg` | 1,900 | 8 | 2 | 123 | 关键词与竞品URL数值不匹配 |
| `1.85m to feet` | 3,600 | 13 | 5 | 108 | 关键词与竞品URL数值不匹配 |
| `8.8 kg to lb` | 1,300 | 10 | 3 | 57 | 源单位或物理量与竞品URL不匹配 |
| `210 kph to mph` | 2,900 | 19 | 10 | 37 | 源单位或物理量与竞品URL不匹配 |

以上“竞品流量”是Semrush对**该关键词对应的竞品排名记录**的估算，不能保证新站达到相同数据。`3.7 kilos to pounds`→`/weight/pound/3.7`及`24 pounds to kg`→`/weight/pound/0.24`等不能当作原页的正确映射。

### 3.1 17类竞品来源分布（不是17类都要造独立SEO页面）

| URL类别 | 样本行数 | 估算流量之和 | 用途 |
|---|---:|---:|---|
| 重量 `weight` | 246 | 5,956 | 首发重点 |
| 体积容量 `volume` | 100 | 1,888 | 全能工具功能/部分SEO |
| 长度 `length` | 45 | 903 | 全能工具功能/部分SEO |
| 压力 `pressure` | 29 | 851 | 全能工具功能/部分SEO |
| 时间 `time` | 52 | 842 | 全能工具功能/部分SEO |
| 密度 `density` | 35 | 695 | 全能工具功能/部分SEO |
| 扭矩 `torque` | 25 | 510 | 全能工具功能/部分SEO |
| 面积 `area` | 16 | 321 | 全能工具功能/部分SEO |
| 力 `force` | 11 | 206 | 全能工具功能/部分SEO |
| 数据存储 `data-storage` | 11 | 184 | 全能工具功能/部分SEO |
| 速度 `speed` | 10 | 183 | 全能工具功能/部分SEO |
| 温度 `temperature` | 5 | 145 | 全能工具功能/部分SEO |
| 加速度 `acceleration` | 4 | 129 | 全能工具功能/部分SEO |
| 油耗 `fuel-consumption` | 5 | 128 | 全能工具功能/部分SEO |
| 流量/流率 `flow-rate` | 3 | 37 | 全能工具功能/部分SEO |
| 功率 `power` | 2 | 24 | 全能工具功能/部分SEO |
| 单位前缀 `metric-prefixes` | 1 | 11 | 全能工具功能/部分SEO |
注：行级流量可能有重复URL/多条排名，不能视为全站分类真实流量，也不能求和作为新站可争取点击。

## 4. **一次性开发完成的全部定向核心工具页**

无论某类核心词是否在前600条中出现，以下功能**都要在同一个版本完成并上线**，不设P0/P1/P2。关键词核心词KD没有的保持“未核验”，不借数值词的搜索量。

| # | 单位类别 | 核心工具正式URL | 英文标题 | 关键词依据/限制 |
|---:|---|---|---|---|
| 1 | 重量 | `/convert/lbs-to-kg/` | Pounds to Kilograms | 定量重量查询已有强证据；该精确核心词Volume/KD未单独核实 |
| 2 | 重量 | `/convert/kg-to-lbs/` | Kilograms to Pounds | 定量重量查询已有强证据；该精确核心词Volume/KD未单独核实 |
| 3 | 重量 | `/convert/oz-to-g/` | Ounces to Grams | 词型出现但KD更高，工具功能必需；该精确核心词Volume/KD未单独核实 |
| 4 | 重量 | `/convert/g-to-oz/` | Grams to Ounces | 方向型搜索量待核实；该精确核心词Volume/KD未单独核实 |
| 5 | 长度 | `/convert/m-to-ft/` | Meters to Feet | 长度精确数值词有证据；该精确核心词Volume/KD未单独核实 |
| 6 | 长度 | `/convert/ft-to-m/` | Feet to Meters | 方向型搜索量待核实；该精确核心词Volume/KD未单独核实 |
| 7 | 长度 | `/convert/cm-to-in/` | Centimeters to Inches | 长度类别已有需求；该精确核心词Volume/KD未单独核实 |
| 8 | 长度 | `/convert/in-to-cm/` | Inches to Centimeters | 17.7 inches to cm 证据；该精确核心词Volume/KD未单独核实 |
| 9 | 长度 | `/convert/in-to-mm/` | Inches to Millimeters | 补充常用方向；该精确核心词Volume/KD未单独核实 |
| 10 | 体积容量 | `/convert/ml-to-us-fl-oz/` | Milliliters to US Fluid Ounces | 355 ml to fluid ounces 证据；该精确核心词Volume/KD未单独核实 |
| 11 | 体积容量 | `/convert/us-fl-oz-to-ml/` | US Fluid Ounces to Milliliters | 容量类证据；该精确核心词Volume/KD未单独核实 |
| 12 | 体积容量 | `/convert/l-to-us-gal/` | Liters to US Gallons | 功能补充，独立KD未查；该精确核心词Volume/KD未单独核实 |
| 13 | 体积容量 | `/convert/us-gal-to-l/` | US Gallons to Liters | 功能补充，独立KD未查；该精确核心词Volume/KD未单独核实 |
| 14 | 体积容量 | `/convert/us-cup-to-ml/` | US Cups to Milliliters | 功能补充，独立KD未查；该精确核心词Volume/KD未单独核实 |
| 15 | 体积容量 | `/convert/us-tbsp-to-us-tsp/` | US Tablespoons to Teaspoons | 功能补充，独立KD未查；该精确核心词Volume/KD未单独核实 |
| 16 | 温度 | `/convert/celsius-to-fahrenheit/` | Celsius to Fahrenheit | 37.9°C词有证据；该精确核心词Volume/KD未单独核实 |
| 17 | 温度 | `/convert/fahrenheit-to-celsius/` | Fahrenheit to Celsius | 方向型搜索量待核实；该精确核心词Volume/KD未单独核实 |
| 18 | 压力 | `/convert/bar-to-psi/` | Bar to PSI | 2.35 bar为泛单位词，不等同此方向KD；该精确核心词Volume/KD未单独核实 |
| 19 | 压力 | `/convert/kpa-to-psi/` | kPa to PSI | 108 kpa to psi 证据；该精确核心词Volume/KD未单独核实 |
| 20 | 压力 | `/convert/kpa-to-atm/` | kPa to atm | 50 kpa to atm 证据；该精确核心词Volume/KD未单独核实 |
| 21 | 压力 | `/convert/psi-to-kpa/` | PSI to kPa | 补充反向工具；该精确核心词Volume/KD未单独核实 |
| 22 | 扭矩 | `/convert/ft-lbf-to-nm/` | Foot-pounds to Newton-meters | 400 pound feet to nm 证据；该精确核心词Volume/KD未单独核实 |
| 23 | 扭矩 | `/convert/nm-to-ft-lbf/` | Newton-meters to Foot-pounds | 补充反向工具；该精确核心词Volume/KD未单独核实 |
| 24 | 时间 | `/convert/minutes-to-hours/` | Minutes to Hours | 10000 minutes to hours 证据；该精确核心词Volume/KD未单独核实 |
| 25 | 时间 | `/convert/seconds-to-minutes/` | Seconds to Minutes | 6000 seconds to minutes 证据；该精确核心词Volume/KD未单独核实 |
| 26 | 时间 | `/convert/milliseconds-to-seconds/` | Milliseconds to Seconds | 60000 ms to seconds 证据；该精确核心词Volume/KD未单独核实 |
| 27 | 时间 | `/convert/milliseconds-to-minutes/` | Milliseconds to Minutes | 3600000ms to min 证据；该精确核心词Volume/KD未单独核实 |
| 28 | 速度 | `/convert/kmh-to-mph/` | Kilometers per Hour to MPH | 330kmh to mph 证据；该精确核心词Volume/KD未单独核实 |
| 29 | 速度 | `/convert/mph-to-kmh/` | MPH to Kilometers per Hour | 补充反向工具；该精确核心词Volume/KD未单独核实 |
| 30 | 面积 | `/convert/m2-to-ft2/` | Square Meters to Square Feet | 47m2 to sq ft 相关证据但未通过严格门槛；该精确核心词Volume/KD未单独核实 |
| 31 | 力 | `/convert/kn-to-lbf/` | Kilonewtons to Pound-force | 力类别存在但主词KD未查；该精确核心词Volume/KD未单独核实 |
| 32 | 数据存储 | `/convert/gb-to-mb/` | Gigabytes to Megabytes | 存储类功能补充；该精确核心词Volume/KD未单独核实 |
| 33 | 密度 | `/convert/kg-m3-to-g-cm3/` | kg/m³ to g/cm³ | 需明确密度维度，不做质量转体积；该精确核心词Volume/KD未单独核实 |
| 34 | 功率 | `/convert/kw-to-hp/` | Kilowatts to Horsepower | 功率类功能补充；该精确核心词Volume/KD未单独核实 |
| 35 | 加速度 | `/convert/ms2-to-fts2/` | m/s² to ft/s² | 加速度类功能补充；该精确核心词Volume/KD未单独核实 |
| 36 | 油耗 | `/convert/mpg-us-to-l-100km/` | US MPG to L/100 km | 需测试倒数型公式；该精确核心词Volume/KD未单独核实 |
| 37 | 流量/流率 | `/convert/l-min-to-m3-h/` | L/min to m³/h | 流率类别功能补充；该精确核心词Volume/KD未单独核实 |

此外**一个万能转换器 `/all-converters/`**：支持跨所有已定义且同一物理维度的单位选择/搜索/批量计算；不对不兼容单位给出虚假数值；重量→体积必须提供密度才能换算，不能直接把kg和mL作为相同维度。

## 5. **一次性创建的数值SEO页面及逐页真实数据**

本版选择 **92 个不同规范数值页面**：严格关键词来源记录中选取70个重量精确查询页面及22个非重量精确查询页面。**不是以后补开发的计划**；它们是正式建站交付清单。

同一规范页多个关键词全部并入Excel「数值页矩阵」中的“对应关键词”；下表的Volume/KD/流量取该页**代表性一条**真实排名记录，而非关键词总和。

| # | 正式规范URL | 代表性真实关键词 | 美国Volume | KD | 竞品排名 | 竞品流量估算 | 竞品URL |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | `/convert/kg-to-lbs/240/` | `240 kg to lbs` | 8,100 | 16 | 2 | 526 | `/weight/kilogram/240` |
| 2 | `/convert/lbs-to-kg/126/` | `126 pounds in kg` | 5,400 | 20 | 5 | 162 | `/weight/pound/126` |
| 3 | `/convert/lbs-to-kg/149/` | `149 lbs to kg` | 5,400 | 13 | 6 | 129 | `/weight/pound/149` |
| 4 | `/convert/lbs-to-kg/117/` | `117 pounds to kg` | 2,400 | 19 | 4 | 84 | `/weight/pound/117` |
| 5 | `/convert/lbs-to-kg/140/` | `140 lb to kg` | 9,900 | 30 | 11 | 69 | `/weight/pound/140` |
| 6 | `/convert/lbs-to-kg/144/` | `144 pounds in kgs` | 1,900 | 18 | 4 | 66 | `/weight/pound/144` |
| 7 | `/convert/lbs-to-kg/138.8/` | `138.8 lbs to kg` | 720 | 7 | 2 | 46 | `/weight/pound/138.8` |
| 8 | `/convert/lbs-to-kg/194/` | `194 lbs to kg` | 3,600 | 17 | 10 | 46 | `/weight/pound/194` |
| 9 | `/convert/lbs-to-kg/180/` | `180 pounds in kg` | 27,100 | 30 | 27 | 40 | `/weight/pound/180` |
| 10 | `/convert/lbs-to-kg/132.4/` | `132.4 lbs to kg` | 590 | 7 | 2 | 38 | `/weight/pound/132.4` |
| 11 | `/convert/lbs-to-kg/133.8/` | `133.8 lbs to kg` | 590 | 11 | 2 | 38 | `/weight/pound/133.8` |
| 12 | `/convert/lbs-to-kg/128.6/` | `128.6 lbs to kg` | 480 | 16 | 2 | 31 | `/weight/pound/128.6` |
| 13 | `/convert/kg-to-lbs/56.9/` | `56.9 kg to lbs` | 1,000 | 13 | 5 | 30 | `/weight/kilogram/56.9` |
| 14 | `/convert/lbs-to-kg/152/` | `152 lbs to kg` | 9,900 | 23 | 15 | 29 | `/weight/pound/152` |
| 15 | `/convert/kg-to-lbs/51.9/` | `51.9 kg to lbs` | 880 | 15 | 5 | 26 | `/weight/kilogram/51.9` |
| 16 | `/convert/kg-to-lbs/950/` | `950 kg to lbs` | 590 | 14 | 3 | 25 | `/weight/kilogram/950` |
| 17 | `/convert/lbs-to-kg/126.4/` | `126.4 lbs to kg` | 390 | 14 | 2 | 25 | `/weight/pound/126.4` |
| 18 | `/convert/lbs-to-kg/128.8/` | `128.8 lbs to kg` | 590 | 6 | 3 | 25 | `/weight/pound/128.8` |
| 19 | `/convert/lbs-to-kg/132.2/` | `132.2 lbs to kg` | 590 | 13 | 3 | 25 | `/weight/pound/132.2` |
| 20 | `/convert/lbs-to-kg/138.2/` | `138.2 lbs to kg` | 390 | 16 | 2 | 25 | `/weight/pound/138.2` |
| 21 | `/convert/lbs-to-kg/148.8/` | `148.8 lbs to kg` | 720 | 19 | 4 | 25 | `/weight/pound/148.8` |
| 22 | `/convert/lbs-to-kg/151.8/` | `151.8 lbs to kg` | 590 | 15 | 3 | 25 | `/weight/pound/151.8` |
| 23 | `/convert/lbs-to-kg/153.8/` | `153.8 lbs to kg` | 590 | 20 | 3 | 25 | `/weight/pound/153.8` |
| 24 | `/convert/lbs-to-kg/160.4/` | `160.4 lbs to kg` | 390 | 8 | 2 | 25 | `/weight/pound/160.4` |
| 25 | `/convert/lbs-to-kg/171.6/` | `171.6 lbs to kg` | 390 | 13 | 2 | 25 | `/weight/pound/171.6` |
| 26 | `/convert/lbs-to-kg/172.8/` | `172.8 lbs to kg` | 390 | 13 | 2 | 25 | `/weight/pound/172.8` |
| 27 | `/convert/lbs-to-kg/45/` | `45 pound to kg` | 590 | 27 | 3 | 25 | `/weight/pound/45` |
| 28 | `/convert/kg-to-lbs/53.7/` | `53.7 kg to lbs` | 1,000 | 13 | 6 | 24 | `/weight/kilogram/53.7` |
| 29 | `/convert/kg-to-lbs/64.2/` | `64.2 kg to lbs` | 1,300 | 11 | 9 | 24 | `/weight/kilogram/64.2` |
| 30 | `/convert/kg-to-lbs/54/` | `54 kg to lbs` | 14,800 | 27 | 27 | 22 | `/weight/kilogram/54` |
| 31 | `/convert/kg-to-lbs/94.3/` | `94.3 kg to lbs` | 1,000 | 13 | 8 | 22 | `/weight/kilogram/94.3` |
| 32 | `/convert/lbs-to-kg/166.8/` | `166.8 lb in kg` | 4,400 | 22 | 12 | 22 | `/weight/pound/166.8` |
| 33 | `/convert/lbs-to-kg/123.4/` | `123.4 lbs to kg` | 480 | 14 | 3 | 21 | `/weight/pound/123.4` |
| 34 | `/convert/lbs-to-kg/124.6/` | `124.6 lbs to kg` | 720 | 12 | 5 | 21 | `/weight/pound/124.6` |
| 35 | `/convert/lbs-to-kg/127.6/` | `127.6 lbs to kg` | 480 | 8 | 3 | 21 | `/weight/pound/127.6` |
| 36 | `/convert/lbs-to-kg/135.4/` | `135.4 lbs to kg` | 480 | 13 | 3 | 21 | `/weight/pound/135.4` |
| 37 | `/convert/lbs-to-kg/139.8/` | `139.8 lbs to kg` | 480 | 6 | 3 | 21 | `/weight/pound/139.8` |
| 38 | `/convert/lbs-to-kg/158.6/` | `158.6 lbs to kg` | 480 | 13 | 3 | 21 | `/weight/pound/158.6` |
| 39 | `/convert/lbs-to-kg/172.6/` | `172.6 lbs to kg` | 480 | 22 | 3 | 21 | `/weight/pound/172.6` |
| 40 | `/convert/lbs-to-kg/119.2/` | `119.2 lb to kg` | 320 | 11 | 2 | 20 | `/weight/pound/119.2` |
| 41 | `/convert/lbs-to-kg/127.8/` | `127.8 lbs to kg` | 590 | 12 | 4 | 20 | `/weight/pound/127.8` |
| 42 | `/convert/lbs-to-kg/131.8/` | `131.8 lbs to kg` | 590 | 6 | 4 | 20 | `/weight/pound/131.8` |
| 43 | `/convert/lbs-to-kg/133.6/` | `133.6 lbs to kg` | 590 | 12 | 4 | 20 | `/weight/pound/133.6` |
| 44 | `/convert/lbs-to-kg/137.8/` | `137.8 lbs to kg` | 590 | 6 | 4 | 20 | `/weight/pound/137.8` |
| 45 | `/convert/lbs-to-kg/151.6/` | `151.6 lbs to kg` | 590 | 12 | 4 | 20 | `/weight/pound/151.6` |
| 46 | `/convert/lbs-to-kg/154.4/` | `154.4 lbs to kg` | 590 | 15 | 4 | 20 | `/weight/pound/154.4` |
| 47 | `/convert/lbs-to-kg/174.8/` | `174.8 lbs to kg` | 320 | 17 | 2 | 20 | `/weight/pound/174.8` |
| 48 | `/convert/lbs-to-kg/27/` | `27 lbs in kg` | 1,000 | 24 | 9 | 19 | `/weight/pound/27` |
| 49 | `/convert/kg-to-lbs/2.5/` | `2.5 kg to lbs` | 12,100 | 19 | 24 | 18 | `/weight/kilogram/2.5` |
| 50 | `/convert/kg-to-lbs/57/` | `57kg to lbs` | 12,100 | 22 | 21 | 18 | `/weight/kilogram/57` |
| 51 | `/convert/lbs-to-kg/195/` | `195 pounds to kilos` | 12,100 | 26 | 29 | 18 | `/weight/pound/195` |
| 52 | `/convert/kg-to-lbs/1.8/` | `1.8 kilograms in pounds` | 4,400 | 27 | 0 | 17 | `/weight/kilogram/1.8` |
| 53 | `/convert/lbs-to-kg/159.2/` | `159.2 lbs to kg` | 390 | 7 | 3 | 17 | `/weight/pound/159.2` |
| 54 | `/convert/lbs-to-kg/166.6/` | `166.6 lbs to kg` | 590 | 19 | 5 | 17 | `/weight/pound/166.6` |
| 55 | `/convert/kg-to-lbs/56/` | `56 kg in pounds` | 5,400 | 21 | 17 | 16 | `/weight/kilogram/56` |
| 56 | `/convert/kg-to-lbs/80.4/` | `80.4 kg to lbs` | 1,300 | 13 | 10 | 16 | `/weight/kilogram/80.4` |
| 57 | `/convert/lbs-to-kg/125.6/` | `125.6 lbs to kg` | 480 | 12 | 4 | 16 | `/weight/pound/125.6` |
| 58 | `/convert/lbs-to-kg/143.2/` | `143.2 lbs to kg` | 480 | 22 | 4 | 16 | `/weight/pound/143.2` |
| 59 | `/convert/lbs-to-kg/169.2/` | `169.2 lbs to kg` | 260 | 7 | 2 | 16 | `/weight/pound/169.2` |
| 60 | `/convert/lbs-to-kg/181.2/` | `181.2 lbs to kg` | 260 | 15 | 2 | 16 | `/weight/pound/181.2` |
| 61 | `/convert/lbs-to-kg/182.8/` | `182.8 lbs to kg` | 260 | 14 | 2 | 16 | `/weight/pound/182.8` |
| 62 | `/convert/lbs-to-kg/191.6/` | `191.6 lbs to kg` | 260 | 11 | 2 | 16 | `/weight/pound/191.6` |
| 63 | `/convert/kg-to-lbs/53/` | `53kg to lbs` | 9,900 | 27 | 21 | 14 | `/weight/kilogram/53` |
| 64 | `/convert/lbs-to-kg/101/` | `101 pounds in kilos` | 9,900 | 24 | 14 | 14 | `/weight/pound/101` |
| 65 | `/convert/lbs-to-kg/115.8/` | `115.8 lbs to kg` | 320 | 7 | 3 | 14 | `/weight/pound/115.8` |
| 66 | `/convert/lbs-to-kg/125.8/` | `125.8 lbs to kg` | 480 | 7 | 5 | 14 | `/weight/pound/125.8` |
| 67 | `/convert/lbs-to-kg/127.4/` | `127.4 lbs to kg` | 590 | 10 | 7 | 14 | `/weight/pound/127.4` |
| 68 | `/convert/lbs-to-kg/135.6/` | `135.6 lbs to kg` | 590 | 16 | 6 | 14 | `/weight/pound/135.6` |
| 69 | `/convert/lbs-to-kg/161.8/` | `161.8 lbs to kg` | 480 | 7 | 5 | 14 | `/weight/pound/161.8` |
| 70 | `/convert/lbs-to-kg/164.4/` | `164.4 lbs to kg` | 590 | 15 | 7 | 14 | `/weight/pound/164.4` |
| 71 | `/convert/ft-lbf-to-nm/400/` | `400 pound feet to nm` | 480 | 29 | 1 | 119 | `/torque/pound-force-foot/400` |
| 72 | `/convert/celsius-to-fahrenheit/37.9/` | `37.9 celsius to fahrenheit` | 5,400 | 27 | 10 | 70 | `/temperature/celsius/37.9` |
| 73 | `/convert/minutes-to-hours/10000/` | `10000 minutes to hours` | 2,400 | 21 | 9 | 52 | `/time/minute/10000` |
| 74 | `/convert/milliseconds-to-minutes/3600000/` | `3600000ms to min` | 390 | 23 | 2 | 25 | `/time/millisecond/3600000` |
| 75 | `/convert/kpa-to-atm/50/` | `50kpa to atm` | 1,900 | 12 | 10 | 24 | `/pressure/kilopascal/50` |
| 76 | `/convert/in-to-cm/17.7/` | `17.7 inches to cm` | 880 | 23 | 6 | 21 | `/length/inch/17.7` |
| 77 | `/convert/seconds-to-minutes/6000/` | `6000 seconds to minutes` | 880 | 20 | 7 | 21 | `/time/second/6000` |
| 78 | `/convert/celsius-to-fahrenheit/36.6/` | `36.6 celsius to f` | 6,600 | 21 | 18 | 19 | `/temperature/celsius/36.6` |
| 79 | `/convert/kpa-to-psi/108/` | `108 kpa to psi` | 1,000 | 29 | 9 | 19 | `/pressure/kilopascal/108` |
| 80 | `/convert/milliseconds-to-seconds/60000/` | `60000 ms to seconds` | 880 | 24 | 8 | 19 | `/time/millisecond/60000` |
| 81 | `/convert/milliseconds-to-seconds/30000/` | `30000 milliseconds to seconds` | 590 | 25 | 5 | 17 | `/time/millisecond/30000` |
| 82 | `/convert/ml-to-us-fl-oz/355/` | `355 ml to fluid ounces` | 720 | 20 | 6 | 17 | `/volume/milliliter/355` |
| 83 | `/convert/milliseconds-to-minutes/300000/` | `300000 milliseconds to minutes` | 480 | 21 | 5 | 16 | `/time/millisecond/300000` |
| 84 | `/convert/milliseconds-to-seconds/50/` | `50 ms to seconds` | 320 | 15 | 3 | 14 | `/time/millisecond/50` |
| 85 | `/convert/kmh-to-mph/330/` | `330kmh to mph` | 1,000 | 21 | 10 | 13 | `/speed/kilometer-hour/330` |
| 86 | `/convert/minutes-to-hours/6000/` | `6000 minutes to hours` | 1,000 | 23 | 10 | 13 | `/time/minute/6000` |
| 87 | `/convert/seconds-to-hours/14400/` | `14400 seconds to hours` | 1,000 | 19 | 10 | 13 | `/time/second/14400` |
| 88 | `/convert/m-to-ft/8849/` | `8849 meters to feet` | 260 | 13 | 3 | 11 | `/length/meter/8849` |
| 89 | `/convert/milliseconds-to-minutes/180000/` | `180000 ms to minutes` | 170 | 12 | 3 | 11 | `/time/millisecond/180000` |
| 90 | `/convert/milliseconds-to-seconds/3000/` | `3000 milliseconds to seconds` | 480 | 27 | 7 | 11 | `/time/millisecond/3000` |
| 91 | `/convert/milliseconds-to-minutes/36000/` | `36000 ms in minutes` | 210 | 11 | 3 | 9 | `/time/millisecond/36000` |
| 92 | `/convert/seconds-to-minutes/14400/` | `14400 seconds to minutes` | 390 | 19 | 6 | 9 | `/time/second/14400` |

**重要质量控制**：这些数值页仅在站点构建时静态生成一次；全部使用同一可信计算引擎、数值对应的原单位/目标单位、首屏结果、可交互实时变更、合理邻近数值表（少量）、复制/批量/打印功能、单位定义/来源；并非复制上百篇只改数字的长文。上线前若对某页检测出数值、源单位、目标单位、URL或计算结果冲突，**必须在这次交付中修正/替换该页，不得部署带错索引页，也不得把未通过项留待上线后修复**。

## 6. 全站信息架构与索引政策

```text
/                              首页｜搜索＋常见入口
/all-converters/               全能转换器｜同维度查询+批量
/weight/                       重量主题导航
/length/                       长度主题导航
/volume/                       容量主题导航
/engineering/                  工程主题导航（压力/扭矩/力/速度等）
/time-temperature/             时间与温度主题导航
/convert/{from}-to-{to}/       所有已定义方向型工具页（固定可索引）
/convert/{from}-to-{to}/{n}/   本方案已批准的数值精确页（固定可索引）
/methodology/                  单位来源、系数与精度规则
/about/  /contact/  /privacy/  /terms/  /accessibility/
/sitemap-index.xml  /robots.txt  /404.html
```
**同一意图只有一个URL**；不同拼写、pounds/lbs同义不单独建页。数字规范化：`149`, `149.0`, `0149`归为`149`；严格保留有意义的`138.8`小数，规范科学计数格式。非公开种子数值在工具客户端即时计算（例如使用`?value=123.45`），不产生无限可抓取路由、不进入sitemap。
内部导航：首页→分类→方向工具→已批准数值页；每个数值页返回方向工具、显示固定代表性相关数值入口。目录不出现无效／404链接；canonical、og:url、sitemap、内链一律同规范路径。

## 7. 全功能清单与详细验收

| 模块 | 必做体验 | 自动化验收 |
|---|---|---|
| 单数值换算 | 输入、交换、精度、复制、单位解释、有效位数 | 0/负值/极值/科学计数法/小数；无NaN/Infinity污染 |
| 双向单位选择 | 只允许相同物理维度；别名可搜索 | 维度错误阻断并给英文提示，不产生虚假换算 |
| 批量换算 | 文本多行/粘贴CSV→同一换算→导出CSV | 1000行本地运行、含坏值逐行报错、不上传服务器 |
| 多单位结果 | 一次输入多目标单位对照表；可复制/打印 | 单位值校验、表头规范、打印不会截断 |
| 数值结果页 | HTML首屏带正确预计算答案、互动编辑、公式与相关链接 | JS关闭也可看到答案；`title/H1/canonical`与实际数值严格一致 |
| 移动体验 | 320px以上无横向溢出、数字键盘、触控按钮 | 自动截图/Playwright视觉检查、键盘和读屏语义 |
| 界面风格 | 参考Website-Starter-Standard做原创高质量UI、适度动画 | prefers-reduced-motion生效、CLS/LCP/INP目标、无收费API |
| 错误处理 | 用户输入歧义明确提示、US/Imperial/质量盎司/液量盎司不同 | 自动样例验证能区别fl oz与oz、kpa与kg、扭矩与能量 |
| 隐私安全 | 不收集输入值、无数据库、所有外链安全 | 禁止上传文件到第三方、CSP/header、无敏感日志 |
| 广告 | 预留广告区域但不遮挡结果、不捏造广告账户 | 未配置真实ID时不加载广告；ads.txt开关与配置同步 |

## 8. 计算标准、非线性公式与严格测试

- 国际常衡磅：`1 lb = 0.45359237 kg`（精确）；`1 in = 0.0254 m`（精确）；`1 ft = 0.3048 m`（精确）；`1 bar = 100000 Pa`。标准与数据出处见NIST。
- `1 US gallon = 3.785411784 L`；`1 US fluid ounce = 1 US gallon/128`；英制gallon和US gallon分别明确标识，绝不混写。
- `°F = °C × 9/5 + 32`，逆算 `°C = (°F−32) ×5/9`，不能用普通纯系数引擎处理温度绝对值。
- `ft·lbf`与`N·m`采用扭矩维度；`lb`质量和`lbf`力必须区分，`nm`的标题上下文不能误被解释成纳米。
- `US mpg↔L/100km`为倒数型换算，输入0须明确报错；计算时注明US vs Imperial；不可混用燃油量与行驶距离。
- 数据量单位区分`MB/GB`十进制与`MiB/GiB`二进制；不能写成无条件1024倍。
- 精度：转换器内部使用有界数值/高精度十进制策略；显示采用用户选定有效位数，禁止累积二次舍入；对极小值用科学记数法。
- QA：维度交叉测试、正反向往返、单位定义快照、逐页源值/目标值/url/title/og/meta/canonical一致性、无重复规范URL；所有数值种子必须100%通过，否则禁止发布。

## 9. 技术实现、部署与上线即稳定

- **技术栈**：Astro + TypeScript + 静态生成 + Cloudflare Pages；无SSR运行时服务、无Pages Function、无DB、无KV/R2、无付费API、无Cron。所有计算在用户浏览器或构建期完成。
- 模块建议：`src/lib/units.ts`、`dimensions.ts`、`convert.ts`（特殊非线性转换）、`seed-keywords.json`、`src/pages/convert/[...slug].astro`、`src/lib/seo.ts`、`tests/*.test.ts`、`scripts/validate-seeds.ts`。
- 静态生成的页面数将远低于Cloudflare Pages免费套餐可支持的静态文件量；**2026-09-05官方文档显示免费计划最多20000个静态文件、单文件25MiB、每月500次构建**，按实际部署平台及更新后条款再核验。
- CDN缓存HTML/CSS/JS，浏览器本地计算；不依赖运行时第三方脚本（真实广告审核启用后除外）。
- 站点名称、favicon、logo、域名必须在首次上线前一起定稿；配置`PUBLIC_SITE_URL`，不允许canonical指向pages.dev测试域名。
- 用户只需首次把Git仓库连到Cloudflare Pages、配置正式域名DNS、完成GSC验证；之后不需要日常人工增加关键词/维护计算。
- 自检脚本包括`npm run check`、`npm run test`、`npm run build`、`npm run audit:seo`，构建失败必须阻止部署；交付时附操作手册和恢复说明。

## 10. 设计要求：一轮交付的完整UI

设计方向：可靠、专业、简洁；清晰分层标题，大结果面板和可直接操作的数值输入；移动端快速复制。参考已有Website-Starter-Standard的布局、色彩token、轻动效、组件一致性，但不可直接复制其它站点UI。
- 首页首屏即提供通用转换器，可快速切换类别；有实际工具入口和目录，不是只有一块SEO长文。
- 核心工具页首屏：大号结果→输入→单位交换→精度→复制/分享→批量模式标签；公式、样例表和标准链接在下面。
- 数值页首屏答案必须SSR/SSG直出，交互组件接管后无需重新请求；正文依据此题型提供实际能力和必要解释，不用机械填充相同FAQ。
- 工程工具页区分单位符号、舍入和适用物理量；含标准引用和输入误差提示。
- 动画CSS opacity/transform且不引入额外API；减少动效设置生效；无第三方字体请求。

## 11. SEO/GEO、可索引性与低价值页面防控

**一次性索引矩阵**：方向工具页与本文件确定的数值页作为完整可索引静态HTML；任意其他输入在通用工具里计算，不生成无限数值SEO URL。
- 每个工具/数值页唯一Title、H1、meta description、breadcrumb、canonical与预渲染结果；页面内带可以点击使用的实际工具、准确公式和单位说明。
- sitemap只包含已建成的真实静态URL、明确最后修改时间；有`robots.txt`；非生产预览环境不参加收录。
- `WebSite`/`BreadcrumbList`结构化数据只在实际符合时使用，不承诺公式可产生特殊富结果。
- 避免规模化低价值页面：若两个页只有数字差别，仍须以其实际查询功能满足用户，不创建一大段伪原创文章；首发清单本身是质量上限而不是自动扩页任务。
- 不自动向Google逐页提交索引请求；上线时提交一次sitemap并在文档记录GSC入口。没有运营计划不代表Google会收录所有URL。
- 外链策略保留技术文档/教育讨论中的自然引用，不复制竞争对手disavow文件内的PBN/垃圾站；不做自动论坛灌水。

## 12. 收益假设与一次性建设后的预期边界

| 假设每月页面浏览量 | Page RPM $2 | Page RPM $5 | Page RPM $10 |
|---:|---:|---:|---:|
| 10,000 | $20 | $50 | $100 |
| 25,000 | $50 | $125 | $250 |
| 50,000 | $100 | $250 | $500 |
| 100,000 | $200 | $500 | $1,000 |
| 160,000 | $320 | $800 | $1,600 |
| 400,000 | $800 | $2,000 | $4,000 |
这不是财务承诺：流量为搜索访问估算、Page RPM需要AdSense运行后才能知道；广告投放、Google索引和排名均有不确定性。搜索结果中的Google即时换算答案会压缩点击率。

## 13. 一次性验收 Gate（没有第二次开发）

| Gate | 通过标准 | 失败处理 |
|---|---|---|
| 功能完整性 | 37个方向页＋通用换算＋批量/CSV＋多单位显示＋打印/分享全部上线 | 本次交付内修复，不发布残缺版本 |
| 静态SEO完整性 | 92个选定数值页及所有方向页可抓到首屏真实结果 | 构建阻止部署、修复 |
| 准确性 | 单位维度、源目标方向、边界、反向换算100%自动测试通过 | 修复后重跑，禁止虚假换算 |
| 网站质量 | 所有页面可访问、规范链接去重、无404、符合Google基本指南 | 修复再统一上线 |
| 性能与可访问性 | Lighthouse移动端重点测；目标LCP≤2.5s、CLS≤0.1、INP≤200ms（真实用户指标需上线后才有） | 建设期间优化，不能保证真实用户数据 |
| 安全与成本 | 无付费API/数据库/Cron；任何第三方脚本注明目的；无自动外部抓取 | 移除依赖再上线 |
| 交接 | 项目README、部署手册、回滚方式、域名/GSC/广告接入说明、所有密钥仅用户输入 | 缺项不验收 |

## 14. 可直接粘贴给开发AI的最终命令

> 读取本方案及配套Excel全部工作表，并遵循 Website-Starter-Standard。**这是一次性完整开发任务，严禁将任何明确要求写成第二阶段/P1/以后增加。**使用TypeScript/Astro/Cloudflare Pages静态站，实现本方案全部方向工具页、全部选定数值SEO页、通用转换器、批量转换、CSV、打印、复制、正确单位体系、SEO/结构化数据/网站导航、完整独立UI、性能与自动测试。
> 对600条Semrush源记录仅作数据证据，不把全部600行做成页面，也不为同义词重复建URL。严格按Excel「一次性数值页」单表产生静态种子，自动审计数值、源单位、目标单位与URL；对未通过的必须在本次建设时修复，不能跳过或留待以后。网站除域名外不引入固定付费技术依赖，所有单位数据按可靠标准保存到项目。
> 先完整编码和质量测试，全部通过后一次部署，不留“coming soon”页面；完成后提供仓库提交、上线URL、全部URL清单、自动化测试输出、Lighthouse及GSC/广告设置说明。不得凭空宣称已上线、已收录、已经通过AdSense或有收入。

## 15. 数据来源与边界

- 用户源文件：`粘贴的文本 (1)(20261101-090504).txt`；本文件末附600条全量数据。
- NIST转换因子：https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors
- Google Search Central scaled content abuse：https://developers.google.com/search/docs/essentials/spam-policies
- Google规范URL：https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Cloudflare Pages免费限制：https://developers.cloudflare.com/pages/platform/limits/
- 设计与开发规范：用户既有`Website-Starter-Standard`（使用时读取其GitHub实际最新版）。

## 附录 A：完整600条原始关键词及数据（真实Semrush排名）

**全部保留**；任何未标记为首发的记录仍是研究证据，而不是可以自动生成索引页的许可。估算流量与CPC不能当实际收入。

| # | 关键词 | 意图 | 排名 | 前排名 | SERP功能 | 月流量估算 | 流量份额% | 美国Volume | KD | CPC美元 | 竞品实际URL | 更新时间 | 审核 | 是否独立SEO页面 |
|---:|---|---|---|---|---|---:|---:|---:|---:|---:|---|---|---|---|
| 1 | 240 kg to lbs | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 526 | 2.08 | 8,100 | 16 | 0.0 | https://convert-units.info/weight/kilogram/240 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 2 | 2.35 bar | 信息 | 1 | 1 | 站点子链, 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 316 | 1.25 | 2,400 | 20 | 0.0 | https://convert-units.info/pressure/bar/2.35 | 10月25日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 3 | 126 pounds in kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 162 | 0.64 | 5,400 | 20 | 0.0 | https://convert-units.info/weight/pound/126 | 10月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 4 | 149 lbs to kg | 信息 | 6 | 6 | 站点子链, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 129 | 0.51 | 5,400 | 13 | 0.0 | https://convert-units.info/weight/pound/149 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 5 | 3.7 kilos to pounds | 信息 | 3 | 3 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 127 | 0.5 | 2,900 | 23 | 0.0 | https://convert-units.info/weight/pound/3.7 | 10月20日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 6 | 24 pounds to kg | 信息 | 2 | 2 | 即时答案, 图片包, 相关问题, 相关搜索 | 123 | 0.48 | 1,900 | 8 | 0.0 | https://convert-units.info/weight/pound/0.24 | 9月25日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 7 | 400 pound feet to nm | 信息 | 1 | 1 | AI 概览, 相关问题, 相关搜索 | 119 | 0.47 | 480 | 29 | 0.0 | https://convert-units.info/torque/pound-force-foot/400 | 10月04日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 8 | 1.85m to feet | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 108 | 0.42 | 3,600 | 13 | 0.0 | https://convert-units.info/length/meter/1.852 | 3 天 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 9 | 3.00lbs | 信息 | 1 | 1 | 即时答案, 相关问题 | 106 | 0.42 | 1,300 | 15 | 1.1 | https://convert-units.info/weight/pound/0.03 | 10月06日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 10 | 3.5oz to grams | 信息 | 3 | 3 | 站点子链, 评价, 即时答案, 视频, 相关问题 | 105 | 0.41 | 2,400 | 50 | 2.55 | https://convert-units.info/weight/gram/3.5 | 10月20日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 11 | lb to pounds | 信息 | 1 | 1 | AI 概览, 图片包, 相关问题, 相关搜索 | 95 | 0.37 | 720 | 5 | 0.0 | https://convert-units.info/weight/pound/28.75 | 10月03日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 12 | 220 libras a kilos | 信息 | 5 | 5 | 即时答案, 相关问题 | 87 | 0.34 | 2,900 | 27 | 0.0 | https://convert-units.info/weight/pound/220 | 10月25日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 13 | 3.00lbs | 信息 | 2 | 2 | 即时答案, 相关问题 | 84 | 0.33 | 1,300 | 15 | 1.1 | https://convert-units.info/weight/pound/3.55 | 10月06日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 14 | how much is a fluid ounce | 信息 | 2 | 2 | 即时答案, 图片包, 相关问题 | 84 | 0.33 | 1,300 | 43 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/2.8 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 15 | 117 pounds to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 84 | 0.33 | 2,400 | 19 | 0.0 | https://convert-units.info/weight/pound/117 | 10月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 16 | 37.9 celsius to fahrenheit | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 70 | 0.27 | 5,400 | 27 | 0.0 | https://convert-units.info/temperature/celsius/37.9 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 17 | 140 lb to kg | 信息 | 11 | 11 | 即时答案, 相关问题, 相关搜索 | 69 | 0.27 | 9,900 | 30 | 0.0 | https://convert-units.info/weight/pound/140 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 18 | 144 pounds in kgs | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 66 | 0.26 | 1,900 | 18 | 0.0 | https://convert-units.info/weight/pound/144 | 10月16日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 19 | cubic inch | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 知识面板, 讨论和论坛 | 66 | 0.26 | 1,900 | 37 | 0.0 | https://convert-units.info/volume/cubic-inch/4556 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 20 | 4.5 squared | 信息 | 4 | 4 | 评价, 即时答案, 图片, 图片包, 视频, 相关问题 | 66 | 0.26 | 1,900 | 29 | 0.0 | https://convert-units.info/acceleration/meter-second2/4.5 | 9月09日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 21 | 510 to inches | 信息 | 16 | 16 | AI 概览, 视频, 相关问题, 相关搜索 | 66 | 0.26 | 22,200 | 27 | 0.0 | https://convert-units.info/length/inch/510 | 10月24日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 22 | mmhg to hg | 信息 | 2 | 2 | 即时答案, 相关问题 | 65 | 0.25 | 1,000 | 26 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/35 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 23 | gram and milliliter conversion | 信息 | 1 | 1 | AI 概览, 相关问题 | 63 | 0.25 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/1.032 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 24 | how many ml in kilogram | 信息 | 1 | 1 | AI 概览, 视频, 相关问题 | 63 | 0.25 | 480 | 27 | 0.0 | https://convert-units.info/density/kilogram-milliliter/0.02 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 25 | 1.0e-9 seconds | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 63 | 0.25 | 480 | 7 | 0.0 | https://convert-units.info/time/second/1.0E-9 | 10月02日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 26 | 3.5oz to grams | 信息 | 7 | 7 | 站点子链, 评价, 即时答案, 视频, 相关问题 | 57 | 0.22 | 2,400 | 50 | 2.55 | https://convert-units.info/weight/ounce/3.5 | 10月20日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 27 | 3.00lbs | 信息 | 3 | 3 | 即时答案, 相关问题 | 57 | 0.22 | 1,300 | 15 | 1.1 | https://convert-units.info/weight/pound/3.02 | 10月06日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 28 | 411.48 | 信息 | 2 | 2 | AI 概览, 评价, 视频 | 57 | 0.22 | 880 | 16 | 0.0 | https://convert-units.info/length/millimeter/411.48 | 9月13日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 29 | 8.8 kg to lb | 信息 | 3 | 3 | 评价, 即时答案, 相关问题 | 57 | 0.22 | 1,300 | 10 | 0.0 | https://convert-units.info/density/kilogram-liter/8.8 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 30 | 10000 minutes to hours | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关搜索 | 52 | 0.2 | 2,400 | 21 | 0.0 | https://convert-units.info/time/minute/10000 | 10月25日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 31 | 140 pounds en kilos | 信息 | 21 | 21 | AI 概览, 视频, 视频轮播, 相关问题, 相关搜索 | 49 | 0.19 | 33,100 | 35 | 0.0 | https://convert-units.info/weight/pound/140 | 10月19日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 32 | area in square | 信息 | 2 | 2 | AI 概览, 即时答案, 图片, 图片包, 视频, 相关问题, 讨论和论坛, 相关搜索 | 48 | 0.19 | 1,600 | 26 | 0.0 | https://convert-units.info/area/square-meter/964 | 10月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 33 | gallon in ml | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 相关问题 | 48 | 0.19 | 590 | 13 | 0.0 | https://convert-units.info/volume/milliliter/1.65 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 34 | tsp to teaspoon | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 46 | 0.18 | 720 | 22 | 0.0 | https://convert-units.info/volume/us-teaspoon/0.3 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 35 | lb to pounds | 信息 | 2 | 2 | AI 概览, 图片包, 相关问题, 相关搜索 | 46 | 0.18 | 720 | 5 | 0.0 | https://convert-units.info/weight/pound/-79.8 | 10月03日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 36 | 138.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 46 | 0.18 | 720 | 7 | 0.0 | https://convert-units.info/weight/pound/138.8 | 9月15日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 37 | 194 lbs to kg | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 46 | 0.18 | 3,600 | 17 | 0.0 | https://convert-units.info/weight/pound/194 | 4 天 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 38 | mpg l/km | 信息 | 4 | 4 | 即时答案, 图片包, 相关问题 | 45 | 0.17 | 1,300 | 33 | 0.0 | https://convert-units.info/fuel-consumption/miles-us-galon/16.9 | 9月28日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 39 | nanometer um | 信息 | 3 | 3 | 评价, 即时答案, 图片包, 视频, 相关问题 | 45 | 0.17 | 1,300 | 34 | 0.0 | https://convert-units.info/length/nanometer/16.1 | 9月28日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 40 | 152 pounds kg | 信息 | 17 | 17 | 即时答案, 视频, 相关问题, 相关搜索 | 44 | 0.17 | 14,800 | 27 | 0.0 | https://convert-units.info/weight/pound/152 | 10月24日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 41 | convert millilitres | 信息 | 3 | 3 | 即时答案, 视频, 相关问题 | 44 | 0.17 | 1,000 | 40 | 0.0 | https://convert-units.info/volume/milliliter/1.19 | 10月08日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 42 | ųg | 信息 | 14 | 14 | AI 概览, 视频, 相关问题, 相关搜索 | 44 | 0.17 | 14,800 | 26 | 0.0 | https://convert-units.info/weight/microgram/58 | 10月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 43 | ųg | 信息 | 15 | 15 | AI 概览, 视频, 相关问题, 相关搜索 | 44 | 0.17 | 14,800 | 26 | 0.0 | https://convert-units.info/weight/microgram/0.1 | 10月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 44 | 604800s | 信息 | 1 | 1 | AI 概览, 相关问题, 相关搜索 | 42 | 0.16 | 170 | 10 | 0.0 | https://convert-units.info/time/second/604800 | 9月13日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 45 | hpa to mmhg | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 42 | 0.16 | 320 | 4 | 0.0 | https://convert-units.info/pressure/hectopascal/802 | 10月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 46 | how much is 1 ounce of liquid | 信息 | 1 | 1 | AI 概览, 图片, 图片包, 视频, 相关问题 | 42 | 0.16 | 320 | 22 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.1 | 10月08日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 47 | 180 pounds in kg | 信息 | 27 | 27 | 即时答案, 视频, 相关问题, 相关搜索 | 40 | 0.15 | 27,100 | 30 | 0.0 | https://convert-units.info/weight/pound/180 | 10月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 48 | 116 kg to lbs | 信息 | 13 | 13 | 即时答案, 相关问题, 相关搜索 | 40 | 0.15 | 8,100 | 19 | 0.0 | https://convert-units.info/weight/pound/-116 | 1 天 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 49 | cubic ft to cubic m | 信息 | 4 | 4 | 即时答案, 图片包, 相关问题, 相关搜索 | 39 | 0.15 | 1,300 | 36 | 0.0 | https://convert-units.info/volume/cubic-meter/1.76 | 10月02日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 50 | 0.3 miles in kilometers | 信息 | 1 | 1 | 即时答案, 相关问题, 相关搜索 | 39 | 0.15 | 480 | 31 | 0.0 | https://convert-units.info/fuel-consumption/liters-100-km/0.3 | 9月25日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 51 | 71.3 kg to lbs | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 39 | 0.15 | 1,300 | 17 | 0.0 | https://convert-units.info/weight/kilogram/-71.3 | 9月16日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 52 | how much is a fluid ounce | 信息 | 5 | 5 | 即时答案, 图片包, 相关问题 | 39 | 0.15 | 1,300 | 43 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/1.2 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 53 | how many gigabits are in a gigabyte | 信息 | 1 | 1 | 即时答案, 视频, 相关问题 | 39 | 0.15 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/-1.43 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 54 | 6.8 ounces ml | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 39 | 0.15 | 1,300 | 25 | 0.0 | https://convert-units.info/volume/milliliter/6.8 | 9月10日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 55 | 123.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 38 | 0.15 | 590 | 11 | 0.0 | https://convert-units.info/weight/pound/-123.8 | 9月08日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 56 | 133.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 38 | 0.15 | 590 | 11 | 0.0 | https://convert-units.info/weight/pound/133.8 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 57 | 132.4 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题 | 38 | 0.15 | 590 | 7 | 0.0 | https://convert-units.info/weight/pound/132.4 | 9月14日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 58 | 210 kph to mph | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 37 | 0.14 | 2,900 | 19 | 0.0 | https://convert-units.info/speed/mile-hour/210 | 4 天 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 59 | 3.5 litros | 信息 | 4 | 4 | 站点子链, 即时答案, 图片包, 视频, 视频轮播, 相关问题, 相关搜索 | 36 | 0.14 | 1,900 | 22 | 1.7 | https://convert-units.info/volume/liter/3.5 | 10月25日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 60 | 88.6 kg to lbs | 信息 | 8 | 8 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 35 | 0.13 | 1,600 | 17 | 0.0 | https://convert-units.info/weight/pound/88.6 | 10月08日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 61 | area in square | 信息 | 5 | 5 | AI 概览, 即时答案, 图片, 图片包, 视频, 相关问题, 讨论和论坛, 相关搜索 | 35 | 0.13 | 1,600 | 26 | 0.0 | https://convert-units.info/area/square-meter/379 | 10月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 62 | 6.3 cm to mm | 信息 | 8 | 8 | 评价, 即时答案, 视频, 相关问题 | 35 | 0.13 | 1,600 | 24 | 0.0 | https://convert-units.info/torque/newton-centimeter/6.3 | 9月30日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 63 | how much is one ounce of liquid | 信息 | 1 | 1 | AI 概览, 评价, 图片包, 视频, 相关问题 | 34 | 0.13 | 260 | 37 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.41 | 9月28日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 64 | 2.875 in inches | 信息 | 1 | 1 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 34 | 0.13 | 260 | 15 | 0.0 | https://convert-units.info/length/inch/2.875 | 9月01日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 65 | 1.5mn | 信息 | 1 | 1 | AI 概览, 视频 | 34 | 0.13 | 260 | 17 | 0.0 | https://convert-units.info/force/meganewton/1.5 | 9月29日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 66 | 1.0e-7 centimeters | 信息 | 1 | 1 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 34 | 0.13 | 260 | 10 | 0.0 | https://convert-units.info/length/centimeter/1.0E-7 | 9月06日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 67 | lbf to nm conversion | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 34 | 0.13 | 140 | 17 | 0.0 | https://convert-units.info/torque/pound-force-inch/354 | 9月29日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 68 | psi to lbs conversion | 信息 | 1 | 1 | AI 概览, 视频, 相关问题 | 34 | 0.13 | 260 | 2 | 0.0 | https://convert-units.info/pressure/pounds-per-sq-inch/1300 | 10月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 69 | 1/2 ounce to teaspoons | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 34 | 0.13 | 260 | 19 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/1.2 | 10月04日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 70 | 2.38m to ft | 信息 | 1 | 1 | 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 390 | 9 | 0.0 | https://convert-units.info/area/square-meter/2.38 | 10月22日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 71 | gram and milliliter conversion | 信息 | 2 | 2 | AI 概览, 相关问题 | 31 | 0.12 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/-0.88 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 72 | convert to length | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 480 | 41 | 0.0 | https://convert-units.info/length/meter/0.126 | 9月26日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 73 | l en m3 conversion | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 31 | 0.12 | 480 | 26 | 0.0 | https://convert-units.info/volume/cubic-meter/0.235 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 74 | 100k g | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 1,300 | 28 | 0.0 | https://convert-units.info/weight/gram/100000 | 9月21日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 75 | 82.2 kg to lbs | 信息 | 7 | 7 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 1,300 | 11 | 0.0 | https://convert-units.info/weight/pound/82.2 | 10月02日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 76 | 55.6 kilos to pounds | 信息 | 7 | 7 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 1,300 | 17 | 0.0 | https://convert-units.info/weight/pound/55.6 | 10月22日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 77 | 3.5 ltr | 信息 | 3 | 3 | 站点子链, 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 31 | 0.12 | 1,300 | 24 | 0.0 | https://convert-units.info/volume/liter/3.5 | 10月08日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 78 | 68.1 kg to lbs | 信息 | 7 | 7 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 1,300 | 24 | 0.0 | https://convert-units.info/weight/pound/68.1 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 79 | 3048 meters | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 720 | 23 | 0.0 | https://convert-units.info/length/meter/3048 | 10月12日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 80 | 225ml to oz | 信息 | 1 | 1 | 即时答案, 相关问题, 相关搜索 | 31 | 0.12 | 390 | 26 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/225 | 10月19日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 81 | 128.6 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 480 | 16 | 0.0 | https://convert-units.info/weight/pound/128.6 | 10月09日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 82 | area 480 | 信息 | 2 | 2 | AI 概览, 评价, 图片, 图片包, 视频, 相关问题, 相关搜索 | 31 | 0.12 | 720 | 18 | 0.0 | https://convert-units.info/area/square-meter/480 | 9月08日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 83 | how many gigabits are in a gigabyte | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 31 | 0.12 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/137438953472 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 84 | 210kg to lbs | 信息 | 8 | 8 | 即时答案, 图片包, 视频, 相关问题 | 30 | 0.11 | 1,600 | 31 | 0.0 | https://convert-units.info/density/kilogram-cubic-meter/210 | 9月25日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 85 | 63.8 kg to lbs | 信息 | 9 | 9 | 即时答案, 图片, 视频, 相关问题, 相关搜索 | 30 | 0.11 | 1,600 | 14 | 0.0 | https://convert-units.info/weight/pound/63.8 | 9月29日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 86 | mmhg to hg | 信息 | 5 | 5 | 即时答案, 相关问题 | 30 | 0.11 | 1,000 | 26 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/7.6 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 87 | 56.9 kg to lbs | 信息 | 5 | 5 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 30 | 0.11 | 1,000 | 13 | 0.0 | https://convert-units.info/weight/kilogram/56.9 | 9月07日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 88 | 1.8 ltr | 信息 | 6 | 6 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 30 | 0.11 | 1,000 | 27 | 0.0 | https://convert-units.info/volume/liter/1.8 | 10月18日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 89 | 152 lbs to kg | 信息 | 15 | 15 | 即时答案, 视频, 相关问题, 相关搜索 | 29 | 0.11 | 9,900 | 23 | 0.0 | https://convert-units.info/weight/pound/152 | 10月28日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 90 | 140 lbs to kg | 信息 | 30 | 30 | 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 28 | 0.11 | 40,500 | 33 | 0.0 | https://convert-units.info/weight/pound/140 | 10月21日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 91 | 88.2 kg to lbs | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 28 | 0.11 | 1,300 | 17 | 0.0 | https://convert-units.info/weight/pound/88.2 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 92 | 88.2 kg to pounds | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 28 | 0.11 | 1,300 | 17 | 0.0 | https://convert-units.info/weight/pound/88.2 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 93 | 79.2 kg to lbs | 信息 | 8 | 8 | 即时答案, 相关问题, 相关搜索 | 28 | 0.11 | 1,300 | 15 | 0.0 | https://convert-units.info/weight/pound/79.2 | 9月15日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 94 | 33.8fl oz | 信息 | 8 | 8 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 28 | 0.11 | 1,300 | 15 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/33.8 | 10月09日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 95 | how to convert ml to mg | 信息 | 1 | 1 | AI 概览, 相关问题 | 27 | 0.1 | 210 | 2 | 0.0 | https://convert-units.info/density/milligram-milliliter/-0.72 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 96 | 180lb to kg | 信息 | 26 | 26 | 即时答案, 视频, 相关问题, 相关搜索 | 27 | 0.1 | 18,100 | 30 | 0.0 | https://convert-units.info/weight/pound/180 | 10月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 97 | time msec | 信息 | 1 | 1 | AI 概览, 图片, 图片包, 视频, 相关问题 | 27 | 0.1 | 110 | 17 | 0.0 | https://convert-units.info/time/millisecond/-387 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 98 | 144 lbs to kg | 信息 | 13 | 13 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 27 | 0.1 | 5,400 | 22 | 0.0 | https://convert-units.info/weight/pound/144 | 10月28日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 99 | kn speed | 信息 | 1 | 1 | AI 概览, 图片, 图片包, 视频, 相关问题, 相关搜索 | 27 | 0.1 | 210 | 17 | 1.11 | https://convert-units.info/speed/knot/11666.67 | 9月29日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 100 | 125kg to lbs | 信息 | 11 | 11 | 即时答案, 视频轮播, 相关搜索 | 27 | 0.1 | 5,400 | 36 | 4.14 | https://convert-units.info/weight/kilogram/125 | 10月24日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 101 | kilogram to cbm | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 视频轮播, 相关问题 | 27 | 0.1 | 210 | 12 | 0.0 | https://convert-units.info/density/kilogram-cubic-meter/2 | 10月01日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 102 | 51.9 kg to lbs | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 26 | 0.1 | 880 | 15 | 0.0 | https://convert-units.info/weight/kilogram/51.9 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 103 | 79kg to lb | 信息 | 1 | 1 | 即时答案, 图片, 图片包, 视频, 相关问题, 相关搜索 | 26 | 0.1 | 320 | 30 | 0.0 | https://convert-units.info/density/kilogram-cubic-meter/79 | 9月08日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 104 | converter nm | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 26 | 0.1 | 320 | 33 | 0.0 | https://convert-units.info/torque/newton-meter/-0.57 | 9月27日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 105 | 93.2 kg to lbs | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 26 | 0.1 | 880 | 14 | 0.0 | https://convert-units.info/weight/pound/93.2 | 9月10日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 106 | cms into inches | 信息 | 1 | 1 | 即时答案, 图片包, 相关问题, 相关搜索 | 26 | 0.1 | 320 | 53 | 0.13 | https://convert-units.info/length/inch/0.0013 | 9月28日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 107 | cubic mm to ml | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题 | 26 | 0.1 | 320 | 11 | 0.0 | https://convert-units.info/volume/cubic-millimeter/390 | 9月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 108 | kn to pounds converter | 信息 | 1 | 1 | 即时答案, 图片包, 相关问题, 相关搜索 | 26 | 0.1 | 320 | 8 | 0.0 | https://convert-units.info/force/kilonewton/438 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 109 | 710ml oz | 信息 | 4 | 4 | 站点子链, 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 26 | 0.1 | 880 | 21 | 0.0 | https://convert-units.info/volume/milliliter/710 | 9月04日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 110 | 138.2 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 16 | 0.0 | https://convert-units.info/weight/pound/138.2 | 10月06日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 111 | 171.6 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 13 | 0.0 | https://convert-units.info/weight/pound/171.6 | 9月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 112 | 97.4 kg to lbs | 信息 | 4 | 4 | 即时答案, 图片包, 视频, 相关问题 | 25 | 0.09 | 720 | 13 | 0.0 | https://convert-units.info/weight/pound/97.4 | 9月25日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 113 | 172.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 13 | 0.0 | https://convert-units.info/weight/pound/172.8 | 9月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 114 | sq mm to sq meter | 信息 | 3 | 3 | 即时答案, 图片包, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 33 | 0.0 | https://convert-units.info/area/square-millimeter/90 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 115 | 151.8 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 15 | 0.0 | https://convert-units.info/weight/pound/151.8 | 9月13日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 116 | 100 milliseconds | 信息 | 3 | 3 | AI 概览, 评价, 图片, 图片包, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 15 | 0.0 | https://convert-units.info/time/millisecond/100 | 10月06日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 117 | 153.8 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 20 | 0.0 | https://convert-units.info/weight/pound/153.8 | 9月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 118 | g/cm3 | 信息 | 4 | 4 | AI 概览, 视频, 视频轮播, 相关问题, 相关搜索 | 25 | 0.09 | 720 | 7 | 0.0 | https://convert-units.info/density/gram-cubic-centimeter/1.19 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 119 | 128.8 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 6 | 0.0 | https://convert-units.info/weight/pound/128.8 | 9月29日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 120 | 45 pound to kg | 信息 | 3 | 3 | 即时答案, 图片包, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 27 | 0.0 | https://convert-units.info/weight/pound/45 | 9月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 121 | 950 kg to lbs | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 14 | 0.0 | https://convert-units.info/weight/kilogram/950 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 122 | 132.2 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 590 | 13 | 0.0 | https://convert-units.info/weight/pound/132.2 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 123 | 3600000ms to min | 信息 | 2 | 2 | 评价, 即时答案, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 23 | 0.0 | https://convert-units.info/time/millisecond/3600000 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 124 | 225ml to oz | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 26 | 0.0 | https://convert-units.info/volume/milliliter/2225 | 10月19日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 125 | 126.4 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 14 | 0.0 | https://convert-units.info/weight/pound/126.4 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 126 | 148.8 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 720 | 19 | 0.0 | https://convert-units.info/weight/pound/148.8 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 127 | 1.66 m to ft | 信息 | 3 | 3 | 评价, 即时答案, 图片包, 视频, 相关问题 | 25 | 0.09 | 590 | 14 | 0.0 | https://convert-units.info/acceleration/meter-second2/1.66 | 10月07日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 128 | foot into meter | 信息 | 2 | 2 | 评价, 即时答案, 图片, 图片包, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 43 | 0.13 | https://convert-units.info/area/square-foot/247 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 129 | 160.4 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 25 | 0.09 | 390 | 8 | 0.0 | https://convert-units.info/weight/pound/160.4 | 10月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 130 | cubic feet to cubic centimeters | 信息 | 2 | 2 | 即时答案, 图片包, 相关问题 | 25 | 0.09 | 390 | 7 | 0.0 | https://convert-units.info/volume/cubic-centimeter/480000 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 131 | 1.89 liters to oz | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,300 | 34 | 0.0 | https://convert-units.info/volume/liter/1.89 | 9月16日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 132 | 91.2 kilos in pounds | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,300 | 15 | 0.0 | https://convert-units.info/weight/pound/91.2 | 10月17日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 133 | 50kpa to atm | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,900 | 12 | 2.21 | https://convert-units.info/pressure/kilopascal/50 | 1 天 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 134 | 0.44704 m / s | 信息 | 9 | 9 | 站点子链, 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,300 | 12 | 0.0 | https://convert-units.info/time/millisecond/0.44704 | 10月20日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 135 | 56.9 kilos in pounds | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,000 | 14 | 0.0 | https://convert-units.info/weight/kilogram/56.9 | 10月05日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 136 | 187 ml to oz | 信息 | 18 | 18 | 即时答案, 视频, 相关搜索 | 24 | 0.09 | 8,100 | 28 | 0.0 | https://convert-units.info/volume/milliliter/187 | 10月22日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 137 | 63.8 kilos in pounds | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,300 | 18 | 0.0 | https://convert-units.info/weight/pound/63.8 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 138 | 53.7 kg to lbs | 信息 | 6 | 6 | 评价, 即时答案, 视频, 相关问题 | 24 | 0.09 | 1,000 | 13 | 0.0 | https://convert-units.info/weight/kilogram/53.7 | 9月16日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 139 | 64.2 kg to lbs | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 1,300 | 11 | 0.0 | https://convert-units.info/weight/kilogram/64.2 | 9月13日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 140 | how much is a fluid ounce | 信息 | 8 | 8 | 即时答案, 图片包, 相关问题 | 24 | 0.09 | 1,300 | 43 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/1.87 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 141 | 117 lbs to kg | 信息 | 17 | 17 | 即时答案, 视频, 相关问题, 相关搜索 | 24 | 0.09 | 8,100 | 25 | 0.0 | https://convert-units.info/weight/pound/117 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 142 | 180 lbs to kg | 信息 | 32 | 32 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 23 | 0.09 | 33,100 | 34 | 0.0 | https://convert-units.info/weight/pound/180 | 10月24日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 143 | 511 meters | 信息 | 13 | 13 | 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 4,400 | 27 | 0.0 | https://convert-units.info/area/square-meter/511 | 10月23日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 144 | mmhg to cm water | 信息 | 1 | 1 | 相关问题 | 22 | 0.08 | 90 | 1 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/1 | 9月30日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 145 | 166.8 lb in kg | 信息 | 12 | 12 | 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 4,400 | 22 | 0.0 | https://convert-units.info/weight/pound/166.8 | 10月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 146 | petabyte 1000 | 信息 | 1 | 1 | 站点子链, AI 概览, 视频, 相关问题 | 22 | 0.08 | 170 | 20 | 0.0 | https://convert-units.info/data-storage/petabyte/1000 | 10月06日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 147 | lbf/in to n/m | 信息 | 1 | 1 | 即时答案, 相关搜索 | 22 | 0.08 | 170 | 26 | 0.0 | https://convert-units.info/torque/pound-force-inch/100000 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 148 | newtons/meter unit | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 视频轮播, 相关问题, 相关搜索 | 22 | 0.08 | 170 | 5 | 0.0 | https://convert-units.info/torque/newton-meter/5700 | 10月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 149 | 94.3 kg to lbs | 信息 | 8 | 8 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 1,000 | 13 | 0.0 | https://convert-units.info/weight/kilogram/94.3 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 150 | 95.8 kg to lbs | 信息 | 8 | 8 | 评价, 即时答案, 相关问题, 相关搜索 | 22 | 0.08 | 1,000 | 13 | 0.0 | https://convert-units.info/weight/pound/95.8 | 9月17日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 151 | mmhg to hg | 信息 | 8 | 8 | 即时答案, 相关问题 | 22 | 0.08 | 1,000 | 26 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/5.5 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 152 | psi to pounds per foot | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 90 | 25 | 0.0 | https://convert-units.info/pressure/pounds-per-sq-inch/250 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 153 | 2.64 | 信息 | 1 | 1 | AI 概览, 图片包, 相关问题 | 22 | 0.08 | 170 | 10 | 0.0 | https://convert-units.info/speed/meter-second/2.64 | 10月08日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 154 | 2700n | 信息 | 1 | 1 | AI 概览, 视频 | 22 | 0.08 | 170 | 17 | 0.0 | https://convert-units.info/force/newton/2700 | 9月13日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 155 | temperature of 37.9 | 信息 | 1 | 1 | AI 概览, 相关问题 | 22 | 0.08 | 170 | 65 | 0.0 | https://convert-units.info/temperature/celsius/37.9 | 9月30日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 156 | 116 pounds kg | 信息 | 21 | 21 | 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 14,800 | 26 | 0.0 | https://convert-units.info/weight/pound/-116 | 10月25日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 157 | what is mach in speed | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 170 | 10 | 0.0 | https://convert-units.info/speed/mach/1.25 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 158 | 92.8 kg to lbs | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 1,000 | 17 | 0.0 | https://convert-units.info/weight/pound/92.8 | 9月16日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 159 | nm to n conversion | 信息 | 1 | 1 | AI 概览, 相关问题 | 22 | 0.08 | 170 | 23 | 0.0 | https://convert-units.info/torque/newton-meter/5.9 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 160 | 66.9291 to feet | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 170 | 8 | 0.0 | https://convert-units.info/length/foot/66.9291 | 10月14日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 161 | kgf to kg cm2 | 信息 | 1 | 1 | AI 概览, 图片包, 相关问题, 相关搜索 | 22 | 0.08 | 90 | 1 | 0.0 | https://convert-units.info/pressure/kilogram-per-sq-cm/1054 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 162 | 94.6 kg to lbs | 信息 | 8 | 8 | 即时答案, 相关问题, 相关搜索 | 22 | 0.08 | 1,000 | 18 | 0.0 | https://convert-units.info/weight/pound/94.6 | 9月07日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 163 | 1 4 liter to oz | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 170 | 32 | 0.0 | https://convert-units.info/volume/liter/1.4 | 9月28日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 164 | kgf and kg | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 170 | 32 | 0.0 | https://convert-units.info/force/kilogram-force/90 | 9月29日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 165 | 54 kg to lbs | 信息 | 27 | 27 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 14,800 | 27 | 0.0 | https://convert-units.info/weight/kilogram/54 | 10月21日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 166 | 118 pound kg | 信息 | 27 | 27 | 即时答案, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 14,800 | 24 | 0.0 | https://convert-units.info/weight/pound/118 | 10月26日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 167 | 118 lbs en kg | 信息 | 24 | 24 | AI 概览, 视频, 相关问题, 相关搜索 | 22 | 0.08 | 14,800 | 21 | 0.0 | https://convert-units.info/weight/pound/118 | 10月24日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 168 | 135.4 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 13 | 0.0 | https://convert-units.info/weight/pound/135.4 | 9月08日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 169 | gram and milliliter conversion | 信息 | 3 | 3 | AI 概览, 相关问题 | 21 | 0.08 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/1.02 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 170 | 124.6 lbs to kg | 信息 | 5 | 5 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 720 | 12 | 0.0 | https://convert-units.info/weight/pound/124.6 | 9月25日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 171 | 127.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 8 | 0.0 | https://convert-units.info/weight/pound/127.6 | 9月14日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 172 | 172.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 22 | 0.0 | https://convert-units.info/weight/pound/172.6 | 9月29日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 173 | ounce to fluid ounce | 信息 | 1 | 1 | AI 概览, 视频, 相关问题 | 21 | 0.08 | 260 | 7 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.18 | 10月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 174 | 104.3 kg to lbs | 信息 | 3 | 3 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 16 | 0.0 | https://convert-units.info/weight/pound/104.3 | 9月08日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 175 | l en m3 conversion | 信息 | 3 | 3 | 即时答案, 视频, 相关问题 | 21 | 0.08 | 480 | 26 | 0.0 | https://convert-units.info/volume/cubic-meter/0.128 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 176 | 2.4 liters | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 260 | 24 | 0.0 | https://convert-units.info/volume/liter/2.4 | 10月11日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 177 | 6000 seconds to minutes | 信息 | 7 | 7 | 即时答案, 视频, 相关问题 | 21 | 0.08 | 880 | 20 | 0.0 | https://convert-units.info/time/second/6000 | 9月16日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 178 | 2244096 | 信息 | 2 | 2 | AI 概览 | 21 | 0.08 | 260 | 16 | 0.0 | https://convert-units.info/time/hour/2244096 | 9月26日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 179 | how many ml is an ounce of liquid | 信息 | 2 | 2 | AI 概览, 相关问题 | 21 | 0.08 | 480 | 32 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/1.06 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 180 | 123.4 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 14 | 0.0 | https://convert-units.info/weight/pound/123.4 | 9月14日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 181 | 158.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 13 | 0.0 | https://convert-units.info/weight/pound/158.6 | 9月10日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 182 | how many ml in kilogram | 信息 | 3 | 3 | AI 概览, 视频, 相关问题 | 21 | 0.08 | 480 | 27 | 0.0 | https://convert-units.info/density/kilogram-milliliter/6.4 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 183 | 50.7 fl oz | 信息 | 1 | 1 | 站点子链, 即时答案, 相关问题, 相关搜索 | 21 | 0.08 | 260 | 23 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/50.7 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 184 | 17.7 inches to cm | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 880 | 23 | 0.0 | https://convert-units.info/length/inch/17.7 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 185 | 2 m/s2 | 信息 | 5 | 5 | AI 概览, 视频, 相关问题, 相关搜索 | 21 | 0.08 | 720 | 23 | 0.0 | https://convert-units.info/acceleration/meter-second2/2 | 9月30日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 186 | 139.8 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 21 | 0.08 | 480 | 6 | 0.0 | https://convert-units.info/weight/pound/139.8 | 9月14日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 187 | liters to kilometers | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 28 | 4.84 | https://convert-units.info/fuel-consumption/liters-100-km/-18.1 | 9月30日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 188 | cm cubed to grams | 信息 | 2 | 2 | AI 概览, 评价, 视频, 相关问题 | 20 | 0.07 | 320 | 20 | 0.0 | https://convert-units.info/density/gram-cubic-centimeter/0.98 | 9月09日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 189 | 200ms | 信息 | 2 | 2 | AI 概览, 图片包, 视频, 相关问题, 讨论和论坛, 相关搜索 | 20 | 0.07 | 590 | 18 | 0.0 | https://convert-units.info/time/millisecond/200 | 10月17日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 190 | 64.8 kg to lbs | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 1,600 | 10 | 0.0 | https://convert-units.info/weight/pound/64.8 | 10月03日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 191 | 74.6 kg to lbs | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 1,600 | 19 | 0.0 | https://convert-units.info/weight/pound/74.6 | 10月04日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 192 | 154.4 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题 | 20 | 0.07 | 590 | 15 | 0.0 | https://convert-units.info/weight/pound/154.4 | 9月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 193 | 0.5 ltr | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 视频, 相关问题 | 20 | 0.07 | 320 | 21 | 0.0 | https://convert-units.info/volume/liter/0.5 | 10月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 194 | 174.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 17 | 0.0 | https://convert-units.info/weight/pound/174.8 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 195 | 0.5l to ml | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 28 | 0.0 | https://convert-units.info/volume/liter/0.055 | 10月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 196 | 137.8 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 20 | 0.07 | 590 | 6 | 0.0 | https://convert-units.info/weight/pound/137.8 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 197 | cm 3.5 | 信息 | 10 | 10 | AI 概览, 视频, 相关问题 | 20 | 0.07 | 1,600 | 23 | 0.0 | https://convert-units.info/volume/cubic-centimeter/0.035 | 10月21日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 198 | how much is 6 tons | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 20 | 0.07 | 320 | 10 | 0.0 | https://convert-units.info/weight/tonne/6.2 | 10月05日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 199 | 131.8 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题 | 20 | 0.07 | 590 | 6 | 0.0 | https://convert-units.info/weight/pound/131.8 | 9月07日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 200 | 133.6 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 20 | 0.07 | 590 | 12 | 0.0 | https://convert-units.info/weight/pound/133.6 | 9月08日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 201 | cubic mm to ml | 信息 | 2 | 2 | 即时答案, 图片包, 视频, 相关问题 | 20 | 0.07 | 320 | 11 | 0.0 | https://convert-units.info/volume/cubic-millimeter/10 | 9月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 202 | 63.8 kg to pounds | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 1,600 | 24 | 0.0 | https://convert-units.info/weight/pound/63.8 | 10月19日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 203 | n/mm to lb/in | 信息 | AI 概览 | AI 概览 | AI 概览, 评价, 视频, 相关搜索 | 20 | 0.07 | 590 | 2 | 0.0 | https://convert-units.info/torque/newton-millimeter/45 | 9月16日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 204 | 6666.67 in words | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 24 | 0.0 | https://convert-units.info/time/second/6666.67 | 9月16日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 205 | 119.2 lb to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 11 | 0.0 | https://convert-units.info/weight/pound/119.2 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 206 | 151.6 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 20 | 0.07 | 590 | 12 | 0.0 | https://convert-units.info/weight/pound/151.6 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 207 | 127.8 lbs to kg | 信息 | 4 | 4 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 590 | 12 | 0.0 | https://convert-units.info/weight/pound/127.8 | 9月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 208 | 3.38 fl oz | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 20 | 0.07 | 320 | 27 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/3.38 | 9月07日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 209 | 2.35 inches to mm | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 20 | 0.07 | 320 | 29 | 0.0 | https://convert-units.info/length/inch/2.035 | 10月05日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 210 | 27 lbs in kg | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 19 | 0.07 | 1,000 | 24 | 0.0 | https://convert-units.info/weight/pound/27 | 9月16日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 211 | 36.6 celsius to f | 信息 | 18 | 18 | 评价, 即时答案, 视频, 相关搜索 | 19 | 0.07 | 6,600 | 21 | 0.0 | https://convert-units.info/temperature/celsius/36.6 | 10月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 212 | 16meter | 信息 | 8 | 8 | 即时答案, 图片包, 相关问题 | 19 | 0.07 | 1,000 | 21 | 0.0 | https://convert-units.info/length/meter/16.2 | 10月06日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 213 | n mm to lb in | 信息 | AI 概览 | AI 概览 | AI 概览, 视频, 相关搜索 | 19 | 0.07 | 320 | 1 | 0.0 | https://convert-units.info/torque/newton-millimeter/45 | 9月12日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 214 | kpa to psf | 信息 | 9 | 9 | AI 概览, 评价, 视频, 相关搜索 | 19 | 0.07 | 880 | 6 | 0.0 | https://convert-units.info/pressure/kilopascal/13.4 | 9月16日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 215 | 108 kpa to psi | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 19 | 0.07 | 1,000 | 29 | 0.0 | https://convert-units.info/pressure/kilopascal/108 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 216 | 60000 ms to seconds | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 19 | 0.07 | 880 | 24 | 0.0 | https://convert-units.info/time/millisecond/60000 | 10月16日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 217 | 57kg to lbs | 信息 | 21 | 21 | 评价, 即时答案, 相关问题, 相关搜索 | 18 | 0.07 | 12,100 | 22 | 0.0 | https://convert-units.info/weight/kilogram/57 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 218 | 195 pounds to kilos | 信息 | 29 | 29 | 即时答案, 视频 | 18 | 0.07 | 12,100 | 26 | 0.0 | https://convert-units.info/weight/pound/195 | 10月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 219 | 300000ms | 信息 | 2 | 2 | AI 概览, 评价, 相关问题, 相关搜索 | 18 | 0.07 | 140 | 18 | 0.0 | https://convert-units.info/time/millisecond/300000 | 9月23日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 220 | 38.5 c to f | 信息 | 20 | 20 | 评价, 即时答案, 视频, 相关搜索 | 18 | 0.07 | 12,100 | 23 | 0.0 | https://convert-units.info/temperature/celsius/38.5 | 10月24日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 221 | 0.02 newtons | 信息 | 1 | 1 | AI 概览, 视频, 相关问题 | 18 | 0.07 | 140 | 24 | 0.0 | https://convert-units.info/force/newton/0.02 | 9月01日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 222 | kn en lbs | 信息 | 12 | 12 | AI 概览, 评价, 相关问题, 相关搜索 | 18 | 0.07 | 3,600 | 12 | 0.0 | https://convert-units.info/force/kilonewton/15000 | 4 天 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 223 | 125 cm cubicos | 信息 | 1 | 1 | AI 概览, 评价, 视频, 视频轮播, 相关搜索 | 18 | 0.07 | 140 | 2 | 0.6 | https://convert-units.info/volume/cubic-centimeter/125 | 10月02日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 224 | 113 pound kg | 信息 | 22 | 22 | 即时答案, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 12,100 | 28 | 0.0 | https://convert-units.info/weight/pound/113 | 1 天 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 225 | kilogram to kilogram | 信息 | 1 | 1 | AI 概览, 图片, 图片包, 视频, 相关问题 | 18 | 0.07 | 140 | 13 | 0.0 | https://convert-units.info/weight/kilogram/0.044 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 226 | psi to lbs force | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 140 | 13 | 0.0 | https://convert-units.info/pressure/pounds-per-sq-inch/75000 | 10月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 227 | 10kn | 信息 | 1 | 1 | AI 概览, 评价, 图片包, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 140 | 11 | 0.0 | https://convert-units.info/force/kilonewton/10 | 9月03日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 228 | oz gl | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 18 | 0.07 | 140 | 19 | 0.0 | https://convert-units.info/density/gram-liter/1.4 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 229 | cm2 into cm | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 18 | 0.07 | 140 | 2 | 0.0 | https://convert-units.info/area/square-centimeter/0.064 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 230 | 31536000 seconds | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 140 | 8 | 0.0 | https://convert-units.info/time/second/31536000 | 10月01日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 231 | 180 pounds in kg | 信息 | 31 | 31 | 即时答案, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 27,100 | 30 | 0.0 | https://convert-units.info/weight/pound/180 | 10月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 232 | 180lbs en kg | 信息 | 35 | 35 | AI 概览, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 27,100 | 29 | 0.0 | https://convert-units.info/weight/pound/180 | 10月24日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 233 | 125 lbs to kg | 信息 | 28 | 28 | 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 18 | 0.07 | 27,100 | 36 | 0.0 | https://convert-units.info/weight/pound/125 | 10月24日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 234 | 164 pounds into kg | 信息 | 22 | 22 | 评价, 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 18 | 0.07 | 12,100 | 26 | 0.0 | https://convert-units.info/weight/pound/-164 | 10月23日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 235 | 604800 | 信息 | 1 | 1 | 站点子链, AI 概览, 评价, 视频, 相关问题 | 18 | 0.07 | 140 | 11 | 0.0 | https://convert-units.info/time/second/604800 | 9月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 236 | 195 lbs to kg | 信息 | 27 | 27 | 即时答案, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 12,100 | 26 | 0.0 | https://convert-units.info/weight/pound/195 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 237 | 56kg to pounds | 信息 | 13 | 13 | 即时答案, 视频, 相关问题, 相关搜索 | 18 | 0.07 | 3,600 | 45 | 0.0 | https://convert-units.info/weight/kilogram/56 | 4 天 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 238 | 2.5 kg to lbs | 信息 | 24 | 24 | 评价, 即时答案, 相关问题, 相关搜索 | 18 | 0.07 | 12,100 | 19 | 0.0 | https://convert-units.info/weight/kilogram/2.5 | 10月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 239 | 1.69 ounces | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 210 | 23 | 0.0 | https://convert-units.info/weight/ounce/1.69 | 10月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 240 | 4000000 | 信息 | 5 | 5 | AI 概览, 图片包, 视频, 相关问题 | 17 | 0.06 | 720 | 22 | 0.0 | https://convert-units.info/force/newton/4000000 | 10月05日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 241 | how many ml in gram | 信息 | 3 | 3 | AI 概览, 视频, 相关问题 | 17 | 0.06 | 390 | 4 | 0.0 | https://convert-units.info/density/gram-milliliter/1.02 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 242 | 3.78 liters to ounces | 信息 | 7 | 7 | 站点子链, 即时答案, 视频, 相关问题 | 17 | 0.06 | 720 | 25 | 0.0 | https://convert-units.info/volume/liter/3.78 | 9月16日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 243 | 946 ml | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 210 | 19 | 0.0 | https://convert-units.info/volume/milliliter/946 | 10月04日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 244 | 1.8 kilograms in pounds | 信息 | 0 | 14 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 4,400 | 27 | 0.0 | https://convert-units.info/weight/kilogram/1.8 | 21 小时 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 245 | 159.2 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 17 | 0.06 | 390 | 7 | 0.0 | https://convert-units.info/weight/pound/159.2 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 246 | 0.33 fl.oz | 信息 | 1 | 1 | 站点子链, 即时答案, 视频, 相关问题 | 17 | 0.06 | 210 | 25 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.33 | 10月21日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 247 | 123.4 lbs in kg | 信息 | 3 | 3 | 即时答案, 相关问题 | 17 | 0.06 | 390 | 13 | 0.0 | https://convert-units.info/weight/pound/123.4 | 9月08日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 248 | 92.1 kg to lbs | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 720 | 13 | 0.0 | https://convert-units.info/weight/kilogram/-92.1 | 9月13日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 249 | 9.03 m | 信息 | 5 | 5 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 720 | 24 | 0.0 | https://convert-units.info/length/meter/9.3 | 9月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 250 | whats a cubic inch | 信息 | 3 | 3 | 即时答案, 相关问题 | 17 | 0.06 | 390 | 12 | 0.0 | https://convert-units.info/volume/cubic-inch/100 | 10月01日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 251 | newton meter to meter | 信息 | 2 | 2 | AI 概览, 图片包, 相关问题, 相关搜索 | 17 | 0.06 | 390 | 40 | 0.0 | https://convert-units.info/torque/newton-meter/11100 | 9月29日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 252 | 30000 milliseconds to seconds | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 590 | 25 | 0.0 | https://convert-units.info/time/millisecond/30000 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 253 | 30000 ms to seconds | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 720 | 32 | 0.0 | https://convert-units.info/time/millisecond/30000 | 9月08日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 254 | 9.75 cm | 信息 | 1 | 1 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 210 | 16 | 0.0 | https://convert-units.info/length/centimeter/-9.75 | 9月17日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 255 | 1.14 lbs to oz | 信息 | 2 | 2 | 即时答案, 视频, 相关搜索 | 17 | 0.06 | 210 | 32 | 0.0 | https://convert-units.info/weight/ounce/1.14 | 10月20日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 256 | cubic meter to milliliter | 信息 | 3 | 3 | 即时答案, 视频, 相关问题 | 17 | 0.06 | 390 | 13 | 0.0 | https://convert-units.info/volume/cubic-meter/0.93 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 257 | 112 oz to gallons | 信息 | 1 | 1 | 即时答案, 相关问题 | 17 | 0.06 | 210 | 8 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/112 | 4 天 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 258 | 355 ml to fluid ounces | 信息 | 6 | 6 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 720 | 20 | 0.0 | https://convert-units.info/volume/milliliter/355 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 259 | m/s2 | 信息 | 6 | 6 | AI 概览, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 720 | 15 | 0.0 | https://convert-units.info/acceleration/meter-second2/0.12 | 10月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 260 | 166.6 lbs to kg | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 590 | 19 | 0.0 | https://convert-units.info/weight/pound/166.6 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 261 | how many cups is 1.8 liters | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 17 | 0.06 | 590 | 11 | 0.0 | https://convert-units.info/volume/liter/1.8 | 10月04日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 262 | 76.8 kg to lbs | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 1,300 | 12 | 0.0 | https://convert-units.info/weight/pound/76.8 | 9月14日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 263 | gram and milliliter conversion | 信息 | 4 | 4 | AI 概览, 相关问题 | 16 | 0.06 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/0.988 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 264 | 56 kg in pounds | 信息 | 17 | 17 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 5,400 | 21 | 0.0 | https://convert-units.info/weight/kilogram/56 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 265 | mach 999 | 信息 | 3 | 3 | 即时答案, 视频 | 16 | 0.06 | 260 | 26 | 1.99 | https://convert-units.info/speed/mach/999 | 9月19日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 266 | 80.4 kg to lbs | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 1,300 | 13 | 0.0 | https://convert-units.info/weight/kilogram/80.4 | 10月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 267 | 138.2lbs to kg | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题 | 16 | 0.06 | 260 | 10 | 0.0 | https://convert-units.info/weight/pound/138.2 | 9月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 268 | 74.6 kg to pounds | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 1,300 | 18 | 0.0 | https://convert-units.info/weight/pound/74.6 | 9月29日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 269 | 125.6 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 480 | 12 | 0.0 | https://convert-units.info/weight/pound/125.6 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 270 | 169.2 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 260 | 7 | 0.0 | https://convert-units.info/weight/pound/169.2 | 10月03日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 271 | 300000 milliseconds to minutes | 信息 | 5 | 5 | 即时答案, 相关搜索 | 16 | 0.06 | 480 | 21 | 0.0 | https://convert-units.info/time/millisecond/300000 | 9月04日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 272 | 290 libras a kilos | 信息 | 2 | 2 | 即时答案, 相关问题 | 16 | 0.06 | 260 | 6 | 0.0 | https://convert-units.info/weight/pound/290 | 10月26日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 273 | how many cubic feet in a cubic foot | 信息 | 2 | 2 | AI 概览, 评价, 图片包, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 260 | 8 | 0.0 | https://convert-units.info/volume/cubic-foot/4.8 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 274 | 4.58mmhg to atm | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 260 | 26 | 2.21 | https://convert-units.info/pressure/mm-of-mercury/-4.58 | 10月23日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 275 | f to r | 信息 | 14 | 14 | 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 16 | 0.06 | 5,400 | 30 | 0.0 | https://convert-units.info/temperature/rankine/1 | 10月24日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 276 | 0.04 in mm | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 480 | 21 | 0.0 | https://convert-units.info/length/millimeter/0.04 | 9月02日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 277 | psi to lbs conversion | 信息 | 2 | 2 | AI 概览, 视频, 相关问题 | 16 | 0.06 | 260 | 2 | 0.0 | https://convert-units.info/pressure/pounds-per-sq-inch/34000 | 10月08日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 278 | 143.2 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 480 | 22 | 0.0 | https://convert-units.info/weight/pound/143.2 | 9月03日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 279 | 191.6 lbs to kg | 信息 | 2 | 2 | 站点子链, 即时答案, 视频, 相关问题 | 16 | 0.06 | 260 | 11 | 0.0 | https://convert-units.info/weight/pound/191.6 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 280 | 181.2 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 260 | 15 | 0.0 | https://convert-units.info/weight/pound/181.2 | 9月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 281 | 88.6 kg to pounds | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 16 | 0.06 | 1,300 | 20 | 0.0 | https://convert-units.info/weight/pound/88.6 | 10月06日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 282 | 182.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 16 | 0.06 | 260 | 14 | 0.0 | https://convert-units.info/weight/pound/182.8 | 9月03日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 283 | lb en kg | 信息 | 8 | 8 | AI 概览, 评价, 图片包, 视频, 相关问题 | 16 | 0.06 | 1,300 | 5 | 0.01 | https://convert-units.info/density/kilogram-cubic-meter/1100 | 10月01日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 284 | 180lbs to kg | 信息 | 37 | 37 | 即时答案, 视频, 相关问题, 相关搜索 | 15 | 0.05 | 22,200 | 34 | 0.0 | https://convert-units.info/weight/pound/180 | 10月24日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 285 | ft3 | 导航 | 4 | 4 | AI 概览, 图片, 图片包, 相关问题, 知识面板, 相关搜索 | 15 | 0.05 | 1,900 | 17 | 0.0 | https://convert-units.info/flow-rate/cubic-feet-minute/350 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 286 | 140 pounds in kg | 信息 | 27 | 27 | 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 15 | 0.05 | 22,200 | 34 | 0.0 | https://convert-units.info/weight/pound/140 | 10月23日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 287 | 140 pounds in kg | 信息 | 30 | 30 | 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 15 | 0.05 | 22,200 | 34 | 0.0 | https://convert-units.info/weight/pound/140 | 10月23日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 288 | quart to cubic feet | 信息 | 8 | 8 | 即时答案, 图片, 相关问题 | 15 | 0.05 | 720 | 13 | 0.0 | https://convert-units.info/volume/cubic-foot/0.375 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 289 | 100n m | 信息 | 1 | 1 | 站点子链, AI 概览, 评价, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 14 | 0.0 | https://convert-units.info/torque/newton-meter/100 | 10月05日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 290 | convert milliliters to micrograms | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 14 | 0.05 | 110 | 2 | 0.0 | https://convert-units.info/density/microgram-milliliter/5.6 | 9月30日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 291 | gram and milliliter conversion | 信息 | 5 | 5 | AI 概览, 相关问题 | 14 | 0.05 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/0.108 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 292 | 166.6 lbs in kg | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 11 | 0.0 | https://convert-units.info/weight/pound/166.6 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 293 | 130kg | 信息 | 8 | 8 | 评价, 即时答案, 图片包, 视频, 相关问题, 讨论和论坛, 相关搜索 | 14 | 0.05 | 1,600 | 22 | 0.0 | https://convert-units.info/weight/kilogram/130 | 10月18日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 294 | how much does 1 gram weigh | 信息 | 1 | 1 | AI 概览, 评价, 图片包, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 18 | 0.0 | https://convert-units.info/weight/gram/0.001 | 10月01日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 295 | 125.8 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 7 | 0.0 | https://convert-units.info/weight/pound/125.8 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 296 | 1.55 lbs to oz | 信息 | 1 | 1 | 即时答案, 相关搜索 | 14 | 0.05 | 110 | 31 | 0.0 | https://convert-units.info/weight/pound/1.55 | 10月18日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 297 | ug/l | 信息 | 6 | 6 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 13 | 0.0 | https://convert-units.info/density/microgram-liter/1000 | 10月18日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 298 | sq mm to sq meter | 信息 | 5 | 5 | 即时答案, 图片包, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 33 | 0.0 | https://convert-units.info/area/square-millimeter/150000 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 299 | ml in a cubic meter | 信息 | 7 | 7 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 12 | 0.0 | https://convert-units.info/volume/cubic-meter/0.93 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 300 | 2.5 kpa to atm | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 8 | 2.21 | https://convert-units.info/pressure/kilopascal/25.3 | 10月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 301 | 53kg to lbs | 信息 | 21 | 21 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 9,900 | 27 | 0.0 | https://convert-units.info/weight/kilogram/53 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 302 | 4 dl | 信息 | AI 概览 | AI 概览 | AI 概览, 评价, 图片包, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 210 | 14 | 0.0 | https://convert-units.info/volume/deciliter/4 | 9月08日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 303 | kpa to inches mercury | 信息 | 1 | 1 | 即时答案, 相关问题 | 14 | 0.05 | 110 | 8 | 0.0 | https://convert-units.info/pressure/kilopascal/0.68 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 304 | 4.375 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 6 | 0.0 | https://convert-units.info/length/inch/-4.375 | 10月12日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 305 | 170.4 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 320 | 19 | 0.0 | https://convert-units.info/weight/pound/170.4 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 306 | 3.78 liters to oz | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 26 | 0.0 | https://convert-units.info/volume/liter/3.78 | 10月18日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 307 | 43200 minutes to days | 信息 | 7 | 7 | 即时答案, 图片, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 15 | 0.0 | https://convert-units.info/time/minute/43200 | 10月19日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 308 | 5.625 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 16 | 0.0 | https://convert-units.info/length/inch/5.625 | 9月12日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 309 | 101 pounds in kilos | 信息 | 14 | 14 | 评价, 即时答案, 图片包, 视频, 视频轮播, 相关问题, 相关搜索 | 14 | 0.05 | 9,900 | 24 | 0.0 | https://convert-units.info/weight/pound/101 | 2 天 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 310 | 7.375 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 2 | 0.0 | https://convert-units.info/length/inch/7.375 | 9月28日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 311 | 6.375 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 2 | 0.0 | https://convert-units.info/length/inch/6.375 | 10月06日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 312 | gallon in ml | 信息 | 6 | 6 | 评价, 即时答案, 图片包, 相关问题 | 14 | 0.05 | 590 | 13 | 0.0 | https://convert-units.info/volume/milliliter/9.8 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 313 | 139.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 320 | 16 | 0.0 | https://convert-units.info/weight/pound/139.6 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 314 | 161.8 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 7 | 0.0 | https://convert-units.info/weight/pound/161.8 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 315 | 3.78 l to oz | 信息 | 7 | 7 | 评价, 即时答案, 图片包 | 14 | 0.05 | 590 | 27 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/3.78 | 9月30日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 316 | 0.25 oz | 信息 | 5 | 5 | 站点子链, 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 24 | 0.0 | https://convert-units.info/weight/ounce/0.25 | 10月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 317 | 20 n/m | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 23 | 0.0 | https://convert-units.info/torque/newton-meter/20 | 10月03日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 318 | 140lb to kg | 信息 | 27 | 27 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 9,900 | 19 | 0.0 | https://convert-units.info/weight/pound/140 | 10月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 319 | 2170 kg | 信息 | 3 | 3 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 320 | 25 | 0.0 | https://convert-units.info/density/kilogram-cubic-meter/2170 | 9月16日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 320 | 3.6e 6 | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 5 | 0.0 | https://convert-units.info/time/millisecond/3.6E-6 | 9月24日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 321 | how many gigabits are in a gigabyte | 信息 | 5 | 5 | 即时答案, 视频, 相关问题 | 14 | 0.05 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/-0.3469 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 322 | hpa to mmhg | 信息 | 3 | 3 | AI 概览, 图片包, 视频, 相关问题 | 14 | 0.05 | 320 | 4 | 0.0 | https://convert-units.info/pressure/hectopascal/835 | 10月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 323 | 510 en cm | 信息 | 20 | 20 | AI 概览, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 9,900 | 22 | 0.0 | https://convert-units.info/length/inch/510 | 10月27日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 324 | 106.8 kg to lbs | 信息 | 5 | 5 | 评价, 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 10 | 0.0 | https://convert-units.info/weight/pound/106.8 | 10月17日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 325 | 127.4 lbs to kg | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 10 | 0.0 | https://convert-units.info/weight/pound/127.4 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 326 | 7.875 in inches | 信息 | 1 | 1 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 13 | 0.0 | https://convert-units.info/length/inch/7.875 | 10月13日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 327 | 50n m | 信息 | 1 | 1 | 站点子链, AI 概览, 评价, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 110 | 9 | 0.0 | https://convert-units.info/torque/newton-meter/50 | 9月25日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 328 | 50 ms to seconds | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 320 | 15 | 0.0 | https://convert-units.info/time/millisecond/50 | 10月21日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 329 | 14400 seconds in hours | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 480 | 7 | 0.0 | https://convert-units.info/time/second/1814400 | 10月27日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 330 | 67 inch | 信息 | 2 | 2 | 即时答案, 图片包, 视频, 相关问题 | 14 | 0.05 | 320 | 29 | 0.0 | https://convert-units.info/length/inch/0.67 | 9月28日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 331 | 710ml to oz | 信息 | 7 | 7 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 23 | 0.0 | https://convert-units.info/volume/milliliter/710 | 10月12日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 332 | 164.4 lbs to kg | 信息 | 7 | 7 | 即时答案, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 15 | 0.0 | https://convert-units.info/weight/pound/164.4 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 333 | 115.8 lbs to kg | 信息 | 3 | 3 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 320 | 7 | 0.0 | https://convert-units.info/weight/pound/115.8 | 9月25日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 334 | 135.6 lbs to kg | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 14 | 0.05 | 590 | 16 | 0.0 | https://convert-units.info/weight/pound/135.6 | 10月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 335 | 54oz to lbs | 信息 | 4 | 4 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 390 | 3 | 0.0 | https://convert-units.info/weight/pound/54 | 10月06日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 336 | 80 cm2 | 信息 | 1 | 1 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 170 | 19 | 0.0 | https://convert-units.info/area/square-centimeter/80 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 337 | what is newton meter torque | 信息 | 2 | 2 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 210 | 13 | 0.0 | https://convert-units.info/torque/newton-meter/122 | 10月01日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 338 | 134.4 lbs to kg | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 720 | 15 | 0.0 | https://convert-units.info/weight/pound/134.4 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 339 | 96.8 kg to lbs | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 17 | 0.0 | https://convert-units.info/weight/pound/96.8 | 9月17日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 340 | lbf/in to n/m | 信息 | 2 | 2 | 即时答案, 相关搜索 | 13 | 0.05 | 170 | 26 | 0.0 | https://convert-units.info/torque/pound-force-inch/10 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 341 | g/cm3 | 信息 | 6 | 6 | AI 概览, 视频, 视频轮播, 相关问题, 相关搜索 | 13 | 0.05 | 720 | 7 | 0.0 | https://convert-units.info/density/gram-cubic-centimeter/0.8 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 342 | mmhg to hg | 信息 | 10 | 10 | 即时答案, 相关问题 | 13 | 0.05 | 1,000 | 26 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/681 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 343 | 131.4 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 390 | 11 | 0.0 | https://convert-units.info/weight/pound/131.4 | 9月30日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 344 | 74.8 kg to lbs | 信息 | 11 | 11 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,900 | 19 | 0.0 | https://convert-units.info/weight/pound/74.8 | 10月17日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 345 | 5.5 ml | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 210 | 20 | 0.0 | https://convert-units.info/volume/milliliter/5.5 | 9月22日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 346 | 1.66m to ft | 信息 | 11 | 11 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,900 | 24 | 0.0 | https://convert-units.info/speed/meter-second/1.66 | 9月30日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 347 | hp and watt | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 相关问题 | 13 | 0.05 | 170 | 26 | 0.03 | https://convert-units.info/power/watt/0.33 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 348 | convert pa | 信息 | 1 | 1 | 即时答案, 相关问题 | 13 | 0.05 | 170 | 36 | 0.0 | https://convert-units.info/pressure/pascal/1032 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 349 | how to convert ml to mg | 信息 | 2 | 2 | AI 概览, 相关问题 | 13 | 0.05 | 210 | 2 | 0.0 | https://convert-units.info/density/milligram-milliliter/0.0008 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 350 | 6000 minutes to hours | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 23 | 0.0 | https://convert-units.info/time/minute/6000 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 351 | 1 n/mm | 信息 | 14 | 14 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 4,400 | 20 | 0.05 | https://convert-units.info/torque/newton-millimeter/1 | 10月19日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 352 | 0.571in to mm | 信息 | 1 | 1 | 即时答案, 相关问题, 相关搜索 | 13 | 0.05 | 170 | 9 | 0.0 | https://convert-units.info/length/inch/-0.571 | 9月19日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 353 | 14400 seconds to hours | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 19 | 0.0 | https://convert-units.info/time/second/14400 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 354 | 0.27 oz | 信息 | 8 | 8 | 站点子链, 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 720 | 18 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.27 | 10月19日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 355 | 1.25l to oz | 信息 | 10 | 10 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 29 | 0.0 | https://convert-units.info/volume/liter/1.25 | 9月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 356 | 7.5 mililitros | 信息 | 7 | 7 | 评价, 即时答案, 图片包, 视频, 视频轮播, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 25 | 0.0 | https://convert-units.info/volume/milliliter/7.5 | 10月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 357 | 152.4 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 13 | 0.05 | 390 | 8 | 0.0 | https://convert-units.info/weight/pound/152.4 | 9月13日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 358 | 0.3kg to lbs | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 720 | 22 | 0.0 | https://convert-units.info/weight/kilogram/0.3 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 359 | 8 million kb to gb | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题 | 13 | 0.05 | 210 | 29 | 0.0 | https://convert-units.info/data-storage/kilobyte/8500000 | 9月28日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 360 | 3.5ml | 信息 | 1 | 1 | 即时答案, 视频, 相关问题 | 13 | 0.05 | 170 | 23 | 0.0 | https://convert-units.info/volume/milliliter/-3.5 | 9月25日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 361 | 1.14 lbs to oz | 信息 | 3 | 3 | 即时答案, 视频, 相关搜索 | 13 | 0.05 | 210 | 32 | 0.0 | https://convert-units.info/weight/pound/1.14 | 10月20日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 362 | 65lbs in kg | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 21 | 0.0 | https://convert-units.info/weight/pound/65 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 363 | 3600000 ms to minutes | 信息 | 2 | 2 | 即时答案, 视频 | 13 | 0.05 | 170 | 16 | 0.25 | https://convert-units.info/time/microsecond/3600000 | 10月18日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 364 | 56.9 kg to pounds | 信息 | 10 | 10 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 26 | 0.0 | https://convert-units.info/weight/kilogram/56.9 | 10月05日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 365 | 93 pounds kg | 信息 | 17 | 17 | 即时答案, 视频, 相关搜索 | 13 | 0.05 | 4,400 | 11 | 0.0 | https://convert-units.info/weight/pound/93 | 10月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 366 | 800km to miles | 信息 | 17 | 17 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 4,400 | 24 | 0.0 | https://convert-units.info/fuel-consumption/km-liter/800 | 10月23日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 367 | 245lb to kg | 信息 | 6 | 6 | 即时答案, 视频轮播, 相关问题, 相关搜索 | 13 | 0.05 | 720 | 19 | 0.0 | https://convert-units.info/weight/pound/245 | 9月09日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 368 | 0.372822715 miles | 信息 | 1 | 1 | 评价, 即时答案, 相关问题, 相关搜索 | 13 | 0.05 | 170 | 30 | 0.0 | https://convert-units.info/speed/meter-second/0.372822715 | 9月14日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 369 | 158.2 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 390 | 14 | 0.0 | https://convert-units.info/weight/pound/158.2 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 370 | 178.2 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 210 | 10 | 0.0 | https://convert-units.info/weight/pound/178.2 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 371 | mmhg to inches hg | 信息 | 1 | 1 | 即时答案, 相关问题 | 13 | 0.05 | 170 | 7 | 0.0 | https://convert-units.info/pressure/mm-of-mercury/0 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 372 | 330kmh to mph | 信息 | 10 | 10 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 1,000 | 21 | 3.24 | https://convert-units.info/speed/kilometer-hour/330 | 9月13日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 373 | 187ml to oz | 信息 | 16 | 16 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 4,400 | 28 | 0.0 | https://convert-units.info/volume/milliliter/187 | 10月26日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 374 | 181 lbs to kg | 信息 | 15 | 15 | 即时答案, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 4,400 | 21 | 0.0 | https://convert-units.info/weight/pound/181 | 4 天 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 375 | 3.625 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 13 | 0.05 | 170 | 13 | 0.0 | https://convert-units.info/length/inch/3.625 | 10月20日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 376 | 5120.00 | 信息 | 10 | 10 | AI 概览, 评价, 视频, 相关问题 | 13 | 0.05 | 1,000 | 17 | 0.0 | https://convert-units.info/data-storage/megabyte/5120 | 9月11日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 377 | 0.04mm | 信息 | 4 | 4 | 评价, 即时答案, 视频, 相关问题 | 13 | 0.05 | 390 | 24 | 0.0 | https://convert-units.info/length/millimeter/0.04 | 9月16日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 378 | 90 lbs to kg | 信息 | 18 | 18 | 评价, 即时答案, 视频, 视频轮播, 相关搜索 | 12 | 0.04 | 8,100 | 26 | 0.0 | https://convert-units.info/weight/pound/90 | 10月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 379 | 164 lbs to kg | 信息 | 21 | 21 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 25 | 0.0 | https://convert-units.info/weight/pound/-164 | 10月23日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 380 | 375 ml to oz | 信息 | 31 | 31 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 18,100 | 34 | 0.0 | https://convert-units.info/volume/milliliter/375 | 10月26日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 381 | 180 pound in kg | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 590 | 12 | 0.0 | https://convert-units.info/weight/pound/180 | 10月15日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 382 | 10.75 1.75 | 信息 | 1 | 1 | 站点子链, 评价, 视频, 相关问题 | 12 | 0.04 | 50 | 2 | 0.0 | https://convert-units.info/volume/deciliter/1.75 | 10月22日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 383 | 19.6 kg to pounds | 信息 | 7 | 7 | 即时答案, 图片包, 相关问题 | 12 | 0.04 | 590 | 17 | 0.0 | https://convert-units.info/pressure/megapascal/19.6 | 9月30日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 384 | 33.8 | 信息 | AI 概览 | AI 概览 | 站点子链, AI 概览, 评价, 图片包, 视频, 相关问题 | 12 | 0.04 | 210 | 25 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/33.8 | 9月17日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 385 | 2.36 | 信息 | AI 概览 | AI 概览 | 站点子链, AI 概览, 图片包, 视频, 相关问题 | 12 | 0.04 | 210 | 17 | 0.0 | https://convert-units.info/length/inch/2.36 | 9月30日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 386 | 117 lbs in kilos | 信息 | 13 | 13 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 2,400 | 24 | 0.0 | https://convert-units.info/weight/pound/117 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 387 | 1e-12 | 信息 | 7 | 7 | AI 概览, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 590 | 37 | 0.0 | https://convert-units.info/time/second/1.0E-12 | 10月18日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 388 | 76kg to lbs | 信息 | 26 | 26 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 26 | 0.0 | https://convert-units.info/weight/pound/76 | 10月23日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 389 | 450 kg to lbs | 信息 | 12 | 12 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 2,400 | 29 | 0.0 | https://convert-units.info/weight/kilogram/450 | 10月25日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 390 | 126 lbs to kg | 信息 | 26 | 26 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 23 | 0.0 | https://convert-units.info/weight/pound/126 | 10月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 391 | 174 lbs to kg | 信息 | 25 | 25 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 23 | 0.0 | https://convert-units.info/weight/pound/174 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 392 | 1.375 to mm | 信息 | 8 | 8 | AI 概览, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 590 | 24 | 0.0 | https://convert-units.info/length/inch/1.375 | 10月02日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 393 | 4.2 kilos to pounds | 信息 | 13 | 13 | 即时答案, 视频, 相关搜索 | 12 | 0.04 | 2,400 | 26 | 0.0 | https://convert-units.info/weight/pound/4.2 | 10月21日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 394 | 124 lbs to kg | 信息 | 27 | 27 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 19 | 0.0 | https://convert-units.info/weight/pound/124 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 395 | 125 lb to kg | 信息 | 0 | 22 | 即时答案, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 19 | 1.5 | https://convert-units.info/weight/pound/125 | 14 小时 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 396 | what area is 213 | 信息 | 7 | 7 | AI 概览, 图片包, 视频, 相关问题 | 12 | 0.04 | 590 | 22 | 0.0 | https://convert-units.info/area/square-meter/213 | 10月07日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 397 | 118 lbs to kg | 信息 | 23 | 23 | 即时答案, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 8,100 | 23 | 0.0 | https://convert-units.info/weight/pound/118 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 398 | 10000000 seconds | 信息 | AI 概览 | AI 概览 | AI 概览, 视频, 相关问题, 相关搜索 | 12 | 0.04 | 210 | 22 | 0.0 | https://convert-units.info/time/second/10000000 | 9月14日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 399 | 300 000 milliseconds to minutes | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 21 | 0.0 | https://convert-units.info/time/millisecond/300000 | 10月14日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 400 | 3000 milliseconds to seconds | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 27 | 0.0 | https://convert-units.info/time/millisecond/3000 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 401 | 162.6 lbs to kg | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 6 | 0.0 | https://convert-units.info/weight/pound/162.6 | 9月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 402 | 154.8 lbs to kg | 信息 | 6 | 6 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 7 | 0.0 | https://convert-units.info/weight/pound/154.8 | 9月09日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 403 | psi convert to lbs | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 2 | 0.0 | https://convert-units.info/pressure/pounds-per-sq-inch/75000 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 404 | 88.2 kg in pounds | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 15 | 0.0 | https://convert-units.info/weight/pound/88.2 | 10月19日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 405 | 8kn | 信息 | 1 | 1 | AI 概览, 评价, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 14 | 0.0 | https://convert-units.info/force/kilonewton/8 | 10月08日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 406 | 12kn to lbs | 信息 | 3 | 3 | AI 概览, 相关搜索 | 11 | 0.04 | 260 | 21 | 0.0 | https://convert-units.info/force/kilonewton/1250 | 10月26日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 407 | microgram milliliter | 信息 | 2 | 2 | AI 概览, 相关问题 | 11 | 0.04 | 170 | 8 | 0.0 | https://convert-units.info/density/microgram-milliliter/400 | 10月06日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 408 | 300000 ms to s | 信息 | 3 | 3 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 260 | 16 | 0.0 | https://convert-units.info/time/millisecond/300000 | 9月19日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 409 | 86400s | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 17 | 0.0 | https://convert-units.info/time/second/86400 | 9月15日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 410 | gram and milliliter conversion | 信息 | 6 | 6 | AI 概览, 相关问题 | 11 | 0.04 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/3.65 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 411 | gram and milliliter conversion | 信息 | 7 | 7 | AI 概览, 相关问题 | 11 | 0.04 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/1.25 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 412 | 216 pounds in kg | 信息 | 12 | 12 | 即时答案, 相关问题 | 11 | 0.04 | 1,600 | 20 | 0.0 | https://convert-units.info/weight/pound/216 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 413 | 32 psi to kpa | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 10 | 0.0 | https://convert-units.info/pressure/kilopascal/32 | 10月04日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 414 | 0.35 oz | 信息 | 2 | 2 | 站点子链, AI 概览, 图片包, 视频 | 11 | 0.04 | 170 | 6 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.35 | 10月08日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 415 | 400 dl | 信息 | 7 | 7 | AI 概览, 视频, 相关搜索 | 11 | 0.04 | 480 | 1 | 0.0 | https://convert-units.info/volume/deciliter/400 | 10月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 416 | 77.2 kg to lbs | 信息 | 11 | 11 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 1,600 | 17 | 0.0 | https://convert-units.info/weight/pound/77.2 | 9月24日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 417 | 1.875 in inches | 信息 | 4 | 4 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 320 | 19 | 0.0 | https://convert-units.info/length/inch/1.875 | 9月01日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 418 | 146.8 lbs to kg | 信息 | 9 | 9 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 22 | 0.0 | https://convert-units.info/weight/pound/146.8 | 9月06日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 419 | 300000 ms to minutes | 信息 | 1 | 1 | 即时答案, 相关搜索 | 11 | 0.04 | 90 | 8 | 0.0 | https://convert-units.info/time/millisecond/2300000 | 10月05日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 420 | 300n.m | 信息 | 1 | 1 | AI 概览, 评价, 视频, 视频轮播, 相关问题 | 11 | 0.04 | 140 | 21 | 0.0 | https://convert-units.info/torque/newton-meter/300 | 10月12日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 421 | 99.4 kg to lbs | 信息 | 9 | 9 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 13 | 0.0 | https://convert-units.info/weight/pound/99.4 | 10月26日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 422 | m3/h to l/min | 信息 | 1 | 1 | 即时答案, 视频 | 11 | 0.04 | 90 | 15 | 0.0 | https://convert-units.info/flow-rate/cubic-meter-hour/84000 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 423 | l en m3 conversion | 信息 | 7 | 7 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 480 | 26 | 0.0 | https://convert-units.info/volume/cubic-meter/71 | 9月28日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 424 | 155.6 lbs to kg | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 16 | 0.0 | https://convert-units.info/weight/pound/155.6 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 425 | 83.4 kg to lbs | 信息 | 9 | 9 | AI 概览, 评价, 即时答案, 相关问题 | 11 | 0.04 | 1,300 | 11 | 0.0 | https://convert-units.info/weight/kilogram/83.4 | 10月02日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 426 | 1.69oz | 信息 | 3 | 3 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 260 | 14 | 0.0 | https://convert-units.info/weight/ounce/1.69 | 10月19日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 427 | 144 pounds | 信息 | 2 | 2 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 22 | 0.0 | https://convert-units.info/weight/pound/144 | 10月03日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 428 | 110.8 lb to kg | 信息 | 3 | 3 | 即时答案, 相关问题 | 11 | 0.04 | 260 | 11 | 0.0 | https://convert-units.info/weight/pound/110.8 | 9月27日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 429 | 194.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 16 | 0.0 | https://convert-units.info/weight/pound/194.6 | 10月07日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 430 | kg cm to mpa | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 11 | 0.04 | 90 | 12 | 0.0 | https://convert-units.info/pressure/megapascal/0.51 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 431 | 187 ml to cups | 信息 | 6 | 6 | 即时答案, 相关问题 | 11 | 0.04 | 480 | 9 | 0.0 | https://convert-units.info/volume/milliliter/1.87 | 10月26日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 432 | 864000 | 信息 | 1 | 1 | AI 概览, 评价, 图片包, 视频, 相关问题 | 11 | 0.04 | 90 | 11 | 0.0 | https://convert-units.info/time/millisecond/864000 | 9月21日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 433 | 12.5 ml | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 20 | 0.0 | https://convert-units.info/volume/milliliter/12.5 | 10月23日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 434 | 0.11 kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 22 | 0.0 | https://convert-units.info/weight/kilogram/0.11 | 9月28日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 435 | 14400 minutes to hours | 信息 | 2 | 2 | 评价, 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 5 | 0.0 | https://convert-units.info/time/minute/-12614400 | 10月23日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 436 | 207.4 lbs to kg | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关搜索 | 11 | 0.04 | 140 | 13 | 0.0 | https://convert-units.info/weight/pound/207.4 | 9月29日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 437 | 20 000 nm to meters | 信息 | 2 | 2 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 170 | 42 | 0.0 | https://convert-units.info/length/nanometer/20000000 | 10月08日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 438 | 189.4 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 17 | 0.0 | https://convert-units.info/weight/pound/189.4 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 439 | 0.28oz to g | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 视频, 相关问题 | 11 | 0.04 | 90 | 7 | 0.0 | https://convert-units.info/weight/ounce/0.28 | 10月07日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 440 | converter nm | 信息 | 4 | 4 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 320 | 33 | 0.0 | https://convert-units.info/torque/newton-meter/-0.42 | 9月27日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 441 | 162.4 lbs to kg | 信息 | 6 | 6 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 7 | 0.0 | https://convert-units.info/weight/pound/162.4 | 9月13日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 442 | how many ml is an ounce of liquid | 信息 | 5 | 5 | AI 概览, 相关问题 | 11 | 0.04 | 480 | 32 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.07 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 443 | 202.6 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 9 | 0.0 | https://convert-units.info/weight/pound/202.6 | 9月21日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 444 | how many ml in kilogram | 信息 | 6 | 6 | AI 概览, 视频, 相关问题 | 11 | 0.04 | 480 | 27 | 0.0 | https://convert-units.info/density/kilogram-milliliter/0.94 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 445 | 8 nm | 信息 | 2 | 2 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 29 | 0.0 | https://convert-units.info/torque/newton-meter/8 | 10月08日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 446 | 7.8 kg | 信息 | 1 | 1 | 即时答案, 图片包 | 11 | 0.04 | 90 | 17 | 0.0 | https://convert-units.info/density/kilogram-cubic-meter/7.8 | 10月23日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 447 | 173.8 lbs to kg | 信息 | 3 | 3 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 7 | 0.0 | https://convert-units.info/weight/pound/173.8 | 9月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 448 | 8849 meters to feet | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 260 | 13 | 0.0 | https://convert-units.info/length/meter/8849 | 9月29日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 449 | 2.7 fl oz | 信息 | 1 | 1 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 21 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/2.7 | 9月01日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 450 | 2.7fl oz | 信息 | 2 | 2 | 站点子链, 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 20 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/2.7 | 9月03日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 451 | 0.3mi | 信息 | 2 | 2 | 评价, 即时答案, 图片, 视频, 相关问题 | 11 | 0.04 | 170 | 12 | 0.0 | https://convert-units.info/length/mile/0.3 | 10月25日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 452 | 33.8 fl oz to ounces | 信息 | 5 | 5 | 站点子链, AI 概览, 评价, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 9 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/33.8 | 9月06日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 453 | 88m3 | 信息 | 1 | 1 | 站点子链, 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 23 | 0.0 | https://convert-units.info/volume/cubic-meter/88 | 9月27日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 454 | n/cm to n/mm aleks | 信息 | 2 | 2 | AI 概览, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 11 | 0.0 | https://convert-units.info/torque/newton-millimeter/-132 | 10月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 455 | what does 5 milliliters equal | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 24 | 0.0 | https://convert-units.info/volume/milliliter/5.1 | 9月09日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 456 | 9.875 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 2 | 0.0 | https://convert-units.info/length/inch/9.875 | 9月24日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 457 | 200 milisegundos | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 10 | 0.0 | https://convert-units.info/time/millisecond/200 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 458 | 2.2 meters | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 20 | 0.0 | https://convert-units.info/length/meter/2.2 | 10月11日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 459 | 0.2 mililitros | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 23 | 0.0 | https://convert-units.info/volume/milliliter/0.2 | 10月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 460 | 0.16 oz | 信息 | 4 | 4 | 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 26 | 0.0 | https://convert-units.info/weight/ounce/0.16 | 10月23日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 461 | 180000 ms to minutes | 信息 | 3 | 3 | 即时答案 | 11 | 0.04 | 170 | 12 | 0.0 | https://convert-units.info/time/millisecond/180000 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 462 | 115.4 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 14 | 0.0 | https://convert-units.info/weight/pound/115.4 | 9月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 463 | 7.625 in inches | 信息 | 1 | 1 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 6 | 0.0 | https://convert-units.info/length/inch/-7.625 | 9月27日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 464 | 0.14 oz | 信息 | 2 | 2 | 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 23 | 0.0 | https://convert-units.info/weight/ounce/0.14 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 465 | 208.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 6 | 0.0 | https://convert-units.info/weight/pound/208.8 | 9月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 466 | giga byte conversion | 信息 | 3 | 3 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 320 | 14 | 0.0 | https://convert-units.info/data-storage/gigabyte/10000000000 | 10月02日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 467 | 604800 seconds | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 10 | 0.0 | https://convert-units.info/time/second/604800 | 9月30日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 468 | 140.8 lbs to kg | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 23 | 0.0 | https://convert-units.info/weight/pound/140.8 | 9月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 469 | 162.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 6 | 0.0 | https://convert-units.info/weight/pound/162.8 | 10月08日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 470 | 63.8 kg to pounds | 信息 | 11 | 11 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 1,600 | 24 | 0.0 | https://convert-units.info/weight/pound/63.8 | 10月19日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 471 | lb into pounds | 信息 | 1 | 1 | AI 概览, 评价, 图片, 图片包, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 45 | 0.0 | https://convert-units.info/weight/pound/125.8 | 10月01日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 472 | nm to n cm | 信息 | 1 | 1 | AI 概览, 相关问题 | 11 | 0.04 | 90 | 1 | 0.0 | https://convert-units.info/torque/newton-meter/-0.22 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 473 | foot to gallon | 信息 | 1 | 1 | 评价, 即时答案, 图片, 图片包, 视频, 相关问题 | 11 | 0.04 | 140 | 21 | 0.0 | https://convert-units.info/volume/us-gallon/22500 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 474 | 1.9l to oz | 信息 | 7 | 7 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 25 | 0.0 | https://convert-units.info/volume/liter/1.9 | 10月18日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 475 | liter us | 信息 | 1 | 1 | AI 概览, 图片包, 视频, 相关问题 | 11 | 0.04 | 170 | 10 | 0.43 | https://convert-units.info/volume/liter/0.05 | 9月29日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 476 | 11.875 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 5 | 0.0 | https://convert-units.info/length/inch/11.875 | 9月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 477 | 116.4 lb to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关搜索 | 11 | 0.04 | 140 | 10 | 0.0 | https://convert-units.info/weight/pound/116.4 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 478 | 4.5 kg | 信息 | 5 | 5 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 480 | 22 | 0.0 | https://convert-units.info/weight/kilogram/4.5E-5 | 10月26日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 479 | 157 8 | 信息 | AI 概览 | AI 概览 | AI 概览, 评价, 视频, 相关问题 | 11 | 0.04 | 320 | 21 | 0.0 | https://convert-units.info/weight/pound/157.8 | 10月05日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 480 | 172.2 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 20 | 0.0 | https://convert-units.info/weight/pound/172.2 | 9月22日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 481 | 47.8 kg to lbs | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 880 | 16 | 0.0 | https://convert-units.info/weight/pound/47.8 | 9月07日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 482 | 2.5 h | 信息 | 2 | 2 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 320 | 23 | 0.0 | https://convert-units.info/time/hour/2.5 | 10月20日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 483 | 134.6 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 7 | 0.0 | https://convert-units.info/weight/pound/134.6 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 484 | 3600000 ms to minutes | 信息 | 3 | 3 | 即时答案, 视频 | 11 | 0.04 | 170 | 16 | 0.25 | https://convert-units.info/time/millisecond/390000 | 10月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 485 | 632.8nm to m | 信息 | 5 | 5 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 26 | 0.0 | https://convert-units.info/length/nanometer/632.8 | 9月19日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 486 | 161.6 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 15 | 0.0 | https://convert-units.info/weight/pound/161.6 | 9月21日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 487 | 4.3m to ft | 信息 | 5 | 5 | 评价, 即时答案, 图片包, 视频, 相关搜索 | 11 | 0.04 | 390 | 11 | 0.0 | https://convert-units.info/speed/meter-second/4.3 | 10月04日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 488 | nm to n conversion | 信息 | 2 | 2 | AI 概览, 相关问题 | 11 | 0.04 | 170 | 23 | 0.0 | https://convert-units.info/torque/newton-meter/708 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 489 | 6.8 fl oz | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 23 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/6.8 | 9月17日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 490 | how many gigabits are in a gigabyte | 信息 | 6 | 6 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/-1.36 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 491 | how many gigabits are in a gigabyte | 信息 | 7 | 7 | 即时答案, 视频, 相关问题 | 11 | 0.04 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/16.33 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 492 | 66.9291 to feet | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 8 | 0.0 | https://convert-units.info/length/inch/66.9291 | 10月14日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 493 | 1.0e-6 kilograms | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 10 | 0.0 | https://convert-units.info/weight/kilogram/1.0E-6 | 9月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 494 | 111.4 kg to pounds | 信息 | 5 | 5 | 评价, 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 390 | 12 | 0.0 | https://convert-units.info/weight/pound/111.4 | 9月16日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 495 | 0.01 sec | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 19 | 0.0 | https://convert-units.info/time/second/0.01 | 9月13日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 496 | 128.6 lb in kg | 信息 | 2 | 2 | 评价, 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 170 | 缺失 | 0.0 | https://convert-units.info/weight/pound/128.6 | 9月13日 | KD缺失 | 仅研究记录，不生成数值SEO页 |
| 497 | 19.68ft | 信息 | 1 | 1 | 站点子链, 评价, 即时答案, 视频, 相关问题 | 11 | 0.04 | 140 | 29 | 3.37 | https://convert-units.info/length/foot/19.68 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 498 | 117 km to miles | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 22 | 0.0 | https://convert-units.info/fuel-consumption/km-liter/117 | 9月07日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 499 | liter compared to gallon | 信息 | 2 | 2 | 即时答案, 图片包, 相关问题, 讨论和论坛 | 11 | 0.04 | 170 | 38 | 0.0 | https://convert-units.info/volume/liter/27.5 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 500 | 3m3/h | 信息 | 1 | 1 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 15 | 0.0 | https://convert-units.info/flow-rate/cubic-meter-hour/3 | 10月15日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 501 | 0.35 kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 320 | 缺失 | 0.0 | https://convert-units.info/weight/kilogram/0.35 | 9月12日 | KD缺失 | 仅研究记录，不生成数值SEO页 |
| 502 | 5.287 l to ml | 信息 | 1 | 1 | 站点子链, 即时答案, 视频, 视频轮播, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 38 | 0.0 | https://convert-units.info/volume/liter/5.287 | 9月18日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 503 | 259200000ms to days | 信息 | 3 | 3 | 即时答案, 相关搜索 | 11 | 0.04 | 170 | 13 | 0.0 | https://convert-units.info/time/millisecond/259200000 | 10月14日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 504 | 97.8 kg to lbs | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 880 | 16 | 0.0 | https://convert-units.info/weight/pound/97.8 | 9月12日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 505 | density g cm3 | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 问答 | 11 | 0.04 | 90 | 33 | 0.0 | https://convert-units.info/density/gram-cubic-centimeter/1.02 | 9月30日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 506 | 122.8 lbs to kg | 信息 | 4 | 4 | 即时答案, 相关问题, 相关搜索 | 11 | 0.04 | 320 | 7 | 0.0 | https://convert-units.info/weight/pound/122.8 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 507 | hectoliters to gallons | 信息 | 1 | 1 | 即时答案, 图片包, 相关问题 | 11 | 0.04 | 140 | 10 | 0.0 | https://convert-units.info/volume/hectoliter/2.4 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 508 | 124.8 lbs to kg | 信息 | 9 | 9 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 590 | 8 | 0.0 | https://convert-units.info/weight/pound/124.8 | 10月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 509 | ug l conversion to mg l | 信息 | 2 | 2 | AI 概览, 相关问题 | 11 | 0.04 | 170 | 0 | 0.0 | https://convert-units.info/density/microgram-liter/84 | 10月01日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 510 | 300000000 | 信息 | 7 | 7 | 图片包, 视频, 相关问题 | 11 | 0.04 | 480 | 15 | 0.0 | https://convert-units.info/metric-prefixes/mega/300000000 | 10月19日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 511 | uk gallon to litre | 信息 | 2 | 2 | 评价, 即时答案, 图片包, 相关搜索 | 11 | 0.04 | 140 | 16 | 0.0 | https://convert-units.info/volume/cubic-meter/3.7 | 10月06日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 512 | 946 ml oz | 信息 | 11 | 11 | 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 1,600 | 29 | 0.0 | https://convert-units.info/volume/milliliter/946 | 10月18日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 513 | convert g to l | 信息 | 2 | 2 | AI 概览, 图片包, 视频, 相关问题 | 11 | 0.04 | 260 | 14 | 0.0 | https://convert-units.info/density/gram-milliliter/1.2 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 514 | 3.154e+18 | 信息 | 1 | 1 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 90 | 20 | 0.0 | https://convert-units.info/time/nanosecond/3.154E+18 | 9月16日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 515 | 101.3 kpa | 信息 | 1 | 1 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 22 | 0.0 | https://convert-units.info/pressure/kilopascal/101.3 | 10月02日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 516 | m/s convert | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 11 | 0.04 | 140 | 40 | 0.0 | https://convert-units.info/time/millisecond/1.33 | 10月02日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 517 | convert kw hp | 信息 | 3 | 3 | 即时答案, 图片, 图片包, 视频轮播, 相关问题 | 11 | 0.04 | 480 | 25 | 0.0 | https://convert-units.info/power/kilowatt/0.85 | 10月03日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 518 | cubic feet to cubic centimeters | 信息 | 4 | 4 | 即时答案, 图片包, 相关问题 | 11 | 0.04 | 390 | 7 | 0.0 | https://convert-units.info/volume/cubic-centimeter/3.2 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 519 | gram and milliliter conversion | 信息 | 8 | 8 | AI 概览, 相关问题 | 10 | 0.03 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/7.7 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 520 | 11.875 on a tape measure | 信息 | AI 概览 | AI 概览 | 站点子链, AI 概览, 评价, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 170 | 7 | 0.0 | https://convert-units.info/length/inch/11.875 | 10月03日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 521 | 86kg to lbs | 信息 | 35 | 35 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 27 | 0.0 | https://convert-units.info/weight/pound/86 | 10月24日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 522 | 142.2 lbs to kg | 信息 | 8 | 8 | 即时答案, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 7 | 0.0 | https://convert-units.info/weight/pound/142.2 | 9月12日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 523 | 1.3 liters to oz | 信息 | 8 | 8 | 站点子链, 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 31 | 0.0 | https://convert-units.info/volume/liter/1.3 | 9月17日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 524 | how many ml is an ounce of liquid | 信息 | 7 | 7 | AI 概览, 相关问题 | 10 | 0.03 | 480 | 32 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.31 | 10月06日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 525 | how many ml in kilogram | 信息 | 8 | 8 | AI 概览, 视频, 相关问题 | 10 | 0.03 | 480 | 27 | 0.0 | https://convert-units.info/density/kilogram-milliliter/0.11 | 10月05日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 526 | 47m2 to sq ft | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 25 | 0.82 | https://convert-units.info/area/square-meter/47 | 9月23日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 527 | 86 kg to lbs | 信息 | 29 | 29 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 29 | 0.0 | https://convert-units.info/weight/pound/86 | 10月19日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 528 | how many feet is 0.3 miles | 信息 | 8 | 8 | 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 22 | 0.0 | https://convert-units.info/length/mile/0.3 | 10月18日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 529 | how long is 36000 seconds | 信息 | 8 | 8 | AI 概览, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 17 | 0.0 | https://convert-units.info/time/second/36000 | 10月21日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 530 | 375 ml en oz | 信息 | 29 | 29 | AI 概览, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 26 | 0.0 | https://convert-units.info/volume/milliliter/375 | 10月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 531 | 375 ml en oz | 信息 | 33 | 33 | AI 概览, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 26 | 0.0 | https://convert-units.info/volume/milliliter/375 | 10月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 532 | 5.6km | 信息 | 8 | 8 | 即时答案, 视频, 相关问题 | 10 | 0.03 | 480 | 9 | 0.0 | https://convert-units.info/area/square-kilometer/5.6 | 10月20日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 533 | 152.8 pounds kg | 信息 | 8 | 8 | 评价, 即时答案, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 17 | 0.0 | https://convert-units.info/weight/pound/152.8 | 9月08日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 534 | 10 m s | 信息 | AI 概览 | AI 概览 | AI 概览, 评价, 视频, 相关问题, 知识面板, 相关搜索, 人们还搜索 | 10 | 0.03 | 170 | 37 | 0.0 | https://convert-units.info/time/millisecond/10 | 9月23日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 535 | 60ml to oz | 信息 | 33 | 33 | 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 28 | 0.0 | https://convert-units.info/volume/milliliter/60 | 10月22日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 536 | 91 44 | 信息 | AI 概览 | AI 概览 | AI 概览, 评价, 视频 | 10 | 0.03 | 170 | 11 | 0.0 | https://convert-units.info/length/centimeter/91.44 | 10月10日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 537 | 2.5 h | 信息 | AI 概览 | AI 概览 | AI 概览, 图片包, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 320 | 23 | 0.0 | https://convert-units.info/time/hour/2.5 | 10月20日 | 无明确普通数值排名 | 仅研究记录，不生成数值SEO页 |
| 538 | 40 kg |   | 10 | 10 | 即时答案, 图片包, 视频, 视频轮播, 相关问题, 相关搜索, 须知 | 10 | 0.03 | 3,600 | 27 | 0.0 | https://convert-units.info/weight/kilogram/40 | 10月27日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 539 | 750 mililitros | 信息 | 26 | 26 | 即时答案, 图片包, 视频, 视频轮播, 相关问题, 相关搜索 | 10 | 0.03 | 14,800 | 24 | 2.82 | https://convert-units.info/volume/milliliter/750 | 10月28日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 540 | how many gigabits are in a gigabyte | 信息 | 8 | 8 | 即时答案, 视频, 相关问题 | 10 | 0.03 | 480 | 30 | 0.0 | https://convert-units.info/data-storage/gigabyte/-1.31 | 9月07日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 541 | 116.8 kg to lbs | 信息 | 8 | 8 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 14 | 0.0 | https://convert-units.info/weight/pound/116.8 | 10月04日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 542 | 148.6 lbs to kg | 信息 | 8 | 8 | 即时答案, 相关问题, 相关搜索 | 10 | 0.03 | 480 | 12 | 0.0 | https://convert-units.info/weight/pound/148.8 | 10月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 543 | 4.5m | 信息 | 8 | 8 | 即时答案, 相关问题 | 10 | 0.03 | 480 | 24 | 0.0 | https://convert-units.info/volume/cubic-meter/4.5 | 10月05日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 544 | 300000 ms | 信息 | 2 | 2 | AI 概览, 评价, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 16 | 0.0 | https://convert-units.info/time/millisecond/300000 | 9月15日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 545 | how many hours and minutes is 0.0167 hours | 信息 | 5 | 5 | AI 概览, 评价, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 24 | 0.0 | https://convert-units.info/time/hour/0.0167 | 9月04日 | 数字表达非标准或不以数值开头 | 仅研究记录，不生成数值SEO页 |
| 546 | 107.8 kg in lbs | 信息 | 7 | 7 | 评价, 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 12 | 0.0 | https://convert-units.info/weight/pound/-107.8 | 9月16日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 547 | l ul | 信息 | 3 | 3 | AI 概览, 图片, 图片包, 视频, 相关问题 | 9 | 0.03 | 260 | 14 | 0.0 | https://convert-units.info/volume/microliter/1 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 548 | 600 000 milliseconds to minutes | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 260 | 24 | 0.0 | https://convert-units.info/time/millisecond/600000 | 10月17日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 549 | 20.7 | 信息 | 3 | 3 | AI 概览, 视频 | 9 | 0.03 | 140 | 19 | 0.0 | https://convert-units.info/pressure/kilopascal/20.7 | 10月08日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 550 | 12kn to lbs | 信息 | 4 | 4 | AI 概览, 相关搜索 | 9 | 0.03 | 260 | 21 | 0.0 | https://convert-units.info/force/kilonewton/412 | 10月26日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 551 | 158 lbs to kg | 信息 | 20 | 20 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 6,600 | 22 | 0.0 | https://convert-units.info/weight/pound/158 | 10月24日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 552 | 6.7 liters to gallons | 信息 | 3 | 3 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 26 | 0.0 | https://convert-units.info/volume/liter/6.7 | 9月14日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 553 | gram and milliliter conversion | 信息 | 9 | 9 | AI 概览, 相关问题 | 9 | 0.03 | 480 | 33 | 0.0 | https://convert-units.info/density/gram-milliliter/-7.93 | 10月03日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 554 | 208.6 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 10 | 0.0 | https://convert-units.info/weight/pound/208.6 | 10月07日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 555 | 3.78 liters | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 23 | 0.0 | https://convert-units.info/volume/liter/3.78 | 9月25日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 556 | 1.35 fl oz | 信息 | 2 | 2 | 即时答案, 图片包, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 13 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/1.35 | 10月09日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 557 | 0.21 | 信息 | 3 | 3 | AI 概览, 评价, 图片包, 视频, 相关问题 | 9 | 0.03 | 260 | 20 | 0.0 | https://convert-units.info/pressure/megapascal/0.21 | 10月04日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 558 | 1.5 g | 信息 | 3 | 3 | 即时答案, 图片包, 相关问题, 相关搜索 | 9 | 0.03 | 260 | 16 | 0.0 | https://convert-units.info/weight/gram/1.5 | 10月02日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 559 | 300 n/m | 信息 | 3 | 3 | AI 概览, 评价, 视频, 相关搜索 | 9 | 0.03 | 140 | 17 | 0.0 | https://convert-units.info/torque/newton-meter/300 | 9月13日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 560 | 20n m | 信息 | 2 | 2 | AI 概览, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 25 | 0.0 | https://convert-units.info/torque/newton-meter/20 | 10月12日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 561 | 45 lbs to kg | 信息 | 18 | 18 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 6,600 | 25 | 0.0 | https://convert-units.info/weight/pound/45 | 10月23日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 562 | 207 lbs in kg | 信息 | 10 | 10 | 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 720 | 15 | 0.0 | https://convert-units.info/weight/pound/207 | 9月25日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 563 | 63 pounds to kilograms | 信息 | 21 | 21 | 即时答案, 视频, 视频轮播, 相关问题 | 9 | 0.03 | 6,600 | 26 | 0.0 | https://convert-units.info/weight/pound/63 | 10月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 564 | 116.8 lb to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 6 | 0.0 | https://convert-units.info/weight/pound/116.8 | 10月03日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 565 | 108.2 kg to lbs | 信息 | 5 | 5 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 14 | 0.0 | https://convert-units.info/weight/pound/108.2 | 9月22日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 566 | teaspoon tsp | 信息 | 1 | 1 | AI 概览, 图片, 图片包, 相关问题 | 9 | 0.03 | 140 | 20 | 0.01 | https://convert-units.info/volume/us-teaspoon/0.048 | 9月26日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 567 | mm squared to inches squared | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 6 | 0.0 | https://convert-units.info/area/square-millimeter/0.64 | 10月06日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 568 | 144.2 lbs to kg | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 260 | 16 | 1.5 | https://convert-units.info/weight/pound/144.2 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 569 | 208.4 lbs to kg | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 10 | 0.0 | https://convert-units.info/weight/pound/208.4 | 10月02日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 570 | 604800 seconds to days | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 18 | 0.0 | https://convert-units.info/time/second/604800 | 9月16日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 571 | 97.6 kg to lbs | 信息 | 10 | 10 | 评价, 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 720 | 16 | 0.0 | https://convert-units.info/weight/pound/97.6 | 9月13日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 572 | 120.6 lbs to kg | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 10 | 0.0 | https://convert-units.info/weight/pound/120.6 | 10月09日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 573 | 202.8 lbs to kg | 信息 | 2 | 2 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 6 | 0.0 | https://convert-units.info/weight/pound/202.8 | 9月29日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 574 | 36000 ms in minutes | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 11 | 0.0 | https://convert-units.info/time/millisecond/36000 | 9月26日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 575 | 94.8 kg to lbs | 信息 | 11 | 11 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 1,300 | 20 | 0.0 | https://convert-units.info/weight/pound/94.8 | 9月14日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 576 | us gal to litres | 信息 | 1 | 1 | 评价, 即时答案, 图片包, 视频, 相关问题 | 9 | 0.03 | 110 | 38 | 0.0 | https://convert-units.info/volume/us-gallon/0.018 | 10月07日 | KD>30 | 仅研究记录，不生成数值SEO页 |
| 577 | 16384 mb | 信息 | 0 | 1 | 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 70 | 11 | 0.0 | https://convert-units.info/data-storage/megabyte/1636 | 14 小时 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 578 | ug/l to mg/l | 信息 | 13 | 13 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 1,900 | 18 | 0.0 | https://convert-units.info/density/microgram-liter/1 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 579 | 9.75 in cm | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 19 | 0.0 | https://convert-units.info/length/centimeter/-9.75 | 9月17日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 580 | 300kpa | 信息 | 1 | 1 | 即时答案, 图片包, 视频, 相关搜索 | 9 | 0.03 | 70 | 15 | 0.0 | https://convert-units.info/pressure/kilopascal/300 | 10月24日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 581 | liter to fl oz conversion | 信息 | 4 | 4 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 260 | 8 | 0.0 | https://convert-units.info/volume/us-fluid-ounce/0.05 | 9月25日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 582 | 840ml to oz | 信息 | 3 | 3 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 210 | 23 | 0.0 | https://convert-units.info/volume/milliliter/840 | 10月14日 | 目标单位不明确/缩写有歧义 | 仅研究记录，不生成数值SEO页 |
| 583 | 14400 seconds to minutes | 信息 | 6 | 6 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 19 | 0.0 | https://convert-units.info/time/second/14400 | 10月20日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 首发可索引（须过构建质量门槛） |
| 584 | 4.875 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 110 | 7 | 0.0 | https://convert-units.info/length/inch/4.875 | 10月15日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 585 | 136.8 lbs to kg | 信息 | 7 | 7 | 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 15 | 0.0 | https://convert-units.info/weight/pound/136.8 | 10月19日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 586 | 76.6 kg to pounds | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 13 | 0.0 | https://convert-units.info/weight/pound/76.6 | 10月26日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 587 | 120.4 lb to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 17 | 0.0 | https://convert-units.info/weight/pound/120.4 | 9月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 588 | 0.24 oz | 信息 | 3 | 3 | 站点子链, 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 260 | 20 | 0.0 | https://convert-units.info/weight/ounce/0.24 | 10月22日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 589 | lbf/in | 信息 | 1 | 1 | AI 概览, 视频, 相关问题 | 9 | 0.03 | 70 | 4 | 0.0 | https://convert-units.info/torque/pound-force-inch/1.1 | 9月27日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 590 | 9.375 in inches | 信息 | 1 | 1 | AI 概览, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 70 | 12 | 0.0 | https://convert-units.info/length/inch/9.375 | 9月26日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 591 | 591 milliliters | 信息 | 2 | 2 | 评价, 即时答案, 图片包, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 23 | 0.0 | https://convert-units.info/volume/milliliter/591 | 9月16日 | 目标单位未明确/泛查询 | 仅研究记录，不生成数值SEO页 |
| 592 | 165.4 lbs to kg | 信息 | 5 | 5 | 即时答案, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 11 | 0.0 | https://convert-units.info/weight/pound/165.4 | 9月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 593 | convert lbs to pounds | 信息 | 1 | 1 | AI 概览, 图片包, 相关问题, 相关搜索 | 9 | 0.03 | 70 | 1 | 0.0 | https://convert-units.info/weight/pound/3.1 | 10月06日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 594 | 0.6 square | 信息 | 5 | 5 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 26 | 0.0 | https://convert-units.info/area/square-meter/0.6 | 10月21日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 595 | g/cm3 | 信息 | 7 | 7 | AI 概览, 视频, 视频轮播, 相关问题, 相关搜索 | 9 | 0.03 | 720 | 7 | 0.0 | https://convert-units.info/density/gram-cubic-centimeter/0.65 | 10月04日 | 关键词数值无法确认 | 仅研究记录，不生成数值SEO页 |
| 596 | 0.5l to ml | 信息 | 5 | 5 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 320 | 28 | 0.0 | https://convert-units.info/volume/liter/0.0055 | 10月18日 | 关键词与竞品URL数值不匹配 | 仅研究记录，不生成数值SEO页 |
| 597 | 9 cm2 | 信息 | 1 | 1 | AI 概览, 评价, 视频, 视频轮播, 相关问题, 相关搜索 | 9 | 0.03 | 70 | 16 | 0.0 | https://convert-units.info/area/square-centimeter/9 | 10月09日 | 源单位不明确/非支持表达 | 仅研究记录，不生成数值SEO页 |
| 598 | 158.8 lbs to kg | 信息 | 7 | 7 | 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 15 | 0.0 | https://convert-units.info/weight/pound/158.8 | 10月17日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |
| 599 | 250 meters | 信息 | 6 | 6 | 即时答案, 图片包, 相关问题, 相关搜索 | 9 | 0.03 | 390 | 19 | 0.0 | https://convert-units.info/speed/meter-second/250 | 10月21日 | 源单位或物理量与竞品URL不匹配 | 仅研究记录，不生成数值SEO页 |
| 600 | 202.4 lbs to kg | 信息 | 2 | 2 | 评价, 即时答案, 视频, 相关问题, 相关搜索 | 9 | 0.03 | 140 | 7 | 0.0 | https://convert-units.info/weight/pound/202.4 | 10月18日 | 数值+源单位+目标单位可识别、原URL源侧匹配 | 通过初筛但不单独索引（通用工具覆盖） |