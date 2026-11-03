# Convert-Units V31｜复用用户原有 600 条 Semrush 关键词的 38 个方向 SEO 证据矩阵

**2026-11-03 | 美国英语 | 完全沿用原文件，不需要用户再次查询或付费订阅。**

## 已发现既有来源

- `research/semrush-us-600.tsv` 是用户先前提供的真实 600 条竞品美国 Semrush 自然排名样本；字段包含 keyword、rank、estimated keyword traffic、US volume、KD、实际竞争URL。样本对应 `convert-units.info`，**不是我们的预览站自然流量**。
- `src/data/seeds.json` 保存已批准的 **92 个**数值 SEO 页面和原数据；它们分布于 **15/38** 个方向工具（不是全部 38 个主词都有精确匹配指标）。
- `research/SEO-PLAN-V2.md` 已包括这 600 条原始记录、92 页选择及开发计划；`research/KEYWORDS-600.xlsx` 是已有规划表。无须要求用户重做数据导出。
- 本版新增工作是把现有数据**归入 38 条已建工具**，不把数字词 `240 kg to lbs` 的 Volume 8,100 移植到无限定数字的 `kg to lbs`。
- 原始证据分级：A=92种子中有精确数值长尾（15方向），B=600源记录里有额外方向性关键词（8方向，匹配完整度须看备注），C=仅有其他目标或反向/泛单位相关线索（11方向），D=原样本没有直接证据（4方向）；C/D不等于搜索量为0。

## 38 个现有方向与代表性原始数据

| # | 现有方向 | 证据级别 | 直接引用的原关键词 | 该关键词US Volume | 该词KD | 竞品排名 | 该词竞品估算流量/月 | 审核桶 |
|---:|---|---|---|---:|---:|---:|---:|---|
| 1 | `lbs-to-kg` | A | `126 pounds in kg` | 5400 | 20 | 5 | 162 | FIRST_REVIEW_SOURCE_BACKED_LONGTAIL |
| 2 | `kg-to-lbs` | A | `240 kg to lbs` | 8100 | 16 | 2 | 526 | FIRST_REVIEW_SOURCE_BACKED_LONGTAIL |
| 3 | `oz-to-g` | B | `3.5oz to grams` | 2400 | 50 | 7 | 57 | CAUTION_REVIEW_NO_NEW_PAGES |
| 4 | `g-to-oz` | D | — | — | — | — | — | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 5 | `m-to-ft` | A | `8849 meters to feet` | 260 | 13 | 3 | 11 | THIRD_REVIEW_SOURCE_BACKED_LONGTAIL |
| 6 | `ft-to-m` | C | `foot into meter` | 390 | 43 | 2 | 25 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 7 | `cm-to-in` | B | `cms into inches` | 320 | 53 | 1 | 26 | CAUTION_REVIEW_NO_NEW_PAGES |
| 8 | `in-to-cm` | A | `17.7 inches to cm` | 880 | 23 | 6 | 21 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 9 | `in-to-mm` | B | `2.35 inches to mm` | 320 | 29 | 2 | 20 | CAUTION_REVIEW_NO_NEW_PAGES |
| 10 | `ml-to-us-fl-oz` | A | `355 ml to fluid ounces` | 720 | 20 | 6 | 17 | THIRD_REVIEW_SOURCE_BACKED_LONGTAIL |
| 11 | `us-fl-oz-to-ml` | C | `how many ml is an ounce of liquid` | 480 | 32 | 2 | 21 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 12 | `l-to-us-gal` | B | `6.7 liters to gallons` | 210 | 26 | 3 | 9 | CAUTION_REVIEW_NO_NEW_PAGES |
| 13 | `us-gal-to-l` | C | `gallon in ml` | 590 | 13 | 1 | 48 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 14 | `us-cup-to-ml` | C | `how many cups is 1.8 liters` | 590 | 11 | 5 | 17 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 15 | `us-tbsp-to-us-tsp` | D | — | — | — | — | — | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 16 | `celsius-to-fahrenheit` | A | `37.9 celsius to fahrenheit` | 5400 | 27 | 10 | 70 | FIRST_REVIEW_SOURCE_BACKED_LONGTAIL |
| 17 | `fahrenheit-to-celsius` | D | — | — | — | — | — | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 18 | `bar-to-psi` | C | `2.35 bar` | 2400 | 20 | 1 | 316 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 19 | `kpa-to-psi` | A | `108 kpa to psi` | 1000 | 29 | 9 | 19 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 20 | `kpa-to-atm` | A | `50kpa to atm` | 1900 | 12 | 10 | 24 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 21 | `psi-to-kpa` | B | `32 psi to kpa` | 260 | 10 | 3 | 11 | CAUTION_REVIEW_NO_NEW_PAGES |
| 22 | `ft-lbf-to-nm` | A | `400 pound feet to nm` | 480 | 29 | 1 | 119 | FIRST_REVIEW_SOURCE_BACKED_LONGTAIL |
| 23 | `nm-to-ft-lbf` | D | — | — | — | — | — | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 24 | `minutes-to-hours` | A | `10000 minutes to hours` | 2400 | 21 | 9 | 52 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 25 | `seconds-to-minutes` | A | `6000 seconds to minutes` | 880 | 20 | 7 | 21 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 38 | `seconds-to-hours` | A | `14400 seconds to hours` | 1000 | 19 | 10 | 13 | THIRD_REVIEW_SOURCE_BACKED_LONGTAIL |
| 26 | `milliseconds-to-seconds` | A | `60000 ms to seconds` | 880 | 24 | 8 | 19 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 27 | `milliseconds-to-minutes` | A | `3600000ms to min` | 390 | 23 | 2 | 25 | SECOND_REVIEW_SOURCE_BACKED_LONGTAIL |
| 28 | `kmh-to-mph` | A | `330kmh to mph` | 1000 | 21 | 10 | 13 | THIRD_REVIEW_SOURCE_BACKED_LONGTAIL |
| 29 | `mph-to-kmh` | C | `210 kph to mph` | 2900 | 19 | 10 | 37 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 30 | `m2-to-ft2` | B | `47m2 to sq ft` | 480 | 25 | 8 | 10 | SECOND_REVIEW_EXTRA_DIRECT_EVIDENCE |
| 31 | `kn-to-lbf` | B | `kn to pounds converter` | 320 | 8 | 1 | 26 | SECOND_REVIEW_EXTRA_DIRECT_EVIDENCE |
| 32 | `gb-to-mb` | C | `giga byte conversion` | 320 | 14 | 3 | 11 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 33 | `kg-m3-to-g-cm3` | C | `g/cm3` | 720 | 7 | 4 | 25 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 34 | `kw-to-hp` | B | `convert kw hp` | 480 | 25 | 3 | 11 | SECOND_REVIEW_EXTRA_DIRECT_EVIDENCE |
| 35 | `ms2-to-fts2` | C | `2 m/s2` | 720 | 23 | 5 | 21 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 36 | `mpg-us-to-l-100km` | C | `mpg l/km` | 1300 | 33 | 4 | 45 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |
| 37 | `l-min-to-m3-h` | C | `m3/h to l/min` | 90 | 15 | 1 | 11 | NO_RANKING_FROM_RELATED_OR_ABSENT_DATA |

