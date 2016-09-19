///<reference path="../../headers/common.d.ts" />

import _ from 'lodash';
import {Variable, assignModelProperties, variableTypes} from './variable';
import {VariableSrv} from './variable_srv';

export class ConstantVariable implements Variable {
  query: string;
  options: any[];

  defaults = {
    type: 'constant',
    name: '',
    hide: 2,
    label: '',
    query: '',
  };

  /** @ngInject */
  constructor(private model, private variableSrv) {
    assignModelProperties(this, model, this.defaults);
  }

  getModel() {
    assignModelProperties(this.model, this, this.defaults);
    return this.model;
  }

  setValue(option) {
    this.variableSrv.setOptionAsCurrent(this, option);
  }

  updateOptions() {
    this.options = [{text: this.query.trim(), value: this.query.trim()}];
    this.setValue(this.options[0]);
    return Promise.resolve();
  }

  dependsOn(variable) {
    return false;
  }

  setValueFromUrl(urlValue) {
    return this.variableSrv.setOptionFromUrl(this, urlValue);
  }
}

variableTypes['constant'] = {
  name: 'Constant',
  ctor: ConstantVariable,
  description: 'Define a hidden constant variable, useful for metric prefixes in dashboards you want to share' ,
};