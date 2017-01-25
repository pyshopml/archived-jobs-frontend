import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Vacancy, INewVacancy } from '../vacancy';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VacanciesService {
  constructor(private http: Http) { }
  getVacancies(): Promise<Vacancy[]> {
    // returns list of vacancies
    return this.http.get('/api/VACANCIES')
      .toPromise()
      .then((response) => {
        return response.json().data.map((item: Object) => new Vacancy(item));
      });
  }
  getVacancy(id: number): Promise<any> {
    // search vacancy by id
    return this.http.get('/api/VACANCIES/' + id)
      .toPromise()
      .then( response => new Vacancy( response.json().data) );
  }
  addVacancy(vacancy: INewVacancy): Promise<any> {
    return this.getVacancies().then((items: Vacancy[]) => {
      //
      vacancy.id = items.length + 1;
      const headers = new Headers({
        'Content-type': 'application/json'
      });
      return this.http
        .post('/api/VACANCIES/', JSON.stringify((vacancy)), { headers: headers })
        .toPromise();
      //
    });
  }
}
