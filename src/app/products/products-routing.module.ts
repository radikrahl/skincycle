import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';

const routes: Route[] = [{ path: '', component: ListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
