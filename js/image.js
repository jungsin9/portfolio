function handleMove(x, y, width, height) {//받아온 값
    const moveX = (x - width / 2) / width; //x축 중앙
    const moveY = (y - height / 2) / height; //y축 중앙
    $(".image").eq(0).css({ transform: `translate(${-moveX * 50}px, ${-moveY * 25}px)` });
    $(".image").eq(1).css({ transform: `translate(${-moveX * 100}px, ${-moveY * 50}px)` });
    $(".image").eq(2).css({ transform: `translate(${-moveX * 180}px, ${-moveY * 80}px)` });
    $(".image").eq(3).css({ transform: `translate(${-moveX * 280}px, ${-moveY * 120}px)` });
    $(".image").eq(4).css({ transform: `translate(${-moveX * 450}px, ${-moveY * 200}px)` });
}

let ticking = false; //이벤트 호출 억제 (초기상태)

$('.image_move').on("mousemove touchmove", function (e) {
    if (!ticking) { //이벤트 호출 억제 (ticking === false;이거라면)
        ticking = true; //이벤트 호출 억제 (작업 예약중)
        requestAnimationFrame(() => {// 부드러운 애니매이션 효과
            const width = $(window).width();
            const height = $(window).height();

            let x, y;
            if (e.type === "mousemove") { // 마우스 기준으로
                x = e.pageX;
                y = e.pageY;
            } else if (e.type === "touchmove") {// 터치 기준으로
                x = e.originalEvent.touches[0].pageX;
                y = e.originalEvent.touches[0].pageY;
            }

            handleMove(x, y, width, height); // 값 받아오기
            ticking = false; //이벤트 호출 억제 (작업 끝 => 초기화)
        });
    }
});
// 코드 실행 순서
// 1. 사용자가 마우스나 터치를 움직임 → 이벤트 발생.
// 2. if (!ticking) 조건 확인:
// 3. ticking === false이면 작업 예약 시작.
// 4. ticking = true로 설정 → 새로운 이벤트 발생 시 조건이 거짓(false)이므로 중복 호출 방지.
// 5. requestAnimationFrame 실행:
// 6. 애니메이션 작업(handleMove) 수행.
// 7. 작업 완료 후 ticking = false로 초기화.
// 8. 새로운 이벤트 처리 가능: 다시 if (!ticking) 조건이 참이 되어 다음 작업 예약 가능.


// 스크롤 내리면 배경 opacity 0으로
let main = document.querySelector("#main");
gsap.to(main,{
    autoAlpha:0,
    scrollTrigger:{
        trigger: main,
        start : "top",
        end : "center",
        scrub: true,
    }
});
// //스크롤 내리면 배경 opacity 0으로