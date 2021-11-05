import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-account-type-list',
  templateUrl: './account-type-list.component.html',
  styleUrls: ['./account-type-list.component.scss']
})

export class AccountTypeListComponent implements OnInit {
  public tableList = [];

  public page = {
    index: 1,
    total: 0
  };

  public addData = {
    type: 0,
    show: false,
    submitStatus: false,
    id: 0,
    type_options: {},
    data: {
      name: '',
      sign: 0,
      type: '',
      froze_type: '',
      user_id: '',
      amount: '',
      room_id: '',
      project_id: '',
      related_id: '',
      admin_id: ''
    }
  };

  public detail = {
    show: false,
    data : {
      id: '',
      sign: '',
      name: '',
      type: '',
      amount: '',
      user_id: '',
      project_id: '',
      admin_id: '',
      created_at: '',
      updated_at: ''
    }
  }

  public show = true;

  constructor(
    public api: ApiService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {}

  // 初始化
  ngOnInit() {
    this.getDataList();
  }


  // 添加类型
  public addItem(id: any) {
    this.addData.type = id
    this.api.Http({ name: 'accountTypeAdd', data: {}, attach:id}).then((res: any) => {
      if (res.success) {
        this.addData.show  = true;
        if (res.data.model && +res.data.model.id > 0) {
          this.addData.data    = res.data.model;
        }
      }
    })
  }

  // 提交
  public submitAdd() {

    this.api.Http({ name: 'accountTypeAdd', data: {}}).then((res: any) => {
      if (res.success) {
        this.addData.show = false;
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
        this.getDataList();
      }
    })
  }

  // 页面变更
  public doPageChange(e) {
    this.page.index = e,
    this.getDataList();
  }

  public flushCache() {
    this.api.Http({ name: 'flushCacheAccountChange', data: {}}).then((res: any) => {
      if (res.success) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 刷新成功 !'
        });
      } else {
        const modal = this.modalService.warning({
          nzTitle: '温馨提示',
          nzContent: '对不起, 缓存不存在 !'
        });
      }
    });
  }

  // 获取数据列表
  public getDataList() {
    const data = {
      pageIndex: this.page.index,
      pageSize: this.api.pageSize
    };
    this.api.Http({ name: 'accountChangeTypeList', data}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      } else {
        this.message.create('error', res.msg);
      }
    });
  }
  
  public checkDetail(id) {
    this.api.Http({name:'accountChangeTypeDetail',attach:id}).then((res: any) => {
      this.detail.show = true;

      if (res.success) {
        this.detail.data = res.data.model;
      } else {
        this.message.create('error', res.msg);
      };
    });
  }
}
