'use strict';

var doc = document;
var toggleClass = require('./toggleClass');


var Burger = function(el) {
  if (typeof el === 'undefined') { throw 'Burger: argument missing for initialisation.'; }
  if (!el.nodeType) { throw 'Burger: passed argument is not a node.'; }
  if (!(this instanceof Burger)) { return new Burger(el); }
  this.el = el;
  this.isOpened = false;
  this.init();
};

Burger.fn = Burger.prototype = {

  classNames: {
    burger: 'header__burger',
    burgerActive: 'burger--active',
    nav: 'header__nav',
    navActive: 'header__nav--active'
  },

  init: function() {
    this.cacheElements();
    this.bindEvents();
  },

  cacheElements: function() {
    this.burgerNode = doc.querySelector('.' + this.classNames.burger);
    this.navNode = doc.querySelector('.' + this.classNames.nav);
  },

  bindEvents: function() {
    var that = this;
    this.burgerNode.addEventListener('click', this.toggle.bind(this));
    this.navNode.addEventListener('click', function(e) {
      e.stopPropagation();
      if (e.target.nodeName !== 'A') { return; }
      that.toggle();
    });
    doc.body.addEventListener('click', function() {
      if (that.isOpened) { that.toggle(); }
    });
  },

  toggle: function(e) {
    if (typeof e !== 'undefined') {
      e.preventDefault();
      e.stopPropagation();
    }
    this.isOpened = !this.isOpened;
    toggleClass(this.burgerNode, this.classNames.burgerActive);
    toggleClass(this.navNode, this.classNames.navActive);
  }

};

module.exports = Burger;
