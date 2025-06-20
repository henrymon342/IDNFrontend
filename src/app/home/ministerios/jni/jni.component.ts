import { Component } from '@angular/core';
import { IDNConstants } from '../../../shared/constants';

@Component({
  selector: 'app-jni',
  standalone: true,
  imports: [],
  templateUrl: './jni.component.html',
  styleUrl: './jni.component.scss'
})
export class JniComponent {
  public MINISTERIOS: {sigla: string, nombre: string, bgcolor: string, textcolor: string, pathLogo: string, url: string, idSeccion: string}[] = IDNConstants.MINISTERIOS;
}
