import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from "@angular/core";
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
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Evento } from "../../../core/models/evento";
import { EventoService } from "../../../core/services/evento.service";


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule,
    RouterLink, MatSidenavModule, MatSidenavModule, MatButtonModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatRadioModule, MatDatepickerModule, NgxMatTimepickerModule,
    MatListModule, MatChipsModule],
  templateUrl: './eventoForm.component.html',
  styleUrl: './eventoForm.component.scss'
})
export class EventoFormComponent implements OnInit {
  private _eventId?: number;

  @Input() drawer:MatDrawer;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Input()
  set eventId(value: number | undefined) {
    this._eventId = value;
    if (value !== undefined) {
      this.clearReactiveKeywordsAll();
      this.loadEvento(value);
      this.title = "Modificar";
    }else{
      this.title = "Adicionar";
      this.limpiarForm();
    }
  }

  get eventId(): number | undefined {
    return this._eventId;
  }

  public title: string;
  public form!: FormGroup;
  public readonly MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI', 'OTRO'];
  public readonly MODALIDADES = ['PRESENCIAL', 'VIRTUAL'];
  public readonly LUGARES = ['ALGUNA IGLESIA', 'OTRO LUGAR'];
  public readonly PLATAFORMAS = ['ZOOM', 'MEET', 'DISCORD', 'MICROSOFT TEAMS', 'OTRO'];
  public readonly IGLESIAS: string[] = IDNConstants.IGLESIAS;
  public readonly TIPOSFECHA = ['UN DÍA', 'VARIOS DÍAS']

  public nuevoEncargado: string;
  public encargadosList: string[] = [];
  public evento: Evento;

  reactiveKeywords = signal(["IDN"]);
  formControl = new FormControl(['angular']);
  announcer = inject(LiveAnnouncer);


  constructor(private _eventoService: EventoService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void{
    this.form = this.fb.group({
      ministerio: ['JNI', [Validators.required]],
      titulo: ['', [Validators.required]],
      modalidad: ['PRESENCIAL', [Validators.required]],
      optionplace: ['', [Validators.required]],
      place: ['', [Validators.required]],
      tipofecha: ['UN DÍA', [Validators.required]],
      fechasingle: [''],
      fechaini: [''],
      fechafin: [''],
      horaini: ['', [Validators.required]],
      horafin: [''],
      descripcion: ['', [Validators.required]],
      encargado: [''],
      tieneimagen: [false]
    })
  }

  onSubmit(): void {
    console.log('Formulario enviado:', this.form.value);
    let horaIni = this.form.controls['horaini'].value;
    console.log(horaIni);
    const hora1 = this.convertirHoraATipoDate(horaIni);
    console.log(hora1);
    this.form.controls['horaini'].setValue(hora1.toString());
    if(this.form.get('tipofecha')?.value !== 'UN DÍA'){
      let horaFin = this.form.controls['horafin'].value;
      console.log(horaFin);
      const hora2 = this.convertirHoraATipoDate(horaFin);
      if(horaFin){
        this.form.controls['horafin'].setValue(hora2);
      }
    }else{
      this.form.controls['horafin'].setValue(null);
    }

    console.log(this.reactiveKeywords());
    this.form.controls['encargado'].setValue(this.reactiveKeywords().join(','));


    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      if(this.title === 'Adicionar'){
        //Crear Evento
        this._eventoService.crearEvento(this.form.value).subscribe(res =>{
          console.log(res);
          this.closeSidenav(true);
        });
      }else{
        //Modificar Evento
        this._eventoService.modificarEvento(this.eventId!, this.form.value).subscribe(res =>{
          console.log(res);
          this.closeSidenav(true);
        });
      }
      // limpiar form
      this.limpiarForm();

    } else {
      this.form.markAllAsTouched(); // fuerza mostrar errores
    }
  }

  private loadEvento(id: number){
    this._eventoService.obtenerEvento(id).subscribe( res => {
      console.log(res);
      this.evento = res.data;
      this.form.controls['ministerio'].setValue(res.data.ministerio);
      this.form.controls['titulo'].setValue(res.data.titulo);
      this.form.controls['modalidad'].setValue(res.data.modalidad);
      this.form.controls['optionplace'].setValue(res.data.optionplace);
      this.form.controls['place'].setValue(res.data.place);
      this.form.controls['tipofecha'].setValue(res.data.tipofecha);
      this.form.controls['fechaini'].setValue(res.data.fechaini);
      this.form.controls['horaini'].setValue(this.formatTo12h(new Date(res.data.horaini))); // → "10:30 AM"
      if(res.data.tipofecha != 'UN DÍA'){
        this.form.controls['fechafin'].setValue(res.data.fechafin!);
        this.form.controls['horafin'].setValue(this.formatTo12h(new Date(res.data.horafin))); // → "10:30 AM"
      }
      this.form.controls['descripcion'].setValue(res.data.descripcion);
      const encarga2 = res.data.encargado?.split(',');
      if( encarga2 != undefined && encarga2.length>0 ){
        encarga2.forEach((element:any) => {
          this.reactiveKeywords.update(keywords => [...keywords, element]);
          this.announcer.announce(`added ${element} to reactive form`);
        });
      }
    });
  }

  public formatTo12h(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

  addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  private limpiarForm(){
    this.createForm();
    this.clearReactiveKeywordsAll();
  }

  clearReactiveKeywordsAll() {
    this.reactiveKeywords.update(() => {
      this.announcer.announce('All keywords removed from reactive form');
      return [];
    });
  }


  convertirHoraATipoDate(horaStr: string): Date {
    const hoy = new Date();
    const [hora, minutos, ampm] = horaStr.match(/(\d+):(\d+)\s*(AM|PM)/i)!.slice(1);

    let horas = parseInt(hora, 10);
    const mins = parseInt(minutos, 10);

    if (ampm.toUpperCase() === 'PM' && horas !== 12) horas += 12;
    if (ampm.toUpperCase() === 'AM' && horas === 12) horas = 0;

    const resultado = new Date(hoy);
    resultado.setHours(horas, mins, 0, 0);
    return resultado;
  }

  public closeSidenav(isTransaction:boolean = false){
    this.drawer.close();
    this.limpiarForm();
    this.closeDrawer.emit(isTransaction);
  }
}
