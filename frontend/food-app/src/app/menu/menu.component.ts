import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { OurmenuSectionComponent } from "../ourmenu-section/ourmenu-section.component";
import { AppsComponent } from "../apps/apps.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FooterComponent, OurmenuSectionComponent, AppsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
