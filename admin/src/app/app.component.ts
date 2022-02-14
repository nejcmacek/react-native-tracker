import { getFilters, getUsers } from '../scripts/rest';
import { Component } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users: User[]
  filters: Filter[]
  loading = true
  events = new EventEmitter()
  editFilter: Filter
  editUser: User
  addUser: boolean
  addFilter: User
  changeSettings: boolean

  constructor() {
    this.load();
    this.events.on("editFilter", (filter: Filter) => {
      this.editFilter = filter
    })
    this.events.on("editUser", (user: User) => {
      this.editUser = user
    })
    this.events.on("addUser", (show: any) => {
      this.addUser = !!show
    })
    this.events.on("addFilter", (user: User) => {
      this.addFilter = user
    })
    this.events.on("changeSettings", (value: boolean) => {
      this.changeSettings = value
    })
    this.events.on("reload", this.load.bind(this))
  }

  async load() {
    this.loading = true
    this.editFilter = null
    this.editUser = null
    this.addUser = false
    this.addFilter = null
    const u = getUsers()
    const f = getFilters()
    this.users = await u
    this.filters = await f
    this.loading = false
  }

}
