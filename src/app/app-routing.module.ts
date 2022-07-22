import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmChartComponent } from './am-chart/am-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'map', component: AmChartComponent },  
  { path: 'test', component: TestComponent } , 
  { path: 'pie-chart', component: PieChartComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
