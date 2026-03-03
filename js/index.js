// ── Constants ────────────────────────────────────────────────────────
const SLIDE_WIDTH = 304;
const EXIT_LINKS = {
  site: "https://www.underarmour.com/",
  product1:
    "https://www.underarmour.com/en-us/p/curry_3z_25_sde_unisex_basketball_shoes/6000750.html?dwvar_6000750_color=002",
  product2:
    "https://www.underarmour.com/en-us/p/ua_explor_trail_unisex_shoes/6012791.html?dwvar_6012791_color=004",
  product3:
    "https://www.underarmour.com/en-us/p/ua_reign_xt_mens_training_shoes/6005926.html?dwvar_6005926_color=592",
};

// ── DOM Elements ─────────────────────────────────────────────────────
const banner = document.querySelector(".banner");
const header = document.querySelector(".header");

const brandLogo = document.querySelectorAll(".logo svg")[0];
const brandText = document.querySelectorAll(".logo svg")[1];

const panel1 = document.querySelector(".panel-1");
const overlays = document.querySelectorAll("[class^=overlay-]");

const panel2 = document.querySelector(".panel-2");
const imageContainer = document.querySelector(".img");
const images = document.querySelectorAll(".img img");
const img1 = images[0];
const img2 = images[1];

const productDetails = [
  document.querySelector(".product-details-1"),
  document.querySelector(".product-details-2"),
  document.querySelector(".product-details-3"),
];
const cta = document.querySelector(".cta");

const endFrame = document.querySelector(".end-frame");
const endFrameText = document.querySelector(".end-frame-text");

const controls = {
  play: {
    button: document.querySelector(".play-button"),
    icon: document.querySelector("#play-icon"),
  },
  pause: {
    button: document.querySelector(".pause-button"),
    icon: document.querySelector("#pause-icon"),
  },
  reverse: {
    button: document.querySelector(".reverse-button"),
    icon: document.querySelector("#reverse-icon"),
  },
  resume: {
    button: document.querySelector(".resume-button"),
    icon: document.querySelector("#resume-icon"),
  },
  restart: {
    button: document.querySelector(".restart-button"),
    icon: document.querySelector("#restart-icon"),
  },
};

const progressBar = document.querySelector(".scrub-bar");

// ── Helpers ──────────────────────────────────────────────────────────
function createSplitText(element, type, lineClass) {
  return new SplitText(element, { type, linesClass: lineClass });
}

function updateProgressGradient(progress) {
  const value = progress * 100;
  return `linear-gradient(to right, #000 0%, #000 ${value}%, #f0f0f0 ${value}%, #f0f0f0 100%)`;
}

function addButtonHover(button, icon) {
  button.addEventListener("mouseenter", () => {
    TweenLite.set(icon, { fill: "#fff" });
    TweenLite.set(button, { backgroundColor: "#000" });
  });
  button.addEventListener("mouseleave", () => {
    TweenLite.set(icon, { fill: "#000" });
    TweenLite.set(button, { backgroundColor: "#fff" });
  });
}

function setExitLink(exitUrl) {
  cta.onclick = () => {
    window.location.href = exitUrl;
  };
  panel2.onclick = () => {
    window.location.href = exitUrl;
  };
}

function addProductScene(
  tl,
  { index, prevImg, prevDetails, currentDetailsLines, exitUrl }
) {
  const enterLabel = `product-${index}-enter-scene`;
  const leaveLabel = `product-${index}-leave-scene`;

  if (index === 1) {
    // First product slides in from the right
    tl.fromTo(
      imageContainer,
      0.6,
      { autoAlpha: 0, x: SLIDE_WIDTH, ease: Power1.easeOut },
      {
        autoAlpha: 1,
        x: 0,
        ease: Power1.easeOut,
        onStart: () => setExitLink(exitUrl),
      },
      "panel2-scene"
    ).to(imageContainer, 0.4, { minHeight: 280 }, "-=0.5");
  } else {
    tl.add(enterLabel);
    if (prevImg) tl.set(prevImg, { autoAlpha: 0 }, enterLabel);
    if (prevDetails) tl.set(prevDetails, { display: "none" }, enterLabel);

    tl.to(
      imageContainer,
      0.6,
      {
        x: -SLIDE_WIDTH * (index - 1),
        autoAlpha: 1,
        ease: Power1.easeOut,
        onStart: () => setExitLink(exitUrl),
      },
      enterLabel
    );
  }

  // Stagger-in the product detail lines
  tl.staggerFromTo(
    currentDetailsLines,
    0.6,
    { autoAlpha: 0, y: "+=50", ease: Power4.easeOut },
    { autoAlpha: 1, y: 0, ease: Power4.easeOut },
    0.1,
    index === 1 ? "-=0.2" : "-=0.5"
  );

  if (index === 1) {
    // CTA entrance (only for first product)
    tl.fromTo(
      cta,
      0.4,
      { autoAlpha: 0, scale: 0, ease: Back.easeOut.config(1.5) },
      { autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.5) },
      "-=0.5"
    );
  } else {
    tl.to(
      cta,
      0.06,
      {
        rotation: 2,
        repeat: 3,
        yoyo: true,
        ease: Power1.easeOut,
      },
      "-=0.1"
    );
  }

  // Leave scene — fade out image + details
  tl.add(leaveLabel);
  tl.to(imageContainer, 0.5, { autoAlpha: 0 }, `${leaveLabel}+=0.5`);
  tl.to(currentDetailsLines, 0.5, { autoAlpha: 0 }, `${leaveLabel}+=0.5`);
}

