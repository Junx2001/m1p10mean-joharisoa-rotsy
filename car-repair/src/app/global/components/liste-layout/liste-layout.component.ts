import { Component, Input, OnInit } from '@angular/core';
import { Dict } from '../../models/dict.interface';

@Component({
  selector: 'app-liste-layout',
  templateUrl: './liste-layout.component.html',
  styleUrls: ['./liste-layout.component.css']
})
export class ListeLayoutComponent implements OnInit {
  @Input() values! : Dict[];

  constructor() { }

  ngOnInit(): void {
  }
}
