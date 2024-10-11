import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SubdivisionDataDisplayComponent } from './subdivision-data-display/subdivision-data-display.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubdivisionDataDisplayComponent,
    PaginationComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
