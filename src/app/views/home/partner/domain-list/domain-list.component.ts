import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api/api.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})

export class DomainListComponent implements OnInit {
  // 全选单选参数
  public allChecked = false;
  public indeterminate = true;
  public tableList = [];
  public tplModalButtonLoading = false;
  public isDelete: boolean = false;
  public delList = [];
  public request_desc = '';

  public typeOptions = {};
  public partner_opentions = {};
  public partnerSign = {};

  public page = {
    index: 1,
    total: 0
  };
  public domainName: string;
  // 
  public envTypeList = [];
  public typeList = [];
  // 搜索参数
  public searchData = {
    page_index: this.page.index,
    page_size: this.api.pageSize,
    partner_sign: 'YX',
    env_type: '',
    type: ''
  };

  public detail = {
    show: false,
    data: {
      id: '---',
      bank_name: '---',
      bank_sign: '---',
      branch: '---',
      card_number: '---',
      city_id: '---',
      nickname: '---',
      owner_name: '---',
      province_id: '---'
    }
  };

  public add = {
    show: false,
    data: {
      partner_sign: 'YX',
      name: '',
      domain: '',
      type: '1',
      env_type: '1',
      remark: '',
      add_partner_admin_id: ''
    },
  }
  // 编辑域名
  public isVisible = false;
  public isOkLoading = false;
  public editId = '';
  // 修改域名参数
  public edit = {
    test_domain_name: ''
  }

  constructor(public api: ApiService, private modalService: NzModalService, private message: NzMessageService) {

  }
  // 初始化
  ngOnInit() {
    this.getDataList();
  }
  // 关闭删除
  public CloseDel() {
    this.isDelete = false;
  }
  // 确定删除
  public handleDelOk() {
    this.api.delDomainName({ ids: this.delList, request_desc: this.request_desc }).then((res: any) => {
      if (res.success) {
        this.message.success(res.msg, {
          nzDuration: 1000,
        });
        this.isDelete = false;
        this.getDataList();
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
  public doDetails(item: any) {
    this.detail.show = true;
    if (item.content) {
      if (typeof item.content === 'string') {
        this.detail.data = JSON.parse(item.content).data;
      } else {
        this.detail.data = item.content.data;
      }
    }
  }
  // 页面变更
  public doPageChange() {
    this.getDataList();
  }
  // 全选单选多选
  public updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.tableList = this.tableList.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.tableList = this.tableList.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  public updateSingleChecked(): void {
    if (this.tableList.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.tableList.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  // 搜索
  public search() {
    this.getDataList();
  }
  // 重置
  public resetSearch() {
    this.searchData = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
      partner_sign: 'YX',
      env_type: '',
      type: ''
    };
    this.getDataList();
  }
  // 删除域名
  public delDoAdmin() {
    this.isDelete = true;
    let list = [];
    this.tableList.forEach(ele => {
      if (ele.checked) {
        list.push(ele.id);
      }
    });
    this.delList = list;
  }

  public getDataList() {
    this.api.Http({ name: 'partnerDomainList', data: this.searchData }).then((res: any) => {
      if (res.success) {
        res.data.data.forEach(ele => {
          ele.checked = false;
        });
        this.page.total = res.data.total;
        this.tableList = res.data.data;
        this.typeList = res.data.type_options;
        this.envTypeList = res.data.env_type_options;
        this.partnerSign = res.data.partner_options;
        this.partner_opentions = res.data.partner_options;
      }
    });
  }

  public addDomain() {
    this.add.show = true;
  }

  public back() {
    this.add.show = false;
    this.add.data = {
      partner_sign: '',
      name: '',
      domain: '',
      type: '',
      env_type: '',
      remark: '',
      add_partner_admin_id: ''
    }
  }

  public submitEdit() {
    const data = this.add.data;
    this.api.Http({ name: 'partnerDomainAdd', data, attach: 0 + '' }).then((res: any) => {
      this.message.create('sueecss', res.msg);
      this.back();
      this.getDataList();

    });

  }

  public setStatus(item, index) {
    this.api.Http({ name: 'partnerDomainStatus', attach: item.id }).then((res: any) => {
      const { success, msg } = res;
      const modal = this.modalService.success({
        nzTitle: '温馨提示',
        nzContent: msg
      });
      this.tableList[index]['status'] = item.status;
    });
  }
  // 编辑域名
  public doEdit(item: any) {
    this.isVisible = true;
    this.editId = item.partner_sign;
    this.domainName = item.domain;
    this.edit.test_domain_name = item.domain;
  }
  // 关闭编辑弹框
  public handleCancel() {
    this.isVisible = false;
  }
  // 编辑提交
  public handleOk() {
    this.isOkLoading = true;
    setTimeout(() => {
      this.api.setDomainName(this.edit, this.editId).then((res: any) => {
        if (res.success) {
          this.message.success('修改成功', {
            nzDuration: 1000,
          });
          this.getDataList();
        } else {
          this.message.error(res.msg, {
            nzDuration: 1000,
          });
        }
        this.isVisible = false;
        this.isOkLoading = false;
      });
    }, 3000);
  }
  // 禁用启用
  public doStatus(item) {
    this.api.setDomainStatus({}, item.id).then((res: any) => {
      if (res.success) {
        item.status = !item.status;
        this.message.success('修改成功', {
          nzDuration: 1000,
        });
      } else {
        this.message.error(res.msg, {
          nzDuration: 1000,
        });
      }
    });
  }
}
