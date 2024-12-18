import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { FormularioComponent } from 'src/app/pages/two-factor/formulario/formulario.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from 'src/app/pages/change-password/change-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    {path: 'two-factor', component: FormularioComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'unauthorized', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
    }]},
 
];
