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

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Consider a section "in view" if its top is in the viewport or if we've scrolled to the bottom
        return (
            (rect.top >= 0 && rect.top <= windowHeight * 0.7) || 
            (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
        );
    };

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        // Check if we're at the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;
        
        if (isAtBottom) {
            // If at bottom, highlight the last section (contact)
            currentSection = 'contact';
        } else {
            // Otherwise check which section is in view
            sections.forEach(section => {
                if (isElementInViewport(section)) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
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
