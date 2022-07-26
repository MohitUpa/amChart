import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmChartComponent } from './am-chart/am-chart.component';
import { HealthCartComponent } from './health-cart/health-cart.component';
import { HealthEcartComponent } from './health-ecart/health-ecart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'map', component: AmChartComponent },  
  { path: 'test', component: TestComponent } , 
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'health-chart', component: HealthCartComponent },  
  { path: 'health-echart', component: HealthEcartComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
