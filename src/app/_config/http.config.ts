export default {

    login: {url: '/admin-api/login', type: 'post'},             // 登陆
    sendCode: {url: 'sendCode', type: 'post'},                  // 发送安全吗
    menus: {url: '/admin-api/menus', type: 'post'},             // 获取右侧菜单
    online: {url: '/admin-api/system/online'},                         // 获取在线人数
    editPassword: {url: '/admin-api/admin/editPassword'},     // 修改密码
    reviewList: {url: '/admin-api/admin/reviewList'},   // 商户列表
    reviewProcess: {url: '/admin-api/admin/reviewProcess'},  // 商户列表
    getTimeNow: {url: '/admin-api/getTimeNow', type: 'post'},             // 获取时间

    /** ========================== 商户管理 ======================== */ 
    partnerList: {url: '/admin-api/partner/partnerList'},                               // 商户列表
    partnerAdd: {url: '/admin-api/partner/partnerAdd/'},                                // 商户详情
    partnerStatus: {url: '/admin-api/partner/partnerStatus/'},                          // 商户状态
    partnerDetail: {url: '/admin-api/partner/partnerDetail/'},                          // 商户详情
    partnerSetAdminMenu: {url: '/admin-api/partner/partnerSetAdminMenu/'},              // 设置菜单

    /** ========================== 商户 - 管理员 ======================== */
    partnerAdminUserList: {url: '/admin-api/partner/adminUserList'},                    // 商户管理员列表
    partnerAdminUserAdd: {url: '/admin-api/partner/adminUserAdd/'},                     // 商户管理员添加
    partnerAdminUserStatus: {url: '/admin-api/partner/adminUserStatus/'},               // 商户管理员状态
    partnerAdminUserDetail: {url: '/admin-api/partner/adminUserDetail/'},               // 商户管理员详情

    /** ========================== 商户 - 管理组 ======================== */
    partnerAdminGroupList: {url: '/admin-api/partner/adminGroupList'},                  // 商户管理组列表
    partnerAdminGroupAdd: {url: '/admin-api/partner/adminGroupAdd'},                  // 商户管理组添加
    partnerAdminGroupStatus: {url: '/admin-api/partner/adminGroupStatus/'},             // 商户管理组状态
    partnerAdminGroupSetAcl: {url: '/admin-api/partner/adminGroupSetAcl/'},             // 商户管理组详情

    /** ========================== 商户 - 域名 ======================== */
    partnerDomainList: {url: '/admin-api/partner/domainList'},                          // 商户域名列表
    partnerDomainAdd: {url: '/admin-api/partner/domainAdd/'},                           // 商户域名添加
    partnerDomainStatus: {url: '/admin-api/partner/domainStatus/'},                     // 商户域名状态

    /** ========================== 商户 - 预设菜单 ======================== */
    partnerMenuConfigList: {url: '/admin-api/partner/partnerMenuConfigList'},           // 商户预设菜单列表
    partnerMenuConfigAdd: {url: '/admin-api/partner/partnerMenuConfigAdd/'},            // 商户预设菜单添加
    partnerMenuConfigStatus: {url: '/admin-api/partner/partnerMenuConfigStatus/'},      // 商户预设菜单状态

    /** ========================== 商户 - 菜单 ======================== */
    partnerMenuList: {url: '/admin-api/partner/partnerMenuList'},                       // 商户菜单列表
    partnerMenuAdd: {url: '/admin-api/partner/partnerMenuAdd/'},                        // 商户菜单添加
    partnerMenuStatus: {url: '/admin-api/partner/partnerMenuStatus/'},                  // 商户菜单状态
    partnerMenuDel: {url: '/admin-api/partner/partnerMenuDel/'},

    /** ========================== 商户 - 管理员访问日志 ======================== */
    partnerAdminAccessLogList: {url: '/admin-api/partner/adminAccessLogList'},          // 管理员访问日志

    /** ========================== 商户 - 管理员行为日志 ======================== */
    partnerAdminBehavior: {url: '/admin-api/partner/partnerAdminBehavior'},             // 管理员行为日志


    /** ========================== 配置列表 ======================== */
    configureList: {url: '/admin-api/system/configureList'},                            // 获取配置列表
    configureAdd: {url: '/admin-api/system/configureAdd/'},                             // 新增或编辑配置
    configureStatus: {url: '/admin-api/system/configureStatus/'},                       // 更改配置状态
    configureFlush: {url: '/admin-api/system/configureFlush'},                          // 刷新配置状态
    configureDetail: {url: '/admin-api/system/configureDetail/'},                       // 配置详情

    /** ========================== 配置列表 ======================== */
    telegramList: {url: '/admin-api/system/telegramChannelList'},                       // 获取配置列表
    telegramAdd: {url: '/admin-api/system/telegramChannelAdd/'},                        // 新增或编辑配置
    telegramDel: {url: '/admin-api/system/telegramChannelDel/'},                        // 更改配置状态
    telegramGenId: {url: '/admin-api/system/telegramChannelGenId/'},    
    tgStatusChange: {url: '/admin-api/system/telegramChannelStatus/'},              // 刷新配置状态

    /** ========================== 运营管理 ======================== */
    noticeList: {url: '/admin-api/system/noticeList'}, // 公告列表
    noticeAdd: {url: '/admin-api/system/noticeAdd/'}, // 添加/编辑公告 0添加 1编辑
    noticeStatus: {url: '/admin-api/system/noticeStatus/'}, // 更改通知状态
    noticeTop: {url: '/admin-api/system/noticeTop/'}, // 公告置顶
    noticeFlush: {url: '/admin-api/system/noticeFlush'}, // 刷新通知
    playerFrozen: {url: '/admin-api/player/playerFrozen/'}, // 冻结审核
    // reviewList: {url: '/admin-api/player/reviewList'}, // 审核管理
    // reviewProcess: {url: '/admin-api/player/reviewProcess/'}, // 通过审核
    reviewDetail: {url: '/admin-api/player/reviewDetail/'}, // 审核详情
    menuList: {url: '/admin-api/partner/partnerMenuConfigList'}, // 菜单列表
    menuStatus: {url: '/admin-api/admin/menuStatus/'}, // 菜单设置
    logoImage: {url: '/admin-api/system/logoImage'}, // 获取首页logo
    qrImage: {url: '/admin-api/admin/qrImage'}, // 获取二维码
    logoDel: {url: '/admin-api/system/logoDel'}, // 删除图片
    qrCodeDel: {url: '/admin-api/admin/qrCodeDel'}, // 删除二维码
    partnerAdminNavigationList: {url: '/admin-api/admin/partnerAdminNavigationList'}, // 获取导航菜单
    partnerAdminNavigationSet: {url: '/admin-api/admin/partnerAdminNavigationSet/'}, // 添加或编辑 导航菜单
    partnerAdminNavigationDel: {url: '/admin-api/admin/partnerAdminNavigationDel/'}, // 删除导航菜单
    partnerModelList: {url: '/admin-api/admin/partnerModelList'}, // 首页配置 首页模块列表
    partnerModuleSet: {url: '/admin-api/admin/partnerModuleSet/'}, // 首页配置 首页模块 添加 编辑
    partnerModuleDel: {url: '/admin-api/admin/partnerModuleDel/'}, // 首页配置 首页模块 删除
    partnerAdminHomeModuleSet: {url: '/admin-api/admin/partnerAdminHomeModuleSet/'}, // 首页配置设置个数
    partnerAdminCacheClean: {url: '/admin-api/admin/partnerAdminCacheClean'}, // 首页配置刷新前台缓存
    partnerAdminHomeList: {url: '/admin-api/admin/partnerAdminHomeList'}, // 模块列表
    partnerAdminHomeSet: {url: '/admin-api/admin/partnerAdminHomeSet/'}, // 模块新增 编辑
    partnerGetModule: {url: '/admin-api/admin/partnerGetModule/'}, // 新增下拉
    partnerAdminHomeContentList: {url: '/admin-api/admin/partnerAdminHomeContentList/'}, // 模块列表内容
    partnerAdminHomeDel: {url: '/admin-api/admin/partnerAdminHomeDel/'}, // 删除模块
    csSet: {url: '/admin-api/admin/csSet/'}, // 设置客服
    csList: {url: '/admin-api/admin/csList'}, // 客服列表
    partnerAdminTelegram: {url: '/admin-api/admin/partnerAdminTelegram'}, // 纸飞机机器人


    /** ========================== 彩票游戏 ======================== */
    lotteryList: {url: '/admin-api/lottery/lotteryList'},             // 彩票列表
    lotteryDetail: {url: '/admin-api/lottery/lotteryDetail/'},        // 彩种详情
    lotteryStatus: {url: '/admin-api/lottery/lotteryStatus/'},        // 修改彩票状态
    lotteryPopular: {url: '/admin-api/lottery/lotteryPopular/'},      // 修改彩票热门
    lotterySet: {url: '/admin-api/lottery/lotteryInfoSet/'},
    lotteryAssign: {url: '/admin-api/lottery/lotteryAssign/'},        // 分配彩票
    lotteryFlush: {url: '/admin-api/lottery/lotteryFlush'},           // 刷新彩票

    methodList: {url: '/admin-api/lottery/methodList'},               // 玩法列表
    methodDetail: {url: '/admin-api/lottery/methodDetail/'},          // 玩法详情
    methodChangeStatus: {url: '/admin-api/lottery/methodStatus/'},    // 玩法状态修改
    methodChangePopular: {url: '/admin-api/lottery/methodPopular/'},  // 玩法流行修改
    methodSet: {url: '/admin-api/lottery/methodSet/'},                // 玩法设置

    projectList: {url: '/admin-api/lottery/projectList'},                     // 订单列表
    projectDetail: {url: '/admin-api/lottery/projectDetail/'},                // 订单详情
    projectCommission: {url: '/admin-api/lottery/projectCommission/'},        // 返点
    projectAccountChange: {url: '/admin-api/lottery/projectAccountChange/'},  // 帐变
    projectCancel: {url: '/admin-api/lottery/cancelProject/'},                // 撤单

    issueList: {url: '/admin-api/lottery/issueList'},                         // 奖期列表
    issueGen: {url: '/admin-api/lottery/issueGen'},                           // 奖期列表
    issueDel: {url: '/admin-api/lottery/issueDel'},                           // 奖期列表
    issueEncode: {url: '/admin-api/lottery/issueEncode/'},                    // 奖期录号
    issueCancel: {url: '/admin-api/lottery/issueCancel/'},                    // 奖期撤单
    issueOpen: {url: '/admin-api/lottery/issueOpen/'},                        // 奖期开奖
    issueSend: {url: '/admin-api/lottery/issueSend/'},                        // 奖期派将
    issueTrace: {url: '/admin-api/lottery/issueTrace/'},                      // 奖期追号
    issueCommission: {url: '/admin-api/lottery/issueCommission/'},            // 奖期返点

    issueRuleList: {url: '/admin-api/lottery/issueRuleList'},                 // 奖期规则
    issueRuleDetail: {url: '/admin-api/lottery/issueRuleDetail'},             // 奖期规则 详情
    issueRuleAdd: {url: '/admin-api/lottery/issueRuleAdd/'},                  // 奖期规则 添加
    issueRuleDel: {url: '/admin-api/lottery/issueRuleDel/'},                  // 奖期规则 删除

    traceList: {url: '/admin-api/lottery/traceList'},                         // 追号列表
    traceDetail: {url: '/admin-api/lottery/traceDetail/'},                    // 追号详情
    traceCancel: {url: '/admin-api/lottery/cancelTrace/'},                    // 追号撤销
    traceDetailCancel: {url: '/admin-api/lottery/cancelTraceDetail/'},        // 追号详情撤销

    commissionList: {url: '/admin-api/lottery/commissionList'},               // 返点列表

    projectHistoryList: {url: '/admin-api/lottery/projectHistoryList'},       // 投注历史订单列表
    projectHistoryDetail: {url: '/admin-api/lottery/projectHistoryDetail/'},  // 投注历史订单详情
    traceHistoryList: {url: '/admin-api/lottery/traceHistoryList'},           // 追号历史订单列表
    traceHistoryDetail: {url: '/admin-api/lottery/traceHistoryDetail/'},      // 追号历史订单详情
    issueDetail: {url: '/admin-api/lottery/issueDetail'},      // 追号历史订单详情

    rateOpen: {url: '/admin-api/partner/rateOpen'},      // 控水

    /** ========================== 日志管理 ======================== */
    accessLogList: {url: '/admin-api/admin/accessLogList'}, // 管理-访问日志
    adminUserBehaviorList: {url: '/admin-api/admin/adminUserBehaviorList'}, // 管理-行为日志
    userIpLogList: {url: '/admin-api/player/userIpLogList'}, // 玩家-IP日志
    userIp: {url: '/admin-api/player/userIp'}, // 玩家-IP日志
    userPlayerLogList: {url: '/admin-api/player/userPlayerLogList'}, // 玩家-访问日志
    userPlayerDetail: {url: '/admin-api/player/userPlayerDetail'}, // 玩家-访问日志

    /** ========================== 娱乐城 ======================== */
    getPlatType: {url: '/admin-api/casino/getPlatType'}, // 平台列表
    getGameList: {url: '/admin-api/casino/getGameList'}, // 玩法列表
    getApiLog: {url: '/admin-api/casino/getApiLog'}, // 接口日志
    getTransfer: {url: '/admin-api/casino/getTransfer'}, // 转账记录
    setHomeGame: {url: '/admin-api/casino/setHomeGame'}, // 设置首页显示游戏
    setHomePlat: {url: '/admin-api/casino/setHomePlat'}, // 设置首页游戏显示类型
    callGameList: {url: '/admin-api/casino/callGameList'}, // 数据同步
    seriesLists: {url: '/admin-api/casino/seriesLists'}, // 数据同步
    getBetLog: {url: '/admin-api/casino/getBetLog'}, // 注单列表

    /** ========================== 后台管理 ======================== */
    adminUserList: {url: '/admin-api/admin/adminUserList'},             // 管理员列表
    adminUserAdd: {url: '/admin-api/admin/adminUserAdd'},              // 管理员添加
    adminUserStatus: {url: '/admin-api/admin/adminUserStatus/'},        // 管理员状态
    adminUserDetail: {url: '/admin-api/admin/adminUserDetail/'},        // 管理员详情
    adminUserPassword: {url: '/admin-api/admin/adminUserPassword/'},    // 管理员密码

    adminGroupList: {url: '/admin-api/admin/adminGroupList'},           // 获取商户管理组列表
    adminGroupDetail: {url: '/admin-api/admin/adminGroupDetail/'},      // 获取商户管理组列表
    adminGroupAdd: {url: '/admin-api/admin/adminGroupAdd/'},            // 创建管理组
    adminGroupStatus: {url: '/admin-api/admin/adminGroupStatus/'},      // 创建管理组
    adminGroupDel: {url: '/admin-api/admin/adminGroupDel/'},            // 删除

    adminGroupAcl: {url: '/admin-api/partner/adminGroupAcl/'},          // 查看管理组权限

    adminBehaviorList: {url: '/admin-api/admin/adminBehaviorList'},     // 管理员行为日志
    // adminLogList: {url: '/admin-api/admin/adminLogList'},               // 管理员日志

    adminMenuList: {url: '/admin-api/admin/adminMenuList'},             // 管理端 菜单列表
    adminMenuDetail: {url: '/admin-api/admin/adminMenuDetail/'},        // 管理端 菜单详情
    adminMenuAdd: {url: '/admin-api/admin/adminMenuAdd/'},              // 管理端 菜单添加

  /** ========================== 玩家管理 ======================== */
    playerList: {url: '/admin-api/player/playerList'},                        // 玩家列表
    playerDetail: {url: '/admin-api/player/playerDetail/'},                         // 玩家详情
    playerStatus: {url: '/admin-api/player/playerStatus/'},                   // 设置玩家状态
    playerCardList: {url: '/admin-api/player/cardList'},                      // _银行卡列表
    playerCardDetail: {url: '/admin-api/player/cardDetail/'},                  // _银行卡详情
    salaryReportList: {url: '/admin-api/player/salaryReportList'},            // 日工资
    dividendReportList: {url: '/admin-api/player/dividendReportList'},        // 分红
    // accountChangeList: {url: '/admin-api/account/accountChangeReportList'},
    accountChangeDetail: {url: '/admin-api/account/accountChangeReportDetail/'},

    /** ========================== 财务管理 ======================== */
    paymentTypeList: {url: '/admin-api/finance/channelType/list'},        // 支付类型 列表
    paymentTypeAdd: {url: '/admin-api/finance/channelType/create/'},      // 支付类型 添加
    paymentTypeEdit: {url: '/admin-api/finance/channelType/create/'},     // 支付类型 编辑
    paymentTypeDel: {url: '/admin-api/finance/channelType/delete'},       // 支付类型 删除

    platformList: {url: '/admin-api/finance/platform/list'},    // 支付厂商 列表
    platformAdd: {url: '/admin-api/finance/platform/create'},    // 支付厂商 添加
    platformEdit: {url: '/admin-api/finance/platform/edit'},    // 支付厂商 编辑
    platformDel: {url: '/admin-api/finance/platform/delete'},    // 支付厂商 删除
    withdrawCheckProcess: {url: '/admin-api/finance/withdrawCheckProcess'}, // 审核处理

    platformAccountChannelList: {url: '/admin-api/finance/platformAccountChannel/list'},    // 支付厂商开放渠道 列表
    platformAccountChannelAdd: {url: '/admin-api/finance/platformAccountChannel/create'},    // 支付厂商开放渠道 添加
    platformAccountChannelEdit: {url: '/admin-api/finance/platformAccountChannel/edit'},    // 支付厂商开放渠道 编辑
    platformAccountChannelDel: {url: '/admin-api/finance/platformAccountChannel/delete'},    // 支付厂商开放渠道 删除
    platformAccountChannelStatus: {url: '/admin-api/finance/platformAccountChannel/editStatus'},    // 支付厂商开放渠道 修改状态

    platformAccountList: {url: '/admin-api/finance/platformAccount/list'},    // 支付账户 列表
    platformAccountAdd: {url: '/admin-api/finance/platformAccount/create/'},    // 支付账户 添加
    platformAccountEdit: {url: '/admin-api/finance/platformAccount/edit'},    // 支付账户 编辑
    platformAccountDel: {url: '/admin-api/finance/platformAccount/delete'},    // 支付账户 删除
    platformAccountStatus: {url: '/admin-api/finance/platformAccount/editStatus'},    // 支付账户 修改状态
    platformAccountForeignChannel: {url: '/admin-api/finance/platformAccount/foreign_channel'},    // 支付账户 支付渠道

    platformChannelList: {url: '/admin-api/finance/platformChannel/list'},    // 支付账户开放渠道 列表
    platformChannelAdd: {url: '/admin-api/finance/platformChannel/create'},    // 支付账户开放渠道 添加
    platformChannelEdit: {url: '/admin-api/finance/platformChannel/edit'},    // 支付账户开放渠道 编辑
    platformChannelDel: {url: '/admin-api/finance/platformChannel/delete'},    // 支付账户开放渠道 删除
    platformChannelStatus: {url: '/admin-api/finance/platformChannel/editStatus'},    // 支付账户开放渠道 修改状态

    rechargeList: {url: '/admin-api/finance/rechargeList'},                 // 充值列表
    rechargeLogList: {url: '/admin-api/finance/rechargeLogList'},                 // 充值列表
    rechargeLogDetail: {url: '/admin-api/finance/rechargeLog/'},      // 充值日志
    rechargeHand: {url: '/admin-api/finance/rechargeHand/'},                // 人工充值
    rechargeExport: {url: '/admin-api/finance/rechargeExport'},             // 导出充值列表

    withdrawList: {url: '/admin-api/finance/withdrawList'},                 // 提现列表
    withdrawHand: {url: '/admin-api/finance/withdrawHand/'},                // 人工审核
    withdrawExport: {url: '/admin-api/withdrawExport'},                     // 导出提现数据
    withdrawLogDetail: {url: '/admin-api/withdrawLogDetail/'},              // 提现日志

    updateForeignChannel: {url: '/admin-api/finance/platformAccount/updateForeignChannel/'}, // 更新支付渠道
    foreign_channel: {url: '/admin-api/finance/platformAccount/foreign_channel'}, // 获取支付渠道

    withdrawLogList: {url: '/admin-api/finance/withdrawLogList'},

    viewWithdrawList: {url: '/admin-api/finance/viewWithdrawList'},
    withdrawPassedList: {url: '/admin-api/finance/withdrawPassedList'},
    /** ========================== 活动信息管理 ======================== */
    activityList: {url: '/admin-api/activityList'},             // 列表
    activityAdd: {url: '/admin-api/activityAdd/'},              // 添加
    activityDel: {url: '/admin-api/activityDel'},               // 删除

    /** ========================== 活动奖品管理 ======================== */
    // 列表
    activityPrizeList: {url: '/admin-api/activity-prize/index'},
    // 奖品列表
    activityPrizeGetList: {url: '/admin-api/activity-prize/all', type: 'get'},
    // 添加
    activityPrizeAdd: {url: '/admin-api/activity-prize/add'},
    // 编辑
    activityPrizeEdit: {url: '/admin-api/activity-prize/edit'},
    // 删除
    activityPrizeDel: {url: '/admin-api/activity-prize/del'},
    /** ========================== 活动规则管理 ======================== */
    // 列表
    activityRuleList: {url: '/admin-api/activity-rule/index'},
    // 规则列表
    activityRuleGetList: {url: '/admin-api/activity-rule/getRule'},
    // 添加
    activityRuleAdd: {url: '/admin-api/activity/ruleSet/'},
    // 编辑
    activityRuleEdit: {url: '/admin-api/activity/ruleSet/'},
    // 删除
    activityRuleDel: {url: '/admin-api/activity/ruleDel/'},

    /** ========================== 报表管理 ======================== */

    partnerReportDayList: {url: '/admin-api/report/partnerDayList'},          // 商户日结算
    playerReportDayList: {url: '/admin-api/report/statUserDayList'},          // 用户日结算
    playerReportDayCheck: {url: '/admin-api/report/playerReportDayCheck/'},   // 用户日结算 审核
    playerReportList: {url: '/admin-api/report/statUserList'},                // 用户总结算
    lotteryReportDayList: {url: '/admin-api/report/lotteryDayList'},          // 彩种日结算
    salaryLists: {url: '/admin-api/report/salaryLists'},          // 彩种日结算
    dividendList: {url: '/admin-api/report/dividendList'},          // 彩种日结算
    /** ========================== 帐变列表 ======================== */
    // 帐变列表

    accountChangeHistoryList: {url: '/admin-api/account/accountChangeReportHistoryList'},
    backupChangeHistoryDetail: {url: '/admin-api/backup/accountChangeProjectDetail/'},

    /** ========================== 帮助中心 ======================== */
    helpMenu: {url: '/admin-api/system/helpMenu'}, // 帮助中心菜单
    helpMenuAdd: {url: '/admin-api/system/helpMenuAdd'}, // 添加帮助中心分类
    helpMenuList: {url: '/admin-api/system/helpMenuList'}, // 帮助中心内容
    addHelpContent: {url: '/admin-api/system/addHelpContent/'}, // 添加帮助内容
    helpMenuDel: {url: '/admin-api/system/helpMenuDel/'}, // 删除帮助内容
    helpUpLoadImg: {url: '/admin-api/system/helpUpLoadImg/'}, // 帮助中心图片上传
    editHelp: {url: '/admin-api/system/editHelp/'}, // 修改帮助内容
    contentDel: {url: '/admin-api/system/contentDel/'}, // 删除
    helpImgDel: {url: '/admin-api/system/helpImgDel'},// 图片删除

    /** ========================== 开发管理 ======================== */
    accountChangeTypeList: {url: '/admin-api/account/accountChangeTypeList'},
    flushCacheAccountChange: {url: '/admin-api/account/accountChangeTypeFlush'},

    checkNoticeDetail: {url: '/admin-api/system/noticeDetail/'},
    accountChangeTypeDetail: {url: '/admin-api/account/accountChangeTypeDetail/'},

    // 模版列表
    // modelList: {url: '/admin-api/template/getTemplateList'},
    // modelDetail: {url: '/admin-api/template/getTemplateModule'},
    // modelSubmit: {url: '/admin-api/template/setTemplateModule'},


    /** ========================== 历史数据 ======================== */
    accountChangeReportHistoryList: {url: '/admin-api/backup/funcChange'},
    accountChangeReportHistoryDetail: {url: '/admin-api/account/accountChangeReportHistoryDetail'},
    playerCommission: {url: '/admin-api/backup/playerCommission'},
    partnerBehavior: {url: '/admin-api/backup/partnerBehavior'},
    playerProject: {url: '/admin-api/backup/playerProject'},

    rechargeLog: {url: '/admin-api/rechargeLog/'}, // 充值日志
};
