import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', canActivate:[AuthGuard],  component: DashboardComponent },
    { path: 'user-profile', canActivate:[AuthGuard],   component: UserProfileComponent },
    { path: 'tables',  canActivate:[AuthGuard],    component: TablesComponent },
    { path: 'icons', canActivate:[AuthGuard], component: IconsComponent },
    { path: 'maps',  canActivate:[AuthGuard],   component: MapsComponent },
    { path: 'clients', canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/clients/clients.module').then(m=>m.ClientsModule)
    }]},
    { path: 'contracts', canActivate:[AuthGuard],children:[{
      path: '',
      loadChildren: () => import('src/app/pages/contracts/contracts.module').then(m=>m.ContractsModule)
    }]},
    { path: 'departaments',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/departament/departament.module').then(m=>m.DepartamentModule)
    }]},
    { path: 'municipalities',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/municipality/municipality.module').then(m=>m.MunicipalityModule)
    }]},
    { path: 'addresses',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/address/address.module').then(m=>m.AddressModule)
    }]},
    {path: 'vehicles',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m=>m.VehiclesModule)
    }]},
    {path: 'routes',canActivate:[AuthGuard], children: [{
      path: '',
      loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
    }]},
    {path: 'lots',canActivate:[AuthGuard], children: [{
      path: '',
      loadChildren: () => import('src/app/pages/lots/lots.module').then(m => m.LotsModule)
    }]},
    {path: 'stages',canActivate:[AuthGuard], children: [{
      path: '',
      loadChildren: () => import('src/app/pages/stages/stages.module').then(m => m.StagesModule)
    }]},
    { path: 'products',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/products/products.module').then(m=>m.ProductsModule)
    }]},
    { path: 'categories',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/categories/categories.module').then(m=>m.CategoriesModule)
    }]},
    { path: 'product_category',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/product-category/product-category.module').then(m => m.ProductCategoryModule)
    }]},
    { path: 'companies', canActivate:[AuthGuard],children:[{
      path: '',
      loadChildren: () => import('src/app/pages/companies/companies.module').then(m=>m.CompaniesModule)
    }]},
    { path: 'distribution_centers',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/distribution-center/distribution-center.module').then(m=>m.DistributionCenterModule)
    }]},
    { path: 'insurances',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/insurances/insurances.module').then(m=>m.InsurancesModule)
    }]},
    { path: 'shifts',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/shift/shift.module').then(m=>m.ShiftModule)
    }]},
    { path: 'restaurants',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
    }]},
    { path: 'hotels',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/hotel/hotel.module').then(m => m.HotelModule)
    }]},
    { path: 'users',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/users/users.module').then(m=>m.UsersModule)
    }]},
    { path: 'owners',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/owners/owners.module').then(m=>m.OwnersModule)
    }]},
    { path: 'drivers',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/drivers/drivers.module').then(m=>m.DriversModule)
    }]},
    { path: 'services',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/services/services.module').then(m=>m.ServicesModule)
    }]},
    { path: 'administrators',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m=>m.AdministratorsModule)
    }]},
    { path: 'expenses',canActivate:[AuthGuard], children:[{
      path: '',
      loadChildren: () => import('src/app/pages/expenses/expenses.module').then(m=>m.ExpensesModule)
    }]},
    {
      path: 'natural-person',canActivate:[AuthGuard], children: [{
        path: '',
        loadChildren: () => import('src/app/pages/natural-person/natural-person.module').then(m => m.NaturalPersonModule)
      }]
    },
    {
      path: 'operations', canActivate:[AuthGuard],
      children: [
        {
          path: '',
          loadChildren: () =>  import('src/app/pages/operations/operations.module').then(m => m.OperationsModule)
        }
      ]
    },
    { path: 'vehicle_drivers', canActivate:[AuthGuard],  children:[{
      path: '',
      loadChildren: () => import('src/app/pages/vehicle-drivers/vehicle-drivers.module').then(m=>m.VehicleDriversModule)
    }]},
    { path: 'vehicle_owners',canActivate:[AuthGuard],  children:[{
      path: '',
      loadChildren: () => import('src/app/pages/vehicle-owners/vehicle-owners.module').then(m=>m.VehicleOwnersModule)
    }]},
    { path: 'payments',canActivate:[AuthGuard],  children:[{
      path: '',
      loadChildren: () => import('src/app/pages/payments/payments.module').then(m=>m.PaymentsModule)
    }]},
    { path: 'receipts',canActivate:[AuthGuard],  children:[{
      path: '',
      loadChildren: () => import('src/app/pages/receipts/receipts.module').then(m=>m.ReceiptsModule)
    }]},
    { path: 'chats',canActivate:[AuthGuard],  children:[{
      path: '',
      loadChildren: () => import('src/app/pages/chat/chat.module').then(m=>m.ChatModule)
    }]}
];
