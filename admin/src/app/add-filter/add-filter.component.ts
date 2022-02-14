import { addFilter } from '../../scripts/rest';

import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.css']
})
export class AddFilterComponent {

  @Input()
  events: EventEmitter
  @Input()
  user: User
  title = ""
  method = ""
  uri = ""
  track = false
  path = ""
  body = ""

  async add() {
    try {
      const { title, method, uri, track, path, body } = this
      await addFilter({
        _id: null,
        title, method, uri, track, path,
        body: JSON.parse(body),
        userId: this.user._id
      })
      this.events.emit("reload")
    } catch (ex) {
      alert(ex.message)
    }
  }

  close() {
    this.events.emit("addFilter")
  }
}
