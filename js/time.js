$(".window_frames").prepend(`<img src="" alt="window_frame">`);
$(".window").html(`<img src="" alt="window">`);

$(".image").html(`<img src="" alt="main_section_image">`);

let time = ["morning","afternoon","evening"];
let window_color = ["white","black"];
let item = ["flower","star","sun","moon"];

function times(hr, min, sec){
    // console.log('Hour:', hr);
    // console.log('Minute:', min);
    // console.log('Second:', sec);

    if ((0 <= hr && hr < 6) || (18 <= hr && hr < 24)) {
        updateImages(time[2]);
        color_update(window_color[1]);
        svg_item(item[1]);
        $(".svgs").addClass("svg_color_w").removeClass("svg_color_b");
        $(".about_bg .about_img_switch").addClass("svg_block").removeClass("svg_none");
    } else if ((6 <= hr && hr < 12) || (17 <= hr && hr < 18)) {
        updateImages(time[0]);
        color_update(window_color[0]);
        svg_item(item[0]);
        $(".svgs").addClass("svg_color_b").removeClass("svg_color_w");
        $(".about_bg .about_img_switch").addClass("svg_block").removeClass("svg_none");
    } else if (12 <= hr && hr < 17) {
        updateImages(time[1]);
        color_update(window_color[0]);
        svg_item(item[0]);
        $(".svgs").addClass("svg_color_b").removeClass("svg_color_w");
        $(".about_bg .about_img_switch").addClass("svg_none").removeClass("svg_block");
    }

    function updateImages(img) { //["morning","afternoon","evening"]
        $(".image").each(function (i) {
            $(this).find("img").attr({"src":`./img/main/${img}/image_${i}.webp`,"alt":`main_section_${img}_${i}`});
        });

        $(".window_frames img").attr("src",`./img/main/window/${img}_window.webp`);
        $(".image_wrap .image_text p").text(`good ${img}`);
        
        const imgSrc = img === time[2] ? "moon" : "sun";
        $(".about_bg .about_img_c").attr("src", `./img/about/${imgSrc}.svg`);
    }


    function color_update(color) {
        $(".window img").attr("src",`./img/main/window/${color}_window.webp`);

        const bgColor = color === "white" ? "#ffffff" : "#1a1a1a";
        const textColor = color === "white" ? "#000000" : "#ffffff";
            
        $("body").css("background-color",bgColor);
        $(".color").css("color",textColor);
        $(".works_wrap ul li").css("border-top","5px solid" + textColor);
        $(".works_wrap ul li:last-child").css("border-bottom","5px solid" + textColor);
        $(".in_line").css({
            "border-top": "1px solid" + textColor,
            "border-bottom": "1px solid" + textColor,
        })
    }

    
    function svg_item(svg) {
        $(".about_img_d").attr("src", `./img/about/${svg}_a.svg`);
        $(".about_img_e").attr("src", `./img/about/${svg}_b.svg`);
    }


    $(".hr").text(hr);
    $(".min").text(min);
    $(".sec").text(sec);
}

// 정확한 1초 주기로 실행
function runTimes() {
    const options = {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const now = new Date();
    const koreanTime = new Intl.DateTimeFormat('ko-KR', options).format(now);
    const [hr, min, sec] = koreanTime.split(':');

    if (typeof times === 'function') {
        times(hr, min, sec);
    } else {
        console.error('times 함수가 정의되지 않았습니다.');
    }

    const delay = 1000 - (now % 1000);
    setTimeout(runTimes, delay);
}

// 초기 실행
runTimes();









