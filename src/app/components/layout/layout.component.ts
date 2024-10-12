import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessageModel } from '../../models/message.model';
import { DatabaseInfoModel } from '../../models/database-info.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild('sideMenu') sideMenu: ElementRef | undefined;
  userModel: UserModel = new UserModel();
  dbInfoModel: DatabaseInfoModel = new DatabaseInfoModel();

  messages: MessageModel[] = [];

  messageCount: number = 0;

  userId: string = "";
  isDarkTheme = false;
  isSideBarOpen = false;
  fileSize = 0;
  fileSizeInMB: any;

  constructor(
    private renderer: Renderer2,
    private http: HttpService,
    public auth: AuthService,
  ) {
    this.getAllMessage();
    this.getDatabaseSize();
    this.getFileSize();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme-variables');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme-variables');
    }
  }

  toggleSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
    const sideMenuElement = this.sideMenu?.nativeElement as HTMLElement;

    if (this.isSideBarOpen) {
      sideMenuElement.style.display = 'block';
    } else {
      sideMenuElement.style.display = 'none';
    }
  }

  getAllMessage(){
    this.http.get("Contacts/GetAllContact", (res) => {
      let unreadMessages = res.data.filter((message: MessageModel) => !message.isRead);
      this.messageCount = unreadMessages.length;
      if (unreadMessages.length === 0) {
        this.messages = res.data.filter((message: MessageModel) => message.isRead).slice(0, 4);
      } else {
        this.messages = unreadMessages.slice(0, 4);
      }
    });
  }
  
  getDatabaseSize(){
    this.http.get("Sizes/GetDatabaseInfo", (res) => {
      this.dbInfoModel = res.data[0];
    });
  }

  getFileSize() {
    this.http.get("Sizes/GetTotalFileSize", (res) => {
      this.fileSize = res.data;
      this.fileSizeInMB = (this.fileSize / (1024 * 1024)).toFixed(2); // MB'ye çevir ve 2 ondalık basamağa yuvarla
    });
  }

  logout() {
    localStorage.clear();
  }
}
