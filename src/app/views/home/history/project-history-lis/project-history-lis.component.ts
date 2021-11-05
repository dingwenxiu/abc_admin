import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-project-history-lis',
  templateUrl: './project-history-lis.component.html',
  styleUrls: ['./project-history-lis.component.scss']
})
export class ProjectHistoryLisComponent implements OnInit {
  public tableList = [];
  public pageSize = 15;
  public listOfData = [];
  public dateRange = [];
  public page = {
    index: 1,
    total: 0,
    pageIndex: 1,
    pageSize: 15,
  };

  public searchData = {
    page_index: 1,
    page_size: 15,
    project_id: '',
    user_id: '',
    nickname: '',
    id: '',
    status: '',
    start_time: '',
    end_time: ''
  };

  public detail = {
    show: false,
    data: []
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
    this.searchData.page_index  = this.page.index;
    this.searchData.page_size   = this.api.pageSize;

    this.api.Http({name: 'projectHistoryList', data:this.searchData}).then((res: any) => {
      if (res.status) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    });
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.searchData.start_time = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData.end_time = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }
    // 回退
  public back() {
    this.detail.show = false;
  }

  // 查看详情
  public doDetail(id: any) {
    this.api.Http({name: 'projectHistoryDetail', attach:id}).then((res: any) => {
      if (res.status) {
        this.detail.show = true;
        this.detail.data  = res.data;
      }
    });
  }

  // 页面改变
  public pageChange() {
    this.getDataList();
  }

  // 获取数据列表
  public resetSearch() {
    this.searchData = {
      page_index: 1,
      page_size: this.api.pageSize,
      project_id: '',
      user_id: '',
      nickname: '',
      id: '',
      status: '',
      start_time: '',
      end_time: ''
    };
    this.getDataList();
  }

}
