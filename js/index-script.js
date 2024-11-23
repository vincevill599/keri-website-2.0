window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
    if(window.scrollY > 0) {
        this.document.getElementById("logo").src = "assets/keri-logo_red.png";
    }
    else {
        this.document.getElementById("logo").src = "assets/keri-logo_white.png";
    }
})

window.onload = () => {
    const burger = document.querySelector('.burger');
    const navClick = document.querySelectorAll('.nav-link');

    navClick.forEach(res => {
        res.addEventListener('click', collapse)
    })
    burger.addEventListener('click', toggle);
}

// window.addEventListener('scroll', scrollAppear);

function collapse() {
    const nav = document.querySelector('.nav');
    const navBtn = document.querySelectorAll('.nav li');

    if(nav.classList.contains('nav-active')) {
        nav.classList.remove("nav-active");

        navBtn.forEach(link => {
            link.style.animation = '';
        })

        burger.classList.remove("toggle");
    }
}

// function scrollAppear() {
//     var background = document.querySelector('.services');
//     var introPosition = background.getBoundingClientRect().top;
//     var screenPos = window.innerHeight / 1.3;

//     if(introPosition < screenPos) {
//         background.classList.add("background-reveal")
//     }
//     console.warn = () => {};
// }

function toggle() {
    const nav = document.querySelector('.nav');
    const navBtn = document.querySelectorAll('.nav li');

    nav.classList.toggle('nav-active');
    
    navBtn.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = '';
        }
        else {
            link.style.animation = `navFade 0.5 ease forwards ${index / 7 + 1.5}s`;
        }
    });

    burger.classList.toggle("toggle")
}