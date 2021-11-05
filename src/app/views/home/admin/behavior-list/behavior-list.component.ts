import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-behavior-list',
  templateUrl: './behavior-list.component.html',
  styleUrls: ['./behavior-list.component.scss']
})
export class BehaviorListComponent implements OnInit {

  public tableList = [];
  public adminUser = {};
  public adminType = [];
  public tplModalButtonLoading = false;

  public page = {
    index: 1,
    total: 0,
    admin_username: '',
    action: ''
  };
  public detail = {
    show: false,
    data: {
      id: '---',
      bank_name: '---',
      bank_sign: '---',
      branch: '---',
      card_number: '---',
      city_id: '---',
      nickname: '---',
      owner_name: '---',
      province_id: '---'
    }
  };

  constructor(public api: ApiService, private modalService: NzModalService) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  public doDetails(item: any) {
    this.detail.show = true;
    if (item.content) {
      if (typeof item.content === 'string') {
        this.detail.data = JSON.parse(item.content).data
      } else {
        this.detail.data = item.content.data
      }
    }
  }
  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  /** ========================== 获取 好友 列表 ======================== */
  public getDataList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      admin_username: this.page.admin_username,
      action: this.page.action
    };

    this.api.Http({ name: 'adminUserBehaviorList', data: data }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.adminUser = res.data.admin_user;
        this.adminType = res.data.type;
      }
    });
  }
  public search() {
    this.getDataList();
  }
  public resetSearch() {
    this.page = {
      index: 1,
      total: 0,
      admin_username: '',
      action: ''
    };
    this.getDataList();
  }
}
