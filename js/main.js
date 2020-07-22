window.addEventListener("load", function () {
    // Grab all the scroll class anchor elements, use whatever class you like
    var scrollElems = document.querySelectorAll(".scroll");
    // Now add an event listeners to those element
    for (var i = 0; i < scrollElems.length; i++) {
        var elem = scrollElems[i];
        elem.addEventListener("click", function (e) {
            e.preventDefault();
            var event = e.target;
            var scrollElemId = event.href.split("#")[1];
            var scrollEndElem = document.getElementById(scrollElemId);
            var anim = requestAnimationFrame(function (timestamp) {
                var stamp = timestamp || new Date().getTime();
                var duration = 1200;
                var start = stamp;
                var startScrollOffset = window.pageYOffset;
                var scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
                scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
            });
        });
    }
    // Lets ignore it for the moment.
    var easeInCubic = function (t) { return t * t * t; };
    var scrollToElem = function (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) {
        var runtime = currentTime - startTime;
        var progress = runtime / duration;
        progress = Math.min(progress, 1);
        var ease = easeInCubic(progress);
        window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
        if (runtime < duration) {
            requestAnimationFrame(function (timestamp) {
                var currentTime = timestamp || new Date().getTime();
                scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
            });
        }
    };
});
