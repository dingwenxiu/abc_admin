import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService } from 'ng-zorro-antd';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})

export class PlayerListComponent implements OnInit {
  public tableList = [];

  public searchParentId = '';
  public searchParentData = {};
  public userTypeOptions    = {};
  public frozenTypeOptions  = {};
  public parentSet          = [];
  public parentId = [];
  public createdTime: any;

  public partnerOption  = {};

  public page = {
    index: 1,
    total: 0
  };


  // 查询数据
  public searchData = {
    page_index: 1,
    page_size: 20,
    partner_sign:'all',
    top_id:'',
    parent_id:'',
    username:'',
    type:'',
    frozen_type:'',
    is_tester:'',
    min:'',
    max:'',
  };

  
  // 详情
  public detail = {
    show: false,
    player: {
      id: '',
      username: '',
      nickname: '',
      mobile: '',
      vip_level: 1,
      parent_id: '',
      invite_code: '',
      frozen_type: '',
      register_ip: '',
      register_time: '',
      register_device: '',
      register_city: '',
      last_login_ip: '',
      last_login_time: '',
      totalRechargeCount: 0,
      totalRechargeAmount: 0,
      totalWithdrawCount: 0,
      totalWithdrawAmount: 0,
      salary_percentage:0,
      bonus_percentage:0
    },
    account: {
      balance: 0,
      frozen_balance: 0,
    },
    stat: {
      recharge: 0,
      withdraw: 0,
      manual_recharge: 0,
      manual_reduce: 0,
      send_packet_count: 0,
      send_packet_amount: 0,
      fetched_packet_count: 0,
      fetched_packet_amount: 0,
      system_ms_amount: 0,
      system_brokerage: 0,
      landmine_amount_in: 0,
      landmine_amount_out: 0,
    },
    cards : [],
    last10RechargeOrder: [],
    last10WithdrawOrder: [],
    lastSendPackets: {},
    lastFetchPackets: {},
    parentSet: [],
  };

  public mapOfExpandData: { [key: string]: boolean } = {};
  public dateRange = null;

  public findSelf = {};

