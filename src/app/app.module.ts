import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "./api.service";
import { MatSelectModule } from "@angular/material/select";
import {InfiniteScrollDirective} from "./infinite-scroll.directive";

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
