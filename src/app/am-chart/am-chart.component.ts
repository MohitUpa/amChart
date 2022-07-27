import { AfterViewInit, Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4charts from '@amcharts/amcharts4/charts';
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import { Router } from '@angular/router';


@Component({
  selector: 'app-am-chart',
  templateUrl: './am-chart.component.html',
  styleUrls: ['./am-chart.component.css']
})
export class AmChartComponent implements AfterViewInit {
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

    // Chart code goes in here
    // this.browserOnly(() => {
    let root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "translateY",
        projection: am5map.geoMercator()
      })
    );

    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40
      })
    );


    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      // fill: am5.color(0xE8FFFE),
      fillOpacity: 0,
      strokeOpacity: 0
    });


    // Add background polygon
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
       fill: am5.color(0x22ff55),
      stroke: am5.color(0xffffff),
    });




    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );

    // Create line series for trajectory lines
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.3
    });

    //create background series
    let colors = am5.ColorSet.new(root, {});
    let worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    }));


    

    worldSeries.mapPolygons.template.setAll({
      interactive: true,
      fill: am5.color(0xD2D2D2),
      tooltipText: "{name}",
      templateField: "polygonSettings"
    });

    worldSeries.data.setAll([{
      id: "US",
      polygonSettings: {
        fill: am5.color(0x7EBDBA)
      }
    }, {
      id: "CA",
      polygonSettings: {
        fill: am5.color(0x7EBDBA)
      }
    }, {
      id: "IN",
      polygonSettings: {
        fill: am5.color(0x7EBDBA)
      }
    }, {
      id: "MX",
      polygonSettings: {
        fill: am5.color(0x7EBDBA)
      }
    }])


    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(() => {
      let container = am5.Container.new(root, {});

      let circle = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: am5.color(0xFF7558),
          strokeOpacity: 0,
        })
      );

      let circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: am5.color(0xFF7558),
          strokeOpacity: 0,
          tooltip: am5.Tooltip.new(root, {
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            paddingTop: 0
          }),
          tooltipHTML: `
          <div style="text-align:center; background:#fff; padding:10px; width: 120px;color:grey; border-radius:3px;">
          <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
          {title}</div>
          `
        })
      );


      circle.events.on("click", () => {
        this.toDiffrentPage()
      });
      circle2.events.on("click", () => {
        this.toDiffrentPage()
      });

      circle2.events.on("pointerover", () => {
        circle.animate({
          key: "scale",
          from: 1,
          to: 5,
          duration: 900,
          loops: Infinity
        });
        circle.animate({
          key: "opacity",
          from: 1,
          to: 0,
          duration: 900,
          loops: Infinity,
        });
      })

      circle2.events.on("pointerout", () => {
        circle.animate({
          key: "scale",
          from: 1,
          to: 5,
          duration: 0,
          loops: Infinity
        });
        circle.animate({
          key: "opacity",
          from: 1,
          to: 0,
          duration: 0,
          loops: Infinity
        });
      })


      return am5.Bullet.new(root, {
        sprite: container
      });
    });

    //background color





    let cities = [
      {
        title: "Brussels",
        latitude: 50.8371,
        longitude: 4.3676,
        flag: 'https://image.shutterstock.com/image-vector/belgium-flag-260nw-386009581.jpg',
      },
      {
        title: "Copenhagen",
        latitude: 55.6763,
        longitude: 12.5681,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/640px-Flag_of_Denmark.svg.png',
      },
      {
        title: "Paris",
        latitude: 48.8567,
        longitude: 2.351,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
      },
      {
        title: "Reykjavik",
        latitude: 64.1353,
        longitude: -21.8952,
        flag: 'https://cdn.britannica.com/85/1485-004-94C3DEDA/Flag-Iceland.jpg',
      },
      {
        title: "Moscow",
        latitude: 55.7558,
        longitude: 37.6176,
        flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
      },
      {
        title: "Madrid",
        latitude: 40.4167,
        longitude: -3.7033,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
      },
      {
        title: "London",
        latitude: 51.5002,
        longitude: -0.1262,
        url: "http://www.google.co.uk",
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
      },
      {
        title: "Peking",
        latitude: 39.9056,
        longitude: 116.3958,
        flag: 'https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg',
      },
      {
        title: "New Delhi",
        latitude: 28.6353,
        longitude: 77.225,
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png',
      },
      {
        title: "Tokyo",
        latitude: 35.6785,
        longitude: 139.6823,
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
        url: "http://www.google.co.jp"
      },
      {
        title: "Ankara",
        latitude: 39.9439,
        longitude: 32.856,
        flag: 'https://cdn.pixabay.com/photo/2021/11/14/14/26/turkey-6794740_960_720.png',
      },
      {
        title: "Buenos Aires",
        latitude: -34.6118,
        longitude: -58.4173,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Bandera_de_la_Provincia_de_Buenos_Aires.svg/1200px-Bandera_de_la_Provincia_de_Buenos_Aires.svg.png',
      },
      {
        title: "Brasilia",
        latitude: -15.7801,
        longitude: -47.9292,
        flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png',
      },
      {
        title: "Ottawa",
        latitude: 45.4235,
        longitude: -75.6979,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Ottawa%2C_Ontario.svg/1200px-Flag_of_Ottawa%2C_Ontario.svg.png',
      },
      {
        title: "Washington",
        latitude: 38.8921,
        longitude: -77.0241,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/255px-Flag_of_Washington.svg.png',
      },
      {
        title: "Kinshasa",
        latitude: -4.3369,
        longitude: 15.3271,
        flag: 'https://cdn.britannica.com/94/7194-004-5FA84A72/Flag-Democratic-Republic-of-the-Congo.jpg',
      },
      {
        title: "Cairo",
        latitude: 30.0571,
        longitude: 31.2272,
        flag: 'https://flagpedia.net/data/flags/w1600/eg.png',
      },
      {
        title: "Pretoria",
        latitude: -25.7463,
        longitude: 28.1876,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Pretoria%2C_South_Africa.svg/300px-Flag_of_Pretoria%2C_South_Africa.svg.png',
      }
    ];

    for (var i = 0; i < cities.length; i++) {
      let city = cities[i];
      addCity(city.longitude, city.latitude, city.title, city.flag);
    }

  

    function addCity(longitude: number, latitude: number, title: string, flag: string) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
        flag: flag
      });
    }

    // Make stuff animate on load
    chart.appear(1000, 100);
    // });
  }

  // for routing
  public toDiffrentPage() {
    this.router.navigate(['test']);
  }
}

