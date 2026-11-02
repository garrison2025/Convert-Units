# Convert-Units SEO 逐页编辑决策与关键词证据核查 — 2026-11-02

**当前决策：保持 38 个完整可用工具页 + 92 个可访问数值结果页，不新增无验证关键词、不扩大索引，正式站点候选暂定 79 个 URL，其中数值页 15 个。** 域名决定、DNS 和 GSC 均不是本轮工作范围。

## 证据源与已通过的核对

- 原始：`research/semrush-us-600.tsv`，600 行**竞争网站**的 Semrush 历史排名记录。不是本站 GSC、GA4、实际关键词收录量或广告收入。
- 已批准数值关键词：`src/data/seeds.json` 共 92 个；新构建审计按原关键词、美国量级、KD、竞品流量估算四项与原始 600 行核对。**92/92 能找到对应的原始记录**。
- 原始 600 行中有 **47 行**的搜索词开头数字与竞争网站的实际排名落地 URL 数字不同，例如 `24 pounds to kg` 指向 `/weight/pound/0.24`。这种结果可能反映竞品排名跨页面匹配，不能直接解释为数据错误，更不能据此自动生成该关键词的精确数值结果页。**现有 92 条核准数值关键词与这 47 行没有命中交集**；构建审计现在将交叉命中视为错误。
- 38 个定向工具中 **15 个方向**有已批准的具体数值搜索词证据；其余 **23 个方向**在 92 条精选种子中无匹配。**这不代表这 23 个方向零搜索量**，也不证明这 15 个方向的“通用转换器词”已有独立搜索量。现有材料不足以把 38 个通用工具关键词全部标成已验证。
- 相似度审计覆盖全部 92 个数值页：**1,646/1,646 同方向配对**超过既定归一化相似度阈值，但 **15 个索引候选内部同方向配对为零**。阈值是代码的风险提示，不是 Google 处罚、索引或重复内容结论。

## 15 个数值页的当前发布决策

以下所有数值来自**竞争网站 Semrush 历史估算**，只用于判断人工复核先后顺序。技术上可在将来已确认的正式域名下参与索引，但尚未验证用户搜索意图与父级工具落地页是否具有足够区别。

| 原始搜索词 | 已批准页面 | 竞品 US Volume | KD | 竞品估算访问 |
|---|---|---:|---:|---:|
| `240 kg to lbs` | `/convert/kg-to-lbs/240/` | 8,100 | 16 | 526 |
| `126 pounds in kg` | `/convert/lbs-to-kg/126/` | 5,400 | 20 | 162 |
| `400 pound feet to nm` | `/convert/ft-lbf-to-nm/400/` | 480 | 29 | 119 |
| `37.9 celsius to fahrenheit` | `/convert/celsius-to-fahrenheit/37.9/` | 5,400 | 27 | 70 |
| `10000 minutes to hours` | `/convert/minutes-to-hours/10000/` | 2,400 | 21 | 52 |
| `3600000ms to min` | `/convert/milliseconds-to-minutes/3600000/` | 390 | 23 | 25 |
| `50kpa to atm` | `/convert/kpa-to-atm/50/` | 1,900 | 12 | 24 |
| `17.7 inches to cm` | `/convert/in-to-cm/17.7/` | 880 | 23 | 21 |
| `6000 seconds to minutes` | `/convert/seconds-to-minutes/6000/` | 880 | 20 | 21 |
| `108 kpa to psi` | `/convert/kpa-to-psi/108/` | 1,000 | 29 | 19 |
| `60000 ms to seconds` | `/convert/milliseconds-to-seconds/60000/` | 880 | 24 | 19 |
| `355 ml to fluid ounces` | `/convert/ml-to-us-fl-oz/355/` | 720 | 20 | 17 |
| `330kmh to mph` | `/convert/kmh-to-mph/330/` | 1,000 | 21 | 13 |
| `14400 seconds to hours` | `/convert/seconds-to-hours/14400/` | 1,000 | 19 | 13 |
| `8849 meters to feet` | `/convert/m-to-ft/8849/` | 260 | 13 | 11 |

**每条统一结论：** `PILOT_REVIEW_REQUIRED`。保留换算结果、公式、准确率说明和本地可交互计算；不添加虚构的实际场景、用户评论、专家背书或含糊的医学/工业建议。正式放行前还应检查实时 Google US SERP 是否优先显示即时答案、视频或其他专门工具，以及该数值结果相对方向工具页面是否具有独立搜索价值。

## 77 个其余数值页

统一决策为 `KEEP_FUNCTIONAL_NOINDEX`：维持可访问的正确答案和转换功能，不将它们列入未来正式站点的初始 Sitemap。完整 77 条及逐条原始证据放在每轮构建生成的 `dist/seo-editorial-review.csv`，不要为消除文本相似度警告而注入 AI 生成的“差异化段落”，也不要将所有数值页自动重定向到父页（这会破坏具体值分享和既有功能）。

## 38 个方向工具页

全部仍为用户实际使用的转换工具，在正式域名经过显式放行后可列入站点地图。新审计对每个工具分别标注：
- `GENERIC_DEMAND_UNVERIFIED__NUMERIC_EVIDENCE_EXISTS`：15 个方向有经过核对的**具体数字词**，但“pounds to kilograms converter”这类**通用搜索词**尚未独立验证；
- `GENERIC_DEMAND_UNVERIFIED__NO_APPROVED_NUMERIC_EVIDENCE`：23 个方向缺少已批准数字词证据，不能据此猜测或伪造流量。

未来若需要把 38 个方向都标成“核心已验证关键词”，应再以同一竞品的**实际排名词和目标落地页**核对，而非从单位组合猜测关键词或把各数字词 Volume 相加。

## 索引和规范网址决定

- 保持 `src/data/numeric-seo-policy.json` 的 15/77 默认策略；`NUMERIC_INDEX_MODE=all` 不能随意开启。
- 确认 `*.pages.dev` 仍整体 `noindex`，直到用户另行决定正式域名。
- 正式发布时只向 Sitemap 纳入经审核的规范页，保证站内指向首选 URL；**不要将 `noindex` 误用成解决所有相似页面 Canonical 选择的万能方案**。Google 对同类内容更推荐清晰的首选 URL、规范标记、内链一致性，必要时合并/重定向：
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- 对现有 77 个独立可直接访问、暂不希望出现在 Google 的数值结果页，暂维持 `noindex`，不要未经 URL 对比验证就强制 Canonical 到一个不同查询意图的父页。
- 完整质量审计（`seo-content-audit.json`、`seo-crawl-audit.json`、`release-audit-report.json`）与新的编辑决策清单仍随每次 GitHub Actions 构建留档。

## 尚未能证明的事项

尚未逐词取得 38 个方向工具及 15 个数字词的**实时 US SERP 页面类型和搜索结果竞争结构**；也没有本站正式域名的 GSC 收录数据、真实点击或 CWV。**自动化构建通过只能证明这些技术保护与源数据一致，不能将“SEO 完成”解释为必然获得搜索流量。**
