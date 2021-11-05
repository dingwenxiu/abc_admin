import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-report-stat-partner-add-list',
  templateUrl: './report-stat-partner-add-list.component.html',
  styleUrls: ['./report-stat-partner-add-list.component.scss']
})
export class ReportStatPartnerAddListComponent implements OnInit {
  constructor(public api: ApiService, private modalService: NzModalService) { }

  public partnerOption = {};
  public lotteryOption = {};

  public visible = false;

  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign: 'KLC'
  };

  public dateRange = [];
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  ngOnInit() {
    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }


  // 重置
  public resetSearch() {
    this.searchData = {
      page_index: 1,
      page_size: 15,
      partner_sign: 'KLC'
    };
    this.dateRange = [];
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
    this.api.getStatPartnerList(this.searchData).then((res: any) => {
      this.page.total = res.data.total;
      this.tableList = res.data.data;
      this.partnerOption = res.data.partner_options;
    });
  }
  // 详情
  public details(){
    this.visible = true;
  }
}
