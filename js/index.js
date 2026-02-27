// Elements
// Header
const header = document.querySelector(".header");

// Logo
const brandContainer = document.querySelector(".logo");
const brandLogo = document.querySelectorAll(".logo svg")[0];
const brandText = document.querySelectorAll(".logo svg")[1];

// Panel 1
const panel1 = document.querySelector(".panel-1");
const overlays = document.querySelectorAll("[class^=overlay-]");

// Panel 2
const panel2 = document.querySelector(".panel-2");
const imageContainer = document.querySelector(".img");
const images = document.querySelectorAll(".img img");
const img1 = images[0];
const img2 = images[1];

const productDetails1 = document.querySelector(".product-details-1");
const productDetails2 = document.querySelector(".product-details-2");
const productDetails3 = document.querySelector(".product-details-3");
const cta = document.querySelector(".cta");

const endFrame = document.querySelector(".end-frame");
const endFrameText = document.querySelector(".end-frame-text");

// Playback controls
const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const reverseButton = document.querySelector(".reverse-button");
const resumeButton = document.querySelector(".resume-button");
const restartButton = document.querySelector(".restart-button");
const playIcon = document.querySelector("#play-icon");
const pauseIcon = document.querySelector("#pause-icon");
const reverseIcon = document.querySelector("#reverse-icon");
const resumeIcon = document.querySelector("#resume-icon");
const restartIcon = document.querySelector("#restart-icon");

// Progress bar
const progressBar = document.querySelector(".scrub-bar");

// Timeline
function createSplitText(element, type, lineClass) {
  return new SplitText(element, {
    type: type,
    linesClass: lineClass,
  });
}

