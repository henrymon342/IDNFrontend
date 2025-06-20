import { Component, OnInit } from '@angular/core';
import { Iglesia } from '../../../core/models/iglesia';
import { ImagenService } from '../../../core/services/imagen.service';
import { MatIconModule } from '@angular/material/icon';
import { IglesiaService } from '../../../core/services/iglesia.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardIglesiaComponent } from '../card-iglesia/card-iglesia.component';

@Component({
  selector: 'app-lista-iglesias',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatButtonModule, CardIglesiaComponent],
  templateUrl: './lista-iglesias.component.html',
  styleUrl: './lista-iglesias.component.scss'
})
export class ListaIglesiasComponent implements OnInit {

  public iglesias:Iglesia[] = [
    {id: 1234345, nombre: 'LA PORTADA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
    {id: 123345, nombre: 'WINCHESTER', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
    {id: 1234345, nombre: 'MUNAYPATA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
    {id: 12345, nombre: 'CENTRAL', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
    {id: 12343125, nombre: 'MIRAFLORES', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
    {id: 1246345, nombre: 'VIACHA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname', direccion: "aca nomas" },
  ];

  constructor(
    private _imagenService: ImagenService,
    private _iglesiaService: IglesiaService
  ) {

  }

  ngOnInit(): void {
    // this.currentChurch = this.iglesias[0];
    this.getChurchs();
  }

  getChurchs(): void{
    this._iglesiaService.getAll().subscribe({
      next: async (res:any) => {
        console.log(await res);
        this.churchs = await res.data;
        this.currentChurch = this.churchs[0];
        await this.obtenerImagenIglesia(this.currentChurch.id);
        await this.obtenerImagenPastor(this.currentChurch.idPastor);
        console.log("IGLESIA: ", this.currentChurch);
      },
      error: (err1:any) =>{
        console.log("IGLESIA: ", err1.message);
      }
        // this.toastService.mostrarNotificacion(err1.message, 'info', 'top-end'),
    });
  }

  private churchs: Iglesia[] = [];
  public currentChurch: Iglesia = new Iglesia();
  public position:any = 0;

  async searchChurch(palabra: any) {
    const nuevo = this.churchs.filter(igles => igles.nombre.toLowerCase().indexOf(palabra) != -1)
    console.log(nuevo);
    this.currentChurch = nuevo[0];
    await this.obtenerImagenIglesia(this.currentChurch.id);
    await this.obtenerImagenPastor(this.currentChurch.idPastor);
  }

  async obtenerImagenIglesia(id: number ) {
    console.log(id);
    this._imagenService.getImage(id).subscribe({
      next: async (res:any) => {
        console.log(res);
        this.currentChurch.imagePath = await res.data.imagePath;
      },
      error: (err) =>{
        console.log(err);
        // this.toastService.mostrarNotificacion(err.message, 'info', 'top-end')
      }
    });
  }

  async obtenerImagenPastor(id: number ) {
    console.log(id);
    this._imagenService.getImage(id).subscribe({
      next: async (res:any) => {
        console.log(res);
        this.currentChurch.imagePathPas = await res.data.imagePath;
      },
      error: (err) =>{
        console.log(err);
        // this.toastService.mostrarNotificacion(err.message, 'info', 'top-end')
      }
    });
  }

  async toDirection(direction: string): Promise<void>{
    console.log("entro");

    if( direction == 'right' ){   // move to rigth
      this.position++;
      if( this.position == this.churchs.length ){
        this.position = 0;
      }
    }
    else{                         // move to left
      this.position--;
      if( this.position < 0 ){
        this.position = this.churchs.length-1;
      }
    }
    this.currentChurch = this.churchs[this.position];
    await this.obtenerImagenIglesia(this.currentChurch.id);
    await this.obtenerImagenPastor(this.currentChurch.idPastor);
  }
}
