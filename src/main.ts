import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import * as moment from 'moment';


class DatepickerComponentController implements ng.IComponentController {

  public today: Date;
  public dateSelectors: any[];
  public startDate: Date;
  public endDate: Date;

  constructor() {
  }

  public $onInit () {
    this.today = new Date();
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
    this.startDate = data.dateFrom ? new Date(data.dateFrom) : null;
    this.endDate = data.dateTo ? new Date(data.dateTo) : null;
  }
}

class DatepickerComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public template: string;

  constructor() {
    this.controller = DatepickerComponentController;
    this.controllerAs = "$ctrl";
    this.template = `
      <md-datepicker ng-model='$ctrl.startDate' md-max-date='$ctrl.endDate'></md-datepicker>
      <md-datepicker ng-model='$ctrl.endDate' md-min-date='$ctrl.startDate'></md-datepicker>
      <br>
      <md-button ng-repeat="ds in $ctrl.dateSelectors" ng-click="$ctrl.updateDate(ds)" ng-bind="ds.name" class="md-primary" aria-label={{ds.name}}></md-button>
    `;
  }
}

angular
  .module("ngApp", [ngMaterial])
  .component("datepicker", new DatepickerComponent());

angular.element(document).ready(function() {
  angular.bootstrap(document, ["ngApp"]);
});
