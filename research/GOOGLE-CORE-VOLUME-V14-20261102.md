# Google SEO V14 — 355 mL 的 US/UK Fluid Ounce 歧义与核心工具功能修正（2026-11-02）

## 起点：真实竞品域名和仓库关键词证据

已存在的用户提供的竞争站 Semrush 600 行数据中，有 `355 ml to fluid ounces`，估计美国 Volume 720、KD 20，竞争站路径 `/volume/milliliter/355`；本站原有候选页面 `/convert/ml-to-us-fl-oz/355/`。**上述数值来自用户提供的竞争域名排名导出，不是本站真实流量、更新后的 KD 或 Google US SERP 前十排名。**

本轮在外部网页中核查的实际工具如下：

- [Metric Conversions — Milliliters to UK Fluid Ounces](https://www.metric-conversions.org/volume/milliliters-to-uk-ounces.htm)：与 mL→US fl oz 独立区分，明确 UK fl oz ≈ 28.4130625 mL。
- [Omni Calculator — Cooking Measurement Converter](https://www.omnicalculator.com/food/cooking-measurement)：表格中同时列 US fl oz 和 UK fl oz，并解释两者区别。
- [CalcFluent — mL to fluid ounces](https://calcfluent.com/conversions/ml-to-ounces/)：在一个 mL 页面中展示 US 和 Imperial 两种结果，并展示 355 mL。
- [RocketCalc — mL to US fluid ounces](https://www.rocketcalc.io/volume/ml-to-fl-oz)：直接解释美国饮料罐 mL 与 US fl oz，并有杯/汤匙读数。

这些只用于可见页面功能对比。**未验证任何竞争站的关键词排名、流量或实际收入，不以网页检索替代 Semrush/Ahrefs 域名级证据。**

## 找到的问题

`355 ml to fluid ounces` 不限定使用 US 或 UK/imperial 体积单位。当前本站工具路径明确为 US，但用户在页面上看不到同一 mL 对应的 UK 数值；只提供简单提醒容易造成将两种流体盎司混用。

- 1 **US** fluid ounce = 3.785411784 L / 128 = **29.5735295625 mL**（由精确美制液体加仑定义导出）。
- 1 **UK / imperial** fluid ounce = 4.54609 L / 160 = **28.4130625 mL**（由精确英制液体加仑定义导出）。
- `355 mL` ≈ **12.004 US fl oz**，同时 ≈ **12.4943 UK fl oz**（按四位小数显示；这是舍入值，而不是新的精确定义）。

## 已实施

1. 在共享单位引擎中新增 `imp-fl-oz` 作为英制液体盎司，参与通用及批量换算；**不生成新的 SEO URL**。
2. 对既有 `/convert/ml-to-us-fl-oz/` 和 `/convert/us-fl-oz-to-ml/` 增加紧凑、预渲染的 US/UK 比较面板，输入修改/单位反向切换后同步重算，明确标识结果舍入 `≈` 或精确 `=`。
3. 在原有 `/convert/ml-to-us-fl-oz/355/` 中复用同一实时比较面板，第一屏 HTML 已具有 355 mL 对应的两种数值，不依赖运行浏览器 JavaScript。
4. 不使用航空、旅行或医疗安全结论替代单位换算；只提供体积定义，并清楚指出 `fluid ounces` 是容量不是重量。
5. 新增单元测试、真实 Chrome 用户输入/反向换算/320px 移动端验证以及静态 HTML 157 页审计门禁。

## Google SEO 与索引边界

根据 [Google Search Central people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)，优先解决实际用户换算歧义，而不是制造重复文章或增加多套轻量级数字页面。这个改进**不保证 Google 排名、点击或收录增长**。

- URL 总数 157，38 个现有方向工具，92 个现有数值页不变；15 个候选页仍处审慎试点，另外 77 个维持 noindex。
- `pages.dev` 是临时预览地址，始终 noindex；正式域名继续等待用户后续批准。
- 除域名以外无额外固定成本；只使用本地浏览器计算、没有额外付费 API。
