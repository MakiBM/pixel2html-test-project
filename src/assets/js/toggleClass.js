'use strict';

var toggleClass = function(el, className) {
  var classArr = el.getAttribute('class').split(' ');
  var index = classArr.indexOf(className);
  if (index === -1) { classArr.push(className); } // add
  else { classArr.splice(index, 1); } // remove
  el.setAttribute('class', classArr.join(' ')); // put back as string
};

module.exports = toggleClass;
