
let btnMenu = document.getElementById('btn-menu')

let menu = document.getElementById('menu-mobile')

let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})


overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

document.querySelectorAll(".menu-link, .menu-mobile-link, #btn-contato").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const targetId = this.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            smoothScroll(targetElement.offsetTop, 800); // Rola suavemente em 800ms
        }
    });
});

function smoothScroll(targetPosition, duration) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animation);
}

