import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})

export class PartnerListComponent implements OnInit {
  public confirmModal: NzModalRef;
  // 设置活动
  public isActivityState: boolean = false;
  public activityLoading: boolean = false;
  public ActivityData = {
    partner_sign: '',
    less_id: '',
    add_id: ''
  };
  public setTestWeb = {
    partner_sign: ''
  }
  public Activityselect = [];
  public ActivityList: Array<{ label: string; value: string }> = [];
  // 测试域名添加
  public testWeb = false;
  public isTestWeb = false;
  // 设置商户后台
  public hide: boolean = false;
  // 平台多选框
  public allChecked = false;
  public indeterminate = true;
  public checkOptionsplats = [];
  public allNodeList = [];
  public allNodes = {};
  // 娱乐城配置参数
  public recreationData = {
    partner_sign: '',
    casino_secret_key: '',
    casino_merchant: '',
    casino_gateway: '',
    casino_encryption_time: '30'
  };

  // 商户了列表
  public partnerList = [];
  public page = {
    index: 1,
    total: 0
  };
  public validateForm: FormGroup;
  // 编辑商户
  public curentPage = 0;
  public webDomian = [];
  // 商户对象
  public addData = {
    show: false,
    isAdd: true,
    buttonLoading: false,
    data: {
      id: 0,
      sign: null,
      name: null,
      theme: 'default',
      remark: '',
      top_player_username: '',
      password: '',
      admin_email: '',
      admin_password: '',
      admin_fund_password: '',
      host: '',
      casino_secret_key: '',
      casino_merchant: '',
      casino_gateway: '',
      casino_encryption_time: '30',
      add_template_sign: '',
      less_template_sign: ''
    }
  };
  // 商户模板参数
  public receiveTemplate: Array<{ label: string; value: string }> = [];
  public seedTemplate = '';
  public TemplateData = {
    seedTemplate: {
      partner_sign: '',
      add_template_sign: '',
      less_template_sign: '',
      partner_name: ''
    }
  }
  // 设置菜单对象
  public menuData = {
    partnerId: '',
    partner: '',
    menuTree: [],
    show: false,
    buttonLoading: false,
    data: {
      menu_ids: []
    }
  };
  public merchants = {};
  // 详情
  public detail = {
    show: false,
    data: {}
  }

  // 设置娱乐城对象 
  public casinoData = {
    partnerId: '',
    partner: '',
    show: false,
    buttonLoading: false,
    data: {
      code: [],
      casino_site_id: '',
      casino_platform_id: '',
    }
  };
  // 设置商户后台图标
  public imgId = '';
  public temp_avatars: any;
  public eidtImgData = {
    show: false
  }
  // 设置直属对象
  public topPlayerData = {
    partnerId: '',
    partner: '',
    setTopPlayerList: [],
    show: false,
    buttonLoading: false,
    data: {
      ids: []
    }
  };


  public searchData = {
    sign: ''
  };

