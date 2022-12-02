
class Header_ extends LibMfcHtml{
    ex1=(v)=>{
        // clsExpand: navbar | navbar-dark, -light  | navbar-expand, -sm, -md, -lg, -xl, -xxl |  
        // clsContainer: container, -fluid 
        // htmlJudul : <a class="navbar-brand" href="#">Never expand</a>

        // header_.ex1({
        //     clsExpand:"navbar navbar-expand navbar-dark bg-light",
        //     clsContainer:"container",
        //     htmlJudul:` <a class="navbar-brand text-dark" href="#"><img src="./file/2.png" width="250"> <b>Header ex1</b></a>`,
        //     htmlMenu:header_.nav1({
        //       clsUl:"me-auto mb-2",
        //       clsLi:""
        //     })
        // })

        return `
            <nav class="${v.clsExpand}" aria-label="First navbar example">
                <div class="${v.clsContainer}">
                    ${v.htmlJudul}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarsExample01">
                    ${v.htmlMenu}
                    </div>
                </div>
            </nav>
        `;
    }
    ex2=(v)=>{
        // header_.ex2({
        //     clsContainer:"container border-bottom",
        //     clsHeader:"navbar" ,
        //     htmlJudul:`
        //       <a href="/" class="align-items-center mb-3 mb-md-0  text-dark text-decoration-none">
        //         <img src="../library/file/1.png" width="40"> 
        //         <span class="fs-4">Header Exp 2</span>
        //       </a>
        //     `,
        //     htmlMenu:header_.nav3({
        //               clsUl:"",
        //               clsLi:""
        //             })
        // })
        return `
            <div class="${v.clsContainer}">
                <header class="${v.clsHeader}">
                ${v.htmlJudul}
                ${v.htmlMenu}
                </header>
            </div>
        `;
    }
    ex3=(v)=>{
        // header_.ex3({
        //     clsContainer:"container-fluid p-0 m-0 exBgImgC100",
        //     tukar:"Bagus H",

        //     clsHeader:"nav-pills d-flex p-3 exBgColorBlack40" ,
        //     htmlJudul:`
        //       <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        //         <img class="" src="../library/file/1.png" width="40"> 
        //         <h3 class="judulApp ">Header Exp 2 tukar</h3>
        //       </a>
        //     `,
        //     htmlMenu:header_.nav3({
        //               clsUl:"",
        //               clsLi:""
        //             }),
            
        //     clsKeterangan:"d-flex align-items-center  my-3 text-white  p-3 mhight100",
        //     htmlKeterangan:button_.ex1(
        //       {
        //         clsGroup:"",
        //         listBtn :[
        //           {
        //             text:`<span class="mdi mdi-web"></span>`,
        //             cls:" btn-sm btn-primary rounded",
        //             attr:""
        //           },{
        //             text:"Btn Group",
        //             cls:" btn-sm btn-secondary ",
        //             attr:""
        //           },{
        //             text:"Ex1",
        //             cls:" btn-sm btn-success",
        //             attr:""
        //           }
                  
        //         ],
        //       }
        //     ),
            
        // })
        let chtml=`
            <header class="${v.clsHeader}">
                ${v.htmlJudul}
                ${v.htmlMenu}
            </header>
        `;
        if(v.tukar==undefined){
            chtml+=`
                <div class="${v.clsKeterangan}">
                    ${v.htmlKeterangan}
                </div>
            `;
        }else{
            chtml=`
                <div class="${v.clsKeterangan}">
                    ${v.htmlKeterangan}
                </div>
            `+chtml;
        }

        return `
            <div class="${v.clsContainer}">
                ${chtml}
            </div>
        `;
    }
    ex4=(v)=>{
        // header_.endBootstrap(2);  hapus file ini
        // header_.endBootstrap(10);
        let chtml=`
            <div class="navbar ${v.clsJudul}">
                <div class="${v.clsContainer}">
                    ${v.htmlJudul}
                </div>
            </div>
        `;
        if(v.tukar==undefined){
            chtml+=`
            <div class="${v.clsHeader}" id="${v.idCollapse}">
                <div class="${v.clsContainer}">
                    ${v.htmlKeterangan}
                </div>
            </div>
            `;
        }else{
            chtml=`
            <div class="${v.clsHeader}" id="${v.idCollapse}">
                <div class="${v.clsContainer}">
                    ${v.htmlKeterangan}
                </div>
            </div>
            `+chtml;
        }

        return `<header>`
                    +chtml
                +`</header>`;
    }
    ex5=(v)=>{
        // header_.ex5({
        //     clsCover:"container-fluid exBgImgC d-flex p-3 mx-auto flex-column",
        //     header:header_.ex2({
        //             clsContainer:"container border-bottom",
        //             clsHeader:"navbar" ,
        //             htmlJudul:`
        //               <a href="/" class="align-items-center mb-3 mb-md-0  text-dark text-decoration-none">
        //                 <img src="../library/file/1.png" width="40"> 
        //                 <span class="fs-4">Header Exp 2 & exp 5</span>
        //               </a>
        //             `,
        //             htmlMenu:header_.nav3({
        //                       clsUl:"",
        //                       clsLi:""
        //                     })
        //         }),
        //     clsMain:"p-3 container mhight250",
        //     htmlMain:`
        //       <h1>Cover your page.</h1>
        //       <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        //       <p class="lead">
        //         <a href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
        //       </p>
        //     `,
        // })
        return `<div class="${v.clsCover}">`
                    +v.header
                    +`<main class="${v.clsMain}">
                        ${v.htmlMain}
                    </main>
                </div>`;
    }
    nav1=(v)=>{
        // {
            // clsUl:navbar-nav me-auto mb-2
            // clsLi:
        // }
        let hhtml=`<ul class="navbar-nav ${v.clsUl}">`;
        this.hmenu.forEach((cv,ci) => {
            if(cv.subMenu!=undefined && cv.subMenu.length>0){
                hhtml+=`
                <li class="nav-item dropdown ${v.clsLi}">
                    ${cv.htmlLi}
                    <ul class="dropdown-menu ">`;
                    cv.subMenu.forEach(cv1 => {
                        hhtml+=`<li>${cv1.htmlLi}</li>`;
                    });
                hhtml+=`</ul>
                </li>`;
            }else{
                hhtml+=`
                <li class="nav-item ${this.delUndife(v.clsLi)}">
                    ${cv.htmlLi}
                </li>`;
            }
        });
        return hhtml+=`</ul>`;
    }
    nav2=(v)=>{
        // header_.nav2({
        //     clsUl:"me-auto mb-2",
        //     clsLi:""
        //   })
        let hhtml=`<ul class="nav nav-pills ${v.clsUl}">`;
        this.hmenu.forEach((cv,ci) => {
            if(cv.subMenu!=undefined && cv.subMenu.length>0){
                hhtml+=`
                <li class="nav-item dropdown ${v.clsLi}">
                    ${cv.htmlLi}
                    <ul class="dropdown-menu ">`;
                    cv.subMenu.forEach(cv1 => {
                        hhtml+=`<li>${cv1.htmlLi}</li>`;
                    });
                hhtml+=`</ul>
                </li>`;
            }else{
                hhtml+=`
                <li class="nav-item ${this.delUndife(v.clsLi)}">
                    ${cv.htmlLi}
                </li>`;
            }
        });
        return hhtml+=`</ul>`;
    }
    nav3=(v)=>{
        // header_.nav3({
        //     clsUl:"",
        //     clsLi:""
        //   })
        let hhtml=`<ul class="nav nav-pills ${v.clsUl}">`;
        this.hmenu.forEach((cv,ci) => {
            hhtml+=`
            <li class="nav-item ${this.delUndife(v.clsLi)}">
                ${cv.htmlLi}
            </li>`;
        });
        return hhtml+=`</ul>`;
    }
}