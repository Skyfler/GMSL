"use strict";

var Helper = require('./helper');

function FixedHeader(options) {
    Helper.call(this, options);
    
    this._fixed = false;
    
    this._onScroll = this._onScroll.bind(this);
    
    this._onScroll();
    this._addListener(window, 'scroll', this._onScroll);
}

FixedHeader.prototype = Object.create(Helper.prototype);
FixedHeader.prototype.constructor = FixedHeader;

FixedHeader.prototype._onScroll = function(e) {
    
//    console.log(pageYOffset);
    if (pageYOffset > 0 && !this._fixed) {
        document.body.classList.add('fixed_header');
        this._fixed = true;
        
    } else if (pageYOffset === 0 && this._fixed) {
        document.body.classList.remove('fixed_header');
        this._fixed = false;
        
    }
};

module.exports = FixedHeader;