import { ApiService } from '../../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { ToolService } from '../../../../tool/tool.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-method-list',
  templateUrl: './method-list.component.html',
  styleUrls: ['./method-list.component.scss']
})

export class MethodListComponent implements OnInit {
  public methodList = [];

  public page = {
    index: 1,
    total: 0
  };
  // 设置数据
  public challengeData = {
    show:false,
    loading:false,
    item:{},
    challengeTypeOption:{},
    id:0,
    data:{
      challenge_type: '',
      challenge_min_count:0,
      challenge_bonus:0,
      challenge_config:{
        'zu3':0,
        'zu6':0,
        'code':'',
        'min':0
      }
    }
  };

  // 查询条件
  public searchData = {
    page_size: '16',
    page_index: 1,
    config_id: '',
    series_id: 'all', 
    lottery_sign: 'all',
    method_sign: 'all',
    start_time: '',
    end_time: '',
    status: 'all'
  };

  public lotteryOptions = {};

  public defaultSelect = ['所有系列'];

  public drawerPop: boolean;
  public drawerData: object = {};

  constructor(
    public utils: ToolService,
    public api: ApiService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getMethodList();
  }

  // 日期选择框
  public onChange(result: Date): void {
    const {time1, time2} = this.utils.timeIsNow(result);
    const newTime1 = time1 ? this.utils.timeToZero(result[0]) : result[0];
    const newTime2 = time2 ? this.utils.timeToZero(result[1]) : result[1];
    this.searchData['start_time'] = this.utils.formatTime(new Date(newTime1).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.searchData['end_time'] = this.utils.formatTime(new Date(newTime2).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  // 获取玩法列表
  private getMethodList() {

    this.searchData.page_index = this.page.index;
    this.api.Http({
      name: 'methodList',
      data: this.searchData
    }).then((res: any) => {
      const { data, success } = res;
      console.log(data);
      if (success) {
        // const newData = [];
        // for (const item of data['data']) {
        //   const code = item['challenge_config']['code'] && (
        //     item['challenge_config_code'] =  this.objectkeys(item['challenge_config']['code'])
        //   );
        //   console.log(item['challenge_config']['code'],item['challenge_config_code']);
        //   const zu3 = item['challenge_config']['zu3'] && (
        //     item['challenge_config_zu3'] = this.objectkeys(item['challenge_config']['zu3'])
        //   );
        //   const zu6 = item['challenge_config']['zu6'] && (
        //     item['challenge_config_zu6'] = this.objectkeys(item['challenge_config']['zu6'])
        //   );
        //   newData.push(item);
        // }
        // this.methodList = newData;
        this.methodList = res.data.data;
        console.log(this.methodList);
        this.page.total = res.data.total;
        this.lotteryOptions = res.data.lottery_options;
      }
    });
  }

  // 选
  public doSelectLottery(event) {
    this.searchData.series_id = event[0];
    this.searchData.lottery_sign = event[1];
    this.searchData.method_sign = event[2];
    this.getMethodList();
  }

  // 查看详情
  public details(item) {
    this.api.Http({
      name: 'methodDetail',
      attach: item
    }).then((res: any) => {
      const { data, success } = res;
      if (success) {
        const methodList = data['method'];
        this.drawerData = methodList;
        for (const key in methodList) {
          if (typeof methodList[key] === 'number') {
            this.drawerData[key] = methodList[key] + '';
          }
        }
        this.drawerPop = true;
      }
    });
  }

  // 换页
  public pageChange() {
    this.getMethodList();
  }

  // 设置流行
  public async changePopular(item: any) {

    let response = await this.api.Http({ name: 'methodChangePopular', data: {}, attach: item.id });
    if (response.success) {
      this.getMethodList();
    }
  }

  // 设置状态
  public async changeStatus(item: any) {
    const response = await this.api.Http({ name: 'methodChangeStatus', data: {}, attach: item.id });
    if (response.success) {
      // this.getMethodList();
      item.status = response.data.status;
    }
  }

  // 玩法设置
  public async setMethod(item: any) {

  }

  // 搜索
  public search() {
    this.page.index = 1;
    this.getMethodList();
  }

  // 重置搜索
  public resetSearch() {
    this.page.index = 1;
    this.defaultSelect = ['all', 'all', 'all'];
    this.searchData = {
      page_size: '16',
      page_index: 1,
      config_id: '',
      series_id: 'all',
      lottery_sign: 'all',
      method_sign: 'all',
      start_time: '',
      end_time: '',
      status: 'all'
    };

    this.getMethodList();
  }

  public objectkeys(data: any) {
    return Object.keys(data).toString();
  }

  // 展示
  public doSetChallenge(id) {
    this.challengeData.id   = id;
    this.api.Http({name: 'methodSet', data: {action:"option"}, attach: id}).then((res: any) => {
      if (res.success) {
        console.log(res);
        this.challengeData.show = true;
        this.challengeData.item = res.data.method;

        this.challengeData.data.challenge_type      = res.data.method.challenge_type;
        this.challengeData.data.challenge_bonus     = res.data.method.challenge_bonus;
        this.challengeData.data.challenge_min_count = res.data.method.challenge_min_count;
        this.challengeData.data.challenge_config    = res.data.method.challenge_config;

        this.challengeData.challengeTypeOption      = res.data.challenge_type_option;
      } else {
        this.message.create('error', res.msg);
      }
    });
  }

  // 展示
  public doSetChallengeSubmit() {
    console.log(this.challengeData);
    this.api.Http({name: 'methodSet', data: this.challengeData.data, attach: this.challengeData.id + ''}).then((res: any) => {
      this.getMethodList();
      if (res.success) {
        this.challengeData.show = false;
        this.challengeData.data.challenge_type      = res.method.challenge_type + '';
        this.challengeData.data.challenge_bonus     = res.method.challenge_bonus;
        this.challengeData.data.challenge_min_count = res.method.challenge_min_count;
        this.challengeData.data.challenge_config    = res.method.challenge_config;
        this.message.create('success', res.msg);
      } else {
        this.message.create('error', res.msg);
      }
    });
  }

  public valueChange(e) {
    this.challengeData.data.challenge_type = e;
  }
}
