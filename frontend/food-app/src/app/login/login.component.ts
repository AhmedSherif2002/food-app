import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  error = ""
  
  http = inject(HttpClient);

  router = inject(Router);

  login(e:any): void {
    e.preventDefault();
    console.log(e.target);
    const form:any = new FormData(e.target);
    const data:any = Object.fromEntries(form);
    if(data.email === "" || data.password === ""){
      this.error = "email or password can't be empty";
      return;
    }
    this.http.post("http://localhost:3000/users/login",data).subscribe((response:any)=>{
      console.log(response);
      if(response.status === "success"){
        localStorage.setItem("token",response.token);
        this.router.navigate(["/"]);
      }
    },err=>{
      if(err.error.data){
        console.log(err.error.data)
        this.error = "Invalid email or password";
      }else{
        this.error = "Error";
      }
    })
  }
}
