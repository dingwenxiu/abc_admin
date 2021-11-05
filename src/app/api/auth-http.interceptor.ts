import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs/index';
import { catchError, mergeMap } from 'rxjs/internal/operators';
import { ToolService } from '../tool/tool.service';
import { NzMessageService, NzModalService} from 'ng-zorro-antd';
/**
 * 统一拦截器
 */
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  public headers: any;
  public div: any;
  // tslint:disable-next-line:max-line-length
  public loading = `<section style="position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;width:50px;height:50px;text-indent: .7em;color:#fff;">
      <img src = "../../assets/images/loading.gif" style="margin-bottom:5px;width: 30px;" /><br/>loading...</section>`;
  constructor(
    public utils: ToolService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any>> {
    const body: any = document.getElementsByTagName('body')[0];
    this.div = document.createElement('div');
    // console.log('进来拦截器')
    this.div.className = 'loading';
    this.div.innerHTML = this.loading;
    body.append(this.div);
    setTimeout( () => {
      const body2: any = document.getElementsByTagName('body')[0];
      const load2: any = body2.getElementsByClassName('loading')[0];
      if (load2) {
        body2.removeChild(load2);
      }
    }, 35000);

    if (request.url.endsWith('/login')) {
      // console.log('拦截器忽略登陆请求')
      const req = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
      return this.newMethod(next, req);
    } else {
      // console.log('拦截器正常请求')
      const req = request.clone({
        headers: request.headers.set('Authorization' , 'Bearer ' + this.getAccessToken())
      });
      return this.newMethod(next, req);
    }

  }

  private newMethod(next: HttpHandler, req: HttpRequest<any>): Observable<HttpHeaderResponse | HttpResponse<any>> {
    return next.handle(req).pipe(mergeMap((event: any) => {
      // 正常返回，处理具体返回参数
      if (event instanceof HttpResponse && event.status === 200) {
        return this.handleData(event); // 具体处理请求返回数据
      }
      return of(event);
    }), catchError((err: HttpErrorResponse) => this.handleData(err)));
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    const body3: any = document.getElementsByTagName('body')[0];
    const load3: any = body3.getElementsByClassName('loading')[0];
    if (load3) {
      body3.removeChild(load3);
    }

    const user = this.utils.storage.get('user');
    if (!user) {
      this.router.navigate(['/login']);
    }

    // 业务处理：一些通用操作
    if (event.status !== 200) {
      this.message.error(
        event.statusText,
        { nzDuration: 5000 }
      );
      if (event.status === 401) {
        // this.modalService.error({
        //   nzTitle: '提示',
        //   nzContent: '<b>请先登录 !</b>'
        // });
        this.message.error(
          '请先登录 !',
          { nzDuration: 5000 }
        );
        this.router.navigate(['/login']);
      }
    } else if (!(event instanceof HttpErrorResponse) && event.body && !event.body.status) {

    }
    return of(event);
  }

  private getAccessToken() {
    const user = this.utils.storage.get('user');
    let token = null;
    if (user && user.data) {
      token = user.data.token;
    }
    return token;
  }
}
