import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Theme, ThemeService } from './theme.service';

@Component({
  selector: 'app-theme',
  imports: [ FormsModule, MatButtonToggleGroup, MatButtonToggle ],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  protected set themeSelection(val: Theme) {
    this._themeSelection = val;
    ThemeService.theme.next(val);
  }
  protected get themeSelection(): Theme {
    return this._themeSelection;
  }
  private _themeSelection: Theme = 'dark';
}
