import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';

import { saveAs } from 'file-saver';
import { ExcelService } from '../../../../api/excel.service';

@Component({
  selector: 'app-history-player-commission-list',
  templateUrl: './history-player-commission-list.component.html',
  styleUrls: ['./history-player-commission-list.component.scss']
})
export class HistoryPlayerCommissionListComponent implements OnInit {
  public tableList = [];
  public dateRange = [];
  public isDateRange = {};
  public page = {
    index: 1,
    total: 0
  };

  public searchData = {
    page_index: 1,
    page_size: this.api.pageSize + '',
    partner_sign: 'KLC'
  };

  public lotteryOption = [];
  public defaultSelect = '所有系列';

  constructor(
    public api: ApiService, public utils: ToolService, private modalService: NzModalService,
    private excelService: ExcelService, ) {
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

  // 获取数据列表
  public async getDataList() {
    this.searchData.page_index = this.page.index;

    const response = await this.api.Http({ name: 'playerCommission', data: { ...this.searchData } });
    const { success, data } = response;
    if (success) {
      this.page.total = data.total;
      this.tableList = data.data;
      this.lotteryOption = data.lottery_options;
      this.isDateRange = data.partner_option;
    }
  }

  // 选
  public doSelectLottery(event) {
    this.searchData['series_id'] = event[0];
    this.searchData['lottery_sign'] = event[1];
    this.searchData['method_sign'] = event[2];
  }
}
