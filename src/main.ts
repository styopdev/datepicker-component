import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import DatepickerComponent from './components/mc-dates';
import DemoComponent from './components/demo';

angular
  .module("ngApp", [ngMaterial])
  .component("mcDates", new DatepickerComponent())
  .component("demo", new DemoComponent());

angular.element(document).ready(function() {
  angular.bootstrap(document, ["ngApp"]);
});