// ── Main Timeline ────────────────────────────────────────────────────
function init() {
  const tl = new TimelineMax({
    onUpdate: () => {
      progressBar.step = 0.001;
      progressBar.value = tl.progress();
      progressBar.style.background = updateProgressGradient(tl.progress());
      console.log(tl.time());
    },
  });

  // Split text for each product detail block + end frame
  const splitLines = productDetails.map(
    (el) => createSplitText(el, "lines", "product-details-line-++").lines
  );

  const { lines: endFrameTextLines } = createSplitText(
    endFrameText,
    "lines",
    "end-frame-text-line-++"
  );

  // ── Scene 1: Overlay wipe ──────────────────────────────────────────
  tl.staggerTo(overlays, 0.6, { width: 0, ease: Power1.easeInOut }, 0.05).add(
    "wipe-scene"
  );

  // Panel 1 click exit (set once)
  panel1.addEventListener("click", () => {
    window.location.href = EXIT_LINKS.site;
  });

  // ── Scene 2: Brand logo split & header slide-in ────────────────────
  tl.fromTo(
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
    .add("header-scene")
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
      { x: 0, xPercent: 0, right: 10, ease: Power4.easeOut },
      "header-scene-=0.1"
    );

  // ── Scene 3: Product carousel ──────────────────────────────────────
  tl.set(panel2, { top: 40 }, "panel2-scene").set(
    imageContainer,
    { minHeight: 600 },
    "panel2-scene"
  );

  const productScenes = [
    {
      index: 1,
      prevImg: null,
      prevDetails: null,
      currentDetailsLines: splitLines[0],
      exitUrl: EXIT_LINKS.product1,
    },
    {
      index: 2,
      prevImg: img1,
      prevDetails: productDetails[0],
      currentDetailsLines: splitLines[1],
      exitUrl: EXIT_LINKS.product2,
    },
    {
      index: 3,
      prevImg: img2,
      prevDetails: productDetails[1],
      currentDetailsLines: splitLines[2],
      exitUrl: EXIT_LINKS.product3,
    },
  ];

  productScenes.forEach((scene) => addProductScene(tl, scene));

  // ── Scene 4: End frame ─────────────────────────────────────────────
  tl.add("end-frame-text-scene", "+=0.2")
    .to(
      imageContainer,
      0.6,
      { minHeight: 0, height: 0, ease: Power1.easeOut },
      "end-frame-text-scene"
    )
    .to(
      cta,
      0.6,
      {
        top: 350,
        left: 80,
        ease: Power2.easeOut,
        onStart: () => setExitLink(EXIT_LINKS.site),
      },
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

  // ── Playback controls ──────────────────────────────────────────────
  controls.play.button.addEventListener("click", () => {
    if (tl.progress() === 1) tl.restart();
    tl.play();
  });
  controls.pause.button.addEventListener("click", () => tl.pause());
  controls.reverse.button.addEventListener("click", () => tl.reverse());
  controls.resume.button.addEventListener("click", () => tl.resume());
  controls.restart.button.addEventListener("click", () => tl.restart());

  // Scrub bar drag
  progressBar.addEventListener("input", function (e) {
    const value = e.target.value;
    this.style.background = updateProgressGradient(value);
    tl.pause();
    tl.progress(value);
  });

  // Button hover effects
  Object.values(controls).forEach(({ button, icon }) =>
    addButtonHover(button, icon)
  );

  // CTA hover
  panel2.addEventListener("mouseenter", () => {
    TweenLite.to(cta, 0.3, {
      backgroundColor: "#fff",
      color: "#000",
      border: "1px solid #000",
      ease: Power1.easeOut,
    });
  });
  panel2.addEventListener("mouseleave", () => {
    TweenLite.to(cta, 0.3, {
      backgroundColor: "#000",
      color: "#fff",
      ease: Power1.easeOut,
    });
  });
}

window.addEventListener("load", init);
