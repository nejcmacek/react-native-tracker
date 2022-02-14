import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-userfilter-display',
  templateUrl: './userfilter-display.component.html',
  styleUrls: ['./userfilter-display.component.css']
})
export class UserfilterDisplayComponent {

  @Input()
  users: User[]
  @Input()
  filters: Filter[]
  @Input()
  events: EventEmitter
  loading = true
  selectedUser: User = null
  selectedFitler: Filter

  getUserFilters() {
    return this.filters.filter(t => t.userId === this.selectedUser._id)
  }

  selectUser(user) {
    this.selectedUser = user
    this.selectedFitler = null
  }

  addUser() {
    this.events.emit("addUser", true)
  }

  addFilter() {
    this.events.emit("addFilter", this.selectedUser)
  }

}
