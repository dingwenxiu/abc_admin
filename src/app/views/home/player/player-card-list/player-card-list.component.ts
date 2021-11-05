import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-player-card-list',
  templateUrl: './player-card-list.component.html',
  styleUrls: ['./player-card-list.component.scss']
})

export class PlayerCardListComponent implements OnInit {
  public tableList = [];

  public page = {
    index: 1,
    total: 0
  };

  public bankSignOption = [];
  public provinceSelected = [0, 0];

  public partnerOption = {};

  // 查询
  public searchData = {
    page_index: 1,
    page_size: 15,
    partner_sign: 'KLC',
  };

  constructor(public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService) {
    // this.searchData.partner_sign = utils.getDefaultPartnerSign();
  }

  // 初始化
  ngOnInit() {
    this.getDataList();
    this.getDetail();
  }

  // 回退
  public back() {
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }


  /** ========================== 修改 银行卡 状态 ======================== */
  public doStatus(item: any) {
    this.api.Http({ name: 'cardStatus', attach: item.id }).then((res: any) => {
      if (res.success) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改成功 !'
        });
        this.getDataList();
      }
    });
  }

  /** ========================== 获取 银行卡 列表 ======================== */
  public getDataList() {
    const data = {
      page_index: this.page.index
    };

    Object.assign(data, this.searchData);
    this.api.Http({ name: 'playerCardList', data }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.partnerOption = res.data.partner_option;

        const dataList = res.data.data;

        dataList.map(item => {
          const pid = item.province_id;
          const cid = item.city_id;
        });

        this.tableList = dataList;
        const signArray = [];

        for (const key in res.data.bank_list) {
          if (key) {
            signArray.push({ key, label: res.data.bank_list[key] });
          }
        }

        this.bankSignOption = signArray;
      }
    });
  }

  public getDetail(id = '0') {
    this.api.Http({ name: 'playerCardDetail', attach: id }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        const [pid, cid] = [data.card.province_id, data.card.city_id];
        this.provinceSelected = [pid - 0, cid - 0];
        const bankarr = [];
        for (const key in res.data.bank_options) {
          if (key) {
            bankarr.push({ key, value: res.data.bank_options[key] });
          }
        }
      }
    });
  }

  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  public resetSearch() {
    const data = this.searchData;
    for (const key in data) {
      if (data[key] !== '') {
        data[key] = null;
      }
    }
    this.searchData = data;
    this.getDataList();
  }
}
