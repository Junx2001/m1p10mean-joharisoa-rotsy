import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-auth',
  templateUrl: './footer-auth.component.html',
  styleUrls: ['./footer-auth.component.css']
})
export class FooterAuthComponent implements OnInit {
  date = new Date().getFullYear();

  @Input()
  get absolute(): boolean {
    return this._absolute;
  }
  set absolute(absolute: boolean) {
    this._absolute = absolute === undefined ? false : absolute;
  }
  private _absolute = false;
  constructor() { }

  ngOnInit(): void {
  }

}
