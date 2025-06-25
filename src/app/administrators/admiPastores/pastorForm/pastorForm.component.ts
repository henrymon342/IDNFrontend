import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import { IDNConstants } from "../../../shared/constants";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatListModule} from '@angular/material/list';
import { PastorService } from "../../../core/services/pastor.service";
import { Pastor } from "../../../core/models/pastor";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Iglesia } from '../../../core/models/iglesia';
import { ImageModel } from '../../../core/models/imagen';
import { ImagenService } from "../../../core/services/imagen.service";
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FamilyMember } from "../../../core/models/familyMember";

@Component({
  selector: 'app-iglesia-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule, MatTableModule],
  templateUrl: './pastorForm.component.html',
  styleUrl: './pastorForm.component.scss'
})
export class PastorFormComponent {
  private _pastorId?: number;

  @Input() drawer:MatDrawer;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Input()
  set pastorId(value: number | undefined) {
    this._pastorId = value;
    if (value !== undefined) {
      this.loadPastor(value);
      this.title = "Modificar";
    }else{
      this.title = "Adicionar";
    }
  }

  get pastorId(): number | undefined {
    return this._pastorId;
  }

  public title: string;
  public form!: FormGroup;
  public formFamily!: FormGroup;
  public readonly CATEGORIES: string[] = ['LOCAL', 'DISTRITAL', 'PRESBITERO'];
  public readonly STARTDATE = new Date(1990, 0, 1);
  public readonly ESTADO_CIVIL: string[] = ['SOLTERO', 'CASADO', 'VIUDO'];
  public readonly YEARS: string[] = IDNConstants.rangeYears();
  public readonly AREAS: any[] = IDNConstants.AREAS;

  public pastor: Pastor;

  files: File[] = [];
  file: File;
  public iglesia: Iglesia;
  public imagenIglesia: ImageModel = new ImageModel();

  displayedColumns: string[] = ['nro', 'name', 'age', 'health', 'observation' , 'actions'];
  dataSource = new MatTableDataSource<FamilyMember>();
  public familyList:FamilyMember[] = [];

  readonly _pastorService = inject(PastorService);
  readonly _imageService = inject(ImagenService);
  constructor(private fb: FormBuilder,
    private _toastService:ToastrService
  ) {
    this.createForms();
  }

  private createForms(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      fecha_nac: ['', [Validators.required]],
      lugar_nac: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      nombre_esposa: [''],
      fecha_nac_esposa: [''],
      lugar_nac_esposa: [''],
      // hijos: ['', [Validators.required]],
      category: ['LOCAL', [Validators.required]],
      year: ['', [Validators.required]],
      dado_en: ['', [Validators.required]],
      area: ['', [Validators.required]],
      membresia: ['', [Validators.required]],
      lugardeministerio: ['', [Validators.required]],
      titulos: [''],
      requisitos: [''],
      data_family: ['', [Validators.required]],
      educacion: [''],
      option_places_memb: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
      option_places_serv: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
    })
    this.formFamily = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required]],
      health: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    console.log('Formulario enviado:', this.form.value);
  }

  private loadPastor(id: number){
    this._pastorService.get(id).subscribe( res => {
      console.log(res);
      this.pastor = res.data.pastor;
      console.log({iglesia: this.iglesia, pastor:this.pastor});
      this.form.controls['nombre'].setValue(this.iglesia.nombre);
      this.form.controls['zona'].setValue(this.iglesia.zona);

      this.obtenerImagenPastor(id);
    });

  }

  async obtenerImagenPastor( idIglesia: number ){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", idIglesia.toString() );
    console.log(this.file['name']);
    this._imageService.createImage(formData).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err) =>{
        this._toastService.error(err);
      }
    });
  }

  async modificarImagenIglesia( idIglesia: number ){
    let formData = new FormData();
    formData.append("image", this.file, this.file['name']);
    formData.append("idAsociado", idIglesia+'' );
    console.log(this.file['name']);
    this._imageService.update(idIglesia, formData).subscribe(res => {
      console.log(res);
    });
  }



  public formatTo12h(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  private limpiarForm(){
    // reset image
    this.createForms();
  }

  async closeSidenav(isTransaction:boolean = false){
    this.drawer.close();
    // this.limpiarForm();
    this.closeDrawer.emit(isTransaction);
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){ // checking if files array has more than one content
      this.replaceFileImage(); // replace file
      }
      this.file = this.files[0];

      var fileSize = this.file.size,
      mb = 1048576,
      final = fileSize / mb;

      if( Number(final) > 5  ) {
        console.log('THIS FILE IS SO WEIGHT');
        this.files.pop();
      }
      console.log('final', Number(final)<5);
      console.log(this.file);
  }

  public onRemove(event:any): void {
    this.files.pop();
  }

  private replaceFileImage(){
    this.files.splice(0,1); // index =0 , remove_count = 1
  }

  public onPastorSeleccionado(pastor: any) {
    console.log('Pastor seleccionado:', pastor);
    console.log('ID:', pastor.id);
    this.form.controls['idPastor'].setValue(pastor.id);
  }

  private obtenerImagenIglesia(id: number ) {
    this._imageService.getImage(id).subscribe({
      next: (res:any) => {
        console.log(res.data);
        this.imagenIglesia = res.data;
      },
      error: (err) =>{
        console.log(err);
        // this.toastService.mostrarNotificacion(err.message, 'info', 'top-end')
      }
    });
  }

  public addItem(){
    const item = this.formFamily.value
    console.log(item);
    // 1. validar el formulario de formfamily
    if(!this.formFamily.valid){
      this.formFamily.markAllAsTouched()
      return;
    }
    // 2. Añadir a un array de familymembers
    this.familyList.push(item)
    this.dataSource.data = this.familyList
    this.formFamily.reset()
  }

  public deleteItem(idItem: number){
    // postrar dialog para eliminar item
  }

  public modifyItem(idItem: number){
    // MOSTRAR UN popup para modificar item
  }
}
