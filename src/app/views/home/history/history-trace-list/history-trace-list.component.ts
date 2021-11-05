import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-history-trace-list',
  templateUrl: './history-trace-list.component.html',
  styleUrls: ['./history-trace-list.component.scss']
})
export class HistoryTraceListComponent implements OnInit {
  public tableList = [];
  public adminUserList = [];
  public isdateRange = {};
  public dateRange = [];
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
    page_size: '',
    start_time: '',
    end_time: ''
  }


  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
    this.getBeforeDate(7);
    this.getDataList();
  }
  // 日期选择框
  public onChange(result: Date): void {
    this.searchData['start_time'] = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }
  // 选择日期
  public onCelen($event) {
    if ($event.length > 1) {
      this.dateRange = [this.utils.timeCelen($event[0], 0), this.utils.timeCelen($event[1], 1)];
    }
  }
  // 初始化列表
  public getDataList() {
    let obj = {
      end_time: this.searchData.end_time,
      start_time: this.searchData.start_time,
      partner_sign: this.searchData.partner_sign
    }
    this.api.getplayerTraceList(obj).then((res: any) => {
      if (res.success) {
        // this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.isdateRange = res.data.partner_option;
      }
    });
  }
  // 分页
  public pageChange() {
    this.getDataList();
  }
  // 搜索
  public doSearch() {
    this.getDataList();
  }
  // 重置
  public resetSearch() {
    this.searchData = {
      partner_sign: 'KLC',
      page_size: '',
      start_time: '',
      end_time: ''
    };
    this.dateRange = [];
    this.getDataList();
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
      let Today1 = (this.utils.formatTime(new Date(), 'YYYY-MM-DD HH:MM:SS'));
      this.dateRange = [new Date(Today), new Date()];
      this.searchData.start_time = Today;
      this.searchData.end_time = Today1;
    }
}
