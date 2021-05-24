import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";

import { ApiService } from "./api.service";
import { People } from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data?: People[];
  next?: string;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPeople().subscribe(data => {
      this.data = data.results;
      this.next = data.next;
    });
  }

  loadData() {
    if (this?.next) {
      this.api.getPeople(this.next).subscribe(data => {
        this.data = this.data?.concat(data.results);
        this.next = data.next;
      })
    }
  }

  onSelect(data: MatSelectChange) {
    this.api.loadFullData(data.value).subscribe(data => data);
  }
}
