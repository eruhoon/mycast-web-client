import { Component, OnInit } from '@angular/core';
import { JoinCommand } from 'src/app/models/login/JoinCommand';
import { ToastService } from 'src/app/services/notification/toast.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit {
  public form: JoinForm;

  public constructor(private mToastSrv: ToastService) {}

  public ngOnInit() {
    this.form = { id: '', pw: '', nick: '', pwConfirm: '' };
  }

  public onClick(): void {
    console.log(this.form);
    new JoinCommand().execute(
      this.form.id,
      this.form.pw,
      this.form.nick,
      (result) => {
        if (!result) {
          this.mToastSrv.toast('가입 요청 실패');
          return;
        }
        this.mToastSrv.toast('가입 요청 성공');
      }
    );
  }

  public isValidate(): boolean {
    return (
      this.form.id.length >= 4 &&
      this.form.id.length <= 20 &&
      this.form.pw.length >= 4 &&
      this.form.pw.length <= 20 &&
      this.form.nick.length > 0 &&
      this.form.nick.length <= 20 &&
      this.form.pw === this.form.pwConfirm
    );
  }

  public isToastListShow(): boolean {
    return this.mToastSrv.getToasts().length > 0;
  }
}

type JoinForm = {
  id: string;
  pw: string;
  pwConfirm: string;
  nick: string;
};
