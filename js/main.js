
'use strict'

const searchEl = document.querySelector('.search')
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
    searchInputEl.focus()
});

searchInputEl.addEventListener('focus',function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder','통합검색');
});

searchInputEl.addEventListener('blur',function(){
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder','');
});

const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top')

// window는 브라우저
//window 객체는 브라우저 명령을 가지고 있음
window.addEventListener('scroll',_.throttle(function(){
    if (window.scrollY > 500) {
        //배지 숨기기
        //gsap.to(요소 , 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        })
        //버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        })
    } else {
        //배지 보여주기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        })
        //버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100
        })
    }
},300)) //0.3초 단위로 부하를 줘서 함수가 과하게 실행하는 것을 방지(일정시간에 한번씩만 실행되도록 함)
//_.throttle(함수, 시간(ms단위))


toTopEl.addEventListener('click', function() {
    gsap.to(window, .7, {
        scrollTo: 0
    })
})



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
    gsap.to(fadeEl, 1, {
        delay: (index+1) * .7, /*순차적으로 나타나게끔 딜레이 시간 조정*/
        opacity: 1
    });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', { 
    direction: 'vertical', //방향 설정
    autoplay: true, //자동 재생 여부
    loop: true //반복 재생 여부
}); 

new Swiper('.promotion .swiper-container',{
    // direction: 'horizontal': 기본값
    slidesPerView: 3, //한번에 보여 줄 슬라이드의 개수 (기본값:1)
    spaceBetween: 10, //슬라이드 사이 여백(px단위)
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay:{
        delay: 5000
    },
    pagination:{
        el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable: true //사용자의 페이지 번호 요소 제어 여부
    },
    navigation:{
        prevEl:'.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next'
    }
});
new Swiper('.awards .swiper-container',{
    autoplay: true,
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn =  document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click',function(){
    isHidePromotion = !isHidePromotion; //!는 반대로 변환시켜줌 true <-> false
    if (isHidePromotion) {
        //숨김 처리
        promotionEl.classList.add('hide'); //프로모션 요소에 hide 클래스 추가
    } else {
        //보여짐 처리
        promotionEl.classList.remove('hide'); //hide 클래스 삭제
    }
}); //클래스의 추가/삭제만으로 자바스크립트로 애니메이션 구현 후 세부내용은 css에서 작성하는 것을 권장

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
function floatingObject(selector, delay, size) {
    gsap.to(
        selector, //선택자
        random(1.5, 2.5), //애니메이션 동작 시간
        { //옵션
        y: size, //y축 이동
        repeat: -1, //무한 반복
        yoyo: true, //재생된 애니메이션을 다시 역재생 옵션
        ease: Power1.easeInOut,
        delay: random(0, delay)
         }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
            triggerHook: .8 //뷰포트 시작이 0, 끝이 1. 감시 요소 감시 판단 지점
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //연도 삽입

