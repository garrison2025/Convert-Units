# Convert-Units V36｜一次性上线前 SEO、页面独特价值与移动端验收决策

> **2026-11-03｜本文件不是正式上线、索引批准或广告配置指令。** 目前唯一公开运行地址是 Cloudflare Pages 临时预览，全部 157 个页面继续 `noindex`，不启用自定义域名、GSC、Ads/AdSense。

## 1. 一次性验收范围

- **核心工具：38/38 已有独立路径与可执行换算。** 另有万能换算器、批量 CSV/TSV、本地打印与复制、16 个单位类别。
- **数值结果：92/92 已有预渲染结果。** 当前固定候选 `15`、主动不索引 `77`；这些数字是页面库存和**条件候选**，不是 Google 已收录。
- **数值质量实装：** 仅对已选择的 15 个候选 URL，源自同一换算引擎增加 `Cross-check this input` 模块；其余 77 页不重复铺设这类内容。包含质量单位与力、时间持续量与时钟、绝对温度与温差、US/UK 液量盎司、英里与海里等真正影响理解的区别。模块以服务器生成的 HTML 输出，无 JS/API/数据库依赖。
- **质量审查：** `npm run check` 包括 157 条页面、引擎精度、Meta/内链、SSR 值、15 候选与 77 抑制、预览 `noindex`、38 个真实竞品对照来源及本次审查矩阵；移动端还单独检查 320/375px 数值模块，原有检查覆盖更宽屏幕。
- **成本边界：** 原生静态页 + Cloudflare Pages；没有新付费服务、后台或预付 API，也没有修改实际部署环境变量。

## 2. 已核查数据的精确定义

原始竞品导出 `research/semrush-us-600.tsv` 是 **600 条历史 Semrush US 自然排名关键词记录**，其中已有 `162` 条严格审核为数值查询、覆盖 `15/38` 个方向。构建中的 `92` 个数字页面已经和用户原始关键词及数值一致。其余 23 个方向**不是没有功能**：每个方向已有实际竞品页面与转换功能审查记录，但它们的通用核心关键词 Volume/KD 不能用某个数值词的 Volume/KD 代替，也不能借其他工具关键词的指标。

完整方向矩阵：[`SEO-38-DIRECTION-RESEARCH-MATRIX-V32-20261103.csv`](SEO-38-DIRECTION-RESEARCH-MATRIX-V32-20261103.csv)。逐行严格样本：[`SEMRUSH-162-STRICT-ROWS-BY-DIRECTION-V32-20261103.csv`](SEMRUSH-162-STRICT-ROWS-BY-DIRECTION-V32-20261103.csv)。竞品功能核对：[`CORE-8-COMPETITOR-INTENT-V28-20261103.json`](CORE-8-COMPETITOR-INTENT-V28-20261103.json) 与 [`CORE-30-COMPETITOR-INTENT-V29-20261103.json`](CORE-30-COMPETITOR-INTENT-V29-20261103.json)。

**目前无法独立核实的信息：** 38 个通用主词当前的精确 US Volume/KD、实时 Google 排名、本站 GSC 自然流量、广告收入，以及任一数值页面相对于头部竞品所能产生的新增用户价值/搜索点击。不能把它们写成已经验证或用模拟值替代。

## 3. 所有 15 个数值候选的审查结果

表中 Volume/KD/竞品流量**仅属于代表性历史竞品关键词**，不是主工具通用词指标，更不是本站收入/流量。已新增源计算核对组件不等于独立 Google 搜索价值获证。

