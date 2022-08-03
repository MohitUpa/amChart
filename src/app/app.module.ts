import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as $ from 'jquery';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmChartComponent } from './am-chart/am-chart.component';
import { TestComponent } from './test/test.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HealthCartComponent } from './health-cart/health-cart.component';
import { HealthEcartComponent } from './health-ecart/health-ecart.component';
import { NewMapComponent } from './new-map/new-map.component';
import { NdhsMapComponent } from './ndhs-map/ndhs-map.component';
import { VizzuComponent } from './vizzu/vizzu.component';
import { ObjectChangeComponent } from './object-change/object-change.component';

@NgModule({
  declarations: [
    AppComponent,
    AmChartComponent,
    TestComponent,
    PieChartComponent,
    HealthCartComponent,
    HealthEcartComponent,
    NewMapComponent,
    NdhsMapComponent,
    VizzuComponent,
    ObjectChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
