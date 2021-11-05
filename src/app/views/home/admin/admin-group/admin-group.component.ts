import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService, NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.scss']
})

export class AdminGroupComponent implements OnInit {
  public listOfParentData: any[] = [];
  public nzTreeComponent: NzTreeComponent;
  nodes = [];
  public checkBox = [];
  public isDisbled = false;
  public isLook = '1';

  public page = {
    index: 1,
    total: 0
  };
  public indeterminate = [];

  // 查看权限
  public lookPermissions = {
    show: false,
    data: [],
    id: '',
    level: 0
  };


  // 添加 编辑分组
  public addAdmin = {
    title: '添加分组',
    show: false,
    type: 0,
    data: {
      name: '',
      id: 0
    }
  };

  constructor(
    public api: ApiService,
    public message: NzMessageService,
    public modalService: NzModalService
  ) { }

  ngOnInit() {

    this.adminGroupList();
  }
  public nzCheck(event: NzFormatEmitEvent): void {
    console.log(this.nodes);
  }
  // 管理员列表
  public adminGroupList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
    };

    this.api.Http({ name: 'adminGroupList', data: data }).then((response: any) => {
      if (response.success) {
        const temp = [];
        const resData = response.data.data;
        for (const k of Object.keys(resData)) {
          const json: any = {};
          json.id = resData[k].id;
          json.pid = resData[k].pid;
          json.name = resData[k].name;
          json.total_childs = resData[k].total_childs;
          json.time = resData[k].created_at.date;
          json.child = [];

          for (const i of Object.keys(resData[k].child)) {
            const childJson: any = {};
            childJson.id = resData[k].child[i].id;
            childJson.pid = resData[k].child[i].pid;
            childJson.name = resData[k].child[i].name;
            childJson.total_childs = resData[k].child[i].total_childs;
            childJson.time = resData[k].child[i].created_at.date;
            childJson.child = resData[k].child[i].child;
            json.child.push(childJson);
          }
          temp.push(json);
        }
        this.page.total = temp.length
        this.listOfParentData = temp;
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
        title: ele['title'],
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

  // 查看管理员权限
  public adminGroupAclDetail(item: any) {
    this.isDisbled = true;
    this.isLook = '1';
    this.api.getadminGroupsAc({}, item.id).then((response: any) => {
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
    this.api.setAdminGroupsSetAcl(option, this.lookPermissions.id).then((res: any) => {
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
  // 修改权限
  public modifyPermissions(item: any) {
    this.lookPermissions.id = item.id;
    this.isLook = '2';
    this.isDisbled = false;
    this.api.getadminGroupsAc({}, item.id).then((response: any) => {
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


  // 取消添加管理组
  public closeConfig() {
    this.addAdmin.show = false
    this.addAdmin.data.id = 0;
  }

  // 确认添加管理组
  public confirmConfig() {
    let data = {};
    if (this.addAdmin.type === 0) {
      data = {
        group_name: this.addAdmin.data.name
      };
    } else {
      data = {
        id: this.addAdmin.data.id,
        group_name: this.addAdmin.data.name
      };
    }

    this.api.Http({ name: 'adminGroupAdd', data: data, attach: this.addAdmin.data.id + '' }).then((response: any) => {
      if (response.success) {
        this.addAdmin.show = false;
        this.adminGroupList();
        this.addAdmin.data.name = '';
        this.addAdmin.data.id = 0;
        this.message.create('success', response.msg);
      }
    });
  }

  // 添加 编辑 管理组
  public addAdmins(item: any, type = 0) {
    if (item) {
      // type 为0 是添加
      if (type === 0) {
        this.addAdmin.title = '添加分组';

      } else {
        this.addAdmin.data.name = item.name;
        this.addAdmin.data.id = item.id;
        this.addAdmin.title = '编辑分组';
      }
    }
    this.addAdmin.show = true;
    this.addAdmin.type = type;
  }

  // 删除管理组
  public deleteAdmins(item: any) {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确认删除吗？</b>',
      nzOnOk: () => {
        this.api.Http({ name: 'adminGroupDel', attach: item.id }).then((response: any) => {
          if (response.success) {
            this.adminGroupList();
            this.message.create('success', response.msg);
          }
        });
      }
    });
  }


  public pageChange() {
    this.adminGroupList();
  }
}
