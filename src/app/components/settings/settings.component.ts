import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { ChangePasswordModel } from '../../models/change-password.model';
import { EmailJsParameterModel } from '../../models/emailJs-parameter.model';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  userModel: UserModel = new UserModel();
  changePasswordModel: ChangePasswordModel = new ChangePasswordModel();
  emailJsModel: EmailJsParameterModel = new EmailJsParameterModel();
  emailJsParameters: EmailJsParameterModel[] = [];

  isShowPassword: boolean = false;
  isPasswordFocus: boolean = false;

  addCardDiv = false;

  constructor(
    private http: HttpService,
    public auth: AuthService,
    private swal: SwalService
  ) {
    this.getUserById(auth.user.id);
    this.getEmailJsParameter();
  }

  getUserById(id: any) {
    this.http.get(`User/GetUserById?Id=${id}`, (res) => {
      this.userModel = res.data;
    })
  }

  updateUser(form: NgForm) {
    const formData: FormData = new FormData();
    if (form.valid) {
      formData.append("id", this.userModel.id!);
      formData.append("firstName", this.userModel.firstName!);
      formData.append("lastName", this.userModel.lastName!);
      formData.append("userName", this.userModel.userName!);
      this.http.post("User/UpdateUser", formData, (res) => {
        this.getUserById(this.userModel.id);
      })
    }
  }

  getEmailJsParameter() {
    this.http.get("EmailJsParameters/GetAllEmailJsParameter", (res) => {
      this.emailJsParameters = res.data;
    });
  }

  creteEmailJsParameter(form: NgForm) {
    if (form.valid) {
      this.http.post("EmailJsParameters/CreateEmailJsParameter", this.emailJsModel, (res) => {
        this.getEmailJsParameter();
      })
    }
  }

  updateEmailJsParameter(form: NgForm, emailjs: EmailJsParameterModel) {
    this.http.post("EmailJsParameters/UpdateEmailJsParameter", emailjs, (res) => {
      this.getEmailJsParameter();
    });
  }

  deleteEmailJsParameterById(id: string) {
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`EmailJsParameters/DeleteEmailJsParameterById?Id=${id}`, (res) => {
        this.getEmailJsParameter();
      });
    });
  }

  changePassword(form: NgForm) {
    this.changePasswordModel.id = this.userModel.id!;
    if (form.valid) {
      this.http.post("Auth/ChangePassword", this.changePasswordModel, (res) => {
        location.reload();
      })
    }
  }

  showOrHidePassword(password: HTMLInputElement) {
    if (this.isShowPassword) {
      this.isShowPassword = false;
      password.type = "password";
    }
    else {
      this.isShowPassword = true;
      password.type = "text";
    }
  }

  checkRegexPatternForPassword(el: HTMLInputElement) {
    const text = el.value;

    const upperCaseRegex = /[A-Z]/;
    const upperCaseResult = upperCaseRegex.test(text);
    const upperLetterEl = document.getElementById("upperLetter");
    upperLetterEl?.classList.add(upperCaseResult ? 'pw-succes' : 'pw-error');
    upperLetterEl?.classList.remove(!upperCaseResult ? 'pw-succes' : 'pw-error');

    const lowerCaseRegex = /[a-z]/;
    const lowerCaseResult = lowerCaseRegex.test(text);
    const lowerLetterEl = document.getElementById("lowerLetter");
    lowerLetterEl?.classList.add(lowerCaseResult ? 'pw-succes' : 'pw-error');
    lowerLetterEl?.classList.remove(!lowerCaseResult ? 'pw-succes' : 'pw-error');

    const specialCaseRegex = /[!@#$%^&*()_+\[\]{};:'\\|,.<>\/?]/;
    const specialCaseResult = specialCaseRegex.test(text);
    const specialLetterEl = document.getElementById("specialLetter");
    specialLetterEl?.classList.add(specialCaseResult ? 'pw-succes' : 'pw-error');
    specialLetterEl?.classList.remove(!specialCaseResult ? 'pw-succes' : 'pw-error');

    const numCaseRegex = /[0-9]/;
    const numCaseResult = numCaseRegex.test(text);
    const numLetterEl = document.getElementById("numLetter");
    numLetterEl?.classList.add(numCaseResult ? 'pw-succes' : 'pw-error');
    numLetterEl?.classList.remove(!numCaseResult ? 'pw-succes' : 'pw-error');

    const minCharacterEl = document.getElementById("minCharacter");
    if (text.length < 8) {
      minCharacterEl?.classList.add("pw-error");
      minCharacterEl?.classList.remove("pw-succes");
    }
    else {
      minCharacterEl?.classList.add("pw-succes");
      minCharacterEl?.classList.remove("pw-error");
    }
  }

  addCard() {
    this.addCardDiv = !this.addCardDiv;
  }
}
