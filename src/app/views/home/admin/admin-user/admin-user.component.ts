import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';

import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})

export class AdminUserComponent implements OnInit {
  public tableList = [];
  public passwordTab = 0;
  public passwordShow = false;

  public loginPasswords = {
    submitLoading: false,
    id: 0,
    data: {
      type: 1,
      admin_password: '',
      password: '',
      confirm_password: ''
    }

  };

  public fundPasswords = {
    submitLoading: false,
    id: 0,
    data: {
      type: 2,
      admin_password: ''
    }
  };

  public page = {
    index: 1,
    total: 0
  };
  // 对话框参数
  public confirmModal: NzModalRef;

  public edit = {
    show: false,
    submitLoading: false,
    id: 0,
    group_options: [],
    data: {
      username: '',
      email: '',
      group_id: null,
      password: '',
      fund_password: '',
    }
  };

  // department
  public editClear = null;

  constructor(
    public utils: ToolService,
    public api: ApiService,
    public message: NzMessageService,
    private modal: NzModalService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
    this.editClear = JSON.stringify(this.edit);
  }

  // 添加管理
  public addAdmin(id: any) {
    this.api.addAdminUserAdd({ action: 'option' }).then((res: any) => {
      if (res.success) {
        let temp = [];
        this.edit.show = true;
        this.edit.group_options = res.data.group_options;
        this.edit.data = {
          username: '',
          email: '',
          group_id: null,
          password: '',
          fund_password: '',
        };
      }
    })
    // this.api.Http({name: 'adminUserAdd', data:{action: 'option'}, attach:id}).then((res: any) => {
    //   if (res.success) {
    //     let temp = [];
    //     this.edit.show = true;
    //     this.edit.group_options = res.data.group_options;
    //     this.edit.data = {
    //       username: '',
    //       email: '',
    //       group_id: 0,
    //       password: '',
    //       fund_password: '',
    //     };
    //   }
    // });
  }

  // 提交
  public submitEdit() {
    const data = this.edit.data;
    // for (const key in data) {
    //   if (!this.utils.removeAllSpace(data[key])) {
    //     return false;
    //   }
    // }
    if (!this.edit.id) {
      this.edit.id = null;
    }

    this.api.Http({ name: 'adminUserAdd', data: data }).then((res: any) => {
      if (res.success) {
        this.edit.show = false;
        this.getDataList();
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
  // 
  public eidt(item: any) {
    this.api.addAdminUserAdd({ action: 'option' }).then((res: any) => {
      if (res.success) {
        let temp = [];
        this.edit.show = true;
        this.edit.group_options = res.data.group_options;
        this.edit.data = {
          username: item.username,
          email: item.email,
          group_id: String(item.group_id),
          password: '',
          fund_password: ''
        };
      }
    });
  }

  // 获取数据列表
  public getDataList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      pid: 0
    };

    this.api.Http({ name: 'adminUserList', data: data }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
      }
    });
  }
  // 删除
  public delAdmin(item: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: '温馨提示!是否删除？',
      nzOnOk: () => {
        this.api.delAdminUserAdd({}, item.id).then((res: any) => {
          if (res.success) {
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

  // 翻页
  public pageChange() {
    this.getDataList();
  }

  public back() {
    this.edit.show = false;
    this.passwordShow = false;
    this.getDataList();
  }

  // 修改状态
  public changeStatus(item: any) {
    this.api.Http({ name: 'adminUserStatus', attach: item.id }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: '修改成功  !'
        });
      }
    });
  }

  // 修改密码开始
  public changePassword(id: any) {
    this.passwordShow = true;
    this.fundPasswords.id = id;
    this.loginPasswords.id = id;

    this.loginPasswords.data = {
      type: 1,
      admin_password: '',
      password: '',
      confirm_password: ''
    };
    this.fundPasswords.data = {
      type: 2,
      admin_password: ''
    };
  }

  public submitChangePassword(type: any) {
    let data = null;
    let id = 0;
    if (type === 1) {
      data = this.loginPasswords.data;
      id = this.loginPasswords.id;
      for (const key in data) {
        if (!this.utils.removeAllSpace(String(data[key]))) {
          return false;
        }
      }
    } else {
      data = this.fundPasswords.data;
      id = this.fundPasswords.id;
      for (const key in data) {
        if (!this.utils.removeAllSpace(String(data[key]))) {
          return;
        }
      }
    }

    this.api.Http({ name: 'adminUserPassword', data, attach: id + '' }).then((res: any) => {
      if (res.success) {
        this.passwordShow = false;
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      }
    });
  }

}
