import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})

export class MenuListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    size: 15,
    total: 0
  };

  public related = [];

  public parent = {
    id: 0,
    title: ''
  };

  public edit = {
    show: false,
    editSubmitButton: false,
    id: 0,
    data: {
      title: '',
      pid: 0,
      type: '1',
      route: '',
      api_path: '',
      sort: '',
      css_class: ''
    }
  };
  public parentSet = [];

  public searchData = {
    page_index: this.page.index,
    page_size: this.api.pageSize,
    pid: '0',
    cid: '0'
  };

  constructor(
    public utils: ToolService,
    public api: ApiService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }
  // 
  public resetSearch() {
    this.searchData = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      pid: '0',
      cid: '0'
    };
    this.getDataList();
  }

  public getDataList() {
    this.api.Http({ name: 'adminMenuList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.tableList = res.data.data;
        this.related = res.data.related;
        this.page.total = res.data.total;
        this.parentSet = res.data.related;
      }
    });
  }

  public pageChange() {
    this.getDataList();
  }

  public doEdit(item: any) {
    this.edit.id = item.id;
    this.edit.show = true;

    this.api.Http({ name: 'adminMenuDetail', attach: item.id }).then((res: any) => {
      if (res.success) {
        if (res.data.menu && +res.data.menu.id > 0) {
          this.edit.data = res.data.menu;
          this.edit.data.type = this.edit.data.type + '';
          this.edit.id = res.data.menu.id;
        }
      }
    });
  }

  public back() {
    this.edit.show = false;
    this.initEditData();
  }

  public initEditData() {
    this.edit.id = 0;
    this.edit.data = {
      title: '',
      pid: 0,
      type: '1',
      route: '',
      api_path: '',
      sort: '',
      css_class: ''
    };
  }

  public submitEdit() {
    this.edit.editSubmitButton = true;
    if (this.utils.removeAllSpace(this.edit.data.title)) {
      this.api.Http({ name: 'adminMenuAdd', data: this.edit.data, attach: this.edit.id + '' }).then((res: any) => {
        if (res.success) {
          this.edit.show = false;
          this.initEditData();
        }

        this.edit.editSubmitButton = false;
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      })
    }
  }

  public doNavToChild(item) {
    this.searchData.pid = item.id;
    this.getDataList();
  }
  // 
  public reset() {
    this.searchData = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      pid: '0',
      cid: '0'
    };
    this.getDataList();
  }
}
