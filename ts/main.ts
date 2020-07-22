window.addEventListener("load", function () {
    // Grab all the scroll class anchor elements, use whatever class you like
  const scrollElems = document.querySelectorAll(".scroll");
  
  // Now add an event listeners to those element

  for (let i = 0; i < scrollElems.length; i++) {
    const elem = scrollElems[i];

    elem.addEventListener("click", function (e:Event) {
      e.preventDefault();
        let event = e.target as HTMLAnchorElement;

      const scrollElemId = event.href.split("#")[1];

      const scrollEndElem = document.getElementById(scrollElemId);

      const anim = requestAnimationFrame((timestamp) => {
        const stamp = timestamp || new Date().getTime();
        const duration = 1200;
        const start = stamp;

        const startScrollOffset = window.pageYOffset;
        const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

        scrollToElem(
          start,
          stamp,
          duration,
          scrollEndElemTop,
          startScrollOffset
        );
      });
    });
  }

    // Lets ignore it for the moment.
    const easeInCubic = function (t) { return t*t*t }
    
    const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
    const runtime = currentTime - startTime;
    let progress = runtime / duration;
    
    progress = Math.min(progress, 1);
    
    const ease = easeInCubic(progress);
    
    window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));

        if(runtime < duration){
            requestAnimationFrame((timestamp) => {
                const currentTime = timestamp || new Date().getTime();
                scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
            })
        }
    }
  
})