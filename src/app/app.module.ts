import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

// backend substitution
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacancyCreationComponent } from './vacancy-creation/vacancy-creation.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';

import { AppRoutingModule } from './app-routing.module'
import { VacanciesService } from './services/vacancies.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    VacanciesComponent,
    VacancyCreationComponent,
    VacancyDetailComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
    ReactiveFormsModule,
    
    InMemoryWebApiModule.forRoot(InMemoryDataService), // backend substitution
  ],
  providers: [
    VacanciesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
