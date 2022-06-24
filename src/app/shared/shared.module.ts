import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';
import {ReadDetailDialogComponent} from '@shared/dialogs/read-detail.dialog.component';
import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';
import {CrudComponent} from '@shared/components/crud.component';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {MenuComponent} from '@shared/components/menu.component';
import {RouterModule} from '@angular/router';
import {GenreFilterComponent} from '@shared/components/genre-filter.component';
import {HttpService} from '@core/services/http.service';
import {WorkerRoleFilterComponent} from '@shared/components/worker-role-filter.component';
import {WorkerFilterComponent} from '@shared/components/worker-filter.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ReadDetailDialogComponent,
    UppercaseWords,
    CrudComponent,
    CancelYesDialogComponent,
    MenuComponent,
    GenreFilterComponent,
    WorkerRoleFilterComponent,
    WorkerFilterComponent
  ],
  providers: [HttpService],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReadDetailDialogComponent,
    UppercaseWords,
    CrudComponent,
    CancelYesDialogComponent,
    MenuComponent,
    GenreFilterComponent,
    WorkerRoleFilterComponent,
    WorkerFilterComponent
  ],
  entryComponents: [
    ReadDetailDialogComponent,
    CancelYesDialogComponent
  ]
})
export class SharedModule {
}