  public domainPop = {
    show: false,
    data: []
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private fb: FormBuilder,
    public message: NzMessageService,
    private modal: NzModalService,
    public modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getDataList();
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]]
    });
  }

  // 搜索
  public search() {
    this.page.index = 1;
    this.getDataList();
  }

  // 重置搜索
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      sign: ''
    };
    this.getDataList();
  }

  public checkDomain(item) {
    this.domainPop = {
      show: true,
      data: [...item.domain]
    }
  }

  public selectChange(value: any, type?) {
    const arr = this.FilterData(value, this.receiveTemplate);
    this.TemplateData.seedTemplate.add_template_sign = arr.join(',');
    this.TemplateData.seedTemplate.add_template_sign = this.TemplateData.seedTemplate.add_template_sign.replace(/,/g, "");
    const arr1 = this.uncheckFilterData(value, this.receiveTemplate);
    this.TemplateData.seedTemplate.less_template_sign = arr1.join(',');
    if (type == '1') {
      this.addData.data.add_template_sign = this.TemplateData.seedTemplate.add_template_sign;
      this.addData.data.less_template_sign = this.TemplateData.seedTemplate.less_template_sign;
    }
  }
  // 修改商户头像
  public eidtImg(item: any) {
    this.eidtImgData.show = true;
    this.imgId = item.id;
    this.temp_avatars = item.logo_image_partner;
  }
  // 上传列表图
  public listImages(e: any, item: any) {
    if (e.type === 'success') {
      item.logo_image_partner = e.fileList[0].response.data.path;
    }
  }
  // 设置商户后台图标
  public subminImg() {
    this.eidtImgData.show = false;
    this.getDataList();
  }
  // 
  public cloneImg() {
    this.eidtImgData.show = false;
  }
  // 删除图片
  public deleteImg(item: any) {
    item.logo_image_partner = null;
  }
  // 关闭商户模板弹框
  public closeMerchants() {
    this.hide = false;
    this.receiveTemplate = [];
    this.seedTemplate = '';
  }
  // 提交模板
  public submitTemplate() {
    this.api.setMerchants(this.TemplateData.seedTemplate).then((res: any) => {
      if (res.success) {
        this.hide = false;
        this.getDataList();
        this.message.success('添加成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 选中的活动
  public activityChange(value: any) {
    this.ActivityData.add_id = value.join(',');
    const arr1 = this.uncheckFilterData(value, this.ActivityList);
    this.ActivityData.less_id = arr1.join(',');
  }
  // 提交选中的活动
  public submitActivity() {
    this.api.setactivityAdd(this.ActivityData).then((res: any) => {
      if (res.success) {
        this.message.success('设置成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.mag, {
          nzDuration: 1000,
        });
      }
    });
  }
  // 设置活动
  public setActivity(item: any) {
    this.isActivityState = true;
    let option = {
      partner_sign: item.sign
    }
    this.ActivityData.partner_sign = item.sign;
    this.api.getactivityList(option).then((res: any) => {
      if (res.success) {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 0; i < res.data.length; i++) {
          children.push({ label: res.data[i].name, value: res.data[i].id });
        }
        this.ActivityList = children;
      }
    });
  }
  // 关闭设置活动弹框
  public offActivity() {
    this.isActivityState = false;
  }
  // 设置商户模板
  public setMerchants(item: any, off?) {
    let option = {
      partner_sign: item.sign
    };
    this.TemplateData.seedTemplate.partner_name = item.name;
    this.TemplateData.seedTemplate.partner_sign = item.sign;
    this.api.getMerchants(option).then((res: any) => {
      if (res.success) {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 0; i < res['data'].length; i++) {
          children.push({ label: res['data'][i].name, value: res['data'][i].sign });
          if (res['data'][i].selected == 1) {
            this.seedTemplate = children[i].value;
          }
        }
        this.receiveTemplate = children;
      }
      if (!off) {
        this.hide = true;
      }
    });
    
  }
  // 已选择的值
  public FilterData(arr1, arr2) {
    let arr3 = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1)
        arr3.push(arr1[i]);
    }
    return arr3;
  }
  // 未选中的值
  public uncheckFilterData(arr, arr1) {
    let arr2 = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr.indexOf(arr1[i].value) === -1) {
        arr2.push(arr1[i].value);
      }
    }
    return arr2;
  }
  // 详情
  public detailsHandler(item: any) {
    this.detail.show = true;
    this.detail.data = item;
  }

  // 公告列表
  public getDataList() {
    const data = {
      page_size: this.api.pageSize,
      page_index: this.page.index,
      sign: this.searchData.sign
    };

    this.api.Http({ name: 'partnerList', data }).then((res: any) => {
      if (res.success) {
        if (!res.data.test_web) {
          this.isTestWeb = true;
        }
        this.partnerList = res.data.data;
        this.merchants = res.data.partner_options;
        this.page.total = res.data.total;
        this.checkOptionsplats = [];
        this.webDomian = res.data.web_domain;
        this.testWeb = res.data.test_web;
        if (res.data.platform_options && res.data.platform_options.length > 0) {
          res.data.platform_options.forEach((item) => {
            this.checkOptionsplats.push(
              {
                label: item.name,
                value: item.code,
                checked: false
              });
          });
        }
      }
    });
  }

  /**
   * 点击下一页/上一页
   */
  public nextCurent(type) {
    switch (type) {
      case 'add':
        this.curentPage += 1;
        break;
      case 'less':
        this.curentPage -= 1;
        break;
    }
    switch (this.curentPage) {
      case 1:
        this.setMerchants(this.addData.data, true);
    }
  }

  // 状态
  public doStatus(id) {
    this.api.Http({ name: 'partnerStatus', data: {}, attach: id }).then((res: any) => {
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

  // 添加商户
  public addPartner() {
    this.curentPage = 0;
    this.addData = {
      show: true,
      isAdd: true,
      buttonLoading: false,
      data: {
        id: 0,
        sign: null,
        name: null,
        theme: 'default',
        remark: '',
        top_player_username: '',
        password: '',
        admin_email: '',
        admin_password: '',
        admin_fund_password: '',
        host: '',
        casino_secret_key: '',
        casino_merchant: '',
        casino_gateway: '',
        casino_encryption_time: '30',
        add_template_sign: '',
        less_template_sign: ''
      }
    };

  }

  public editPartner(item) {
    this.addData = {
      show: true,
      isAdd: false,
      buttonLoading: false,
      data: {
        id: item.id,
        sign: item.sign,
        name: item.name,
        theme: item.theme,
        remark: item.remark,
        top_player_username: item.top_player_username,
        password: item.password,
        admin_email: item.admin_email,
        admin_password: item.admin_password,
        admin_fund_password: item.admin_fund_password,
        host: item.host,
        casino_secret_key: item.casino_secret_key,
        casino_merchant: item.casino_merchant,
        casino_gateway: item.casino_gateway,
        casino_encryption_time: item.casino_encryption_time,
        add_template_sign: item.add_template_sign,
        less_template_sign: item.less_template_sign
      }
    };
  }

  /**
   * 打开设置平台窗口
   */
  public partnerSetCasino(item) {
    this.casinoData.show = true;
    const option = {
      partner_sign: item.sign
    }
    this.api.getMerchantsList(option).then((res: any) => {
      if (res.success) {
        // tslint:disable-next-line: forin
        for (const item in res.data) {
          this.recreationData[res.data[item].sign] = res.data[item].value;
        }
        this.recreationData['partner_sign'] = item.sign;
      }
    });

    this.casinoData.partnerId = item.id;
    this.casinoData.partner = item.name;
    this.casinoData.data.casino_platform_id = item.casino_platform_id;
    this.casinoData.data.casino_site_id = item.casino_site_id;
    let casinoPlatformObj = {};
    if (item.casino_platform && item.casino_platform.length > 0) {
      item.casino_platform.forEach((data) => {
        casinoPlatformObj[data.code] = data.name;
      });
    };
    this.checkOptionsplats.forEach((data) => {
      if (casinoPlatformObj[data.value]) {
        data.checked = true;
      } else {
        data.checked = false;
      }
    });

  }

  /**
 * 设置菜单
 */
  // public async setMenu(item: any) {
  //   let option = {
  //     id: item.id,
  //     action: 'option',
  //   };

  //   this.menuData = {
  //     partnerId: item.id,
  //     partner: item.name,
  //     menuTree: [],
  //     show: true,
  //     buttonLoading: false,
  //     data: {
  //       menu_ids: []
  //     }
  //   };

  //   item.menus.forEach((data: any) => {
  //     this.menuData.data.menu_ids.push(data.menu_id);
  //   });

  //   let response = await this.api.Http({ name: 'partnerSetAdminMenu', data: { action: 'option' } });
  //   if (response.success) {
  //     if (response.data.menu_options.data && response.data.menu_options.data.length > 0) {
  //       this.allNodes = {};
  //       this.getMenuTreeList(this.menuData.menuTree, response.data.menu_options.data);
  //     }
  //     this.menuData.data.menu_ids = JSON.parse(JSON.stringify(this.menuData.data.menu_ids));

  //     console.log(response.data.menu_options.data)
  //     console.log(this.menuData.menuTree)
  //   } else {
  //     const modal = this.modalService.error({
  //       nzTitle: '温馨提示',
  //       nzContent: response.msg
  //     });
  //   }
  // }

  /**
   * 获得树菜单
   */
  public getMenuTreeList(nodeList: any, menuList: any) {
    menuList.forEach((item: any, index: any) => {
      let obj = {
        title: item.cn_name,
        value: item.id,
        key: item.id
      };

      if (item.childs && item.childs.length > 0) {
        obj['children'] = [];
        this.getMenuTreeList(obj['children'], item.childs)
      } else {
        obj['isLeaf'] = true;
      }

      this.allNodes[obj.key] = obj;
      nodeList.push(obj);
    });
  }

  /**
   * 树选择菜单值发生变化
   */
  public onChangeMenu(e) {

  }

  /**
   * 获取所有子节点
   */
  public getTreeArray(nowId) {
    if (this.allNodes[nowId]) {
      this.allNodeList.push(nowId);
      if (this.allNodes[nowId].children && this.allNodes[nowId].children.length > 0) {
        this.allNodes[nowId].children.forEach((item) => {
          this.getTreeArray(item.key);
        });
      }
    }

  }

  /**
   * 取消设置菜单
   */
  public cancelMenu() {
    this.menuData.show = false;

  }

  /**
 * 测试域名添加
 */
  public testWebAdd() {
    this.testWeb = false;
  }
  public addTestWeb(item: any) {
    this.testWeb = true;
    this.setTestWeb.partner_sign = item.sign;
    this.confirmModal = this.modal.confirm({
      nzTitle: '温馨提示!是否添加',
      nzOnOk: () => {
        this.api.addTestWebPartner(this.setTestWeb).then((res: any) => {
          if (res.success) {
            this.getDataList();
            this.message.success('添加成功', {
              nzDuration: 1000,
            });
          } else {
            this.message.error(res.msg, {
              nzDuration: 1000,
            });
          }
        });
      }

    });
  }

  /**
   * 提交设置菜单
   */
  public submitSetMenu() {
    this.menuData.buttonLoading = true;
    this.allNodeList = [];

    this.menuData.data.menu_ids.forEach((item) => {
      this.getTreeArray(item);
    });

    this.allNodeList = this.utils.unique(this.allNodeList);
    let option = {
      id: this.menuData.partnerId,
      menu_ids: this.allNodeList
    };

    this.api.Http({ name: 'partnerSetAdminMenu', data: option }).then((res: any) => {
      this.menuData.buttonLoading = false;
      if (res.success) {
        this.menuData.show = false;
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜您, 设置菜单权限成功 !'
        });
        this.back();
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
    }).catch(() => {
      this.menuData.buttonLoading = false;
    });
  }

  /**
   * 提交设置
   */
  public submitCasino() {
    this.casinoData.buttonLoading = true;
    this.api.setMerchantsList(this.recreationData).then((res: any) => {
      if (res.isSuccess) {
        this.casinoData.show = false;
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜您, 设置平台成功 !'
        });
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
      this.casinoData.buttonLoading = false;
    });
    // let option = {
    //   casino_site_id: this.casinoData.data.casino_site_id,
    //   casino_platform_id: this.casinoData.data.casino_platform_id,
    //   code: []
    // };

    // this.checkOptionsplats.forEach((item) => {
    //   if (item.checked) {
    //     option.code.push(item.value)
    //   }
    // });

    // this.api.Http({ name: 'partnerSetCasino', data: option }).then((res: any) => {
    //   if (res.success) {
    //     this.casinoData.show = false;
    //     this.getDataList();
    //     const modal = this.modalService.success({
    //       nzTitle: '温馨提示',
    //       nzContent: '恭喜您, 设置平台成功 !'
    //     });
    //     this.back();
    //   } else {
    //     const modal = this.modalService.error({
    //       nzTitle: '温馨提示',
    //       nzContent: res.msg
    //     });
    //   }
    //   this.casinoData.buttonLoading = false;
    // })
  }

  /**
   * 取消设置
   */
  public cancelCasino() {
    this.casinoData.show = false;
    this.casinoData = {
      partnerId: '',
      partner: '',
      show: false,
      buttonLoading: false,
      data: {
        code: [],
        casino_site_id: '',
        casino_platform_id: '',
      }
    };
  }

  // 提交平台
  public submitPartner() {
    this.addData.buttonLoading = true;
    const data = this.addData.data;
    for (const key in data) {
      if ((data[key] == null || data[key] === undefined) && data['id']) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '对不起,' + key + '不能为空!'
        });
        return false;
      }
    }

    let option = {
      name: data.name,
      sign: data.sign,
      remark: data.remark,
      theme: data.theme,
      top_player_username: data.top_player_username,
      password: data.password,
      admin_email: data.admin_email,
      admin_password: data.admin_password,
      admin_fund_password: data.admin_fund_password,
      host: this.addData.data.host,
      casino_secret_key: this.addData.data.casino_secret_key,
      casino_merchant: this.addData.data.casino_merchant,
      casino_gateway: this.addData.data.casino_gateway,
      casino_encryption_time: this.addData.data.casino_encryption_time,
      add_template_sign: this.addData.data.add_template_sign,
      less_template_sign: this.addData.data.less_template_sign
    };

    if (data.id) {
      option['id'] = data.id
    }

    this.api.Http({ name: 'partnerAdd', data: option }).then((res: any) => {
      this.addData.buttonLoading = false;
      if (res.success) {
        this.getDataList();
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜您, ' + (this.addData.isAdd ? '添加' : '编辑') + '商户成功 !'
        });
        this.back();
      } else {
        const modal = this.modalService.error({
          nzTitle: '温馨提示',
          nzContent: res.msg
        });
      }
      this.addData.buttonLoading = false;
    })
  }

  /**
   * 多选平台更改
   */
  public updatePlatsChecked(): void {
    if (this.checkOptionsplats.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsplats.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  /**
   * 全选
   */
  public updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsplats = this.checkOptionsplats.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsplats = this.checkOptionsplats.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  // 回退
  public back() {
    this.addData.show = false;
    this.addData = {
      show: false,
      isAdd: true,
      buttonLoading: false,
      data: {
        id: 0,
        sign: null,
        name: null,
        theme: 'default',
        remark: '',
        top_player_username: '',
        password: '',
        admin_email: '',
        admin_password: '',
        admin_fund_password: '',
        host: '',
        casino_secret_key: '',
        casino_merchant: '',
        casino_gateway: '',
        casino_encryption_time: '30',
        add_template_sign: '',
        less_template_sign: ''
      }
    };
  }
  // 翻页
  public pageChange() {
    this.getDataList();
  }

  // 控水
  public rateOpen(item) {
    this.api.Http({name: 'rateOpen', data: {id: item.id}}).then((res: any) => {
      if (res.success) {
        this.getDataList();
        this.message.create('success', res.msg);
      }
    });
  }
}
