import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

import { ApiService } from '../../api/api.service';
import { ToolService } from '../../tool/tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup; 
  public username: string = '';
  public password: string = '';
  public verification: string = '';
  public rememberPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    public utils: ToolService,
    public router: Router,
    private modalService: NzModalService
  ) {
    const rememberPasswords = this.utils.storage.get('rememberPasswords');
    if (rememberPasswords) {
      this.rememberPassword = true;
      this.username = rememberPasswords.data.username;
      this.password = rememberPasswords.data.password;
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      verification: [null, [Validators.required]],
      remember: [true]
    });
  }

  // 提交登录
  public submitForm() {
    // this.router.navigate(['']);
    // return;
    if (
      !this.utils.removeAllSpace(this.username) ||
      !this.utils.removeAllSpace(this.password)
    ) {
      return false;
    }
    if (!this.rememberPassword) {
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    const data = {
      email: this.username,
      password: this.password,
      code: this.verification
    };

    this.api.Http({name: 'login', data}).then((res: any) => {
      if (res && res.success) {
        this.utils.storage.set('user', res.data, 1);
        if (this.rememberPassword) {
          this.utils.storage.set('rememberPasswords', {
            username: this.username,
            password: this.password
          });
        } else {
          const rememberPasswords = this.utils.storage.get('rememberPasswords');
          if (rememberPasswords) {
            this.utils.storage.remove('rememberPasswords');
          }
        }
        this.utils.setDefaultPartnerSign(res.data.default_partner_sign);
        this.router.navigate(['']);
      } else {
        this.modalService.error({
          nzTitle: '错误',
          nzContent: res.msg
        });
      }
    });
  }

  // 发送验证码
  public sendCode() {
    const data = {
      email: this.username,
      password: this.password
    };
    this.api.sendCode(data).then((res: any) => {
      if (res.success) {
        this.modalService.success({
          nzTitle: '提示',
          nzContent: res.msg
        });
      }
    }).catch(() => {})
  }
}
