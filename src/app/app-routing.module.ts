import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'list',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'calendar',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: 'ingredients',
    component: ContentLayoutComponent,
    loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule)
  },
  {
    path: 'login',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
