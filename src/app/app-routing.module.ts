import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VacancyCreationComponent } from './vacancy-creation/vacancy-creation.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'vacancies', component: VacanciesComponent},
  { path: 'vacancy/:id', component: VacancyDetailComponent},
  { path: 'new',    component: VacancyCreationComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
