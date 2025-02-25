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

    const isSectionVisible = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Consider a section visible if any part of it is in the viewport
        return rect.top < windowHeight && rect.bottom >= 0;
    };

    window.addEventListener('scroll', () => {
        // First remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Check if we're at the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;
        
        if (isAtBottom) {
            // If at bottom, highlight the contact section
            const contactLink = document.querySelector('.sidebar a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
        } else {
            // Find the first visible section
            let activeSection = null;
            
            // Convert NodeList to Array to use find()
            const sectionsArray = Array.from(sections);
            activeSection = sectionsArray.find(section => isSectionVisible(section));

            // If we found a visible section, highlight its link
            if (activeSection) {
                const sectionId = activeSection.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        }
    });

    // Trigger scroll event on page load to set initial active section
    window.dispatchEvent(new Event('scroll'));

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
        
        if (!projects.length) {
            console.warn('No project cards found');
            return;
        }

        projects.forEach(project => {
            const projectTags = project.querySelectorAll('.tag');
            const shouldShow = tag === 'All' || Array.from(projectTags).some(t => t.textContent === tag);
            project.style.display = shouldShow ? 'block' : 'none';
        });
    };

    try {
        createFilterButtons();
    } catch (error) {
        console.error('Error creating filter buttons:', error);
    }
});
