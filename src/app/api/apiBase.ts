import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToolService } from '../tool/tool.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiBase {
  public domain: string = environment.apiBaseUrl;
  public token: any = '';
  public pageSize: any = 15;

  constructor(
    public http: HttpClient,
    public utils: ToolService
  ) {}

  public get(url: string) {
    const api = this.domain + url;
    return new Promise((resolve, reject) => {
      this.http.get(api).subscribe((res) => {
        resolve(res);
      });
    });
  }

  public post(url: string, json: any = []) {
    const api = this.domain + url;
    const imgHttp = this.domain + 'noticeUploadImg';
    this.utils.storage.set('domain', imgHttp);
    return new Promise((resolve, reject) => {
      this.http.post(api, json).subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
  }
}
