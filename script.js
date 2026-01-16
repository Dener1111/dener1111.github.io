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
    
    const taxiVRScreenshots = [
        'assets/vr/TAXI1.png',
        'assets/vr/TAXI2.png',
        'assets/vr/TAXI3.png',
        'assets/vr/TAXI4.png',
        'assets/vr/TAXI5.png'
    ];
    
    const gnomesVRScreenshots = [
        'assets/vr/GNOME1.png',
        'assets/vr/GNOME2.png',
        'assets/vr/GNOME3.png',
        'assets/vr/GNOME4.png',
        'assets/vr/GNOME5.png'
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
        // Set different speeds based on containerId
        const scrollSpeed = containerId === 'spacewhip' ? 1.2 : 0.8;
        const scrollInterval = 20;  // Keep consistent interval
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
            
            // More precise reset condition
            if (scrollPosition >= singleSetWidth - 1) {  // Added small threshold
                scrollPosition = 0;
                wrapper.style.transition = 'none';  // Disable transition for reset
                wrapper.style.transform = `translateX(0)`;
                // Force reflow
                wrapper.offsetHeight;
                wrapper.style.transition = 'transform 0.03s linear';  // Re-enable transition
                return;
            }
            
            wrapper.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        // Adjust scroll interval for smoother movement
        scrollTimer = setInterval(autoScroll, 20);  // Changed from 30ms to 20ms
        
        container.addEventListener('mouseenter', () => {
            clearInterval(scrollTimer);
        });
        
        container.addEventListener('mouseleave', () => {
            clearInterval(scrollTimer);
            scrollTimer = setInterval(autoScroll, scrollInterval);
        });
    }
    
    // Function to create VR background carousel
    function createVRBackgroundCarousel(containerId, screenshots) {
        const container = document.querySelector(`#${containerId} .vr-carousel-bg`);
        
        if (!container) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'vr-carousel-wrapper';
        container.appendChild(wrapper);
        
        screenshots.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${containerId} Screenshot`;
            img.className = 'vr-bg-screenshot';
            wrapper.appendChild(img);
        });
        
        screenshots.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${containerId} Screenshot (clone)`;
            img.className = 'vr-bg-screenshot';
            wrapper.appendChild(img);
        });
        
        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let scrollTimer;
        let singleSetWidth = 0;
        
        const updateSetWidth = () => {
            const firstImg = wrapper.querySelector('.vr-bg-screenshot');
            if (firstImg) {
                const imgWidth = firstImg.offsetWidth;
                const imgMargin = parseInt(window.getComputedStyle(firstImg).marginRight);
                singleSetWidth = screenshots.length * (imgWidth + imgMargin);
            }
        };
        
        window.addEventListener('load', updateSetWidth);
        setTimeout(updateSetWidth, 500);
        
        function autoScroll() {
            if (!singleSetWidth) updateSetWidth();
            if (!singleSetWidth) return;
            
            scrollPosition += scrollSpeed;
            
            if (scrollPosition >= singleSetWidth - 1) {
                scrollPosition = 0;
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translateX(-${scrollPosition}px)`;
                setTimeout(() => {
                    wrapper.style.transition = 'transform 0.1s linear';
                }, 50);
            } else {
                wrapper.style.transform = `translateX(-${scrollPosition}px)`;
            }
        }
        
        scrollTimer = setInterval(autoScroll, 20);
        
        container.addEventListener('mouseenter', () => {
            clearInterval(scrollTimer);
        });
        
        container.addEventListener('mouseleave', () => {
            clearInterval(scrollTimer);
            scrollTimer = setInterval(autoScroll, 20);
        });
    }
    
    // Initialize screenshot carousels
    createScreenshotCarousel('spacewhip', spaceWhipScreenshots);
    createScreenshotCarousel('honor-plus-plus', honorPlusPlusScreenshots);
    createVRBackgroundCarousel('vr-game1', taxiVRScreenshots);
    createVRBackgroundCarousel('vr-game2', gnomesVRScreenshots);

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
document.addEventListener('DOMContentLoaded', function() {
    // Add fluid background effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;opacity:0.4;pointer-events:none;';

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const points = Array(20).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        // More varied colors in pink/red spectrum
        color: `rgba(${220 + Math.random() * 35},${100 + Math.random() * 60},${120 + Math.random() * 50},${0.05 + Math.random() * 0.06})`
    }));

    function animate() {
        time += 0.01;
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
            
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, 180  // Slightly larger radius
            );
            gradient.addColorStop(0, point.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 150, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Update mouse tracking for fluid effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        
        points.forEach((point, i) => {
            if (i === 0) {
                point.x = e.clientX;
                point.y = e.clientY;
            }
        });

        document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
    });

    // Add YouTube video functionality
    document.querySelectorAll('.screenshot-carousel').forEach(carousel => {
        const videoOverlay = carousel.nextElementSibling;
        if (videoOverlay && videoOverlay.classList.contains('video-overlay')) {
            const videoId = videoOverlay.dataset.videoId;
            if (videoId) {
                // Create YouTube player
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                videoOverlay.appendChild(iframe);

                // Control video on hover
                let player;
                carousel.addEventListener('mouseenter', () => {
                    if (player) {
                        player.playVideo();
                    } else {
                        player = new YT.Player(iframe, {
                            events: {
                                'onReady': (event) => event.target.playVideo()
                            }
                        });
                    }
                });

                carousel.addEventListener('mouseleave', () => {
                    if (player) {
                        player.pauseVideo();
                    }
                });
            }
        }
    });
});