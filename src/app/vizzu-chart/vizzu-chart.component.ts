import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vizzu-chart',
  templateUrl: './vizzu-chart.component.html',
  styleUrls: ['./vizzu-chart.component.css']
})

export class VizzuChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // let chart = new Vizzu('vizzuCanvas');

    // chart.animate({
    //     data: data,
    //     config: {
    //         channels: {
    //             color: { set: ['Joy factors'] },
    //             label: { set: ['Country_code'] },
    //             /* With a dimension on the size channel Vizzu will stack
    //             the elements by the categories on the other channels
    //             on charts without coordinates. Here the Country code dimension is
    //             used to stack the bubbles by the dimension on the color channel. */
    //             size: { set: ['Country_code', 'Value 2 (+)'] }
    //         },
    //         title: 'Stacked Bubble Chart',
    //         geometry: 'circle'
    //     }
    // });

    // chart.animate({
    //     config: {
    //         channels: {
    //             x: { set: ['Country_code', 'Value 2 (+)'] },
    //             y: { set: ['Joy factors'] },
    //             label: { set: null },
    //             /* The stacking is eliminated when we remove
    //             the extra dimension from the size channel. */
    //             size: { set: null }
    //         },
    //         title: 'Bar Chart',
    //         geometry: 'rectangle',
    //         orientation: 'vertical'
    //     }
    // });

    // chart.animate({
    //     config: {
    //         channels: {
    //             x: { detach: ['Country_code'] },
    //             label: { set: ['Value 2 (+)'] }
    //         }
    //     }
    // });

  }
}
