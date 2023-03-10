import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Chart from "chart.js";
import { FunctionsService } from "src/app/global/services/functions.service";
import { PaiementService } from "src/app/global/services/paiement.service";

@Component({
  selector: 'app-stat-depenses',
  templateUrl: './stat-depenses.component.html',
  styleUrls: ['./stat-depenses.component.css']
})
export class StatDepensesComponent implements OnInit {
  defaultYear! : number;
  years : number[] = [];
  filterGroup : FormGroup;
  chart! : Chart;
  title! : string;

  constructor(private paiementService : PaiementService,
    private functions : FunctionsService,
    private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.defaultYear = new Date().getFullYear();
    for(let y = this.defaultYear ; y >= 1990; y--){
      this.years.push(y);
    }

    this.filterGroup=this.formBuilder.group({
      year: [this.defaultYear, Validators.required]
    },{
      updateOn:'change'
    });
    
    this.paiementService.getStatsBeneficePerMonth(this.defaultYear).subscribe(
      (response)=>{
        let months = [];
        let data = [];
        for (let i= 0; i<response.length; i++){
          months.push(this.functions.getMonthName(response[i]._id, 'short'));
          data.push(response[i].total);
        }
        let config = this.configChart(months, this.defaultYear, data);
        let ctx: any = document.getElementById("bar-chart");
        ctx = ctx.getContext("2d");
        this.chart = new Chart(ctx, config);
      }
    )
    this.filterGroup.valueChanges.subscribe(
      (value)=>{
        this.paiementService.getStatsBeneficePerMonth(value.year).subscribe(
          (response)=>{
            let months = [];
            let data = [];
            for (let i= 0; i<response.length; i++){
              months.push(this.functions.getMonthName(response[i]._id, 'short'));
              data.push(response[i].total);
            }
            
            let config = this.configChart(months, value.year, data);
            this.chart.config = config;
            this.chart.update();
          }
        )
      }
    );
  }
  configChart(months, year, data){
    var config = {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: year,
            fill: false,
            backgroundColor: "rgba(33, 37, 41, 0.6)",
            borderColor: "rgba(33, 37, 41, 0.6)",
            data: data
          },
        ],
      },
      plugins: [{
        beforeRender: (x, options) => {
          if (x.data.datasets[0].data.length>1){
            const c = x.chart;
            const dataset = x.data.datasets[0];
            const yScale = x.scales['y-axis-0'];
            const yPos = yScale.getPixelForValue(0);
        
            const gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
            gradientFill.addColorStop(0, 'rgb(86,188,77)');
            gradientFill.addColorStop(yPos / c.height, 'rgb(86,188,77)');
            gradientFill.addColorStop(yPos / c.height, 'rgb(229,66,66)');
            gradientFill.addColorStop(1, 'rgb(229,66,66)');
        
            const model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
            model.borderColor = gradientFill;
          }
        },
      }],
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "B??n??fice ou perte par mois",
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
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
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
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
                labelString: "B??n??fice / Perte (AR)",
                fontColor: "#f00",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 1)",
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
