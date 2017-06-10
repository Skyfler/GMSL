"use strict";

var Helper = require('./helper');

function SmmBlocksAnimation(options) {
    Helper.call(this, options);
    
    this._elem = options.elem;
    
    this._onScroll = this._onScroll.bind(this);
    
    this._getAnimatedBlocks();
    
    this._addListener(window, 'scroll', this._onScroll);
}

SmmBlocksAnimation.prototype = Object.create(Helper.prototype);
SmmBlocksAnimation.prototype.constructor = SmmBlocksAnimation;

SmmBlocksAnimation.prototype._getAnimatedBlocks = function() {
    this._animatedBlocks = this._elem.querySelectorAll('.block');
};

SmmBlocksAnimation.prototype._onScroll = function() {
    for (var i = 0; i < this._animatedBlocks.length; i++) {
        this._checkIfVisible(this._animatedBlocks[i]);
    }
};

SmmBlocksAnimation.prototype._checkIfVisible = function(animatedBlock) {
    if (animatedBlock.getBoundingClientRect().top < window.innerHeight && !animatedBlock.classList.contains('animation_play')) {
        animatedBlock.classList.add('animation_play');
    }
};

module.exports = SmmBlocksAnimation;