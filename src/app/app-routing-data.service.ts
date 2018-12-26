import {Injectable} from '@angular/core';

export interface RoutingData<T> {
  getData(): T;
}

@Injectable()
export class AppRoutingDataService {
  private routingData: RoutingData<any>;

  constructor() {}

  setRoutingData(data: RoutingData<any>) {
    this.routingData = data;
  }

  getRoutingData(): RoutingData<any> {
    return this.routingData;
  }
}

