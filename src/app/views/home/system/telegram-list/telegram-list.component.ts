import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-telegram-list',
  templateUrl: './telegram-list.component.html',
  styleUrls: ['./telegram-list.component.scss']
})

export class TelegramListComponent implements OnInit {

  public tableList = [];
  public total_num: number;
  public cur_page = 1;
  public page_size = 20;

  public deviceTypeOption = {};

  public addData = {
    show: false,
    buttonLoading: false,
    id: 0,
    data: {
      channel_group_name: '',
      channel_sign: '',
    }
  };

  public searchData = {
    page_index: this.cur_page,
    page_size: '20',
    // status: 'all',
    // channel_group_name: '',
    // channel_sign: '',
    // channel_id: '',
    // id: '',
    partner_sign: 'system'
  }

  constructor(
    public api: ApiService,
    public utils: ToolService,
    public router: Router,
    public modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getDataList();
  }

  public search() {
    this.cur_page = 1;
    this.getDataList();
  }

  public resetSearch() {
    this.searchData = {
      page_index: this.cur_page,
      page_size: '20',
      // status: 'all',
      // channel_group_name: '',
      // channel_id: '',
      // channel_sign: '',
      // id: '',
      partner_sign: 'system'
    };

    this.getDataList();
  }

  // 公告列表
  public getDataList() {
    const data = {
      page_index: this.cur_page,
      page_size: this.api.pageSize,
    };

    this.api.Http({
      name: 'telegramList',
      data: this.searchData
    }).then((res: any) => {
      if (res.success) {
        this.total_num = res.data.total;
        this.cur_page = res.data.currentPage;
        this.deviceTypeOption = res.data.partner_option;
        this.tableList = res.data.data;
      }
    });
  }

  public changeStatus(item: any) {
    this.api.Http({
      name: 'tgStatusChange',
      attach: item.id
    }).then((res: any) => {
      if (res.success) {
        item.status = !item.status
        this.message.create('success', res.msg);
      } else {
        this.message.error('error', res.msg);
      };
    });
  }

  // 状态
  public doDel(id: any) {
    this.api.Http({
      name: 'telegramDel',
      attach: id
    }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改成功 !'
        });
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改失败 !'
        });
      }
    });
  }

  // 刷新缓存
  public doGenId(id) {
    this.api.Http({ name: 'telegramGenId', attach: id }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }

  // 添加 编辑频道
  public addChannel(item) {
    this.addData.show = true;
    if (item) {
      this.addData.data.channel_group_name = item.channel_group_name;
      this.addData.data.channel_sign = item.channel_sign;
      this.addData.id = item.id;
    } else {
      this.addData.data.channel_group_name = "";
      this.addData.data.channel_sign = "";
      this.addData.id = 0;
    }
  }

  // 提交频道
  public addChannelSubmit() {
    const data = this.addData.data;
    this.addData.buttonLoading = true;
    this.api.Http({
      name: 'telegramAdd',
      data: data,
      attach: this.addData.id + ''
    }).then((res: any) => {
      if (res.success) {
        this.message.success('保存成功');
        this.addData.show = false;
        this.addData.buttonLoading = false;
        this.getDataList();
      } else {
        this.message.error(res.msg);
      }
      this.addData.buttonLoading = false;
    }).catch(() => { this.addData.buttonLoading = false; });
  }

  // 翻页
  public pageChange(e) {
    this.cur_page = e;
    this.getDataList();
  }
}
