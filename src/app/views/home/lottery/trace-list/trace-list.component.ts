import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { ExcelService } from '../../../../api/excel.service';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  styleUrls: ['./trace-list.component.scss']
})

export class TraceListComponent implements OnInit {
  public traceDetailList = [];

  public tableList = [];
  public title = [];

  public lotteryOptions = {};
  public defaultSelect = ['所有系列'];

  public detailPop = {
    show: false,
    data: {
      id: '',
      lottery_name: '',
      method_name: '',
      username: '',
      user_prize_group: '',
      bet_prize_group: '',
      price: '',
      count: '',
      mode: '',
      trace_total_cost: '',
      total_bonus: '',
      canceled_amount: '',
      start_issue: '',
      now_issue: '',
      end_issue: '',
      total_issues: '',
      finished_issues: '',
      canceled_issues: '',
      time_bought: '',
      status: '',
    }
  };

  public dateRange = [];

  public lottery_options = {};
  public series_options = {};

  public searchData = {
    page_size: this.api.pageSize + '',
    page_index: 1
  };

  public page = {
    index: 1,
    total: 0,
    totalPage: 0,
    selectedTotalPage: false
  };

  public detailSearchData = {
    page_size: 10,
    page_index: 1,
  };

  public pageDetail = {
    index: 1,
    total: 0
  };

  public exportPop = {
    show: false,
    loading: false
  };

  constructor(
    public utils: ToolService,
    public api: ApiService,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute,
    private excelService: ExcelService
  ) {

  }

  // 初始化
  ngOnInit() {
    const keyArray = ['win_stop', 'status'];
    keyArray.forEach( value => {this.searchData[value] = ''; });
    this.timeInitialization();
    this.activeRoute.queryParams.subscribe((res: any) => {
      this.title = res.title;
    });
  }

  private timeInitialization() {
    this.api.getTime().then( res => {
      const timestamp = res['data'];
      const [time1, time2] = [this.utils.timeCelen(timestamp, 0), this.utils.formatDateTime(timestamp)];
      this.dateRange = [time1, time2];
      this.searchData['start_time'] = time1;
      this.searchData['end_time'] = time2;
      this.getDataList();
    });
  }

