var JSONP, addBook, addSong, ga, viewportTop, windowHeight, viewportBottom, distance, vDistance;
var navOffset = jQuery('nav')[0].offsetTop;

function isTouchDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
}

function scrollEvent(){
 
        viewportTop = $(window).scrollTop();
        windowHeight = $(window).height();
        viewportBottom = windowHeight+viewportTop;
 
        if($(window).width()) {
 
        if(!isTouchDevice()){
            $('.bgCover').each(function(){
                distance = viewportTop / windowHeight;
                $(this).css('opacity', distance);
            });

            $('header').each(function(){
                distance = viewportTop / windowHeight * 2;
                vDistance = viewportTop * 0.2;
                $(this).css('opacity', 1 - distance);
                $(this).css('transform','translate3d(0, ' + '' + vDistance +'px,0)');
            });
        }}

        if(viewportTop >= navOffset) {
            $('.hiddenNav').addClass('active');
            $('nav').addClass('active');
        } else {
            $('.hiddenNav').removeClass('active');
            $('nav').removeClass('active');
        }
 
}  

$(document).ready(function(){
 
    function draw() {
        requestAnimationFrame(draw);
        // Drawing code goes here
        scrollEvent();
    }
    draw();
 
});

JSONP = function(url) {
  var e;
  e = document.createElement('script');
  e.src = url;
  document.getElementsByTagName('body')[0].appendChild(e);
};

addBook = function(response) {
  var str;
  str = response.results.latestBooks[0].book;
  if (str.length < 25) {
    document.getElementById('book').innerHTML = str;
  }
};

addSong = function(response) {
  var str;
  str = response.results.likes[0].song.text;
  if (str.length < 20) {
    document.getElementById('song').innerHTML = str;
  }
};

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

ga('create', 'UA-61542151-1', 'auto');
ga('send', 'pageview');
JSONP('https://www.kimonolabs.com/api/3s8055me?&apikey=09ea27c97f5d885d54ef4c502c6f0f48&callback=addBook');
JSONP('https://www.kimonolabs.com/api/8v4x74bc?apikey=09ea27c97f5d885d54ef4c502c6f0f48&callback=addSong');