import { Component, OnInit } from '@angular/core';
import { NzModalService, NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-partner-admin-group',
  templateUrl: './partner-admin-group.component.html',
  styleUrls: ['./partner-admin-group.component.scss']
})

export class PartnerAdminGroupComponent implements OnInit {
  public look:string = '1';
  // 商户管理员了列表
  public partnerList = [];
  public partnerOptions = {};
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
  public partnerSign = {};
  // 搜索参数
  public searchData = {
    partner_sign: 'YX',
    page_size: this.api.pageSize,
    page_index: this.page.index
  }

  // 商户管理员对象
  public addData = {
    show: false,
    isAdd: true,
    buttonLoading: false,
    data: {
      id: 0,
      partner_sign: '',
      name: '',
      remark: ''
    }
  };

  public mapOfExpandData;

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private router: Router,
    public message: NzMessageService,
    public home: HomeComponent,
    public modalService: NzModalService
  ) { }
  ngOnInit() {
    this.getDataList();
  }

  // 显示绑定用户 
  public showAdminUser(item) {
    console.log(this.home.menuList);
    this.home.menuList.forEach(ele => {
      ele.childs.forEach(item => {
        if (item.api_path === 'partner/admin-user-list') {
          this.home.goPath(item);
        }
      })
    })
  }

  // 查看管理员权限
  public adminGroupAclDetail(item: any) {
    this.isDisbled = true;
    this.look = '1';
    this.api.getAdminGroupAcl({}, item.id).then((response: any) => {
      if (response.success) {
        if (JSON.stringify(response.data) === '{}' || response.data.length === 0) {
          this.modalService.warning({
            nzTitle: '提示',
            nzContent: '暂无权限！'
          });
          return;
        }
        this.lookPermissions.show = true;
        this.nodes = [];
        this.recursiveList(response.data, this.nodes);
      }
    });
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
  // 选中事件
  public nzCheck(event: NzFormatEmitEvent): void {
    console.log(this.nodes);
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
  // 修改权限
  public modifyPermissions(item: any) {
    this.lookPermissions.id = item.id;
    this.look = '2';
    this.isDisbled = false;
    this.api.getAdminGroupAcl({}, item.id).then((response: any) => {
      if (response.success) {
        if (JSON.stringify(response.data) === '{}' || response.data.length === 0) {
          this.modalService.warning({
            nzTitle: '提示',
            nzContent: '暂无权限！'
          });
          return;
        }
        this.lookPermissions.show = true;
        this.nodes = [];
        this.recursiveList(response.data, this.nodes);
      }
    });
  }
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
  // 公告列表
  public getDataList() {
    this.api.Http({ name: 'partnerAdminGroupList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.partnerList = res.data.data;
        this.page.total = res.data.total;
        this.partnerOptions = res.data.partner_options;
      }
    });
  }
  public search() {
    this.getDataList();
  }
  public resetSearch() {
    this.searchData = {
      partner_sign: 'YX',
      page_size: this.api.pageSize,
      page_index: this.page.index

    }
    this.getDataList();
  }

  // 状态
  // public doStatus(item) {
  //   this.api.partnerAdminUserStatus(item.id).then((res: any) => {
  //     if (res.success) {
  //       this.getDataList();

  //       const modal = this.modalService.success({
  //         nzTitle: '温馨提示',
  //         nzContent: '恭喜, 修改成功 !'
  //       });
  //     } else {
  //       const modal = this.modalService.error({
  //         nzTitle: '温馨提示',
  //         nzContent: '恭喜, 修改失败 !'
  //       });
  //     }
  //   });
  // }


  // // 删除
  // public doDel(id) {
  //   this.api.pushTaskDel(id).then((res: any) => {
  //     if (res.success) {
  //       this.getDataList();
  //       const modal = this.modalService.success({
  //         nzTitle: '温馨提示',
  //         nzContent: '恭喜, 删除成功 !'
  //       });
  //     } else {
  //       const modal = this.modalService.error({
  //         nzTitle: '温馨提示',
  //         nzContent: '恭喜, 删除失败 !'
  //       });
  //     }
  //   });
  // }



  // 添加商户管理员
  public addpartner() {
    this.addData = {
      show: true,
      isAdd: true,
      buttonLoading: false,
      data: {
        id: 0,
        partner_sign: '',
        name: '',
        remark: ''
      }
    };
  }

  public doEdit(item) {
    this.addData = {
      show: true,
      isAdd: false,
      buttonLoading: false,
      data: {
        id: item.id,
        partner_sign: item.partner_sign,
        name: item.name,
        remark: item.remark
      }
    };
  }

  // 提交平台
  public submitTask() {
    this.addData.buttonLoading = true;
    const data = this.addData.data;
    for (const key in data) {
      if ((data[key] == null || data[key] === undefined) && data['id']) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '对不起,' + key + '不能为空!'
        });
        return false;
      }
    }

    const option = {
      partner_sign: data.partner_sign,
      name: data.name,
      remark: data.remark,
    };

    if (data.id) {
      option['id'] = data.id;
    }

    this.api.Http({ name: 'partnerAdminGroupAdd',  data, attach: `/${data.id}`}).then((res: any) => {
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
        partner_sign: '',
        name: '',
        remark: ''
      }
    };
  }

  // 翻页
  public pageChange() {
    this.getDataList();
  }
}
