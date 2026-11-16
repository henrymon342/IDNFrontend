import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginForm } from '../Models/loginForm';
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/services/toast.service';
import { LocalStorageService } from '../../core/services/localstorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hide = true;
  public form: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private _authService: AuthService,
    private _toastService: ToastService,
    private _localStorageService: LocalStorageService
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

login(): void {
    const credentials: LoginForm = this.form.value;
    this._authService.login(credentials).subscribe({
      next: (res) => {
        console.log(res.error);
        if( !res.success ){
          this._toastService.error(res.error.data.message);
        }else{
          if( res.data.token ){
            const username = res.data.username
            this._localStorageService.setItem('user', username);
            this._localStorageService.setItem('x-access', res.data.admin);
            this._toastService.success('Bienvenido usted es administrador administrador')
            // this._localStorageService.setItem('token-idn', res.data.token);
            if( username === 'henrymc' && res.data.type == "PASTORES"){
              this.router.navigate(['/auth/administrador']);
              return;
            }
            if(res.data.admin == true){
              this.router.navigate(['/auth/administrador']);
              return;
            }
            if( res.data.type == 'ACTIVIDADES' ){
              this._toastService.success('Bienvenido al administrador de actividades')
              this.router.navigate(['auth/admieventos']);
            }
            if(res.data.type == 'PASTORES' ){
              this._toastService.success('Bienvenido al administrador de pastores')
              this.router.navigate(['auth/admipastores']);
            }
          }else{
            this._toastService.error('Error 403 No autorizado')
          }
        }
      },
      error: (err) => {
        console.log(err.error);
        this._toastService.error(
          err.error?.data?.message || err.error?.message || err.message
        );
      }
    });
  }

  gotohome(){
    this.router.navigate(['/home']);
  }
}
