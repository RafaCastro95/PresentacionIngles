    document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.getElementById('dots');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentNum = document.getElementById('currentNum');
    const totalNum = document.getElementById('totalNum');
    let current = 0;
    const total = slides.length;

    totalNum.textContent = total;

    // Build dots
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.onclick = () => goTo(i);
        dots.appendChild(d);
    }

    function updateUI() {
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
        progressBar.style.width = ((current + 1) / total * 100) + '%';
        currentNum.textContent = current + 1;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === total - 1;
    }

    function goTo(n) {
        if (n === current) return;
        const direction = n > current ? 'exit-left' : 'exit-right';
        const oldIndex = current;
        
        // First: activate destination slide
        current = n;
        slides[current].querySelectorAll('.animate-in').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // reflow
            el.style.animation = '';
        });
        slides[current].classList.add('active');
        
        // Then: animate out old slide
        if (oldIndex !== n) {
            slides[oldIndex].classList.add(direction);
            slides[oldIndex].classList.remove('active');
            setTimeout(() => slides[oldIndex].classList.remove(direction), 500);
        }
        
        updateUI();
    }

    function changeSlide(dir) {
        const next = current + dir;
        if (next >= 0 && next < total) goTo(next);
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') changeSlide(1);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') changeSlide(-1);
    });

    // Button navigation
    prevBtn.addEventListener('click', function() { changeSlide(-1); });
    nextBtn.addEventListener('click', function() { changeSlide(1); });

    updateUI();
});
