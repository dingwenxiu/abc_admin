import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from "../../../../tool/tool.service";
import { saveAs } from "file-saver";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finance-withdraw-list',
  templateUrl: './finance-withdraw-list.component.html',
  styleUrls: ['./finance-withdraw-list.component.scss']
})
export class FinanceWithdrawListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  public totalPageAmount = 0;
  public totalPageRealAmount = 0;
  public totalRealAmount = 0;

  // 日志详情
  public logDetailData = {
    show: false,
    content: {
      status: 0,
      msg: '',
      data: {}
    },
    request_params: {
      order_id: 0,
      amount: 0,
      merchant_id: 0,
      source: '',
      channel: '',
      callback_url: '',
      client_ip: '',
      time: '',
      sign: ''
    },
  };

  // 审核数据
  public checkData = {
    show: false,
    buttonLoading: false,
    status_options: {
      "-2": "审核失败",
      "2": "审核成功"
    },
    id: 0,
    withdrawNeedBetTimes: 0,
    lastWithdraw: [],
    lastRecharge: [],
    account: {
      balance: 0,
      frozen: 0,
    },
    stat: {
      fetched_packet_amount: 0,
      send_packet_amount: 0,
      total_bet: 0,
      withdraw: 0,
      recharge: 0,
      gift: 0,
      total_recharge: 0,
      bet_times: 0,
    },
    user: {
      id: 0,
      nickname: '',
      fetched_packet_amount: 0,
      recharge: 0,
      withdraw: 0,
      register_time: '0',
      frozen_type: '',
    },
    order: {
      amount: 0,
      card_number: "",
    },
    data: {
      status: "2",
      reason: '',
      fund_password: ""
    },
  };

  // 手动
  public handData = {
    show: false,
    buttonLoading: false,
    type_options: {
      1: "人工失败",
      2: "人工成功"
    },
    id: 0,
    data: {
      type: 0,
      amount: 0,
      reason: '',
      fund_password: ""
    },
  };

  public dateRange = [];
  public searchData = {
    page_index: 1,
    page_size: this.api.pageSize,
    order_id: '',
    username: '',
    user_id: '',
    start_time: '',
    end_time: '',
    status: 'all',
  };

  // 手动
  public withdrawOrderData = {
    show: false,
    buttonLoading: false,
    data: {
      user_id: 0,
      amount: 0,
      fund_password: ""
    },
  };

  public status_options = {
    "0": '初始化',
    "1": '已领取',
    "2": '审核成功',
    "3": '代发成功',
    "4": '回调成功',
    "5": '人工成功',
    "-2": '审核失败',
    "-3": '代发失败',
    "-4": '回调失败',
    "-5": '人工失败',
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public http: HttpClient,
    private modalService: NzModalService
  ) { }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 手动操作
  public doHand(item: any) {
    this.handData.data.amount = item.amount;
    this.handData.id = item.id;
    this.handData.show = true;
  }

  // 返回
  public back() {
    this.logDetailData.show = false;
    this.checkData.show = false;
    this.withdrawOrderData.show = false;
  }

  // 跳转到日志列表
  public logDetail(item: any) {
    this.api.Http({ name: 'withdrawLogShow', attach: item.id }).then((res: any) => {
      if (res.success) {
        this.logDetailData.show = true;
        this.logDetailData.content = JSON.parse(res.data.content);
        this.logDetailData.request_params = res.data.request_params
      }
    });
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.Http({ name: 'withdrawList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.totalPageAmount = res.data.pageTotalAmount;
        this.totalPageRealAmount = res.data.pageTotalRealAmount;
        this.totalRealAmount = res.data.totalRealAmount;
        this.tableList = res.data.data;
      }
    });
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.searchData.start_time = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_time = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  // 导出数据
  public export() {
    let href = "withdrawList?";
    for (let i of Object.keys(this.searchData)) {
      href += i + "=" + this.searchData[i] + "&";
    }
    href += "is_export=1";

    this.http.get(this.api.domain + href, { responseType: 'blob' }).subscribe(response => saveAs(response, "提现列表.csv"));
  }

  // 获取数据列表
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      order_id: '',
      username: '',
      user_id: '',
      start_time: '',
      end_time: '',
      status: 'all',
    };

    this.getDataList();
  }

  // 搜索
  public doSearch() {
    this.page.index = 1;
    this.getDataList();
  }
}
