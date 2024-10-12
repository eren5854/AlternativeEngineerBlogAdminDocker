import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { BlogModel } from '../../models/blog.model';
import { RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogs: BlogModel[] = [];

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){
    this.getAllBlog();
  }

  getAllBlog(){
    this.http.get("Blogs/GetAllBlog", (res) => {
      this.blogs = res.data;      
    })
  }
}
