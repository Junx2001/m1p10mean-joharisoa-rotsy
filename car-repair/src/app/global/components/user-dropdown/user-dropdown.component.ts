import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent implements OnInit, AfterViewInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  label! : string;

  constructor(private userService : UserService){}
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
  ngOnInit(): void {
    const user = this.userService.getUserByToken(localStorage.getItem("token"));
    if (user.role==='financier'){
      this.label=`Responsable financier : ${user.name}`;
    }else if (user.role==='atelier'){
      this.label=`Responsable atelier : ${user.name}`;
    }else{
      this.label=`Client : ${user.name}`;
    }
  }
}
