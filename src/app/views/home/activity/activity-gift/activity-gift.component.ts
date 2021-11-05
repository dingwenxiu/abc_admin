import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-activity-gift',
  templateUrl: './activity-gift.component.html',
  styleUrls: ['./activity-gift.component.scss']
})
export class ActivityGiftComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };

  public edit = {
    show: false,
    id: 0,
    data: [

    ]
  };

  public type_options = {
    "1": "注册送",
    "2": "绑手机送",
    "3": "推广送",
  };

  public searchData = {
    page_index:1,
    page_size:15,
    user_id:'',
    username:'',
    type:'all'
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public message: NzMessageService,
    public modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表
  public getList() {
    this.searchData.page_index = this.page.index;
    this.api.Http({name: 'activityStatus', data:this.searchData}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    });
  }

  public pageChange() {
    this.getList();

  }

  // 查询
  public doSearch() {
    this.page.index = 1;
    this.getList();
  }

  // 获取数据列表
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index:1,
      page_size:15,
      user_id:'',
      username:'',
      type:'all'
    };

    this.getList();
  }

}
