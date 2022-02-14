import { changeFilter, removeFilter } from '../../scripts/rest';
import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-edit-filter',
  templateUrl: './edit-filter.component.html',
  styleUrls: ['./edit-filter.component.css']
})
export class EditFilterComponent implements OnInit {

  @Input()
  filter: Filter
  @Input()
  events: EventEmitter
  clone: Filter
  loading = false
  bodystring = "null"

  constructor() { }

  ngOnInit() {
    this.clone = { ...this.filter }
    this.bodystring = this.clone.body && JSON.stringify(this.clone.body) || "null"
  }

  async save() {
    try {
      this.loading = true
      const body = JSON.parse(this.bodystring || "null")
      this.clone.body = body
      await changeFilter(this.clone)
      this.filter.body = this.clone.body
      this.filter.method = this.clone.method
      this.filter.path = this.clone.path
      this.filter.title = this.clone.title
      this.filter.uri = this.clone.uri
      this.events.emit("reload")
    } catch (ex) {
      this.loading = false
      alert(ex.message)
    }
  }

  async delete() {
    try {
      this.loading = true
      await await removeFilter(this.filter)
      this.events.emit("reload")
    } catch (ex) {
      this.loading = false
      alert(ex.message)
    }
  }

  close() {
    this.events.emit("editFilter", null)
  }

}
