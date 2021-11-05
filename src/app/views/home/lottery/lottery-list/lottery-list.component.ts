import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

import { ToolService } from '../../../../tool/tool.service';
import { ApiService } from '../../../../api/api.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-lottery-list',
  templateUrl: './lottery-list.component.html',
  styleUrls: ['./lottery-list.component.scss']
})
export class LotteryListComponent implements OnInit {
  // 添加游戏
  public curentPage = 0;
  public gameId = '';
  public isPartner: boolean = false;
  public isAdd = '';
  public addData = {
    buttonLoading: false
  }
  // 是否禁止英文名输入
  public isBan: Boolean = false;
  public tableList = [];
  public seriesId = '';
  public seriesList = [];
  public selectedValue: any;
  public positionOption = [];

  // 弹框步骤条控制
  public stepIndex = 0;
  public selectedIndex = '';
  public iconType = 'pc_pic';
  public min_prize_group = 0;
  public max_prize_group = 10;
  public prize_group: Array<1> = [];
  public validModesOption = [];
  public validPriceOption = [];

  public file_obj: any;
  public file_iri: any;

  public page = {
    index: 1,
    total: 0,
    page_size: 10
  };

  // 分页数据
  public total_num: number;
  public cur_page = 1;
  public page_size = 10;

  public partnerAssignOption = [];
  public allAssignChecked = false;
  public indeterminate = true;

  // 分配数据
  public assignData = {
    show: false,
    en_name: '',
    data: {
      partner_sign: []
    }
  };

  public edit_rule_obj = [{
    id: 1,
    begin_time: new Date('2019-10-10 00:00:00'),
    end_time: new Date('2019-10-10  00:00:00'),
    issue_seconds: 1,
    first_time: new Date('2019-10-10  00:00:00'),
    adjust_time: 0,
    encode_time: 0,
    issue_count: 1,
    status: '0'
  }];

  public editCron = {
    schedule: '00:00:00',
    status: '0',
    command: '',
    param: '',
    remarks: ''
  };
  // 添加游戏必要参数
  public addGameItem = {
    selfOpenLottery: [],
    partner_sign: {},
    is_fast: {
      '0': '否',
      '1': '是'
    },
    auto_open: {
      '0': '否',
      '1': '是'
    },
    issue_type: {},
    valid_code: {},
    open_casino: {
      '0': '非娱乐城',
      '1': '娱乐城'
    },
    positions: {},
    opentTime: [
      { label: '0', value: '0', checked: false }, { label: '1', value: '1', checked: false },
      { label: '2', value: '2', checked: false }, { label: '3', value: '3', checked: false },
      { label: '4', value: '4', checked: false }, { label: '5', value: '5', checked: false },
      { label: '6', value: '6', checked: false }, { label: '7', value: '7', checked: false },
      { label: '8', value: '8', checked: false }, { label: '9', value: '9', checked: false },
      { label: '10', value: '10', checked: false }, { label: '11', value: '11', checked: false },
      { label: '12', value: '12', checked: false }, { label: '13', value: '13', checked: false },
      { label: '14', value: '14', checked: false }, { label: '15', value: '15', checked: false },
      { label: '16', value: '16', checked: false }, { label: '17', value: '17', checked: false },
      { label: '18', value: '18', checked: false }, { label: '19', value: '19', checked: false },
      { label: '20', value: '20', checked: false }, { label: '21', value: '21', checked: false },
      { label: '22', value: '22', checked: false }, { label: '23', value: '23', checked: false }
    ],
    valid_modes: {},
    valid_price: {},
    issue_format: []
  }
  // 添加游戏
  public addGameOff: boolean = false;
  public valid_modes = [];
  public valid_price = [];
  public addGame = {
    series_id: { value: 'ssc', curentPage: 0, name: '彩种' },
    is_sport: { value: '1', curentPage: 0, name: '体育彩票' },
    cn_name: { value: '', curentPage: 0, name: '中文名' },
    en_name: { value: '', curentPage: 0, name: '英文名' },
    lottery_icon: { value: '', curentPage: 0, name: 'icon' },
    partner_sign: { value: 'system', curentPage: 0, name: '商户' },
    is_fast: { value: '1', curentPage: 0, name: '高频彩' },
    max_trace_number: { value: '', curentPage: 1, name: '追号' },
    auto_open: { value: '1', curentPage: 0, name: '自开' },
    day_issue: { value: '', curentPage: 1, name: '每日奖期' },
    issue_format: { value: '', curentPage: 1, name: '奖期格式' },
    issue_part: { value: '', curentPage: 1, name: '奖期部分' },
    issue_type: { value: 'random', curentPage: 1, name: '奖期类型' },
    valid_code: { value: '', curentPage: 1, name: '合法号码' },
    open_casino: { value: '0', curentPage: 1, name: '娱乐城' },
    positions: { value: '1', curentPage: 1, name: '位置' },
    code_length: { value: '', curentPage: 1, name: '合法号码长度' },
    open_time: { value: null, curentPage: 1, name: '开放时间' },
    min_prize_group: { value: '', curentPage: 2, name: '最小奖金组' },
    max_prize_group: { value: '', curentPage: 2, name: '最大奖金组' },
    diff_prize_group: { value: '', curentPage: 2, name: '奖金组差值' },
    min_times: { value: '', curentPage: 2, name: '最小倍数' },
    max_times: { value: '', curentPage: 2, name: '最大倍数' },
    max_prize_per_code: { value: '', curentPage: 2, name: '单注奖金' },
    max_prize_per_issue: { value: '', curentPage: 2, name: '单期最大奖金' },
    valid_modes: { value: '', curentPage: 3, name: '投注模式' },
    valid_price: { value: '', curentPage: 3, name: '一元/二元模式' },
    status: { value: 1, curentPage: 3, name: '开启关闭' },
    issue_desc: { value: '1', curentPage: 3, name: ' 描述' }
  };


