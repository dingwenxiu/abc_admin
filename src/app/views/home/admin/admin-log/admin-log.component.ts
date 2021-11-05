import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.scss']
})
export class AdminLogComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };
  public searchData = {
    adminUser: ''
  }
  public adminUser = {};
  public contentPop = {
    show: false,
    data: ''
  };


  public params = {
    show: false,
    data: {
      game_order_id: '',
      status: 0,
      money: 0,
      time: '',
      sign: '',
    }
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService
  ) { }

  // 初始化
  ngOnInit() {
    this.getLogList();
  }

  // 页面变更
  public doPageChange() {
    this.getLogList();
  }

  // 显示用户agent/params
  public showContent(item: any) {
    this.params.show = true;
    this.params.data = JSON.parse(item.params);
  }
  public lockTd(item: any, type) {
    if (type === '1') {
      this.contentPop = {
        show: true,
        data: item.params
      };
    } else {
      this.contentPop = {
        show: true,
        data: item.agent
      };
    }
  }
  public resetSearch() {
    this.page.index = 1;
    this.searchData.adminUser = '';
    this.getLogList();
  }
  public search() {
    this.getLogList();
  }
  // 获取日志列表
  public getLogList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      admin_username: this.searchData.adminUser
    };
    this.api.addAdminLogList(data).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.adminUser = res.data.admin_user;
      }
    });
  }

}
