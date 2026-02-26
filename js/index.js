// const overlays = document.querySelectorAll("[class^=overlay-]");

// const tl = new TimelineMax();

// tl.staggerTo(overlays, 0.8, { width: 0, ease: Power4.easeInOut }, 0.05);

const productDetails = document.querySelectorAll("[class^=product-details]");
const endFrameText = document.querySelector(".end-frame-text");

const productDetailsLines = new SplitText(productDetails, {
  type: "lines",
  linesClass: "product-details-line++",
});
const endFrameTextLines = new SplitText(endFrameText, {
  type: "lines",
  linesClass: "end-frame-text-line-++",
});

console.log(endFrameTextLines);
