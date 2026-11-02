# Google SEO V17 — 摄氏、华氏、开尔文三温标与温差说明（2026-11-02）

## 1. 真实竞品关键词：来源、限制与本轮决策

从用户提供的竞争域名 `convert-units.info` Semrush 原始自然排名导出对应的仓库 `src/data/seeds.json` 读取以下原始记录：

| 原始查询 | 竞争域名 US Volume 估计 | 竞争域名 KD | 竞争域名原有排名 | 本站既有路径 |
|---|---:|---:|---:|---|
| `36.6 celsius to f` | 6,600 | 21 | 18 | `/convert/celsius-to-fahrenheit/36.6/` |
| `37.9 celsius to fahrenheit` | 5,400 | 27 | 10 | `/convert/celsius-to-fahrenheit/37.9/` |

这些为**历史竞品导出**，不是本站真实 Google 搜索量、GSC 展示/点击、实时 SERP 前十或排名承诺。相加不等于独立用户数量；泛词 `celsius to fahrenheit` 的搜索量尚未从此导出验证。

实际公开页面：
- [CelsiusFahrenheit.co — 37.9 °C to °F](https://www.celsiusfahrenheit.co/37.9)：现成精确答案 **37.9°C = 100.22°F**，含公式、附近数值、完整温度表、输入转换器和“是否发热”医疗解释。因此重复一张表/生成新的 `37.9` URL 都不会形成实质差异。
- [Calculatio — 37.9°C to K](https://calculat.io/en/temperature/celsius-to-kelvin/37.9)：相同摄氏值还可表达为 **311.05 K**，说明三温标是可用的补充读取格式，而不只是 SEO 句子。
- [NIST — SI Units: Temperature](https://www.nist.gov/pml/owm/si-units-temperature) 明确给出摄氏、华氏和开尔文的准确转换方程与绝对零度；并指出绝对温度转换不同于温度变化量转换。
- [NIST — SP 811 B.9](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9) 将 Temperature 与 Temperature Interval **分别列为两组换算**。

上述公开网页只是对可见功能的核查，并非可靠的当前 Google 美国排位序列。

## 2. 核心区别：绝对温度与温度间隔不能混淆

本站之前方向页具备主计算、公式与折叠单位表，但用户需要手动查找 Kelvin，且未实时区分温差与绝对温度。V17 在已有两个温度方向工具、以及 `36.6`、`37.9` 两个现有数字页的主要计算/复制控件之后，增加**静态 HTML 原生可抓取的三温标结果**：

| 输入绝对温度 | 摄氏 (°C) | 华氏 (°F) | 开尔文 (K) |
|---|---:|---:|---:|
| 36.6°C | 36.6 | 97.88 | 309.75 |
| 37.9°C | 37.9 | 100.22 | 311.05 |
| 32°F | 0 | 32 | 273.15 |
| 0 K | -273.15 | -459.67 | 0 |

- 输入、切换方向、选择 Kelvin 后实时更新；可一键复制三温标结果及温差规则。
- 以原来通过测试的 `convert()` 为唯一单位换算实现，保留首次服务器预生成答案；仅对 IEEE 754 浮点运算产生的极小尾差作 ULP 级容差，避免 `37.9°C = 100.22°F` 被误标为物理意义上的“近似”。真正舍入到六位小数时仍标 `≈`。
- 严禁将绝对温度的 **`+32` 偏移**套用到温度变化量：**变化 1°C = 变化 1 K = 变化 1.8°F**；0°C 的绝对温度仍是 32°F。
- 低于 0 K 的非法绝对温度不展示编造结果，保留主表单原有错误处理；面板与原数值页同样静态渲染，并且不增加 SEO 路由。
- **不添加体温正常、发热标准、是否需要治疗等医疗解释**，因为测量位置、年龄、环境和临床背景不同，本站的用途是单位换算而不是诊断。

## 3. 自动回归与索引规则

- `src/assets/engine.mjs`: `temperatureThreeScaleReadout`，单位源检查与有效绝对温度处理。
- `scripts/build.mjs`: SSR 三温标卡片和 NIST 链接；`src/assets/app.mjs`: 输入变化、换向及一次复制三温标；`src/assets/inner.css`: 手机响应式布局，主复制按钮优先。
- `tests/temperature-three-scale.test.mjs`：标准数值、绝对零度、温差换算、舍入、非法数值；`scripts/browser-smoke.mjs`：真实 Chrome 37.9/36.6°C、复制、方向切换、输入出错和 320px 手机首屏；`scripts/seo-content-audit.mjs`：157 个 HTML 页面并核对四个相关 URL 的实际静态值。
- `scripts/live-preview-audit.mjs`：线上 Cloudflare 需返回 `36.6` 与 `37.9` 页面确切三温标答案并匹配 GitHub 主分支 SHA；`scripts/visual-capture.mjs` 增加桌面/375px 手机截图。
- URL 仍为 157，38 个方向工具、92 个数字页不变。**原有 15 个未来候选数字页/77 个 noindex 不变**；`37.9°C` 原先为候选，`36.6°C` 仍为 noindex。临时 `pages.dev` 全站 noindex、正式域名最后处理。
- 全部为静态/浏览器本地计算，没有付费 API、持续服务器或数据库开支。

本轮功能提高了温度换算的实用性及来源可核验性，但**没有 GSC 数据，不能声称 Google 已提高排名、收录或自然流量**。