  constructor( public api: ApiService, public toolService: ToolService, private modalService: NzModalService ) {

  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 寻找下级
  public findChild(data, flag = false) {
    // this.searchData = {
    //   page_index: 1,
    //   page_size: 20
    // };

    this.searchParentId = data.id;
    this.searchParentData = data;

    // const indexPlus = data === 0 ? 2 : 1;
    // if (data === 0) {
    //   this.parentSet = [];
    //   this.parentId = [];
    // } else {
    //   const index = this.parentId.indexOf(data.id);
    //   if (index !== -1) {
    //     this.parentId.splice(index + indexPlus, 999);
    //     this.parentSet.splice(index + indexPlus , 999);
    //   } else {
    //     this.parentId.push(data.id);
    //     this.parentSet.push({id: data.id, username: data.username});
    //   }
    // }
    this.tableList.forEach((item) => {
      if (item.id === data.id) {
        this.findSelf = item;
        return true;
      }
    });
    this.getDataList(flag);
  }

  /**
   * 最小数值检查
   *
   * @param {*} e
   * @memberof PlayerListComponent
   */
  public checkMinInt(e){
    if (Number(e) < 0) {
      this.searchData.min = '0';
    }
  };

  // 回退
  public back() {
    this.closeAll();
  }

  // 页面变更
  public doPageChange() {
    this.getDataList();
  }

  // 关闭所有
  public closeAll() {
    this.detail.show      = false;
  }

  /** ================ 修改状态 =============== */
  // 状态
  public doStatus(item: any, i) {
    this.api.Http({name: 'playerStatus', attach: item + '' }).then((res: any) => {
      const {success, msg} = res;
      const modal = this.modalService.success({
        nzTitle: '温馨提示',
        nzContent: msg
      });
      this.tableList[i].status = !this.tableList[i].status;
    });
  }

  // 获取数据列表
  public getDataList(flag = false) {
    const data = {};
    Object.assign(data, this.searchData);
    if (this.searchParentId) {
      data['parent_id'] = this.searchParentId;
    }
    this.api.Http({name: 'playerList', data}).then((res: any) => {
      if (res.success) {
        // this.page.total           = res.data.total;
        // this.tableList            = res.data.data;
        // this.userTypeOptions      = res.data.type_options;
        // this.frozenTypeOptions    = res.data.frozen_type_options;
        // this.searchParentId       = '';

        this.partnerOption            = res.data.partner_option;
        // this.searchData.partner_sign  = res.data.default_partner;
        this.userTypeOptions = res.data.type_options;
        this.frozenTypeOptions = res.data.frozen_type_options;

        if (this.searchParentId === '') {
          this.page.total = res.data.total;
          this.tableList = res.data.data;
          return;
        }
        // const bool = (this.searchParentId !== '' && res.data.data.length > 0);
        const bool = this.searchParentId !== '';
        // if (bool || res.data.data.length > 0) {
        if (bool) {
          this.page.total = res.data.total;
          this.tableList = res.data.data;
          const indexPlus = this.searchParentData === 0 ? 2 : 1;
          this.parentSet = [];
          this.parentId = [];
          if (this.searchParentData === 0) {
            this.searchParentId = '';
          } else {
            const index = this.parentId.indexOf(this.searchParentData['id']);
            if (index !== -1 && flag) {
              this.parentId.splice(index + indexPlus, 999);
              this.parentSet.splice(index + indexPlus, 999);
            } else if (this.searchParentData['id'] !== undefined) {
              const parentData = res.data['parent'];
              if (parentData && parentData.length > 0) {
                for (const k of parentData) {
                  const json = {};
                  json['id'] = k['topParent_id'];
                  json['username'] = k['topParent_name'];
                  this.parentSet.push(json);
                }
              }
              this.parentId.push(this.searchParentData['id']);
              this.parentSet.push({ id: this.searchParentData['id'], username: this.searchParentData['username'] });

              if (res.data.data.length === 0) {
                this.tableList.push(this.findSelf);
              }
            }
          }
        }
      }
    });
  }

  // 获取数据列表
  public resetSearch() {
    this.searchData.page_index  = 1;
    this.searchData.page_size   = 20;
    this.dateRange = null;
    this.parentSet = [];
    this.parentId = [];
    this.searchParentId = '';
    this.getDataList();
  }

  /** ================ 用户详情 =============== */
  // 查看详情
  doDetail(item: any) {
    this.api.Http({name: 'playerDetail', attach: item.id}).then((res: any) => {
      if (res.success) {
        this.detail.show    = true;
        this.detail.player  = res.data.player;
        this.detail.account = res.data.account;

        if (res.data.cards) {
          this.detail.cards   = res.data.cards;
        }

        this.detail.parentSet             = res.data.parentSet;
        this.detail.last10RechargeOrder   = res.data.last10RechargeOrder;
        this.detail.last10WithdrawOrder   = res.data.last10WithdrawOrder;

        if (res.data.stat) {
          this.detail.stat    = res.data.stat;
        }

      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.data.msg
        });
      }
    });
  }

  // 日期选择
  public onChange(result: Date): void {
    const {time1, time2} = this.toolService.timeIsNow(result);
    const newTime1 = time1 ? this.toolService.timeToZero(result[0]) : result[0];
    const newTime2 = time2 ? this.toolService.timeToZero(result[1]) : result[1];
    this.searchData['start_time'] = this.toolService.formatTime(new Date(newTime1).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.toolService.formatTime(new Date(newTime2).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.createdTime = [new Date(newTime1), new Date(newTime2)];
  }

  public doSearch() {
    this.searchData.page_index = 1;
    this.getDataList();
  }

  public timeHandle() {
    // this.dateRange = [this.toolService.timeInit(), this.toolService.timeInit('???')];
    this.searchData['start_time'] = this.toolService.formatTime(this.dateRange[0], 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.toolService.formatTime(this.dateRange[1], 'YYYY-MM-DD HH:MM:SS');
  }
}
