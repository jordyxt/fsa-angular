import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';
import {CrudComponent} from '@shared/components/crud.component';


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
    ReadDetailDialogComponent,
    UppercaseWords,
    CrudComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReadDetailDialogComponent,
    UppercaseWords,
    CrudComponent
  ],
  entryComponents: [
    ReadDetailDialogComponent
  ]
})
export class SharedModule {
}
