import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {

  @Input()
  user: User
  @Input()
  events: EventEmitter

  constructor() { }

  onChange() {
    this.events.emit("editUser", this.user)
  }

}
