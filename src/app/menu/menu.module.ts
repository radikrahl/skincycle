import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { FixedBackgroundComponent } from "../shared/components/fixed-background/fixed-background.component";
import { SharedModule } from "../shared/shared.module";
import { MenuComponent } from "./pages/menu.component";

const routes: Route[] = [{ path: '', component: MenuComponent }];

@NgModule({
  declarations: [
    MenuComponent,
    FixedBackgroundComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class MenuModule {}
