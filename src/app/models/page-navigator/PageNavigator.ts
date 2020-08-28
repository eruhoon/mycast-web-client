import { Router } from '@angular/router';

export class PageNavigator {
  private mRouter: Router;

  public constructor(router: Router) {
    this.mRouter = router;
  }

  public navigate(path: string | null) {
    if (!path) {
      this.navigateMainPage();
      return;
    }
    this.mRouter.navigate([path]);
  }

  public navigateMainPage() {
    this.mRouter.navigate(['/']);
  }

  public navigateJoinPage() {
    this.mRouter.navigate(['/join']);
  }
}
