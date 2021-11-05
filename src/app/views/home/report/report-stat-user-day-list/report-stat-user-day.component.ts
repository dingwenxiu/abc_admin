import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-report-stat-user-day',
  templateUrl: './report-stat-user-day.component.html',
  styleUrls: ['./report-stat-user-day.component.scss']
})

export class ReportStatUserDayComponent implements OnInit {

  public isShowPrivate = true;
  public partnerOption = {};

  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign: 'KLC',
    user_id: '',
    username: '',
    start_day: '',
    end_day: ''
  };

  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  public checkData = {
    show: false,
    data: []
  };

  public statDetailData = {
    show: false,
    id: 0,
    data: {
      recharge: 0.00,
      recharge_count: 0,
      withdraw: 0.00,
      withdraw_count: 0,
      manual_recharge: 0,
      manual_reduce: 0,

      send_packet_count: 0,
      send_packet_amount: 0.00,
      fetched_packet_count: 0,
      fetched_packet_amount: 0.00,
      expired_back: 0,

      landmine_in_count: 0,
      landmine_amount_in: 0.00,

      landmine_out_count: 0,
      landmine_amount_out: 0.00,

      brokerage_from_child: 0.00,
      brokerage_to_parent: 0.00,

      lucky_landmine_bonus: 0,
      lucky_number_bonus: 0,

      total_be_fetched_landmine_count: 0,
      total_be_fetched_count: 0,
      rate: 0,
    },
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 检测
  check(id: any) {
    this.api.Http({ name: 'playerReportDayCheck', attach: id }).then((res: any) => {
      if (res.success) {
        this.checkData.show = true;
        this.checkData.data = res.data;

      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.data.msg
        });
      }
    });
  }

  // 回退
  public back() {
    this.checkData.show = false;
    this.statDetailData.show = false;
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 日期选择框
  onChange(result: Date): void {
    this.searchData.start_day = this.utils.formatTime(result[0]);
    this.searchData.end_day = this.utils.formatTime(result[1]);
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      partner_sign: 'KLC',
      page_size: this.api.pageSize,
      user_id: '',
      username: '',
      start_day: '',
      end_day: ''
    };

    this.getDataList();
  }

  /**
   * 切换select
   *
   * @memberof ReportStatUserDayComponent
   */
  public changeSelect(e) {
    this.searchData.partner_sign = e;
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.searchData.page_size = this.api.pageSize;

    this.api.Http({ name: 'playerReportDayList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.partnerOption = res.data.partner_option;
        // this.searchData.partner_sign  = res.data.default_partner;
      }
    });
  }
}
