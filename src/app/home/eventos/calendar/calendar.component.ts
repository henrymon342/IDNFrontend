import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CalendarEvent, CalendarModule, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventoService } from '../../../core/services/evento.service';
import { EventModel } from '../../../core/models/event';
import { endOfDay, startOfDay, isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetalleEventoComponent } from '../detalle-evento/detalle-evento.component';
import { IDNConstants } from '../../../shared/constants';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatIconModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  public allEvents:EventModel[] = [];
  eventos: CalendarEvent[] = [];
  public COLORS = IDNConstants.colors;
  refresh = new Subject<void>();
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;

  constructor( private _eventoService: EventoService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const date = new Date();
    console.log(date);

    this.getEventbyMonth(date);
    const fecha_actual = new Date();
    const nromes = fecha_actual.getMonth();
    const gestion = fecha_actual.getFullYear();
    this.obtenerEventosMes(nromes, gestion);
  }

  getEventbyMonth( fecha: Date):void {
    console.log(fecha.getFullYear());
    console.log(fecha.getMonth());
    const nromes = fecha.getMonth();
    const gestion = fecha.getFullYear();
    console.log(nromes);
    console.log(gestion);
    this._eventoService.findByMonth({ nromes, gestion }).subscribe( (res: any) =>{
      console.log(res);
      this.allEvents = res.data as EventModel[];
      this.allEvents.forEach( evento => {
        const colorEvent = this.getMinisteryColor(evento);
        const objetofechas = this.getDatesEvents(evento);
        console.log('COLOR', colorEvent);
        console.log('OBJETO FECHAS', objetofechas);
        // const obj:any = objetofechas['end'] || {};
        this.eventos = [
          {
            id: evento.id,
            // start: startOfDay(new Date(objetofechas['start'])),
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            // end: endOfDay(new Date(obj)),
            title: evento.titulo,
            color: colorEvent,
            allDay: true,
            meta: evento.id,
            resizable: {
              beforeStart: true,
              afterEnd: true
            }
          }
        ];
      });
    })
  }

  cursorCalendario():void {
    const nromes = this.viewDate.getMonth();
    const gestion = this.viewDate.getFullYear();
    this.obtenerEventosMes(nromes, gestion);
    // this.getEventbyMonth(this.viewDate);
  }

  getMinisteryColor(evento: EventModel): any {
    switch ( evento.ministerio ) {
      case 'JNI':
        return this.COLORS.orange;
      case 'MNI':
        return this.COLORS.green;
      case 'DNI':
        return this.COLORS.blue;
      default:
        return '';
    }
  }

  getDatesEvents( evento: EventModel ):object{
    console.log("entro");

    if( evento.tipofecha == 'VARIOS DÍAS' ){
      console.log({ start: startOfDay(new Date(evento.fechaini!)), end: endOfDay(new Date(evento.fechafin!)) });

      return { start: startOfDay(new Date(evento.fechaini!)), end: endOfDay(new Date(evento.fechafin!)) };
    }else{
      return { start: startOfDay(new Date(evento.fechaini!)) };
    }
  }

  obtenerEventosMes(nromes:any, gestion:any) {
    const modelEvent:any[] = [];
    this._eventoService.findByMonth({nromes, gestion}).subscribe( async (res: any) =>{
      this.allEvents = res.data;
      console.log(res);

      this.allEvents.forEach((element: EventModel) => {
        console.log(element);
        //COLORES
        let colorToEvent = '';
        colorToEvent = this.asignarColorMinisterio(element.ministerio);

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
          const dateIni = new Date(element.fechaini!).toISOString().slice(0, 10);
          console.log(dateIni);
          const fecha_nueva1 = dateIni + "T04:00:00.000Z";
          console.log(fecha_nueva1);
          modelEvent.push({
            id: element.id,
            start: startOfDay(new Date(fecha_nueva1)),
            title: element.titulo,
            color: colorToEvent,
            allDay: true,
            meta: element.id
          })
        }
      });
      this.eventos = modelEvent;
      this.refresh.next();
      return modelEvent;
    });
  }

  asignarColorMinisterio(min: string){
    if( min == 'JNI' ){
      return this.COLORS.orange;
    }
    if( min == 'MNI' ){
      return this.COLORS.green;
    }
    if( min == 'DNI' ){
      return this.COLORS.blue;
    }
    // if( min == 'externo' ){
    //   return this.COLORS.red;
    // }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('action', action);
    console.log('event', event);
    console.log('event', event.id);
    const idEvent: any = event.id;
    this._eventoService.get(idEvent)
    .subscribe(res => {
      console.log(res);
      this.openDialog('3000ms', '1500ms', res.data)
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, evento: EventModel): void {
    const parametros = {
      width: '90vw',
      enterAnimationDuration,
      exitAnimationDuration,
      data: evento,
      panelClass: 'dialog',
      maxHeight: '90vh'
    };
    this.dialog.open(DetalleEventoComponent, parametros );
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {

    this.eventos = this.eventos.map((iEvent) => {
      if (iEvent === event) {
        console.log(event);
        console.log(newStart);
        console.log(newEnd);

        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
}
