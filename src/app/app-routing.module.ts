// import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products/products.component";




const routes: Routes = [
  //{ path: "", redirectTo: "home", pathMatch: "full" },
  //{ path: "home", component: HomeComponent },
  {path: 'products', component: ProductsComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {}