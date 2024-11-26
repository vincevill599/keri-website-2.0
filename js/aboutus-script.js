function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  const obj = document.getElementById("value");
  const obj2 = document.getElementById("value2");
  const obj3 = document.getElementById("value3");
  const obj4 = document.getElementById("value4");

var firstScroll = false;

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {
  if (isScrolledIntoView('.trigger-count') && !firstScroll) {
    animateValue(obj, 0, 24, 600);
    animateValue(obj2, 0, 80000, 700);
    animateValue(obj3, 0, 22000, 800);
    animateValue(obj4, 0, 14000, 900);

    firstScroll = true
  }
});