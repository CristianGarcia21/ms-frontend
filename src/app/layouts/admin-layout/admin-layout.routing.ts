import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'clients', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/clients/clients.module').then(m=>m.ClientsModule)
    }]},
    { path: 'contracts', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/contracts/contracts.module').then(m=>m.ContractsModule)
    }]},
    { path: 'departaments', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/departament/departament.module').then(m=>m.DepartamentModule)
    }]},
    { path: 'municipalities', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/municipality/municipality.module').then(m=>m.MunicipalityModule)
    }]},
    { path: 'addresses', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/address/address.module').then(m=>m.AddressModule)
    }]},
    {path: 'vehicles', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m=>m.VehiclesModule)
    }]},
    {path: 'routes', children: [{
      path: '',
      loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
    }]},
    {path: 'lots', children: [{
      path: '',
      loadChildren: () => import('src/app/pages/lots/lots.module').then(m => m.LotsModule)
    }]},
    {path: 'stages', children: [{
      path: '',
      loadChildren: () => import('src/app/pages/stages/stages.module').then(m => m.StagesModule)
    }]},
    { path: 'products', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/products/products.module').then(m=>m.ProductsModule)
    }]},
    { path: 'categories', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/categories/categories.module').then(m=>m.CategoriesModule)
    }]},
    { path: 'product_category', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/product-category/product-category.module').then(m => m.ProductCategoryModule)
    }]},
    { path: 'companies', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/companies/companies.module').then(m=>m.CompaniesModule)
    }]},
    { path: 'distribution_centers', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/distribution-center/distribution-center.module').then(m=>m.DistributionCenterModule)
    }]},
    { path: 'insurances', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/insurances/insurances.module').then(m=>m.InsurancesModule)
    }]},
    { path: 'shifts', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/shift/shift.module').then(m=>m.ShiftModule)
    }]},
    { path: 'restaurants', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
    }]},
    { path: 'hotels', children:[{
      path: '',
      loadChildren: () => import('src/app/pages/hotel/hotel.module').then(m => m.HotelModule)
    }]}
];
