import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from 'src/app/tool/tool.service';

@Component({
  selector: 'app-report-agent-bonus',
  templateUrl: './report-agent-bonus.component.html',
  styleUrls: ['./report-agent-bonus.component.scss']
})
export class ReportAgentBonusComponent implements OnInit {
  constructor(public api: ApiService, public utils: ToolService, private modalService: NzModalService) { }

  public partnerOption = {};
  public lotteryOption = {};

  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign: 'KLC',
    username: '',
    user_id: '',
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
  public onChange(result: Date): void {
    this.searchData.start_day = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_day = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  // 搜索
  public resetSearch() {
    this.searchData = {
      page_index: 1,
      page_size: 15,
      partner_sign: 'KLC',
      username: '',
      user_id: '',
      start_day: '',
      end_day: ''
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
    this.api.Http({ name: 'dividendList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;

        this.partnerOption = res.data.partner_options;
        this.lotteryOption = res.data.lottery_option;
      }
    });
  }
}
