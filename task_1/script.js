document.addEventListener('DOMContentLoaded', function() {
    const slideshow = document.querySelector('.slideshow');
    const images = document.querySelectorAll('.slideshow img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    function showSlide(index) {
        if (index < 0) {
            currentIndex = totalImages - 1;
        } else if (index >= totalImages) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 3000);
    
    // Initialize
    showSlide(0);
});