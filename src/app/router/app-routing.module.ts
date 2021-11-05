import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../views/home/home.component';
import { LoginComponent } from '../views/login/login.component';

// 侧边菜单 管理员
import { AdminUserComponent } from '../views/home/admin/admin-user/admin-user.component';
import { AdminGroupComponent } from '../views/home/admin/admin-group/admin-group.component';
import { BehaviorListComponent } from '../views/home/admin/behavior-list/behavior-list.component';
import { AdminLogComponent } from '../views/home/admin/admin-log/admin-log.component';

// 侧边菜单 活动管理
import { ActivityListComponent } from '../views/home/activity/activity-list/activity-list.component';
import { ActivityGiftComponent } from '../views/home/activity/activity-gift/activity-gift.component';

// 侧边菜单 系统管理
import { ConfigureComponent } from '../views/home/system/configure/configure.component';
import { MenuListComponent } from '../views/home/admin/menu-list/menu-list.component';
import { NoticeListComponent } from '../views/home/system/notice-list/notice-list.component';
import { TelegramListComponent } from '../views/home/system/telegram-list/telegram-list.component';
import { ReviewListComponent } from '../views/home/system/review-list/review-list.component';
// 侧边菜单 游戏管理
import { IssueListComponent } from '../views/home/lottery/issue-list/issue-list.component';
import { LotteryListComponent } from '../views/home/lottery/lottery-list/lottery-list.component';
import { IssueRuleListComponent } from '../views/home/lottery/issue-rule-list/issue-rule-list.component';
import { MethodListComponent } from '../views/home/lottery/method-list/method-list.component';
import { ProjectListComponent } from '../views/home/lottery/project-list/project-list.component';
import { TraceListComponent } from '../views/home/lottery/trace-list/trace-list.component';

// 侧边菜单 玩家管理
import { PlayerListComponent } from '../views/home/player/player-list/player-list.component';
import { PlayerCardListComponent } from '../views/home/player/player-card-list/player-card-list.component';
import { SalaryReportListComponent } from '../views/home/player/salary-report-list/salary-report-list.component';
import { DividendReportListComponent } from '../views/home/player/dividend-report-list/dividend-report-list.component';

// 侧边菜单 充提管理
import { FinanceRechargeListComponent } from '../views/home/finance/finance-recharge-list/finance-recharge-list.component';
import { FinanceRechargeLogListComponent } from '../views/home/finance/finance-recharge-log-list/finance-recharge-log-list.component';
import { FinanceWithdrawListComponent } from '../views/home/finance/finance-withdraw-list/finance-withdraw-list.component';
import { FinanceWithdrawLogListComponent } from '../views/home/finance/finance-withdraw-log-list/finance-withdraw-log-list.component';

// 账户管理
import { AccountTypeListComponent } from '../views/home/account/account-type-list/account-type-list.component';
import { AccountReportListComponent } from '../views/home/account/account-report-list/account-report-list.component';
import { AccountReportHistoryListComponent } from '../views/home/account/account-report-history-list/account-report-history-list.component';

// 侧边菜单 报表管理
import { ReportStatUserDayComponent } from '../views/home/report/report-stat-user-day-list/report-stat-user-day.component';
import { ReportStatUserListComponent } from '../views/home/report/report-stat-user-list/report-stat-user-list.component';
import { ReportLotteryDayListComponent} from '../views/home/report/report-lottery-day-list/report-lottery-day-list.component';
import { ReportStatPartnerListComponent } from '../views/home/report/report-stat-partner-list/report-stat-partner-list.component';


// 侧边菜单 历史数据
import { ProjectHistoryLisComponent } from '../views/home/history/project-history-lis/project-history-lis.component';
import { TraceHistoryListComponent } from '../views/home/history/trace-history-list/trace-history-list.component';

