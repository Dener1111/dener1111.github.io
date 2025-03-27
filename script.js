document.addEventListener('DOMContentLoaded', function() {
    // SpaceWhip screenshots from assets folder
    const spaceWhipScreenshots = [
        'assets/SW1.png',
        'assets/SW2.png',
        'assets/SW3.png',
        'assets/SW4.png',
        'assets/SW5.png'
    ];
    
    const honorPlusPlusScreenshots = [
        'assets/HPP1.png',
        'assets/HPP2.png',
        'assets/HPP3.png',
        'assets/HPP4.png',
        'assets/HPP5.png'
    ];
    
    // Function to create screenshot carousel
    function createScreenshotCarousel(containerId, screenshots) {
        const container = document.querySelector(`#${containerId} .screenshot-carousel`);
        
        if (!container) return;
        
        // Create a wrapper for infinite scrolling
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';
        container.appendChild(wrapper);
        
        // Add screenshots to the wrapper
        screenshots.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${containerId} Screenshot`;
            img.className = 'screenshot';
            wrapper.appendChild(img);
        });
        
        // Clone all screenshots and append them again for seamless looping
        screenshots.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${containerId} Screenshot (clone)`;
            img.className = 'screenshot';
            wrapper.appendChild(img);
        });
        
        // Set initial scroll position
        let scrolling = false;
        let scrollPosition = 0;
        const scrollSpeed = 1;
        const scrollInterval = 30; // milliseconds
        let scrollTimer;
        
        // Calculate the width of a single set of screenshots
        let singleSetWidth = 0;
        const updateSetWidth = () => {
            const firstImg = wrapper.querySelector('.screenshot');
            if (firstImg) {
                const imgWidth = firstImg.offsetWidth;
                const imgMargin = parseInt(window.getComputedStyle(firstImg).marginRight);
                singleSetWidth = screenshots.length * (imgWidth + imgMargin);
            }
        };
        
        // Wait for images to load to calculate width
        window.addEventListener('load', updateSetWidth);
        setTimeout(updateSetWidth, 500); // Fallback if load event doesn't fire
        
        function autoScroll() {
            if (!singleSetWidth) updateSetWidth();
            if (!singleSetWidth) return;
            
            scrollPosition += scrollSpeed;
            
            // If we've scrolled past the first set, reset to the beginning of the second set
            if (scrollPosition >= singleSetWidth) {
                scrollPosition = 0;
            }
            
            wrapper.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        // Start auto-scroll, pause on hover
        scrollTimer = setInterval(autoScroll, scrollInterval);
        
        container.addEventListener('mouseenter', () => {
            clearInterval(scrollTimer);
        });
        
        container.addEventListener('mouseleave', () => {
            clearInterval(scrollTimer);
            scrollTimer = setInterval(autoScroll, scrollInterval);
        });
    }
    
    // Initialize screenshot carousels
    createScreenshotCarousel('spacewhip', spaceWhipScreenshots);
    createScreenshotCarousel('honor-plus-plus', honorPlusPlusScreenshots);
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.querySelector('.avatar').addEventListener('click', function() {
    this.classList.toggle('mirrored');
});
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
});