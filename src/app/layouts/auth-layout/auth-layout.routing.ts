import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { FormularioComponent } from 'src/app/pages/two-factor/formulario/formulario.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    {path: 'two-factor', component: FormularioComponent},
    {path: 'unauthorized', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
    }]}
];
