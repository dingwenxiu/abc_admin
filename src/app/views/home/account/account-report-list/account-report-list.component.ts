import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-account-report-list',
  templateUrl: './account-report-list.component.html',
  styleUrls: ['./account-report-list.component.scss']
})

export class AccountReportListComponent implements OnInit {
  public tableList = [];

  public partnerOption = {};
  public lotteryOptions = {};

  public page = {
    index: 1,
    total: 0
  };

  // 帐变类型
  public searchDataType = {};
  public searchData = {
    page_index: 1,
    page_size: 15,
    type: '',
    username: '',
    partner_sign: 'KLC',
    lottery_sign: '',
    method_sign: '',
    user_id: '',
    project_id: '',
    start_time: '',
    end_time: ''
  };

  // 帐变详情
  public log = {
    show: false,
    sendList: [],
    sendEditList: {
      add_time: '',
      amount: '',
      id: null,
      landmine_number: null,
      landmine_times: null,
      nickname: null,
      packet_count: null,
      room_name: null,
      status: '',
      type: null,
    },
    backEditList: []
  };
  public openNumber = 1;

  public dateRange = [];
  public defaultSelect = ['all', 'all', 'all'];

  // 返点数据
  public commissionData = {
    show: false,
    page: {
      index: 1,
      total: 0
    },
    search: {
      'account_change_id': 0,
      'lottery_sign': '',
      'issue': '',
    },
    data: []
  };

  // 订单数据
  public projectData = {
    show: false,
    data: {}
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService
  ) {
  }

  // 初始化
  ngOnInit() {
    this.defaultSelect = ['all', '所有彩种', '所有玩法'];
    this.getDataList();
  }

  // 查看订单详情
  public accountChangeReportDetail(item: any) {
    this.api.Http({ name: 'accountChangeDetail', data: {}, attach: item.id }).then((res: any) => {
      if (res.success) {
        this.log.show = true;
        this.log.sendEditList = this.api.filterData(this.log.sendEditList, res.data.send);
        this.log.backEditList = res.data.fetch;
      }
    });
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.searchData.start_time = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_time = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: 15,
      type: '',
      username: '',
      partner_sign: 'KLC',
      lottery_sign: '',
      method_sign: '',
      user_id: '',
      project_id: '',
      start_time: '',
      end_time: ''
    };

    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.searchData.page_size = this.api.pageSize;
    this.api.accountChangeReportList(this.searchData).then((res: any) => {
      if (res.success) {
        this.searchDataType = res.data.type_options;
        this.page.total = res.data.total;
        this.tableList = res.data.data;

        this.lotteryOptions = res.data.lottery_options;
        this.partnerOption = res.data.partner_option;
      }
    })
    // this.api.Http({ name: 'accountChangeList', data: this.searchData }).then((res: any) => {
    //   if (res.success) {
    //     this.searchDataType = res.data.type_options;
    //     this.page.total = res.data.total;
    //     this.tableList = res.data.data;

    //     this.lotteryOptions = res.data.lottery_options;
    //     this.partnerOption = res.data.partner_option;
    //   }
    // });
  }

  // 选
  public doSelectLottery(event) {
    console.log(this.defaultSelect);
    this.searchData.lottery_sign = event[1];
    this.searchData.method_sign = event[2];
    if (event[2] == 'all') {
      this.defaultSelect[1] = '所有彩种';
      this.defaultSelect[2] = '所有玩法';
    }
    this.getDataList();
  }
  public projectClose() {
    this.projectData.show = false;
  };

  public doShowProjectDetail(item) {
    this.api.accountChangeReportDetail({ partner_sign: item.partner_sign }, item.hash_id).then((res: any) => {
      if (res.success) {
        if (res.data.open_number.length > 0) {
          this.openNumber = 1;
          this.projectData.show = true;
        } else {
          this.projectData.show = false;
          return;
        }
        res.data.open_number = res.data.open_number.split(',');
        res.data.bet_number_view = res.data.bet_number_view.replace(/&/g, ' ');
        this.projectData.data = res.data;
      }
    });
    // this.api.Http({ name: 'projectDetail', attach: id }).then((res: any) => {
    //   if (res.success) {
    //     this.projectData.data = res.data;
    //     this.projectData.show = true;
    //   } else {

    //   }
    // });
  }

  // 显示返点详情
  public doShowCommissionDetail(id) {
    this.commissionData.search.account_change_id = id;
    this.api.Http({ name: 'commissionList', data: this.commissionData.search }).then((res: any) => {
      if (res.success) {
        this.commissionData.page.total = res.data.total;
        this.commissionData.search = res.data.data;
        this.commissionData.show = true;
      }
    });
  }
}
