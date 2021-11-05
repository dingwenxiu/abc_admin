import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-finance-pay-channel',
  templateUrl: './finance-pay-channel.component.html',
  styleUrls: ['./finance-pay-channel.component.scss']
})
export class FinancePayChannelComponent implements OnInit {
  public tableList = [];
  // 编辑变量
  public hide: boolean = false;
  // 删除参数
  public isDelete: boolean = false;
  public isOkLoading: boolean = false;
  // 厂商参数
  public redactId: string;
  public redactData = {
    id: null,
    platform_name: '',
    platform_sign: '',
    platform_url: '',
    whitelist_ips: '',
    is_pull: ''
  };
  public contentPop = {
    show: false,
    data: ''
  };
  // 对话框参数
  public confirmModal: NzModalRef;
  public page = {
    index: 1,
    total: 0,

  };

  public popup = {
    showContentLoading: false,
    isShowContent: false,
    content: {}
  };

  public searchData = {
    page_index: 1,
    page_size: 10
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }
  // 删除框关闭
  public deleteColse() {
    this.isDelete = false;
  }
  // 添加厂商
  public addVendor() {
    this.hide = true;
    this.redactData.id = 0;
    this.redactData.platform_name = '';
    this.redactData.platform_url = '';
    this.redactData.whitelist_ips = '';
    this.redactData.platform_sign = '';
  }
  // 关闭编辑弹框
  public redactclose() {
    this.hide = false;
  }
  // 修改厂商
  public amendVendor(item: any) {
    this.hide = true;
    this.redactData.id = item.id;
    this.redactData.platform_name = item.platform_name;
    this.redactData.platform_sign = item.platform_sign;
    this.redactData.platform_url = item.platform_url;
    this.redactData.whitelist_ips = item.whitelist_ips;
    this.redactData.is_pull = item.is_pull;
  }
  // 删除
  public delVendor(id: string) {
    this.confirmModal = this.modal.confirm({
      nzTitle: '温馨提示!是否删除？',
      nzOnOk: () => {
        this.api.delPayVendor({}, id).then((res: any) => {
          if (res.success) {
            this.hide = false;
            this.getDataList();
            this.message.success('删除成功', {
              nzDuration: 1000,
            });
          } else {
            this.message.error(res.msg.original.msg, {
              nzDuration: 1000,
            });
          }
        });
      }

    });
  }
  // 提交
  public submit() {
    let str = '';
    if (!this.redactData.id) {
      this.redactData.id = 0;
      str = '添加';
    } else {
      str = '编辑';
    }
    this.api.setPayVendor(this.redactData, this.redactData.id).then((res: any) => {
      if (res.success) {
        this.hide = false;
        this.message.success(str + '成功', {
          nzDuration: 1000,
        });
        this.getDataList();
      } else {
        this.message.error(res.msg.original.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 初始化列表
  public getDataList() {
    this.api.getPayVendorList(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
      }
    });
  }
  // 分页
  public pageChange() {
    this.getDataList();
  }
  // 重置支付厂商列表
  public resetVendorList() {
    this.page.index = 1;
    this.page.total = 0;
    this.redactData = {
      id: null,
      platform_name: '',
      platform_sign: '',
      platform_url: '',
      whitelist_ips: '',
      is_pull: ''
    };
    this.getDataList();
  }
  public lockTd(item: any) {
    this.contentPop = {
      show: true,
      data: item.whitelist_ips
    };
  }
}
