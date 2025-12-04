// === Intersection Observer pour le menu ===
const sections = document.querySelectorAll("section");
const menuItems = document.querySelectorAll(".menu-item");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuItems.forEach(link => link.classList.remove("active"));
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`nav a[href="#${id}"]`);
            if(menuLink) menuLink.classList.add("active");
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: "10px 0px 0px 0px" 
});

sections.forEach(section => observer.observe(section));


// === Animation timeline au scroll ===
const timelineItems = document.querySelectorAll('.timeline-item');

function checkTimelinePosition() {
    const triggerBottom = window.innerHeight * 0.85;

    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if(itemTop < triggerBottom) {
            item.classList.add('active');
        }
    });
}

// === Ouvrir les détails des compétences au scroll avec Intersection Observer ===
const competenceDetails = document.querySelectorAll('#competences details');

const observerCompetences = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('open', ''); // ouvre le détail
            observer.unobserve(entry.target); // arrêt de l'observation
        }
    });
}, { 
    threshold: 0,
    rootMargin: '0px 0px -300px 0px'
});

competenceDetails.forEach(detail => observerCompetences.observe(detail));


// === Animation des projets au scroll ===
const projectCards = document.querySelectorAll('#projets .card');

const observerProjects = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ajouter un délai progressif pour chaque card
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 150); // 150ms entre chaque projet
            });
            observer.unobserve(entry.target); // arrêt observation
        }
    });
}, {
    threshold: 0.3 // déclenche quand 30% de la section est visible
});

// On observe la première card pour déclencher l'animation
if (projectCards.length > 0) {
    observerProjects.observe(projectCards[0]);
}

// Vérifie au scroll et au chargement
window.addEventListener('scroll', checkTimelinePosition);
window.addEventListener('load', checkTimelinePosition);