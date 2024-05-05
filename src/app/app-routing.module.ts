import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DangTinComponent } from './home/dang-tin/dang-tin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './home/profile/profile.component';
import { QuanLyBaiDangComponent } from './admin/quan-ly-bai-dang/quan-ly-bai-dang.component';
import { BaiDangComponent } from './home/bai-dang/bai-dang.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
   // component: HomeComponent,
    runGuardsAndResolvers: 'always',
    canActivate:[AuthGuard],
    children:[
      {
        path: 'dang-tin',
        component: DangTinComponent,
      },
      {
        path: 'tin-tuc',
        component: DangTinComponent,
      },
      {
        path: 'trang-ca-nhan',
        component: ProfileComponent,
      },
      {
        path: 'bai-dang/:id',
        component: BaiDangComponent,
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    children:[
      {
        path: 'quan-ly-bai-dang',
        component: QuanLyBaiDangComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
