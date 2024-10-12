import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NewsletterModel } from '../../models/newsletter.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  newsletters: NewsletterModel[] = [];

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){
    this.getAllNewsletter();
  }

  getAllNewsletter(){
    this.http.get("Newsletters/GetAllNewsletter", (res) => {
      this.newsletters = res.data;      
    });
  }

  deleteNewsletter(id:string, email:string){
    this.swal.callToastWithButton(`${email} adresi silinsin mi?`, 'Yes!', () => {
      this.http.get(`Newsletters/DeleteNewsletterById?Id=${id}`, (res) => {
        this.getAllNewsletter();
      });
    });
  }

  updateNewsletter(newsletter:NewsletterModel){
    this.swal.callToastWithButton(`${newsletter.email} adresi e-bültenden çıkarılsın mı?`, 'Yes!', () => {
      newsletter.isActive = !newsletter.isActive;
      this.http.post("Newsletters/UpdateNewsletter", newsletter, (res) => {
        this.getAllNewsletter();
      });
    });
  }

}
