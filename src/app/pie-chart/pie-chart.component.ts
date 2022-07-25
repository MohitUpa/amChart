import { AfterViewInit, Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import { Router } from '@angular/router';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit, OnInit {

  ngOnInit(): void {

  }

  ngAfterViewInit() {

      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create("chartdiv", am4charts.PieChart3D);
      for(var i=0; i<3; i++) {
        let chart = am4core.create("chartdiv"+i, am4charts.PieChart3D);        
      

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.legend = new am4charts.Legend();

      chart.data = [
        {
          country: "Readiness",
          litres: 501.9
        },
        {
          country: "Avaliability",
          litres: 301.9
        },
        {
          litres: 201.1
        }
      ];




      chart.innerRadius = 100;

      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.category = "country";

      series.colors.list = ["#008797", "#4DFFAE", "#DCDCDC"].map(function (color) {
        return new (am4core.color as any)(color);
      });

      var label = series.createChild(am4core.Label);
      label.text = '65%';
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'middle';
      label.fontSize = 40;

      // series.dataFields.value = "value";
      // series.dataFields.category = "category";
      // series.alignLabels = false;

      series.ticks.template.events.on("ready", hideSmall);
      series.ticks.template.events.on("visibilitychanged", hideSmall);
      series.labels.template.events.on("ready", hideSmall);
      series.labels.template.events.on("visibilitychanged", hideSmall);
     

      function hideSmall(ev: any) {
        if (ev.target.dataItem.values.value.percent < 21) {
          ev.target.hide();
        }
        else {
          ev.target.show();
        }
      }

      series.labels.template.text = "{country}";
      console.log(chart.data[2]);

      series.slices.template.tooltipText = "{category}";
      console.log(series);
    }
  }
}
