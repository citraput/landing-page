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
const menu = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function indexActiveSection(){
    let limit = window.innerHeight;
    activeSectionIdx = -1;

    sections.forEach((section, idx) => {
        let offset = section.getBoundingClientRect();
        if (Math.abs(offset.top) < limit) {
            limit = Math.abs(offset.top);
            activeSectionIdx = idx;
        }
    })
    return activeSectionIdx;
}

function findPosition(obj){
    let currentTop = 0;
    if (obj.offsetParent) {
        do {
            currentTop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currentTop];
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation() {
    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
        const menuItem = document.createElement('li');
        const menuLink = document.createElement('a');
        menuLink.innerText = section.getAttribute('data-nav');
        menuLink.setAttribute('class', 'menu__link');
        menuItem.appendChild(menuLink);
        fragment.appendChild(menuItem);
    })
    menu.appendChild(fragment)
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    if (indexActiveSection() != -1) {
        let aTagList = document.querySelectorAll('.menu__link');
        for (let i = 0; i < sections.length; i++){
            if (i == indexActiveSection()){
                sections[i].classList.add('your-active-class');
                aTagList[i].classList.add('your-active-class');
            } else {
                sections[i].classList.remove('your-active-class');
                aTagList[i].classList.remove('your-active-class');
            }
        }
    }
}

// Scroll to anchor ID using scrollTO event
function sectionScrollTo() {
    let navATagList = document.querySelectorAll('nav a');
    sections.forEach((section, idx) => {
        navATagList[idx].addEventListener("click", () => {
            window.scrollTo({
                top: findPosition(section),
                behavior: 'smooth'
            })
        })
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavigation();
// Scroll to section on link click
sectionScrollTo();
// Set sections as active
document.addEventListener('scroll', setActiveSection);
