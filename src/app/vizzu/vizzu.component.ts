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
    this. myTree()
  }

  myTree() {

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv1", am4plugins_forceDirected.ForceDirectedTree);
    chart.legend = new am4charts.Legend();

    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

    networkSeries.data = [{
      name: 'Flora',
      value: 1,
      fixed: true,
      x: am4core.percent(40),
      y: am4core.percent(40),
      children: [{
        name: 'Black Tea', value: 1
      }, {
          name: 'Chamomile', value: 1
        }, {
          name: 'Rose', value: 1
        }, {
          name: 'Jasmine', value: 1
        }, {
          name: 'Rose', value: 1
        }, {
          name: 'Jasmine', value: 1
        }]
    }, {
      name: 'Fruity',
      fixed: true,
      value: 1,
      x: am4core.percent(50),
      y: am4core.percent(25),
      children: [{
          name: 'Blackberry', value: 1
        }, {
          name: 'Raspberry', value: 1
        }, {
          name: 'Blueberry', value: 1
        }, {
          name: 'Strawberry', value: 1
        }, {
          name: 'Coconut', value: 1
        }, {
          name: 'Cherry', value: 1
        }, {
          name: 'Pomegranate', value: 1
        }, {
          name: 'Pineapple', value: 1
        }, {
          name: 'Grape', value: 1
        }, {
          name: 'Apple', value: 1
        }, {
          name: 'Peach', value: 1
        }, {
          name: 'Pear', value: 1
        }, {
          name: 'Orange', value: 1
        }, {
          name: 'Lemon', value: 1
        }, {
          name: 'Lime', value: 1
        
      }]
    }, {
      name: 'Other',
      fixed: true,
       value: 1,
      x: am4core.percent(50),
      y: am4core.percent(50),
      children: [{
          name: 'Stale', value: 1
        }, {
          name: 'Cardboard', value: 1
        }, {
          name: 'Papery', value: 1
        }, {
          name: 'Woody', value: 1
        }, {
          name: 'Moldy/Damp', value: 1
        }, {
          name: 'Musty/Dusty', value: 1
        }, {
          name: 'Musty/Earthy', value: 1
        }, {
          name: 'Animalic', value: 1
        }, {
          name: 'Meaty Brothy', value: 1
        }, {
          name: 'Phenolic', value: 1
        }, {
          name: 'Phenolic', value: 1
        }, {
          name: 'Phenolic', value: 1
        }
        ]
    }, {
      name: 'Roasted',
      fixed: true,
      value: 1,
      x: am4core.percent(60),
      y: am4core.percent(40),
      children: [{
        name: 'Pipe Tobacco', value: 1
      }, {
        name: 'Tobacco', value: 1
      }, {
          name: 'Acrid', value: 1
        }, {
          name: 'Ashy', value: 1
        }, {
          name: 'Smoky', value: 1
        }, {
          name: 'Brown, Roast', value: 1
      }]

    },{
      name: 'Roasted',
      fixed: true,
      value: 1,
      x: am4core.percent(150),
      y: am4core.percent(40),
      children: [{
        name: 'Pipe Tobacco', value: 4
      }]

    }];

    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.fixed = "fixed";

    networkSeries.nodes.template.propertyFields.x = "x";
    networkSeries.nodes.template.propertyFields.y = "y";

    networkSeries.nodes.template.tooltipText = "{name}";
    networkSeries.nodes.template.fillOpacity = 1;
     // networkSeries.nodes.template.

    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 8;
    // networkSeries.maxLevels = 3;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;
    networkSeries.links.template.distance = 0
    networkSeries.links.template.disabled = true; 

    networkSeries.links.template.strokeWidth = 5;
    networkSeries.links.template.strokeOpacity = 1;

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


    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50,
    }))

    let data = [{
      "year": "2005",
      "income": 98,
      "columnConfig": {
        fill: am5.color(0x00306C),
      }
    }, {
      "year": "2006",
      "income": 73,
      "columnConfig": {
        fill: am5.color(0x4A92EC),
      }
    }, {
      "year": "2007",
      "income": 50,
      "columnConfig": {
        fill: am5.color(0x4AEC9B),
      }
    }, {
      "year": "2008",
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
          cellEndLocation: 0.9
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
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
        labelText: "[bold]{name}"
      }),

    }));

    series1.columns.template.setAll({
      height: am5.percent(70),
      templateField: 'columnConfig',
      strokeOpacity: 0
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);


    series1.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series1.appear();
    chart.appear(1000, 100);



}


}
