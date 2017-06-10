"use strict";

(function ready() {

    var _polyfills = require('./polyfills');
    var Dropdown = require('./dropdown');
    var Menu = require('./dropdown-menu');
    var PageSlidesScroll = require('./pageSlidesScroll');
    var MasonryTabs = require('./masonryTabs');
    var Slider = require('./slider');
    var PageHeightSlider = require('./slider-pageHeigtSlider');
    var ContactFormController = require('./contactFormController');
    var AnimatedButton = require('./animatedButton');
    var FixedHeader = require('./fixedHeader');
    var ClickSmoothScroll = require('./click-smoothScroll');
    var FixedHeightSlide = require('./fixedHeightSlide');
    var SmmBlocksAnimation = require('./smm_blocks_animation');
    var ChangeClassSlider = require('./changeClassSlider');

    _polyfills.init();

//    console.log('========= MAIN MENU =========');
    var mainMenu = new Menu({
        elem: document.querySelector('#main_menu'),
        transitionDuration: 1,
        openBtnSelector: '[data-component="dropdown_toggle"]',
        dropdownContainerSelector: '.dropdown_container',
        dropdownBarSelector: '.dropdown_bar',
        closeOnResize: true,
        listenToCloseSignal: true,
        cancelDropdownOnGreaterThan: 899    //px
    });
    
    var fixedHeader = new FixedHeader();
    
    var animatedButtonElemsErr = document.querySelectorAll('.animated_button');
    if (animatedButtonElemsErr.length > 0) {
        var animatedButtonsArr = [];
        for (var i = 0; i < animatedButtonElemsErr.length; i++) {
//            console.log('========= ANIMATED BUTTON ' + i + ' =========');
            animatedButtonsArr[i] = new AnimatedButton({
                elem: animatedButtonElemsErr[i],
                animationDuration: 6  //s
            });
        }
    }
    
    var sideMenuElem = document.querySelector('.side_menu .dropdown');
    if (sideMenuElem) {
//        console.log('========= SIDE MENU =========');
        var sideMenu = new Menu({
            elem: sideMenuElem,
            transitionDuration: 1,
            openBtnSelector: '[data-component="dropdown_toggle"]',
            dropdownContainerSelector: '.dropdown_container',
            dropdownBarSelector: '.dropdown_bar',
            closeOnResize: true,
            listenToCloseSignal: true,
            cancelDropdownOnGreaterThan: 899,    //px
            horizontal: true
        });
    }
    
    var pageSliderElem = document.querySelector('.page_slider');
    if (pageSliderElem) {
//        console.log('========= PAGE SLIDER SCROLL =========');
        var pageSlidesScroll = new PageSlidesScroll({
            elem: pageSliderElem,
            minWidth: 992
        });
    } else {
        var clickSmoothScroll = new ClickSmoothScroll();
    }
    
    var mainSliderElem = document.querySelector('#main_slider');
    if (mainSliderElem) {
//        console.log('========= MAIN SLIDER =========');
        window.mainSlider = new PageHeightSlider({
            elem: mainSliderElem,
            delay: 5000
        });
    }

    var contactFormElem = document.querySelector('#contact_form');
    if (contactFormElem) {
//        console.log('========= CONTACT FORM =========');
        var contactForm = new ContactFormController({
            elem: contactFormElem
        });
    }
    
    var masonryTabsElem = document.querySelector('.masonry-tabs');
    if (masonryTabsElem) {
//        console.log('========= MASONRY TABS =========');
        var masonryTabs = new MasonryTabs({
            elem: masonryTabsElem,
            itemsGroupClassArr: ['grid-item', 'smm_smo', 'ppc', 'seo', 'web', 'polygraphy'],
            masonryOptionsObj: {
                itemSelector: '.grid-item',
                columnWidth: '.grid-item.width-x-1',
//                fitWidth: true,
//                percentPosition: true,
                gutter: 15
            }
        });
        
        var masonryFixedHeightSlide = new FixedHeightSlide({
            elem: document.querySelector('.partners .container')
        });
    }

    var feedbackSliderElem = document.querySelector('#feedback_slider');
    if (feedbackSliderElem) {
//        console.log('========= FEEDBACK SLIDER =========');
        var feedbackSlider = new Slider({
            elem: feedbackSliderElem,
            delay: 0
        });
    }
    
    var polygraphySliderElem = document.querySelector('#polygraphy_slider');
    if (polygraphySliderElem) {
//        console.log('========= POLYGRAPHY SLIDER =========');
        var polygraphySlider = new Slider({
            elem: polygraphySliderElem,
            delay: 0
        });
    }
    
    var animatedBlocksSectionElem = document.querySelector('.smm_scope');
    if (animatedBlocksSectionElem) {
//        console.log('========= ANIMATED BLOCKS =========');
        var animatedBlocksSection = new SmmBlocksAnimation({
            elem: animatedBlocksSectionElem
        });
    }
    
    var compareDropdownElem = document.querySelector('#compare_dropdown');
    if (compareDropdownElem) {
//        console.log('========= COMPARE DROPDOWN =========');
        var compareDropdown = new Dropdown({
            elem: compareDropdownElem,
            transitionDuration: 0.5,
            openBtnSelector: '[data-component="dropdown_toggle"]',
            dropdownContainerSelector: '.dropdown_container',
            dropdownBarSelector: '.dropdown_bar',
            closeOnResize: true
        });
    }
    
    var changeClassSliderElem = document.querySelector('.change_class_slider');
    if (changeClassSliderElem) {
//        console.log('========= CHANGE CLASS SLIDER =========');
        var changeClassSlider = new ChangeClassSlider({
            elem: changeClassSliderElem
        });
    }

})();