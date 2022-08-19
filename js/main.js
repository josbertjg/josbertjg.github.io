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
        let aux=0;
        if(window.innerWidth<=575){
            aux=-20;
        }else
            aux=0;
        $(".menu-hover").animate({
            right:`${aux}px`
        },300)
    },1000)

    //EFFECTS OF THE PAGE
    //FIRST VIEW EFFECTS
    if(isInViewport(document.getElementById("first-view-container")))
        firstViewEffects();

    //ABOUT ARROW EFFECTS
    let show_about_arrows=true;
    setInterval(() => {
        if(show_about_arrows){
            show_about_arrows=false;
            $(".about-arrow").fadeIn("fast")
        }else{
            show_about_arrows=true;
            $(".about-arrow").fadeOut("fast")
        }
    }, 1500);
    //CALLING TEMPORAL EFFECTS
    clearInterval(intervalWave);
    tempEffects();
    //DETECTING SCROLL
    let showArrow=true;
    $(window).scroll(()=>{
        //EFFECTS OF THE PAGE
        if(isInViewport(document.getElementById("first-view-container")))
            firstViewEffects();

        //MENU EVENTS
        if(window.scrollY>300){
            if(showArrow){
                setTimeout(()=>{
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
                },600);
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
        }else{
            if(!showArrow){
                setTimeout(() => {
                    fadeElement(".menu-hover p","¡I'M THE MENU!");
                    $(".menu-hover .arrow-container").animate({
                        top:'20px',
                        opacity:'0'
                    },300).hide(300)
                }, 600);
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
    //IF THE PAGE IS RELOADED ON A PIXEL HIGHER THAN 301, THEN THE ARROW APEARS AND THE MENU GOES DOWN
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

    //TRANSLATING THE SKILL SET IMAGE TO RIGHT WHEN CLICK
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
        //SETING DISPLAY FLEX TO SKILL LIST ITEMS
        $(".skill").css({"display":"flex"});
    })

    /* ********************** PORTFOLIO EVENTS ********************** */

    //ADDING SELECT SKILL TO FIND SKILL
    let arr=0;
    let arrProjects = $(".project-container"); 
    //SHOWING THE COUNT OF PROJECTS
    $("#cantProjects").text(`${arrProjects.length} Projects`)

    let arrSelectedSkills= [];
    let count=0,position=0;
    $(".select-skill").click((event)=>{
        let valid = true;

        //VALIDATING THAT THE SKILL CAN BE SHOWED ONLY ONCE
        arr = $(".find-skill");
        for(let i = 0;i<arr.length;i++){
            if($(event.currentTarget).text()==$(arr[i]).text()){
                valid = false;
                break;
            }
        }
        
        if(valid){
            $(event.currentTarget).addClass("selected-skill")
            $(".selected-skills").append(`<button class='find-skill find${count}'>${$(event.currentTarget).text()}</button>`)
            $(".find-skill").animate({opacity:"1"},200)
            //ADDING THE ELIMINATION EVENT TO FIND-SKILL
            $(".find"+count).on("click",(e)=>{
                arr = $(".selected-skill");
                for(let i = 0;i<arr.length;i++){
                    if($(e.currentTarget).text()==$(arr[i]).text()){
                        $(arr[i]).removeClass("selected-skill")
                        break;
                    }
                }
                $(e.currentTarget).remove();

                position=arrSelectedSkills.indexOf($(e.currentTarget).text());
                arrSelectedSkills.splice(position,1);
                lookingForProjects(arrProjects,arrSelectedSkills);
            });
            //SHOWING ONLY PROJECTS WITH THE SELECTED SKILLS
            arrSelectedSkills.push($(event.currentTarget).text());
            console.log(arrProjects)
            lookingForProjects(arrProjects,arrSelectedSkills);
            count++;
        }
    });

    //SETTING THE SELECTED-SKILLS CONTAINER BLANK
    $("#blank").click(()=>{
        $(".selected-skills").empty();
        $(".selected-skill").removeClass("selected-skill");
        arrSelectedSkills=[];
        lookingForProjects(arrProjects,arrSelectedSkills);
    })

    //ADDING THE SKILL IF CLICK ON ADD
    let numAux=0;
    $(".add").click(()=>{
        if($(".search-skills").val().trim().length != 0){
            $(".selected-skills").append(`<button class='find-skill search${numAux}'>${$(".search-skills").val().toUpperCase()}</button>`);

            $(".search"+numAux).on("click",(e)=>{
                arr = $(".selected-skill");
                for(let i=0;i<arr.length;i++){
                    if($(arr[i]).text()==$(e.currentTarget).text()){
                        $(arr[i]).removeClass("selected-skill");
                    }
                }
                //LOOKING FOR THE PROJECT
                position=arrSelectedSkills.indexOf($(e.currentTarget).text());
                arrSelectedSkills.splice(position,1);
                lookingForProjects(arrProjects,arrSelectedSkills);
                $(e.currentTarget).remove()
            });

            //ADDING THE STYLE IF THERE ARE IQUAL BUTTONS
            arr = $(".select-skill");
            for(let i=0;i<arr.length;i++){
                if($(arr[i]).text()==$(".search-skills").val().toUpperCase()){
                    $(arr[i]).addClass("selected-skill");
                }
            }
            //LOOKING FOR THE PROJECT
            arrSelectedSkills.push($(".search-skills").val().toUpperCase());
            lookingForProjects(arrProjects,arrSelectedSkills);

            $(".search-skills").val("")
            $(".find-skill").animate({opacity:"1"},200);
        }
    });

    //TYPING EVENTS
    $(".search-skills").keydown((event)=>{
        if(event.keyCode==13 && $(".search-skills").val().trim().length != 0){
            $(".selected-skills").append(`<button class='find-skill search${numAux}'>${$(".search-skills").val().toUpperCase()}</button>`);

            $(".search"+numAux).on("click",(e)=>{
                arr = $(".selected-skill");
                for(let i=0;i<arr.length;i++){
                    if($(arr[i]).text()==$(e.currentTarget).text()){
                        $(arr[i]).removeClass("selected-skill");
                    }
                }
                //LOOKING FOR THE PROJECT
                position=arrSelectedSkills.indexOf($(e.currentTarget).text());
                arrSelectedSkills.splice(position,1);
                lookingForProjects(arrProjects,arrSelectedSkills);
                $(e.currentTarget).remove()
            });

            //ADDING THE STYLE IF THERE ARE IQUAL BUTTONS
            arr = $(".select-skill");
            for(let i=0;i<arr.length;i++){
                if($(arr[i]).text()==$(".search-skills").val().toUpperCase()){
                    $(arr[i]).addClass("selected-skill");
                }
            }
            //LOOKING FOR THE PROJECT
            arrSelectedSkills.push($(".search-skills").val().toUpperCase());
            lookingForProjects(arrProjects,arrSelectedSkills);

            $(".search-skills").val("")
            $(".find-skill").animate({opacity:"1"},200);
            numAux++;
        }
        return soloLetras(event);
    });

    //SWITCH EVENT
    $(".form-check-input").click((event)=>{
        if($(event.currentTarget).attr("checked") || $(event.currentTarget).prop("checked")){
            $(".project-skills").fadeIn()
            $(".project-skills").css({"display":"flex"})
        }else{
            $(".project-skills").fadeOut()
        }
    });

    /* ********************** PROJECT EVENTS ********************** */

    //SETTING THE PROJECT SKILLS
    for(let i=0;i<arrProjects.length;i++){
        let arrString=$(arrProjects[i]).attr("skills");
        arrString=arrString.split(" ");
        for(let j =0;j<arrString.length;j++)
            $(arrProjects[i].childNodes[7]).append(`<span>${arrString[j]}</span>`)
    }

    /* ********************** CONTACT EVENTS ********************** */
    
    //VALIDATING INPUTS
    $("[name='name']").keydown((event)=>{
        return soloLetras(event);
    });
    $("[name='email']").on({
        "blur":()=>{
            if(!validarCorreo($("[name='email']").val()) && $("[name='email']").val().trim().length > 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El correo que introduciste es invalido, intentalo de nuevo...',
                });
                $("[name='email']").val("");
            }
        },
        "keyup":(event)=>{
            if(event.keyCode == 13 && $("[name='email']").val().trim().length > 0)
                if(!validarCorreo($("[name='email']").val())){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El correo que introduciste es invalido, intentalo de nuevo...',
                    });
                    $("[name='email']").val("");
                }
        }
    })

    //SENDING EMAIL WITH MAILTO
    $("#btnSend").click(()=>{

        if(validarLength($("[name='name']").val()) && validarLength($("[name='email']").val()) && validarLength($("[name='message']").val())){
            $("#mailto").attr("href",`mailto:josbertjg@gmail.com?subject=¡Hola! Mi nombre es ${$("[name='name']").val().toUpperCase()} y quiero contactar contigo! | Mi correo es: ${$("[name='email']").val()}&body=${$("[name='message']").val()}`);
            document.getElementById("mailto").click();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos del formulario no deben estar vacíos.',
            });
        }

    });

    /* ********************** FUNCTIONS ********************** */

    //INITIAL EFFECTS

    //DETECTING IF AN ELEMENT IS ON VIEWPORT
    function isInViewport(elem) {
        let distance = elem.getBoundingClientRect();
        return (distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0);
    }
    
    //EFFECTS OF FIRST SECTION (FIRST VIEW)
    async function firstViewEffects(){
        let aux =0;
        if(window.innerWidth <=575){
            aux=130;
        }else{
            aux=90
        }
        setTimeout(()=>{
            $(".semicircleHeader").animate({
                top:`${aux}vh`,
                opacity:"1"
            },600,()=>{
                $(".ribbon").slideDown();
                $(".image-header-container img").animate({
                    left:"0px",
                    opacity:"1"
                },600,()=>{
                    setTimeout(()=>{
                        $(".text-header-container p:not(.text-header-container div > p b)").fadeIn();
                        if(window.innerWidth >= 991)
                            $(".line").fadeIn();
                    }, 1000);
                    setTimeout(()=>{
                        if(window.innerWidth > 576){
                            $(".text-header-container div > p b").fadeIn(400);
                            $(".text-header-container img").fadeIn(400);
                        }
                        $(".header-social-media li:first-of-type").fadeIn(300,()=>$(".header-social-media li:nth-of-type(2)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(3)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(4)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(5)").fadeIn(300,()=>$(".header-social-media li:nth-of-type(6)").fadeIn(300))))));
                    }, 2000);
                });
            });
        },1000)
    };

    //FADE IN MENU ITEMS
    async function fadeInMenu(){
        $("#menu-item-1").fadeIn("fast",()=>$("#menu-item-2").fadeIn("fast",()=>$("#menu-item-3").fadeIn("fast",()=>$("#menu-item-4").fadeIn("fast"))));
    }
    //FADE OUT ITEMS MENU
    async function fadeOutMenu(){
        $("#menu-item-4").fadeOut("fast",()=>$("#menu-item-3").fadeOut("fast",()=>$("#menu-item-2").fadeOut("fast",()=>$("#menu-item-1").fadeOut("fast"))));
    }
    //FADING ELEMENTS
    async function fadeElement(element,html){
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
    async function waves(){
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
    async function oneWave(){
        $(".wave").animate({
            height:'12rem',
            width:'12rem',
            opacity: '0'
        },500,()=>{
            $(".wave").css({'height':'9rem','width':'9rem','opacity':'1'});
        })
    }
    //TEMPORAL MENU EFFECTS 
    async function tempEffects(){
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
    async function menuItemsDown(){
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
    async function menuItemsUp(){
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
    async function skillImgs(){
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
    async function skillContainers(){
        let skillBarContainer;
        let arrSkills = $(".skill");
        for(let i=0;i<arrSkills.length;i++){
            skillBarContainer=arrSkills[i].childNodes[3];
            $(skillBarContainer).animate({
                opacity:"1"
            },1000,()=>skillLevels())
        }
    }
    async function skillLevels(){
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

    //LOOKING FOR PROJECTS WITH THE SELECTED SKILLS
    async function lookingForProjects(projects,skills){
        let numProjects=0;
        let arrS=0;
        console.log(skills);
        
        if(skills.length==0){
            $(".project-container").fadeIn(200);
            $(".project-container").css({"display":"flex"});
            $("#cantProjects").text(`${projects.length} Projects`);
        }else{
            for(let i=0;i<projects.length;i++){
                arrS=$(projects[i]).attr("skills");
                arrS=arrS.split(" ");
    
                for(let j=0;j<skills.length;j++){
                    if(arrS.indexOf(skills[j])==-1){
                        $(projects[i]).fadeOut(200);
                        break;
                    }else
                        if(j==(skills.length)-1){
                            $(projects[i]).fadeIn(200);
                            $(projects[i]).css({"display":"flex"})
                            numProjects++;
                        }
                }
            }
            $("#cantProjects").text(`${numProjects} Projects`);
        }
    }
});