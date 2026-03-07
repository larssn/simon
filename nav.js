// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Active nav on scroll
var sections = document.querySelectorAll('section[id]');
var navLinksAll = document.querySelectorAll('#navLinks a[href^="#"]');

var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        var link = document.querySelector('#navLinks a[href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
            navLinksAll.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { rootMargin: '-40% 0px -60% 0px' });

sections.forEach(function (section) { observer.observe(section); });

// Activate last section's nav link when scrolled to bottom of page
var lastSection = sections[sections.length - 1];
if (lastSection) {
    window.addEventListener('scroll', function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
            navLinksAll.forEach(function (link) { link.classList.remove('active'); });
            var active = document.querySelector('#navLinks a[href="#' + lastSection.id + '"]');
            if (active) active.classList.add('active');
        }
    });
}
