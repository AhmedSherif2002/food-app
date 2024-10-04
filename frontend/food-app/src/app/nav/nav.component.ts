import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, HttpClientModule,NgStyle],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{

  userName = ""
  loginShow = "block"
  profileShow = "none";

  http = inject(HttpClient);

  changeSelector = (e:any)=>{
    const navElements = e.target.parentElement.parentElement;
    console.log(navElements.children)
    Array.from(navElements.children).forEach((element:any)=>element.classList.remove("selected"));
    e.target.parentElement.classList.add("selected")
    console.log(e.target.parentElement);
  }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
    this.http.get("http://localhost:3000/users/getUser", { headers }).subscribe({
      next: (data:any) => {
        console.log(data)
        if(data.status === "success"){
          this.userName = data.user.username;
          this.loginShow = "none";
          this.profileShow = "block";
        }
      },
      error: (err:any) => {
        console.log(err);
        console.log(err.error);
        if(err.error.status === "failed"){
          this.loginShow = "block";
          this.profileShow = "none";
        }
      }
    })
  }

}
