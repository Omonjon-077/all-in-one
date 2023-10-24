/*=============== LOADER ===============*/
document.addEventListener('DOMContentLoaded', function (eventObject) {
    $('.load').fadeIn();
})
window.addEventListener("load", function (eventObject) {
    $('.load').fadeOut("slow");
});

/*=============== Header Fixed ===============*/
if ($("#myHeader").length) {
    window.onscroll = function () {
        myFunction()
    };

    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
}

/*=============== PARTNERS | SWIPER ===============*/
if ($(".photoSwiper").length) {
    let swiper = new Swiper(".photoSwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        loop: false,
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

/*=============== INPUT RANGE ===============*/
const progress1 = document.querySelector('.progress-1');

progress1.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--bs-secondary) 0%, var(--bs-secondary) ${value}%, #F8F8F8 ${value}%, #F8F8F8 100%)`
})
const progress2 = document.querySelector('.progress-2');

progress2.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--bs-secondary) 0%, var(--bs-secondary) ${value}%, #F8F8F8 ${value}%, #F8F8F8 100%)`
})
const progress3 = document.querySelector('.progress-3');

progress3.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--bs-secondary) 0%, var(--bs-secondary) ${value}%, #F8F8F8 ${value}%, #F8F8F8 100%)`
})
const progress4 = document.querySelector('.progress-4');

progress4.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--bs-secondary) 0%, var(--bs-secondary) ${value}%, #F8F8F8 ${value}%, #F8F8F8 100%)`
})

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 300 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)