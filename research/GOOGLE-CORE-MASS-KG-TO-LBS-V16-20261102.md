# Google SEO V16 — kg→lbs 结果页的 lb+oz 实用格式（2026-11-02）

## 1. 需求证据：先从竞争站原始排名关键词核查

此轮直接读取本仓库 `src/data/seeds.json` 与 `src/data/pairs.json`（源为用户提供的 `convert-units.info` 竞争域名 Semrush 600 行自然排名数据），发现 `kg-to-lbs` 包含 **14 条具体数字查询，竞争站估计 Volume 之和 73,870/月**。其中 `54 kg to lbs` 的竞争域名估计美国 Volume 14,800 / KD27；`2.5 kg to lbs` 为 12,100 / KD19；现有保守数值索引候选仍是 `/convert/kg-to-lbs/240/`。

**以上均非本站 Google 真实流量，不是 14 个去重独立用户的搜索总量，也不是经过本轮重测的实时 Volume/KD。** 原始数据可检查 `research/semrush-us-600.tsv`；本文不捏造通用词 `kg to lbs converter` 的搜索量或 Google 美国当前 SERP 名次。

## 2. 真实竞品页面观察

- [Inch Calculator — How Many Pounds Are in 54 Kilograms?](https://www.inchcalculator.com/convert/kilogram-to-pound/?kg=54)：实际 `54 kg` 页面同时展示约 `119.0496 lb` 和 `119 lb 0.79395199999999 oz`。已经有磅＋盎司需求的具体示例，但后一个结果存在冗长的浮点小数尾巴。
- [The Calculator Site — Kilograms to Pounds and Ounces](https://www.thecalculatorsite.com/conversions/common/kg-to-pounds-ounces.php)：独立 kg-to-lbs 页面和 lb/oz 输入工具，含常用质量参考表与可调精度。

**两者说明该显示形式已有真实竞争功能，不能宣称本站发明了“lb+oz”或仅凭这个功能即可超越竞争页。** 本站针对准确显示、正确进位及统一计算引擎提供实用性，并明确此为**质量盎司（mass oz）**，不是 fluid ounces（体积）。

Google Search Central 对此强调的是用户能否在页面完成任务，而非为了 SEO 新增大量内容：
[Creating Helpful, Reliable, People-First Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。

## 3. 改动与确切数学行为

现有 `/convert/kg-to-lbs/` 及同方向所有 14 个数值结果页在主结果/复制按钮**之后**新增可见的“whole pounds + ounces”结果，静态 HTML 直接生成首次答案，改变输入后 JS 实时更新。没有新增 URL。

换算因子：**1 lb = 0.45359237 kg（国际磅定义）**，**1 lb = 16 mass oz**。为避免 `15.999...` oz，先将全部磅结果化成**十分之一盎司**并统一舍入，再拆为整数磅和 0–15.9 盎司，保留最多一位小数。结果若经过舍入，显示 `≈`；精确时显示 `=`：

| 输入 | 十进制磅（示例） | 新增格式 |
|---|---:|---|
| 54 kg | ≈119.049622 lb | ≈119 lb 0.8 oz |
| 2.5 kg | ≈5.511557 lb | ≈5 lb 8.2 oz |
| 240 kg | ≈529.109429 lb | ≈529 lb 1.8 oz |
| 0.45359237 kg | =1 lb | =1 lb 0 oz |

针对零、舍入后满一磅（例：接近 2 lb 的原值→`2 lb 0 oz`）、超大数、负数及非法数值添加明确行为。负质量/异常输入不展示辅助格式，不擅自变更原主换算逻辑。原有十进制磅结果、主 Copy result、其它质量工具均不受影响。

## 4. 检验与发布政策

- `src/assets/engine.mjs`：`kgToPoundsOunces()`；`scripts/build.mjs`：初始 SSR 面板；`src/assets/app.mjs`：实时变化/换向隐藏；`src/assets/inner.css`：窄屏紧凑响应布局。
- `tests/kg-to-lbs-ounces.test.mjs`：54、2.5、240 kg、进位、精确/近似、无效输入。
- `scripts/browser-smoke.mjs`：真实 Chromium 动态输入、主结果复制、方向切换/隐藏和手机首屏。
- `scripts/seo-content-audit.mjs`：核查现有 `kg-to-lbs` 方向页和全部 14 个数值结果页是否采用相同共享引擎，没有误给其它 37 个方向显示该模块。
- `scripts/live-preview-audit.mjs`：部署后检查实际 Cloudflare HTML 的 `240 kg` 示例及主提交 SHA，而非单纯宣称合并成功。

**现有 157 条 SSR 路由、38 个方向工具、92 个数值结果页不变。原定 15 个数值索引候选与其余 77 个 noindex 不变。** 预览 Cloudflare `*.pages.dev` 继续全站 noindex，正式域名与 GSC 暂不操作，无付费 API。

这是一项实用功能与可抓取内容改进，并非证据证明实际 Google 收录、排名、点击或收益有所增长。
