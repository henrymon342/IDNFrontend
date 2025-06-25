import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatButtonModule
    ]
})
export class NavbarComponent {
  estaEnSesion = false;
  panelOpenState = false;

  constructor( private router: Router,
    // private _cookieService: CookieService,
    // private alertaService: AlertaService,
    // private loginService: LoginService
  ) { }


goToLogin() {
  this.router.navigate(['/auth']);
}

cerrarSesion(){
  // this._cookieService.delete('tokenidn');
  // this._cookieService.delete('user');
  // this.alertaService.mostrarLoading('cerrando sesión')
  // setTimeout(() => {
  // this.router.navigateByUrl('/auth');
  // }, 2000);
}
}

