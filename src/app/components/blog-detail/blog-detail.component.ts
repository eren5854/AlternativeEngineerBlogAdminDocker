import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../../models/blog.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  blogModel: BlogModel = new BlogModel();
  id?: string;

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
    });
    this.getBlogById(this.id!);
  }

  getBlogById(id: string) {
    this.http.get(`Blogs/GetBlogById?Id=${id}`, (res) => {
      this.blogModel = res.data;
    });
  }
}
