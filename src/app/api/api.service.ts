import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import httpUrl from '../_config/http.config';
import { ToolService } from '../tool/tool.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public domain: string = environment.apiBaseUrl;
  public imgUrl: string = environment.imgBaseUrl;
  public token: any = '';
  public pageSize: any = 20;
  public loadingSwitch = false;

  constructor(
    public http: HttpClient,
    public utils: ToolService
  ) {
    const user = this.utils.storage.get('user');
    if (user) {
      this.imgUrl = user.data['system_pic_base_url'] + '/';
    }
  }

  public get(url: string) {
    const api = this.domain + url;
    this.loadingSwitch = true;
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((res) => {
        resolve(res);
        this.loadingSwitch = false;
      });
    });
  }

  public getTime() {
    return new Promise((resolve, reject) => {
      this.get('/partner-api/getTimeNow').then(res => {
        if (res['success']) {
          resolve(res);
        }
      });
    });
  }

  public post(url: string, json: any = []) {
    const api = this.domain + url;
    this.loadingSwitch = true;
    const imgHttp = this.domain + 'noticeUploadImg';
    this.utils.storage.set('domain', imgHttp);
    return new Promise((resolve, reject) => {
      this.http.post(api, json).subscribe((res: any) => {
        this.loadingSwitch = false;
        resolve(res);
      }, (error) => {
        this.loadingSwitch = false;
        reject(error);
      });
    });
  }

  public filterData(data: any, sub: any) {
    for (const k of Object.keys(data)) {
      data[k] = sub[k];
    }
    return data;
  }

  // 通用请求
  public Http({ name = '', data = {}, attach = '' }): any {
    this.loadingSwitch = true;
    const port = httpUrl[name];
    const url = `${port.url}${attach}`;
    if (port.type === 'get') {
      return this.get(port.url);
    } else {
      return this.post(url, data).then((response: any) => response);
    }
  }
  // will请求函数
  public axios(name: string, data: any = {}, attach?): any {
    this.loadingSwitch = true;
    const port = httpUrl[name];
    let url: string;
    if (!attach) {
      attach = '';
    }
    url = `${name}${attach}`;
    if (!data) {
      return this.get(port.url);
    } else {
      return this.post(url, data).then((response: any) => response);
    }
  }

  // 登陆
  public login(data: any): any {
    return this.post('login', data).then((response: any) => response);
  }

  // 发送安全吗
  public sendCode(data: any): any {
    return this.post('sendCode', data).then((response: any) => response);
  }
  // 快捷登录入口
  public getquickEntry() {
    return this.post('/admin-api/partner/domainList').then((response: any) => response);
  }
  // 商户菜单列表-编辑
  public merchantsListEdit(data: any, id) {
    return this.axios('/admin-api/partner/partnerMenuAdd/', data, id).then((response: any) => response);
  }
  // 商户列表-获取列表
  public getMerchantsList(data: any) {
    return this.axios('/admin-api/partner/getPartnerCasino', data).then((response: any) => response);
  }
  // 商户列表-设置
  public setMerchantsList(data: any) {
    return this.axios('/admin-api/partner/partnerSetCasino', data).then((response: any) => response);
  }
  /** ========================== 商户管理 ======================== */
  // 商户管理-访问日志
  public getadminAccessLogList(data: any) {
    return this.axios('/admin-api/partner/adminAccessLogList', data).then((response: any) => response);
  }
  // 商户管理-行为日志
  public getAdminBehavior(data: any) {
    return this.axios('/admin-api/partner/partnerAdminBehavior', data).then((response: any) => response);
  }
  // 商户管理-域名修改
  public setDomainName(data: any, id) {
    return this.axios('/admin-api/partner/domainTestSet/', data, id).then((response: any) => response);
  }
  // 商户管理-域名删除
  public delDomainName(data: any) {
    return this.axios('/admin-api/partner/domainDel/', data).then((response: any) => response);
  }
  // 商户列表-设置活动列表
  public getactivityList(data: any) {
    return this.axios('/admin-api/activityList', data).then((response: any) => response);
  }
  // 商户列表-修改设置活动
  public setactivityAdd(data: any) {
    return this.axios('/admin-api/activityAdd', data).then((response: any) => response);
  }
  // 商户列表-商户管理组-查看权限
  public getAdminGroupAcl(data: any, id) {
    return this.axios('/admin-api/partner/adminGroupAcl/', data, id).then((response: any) => response);
  }
  // 商户列表-商户管理组-修改权限
  public setAdminGroupAcl(data: any, id) {
    return this.axios('/admin-api/partner/adminGroupSetAcl/', data, id).then((response: any) => response);
  }
  // 商户列表-商户管理员-修改密码
  public setEditPsw(data: any, id) {
    return this.axios('/admin-api/partner/adminUserPassword/', data, id).then((response: any) => response);
  }
  // 商户列表-设置商户后台图标
  public setpartnerSetUploadImage(data: any, id) {
    return this.axios('/admin-api/partner/partnerSetUploadImage/', data, id).then((response: any) => response);
  }
  // 商户配置列表
  public getpartnerConfigureList(data: any) {
    return this.axios('/admin-api/partner/partnerConfigureList', data).then((response: any) => response);
  }
  // 商户配置列表-编辑
  public setPartnerConfigureAdd(data: any, id) {
    return this.axios('/admin-api/partner/partnerConfigureAdd/', data, id).then((response: any) => response);
  }
  // 商户配置列表-修改状态
  public setPartnerConfigureStatus(data: any, id) {
    return this.axios('/admin-api/partner/partnerConfigureStatus/', data, id).then((response: any) => response);
  }
  // 商户配置列表-详情
  public getPartnerConfigureDetail(data: any, id) {
    return this.axios('/admin-api/partner/partnerConfigureDetail/', data, id).then((response: any) => response);
  }
  // 商户配置列表-缓存刷新
  public partnerConfigureFlush(data: any) {
    return this.axios('/admin-api/partner/partnerConfigureFlush', data).then((response: any) => response);
  }
  // 商户管理员-查看权限
  public lookJurisdiction(data: any, id) {
    return this.axios('/admin-api/partner/partnerAdminUserAcl/', data, id).then((response: any) => response);
  }
  /** ========================== 充提管理 ======================== */
  // 充提管理-支付厂商列表
  public getPayVendorList(data: any) {
    return this.axios('/admin-api/finance/platform/list', data).then((response: any) => response);
  }
  // 充提管理-支付厂商编辑/添加
  public setPayVendor(data: any, id) {
    return this.axios('/admin-api/finance/platform/create/', data, id).then((response: any) => response);
  }
  // 充提管理-支付厂商删除
  public delPayVendor(data: any, id) {
    return this.axios('/admin-api/finance/platform/del/', data, id).then((response: any) => response);
  }
  // 充提管理-支付厂商-开放列表
  public getPayVendorOpenList(data: any) {
    return this.axios('/admin-api/finance/platformChannel/list', data).then((response: any) => response);
  }
  // 充提管理-支付厂商-支付类型
  public getPayType(data: any) {
    return this.axios('/admin-api/finance/channelType/list', data).then((response: any) => response);
  }
  // 充提管理-支付厂商-添加/修改类型
  public setPayChannel(data: any, id) {
    return this.axios('/admin-api/finance/platformChannel/create/', data, id).then((response: any) => response);
  }
  // 充提管理-支付厂商-删除
  public delPayChannel(data: any, id) {
    return this.axios('/admin-api/finance/platformChannel/del/', data, id).then((response: any) => response);
  }
  // 充提管理-支付厂商-开放渠道-修改
  public modifyPayChannel(data: any, id) {
    return this.axios('/admin-api/finance/platformChannel/status/', data, id).then((response: any) => response);
  }
  // 充提管理-支付账户列表
  public getPayAccount(data: any) {
    return this.axios('/admin-api/finance/platformAccount/list', data).then((response: any) => response);
  }
  // 充提管理-支付账户列表-状态修改
  public setPayStatus(data: any, id) {
    return this.axios('/admin-api/finance/platformAccount/status/', data, id).then((response: any) => response);
  }
  // 充提管理-支付账户列表-删除
  public delPayAccount(data: any, id) {
    return this.axios('/admin-api/finance/platformAccount/del/', data, id).then((response: any) => response);
  }
  // 充提管理-支付账户-开放渠道列表
  public getPayAccountDitch(data: any) {
    return this.axios('/admin-api/finance/platformAccountChannel/list', data).then((response: any) => response);
  }
  // 充提管理-支付账户-修改
  public setPayAccountStatus(data: any, id) {
    return this.axios('/admin-api/finance/platformAccountChannel/status/', data, id).then((response: any) => response);
  }
  // 充提管理-支付账户-删除
  public delPayAccountDitch(data: any, id) {
    return this.axios('/admin-api/finance/platformAccountChannel/del/', data, id).then((response: any) => response);
  }
  // 充提管理-支付类型列表
  public getPayTypeList(data: any) {
    return this.axios('/admin-api/finance/channelType/list', data).then((response: any) => response);
  }
  // 充提管理-支付类型列表-添加修改
  public setPayTypeList(data: any, id) {
    return this.axios('/admin-api/finance/channelType/create/', data, id).then((response: any) => response);
  }
  // 充提管理-支付类型列表-删除
  public delPayTypeList(data: any, id) {
    return this.axios('/admin-api/finance/channelType/del/', data, id).then((response: any) => response);
  }
  // 充提管理-人工提现表
  public getviewWithdrawHandList(data: any, id) {
    return this.axios('/admin-api/finance/viewWithdrawHandList/', data, id).then((response: any) => response);
  }
  /** ========================== 游戏管理 ======================== */
  // 游戏管理-添加游戏
  public addGameRequest(data: any) {
    return this.axios('/admin-api/lottery/lotteryAdd', data).then((response: any) => response);
  }
  // 游戏管理-修改游戏
  public setGameRequest(data: any, id) {
    return this.axios('/admin-api/lottery/lotteryEdit/', data, id).then((response: any) => response);
  }
  // 游戏管理-游戏详情
  public getlotteryDetail(data: any, id) {
    return this.axios('/admin-api/lottery/lotteryDetail/', data, id).then((response: any) => response);
  }
  /** ========================== 商户管理 ======================== */
  // 商户管理-获取商户模板
  public getMerchants(data: any) {
    return this.axios('/admin-api/template/getTemplateOfModule', data).then((response: any) => response);
  }
  // 商户管理-设置商户模板
  public setMerchants(data: any) {
    return this.axios('/admin-api/template/setTemplateOfModule', data).then((response: any) => response);
  }
  // 商户菜单管理-菜单列表
  public getMenuList(data: any) {
    return this.axios('/admin-api/partner/partnerMenuList', data).then((response: any) => response);
  }
  // 商户菜单管理-菜单列表
  public bindingMenu(data: any) {
    return this.axios('/admin-api/partner/partnerBindMenuConfig', data).then((response: any) => response);
  }
  // 商户预设菜单-删除
  public delPartnerMenuConfig(data: any, id) {
    return this.axios('/admin-api/partner/partnerMenuConfigDel/', data, id).then((response: any) => response);
  }
  // 控水-列表
  public getJackpotIssueList(data: any) {
    return this.axios('/admin-api/lottery/jackpotIssueList', data).then((response: any) => response);
  }
  // 控水-列表
  public getIssueDetail(data: any) {
    return this.axios('/admin-api/lottery/issueDetail', data).then((response: any) => response);
  }
  /** ========================== 历史数据 ======================== */
  // 历史数据-玩家访问历史记录
  public getpartnerVisitList(data: any) {
    return this.axios('/admin-api/backup/playerVisit', data).then((response: any) => response);
  }
  // 历史数据-商户行为历史记录
  public getPartnerBehavior(data: any) {
    return this.axios('/admin-api/backup/partnerBehavior', data).then((response: any) => response);
  }
  // 历史数据-玩家历史IP记录
  public getPlayerIp(data: any) {
    return this.axios('/admin-api/backup/playerIp', data).then((response: any) => response);
  }
  // 历史数据-历史奖期记录
  public getIssuesList(data: any) {
    return this.axios('/admin-api/backup/issuesList', data).then((response: any) => response);
  }
  // 历史数据-追号历史数据
  public getplayerTraceList(data: any) {
    return this.axios('/admin-api/backup/playerTrace', data).then((response: any) => response);
  }
  /** ========================== 玩家管理 ======================== */
  // 账变列表-详情
  public accountChangeReportDetail(data: any, id) {
    return this.axios('/admin-api/account/accountChangeReportDetail/', data, id).then((response: any) => response);
  }
  // 账变列表
  public accountChangeReportList(data: any) {
    return this.axios('/admin-api/account/accountChangeReportList', data).then((response: any) => response);
  }

  /** ========================== 管理员 ======================== */
  // 管理员-管理组-设置
  public setAdminGroupsSetAcl(data: any, id) {
    return this.axios('/admin-api/admin/adminGroupsSetAcl/', data, id).then((response: any) => response);
  }
  // 管理员-管理组-详情
  public getadminGroupsAc(data: any, id) {
    return this.axios('/admin-api/admin/adminGroupsAcl/', data, id).then((response: any) => response);
  }
  // 管理员-管理员-添加修改
  public addAdminUserAdd(data: any) {
    return this.axios('/admin-api/admin/adminUserAdd/', data).then((response: any) => response);
  }
  // 管理员-管理员-添加修改
  public delAdminUserAdd(data: any, id) {
    return this.axios('/admin-api/admin/adminUserDel/', data, id).then((response: any) => response);
  }
  // 管理员-访问日志
  public addAdminLogList(data: any) {
    return this.axios('/admin-api/admin/adminLogList', data).then((response: any) => response);
  }
  // 管理员
  public getAdminUserList(data: any) {
    return this.axios('/admin-api/partner/adminUserList', data).then((response: any) => response);
  }
  /** ========================== 商户管理 ======================== */
  // 模板管理-列表
  public getModelList(data: any) {
    return this.axios('/admin-api/template/getTemplateList', data).then((response: any) => response);
  }
  // 模板管理-添加
  public addModel(data: any) {
    return this.axios('/admin-api/template/addTemplate', data).then((response: any) => response);
  }
  // 模板管理-详情
  public getmodelDetail(data: any) {
    return this.axios('/admin-api/template/getTemplateModule', data).then((response: any) => response);
  }
  // 模板管理-修改
  public setModel(data: any) {
    return this.axios('/admin-api/template/setTemplateModule', data).then((response: any) => response);
  }
  // 商户域名列表-状态修改
  public setDomainStatus(data: any, id) {
    return this.axios('/admin-api/partner/domainStatus/', data, id).then((response: any) => response);
  }
  // 商户列表-测试域名添加
  public addTestWebPartner(data: any) {
    return this.axios('/admin-api/partner/testWebAdd', data).then((response: any) => response);
  }
  /** ========================== 报表管理 ======================== */
  // 商户报表-列表
  public getStatPartnerList(data: any) {
    return this.axios('/admin-api/report/statPartnerList', data).then((response: any) => response);
  }
}
