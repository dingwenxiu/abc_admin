import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ToolService } from "../../../../tool/tool.service";

@Component({
  selector: 'app-partner-menu',
  templateUrl: './partner-menu-config.component.html',
  styleUrls: ['./partner-menu-config.component.scss']
})

// 商户菜单逻辑 == 展示已经分配的菜单
export class PartnerMenuConfigComponent implements OnInit {
  public tableList = [];
  // 
  public pidList = [];

  public allMenu = [];

  public page = {
    index: 1,
    total: 0
  };

  public parentSet = [];

  public partnerOption = {};
  public menuTypeOptions = [];

  // 查询数据
  public searchData = {
    page_index: 1,
    page_size: 15,
    menu_type: 'all',
    partner_sign: '',
  };

  public parent = {
    id: 0,
    title: ''
  };

  public edit = {
    type: 0,
    show: false,
    editSubmitButton: false,
    id: 0,
    data: {
      en_name: '',
      cn_name: '',
      pid: '0',
      type: '1',
      route: '',
      api_path: '',
      sort: '',
      css_class: ''
    }
  };

  constructor(
    public api: ApiService,
    public utils: ToolService,
    private modalService: NzModalService,
    private message: NzMessageService,
    ) {
  }

  // 初始化
  ngOnInit() {
    this.getDataList();
  }

  // 删除
  public doDel(item) {
    this.api.delPartnerMenuConfig({}, item.id).then((res: any) => {
      if (res.success) {
        this.message.success(res.msg, {
          nzDuration: 1000,
        });

      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
      this.getDataList();
    });
  }

  // 禁用启用
  public doStatus(item) {
    this.api.Http({ name: 'partnerMenuConfigStatus', attach: item.id }).then((res: any) => {
      if (res.success) {
        item.status = !item.status;
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: '恭喜, 修改成功 !'
        });
      }
    });
  }

  public pageChange() {
    this.getDataList();
  }

  // 获取数据列表
  public getDataList() {
    this.searchData.page_index = this.page.index;
    this.api.Http({ name: 'partnerMenuConfigList', data: this.searchData.page_index }).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.pidList = [];
        this.allMenu = res.data.data;

        this.menuTypeOptions = res.data.menu_type_options;
      }
    });
  }

  // 执行查询
  public doSearch() {
    this.page.index = 1;
    this.getDataList();
  }

  // 重置数据
  public resetSearch() {
    this.page.index = 1;
    this.searchData = {
      page_index: 1,
      page_size: 15,
      menu_type: 'all',
      partner_sign: 'all',
    };

    this.getDataList();
  }

  // 显示下级
  public showChild(item) {
    this.parent = item;
    this.parentSet.push(item);
    if (item.id) {
      this.pidList = this.tableList;
    }
    this.tableList = item.childs;
    this.edit.data.pid = String(item.id);
  }

  // 导航到下级
  public doNavToChild(item) {
    this.edit.data.pid = '0';
    if (item == 0) {
      this.parentSet = [];
      this.edit.data.pid = '0';
      this.getDataList();

    } else {
      this.parent = item;
      this.edit.data.pid = item.id;
      this.tableList = item.childs;
    };
  }

  // 添加或者编辑
  public doEdit(item: any, type) {
    if (item) {
      this.edit.id = item.id;
      this.edit.data = item;
      this.parent.title = item.cn_name;
      this.edit.type = 1;
    } else {
      this.edit.type = 0;
      this.parent.title = '';
      this.edit.data = {
        en_name: '',
        cn_name: '',
        pid: type,
        type: '1',
        route: '',
        api_path: '',
        sort: '',
        css_class: ''
      };
    }
    this.edit.show = true;
  }

  // 提交
  public submitEdit() {
    if(!this.pidList){
      this.edit.data.pid = '0';
    }
    if (this.utils.removeAllSpace(this.edit.data.cn_name)) {
      this.api.Http({ name: 'partnerMenuConfigAdd', data: this.edit.data }).then((res) => {
        if (res.success) {
          this.edit.show = false;
          this.initEditData();
          this.getDataList();
          const modal = this.modalService.success({
            nzTitle: '提示',
            nzContent: res.msg
          });
        }
        this.getDataList();
      });
    }
  }

  public back() {
    this.edit.show = false;
    this.initEditData();
  }

  public initEditData() {
    this.edit.id = 0;
    this.edit.editSubmitButton = false;
    this.edit.data = {
      en_name: '',
      cn_name: '',
      pid: '0',
      type: '1',
      route: '',
      api_path: '',
      sort: '',
      css_class: ''
    };
  }
}