| # | 真实关键词 | 已存在的数值 URL | US Volume（竞品词） | KD（竞品词） | 竞品估算访问/月 | 上线前编辑判断 |
|---:|---|---|---:|---:|---:|---|
| 1 | `37.9 celsius to fahrenheit` | `/convert/celsius-to-fahrenheit/37.9/` | 5,400 | 27 | 70 | Prefer the parent tool; numeric URL held |
| 2 | `400 pound feet to nm` | `/convert/ft-lbf-to-nm/400/` | 480 | 29 | 119 | Prefer the parent tool; numeric URL held |
| 3 | `17.7 inches to cm` | `/convert/in-to-cm/17.7/` | 880 | 23 | 21 | Distinct value unproven; numeric URL held |
| 4 | `240 kg to lbs` | `/convert/kg-to-lbs/240/` | 8,100 | 16 | 526 | Distinct value unproven; numeric URL held |
| 5 | `330kmh to mph` | `/convert/kmh-to-mph/330/` | 1,000 | 21 | 13 | Prefer the parent tool; numeric URL held |
| 6 | `50kpa to atm` | `/convert/kpa-to-atm/50/` | 1,900 | 12 | 24 | Distinct value unproven; numeric URL held |
| 7 | `108 kpa to psi` | `/convert/kpa-to-psi/108/` | 1,000 | 29 | 19 | Prefer the parent tool; numeric URL held |
| 8 | `126 pounds in kg` | `/convert/lbs-to-kg/126/` | 5,400 | 20 | 162 | Distinct value unproven; numeric URL held |
| 9 | `8849 meters to feet` | `/convert/m-to-ft/8849/` | 260 | 13 | 11 | Prefer the parent tool; numeric URL held |
| 10 | `3600000ms to min` | `/convert/milliseconds-to-minutes/3600000/` | 390 | 23 | 25 | Distinct value unproven; numeric URL held |
| 11 | `60000 ms to seconds` | `/convert/milliseconds-to-seconds/60000/` | 880 | 24 | 19 | Distinct value unproven; numeric URL held |
| 12 | `10000 minutes to hours` | `/convert/minutes-to-hours/10000/` | 2,400 | 21 | 52 | Distinct value unproven; numeric URL held |
| 13 | `355 ml to fluid ounces` | `/convert/ml-to-us-fl-oz/355/` | 720 | 20 | 17 | Prefer the parent tool; numeric URL held |
| 14 | `14400 seconds to hours` | `/convert/seconds-to-hours/14400/` | 1,000 | 19 | 13 | Distinct value unproven; numeric URL held |
| 15 | `6000 seconds to minutes` | `/convert/seconds-to-minutes/6000/` | 880 | 20 | 21 | Distinct value unproven; numeric URL held |

**审查结论：** 按 V25/V27 已有功能对照结果，6 个数值 URL 应优先以现有父工具服务查询，不独立开放索引；其余 9 个也只能作为将来的条件候选，尚未证实比现有父工具/竞品提供可被搜索引擎独立收录的增量价值。所有 15 个预览页面仍是 `noindex`；未来正式域名即使启用也**不会自动**把 15 个数字页加入 sitemap，必须逐 URL 明确批准。其余 77 个未获候选资格的数字页永远不随整体开站开关自动放开。

机器可读决定文件：[`NUMERIC-PRELAUNCH-DECISIONS-V36-20261103.json`](NUMERIC-PRELAUNCH-DECISIONS-V36-20261103.json)，审查来源包括 V25/V26/V27 原始竞争功能对照记录。

## 4. UI 与性能收口标准

- 首屏直接显示计算结果、输入、互换单位、复制与修改入口，不使用悬浮插页干扰换算。
- 新增数值核对卡统一视觉层级，桌面 3 列，手机 1 列；支持 320/375px，无横向溢出；`prefers-reduced-motion` 保持生效。
- 原有 Chrome 回归覆盖 320/375/768/900/1024px；V36 补充 240kg、37.9°C、355mL 三个带新卡的移动端真实浏览器用例。
- Lighthouse 是**本地实验室**结果，不能代替真实设备和正式域名用户的 Core Web Vitals；质量门槛以 CI 实际成功记录为准，而非本文件声明的分数。
- CSS/JS 仍需通过仓库原有压缩尺寸预算，不因新模块引入付费 API 或后台。

## 5. 完成与保留边界

**本轮可自动化完成的事项：** 候选 URL 内容改善、严格关键词来源的 38 工具审查覆盖、15/77 内容和索引安全矩阵、完整构建校验、手机布局测试和部署代码一致性验证。

**特意排除：** 广告变现接入、广告同意管理/ads.txt 配置、购买/绑定正式域名、公开 `index`、canonical 与正式 sitemap 的上线动作、GSC 提交或上线后真实搜索效果检测。现有预览 `noindex` 和人工批准门槛不得解除。

**不能诚实预先保证：** Google 将收录 15 个数值页、Google 带来流量，或当前页面具备已获验证的独立排名竞争优势。若将来准备正式上线，应以当时的实际排名/检索结果及手工审核重新决定数值 URL 是否要索引，而不是自动开启 92 个。
