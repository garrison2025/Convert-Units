# V28｜38 个核心换算方向的搜索意图和竞品功能审计｜首批 8 页

**核查日期：2026-11-03**。ExactUnit 仓库 `garrison2025/Convert-Units`；Cloudflare 临时地址 `convert-units-bwa.pages.dev` 不是正式域名。所有 Pages.dev 页面维持 **noindex**。本轮主要目标是从真正存在的竞品页面验证用户可获得的功能，避免以通用关键词的虚构搜索量推动重复页面扩张。

## 竞品核实范围与指标边界

**38 个现有方向页全部完成本地标题、真实单位、公式、内部链接和展示 QA**（V23 核查）；**本轮额外核查其中 8 个方向页的公开竞品产品或文档页面**。其余 **30 个尚未获得本轮逐页外部竞品对比证据**，不得把八页初步发现简单外推到 38 页。

本轮没有获取按美国地域定位的 Google SERP 前十名，没有登录 Semrush/Ahrefs 读取这些 **通用方向词**的真实 Volume、KD、CPC、排名或流量。**因此 8 页的 generic Volume/KD/Google position 全部显式为 null，而不是借用之前 15 个“具体数字词”的 Volume**。同样没有本站 GSC 点击、曝光或广告收入。公开网址可访问不等于今天在美国 Google 排名。

### 实际竞品功能（首批 8 页）

