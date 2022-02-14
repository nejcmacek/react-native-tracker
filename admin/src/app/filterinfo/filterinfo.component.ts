import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from "events";

@Component({
  selector: 'app-filterinfo',
  templateUrl: './filterinfo.component.html',
  styleUrls: ['./filterinfo.component.css']
})
export class FilterinfoComponent {

  @Input()
  filter: Filter
  @Input()
  events: EventEmitter

  constructor() { }

  onChange() {
    this.events.emit("editFilter", this.filter)
  }

  getBody() {
    return this.filter.body && JSON.stringify(this.filter.body) ||"null"
  }

}
