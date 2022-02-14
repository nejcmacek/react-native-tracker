import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { FilterlistComponent } from './filterlist/filterlist.component';
import { FilterinfoComponent } from './filterinfo/filterinfo.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserfilterDisplayComponent } from './userfilter-display/userfilter-display.component';
import { EditFilterComponent } from './edit-filter/edit-filter.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddFilterComponent } from './add-filter/add-filter.component';
import { ChangeSettingsComponent } from './change-settings/change-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    FilterlistComponent,
    FilterinfoComponent,
    UserinfoComponent,
    UserfilterDisplayComponent,
    EditFilterComponent,
    EditUserComponent,
    AddUserComponent,
    AddFilterComponent,
    ChangeSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
