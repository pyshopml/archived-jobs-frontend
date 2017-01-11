import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../app.auth';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FirebaseModule, FirebaseApp } from '../firebase';
import { ROUTES } from '../app.routes';
import { MaterialModule } from '@angular/material';
import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';

import { Header } from './components/header';

import {
    NgModule,
    ApplicationRef
} from '@angular/core';

@NgModule({
  declarations: [
    Header
  ],
    exports: [
        Header
    ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
      MaterialModule.forRoot(),
    CommonModule
  ],
  providers: [
      AuthService
  ]
})

export class ElementsModule {}
