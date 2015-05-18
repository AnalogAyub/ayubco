var JSONP = function(url) {
  var e;
  e = document.createElement('script');
  e.src = url;
  document.getElementsByTagName('body')[0].appendChild(e);
};

var addBook = function(response) {
  var str;
  str = response.results.latestBooks[0].book;
  if (str.length < 25) {
    document.getElementById('book').innerHTML = str;
  }
};

var addSong = function(response) {
  var str;
  var rmv = "-";
  str = response.results.likes[0].song.text;
  str = str.slice(str.indexOf(rmv) + rmv.length);
  str = str.replace(/ *\[[^)]*\] */g, " ").trim();
  if (str.length < 35) {
    document.getElementById('song').innerHTML = str;
  }
};

JSONP('https://www.kimonolabs.com/api/3s8055me?apikey=cY8WaZ10hl5gD1RlLuHuhpg8JicmWqwf&callback=addBook');
JSONP('https://www.kimonolabs.com/api/8v4x74bc?apikey=cY8WaZ10hl5gD1RlLuHuhpg8JicmWqwf&callback=addSong');

InstantClick.init();

var layzr = new Layzr({
  selector: '[data-layzr]',
  attr: 'data-layzr',
  retinaAttr: 'data-layzr-retina',
  bgAttr: 'data-layzr-bg',
  threshold: 35,
  callback: function() {
    this.classList.add('loaded');
  }
});

function isTouchDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
}

function scrollEvent(){
  var svgOffset = jQuery('svg')[0].offsetTop;
  var viewportTop = $(window).scrollTop();
  var windowHeight = $(window).height();
  var viewportBottom = windowHeight+viewportTop;
  if($(window).width()) {
    if(!isTouchDevice()){
      $('.bgCover').each(function(){
        var distance = viewportTop / windowHeight * 2;
        $(this).css('opacity', distance);
      });

      $('header').each(function(){
        var distance = viewportTop / windowHeight * 2;
        // var vDistance = viewportTop * 0.2;
        $(this).css('opacity', 1 - distance);
        // $(this).css('transform','translate3d(0, ' + '' + vDistance +'px,0)');
      });
    }
  }

  if(viewportBottom > svgOffset) {
    $('body').addClass('svgInViewport');
  }

  // if(viewportTop >= navOffset) {
  //     $('.hiddenNav').addClass('active');
  //     $('nav').addClass('active');
  // } else {
  //     $('.hiddenNav').removeClass('active');
  //     $('nav').removeClass('active');
  // }
 
}

(function(i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

$(document).ready(function(){
  function draw() {
    requestAnimationFrame(draw);
    scrollEvent();
  }
  draw();
  ga('create', 'UA-61542151-1', 'auto');
  ga('send', 'pageview');
});