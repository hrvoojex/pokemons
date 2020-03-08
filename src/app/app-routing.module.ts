import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VersionOneComponent } from './version-one/version-one.component';
import { VersionTwoComponent } from './version-two/version-two.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'versionOne', component: VersionOneComponent },
  { path: 'versionTwo', component: VersionTwoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
