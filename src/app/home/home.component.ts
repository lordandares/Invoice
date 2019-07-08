import { Component, OnInit } from '@angular/core';
import { GoogleChartPackagesHelper, ScriptLoaderService } from 'angular-google-charts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chart = {
    title: 'Ventas por Producto',
    type: 'BarChart',
    data: [['Pan', 8.94], ['Soda', 10.49], ['Golosina', 19.3], ['Cigarrillos', 21.45]],
    columnNames: ['Producto', 'Destino'],
    options: {
      animation: {
        duration: 250,
        easing: 'ease-in-out',
        startup: true
      }
    }
  };

  rawChartData: google.visualization.ChartSpecs = {
    chartType: 'AreaChart',
    dataTable: [
      ['Sucursal1', 'Sucursal2'],
      [new Date(1990, 1, 1), 10],
      [new Date(1991, 1, 1), 20],
      [new Date(1992, 1, 1), 40],
      [new Date(1993, 1, 1), 80],
      [new Date(1994, 1, 1), 160],
      [new Date(1995, 1, 1), 320],
      [new Date(1996, 1, 1), 640],
      [new Date(1997, 1, 1), 1280]
    ]
  };

  rawFormatter: any;
  private areaChartPackage = GoogleChartPackagesHelper.getPackageForChartName('AreaChart');

  constructor(private location: Location, private loaderService: ScriptLoaderService) {}

  ngOnInit() {
    this.loaderService.onReady.subscribe(() => {
      this.loaderService.loadChartPackages([this.areaChartPackage]).subscribe(() => {
        this.rawFormatter = [{ formatter: new google.visualization.DateFormat({ formatType: 'long' }), colIndex: 0 }];
      });
    });
  }

}
