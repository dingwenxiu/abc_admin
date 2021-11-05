import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../api/api.service';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-account-report-history-list',
  templateUrl: './account-report-history-list.component.html',
  styleUrls: ['./account-report-history-list.component.scss']
})
export class AccountReportHistoryListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  constructor( public api: ApiService, private modalService: NzModalService ) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  doDetail($id) {

  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    const data = {
      pageIndex: this.page.index,
      pageSize: this.api.pageSize,
    };

    this.api.Http({ name: 'accountChangeHistoryList', data: {}}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    })
  }
}
