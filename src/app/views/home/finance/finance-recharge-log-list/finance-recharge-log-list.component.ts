import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-finance-recharge-log-list',
  templateUrl: './finance-recharge-log-list.component.html',
  styleUrls: ['./finance-recharge-log-list.component.scss']
})

export class FinanceRechargeLogListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  public searchData = {};

  public log = {
    show: false,
    sendList: [],
    sendEditList: [],
    backEditList: []
  };

  public logData = {
    show: false
  };

  public logDetailData = {
    show:false,
    details: {
      username: '',
      nickname: '',
      ip: '',
      back_ip: '',
      request_reason: {
        message:"",
      },
      back_reason: '',
      request_time: '',
      back_time: '',
      request_status: 0,
      back_status: 0,
      amount: 0,
      request_params: {
        amount: 0,
        time: '',
        sign: '',
        source: '',
        order_id: '',
        merchant_id: '',
        client_ip: '',
        channel: '',
        callback_url: ''
      },
      request_back: {
        status: '',
        msg: '',
        data: {}
      }
    }
  };

  public dateRange = [];
  patnerOptions: any;

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  // 初始化列表
  public getDataList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      ...this.searchData
    };

    this.api.Http({name: 'rechargeLogList', data}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
        this.patnerOptions = res.data.partner_options;
      }
    });
  }

  public logDetail(item: any) {
    this.api.Http({name: 'rechargeLogDetail', attach:item.id}).then((res: any) => {
      if (res.success) {
        this.logDetailData.show = true;
        this.logDetailData.details = res.data;
      }
    });
  }

  public pageChange() {
    this.getDataList();
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.searchData['start_created_at'] = this.utils.formatTime(result[0], 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_created_at'] = this.utils.formatTime(result[1], 'YYYY-MM-DD HH:MM:SS');
  }

  // 点击时间选项框
  public timeHandle() {
    this.dateRange = [this.utils.timeInit(), this.utils.timeInit()];
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {};
    this.dateRange = [];
    this.getDataList();
  }
}
