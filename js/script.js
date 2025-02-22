// Back to top button functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Project filtering
    const createFilterButtons = () => {
        const filterContainer = document.getElementById('project-filters');
        if (!filterContainer) return;

        // Collect all unique tags
        const tags = new Set();
        document.querySelectorAll('.project-tags .tag').forEach(tag => {
            tags.add(tag.textContent);
        });

        // Create "All" button
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.classList.add('filter-btn', 'active');
        filterContainer.appendChild(allButton);

        // Create button for each tag
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.classList.add('filter-btn');
            filterContainer.appendChild(button);
        });

        // Add click handlers
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');

                // Filter projects
                const selectedTag = e.target.textContent;
                filterProjects(selectedTag);
            }
        });
    };

    const filterProjects = (tag) => {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
            if (tag === 'All') {
                project.style.display = 'block';
                return;
            }
            const tags = project.querySelectorAll('.tag');
            const hasTag = Array.from(tags).some(t => t.textContent === tag);
            project.style.display = hasTag ? 'block' : 'none';
        });
    };

    createFilterButtons();
});
