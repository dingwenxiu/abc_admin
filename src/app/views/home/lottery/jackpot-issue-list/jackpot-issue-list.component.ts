import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-jackpot-issue-list',
  templateUrl: './jackpot-issue-list.component.html',
  styleUrls: ['./jackpot-issue-list.component.scss']
})
export class JackpotIssueListComponent implements OnInit {
  public isDetails = {
    show: false,
    total: 0,
    index: 1,
    page_size: 20
  }
  public detailsData = {
    partner_sign: '',
    lottery_sign: '',
    day: '',
    page_index: this.isDetails.index,
    page_size: this.isDetails.page_size
  }
  public detailsList = [];
  public tableList = [];
  public adminUserList = [];
  public dateRange = {};
  // 商户列表
  public signList = [];
  public isIssue = false;
  // 对话框参数
  public page = {
    index: 1,
    total: 0
  };
  // 默认系列
  public defaultSeriesSign = 'all';
  // tab选项
  public lotteryTabOption = [{ value: 'all', label: '所有系列' }];
  // 选择系列
  public seriesOption = [];
  public seriesTabOption = [];
  // 默认索引
  public tabIndex = 0;

  public day_stat = null;
  public lottery = ['ssc', 'klcjsffc'];
  public day = [];
  // 搜索参数
  public lotteryOption = [];
  public searchData = {
    partner_sign: 'KLC',
    lottery_sign: 'all',
    page_size: '10',
    day: null,
    page_index: null,
    issue: ''
  };

  public detailPop = {
    show: false,
    data: {}
  };
  public detailList = [];

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.time();
    this.getDataList();
  }
  //今日到点击时的时间
  public time() {
    let day = new Date();
    let Today = (this.utils.formatTime(day, 'YYYY-MM-DD'));
    this.searchData.day = Today;
    this.day = Today;
  }
  // 初始化列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    // if (this.searchData.lottery_sign == 'all') {
    //   this.message.error(
    //     '不能搜索所有玩法',
    //     { nzDuration: 5000 }
    //   );
    //   return;
    // }
    let obj = {
      partner_sign: this.searchData.partner_sign,
      lottery_sign: this.searchData.lottery_sign,
      page_size: '10',
      day: this.searchData.day,
      page_index: this.searchData.page_index,
      issue: this.searchData.issue
    };
    if (obj.lottery_sign === 'all') {
      obj.lottery_sign = null;
    }
    this.api.getJackpotIssueList(obj).then((res: any) => {
      const { data, success } = res;
      if (success) {
        let list = [];
        for (let i = 0; i < data.lottery_options.length; i++) {
          list.push({ label: data.lottery_options[i].label, isLeaf: false, value: data.lottery_options[i].value, children: data.lottery_options[i].children })
          if (list[i].children) {
            for (let j = 0; j < list[i].children.length; j++) {
              list[i].children[j].children = [];
              list[i].children[j].isLeaf = true;
            }
          }
        }
        this.lotteryOption = list;
        this.dateRange = data.partner_options;
        // this.lotteryOption = data.lottery_options;
        this.tableList = data.data;
        this.page.total = data.total;

        // tab选项
        this.seriesOption = data.series_options;
        this.seriesTabOption = data.series_tab_options;
      }
      // if (res.success) {
      //   this.page.total = res.data.total;
      //   this.tableList = res.data.data;
      //   this.day_stat = res.data.day_stat;
      //   this.dateRange = res.data.partner_options;
      //   let arr = res.data.lottery_options;
      //   if (arr) {
      //     arr.forEach(ele => {
      //       for (let i = 0; i < ele.children.length; i++) {
      //         delete ele.children[i].children;
      //         ele.children[i].isLeaf = true;
      //       }
      //     });
      //   }
      //   this.lotteryOptions = arr;
      // }
    });
  }
  // 分页
  public pageChange() {
    this.getDataList();
  }
  public DetailpageChange() {
    this.getDataList();
  }
  // 搜索
  public doSearch() {
    if (this.searchData.issue) {
      this.isIssue = true;
    }else{
      this.isIssue = false;
    }
    this.getDataList();
  }
  // 
  public pageSearch() {
    this.detailsData.page_index = this.isDetails.index;
    this.detail(this.detailsData);
  }
  // 重置
  public resetSearch() {
    this.searchData = {
      partner_sign: '',
      lottery_sign: 'all',
      day: null,
      page_size: '10',
      issue: '',
      page_index: null
    };
    this.isIssue = false;
    this.lottery = ['ssc', 'klcjsffc'];
    this.lotteryTabOption = [{ value: 'all', label: '所有系列' }];
    this.getDataList();
  }
  // 选择系列
  public doChangeSeries($event) {
    this.defaultSeriesSign = $event;
    this.lotteryTabOption = $event === 'all' ? [{ value: 'all', label: '所有系列' }] : this.seriesTabOption[$event];
    this.tabIndex = 0;
    this.doTabChange(this.lotteryTabOption[0].value);
  }
  public onGenLhcIssueDateChange(result) {
    let open_time = this.utils.formatDateTime(result);
    open_time = open_time.substring(0, 10);
    this.searchData.day = open_time;
  }

  public doDetail(item) {
    this.isDetails.show = true;
    this.detailsData = {
      partner_sign: item.partner_sign,
      lottery_sign: item.lottery_sign,
      day: item.day,
      page_index: this.isDetails.index,
      page_size: this.isDetails.page_size
    }
    this.detail(this.detailsData);
  }
  public detail(data) {
    this.api.getIssueDetail(data).then((res: any) => {
      if (res.success) {
        this.detailsList = res.data.data;
        this.isDetails.total = res.data.total;
      }
    });
  }
  public doTabChange(lotterySign) {
    this.searchData.lottery_sign = lotterySign;
    this.api.getJackpotIssueList(this.searchData).then((res: any) => {
      const { data, success } = res;
      if (success) {
        this.tableList = data.data;
        this.page.total = data.total;
      }
    });
  }
}
