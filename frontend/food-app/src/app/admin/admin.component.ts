import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgStyle,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  show = "none"
  error = "";
  successMsg = "none"

  products:any = []

  http = inject(HttpClient);
  router = inject(Router);

  addProduct(e:any): void {
    this.error = ""
    e.preventDefault();
    console.log(e.target);
    const form:any = new FormData(e.target);
    const data = Object.fromEntries(form);
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.post("http://localhost:3000/products/addProduct",data, {headers}).subscribe((response:any)=>{
      console.log(response);
      if(response.status === "success"){
        this.successMsg = "block";
        this.fetchProducts();
      }
    },err=>{
      console.log(err);
      this.error = err.error.data;
    })

  }

  showAddProduct(e:any): void {
    console.log(e.target);
    this.show = "block";
  }

  abortAdding(e:any): void {
    console.log(e.target);
    this.show = "none";
  }

  fetchProducts(): void {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.get("http://localhost:3000/products/getProducts",{ headers }).subscribe((response:any)=>{
      console.log(response.products);
      this.products = response.products;
      console.log(this.products[0].title);
    })
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

}
