import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from '../../core/services/localstorage.service';
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
export class NavbarComponent implements OnInit {
  estaEnSesion = false;
  panelOpenState = false;

  user: any;
  userData: any;

  constructor( private router: Router,
    // private _cookieService: CookieService,
    // private alertaService: AlertaService,
    // private loginService: LoginService
    private _localStorageService: LocalStorageService,

  ) { }

  ngOnInit(): void {
    this.user = this._localStorageService.getItem('user');
    //this.userData = this._localStorageService.getItem('x-access');

    console.log(this.user);
    console.log(this.userData);

    if(this.user){
      this.estaEnSesion = true;
      if(this.user === "comunicaciones@idn.com"){
        console.log("Es super usuario!");
      }
    }
  }


goToLogin() {
  this.router.navigate(['/auth']);
}

cerrarSesion(){
  this._localStorageService.removeItem('user');
  this.estaEnSesion = false;
  // this._cookieService.delete('tokenidn');
  // this._cookieService.delete('user');
  // this.alertaService.mostrarLoading('cerrando sesión')
  // setTimeout(() => {
  // this.router.navigateByUrl('/auth');
  // }, 2000);
}
}

