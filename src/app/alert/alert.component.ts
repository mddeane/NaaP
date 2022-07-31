import { Component, OnInit } from '@angular/core';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "primary", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "secondary", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "warning", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "danger", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "success", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "info", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "light", 10000);
    // this.alertService.showAlert("Test. This is a test that is really long. Let's make it even longer to test the longness of it.", "dark", 10000);
  }

}
