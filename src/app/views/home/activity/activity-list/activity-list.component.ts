import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from '../../../../api/api.service';
import { ToolService } from '../../../../tool/tool.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  public tableList = [];
  public page = {
    index: 1,
    total: 0
  };
  public dateRange = [];
  public etidImage_home: any;
  public etidImage_lists: any;
  public edit = {
    show: false,
    type: 0,
    id:0,
    data: {
      description: '',
      end_time: '',
      image_home: '',
      image_list: '',
      sign: '',
      sort: '',
      start_time: '',
      status: 0,
      title: '',
      type: 0
    },
    config: {
      activity_type: [
        {value: '', lable: ''}
      ],
    }
  };
  public file_obj: any;
  public file_iri: string;

  public startValue: any;
  public endValue: any;

  constructor(
    public api: ApiService,
    public message: NzMessageService,
    public modalService: NzModalService,
    public utils: ToolService
  ) { }

  ngOnInit() {
    this.getList();
  }

   // 上传首页图
   public homeImages (e: any) {
    if (e.type === 'success') {
      this.etidImage_home = e.fileList[0].response.data.url;
      this.edit.data.image_home = e.fileList[0].response.data.url;
      // this.edit.data.image_home = e.fileList[0].response.data.path;
    }
  }
  // 上传列表图
  public listImages (e: any) {
    if (e.type === 'success') {
      this.etidImage_lists = e.fileList[0].response.data.url;
      this.edit.data.image_list = e.fileList[0].response.data.url;
      // this.edit.data.image_list = e.fileList[0].response.data.path;
    }
  }
  // 获取列表
  public getList() {
    let data = {
      page_index: this.page.index,
      page_size: this.api.pageSize,
    };

    this.api.Http({name: 'activityList', data:data}).then((res: any) => {
      if (res.success) {
        this.page.total = res.data.total;
        this.tableList  = res.data.data;
      }
    })
  }

  // 日期选择框
  public onChange(result: Date): void {
    this.edit.data.start_time = this.utils.formatTime(new Date(result[0]).getTime(), 'YYYY-MM-DD HH:MM:SS');
    this.edit.data.end_time = this.utils.formatTime(new Date(result[1]).getTime(), 'YYYY-MM-DD HH:MM:SS');
  }

  // 确认编辑 添加活动
  public submitAddActivity() {
    this.api.Http({name: 'activityAdd', data:this.edit.data}).then( (res: any) => {
      if (res.success) {
        this.edit.show = false;
        this.message.create('success', res.msg);
        this.getList();
      }
    })
  }

  // 删除首页图片
  public deleteHomeLists() {
    this.etidImage_home = null;
    this.edit.data.image_home = null;
  }
  // 删除列表图片
  public deleteImageLists() {
    this.etidImage_lists = null;
    this.edit.data.image_list = null;
  }
  // 编辑 添加活动
  public activityAdd(id: any = 0) {
    let data = {
      action: 'option'
    };

    this.etidImage_lists = [];
    this.etidImage_home = [];
    this.edit.type = id;

    this.api.Http({name: 'activityAdd', data:data}).then( (res: any) => {
      if (res.success) {
        this.edit.show = true;
        let temp = [];
        for (const k of Object.keys(res.data.activity_type)) {
          let json: any = {};
          json.key = +k;
          json.value = res.data.activity_type[k];
          temp.push(json);
        }
        this.edit.config.activity_type = temp;
        if (res.data.image_list) {
          this.edit.data.image_list = res.data.image_list.substring(res.data.image_list.indexOf('room_avatar') - 1);
          this.etidImage_lists = res.data.image_list
        }
        if (res.data.image_home) {
          this.edit.data.image_home = res.data.image_home.substring(res.data.image_home.indexOf('room_avatar') - 1);
          this.etidImage_home = res.data.image_home
        }
        if (this.edit.type === 0) {
          this.edit.data = {
            description: '',
            end_time: '',
            image_home: '',
            image_list: '',
            sign: '',
            sort: '',
            start_time: '',
            status: 0,
            title: '',
            type: 0
          };
        } else {
          this.edit.data = this.api.filterData(this.edit.data, res.data);
        }
      }
    })
  }

  // 删除活动
  public activityDel(item: any) {
    const modal = this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确认删除吗 ?',
      nzOnOk: () => {
        this.api.Http({name: 'activityDel', attach:item.id}).then( (res: any) => {
          if (res.success) {
            this.getList();
            this.message.create('success', res.msg);
          }
        })
      }
    });
  }

  // 修改状态
  public doStatus(item: any) {
    this.api.Http({name: 'activityStatus', attach:item.id}).then( (res: any) => {
      if (res.success) {
        this.getList();
        this.message.create('success', res.msg);
      }
    })
  }

  

  public pageChange() {
    this.getList();
  }

}