## 数据逻辑与实际使用

1. 所有数值都来自用户历史 Semrush 行级导出；CSV 中保存了 `competitor_actual_ranking_url_FROM_USER_EXPORT` 与 `user_original_tsv_row`，可逐行回查。部分历史来源日期是报告时近几天；这不是当前实时 Semrush 排名。
2. 数值长尾证据说明**该方向至少某些具体查询**有需求，不代表无限定数字的主方向词具有相同 Volume/KD。赛道排序先基于原样本内可审核证据形成首轮复盘顺序，而不伪装成 SEO 正式关键词难度结论。
3. A组是明确URL/源单位/目标方向对齐的原92种子；B组必须逐项检查 `evidence_match_limit`：一些是源 URL 方向不匹配（如 `32 psi to kpa`），一些未明确 US/Imperial，不能据此自动放开数值页。C组只作相关性参考，不用来给 38 个精确方向主词排序。
4. 推广初审建议：先关注 `kg-to-lbs`、`lbs-to-kg`、`ft-lbf-to-nm`、`celsius-to-fahrenheit` 的**既有数值关键词**（代表样本竞品估算流量较高）；随后检查 `minutes-to-hours`、`kpa-to-atm`、`in-to-cm`、`milliseconds-to-minutes` 及 B组中 `kn-to-lbf`、`kw-to-hp`、`m2-to-ft2`。这只是按用户现有样本编排**复盘顺序**，并不是新的真实主词数据、更不是排名或收入承诺。
5. 尤其 `convert kw hp` 在用户原600条中就有 **US Volume 480、KD25、竞品排名3、单词估算流量11**；`kn to pounds converter` 则有 **320、KD8、排名1、估算26**（‘pounds’需结合force上下文解读）；不能再笼统称所有38方向完全没有可用指标。

## 保持网站冻结

- 仅更新 `research/` 资料；**不变更网站代码、工具数、页面数、SEO元标签、sitemap、广告或任何实际索引开关**。
- Cloudflare `https://convert-units-bwa.pages.dev/` **仍然是临时预览站，全站 noindex**，不购入或绑定正式域名。
- **15个数值页仅为未来条件候选**，77个仍noindex；实际预览站所有157个URL继续不准进入搜索索引。原始92数值页不自动转成92个可索引页面。

**旧 V30 的“要求用户先再导出38个主方向词”不符合当前用户要求：本版优先复用现有600条，只对确实无精确主词证据的格子保留空值，不索要新导出。**
