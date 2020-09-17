import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Metrics} from './metrics';

@Injectable({
    providedIn: 'root'
})
export class MetricsService {

    private API_URL = 'http://localhost:8080/metrics';
    private METRIC_TYPES = {CPU: 'CPU', MEM: 'MEM', DSK: 'DSK'};

    constructor(private http: HttpClient) {
    }

    getMetrics(interval): Observable<object> {
        let params: HttpParams = new HttpParams();
        params = params.set('interval', interval.toString());

        return this.http.get<HttpResponse<Metrics[]>>(this.API_URL, {params})
            .pipe(map(metrics => this.parseMetrics(metrics)));
    }

    parseMetrics(metrics) {
        const result = {cpu: [], mem: [], dsk: []};

        for (const metric of metrics) {
            if (metric.type === this.METRIC_TYPES.CPU) {
                result.cpu.push({x: metric.date, y: metric.value});
            }
            if (metric.type === this.METRIC_TYPES.MEM) {
                result.mem.push({x: metric.date, y: metric.value});
            }
            if (metric.type === this.METRIC_TYPES.DSK) {
                result.dsk.push({x: metric.date, y: metric.value});
            }
        }

        return result;
    }
}
