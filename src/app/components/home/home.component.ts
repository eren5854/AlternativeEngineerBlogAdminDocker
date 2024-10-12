import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpService } from '../../services/http.service';
import { UserModel } from '../../models/user.model';
import { BlogModel } from '../../models/blog.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  users: UserModel[] = [];
  blogs: BlogModel[] = [];
  topBlogs: BlogModel[] = [];

  maleCount = 0;
  femaleCount = 0;
  unknownCount = 0;

  adminCount = 0;
  authorCount = 0;
  userCount = 0;
  totalUser = 0;

  electronikCount = 0;
  designCount = 0
  softwareCount = 0;
  totalBlog = 0;

  gender?:any;
  role?:any;
  category?:any;

  constructor(
    private http: HttpService
  ){}
  ngAfterViewInit() {
    this.getAllUser();
    this.getAllBlog();
  }

  getAllUser(){
    this.http.get("User/GetAllUser", (res) => {
      this.users = res.data;
      // console.log(this.users);
      for(let i = 0; i<this.users.length; i++){
        if(this.users[i].gender === 0){
          this.maleCount++;
        }
        if(this.users[i].gender === 1){
          this.femaleCount++;
        }
        if(this.users[i].gender === 2){
          this.unknownCount++;
        }

        if (this.users[i].role.name === "Admin") {
          this.adminCount++;
        }
        if (this.users[i].role.name === "Author") {
          this.authorCount++;
        }
        if (this.users[i].role.name === "User") {
          this.userCount++;
        }
      }

      this.role = [this.adminCount, this.authorCount, this.userCount];
      this.totalUser = this.users.length;

      this.gender = [this.maleCount, this.femaleCount, this.unknownCount];

      this.userChart(this.role);
      this.genderChart(this.gender);
    })
  }

  getAllBlog(){
    this.http.get("Blogs/GetAllBlog", (res) => {
      this.blogs = res.data
      for (let i = 0; i < this.blogs.length; i++) {
        if (this.blogs[i].category.name === "Elektronik") {
          this.electronikCount++;
        }
        if (this.blogs[i].category.name === "Tasarım") {
          this.designCount++;
        }
        if (this.blogs[i].category.name === "Yazılım") {
          this.softwareCount++;
        }
      }
      this.totalBlog = this.blogs.length;
      this.category = [this.electronikCount, this.designCount, this.softwareCount];
      this.categoryChart(this.category);

      this.topBlogs = this.blogs
      .sort((a, b) => b.viewCount! - a.viewCount!)
      .slice(0, 5);
      
    });
  }

  genderChart(gender:any){
    const genderChart = document.getElementById('genderChart') as HTMLCanvasElement;
    new Chart(genderChart, {
      type: 'doughnut',
      data: {
        labels: ['Erkek', 'Kadın', 'Bilinmeyen'],
        datasets: [{
          label: '# of Votes',
          data: gender,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  userChart(role:any) {
    const ctx = document.getElementById('roleChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Admin', 'Yazar', 'Üye'],
        datasets: [{
          label: '# of Votes',
          data: role,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  categoryChart(category:any){
    const categoryChart = document.getElementById('categoryChart') as HTMLCanvasElement;

    new Chart(categoryChart, {
      type: 'doughnut',
      data: {
        labels: ['Elekt.', 'Tasa.', 'Yazıl.'],
        datasets: [{
          label: '# of Votes',
          data: category,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
}
