import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';
import { ExcelService } from '../../../../api/excel.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit {
  public tableList = [];
  public dateRange = [];
  public contentPop = {
    show: false,
    data: ''
  };
  // 返点列表
  public commissionList = [];
  public accountChangeList = [];

  public lotteryOptions = {};
  public defaultSelect = ['所有系列'];

  public searchData = {
    page_size: this.api.pageSize + '',
    page_index: 1
  };

  public doCommissionData = {
    show: false,
    betCost: 0
  };

  public accountChangeData = {
    show: false,
    item: {},
    data: {
      hash_id: '',
      lottery_name: '',
      method_name: '',
      username: '',
      user_prize_group: '',
      bet_prize_group: '',
      ip: '',
      bet_from: '',
      is_tester: '',
      price: '',
      times: '',
      mode: '',
      count: '',
      total_cost: '',
      is_challenge: '',
      is_win: '',
      win_count: '',
      bonus: '',
      status_process: '',
      time_bought: '',
      time_send: '',
      time_commission: '',
      bet_number_view: '',
    }
  };

  public pageAccountChange = {
    index: 1,
    total: 0
  };

  public page = {
    index: 1,
    total: 0,
    totalPage: 0,
    selectedTotalPage: false
  };

  public exportPop = {
    show: false,
    loading: false
  };

  public detailPop = {
    show: false,
    data: {
      hash_id: '',
      lottery_name: '',
      method_name: '',
      username: '',
      user_prize_group: '',
      bet_prize_group: '',
      ip: '',
      bet_from: '',
      is_tester: '',
      price: '',
      times: '',
      mode: '',
      count: '',
      total_cost: '',
      is_challenge: '',
      is_win: '',
      win_count: '',
      bonus: '',
      status_process: '',
      time_bought: '',
      time_send: '',
      time_commission: '',
      bet_number_view: '',
    }
  };

  constructor(
    public utils: ToolService,
    public api: ApiService,
    public router: Router,
    private modalService: NzModalService,
    private httpClient: HttpClient,
    private excelService: ExcelService
  ) { }

  // 初始化
  ngOnInit() {
    this.searchData = {
      page_size: this.api.pageSize + '',
      page_index: 1,
    };
    const keyArray = ['is_tester', 'mode', 'is_win', 'price'];
    keyArray.forEach( value => {this.searchData[value] = ''; });
    this.timeInitialization();
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
    this.searchData.page_index = this.page.index;
    const data = {};
    Object.assign(data, this.searchData);
    if (data['is_win'] === '3') {
      delete data['is_win'];
      data['status'] = '1';
    } else if (data['is_win'] === '4') {
      delete data['is_win'];
      data['status'] = '4';
    }
    this.api.Http({
      name: 'projectList', data: {
        ...data,
        username_next: this.searchData['username_next'] ? '1' : '0'
      }
    }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.lotteryOptions = res.data.lottery_options;
        this.page.totalPage = res.data.totalPage;
      }
    });
  }

  // 分页
  public pageChange() {
    this.getDataList();
  }

  // 回退
  public back() {

  }

  // 撤单
  public doCancel(item: any) {
    this.api.Http({ name: 'projectCancel', data: {}, attach: item.hash_id }).then((res: any) => {
      const modal = this.modalService.success({
        nzTitle: '温馨提示',
        nzContent: res.msg
      });

      this.getDataList();
    });
  }

  // 详情
  public doDetail(item: any) {
    this.detailPop.show = true;
    this.detailPop.data = item;
  }

  // 显示返点
  public doCommissionFn(item) {
    this.api.Http({ name: 'projectCommission', data: {}, attach: item.hash_id }).then((res: any) => {
      if (res.success) {
        this.commissionList = res.data;
        this.doCommissionData.show = true;
        this.accountChangeData.show = false;
      }
    });
  }

  // 帐变
  public doAccountChange(item) {
    this.accountChangeData.item = item;
    this.api.Http({ name: 'projectAccountChange', data: {}, attach: item.hash_id }).then((res: any) => {
      if (res.success) {
        this.accountChangeList = res.data.data;
        this.pageAccountChange.total = res.data.total;
        this.accountChangeData.show = true;
        this.doCommissionData.show = false;
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
    this.searchData['start_time'] = this.utils.formatTime(result[0], 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(result[1], 'YYYY-MM-DD HH:MM:SS');
  }

  // 点击时间选项框
  public timeHandle() {
    this.dateRange = [this.utils.timeInit(), this.utils.timeInit()];
  }

  // 选
  public doSelectLottery(event) {
    this.searchData['series_id'] = event[0];
    this.searchData['lottery_sign'] = event[1];
    this.searchData['method_sign'] = event[2];
    this.getDataList();
  }

  // 详情分页
  public pageAccountChangeChange() {
    this.doAccountChange(this.accountChangeData.item);
  }

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
      订单号: data.hash_id,
      用户名: data.username,
      彩种: data.lottery_name,
      玩法: data.method_name,
      奖期: data.issue,
      追号ID: data.trace_main_id,
      金额: data.price,
      倍数: data.times,
      投注模式: data.price,
      模式: data.mode,
      奖金组: data.bet_prize_group,
      开奖号码: data.open_number,
      奖金: data.bonus,
      投注时间: data.time_bought,
      IP: data.ip,
      测试状态: data.is_tester ? '测试' : '非测试',
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
    for (let i = 1; this.page.selectedTotalPage; i++) {
      const response = await this.api.Http({
        name: 'projectList',
        data: {
          ...this.searchData,
          page_size: 2000,
          username_next: this.searchData['username_next'] ? '1' : '0',
          page_index: i
        }
      });
      const { data, success } = response;
      if (success) {
        exportExcel.push(...data.data);
      }
      if ((!((i * 2000) % 100000) || !data.data.length) || !this.page.selectedTotalPage) {
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

  private switchStatus(status) {
    switch (status) {
      case 0:
        return '待开奖';
        break;
      case 1:
        return '已撤单';
        break;
      case 2:
        return '已派奖';
        break;
      case 3:
        return '未中奖';
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
  public lockTd(item: any) {
    this.contentPop = {
      show: true,
      data: item.id
    };
  }
}
