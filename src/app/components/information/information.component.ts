import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InformationModel } from '../../models/information.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
  informationModel: InformationModel = new InformationModel();

  constructor(
    private http: HttpService
  ){
    this.getAllInformation();
  }

  getAllInformation(){
    this.http.get("Informations/GetInformation", (res) => {
      this.informationModel = res.data[0];
    });
  }

  updateInformation(form: NgForm){
    if (form.valid) {
      this.http.post("Informations/UpdateInformation", this.informationModel, (res) => {
        this.getAllInformation();
      })
    }
  }
}
