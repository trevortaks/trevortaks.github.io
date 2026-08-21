// Featured projects data
const featuredProjects = [
    {
        name: 'Hospital Management System',
        description: 'A comprehensive hospital management system for handling patients, staff and records, built with C#.',
        language: 'C#',
        stars: 1,
        url: 'https://github.com/trevortaks/HospitalManagementSystem'
    },
    {
        name: 'ZimSL Translator',
        description: 'Web-based sign language translation application built with modern JavaScript.',
        language: 'JavaScript',
        stars: 0,
        url: 'https://github.com/trevortaks/ZimSLTranslator'
    },
    {
        name: 'Sign Language Translator',
        description: 'A translator that converts English text to sign language using the Stanford Parser and JASigning for visualization.',
        language: 'Java',
        stars: 4,
        url: 'https://github.com/trevortaks/sign_language_translator'
    },
    {
        name: 'Earthquake Map',
        description: 'Application that fetches and displays real-time earthquake data from the USGS API.',
        language: 'C#',
        stars: 0,
        url: 'https://github.com/trevortaks/earthquakemap'
    },
    {
        name: 'Dev Test',
        description: 'A development practical project exploring C# fundamentals and testing patterns.',
        language: 'C#',
        stars: 0,
        url: 'https://github.com/trevortaks/DevTest'
    },
    {
        name: 'Todo App',
        description: 'Flask-based To Do application built from scratch with a Python backend.',
        language: 'Python',
        stars: 0,
        url: 'https://github.com/trevortaks/todoapp'
    }
];

// Load projects on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupSmoothScroll();
    fetchGitHubProjects();
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
    const excluded = ['trevortaks.github.io', 'trevortaks'];

    try {
        const response = await fetch('https://api.github.com/users/trevortaks/repos?sort=updated&per_page=100');
        const repos = await response.json();

        if (Array.isArray(repos)) {
            const topRepos = repos
                .filter(repo => !repo.fork && !excluded.includes(repo.name))
                .slice(0, 6);

            if (topRepos.length === 0) return;

            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = topRepos.map(repo => `
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
