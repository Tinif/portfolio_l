// Reveal elements on scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Mobile Menu Toggle
(function () {
    const toggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('is-active');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            toggle.classList.remove('is-active');
        });
    });
})();


// Canvas Background Animation: ROS Node Network & Mechanical Gears
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const nodes = [];
    const numNodes = 60;

    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    let scrollY = 0;
    let targetScrollY = 0;
    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    });

    function drawGear(x, y, radius, teeth, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            let angle = (i / teeth) * Math.PI * 2;
            let outer = radius * 1.2;
            let inner = radius;
            ctx.lineTo(Math.cos(angle - 0.1) * inner, Math.sin(angle - 0.1) * inner);
            ctx.lineTo(Math.cos(angle - 0.05) * outer, Math.sin(angle - 0.05) * outer);
            ctx.lineTo(Math.cos(angle + 0.05) * outer, Math.sin(angle + 0.05) * outer);
            ctx.lineTo(Math.cos(angle + 0.1) * inner, Math.sin(angle + 0.1) * inner);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)'; // Accent color
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner hole
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
        ctx.stroke();

        // Inner details
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
        ctx.stroke();

        ctx.restore();
    }

    function drawHumanoid(x, y, scale, time) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Hover/floating effect
        const hoverY = Math.sin(time * 0.002) * 15;
        ctx.translate(0, hoverY);

        // Head
        ctx.beginPath();
        ctx.rect(-15, -60, 30, 30);
        ctx.stroke();

        // Eyes (glowing)
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        const eyeGlow = Math.sin(time * 0.005) * 0.5 + 0.5;
        ctx.shadowBlur = 10 * eyeGlow;
        ctx.shadowColor = 'rgba(16, 185, 129, 1)';
        ctx.beginPath();
        ctx.arc(-5, -45, 3, 0, Math.PI * 2);
        ctx.arc(5, -45, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Body
        ctx.beginPath();
        ctx.moveTo(-20, -20);
        ctx.lineTo(20, -20);
        ctx.lineTo(15, 30);
        ctx.lineTo(-15, 30);
        ctx.closePath();
        ctx.stroke();

        // Left Arm (swinging)
        const leftArmAngle = Math.sin(time * 0.003) * 0.5;
        ctx.save();
        ctx.translate(-20, -15);
        ctx.rotate(leftArmAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, 25);
        ctx.lineTo(-5, 45);
        ctx.stroke();
        ctx.restore();

        // Right Arm (swinging)
        const rightArmAngle = -Math.sin(time * 0.003) * 0.5;
        ctx.save();
        ctx.translate(20, -15);
        ctx.rotate(rightArmAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 25);
        ctx.lineTo(5, 45);
        ctx.stroke();
        ctx.restore();

        // Left Leg (floating)
        const leftLegAngle = Math.sin(time * 0.002) * 0.2;
        ctx.save();
        ctx.translate(-10, 30);
        ctx.rotate(leftLegAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, 30);
        ctx.lineTo(-5, 50);
        ctx.stroke();
        ctx.restore();

        // Right Leg (floating)
        const rightLegAngle = -Math.sin(time * 0.002) * 0.2 + 0.2;
        ctx.save();
        ctx.translate(10, 30);
        ctx.rotate(rightLegAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(5, 30);
        ctx.lineTo(10, 50);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    function draw() {
        // Smooth scroll interpolation
        scrollY += (targetScrollY - scrollY) * 0.1;

        ctx.clearRect(0, 0, width, height);

        // Draw blueprint grid
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.lineWidth = 1;
        const gridSize = 60;
        const offsetY = -(scrollY * 0.5) % gridSize;

        ctx.beginPath();
        for (let x = 0; x < width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = offsetY - gridSize; y < height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Draw gears (parallax effect)
        drawGear(width * 0.85, height * 0.3 - scrollY * 0.4, 120, 16, scrollY * 0.01);
        drawGear(width * 0.85 - 180, height * 0.3 + 90 - scrollY * 0.4, 60, 8, -scrollY * 0.02 + 0.15); // Meshing
        drawGear(width * 0.1, height * 0.8 - scrollY * 0.2, 180, 24, scrollY * 0.005);

        // Draw humanoid
        const time = performance.now();
        drawHumanoid(width * 0.2, height * 0.4 - scrollY * 0.3, 1.5, time);

        // Update and draw ROS nodes
        ctx.fillStyle = '#3b82f6';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';

        const parallaxOffset = scrollY * 0.3;

        for (let i = 0; i < numNodes; i++) {
            let node = nodes[i];

            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            // Y wrapping for infinite scroll illusion
            let drawY = node.y - parallaxOffset * (node.radius / 2);
            drawY = ((drawY % height) + height) % height;

            ctx.beginPath();
            ctx.arc(node.x, drawY, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby nodes
            for (let j = i + 1; j < numNodes; j++) {
                let other = nodes[j];
                let otherDrawY = other.y - parallaxOffset * (other.radius / 2);
                otherDrawY = ((otherDrawY % height) + height) % height;

                let dx = node.x - other.x;
                let dy = drawY - otherDrawY;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.lineWidth = 1 - (dist / 150);
                    ctx.moveTo(node.x, drawY);
                    ctx.lineTo(other.x, otherDrawY);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Project Gallery Slider Highlight Logic
function updateSliderHighlight() {
    const sliderItems = document.querySelectorAll('.slider-item');
    if (sliderItems.length === 0) return;

    const centerX = window.innerWidth / 2;

    sliderItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(centerX - itemCenter);

        // If the item center is within 200px of the screen center, highlight it
        if (distanceFromCenter < 200) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

// Update highlight on every frame for smooth transitions
function animateSliderHighlight() {
    updateSliderHighlight();
    requestAnimationFrame(animateSliderHighlight);
}

// Initialize slider logic if elements exist
window.addEventListener('load', () => {
    if (document.querySelector('.slider-track')) {
        animateSliderHighlight();
    }
});

// Show More Work Experience Logic
(function() {
    const showMoreBtn = document.getElementById('show-more-experience');
    const hiddenItems = document.querySelectorAll('.hidden-experience');
    
    if (!showMoreBtn || hiddenItems.length === 0) return;

    let isExpanded = false;

    showMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isExpanded = !isExpanded;

        if (isExpanded) {
            // Show items
            hiddenItems.forEach((item, index) => {
                item.classList.add('is-visible');
                // Force reflow for transition
                item.offsetHeight; 
                setTimeout(() => {
                    item.classList.add('show');
                }, 50 * index);
            });
            showMoreBtn.textContent = 'Show Less';
        } else {
            // Hide items
            hiddenItems.forEach((item) => {
                item.classList.remove('show');
            });
            
            showMoreBtn.textContent = 'Show More';
            
            // Wait for transition before display: none
            setTimeout(() => {
                hiddenItems.forEach((item) => {
                    if (!isExpanded) {
                        item.classList.remove('is-visible');
                    }
                });
                // Smooth scroll back to section top
                const section = document.getElementById('experience');
                if (section) {
                    const offset = section.offsetTop - 100;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }
            }, 400);
        }
    });
})();

// Render Certifications Marquee
document.addEventListener('DOMContentLoaded', () => {
    if (typeof certificatesData === 'undefined' || certificatesData.length === 0) return;
    
    const marquee1 = document.getElementById('cert-marquee-1');
    const marquee2 = document.getElementById('cert-marquee-2');
    if (!marquee1 || !marquee2) return;

    // We split data into two rows
    const half = Math.ceil(certificatesData.length / 2);
    const row1 = certificatesData.slice(0, half);
    const row2 = certificatesData.slice(half);
    
    const data2 = row2.length > 0 ? row2 : row1;

    function createCard(cert) {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.innerHTML = `
            <img src="${cert.src}" alt="${cert.caption}">
            <div class="cert-caption">${cert.caption}</div>
        `;
        return card;
    }

    function populateMarquee(marquee, data) {
        if (data.length === 0) return;
        
        // A single card is ~300px + 1.5rem gap (~324px)
        const cardWidth = 324;
        const setWidth = data.length * cardWidth;
        
        // We need one half of the marquee to be wider than the screen width to avoid empty spaces
        const requiredHalfWidth = window.innerWidth + 500; // 500px buffer
        const copiesNeededForHalf = Math.max(1, Math.ceil(requiredHalfWidth / setWidth));
        
        // Add identical halves so that translateX(-50%) perfectly loops
        const totalCopies = copiesNeededForHalf * 2;
        
        for (let i = 0; i < totalCopies; i++) {
            data.forEach(cert => marquee.appendChild(createCard(cert)));
        }
    }

    populateMarquee(marquee1, row1);
    populateMarquee(marquee2, data2);

    function setupHTMLMarquee(marqueeId, cardSelector) {
        const marquee = document.getElementById(marqueeId);
        if (!marquee) return;
        
        const originalCards = Array.from(marquee.querySelectorAll(cardSelector));
        if (originalCards.length === 0) return;
        
        // A single project card is ~350px + 1.5rem gap (~374px)
        const cardWidth = 374;
        const setWidth = originalCards.length * cardWidth;
        
        const requiredHalfWidth = window.innerWidth + 500;
        const copiesNeededForHalf = Math.max(1, Math.ceil(requiredHalfWidth / setWidth));
        
        const totalCopies = copiesNeededForHalf * 2;
        
        // We already have 1 copy in the DOM, so clear and re-add to be clean
        marquee.innerHTML = '';
        for (let i = 0; i < totalCopies; i++) {
            originalCards.forEach(card => {
                marquee.appendChild(card.cloneNode(true));
            });
        }
    }

    setupHTMLMarquee('projects-marquee', '.project-card');
    setupHTMLMarquee('freelance-marquee', '.project-card');
});
