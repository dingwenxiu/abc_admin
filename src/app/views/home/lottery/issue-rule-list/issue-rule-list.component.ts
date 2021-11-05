import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';

@Component({
  selector: 'app-issue-rule-list',
  templateUrl: './issue-rule-list.component.html',
  styleUrls: ['./issue-rule-list.component.scss']
})

export class IssueRuleListComponent implements OnInit {
  public tableList = [];
  public id = '';

  public lotteryOptions = {};
  public defaultSelect = ['all', "all"];

  public searchData = {
    page_size: 15,
    page_index: 1,
    lottery_sign: 'all',
  };

  public page = {
    index: 1,
    total: 0
  };

  public edit = {
    show: false,
    id: 0,
    series_options: {},
    data: {
      lottery_sign: null,
      lottery_id: null,
      begin_time: null,
      end_time: null,
      issue_seconds: null,
      first_time: null,
      adjust_time: null,
      encode_time: null,
      issue_count: null
    }
  };

  public editClear = null;
  public editGame = false;
  public lotterySign = [];

  constructor(
    public utils: ToolService,
    public api: ApiService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getDataList();
    this.editClear = JSON.stringify(this.edit);
  }

  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.Http({ name: 'issueRuleList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.lotteryOptions = res.data.lottery_options;
      }
    })
  }

  public pageChange() {
    this.getDataList();
  }

  public editHandler(item: any, is_add: any) {
    if (is_add == 1) {
      this.editGame = true;
      this.edit.show = true;
    } else {
      this.id = item.id;
      this.edit.data.lottery_id = item.lottery_id;
      this.edit.data.issue_seconds = item.issue_seconds;
      this.edit.data.adjust_time = item.adjust_time;
      this.edit.data.encode_time = item.encode_time;
      this.edit.data.issue_count = item.issue_count;
      this.editGame = false;
      this.edit.show = true;
    }

  }

  public back() {
    this.edit.show = false;
    this.edit.data = JSON.parse(this.editClear).data;
    this.getDataList();
  }


  public submitEdit() {
    let data = {
      // lottery_id: this.edit.data.lottery_id,
      begin_time: this.utils.formatTime(this.edit.data.begin_time, 'HH:MM:SS'),
      end_time: this.utils.formatTime(this.edit.data.end_time, 'HH:MM:SS'),
      issue_seconds: this.edit.data.issue_seconds,
      first_time: this.utils.formatTime(this.edit.data.first_time, 'HH:MM:SS'),
      adjust_time: this.edit.data.adjust_time,
      encode_time: this.edit.data.encode_time,
      issue_count: this.edit.data.issue_count,
      lottery_sign: this.edit.data.lottery_sign
    };
    this.api.Http({ name: 'issueRuleAdd', data, attach: this.id }).then((res: any) => {
      if (res.success) {

        this.message.create('success', '保存成功！');
        // const modal = this.modalService.success({
        //   nzTitle: '提示',
        //   nzContent: '保存成功 !'
        // });

        setTimeout(() => {
          this.searchData.lottery_sign = 'all';
          this.back();
          this.getDataList();
        }, 1000);
      } else {
        this.message.create('error', res.msg);
      };
    }).catch(() => { })
    // }
  }

  public details(item: any) {
    this.api.Http({ name: 'issueRuleDetail', attach: item.id }).then((res: any) => {
      if (res.success) {
        // const modal = this.modalService.success({
        //   nzTitle: '提示',
        //   nzContent: '保存成功 !'
        // });
      }
    }).catch(() => { })
  }

  // 选
  public doSelectLottery(event) {
    this.searchData.lottery_sign = event[1];
    this.getDataList();
  }

  public editSelectLottery(event) {
    this.edit.data.lottery_sign = event[1];
  }
}
