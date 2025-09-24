// cursor animation
var cursor1 = document.querySelector(".gold-stone");
var cursor2 = document.querySelector(".alien");
// var cursor3 = document.querySelector(".alien-shine");
var cursor4 = document.querySelector(".green-coin2");
var cursor5 = document.querySelector(".green-coin3");
var cursor6 = document.querySelector(".green-coin4");
var cursor7 = document.querySelector(".gold-coin2");
var cursor8 = document.querySelector(".gold-coin3");
var cursor9 = document.querySelector(".gold-coin4");

const cursorElements = [
  cursor1,
  cursor2,
  cursor4,
  cursor5,
  cursor6,
  cursor7,
  cursor8,
  cursor9,
];
// animation start

window.addEventListener("load", function () {
  // loader
  const loader = document.querySelector(".loader");
  loader.className += " hide"; // class "loader hidden"
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

var cursor = document.querySelector("body");
document.addEventListener("mousemove", (e) => {
  var x = e.clientX * 0.02;
  var y = e.clientY * 0.02;

  cursorElements.forEach((element) => {
    element.style.transform = `translate(calc(5% - ${x}px), calc(5% - ${y}px))`;
  });
});

// carousel

// Carousel data
const carouselData = [
  { imgUrl: "./assets/le-pharoh.png" },
  { imgUrl: "./assets/crapless_bubble.png" },
  { imgUrl: "./assets/le-bandit.png" },
  { imgUrl: "./assets/snow-slingers.png" },
  { imgUrl: "./assets/wanted.png" },
  { imgUrl: "./assets/le-wiking.png" },
  { imgUrl: "./assets/coin.png" },
  { imgUrl: "./assets/2-wild-2-die.png" },
  { imgUrl: "./assets/crazy_time.png" },
  { imgUrl: "./assets/monopoly.png" },
  { imgUrl: "./assets/aztec-clusters.png" },
  { imgUrl: "./assets/donny-dough.png" },
  { imgUrl: "./assets/alien-fruits.png" },
];

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const dotsContainer = document.getElementById("carouselDots");

// Create carousel items
function createCarouselItems() {
  carousel.innerHTML = "";
  carouselData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.innerHTML = `
                    <img src="${item.imgUrl}" alt="Carousel Image ${index + 1}">
                `;
    carousel.appendChild(div);
  });
}

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";
  carouselData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === currentIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

// Update dots
function updateDots() {
  // const dots = dotsContainer.querySelectorAll('.dot');
  // dots.forEach((dot, index) => {
  //     dot.classList.toggle('active', index === currentIndex);
  // });
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = index;
  updatePositions();
  // updateDots();
}

// Update positions
function updatePositions() {
  const items = carousel.querySelectorAll(".carousel-item");
  const totalItems = items.length;

  items.forEach((item, index) => {
    // Remove all position classes
    item.className = "carousel-item";
    item.style.opacity = "";
    item.style.transform = "";

    // Calculate relative position
    let relativePos = index - currentIndex;

    // Handle infinite loop - normalize position to -2 to +2 range
    while (relativePos > 2) relativePos -= totalItems;
    while (relativePos < -2) relativePos += totalItems;

    // If still outside visible range, try the other direction
    if (relativePos > 2) {
      relativePos = relativePos - totalItems;
    } else if (relativePos < -2) {
      relativePos = relativePos + totalItems;
    }

    // Add position class based on relative position
    if (relativePos === 0) {
      item.classList.add("position-0");
    } else if (relativePos === 1) {
      item.classList.add("position-1");
    } else if (relativePos === 2) {
      item.classList.add("position-2");
    } else if (relativePos === -1) {
      item.classList.add("position--1");
    } else if (relativePos === -2) {
      item.classList.add("position--2");
    } else {
      // Hide items that are outside the 5-item view
      item.style.opacity = "0";
      item.style.transform = "translateX(0) scale(0.3)";
      item.style.pointerEvents = "none";
    }
  });
}

// Move carousel
function moveCarousel(direction) {
  const totalItems = carouselData.length;
  currentIndex = (currentIndex + direction + totalItems) % totalItems;
  updatePositions();
  updateDots();
}

// Auto-play functionality
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    moveCarousel(1);
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize carousel
createCarouselItems();
// createDots();
updatePositions();
startAutoPlay();

// Pause auto-play on hover
// carousel.addEventListener('mouseenter', stopAutoPlay);
//carousel.addEventListener('mouseleave', startAutoPlay);

// Touch/swipe support for mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  stopAutoPlay();
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;

  const diff = startX - currentX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      moveCarousel(1);
    } else {
      moveCarousel(-1);
    }
  }

  // startAutoPlay();
});

// Keyboard navigation
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft') {
//         moveCarousel(-1);
//     } else if (e.key === 'ArrowRight') {
//         moveCarousel(1);
//     }
// });

// offer sticker scroll
// function scrollFunctionStart() {
//   window.onscroll = function () {
//     scrollFunction();
//   };
// }
// scrollFunctionStart();

// const offerSticker = document.querySelector(".offer-sticker-cont");

// function scrollFunction() {
//   if (
//     (document.body.scrollTop > 200 ||
//       document.documentElement.scrollTop > 200)
//   ) {
//     offerSticker.classList.add("show");
//   } else {
//     offerSticker.classList.remove("show");
//   }
// }

// accordion
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.classList.toggle("active")
   
  });
}