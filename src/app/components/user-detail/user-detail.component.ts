import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogModel } from '../../models/blog.model';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  userModel: UserModel = new UserModel();
  blogs: BlogModel[] = [];
  id?: string;

  imageUrl: string = "";

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
    private swal: SwalService,
    private router: Router
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    this.getUserById(this.id!);
    this.getBlogByAuthorId(this.id!);
    this.imageUrl = this.http.getImageUrl();
  }

  getUserById(id:string){
    this.http.get(`User/GetUserById?Id=${id}`, (res) => {
      this.userModel = res.data;
    });
  }

  getBlogByAuthorId(id: string){
    this.http.get(`Blogs/GetBlogByAuthorId?Id=${id}`, (res) => {
      this.blogs = res.data;
    });
  }

  deleteBlogById(id: string, appUserId: string, title:string){
    this.swal.callToastWithButton(`"${title}" adlı blog silinsin mi?`, 'Yes!', () => {
      this.http.get(`Blogs/DeleteBlogById?Id=${id}&appUserId=${appUserId}`, (res) => {
        this.getBlogByAuthorId(appUserId);
      });
    });
  }

  getGenderText(gender: number | undefined): string {
    switch (gender) {
      case 0:
        return 'Erkek';
      case 1:
        return 'Kadın';
      case 2:
        return 'Belirtilmemiş';
      default:
        return 'Belirtilmemiş';
    }
  }
}
