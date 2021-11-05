import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-partner-access-log',
  templateUrl: './partner-access-log.component.html',
  styleUrls: ['./partner-access-log.component.scss']
})

export class PartnerAccessLogComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };
  public partnerSign = {};
  // 行为日志参数
  public behavior = {
    page_index: 1,
    page_size: 20,
    partner_sign: 'KLC',
    route: '',
    partner_admin_user: ''
  }
  constructor(public api: ApiService, private modalService: NzModalService) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  doDetail($id) {

  }

  // 页面变更
  // public doPageChange() {
  //   this.getDataList();
  // }
  // 搜索功能
  public search() {
    this.getDataList();
  }
  // 条数
  public pageChange() {
    this.getDataList();
  }
  // 重置
  public reset() {
    this.behavior = {
      page_index: 1,
      page_size: 10,
      partner_sign: '',
      route: '',
      partner_admin_user: ''
    }
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.api.getAdminBehavior(this.behavior).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.partnerSign = res.data.partner_options;
      }
    });
  }
}
