import { AfterViewInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4charts from '@amcharts/amcharts4/charts';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Router } from '@angular/router';

import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";


@Component({
  selector: 'app-health-cart',
  templateUrl: './health-cart.component.html',
  styleUrls: ['./health-cart.component.css']
})
export class HealthCartComponent implements AfterViewInit {
  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone, private router: Router) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {

    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let data = {
      name: "Root",
      value: 0,
      children: [
        {
          name: "Health & It",
          linkWith: ["Digital Health", "Present1"],
          children: [
            {
              name: "Prospective",
              children: [
                {
                  name: "A1",
                  children: [
                    { name: "A11", value: 1 },
                    { name: "A12", value: 1 },
                    { name: "A13", value: 1 },
                    { name: "A14", value: 1 },
                    { name: "A15", value: 1 }
                  ]
                },
                {
                  name: "A2",
                  children: [
                    { name: "A21", value: 1 },
                    { name: "A22", value: 1 },
                    { name: "A23", value: 1 },
                    { name: "A24", value: 1 },
                    { name: "A25", value: 1 }
                  ]
                },
              ]
            },
            {
              name: "Present",
              children: [
                {
                  name: "B1",
                  children: [
                    { name: "B11", value: 1 },
                    { name: "B12", value: 1 },
                    { name: "B13", value: 1 },
                    { name: "B14", value: 1 },
                    { name: "B15", value: 1 }
                  ]
                },
                {
                  name: "B2",
                  children: [
                    { name: "B21", value: 1 },
                    { name: "B22", value: 1 },
                    { name: "B23", value: 1 },
                    { name: "B24", value: 1 },
                    { name: "B25", value: 1 }
                  ]
                },
              ]
            }
          ]
        },


        {
          name: "Digital Health",
          children: [
            {
              name: "Prospective",
              children: [
                {
                  name: "F1",
                  children: [
                    { name: "F11", value: 1 },
                    { name: "F12", value: 1 },
                    { name: "F13", value: 1 },
                    { name: "F14", value: 1 },
                    { name: "F15", value: 1 }
                  ]
                },
                {
                  name: "F2",
                  children: [
                    { name: "F21", value: 1 },
                    { name: "F22", value: 1 },
                    { name: "F23", value: 1 },
                    { name: "F24", value: 1 },
                    { name: "F25", value: 1 }
                  ]
                },
              ]
            },
            {
              name: "Present1",
              children: [
                {
                  name: "H1",
                  children: [
                    { name: "H11", value: 1 },
                    { name: "H12", value: 1 },
                    { name: "H13", value: 1 },
                    { name: "H14", value: 1 },
                    { name: "H15", value: 1 }
                  ]
                },
                {
                  name: "H2",
                  children: [
                    { name: "H21", value: 1 },
                    { name: "H22", value: 1 },
                    { name: "H23", value: 1 },
                    { name: "H24", value: 1 },
                    { name: "H25", value: 1 }
                  ]
                },
              ]
            }
          ]
        }
      ]
    };

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    let series = container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        singleBranchOnly: false,
        downDepth: 0,
        topDepth: 0,
        maxRadius: 40,
        minRadius: 8,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        idField: "name",
        linkWithStrength: 0,
        manyBodyStrength: -15,
        centerStrength: 0.5,
      
      })
    );

    // series.get("colors").set("step", 2);
    

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    // Make stuff animate on load
    series.appear(1000, 100);


  }


}
