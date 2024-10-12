import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { SwalService } from './swal.service';
import { HttpService } from './http.service';
import { EmailJsParameterModel } from '../models/emailJs-parameter.model';

@Injectable({
  providedIn: 'root'
})
export class EmailJsService {
  emailJsParameters: EmailJsParameterModel[] = [];

  constructor(
    private http: HttpService,
    private swal: SwalService
  ) 
  {
    this.getEmailJsParameter();
  }

  getEmailJsParameter(){
    this.http.get("EmailJsParameters/GetAllEmailJsParameter", (res) => {
      this.emailJsParameters = res.data;
      console.log(this.emailJsParameters);
    });
  }

  sendEmail(form: any) {
    return emailjs
    .send(this.emailJsParameters[0].serviceId, this.emailJsParameters[0].templateId, form, {
      publicKey: this.emailJsParameters[0].publicKey,
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.swal.callToast("Mail gönderildi", 'success');
      },
      (err) => {
        console.log('FAILED...', err.text);
        this.swal.callToast(err.text, 'error');
      },
    );
  }
}
