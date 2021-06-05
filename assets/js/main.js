// Navbar transparency
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

// Mobile navbar
function openNav() {
  document.getElementById("Sidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("Sidenav").style.width = "0";
}

// Copy text from element
function copy_text() {
  var el = document.createElement('textarea');
  el.value = document.querySelector(".icontext").textContent;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  
  var icontextwrapper = document.getElementsByClassName("icontext-wrapper");
  var element = document.createElement("div");
  element.className = 'copied-text';
  element.appendChild(document.createTextNode("Copied"));
  
  if (document.body.contains(document.getElementsByClassName("copied-text")[0])) {
    return;
  }

  icontextwrapper[0].appendChild(element);

  setTimeout(function(){
    icontextwrapper[0].removeChild(element);
  },1600);
}

//Title rotation
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {delta /= 2;}

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } 
  else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  
  setTimeout(function () {
    that.tick();
  }, delta);
};
  
  
window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {if (window.CP.shouldStopExecution(0)) break;
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};