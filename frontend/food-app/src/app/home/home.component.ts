import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { OurmenuComponent } from '../ourmenu/ourmenu.component';
import { AboutSectionComponent } from '../about-section/about-section.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, OurmenuComponent, AboutSectionComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
