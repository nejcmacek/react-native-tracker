import { changeSettings, getSettings } from '../../scripts/rest';

import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-change-settings',
  templateUrl: './change-settings.component.html',
  styleUrls: ['./change-settings.component.css']
})
export class ChangeSettingsComponent implements OnInit {

  @Input()
  events: EventEmitter
  enabled = true
  interval = 10
  loading = true

  constructor() { }

  async ngOnInit() {
    try {
      const res = await getSettings()
      console.log(res)
      this.enabled = res.enabled
      this.interval = res.interval
      this.loading = false
    } catch (ex) {
      alert(ex)
      this.close()
    }
  }

  close() {
    this.events.emit("changeSettings")
  }

  async save() {
    try {
      await changeSettings({
        enabled: this.enabled,
        interval: this.interval
      })
      this.close()
    } catch (ex) {
      alert(ex.message)
    }
  }

}
