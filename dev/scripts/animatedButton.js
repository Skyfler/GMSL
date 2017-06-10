"use strict";

var Helper = require('./helper');

function AnimatedButton(options) {
    Helper.call(this, options);
    
    this._elem = options.elem;
    this._animationDuration = options.animationDuration;
    
    this._addListener(document, 'DOMContentLoaded', function() {
        setTimeout(function(){
            this._getBorders();
            this._calculateValues();
        }.bind(this), 1000);
    }.bind(this));
}

AnimatedButton.prototype = Object.create(Helper.prototype);
AnimatedButton.prototype.constructor = AnimatedButton;

AnimatedButton.prototype._getBorders = function() {
    this._rightBorder = this._elem.querySelector('.border_right');
    this._bottomBorder = this._elem.querySelector('.border_bottom');
    this._leftBorder = this._elem.querySelector('.border_left');
    this._topBorder = this._elem.querySelector('.border_top');
    
    this._rightBorderBg = this._rightBorder.querySelector('.bg');
    this._bottomBorderBg = this._bottomBorder.querySelector('.bg');
    this._leftBorderBg = this._leftBorder.querySelector('.bg');
    this._topBorderBg = this._topBorder.querySelector('.bg');
};

AnimatedButton.prototype._calculateValues = function() {
    var backgroundWidth = parseFloat(getComputedStyle(this._rightBorder).height) * 2 + parseFloat(getComputedStyle(this._bottomBorder).width) * 2;
    
    this._rightBorderBg.style.height = backgroundWidth + 'px';
    this._bottomBorderBg.style.width = backgroundWidth + 'px';
    this._leftBorderBg.style.height = backgroundWidth + 'px';
    this._topBorderBg.style.width = backgroundWidth + 'px';
    
    var horizontalSideDelay = (parseFloat(getComputedStyle(this._bottomBorder).width) / (backgroundWidth / 100)) / 100 * this._animationDuration;
    var verticalSideDelay = (parseFloat(getComputedStyle(this._rightBorder).height) / (backgroundWidth / 100)) / 100 * this._animationDuration;
    
    this._bottomBorderBg.style.animationDelay = 0;
    this._rightBorderBg.style.animationDelay = -1 * (horizontalSideDelay) + 's';
    this._topBorderBg.style.animationDelay = -1 * ((horizontalSideDelay + verticalSideDelay)) + 's';
    this._leftBorderBg.style.animationDelay = -1 * ((horizontalSideDelay * 2 + verticalSideDelay)) + 's';
};

module.exports = AnimatedButton;