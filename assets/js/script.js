const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const header = document.querySelector('.header')
document.addEventListener("DOMContentLoaded", () => {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
  });
});
const sticky = header.offsetTop;

function makeHeaderSticky() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

window.onscroll = function () {
  makeHeaderSticky();
};

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.reviews-section');
  const originalCards = Array.from(document.querySelectorAll('.review-card'));
  let cardWidth = originalCards[0].offsetWidth;
  const totalCards = originalCards.length;
  let visibleCards = 3;
  let currentIndex = 0;

  function updateCardWidth() {
      cardWidth = originalCards[0].offsetWidth;
  }

  function updateVisibleCards() {
      if (window.innerWidth <= 480) {
          visibleCards = 1;
      } else if (window.innerWidth <= 768) {
          visibleCards = 2;
      } else {
          visibleCards = 3;
      }
  }

  function cloneCards() {
      const clonesBefore = [];
      const clonesAfter = [];
      for (let i = 0; i < visibleCards; i++) {
          clonesBefore.push(originalCards[totalCards - 1 - i].cloneNode(true));
          clonesAfter.push(originalCards[i].cloneNode(true));
      }
      clonesBefore.reverse().forEach(clone => section.insertBefore(clone, section.firstChild));
      clonesAfter.forEach(clone => section.appendChild(clone));
  }

  function updateSlider() {
      section.style.transition = 'transform 0.5s ease';
      section.style.transform = `translateX(-${(currentIndex + visibleCards) * cardWidth}px)`;
  }

  function moveToPrev() {
      if (currentIndex <= -visibleCards) {
          currentIndex = totalCards - 1;
          section.style.transition = 'none';
          section.style.transform = `translateX(-${(currentIndex + visibleCards) * cardWidth}px)`;
      }
      requestAnimationFrame(() => {
          currentIndex--;
          updateSlider();
      });
  }

  function moveToNext() {
      if (currentIndex >= totalCards) {
          currentIndex = 0;
          section.style.transition = 'none';
          section.style.transform = `translateX(-${cardWidth * visibleCards}px)`;
      }
      requestAnimationFrame(() => {
          currentIndex++;
          updateSlider();
      });
  }

  document.getElementById('prevButton').addEventListener('click', moveToPrev);
  document.getElementById('nextButton').addEventListener('click', moveToNext);

  window.addEventListener('resize', () => {
      updateCardWidth();
      updateVisibleCards();
      updateSlider();
  });

  updateCardWidth();
  updateVisibleCards();
  cloneCards();
  updateSlider();
});


