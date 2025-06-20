import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../../core/services/seo.service';
import { IDNConstants } from '../../../shared/constants';

@Component({
  selector: 'app-dni',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dni.component.html',
  styleUrl: './dni.component.scss'
})
export class DniComponent implements OnInit{
  public MINISTERIOS: {sigla: string, nombre: string, bgcolor: string, textcolor: string, pathLogo: string, url: string, idSeccion: string}[] = IDNConstants.MINISTERIOS;

  constructor(private title: Title, private seo: SeoService) {

  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const t:string = "IDN La Paz - DNI";
    this.title.setTitle(t)

    this.seo.generateTags({
      title: t,
      description: "Dicipulado Nazareno Internacional",
      slug: "dni"
    })
  }

}
