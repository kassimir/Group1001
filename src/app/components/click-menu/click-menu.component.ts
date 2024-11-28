import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Observable } from 'rxjs';

type MenuStyle = {
  top: string;
  left: string;
};

type MenuItem = {
  text: string;
  route: string;
}

@Component({
  selector: 'app-click-menu',
  imports: [ NgStyle ],
  templateUrl: './click-menu.component.html',
  styleUrl: './click-menu.component.scss'
})
export class ClickMenuComponent implements OnInit {
  private router: Router = inject(Router);
  private routeSub: Observable<Event> = this.router.events;

  // Sets initial click information, because the nav menu isn't necessarily intuitive... just fun
  protected initClick: boolean = false;
  protected menuVisible: boolean = false;
  protected menuStyle: MenuStyle = {top: '0', left: '0'};
  protected menuItems: MenuItem[] = [];

  private aboutMenuItem = { text: 'About', route: 'about' };
  private shipsMenuItem = { text: 'Ships', route: 'ships' };
  private homeMenuItem = { text: 'Home', route: '' };

  private excludedClass = new Set([
    'container',
    'play',
    'pause',
    'blurb'
  ]);

  @HostListener('document:mouseup', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target: HTMLDivElement | HTMLVideoElement = event.target as HTMLVideoElement | HTMLDivElement;
    // Excludes clicking on the elements of the pages, because that's really annoying
    if (
      [ ...target.classList ].some(cls =>
        cls.includes('mat-')
        || cls.includes('mdc-')
        || this.excludedClass.has(cls))
      || target.nodeName === 'MAT-LABEL'
    ) {
      this.menuVisible = false;
      return;
    }
    if (!this.initClick) this.initClick = true;

    this.menuVisible = !this.menuVisible;
    // Position menus around mouse
    if (this.menuVisible) {
      this.menuStyle = {
        top: `${event.clientY - 100}px`,
        left: `${event.clientX - 100}px`
      };
    }
  }

  ngOnInit(): void {
    // Watch the route to update the menu options
    this.routeSub.subscribe(() => {
      this.updateMenuItems(this.router.url);
    });
    this.updateMenuItems(this.router.url);
  }

  protected navigate(route: string): void {
    this.router.navigate([route]);
  }

  // Fun with ternaries
  private updateMenuItems(currentUrl: string): void {
    this.menuItems = currentUrl.includes('about')
      ? [this.homeMenuItem, this.shipsMenuItem]
      : currentUrl.includes('ships')
      ? [this.aboutMenuItem, this.homeMenuItem]
      : [this.aboutMenuItem, this.shipsMenuItem];
  }
}
