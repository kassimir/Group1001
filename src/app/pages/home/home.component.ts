import {Component, OnInit, ViewChild, ElementRef, DestroyRef, inject} from '@angular/core';
import { Theme, ThemeService } from '../../components/theme/theme.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

type BackgroundVideo = 'vader' | 'tiefighter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);

  @ViewChild('video', { static: false })
  set video(val: ElementRef<HTMLVideoElement>) {
    this._video = val;
    this.loadVideoSource();
  }
  get video(): ElementRef<HTMLVideoElement> {
    return this._video;
  }
  private _video: ElementRef<HTMLVideoElement>;

  protected set videoSrc(val: BackgroundVideo) {
    if (val === this._videoSrc) return;

    this._videoSrc = val;

    // Due to the nature of how Angular finds elements, this loads before the video element,
    // which would cause an error. That's why I have the loadVideoSource() in the setter
    // for the video element as well as here
    if (this.video) {
      this.loadVideoSource();
    }
  }
  protected get videoSrc(): BackgroundVideo {
    return this._videoSrc;
  }
  private _videoSrc: BackgroundVideo = 'vader';

  protected isPaused: boolean = false;

  protected toggleVideo(): void {
    if (this.isPaused) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
    this.isPaused = !this.isPaused;
  }

  ngOnInit(): void {
    ThemeService.theme
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme: Theme) => {
        this.videoSrc = theme === 'dark' ? 'vader' : 'tiefighter';
      });
  }

  private loadVideoSource(): void {
    this.video.nativeElement.load();
  }
}
