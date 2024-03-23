import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent {
  constructor(private cookie: CookieService, private router: Router) { }

  handleLogout(): void {
    this.cookie.delete(environment.AUTH_TOKEN);
    void this.router.navigate(['/login']);
  }
}
