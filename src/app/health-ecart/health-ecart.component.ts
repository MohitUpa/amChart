import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as $ from "jquery";

interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}

@Component({
  selector: 'app-health-ecart',
  templateUrl: './health-ecart.component.html',
  styleUrls: ['./health-ecart.component.css']
})
export class HealthEcartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    // var ROOT_PATH = 'https://echarts.apache.org/examples';
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    interface GraphNode {
      symbolSize: number;
      label?: {
        show?: boolean;
      };
    }

    myChart.showLoading();
    // $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph:any) {
    $.getJSON('../../assets/data/les-miserables.json', function (graph: any) {

      myChart.hideLoading();

      graph.nodes.forEach(function (node: GraphNode) {
        node.label = {
          show: node.symbolSize > 30
        };
      });
      option = {
        title: {
          text: '',
          subtext: '',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: graph.categories.map(function (a: { name: string }) {
              return a.name;
            })
          }
        ],
        // animationDuration: 1500,
        // animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              color: '#fff',
              position: 'inside',
              align: 'center',
              formatter: '{b}',
              verticalAlign: 'middle',
              fontSize: '10'
            },
            // label: {
            //   color: '#fff',
            //   fontSize: '80',
            //   position: 'center',
            // },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            // emphasis: {
            //   focus: 'adjacency',
            //   lineStyle: {
            //     width: 10
            //   }
            // }
            // edgeSymbol: ['circle', 'arrow'],
            // edgeSymbolSize: [4, 10],

          }
        ]
      };

      myChart.setOption(option);
    });

  }

  ngOnInit(): void {


  }

}
