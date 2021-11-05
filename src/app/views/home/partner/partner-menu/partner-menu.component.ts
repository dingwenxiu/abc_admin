import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ToolService } from "../../../../tool/tool.service";

@Component({
  selector: 'app-partner-menu',
  templateUrl: './partner-menu.component.html',
  styleUrls: ['./partner-menu.component.scss']
})

// 商户菜单逻辑 == 展示已经分配的菜单
export class PartnerMenuComponent implements OnInit {
  public ids = "";
  // 
  public addData = {
    ids: [],
    partner_sign: ''
  }
  public addList = [];
  public tableList = [];
  public addOrEdit: string = '1';
  public page = {
    index: 1,
    total: 0
  };
  public hide: Boolean = false;
  // 编辑参数
  public isAddId: string;
  public edit = {
    partner_sign: '',
    menu_id: '',
    sort: '',
    status: '1'
  }


  public parentSet = [];
  public allMenu = [];

  public partnerOption = {};
  public menuTypeOptions = [];

  // 查询数据
  public searchData = {
    page_index: 1,
    page_size: 15,
    menu_type: 'all',
    partner_sign: 'KLC',
    pid: '0'
  };

  constructor(public api: ApiService, public utils: ToolService, private modalService: NzModalService, private message: NzMessageService) {

  }

  // 初始化
  ngOnInit() {
    // this.searchData.partner_sign = this.utils.getDefaultPartnerSign();
    this.getDataList();
  }
  public editclose() {
    this.hide = false;
  }
  // 提交添加
  public bindingSubmit() {
    this.addData.ids = this.ids.split(",");
    this.api.bindingMenu(this.addData).then((res: any) => {
      if (res.success) {
        this.message.success('添加成功', {
          nzDuration: 1000,
        });
        this.hide = false;
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }

  // 删除
  public doDel(item) {
    this.api.Http({ name: 'partnerMenuDel', attach: item.id }).then((res: any) => {
      if (res.success) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 删除成功 !'
        });
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      };
      this.getDataList();
    });
  }

  // 禁用启用
  public doStatus(item) {
    this.api.Http({ name: 'partnerMenuStatus', attach: item.id }).then((res: any) => {
      if (res.success) {
        item.status = !item.status;
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改成功 !'
        });
      }
    });
  }

  public pageChange() {
    this.getDataList();
  }
  // 面包屑
  public doNavToChild(item: any) {
    this.searchData.pid = item.key;
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.getMenuList(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.addList = res.data.add_list;
        this.partnerOption = res.data.partner_option;
        this.menuTypeOptions = res.data.menu_type_options;
        this.parentSet = res.data.menu_rid_list;
      }
    });
  }

  // 执行查询
  public doSearch() {
    this.page.index = 1;
    this.getDataList();
  }

  // 重置数据
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: 15,
      menu_type: 'all',
      partner_sign: '',
      pid: '0'
    };

    this.getDataList();
  }

  // 编辑
  // public doEdit(item: any) {
  //   this.hide = true;
  //   this.addOrEdit = '0';
  //   this.isAddId = item.id;
  //   this.edit = {
  //     partner_sign: item.partner_sign,
  //     menu_id: item.menu_id,
  //     sort: item.sort,
  //     status: item.status
  //   }
  // }

  // 显示下级
  public showChild(item) {
    this.searchData.partner_sign = item.partner_sign;
    this.searchData.pid = item.menu_id;
    this.searchData.menu_type = 'all';
    this.getDataList();
  }
  // 
  public addPartner() {
    this.hide = true;
    this.isAddId = '0';
    this.edit = {
      partner_sign: '',
      menu_id: '',
      sort: '',
      status: '1'
    }
  }
  // 添加
  public add() {
    this.hide = true;
    this.addOrEdit = '1';
    this.addData = {
      ids: [],
      partner_sign: this.searchData.partner_sign
    }
  }
  // 添加
  public isAddsubmit() {
    let verify = new RegExp("[a-zA-Z]+$");
    if (!verify.test(this.edit.partner_sign)) {
      this.message.error('请输入纯英文', {
        nzDuration: 1000,
      });
      return
    }
    let id = 0;
    this.api.merchantsListEdit(this.edit, id).then((res: any) => {
      if (res.success) {
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
      }
    });
  }
}
