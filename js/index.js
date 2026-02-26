// const overlays = document.querySelectorAll("[class^=overlay-]");

// const tl = new TimelineMax();

// tl.staggerTo(overlays, 0.8, { width: 0, ease: Power4.easeInOut }, 0.05);

const details = document.querySelectorAll("[class^=product-details]");
const text = new SplitText(details, {
  type: "lines",
  linesClass: "product-details-line++",
});

console.log(text);