  // 获取数据
  public getDataList() {
    const data = {};
    this.searchData.page_index = this.page.index;
    Object.assign(data, { ...this.searchData });
    this.api.Http({ name: 'traceList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.series_options = res.data.series_options;
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.lotteryOptions = res.data.lottery_options;
        this.page.totalPage = res.data.totalPage;
      }
    });
  }

  // 获取详情
  public getDetailList(item) {
    this.detailSearchData.page_index = this.pageDetail.index;
    this.api.Http({ name: 'traceDetail', data: this.detailSearchData, attach: item.id }).then((res: any) => {
      if (res.success) {
        this.traceDetailList = res.data.data;
        this.pageDetail.total = res.data.total;
      }
    });
  }

  // 详情
  public doDetail(item) {
    this.detailPop.show = true;
    this.detailPop.data = item;
    this.getDetailList(this.detailPop.data);
  }

  // 详情分页
  public pageDetailChange() {
    this.getDetailList(this.detailPop.data);
  }

  // 分页
  public pageChange() {
    this.getDataList();
  }


  // 回退
  public back() {

  }

  // 撤总追号
  public doCancel(item) {
    this.api.Http({ name: 'traceCancel', data: {}, attach: item.id }).then((res: any) => {
      if (res.success) {
        this.getDataList();
      }
    });
  }

  // 撤追号详情
  public doCancelDetail(item) {
    this.api.Http({ name: 'traceDetailCancel', data: {}, attach: item.id }).then((res: any) => {
      if (res.success) {
        this.getDetailList(this.detailPop.data);
      }
    });
  }

  // 搜索
  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  // 重置搜索
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_size: '20',
      page_index: 1
    };
    this.dateRange = [];
    this.getDataList();
  }

  // 日期选择框
  public onChange(result: Date): void {
    const {time1, time2} = this.utils.timeIsNow(result);
    const newTime1 = time1 ? this.utils.timeToZero(result[0]) : result[0];
    const newTime2 = time2 ? this.utils.timeToZero(result[1]) : result[1];
    this.searchData['start_time'] = this.utils.formatTime(new Date(newTime1).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(new Date(newTime2).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.dateRange = [new Date(newTime1), new Date(newTime2)];
  }

  // 选
  public doSelectLottery(event) {
    this.searchData['series_id'] = event[0];
    this.searchData['lottery_sign'] = event[1];
    this.searchData['method_sign'] = event[2];
    this.getDataList();
  }

  // 导出数据
  public async export(type) {
    if (type) {
      this.exportPop = {
        show: true,
        loading: false
      };

    } else {
      this.exportNowPage();
    }
  }

  private exportPage(tableData, fileName) {
    const logListArray = [];
    const tableList = tableData;
    for (const data of tableList) {
      logListArray.push(this.formatListXlsx(data));
    }
    this.excelService.exportAsExcelFile(logListArray, fileName);
  }

  private formatListXlsx(data) {
    return {
      追号ID: data.id,
      用户名: data.username,
      彩种: data.lottery_name,
      玩法: data.method_name,
      奖期: data.issue,
      开始奖期: data.start_issue,
      当前奖期: data.now_issue,
      结束奖期: data.times,
      总金额: data.trace_total_cost,
      投注模式: data.price,
      元角模式: data.mode,
      奖金组: data.bet_prize_group,
      追停: data.win_stop ? '是' : '否',
      总奖金: data.total_bonus,
      追号时间: data.time_bought,
      IP: data.ip,
      状态: this.switchStatus(data.status),
    };
  }

  private exportNowPage() {
    this.exportPage(this.tableList, '订单列表');
  }

  public async exportAllPage() {
    this.page.selectedTotalPage = true;
    this.exportPop.loading = true;
    const exportExcel = [];
    for (let i = 1; this.page.selectedTotalPage ; i++) {
      const response = await this.api.Http({
        name: 'projectList',
        data: {
          ...this.searchData,
          page_size: 2000,
          username_next: this.searchData['username_next'] ? '1' : '0',
          page_index: i
        }
      });
      const {data, success} = response;
      if (success) {
        exportExcel.push(...data.data);
      }
      if ( (!((i * 2000) % 100000) || !data.data.length) || !this.page.selectedTotalPage) {
        this.exportPage(exportExcel, `订单列表-${i}`);
      }
      if (!data.data.length) {
        break;
      }
    }
    this.exportPop = {
      show: false,
      loading: false
    };
    this.modalService.success({
      nzTitle: '温馨提示',
      nzContent: `下载完成`
    });
  }
  // public async exportAllPage() {
  //   const {totalPage, selectedTotalPage} = this.page;
  //   if (selectedTotalPage > totalPage) {
  //     const modal = this.modalService.error({
  //       nzTitle: '导出错误',
  //       nzContent: '导出页数不能大于总页数'
  //     });
  //     return;
  //   }
  //   if (selectedTotalPage <= 0) {
  //     const modal = this.modalService.error({
  //       nzTitle: '导出错误',
  //       nzContent: '导出页数不能为空'
  //     });
  //     return;
  //   }
  //   this.exportPop.loading = true;
  //   for (let i = 1; i <= this.page.selectedTotalPage ; i++) {
  //     const response = await this.api.Http({
  //       name: 'projectList',
  //       data: {
  //         ...this.searchData,
  //         username_next: this.searchData['username_next'] ? '1' : '0',
  //         page_index: i
  //       }
  //     });
  //     const {data, success} = response;
  //     if (success) {
  //       this.exportPage(data.data, `订单列表${i}`);
  //     }
  //   }
  //   this.exportPop = {
  //     show: false,
  //     loading: false
  //   };
  //   this.modalService.success({
  //     nzTitle: '温馨提示',
  //     nzContent: `下载完成`
  //   });
  // }

  private switchStatus(status) {
    switch (status) {
      case 0:
        return '追号中';
        break;
      case 1:
        return '中奖停止';
        break;
      case 2:
        return '追号完成';
        break;
      case 3:
        return '玩家撤单';
        break;
      case 4:
        return '管理员撤单';
        break;
      case 5:
        return '异常撤单';
        break;
      default:
        return status;
        break;
    }
  }

  public stopDownload() {
    this.page.selectedTotalPage = null;
    this.exportPop.loading = false;
  }
}
