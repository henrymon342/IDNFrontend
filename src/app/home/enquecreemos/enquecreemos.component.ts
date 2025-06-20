import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IDNConstants } from '../../shared/constants';

@Component({
  selector: 'app-enquecreemos',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatExpansionModule],
  templateUrl: './enquecreemos.component.html',
  styleUrl: './enquecreemos.component.scss',
})
export class EnquecreemosComponent {
  public ARTICLES: any[] = IDNConstants.ARTICLES;
  panelOpenState = false;
}
