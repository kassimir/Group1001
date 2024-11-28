import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from './components/theme/theme.component';
import { ClickMenuComponent } from './components/click-menu/click-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeComponent, ClickMenuComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
