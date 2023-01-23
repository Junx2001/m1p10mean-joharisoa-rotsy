import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from "chart.js";
import { FunctionsService } from '../../global/services/functions.service';
import { PaiementService } from '../../global/services/paiement.service';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  defaultYear! : number;
  years : number[] = [];
  filterGroup : FormGroup;
  chart! : Chart;
  title! : string;


  constructor(private paiementService : PaiementService,
    private functions : FunctionsService,
    private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.title="Chiffre d'affaires mensuel";
    this.defaultYear = new Date().getFullYear();
    for(let y = this.defaultYear ; y >= 1990; y--){
      this.years.push(y);
    }

    this.filterGroup=this.formBuilder.group({
      year: [this.defaultYear, Validators.required]
    },{
      updateOn:'change'
    });

    this.paiementService.getStatsCAPerMonth(this.defaultYear).subscribe(
      (response)=>{
        let months = [];
        let data = [];
        for (let i= 0; i<response.length; i++){
          months.push(this.functions.getMonthName(response[i]._id, 'short'));
          data.push(response[i].totalCA);
        }
        let config = this.configChart(months, this.defaultYear, data);
        let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
        ctx = ctx.getContext("2d");
        this.chart = new Chart(ctx, config);
      }
    );
    this.filterGroup.valueChanges.subscribe(
      (year) =>{
        this.paiementService.getStatsCAPerMonth(year.year).subscribe(
          (response)=>{
            let months = [];
            let data = [];
            for (let i= 0; i<response.length; i++){
              months.push(this.functions.getMonthName(response[i]._id, 'short'));
              data.push(response[i].totalCA);
            }
            let config = this.configChart(months, year.year, data);
            this.chart.config = config;
            this.chart.update();
          });
      }
    );
    
  }
  configChart(months, year, data) {
    let config = {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: year,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: data,
            fill: false,
            barThickness: 10,
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Chiffre d'affaires par mois",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Mois",
                fontColor: "#f00",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Chiffre d'affaires",
                fontColor: "#f00",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    return config;
  }
}
