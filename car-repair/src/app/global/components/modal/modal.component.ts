import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id! : string;
  @Input() showModal! : boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
