import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, NzFormatEmitEvent } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-partner-admin-user',
  templateUrl: './partner-admin-user.component.html',
  styleUrls: ['./partner-admin-user.component.scss']
})

export class PartnerAdminUserComponent implements OnInit {
  // 商户管理员了列表
  public partnerAdminList = [];
  public partnerList = {};
  public page = {
    index: 1,
    total: 0
  };
  // 权限参数
  public isDisbled = false;
  public nodes = [];
  public checkBox = [];
  // 查看权限
  public lookPermissions = {
    show: false,
    data: [],
    id: '',
    level: 0
  };
  // look
  public lookData = {
    hide: false,
    id: ''
  }
  // 修改密码参数
  public pswData = {
    password: '',
    // new_password: '',
    fund_password: '',
    request_desc: ''
  }
  // 编辑域名
  public isVisible = false;
  public isOkLoading = false;
  public pswId = '';
  public groupList = [];
  // 商户管理员对象
  public addData = {
    show: false,
    isAdd: true,
    buttonLoading: false,
    data: {
      id: 0,
      username: '',
      email: '',
      partner_sign: '',
      password: '',
      fund_password: ''
    }
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private message: NzMessageService,
    public modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  // 公告列表
  public getDataList() {
    const data = {
      page_size: this.api.pageSize,
      page_index: this.page.index
    };
    this.api.Http({ name: 'partnerAdminUserList', data: {} }).then((res: any) => {
      if (res.success) {
        this.partnerAdminList = res.data.data;
        this.page.total = res.data.total;
        this.partnerList = res.data.partner_options;
      }
    });
  }
  // 选中事件
  public nzCheck(event: NzFormatEmitEvent): void {
    console.log(this.nodes);
  }
  // 编辑提交
  public handleOk() {
    this.isOkLoading = true;
    setTimeout(() => {
      this.api.setEditPsw(this.pswData, this.pswId).then((res: any) => {
        if (res.success) {
          this.message.success(res.msg, {
            nzDuration: 1000,
          });
          this.getDataList();
        } else {
          this.message.error(res.msg, {
            nzDuration: 1000,
          });
        }
        this.isVisible = false;
        this.isOkLoading = false;
      });
    }, 3000);
  }
  // 修改密码
  public editPsw(item: any) {
    this.isVisible = true;
    this.pswId = item.group_id;
  }
  // 关闭编辑弹框
  public handleCancel() {
    this.isVisible = false;
  }

  // 状态
  public doStatus(item) {
    this.api.Http({ name: 'partnerAdminUserStatus', attach: item.id }).then((res: any) => {
      if (res.success) {
        this.getDataList();

        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改成功 !'
        });
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改失败 !'
        });
      }
    });
  }

  // 添加商户管理员
  public addAdminUser() {
    this.addData = {
      show: true,
      isAdd: true,
      buttonLoading: false,
      data: {
        id: 0,
        username: '',
        email: '',
        partner_sign: '',
        password: '',
        fund_password: ''
      }
    };
  }

  public editAdminUser(item) {
    this.addData = {
      show: true,
      isAdd: false,
      buttonLoading: false,
      data: {
        id: item.id,
        username: item.username,
        email: item.email,
        partner_sign: item.partner_sign,
        password: item.password,
        fund_password: item.fund_password,
      }
    };
  }

  // 提交平台
  public submitTask() {
    this.addData.buttonLoading = true;
    const data = this.addData.data;
    let option = {
      username: data.username,
      email: data.email,
      partner_sign: data.partner_sign,
      group_id: data['group_id']
    };

    if (data.id) {
      option['id'] = data.id;
    } else {
      option['password'] = data.password;
      option['fund_password'] = data.fund_password;
    }

    this.api.Http({ name: 'partnerAdminUserAdd', data: option }).then((res: any) => {
      this.addData.buttonLoading = false;
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜您, ' + (this.addData.isAdd ? '添加' : '编辑') + '商户管理员成功 !'
        });
        this.back();
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    }).catch(() => { this.addData.buttonLoading = false; });
  }

  // 回退
  public back() {
    this.addData.show = false;
    this.addData = {
      show: false,
      isAdd: true,
      buttonLoading: false,
      data: {
        id: 0,
        username: '',
        email: '',
        partner_sign: '',
        password: '',
        fund_password: ''
      }
    };
  }
  // 递归初始权限列表
  public recursiveList(arr: [], arr1) {
    let off: boolean;
    arr.forEach((ele, index) => {
      if (this.isDisbled) {
        off = true;
      } else {
        off = false;
      }
      arr1.push({
        title: ele['cn_name'],
        key: ele['id'],
        disabled: off,
        checked: ele['checked'],
        children: ele['child']
      });
      if (!arr1[index]['children']) {
        arr1[index]['isLeaf'] = true;
        arr1[index]['children'] = [];
      }
      if (ele['child']) {
        this.recursiveList(ele['child'], arr1[index]['children'] = []);
      }
    })
    this.nodes = arr1;
  }
  // 查找所有选中的
  public getCheckedList(arr, arr1) {
    arr.forEach(item => {
      if (item.children.length > 0) {
        this.getCheckedList(item.children, arr1);
      }
      if (item.checked) {
        arr1.push(item.key);
      }
    })
  };
  // 确认修改权限

  public confrigmodifyPermissions() {
    let option = {
      menu_ids: this.checkBox
    }
    this.getCheckedList(this.nodes, this.checkBox);
    this.api.setAdminGroupAcl(option, this.lookPermissions.id).then((res: any) => {
      if (res.success) {
        this.lookPermissions.show = false;
        this.message.success('设置成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 查看权限
  public lookJurisdiction(id: string) {
    this.lookData.hide = true;
    this.lookData.id = id;
    this.isDisbled = true;
    this.api.lookJurisdiction({}, id).then((res: any) => {
      if (res.success) {
        this.lookPermissions.show = true;
        this.nodes = [];
        this.recursiveList(res.data, this.nodes);
      }
    })
  }

  // 翻页
  public pageChange() {
    this.getDataList();
  }

  public changeType($event) {
    this.addData.data['group_id'] = null;
    this.api.Http({ name: 'partnerAdminGroupList', data: {partner_sign: $event}}).then((res: any) => {
      if (res.success) {
        this.groupList = res.data.data;
      }
    });
  }
}
