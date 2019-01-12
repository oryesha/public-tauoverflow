import {Injectable} from '@angular/core';

export interface RoutingData<T> {
  getData(): T;
}

@Injectable()
export class AppRoutingDataService {
  private routingData: {[key: string]: RoutingData<any>} = {};

  constructor() {}

  setRoutingData(key: string, data: RoutingData<any>) {
    this.routingData[key] = data;
  }

  getRoutingData(key: string): RoutingData<any> {
    return this.routingData[key];
  }
}
