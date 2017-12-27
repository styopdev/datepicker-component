import * as moment from 'moment';

class DatepickerComponentController implements ng.IComponentController {

  public today: Date;
  public dateSelectors: any[];
  public dateFrom: any;
  public dateTo: any;

  constructor() {
  }

  $onChanges(changes) {
    if (changes.dateFrom) {
        let isValid = moment(changes.dateFrom.currentValue, 'YYYY-MM-DD', true).isValid();
        isValid && (this.dateFrom = changes.dateFrom.currentValue);
    }

    if (changes.dateTo) {
      let isValid = moment(changes.dateTo.currentValue, 'YYYY-MM-DD', true).isValid();
      isValid && (this.dateTo = changes.dateTo.currentValue);
    }

    return false;
  };

  public $onInit () {
    this.dateSelectors = [
        {
          name: 'Вчера',
          dateFrom: moment().subtract(1, 'days'),
          dateTo: moment().subtract(1, 'days')
        }, {
          name: 'Сегодня',
          dateFrom: moment(),
          dateTo: moment()
        }, {
          name: '2 недели',
          dateFrom: moment().subtract(2, 'weeks'),
          dateTo: moment()
        },
        {
         name: 'Месяц',
         dateFrom: moment().subtract(1, 'months'),
         dateTo: moment()
       },
       {
        name: 'Все',
        dateFrom: null,
        dateTo: null
      },
    ];
  }

  updateDate(data) {
    this.dateFrom = data.dateFrom ? new Date(data.dateFrom) : null;
    this.dateTo = data.dateTo ? new Date(data.dateTo) : null;
  }
}

class DatepickerComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public template: string;
  public bindings:any;


  constructor() {
    this.controller = DatepickerComponentController;
    this.controllerAs = "$ctrl";
    this.bindings = {
        dateFrom: '<',
        dateTo: '<',
        mcChange: '&'
    };

    this.template = `
      <md-datepicker ng-model='$ctrl.dateFrom' md-max-date='$ctrl.dateTo'></md-datepicker>
      <md-datepicker ng-model='$ctrl.dateTo' md-min-date='$ctrl.dateFrom'></md-datepicker>
      <br>
      <md-button ng-repeat="ds in $ctrl.dateSelectors" ng-click="$ctrl.updateDate(ds)" ng-bind="ds.name" class="md-primary" aria-label={{ds.name}}></md-button>
    `;
  }
}


export default DatepickerComponent;