function init() {
  const tl = new TimelineMax({
    onUpdate: () => {
      console.log(tl.time());
      progressBar.step = 0.001;
      progressBar.value = tl.progress() * 1;
      progressBar.style.background = `linear-gradient(to right, #000 0%, #000 ${tl.progress() * 100}%, #f0f0f0 ${tl.progress() * 100}%, #f0f0f0 100%)`;
    },
  });
  const { lines: productDetails1Lines } = createSplitText(
    productDetails1,
    "lines",
    "product-details-line-++"
  );

  const { lines: productDetails2Lines } = createSplitText(
    productDetails2,
    "lines",
    "product-details-line-++"
  );
  const { lines: productDetails3Lines } = createSplitText(
    productDetails3,
    "lines",
    "product-details-line-++"
  );
  const { lines: endFrameTextLines } = createSplitText(
    endFrameText,
    "lines",
    "end-frame-text-line-++"
  );

  // Animate overlays
  tl.staggerTo(
    overlays,
    0.6,
    {
      width: 0,
      ease: Power1.easeInOut,
    },
    0.05
  )
    .add("wipe-scene")
    // Brand Logo from center leaving banner
    .fromTo(
      brandLogo,
      0.6,
      { xPercent: 0, ease: Power4.easeIn },
      { xPercent: -200, ease: Power4.easeIn },
      "wipe-scene+=0.4"
    )
    .fromTo(
      brandText,
      0.6,
      { xPercent: 0, ease: Power4.easeIn },
      { xPercent: 160, ease: Power4.easeIn },
      "wipe-scene+=0.4"
    )
    .fromTo(
      header,
      0.6,
      { autoAlpha: 0, yPercent: -150, ease: Power4.easeOut },
      { autoAlpha: 1, yPercent: 0, ease: Power4.easeOut },
      "-=0.2"
    )
    // Animate header to slide in
    .add("header-scene")
    // Animate brand logo to slide-in in header
    .fromTo(
      brandLogo,
      0.5,
      {
        width: 32,
        height: 19,
        left: "unset",
        top: 10,
        fill: "#fff",
        ease: Power4.easeOut,
        immediateRender: false,
      },
      { x: 0, xPercent: 0, left: 10, ease: Power4.easeOut },
      "header-scene-=0.1"
    )
    .fromTo(
      brandText,
      0.5,
      {
        width: 128,
        height: 8,
        left: "unset",
        top: 16,
        right: 0,
        y: 0,
        fill: "#fff",
        ease: Power4.easeOut,
        immediateRender: false,
      },
      {
        x: 0,
        xPercent: 0,
        right: 10,
        ease: Power4.easeOut,
      },
      "header-scene-=0.1"
    )
    // Prepare panel 2
    .set(panel2, { top: 40 }, "panel2-scene")
    // Set image container to take up the whole height
    .set(imageContainer, { minHeight: 600 }, "panel2-scene")
    // Slide-in from right the first product image
    .fromTo(
      imageContainer,
      0.6,
      { autoAlpha: 0, x: 304, ease: Power1.easeOut },
      { autoAlpha: 1, x: 0, ease: Power1.easeOut },
      "panel2-scene"
    )
    // Decrease the height of image container
    .to(imageContainer, 0.4, { minHeight: 280 }, "-=0.5")
    // Slide up (stagger) first product detail lines
    .staggerFromTo(
      productDetails1Lines,
      0.6,
      { autoAlpha: 0, y: "+=50", ease: Power4.easeOut },
      { autoAlpha: 1, y: 0, ease: Power4.easeOut },
      0.1,
      "-=0.2"
    )
    // Animate CTA
    .fromTo(
      cta,
      0.4,
      { autoAlpha: 0, scale: 0, ease: Back.easeOut.config(1.5) },
      { autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.5) },
      "-=0.5"
    )
    .add("product-1-leave-scene")
    // Fade out first product image and product details
    .to(imageContainer, 0.5, { autoAlpha: 0 }, "product-1-leave-scene+=0.5")
    .to(
      productDetails1Lines,
      0.5,
      { autoAlpha: 0 },
      "product-1-leave-scene+=0.5"
    )
    // Enter second product
    .add("product-2-enter-scene")
    // Set first product opacity to 0
    .set(img1, { autoAlpha: 0 }, "product-2-enter-scene")
    // Set product details display to none
    .set(productDetails1, { display: "none" }, "product-2-enter-scene")
    // Set product details 3 opacity to 0
    .set(productDetails3, { autoAlpha: 0 }, "product-2-enter-scene")
    .to(
      imageContainer,
      0.6,
      { x: -304, autoAlpha: 1, ease: Power1.easeOut },
      "product-2-enter-scene"
    )
    .staggerFromTo(
      productDetails2Lines,
      0.6,
      { autoAlpha: 0, y: "+=50", ease: Power4.easeOut },
      { autoAlpha: 1, y: 0, ease: Power4.easeOut },
      0.1,
      "-=0.5"
    )
    // Fade out second product image and product details
    .to(imageContainer, 0.5, { autoAlpha: 0 }, "product-2-leave-scene+=0.5")
    .to(
      productDetails2Lines,
      0.5,
      { autoAlpha: 0 },
      "product-2-leave-scene+=0.5"
    )
    // Enter third product
    .add("product-3-enter-scene")
    // Set second product opacity to 0
    .set(img2, { autoAlpha: 0 }, "product-3-enter-scene")
    // Set second product details display to none
    .set(productDetails2, { display: "none" }, "product-3-enter-scene")
    // Set product details 3 opacity to 1
    .set(productDetails3, { autoAlpha: 1 }, "product-3-enter-scene")
    .to(
      imageContainer,
      0.6,
      { x: -608, autoAlpha: 1, ease: Power1.easeOut },
      "product-3-enter-scene"
    )
    .staggerFromTo(
      productDetails3Lines,
      0.6,
      { autoAlpha: 0, y: "+=50", ease: Power4.easeOut },
      { autoAlpha: 1, y: 0, ease: Power4.easeOut },
      0.1,
      "-=0.5"
    )
    .add("product-3-leave-scene")
    // Fade out third product image and product details
    .to(imageContainer, 0.5, { autoAlpha: 0 }, "product-3-leave-scene+=0.5")
    .to(
      productDetails3Lines,
      0.5,
      { autoAlpha: 0 },
      "product-3-leave-scene+=0.5"
    )
    .add("end-frame-text-scene", "+=0.2")
    .to(
      imageContainer,
      0.6,
      { minHeight: 0, height: 0, ease: Power1.easeOut },
      "end-frame-text-scene"
    )
    .to(
      cta,
      0.6,
      { top: 350, left: 80, ease: Power2.easeOut },
      "end-frame-text-scene"
    )
    .fromTo(
      endFrame,
      1,
      { autoAlpha: 0, ease: Power4.easeOut },
      { autoAlpha: 1, ease: Power4.easeOut },
      "end-frame-text-scene"
    )
    .staggerFromTo(
      endFrameTextLines,
      1,
      { autoAlpha: 0, x: -250, ease: Power4.easeOut },
      { autoAlpha: 1, x: 0, ease: Power4.easeOut },
      1,
      "end-frame-text-scene+=0.1"
    );

  // Handlers
  playButton.addEventListener("click", () => {
    if (tl.progress() === 1) tl.restart();

    tl.play();
  });
  pauseButton.addEventListener("click", () => {
    tl.pause();
  });
  reverseButton.addEventListener("click", () => {
    tl.reverse();
  });
  resumeButton.addEventListener("click", () => {
    tl.resume();
  });
  restartButton.addEventListener("click", () => {
    tl.restart();
  });

  // This function will run continuously as the thumb is dragged
  progressBar.addEventListener("input", function (e) {
    const value = e.target.value;
    this.style.background = `linear-gradient(to right, #000 0%, #000 ${value * 100}%, #f0f0f0 ${value * 100}%, #f0f0f0 100%)`;

    // tl.pause();
    tl.progress(value);
  });

  playButton.addEventListener("mouseenter", () => {
    TweenLite.set(playIcon, {
      fill: "#fff",
    });
    TweenLite.set(playButton, {
      backgroundColor: "#000",
    });
  });

  playButton.addEventListener("mouseleave", () => {
    TweenLite.set(playIcon, {
      fill: "#000",
    });
    TweenLite.set(playButton, {
      backgroundColor: "#fff",
    });
  });

  pauseButton.addEventListener("mouseenter", () => {
    TweenLite.set(pauseIcon, {
      fill: "#fff",
    });
    TweenLite.set(pauseButton, {
      backgroundColor: "#000",
    });
  });

  pauseButton.addEventListener("mouseleave", () => {
    TweenLite.set(pauseIcon, {
      fill: "#000",
    });
    TweenLite.set(pauseButton, {
      backgroundColor: "#fff",
    });
  });

  reverseButton.addEventListener("mouseenter", () => {
    TweenLite.set(reverseIcon, {
      fill: "#fff",
    });
    TweenLite.set(reverseButton, {
      backgroundColor: "#000",
    });
  });

  reverseButton.addEventListener("mouseleave", () => {
    TweenLite.set(reverseIcon, {
      fill: "#000",
    });
    TweenLite.set(reverseButton, {
      backgroundColor: "#fff",
    });
  });

  resumeButton.addEventListener("mouseenter", () => {
    TweenLite.set(resumeIcon, {
      fill: "#fff",
    });
    TweenLite.set(resumeButton, {
      backgroundColor: "#000",
    });
  });

  resumeButton.addEventListener("mouseleave", () => {
    TweenLite.set(resumeIcon, {
      fill: "#000",
    });
    TweenLite.set(resumeButton, {
      backgroundColor: "#fff",
    });
  });

  restartButton.addEventListener("mouseenter", () => {
    TweenLite.set(restartIcon, {
      fill: "#fff",
    });
    TweenLite.set(restartButton, {
      backgroundColor: "#000",
    });
  });

  restartButton.addEventListener("mouseleave", () => {
    TweenLite.set(restartIcon, {
      fill: "#000",
    });
    TweenLite.set(restartButton, {
      backgroundColor: "#fff",
    });
  });
}

window.addEventListener("load", init);
