import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';
@Component({
  selector: 'app-history-partner-behavior-list',
  templateUrl: './history-partner-behavior-list.component.html',
  styleUrls: ['./history-partner-behavior-list.component.scss']
})
export class HistoryPartnerBehaviorListComponent implements OnInit {
  public tableList = [];
  public dateRange = [];
  public dateRangeList = {};
  public contentPop = {
    show: false,
    data: ''
  };
  public page = {
    index: 1,
    total: 0
  };

  public adminUserList = {};

  public searchData = {
    page_index: 1,
    page_size: this.api.pageSize + '',
    partner_sign:'KLC'
  };

  constructor(
    public api: ApiService,
    public utils: ToolService, private modalService: NzModalService, ) {

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
      partner_sign: 'KLC'
    };
    this.dateRange = [];
    this.getDataList();
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.searchData['start_time'] = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  // 选择日期
  public onCelen($event) {
    if ($event.length > 1) {
      this.dateRange = [this.utils.timeCelen($event[0], 0), this.utils.timeCelen($event[1], 1)];
    }
  }

  // 点击时间选项框
  public timeHandle() {
    this.dateRange = [this.utils.timeInit(), this.utils.timeInit()];
  }
  public lockTd(item: any) {
    this.contentPop = {
      show: true,
      data: item.params
    };
  }

  // 获取数据列表
  public async getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.getPartnerBehavior(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.adminUserList = res.data.partner_admin_user;
        this.dateRangeList = res.data.partner_options;
      }
    })
  }
}
