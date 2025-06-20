import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IDNConstants } from '../../../shared/constants';

@Component({
  selector: 'app-mni',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './mni.component.html',
  styleUrl: './mni.component.scss'
})
export class MniComponent {
  public MINISTERIOS: {sigla: string, nombre: string, bgcolor: string, textcolor: string, pathLogo: string, url: string, idSeccion: string}[] = IDNConstants.MINISTERIOS;

}
