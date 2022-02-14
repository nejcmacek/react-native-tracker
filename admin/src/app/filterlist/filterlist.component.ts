import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filterlist',
  templateUrl: './filterlist.component.html',
  styleUrls: ['./filterlist.component.css']
})
export class FilterlistComponent implements OnInit {

  @Input()
  filter: Filter

  constructor() { }

  ngOnInit() {
  }

}
