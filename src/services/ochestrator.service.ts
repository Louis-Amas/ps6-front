import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {IMqttClient, IMqttServiceOptions, MqttService} from 'ngx-mqtt';


@Injectable({
  providedIn: 'root'
})
export class OrchestatorService {


  constructor(private mqttService: MqttService) {
  }

  ledOn() {
    this.mqttService.publish('/rasp/led/update', '1')
      .subscribe((test) => console.log());
  }

  ledOff() {
    this.mqttService.publish('/rasp/led/update', '0')
      .subscribe((test) => console.log());
  }

  startBlinking() {
    this.mqttService.publish('/rasp/led/blinking/start', '')
      .subscribe((test) => console.log());
  }

  stopBlinking() {
    this.mqttService.publish('/rasp/led/blinking/stop', 'stop')
      .subscribe((test) => console.log());
  }
}

