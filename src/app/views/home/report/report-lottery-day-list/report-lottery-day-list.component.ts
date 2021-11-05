import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-report-lottery-day-list',
  templateUrl: './report-lottery-day-list.component.html',
  styleUrls: ['./report-lottery-day-list.component.scss']
})

export class ReportLotteryDayListComponent implements OnInit {

  constructor(public api: ApiService, private modalService: NzModalService) { }

  public partnerOption = {};
  public lotteryOption = {};

  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign: 'KLC',
    lottery_sign: '',
    room_id: '',
    start_day: '',
    end_day: ''
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

  // 日期选择框
  onChange(result: Date): void {
    this.searchData.start_day = result[0];
    this.searchData.end_day = result[1];
  }

  // 搜索
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      partner_sign: 'KLC',
      lottery_sign: '',
      room_id: '',
      start_day: '',
      end_day: ''
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
    this.api.Http({ name: 'lotteryReportDayList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;

        this.partnerOption = res.data.partner_option;
        this.lotteryOption = res.data.lottery_option;
        this.searchData.partner_sign = res.data.default_partner;
      }
    });
  }

  // 选
  public doSelectLottery(event) {
    this.searchData.lottery_sign = event[1];
    this.getDataList();
  }
}
