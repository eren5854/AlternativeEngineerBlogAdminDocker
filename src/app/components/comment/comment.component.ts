import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentModel } from '../../models/comment.model';
import { RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  comments: CommentModel[] = [];
  commentCount = 0;

  constructor(
    private http: HttpService,
    private swal: SwalService,
  ) {
    this.getAllComment();
  }

  getAllComment() {
    this.http.get("Comments/GetAllComment", (res) => {
      this.comments = res.data;
      this.commentCount = this.comments.length;
    })
  }

  deleteCommentById(id: string, appUserId: string, blogId: string) {
    this.swal.callToastWithButton(`Seçilen yorum silinsin mi?`, 'Yes!', () => {
      this.http.post("Comments/DeleteCommentById", { id: id, appUserId: appUserId, blogId: blogId }, (res) => {
        this.getAllComment();
      });
    });
  }
}
