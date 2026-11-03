# 已由 V31 原始数据复用版取代（2026-11-03）

原 V30 将38个核心方向统一记为“等待新的 Semrush/Ahrefs 导出”，忽略了用户原先已提供并保存于仓库的600条真实美国 Semrush 行级数据。用户明确要求直接复用这些数据，**不要求重新查询或付费导出**。

改读：

- `research/CORE-38-SEO-EVIDENCE-REUSE-V31-20261103.md`（38个方向、现有关键词数据与初步审核顺序）
- `research/CORE-38-SEO-EVIDENCE-FROM-EXISTING-SEMRUSH-V31-20261103.csv`（可逐行核验的关键词、US Volume/KD、竞品排名/估算流量、来源行号、匹配局限）
- `research/semrush-us-600.tsv` 与 `src/data/seeds.json`（原始数据源）

**边界：** 已有数值词Volume/KD不自动等于无限定数值的方向主词指标。全站预览 `noindex`、正式域名暂缓；15个未来数值页条件候选及77个noindex均保持不变。本次仅研究文档更新。
