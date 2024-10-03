import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-ourmenu-section',
  standalone: true,
  imports: [MenuComponent, FooterComponent],
  templateUrl: './ourmenu-section.component.html',
  styleUrl: './ourmenu-section.component.css'
})
export class OurmenuSectionComponent {

}
