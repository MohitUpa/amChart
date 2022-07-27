import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

@Component({
    selector: 'app-ndhs-map',
    templateUrl: './ndhs-map.component.html',
    styleUrls: ['./ndhs-map.component.css'],
})
export class NdhsMapComponent implements OnInit {
    chart: any;
    pointSeries: any;
    year: any = [];
    countries: any;
    circleProperties: any;
    container: any;
    root: any;
    circle: any;
    bullet: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.countries = [
            {
                title: 'France',
                latitude: 48.8567,
                longitude: 2.351,
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
            },
            {
                title: 'Russia',
                latitude: 55.7558,
                longitude: 37.6176,
                flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
            },
            {
                title: 'Spain',
                latitude: 40.4167,
                longitude: -3.7033,
                flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
            },
            {
                title: 'United Kingdom',
                latitude: 51.5002,
                longitude: -0.1262,
                url: 'http://www.google.co.uk',
                flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
            },
        ];

        // Create root and chart
        this.root = am5.Root.new('chartdiv');

        this.root.setThemes([am5themes_Animated.new(this.root)]);

        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                panX: 'none',
                panY: 'none',
                wheelX: 'none',
                wheelY: 'none',
                projection: am5map.geoMercator(),
            })
        );

        // Create polygon series
        let polygonSeries = this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            })
        );
        console.log(polygonSeries);

        polygonSeries.set('fill', am5.color(0xe6e6e6));
        polygonSeries.set('stroke', am5.color(0xffffff));

        polygonSeries.mapPolygons.template.setAll({
            templateField: 'polygonSettings',
            interactive: true,
            strokeWidth: 2,
        });

        this.pointSeries = this.chart.series.push(
            am5map.MapPointSeries.new(this.root, {})
        );

        this.pointSeries.bullets.push(() => {
            this.container = am5.Container.new(this.root, {});

            let tooltip: any = am5.Tooltip.new(this.root, {
                getFillFromSprite: false,
                paddingBottom: 0,
                paddingRight: 0,
                paddingLeft: 0,
                paddingTop: 0,
                maxWidth: 200,
            });

            // tooltip.get('background').setAll({
            //   fill: am5.color(0xE6E6E6),
            // });

            this.circleProperties = {
                radius: 3,
                tooltipY: 0,
                fill: am5.color(0xff0000),
                strokeWidth: 0,
                strokeOpacity: 0,
                tooltip: tooltip,

                tooltipHTML: `
                <div style="text-align:center; background:#fff; padding:10px;width:100px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); border-radius:4px;">
                <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
                <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
                `,
            };

            this.circle = am5.Circle.new(this.root, this.circleProperties);

            this.container.children.push(this.circle);

            this.circle.events.on('click', () => {
                this.toDiffrentPage();
            });

            this.circle.states.create('hover', {
                radius: 4,
                scale: 2,
                strokeWidth: 3,
                strokeOpacity: 5,
                stroke: am5.color(0xff7b7b),
            });

            return (this.bullet = am5.Bullet.new(this.root, {
                sprite: this.container,
            }));
        });

        let addCountry = (
            longitude: number,
            latitude: number,
            title: string,
            flag: string
        ) => {
            this.pointSeries.data.push({
                geometry: { type: 'Point', coordinates: [longitude, latitude] },
                title: title,
                flag: flag,
            });
        };
        for (var i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            addCountry(
                country.longitude,
                country.latitude,
                country.title,
                country.flag
            );
        }
    }

    handleClick(ev: any) {
        if (!this.year.includes(ev.target.value)) {
            this.year.push(ev.target.value);
        } else {
            this.year.splice(this.year.indexOf(ev.target.value), 1);
        }

        this.pointSeries.bulletsContainer.children.clear();

        // this.chart.series.removeIndex(
        //   this.chart.series.indexOf(this.pointSeries)
        // ).dispose();

        // if (this.chart.series.length > 1) {
        //   this.chart.series.removeIndex(1);
        //   console.log(this.chart.series);
        // }

        if (this.year.includes('2022') && this.year.includes('2021')) {



            this.countries = [
                {
                    title: 'India',
                    latitude: 28.6353,
                    longitude: 77.225,
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png',
                    circleTemplate: { fill: am5.color(0x7589ff) },
                },
                {
                    title: 'Japan',
                    latitude: 35.6785,
                    longitude: 139.6823,
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
                    url: 'http://www.google.co.jp',
                    circleTemplate: { fill: am5.color(0x7589ff) },
                },
                {
                    title: 'France',
                    latitude: 48.8567,
                    longitude: 2.351,
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
                    circleTemplate: { fill: am5.color(0xFF0000) },
                },
                {
                    title: 'Russia',
                    latitude: 55.7558,
                    longitude: 37.6176,
                    flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
                    circleTemplate: { fill: am5.color(0xFF0000) },
                },
                {
                    title: 'Spain',
                    latitude: 40.4167,
                    longitude: -3.7033,
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
                    circleTemplate: { fill: am5.color(0xFF0000) },
                },
                {
                    title: 'United Kingdom',
                    latitude: 51.5002,
                    longitude: -0.1262,
                    url: 'http://www.google.co.uk',
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
                    circleTemplate: { fill: am5.color(0xFF0000) },
                },
            ];

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );



            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                });

                tooltip.get('background').setAll({
                    fill: am5.color(0xffffff),
                });



                // this.circleProperties.fill = am5.color(0x38C90D);

                // this.circle = am5.Circle.new(this.root, this.circleProperties);
                this.circle = am5.Circle.new(this.root, {
                    templateField: "circleTemplate",
                    radius: 3,
                    tooltipY: 0,
                    strokeWidth: 0,
                    strokeOpacity: 0,
                    tooltip: tooltip,
                    tooltipHTML: `
                <div style="text-align:center; background:#fff; padding:10px;width:100px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); border-radius:4px;">
                <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
                <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"></div></div>
                `,
                });

                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    fill: am5.color(0xff0000),
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                });

                this.circle.events.on('click', () => {
                    this.toDiffrentPage();
                });

                return (this.bullet = am5.Bullet.new(this.root, {
                    sprite: this.container,
                }));
            });


        } else if (this.year.includes('2022')) {
            this.countries = [
                {
                    title: 'India',
                    latitude: 28.6353,
                    longitude: 77.225,
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png',
                },
                {
                    title: 'Japan',
                    latitude: 35.6785,
                    longitude: 139.6823,
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
                    url: 'http://www.google.co.jp',
                },
            ];

            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                });

                tooltip.get('background').setAll({
                    fill: am5.color(0xffffff),
                });

                this.circleProperties.fill = am5.color(0x5e48f0);
                this.circle = am5.Circle.new(this.root, this.circleProperties);
                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    fill: am5.color(0xff0000),
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                });

                this.circle.events.on('click', () => {
                    this.toDiffrentPage();
                });

                return (this.bullet = am5.Bullet.new(this.root, {
                    sprite: this.container,
                }));
            });
        } else if (this.year.includes('2021')) {
            this.countries = [
                {
                    title: 'France',
                    latitude: 48.8567,
                    longitude: 2.351,
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
                },
                {
                    title: 'Russia',
                    latitude: 55.7558,
                    longitude: 37.6176,
                    flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
                },
                {
                    title: 'Spain',
                    latitude: 40.4167,
                    longitude: -3.7033,
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
                },
                {
                    title: 'United Kingdom',
                    latitude: 51.5002,
                    longitude: -0.1262,
                    url: 'http://www.google.co.uk',
                    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
                },
            ];
            this.pointSeries = this.chart.series.push(
                am5map.MapPointSeries.new(this.root, {})
            );

            this.pointSeries.bullets.push(() => {
                this.container = am5.Container.new(this.root, {});

                let tooltip: any = am5.Tooltip.new(this.root, {
                    getFillFromSprite: false,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                    paddingTop: 0,
                    maxWidth: 200,
                });

                tooltip.get('background').setAll({
                    fill: am5.color(0xffffff),
                });

                this.circleProperties.fill = am5.color(0xff0000);
                this.circle = am5.Circle.new(this.root, this.circleProperties);
                this.container.children.push(this.circle);

                this.circle.states.create('hover', {
                    radius: 4,
                    fill: am5.color(0xff0000),
                    scale: 2,
                    strokeWidth: 3,
                    strokeOpacity: 5,
                    stroke: am5.color(0xff7b7b),
                });

                this.circle.events.on('click', () => {
                    this.toDiffrentPage();
                });

                return (this.bullet = am5.Bullet.new(this.root, {
                    sprite: this.container,
                }));
            });
        } else {
            this.countries = [];
        }

        let addCountry = (
            longitude: number,
            latitude: number,
            title: string,
            flag: string,
            circleTemplate: any
        ) => {
            this.pointSeries.data.push({
                geometry: { type: 'Point', coordinates: [longitude, latitude] },
                title: title,
                flag: flag,
                circleTemplate: circleTemplate,
            });
        };
        for (var i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            addCountry(
                country.longitude,
                country.latitude,
                country.title,
                country.flag,
                country.circleTemplate
            );
        }
    }

    public toDiffrentPage() {
        this.router.navigate(['ndhs-countries/1']);
    }

    // ngOnInit(): void {
    //   // Create root and chart
    //   let root = am5.Root.new('chartdiv');

    //   root.setThemes([am5themes_Animated.new(root)]);

    //   let chart: any = root.container.children.push(
    //     am5map.MapChart.new(root, {
    //       panX: 'none',
    //       panY: 'none',
    //       wheelX: 'none',
    //       wheelY: 'none',
    //       projection: am5map.geoMercator(),
    //     })
    //   );

    //   // Create polygon series
    //   let polygonSeries = chart.series.push(
    //     am5map.MapPolygonSeries.new(root, {
    //       geoJSON: am5geodata_worldLow,
    //       exclude: ['AQ'],
    //     })
    //   );

    //   polygonSeries.set('fill', am5.color(0xffffff));
    //   polygonSeries.set('stroke', am5.color(0x000000));

    //   polygonSeries.mapPolygons.template.setAll({
    //     templateField: 'polygonSettings',
    //     interactive: true,
    //   });

    //   polygonSeries.mapPolygons.template.states.create('active', {
    //     fill: root.interfaceColors.get('primaryButtonActive'),
    //   });

    //   let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    //   pointSeries.bullets.push(() => {
    //     let container = am5.Container.new(root, {});

    //     let circle = container.children.push(
    //       am5.Circle.new(root, {
    //         radius: 4,
    //         tooltipY: 0,
    //         fill: am5.color(0xff7558),
    //         strokeOpacity: 0,
    //         tooltip: am5.Tooltip.new(root, {
    //           paddingBottom: 0,
    //           paddingRight: 0,
    //           paddingLeft: 0,
    //           paddingTop: 0,
    //         }),
    //         tooltipHTML: `
    //           <div style="text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px;">
    //           <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
    //           <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"><div class="arrow-down" style="width: 0;
    //           height: 0;
    //           border-left: 5px solid transparent;
    //           border-right: 5px solid transparent;
    //           border-top: 5px solid #ccc;position:absolute;top:50px;"></div></div></div>

    //         `,
    //       })
    //     );

    //     let circle2 = container.children.push(
    //       am5.Circle.new(root, {
    //         radius: 4,
    //         tooltipY: 0,
    //         fill: am5.color(0xff7558),
    //         strokeOpacity: 0,
    //         tooltip: am5.Tooltip.new(root, {
    //           paddingBottom: 0,
    //           paddingRight: 0,
    //           paddingLeft: 0,
    //           paddingTop: 0,
    //         }),
    //         tooltipHTML: `
    //         <div style="text-align:center; background:#fff; padding:10px; box-shadow: 0px 5px 10px rgba(111, 111, 111, 0.2); border-radius:4px;">
    //           <img src="{flag}" width="20px" height="20px" style="border-radius:50%"><br>
    //           <span style="color:rgba(0, 0, 0, 0.32);font-size:12px;">{title}</span><div style="text-align:center;width:100%;display: flex;justify-content: center;"><div class="arrow-down" style="width: 0;
    //           height: 0;
    //           border-left: 5px solid transparent;
    //           border-right: 5px solid transparent;
    //           border-top: 5px solid #ccc;position:absolute;top:50px;z-index:99;"></div></div></div>

    //         `,
    //       })
    //     );

    //     circle.events.on('click', () => {
    //       this.toDiffrentPage();
    //     });
    //     circle2.events.on('click', () => {
    //       this.toDiffrentPage();
    //     });

    //     circle2.events.on('pointerover', () => {
    //       circle.animate({
    //         key: 'scale',
    //         from: 1,
    //         to: 5,
    //         duration: 600,
    //         loops: Infinity,
    //       });
    //       circle.animate({
    //         key: 'opacity',
    //         from: 1,
    //         to: 0,
    //         duration: 600,
    //         loops: Infinity,
    //       });
    //     });

    //     circle2.events.on('pointerout', () => {
    //       circle.animate({
    //         key: 'scale',
    //         from: 1,
    //         to: 5,
    //         duration: 0,
    //         loops: Infinity,
    //       });
    //       circle.animate({
    //         key: 'opacity',
    //         from: 1,
    //         to: 0,
    //         duration: 0,
    //         loops: Infinity,
    //       });
    //     });

    //     return am5.Bullet.new(root, {
    //       sprite: container,
    //     });
    //   });

    //   let countries = [
    //     {
    //       title: 'France',
    //       latitude: 48.8567,
    //       longitude: 2.351,
    //       flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Flag_of_Paris_with_coat_of_arms.svg/1280px-Flag_of_Paris_with_coat_of_arms.svg.png',
    //     },
    //     {
    //       title: 'Russia',
    //       latitude: 55.7558,
    //       longitude: 37.6176,
    //       flag: 'https://ak.picdn.net/shutterstock/videos/1053933155/thumb/1.jpg',
    //     },
    //     {
    //       title: 'Spain',
    //       latitude: 40.4167,
    //       longitude: -3.7033,
    //       flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_the_Community_of_Madrid.svg/800px-Flag_of_the_Community_of_Madrid.svg.png',
    //     },
    //     {
    //       title: 'United Kingdom',
    //       latitude: 51.5002,
    //       longitude: -0.1262,
    //       url: 'http://www.google.co.uk',
    //       flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
    //     },
    //     {
    //       title: 'India',
    //       latitude: 28.6353,
    //       longitude: 77.225,
    //       flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png',
    //     },
    //     {
    //       title: 'Japan',
    //       latitude: 35.6785,
    //       longitude: 139.6823,
    //       flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png',
    //       url: 'http://www.google.co.jp',
    //     },
    //   ];

    //   for (var i = 0; i < countries.length; i++) {
    //     let country = countries[i];
    //     addCountry(
    //       country.longitude,
    //       country.latitude,
    //       country.title,
    //       country.flag
    //     );
    //   }

    //   function addCountry(
    //     longitude: number,
    //     latitude: number,
    //     title: string,
    //     flag: string
    //   ) {
    //     pointSeries.data.push({
    //       geometry: { type: 'Point', coordinates: [longitude, latitude] },
    //       title: title,
    //       flag: flag,
    //     });
    //   }
    // }

    // for routing

    // ngOnInit(): void {

    //    // Create root and chart
    //    let root = am5.Root.new('chartdiv');

    //    root.setThemes([am5themes_Animated.new(root)]);

    //    let chart: any = root.container.children.push(
    //      am5map.MapChart.new(root, {
    //        panX: 'none',
    //        panY: 'none',
    //        wheelX: 'none',
    //        wheelY: 'none',
    //        projection: am5map.geoMercator(),
    //      })
    //    );

    //    // Create polygon series
    //    let polygonSeries = chart.series.push(
    //      am5map.MapPolygonSeries.new(root, {
    //        geoJSON: am5geodata_worldLow,
    //        exclude: ['AQ'],
    //      })
    //    );

    //    // let tooltip:any = am5.Tooltip.new(root, {
    //    //   getFillFromSprite: false,
    //    //   labelText: "[bold]{name}"
    //    // });

    //    // tooltip.get("background").setAll({
    //    //   fill: am5.color(0x00ffff),
    //    //   fillOpacity: 0.8
    //    // });

    //    //polygonSeries.set("tooltip", tooltip);

    //    polygonSeries.set('fill', am5.color(0xffffff));
    //    polygonSeries.set('stroke', am5.color(0x000000));

    //    polygonSeries.mapPolygons.template.setAll({
    //      tooltipText: '{name}',
    //      toggleKey: 'active',

    //      templateField: 'polygonSettings',
    //      interactive: true,
    //    });

    //    polygonSeries.mapPolygons.template.states.create('hover', {
    //      fill: am5.color(0x677935),
    //    });

    //    polygonSeries.mapPolygons.template.states.create('active', {
    //      fill: root.interfaceColors.get('primaryButtonActive'),
    //    });

    //    let cities: any = {
    //      type: 'FeatureCollection',
    //      features: [
    //        {
    //          type: 'Feature',
    //          properties: {
    //            name: 'India',
    //          },
    //          geometry: {
    //            type: 'Point',
    //            coordinates: [78.96288, 20.593684],
    //          },
    //        },
    //        {
    //          type: 'Feature',
    //          properties: {
    //            name: 'London',
    //          },
    //          geometry: {
    //            type: 'Point',
    //            coordinates: [-0.454296, 51.47002],
    //          },
    //        },
    //        {
    //          type: 'Feature',
    //          properties: {
    //            name: 'Beijing',
    //          },
    //          geometry: {
    //            type: 'Point',
    //            coordinates: [116.597504, 40.072498],
    //          },
    //        },
    //      ],
    //    };

    //    //Create point series
    //    let pointSeries = chart.series.push(
    //      am5map.MapPointSeries.new(root, {
    //        geoJSON: cities,
    //        exclude: ['AQ'],
    //      })
    //    );

    //    pointSeries.bullets.push(function () {
    //      let circle = am5.Circle.new(root, {
    //        radius: 3,
    //        fill: am5.color(0xff0000),
    //        tooltipText: '{name}',
    //      });

    //      circle.events.on('click', function (ev) {
    //        console.log(ev.target.dataItem);
    //      });

    //      return am5.Bullet.new(root, {
    //        sprite: circle,
    //      });
    //    });
    //  }
}
function root(root: any, arg1: { sprite: am5.Circle; }) {
    throw new Error('Function not implemented.');
}

function circleTemplate(root: any, arg1: { radius: number; templateField: string; }, circleTemplate: any): am5.Sprite {
    throw new Error('Function not implemented.');
}

