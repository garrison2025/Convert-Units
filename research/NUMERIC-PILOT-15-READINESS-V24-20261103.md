# V24｜15 个数值 SEO 候选页的真实证据与索引前质量审核

**整理日期：2026-11-03；市场：美国英语；公开站点状态：仅 Cloudflare Pages 预览，尚无正式域名。** 数据基于 GitHub 中既存的用户 Semrush 竞品导出（`research/semrush-us-600.tsv`）、已审批数值词数据（`src/data/seeds.json`）和 2026-11-02 保存的逐词公开页面观察（`research/SEO-15-SERP-EVIDENCE-20261102.json`）。本次没有重新取得美国 Google 排名快照，也没有取得本站的 GSC 访问数据。

## 核心结论

- **15/15** 个数字页面已有历史竞品关键词记录和一条相关公开竞品页面观察，但这不证明 ExactUnit 能获得同样排名或点击。
- **13/15** 的竞品观察是具体数值页面；**2/15** 仅见通用工具/示例：`400 pound feet to nm` 和 `108 kpa to psi`。它们应优先验证是否存在独立数值 SERP 意图，不能因通用工具有一个示例就宣称数值页面值得收录。
- **15/15** 的 `rankingProven`、`independentSearchDemandProven`、`siteVsCompetitorUniqueValueProven` 目前均为 `false`。这意味着**15 个都是条件候选而不是已验证的上线索引机会**。
- **77/92** 其他数值页面仍为 `noindex`。原先大规模同方向内容相似度警告主要涉及这些兄弟数值页；不能单独用它证明 15 个条件候选都相互重复，但也不应忽略搜索意图区分不足的风险。
- Google Search Central [垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies) 禁止为操纵搜索排名而批量生成缺乏增量价值的页面；Google [实用内容建议](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) 强调让实际访客获得有用、准确的答案。**页面可运行、模板通过测试，不自动等于 Google 认可页面独立索引价值。**

## 15 条候选的历史竞品关键词数据

下表数据一律是**原始 Semrush 竞品快照估计**，并非 2026-11-03 实时搜索量、本站排名、本站流量或收入；表中“竞品排名”是历史导出里的该竞品位置，不保证仍然有效。

| 原词 | 美国 Volume（估算） | KD（估算） | 竞品排名（历史） | 竞品流量（估算） | 竞品观察类型 | 站内目标页 |
|---|---:|---:|---:|---:|---|---|
| 240 kg to lbs | 8,100 | 16 | 2 | 526 | 数值专页 | `/convert/kg-to-lbs/240/` |
| 126 pounds in kg | 5,400 | 20 | 5 | 162 | 数值专页 | `/convert/lbs-to-kg/126/` |
| 400 pound feet to nm | 480 | 29 | 1 | 119 | 通用工具中的示例 | `/convert/ft-lbf-to-nm/400/` |
| 37.9 celsius to fahrenheit | 5,400 | 27 | 10 | 70 | 数值专页 | `/convert/celsius-to-fahrenheit/37.9/` |
| 10000 minutes to hours | 2,400 | 21 | 9 | 52 | 数值专页 | `/convert/minutes-to-hours/10000/` |
| 3600000ms to min | 390 | 23 | 2 | 25 | 数值专页 | `/convert/milliseconds-to-minutes/3600000/` |
| 50kpa to atm | 1,900 | 12 | 10 | 24 | 数值专页 | `/convert/kpa-to-atm/50/` |
| 17.7 inches to cm | 880 | 23 | 6 | 21 | 数值专页 | `/convert/in-to-cm/17.7/` |
| 6000 seconds to minutes | 880 | 20 | 7 | 21 | 数值专页 | `/convert/seconds-to-minutes/6000/` |
| 108 kpa to psi | 1,000 | 29 | 9 | 19 | 通用工具中的示例 | `/convert/kpa-to-psi/108/` |
| 60000 ms to seconds | 880 | 24 | 8 | 19 | 数值专页 | `/convert/milliseconds-to-seconds/60000/` |
| 355 ml to fluid ounces | 720 | 20 | 6 | 17 | 数值专页 | `/convert/ml-to-us-fl-oz/355/` |
| 330kmh to mph | 1,000 | 21 | 10 | 13 | 数值专页 | `/convert/kmh-to-mph/330/` |
| 14400 seconds to hours | 1,000 | 19 | 10 | 13 | 数值专页 | `/convert/seconds-to-hours/14400/` |
| 8849 meters to feet | 260 | 13 | 3 | 11 | 数值专页 | `/convert/m-to-ft/8849/` |

## 本轮真正落实的质量门槛

新增 `scripts/numeric-pilot-readiness-audit.mjs`，纳入 `npm run build`；对每一个候选同时检查：

- 输入值、目标值、单位和直接答案是否由**同一共享换算引擎**计算，标题/H1/描述是否与该答案一致；
- 页面是否实际有换算步骤、可操作的换算器、当前值附近的对照表、其他同量纲单位结果及精度说明；
- 页面是否有普通 HTML 链接指向父级工具，父级是否有入口指向这个批准的候选；禁止把其他 77 条数值页无意引入可索引导航；
- `pages.dev` 下每个被检查的候选是否为 `noindex`，且合成生产构建仅按既有 15 条候选策略设置索引资格；
- 保留相关竞品 URL、真实观察到的功能、历史 Volume/KD/竞品位置和竞品估算流量，不把这些标为本站成果；
- 计算内部**词三元组 Jaccard 正文重叠启发值**，只作排查线索，不冒充 Google 重复内容判断或排名因素。

生成 `qa-reports/numeric-pilot-readiness-v24.json` 和 `qa-reports/numeric-pilot-readiness-v24.csv`，由 CI 归档，仅作**内部质量文档**，不得放进公开 `dist/` 目录。状态字段区分“站内工具真实可用”与“独立 Google 搜索价值尚未验证”。

## 发布结论与下一步

保留 `src/data/numeric-seo-policy.json` 原样：15 个是正式域名上线之后才可能被批准的**条件索引候选**；其余 77 个持续 `noindex`。本轮**没有打开网站索引、没有新增 URL、没有修改广告或引入收费服务**。

如果准备购买正式域名，应先对这 15 个关键词做最新美国 Google SERP 验证、竞品增量价值对比和实际手工放行决定；对于观察结果仅是通用工具示例的两个词，优先考虑让父级方向工具服务该需求，不要急于单独索引数字页。真正上线后，再以 Google Search Console 的网页收录、曝光、点击与查询词数据迭代，而不是把历史竞品数据当做自身效果。
