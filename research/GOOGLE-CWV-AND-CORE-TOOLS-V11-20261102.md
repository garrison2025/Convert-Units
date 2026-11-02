# Google CWV 与核心工具竞争页面核查 · V11 · 2026-11-02

## 本轮工作结论

本轮**不调整换算算法、索引策略、域名或实际站点视觉样式**，只建立真实 Chrome 性能审计、独立线上压缩校验，并复核核心关键词页功能竞争。

Google Search Central 将 Core Web Vitals 定义为 **LCP、INP、CLS**；良好体验的目标为真实用户第 75 分位的 LCP ≤ 2.5 秒、INP ≤ 200 毫秒、CLS ≤ 0.1（参见 [Google 官方文档](https://developers.google.com/search/docs/appearance/core-web-vitals)）。PageSpeed Insights 的真实用户指标来自 **CrUX 最近 28 天的数据**；新站或访问数据不足时，可能没有 URL 或域名级报告（参见 [PSI 官方说明](https://developers.google.com/speed/docs/insights/v5/about)）。

### Lighthouse 实验室数据（仅本次 GitHub Runner）

测量工具：Lighthouse 12.8.2 + Headless Chrome 156，运行环境为 GitHub Actions Ubuntu，测试站为同一次构建的 `dist/` 静态页面，经本地服务器分发，不是外网真实用户会话。服务器现在在浏览器请求支持时启用文本 gzip，以避免把本地不压缩错误误判为生产缺陷。

| URL / 设备 | Performance | Lighthouse LCP | CLS | TBT |
|---|---:|---:|---:|---:|
| `/` · mobile | 100 | 1.298 秒 | 0 | 0 ms |
| `/convert/lbs-to-kg/` · mobile | 100 | 1.054 秒 | 0 | 0 ms |
| `/category/mass/` · mobile | 100 | 1.204 秒 | 0 | 0 ms |
| `/` · desktop | 100 | 0.287 秒 | 0 | 0 ms |

实际值和原始审计都存储在构建附件 `exactunit-lighthouse-lab` 中的 `summary.json` 及各页面 Lighthouse JSON。测试时间、CI runner 性能、浏览器/模拟网络条件会导致数字变化，**不应宣称四个结果是 Google 实际用户 CWV 通过证明**。

第一次测试未压缩的本地 HTML/CSS/JS，Lighthouse 出现 “Enable text compression” 机会，模拟手机首页 LCP 1.652 秒；第二次本地测试服务器应请求进行 gzip 压缩，首页 LCP 1.298 秒。**两个样本不能严格归因差异全部来自 gzip，也不表示网站生产代码发生了这幅度的性能提升。**

独立 HTTPS 线上 Cloudflare 检查在请求 `Accept-Encoding: gzip, br` 时，对 `/assets/styles.css` 和 `/assets/app.mjs` 返回 `Content-Encoding: br`、`Cache-Control: public, max-age=604800`。这证实原先本地 Lighthouse 的文本压缩建议并非 Cloudflare 线上缺陷；不是单次 HTTP 时间足以测量 CWV 的证据。

### 尚未获取的真实用户数据

| 指标 | 当前状态 |
|---|---|
| CrUX 真实用户 LCP 75 分位 | **尚未取得** |
| CrUX 真实用户 INP 75 分位 | **尚未取得**；Lighthouse TBT 不能代替 |
| CrUX 真实用户 CLS 75 分位 | **尚未取得**；实验室 CLS=0 并不等于字段报告 |
| Google Search Console 收录、自然点击与展示 | **尚未取得**；预览站故意 noindex |
| 实际 Lighthouse 实时公网测量 | 本轮在 GitHub Actions 进行**本地建站实验室测量**；公网仅验证响应头和 HTML |

因此不能写“真实 CWV 全部通过”；能确认的是**Chrome 实验室测试表现良好，而且 Cloudflare Brotli 压缩已启用**。

## 核心通用换算词页面检查：避免无意义内容扩张

本轮公开检索 `lbs to kg converter` 类查询，发现多个实用竞争页：

- [Metric Conversions — pounds to kilograms](https://www.metric-conversions.org/weight/pounds-to-kilograms.htm)：可交互计算器、公式、参考表、定义。
- [RapidTables — lbs to kg](https://www.rapidtables.com/convert/weight/pound-to-kg.html)：数值表含 kg、kg+g 双格式。
- [TNAADO — Lbs to Kg Converter](https://tools.tnaado.ca/calculators/converters/lbs-to-kg/)：双向输入、本地计算、精确因子及换算表。

上述内容来自**公开网页观察**，不是 Google 美国前十的固定排名，也不是用户 Semrush 600 条导出中的流量证明。用户提供的 Semrush 数据主要是数值搜索词，因此**不能据此给通用词“lbs to kg converter”编造 Volume/KD 或具体 Google 排名**。

站内 `/convert/lbs-to-kg/` 已具有精确 1 lb=0.45359237 kg 结果、交互计算、可调精度、参考表、可信来源和 CSV 批量转换。竞品也已覆盖公式和表格，因此不再机械追加 FAQ、AI 文章或全套随机数字表。继续优先保持**正确性、直接计算和稳定体验**，有新的非品牌关键词与对应竞争 URL 的证据再扩页。

## 代码化长期验收

- 新增 `scripts/lighthouse-lab-audit.mjs`，每次 PR/main 运行 4 个 Chromium Lighthouse 样本，归档全部原始 JSON 和结构化摘要。
- 摘要明确写 `isCruxFieldData=false`、`fieldDataStatus=NOT_MEASURED`、INP 为空，禁止把实验室 TBT 当成真实 INP。
- `scripts/live-preview-audit.mjs` 独立记录 Cloudflare `Content-Encoding`、缓存与样本网络耗时，但不把这些单次值当成真实用户 LCP。
- 保留原有静态资源预算、157 页 SEO 审计、15 个数值页候选与 77 个 `noindex`、正式域名延期规则。

**后续需要什么才能证明真实 SEO 成绩？** 正式域名明确批准上线后，验证 GSC 并观察至少数周的展示、点击、索引以及 CrUX 是否形成足够采样。Google 并不保证通过 Lighthouse 或基础 SEO 检查的网页会获得排名。
