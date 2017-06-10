"use strict";

var Helper = require('./helper');
var _smoothScroll = require('./smoothScroll');

function ClickSmoothScroll(options) {
    Helper.call(this, options);
    
    this._onClick = this._onClick.bind(this);
    
    this._addListener(document, 'click', this._onClick);
}

ClickSmoothScroll.prototype = Object.create(Helper.prototype);
ClickSmoothScroll.prototype.constructor = ClickSmoothScroll;

ClickSmoothScroll.prototype._onClick = function(e) {
    
    var target = e.target;
//    console.log('target');
//    console.log(target);
    if (!target) return;
    
    var anchor = target.closest('[data-target]');
//    console.log('anchor');
//    console.log(anchor);
    if (!anchor) return;
    
    var scrollTargetClass = anchor.dataset.target;
//    console.log('scrollTargetClass');
//    console.log(scrollTargetClass);
    if (!scrollTargetClass) return;
    
    var scrollTarget = document.querySelector('.' + scrollTargetClass);
//    console.log('scrollTarget');
//    console.log(scrollTarget);
//    if (!scrollTarget) return;
    e.preventDefault();
    
    if (anchor.hasAttribute('data-preventDefaultUntil') &&
        window.innerWidth < anchor.getAttribute('data-preventDefaultUntil')) {
        return;
    }
    
    if (scrollTarget) {
        _smoothScroll.scrollTo(
            _smoothScroll.getPageScrollElem(),
            _smoothScroll.getCoords(scrollTarget).top - 76,
            600
        );

        this._sendCustomEvent(document, 'signaltoclosedropdown', {
            bubbles: true,
            detail: {
                targetDropdownSelector: '#main_menu'
            }
        });
        
    } else {
        location = '/#' + scrollTargetClass;
        
    }
};

module.exports = ClickSmoothScroll;