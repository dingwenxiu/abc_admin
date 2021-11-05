import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-partner-configure-list',
  templateUrl: './partner-configure-list.component.html',
  styleUrls: ['./partner-configure-list.component.scss']
})
export class PartnerConfigureListComponent implements OnInit {
  public tableList = [];

  public page = {
    index: 1,
    total: 0
  };

  public parent = {
    id: 0,
    pid: 0,
    name: '',
  };
  public dateRange = {};
  public searchData = {
    page_index: this.page.index,
    page_size: this.api.pageSize,
    pid: this.parent.id,
    partner_sign: 'KLC'
  };
  public partner_name = "";
  public processOption = {};
  public examine = false;
  // 
  public pid = '0';
  // 父级列表
  public pidList = [];
  public edit = {
    show: false,
    province_options: {},
    platform_options: {},
    bank_options: {},
    buttonLoading: false,
    data: {
      pid: '0',
      id: 0,
      name: '',
      sign: '',
      value: '',
      description: '',
      can_show: '',
      can_edit: '',
      partner_sign: '',
      request_desc: ''
    }
  };

  constructor(
    public message: NzMessageService,
    public api: ApiService,
    private modalService: NzModalService
  ) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 回退
  public back() {
    this.edit.show = false;
    this.edit.buttonLoading = false;
  }

  public doChild(item) {
    this.parent = item;
    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 初始化配置数据
  public initConfig() {
    this.edit.data = {
      id: 0,
      pid: '0',
      sign: '',
      value: '',
      description: '',
      name: '',
      can_show: '',
      can_edit: '',
      partner_sign: '',
      request_desc: ''
    };
  }

  // 添加 / 编辑 配置
  public addConfigure(item, type) {
    let id = item.id;
    if (this.processOption[item.sign]) {
      this.examine = true;
    } else {
      this.examine = false;
    }
    if (id == 0) {
      this.edit.show = true;
      this.initConfig();
    } else {
      if (type === '1') {
        this.pid = id;
      } else {
        this.pid = '0';
        this.initConfig();
        this.edit.data.id = id;
      }
      this.api.getPartnerConfigureDetail({}, id).then((res: any) => {
        if (res.success) {
          this.edit.show = true;
          if (res.data && +res.data.id > 0) {
            this.edit.data = this.api.filterData(this.edit.data, res.data);
            this.edit.data.pid = String(res.data.pid);
          }
        }
      })
    }
  }

  // 提交编辑
  public submitEdit() {
    this.edit.buttonLoading = true;
    const data = this.edit.data;
    if (this.edit.data.pid && this.edit.data.id) {
      this.edit.data['is_edit_pid'] = '1';
    } else {
      this.edit.data['is_edit_pid'] = '0';
    }
    // console.log(this.edit.data);
    // for (const key in data) {
    //   if (data[key] == null || data[key] === undefined) {
    //     const modal = this.modalService.success({
    //       nzTitle: '温馨提示',
    //       nzContent: '对不起,' + key + '不能为空!'
    //     });
    //     this.edit.buttonLoading = false;
    //     return false;
    //   }
    // }

    data.pid = String(this.parent.id);
    if (this.edit.data.can_edit) {
      this.edit.data.can_edit = '1';
    } else {
      this.edit.data.can_edit = '0';
    }
    if (this.edit.data.can_show) {
      this.edit.data.can_show = '1';
    } else {
      this.edit.data.can_show = '0';
    }
    this.api.setPartnerConfigureAdd(this.edit.data, this.edit.data.id).then((res: any) => {
      if (res.success) {
        this.message.success('添加/编辑成功', {
          nzDuration: 1000,
        });
        this.back();
        this.getDataList();
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
      this.edit.buttonLoading = false;
      this.edit.buttonLoading = false;
    })
  }

  // 状态
  public doStatus(item: any) {
    this.api.setPartnerConfigureStatus({}, item.id).then((res: any) => {
      if (res.success) {
        if (item.status) {
          item.status = 0;
        } else {
          item.status = 1;
        }
        let off = false;
        if (!item.status) {
          this.tableList.forEach(ele => {
            if (item.id == ele.id) {
              ele.child.forEach((ele1 => {
                ele1.status = 0;
              }));
            }
          })
        } else {
          this.tableList.forEach(ele => {
            if (ele.status == 0) {
              ele.child.forEach((ele1 => {
                if (ele1.status) {
                  this.tableList.forEach(key => {
                    if (ele1.pid == key.id) {
                      key.status = 1;
                    }
                  })
                }
              }));
            }
          });
        }
        this.message.success('修改成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    })
  }

  // 状态
  public doFlush() {
    let option = {
      partner_sign: this.searchData.partner_sign
    }
    this.api.partnerConfigureFlush(option).then((res: any) => {
      if (res.success) {
        this.message.success('刷新成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    })
  }

  // 获取数据列表
  public getDataList() {
    this.api.getpartnerConfigureList(this.searchData).then((res: any) => {
      if (res.success) {
        let list = [];
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.partner_name = res.data.partner_name;
        this.processOption = res.data.process_option;
        this.tableList.forEach((item) => {
          list.push({ pid: item.id, name: item.name });
        });
        this.pidList = list;
      }
      this.dateRange = res.data.partner_option;
    })
  }
  public search() {
    this.getDataList();
  }
  public resetSearch() {
    this.searchData = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      pid: this.parent.id,
      partner_sign: 'KLC'
    };
    this.getDataList();
  }
}
