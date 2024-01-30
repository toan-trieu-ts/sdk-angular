import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  TVInstance: TVWebSDKInstance | null = null;

  livenessMode = 'active';

  onChangeLivenessMode(event: Event) {
    this.livenessMode = (event.target as HTMLSelectElement).value;
  }

  onStartReadIDCard() {
    if (!this.TVInstance) return;
    this.TVInstance.readIDCardUIOnly();
  }

  onLivenessDetection() {
    if (!this.TVInstance) return;
    this.TVInstance.livenessDetection({
      mode: this.livenessMode,
    });
  }
  
  ngOnInit(): void {
    if (!window.TVWebSDK) return;
    this.TVInstance = new window.TVWebSDK.SDK({
      container: document.getElementById('container'),
      lang: 'vi',
      assetRoot: 'https://unpkg.com/@tsocial/tvweb-sdk@5.17.0/assets',
      enableAntiDebug: false,
    });

    if (!this.TVInstance) return;
    this.TVInstance.runPreloadEKYCResources();
  }
}
