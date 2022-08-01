//PAGE READY
$(document).ready(()=>{
    //DECLARING VARIABLES
    let show = true;
    let active = true;
    let timer;
    let innerHeight=window.innerHeight;
    let intervalWave, intervalEffects , intervalEffects2;
    let item1= document.getElementById("menu-item-1");
    let item2= document.getElementById("menu-item-2");
    let item3= document.getElementById("menu-item-3");
    let item4= document.getElementById("menu-item-4");
    /* INITIAL EFFECTS */
    setTimeout(()=>{
        $(".menu-hover").animate({
            right:"0px"
        },300)
        $(".semicircleHeader").animate({
            top:"90vh",
            opacity:"1"
        },600,()=>{
            $(".ribbon").slideDown();
            $(".image-header-container img").animate({
                left:"0px",
                opacity:"1"
            },600,()=>{
                setTimeout(()=>{
                    $(".text-header-container p:not(.text-header-container div > p b)").fadeIn();
                    $(".line").fadeIn();
                }, 1000);
                setTimeout(()=>{
                    $(".text-header-container div > p b").fadeIn(400);
                    $(".text-header-container img").fadeIn(400,()=>{
                        $(".header-social-media li:first-of-type").fadeIn(300,()=>$(".header-social-media li:nth-of-type(2)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(3)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(4)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(5)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(6)").fadeIn(300))))));
                        // $(".semicircleSkill").animate({
                        //     opacity:"1"
                        // },300)
                    });
                }, 2000);
            })
        })
    },1000)
    //CALLING TEMPORAL EFFECTS
    clearInterval(intervalWave);
    tempEffects();
    //DETECTING SCROLL
    let showArrow=true;
    $(window).scroll(()=>{
        if(window.scrollY>300){
            if(showArrow){
                $(".menu-hover p").animate({
                    top:'20px',
                    opacity:'0'
                },300,()=>{
                    setTimeout(()=>{
                        $(".menu-hover p").empty();
                        $(".arrow-container").show();
                        $(".menu-hover p").html("¡DOBLE CLICK ME!");        
                        $(".menu-hover p").animate({
                            top:'0px',
                            opacity:'1',
                        },250);
                        $(".menu-hover .arrow-container").animate({
                            top:'0px',
                            opacity:'1',
                        },490);
                    },200)
                });
                //SENDING THE MENU TO BOTTOM
                innerHeight=window.innerHeight;
                $(".menu-hover").animate({
                    top : `${innerHeight-220}px`
                },600)
                $(".menu-item-container").animate({
                    top : `${innerHeight-420}px`
                },800)
                //ORGANIZING MENU ITEMS
                menuItemsDown();
                showArrow=false;
                //HIDING MENU ITEMS
                fadeOutMenu();
                show=true;
            }
        }
        else{
            if(!showArrow){
                fadeElement(".menu-hover p","¡I'M THE MENU!");
                $(".menu-hover .arrow-container").animate({
                    top:'20px',
                    opacity:'0'
                },300).hide(300)
                //SENDING THE MENU TO BOTTOM
                $(".menu-hover").animate({
                    top : `0px`
                },600)
                $(".menu-item-container").animate({
                    top : `-195.2px`
                },800)
                //ORGANIZING MENU ITEMS
                menuItemsUp();
                showArrow=true;
                //HIDING MENU ITEMS
                fadeOutMenu();
                show=true;
            }
        }
    });
    //IF THE PAGE IS RELOADED ON A PIXEL HIGHER THAN 301, THEN THE ARROW APEARS AND THE MENU GO DOWN
    if(window.scrollY>=300){
        $(".menu-hover p").animate({
            top:'20px',
            opacity:'0'
        },300,()=>{
            setTimeout(()=>{
                $(".menu-hover p").empty();
                $(".arrow-container").show();
                $(".menu-hover p").html("¡DOBLE CLICK ME!");        
                $(".menu-hover p").animate({
                    top:'0px',
                    opacity:'1',
                },250);
                $(".arrow-container").animate({
                    top:'0px',
                    opacity:'1',
                },490);
            },200)
        });
        //SENDING THE MENU TO BOTTOM
        $(".menu-hover").animate({
            top : `${innerHeight-220}px`
        },600)
        $(".menu-item-container").animate({
            top : `${innerHeight-420}px`
        },900)
        //ORGANIZING ITEMS
        menuItemsDown();
        showArrow=false;
    }
    /* ********************** MENU-HOVER EVENTS ********************** */
    $(".menu-hover").on({
        'click': ()=>{
            if(active){
                timer = setTimeout(()=>{
                    if(show){
                        fadeInMenu();
                        if(window.scrollY<=300)
                            fadeElement(".menu-hover p","¡ENJOY!");
                        show=false;
                    }else{
                        fadeOutMenu();
                        if(window.scrollY<=300)
                            fadeElement(".menu-hover p","¡I'M THE MENU!");
                        show=true;
                    }
                    active = true;
                },300)
                active = false;
            }else{
                clearTimeout(timer);
                active = true;
            }
            $(".menu-hover").off("mouseover");
            clearInterval(intervalWave);
            $(".menu-hover").removeClass("shake");
        },
        'focus': ()=>{
            if(!show && window.scrollY<=300){
                fadeElement(".menu-hover p","¡I'M THE MENU!");
            }
        },
        'blur': ()=>{      
            if(item1.style.display == "none" || item1.style.display == "" || item2.style.display == "none" || item2.style.display == "" || item3.style.display == "none" || item3.style.display == "" || item4.style.display == "none" || item4.style.display == ""){
                setTimeout(()=>{
                    fadeOutMenu();
                    if(!show && window.scrollY<=300)
                        fadeElement(".menu-hover p","¡I'M THE MENU!");
                    show=true;
                },1000);
            }else{
                fadeOutMenu();
                if(!show && window.scrollY<=300)
                    fadeElement(".menu-hover p","¡I'M THE MENU!");
                show=true;
            }
        },
        'dblclick': ()=>{
            if(window.scrollY>300){
                window.scrollTo(0,0);
                setTimeout(() => {
                    fadeOutMenu();
                },600);
                show=true;
            }
        },
        'mouseover': ()=>{
            clearInterval(intervalWave);
            clearInterval(intervalEffects);
            clearInterval(intervalEffects2);
            //WAVE EFFECT
            waves();
            $(".menu-hover").addClass("shake");
        },
        'mouseleave': ()=>{
            clearInterval(intervalWave);
            $(".menu-hover").off("mouseover");
            $(".menu-hover").on("mouseover",()=>{
                clearInterval(intervalWave);
                clearInterval(intervalEffects);
                clearInterval(intervalEffects2);
                $(".menu-hover").removeClass("shake");
                $(".menu-hover").addClass("shake");
                //WAVE EFFECT
                waves();    
            });
            $(".menu-hover").removeClass("shake");
            //CALLING TEMPORAL EFFECTS
            clearInterval(intervalWave);
            clearInterval(intervalEffects);
            clearInterval(intervalEffects2);
            tempEffects();
        }
    });

    /* ********************** SKILL SET EVENTS ********************** */

    //TRANSLATING THE SKILL SET IMAGE TO RIGHT
    $(".skillSet-container ul").click(()=>{
        let w = $(".skillSet-container ul").width();
        let innerW;
            if(window.innerWidth>=1400)
                innerW=w*0.7
            else if(window.innerWidth<1400 && window.innerWidth>=1024)
                innerW=w*0.67
        $(".skillSet-container ul").css({"background-color":"rgb(253, 253, 253)"})
        $(".skill-card").animate({
            left:`${innerW}px`
        },1000)
        $(".skillSet-text, .skillSet-text + img").fadeOut(500)
        $(".skill-card .front").css({"transform":"perspective(1000px) rotateY(180deg)"})
        $(".skill-card .back").css({"transform":"perspective(1000px) rotateY(360deg)"})
        skillImgs();
    })

    /* ********************** FUNCTIONS ********************** */

    //FADE IN MENU ITEMS
    function fadeInMenu(){
        $("#menu-item-1").fadeIn("fast",()=>$("#menu-item-2").fadeIn("fast",()=>$("#menu-item-3").fadeIn("fast",()=>$("#menu-item-4").fadeIn("fast"))));
    }
    //FADE OUT ITEMS MENU
    function fadeOutMenu(){
        $("#menu-item-4").fadeOut("fast",()=>$("#menu-item-3").fadeOut("fast",()=>$("#menu-item-2").fadeOut("fast",()=>$("#menu-item-1").fadeOut("fast"))));
    }
    //FADING ELEMENTS
    function fadeElement(element,html){
        $(element).animate({
            top:'20px',
            opacity:'0'
        },300,()=>{
            setTimeout(()=>{
                $(element).empty();

                if(html!=undefined)
                    $(element).html(html);

                $(element).animate({
                    top:'0px',
                    opacity:'1',
                },250)
            },200)
        })
    }
    //WAVES EFFECT
    function waves(){
        intervalWave=setInterval(()=>{
            $(".wave").animate({
                height:'12rem',
                width:'12rem',
                opacity: '0'
            },500,()=>{
                $(".wave").css({'height':'9rem','width':'9rem','opacity':'1'})
            })
        },500);
    }
    //ONE WAVE EFFECT
    function oneWave(){
        $(".wave").animate({
            height:'12rem',
            width:'12rem',
            opacity: '0'
        },500,()=>{
            $(".wave").css({'height':'9rem','width':'9rem','opacity':'1'});
        })
    }
    //TEMPORAL MENU EFFECTS 
    function tempEffects(){
        clearInterval(intervalWave);
        clearInterval(intervalEffects);
        intervalEffects=setInterval(()=>{
            clearInterval(intervalEffects2);
            clearInterval(intervalWave);
            let num = Math.random()*(7000-4000)+4000;
            intervalEffects2=setInterval(()=>{
                //SHAKING
                $(".menu-hover").addClass("shake");
                setTimeout(()=>{
                    $(".menu-hover").removeClass("shake");
                },600)
                //WAVES
                oneWave();
                clearInterval(intervalWave);
                //ARROW MOVING
                if(window.scrollY>300){
                    for(let i=1;i<=2;i++){
                        $(".arrow-container").animate({
                            top:"-8px"
                        },250).animate({
                            top:"0px"
                        },250)
                    }
                }
            },num);
        },8000);
    }
    //SENDING MENU ITEMS DOWN
    function menuItemsDown(){
        //ITEM 1
        $("#menu-item-1").animate({
            top:'0px',
            left:'-50px'
        },550,()=>{
            $("#menu-item-1").css({
                "transform":"skewX(-55deg)"
            })
            $("#menu-item-1 span").css({
                "transform":"skewX(55deg)"
            })
        })
        //ITEM 2
        $("#menu-item-2").animate({
            top:'55px',
            left:'-110px'
        },550,()=>{
            $("#menu-item-2").css({
                "transform":"skewX(-30deg)"
            })
            $("#menu-item-2 span").css({
                "transform":"skewX(30deg)"
            })
        })
        //ITEM 3
        $("#menu-item-3").animate({
            top:'110px',
            left:'-120px'
        },550,()=>{
            $("#menu-item-3").css({
                "transform":"skewX(10deg)"
            })
            $("#menu-item-3 span").css({
                "transform":"skewX(-10deg)"
            })
        })
        //ITEM 4
        $("#menu-item-4").animate({
            top:'165px',
            left:'-90px'
        },550,()=>{
            $("#menu-item-4").css({
                "transform":"skewX(45deg)"
            })
            $("#menu-item-4 span").css({
                "transform":"skewX(-45deg)"
            })
        })
    }
    //SENDING MENU ITEMS UP
    function menuItemsUp(){
        //ITEM 1
        $("#menu-item-1").animate({
            top:'17px',
            left:'-91.2px'
        },550,()=>{
            $("#menu-item-1").css({
                "transform":"skewX(-45deg)"
            })
            $("#menu-item-1 span").css({
                "transform":"skewX(45deg)"
            })
        })
        //ITEM 2
        $("#menu-item-2").animate({
            top:'73px',
            left:'-119.2px'
        },550,()=>{
            $("#menu-item-2").css({
                "transform":"skewX(-10deg)"
            })
            $("#menu-item-2 span").css({
                "transform":"skewX(10deg)"
            })
        })
        //ITEM 3
        $("#menu-item-3").animate({
            top:'129px',
            left:'-112px'
        },550,()=>{
            $("#menu-item-3").css({
                "transform":"skewX(20deg)"
            })
            $("#menu-item-3 span").css({
                "transform":"skewX(-20deg)"
            })
        })
        //ITEM 4
        $("#menu-item-4").animate({
            top:'185px',
            left:'-73.6px'
        },550,()=>{
            $("#menu-item-4").css({
                "transform":"skewX(45deg)"
            })
            $("#menu-item-4 span").css({
                "transform":"skewX(-45deg)"
            })
        })
    }
    //SKILLS EFFECTS
    function skillImgs(){
        let skillImg;
        let arrSkills = $(".skill");
        let i=0;
        let interval = setInterval(() => {
            skillImg=arrSkills[i].childNodes[1].childNodes[1];
            $(skillImg).fadeIn(200)
            i++;
            if(i>=arrSkills.length){
                skillContainers();
                clearInterval(interval);
            }
        }, 200);

        // for(let i=0;i<arrSkills.length;i++){
        //     setTimeout(()=>{
        //         skillImg=arrSkills[i].childNodes[1].childNodes[1];
        //         $(skillImg).fadeIn()
        //     },500)
        // }
    }
    function skillContainers(){
        let skillBarContainer;
        let arrSkills = $(".skill");
        for(let i=0;i<arrSkills.length;i++){
            skillBarContainer=arrSkills[i].childNodes[3];
            $(skillBarContainer).animate({
                opacity:"1"
            },1000,()=>skillLevels())
        }
    }
    function skillLevels(){
        let skillBar,level;
        let arrSkills = $(".skill");
        for(let i=0;i<arrSkills.length;i++){
            skillBar=arrSkills[i].childNodes[3].childNodes[1];
            level=$(skillBar).attr("level");
            $(skillBar).css({"width":`${level}0%`})
        }
    }
    // $(document).scroll(()=>{
    //     if(window.scrollY>=300)
    //         $("#scroller").fadeIn("fast");
    //     else
    //         $("#scroller").fadeOut("fast");
    // });

    // $("#scroller").click(()=>{
    //     window.scrollTo(0,0);
    // });
});