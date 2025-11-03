import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { Grupo } from '../../../core/models/grupo';
import { MatIconModule } from '@angular/material/icon';
import { GroupService } from '../../../core/services/grupo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { IDNConstants } from '../../../shared/constants';
import { ComunicationService } from '../../../core/services/comunication.service';
import { OperationCardDialog } from '../../../shared/operationCardDialog/operation-card-dialog';

@Component({
  selector: 'app-grupo',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatRippleModule, MatIconModule, MatButtonModule],
  templateUrl: './operaciones-grupo.component.html',
  styleUrl: './operaciones-grupo.component.scss'
})
export class OperacionesGrupoComponent implements OnInit {

  data = inject(MAT_BOTTOM_SHEET_DATA);
   @Input() grupo?: Grupo;
  title = 'grupo-frontend';

  public points:{ type: string; desc: string }[] = [];
  // public cards:string[] = [];

  isChanged:boolean = false;
  CARDS = IDNConstants.CARDS;
  cartasRestantes: string[] = [];
  cartasRepartidas: string[] = [];

  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _groupService = inject(GroupService);
  private readonly _dialog = inject(MatDialog);
  private readonly _comunicationService = inject(ComunicationService);
  constructor() {}

  ngOnInit(): void {
    console.log('Datos recibidos:', this.data);
    this.grupo = this.data;
    this.points = JSON.parse(this.data.points)
    this.cartasRepartidas = JSON.parse(this.data.cards)
    this.cartasRestantes = [...this.CARDS];
    console.log(this.points);
  }



  reduceCard(type:string, desc:string): void {
    if (this.cartasRepartidas.length === 0) {
      console.warn('No hay cartas para quitar');
      return;
    }

    const carta = this.cartasRepartidas.pop();

    if (carta) {
      this.cartasRestantes.push(carta);
      console.log('Carta devuelta:', carta);
      this.updateCards(type, desc);
    }
    console.log(this.cartasRepartidas);
  }

  addCard(type:string, desc:string):void{
    if (this.cartasRestantes.length === 0) {
      console.warn('No hay más cartas para añadir');
      return;
    }

    const barajaMezclada = this.shuffle(this.cartasRestantes);
    const carta = barajaMezclada[0];

    this.cartasRepartidas.push(carta);
    const index = this.cartasRestantes.indexOf(carta);
    if (index > -1) {
      this.cartasRestantes.splice(index, 1);
    }

    console.log('Carta añadida:', carta);
    console.log(this.cartasRepartidas);
    this.updateCards(type, desc);
  }

  updateCards(type:string, desc:string) {
    console.log("update cards");
    console.log(this.grupo);
    this.grupo!.cards = JSON.stringify(this.cartasRepartidas);
    this.grupo!.points = JSON.stringify(this.points.push({type, desc}));
    console.log(this.grupo);

    //UPDATE cards
    // update points
    // if(this.grupo?.groupId){
    //   this._groupService.update(this.grupo?.groupId!, this.grupo).subscribe(res => {
    //     console.log(res);
    //     // update views
    //     this.sendNotificationUpdate();
    //   });
    // }
  }




  sendNotificationUpdate() {
    this._comunicationService.cambiarMensaje(true);
  }

  openOperationCardDialog(type:string, value:string ){
    const confirmData: {type:string, value:string} = {
      type: type,
      value: value
    };
    this._dialog
      .open(OperationCardDialog, {
        data: confirmData
      })
      .afterClosed()
      .subscribe((operation: {description:string}) => {
        console.log(operation);
        if (operation !== undefined) {
          if(value === "-1"){
            this.reduceCard("-1", operation.description)
          }
          else if(value === "+1"){
            this.addCard("+1", operation.description)
          }
        }
      });
  }

  shuffle(array: string[]): string[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  getCardImage(card: string): string {
    return `../../../assets/cards/${card}.png`;
  }
}
