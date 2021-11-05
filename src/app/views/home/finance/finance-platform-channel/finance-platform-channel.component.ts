import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-finance-platform-channel',
  templateUrl: './finance-platform-channel.component.html',
  styleUrls: ['./finance-platform-channel.component.scss']
})
export class FinancePlatformChannelComponent implements OnInit {
  public tableList = [];
  // 支付平台的标识数组
  public payterracelist: any = [];
  // 支付平台类型数组
  public payTypelist: any = [];
  // 编辑变量
  public hide: boolean = false;
  // 删除参数
  public isDelete: boolean = false;
  public isOkLoading: boolean = false;
  // 厂商渠道参数
  public redactData = {
    id: null,
    channel_name: '',
    channel_sign: '',
    gateway: '',
    request_mode: '1',
    direction: '1',
    status: '0',
    platform_sign: '',
    type_sign: '',
    banks_code: '',
  }

  // 对话框参数
  public confirmModal: NzModalRef;
  public page = {
    index: 1,
    total: 0,
  };
  public dateRange = {};
  //搜索参数
  public searchData = {
    page_index: this.page.index,
    page_size: this.api.pageSize,
    platform_sign: 'fmis'
  }
  public popup = {
    showContentLoading: false,
    isShowContent: false,
    content: {}
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    private modal: NzModalService
  ) {
    this.getDataList();
  }

  ngOnInit() {
    
  }
  // 删除框关闭
  public deleteColse() {
    this.isDelete = false;
  }
  // 添加厂商渠道
  public addVendorditch() {
    this.hide = true;
    this.redactData.id = 0;
  }
  // 关闭编辑弹框
  public redactclose() {
    this.hide = false;
  }
  // 修改厂商渠道
  public amendVendorChannel(item: any) {
    this.redactData = {
      id: item.id,
      channel_name: item.channel_name,
      channel_sign: item.channel_sign,
      gateway: item.gateway,
      request_mode: item.request_mode,
      direction: item.direction,
      status: item.status,
      platform_sign: item.platform_sign,
      type_sign: item.type_sign,
      banks_code: item.banks_code
    };
    this.hide = true;
  }
  // 删除
  public delVendorChannel(id: string) {
    this.confirmModal = this.modal.confirm({
      nzTitle: '温馨提示!是否删除？',
      nzOnOk: () => {
        this.api.delPayChannel({}, id).then((res: any) => {
          if (res.success) {
            this.hide = false;
            this.getDataList();
            this.message.success('删除成功', {
              nzDuration: 1000,
            });
          } else {
            this.message.error(res.msg, {
              nzDuration: 1000,
            });
          }
        });
      }

    });
  }
  // 提交
  public submit() {
    if (!this.redactData.id) {
      this.redactData.id = 0;
    }
    this.api.setPayChannel(this.redactData, this.redactData.id).then((res: any) => {
      if (res.success) {
        this.hide = false;
        this.getDataList();
        this.message.success('添加成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 状态修改
  public changeStatus(item: any) {
    this.api.modifyPayChannel({}, item.id).then((res: any) => {
      if (res.success) {
        !item.status;
        this.message.success('修改成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 支付平台得标识
  public getPayTerrace() {
    this.api.getPayVendorList({}).then((res: any) => {
      if (res.success) {
        let obj = res.data.data;
        this.payterracelist = this.regroup(obj);
        this.redactData.platform_sign = this.payterracelist[0].platform_sign;
      }
    });
    this.api.getPayType({}).then((res: any) => {
      if (res.success) {
        let obj = res.data.data;
        this.payTypelist = this.regroup(obj);
        this.redactData.type_sign = this.payTypelist[0].type_sign;
      }
    });
  }
  // 重组参数
  public regroup(obj: object) {
    let Paylist = [];
    for (let item in obj) {
      Paylist.push(obj[item]);
    }
    return Paylist
  }
  // 初始化列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.getPayVendorOpenList(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.dateRange = res.data.platform_sign_options;
      }
    });
    this.getPayTerrace();
  }
  // 分页
  public pageChange() {
    this.getDataList();
  }
  // 搜索功能
  public doSearch() {
    this.getDataList();
  }
  // 重置
  public resetSearch() {
    this.searchData = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      platform_sign: ''
    }
    this.getDataList();
  }
}
