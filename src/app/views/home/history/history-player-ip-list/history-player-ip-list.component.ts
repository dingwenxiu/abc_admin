import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService, NzMessageService, NzModalRef } from "ng-zorro-antd";

@Component({
  selector: 'app-history-player-ip-list',
  templateUrl: './history-player-ip-list.component.html',
  styleUrls: ['./history-player-ip-list.component.scss']
})
export class HistoryPlayerIpListComponent implements OnInit {
  public tableList = [];
  public adminUserList = [];
  public dateRange = {};
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
    this.api.getPlayerIp(this.searchData).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.dateRange = res.data.partner_options;
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
      page_size: ''
    };
    this.getDataList();
  }
}
