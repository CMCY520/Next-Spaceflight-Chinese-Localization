// ==UserScript==
// @name         Next Spaceflight 网站中文汉化
// @author       NcPinX
// @namespace    https://github.com/CMCY520/Next-Spaceflight-Chinese-Localization
// @license      MIT
// @description  中文化 Next Spaceflight 界面菜单及内容。
// @version      0.1.0
// @match        https://nextspaceflight.com/*
// @match        https://*.nextspaceflight.com/*
// @run-at       document-start
// @connect      raw.githubusercontent.com
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
    'use strict';

    /* =========================================================================
     *  一、配置区（必改）—— 把这里改成目标网站的信息
     * ========================================================================= */
    const CONFIG = {
        scriptName: 'Next Spaceflight 网站中文汉化',              // 控制台 / 通知里显示的脚本名
        cacheKey:  'nsf_zh_dict_data',          // 词库本地缓存键名
        remoteDictUrl: '',                  // 远程词库地址（可选，留空则只用下方内置词库）
        enableTranslation: GM_getValue('enable_Translation', true), // 翻译总开关，可菜单切换
        // 正则触发器：仅当文本命中这些关键词时才跑正则，避免无谓消耗
        regexTrigger: /[:]|\d|@|\||am|pm|today|tomorrow|yesterday|ago|mon|tue|wed|thu|fri|sat|sun|day|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|quarter|half|net|earlier|height|diameter|leo|gto|kg|million|active|since|liftoff|planned|mission|orbital|launch|attempt|cst|ago|hours?|minutes?|days?|month|year|tbd|kilonewton|center|space|cosmodrome|spaceport|airbase|airport|station|range|complex|facility|base|site|force|island|peninsula|platform|ocean|sea|coast|field|area|port|pad|test|afb|sfb|sfc|sfs|usa|china|russia|japan|india|iran|brazil|france|korea|canada|australia|sweden|norway|israel|kenya|kazakhstan|guiana|zealand|florida|california|texas|virginia|alaska|guam|recover|articles/i,
    };

    /* =========================================================================
     *  二、内置词库（稍后填充）—— 你发网站后，把对照关系填进来
     * ========================================================================= */
    const BUILTIN_DICT = {
        version: '0.1.0',
        translations: {
            // —— 顶部导航菜单 ——
            "Launches":    "发射",
            "Rockets":     "火箭",
            "Reuse":       "复用",
            "Starship":    "星舰",
            "Locations":   "地点",
            "Get the App": "获取应用",
            "Upcoming":   "即将登场",
            "Previous":   "历史发射",
            "Search...":  "搜索...",
            "Add Filter": "添加筛选",
            "Filter by...": "按...筛选",
            "Filter":      "筛选",

            // —— 首页分类 ——
            "Up Next":    "即将发射",
            "All Launches": "全部发射",
            "Events":    "事件",
            "News":      "新闻",
            "Articles":  "文章",
            "All Articles": "全部文章",
            "Yesterday":  "昨天",
            "Show More": "显示更多",
            "Show Less": "收起",
            "Exclusive Features": "独家功能",

            // —— 获取应用页 ——
            "Get the Next in Spaceflight, on the go!": "随时随地掌握航天动态！",
            "Flight simulations": "飞行模拟",
            "Live launch timelines": "实时发射时间线",
            "Notifications for upcoming launches and events": "即将发射与活动通知",
            'Live \u201cNext Launch\u201d widget': '实时\u201c下次发射\u201d小组件',
            "Next Spaceflight is making it easier than ever before to track the latest in spaceflight.": "下一次太空飞行让追踪最新航天动态变得前所未有的简单。",
            "While our website is designed to work on mobile devices, our Android and iOS app provide a better mobile experience.": "虽然网站已适配移动设备，但 Android 和 iOS 应用提供更佳的移动体验。",
            "Download today for free:": "今天免费下载：",
            "Google Play": "Google Play",
            "App Store": "App Store",

            // —— 发射状态 ——
            "TBD Date & Time":   "日期和时间待定",
            "TBD Time":          "时间待定",
            "Go":                "准备就绪",
            "Hold":              "暂停",
            "Scrub":             "取消发射",
            "In-Flight":         "飞行中",
            "Success":           "成功",
            "Launch Failure":    "发射失败",
            "Launch":            "发射",
            "Partial Failure":   "部分失败",
            "Failure":           "失败",
            "Prelaunch Failure": "发射前失败",
            "Outcome Pending":   "结果待定",

            // —— 发射类型 ——
            "Recovery":  "回收",
            "Suborbital": "亚轨道",

            // —— 倒计时单位 ——
            "HOURS": "时",
            "MINS":  "分",
            "SECS":  "秒",

            // —— 时间相关 ——
            "Today":     "今天",
            "Tomorrow":  "明天",
            "AM":        "上午",
            "PM":        "下午",
            "NET":       "不早于",
            "days":      "天",
            "hours":     "小时",
            "day":       "天",
            "hour":      "小时",

            // —— 天气 ——
            "clear sky":        "晴空",
            "few clouds":       "少云",
            "scattered clouds":  "多云",
            "broken clouds":    "阴天",
            "overcast clouds":  "阴",
            "light rain":       "小雨",
            "moderate rain":    "中雨",
            "heavy rain":       "大雨",
            "thunderstorm":     "雷暴",
            "snow":             "雪",
            "mist":             "薄雾",
            "fog":              "雾",

            // —— 星期（全称）——
            "Monday":    "周一",
            "Tuesday":   "周二",
            "Wednesday": "周三",
            "Thursday":  "周四",
            "Friday":    "周五",
            "Saturday":  "周六",
            "Sunday":    "周日",

            // —— 月份（全称）——
            "January":   "1月",
            "February":  "2月",
            "March":     "3月",
            "April":     "4月",
            "May":       "5月",
            "June":      "6月",
            "July":      "7月",
            "August":    "8月",
            "September": "9月",
            "October":   "10月",
            "November":  "11月",
            "December":  "12月",

            "Status":      "状态",
            "Type":        "类型",
            "Rocket":      "火箭",
            "Vehicle":     "箭体",
            "Agency":      "机构",
            "Pad":         "发射工位",

            // —— 无障碍标签 / aria-label ——
            "Open get the app modal": "打开获取应用弹窗",
            "Open menu":              "打开菜单",
            "Show upcoming launches": "显示即将发射",
            "Show previous launches": "显示历史发射",

            // —— 品牌名 ——
            "Next Spaceflight":       "下一次太空飞行",

            // —— 任务名 ——
            "Demo Flight":      "演示飞行",
            "Unknown Payload":  "未知载荷",

            // —— 详情页标签 ——
            "Liftoff Time (CST)": "起飞时间 (CST)",
            "Liftoff Time":        "起飞时间",
            "Planned Liftoff":    "计划起飞",
            "Planned":            "计划",
            "Liftoff":            "起飞",
            "Window Open":        "发射窗口开启",
            "Window Close":       "发射窗口关闭",
            "Fastest Turnaround": "最快周转",

            // —— 统计区 ——
            "Launch Site":           "发射场",
            "Stats":                 "统计数据",
            "Mission":               "任务",
            "Orbital launch attempt": "轨道发射尝试",
            "Description":           "描述",
            "Missions":              "任务次数",
            "Success Rate":          "成功率",
            "Successes":             "成功次数",
            "Failures":              "失败次数",
            "Success Streak":        "连续成功",
            "Partial Failures":      "部分失败次数",
            "Launch Sites":          "发射场",
            "Configurations":        "配置",
            "Next Up":               "下一次",
            "Retired":               "退役",
            "Strap-ons":             "助推器",
            "Manufacturer":          "制造商",
            "Operator":              "运营商",
            "Low Earth Orbit":       "近地轨道",
            "Geostationary Transfer Orbit": "地球同步转移轨道",
            "Sun-Synchronous Orbit": "太阳同步轨道",
            "Polar Orbit":           "极地轨道",
            "Medium Earth Orbit":    "中地球轨道",
            "Geostationary Orbit":   "地球静止轨道",
            "Payload":               "个载荷",
            "Payloads":              "个载荷",
            "kilograms":             "千克",
            "kilogram":              "千克",
            "Payload identity uncertain.": "载荷身份不确定。",
            "Payload and launch vehicle identities uncertain.": "载荷和运载火箭身份不确定。",
            "Payload and launch vehicle identities highly uncertain.": "载荷和运载火箭身份高度不确定。",

            // —— 火箭信息卡 ——
            "Mission Details":  "任务详情",
            "Launch Notes":     "发射说明",
            "Active":           "现役",
            "Price":            "价格",
            "Payload to Orbit": "入轨载荷",
            "Liftoff Thrust":   "起飞推力",
            "Fairing":          "整流罩",
            "Stages":           "级数",
            "Fullscreen image": "全屏查看图片",

            // —— 详情页 / 机构页：按钮、标签与链接 ——
            "Rocket Stats":         "火箭统计",
            "Full Manifest":        "完整清单",
            "All Rockets":          "全部火箭",
            "Vehicles":             "飞行器",
            "All Vehicles":         "全部飞行器",
            "Watch":                "观看",
            "Replay":               "回放",
            "Livestream":           "直播",
            "Official Livestream":  "官方直播",
            "Website":              "官网",
            "Wikipedia":            "维基百科",
            "Forum":                "论坛",
            "Profile":              "主页",
            "Read Article":         "阅读文章",
            "Track Payloads":       "追踪载荷",

            // —— 复用详情页 ——
            "Configuration":        "配置",
            "Manifest":             "清单",
            "Destroyed":            "摧毁",
            "Expended":             "消耗",
            "recovery attempt":     "回收尝试",
            "successful recovery":  "成功回收",
            "consecutive successful recovery": "连续成功回收",
            "consecutive successful landing": "连续成功着陆",
            "consecutive successful landing and recovery": "连续成功着陆与回收",
            "failed recovery":     "回收失败",

            // —— 复用页排序 ——
            "Sort":                 "排序",
            "Flights Flown":        "飞行次数",
            "Fastest Reuse":        "最快复用",
            "Average Reuse":        "平均复用",

            // —— 星舰页 ——
            "Starbase, Texas":     "德克萨斯 星际基地",
            "Recent Tests":        "近期测试",
            "Road Updates":        "道路更新",
            "Video Updates":       "视频更新",
            "Hardware":            "硬件",
            "All":                 "全部",
            "Full Stacks":         "完整堆栈",
            "Boosters":            "助推器",
            "Ships":               "飞船",
            "Suborbital Ships":    "亚轨道飞船",
            "Other":               "其他",
            "Show all":            "显示全部",
            "Show full stacks":    "显示完整堆栈",
            "Show boosters":       "显示助推器",
            "Show ships":          "显示飞船",
            "Show suborbital ships": "显示亚轨道飞船",
            "Show other":          "显示其他",
        },
        // —— 机构/公司映射表（initTranslator 时合并进词库）——
        agencyMap: {
            'Andøya Space': '安岛航天 (Andøya Space)', 'Arianespace': '阿丽亚娜空间 (Arianespace)',
            'Armée de l\'Air': '法国空军 (Armée de l\'Air)', 'Blue Origin': '蓝色起源 (Blue Origin)',
            'Boeing': '波音 (Boeing)', 'CASC': '中国航天科技集团 (CASC)', 'CASIC': '中国航天科工集团 (CASIC)',
            'CAS Space': '中科宇航 (CAS Space)', 'Chinarocket': '中国火箭 (Chinarocket)',
            'Douglas': '道格拉斯 (Douglas)', 'ESA': '欧空局 (ESA)',
            'Firefly': '萤火虫 (Firefly)', 'Galactic Energy': '星河动力 (Galactic Energy)',
            'General Dynamics': '通用动力 (General Dynamics)', 'iSpace': '星际荣耀 (iSpace)',
            'ISRO': '印度空间研究组织 (ISRO)', 'JAXA': '日本宇宙航空研究开发机构 (JAXA)',
            'KARI': '韩国航空宇宙研究院 (KARI)', 'Khrunichev': '赫鲁尼切夫 (Khrunichev)',
            'Landspace': '蓝箭航天 (Landspace)', 'Lockheed': '洛克希德 (Lockheed)',
            'Makeyev': '马基耶夫 (Makeyev)', 'Martin Marietta': '马丁·玛丽埃塔 (Martin Marietta)',
            'MHI': '三菱重工 (MHI)', 'NASA': '美国宇航局 (NASA)',
            'Northrop': '诺思罗普 (Northrop)', 'OneSpace': '零壹空间 (OneSpace)',
            'Orienspace': '东方空间 (Orienspace)', 'RKK Energiya': '能源火箭航天集团 (RKK Energiya)',
            'Rocket Lab': '火箭实验室 (Rocket Lab)', 'Roscosmos': '俄罗斯航天国家集团 (Roscosmos)',
            'Southern Launch': '南部发射 (Southern Launch)', 'Space Pioneer': '天兵科技 (Space Pioneer)',
            'ULA': '联合发射联盟 (ULA)', 'US Air Force': '美国空军 (US Air Force)',
            'US Navy': '美国海军 (US Navy)', 'US Space Force': '美国太空军 (US Space Force)',
            'Virgin Galactic': '维珍银河 (Virgin Galactic)', 'Virgin Orbit': '维珍轨道 (Virgin Orbit)',
            'Vought': '沃特 (Vought)', 'Yuzhmash': '南方机械制造厂 (Yuzhmash)',
            'Yuzhnoye': '南方设计局 (Yuzhnoye)',
            // —— 补充 ——
            'DBA Space': '深蓝航天 (DBA Space)', 'Space One': '太空一号 (Space One)',
            'Astra': '阿斯特拉太空公司 (Astra)', 'Innospace': '创新空间 (Innospace)',
            'MaiaSpace': '玛雅太空公司 (MaiaSpace)',
            'ABMA': '美国陆军弹道导弹局 (ABMA)', 'ADD': '韩国国防发展局 (ADD)',
            'AEB': '巴西航天局 (AEB)', 'Aérospatiale': '法国宇航公司 (Aérospatiale)',
            'ASI': '意大利航天局 (ASI)', 'Avio': '阿维奥 (Avio)',
            'CECLES': '欧洲发射器研制组织 (CECLES)', 'CNES': '法国国家空间研究中心 (CNES)',
            'Eurockot': '欧洲呼啸号 (Eurockot)', 'ExPace': '快舟航天 (ExPace)',
            'Gilmour': '吉尔摩航天 (Gilmour)', 'IAI': '以色列航空航天工业 (IAI)',
            'IHI Aerospace': 'IHI航空航天 (IHI Aerospace)', 'ILS': '国际发射服务 (ILS)',
            'IRGC': '伊朗革命卫队 (IRGC)', 'ISA': '伊朗航天局 (ISA)',
            'Isar': '伊萨尔航天 (Isar)', 'ISAS': '日本宇宙科学研究所 (ISAS)',
            'KCST': '科威特科学研究委员会 (KCST)', 'Kosmotras': '宇航发射服务 (Kosmotras)',
            'Land Launch': '陆地发射 (Land Launch)', 'Latitude': '纬度航天 (Latitude)',
            'MITT': '机械制造技术研究所 (MITT)', 'NADA': '朝鲜航天局 (NADA)',
            'NPO Mash': '机械制造科研所 (NPO Mash)', 'OKB-1': '第一设计局 (OKB-1)',
            'OKB-586': '第586设计局 (OKB-586)', 'Orbex Space': 'Orbex航天 (Orbex Space)',
            'RAE': '英国皇家航空研究院 (RAE)', 'Relativity Space': '相对论航天 (Relativity Space)',
            'RFA': '火箭工厂拜罗伊特 (RFA)', 'RVSN USSR': '苏联战略火箭军 (RVSN USSR)',
            'Sandia': '桑迪亚 (Sandia)', 'Scaled': '缩比复合材料 (Scaled)',
            'Sea Launch': '海上发射 (Sea Launch)', 'Sierra': '内华达山脉 (Sierra)',
            'Skyroot': '斯凯罗特 (Skyroot)', 'Skyrora': '斯凯罗拉 (Skyrora)',
            'Starsem': '星发射 (Starsem)', 'Stoke Space': '斯托克航天 (Stoke Space)',
            'TiSPACE': '钛航天 (TiSPACE)', 'UT': '联合技术 (UT)',
            'Vector': '向量航天 (Vector)', 'VKS RF': '俄罗斯空天军 (VKS RF)',
            'PLD': '西班牙载荷航空航天 (PLD)',
        },
        // —— 火箭型号映射表（initTranslator 时合并进词库）——
        rocketMap: {
            'Alpha': '阿尔法', 'Amur': '阿穆尔',
            'Angara 1': '安加拉1号', 'Angara A5': '安加拉A5',
            'Antares': '安塔瑞斯', 'Ares 1': '战神1号',
            'Ariane': '阿丽亚娜',
            'Ariane 1': '阿丽亚娜1', 'Ariane 2': '阿丽亚娜2',
            'Ariane 3': '阿丽亚娜3', 'Ariane 4': '阿丽亚娜4',
            'Ariane 5': '阿丽亚娜5', 'Ariane 6': '阿丽亚娜6',
            'Athena I': '雅典娜I', 'Athena II': '雅典娜II',
            'Black Arrow': '黑箭', 'Blue Scout II': '蓝色侦察兵II',
            'Ceres 1': '谷神星一号', 'Ceres 2': '谷神星二号',
            'Chŏllima': '千里马', 'Conestoga 1': '大篷车1号',
            'Cosmos-1': '宇宙-1', 'Cosmos-2I': '宇宙-2I', 'Cosmos-3': '宇宙-3',
            'Cyclone-4M': '旋风-4M',
            'Diamant': '钻石', 'Dnepr': '第聂伯',
            'Eclipse': '日蚀', 'Electron': '电子号',
            'Energiya': '能源号', 'Epsilon': '艾普西龙', 'Epsilon S': '艾普斯龙 S',
            'Eris': '厄里斯', 'Europa': '欧罗巴',
            'Falcon 1': '猎鹰1号', 'Falcon 9': '猎鹰9号', 'Falcon Heavy': '猎鹰重型',
            'Feng Bao 1': '风暴一号',
            'Gravity 1': '引力一号', 'Gravity 2': '引力二号',
            'Hanbit-Nano': '韩光-纳米',
            'Hapith I': '飞鼠I', 'Hapith V': '飞鼠V',
            'Hyperbola 1': '双曲线一号', 'Hyperbola 3': '双曲线三号',
            'Jielong 1': '捷龙一号', 'Jielong 3': '捷龙三号',
            'Juno I': '丘诺I', 'Juno II': '丘诺II',
            'Kaituozhe 1': '开拓者一号', 'Kaituozhe 2': '开拓者二号',
            'Kinetica 1': '力箭一号', 'Kinetica 2': '力箭二号',
            'Kuaizhou 1': '快舟一号', 'Kuaizhou 1A': '快舟一号甲', 'Kuaizhou 11': '快舟十一号',
            'Lambda 4S': '拉姆达4S', 'LauncherOne': '发射者一号',
            'Mercury-Redstone': '水星-红石',
            'Minotaur C (Taurus)': '牛头怪C (金牛座)', 'Minotaur I': '牛头怪I',
            'Minotaur IV': '牛头怪IV', 'Minotaur V': '牛头怪V',
            'Miura 5': '缪拉5号',
            'Molniya': '闪电号', 'Molniya-M': '闪电-M',
            'Mu-III': '缪-III', 'Mu-IV': '缪-IV', 'Mu-V': '缪-V',
            'Nebula 1': '星云一号', 'Neutron': '中子号',
            'New Glenn': '新格伦', 'New Shepard': '新谢泼德',
            'Nova': '新星', 'Pallas 1': '智神星一号',
            'Pegasus': '飞马座', 'Polyot': '飞行号',
            'Proton': '质子号', 'Proton-K': '质子-K', 'Proton-M': '质子-M',
            'Qaem 100': '伊兰100', 'Qased': '加塞德',
            'Redstone Sparta': '红石-斯巴达',
            'Rocket 3': '火箭3号', 'Rocket 4': '火箭4号',
            'Rokot': '呼啸号',
            'Safir 1': '信使1号',
            'Saturn I': '土星I', 'Saturn IB': '土星IB', 'Saturn V': '土星V',
            'Scout': '侦察兵', 'Shavit': '沙维特',
            "Shtil'": "什季尔", 'Simorgh': '神鸟',
            'SM-65B Atlas': 'SM-65B宇宙神',
            'Soyuz': '联盟号', 'Soyuz 2.1a': '联盟2.1a', 'Soyuz 2.1b': '联盟2.1b',
            'Soyuz 2.1v': '联盟2.1v', 'Soyuz 5': '联盟5号',
            'Soyuz FG': '联盟FG', 'Soyuz L': '联盟L',
            'Soyuz M': '联盟M', 'Soyuz U': '联盟U',
            'Space Launch System': '太空发射系统',
            'SpaceShipOne': '太空船一号', 'SpaceShipTwo': '太空船二号',
            'Space Shuttle': '航天飞机', 'Spectrum': '光谱',
            'Sputnik 8A91': '人造卫星8A91', 'Sputnik 8K71PS': '人造卫星8K71PS',
            'Starship Prototype': '星舰原型',
            'Super Heavy': '超重助推',
            'Starship-Super Heavy': '星舰-超重助推',
            'Tanker Starship': '加油星舰',
            'Crew Starship': '载人星舰',
            'Cargo Starship': '货运星舰',
            'START-1': '起飞-1', 'Strela': '箭',
            'Super Strypi': '超级斯特鲁皮',
            'Taepodong 1': '大浦洞1号',
            'Terran 1': '人族1号', 'Terran R': '人族R',
            'Thor-Able': '雷神-艾布尔', 'Thor-Ablestar': '雷神-艾布尔星',
            'Thor-Agena': '雷神-阿金纳', 'Thor-Burner': '雷神-燃烧器',
            'Thor-Delta': '雷神-德尔塔',
            'Tianlong 2': '天龙二号', 'Tianlong 3': '天龙三号',
            'Titan II': '泰坦II', 'Titan III': '泰坦III', 'Titan IV': '泰坦IV',
            'Tsyklon-2': '旋风-2', 'Tsyklon-2A': '旋风-2A', 'Tsyklon-3': '旋风-3',
            'Unha 2': '银河2号', 'Unha 3': '银河3号',
            'Vanguard': '先锋', 'Vega': '织女星',
            'Vikram-I': '维克拉姆-I', 'Volna': '波浪',
            'Voskhod': '上升号', 'Vostok': '东方号', 'Vostok-2': '东方-2',
            'Vulcan Centaur': '火神半人马', 'Zenit': '天顶号',
            'Zéphyr': '泽菲尔',
            'ZhuQue 1': '朱雀一号', 'ZhuQue 2': '朱雀二号', 'ZhuQue 3': '朱雀三号',
            'Zoljanah': '佐尔贾纳',
            // 长征系列
            'Long March 1': '长征一号', 'Long March 2': '长征二号',
            'Long March 2C': '长征二号C', 'Long March 2D': '长征二号D',
            'Long March 2E': '长征二号E', 'Long March 2F': '长征二号F',
            'Long March 3': '长征三号', 'Long March 4A': '长征四号A',
            'Long March 4B': '长征四号B', 'Long March 4C': '长征四号C',
            'Long March 5': '长征五号', 'Long March 5B': '长征五号B',
            'Long March 6': '长征六号', 'Long March 6A': '长征六号A',
            'Long March 6C': '长征六号C', 'Long March 7': '长征七号',
            'Long March 7A': '长征七号A', 'Long March 8': '长征八号',
            'Long March 8A': '长征八号A', 'Long March 9': '长征九号',
            'Long March 10': '长征十号', 'Long March 10A': '长征十号A',
            'Long March 10B': '长征十号B', 'Long March 11': '长征十一号',
            'Long March 12': '长征十二号', 'Long March 12A': '长征十二号A',
            'Long March 12B': '长征十二号B',
            // Atlas系列
            'Atlas': '宇宙神',
            'Atlas-Able': '宇宙神-艾布尔', 'Atlas-Agena': '宇宙神-阿金纳',
            'Atlas-Altair': '宇宙神-牵牛星', 'Atlas-Burner': '宇宙神-燃烧器',
            'Atlas-Centaur': '宇宙神-半人马', 'Atlas I': '宇宙神I',
            'Atlas II': '宇宙神II', 'Atlas III': '宇宙神III',
            'Atlas V': '宇宙神V', 'Atlas LV-3B': '宇宙神LV-3B',
            'Atlas-MSD': '宇宙神-MSD', 'Atlas-OIS': '宇宙神-OIS',
            'Atlas-OV1': '宇宙神-OV1', 'Atlas-PTS': '宇宙神-PTS',
            'Atlas-SGS': '宇宙神-SGS', 'Atlas SLV-3': '宇宙神SLV-3',
            'Atlas-Star': '宇宙神-星',
            // Delta系列
            'Delta II': '德尔塔II', 'Delta III': '德尔塔III',
            'Delta IV Heavy': '德尔塔IV重型', 'Delta IV Medium': '德尔塔IV中型',
            'Delta A': '德尔塔A', 'Delta B': '德尔塔B', 'Delta C': '德尔塔C',
            'Delta D': '德尔塔D', 'Delta E': '德尔塔E', 'Delta G': '德尔塔G',
            'Delta J': '德尔塔J', 'Delta L': '德尔塔L', 'Delta M': '德尔塔M',
            'Delta N': '德尔塔N', 'Delta Class SpaceShip': '德尔塔级太空船',
            'South Korean ADD Solid-Fuel SLV': '韩国固体燃料运载火箭',
            'Falcon': '猎鹰', 'ZhuQue': '朱雀',
        },
        // —— 发射工位/地点共享映射表 ——
        locMap: {
            // 国家
            'USA': '美国', 'China': '中国', 'Russia': '俄罗斯', 'Japan': '日本',
            'India': '印度', 'France': '法国', 'Iran': '伊朗', 'Brazil': '巴西',
            'Kazakhstan': '哈萨克斯坦', 'New Zealand': '新西兰', 'Australia': '澳大利亚',
            'South Korea': '韩国', 'North Korea': '朝鲜', 'Sweden': '瑞典',
            'United Kingdom': '英国', 'Norway': '挪威', 'Israel': '以色列',
            'Canada': '加拿大', 'Kenya': '肯尼亚', 'Marshall Islands': '马绍尔群岛',
            'French Guiana': '法属圭亚那', 'Gran Canaria': '大加那利岛',
            'Pacific Ocean': '太平洋', 'Barents Sea': '巴伦支海',
            // 州/省
            'Florida': '佛罗里达', 'California': '加利福尼亚', 'Texas': '德克萨斯',
            'Virginia': '弗吉尼亚', 'Alaska': '阿拉斯加', 'Maranhão': '马拉尼昂',
            'Nordland': '诺尔兰', 'South Australia': '南澳大利亚',
            'New Mexico': '新墨西哥', 'Guam': '关岛', 'Kiruna': '基律纳',
            'Cornwall': '康沃尔',
            // 航天中心/发射场
            'Kennedy Space Center': '肯尼迪航天中心',
            'Cape Canaveral SFS': '卡纳维拉尔角太空军基地',
            'Vandenberg SFB': '范登堡太空军基地',
            'Wallops Flight Facility': '沃洛普斯飞行设施',
            'Jiuquan Satellite Launch Center': '酒泉卫星发射中心',
            'Taiyuan Satellite Launch Center': '太原卫星发射中心',
            'Xichang Satellite Launch Center': '西昌卫星发射中心',
            'Wenchang Space Launch Site': '文昌航天发射场',
            'Haiyang Oriental Spaceport': '海阳东方航天港',
            'Baikonur Cosmodrome': '拜科努尔航天发射场',
            'Plesetsk Cosmodrome': '普列谢茨克航天发射场',
            'Vostochny Cosmodrome': '东方航天发射场',
            'Guiana Space Centre': '圭亚那航天中心',
            'Tanegashima Space Center': '种子岛宇宙中心',
            'Uchinoura Space Center': '内之浦宇宙空间观测所',
            'Satish Dhawan Space Centre': '萨迪什·达万航天中心',
            'Semnan Space Center': '塞姆南航天中心',
            'Alcântara Launch Center': '阿尔坎塔拉发射中心',
            'Naro Space Center': '罗老宇宙中心',
            'Pacific Spaceport Complex': '太平洋航天港综合体',
            'Starbase': '星际基地',
            'Māhia Peninsula': '马希亚半岛',
            'Ronald Reagan Ballistic Missile Defense Test Site': '里根弹道导弹防御试验场',
            'Sohae Satellite Launching Station': '西海卫星发射场',
            'Tonghae Satellite Launching Ground': '东海卫星发射场',
            'Kapustin Yar': '卡普斯京亚尔',
            'Yasny Cosmodrome': '亚斯内航天发射场',
            'Svobodny Cosmodrome': '自由航天发射场',
            'Palmachim Airbase': '帕勒马希姆空军基地',
            'Andøya Rocket Range': '安岛火箭发射场',
            'Esrange Space Center': '埃斯朗厄航天中心',
            'Spaceport America': '美国航天港',
            'Space Port Kii': '纪伊太空港',
            'Whaler\'s Way': '捕鲸者之路',
            'Shahrud Missile Test Site': '沙赫鲁德导弹试验场',
            'Barents Sea Launch Area': '巴伦支海发射区',
            'Pacific Missile Range Facility': '太平洋导弹靶场设施',
            'Kiritimati Launch Area': '圣诞岛发射区',
            'San Marco Launch Platform': '圣马可发射平台',
            'Mojave Air and Space Port': '莫哈韦航空航天港',
            'Edwards AFB': '爱德华兹空军基地',
            'Andersen Air Force Base': '安德森空军基地',
            'RAAF Woomera Range Complex': '伍默拉试验场',
            'Bowen Orbital Spaceport': '鲍恩轨道航天港',
            'Shetland Space Centre': '设得兰航天中心',
            'Newquay Airport': '纽基机场',
            'Canso': '坎索',
            'Kulasekarapattinam Spaceport': '库拉塞卡拉帕蒂南航天港',
            'Base Aerea de Gando': '甘多空军基地',
            'A\' Mhòine': '阿莫因',
            'China Lake': '中国湖',
            'West Texas': '西德克萨斯',
            // 地点（补充）
            'Algeria': '阿尔及利亚', 'Hammaguir': '哈马吉尔',
            'Jeju Island': '济州岛',
            'Brigitte': '布里吉特', 'ADD': 'ADD',
            'Cosmic Girl': '宇宙女孩', 'Stargazer': '观星者',
            'VMS Eve': 'VMS 伊芙', 'White Knight': '白色骑士',
            'K-407': 'K-407', 'K-496': 'K-496', 'K-84': 'K-84',
            'Mayak-2': '灯塔-2', 'Safir': '信使',
            'Boca Chica': '博卡奇卡', 'Omelek Island': '奥梅莱克岛',
            'Inyokern': '因约肯', 'Tsyklon Pad': '旋风工位',
            'SaxaVord Spaceport': '萨克斯沃德航天港',
            'Imam Khomeini Spaceport': '伊玛目霍梅尼航天港',
            'Innospace Pad': 'Innospace 工位',
            'Kaituozhe Launch Pad': '开拓者发射工位',
            'Lambda Pad': '拉姆达工位', 'Mu Pad': '缪工位',
            'Pallas-1 Launch Pad': '帕拉斯-1 发射工位',
            'Tianlong-3 Launch Pad': '天龙-3 发射工位',
            'Long March 12 series Pad': '长征十二号系列工位',
            'SLV LP': 'SLV 发射台', 'SM Launch Tab': 'SM 发射台',
            'SSLV Launch Pad': 'SSLV 发射工位',
            'Sutherland spaceport': '萨瑟兰航天港',
            'South China Sea': '南海', 'Yellow Sea': '黄海',
            'launch location': '发射位',
            // 工位通用词
            'Commercial': '商业', 'Offshore': '海上',
            'Mobile': '移动', 'Launcher': '发射器',
            'First': '第一', 'Second': '第二',
            'Suborbital': '亚轨道', 'Orbital': '轨道',
            'Land': '陆地', 'Sea': '海基',
            'Submarine': '潜艇', 'Carrier': '载机',
            'Launch Pad': '发射工位', 'Launch Platform': '发射平台',
            'Launch Site': '发射场', 'Launch Complex': '发射综合体',
            'Space Launch Complex': '航天发射综合体',
            'launch platform': '发射平台',
            'Series': '系列', 'Starship': '星舰',
            'Unknown': '未知',
        },
        // —— 正则规则：处理动态时间文本 ——
        // \d{1,2}:\d{2} 匹配任意时分，$1 为该时间（动态值，非固定）
        regexRules: [
            // "Tomorrow/Today/Yesterday, <时分> PM/AM" → "明天/今天/昨天，下午/上午 <时间>"
            [/\b(Tomorrow|Today|Yesterday),\s*(\d{1,2}:\d{2})\s*(AM|PM)\b/i,
             (match, day, time, ap) => {
                 const d = { tomorrow: '明天', today: '今天', yesterday: '昨天' };
                 return `${d[day.toLowerCase()]}，${ap.toUpperCase() === 'PM' ? '下午' : '上午'} ${time}`;
             }, 'i'],
            // "星期名, <时分> PM/AM" → "周X，下午/上午 <时间>"
            [/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*(\d{1,2}:\d{2})\s*(AM|PM)\b/i,
             (match, weekday, time, ap) => {
                 const w = { monday: '周一', tuesday: '周二', wednesday: '周三', thursday: '周四', friday: '周五', saturday: '周六', sunday: '周日' };
                 return `${w[weekday.toLowerCase()]}，${ap.toUpperCase() === 'PM' ? '下午' : '上午'} ${time}`;
             }, 'i'],
            // "月份 日, <时分> PM/AM" → "X月X日 下午/上午 时分"
            [/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{1,2}:\d{2})\s*(AM|PM)\b/i,
             (match, month, day, time, ap) => {
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `${m[month.toLowerCase()]}${day}日 ${ap.toUpperCase() === 'PM' ? '下午' : '上午'} ${time}`;
             }, 'i'],
            // "NET 月份, 年份" → "不早于 年份月份"
            [/\bNET\s+(January|February|March|April|May|June|July|August|September|October|November|December),\s*(\d{4})\b/i,
             (match, month, year) => {
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `不早于 ${year}年${m[month.toLowerCase()]}`;
             }, 'i'],
            // "NET 月份 日, 年份" → "不早于 年份月份日"
            [/\bNET\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i,
             (match, month, day, year) => {
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `不早于 ${year}年${m[month.toLowerCase()]}${day}日`;
             }, 'i'],
            // "NET Xst/nd/rd/th Quarter, 年份" → "不早于 年份第X季度"
            [/\bNET\s+1st\s+Quarter,\s*(\d{4})\b/i, '不早于 $1年第1季度', ''],
            [/\bNET\s+2nd\s+Quarter,\s*(\d{4})\b/i, '不早于 $1年第2季度', ''],
            [/\bNET\s+3rd\s+Quarter,\s*(\d{4})\b/i, '不早于 $1年第3季度', ''],
            [/\bNET\s+4th\s+Quarter,\s*(\d{4})\b/i, '不早于 $1年第4季度', ''],
            // "NET 1st/2nd Half, 年份" → "不早于 年份上半年/下半年"
            [/\bNET\s+1st\s+Half,\s*(\d{4})\b/i, '不早于 $1年上半年', ''],
            [/\bNET\s+2nd\s+Half,\s*(\d{4})\b/i, '不早于 $1年下半年', ''],
            // "NET 年份" → "不早于 年份年"
            [/\bNET\s+(\d{4})\b/i, '不早于 $1年', ''],
            // "星期 月 日, 年" → "年月日 周X"（函数替换，一条搞定 7×12 组合）
            // 例：Thursday July 2, 2026 → 2026年7月2日 周四
            [/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i,
             (match, weekday, month, day, year) => {
                 const w = { monday: '周一', tuesday: '周二', wednesday: '周三', thursday: '周四', friday: '周五', saturday: '周六', sunday: '周日' };
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `${year}年${m[month.toLowerCase()]}${day}日 ${w[weekday.toLowerCase()]}`;
             }, 'i'],
            // "缩写星期 缩写月 日, 年" → "年月日 周X"
            // 例：Tue Jun 30, 2026 → 2026年6月30日 周二
            [/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),\s*(\d{4})\b/i,
             (match, weekday, month, day, year) => {
                 const w = { mon: '周一', tue: '周二', wed: '周三', thu: '周四', fri: '周五', sat: '周六', sun: '周日' };
                 const m = { jan: '1月', feb: '2月', mar: '3月', apr: '4月', may: '5月', jun: '6月', jul: '7月', aug: '8月', sep: '9月', oct: '10月', nov: '11月', dec: '12月' };
                 return `${year}年${m[month.toLowerCase()]}${day}日 ${w[weekday.toLowerCase()]}`;
             }, 'i'],
            // “月份 日, 年” → “年月日”（卡片日期，无星期无时间）
            // 例：April 8, 2025 → 2025年4月8日
            // 必须排在”星期 月 日, 年”规则之后，避免抢占带星期的日期
            [/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i,
             (match, month, day, year) => {
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `${year}年${m[month.toLowerCase()]}${day}日`;
             }, 'i'],
            // “月份 日” → “X月X日”（天气组件，无年份）
            // 例：July 01 → 7月1日
            [/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})\b/i,
             (match, month, day) => {
                 const m = { january: '1月', february: '2月', march: '3月', april: '4月', may: '5月', june: '6月', july: '7月', august: '8月', september: '9月', october: '10月', november: '11月', december: '12月' };
                 return `${m[month.toLowerCase()]}${day}日`;
             }, 'i'],
            // —— 火箭参数动态值 ——
            // "Height: 46.97m" → "高度：46.97m"
            [/\bHeight:\s*([\d.,]+m?)\b/i, '高度：$1', ''],
            // "Diameter: 3.8m" → "直径：3.8m"
            [/\bDiameter:\s*([\d.,]+m?)\b/i, '直径：$1', ''],
            // "LEO: 4,200 kg" → "近地轨道 (LEO)：4,200 kg"
            [/\bLEO:\s*([\d.,]+\s*kg)\b/i, '近地轨道 (LEO)：$1', ''],
            // "GTO: 1,500 kg" → "地球同步转移轨道 (GTO)：1,500 kg"
            [/\bGTO:\s*([\d.,]+\s*kg)\b/i, '地球同步转移轨道 (GTO)：$1', ''],
            // "2,993 Kilonewtons" → "2,993 千牛"
            [/\b([\d.,]+)\s*Kilonewtons?\b/i, '$1 千牛', ''],
            // "$64.68 million" → "6468 万美元"
            [/\$\s*([\d.]+)\s*million\b/i, (match, n) => `${Math.round(parseFloat(n) * 10)} 万美元`, ''],
            // "Active Since 2006" → "2006 年起现役"
            [/\bActive\s+Since\s+(\d{4})\b/i, '$1 年起现役', ''],
            // "Active 2001 to 2010" → "2001年至2010年现役"
            [/\bActive\s+(\d{4})\s+to\s+(\d{4})\b/i, '$1年至$2年现役', ''],
            // "Manufacturer: SpaceX" → "制造商：SpaceX"
            [/\bManufacturer:\s*/i, '制造商：', ''],
            // "Operator: SpaceX" → "运营商：SpaceX"
            [/\bOperator:\s*/i, '运营商：', ''],
            // "CEO: Elon Musk" → "首席执行官：Elon Musk"
            [/\bCEO:\s*/i, '首席执行官：', ''],
            // "Admin: xxx" → "负责人：xxx"（同位置，不同机构头衔）
            [/\bAdmin:\s*/i, '负责人：', ''],
            // "Founded: 2002" → "成立：2002"
            [/\bFounded:\s*/i, '成立：', ''],
            // 单独的词（兜底）
            [/\bTomorrow\b/gi, '明天', ''],
            [/\bToday\b/gi, '今天', ''],
            [/\bAM\b/g, '上午', ''],
            [/\bPM\b/g, '下午', ''],
            // —— 统计区动态文本 ——
            // "Mission of 2026" → "2026年任务"
            [/\bMission\s+of\s+(\d{4})\b/i, '$1年任务', ''],
            // 序数词（仅匹配整个文本节点）：659th → 第659次，76th → 第76次
            // 用 ^...$ 锚定整节点，避免误伤 "1st stage" 等嵌入文本
            [/^(\d+)(st|nd|rd|th)$/i, (match, num) => `第${num}次`, ''],
            // "1st Stage" / "2nd Stage" → "第一级" / "第二级"（火箭级数，数字转中文）
            [/\b(\d+)(st|nd|rd|th)\s+Stage\b/i, (match, num) => {
                const cn = {1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十'};
                return '第' + (cn[num] || num) + '级';
            }, 'i'],
            // "Flight #29" → "第29次飞行"
            [/\bFlight\s+#(\d+)\b/i, '第$1次飞行', ''],
            // "62 days turnaround" → "周转 62天"（须排在 days 规则前，否则 days 规则先命中返回）
            [/\b(\d+)\s*days?\s+turnaround\b/i, '周转 $1天', ''],
            // "76 days 1 hr" -> "76天 1时"（须排在 days 规则前）
            [/\b(\d+)\s*days?\s+(\d+)\s*(?:hrs?|hours?)\b/i, '$1天 $2时', ''],
            // "1 hr" -> "1时"
            [/\b(\d+)\s*(?:hrs?|hours?)\b/i, '$1时', ''],
            // "Falcon recoveries" / "ZhuQue recoveries" → "Falcon 回收" / "ZhuQue 回收"（XX+回收，自动适配新火箭）
            [/^(.+?)\s+recoveries\b/i, (match, name) => {
                const t = dict.get(name) || dict.get(name.replace(/-/g, ' '));
                return (t || name) + '回收';
            }, 'i'],
            // "24 Payloads" → "24个载荷"
            [/\b(\d+)\s*Payloads?\b/i, '$1个载荷', ''],
            // "10 days 18 hours" → "10天 18小时"
            [/\b(\d+)\s*days?\s*(\d+)\s*hours?\b/i, '$1天 $2小时', ''],
            // "2 days ago" → "前天"，"3 days ago" → "3天前"（须排在 days 规则前）
            [/\b2\s+days?\s+ago\b/i, '前天', ''],
            [/\b(\d+)\s*days?\s+ago\b/i, '$1天前', ''],
            [/\b(\d+)\s*days?\b/i, '$1天', ''],
            [/\b(\d+)\s*hours?\b/i, '$1小时', ''],
            // "7 knots" → "7节"
            [/\b(\d+)\s*knots?\b/i, '$1节', ''],
            // "Closures can indicate a planned Starship test or transport" → "封路可能预示着计划中的星舰测试或运输"
            [/\bClosures can indicate a planned (.+?) test or transport\b/i,
             (match, rocket) => `封路可能预示着计划中的${dict.get(rocket) || rocket}测试或运输`, ''],
            // —— 发射工位/地点（带 @）：Commercial LC-1 @ Wenchang Space Launch Site, China → 中国 文昌航天发射场 商业 LC-1 ——
            [/(.+?)\s+@\s+(.+)/i, (match, pad, loc) => {
                const sorted = Object.keys(locationMap).sort((a, b) => b.length - a.length);
                for (const key of sorted) {
                    pad = pad.replace(new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), locationMap[key]);
                    loc = loc.replace(new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), locationMap[key]);
                }
                // 中文语序：大→小，国家 州/省 地点 工位名（pad 不翻译）
                const parts = loc.split(',').map(s => s.trim()).reverse();
                return `${parts.join(' ')} ${pad}`;
            }, ''],
            // —— 发射地点（不带 @，卡片列表）：Jiuquan Satellite Launch Center, China → 中国 酒泉卫星发射中心 ——
            [/(.+),\s*(USA|China|Russia|Japan|India|France|Iran|Brazil|Kazakhstan|New\s+Zealand|Australia|South\s+Korea|North\s+Korea|Sweden|United\s+Kingdom|Norway|Israel|Canada|Kenya|Marshall\s+Islands|French\s+Guiana|Pacific\s+Ocean|Barents\s+Sea|Gran\s+Canaria)$/i,
             (match, loc, country) => {
                const c = locationMap[country] || country;
                const sorted = Object.keys(locationMap).sort((a, b) => b.length - a.length);
                for (const key of sorted) {
                    loc = loc.replace(new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi'), locationMap[key]);
                }
                // 中文语序：国家 → 地点。loc 可能含州/省（如 "Vandenberg SFB, California"），需拆分反转
                const locParts = loc.split(',').map(s => s.trim()).reverse();
                return `${c} ${locParts.join(' ')}`;
            }, ''],
            // —— 独立工位名（不含 @，详情页）：Commercial LC-1 → 商业 LC-1，但 Pad 单独出现不翻译 ——
            [/\b(Commercial|Offshore|Mobile|Launcher|Orbital|Suborbital|Land|Sea|Submarine|Carrier|Launch\s+Pad|Launch\s+Platform|Launch\s+Complex|Launch\s+Site|Space\s+Launch\s+Complex|Platform|launch\s+location|launch\s+platform|Series|Starship|Unknown|South\s+China\s+Sea|Yellow\s+Sea)\b/gi,
             (match) => locationMap[match] || match, ''],
            // —— 发射说明动态文本：一句话内组合翻译多个词组 ——
            [/^.*\blaunch\b.*\brocket\b.*$/i, (match) => {
                let r = match.replace(/\u2019/g, "'"); // 弯引号→直引号
                const lookup = (name) => {
                    name = name.trim();
                    let t = dict.get(name);
                    if (t) return t;
                    return dict.get(name.replace(/-/g, ' ')) || name;
                };
                r = r.replace(/\bFirst\s+test\s+launch\s+of\s+(.+?)'s\s+(.+?)\s+rocket\b/i, (m, org, rk) => `${lookup(org)}的${lookup(rk)}火箭首次试验发射`);
                r = r.replace(/\bFirst\s+launch\s+of\s+(.+?)'s\s+(.+?)\s+rocket\b/i, (m, org, rk) => `${lookup(org)}的${lookup(rk)}火箭首次发射`);
                r = r.replace(/\bFirst\s+test\s+launch\s+of\s+the\s+(.+?)\s+rocket\b/i, (m, rk) => `${lookup(rk)}火箭首次试验发射`);
                r = r.replace(/\bFirst\s+launch\s+of\s+the\s+(.+?)\s+rocket\b/i, (m, rk) => `${lookup(rk)}火箭首次发射`);
                r = r.replace(/\brocket\b/gi, '火箭');
                return r;
            }, ''],
            // —— 卡片火箭|机构：Falcon 9 Block 5 | SpaceX → 猎鹰9号 Block 5 | SpaceX ——
            [/^(.+?)\s+\|\s+(.+)$/, (match, rocket, agency) => {
                // 查词库：支持连字符变体（ZhuQue-2E → ZhuQue 2 → 朱雀二号 + E）
                const lookup = (name) => {
                    name = name.trim();
                    let t = dict.get(name);
                    if (t) return t;
                    // 连字符→空格：ZhuQue-2E → ZhuQue 2E
                    const spaced = name.replace(/-/g, ' ');
                    t = dict.get(spaced);
                    if (t) return t;
                    // 去末尾字母后缀：ZhuQue-2E → ZhuQue 2 → 朱雀二号 + E
                    const m = name.match(/^(.+?)([A-Z])$/);
                    if (m) {
                        const base = m[1].replace(/[-\s]+$/, '').replace(/-/g, ' ').trim();
                        const tb = dict.get(base);
                        if (tb) return tb + m[2];
                    }
                    // 前缀匹配：Atlas V 401 → Atlas V → 宇宙神V 401
                    const parts = name.split(/\s+/);
                    for (let i = parts.length - 1; i >= 1; i--) {
                        const prefix = parts.slice(0, i).join(' ');
                        const tp = dict.get(prefix);
                        if (tp) return tp + ' ' + parts.slice(i).join(' ');
                    }
                    return null;
                };
                let r;
                // 处理 "Block" 后缀：只翻译 Block 前面的部分
                const blockMatch = rocket.match(/^(.+?)\s+(Block\s+.+)$/i);
                if (blockMatch) {
                    const t = lookup(blockMatch[1]);
                    r = t ? `${t} ${blockMatch[2]}` : rocket;
                } else {
                    // 按 / 拆分，逐个查词库
                    r = rocket.split('/').map(p => lookup(p) || p.trim()).join('/');
                }
                const a = agency.trim();
                const ta = dict.get(a);
                return `${r} | ${ta || a}`;
            }, ''],
        ]
    };

    /* =========================================================================
     *  三、安全区 / 属性选择器（按需调整）—— 这些区域不翻译
     * ========================================================================= */
    // 不翻译的区块：代码、编辑器、富文本等，翻译会破坏内容
    const UNSAFE_SELECTOR = 'script, style, code, pre, noscript, textarea, svg, iframe, canvas, [contenteditable="true"], .cm-editor, .monaco-editor, .ace_editor';
    // 需要翻译的属性
    const ATTR_SELECTOR = '[placeholder], [title], [aria-label], [value], [data-confirm]';

    /* =========================================================================
     *  四、运行时状态
     * ========================================================================= */
    let dict = new Map();        // 精确匹配：英文 → 中文
    let lowerDict = new Map();   // 小写匹配：英文(小写) → 中文
    let regexRules = [];         // 预编译正则规则：[RegExp, 替换串]
    let locationMap = {};        // 发射工位地点映射表

    const translatedNodes = new WeakSet();  // 已翻译节点，防抖去重

    // 高性能扁平化任务队列（用游标而非 shift，O(1) 取值）
    const textQueue = [];
    const elementQueue = [];
    let qHeadText = 0;
    let qHeadElem = 0;
    let isWorking = false;

    // React 水合回退防护：延迟二次扫描，专治 Next.js 把译文覆盖回英文
    let followUpTimer = null;
    const followUpRoots = new Set();

    /* =========================================================================
     *  五、翻译核心
     * ========================================================================= */
    function translate(text) {
        if (!text || !CONFIG.enableTranslation) return null;
        const originalTrimmed = text.trim();
        // 过滤空、超长文本（防卡死）、纯符号（不含字母）
        if (!originalTrimmed || originalTrimmed.length > 500 || !/[a-zA-Z]/.test(originalTrimmed)) return null;

        // 归一化：No Earlier Than → NET，复用现有 NET 正则规则，避免重复编写
        const normalized = originalTrimmed.replace(/\bNo\s+Earlier\s+Than\b/gi, 'NET');
        const lookupKey = normalized.replace(/\s+/g, ' ');

        // 1) 精确匹配优先：规整键 → 原始键 → 小写键
        let result = dict.get(lookupKey) || dict.get(originalTrimmed) || lowerDict.get(lookupKey.toLowerCase());
        if (result) return text.replace(originalTrimmed, result);

        // 1.5) 火箭名/机构名前缀匹配：Atlas V 551 → 宇宙神V 551（至少2词前缀）
        const parts = lookupKey.split(/\s+/);
        for (let i = parts.length - 1; i >= 2; i--) {
            const prefix = parts.slice(0, i).join(' ');
            const tp = dict.get(prefix) || lowerDict.get(prefix.toLowerCase());
            if (tp) {
                const suffix = parts.slice(i).join(' ');
                return text.replace(originalTrimmed, tp + ' ' + suffix);
            }
        }

        // 2) 命中正则触发器才跑正则，处理动态文本（时间等）
        if (CONFIG.regexTrigger.test(lookupKey)) {
            for (let i = 0; i < regexRules.length; i++) {
                const [pattern, replacement] = regexRules[i];
                if (pattern.test(normalized)) {
                    const res = normalized.replace(pattern, replacement);
                    if (res !== normalized) return text.replace(originalTrimmed, res);
                }
            }
        }
        return null;
    }

    function translateTextNode(node) {
        // 合并相邻文本节点：React 拆分 "Payloads" → "Payload" + "s"、"573rd" → "573" + "rd"
        // normalize 后变回整体，序数词 / Payloads 规则才能命中
        const raw = node.nodeValue || '';
        if (node.parentElement && (/payload/i.test(raw) || /^\d+$/.test(raw) || /^Show\s/i.test(raw))) {
            node.parentElement.normalize();
        }
        const val = node.nodeValue;
        const res = translate(val);
        if (res && res !== val) {
            node.nodeValue = res;
            translatedNodes.add(node);
        }
    }

    function translateElementAttributes(el) {
        const checkAttr = (attr) => {
            const val = el.getAttribute(attr);
            if (val) {
                const res = translate(val);
                if (res && res !== val) el.setAttribute(attr, res);
            }
        };

        if (el.tagName === 'INPUT') {
            // 按钮类翻译 value，输入框翻译 placeholder
            if (el.type === 'button' || el.type === 'submit') {
                checkAttr('value');
            } else {
                checkAttr('placeholder');
            }
        }
        ['title', 'aria-label', 'data-confirm'].forEach(checkAttr);
    }

    /* =========================================================================
     *  六、节点提取（原生 TreeWalker + C++ 选择器）
     * ========================================================================= */
    function extractNodes(root, force) {
        // 用底层 TreeWalker 极速遍历文本节点
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 不安全区直接 REJECT 砍掉整棵子树，节省海量性能
                        if (node.matches && node.matches(UNSAFE_SELECTOR)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        // 元素本身不入文本流，只进入其子节点
                        return NodeFilter.FILTER_SKIP;
                    }
                    // 安全文本节点
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let currentNode;
        while ((currentNode = walker.nextNode())) {
            // force 模式：绕过 translatedNodes 跳过，专治 React 水合把已翻译文本覆盖回英文的情况
            // 去重在 translateTextNode 内靠 res !== val 完成，不会重复写入
            if (force || !translatedNodes.has(currentNode)) {
                textQueue.push(currentNode);
            }
        }

        // 用 querySelectorAll 提取需翻译属性的元素
        if (root.nodeType === Node.ELEMENT_NODE) {
            if (root.matches && root.matches(ATTR_SELECTOR)) elementQueue.push(root);
            const attrNodes = root.querySelectorAll(ATTR_SELECTOR);
            for (let i = 0; i < attrNodes.length; i++) {
                elementQueue.push(attrNodes[i]);
            }
        }
    }

    /* =========================================================================
     *  七、核心帧循环：时间片轮转（Time Slicing），严控不阻塞主线程
     * ========================================================================= */
    function workLoop() {
        const TIME_LIMIT = 12; // 每帧最多 12ms，为浏览器绘制留时间
        const start = performance.now();

        // 1) 翻译属性
        while (qHeadElem < elementQueue.length && (performance.now() - start) < TIME_LIMIT) {
            translateElementAttributes(elementQueue[qHeadElem++]);
        }

        // 2) 翻译文本
        while (qHeadText < textQueue.length && (performance.now() - start) < TIME_LIMIT) {
            translateTextNode(textQueue[qHeadText++]);
        }

        // 3) 收尾：只移除已处理节点，保留新入队的节点（防止竞态丢节点）
        if (qHeadElem > 0) {
            elementQueue.splice(0, qHeadElem);
            qHeadElem = 0;
        }
        if (qHeadText > 0) {
            textQueue.splice(0, qHeadText);
            qHeadText = 0;
        }

        if (elementQueue.length === 0 && textQueue.length === 0) {
            isWorking = false;
        } else {
            requestAnimationFrame(workLoop);
        }
    }

    /* =========================================================================
     *  八、DOM 监听：增量翻译，适配 SPA 动态加载
     * ========================================================================= */
    const observer = new MutationObserver(mutations => {
        let shouldTrigger = false;

        for (let i = 0; i < mutations.length; i++) {
            const m = mutations[i];

            if (m.type === 'childList') {
                for (let j = 0; j < m.addedNodes.length; j++) {
                    const node = m.addedNodes[j];
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && node.matches(UNSAFE_SELECTOR)) continue;
                        extractNodes(node);
                        followUpRoots.add(node);
                        shouldTrigger = true;
                    } else if (node.nodeType === Node.TEXT_NODE) {
                        if (node.parentElement && !node.parentElement.closest(UNSAFE_SELECTOR)) {
                            textQueue.push(node);
                            shouldTrigger = true;
                        }
                    }
                }
                // 防抖延迟二次扫描：React 水合 / useEffect 可能在首轮翻译后把英文覆盖回来
                if (followUpTimer) clearTimeout(followUpTimer);
                followUpTimer = setTimeout(() => {
                    for (const root of followUpRoots) {
                        if (root.isConnected) extractNodes(root, true);
                    }
                    followUpRoots.clear();
                    if (!isWorking && (textQueue.length > 0 || elementQueue.length > 0)) {
                        isWorking = true;
                        requestAnimationFrame(workLoop);
                    }
                }, 300);
            } else if (m.type === 'characterData') {
                const node = m.target;
                // 不再依赖 translatedNodes 判断：React 水合会把已翻译文本覆盖回英文，
                // 此处当前文本仍可翻译时即重新入队（去重在 workLoop 调用 translateTextNode 时完成）
                if (node.parentElement && !node.parentElement.closest(UNSAFE_SELECTOR)) {
                    textQueue.push(node);
                    shouldTrigger = true;
                }
            } else if (m.type === 'attributes') {
                const node = m.target;
                if (!node.closest(UNSAFE_SELECTOR)) {
                    elementQueue.push(node);
                    shouldTrigger = true;
                }
            }
        }

        if (CONFIG.enableTranslation && shouldTrigger && !isWorking) {
            isWorking = true;
            requestAnimationFrame(workLoop);
        }
    });

    /* =========================================================================
     *  九、初始化：把词库解析成字典，开启首轮扫描 + 监听
     * ========================================================================= */
    function initTranslator(configData) {
        dict = new Map(Object.entries(configData.translations));
        lowerDict = new Map();
        for (let [key, value] of dict.entries()) {
            lowerDict.set(key.toLowerCase(), value);
        }
        locationMap = configData.locMap || {};
        // 机构名合并进词库，走精确匹配（不走正则/触发器）
        const agency = configData.agencyMap || {};
        for (const [k, v] of Object.entries(agency)) {
            dict.set(k, v);
            lowerDict.set(k.toLowerCase(), v);
        }
        // 火箭型号合并进词库
        const rockets = configData.rocketMap || {};
        for (const [k, v] of Object.entries(rockets)) {
            dict.set(k, v);
            lowerDict.set(k.toLowerCase(), v);
        }
        regexRules = (configData.regexRules || []).map(rule => {
            // rule[0] 若已是 RegExp 字面量（自带 flags），无显式覆盖时直接保留，避免抹掉 /i 等标志
            if (rule[0] instanceof RegExp) {
                return [rule[2] ? new RegExp(rule[0], rule[2]) : rule[0], rule[1]];
            }
            return [new RegExp(rule[0], rule[2] || ""), rule[1]];
        });

        // 首轮：打碎解析整页
        extractNodes(document.body);
        if (!isWorking && (textQueue.length > 0 || elementQueue.length > 0)) {
            isWorking = true;
            requestAnimationFrame(workLoop);
        }

        // 首轮延迟二次扫描：React 水合会在首轮翻译后覆盖回英文
        setTimeout(() => {
            extractNodes(document.body, true);
            if (!isWorking && (textQueue.length > 0 || elementQueue.length > 0)) {
                isWorking = true;
                requestAnimationFrame(workLoop);
            }
        }, 300);

        // 开启监听（仅监听关心的属性，减小开销）
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'aria-label', 'value', 'data-confirm']
        });
    }

    /* =========================================================================
     *  十、启动：内置词库立即可用 + 远程词库（可选）热更新
     * ========================================================================= */
    function launch() {
        // 1) 内置词库优先启用，确保零延迟翻译
        if (CONFIG.enableTranslation) {
            initTranslator(BUILTIN_DICT);
        }

        // 2) 远程词库（若配置）：仅当本地缓存缺版本或版本更新时刷新
        if (CONFIG.remoteDictUrl) {
            const localData = GM_getValue(CONFIG.cacheKey, null);

            GM_xmlhttpRequest({
                method: 'GET',
                url: CONFIG.remoteDictUrl + '?t=' + Date.now(),
                onload: (res) => {
                    if (res.status === 200) {
                        try {
                            const remoteData = JSON.parse(res.responseText);
                            if (!localData || remoteData.version !== localData.version) {
                                GM_setValue(CONFIG.cacheKey, remoteData);
                                console.info(`[${CONFIG.scriptName}] 词库已更新至: ${remoteData.version}`);
                                if (CONFIG.enableTranslation) {
                                    initTranslator(remoteData);
                                }
                            }
                        } catch (e) {
                            console.error(`[${CONFIG.scriptName}] 词库解析异常`, e);
                        }
                    }
                }
            });
        }

        // 3) 油猴菜单：切换翻译总开关
        GM_registerMenuCommand(`${CONFIG.enableTranslation ? '关闭' : '开启'}翻译`, () => {
            GM_setValue('enable_Translation', !CONFIG.enableTranslation);
            location.reload();
        });
    }

    // document-start 时 body 可能还没就绪，等 DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', launch);
    } else {
        launch();
    }
})();
