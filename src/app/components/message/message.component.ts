import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  messages: MessageModel[] = [];

  showModal: boolean = false;
  selectedMessage: MessageModel | null = null;

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){
    this.getAllMessage();
  }

  getAllMessage(){
    this.http.get("Contacts/GetAllContact", (res) => {
      this.messages = res.data;      
    })
  }

  updateMessage(id: string){
    this.http.get(`Contacts/Update?Id=${id}`, (res) => {
      this.getAllMessage();
    })
  }

  deleteMessageById(id: string, subject: string){
    this.swal.callToastWithButton(`${subject} konulu mesaj silinsin mi?`, 'Yes!', () => {
      this.http.get(`Contacts/DeleteContactById?Id=${id}`, (res) => {
        this.getAllMessage();
      });
    });
  }

  openModal(item: MessageModel) {
    this.selectedMessage = item;
    this.showModal = true;
    this.updateMessage(item.id!);
  }

  closeModal() {
    this.showModal = false;
    this.selectedMessage = null;
  }
}
