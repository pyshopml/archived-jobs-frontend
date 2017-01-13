import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { VacanciesService } from '../services/vacancies.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacancy-creation',
  templateUrl: './vacancy-creation.component.html',
  styleUrls: ['./vacancy-creation.component.css'],
  providers: [FormBuilder]
})
export class VacancyCreationComponent {
  public vacancyForm = this.fb.group({
    // validation
    title: ['', [Validators.minLength(6), Validators.required]],
    description: ['', Validators.required]
  });
  @ViewChild('titleRef') titleRef;
  @ViewChild('descriptionRef') descriptionRef;

  constructor(
    private router: Router,
    private vacanciesService: VacanciesService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    alert('done');
    this.vacanciesService.addVacancy(
      {
        id: null,
        title: <string>this.titleRef.nativeElement.value,
        description: <string>this.descriptionRef.nativeElement.value
      }
    ).catch(err => { throw err; });
  }
}
