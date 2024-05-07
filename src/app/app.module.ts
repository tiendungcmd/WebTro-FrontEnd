import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { DangTinComponent } from './home/dang-tin/dang-tin.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountService } from './service/account.service';
import { appInitializer } from './helpers/appInitializer';
import { ProfileComponent } from './home/profile/profile.component';
import { QuanLyBaiDangComponent } from './admin/quan-ly-bai-dang/quan-ly-bai-dang.component';
import { TableModule } from 'primeng/table';
import { BaiDangComponent } from './home/bai-dang/bai-dang.component';
import { QuanLyBaiDangUserComponent } from './home/quan-ly-bai-dang-user/quan-ly-bai-dang-user.component';
import { QuanLyTaiKhoanComponent } from './admin/quan-ly-tai-khoan/quan-ly-tai-khoan.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    NavComponent,
    DangTinComponent,
    RegisterComponent,
    BannerComponent,
    ProfileComponent,
    QuanLyBaiDangComponent,
    BaiDangComponent,
    QuanLyBaiDangUserComponent,
    QuanLyTaiKhoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ AccountService ],
      useFactory: appInitializer,}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
