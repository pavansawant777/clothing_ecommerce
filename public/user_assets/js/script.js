/*
Template Name: Luxuay - eCommerce Website Template
Author: Pillarix
Author URI: https://wrapbootstrap.com/user/pillarix
Version: 0.1
*/
/*
    - Homepage Slider
    - Shop By Slider
    - Sort By Slider
    - What's New Slider
    - Trending Style Slider
    - Discount Store Slider
    - Sort By Slider
    - Discover Page Sliders
    - Product Details
    - More Store Slider
    - You Like Slider
    - Tooptip js
    - Plus Minus
*/

// homepage slider
var swiper = new Swiper(".hero-header", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

// shop by slider
var swiper = new Swiper(".shop-by-products-slider", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
});


// sort by slider
var swiper = new Swiper(".shop-by-collections-slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

// what's new slider
var swiper = new Swiper(".what-new-slider", {
  slidesPerView: 2,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
});

// trending style slider
var swiper = new Swiper(".trending-style-slider", {
  slidesPerView: 2,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
});

// discount store slider
var swiper = new Swiper(".discount-store-slider", {
  slidesPerView: 2,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
});

// sort by slider
var swiper = new Swiper(".trending-brands-slider", {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
});

// Discover page sliders
var swiper = new Swiper(".category-slider", {
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
  },
});

// product details
var swiper = new Swiper(".product-view-slider", {
  slidesPerView: 1,
  spaceBetween: 15,
  autoplay: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// more store slider
var swiper = new Swiper(".more-store-slider", {
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
  },
});

// you like slider
var swiper = new Swiper(".you-like-slider", {
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
  },
});

// tooptip js
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


// Plus minus
let minusButtons = document.querySelectorAll(".minus");
let countInputs = document.querySelectorAll(".count");
let plusButtons = document.querySelectorAll(".plus");

for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener("click", function () {
    countInputs[i].value--;
  });
}
for (let i = 0; i < plusButtons.length; i++) {
  plusButtons[i].addEventListener("click", function () {
    countInputs[i].value++;
  });
}

for (let i = 0; i < countInputs.length; i++) {
  countInputs[i].addEventListener("change", function () {
    if (countInputs[i].value < 1) {
      countInputs[i].value = 1;
    }
  });
}

