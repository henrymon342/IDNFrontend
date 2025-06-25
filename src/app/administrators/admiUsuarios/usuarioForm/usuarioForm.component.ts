import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../user.service";
import { IDNConstants } from "../../../shared/constants";
import { Usuario } from "../Usuario";

@Component({
  selector: 'app-iglesia-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule],
  templateUrl: './usuarioForm.component.html',
  styleUrl: './usuarioForm.component.scss'
})
export class UsuarioFormComponent implements OnInit {

  private _usuarioId?: number;

  @Input() drawer:MatDrawer;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Input()
  set usuarioId(value: number | undefined) {
    this._usuarioId = value;
    console.log(this.form);
    this.createForm();
    if (value !== undefined) {
      this.title = "Modificar";
      this.getUser();
    }else{
      this.title = "Adicionar";
    }
  }

  get usuarioId(): number | undefined {
    return this._usuarioId;
  }

  public title: string;
  public form!: FormGroup;
  public readonly TYPEUSERS: string[] = ['ACTIVIDADES', 'PASTORES', 'IGLESIAS', 'SUPER'];
  public readonly MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  public readonly PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];
  public readonly IGLESIAS: string[] = IDNConstants.IGLESIAS;
  public user: Usuario;

  public hide = true;

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private _toastService:ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  private createForm(): void{
    this.form = this.fb.group({
      type: ['ACTIVIDADES', [Validators.required]],
      ministerio: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      option_places_memb: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
      miembroen: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],

    })
  }

  async onSubmit() {
    //
    if (this.form.valid){
      if(this.form.value.type != 'ACTIVIDADES'){
        this.form.controls['ministerio'].setValue('');
      }

      if(this.title === 'Adicionar'){
        // ADICIONAR USUARIO
        this._userService.createUser(this.form.value).subscribe(res => {
          this.closeSidenav(true);
          console.log(res);
        });
      }else{
        // MODIFICAR USUARIO
        this._userService.update(this.user.id, this.form.value).subscribe(res => {
          this.closeSidenav(true);
          console.log(res);
        });
      }
    }
  }

  private limpiarForm(){
    this.createForm();
  }

  private getUser() {
    this._userService.get(this._usuarioId!).subscribe(res => {
      console.log(res);
      this.user = res.data;

      this.form.controls['type'].setValue(this.user.type);
      this.form.controls['ministerio'].setValue(this.user.ministerio);
      this.form.controls['name'].setValue(this.user.name);
      this.form.controls['lastname'].setValue(this.user.lastname);
      this.form.controls['cargo'].setValue(this.user.cargo);
      this.form.controls['miembroen'].setValue(this.user.miembroen);
      this.form.controls['username'].setValue(this.user.username);
      this.form.controls['password'].setValue(this.user.password);
      this.form.controls['password_confirm'].setValue(this.user.password);
    });
  }

  async closeSidenav(isTransaction:boolean = false){
    this.drawer.close();
    this.limpiarForm();
    this.closeDrawer.emit(isTransaction);
  }
}
