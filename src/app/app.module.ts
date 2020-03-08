import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { RouterModule, Routes } from '@angular/router';
import { VersionOneComponent } from './version-one/version-one.component';
import { VersionTwoComponent } from './version-two/version-two.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { VersionTwoModalComponent } from './version-two/version-two-modal/version-two-modal.component';

const appRoutes: Routes = [
  { path: 'version-one', component: VersionOneComponent },
  { path: 'version-two', component: VersionTwoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    VersionOneComponent,
    VersionTwoComponent,
    VersionTwoModalComponent
    // MatPaginator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes),
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    VersionTwoModalComponent
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
