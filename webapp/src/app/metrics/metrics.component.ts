import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {MetricsService} from './metrics.service';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

    private AUTO_REFRESH_TIME = 60000 * 5 // 5 minutes;
    private CHART_PARAMETERS = {
        type: 'line',
        data: {
            datasets: []
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: 'YYYY-MM-DD HH:mm'
                    },
                    distribution: 'series'
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    autoRefresh = false;
    interval = 1;
    metrics;
    cpuChart: Chart;
    memChart: Chart;
    dskChart: Chart;

    reloadTimer: ReturnType<typeof setTimeout>;

    constructor(private metricsService: MetricsService) {
    }

    async ngOnInit() {
        await this.setAutoRefresh(true);
        this.metrics = await this.metricsService.getMetrics(this.interval).toPromise();
        this._buildCharts();
    }

    _buildCharts() {
        const cpuChartParameters = JSON.parse(JSON.stringify(this.CHART_PARAMETERS));
        cpuChartParameters.data.datasets = [{
            label: '% CPU usage',
            data: this.metrics.cpu,
            fill: false,
            borderColor: 'red',
            borderWidth: 2,
            pointBackgroundColor: 'red'
        }];
        this.cpuChart = new Chart('cpuChart',
            cpuChartParameters
        );

        const memChartParameters = JSON.parse(JSON.stringify(this.CHART_PARAMETERS));
        memChartParameters.data.datasets = [{
            label: '% Memory usage',
            data: this.metrics.mem,
            fill: false,
            borderColor: 'green',
            borderWidth: 2,
            pointBackgroundColor: 'green'
        }];
        this.memChart = new Chart('memChart',
            memChartParameters
        );

        const dskChartParameters = JSON.parse(JSON.stringify(this.CHART_PARAMETERS));
        dskChartParameters.data.datasets = [{
            label: '% Disk usage',
            data: this.metrics.dsk,
            fill: false,
            borderColor: 'blue',
            borderWidth: 2,
            pointBackgroundColor: 'blue'
        }];
        this.dskChart = new Chart('dskChart',
            dskChartParameters
        );
    }

    async refresh(interval) {
        this.metrics = await this.metricsService.getMetrics(interval).toPromise();

        this.cpuChart.data.datasets[0].data = this.metrics.cpu;
        this.cpuChart.update();

        this.memChart.data.datasets[0].data = this.metrics.mem;
        this.memChart.update();

        this.dskChart.data.datasets[0].data = this.metrics.dsk;
        this.dskChart.update();
    }

    async setAutoRefresh(enable) {
        this.autoRefresh = enable;
        if (this.autoRefresh) {
            this.reloadTimer = setInterval(async () => await this.refresh(this.interval), this.AUTO_REFRESH_TIME);
        } else {
            clearInterval(this.reloadTimer);
        }
    }

    async selectInterval(interval) {
        await this.refresh(interval);
    }
}
