'use strict';

// Import npm modules
var $ = require('jquery');
var slick = require('slick-carousel-browserify');

// Import own modules
var burger = require('./burger');
var dropdown = require('./dropdown');
var resImages = require('./jquery-responsive-images');


var doc = document;
var forEach = Array.prototype.forEach;

// RUN
forEach.call(doc.querySelectorAll('.js-dropdown'), dropdown);
forEach.call(doc.querySelectorAll('.js-header__burger'), burger);
slick($('.js-slider'), { dots: true });
resImages('img-set');
