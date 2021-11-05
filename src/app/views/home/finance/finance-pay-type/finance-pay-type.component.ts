import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";
@Component({
  selector: 'app-finance-pay-type',
  templateUrl: './finance-pay-type.component.html',
  styleUrls: ['./finance-pay-type.component.scss']
})
export class FinancePayTypeComponent implements OnInit {
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
    whitelist_ips: ''
  };
  // 对话框参数
  public confirmModal: NzModalRef;
  public page = {
    index: 1,
    total: 0
  };
  // 支付类型参数
  public TypeId: string;
  public typeData = {
    type_name: '',
    type_sign: '',
    is_bank: '',
    icon: '',
  }
  // 
  public isAddType: boolean = false;

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
  ) { }

  ngOnInit() {
    this.getDataList();
  }
  // 删除框关闭
  public setColse() {
    this.hide = false;
  }
  // 上传图片
  public upImg(e: any) {
    if (e.type === 'success') {
      this.typeData.icon = e.fileList[0].response.data.path;
    }
  }
  // 添加厂商
  public addPayType() {
    this.isAddType = true;
    this.hide = true;
    this.redactData.id = 0;
    this.redactData.platform_name = '';
    this.redactData.platform_sign = '';
    this.redactData.whitelist_ips = '';
  }
  // 修改状态
  // public offStatus(item: any) {
  //   this.api.setPayAccountStatus({}, item.id).then((res: any) => {
  //     if (res.success) {
  //       !item.status;
  //       this.message.success('修改成功', {
  //         nzDuration: 1000,
  //       });
  //     } else {
  //       item.status = !item.status;
  //       this.message.error(res.msg, {
  //         nzDuration: 1000,
  //       });
  //     }
  //   });
  // }
  // 删除
  public delVendor(id: string) {
    let option = {};
    this.confirmModal = this.modal.confirm({
      nzTitle: '温馨提示!是否删除？',
      nzOnOk: () => {
        this.api.delPayTypeList(option, id).then((res: any) => {
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
  // 编辑
  public setPayType(item: any) {
    this.TypeId = item.id;
    this.isAddType = false;
    this.hide = true;
    this.typeData.icon = item.icon;
    this.typeData.type_name = item.type_name;
    this.typeData.type_sign = item.type_sign;
    this.typeData.is_bank = String(item.is_bank);
  }
  // 新增/编辑提交
  public addTypesubmit() {
    let id: number;
    let str: string;
    if (this.isAddType) {
      id = 0;
      str = '添加'
    } else {
      id = Number(this.TypeId);
      str = '编辑'
    }
    this.api.setPayTypeList(this.typeData, id).then((res: any) => {
      if (res.success) {
        this.hide = false;
        this.getDataList();
        this.message.success(str + '成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg.original.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 提交
  public submit() {
    if (!this.redactData.id) {
      this.redactData.id = 0;
    }
    this.api.setPayVendor(this.redactData, this.redactData.id).then((res: any) => {
      if (res.success) {
        this.hide = false;
        this.getDataList();
        this.message.success('添加成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg.original.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 初始化列表
  public getDataList() {
    let obj = {
      page_index: this.page.index,
      page_size: '10'
    }
    this.api.getPayTypeList(obj).then((res: any) => {
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
  public reset() {
    this.page.index = 1;
    this.page.total = 0;
    this.getDataList();
  }
}
