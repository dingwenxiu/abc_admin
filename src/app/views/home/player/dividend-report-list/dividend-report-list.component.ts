import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import {ToolService} from '../../../../tool/tool.service';

@Component({
  selector: 'app-dividend-report-list',
  templateUrl: './dividend-report-list.component.html',
  styleUrls: ['./dividend-report-list.component.scss']
})

export class DividendReportListComponent implements OnInit {
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
    month: '',
  };


  constructor( public api: ApiService,  public utils: ToolService, private modalService: NzModalService ) {
    this.searchData.partner_sign = utils.getDefaultPartnerSign();
  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  private getDataList() {
    this.searchData.page_index  = this.page.index;
    this.searchData.page_size   = this.api.pageSize;
    this.api.Http({name: 'dividendReportList', data:this.searchData}).then(async (res: any) => {
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
      page_size: 15,
      partner_sign:'',
      user_id: '',
      username: '',
      month: '',
    };

    this.getDataList();
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }
}
