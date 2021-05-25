import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { take } from "rxjs/operators";

import { ApiService } from "./api.service";
import { FullPeopleData, People } from "./interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private next?: string;
  data?: People[];
  fullData?: FullPeopleData;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPeople().subscribe(data => {
      this.data = data.results;
      this.next = data.next;
    });
  }

  loadNextData() {
    if (this?.next) {
      this.api.getPeople(this.next).subscribe(data => {
        this.data = this.data?.concat(data.results);
        this.next = data.next;
      })
    }
  }

  onSelect(data: MatSelectChange) {
    this.api.loadFullData(data.value)
      .pipe(take(1))
      .subscribe(data => this.fullData = data as FullPeopleData);
  }

  formatName(key: string) {
    return key.replace('_', ' ');
  }
}