  public edit = {
    show: false,
    submitButton: false,
    id: 0,
    series_options: {},
    valid_code: {},
    checkOptionsOne: [],
    valid_modes: [],
    positions: [],
    data: {
      lottery_name: '',
      lottery_sign: '',
      diff_prize_group: '',
      max_prize_per_issue: '',
      max_prize_group: '',
      min_prize_group: '',
      valid_modes: '',
      icon_path: '',
      valid_price: '',
      cn_name: ''
    }
  };

  public editClear = null;

  constructor(
    public utils: ToolService,
    public api: ApiService,
    public router: Router,
    private modalService: NzModalService,
    public message: NzMessageService,
  ) {
    this.getSeriesList();
  }

  ngOnInit() {
    this.editClear = JSON.stringify(this.edit);
  }

  public steps_control(type) {
    type === 'add' ? this.stepIndex++ : this.stepIndex--;
  }

  //  加减
  public maxTraceNumberCount(obj: any, type: any, number = 1, index: any) {
    if (number === 1) {
      if (type === '-') {
        if (+this.edit.data[obj] > 0) {
          +this.edit.data[obj]--;
        }
      } else {
        +this.edit.data[obj]++;
      }
    } else {
      if (type === '-') {
        if (+this.edit_rule_obj[index][obj] > 0) {
          +this.edit_rule_obj[index][obj]--;
        }
      } else {
        +this.edit_rule_obj[index][obj]++;
      }
    }
  }

  // 限制输入数字
  public maxTraceNumber(obj: any, type = false, number = 1, index: any) {
    if (number === 1) {
      this.edit.data[obj] = this.number(this.edit.data[obj], type);
    } else {
      this.edit_rule_obj[index][obj] = this.number(this.edit_rule_obj[index][obj], type);
    }
  }

  // 限制 只输入数字 包括不能输入字符和小数点
  private number(str: any, float = false) {
    // float = true 可以输入小数点
    str = String(str);
    if (float) {
      return str.replace(/[^\d.]/g, '').replace(/^0{1,}/g, '');
    } else {
      return str.replace(/[^\d]/g, '').replace(/^0{-1,}/g, '');
    }
  }

  // 投注单位
  public validModesOptions() {
    const result = [
      {
        title: '全选',
        value: '元,角,分,厘',
        key: '1,2,3,4',
        children: [
          {
            title: '元',
            value: '1',
            key: '1',
            isLeaf: true
          },
          {
            title: '角',
            value: '2',
            key: '2',
            isLeaf: true
          },
          {
            title: '分',
            value: '3',
            key: '3',
            isLeaf: true
          },
          {
            title: '厘',
            value: '4',
            key: '4',
            isLeaf: true
          }
        ]
      }
    ];
    this.validModesOption = result;
  }

