import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import { IDNConstants } from "../../../shared/constants";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatListModule} from '@angular/material/list';
import { PastorService } from "../../../core/services/pastor.service";
import { Pastor } from "../../../core/models/pastor";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from "rxjs";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { IglesiaService } from '../../../core/services/iglesia.service';
import { Iglesia } from '../../../core/models/iglesia';
import { ImageModel } from '../../../core/models/imagen';
import { ImagenService } from "../../../core/services/imagen.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iglesia-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatAutocompleteModule, NgxDropzoneModule],
  templateUrl: './iglesiaForm.component.html',
  styleUrl: './iglesiaForm.component.scss'
})
export class IglesiaFormComponent implements OnInit {
  private _iglesiaId?: number;

  @Input() drawer:MatDrawer;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Input()
  set iglesiaId(value: number | undefined) {
    this._iglesiaId = value;
    this.limpiarForm();
    console.log(this.form);
    console.log(this.myControl);

    if (value !== undefined) {
      this.loadIglesia(value);
      this.title = "Modificar";
    }else{
      this.title = "Adicionar";
    }
  }

  get iglesiaId(): number | undefined {
    return this._iglesiaId;
  }

  public title: string;
  public form!: FormGroup;
  public readonly IGLESIAS: string[] = IDNConstants.IGLESIAS;
  public readonly ZONAS: string[] = IDNConstants.ZONAS;
  public PASTORES: Pastor[] = [];
  public DAYS: string[] = IDNConstants.DIAS;
  public STARTDATE = new Date(1960, 0, 1);

  myControl = new FormControl('', Validators.required);
  filteredOptions: Observable<Pastor[]>;

  files: File[] = [];
  file: File;
  public iglesia: Iglesia;
  public pastor: Pastor;
  public imagenIglesia: ImageModel = new ImageModel();

  constructor(private fb: FormBuilder,
    private _pastorService: PastorService,
    private _iglesiaService: IglesiaService,
    private _imageService: ImagenService,
    private _toastService:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.obtenerPastores();
    this.createForm();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private createForm(): void{
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      idPastor: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fundacion: ['', [Validators.required]],
      superdni: ['', [Validators.required]],
      presimni: ['', [Validators.required]],
      presijni: ['', [Validators.required]],
      diacentral: ['', [Validators.required]],
      horacentralini: ['', [Validators.required]],
      horacentralfin: ['', [Validators.required]],
      diajni: ['', [Validators.required]],
      horajniini: ['', [Validators.required]],
      horajnifin: ['', [Validators.required]],
      zona: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    // validar imagen
    if (!this.file || !this.imagenIglesia) {
      // image invalid! show
      // this._toastService.error("Debe cargar una imagen");
      if(this.title === 'Adicionar'){
        return;
      }
    }
    if (this.form.valid) {
      const horaCI = this.convertirHoraATipoDate(this.form.controls['horacentralini'].value);
      const horaCF = this.convertirHoraATipoDate(this.form.controls['horacentralfin'].value);
      const horaJNII = this.convertirHoraATipoDate(this.form.controls['horajniini'].value);
      const horaJNIF = this.convertirHoraATipoDate(this.form.controls['horajnifin'].value);
      this.form.controls['horacentralini'].setValue(horaCI);
      this.form.controls['horacentralfin'].setValue(horaCF);
      this.form.controls['horajniini'].setValue(horaJNII);
      this.form.controls['horajnifin'].setValue(horaJNIF);

      if(this.title === 'Adicionar'){
        // ADICIONAR IGLESIA
        this._iglesiaService.crear(this.form.value).subscribe(res => {
          this.closeSidenav(true);
            const { id } = res.data;
            this.asociarImagenIglesia(id);
        });
      }else{
        // MODIFICAR IGLESIA
        this._iglesiaService.actualizarIglesia( this.iglesia.id!, this.form.value).subscribe(res => {
          this.closeSidenav(true);
          if( this.file && this.imagenIglesia ){
            console.log('se modificara la imagen de iglesia');
            this.modificarImagenIglesia( this.iglesia.id!);
          }
        });

      }
    // limpiar form
      // this.limpiarForm();

    } else {
      // this.form.markAllAsTouched(); // fuerza mostrar errores
    }
    console.log('Formulario enviado:', this.form.value);
  }

  private obtenerPastores(){
    this._pastorService.getPastores().subscribe({
      next: (res:any) => {
        console.log(res.data)
        this.PASTORES = res.data;
        this.PASTORES.sort(
          function (a, b) {
            if (a.name < b.name)
                return -1;
            else if (a.name > b.name)
                return 1;
            else
                return 0;
        });
      },
      error: (err) =>{
        console.log(err.message);
      }
    });
  }

  private loadIglesia(id: number){
    this._iglesiaService.obtenerIglesia(id).subscribe( res => {
      console.log(res);
      this.iglesia = res.data.iglesia;
      this.pastor = res.data.pastor;
      console.log({iglesia: this.iglesia, pastor:this.pastor});
      this.form.controls['nombre'].setValue(this.iglesia.nombre);
      this.form.controls['zona'].setValue(this.iglesia.zona);

      this.form.controls['idPastor'].setValue(this.pastor.id);
      this.myControl.setValue(this.pastor.name);
      this.form.controls['presijni'].setValue(this.iglesia.presijni);
      this.form.controls['superdni'].setValue(this.iglesia.superdni);
      this.form.controls['presimni'].setValue(this.iglesia.presimni);
      this.form.controls['diacentral'].setValue(this.iglesia.diacentral);
      this.form.controls['horacentralini'].setValue(this.formatTo12h(this.iglesia.horacentralini));
      this.form.controls['horacentralfin'].setValue(this.formatTo12h(this.iglesia.horacentralfin));
      this.form.controls['diajni'].setValue(this.iglesia.diajni);
      this.form.controls['horajniini'].setValue(this.formatTo12h(this.iglesia.horajniini));
      this.form.controls['horajnifin'].setValue(this.formatTo12h(this.iglesia.horajnifin));
      this.form.controls['fundacion'].setValue(this.iglesia.fundacion);
      this.form.controls['direccion'].setValue(this.iglesia.direccion);
      this.form.controls['ubicacion'].setValue(this.iglesia.ubicacion);

      this.obtenerImagenIglesia(id);
    });

  }

  async asociarImagenIglesia( idIglesia: number ){
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
    this.imagenIglesia = new ImageModel();
    this.createForm();
    this.myControl.setValue('');
    this.form.reset(); // Esto lo deja limpio, sin errores visuales
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private convertirHoraATipoDate(horaStr: string): string {
    const hoy = new Date();
    const [hora, minutos, ampm] = horaStr.match(/(\d+):(\d+)\s*(AM|PM)/i)!.slice(1);

    let horas = parseInt(hora, 10);
    const mins = parseInt(minutos, 10);

    if (ampm.toUpperCase() === 'PM' && horas !== 12) horas += 12;
    if (ampm.toUpperCase() === 'AM' && horas === 12) horas = 0;

    const resultado = new Date(hoy);
    resultado.setHours(horas, mins, 0, 0);
    return resultado.toString();
  }

  async closeSidenav(isTransaction:boolean = false){
    this.drawer.close();
    // this.limpiarForm();
    this.closeDrawer.emit(isTransaction);
  }

  private _filter(value: string): Pastor[] {
    const filterValue = value.toLowerCase();

    return this.PASTORES.filter(option => option.name.toLowerCase().includes(filterValue));
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
}
