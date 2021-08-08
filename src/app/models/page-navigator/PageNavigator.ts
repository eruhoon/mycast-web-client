import { Router } from '@angular/router';

export class PageNavigator {
  #router: Router;

  constructor(router: Router) {
    this.#router = router;
  }

  navigate(path: string | null) {
    if (!path) {
      this.navigateMainPage();
      return;
    }
    this.#router.navigate([path]);
  }

  navigateMainPage() {
    this.#router.navigate(['/']);
  }

  navigateJoinPage() {
    this.#router.navigate(['/join']);
  }
}
