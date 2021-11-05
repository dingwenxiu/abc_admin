import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from "../../../../tool/tool.service";
import { NzModalService } from "ng-zorro-antd";

@Component({
  selector: 'app-finance-withdraw-log-list',
  templateUrl: './finance-withdraw-log-list.component.html',
  styleUrls: ['./finance-withdraw-log-list.component.scss']
})
export class FinanceWithdrawLogListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  public popup = {
    showContentLoading:false,
    isShowContent:false,
    content:{}
  };

  public log = {
    show: false,
    detail:{},
    sendList: [],
    sendEditList: [],
    backEditList: []
  };

  public logData = {
    show: false
  };

  public logDetailData = {
    show:false,
    content: {
      status: 0,
      msg: '',
      data: {}
    },
    request_params: {
      order_id: 0,
      amount: 0,
      merchant_id: 0,
      source: '',
      channel: '',
      callback_url: '',
      client_ip: '',
      time: '',
      sign: ''
    },
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  // 初始化列表
  public getDataList() {
    const data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
    };

    this.api.Http({name: 'withdrawLogList', data:data}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    });
  }

  public logDetail(item: any) {
    this.logDetailData.show = true;
    this.logDetailData.content = JSON.parse(item.content);
    this.logDetailData.request_params = JSON.parse(item.request_params);
  }



  public pageChange() {
    this.getDataList();
  }

  // 显示弹窗
  public showPopupContent(content: any) {
    this.popup.content = content;
    this.popup.isShowContent = true;
  }

  public popupClose() {
    this.popup.isShowContent = false;
  }

  public popupConfirm() {
    this.popup.isShowContent = false;
  }
}
