"use strict";

var Helper = require('./helper');

function ChangeClassSlider(options) {
    Helper.call(this, options);

    this._elem = options.elem;

    this._initSlider();

    this._onClick = this._onClick.bind(this);

    this._addListener(this._elem, 'click', this._onClick);
}

ChangeClassSlider.prototype = Object.create(Helper.prototype);
ChangeClassSlider.prototype.constructor = ChangeClassSlider;

ChangeClassSlider.prototype._initSlider = function() {
    this._slidesArr = this._elem.querySelectorAll('.slide');
    this._slidesCount = this._slidesArr.length;
//    console.log('_slidesCount = ' + this._slidesCount);
    
    this._activeSlideIndex = 1;
};

ChangeClassSlider.prototype._onClick = function(e) {
    var target = e.target;
    var controll = target.closest('[data-component="slider_controll"]');
    
    
    if (controll) {
        e.preventDefault();
        this._handleControlls(controll);
    }
};

ChangeClassSlider.prototype._handleControlls = function(controll) {
    var action = controll.dataset.action;
    if (!action) return;
    
    switch (action) {
        case 'slide_forward': 
            this._changeActive(1);
            break;
        case 'slide_backward': 
            this._changeActive(-1);
            break;
        case 'slide_index': 
            var slideIndex = parseInt(controll.dataset.slide);
            if (!slideIndex || slideIndex > this._sidesCount || slideIndex < 0) return;
            
            var increment = slideIndex - this._activeSlideIndex;
            if (!increment) return;
            
            this._changeActive(increment);
            break;
    }
};

ChangeClassSlider.prototype._changeActive = function(increment) {
    var lastActiveSlideIndex = this._activeSlideIndex;
    
//    console.log('Increment = ' + increment);
//    console.log('Expected Slide = ' + (this._activeSlideIndex + increment));
    
    if (this._activeSlideIndex + increment === 0) {
//        console.log('is 0');
        increment = this._slidesCount - 1;
//        console.log('New Increment = ' + increment);
//        console.log('New Expected Slide = ' + (this._activeSlideIndex + increment));
    } else if (this._activeSlideIndex + increment === this._slidesCount + 1) {
//        console.log('is ' + (this._slidesCount + 1));
        increment = -1 * (this._slidesCount - 1);
//        console.log('New Increment = ' + increment);
//        console.log('New Expected Slide = ' + (this._activeSlideIndex + increment));
    }
    
    this._activeSlideIndex += increment;
    for (var i = 0; i < this._slidesCount; i++) {
        this._changeSlideClass(this._slidesArr[i], -1 * increment);
    }
    
    this._elem.classList.remove('active_slide_' + lastActiveSlideIndex);
    this._elem.classList.add('active_slide_' + this._activeSlideIndex);
};

ChangeClassSlider.prototype._changeSlideClass = function(slideElem, increment) {
    for (var i = 1; i <= this._slidesCount; i++) {
        if (slideElem.classList.contains('slide_position_' + i)) {
            slideElem.classList.remove('slide_position_' + i);
            var newSlideIndex = (i + increment) > this._slidesCount ? (i + increment) - this._slidesCount : (i + increment) < 1 ? (i + increment) + this._slidesCount : (i + increment);
            slideElem.classList.add('slide_position_' + newSlideIndex);
            return;
        }
    }
};

module.exports = ChangeClassSlider;