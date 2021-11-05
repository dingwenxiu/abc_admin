import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})

// 系统配置
export class ConfigureComponent implements OnInit {
  public isAdd = true;
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
      partner_show: '',
      partner_edit: '',
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
    this.getDataList();
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
      partner_show: '',
      partner_edit: '',
    };
  }

  // 添加 / 编辑 配置
  public addConfigure(id, type) {
    this.isAdd = type;
    if (id == 0) {
      this.edit.show = true;
      this.initConfig();
    } else {
      if (type === '1') {
        this.pid = id;
        this.isAdd == false;
      } else {
        this.pid = '0';
        this.initConfig();
        this.edit.data.id = id;
        this.isAdd = true;
      }
      this.api.Http({ name: 'configureDetail', attach: id }).then((res: any) => {
        if (res.success) {
          this.edit.show = true;
          if (res.data && +res.data.id > 0) {
            this.edit.data = this.api.filterData(this.edit.data, res.data);
            this.edit.data.pid = String(Number(this.edit.data.pid) * 1000);
          }
        }
      });
    }
  }

  // 提交编辑
  public submitEdit() {
    this.edit.buttonLoading = true;
    const data = this.edit.data;
    if (this.edit.data.pid) {
      this.edit.data['is_edit_pid'] = '1';
    } else {
      this.edit.data['is_edit_pid'] = '0';
    }
    if (!this.isAdd) {
      data.pid = String(this.parent.id);
      this.edit.data.pid = String(Number(this.edit.data.pid) % 1000);
    }
    this.api.Http({ name: 'configureAdd', data: this.edit.data, attach: this.edit.data.id + '' }).then((res: any) => {
      if (res.success) {
        this.message.success('添加/编辑成功', {
          nzDuration: 1000,
        });
        this.back();
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
      this.edit.buttonLoading = false;
      this.edit.buttonLoading = false;
    }).catch(() => { this.getDataList(); })
  }

  // 状态
  public doStatus(item: any) {
    this.api.Http({ name: 'configureStatus', attach: item.id + '' }).then((res: any) => {
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
    });
  }

  // 状态
  public doFlush() {
    this.api.Http({ name: 'configureFlush' }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 刷新成功 !'
        });
      }
    });
  }

  // 获取数据列表
  public getDataList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      pid: this.parent.id,
    };

    this.api.Http({ name: 'configureList', data: data }).then((res: any) => {
      if (res.success) {
        let list = [];
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.tableList.forEach((item) => {
          list.push({ pid: item.id, name: item.name });
        });
        this.pidList = list;
      }
    });
  }

  // 上一级
  public toParent(id) {
    this.parent.id = id;
    this.getDataList();
  }

}
