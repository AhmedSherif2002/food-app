import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  changeSelector = (e:any)=>{
    const navElements = e.target.parentElement.parentElement;
    console.log(navElements.children)
    Array.from(navElements.children).forEach((element:any)=>element.classList.remove("selected"));
    e.target.parentElement.classList.add("selected")
    console.log(e.target.parentElement);
  }
}
