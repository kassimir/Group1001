import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public static theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('dark');
}
