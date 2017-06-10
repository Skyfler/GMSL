"use strict";

var Slider = require('./slider');

function PageHeightSlider(options) {
    Slider.call(this, options);
    
    this._elem = options.elem;
    
    this._elem.style.height = window.innerHeight + 'px';
//    console.log(this._elem);
//    console.log(window.innerHeight);
//    console.log(this._elem.style.height);
    
    this._onResize = this._onResize.bind(this);
    
    this._addListener(window, 'resize', this._onResize);
}

PageHeightSlider.prototype = Object.create(Slider.prototype);
PageHeightSlider.prototype.constructor = PageHeightSlider;

PageHeightSlider.prototype._onResize = function(e) {
    this._elem.style.height = window.innerHeight + 'px';
};

module.exports = PageHeightSlider;