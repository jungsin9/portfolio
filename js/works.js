gsap.utils.toArray(".works_wrap li > div").forEach(element => {
    gsap.to(element,{
        padding:"150, 0",
        autoAlpha: 1,
        scrollTrigger: {
            trigger:element,
            start:"top 50%",
            end:"bottom 50%",
            markers: false,
            toggleActions: "play reverse play reverse",
            onLeave: () => gsap.to(element, { padding: "50px 0", autoAlpha: 0,}),
        }
    })
});