| 真实通用搜索意图（非来源于 Semrush 排名） | 核实的竞品页面 | 与 ExactUnit 的对比 | 当前 Volume/KD/US 排名 |
|---|---|---|---|
| `lbs to kg` | [真实竞品](https://www.inchcalculator.com/convert/pound-to-kilogram/) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `feet to meters` | [真实竞品](https://www.rapidtables.com/convert/length/feet-to-meter.html) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `ml to US fl oz` | [真实竞品](https://www.unitconverters.net/volume/milliliter-to-fluid-ounce-us.htm) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `celsius to fahrenheit converter` | [真实竞品](https://www.rapidtables.com/convert/temperature/how-celsius-to-fahrenheit.html) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `kmh to mph` | [真实竞品](https://www.unitconverters.net/speed/kph-to-mph.htm) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `foot pounds to Nm torque` | [真实竞品](https://www.inchcalculator.com/convert/foot-pound-to-newton-meter/) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |
| `kW to hp` | [真实竞品](https://www.inchcalculator.com/convert/kilowatt-to-horsepower/) | 已发现并修复 horsepower 约定不清 | 未验证 |
| `minutes to hours converter` | [真实竞品](https://www.inchcalculator.com/convert/minute-to-hour/) | 已有同类计算器、公式/表格；暂不需开发重复页 | 未验证 |

### 唯一确定需要修复的用户问题：kW 与不同类型 horsepower

[Inch Calculator 的 kW 转 horsepower 页面](https://www.inchcalculator.com/convert/kilowatt-to-horsepower/) 明确区分四种约定：机械 horsepower hp(I)、electric hp(E)、metric hp(M)、boiler hp(S)，它们的换算结果不同。本项目 `src/assets/engine.mjs` 只有一个 `hp`，且单位名为 **Mechanical horsepower**，其定义使用 745.6998715822702 W/hp。原先通用方向页虽提示“conventions vary”，却没有在实际换算工具附近清楚展示其他约定与实际差别。

V28 在 `/convert/kw-to-hp/` 新增**预渲染、无新 JS 和 CSS**的四行静态标准对照，列出 1 kW 和 5 kW 下的对比数字，来源于独立单位定义：
- **机械 hp(I)**：1 hp ≈ 745.699871582 W；**这是当前在线换算器唯一支持的马力定义**。
- **电气 hp(E)**：1 hp = 746 W（此表采用的行业约定）。
- **公制 hp(M)**：1 hp = 735.49875 W。
- **锅炉 hp(S)**：1 hp = 9,809.5 W（此表采用的约定）。

强调这些不是同一个单位，也没有暗示四个结果都是在线可选选项。所有表格数值由构建代码从同一输入值计算，不修改 `hp` 的引擎定义；普通用户默认得到的仍是**机械马力**。

### 第二个确定的源码级发布缺陷：无数值入口，却仍渲染空白分区

`scripts/build.mjs` 以前在某个工具存在数值词条时渲染 `Specific ... values` 分区，而不是判断**是否实际有可链接的获批数值 URL**。V25 已允许生产正式域名发布核心工具页时**先不批准任何数值页（0/92 indexable）**，因此原实现会在相关工具页输出没有任何锚文本或内容链接的分区标题。此问题与 Google 排名无关，是实际 UI/文档结构缺陷。

V28 将其修正为：**只有至少一个获得当前构建发布策略允许的数值链接时，才渲染这个分区及其标题**。预览下批准列表本身与 robots 禁止索引相互独立：仍保留用于 QA 的数值结果链接，但 all Pages.dev URL 都 noindex。发布的 15 个候选名单不变，所有生产索引仍必须逐 URL 审核。

### 全部 38 个页面的清单

✓ = 已完成本轮真实竞品页面功能核对；未标记的 30 个仅有代码质量验证，不能认定 SERP/竞争难度已核实。

- **重量** (4): `lbs-to-kg` ✓、`kg-to-lbs`、`oz-to-g`、`g-to-oz`
- **长度** (5): `m-to-ft`、`ft-to-m` ✓、`cm-to-in`、`in-to-cm`、`in-to-mm`
- **体积容量** (6): `ml-to-us-fl-oz` ✓、`us-fl-oz-to-ml`、`l-to-us-gal`、`us-gal-to-l`、`us-cup-to-ml`、`us-tbsp-to-us-tsp`
- **温度** (2): `celsius-to-fahrenheit` ✓、`fahrenheit-to-celsius`
- **压力** (4): `bar-to-psi`、`kpa-to-psi`、`kpa-to-atm`、`psi-to-kpa`
- **扭矩** (2): `ft-lbf-to-nm` ✓、`nm-to-ft-lbf`
- **时间** (5): `minutes-to-hours` ✓、`seconds-to-minutes`、`seconds-to-hours`、`milliseconds-to-seconds`、`milliseconds-to-minutes`
- **速度** (2): `kmh-to-mph` ✓、`mph-to-kmh`
- **面积** (1): `m2-to-ft2`
- **力** (1): `kn-to-lbf`
- **数据存储** (1): `gb-to-mb`
- **密度** (1): `kg-m3-to-g-cm3`
- **功率** (1): `kw-to-hp` ✓
- **加速度** (1): `ms2-to-fts2`
- **油耗** (1): `mpg-us-to-l-100km`
- **流量/流率** (1): `l-min-to-m3-h`

## CI 和实际验收

- `scripts/core-page-quality-audit.mjs` 运行 38 页逐页 HTML 检查，并新增“Specific 数值结果区绝不能出现空链接区”及 horsepower 范围检查；在预览、0 条数值批准生产、2 条数值批准生产三种配置运行。
- `tests/core-competitor-intent-v28.test.mjs` 测试 4 种马力对比、工程约定声明，要求 37 个其他工具不出现错配的马力表；对 8 个竞品样本进行来源完整性检查。
- `scripts/browser-smoke.mjs` 真实 Chrome 核验马力 1 kW / 5 kW 输出、单位只设为机械、表格移动端无整体页面水平滚动。
- `scripts/live-preview-audit.mjs` 真实网络访问 Pages.dev 上的 `/convert/kw-to-hp/`，核实机械马力约定、各对照结果、无空数值区、`noindex` 以及 GitHub 主分支 SHA。
- 性能预算：仍以 **CSS+JS 合计 gzip ≤ 32,768 字节**为硬门槛，预计本轮不增加前端 bundle。仍为 38 个工具 + 92 个数值结果 + 16 类，共 157 条 HTML 路由；没有新付费服务。

## 后续

对其余 30 个核心工具，要继续用**真实竞品 URL → 功能/搜索意图 → 可验证的关键词自然排名与落地页数据**流程，先找实际缺口再决定变更，不要凭想象列几百个新关键词页面。即使某项具备竞品功能证据，也不能宣称已有美国通用关键词的月搜索量、排名、收录或本站收入。当前不要购买或绑定正式域名。
