import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from "@angular/material/button";
import {MatRadioModule} from '@angular/material/radio';
import { EventoService } from "../../../shared/services/evento.services";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import { IDNConstants } from "../../../shared/constants";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatListModule} from '@angular/material/list';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Evento } from "../../../shared/models/evento";

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

  @Input()
  set eventId(value: number | undefined) {
    this._eventId = value;
    if (value !== undefined) {
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


  constructor(private _eventoService:EventoService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void{
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
    // let horaIni = this.form.controls['horaini'];
    // console.log();
    console.log(this.form.controls['horafin']);

    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
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
      console.log(encarga2);
      if( encarga2 != undefined && encarga2.length>0 ){
        encarga2.forEach((element:any) => {
          this.encargadosList.push(element);
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

  public agregarEncargado(){
    if( this.nuevoEncargado == '' ){
      return;
    }
    this.encargadosList.push(this.nuevoEncargado);
    this.nuevoEncargado = '';
    this.form.value.encargado = this.encargadosList;
  }

  public borrarEncargado(index: number){
    console.log(index);
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
      return ['IDN'];
    });
  }


}
