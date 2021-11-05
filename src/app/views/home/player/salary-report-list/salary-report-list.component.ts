import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-salary-report-list',
  templateUrl: './salary-report-list.component.html',
  styleUrls: ['./salary-report-list.component.scss']
})

export class SalaryReportListComponent implements OnInit {
  public tableList = [];

  public page = {
    index: 1,
    total: 0
  };

  public partnerOption  = {};

  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign:'',
    user_id: '',
    username: '',
    start_day: '',
    end_day: ''
  };

  constructor(public api: ApiService,  public utils: ToolService, private modalService: NzModalService  ) {
    this.searchData.partner_sign = utils.getDefaultPartnerSign();
  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  private getDataList() {
    this.searchData.page_index  = this.page.index;
    this.searchData.page_size   = this.api.pageSize;
    this.api.Http({name: 'salaryReportList', data:this.searchData}).then(async (res: any) => {
      const {data} = res;
      this.tableList      = data.data;
      this.page.total     = data.total;
      this.partnerOption  = data.partner_option;
    });
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      partner_sign:'',
      page_size: this.api.pageSize,
      user_id: '',
      username: '',
      start_day: '',
      end_day: ''
    };

    this.getDataList();
  }

  // 日期选择框
  onChange(result: Date): void {
    this.searchData.start_day = this.utils.formatTime(result[0]);
    this.searchData.end_day   = this.utils.formatTime(result[1]);
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

}