// 商户
import { PartnerListComponent } from '../views/home/partner/partner-list/partner-list.component';
import { PartnerAdminUserComponent } from '../views/home/partner/partner-admin-user/partner-admin-user.component';
import { PartnerAdminGroupComponent } from '../views/home/partner/partner-admin-group/partner-admin-group.component';
import { PartnerAccessLogComponent } from '../views/home/partner/partner-access-log/partner-access-log.component';
import { DomainListComponent } from '../views/home/partner/domain-list/domain-list.component';
import { PartnerMenuComponent } from '../views/home/partner/partner-menu/partner-menu.component';
import { PartnerMenuConfigComponent } from '../views/home/partner/partner-menu-config/partner-menu-config.component';
import { PartnerAdminBehaviorComponent } from '../views/home/partner/partner-admin-behavior/partner-admin-behavior.component';
import { FinancePayChannelComponent } from '../views/home/finance/finance-pay-channel/finance-pay-channel.component';
import { FinancePayAccountComponent } from '../views/home/finance/finance-pay-account/finance-pay-account.component';
import { FinancePayTypeComponent } from '../views/home/finance/finance-pay-type/finance-pay-type.component';
import { FinancePlatformChannelComponent } from '../views/home/finance/finance-platform-channel/finance-platform-channel.component';
import { FinancePlatformAccountComponent } from '../views/home/finance/finance-platform-account/finance-platform-account.component';
import { FinanceWithdrawRiskComponent } from '../views/home/finance/finance-withdraw-risk/finance-withdraw-risk.component';
import { FinanceWithdrawFinanceComponent } from '../views/home/finance/finance-withdraw-finance/finance-withdraw-finance.component';
import { FinanceWithdrawBypersonComponent } from '../views/home/finance/finance-withdraw-byperson/finance-withdraw-byperson.component';
import { ReportAgentBonusComponent } from '../views/home/report/report-agent-bonus/report-agent-bonus.component';
import { ReportAgentSalaryComponent } from '../views/home/report/report-agent-salary/report-agent-salary.component';
import { HistoryBetListComponent } from '../views/home/history/history-bet-list/history-bet-list.component';
import { HistoryTraceListComponent } from '../views/home/history/history-trace-list/history-trace-list.component';
import { HistoryMoneyChangeListComponent } from '../views/home/history/history-money-change-list/history-money-change-list.component';
import {
  HistoryPartnerBehaviorListComponent
} from '../views/home/history/history-partner-behavior-list/history-partner-behavior-list.component';
import {
  HistoryPlayerBehaviorListComponent
} from '../views/home/history/history-player-behavior-list/history-player-behavior-list.component';
import { HistoryPlayerIpListComponent } from '../views/home/history/history-player-ip-list/history-player-ip-list.component';
import {
 HistoryPlayerCommissionListComponent
} from '../views/home/history/history-player-commission-list/history-player-commission-list.component';
import { HistoryIssuesListComponent } from '../views/home/history/history-issues-list/history-issues-list.component';
import { SystemModelListComponent } from '../views/home/system/system-model-list/system-model-list.component';
import { PartnerConfigureListComponent } from '../views/home/partner/partner-configure-list/partner-configure-list.component';
import {
  ReportStatPartnerAddListComponent
} from '../views/home/report/report-stat-partner-add-list/report-stat-partner-add-list.component';
import { HistoryPartnerBehaviorComponent } from '../views/home/history/history-partner-behavior/history-partner-behavior.component';
import { JackpotIssueListComponent } from '../views/home/lottery/jackpot-issue-list/jackpot-issue-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'login' },
    children: [
      // 活动管理
      { path: 'activity/list',                              component: ActivityListComponent, data: { keep: true} },
      { path: 'activity/gift-list',                         component: ActivityGiftComponent, data: { keep: true} },

      // 管理
      { path: 'admin/admin-user-list',                      component: AdminUserComponent, data: { keep: true } },
      { path: 'admin/admin-group-list',                     component: AdminGroupComponent, data: { keep: true } },
      { path: 'admin/admin-log-list',                       component: AdminLogComponent, data: { keep: true } },
      { path: 'admin/behavior-list',                        component: BehaviorListComponent, data: { keep: true } },
      { path: 'admin/menu-list',                            component: MenuListComponent, data: { keep: true} },


      // 系统管理
      { path: 'system/notice-list',                         component: NoticeListComponent, data: { keep: true } },
      { path: 'system/configure-list',                      component: ConfigureComponent, data: { keep: true } },
      { path: 'system/telegram-list',                       component: TelegramListComponent, data: { keep: true } },
      { path: 'system/merchants-config',                    component: SystemModelListComponent, data: { keep: true } },
      { path: 'system/review-list',                         component: ReviewListComponent, data: { keep: true } },

      // 商户管理
      { path: 'partner/partner-list',                       component: PartnerListComponent, data: { keep: true } },
      { path: 'partner/admin-user-list',                    component: PartnerAdminUserComponent, data: { keep: true } },
      { path: 'partner/admin-group-list',                   component: PartnerAdminGroupComponent, data: { keep: true } },
      { path: 'partner/partner-access-log',                 component: PartnerAccessLogComponent, data: { keep: true } },
      { path: 'partner/partner-admin-behavior',             component: PartnerAdminBehaviorComponent, data: { keep: true } },
      { path: 'partner/domain-list',                        component: DomainListComponent, data: { keep: true } },
      { path: 'partner/partner-menu-list',                  component: PartnerMenuComponent, data: { keep: true } },
      { path: 'partner/partner-menu-config-list',           component: PartnerMenuConfigComponent, data: { keep: true } },
      { path: 'partner/partner-config-list',                component: PartnerConfigureListComponent, data: { keep: true } },

      // 游戏管理
      { path: 'lottery/lottery-list',                       component: LotteryListComponent, data: { keep: true } },
      { path: 'lottery/method-list',                        component: MethodListComponent, data: { keep: true } },
      { path: 'lottery/issue-list',                         component: IssueListComponent, data: { keep: true } },
      { path: 'lottery/issue-rule-list',                    component: IssueRuleListComponent, data: { keep: true } },
      { path: 'lottery/trace-list',                         component: TraceListComponent, data: { keep: true } },
      { path: 'lottery/project-list',                       component: ProjectListComponent, data: { keep: true } },
      { path: 'lottery/jackpot-issue-list',                 component: JackpotIssueListComponent, data: { keep: true } },

      // 玩家
      { path: 'player/player-list',                         component: PlayerListComponent, data: { keep: true } },
      { path: 'player/player-card-list',                    component: PlayerCardListComponent, data: { keep: true } },
      { path: 'player/salary-report-list',                  component: SalaryReportListComponent, data: { keep: true } },
      { path: 'player/dividend-report-list',                component: DividendReportListComponent, data: { keep: true } },
      { path: 'account/account-report-list',                component: AccountReportListComponent, data: { keep: true } },

      // 充提
      { path: 'finance/recharge-list',                      component: FinanceRechargeListComponent, data: { keep: true } },
      { path: 'finance/recharge-log-list',                  component: FinanceRechargeLogListComponent, data: { keep: true } },
      { path: 'finance/withdraw-list',                      component: FinanceWithdrawListComponent, data: { keep: true } },
      { path: 'finance/withdraw-log-list',                  component: FinanceWithdrawLogListComponent, data: { keep: true } },
      { path: 'finance/platform/list',                      component: FinancePayChannelComponent, data: { keep: true } },
      { path: 'finance/platformAccount/list',               component: FinancePayAccountComponent, data: { keep: true } },
      { path: 'finance/channelType/list',                   component: FinancePayTypeComponent, data: { keep: true } },
      { path: 'finance/platformChannel/list',               component: FinancePlatformChannelComponent, data: { keep: true } },
      { path: 'finance/platformAccountChannel/list',        component: FinancePlatformAccountComponent, data: { keep: true } },
      { path: 'finance/viewWithdrawList',                   component: FinanceWithdrawRiskComponent, data: { keep: true } },
      { path: 'finance/withdrawPassedList',                 component: FinanceWithdrawFinanceComponent, data: { keep: true } },
      { path: 'finance/viewWithdrawHandList',               component: FinanceWithdrawBypersonComponent, data: { keep: true } },

      // 账户菜单
      { path: 'account/type-list',                          component: AccountTypeListComponent, data: { keep: true } },

      { path: 'account/report-history-list',                component: AccountReportHistoryListComponent, data: { keep: true } },

      // 报表
      { path: 'report/stat-user-day-list',                  component: ReportStatUserDayComponent, data: { keep: true } },
      { path: 'report/stat-user-list',                      component: ReportStatUserListComponent, data: { keep: true } },
      { path: 'report/lottery-day-list',                    component: ReportLotteryDayListComponent, data: { keep: true } },
      { path: 'report/stat-partner-day-list',               component: ReportStatPartnerListComponent, data: { keep: true } },
      { path: 'report/salary-list',                         component: ReportAgentSalaryComponent, data: { keep: true } },
      { path: 'report/dividend-list',                       component: ReportAgentBonusComponent, data: { keep: true } },
      { path: 'report/stat-partner-list',                   component: ReportStatPartnerAddListComponent, data: { keep: true } },

      // 历史记录
      { path: 'history/project-history-list',               component: ProjectHistoryLisComponent, data: { keep: true } },
      { path: 'history/trace-history-list',                 component: TraceHistoryListComponent, data: { keep: true } },

      { path: 'backup/player-project',                   component: HistoryBetListComponent, data: { keep: true } },
      { path: 'backup/player-trace',                     component: HistoryTraceListComponent, data: { keep: true } },
      { path: 'backup/func-change',                      component: HistoryMoneyChangeListComponent, data: { keep: true } },
      { path: 'backup/partner-visit',                    component: HistoryPartnerBehaviorListComponent, data: { keep: true } },
      { path: 'backup/partner-behavior',                  component: HistoryPartnerBehaviorComponent, data: { keep: true } },

      { path: 'backup/player-visit',                     component: HistoryPlayerBehaviorListComponent, data: { keep: true } },
      { path: 'backup/player-ip',                        component: HistoryPlayerIpListComponent, data: { keep: true } },
      { path: 'backup/player-commission',                component: HistoryPlayerCommissionListComponent, data: { keep: true } },
      { path: 'backup/issues-list',                      component: HistoryIssuesListComponent, data: { keep: true } },
    ]
  },
  { path: 'login', component: LoginComponent, data: { animation: 'home' } },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
