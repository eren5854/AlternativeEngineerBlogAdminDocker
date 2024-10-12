import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoryModel: CategoryModel = new CategoryModel();
  categories: CategoryModel[] = [];

  addCardDiv = false;

  constructor(
    private http: HttpService,
    private swal: SwalService
  ){
    this.getAllCategory();
  }

  getAllCategory(){
    this.http.get("Categories/GetAllCategory", (res) => {
      this.categories = res.data;
      
    });
  }

  createCategory(form:NgForm){
    if (form.valid) {
      this.http.post("Categories/CreateCategory", this.categoryModel, (res) => {
        this.getAllCategory();
        this.addCard();
      })
    }
  }

  updateCategory(form: NgForm, category: CategoryModel){
    if(form.valid){
      this.http.post("Categories/UpdateCategory", category, (res) => {
        this.getAllCategory();
        
      })
    }
  }

  deleteCategoryById(id: string){
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`Categories/DeleteCategoryById?Id=${id}`, (res) => {
        this.getAllCategory();
      });
    });
  }

  addCard() {
    this.addCardDiv = !this.addCardDiv;
  }
}
