import { OnInit } from '@angular/core';

import { AfterViewInit, Component } from '@angular/core';

// amCharts imports
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as echarts from 'echarts';
import * as $ from "jquery";
import * as am5xy from "@amcharts/amcharts5/xy";
import d3 = require('d3');

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}


@Component({
  selector: 'app-vizzu',
  templateUrl: './vizzu.component.html',
  styleUrls: ['./vizzu.component.css']
})
export class VizzuComponent implements OnInit, AfterViewInit {

  showBarChart = true;



  test = true;
  hide() {
    this.test = !this.test
  }




  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.myChart()
    this.myTree()
  }

  myTree() {

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv1", am4plugins_forceDirected.ForceDirectedTree);


    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

    networkSeries.data = [{
      id: '1',
      name: 'Bangladesh',
      value: 1,
      fixed: true,
      color: ("#FA8E15"),
      x: am4core.percent(40),
      y: am4core.percent(40),
      children: [{
        name: 'Bangladesh', value: 1
      }, {
        name: 'Bangladesh', value: 1
      }, {
        name: 'Bangladesh', value: 1
      }, {
        name: 'Bangladesh', value: 1
      }, {
        name: 'Bangladesh', value: 1
      }, {
        name: 'Bangladesh', value: 1
      }]
    }, {
      id: '2',
      name: 'Australia',
      color: ("#00306C"),
      fixed: true,
      value: 1,
      x: am4core.percent(50),
      y: am4core.percent(25),
      children: [{
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Australia', value: 1
      }, {
        name: 'Brazil', value: 1
      }, {
        name: 'Brazil', value: 1
      }, {
        name: 'Brazil', value: 1
      }, {
        name: 'Brazil', value: 1
      }, {
        name: 'Brazil', value: 1
      }, {
        name: 'canada', value: 1
      }, {
        name: 'canada', value: 1

      }]
    }, {
      id: '3',
      name: 'Rawada',
      color: ("#4A92EC"),
      fixed: true,
      value: 1,
      x: am4core.percent(50),
      y: am4core.percent(50),
      children: [{
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }, {
        name: 'India', value: 1
      }
      ]
    }, {
      id: '4',
      name: 'colombia',
      color: ("#4AEC9B"),
      fixed: true,
      value: 1,
      x: am4core.percent(60),
      y: am4core.percent(40),
      children: [{
        name: 'colombia', value: 1
      }, {
        name: 'colombia', value: 1
      }, {
        name: 'colombia', value: 1
      }, {
        name: 'colombia', value: 1
      }, {
        name: 'colombia', value: 1
      }, {
        name: 'colombia', value: 1
      }]

    }, {
      name: '',
      fixed: true,
      value: 1,
      x: am4core.percent(150),
      y: am4core.percent(40),
      children: [{
        name: '', value: 3
      }]

    }];

    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "id";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.fixed = "fixed";
    networkSeries.dataFields.color = "color";
    // networkSeries.nodes.template.width = 100;

    networkSeries.nodes.template.propertyFields.x = "x";
    networkSeries.nodes.template.propertyFields.y = "y";

    networkSeries.nodes.template.tooltipText = "{name}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 8;
    // networkSeries.maxLevels = 3;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;
    networkSeries.links.template.distance = -1;
    networkSeries.links.template.disabled = true;
    networkSeries.nodes.template.interactionsEnabled = false;

    networkSeries.nodes.template.strokeWidth = 0;
    networkSeries.links.template.strokeOpacity = 0;
    networkSeries.nodes.template.label.fill = am4core.color("#fff");

    networkSeries.nodes.template.outerCircle.strokeOpacity = 0;
    networkSeries.nodes.template.outerCircle.fillOpacity = 0;

    var title = chart.titles.create();
    title.text = "Health Governance";
    title.fontSize = 25;
    title.marginBottom = 30;
  }

  myChart() {


    /*************AmChart */

    let root = am5.Root.new("chartdiv");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart: any = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
    }));



    let data = [{
      'text': 'Australia',
      "year": "2012",
      "income": 98,
      "columnConfig": {
        fill: am5.color(0x00306C),
      }
    }, {
      'text': 'Rawada',
      "year": "2011",
      "income": 73,
      "columnConfig": {
        fill: am5.color(0x4A92EC),
      }
    }, {
      'text': 'colombia',
      "year": "2010",
      "income": 50,
      "columnConfig": {
        fill: am5.color(0x4AEC9B),
      }
    }, {
      'text': 'bangladesh',
      "year": "2009",
      "income": 25,
      "columnConfig": {
        fill: am5.color(0xFA8E15),
      }
    }];


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererY.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
      })
    );

  
    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {

        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "income",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "income",
      categoryYField: "year",
      sequencedInterpolation: true,
      tooltip: am5.Tooltip.new(root, {
        labelText: "[bold]{text}"
      }),

    }));

    series1.columns.template.setAll({
      height: am5.percent(70),
      templateField: 'columnConfig',
      strokeOpacity: 0
    });

    series1.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(root, {
          centerY: am5.p50,
          text: "{valueX}%",
          populateText: true
        })
      });
    });

    series1.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p100,
          centerY: am5.p50,
          text: "{text}",
          fill: am5.color(0xffffff),
          populateText: true
        })
      });
    });

   

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // series1.labelsContainer.setAll("width", 100);
    // series1.ticks.template.setAll("location", 0.6);

    series1.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series1.appear();
    chart.appear(1000, 100);  
  }


}
