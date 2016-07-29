'use strict';

var toggleClass = require('./toggleClass');


var Dropdown = function(el) {
  if (typeof el === 'undefined') { throw 'Dropdown: argument missing for initialisation.'; }
  if (!el.nodeType) { throw 'Dropdown: passed argument is not a node.'; }
  if (!(this instanceof Dropdown)) { return new Dropdown(el); }
  this.el = el;
  this.init();
};

Dropdown.fn = Dropdown.prototype = {

  classNames: {
    face: 'dropdown__face',
    box: 'dropdown__box',
    current: 'dropdown__current',
    items: 'dropdown__item',
    muted: 'dropdown__item--muted',
    active: 'dropdown__box--active'
  },

  init: function() {
    this.cacheElements();
    this.bindEvents();
    this.hideCurrentFromList();
  },

  cacheElements: function() {
    this.triggerNode = this.el.querySelector('.' + this.classNames.face);
    this.boxNode = this.el.querySelector('.' + this.classNames.box);
    this.currentNode = this.el.querySelector('.' + this.classNames.current);
    this.itemNodeList = this.el.querySelectorAll('.' + this.classNames.items);
  },

  bindEvents: function() {
    this.triggerNode.addEventListener('click', this.toggleBox.bind(this));
    this.boxNode.addEventListener('click', this.setOption.bind(this));
  },

  hideCurrentFromList: function() {
    var current = this.currentNode.innerHTML;
    for(var i = 0, l = this.itemNodeList.length; i < l; i++) {
      var str = this.itemNodeList[0].innerHTML;
      if (str === current) { toggleClass(this.itemNodeList[0], this.classNames.muted); }
    }
  },

  toggleBox: function() {
    toggleClass(this.boxNode, this.classNames.active);
  },

  setOption: function(e) {
    var itemNode = e.target;
    var current = itemNode.innerHTML;
    this.currentNode.innerHTML = current;
    console.log(this.boxNode.querySelector('.' + this.classNames.muted), itemNode);
    toggleClass(this.boxNode.querySelector('.' + this.classNames.muted), this.classNames.muted);
    toggleClass(itemNode, this.classNames.muted);
    this.toggleBox();
  }

};

module.exports = Dropdown;
