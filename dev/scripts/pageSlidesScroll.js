"use strict";

var Helper = require('./helper');
var _smoothScroll = require('./smoothScroll');

function PageSlidesScroll(options) {
    Helper.call(this, options);
    
    this._elem = options.elem;
    this._minWidth = options.minWidth;
    
    this._onMouseWheel = this._onMouseWheel.bind(this);
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onClick = this._onClick.bind(this);
    
    this._init();
    this._scrollOnLoad();
    
    this._addListener(window, 'wheel', this._onMouseWheel);
    this._addListener(window, 'resize', this._onResize);
    this._addListener(this._elem, 'click', this._onClick);
}

PageSlidesScroll.prototype = Object.create(Helper.prototype);
PageSlidesScroll.prototype.constructor = PageSlidesScroll;

PageSlidesScroll.prototype._init = function() {
    
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    if (window.innerWidth >= this._minWidth) {
        this._active = true;
        document.documentElement.classList.add('pageSliderActive');
    } else {
        this._active = false;
        document.documentElement.classList.remove('pageSliderActive');
        
        this._elem.dataset.activeSlide = 'slide_1';
        
//        console.log('document.body.scrollTop = ' + document.body.scrollTop);
//        console.log('document.documentElement.scrollTop = ' + document.documentElement.scrollTop);
    }
    
    window.scrollTo(0, 0);
    
    this._pageSlides = document.querySelectorAll('.page-slide');
    this._pageSlideSCount = this._pageSlides.length;
    this._currentPageSlideNum = 1;
    this._scrollInProcess = false;
//    console.log('this._scrollInProcess = false');
    
    for (var i = 0; i < this._pageSlideSCount; i++) {
        this._pageSlides[i].style.position = '';
        this._pageSlides[i].style.marginBottom = '';
        this._pageSlides[i].dataset.slide = i + 1;
//      alert(i);
    }
    
    this._elem.dataset.activeSlide = 'slide_' + this._currentPageSlideNum;
};

PageSlidesScroll.prototype._onClick = function(e) {
    
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
    if (!scrollTarget) return;
    
    var slideNum = scrollTarget.dataset.slide;
//    console.log('slideNum');
//    console.log(slideNum);
    if (!slideNum) return;
    
    e.preventDefault();
    
    if (anchor.hasAttribute('data-preventDefaultUntil') &&
        window.innerWidth < anchor.getAttribute('data-preventDefaultUntil')) {
        return;
    }
    
    if (this._active) {
        if (this._scrollInProcess) return;
    
//        console.log('this._currentPageSlideNum');
//        console.log(this._currentPageSlideNum);
        if (slideNum == this._currentPageSlideNum) return;

        if (slideNum > this._currentPageSlideNum) {
            this._scrollDown(slideNum - this._currentPageSlideNum);
        } else {
            this._scrollUp(this._currentPageSlideNum - slideNum);
        }
        
    } else {
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
        
    }
};

PageSlidesScroll.prototype._scrollOnLoad = function() {
    
    if (!location.hash) return;
    
    var scrollTargetClass = location.hash.substr(1);
//    console.log('scrollTargetClass');
//    console.log(scrollTargetClass);
    if (!scrollTargetClass) return;
    
    var scrollTarget = document.querySelector('.' + scrollTargetClass);
//    console.log('scrollTarget');
//    console.log(scrollTarget);
    if (!scrollTarget) return;
    
    var slideNum = scrollTarget.dataset.slide;
//    console.log('slideNum');
//    console.log(slideNum);
    if (!slideNum) return;
    
    if (this._active) {
//        console.log('this._currentPageSlideNum');
//        console.log(this._currentPageSlideNum);
        if (slideNum == this._currentPageSlideNum) return;

        if (slideNum > this._currentPageSlideNum) {
            this._scrollDown(slideNum - this._currentPageSlideNum);
        } else {
            this._scrollUp(this._currentPageSlideNum - slideNum);
        }
        
    } else {
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
        
    }
    
};

PageSlidesScroll.prototype._onMouseWheel = function(e) {
//    console.log('_scrollInProcess = ' + this._scrollInProcess);
    if (!e.deltaY || this._scrollInProcess) return;
    
    if (!this._active) {
        return;
    }
    
    if (e.deltaY > 0) {
        this._scrollDown(1);
        
    } else if (e.deltaY < 0) {
        this._scrollUp(1);
        
    }
};

