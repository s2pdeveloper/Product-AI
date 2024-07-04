import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotpassComponent } from './views/forgotpass/forgotpass.component';
import { ChangepwdComponent } from './views/changepwd/changepwd.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: 'forgot-pwd',
    component: ForgotpassComponent,
    data: {
      title: 'Forgot Password Page',
    },
  },
  {
    path: 'change-pwd',
    component: ChangepwdComponent,
    data: {
      title: 'Change Password Page',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin-layout/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
     
      {
        path: 'notification',
        loadChildren: () =>
          import('./admin-layout/notification/notification.module').then(
            (m) => m.NotificationModule
          ),
      },
      {
        path: 'studentAchievement',
        loadChildren: () =>
          import('./admin-layout/student-achievement/student-achievement.module').then(
            (m) => m.StudentAchievementModule
          ),
      },
      {
        path: 'title',
        loadChildren: () =>
          import('./admin-layout/title/title.module').then(
            (m) => m.TitleModule
          ),
      },
      {
        path: 'aboutUs',
        loadChildren: () =>
          import('./admin-layout/about-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./admin-layout/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./admin-layout/gallery/gallery.module').then(
            (m) => m.GalleryModule
          ),
      },
      {
        path: 'testimonial',
        loadChildren: () =>
          import('./admin-layout/testimonial/testimonial.module').then(
            (m) => m.TestimonialModule
          ),
      },
     
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
