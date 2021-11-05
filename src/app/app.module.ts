import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouteReuseStrategy } from '@angular/router';
import { AppReuseStrategy } from './app-reuse-strategy/app-reuse-strategy';
// import { NgxNeditorModule } from '@notadd/ngx-neditor';
import { AppRoutingModule } from './router/app-routing.module';
import { UEditorModule } from 'ngx-ueditor';
import { AuthHttpInterceptor } from './api/auth-http.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { ServiceService } from './service/service.service';
import { MyInterceptor } from './Interceptor/Interceptor';
import { BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import { HomeComponent } from './views/home/home.component';

// 管理模块
import { BehaviorListComponent } from './views/home/admin/behavior-list/behavior-list.component';
import { AdminUserComponent } from './views/home/admin/admin-user/admin-user.component';
import { AdminGroupComponent } from './views/home/admin/admin-group/admin-group.component';
import { AdminLogComponent } from './views/home/admin/admin-log/admin-log.component';

// 系统
import { MenuListComponent } from './views/home/admin/menu-list/menu-list.component';
import { ConfigureComponent } from './views/home/system/configure/configure.component';
import { NoticeListComponent } from './views/home/system/notice-list/notice-list.component';
import { TelegramListComponent } from './views/home/system/telegram-list/telegram-list.component';

// 游戏模块
import { IssueListComponent } from './views/home/lottery/issue-list/issue-list.component';
import { LotteryListComponent } from './views/home/lottery/lottery-list/lottery-list.component';
import { IssueRuleListComponent } from './views/home/lottery/issue-rule-list/issue-rule-list.component';
import { MethodListComponent } from './views/home/lottery/method-list/method-list.component';
import { ProjectListComponent } from './views/home/lottery/project-list/project-list.component';
import { TraceListComponent } from './views/home/lottery/trace-list/trace-list.component';
import { ReviewListComponent } from './views/home/system/review-list/review-list.component';

// 活动
import { ActivityListComponent } from './views/home/activity/activity-list/activity-list.component';
import { ActivityGiftComponent } from './views/home/activity/activity-gift/activity-gift.component';

// 玩家
import { PlayerListComponent } from './views/home/player/player-list/player-list.component';
import { PlayerCardListComponent } from './views/home/player/player-card-list/player-card-list.component';
import { SalaryReportListComponent } from './views/home/player/salary-report-list/salary-report-list.component';
import { DividendReportListComponent } from './views/home/player/dividend-report-list/dividend-report-list.component';


// 帐户
import { AccountTypeListComponent } from './views/home/account/account-type-list/account-type-list.component';
import { AccountReportListComponent } from './views/home/account/account-report-list/account-report-list.component';
import { AccountReportHistoryListComponent } from './views/home/account/account-report-history-list/account-report-history-list.component';

// 报表
import { ReportStatUserDayComponent } from './views/home/report/report-stat-user-day-list/report-stat-user-day.component';
import { ReportStatUserListComponent } from './views/home/report/report-stat-user-list/report-stat-user-list.component';
import { ReportLotteryDayListComponent} from './views/home/report/report-lottery-day-list/report-lottery-day-list.component';
import { ReportStatPartnerListComponent} from './views/home/report/report-stat-partner-list/report-stat-partner-list.component';

// 财务
import { FinanceRechargeListComponent } from './views/home/finance/finance-recharge-list/finance-recharge-list.component';
import { FinanceRechargeLogListComponent } from './views/home/finance/finance-recharge-log-list/finance-recharge-log-list.component';
import { FinanceWithdrawListComponent } from './views/home/finance/finance-withdraw-list/finance-withdraw-list.component';
import { FinanceWithdrawLogListComponent } from './views/home/finance/finance-withdraw-log-list/finance-withdraw-log-list.component';

// 备份
import { ProjectHistoryLisComponent } from './views/home/history/project-history-lis/project-history-lis.component';
import { TraceHistoryListComponent } from './views/home/history/trace-history-list/trace-history-list.component';

// 商户
import { PartnerListComponent } from './views/home/partner/partner-list/partner-list.component';
import { PartnerAdminUserComponent } from './views/home/partner/partner-admin-user/partner-admin-user.component';
import { PartnerAdminGroupComponent } from './views/home/partner/partner-admin-group/partner-admin-group.component';
import { PartnerAccessLogComponent } from './views/home/partner/partner-access-log/partner-access-log.component';
import { PartnerAdminBehaviorComponent } from './views/home/partner/partner-admin-behavior/partner-admin-behavior.component';
import { DomainListComponent } from './views/home/partner/domain-list/domain-list.component';
import { PartnerMenuComponent } from './views/home/partner/partner-menu/partner-menu.component';
import { PartnerMenuConfigComponent} from './views/home/partner/partner-menu-config/partner-menu-config.component';

// 管道
import { PipesModule } from './pipes/pipes.module';
import { FinancePayChannelComponent } from './views/home/finance/finance-pay-channel/finance-pay-channel.component';
import { FinancePayAccountComponent } from './views/home/finance/finance-pay-account/finance-pay-account.component';
import { FinancePayTypeComponent } from './views/home/finance/finance-pay-type/finance-pay-type.component';
import { FinancePlatformChannelComponent } from './views/home/finance/finance-platform-channel/finance-platform-channel.component';
import { FinancePlatformAccountComponent } from './views/home/finance/finance-platform-account/finance-platform-account.component';
import { FinanceWithdrawRiskComponent } from './views/home/finance/finance-withdraw-risk/finance-withdraw-risk.component';
import { FinanceWithdrawFinanceComponent } from './views/home/finance/finance-withdraw-finance/finance-withdraw-finance.component';
import { FinanceWithdrawBypersonComponent } from './views/home/finance/finance-withdraw-byperson/finance-withdraw-byperson.component';
import { ReportAgentSalaryComponent } from './views/home/report/report-agent-salary/report-agent-salary.component';
import { ReportAgentBonusComponent } from './views/home/report/report-agent-bonus/report-agent-bonus.component';
import { HistoryBetListComponent } from './views/home/history/history-bet-list/history-bet-list.component';
import { HistoryTraceListComponent } from './views/home/history/history-trace-list/history-trace-list.component';
import { HistoryMoneyChangeListComponent } from './views/home/history/history-money-change-list/history-money-change-list.component';
import { HistoryPartnerBehaviorListComponent } from './views/home/history/history-partner-behavior-list/history-partner-behavior-list.component';
import { HistoryPlayerBehaviorListComponent } from './views/home/history/history-player-behavior-list/history-player-behavior-list.component';
import { HistoryPlayerIpListComponent } from './views/home/history/history-player-ip-list/history-player-ip-list.component';
import { HistoryPlayerCommissionListComponent } from './views/home/history/history-player-commission-list/history-player-commission-list.component';
import { HistoryIssuesListComponent } from './views/home/history/history-issues-list/history-issues-list.component';
import { SystemModelListComponent } from './views/home/system/system-model-list/system-model-list.component';
import { HistoryPartnerBehaviorComponent } from './views/home/history/history-partner-behavior/history-partner-behavior.component';
import { PartnerConfigureListComponent } from './views/home/partner/partner-configure-list/partner-configure-list.component';
import { ReportStatPartnerAddListComponent } from './views/home/report/report-stat-partner-add-list/report-stat-partner-add-list.component';
import { JackpotIssueListComponent } from './views/home/lottery/jackpot-issue-list/jackpot-issue-list.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BreadcrumbComponent,

    // 系统
    MenuListComponent,
    ConfigureComponent,
    NoticeListComponent,
    TelegramListComponent,
    ReviewListComponent,

    // 管理
    BehaviorListComponent,
    AdminUserComponent,
    AdminGroupComponent,
    AdminLogComponent,

    // 活动
    ActivityListComponent,
    ActivityGiftComponent,

    // 游戏
    LotteryListComponent,
    IssueListComponent,
    IssueRuleListComponent,
    MethodListComponent,
    ProjectListComponent,
    TraceListComponent,

    // 玩家
    PlayerListComponent,
    PlayerCardListComponent,
    SalaryReportListComponent,
    DividendReportListComponent,

    // 账户
    AccountTypeListComponent,
    AccountReportListComponent,
    AccountReportHistoryListComponent,

    // 财务
    FinanceRechargeListComponent,
    FinanceRechargeLogListComponent,
    FinanceWithdrawListComponent,
    FinanceWithdrawLogListComponent,

    // 统计
    ReportStatUserDayComponent,
    ReportStatUserListComponent,
    ReportLotteryDayListComponent,
    ReportStatPartnerListComponent,

    // 备份
    ProjectHistoryLisComponent,
    TraceHistoryListComponent,
    // 商户
    PartnerListComponent,
    PartnerAdminUserComponent,
    PartnerAdminGroupComponent,
    PartnerAccessLogComponent,
    DomainListComponent,
    PartnerMenuComponent,
    PartnerMenuConfigComponent,
    PartnerAdminBehaviorComponent,
    FinancePayChannelComponent,
    FinancePayAccountComponent,
    FinancePayTypeComponent,
    FinancePlatformChannelComponent,
    FinancePlatformAccountComponent,
    FinanceWithdrawRiskComponent,
    FinanceWithdrawFinanceComponent,
    FinanceWithdrawBypersonComponent,
    ReportAgentSalaryComponent,
    ReportAgentBonusComponent,
    HistoryBetListComponent,
    HistoryTraceListComponent,
    HistoryMoneyChangeListComponent,
    HistoryPartnerBehaviorListComponent,
    HistoryPlayerBehaviorListComponent,
    HistoryPlayerIpListComponent,
    HistoryPlayerCommissionListComponent,
    HistoryIssuesListComponent,
    SystemModelListComponent,
    HistoryPartnerBehaviorComponent,
    PartnerConfigureListComponent,
    ReportStatPartnerAddListComponent,
    JackpotIssueListComponent,

  ],
  imports: [
    // NgxNeditorModule,
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    PipesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NzCascaderModule,
    UEditorModule.forRoot({
      js: [
        `../../../assets/ueditor/ueditor.config.js`,
        `../../../assets/ueditor/ueditor.all.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: '/assets/ueditor/',
        // serverUrl:'http://api.9170ttt.com/api/content/upload-pic'//不配置该参数，代码动态获取
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: AppReuseStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    ServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
