import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-system-model-list',
  templateUrl: './system-model-list.component.html',
  styleUrls: ['./system-model-list.component.scss']
})
export class SystemModelListComponent implements OnInit {

  // 搜索条件
  public searchData = {
    partner_sign: ' '
  };
  // 添加模板
  public isAdd = '1';
  public ModuleHide: Boolean = false;
  public addModule = {
    name: '',
    sign: '',
    module_sign: '',
    module_name: '',
    status: 0
  };
  public dateRange = [];
  public tableList: any = [];
  public listOfOption: any = [];
  public selectedValue = [];
  public sign_list = [];
  public template_sign = '';
  public add_module_sign = [];
  public less_module_sign = [];
  public config = {
    show: false,
    buttonLoading: false,
    data: {

    }
  }
  public contentPop = {
    show: false,
    data: ''
  };

  constructor(
    public api: ApiService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getTableList();
  }

  public getTableList() {
    this.api.getModelList(this.searchData).then((res: any) => {
      if (res.success) {
        this.tableList = res.data.template;
        this.dateRange = res.data.partner;
      } else {
        this.message.create('error', res.msg);
      }
    });
  }

  public checkDetail(item: any) {
    this.template_sign = item.sign;
    this.isAdd = '2';
    const data = {
      id: item.id
    }
    this.getDetail(data);
    this.addModule.module_name = item.module_name;
    this.addModule.module_sign = item.module_sign;
    this.addModule.name = item.name;
    this.addModule.sign = item.sign;
    this.addModule.status = item.status;
  }
  // 获取详情
  public getDetail(data) {
    this.api.getmodelDetail(data).then((res: any) => {
      if (res.success) {
        if (data.id) {
          this.ModuleHide = true;
        }
        this.listOfOption = res.data;
        this.sign_list = [];
        this.listOfOption.forEach((item) => {
          if (this.isAdd === '1') {
            item.selected = false;
          } else {
            if (item.selected) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          }
          this.sign_list.push({ name: item.name, sign: item.sign, selected: item.selected });
        });
      } else {
        this.message.create('error', res.msg);
      }
    });
  }
  // 搜索
  public search() {
    this.getTableList();
  }
  public reset() {
    this.searchData.partner_sign = ' ';
    this.getTableList();
  }

  public submitConfig() {
    const data = {
      template_sign: this.template_sign,
      add_module_sign: this.add_module_sign,
      less_module_sign: this.less_module_sign
    };

    this.api.Http({
      name: 'modelSubmit',
      data
    }).then(res => {
      if (res.success) {
        this.message.create('success', res.msg);
        this.getTableList();
        this.config.show = false;
      } else {
        this.message.create('error', res.msg);
      };
    });
  }
  // public back() {
  //   this.config.show = false;
  //   this.template_sign = '';
  //   this.add_module_sign = '';
  //   this.less_module_sign = ''
  // }
  public lockTd(item: any) {
    // let str = '';
    // for (let i = 0; i < item.module_sign.length; i++) {
    //   str += item.module_sign[i] + ' ';
    // }
    // console.log(str);
    // if (!str) {
    //   return;
    // }
    this.contentPop = {
      show: true,
      data: item.module_name
    };
  }
  // 添加模板弹框submitAdd
  public addModel() {
    this.ModuleHide = true;
    this.isAdd = '1';
    const data = {
      id: '0'
    }
    this.getDetail(data);
    this.addModule = {
      name: '',
      sign: '',
      module_sign: '',
      module_name: '',
      status: 0
    };
  }
  // 切换状态
  public switch() {
    if (this.addModule.status) {
      this.addModule.status = 0;
    } else {
      this.addModule.status = 1;
    }

  }
  // 模块标识
  public opentTime(value: any) {
    let list = [];
    let list1 = [];
    value.forEach(ele => {
      list.push(ele.sign);
      list1.push(ele.name);
    });
    this.add_module_sign = list;
    this.addModule.module_sign = list.join(',');
    this.addModule.module_name = list1.join(',');
  }
  public submitAdd() {
    if (this.isAdd === '1') {
      this.api.addModel(this.addModule).then((res: any) => {
        if (res.success) {
          this.message.success('添加成功', {
            nzDuration: 1000,
          });
          this.ModuleHide = false;
          this.getTableList();
        } else {
          this.message.error(res.msg, {
            nzDuration: 1000,
          });
        }
      });
    } else {
      this.less_module_sign = [];
      this.sign_list.forEach(ele => {
        if (this.add_module_sign.indexOf(ele.sign) === -1) {
          this.less_module_sign.push(ele.sign);
        }
      })
      let option = {
        module_name: this.addModule.module_name,
        status: this.addModule.status,
        name: this.addModule.name,
        less_module_sign: this.less_module_sign.join(','),
        add_module_sign: this.addModule.module_sign,
        template_sign: this.addModule.sign
      }
      this.api.setModel(option).then((res: any) => {
        if (res.success) {
          this.ModuleHide = false;
          this.message.success('修改成功', {
            nzDuration: 1000,
          });
          this.getTableList();
        } else {
          this.message.error(res.msg, {
            nzDuration: 1000,
          });
        }
      })
    }
  }
}
