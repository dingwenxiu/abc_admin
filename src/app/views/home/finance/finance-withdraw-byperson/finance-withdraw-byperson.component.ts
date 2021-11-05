import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';
import { ExcelService } from '../../../../api/excel.service';

@Component({
  selector: 'app-finance-withdraw-byperson',
  templateUrl: './finance-withdraw-byperson.component.html',
  styleUrls: ['./finance-withdraw-byperson.component.scss']
})
export class FinanceWithdrawBypersonComponent implements OnInit {
  public tableList = [];
  public dateRange = [];
  public isShowPrivate = true;

  public page = {
    index: 1,
    total: 0,
    totalPage: 0,
    selectedTotalPage: false
  };
  public pageTotalRealAmount = '';
  public totalRealAmount = '';

  public searchData = {
    page_index: 1,
    page_size: this.api.pageSize,
    order_id: '',
    username: '',
    claim_admin_id: '',
    hand_check_admin_id: '',
    start_check_time: '',
    end_check_time: '',
    type: '2'
  };
  public viewID = '0';

  public exportPop = {
    show: false,
    loading: false
  };

  public detailPop = {
    show: false,
    data: {}
  };

  constructor(public api: ApiService, public utils: ToolService, private modalService: NzModalService,
    private excelService: ExcelService) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      order_id: '',
      username: '',
      claim_admin_id: '',
      hand_check_admin_id: '',
      start_check_time: '',
      end_check_time: '',
      type: '2'
    };
    this.viewID = '0';
    this.getDataList();
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  public detail(item) {
    this.detailPop.show = true;
    this.viewID = item.id;
    this.getDataList();
  }

  // 获取数据列表
  public async getDataList() {
    this.searchData.page_index = this.page.index;
    this.searchData.page_size = this.api.pageSize;
    this.api.getviewWithdrawHandList(this.searchData, this.viewID).then((res: any) => {
      if (res.success) {
        this.tableList = res.data.data;
        this.page.total = res.data.total;
        this.totalRealAmount = res.data.totalRealAmount;
        this.pageTotalRealAmount = res.data.pageTotalRealAmount;
      }
    })
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
      用户名: data.username,
      充值: data.recharge_amount,
      提现: data.withdraw_amount,
      理赔: data.system_transfer_add,
      扣减: data.system_transfer_reduce,
      投注: data.bets,
      撤单: data.cancel,
      中奖: data.bonus,
      返点: data.commission,
      转入: data.transfer_from_parent,
      转出: data.transfer_to_child,
      礼金: data.gift,
      工资: data.salary,
      分红: data.dividend,
      积分: data.score,
      亏损: data.profit
    };
  }

  private exportNowPage() {
    this.exportPage(this.tableList, '代理日工资');
  }

  public async exportAllPage() {
    this.page.selectedTotalPage = true;
    this.exportPop.loading = true;
    const exportExcel = [];
    for (let i = 1; this.page.selectedTotalPage; i++) {
      const response = await this.api.Http({
        name: 'salaryLists',
        data: {
          ...this.searchData,
          page_size: 2000,
          page_index: i
        }
      });
      const { data, success } = response;
      if (success) {
        exportExcel.push(...data.data);
      }
      if ((!((i * 2000) % 100000) || !data.data.length) || !this.page.selectedTotalPage) {
        this.exportPage(exportExcel, `代理日工资-${i}`);
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

  public stopDownload() {
    this.page.selectedTotalPage = false;
    this.exportPop.loading = false;
  }
  // 日期选择框
  public onChange(result: Date): void {
    this.searchData.start_check_time = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_check_time = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }
}
