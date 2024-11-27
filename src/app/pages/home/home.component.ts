import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected isPaused: boolean = false;
  protected toggleVideo(video: HTMLVideoElement): void {
    if (this.isPaused) {
      video.play();
    } else {
      video.pause();
    }
    this.isPaused = !this.isPaused;
  }
}
