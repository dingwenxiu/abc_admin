import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-partner-access-log',
  templateUrl: './partner-admin-behavior.component.html',
  styleUrls: ['./partner-admin-behavior.component.scss']
})

export class PartnerAdminBehaviorComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };
  public partnerSign = {};
  // 访问日志参数
  public access = {
    page_index: 1,
    page_size: 20,
    partner_sign: 'YX',
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
  public doPageChange() {
    this.getDataList();
  }

  public pageChange() {
    this.getDataList();
  }
  // 搜索功能
  public search() {
    this.getDataList();
  }
  // 重置
  public reset() {
    this.access = {
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
    this.api.getadminAccessLogList(this.access).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.partnerSign = res.data.partner_options;
        this.tableList = res.data.data;
      }
    });
    // const data = {
    //   page_index: this.page.index,
    //   page_size: this.api.pageSize,
    // };

    // this.api.Http({ name: 'partnerAdminBehavior', data: data }).then((res: any) => {
    //   if (res.success) {
    //     this.page.total = res.data.total;
    //     this.tableList = res.data.data;
    //   }
    // });
  }
}
