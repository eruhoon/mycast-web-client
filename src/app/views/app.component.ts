import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mycast-web-client';

  readonly VAPID_PUBLIC_KEY = 'BLjdihR3YREJZKH33geqT-5bZPe7Jxkq4QDSqfXq8QdRDqLnlmFpcyYCJrNuWrmIaOs0OxZdXBe7OnRjeffKq1w';

  constructor(private mSwPush: SwPush) {
    this.subscribeToPush();
  }

  private async subscribeToPush() {
    try {
      const sub = await this.mSwPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      });
      // TODO: Send to server.
    } catch (err) {
      console.error('Could not subscribe due to:', err);
    }

    this.mSwPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('notification click', window);
      window.focus();
    });
  }
}
