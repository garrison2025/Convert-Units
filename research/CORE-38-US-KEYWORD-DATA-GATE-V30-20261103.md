# Convert-Units V30｜38 个核心方向词美国 SEO 数据补证（2026-11-03）

## 已完成与缺口

- 已对照仓库 `src/data/pairs.json`：**38/38 已建方向工具**；原始 V2 37 个工具之外，后来加入 `seconds-to-hours`。
- 已对照 `research/CORE-8-COMPETITOR-INTENT-V28-20261103.json` 与 `research/CORE-30-COMPETITOR-INTENT-V29-20261103.json`：**38/38 公开竞品功能页面**有记录。
- **0/38** 具有独立核验的完整 Semrush/Ahrefs **美国通用方向词** Volume、KD、关键词自然排名、实际排名落地页与估算流量组合。空值表示**未取到**，绝不是零。
- `CORE-38-US-KEYWORD-METRICS-PENDING-20261103.csv` 为精确对应 38 个现有工具的取证工作表。词组是待验证候选，不是已证实最高搜索量的主词。公开竞品页面仅证明相关功能存在，不能认定为美国 Google 自然排名结果。
- 用户先前 600 行 Semrush 数值转换长尾记录不能迁移为主方向词的 Volume、KD 或流量。例如 `240 kg to lbs` 与 `kg to lbs` 是不同关键词。

## 获取美国数据的最短路径

1. Semrush `Keyword Overview` → `Bulk Analysis` → 选择 **United States**，一次导出 38 个候选词及其真正的 US Volume/KD；同义写法分别查询、按意图归组，但不直接相加。保存完整原始导出、日期、国家与提供商。
2. Semrush `Organic Research` → `Positions` → **US**，逐一核对已经记录的 competitor domain，以及实际 US SERP 竞争者：筛选对应候选短语，导出 `Keyword / Position / URL / Traffic / Volume / KD`。真实排名 URL 不得自动填写为功能对照 URL。
3. 若已有 Ahrefs 账户，也可在 `Keywords Explorer` 与 `Site Explorer → Organic Keywords` 按 **US** 导出，将指标填入独立 Ahrefs 栏；**不混用两家的 KD 作为一个指标**。
4. 明确区分 `(a)` 该关键词的 US 搜索量，`(b)` 竞品在该词的预估流量，`(c)` 竞品 URL 的全部自然流量，`(d)` 竞品域名全部流量；不得把四者写入同一字段。
5. 每个方向工具至少保存该主词的 `US Volume + US KD + 实际排名 URL + 排名 + 提供商/月份`，并结合 Google 即时答案或 AI Overview 等 SERP 点击分流，才允许给出 SEO 优先级。

## 核验与决策约束

- 所有 38 条 `metrics_status=MISSING_VERIFIED_US_METRICS`、`seo_priority=UNRANKED_AWAITING_DATA` 是事实状态，而非项目失败、需求零或 KD 高低判断。
- 竞争性比较关注真实排名的站点强度、可点击性、意图匹配、现有功能满足度。不得把 38 页单纯按工具类别排序后冒充真实 SEO 优先级。
- 本文件和 CSV 仅用于离线研究；**不创建页面、不修改 Meta / robots / sitemap / canonical、不改变索引范围、不引入 API 或定时任务**。
- `https://convert-units-bwa.pages.dev/` 仅为 Cloudflare 临时预览，必须继续全站 `noindex`；正式域名仍暂缓。
- 保留既定数值页 **15 个条件候选、77 个 noindex**；另有正式域名级独立审批要求，不能因研究文件变更而开放收录。

## 当前结论

下一步的依赖不是技术功能，而是**具备可追溯来源的美国 Semrush/Ahrefs 导出**。若没有这些真实数据，就不应宣称已选出最值得投 SEO 的页面。
