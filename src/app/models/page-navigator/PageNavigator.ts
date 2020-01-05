import { Router } from '@angular/router';

export class PageNavigator {

    private mRouter: Router;

    public constructor(router: Router) {
        this.mRouter = router;
    }

    public navigateMainPage() {
        this.mRouter.navigate(['/']);
    }

    public navigateJoinPage() {
        this.mRouter.navigate(['/join']);
    }
}