  // 一二元模式
  public validPriceOptions() {
    const result = [
      {
        title: '全选',
        value: '元,角,分,厘',
        key: '1,2',
        children: [
          {
            title: '一元',
            value: '1',
            key: '1',
            isLeaf: true
          },
          {
            title: '二元',
            value: '2',
            key: '2',
            isLeaf: true
          }
        ]
      }
    ];
    this.validPriceOption = result;
  }

  public change_prize_group($event) {
    const arr = this.prize_group;
    this.edit.data.min_prize_group = arr[0] + '';
    this.edit.data.max_prize_group = arr[1] + '';
  }

  public selectTab(seriesId) {
    this.seriesId = seriesId;
    this.getDataList();
  }

  public getDataList() {
    const data = {
      page_index: this.cur_page,
      page_size: 10,
      pid: 0,
      lottery_id: this.selectedValue,
      series_id: this.seriesId
    };

    this.api.Http({
      name: 'lotteryList',
      data
    }).then((res: any) => {
      if (res && res.success) {
        this.edit.series_options = res.data.series_option;
        this.tableList = res.data.data;
        this.cur_page = res.data.currentPage;
        this.page_size = 10;
        this.total_num = res.data.total;
        // 获取添加游戏必要的参数
        this.addGameItem.selfOpenLottery = res.data.selfOpenLottery;
        this.addGameItem.partner_sign = res.data.partner_option;
        this.addGameItem.issue_type = res.data.issue_type;
        this.addGameItem.valid_code = res.data.valid_code_options;
        this.addGameItem.positions = res.data.positions_options;
        this.addGameItem.valid_modes = res.data.valid_modes;
        this.addGameItem.valid_price = res.data.valid_price_options;
        this.addGameItem.issue_format = res.data.issue_format;
        // this.page.total = res.data.total;
      }
    });
  }

  public getSeriesList() {
    this.api.Http({
      name: 'lotteryList', data: {}
    }).then((res: any) => {
      const sList = res.data.series_option;
      const sKey = [];
      for (const key in sList) {
        if (key) {
          sKey.push({
            value: key,
            lable: sList[key]
          });
        }
      }

      this.seriesList = sKey;
      this.seriesId = sKey[0].value;
      this.selectedIndex = sKey[0].value;
      this.getDataList();
    });
  }

  public pageChange(e) {
    this.cur_page = e;
    this.getDataList();
  }


