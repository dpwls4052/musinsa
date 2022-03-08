const slideWrapper = document.querySelector('.swiper-wrapper');
const swiperSlide = document.querySelectorAll('.swiper-slide');
const slideBtnNext = document.querySelector('.next');
const slideBtnPrev = document.querySelector('.prev');
const slideLen = swiperSlide.length;
const slideWidth = 100;
const slideSpeed = 1000;
const startNum = 0;

slideWrapper.style.width = slideWidth * (slideLen + 2) +  "vw";

let check = true;
let firstChild = slideWrapper.firstElementChild;
let lastChild = slideWrapper.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideWrapper.appendChild(clonedFirst);
slideWrapper.insertBefore(clonedLast, slideWrapper.firstElementChild);

slideWrapper.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "vw, 0vw, 0vw)";

let curIndex = startNum; 
let curSlide = swiperSlide[curIndex];
curSlide.classList.add('slide_active');

slideBtnNext.addEventListener('click', nextSlide);
slideBtnPrev.addEventListener('click', prevSlide);

setInterval(function() {
    nextSlide();
}, 5000);

function nextSlide() {
    if(check){
        check=false
      if (curIndex <= slideLen - 1) {
          slideWrapper.style.transition = slideSpeed +"ms transform";
          slideWrapper.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "vw, 0vw, 0vw)";
      }
      if (curIndex === slideLen - 1){
          setTimeout(function(){
              slideWrapper.style.transition = "0ms";
              slideWrapper.style.transform = "translate3d(-" + slideWidth + "vw, 0vw, 0vw)";
          },slideSpeed);
          curIndex = -1;
      }
      curSlide.classList.remove('slide_active'); 
      curSlide = swiperSlide[++curIndex];
      curSlide.classList.add('slide_active');

      setTimeout(() => {
          check=true
      }, 1000);
    }
}

function prevSlide(){
    if(check){
        check=false
      if (curIndex >= 0) {
          slideWrapper.style.transition = slideSpeed +"ms transform";
          slideWrapper.style.transform = "translate3d(-" + (slideWidth * curIndex) + "vw, 0vw, 0vw)";
      }
      if (curIndex === 0){
          setTimeout(function(){
              slideWrapper.style.transition = "0ms";
              slideWrapper.style.transform = "translate3d(-" + (slideWidth * slideLen) + "vw, 0vw, 0vw)";
          },slideSpeed);
          curIndex = slideLen;
      }
      curSlide.classList.remove('slide_active');
      curSlide = swiperSlide[--curIndex];
      curSlide.classList.add('slide_active');

      setTimeout(() => {
          check=true
      }, 1000);
    }
}

window.addEventListener('resize', function(){
	slideWrapper.style.transition = "0ms";
});
