import * as moment from 'moment';

class DatepickerComponentController implements ng.IComponentController {

    public today: Date;
    public dateSelectors: any[];
    public startDate: any;
    public endDate: any;
    public mcChange: any;

    constructor() {
    }

    $onChanges(changes) {
        if (changes.dateFrom) {
            let isValid = moment(changes.dateFrom.currentValue, 'YYYY-MM-DD', true).isValid();
            isValid && (this.startDate = changes.dateFrom.currentValue);
        }

        if (changes.dateTo) {
            let isValid = moment(changes.dateTo.currentValue, 'YYYY-MM-DD', true).isValid();
            isValid && (this.endDate = changes.dateTo.currentValue);
        }

        return false;
    };

    public $onInit() {
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
        this.mcChange()({
            dateFrom: this.startDate,
            dateTo: this.endDate
        })
    }

    changeDate() {
        this.mcChange()({
            dateFrom: this.startDate,
            dateTo: this.endDate
        });
    }

}

class DatepickerComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public template: string;
    public bindings: any;


    constructor() {
        this.controller = DatepickerComponentController;
        this.controllerAs = "$ctrl";
        this.bindings = {
            dateFrom: '<',
            dateTo: '<',
            mcChange: '&'
        };

        this.template = `
      <md-datepicker
        ng-model='$ctrl.startDate'
        md-max-date='$ctrl.endDate'
        ng-change='$ctrl.changeDate()'></md-datepicker>
      <md-datepicker
        ng-model='$ctrl.endDate'
        md-min-date='$ctrl.startDate'
        ng-change='$ctrl.changeDate()'></md-datepicker>
      <br>
      <md-button ng-repeat="ds in $ctrl.dateSelectors" ng-click="$ctrl.updateDate(ds)" ng-bind="ds.name" class="md-primary" aria-label={{ds.name}}></md-button>
    `;
    }
}


export default DatepickerComponent;
