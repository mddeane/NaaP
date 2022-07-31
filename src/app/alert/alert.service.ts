import { Injectable } from '@angular/core';
import { Alert } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert[] = [];
  ALERT_DEFAULT_DURATION: number = 3000;
  ALERT_DEFAULT_TYPE: string = "secondary";
  alertCounter: number = 1;

  constructor() { }

  showAlert(alertMessage: string, alertType: string = this.ALERT_DEFAULT_TYPE, alertDuration: number = this.ALERT_DEFAULT_DURATION): void {
    let alertCreatedMilli: number = Date.now();

    // if (!alertType) {
    //   alertType = this.ALERT_DEFAULT_TYPE;
    // }

    // if (!alertDuration) {
    //   alertDuration = this.ALERT_DEFAULT_DURATION;
    // }
    console.log("alertType: " + alertType);
    console.log("alertDuration: " + alertDuration);

    let alert: Alert = new Alert(alertMessage, new Date(alertCreatedMilli), alertType, alertDuration);

    this.alerts.push(alert);
    setTimeout(() => {
      this.alerts.shift()?.alertText;
    }, alertDuration);
    this.alertCounter++;
  }
}