PageSlidesScroll.prototype._scrollDown = function(slidesNum) {
    if (this._currentPageSlideNum === this._pageSlideSCount) {     
//        console.log('this._currentPageSlideNum = this._pageSlideSCount');
        return;
    }
//    console.log('_scrollDown');
    
    this._scrollInProcess = true;
//    console.log('this._scrollInProcess = true');
    
    var currentPageSlide;
    
    this._hiddenTransitionSlides = [];
    
    for (var i = 0; i < slidesNum - 1; i++) {
        currentPageSlide = this._pageSlides[this._currentPageSlideNum + i];
        currentPageSlide.style.transitionDuration = '0';
        currentPageSlide.style.opacity = '0';
        currentPageSlide.style.marginBottom = -1 * currentPageSlide.offsetHeight + 'px';
        currentPageSlide.style.position = 'absolute';
        
        this._hiddenTransitionSlides.push(currentPageSlide);
    }
    
    currentPageSlide = this._pageSlides[this._currentPageSlideNum - 1];
    
    this._addListener(currentPageSlide, 'transitionend', this._onTransitionEnd);
//    currentPageSlide.style.height = 0;
    currentPageSlide.style.marginBottom = -1 * currentPageSlide.offsetHeight + 'px';
    
    this._scrollingDown = true;
    
    this._currentPageSlideNum += slidesNum;
    this._elem.dataset.activeSlide = 'slide_' + this._currentPageSlideNum;
//    console.log(this._currentPageSlideNum);
};

PageSlidesScroll.prototype._scrollUp = function(slidesNum) {
    if (this._currentPageSlideNum === 1) {     
//        console.log('this._currentPageSlideNum = 1');
        return;
    }
//    console.log('_scrollUp');
    
    this._scrollInProcess = true;
//    console.log('this._scrollInProcess = true');
    
    var previousPageSlide;
    
    this._hiddenTransitionSlides = [];
    
    for (var i = 0; i < slidesNum - 1; i++) {
        previousPageSlide = this._pageSlides[this._currentPageSlideNum - 2 - i];
        previousPageSlide.style.transitionDuration = '0';
        previousPageSlide.style.opacity = '0';
        
        this._hiddenTransitionSlides.push(previousPageSlide);
    }
    
    previousPageSlide = this._pageSlides[this._currentPageSlideNum - 1 - slidesNum];
    
    this._addListener(previousPageSlide, 'transitionend', this._onTransitionEnd);
//    previousPageSlide.style.height = '';
    previousPageSlide.style.marginBottom = '';
    previousPageSlide.style.position = '';
    
    this._currentPageSlideNum -= slidesNum;
    this._elem.dataset.activeSlide = 'slide_' + this._currentPageSlideNum;
//    console.log(this._currentPageSlideNum);
};

PageSlidesScroll.prototype._onTransitionEnd = function(e) {
    var target = e.target;
    var property = e.propertyName;
//    console.log(property);
    
    if (!target.matches('.page-slide') || property !== 'margin-bottom') return;
    
    if (this._scrollingDown) {
        delete this._scrollingDown;
        var previousPageSlide = e.currentTarget;
        previousPageSlide.style.position = 'absolute';
        
        for (var i = 0; i < this._hiddenTransitionSlides.length; i++) {
            this._hiddenTransitionSlides[i].style.transitionDuration = '';
            this._hiddenTransitionSlides[i].style.opacity = '';
        }
        
    } else {
        for (var i = 0; i < this._hiddenTransitionSlides.length; i++) {
            this._hiddenTransitionSlides[i].style.marginBottom = '';
            this._hiddenTransitionSlides[i].style.position = '';
            this._hiddenTransitionSlides[i].style.transitionDuration = '';
            this._hiddenTransitionSlides[i].style.opacity = '';
        }
        
    }
    
    delete this._hiddenTransitionSlides;
    
    this._scrollInProcess = false;
//    console.log('this._scrollInProcess = false');
    this._removeListener(e.currentTarget, 'transitionend', this._onTransitionEnd);
};

PageSlidesScroll.prototype._onResize = function(e) {
    if (window.innerWidth >= this._minWidth && !this._active) {
        this._init();
    } else if (window.innerWidth < this._minWidth && this._active) {
        this._init();
    }
};

module.exports = PageSlidesScroll;