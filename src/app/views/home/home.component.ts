import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

import { ToolService } from '../../tool/tool.service';
import { ApiService } from '../../api/api.service';
import { AppReuseStrategy } from '../../app-reuse-strategy/app-reuse-strategy';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isCollapsed = false;
  public triggerTemplate: TemplateRef<void> | null = null;
  public menuList: Array<any> = [];
  public user: any;
  public users: boolean = true;
  public isFull: boolean = false;
  public navWidth: any = 0;
  public currentPath = '';
  public headerList = [];
  // 
  public titleList = [
    { title: '资金密码', index: 2 },
    { title: '登录密码', index: 1 }
  ]
  public psw = 2;
  // 快捷入口参数
  // public quickUrl = [];

  // 在线人数
  // public onlineUsers = '';
  public onlineaArea = '';
  public onlineaIp = '';
  public domainList = [];

  public EntranceList = ['WEB', 'APP'];

  public passwordPop = {
    show: false,
    data: {}
  };

  constructor(
    public ulits: ToolService,
    public router: Router,
    public api: ApiService,
    private modalService: NzModalService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const path = this.router.url;
        if (!path || path === '/') {
          this.headerList = [];
        }
      }
    });
  }

  ngOnInit() {
    const user = this.ulits.storage.get('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = user.data;
    this.api.Http({ name: 'menus' }).then((response: any) => {
      if (response.success) {
        const temp = response.data.menu;
        const path = this.router.url;

        for (const k of temp) {
          k.flag = false;
        }

        if (path && path !== '/') {
          this.currentPath = this.router.url.slice(1);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < temp.length; i++) {
            const element = temp[i].childs;
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < element.length; j++) {
              const elementj = element[j];
              if (this.currentPath === elementj.api_path) {
                const json = { api_path: elementj.api_path, title: elementj.title };
                this.headerList.push(json);
              }
            }
          }
        }
        for (let k of temp) {
          for (const i of k.childs) {
            if (this.currentPath === i.api_path) {
              k.flag = true;
            }
          }
        }

        for (let k of this.headerList) {
          for (const i of temp) {
            for (const j of i.childs) {
              if (k.api_path === j.api_path) {
                j.flag = true;
              }
            }
          }
        }

        this.menuList = temp;
      }
    });
    this.getOnline();
    this.getDomainList();
  }

  public SettingPassword() {
    this.passwordPop = {
      show: true,
      data: {}
    };
  }

  // 快捷入口


  // 获取在线人数
  private getOnline() {
    this.api.Http({ name: 'online' }).then((res: any) => {
      const { success, data } = res;
      if (success) {
        // this.onlineUsers = data['count'];
        this.onlineaArea = data['area'];
        this.onlineaIp = data['ip'];
      }
    });
  }

  public getDomainList() {
    this.api.Http({ name: 'partnerDomainList', data: { type_list: '1' } }).then((res: any) => {
      if (res.success) {
        this.domainList = res.data;
      }
    });
  }

  public openHandler(flag: any): void {
    // for (const i of this.menuList) {
    //   i.flag = false;
    // }
  }

  public collapsed() {
    if (this.users) {
      this.users = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 20);
    } else {
      this.isCollapsed = false;
      setTimeout(() => {
        this.users = true;
      }, 50);
    }
  }


  public logout() {
    this.modalService.confirm({
      nzTitle: '提醒',
      nzContent: '<b>确认退出吗 ?</b>',
      nzOnOk: () => {
        this.router.navigate(['/login']);
        this.ulits.storage.remove('user');
      }
    });
  }
  public fullScreen() {
    this.isFull = !this.isFull;
    const documentMethods = {
      enter: ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'],
      exit: ['cancelFullScreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msCancelFullScreen']
    };
    if (this.isFull) {
      document.documentElement[documentMethods.enter.filter((method) => {
        return document.documentElement[method];
      })[0]]();
    } else {
      document[documentMethods.exit.filter((method) => {
        return document[method];
      })[0]]();
    }
  }
  public goPath(item: any) {
    const headerList = this.headerList;
    this.currentPath = item.api_path;
    const not = headerList.some((i) => {
      return i.api_path === item.api_path;
    });
    if (!not) {
      item.isSelect = true;
      if (headerList.length > 8) {
        headerList.shift();
      }
      headerList.push(item);
    }

    // 左侧菜单切换到当前标签
    for (let k of this.menuList) {
      k.flag = false
      for (let i of k.childs) {
        i.flag = false;
        if (this.currentPath === i.api_path) {
          k.flag = true;
          i.flag = true;
        }
      }

    }

    this.router.navigate([item.api_path]);
  }
  public closeTab(item: any, event: Event) {
    this.navWidth = this.headerList.length * 103 + 20;
    event.preventDefault();
    // 当前关闭的是第几个路由
    let index = this.headerList.findIndex(p => p.api_path === item.api_path);
    // 如果只有一个不可以关闭
    if (this.headerList.length === 1) { return; }
    this.headerList = this.headerList.filter(p => p.api_path !== item.api_path);
    // 删除复用
    AppReuseStrategy.deleteRouteSnapshot(item.api_path);
    // if (!item.isSelect) return;
    // 显示上一个选中
    let menu = this.headerList[index - 1];
    if (this.headerList.length === 1) {
      index = 0;
    }
    if (!menu) {// 如果上一个没有下一个选中
      menu = this.headerList[index];
    }
    this.currentPath = menu.api_path;
    this.headerList.forEach(p => p.isSelect = p.api_path === menu.api_path);
    // 显示当前路由信息
    this.router.navigate(['/' + menu.api_path]);
  }

  public subPassword() {

    const option = { ...this.passwordPop.data };
    option['type'] = this.psw;
    this.api.Http({ name: 'editPassword', data: option }).then((res: any) => {
      const { success, msg } = res;
      if (success) {
        const modal = this.modalService.success({
          nzTitle: '温馨提示',
          nzContent: msg
        });
        this.passwordPop.show = false;
      }
    });
  }
  // 
  public selectTab(num: number) {
    this.psw = num;
    this.passwordPop.data = {};
  }
}
