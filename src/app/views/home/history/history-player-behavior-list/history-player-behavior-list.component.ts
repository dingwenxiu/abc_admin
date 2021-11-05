import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-history-player-behavior-list',
  templateUrl: './history-player-behavior-list.component.html',
  styleUrls: ['./history-player-behavior-list.component.scss']
})
export class HistoryPlayerBehaviorListComponent implements OnInit {
  public tableList = [];
  public dateRange = [];
  public isDateRange = {}
  public adminUserList = [];
  // 商户列表
  public signList = [];
  // 对话框参数
  public page = {
    index: 1,
    total: 0
  };
  // 搜索参数
  public searchData = {
    partner_sign: 'KLC',
    username: '',
    page_index: '',
    start_time: '',
    total: '',
    end_time: ''
  }


  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }
  // 初始化列表
  public getDataList() {
    this.api.getpartnerVisitList(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.isDateRange = res.data.partner_options;
        this.adminUserList.push(res.data.partner_admin_user);
      }
    });
  }
  // 日期选择框
  public onChange(result: Date): void {
    const { time1, time2 } = this.utils.timeIsNow(result);
    const newTime1 = time1 ? result[0] : this.utils.timeToZero(result[0]);
    const newTime2 = time2 ? result[1] : this.utils.endTime(result[1]);
    this.searchData.start_time = this.utils.formatTime(new Date(newTime1).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_time = this.utils.formatTime(new Date(newTime2).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.dateRange = [new Date(newTime1), new Date(newTime2)];
  }
  // 点击时间选项框
  public timeHandle() {
    this.dateRange = [this.utils.timeInit(), this.utils.timeInit()];
    this.searchData.start_time = this.utils.formatTime(this.dateRange[0], 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_time = this.utils.formatTime(this.dateRange[1], 'YYYY-MM-DD HH:MM:SS');
  }
  // 分页
  public pageChange() {
    this.searchData.page_index = String(this.page.index);
    this.searchData.total = String(this.page.total);
    this.getDataList();
  }
  // 搜索
  public doSearch() {
    this.getDataList();
  }
  // 重置
  public resetSearch() {
    this.dateRange = [];
    this.searchData = {
      partner_sign: 'KLC',
      username: '',
      page_index: '',
      start_time: '',
      total: '',
      end_time: ''
    };
    this.getDataList();
  }
}
