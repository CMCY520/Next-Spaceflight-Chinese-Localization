## Next Spaceflight 网站中文汉化

将 Next Spaceflight（nextspaceflight.com）火箭发射跟踪网站完整汉化为中文的油猴脚本。

### 功能概览

覆盖网站全部页面的中文化翻译，包括：

**界面导航**
- 顶部导航栏（发射、火箭、复用、星舰、地点、获取应用）
- 首页分类标题（即将发射、事件、新闻、独家功能）
- 筛选器、搜索框、按钮、无障碍标签

**发射信息**
- 发射状态（成功、失败、飞行中、取消发射、结果待定等 10 种）
- 倒计时单位（时、分、秒）
- 发射类型（回收、亚轨道）
- 任务名称（演示飞行、未知载荷）

**时间日期**（正则动态匹配，支持任意日期组合）
- 相对时间：明天、今天、昨天、前天、X天前
- 日期格式：全称/缩写星期、全称/缩写月份，自动转为中文年月日格式
- NET（不早于）日期：年月、季度、半年等格式
- 天气状态（晴空、多云、雷暴、小雨等 9 种）

**火箭型号**（150+ 种）
- 长征系列、猎鹰系列、联盟号、阿丽亚娜、质子号、宇宙神、德尔塔、土星、安加拉 等
- 支持变体后缀自动匹配
- 星舰配置：星舰-超重助推、加油星舰、载人星舰、货运星舰

**机构/公司**（100+ 家）
- SpaceX、NASA、CASC、ISRO、Roscosmos、JAXA、Arianespace、ULA 等

**发射场/工位**（100+ 个）
- 各国航天中心、发射场、发射工位、地点
- 中文语序自动重排

**详情页**
- 火箭参数（高度、直径、LEO/GTO 载荷、起飞推力、价格、整流罩、级数）
- 机构信息（制造商、运营商、首席执行官、成立年份）
- 统计数据（任务次数、成功率、连续成功、发射场等）
- 按钮/链接（观看、回放、直播、官网、维基百科、论坛）

### 技术特点

- **TreeWalker 高性能遍历：** 使用原生 C++ 级 DOM 遍历，替代 `querySelectorAll('*')`
- **时间片轮转：** 每帧 12ms 预算，`requestAnimationFrame` 驱动，不阻塞主线程
- **O(1) 队列：** 游标式扁平队列，避免 `shift()` 的 O(n) 开销
- **WeakSet 去重：** 已翻译节点自动跳过
- **React 水合防护：** 延迟二次扫描 + characterData 监听，应对 Next.js 将译文覆盖回英文
- **文本节点合并：** 自动 `normalize()` 修复 React 拆分的文本节点
- **MutationObserver 增量翻译：** 适配 SPA 动态加载，新增节点即时翻译
- **正则触发器预筛选：** 仅含关键词的文本才走正则，避免无谓消耗
- **前缀匹配：** 火箭名/机构名带变体后缀时自动匹配词库前缀

### 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
2. 从 [Greasy Fork](https://greasyfork.org/) 安装本脚本
3. 访问 [nextspaceflight.com](https://nextspaceflight.com/)，界面自动汉化




<img width="1395" height="1288" alt="1" src="https://github.com/user-attachments/assets/04926ad1-b027-4c69-9e14-872265e1ee93" />
<img width="1441" height="1215" alt="2" src="https://github.com/user-attachments/assets/d81e1d72-2628-494d-bd44-8f0b2f1c6c20" />
<img width="1331" height="1242" alt="2-1" src="https://github.com/user-attachments/assets/08e13c3d-e389-4f6d-934f-25e6848aaef7" />
<img width="1307" height="2069" alt="3" src="https://github.com/user-attachments/assets/53a16f17-dd55-433f-8c09-906ed5b106bf" />
<img width="1398" height="1228" alt="4" src="https://github.com/user-attachments/assets/e8a822e8-d374-46b2-8d4c-b53a1f454be1" />
<img width="1391" height="1268" alt="5" src="https://github.com/user-attachments/assets/28a67642-616b-4f50-ad3a-82f3071594ea" />
<img width="1275" height="1261" alt="6" src="https://github.com/user-attachments/assets/beddbb82-8864-4657-bf21-563181b9d4f1" />
<img width="1250" height="1834" alt="6-1" src="https://github.com/user-attachments/assets/76dd661f-c0b7-4c91-a022-0c80c397d71b" />
<img width="1379" height="1237" alt="7" src="https://github.com/user-attachments/assets/43e388ab-8f5f-4dc0-8da0-e56497dee7a1" />


### 许可

MIT License · 作者 NcPinX