  // 修改状态
  public doLotteryStatus(item: any) {
    this.api.Http({ name: 'lotteryStatus', attach: item.en_name }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: '保存成功 !'
        });
      }
    }).catch(() => { });
  }

  public async submitEdit() {
    if (this.edit.data.lottery_name && this.utils.removeAllSpace(this.edit.data.lottery_name)) {
      let data: any = this.edit.data;
      // 把多选的结果组合成字符串
      const [checkOptionsOne = this.edit.checkOptionsOne, valid_modes = []] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < checkOptionsOne.length; i++) {
        if (checkOptionsOne[i].checked) {
          valid_modes.push(checkOptionsOne[i].value);
        }
      }
      // data.valid_modes = valid_modes.join(',');

      const option = {
        valid_modes: data.valid_modes + '',
        min_prize_group: data.min_prize_group,
        max_prize_group: data.max_prize_group,
        diff_prize_group: data.diff_prize_group,
        max_prize_per_issue: data.max_prize_per_issue,
        cn_name: data.lottery_name,
        en_name: data.lottery_sign,
        icon_path: this.edit.data.icon_path,
        valid_price: data.valid_price + ''
      };
      // 发送数据
      const resonse = await this.api.Http({
        name: 'lotterySet',
        data: option,
        attach: this.edit.data.lottery_sign + ''
      });
      if (resonse.success) {
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: '保存成功 !'
        });
        this.getDataList();
        this.edit.show = false;
        this.edit.data = JSON.parse(this.editClear).data;
      }
    }
  }
  // 编辑游戏
  public eidtGame(item: any) {
    this.addGameOff = true;
    this.gameId = item.id;
    this.isAdd = '2';
    this.resetData();
    this.validModesOptions();
    this.validPriceOptions();
    this.api.getlotteryDetail({}, item.en_name).then((res: any) => {
      if (res.success) {
        const obj = res.data.lottery;
        this.addGame.series_id.value = obj.series_id;
        this.addGame.cn_name.value = obj.cn_name;
        this.addGame.en_name.value = obj.en_name;
        this.addGame.lottery_icon.value = obj.lottery_icon;
        this.addGame.auto_open.value = String(obj.auto_open);
        this.addGame.partner_sign.value = obj.partner_sign;
        this.addGame.is_fast.value = String(obj.is_fast);
        this.addGame.is_sport.value = String(obj.is_sport);
        this.addGame.max_trace_number.value = obj.max_trace_number;
        this.addGame.day_issue.value = obj.day_issue;
        this.addGame.issue_format.value = obj.issue_format;
        this.addGame.issue_part.value = obj.issue_part;
        this.addGame.issue_type.value = obj.issue_type;
        this.addGame.valid_code.value = obj.valid_code;

        this.addGame.code_length.value = String(this.addGame.valid_code.value.split(',').length);
        this.addGame.open_casino.value = String(obj.open_casino);
        this.addGame.positions.value = obj.positions;
        this.addGame.open_time.value = obj.open_time;
        this.addGame.min_prize_group.value = obj.min_prize_group;
        this.addGame.max_prize_group.value = obj.max_prize_group;
        this.addGame.diff_prize_group.value = obj.diff_prize_group;
        this.addGame.min_times.value = obj.min_times;
        this.addGame.max_times.value = obj.max_times;
        this.addGame.max_prize_per_code.value = obj.max_prize_per_code;
        this.addGame.max_prize_per_issue.value = obj.max_prize_per_issue;
        this.addGame.valid_modes.value = obj.valid_modes.split(',');
        this.addGame.valid_price.value = obj.valid_price.split(',');
        this.addGame.status.value = obj.status;
        this.addGame.issue_desc.value = obj.issue_desc;

        // 回显开放时间
        let OpenTime = obj.open_time.split(',');
        this.addGameItem.opentTime.forEach(ele => {
          console.log(OpenTime.indexOf(ele.value));
          if (OpenTime.indexOf(ele.value) > -1) {
            ele.checked = true;
          }
        })
        console.log(this.addGameItem.opentTime);
      }
    });
  }
  // 开放时间
  public openTime(type: string) {
    this.isAdd = type;
    if (type == '1') {
      this.addGameItem.opentTime.forEach(ele => {
        ele.checked = false;
      })
    }
  }
  // 查询key
  public getKey(list: {}, value) {
    for (let ele in list) {
      if (list[ele] == value) {
        return ele
      }
    }
  }

  private positionOptions(name) {
    const result = [];
    if (name === 'pk10') {
      const arr = ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9];
      result[0] = {
        title: '全选',
        value: '0,1,2,3,4,5,6,7,8,9',
        key: '0,1,2,3,4,5,6,7,8,9',
        children: [],
        isLeaf: false
      };

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        const json = {};
        json['key'] = arr[i];
        json['value'] = arr[i];
        json['title'] = arr[i];
        json['isLeaf'] = true;
        result[0].children.push(json);
      }
    } else if (name === 'lhc') {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      result[0] = {
        title: '全选',
        value: '1,2,3,4,5,6,7',
        key: '1,2,3,4,5,6,7',
        children: [],
        isLeaf: false
      };

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        const json = {};
        json['key'] = arr[i];
        json['value'] = arr[i];
        json['title'] = arr[i];
        json['isLeaf'] = true;
        result[0].children.push(json);
      }
    } else {
      let arr = [
        { lable: '万', value: 'w' },
        { lable: '千', value: 'q' },
        { lable: '百', value: 'b' },
        { lable: '十', value: 's' },
        { lable: '个', value: 'g' },
      ];
      result[0] = {
        title: '全选',
        value: '万,千,百,十,个',
        key: 'w,q,b,s,g',
        children: [],
        isLeaf: false
      };
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr.length; i++) {
        let json = {};
        json['key'] = arr[i].value;
        json['value'] = arr[i].value;
        json['title'] = arr[i].lable;
        json['isLeaf'] = true;
        result[0].children.push(json);
      }
    }
    this.positionOption = result;
  }

  // 设置热门 和 公告
  public async lotteryHotSet(item: any, type: any) {
    let response = null;

    let data = null;

    if (type === 'hot') {
      data = {
        is_hot: 0
      };
      item.is_hot ? data.is_hot = 1 : data.is_hot = 0;
      response = await this.api.Http({ name: 'lotterySet', data, attach: item.id });
    } else {
      data = {
        is_lottery: 0
      };
      item.is_lottery ? data.is_lottery = 1 : data.is_lottery = 0;
      response = await this.api.Http({ name: 'changePop', data, attach: item.id });
    }
  }
  // 上传图片
  public upImg(e: any) {
    if (e.type === 'success') {
      this.addGame.lottery_icon.value = e.fileList[0].response.data.path;
    }
  }
  //合法长度
  public codeLength(value: string) {
    // this.addGame.code_length.value = value;
    this.addGame.code_length.value = String(this.addGameItem.valid_code[value].split(',').length);
  }

  // 上传图片
  public upImages(e: any) {
    if (e.type === 'success') {
      this.edit.data.icon_path = e.fileList[0].response.data.path;
    }
  }

  // 删除图片
  public deleteImg() {
    this.edit.data.icon_path = null;
  }
  // 多选开启时间
  public opentTime(item: any) {
    let list = [];
    item.forEach(ele => {
      if (ele.checked) {
        list.push(ele.value);
      }
    });
    this.addGame.open_time.value = list.join(',');
  }
  // 添加游戏弹框弹出
  public doAddGame() {
    this.addGameOff = true;
    this.curentPage = 0;
    this.resetData();
    this.openTime('1');
    this.validModesOptions();
    this.validPriceOptions();
  }
  public resetData() {
    this.addGame = {
      series_id: { value: 'ssc', curentPage: 0, name: '彩种' },
      is_sport: { value: '1', curentPage: 0, name: '体育彩票' },
      cn_name: { value: '', curentPage: 0, name: '中文名' },
      en_name: { value: '', curentPage: 0, name: '英文名' },
      lottery_icon: { value: '', curentPage: 0, name: 'icon' },
      partner_sign: { value: 'system', curentPage: 0, name: '商户' },
      is_fast: { value: '1', curentPage: 0, name: '高频彩' },
      max_trace_number: { value: '', curentPage: 1, name: '追号' },
      auto_open: { value: '1', curentPage: 0, name: '自开' },
      day_issue: { value: '', curentPage: 1, name: '每日奖期' },
      issue_format: { value: '', curentPage: 1, name: '奖期格式' },
      issue_part: { value: '', curentPage: 1, name: '奖期部分' },
      issue_type: { value: 'random', curentPage: 1, name: '奖期类型' },
      valid_code: { value: '', curentPage: 1, name: '合法号码' },
      open_casino: { value: '0', curentPage: 1, name: '娱乐城' },
      positions: { value: '1', curentPage: 1, name: '位置' },
      code_length: { value: '', curentPage: 1, name: '合法号码长度' },
      open_time: { value: null, curentPage: 1, name: '开放时间' },
      min_prize_group: { value: '', curentPage: 2, name: '最小奖金组' },
      max_prize_group: { value: '', curentPage: 2, name: '最大奖金组' },
      diff_prize_group: { value: '', curentPage: 2, name: '奖金组差值' },
      min_times: { value: '', curentPage: 2, name: '最小倍数' },
      max_times: { value: '', curentPage: 2, name: '最大倍数' },
      max_prize_per_code: { value: '', curentPage: 2, name: '单注奖金' },
      max_prize_per_issue: { value: '', curentPage: 2, name: '单期最大奖金' },
      valid_modes: { value: '', curentPage: 3, name: '投注模式' },
      valid_price: { value: '', curentPage: 3, name: '一元/二元模式' },
      status: { value: 1, curentPage: 3, name: '开启关闭' },
      issue_desc: { value: '1', curentPage: 3, name: ' 描述' }
    }
  }
  /** ============================= 分配 ============================== */
  // 分配
  public doAssign(item) {
    this.assignData.en_name = item.en_name;
    this.api.Http({
      name: 'lotteryAssign',
      data: { action: 'option' },
      attach: item.en_name
    }).then((res: any) => {
      if (res && res.success) {
        this.partnerAssignOption = res.data.partner_option;
        this.assignData.show = true;
      } else {
        const modal = this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      }
    });
  }

  public onAssignPartnerChecked(event) {

  }

  public submitAssign() {
    for (let i = 0; i < this.partnerAssignOption.length; i++) {
      if (this.partnerAssignOption[i].checked === true) {
        this.assignData.data.partner_sign.push(this.partnerAssignOption[i].value);
      }
    }

    this.api.Http({
      name: 'lotteryAssign',
      data: this.assignData.data,
      attach: this.assignData.en_name
    }).then((res: any) => {
      const modal = this.modalService.success({
        nzTitle: '提示',
        nzContent: res.msg
      });
      this.assignData.show = true;
    });
  }

  // 全选中
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allAssignChecked) {
      this.partnerAssignOption = this.partnerAssignOption.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.partnerAssignOption = this.partnerAssignOption.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  public doFlush() {
    this.api.Http({ name: 'lotteryFlush', data: {} }).then((res: any) => {
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 刷新成功 !'
        });
      } else {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    });
  }
  // 开启
  public changeStatus(off: any) {
    if (off === 1) {
      this.addGame.status.value = 0;
    } else {
      this.addGame.status.value = 1;
    }
  }
  public limit() {
    console.log();
    let reg = isNaN(Number(this.addGame.diff_prize_group.value));
    if (reg || Number(this.addGame.diff_prize_group.value) < 0 || Number(this.addGame.diff_prize_group.value) > 50 || Number(this.addGame.diff_prize_group.value) === NaN) {
      this.message.error(this.addGame.diff_prize_group.value + '必须在0-50之间', {
        nzDuration: 1000,
      });
      return false;
    } else {
      return true;
    }
  }
  /**
   * 点击下一页/上一页
   */
  public nextCurent(type) {
    switch (type) {
      case 'add':
        let off = this.each();
        off = this.limit();
        if (off) {
          this.curentPage += 1;
        }
        break;
      case 'less':
        off = this.limit();
        if (off) {
          this.curentPage -= 1;
        }
        break;
    }
    switch (this.curentPage) {
      case 1:
    }
  }
  // isFast
  public isFast() {
    if (this.addGame.auto_open.value === '0') {
      this.isPartner = false;
    } else {
      this.isPartner = true;
      this.addGame.partner_sign.value = 'system';
    }
  }
  // 遍历
  public each() {
    for (let item in this.addGame) {
      if (this.addGame[item].curentPage === this.curentPage) {
        if (!this.addGame[item].value) {
          this.message.error(this.addGame[item].name + '不能为空', {
            nzDuration: 1000,
          });
          return false
        }
      }
    }
    return true
  }
  // 添加游戏
  public subminIssue() {
    let off = this.each();
    let obj = {
      series_id: '',
      is_sport: '',
      cn_name: '',
      en_name: '',
      lottery_icon: '',
      partner_sign: '',
      logic_sign: this.addGame.series_id.value,
      is_fast: '',
      max_trace_number: '',
      auto_open: '',
      day_issue: '',
      issue_format: '',
      issue_part: '',
      issue_type: '',
      valid_code: '',
      open_casino: '',
      positions: '',
      code_length: '',
      open_time: '',
      min_prize_group: '',
      max_prize_group: '',
      diff_prize_group: '',
      min_times: '',
      max_times: '',
      max_prize_per_code: '',
      max_prize_per_issue: '',
      valid_modes: null,
      valid_price: null,
      status: '',
      issue_desc: ''
    }
    for (let item in this.addGame) {
      obj[item] = this.addGame[item].value;
    }
    obj.valid_modes = obj.valid_modes.join(',');
    obj.valid_price = obj.valid_price.join(',');
    obj.valid_code = this.addGameItem.valid_code[this.addGame.valid_code.value];
    if (off) {
      if (this.isAdd == '1') {
        this.api.addGameRequest(obj).then((res: any) => {
          if (res.success) {
            this.getDataList();
            this.addGameOff = false;
            this.message.success(res.msg, {
              nzDuration: 1000,
            });
          } else {
            this.message.error(res.msg, {
              nzDuration: 1000,
            });
          }
        })
      } else {
        this.api.setGameRequest(obj, this.gameId).then((res: any) => {
          if (res.success) {
            this.getDataList();
            this.addGameOff = false;
            this.message.success(res.msg, {
              nzDuration: 1000,
            });
          } else {
            this.message.error(res.msg, {
              nzDuration: 1000,
            });
          }
        })
      }
    }
  }
  // 关闭游戏
  public closeGame() {
    this.addGameOff = false;
  }
}
