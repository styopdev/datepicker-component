import * as moment from 'moment';

class DemoComponentController implements ng.IComponentController {
  public date1: string;
  public date2: string;

  changeDates(newDates: any) {
    this.date1 = newDates.dateFrom;
    this.date2 = newDates.dateTo;
  }

  constructor() {
  }

  public $onInit () {
  }
}

class DemoComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public template: string;

  constructor() {
    this.controller = DemoComponentController;
    this.controllerAs = "$ctrl";
    this.template = `
    <mc-dates date-from='$ctrl.date1' date-to='$ctrl.date2' mc-change='$ctrl.changeDates(newDates)'></mc-dates>
    <md-input-container>
      <label>Дата 1</label>
      <input ng-model='$ctrl.date1'>
    </md-input-container>
    <md-input-container>
      <label>Дата 2</label>
      <input ng-model='$ctrl.date2'>
    </md-input-container>
    `;
  }
}


export default DemoComponent;
