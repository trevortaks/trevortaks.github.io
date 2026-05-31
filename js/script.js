// Featured projects data
const featuredProjects = [
    {
        name: 'Sign Language Translator',
        description: 'A translator that converts English text to sign language using Stanford Parser and JASigning for visualization.',
        language: 'Java',
        stars: 4,
        url: 'https://github.com/trevortaks/sign_language_translator'
    },
    {
        name: 'Hospital Management System',
        description: 'Learning and building a comprehensive hospital management system using modern frameworks.',
        language: 'C#',
        stars: 2,
        url: 'https://github.com/trevortaks/HospitalManagementSystem'
    },
    {
        name: 'ZimSL Translator',
        description: 'Web-based sign language translation application with modern JavaScript.',
        language: 'JavaScript',
        stars: 0,
        url: 'https://github.com/trevortaks/ZimSLTranslator'
    },
    {
        name: 'Todo App',
        description: 'Flask-based To Do application built from scratch with Python backend.',
        language: 'Python',
        stars: 0,
        url: 'https://github.com/trevortaks/todoapp'
    },
    {
        name: 'Earthquake Map',
        description: 'Console application that fetches and displays earthquake data from USGS API.',
        language: 'Java',
        stars: 0,
        url: 'https://github.com/trevortaks/earthquakemap-java'
    },
    {
        name: 'Regency Hotel App',
        description: 'Mobile application for Regency Group of hotels built with Flutter.',
        language: 'Dart',
        stars: 0,
        url: 'https://github.com/trevortaks/RegencyHotelApp'
    }
];

// Load projects on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupSmoothScroll();
});

// Load and display projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;

    projectsGrid.innerHTML = featuredProjects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <a href="${project.url}" target="_blank" class="project-name">
                    ${project.name}
                </a>
                ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-stats">
                ${project.stars > 0 ? `<div class="stat"><i class="fas fa-star"></i> ${project.stars}</div>` : ''}
            </div>
            <a href="${project.url}" target="_blank" class="project-link">
                View on GitHub <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `).join('');
}

// Smooth scroll navigation
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Fetch real GitHub data (optional enhancement)
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/trevortaks/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        if (Array.isArray(repos)) {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = repos.map(repo => `
                <div class="project-card">
                    <div class="project-header">
                        <a href="${repo.html_url}" target="_blank" class="project-name">
                            ${repo.name}
                        </a>
                        ${repo.language ? `<span class="project-language">${repo.language}</span>` : ''}
                    </div>
                    <p class="project-description">${repo.description || 'No description available'}</p>
                    <div class="project-stats">
                        <div class="stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</div>
                        <div class="stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</div>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        View on GitHub <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.log('Using fallback projects');
    }
}
