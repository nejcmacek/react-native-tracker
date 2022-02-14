import { addUser } from '../../scripts/rest';
import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @Input()
  events: EventEmitter
  name = ""
  password = ""
  displayName = ""
  admin = false

  async add() {
    if (!this.name || !this.name.trim())
      alert("Name must be given.")
    if (!this.password)
      alert("Password must be given.")
    if (!this.displayName || !this.displayName.trim())
      alert("Display Name must be given.")
    try {
      await addUser({
        _id: null,
        name: this.name.trim(),
        password: this.password,
        displayName: this.displayName.trim(),
        admin: this.admin
      })
      this.events.emit("reload")
    } catch (ex) {
      alert(ex.message)
    }
  }

  close() {
    this.events.emit("addUser")
  }

}
