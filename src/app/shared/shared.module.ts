import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: []
})
export class SharedModule {
}
