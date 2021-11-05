import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-trace-history-list',
  templateUrl: './trace-history-list.component.html',
  styleUrls: ['./trace-history-list.component.scss']
})
export class TraceHistoryListComponent implements OnInit {
  public tableList = [];

  public page = {
    index: 1,
    total: 0
  };

  public dateRange = [];
  public searchData = {
    page_index: 1,
    page_size: 15,
    user_id: '',
    nickname: '',
    username: '',
    project_id: '',
    status: '',
    start_time: '',
    end_time: ''
  };

  constructor(
    public api: ApiService,
    public utils: ToolService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  // 获取数据
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.searchData.page_size = this.api.pageSize;

    this.api.Http({name: 'traceHistoryList', data:this.searchData}).then((res: any) => {
      if (res.status) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    });
  }

  // 查看详情
  public doDetail(id) {

  }
  // 日期选择框
  public onChange(result: Date): void {
    this.searchData.start_time = this.utils.formatTime(new Date(result[0]).getTime());
    this.searchData.end_time = this.utils.formatTime(new Date(result[1]).getTime());
  }

  // 获取数据列表
  public resetSearch() {
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      user_id: '',
      username: '',
      nickname: '',
      project_id: '',
      status: '',
      start_time: '',
      end_time: ''
    };

    this.getDataList();
  }

  public pageChange() {
    this.getDataList();
  }

}
