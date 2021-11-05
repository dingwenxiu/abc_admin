import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import { differenceInCalendarDays, endOfMonth } from 'date-fns';



@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})

/**
 * 奖期列表
 */
export class IssueListComponent implements OnInit {

  constructor(
    public utils: ToolService,
    private modalService: NzModalService,
    public api: ApiService,
    public router: Router,
    private message: NzMessageService
  ) {

  }

  public tableList = [];
  public dateRange = [];
  public today = new Date();

  public issueCancelData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      fund_password: '',
    }
  };

  // 号码录入
  public encodeData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      code: '',
      fund_password: '',
    }
  };

  public issueOpenData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      fund_password: '',
    }
  };

  public issueSendData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      fund_password: '',
    }
  };

  public issueTraceData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      fund_password: '',
    }
  };

  public issueCommissionData = {
    show: false,
    lottery_name: '',
    issue: '',
    id: '',
    data: {
      fund_password: '',
    }
  };

  public detail = {
    show: false,
    data: {
      lottery_name: '',
      issue: '',
      official_code: '',
      begin_time: '',
      end_time: '',
      allow_encode_time: '',
      time_open: '',
      time_end_open: '',
      status_process: '',
      time_send: '',
      time_end_send: '',
      time_trace: '',
      time_end_trace: '',
      status_trace: '',
      time_commission: '',
      time_end_commission: '',
      status_commission: '',
    }
  };

  public genIssueDefaultSeries = ['ssc'];
  public genIssueDateRange = [];
  public genIssueLhcDate = null;
  public genIssueData = {
    show: false,
    type: 'day',
    data: {
      action: "process",
      lottery_sign: 'all',
      start_day: '',
      end_day: '',
      start_issue: '',
      open_time: '',
      issue: '',
      end_time: ''
    }
  };

  public delIssueDefaultSeries = 'all';
  public delIssueDateRange = [];
  public delIssueData = {
    show: false,
    data: {
      action: "process",
      lottery_sign: 'all',
      start_day: '',
      end_day: '',
    }
  };

  public searchData = {
    page_index: 1,
    page_size: null,
    total: 1,
    issue: '',
    lottery_sign: 'all',
    start_time: '',
    end_time: '',
    series_id: 'all'
  };

  // 选择系列
  public seriesOption = [];
  public seriesTabOption = [];

  // 选择彩种
  public lotteryOption = [];

  // tab选项
  public lotteryTabOption = [{ value: 'all', label: '所有系列' }];

  // 默认系列
  public defaultSeriesSign = 'all';

  // 默认索引
  public tabIndex = 0;
  // 默认日期
  public ranges1 = [new Date(), endOfMonth(new Date())];


  public disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  ngOnInit() {
    this.time();
    this.getDataList();
  }

  public current() {
    this.searchData.page_index = 1;
    this.setTime('00:00:00');
  }

  public async theDay() {
    this.searchData.page_index = 1;
    this.setTime('00:00:00', '23:59:59');
  }

  private setTime(dateMin, dateMax = '') {
    this.api.Http({name: 'getTimeNow'}).then(res => {
      const {success, data} = res;
      if (success) {
        const date = new Date(data);
        const dateReset = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const [min, max] = [new Date(`${dateReset} ${dateMin}`), new Date(dateMax ? `${dateReset} ${dateMax}` : date)];
        this.searchData['start_time'] = this.utils.formatTime(min, 'YYYY-MM-DD HH:MM:SS');
        this.searchData['end_time'] = this.utils.formatTime(max, 'YYYY-MM-DD HH:MM:SS');
        this.dateRange = [this.searchData['start_time'], this.searchData['end_time']];
        this.getDataList();
      }
    });
  }

  //今日到点击时的时间
  public time() {
    let day = new Date();
    let Today = (this.utils.formatTime(day, 'YYYY-MM-DD')) + ' ' + '00:00:00';
    let Today1 = (this.utils.formatTime(day, 'YYYY-MM-DD HH:MM:SS'));
    this.dateRange = [new Date(Today), new Date()];
    this.searchData.start_time = Today;
    this.searchData.end_time = Today1;
  }
  // 获取特定时间前得日期
  public getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if (day <= n) {
      if (mon > 1) {
        mon = mon - 1;
      } else {
        year = year - 1;
        mon = 12;
      }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    let Seven = new Date(s);
    let Today = (this.utils.formatTime(Seven, 'YYYY-MM-DD')) + ' ' + '00:00:00';
    this.dateRange = [new Date(Today), new Date()];
    this.searchData.start_time = Today;
  }
  // 选择系列
  public doChangeSeries($event) {
    if ($event == 'sd' || $event == 'p3p5') {
      this.getBeforeDate(7);
    } else {
      this.time();
    }
    this.defaultSeriesSign = $event;
    this.lotteryTabOption = $event === 'all' ? [{ value: 'all', label: '所有系列' }] : this.seriesTabOption[$event];
    this.tabIndex = 0;
    this.doTabChange(this.lotteryTabOption[0].value);
  }


  public search() {
    this.getDataList();
  }

  public resetSearchData() {
    this.defaultSeriesSign = 'all';
    this.dateRange = [];
    this.searchData = {
      page_index: 1,
      page_size: null,
      total: 1,
      issue: '',
      lottery_sign: 'all',
      start_time: '',
      end_time: '',
      series_id: 'all'
    };
    this.getDataList();
  }

  // 获取数据列表detailPop
  private getDataList() {
    this.searchData.page_size = this.api.pageSize;
    this.api.Http({ name: 'issueList', data: this.searchData }).then((res: any) => {
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
        // this.lotteryOption = data.lottery_options;
        this.tableList = data.data;
        this.searchData.total = data.total;

        // tab选项
        this.seriesOption = data.series_options;
        this.seriesTabOption = data.series_tab_options;
      }
    });
  }

  // 修改Tab
  public doTabChange(lotterySign) {
    this.searchData.lottery_sign = lotterySign;
    this.searchData.page_index = 1;
    this.api.Http({ name: 'issueList', data: this.searchData }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        this.tableList = data.data;
        this.searchData.total = data.total;
      }
    });
  }

  // 页面变更
  public doPageChange(e) {
    this.searchData.page_index = e;
    this.getDataList();
  }

  // 日期选择框
  public onChange(result: Date): void {
    const { time1, time2 } = this.utils.timeIsNow(result);
    const newTime1 = time1 ? result[0] : this.utils.timeToZero(result[0]);
    const newTime2 = time2 ? result[1] : this.utils.endTime(result[1]);
    this.searchData['start_time'] = this.utils.formatTime(new Date(newTime1).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(new Date(newTime2).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.dateRange = [new Date(newTime1), new Date(newTime2)];
  }

  // 点击时间选项框
  public timeHandle() {
    this.dateRange = [this.utils.timeInit(), this.utils.timeInit()];
    this.searchData['start_time'] = this.utils.formatTime(this.dateRange[0], 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(this.dateRange[1], 'YYYY-MM-DD HH:MM:SS');
  }

  public doDetail(data) {
    this.detail.show = true;
    this.detail.data = data;
  }

  public genIssue() {
    this.genIssueData.show = true;
  }

  // 生成奖期彩种切换
  public doSelectLottery(event) {
    this.genIssueData.data.lottery_sign = event[1];

    this.genIssueData.data.action = "option";
    this.api.Http({ name: 'issueGen', data: this.genIssueData.data }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        this.genIssueDateRange = [new Date(data.start_day), new Date(data.end_day)];
        this.genIssueData.data.start_day = data.start_day;
        this.genIssueData.data.end_day = data.end_day;

        this.genIssueData.type = data.type;
      }
    });
  }


  // 生成奖期时间切换
  public onGenIssueDateChange(result) {
    let startDay = this.utils.getDay(result[0]);
    let endDay = this.utils.getDay(result[1]);

    this.genIssueData.data.start_day = startDay;
    this.genIssueData.data.end_day = endDay;
    this.genIssueDateRange = [new Date(startDay), new Date(endDay)];
  }

  // 生成奖期时间切换
  public onGenLhcIssueDateChange(result) {

    let open_time = this.utils.formatDateTime(result);
    let end = result;
    open_time = open_time.substring(0, 10) + ' ' + '21:10:00';
    this.genIssueData.data.open_time = open_time;
    // this.genIssueData.data.open_time = `${open_time.split(' ')[0]} 21:10:00`;
    // this.genIssueLhcDate = new Date(result);
  }

  // 提交申城奖期
  public doSubmitGenIssue() {
    this.genIssueData.data.action = "process";
    let params = {};
    let end_time = new Date(this.genIssueData.data.open_time);
    let endTime = end_time.setDate(end_time.getDate() + 1);
    let end = this.utils.formatDateTime(endTime);
    if (this.genIssueData.data.lottery_sign == 'hklhc') {
      params = {
        lottery_sign: 'hklhc',
        issue: this.genIssueData.data.issue,
        open_time: this.genIssueData.data.open_time,
        end_time: end
      };
    } else {
      params = this.genIssueData.data;
      delete this.genIssueData.data.open_time;
    }
    if (params['lottery_sign'] == 'all') {
      this.message.error('请选择彩种', {
        nzDuration: 1000,
      });
      return;
    }
    this.api.Http({ name: 'issueGen', data: params }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      } else {
        this.message.error(data.msg, {
          nzDuration: 1000,
        });
      }
    });
  }

  /** ================ 奖期 删除 =============== **/
  public delIssue() {
    this.delIssueData.show = true;
  }

  // 生成奖期彩种切换
  public delIssueSelectLottery(event) {
    this.delIssueData.data.lottery_sign = event[1];

    // this.delIssueData.data.action = "option";
    // this.api.Http({ name: 'issueDel', data: this.delIssueData.data }).then((res: any) => {
    //   const { data, success } = res;
    //   if (success) {
    //     this.delIssueDateRange = [new Date(data.start_day), new Date(data.end_day)];
    //     this.delIssueData.data.start_day  = data.start_day;
    //     this.delIssueData.data.end_day    = data.end_day;
    //   }
    // });
  }

  // 生成奖期时间切换
  public onDelIssueDateChange(result) {
    // let startDay = this.utils.getDay(result[0]);
    let startDay = this.utils.formatTime(result[0], 'YYYY-MM-DD HH:MM:SS');
    let endDay = this.utils.formatTime(result[1], 'YYYY-MM-DD HH:MM:SS');
    this.delIssueData.data.start_day = startDay;
    this.delIssueData.data.end_day = endDay;
    this.delIssueDateRange = [new Date(startDay), new Date(endDay)];
  }

  // 提交申城奖期
  public doSubmitDelIssue() {
    this.delIssueData.data.action = "process";
    this.api.Http({ name: 'issueDel', data: this.delIssueData.data }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        this.delIssueData = {
          show: false,
          data: {
            action: "process",
            lottery_sign: '',
            start_day: '',
            end_day: '',
          }
        };
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      } else {
        this.message.create('error', res.msg);
      }
    });
  }

  public submitEdit() {

  }

  /* ======================== 录号 ======================= */
  // 显示录号页面
  public doEncodeView(item) {

    this.encodeData.lottery_name = item.lottery_name;
    this.encodeData.issue = item.issue;
    this.encodeData.id = item.id;

    this.encodeData.show = true;
  }

  public doEncodeSubmit() {
    this.api.Http({ name: 'issueEncode', data: this.encodeData.data, attach: this.encodeData.id }).then((res: any) => {
      const { success } = res;
      if (success) {
        this.encodeData.show = false;
        this.encodeData.id = '';
        this.encodeData.lottery_name = '';
        this.encodeData.issue = '';

        this.getDataList();
      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }

  /* ======================== 撤单 ======================= */
  public doCancel(item) {
    this.issueCancelData.lottery_name = item.lottery_name;
    this.issueCancelData.issue = item.issue;
    this.issueCancelData.id = item.id;

    this.issueCancelData.show = true;
  }

  public doCancelSubmit() {
    this.api.Http({ name: 'issueCancel', data: this.issueCancelData.data, attach: this.issueCancelData.id }).then((res: any) => {
      const { success } = res;
      if (success) {
        this.getDataList();
        this.message.success(res.msg, {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }

  /* ======================== 开奖 ======================= */
  public doOpen(item) {
    this.issueOpenData.lottery_name = item.lottery_name;
    this.issueOpenData.issue = item.issue;
    this.issueOpenData.id = item.id;

    this.issueOpenData.show = true;
  }

  public doOpenSubmit() {
    this.api.Http({ name: 'issueOpen', data: this.issueOpenData.data, attach: this.issueOpenData.id }).then((res: any) => {
      const { success } = res;
      if (success) {
        this.issueOpenData.show = false;
        this.issueOpenData.id = '';
        this.issueOpenData.lottery_name = '';
        this.issueOpenData.issue = '';

        this.getDataList();
      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }

  /* ======================== 派奖 ======================= */
  public doSend(item) {
    this.issueSendData.lottery_name = item.lottery_name;
    this.issueSendData.issue = item.issue;
    this.issueSendData.id = item.id;

    this.issueSendData.show = true;
  }

  public doSendSubmit() {
    this.api.Http({ name: 'issueSend', data: this.issueSendData.data, attach: this.issueSendData.id }).then((res: any) => {
      const { success } = res;
      if (success) {
        this.issueSendData.show = false;
        this.issueSendData.id = '';
        this.issueSendData.lottery_name = '';
        this.issueSendData.issue = '';

        this.getDataList();
      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }

  /* ======================== 追号 ======================= */
  public doTrace(item) {
    this.issueTraceData.lottery_name = item.lottery_name;
    this.issueTraceData.issue = item.issue;
    this.issueTraceData.id = item.id;

    this.issueTraceData.show = true;
  }

  public doTraceSubmit() {
    this.api.Http({ name: 'issueTrace', data: this.issueTraceData.data, attach: this.issueTraceData.id }).then((res: any) => {
      const { success } = res;
      if (success) {
        this.issueTraceData.show = false;
        this.issueTraceData.id = '';
        this.issueTraceData.lottery_name = '';
        this.issueTraceData.issue = '';

        this.getDataList();
      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }

}
