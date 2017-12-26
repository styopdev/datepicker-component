import * as angular from "angular";

class DatepickerComponentController implements ng.IComponentController {

  public today: Date;

  constructor() {}

  public $onInit () {
    this.today = new Date();
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
      Datepicker goes here
    `;
  }
}

angular
  .module("ngApp", [])
  .component("datepicker", new DatepickerComponent());

angular.element(document).ready(function() {
  angular.bootstrap(document, ["ngApp"]);
});
