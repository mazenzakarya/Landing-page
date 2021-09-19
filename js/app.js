/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Build nav & menu links
sections.forEach(function (elment) {
  var navlistElement = "<li class='menu__link ".concat(elment.className, "' data-link=").concat(elment.id, "><a href=\"#").concat(elment.id, "\">").concat(elment.dataset.nav, "</li>");
  navList.insertAdjacentHTML('beforeend', navlistElement);
});



// Scroll to section on link click

function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
    }
}

//smooth while scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//IntersectionObserver API make section and li active
var callback = function callback(entries) {
  entries.forEach(function (entry) {
    var navListElement = document.querySelector(".menu__link[data-link='".concat(entry.target.id, "']"));
    var section = document.getElementById(entry.target.id);

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('active');
      section.classList.add('active');
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active');
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active');
      }
    }
  });
};

// observerOptions
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  };

var observer = new IntersectionObserver(callback, options);
sections.forEach(function (navEl) {
  observer.observe(document.getElementById(navEl.id));
});