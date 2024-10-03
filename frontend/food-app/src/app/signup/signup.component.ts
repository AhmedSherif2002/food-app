import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs';
import {Router, RouterLink} from "@angular/router"


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  error = '';

  http = inject(HttpClient);
  router = inject(Router);

  signup(e:any): void {
    e.preventDefault();
    console.log(e.target);
    const form:any = new FormData(e.target);
    const data = Object.fromEntries(form);
    console.log(data)
    this.http.post("http://localhost:3000/users/signup",data).subscribe((response:any)=>{
      console.log(response);
      console.log(response.status);
      if(response.status === "success"){
        localStorage.setItem("token",response.token);
        this.router.navigate(["/"])
      }
    },err=>{
      if(err.error.data.errors.length !== 0){
        console.log(err.error.data.errors)
        this.error = err.error.data.errors[0].msg
      }
    })
  }
}
