## Next Spaceflight 网站中文汉化

将 Next Spaceflight（nextspaceflight.com）火箭发射跟踪网站大部分汉化为中文的油猴脚本。

### 功能概览

**界面导航**
- 顶部导航栏、首页分类标题、筛选器、搜索框、按钮、无障碍标签

**发射信息**
- 发射状态（10 种）、倒计时单位、发射类型、任务名称

**时间日期**（正则动态匹配）
- 相对时间（明天、今天、昨天、前天、X天前）
- 全称/缩写星期与月份，自动转为中文年月日格式
- NET（不早于）日期（年月、季度、半年）
- 天气状态（9 种）

**火箭型号**（150+ 种）
- 主流运载火箭全系列
- 支持变体后缀、连字符、斜杠、上面级组合等自动匹配
- 星舰多种配置支持

**复用与回收**
- 复用状态、连续记录、排序选项
- 飞船舱、航天飞机名、着陆场等动态匹配
- 飞行次数自动翻译

**机构/公司**（100+ 家）
- 全球各大航天机构与商业公司
- 机构所属类型动态匹配
- 机构信息翻译

**发射场/工位**（100+ 个）
- 各国航天中心、发射场、发射工位
- 中文语序自动重排

**详情页**
- 火箭参数、飞行轨迹方向（16 方位罗盘）
- 统计数据、按钮与链接

### 技术特点

- **TreeWalker 高性能遍历：** 使用原生 C++ 级 DOM 遍历，替代 `querySelectorAll('*')`
- **时间片轮转：** 每帧 12ms 预算，`requestAnimationFrame` 驱动，不阻塞主线程
- **O(1) 队列：** 游标式扁平队列，避免 `shift()` 的 O(n) 开销
- **WeakSet 去重：** 已翻译节点自动跳过
- **React 水合防护：** 延迟二次扫描 + characterData 监听，应对 Next.js 将译文覆盖回英文
- **文本节点合并：** 自动 `normalize()` 修复 React 拆分的文本节点
- **MutationObserver 增量翻译：** 适配 SPA 动态加载，新增节点即时翻译
- **正则触发器预筛选：** 仅含关键词的文本才走正则，避免无谓消耗
- **火箭名前缀匹配：** 单字前缀白名单机制，自动适配变体后缀

### 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
2. 从 [Greasy Fork](https://greasyfork.org/zh-CN/scripts/585130) 安装本脚本
3. 访问 [nextspaceflight.com](https://nextspaceflight.com/)，界面自动汉化

### 使用

安装后访问 Next Spaceflight 即自动汉化，无需额外操作。

脚本提供油猴菜单开关，可随时开启或关闭翻译：点击浏览器工具栏的油猴图标，选择「关闭翻译」或「开启翻译」即可切换，切换后页面自动刷新生效。

### 截图
<img width="600" alt="1" src="https://github.com/user-attachments/assets/1fba6fbb-bd75-4cea-8c46-9dc053d6d171" />
<img width="600" alt="2" src="https://github.com/user-attachments/assets/4075cdf6-8e77-48c9-8226-d3d136bc61c6" />
<img width="600" alt="2-1" src="https://github.com/user-attachments/assets/fe71674a-09aa-4728-80b8-dafef48590cc" />
<img width="600" alt="2-3" src="https://github.com/user-attachments/assets/100545ec-7f7a-490c-928e-62538cc6c901" />
<img width="600" alt="3" src="https://github.com/user-attachments/assets/d27f63fb-23dc-4e48-802b-d9e4fd6931ce" />
<img width="600" alt="4" src="https://github.com/user-attachments/assets/0efe576f-acc6-4728-ae8d-71b44e5365b3" />
<img width="600" alt="5" src="https://github.com/user-attachments/assets/60904058-e3d8-40db-a5ca-e9f8ae0d7f45" />
<img width="600" alt="5-1" src="https://github.com/user-attachments/assets/173506bf-3f9b-4d1d-b09b-7861065c503a" />
<img width="600" alt="6" src="https://github.com/user-attachments/assets/e7d07389-c14f-48c7-b120-6ee8cd57f3d7" />
<img width="600" alt="7" src="https://github.com/user-attachments/assets/e136872a-607f-4f19-b4db-2f1a8cc7d3c0" />
<img width="600" alt="8" src="https://github.com/user-attachments/assets/5c54c07b-4ee7-4973-a137-0da6aadf791c" />


### 许可

MIT License · 作者 NcPinX
