import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinearDataServicesService {

  constructor() { }

  generateData = (num: number) => {
    const results = [];
    const booleans = [true, false];

    for (let i = 0; i < Math.floor(1 + Math.random() * num); i++) {
      const result = {
        id: i,
        singleRun: booleans[Math.floor(Math.random() * 2)],
        startDateUtc: new Date(2017, Math.floor(Math.random() * 12), Math.floor(Math.random() * 25)),
        totalDevicesFound: Math.floor(1 + Math.random() * 10)
      };

      results.push(result);
    }

    return results;
  }

  parseData = (discoveries: any) => {
    const single = [];
    const periodic = [];

    discoveries.map(discovery => {
      if (discovery.singleRun) {
        single.push({
          time: discovery.startDateUtc,
          value: discovery.totalDevicesFound
        });
      } else {
        periodic.push({
          time: discovery.startDateUtc,
          value: discovery.totalDevicesFound
        });
      }
    });

    return [
      { label: 'Periodic', data: periodic },
      { label: 'Single', data: single }
    ];
  }
}
