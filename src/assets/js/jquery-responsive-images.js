'use strict';

var $ = require('jquery');
var win = window;


var ResponsiveImages = function(dataAttr) { // without data- prefix
  // get initial values. those will be changed when needed
  var $imgs = $('img[data-'+dataAttr+']');
  var viewportClass = getViewportClass();
  // set constant for retina screens
  var isRetina = win.devicePixelRatio >= 2;


  // Run and bind to events
  run($imgs);
  $(win).on('resize', handleResize);

  function run($imgs) {
      if(!$imgs.length) { return; } // Do not run if empty collection
      $imgs.each(setSrcAttr);
  }

  function setSrcAttr() {
      var $img = $(this);
      var set = $img.data(dataAttr)[0];
      var url = null;

      // Set src attribute to img link suitable for our logic. It will load the image.
      if (isRetina && set.x2) {
        if (viewportClass === 2 && set.x2.desktop) { url = set.x2.desktop; }
        else if (viewportClass === 1 && set.x2.tablet) { url = set.x2.tablet; }
        else if (viewportClass === 0 && set.x2.mobile) { url = set.x2.mobile; }
        else { url = set.x2.default; }
      }
      else if (!isRetina && set.x1) {
        if (viewportClass === 2 && set.x1.desktop) { url = set.x1.desktop; }
        else if (viewportClass === 1 && set.x1.tablet) { url = set.x1.tablet; }
        else if (viewportClass === 0 && set.x1.mobile) { url = set.x1.mobile; }
        else { url = set.x1.default; }
      }

      $img.attr('src', url);
  }

  function getViewportClass() {
      if (win.matchMedia('(max-width: 480px)').matches) { return 0; } // mobile
      else if (win.matchMedia('(max-width: 1024px)').matches) { return 1; } // tablet
      else { return 2; } // desktop
  }

  function handleResize() {
      if(!$imgs.length) { return; } // Do not run if empty collection
      var currentViewportClass = getViewportClass();
      viewportClass = currentViewportClass; // update for further reference
      run($imgs);
  }

  function handleAjax() {
      setTimeout(function ajaxDelayedCallback() { // give it a chance to insert content first
          var $newImgs = $('img[data-'+dataAttr+']').not($imgs); // grab all images and exclude initially loaded
          $imgs.add($newImgs); // extend global reference for whatever operation expecting all available imgs
          run($newImgs); // run on new images only
      }, 100);
  }

};

module.exports = ResponsiveImages;
