import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { EventoService } from '../../core/services/evento.service';
import { EventModel } from '../../core/models/event';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { EventoComponent } from './evento/evento.component';
import { Subject } from 'rxjs';
import { endOfDay, startOfDay } from 'date-fns';
import { IDNConstants } from '../../shared/constants';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, CalendarModule, MatIconModule, CalendarComponent, EventoComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {
  public locale: string = 'es';
  viewDate: Date = new Date();
  viewDate1: Date = new Date();
  view: CalendarView = CalendarView.Month;
  view1: CalendarView = CalendarView.Month;
  public monthEvents:EventModel[] = [];
  public seeCalendar: boolean = true;
  public currentYear = new Date();
  refresh = new Subject<void>();

  public allEvents:EventModel[] = [];
  private COLORS = IDNConstants.colors;
  events: CalendarEvent[] = [];

  constructor(private _eventoService: EventoService) {
    this.dayClicked({ date: new Date(), events: [] });
  }

  ngOnInit(): void {
    this.mesInteractivo(new Date());
    this.setCalendar();
  }

  setCalendar(){
    this.events = this.getEvents();
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events);
    if(events.length == 0){
      this.getEvents();
    }
    this.refresh.next();
  }

  getEvents(){
    const modelEvent:any[] = [];
    const nromes = this.viewDate.getMonth();
    const gestion = this.viewDate.getFullYear();
    console.log('FECHA_ACTUAL', this.viewDate);
    console.log('NUMERO DE MES', nromes);

    this._eventoService.findByMonth({nromes, gestion}).subscribe( async (res:any) =>{
      console.log(res);
      this.allEvents = res.data;
      this.allEvents.forEach((element: EventModel) => {
        console.log(element);
        //COLORES
        let colorToEvent = '';
        if( element.ministerio == 'JNI' ){
          colorToEvent = this.COLORS.orange;
        }
        if( element.ministerio == 'MNI' ){
          colorToEvent = this.COLORS.green;
        }
        if( element.ministerio == 'DNI' ){
          colorToEvent = this.COLORS.blue;
        }
        // if( element.ministerio == 'externo' ){
        //   colorToEvent = this.COLORS.red;
        // }
        if( element.tipofecha == 'VARIOS DÍAS' ){
          // FECHAS
          console.log('varios dias', element.fechaini);
          console.log('varios dias', element.fechafin);

          const dateIni = new Date(element.fechaini!).toISOString().slice(0, 10);
          const dateFin = new Date(element.fechafin!).toISOString().slice(0, 10);
          console.log('varios dias', dateIni);
          console.log('varios dias', dateFin);

          const fecha_nueva1 = dateIni + "T04:00:00.000Z";
          const fecha_nueva2 = dateFin + "T04:00:00.000Z";

          console.log('varios dias', new Date(fecha_nueva1));
          console.log('varios dias', new Date(fecha_nueva2));


          // var nueva_fecha1 = new Date('2023-03-06T04:00:00.000Z');
          // var nueva_fecha2 = new Date('2023-03-06T04:00:00.000Z');

          modelEvent.push({
            id: element.id,
            start: startOfDay(new Date(fecha_nueva1)),
            end: endOfDay(new Date(fecha_nueva2)),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }else{
          console.log('solo un dia', element.fechaini);
          const dateIni = new Date(element.fechaini!).toISOString().slice(0, 10);
          const fecha_nueva1 = dateIni + "T04:00:00.000Z";
          console.log('solo un dia', fecha_nueva1);

          modelEvent.push({
            id: element.id,
            start: startOfDay(new Date(element.fechaini+'')),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }
      });
    });

    return modelEvent;
  }

  mesInteractivo(viewDate: Date){
    const nromes = viewDate.getMonth();
    const gestion = viewDate.getFullYear();
    console.log('fecha --> ', viewDate);
    this._eventoService.findByMonth({ nromes, gestion }).subscribe({
      next: (res:any) => {
        console.log(res);
        this.monthEvents = res.data;
        // this.alertaService.mostrarAlertaPositiva("evento añadido");
      },
      error: (err) =>{
        console.log(err);
        // this.toastService.mostrarNotificacion('ERROR DE SERVIDOR', 'info', 'top-end')
      }
    });
  }

  changeStatusCalendar(): void{
    this.seeCalendar = this.seeCalendar?false:true;
    console.log(this.seeCalendar);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth"});
  }
}
