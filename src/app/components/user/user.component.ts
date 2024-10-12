import { Component } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users: UserModel[] = [];
  userModel: UserModel = new UserModel();

  showModal: boolean = false;
  selectedUser: UserModel | null = null;
  value = 0;

  constructor(
    private http: HttpService,
    public auth: AuthService,
    private swal: SwalService
  ) {
    this.getAllUser();
  }

  getAllUser() {
    this.http.get("User/GetAllUser", (res) => {
      this.users = res.data
        .filter((user: UserModel) => user.id !== this.auth.user.id)
        .sort((a: UserModel, b: UserModel) => this.getRolePriority(a.role.name) - this.getRolePriority(b.role.name));
    });
  }

  changeUserRole(id: string, role: string) {
    if (role === "Author") {
      this.value = 2;
    }
    if (role === "User") {
      this.value = 3;
    }
    this.swal.callToastWithButton(`Kullanıcının rolü ${role} olarak değiştirilsin mi?`, 'Yes!', () => {
      this.http.post("User/SetAuthorRoleForUsers", { id: id, role: { "name": role, "value": this.value } }, (res) => {
        this.getAllUser();
        this.closeModal();
      });
    });
  }

  deleteUserById(id: string, name:string) {
    this.swal.callToastWithButton(`${name} adlı kullanıcı silinsin mi?`, 'Yes!', () => {
      this.http.get(`User/DeleteUserById?Id=${id}`, (res) => {
        this.getAllUser();
      });
    });
  }

  openModal(item: UserModel) {
    this.selectedUser = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
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

  getRolePriority(roleName: string): number {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return 1; // Admin en yüksek öncelik
      case 'author':
        return 2; // Author orta öncelik
      case 'user':
        return 3; // User en düşük öncelik
      default:
        return 4; // Eğer başka bir rol varsa, en düşük önceliğe sahip olsun
    }
  }
}
