import { Component } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Theme, ThemeService } from '../../components/theme/theme.service';

@Component({
  selector: 'app-about-page',
  imports: [ NgClass, AsyncPipe ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  protected theme: BehaviorSubject<Theme> = ThemeService.theme;
}
