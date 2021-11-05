import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from "../../../../tool/tool.service";

@Component({
  selector: 'app-report-stat-user-list',
  templateUrl: './report-stat-user-list.component.html',
  styleUrls: ['./report-stat-user-list.component.scss']
})

export class ReportStatUserListComponent implements OnInit {
  public tableList = [];
  public isShowPrivate = true;

  public partnerOption = {};
  public page = {
    index: 1,
    total: 0
  };

  public searchData = {
    page_index: 1,
    page_size: this.api.pageSize,
    partner_sign: 'KLC',
    user_id: '',
    parent_id: '',
    username: ''
  };

  constructor(public api: ApiService, public utils: ToolService, private modalService: NzModalService) {
  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      partner_sign: 'KLC',
      user_id: '',
      parent_id: '',
      username: ''
    };

    this.getDataList();
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.searchData.page_size = this.api.pageSize;

    this.api.Http({ name: 'playerReportList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.partnerOption = res.data.partner_option;
        this.searchData.partner_sign = res.data.default_partner;
      }
    });
  }
}
