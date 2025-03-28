gsap.registerPlugin(ScrollTrigger);

// 리사이즈 시 동적으로 이동 거리 계산 함수
function getBgDistance() {
    const containerWidth = document.querySelector("#about").offsetWidth; // #about 섹션 너비
    const bgWidth = containerWidth * 1.3; // .about_bg의 130% 크기
    return bgWidth - containerWidth; // 초과된 너비만큼 이동
}
// ScrollTrigger와 GSAP 설정
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        pin: true,
        scrub: 1,
        end: () => `+=${document.querySelector("#about").offsetWidth * 4}`, // 섹션 너비에 비례
        snap: {
            snapTo: 1 / 3, // 총 3개의 섹션: 0%, 33%, 66%, 100%로 스냅
            duration: 2, // 스냅 애니메이션 지속 시간
            ease: "power1.inOut", // 부드러운 스냅 효과
        },
        onUpdate: self => {
            // 스크롤 업데이트 시 최신 거리 재계산
            const bgDistance = getBgDistance();
            gsap.set(".about_bg", { x: -bgDistance * self.progress }); // 진행도에 따른 이동
        },
        onRefresh: self => {
            // 리사이즈 시 스크롤 트리거 새로고침
            const bgDistance = getBgDistance();
            gsap.set(".about_bg", { x: -bgDistance * self.progress });
        },
    },
});

// about_wrap 애니메이션
tl.to(".about_wrap", {
    xPercent: -(100 - (100/4)), // 3개의 섹션 이동
    ease: "none",
});

gsap.registerPlugin();

for(i=0; i<2; i++){
    $("#over .about_img_a").first().clone().appendTo(".about_bg");
}
for(i=0; i<1; i++){
    $("#over .about_img_b").first().clone().appendTo(".about_bg");
}
for(i=0; i<4; i++){
    $("#over .about_img_d").first().clone().appendTo(".about_bg");
    $("#over .about_img_e").first().clone().appendTo(".about_bg");
}

const container = document.querySelector(".about_bg");
const images = document.querySelectorAll(".about_bg img");

// 섹션 크기 가져오기
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;
let wid = $("body").width();
// 이미지 랜덤 배치 함수
function arrangeImages() {
    positions = []; // 기존 위치 기록 초기화

    images.forEach(img => {
        // 이미지의 크기 가져오기
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        let randomX, randomY, isOverlapping;
        let attempts = 0;

        do {
            // 랜덤 위치 생성 (이미지 크기를 고려하여 영역 내에서 배치)
            randomX = Math.random() * (containerWidth - imgWidth);
            randomY = Math.random() * (containerHeight - imgHeight);

            isOverlapping = false;

            // 이미 배치된 이미지들과 겹치는지 확인
            positions.forEach(pos => {
                const distanceX = Math.abs(pos.x - randomX);
                const distanceY = Math.abs(pos.y - randomY);
                const minDistance = 50; // 최소 거리 설정 (겹침 방지)

                if (distanceX < imgWidth + minDistance && distanceY < imgHeight + minDistance) {
                    isOverlapping = true; // 겹침 발생
                }
            });

            attempts++;
        } while (isOverlapping && attempts < 100); // 100번의 시도 후 종료

        // 위치와 크기 설정
        gsap.set(img, {
            x: randomX,
            y: randomY,
            scale: Math.random() * 0.5 + 0.5, // 크기 0.5 ~ 1.0배 사이
            opacity: 0.7,
        });

        // 위치 기록 (겹침 방지용)
        positions.push({ x: randomX, y: randomY });
    });
}

// 초기 배치 실행
arrangeImages();

// 이전 너비값 저장
let previousWidth = containerWidth;
let wdd = wid;
// 화면 너비 변화를 감지하여 재배치
function checkResize() {
    const currentWidth = container.offsetWidth;
    const currentHeight = container.offsetHeight;
    let wid = $("body").width();

    // 너비나 높이가 변했을 경우만 재배치 실행
    if (wid !== wdd) {
        containerWidth = currentWidth;
        containerHeight = currentHeight;
        previousWidth = currentWidth;
        wdd = wid;
        arrangeImages(); // 이미지 재배치
    }

    // 500ms 후 다시 실행
    setTimeout(checkResize, 2500);
}

// 리사이즈 감지 시작
checkResize();

// currentWidth !== previousWidth || currentHeight !== containerHeight