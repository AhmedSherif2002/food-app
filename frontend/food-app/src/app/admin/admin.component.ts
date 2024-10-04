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
  bgShow = "none"
  addShow = "none"
  deletePromptShow = "none"
  show = "none"
  error = "";
  successMsg = "none"
  productName = ""
  productId = ""

  modifyShow = "none"
  modifyError = ""
  modifySuccessMsg = "none"

  product = {
    id:"",
    title:"",
    price:"",
    description:"",
  };

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
        this.error = "";
        this.fetchProducts();
      }
    },err=>{
      console.log(err);
      this.error = err.error.data;
      this.successMsg = "none"
    })

  }

  showAddProduct(e:any): void {
    console.log(e.target);
    this.bgShow = "block";
    this.addShow = "flex";
  }

  abortAdding(e:any): void {
    console.log(e.target);
    this.bgShow = "none";
    this.addShow = "none";
    this.modifyShow = "none";
    this.deletePromptShow = "none";
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
    })
  }
  
  ngOnInit(): void {
    this.fetchProducts();
  }

  showDeletePrompt(id:any, name:any): void {
    console.log(id, name);
    this.productName = name;
    this.productId = id;
    this.bgShow = "block";
    this.deletePromptShow = "flex";
  }

  // abortDeleting(): void {
  //   this.bgShow = "none";
  //   this.deletePromptShow = "none";
  // }

  deleteProduct(): void {
    // console.log(id);
    // const id = this.productId
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.delete(`http://localhost:3000/products/deleteProduct/${this.productId}`, {headers}).subscribe({
      next: (response: any) => {
        console.log(response.status);
        if(response.status === "success"){
          this.fetchProducts();
          this.bgShow = "none";
          this.deletePromptShow = "none";
          this.productId = ""
        }
      }
    })
  }

  modifyProduct(product: any): void {
    this.bgShow = "block";
    this.modifyShow = "flex";
    this.product.id = product._id;
    this.product.title = product.title;
    this.product.description = product.description;
    this.product.price = product.price;
    
    
    console.log(product);

  }

  updateProduct(e:any): void {
    e.preventDefault(); 
    const id = this.product.id;
    console.log(this.product);
    const form:any = new FormData(e.target);
    const product = Object.fromEntries(form);
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.put(`http://localhost:3000/products/updateProduct/${id}`, product, { headers }).subscribe((response:any)=>{
      console.log(response);
      if(response.status === "success"){
        this.modifySuccessMsg = "block";
        this.modifyError = ""
        this.fetchProducts();
      }
    },err=>{
      console.log(err);
      this.modifyError = err.error.data;
      this.modifySuccessMsg = "none"
    })
  }

}
