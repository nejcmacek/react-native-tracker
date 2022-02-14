import { changeUser, removeUser } from '../../scripts/rest';

import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input()
  user: User
  @Input()
  events: EventEmitter
  clone: User
  loading = false
  bodystring = "null"

  constructor() { }

  ngOnInit() {
    this.clone = { ...this.user }
    this.clone.password = ""
  }

  async save() {
    try {
      this.loading = true
      const body = JSON.parse(this.bodystring || "null")
      console.log(this.clone)
      await changeUser(this.clone)
      this.user.name = this.clone.name
      this.user.displayName = this.clone.displayName
      this.user.admin = this.clone.admin
      this.user.password = this.clone.password
      this.events.emit("reload")
    } catch (ex) {
      this.loading = false
      alert(ex.message)
    }
  }

  async delete() {
    try {
      this.loading = true
      await await removeUser(this.user)
      this.events.emit("reload")
    } catch (ex) {
      this.loading = false
      alert(ex.message)
    }
  }

  close() {
    this.events.emit("editUser", null)
  }

}
