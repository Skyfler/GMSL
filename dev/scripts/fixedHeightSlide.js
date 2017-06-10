"use strict";

var Helper = require('./helper');

function FixedHeightSlide(options) {
    Helper.call(this, options);
    
    this._elem = options.elem;
    
    this._onResize = this._onResize.bind(this);
    
    this._setFixedHeight();
    
    this._addListener(window, 'resize', this._onResize);
}

FixedHeightSlide.prototype = Object.create(Helper.prototype);
FixedHeightSlide.prototype.constructor = FixedHeightSlide;

FixedHeightSlide.prototype._setFixedHeight = function() {
    this._elem.style.height = window.innerHeight - 100 + 'px';
};

FixedHeightSlide.prototype._onResize = function(e) {
    this._setFixedHeight();
};

module.exports = FixedHeightSlide;