"use strict";

var Dropdown = require('./dropdown.js');

function CheckboxGroupDropdown(options) {
    Dropdown.call(this, options);
    
    this._titleElem = this._elem.querySelector(this._openBtnSelector);
    this._defaultTitle = this._titleElem.textContent;
    
    this._checkboxArr = this._elem.querySelectorAll('input[type="checkbox"]');
    this._value = [];
    this._elem.dataset.value = '';
    
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    
    this._addListener(this._elem, 'change', this._onCheckboxChange);
}

CheckboxGroupDropdown.prototype = Object.create(Dropdown.prototype);
CheckboxGroupDropdown.prototype.constructor = CheckboxGroupDropdown;

CheckboxGroupDropdown.prototype._onDocumentClick = function(event) {
    if (!this._elem.contains(event.target)) this._closeDropdown();
};

CheckboxGroupDropdown.prototype._openDropdown = function() {
    Dropdown.prototype._openDropdown.apply(this, arguments);
    
    this._addListener(document, 'click', this._onDocumentClick);
}

CheckboxGroupDropdown.prototype._closeDropdown = function() {
    Dropdown.prototype._closeDropdown.apply(this, arguments);
    
    this._addListener(document, 'click', this._onDocumentClick);
}

CheckboxGroupDropdown.prototype._onCheckboxChange = function(e) {
    this._getValues();
};

CheckboxGroupDropdown.prototype._getValues = function() {
    this._value = [];
    
    for (var i = 0; i < this._checkboxArr.length; i++) {
        if (this._checkboxArr[i].checked) {
            this._value.push(this._checkboxArr[i].name);
        }
    }
    
    this._elem.dataset.value = this._value.join(', ');
    
//    console.log(this._value);
    this._setTitle();
}

CheckboxGroupDropdown.prototype._setTitle = function() {
    var newTitle;
    
    if (this._value.length === 0) {
        newTitle = this._defaultTitle;
    } else if (this._value.length === 1) {
        newTitle = 'Выбрана 1 услуга';
    } else if (this._value.length > 1 && this._value.length <= 4) {
        newTitle = 'Выбрано ' + this._value.length + ' услуги';
    } else if (this._value.length > 4) {
        newTitle = 'Выбрано ' + this._value.length + ' услуг';
    }
    
    this._titleElem.innerHTML = newTitle;
};

module.exports = CheckboxGroupDropdown;