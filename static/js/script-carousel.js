let currentIndex = 0;
const totalItems = 6;
const items = document.querySelectorAll('.carousel-item');


function updateActiveItem() {
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
        let rotation = ((index - currentIndex + totalItems) % totalItems) * 60;
        item.style.transform = `rotateY(${rotation}deg) translateZ(200px)`;
    });
}

function rotateCarousel(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateActiveItem();
}

function autoRotate() {
    rotateCarousel(1);
}


setInterval(autoRotate, 3000);
updateActiveItem();