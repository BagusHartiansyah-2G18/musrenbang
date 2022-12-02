function _installAble(pdata){
        fcolorHeader="#476caa";
        fcolorHindBg2="background: rgba(23, 28, 36, 0.5);";
        furl="thema/able-lite/";
        // ftamabahan=;
        // console.log(pdata.css);
        // $('#head').html(pdata.css);
        $('#head').html(_libTextEditor(true)+`
            <link rel="stylesheet" href="`+assert+furl+`assets/pages/waves/css/waves.min.css" type="text/css" media="all">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/css/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="`+assert+furl+`assets/pages/waves/css/waves.min.css" type="text/css" media="all">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/icon/themify-icons/themify-icons.css">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/css/font-awesome-n.min.css">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/css/font-awesome.min.css">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/css/jquery.mCustomScrollbar.css">
            <link rel="stylesheet" type="text/css" href="`+assert+furl+`assets/css/style.css">
            <link rel="stylesheet" href="`+assert+`web2G18.css">
            <link rel="stylesheet" href="`+assert+`bootstrap/icon/css/materialdesignicons.min.css">
            <link rel="stylesheet" type="text/css" href="`+assert+`bootstrap/dist/css/_reset.scss">
            <link rel="stylesheet" type="text/css" href="`+assert+`bootstrap/dist/css/_data-tables.scss">
            <link rel="stylesheet" type="text/css" href="`+assert+`bootstrap/dist/css/dataTables.bootstrap4.css">
            <style>
                .pcoded .pcoded-header[header-theme="theme1"] {
                    background: `+fcolorHeader+`;
                }
                .pcoded[fream-type="theme1"] .main-menu .main-menu-header:before,
                .pcoded[fream-type="theme1"] .page-header:before {
                    `+fcolorHindBg2+`
                }
            </style>
        `);
        // `+_libTextEditor(true));
        // <div class="pcoded-main-container" id="main-pcoded" style="margin-top: 4%;"></div>
        if(pdata.form){
            $('#body').html(`
                `+_loaderAlbe()+`
                <div id="pcoded" class="pcoded">
                    <div class="pcoded-overlay-box"></div>
                        <div class="pcoded-container navbar-wrapper">

                            `+_headerAble()+`
                            
                            <div class="pcoded-main" id="main-pcoded" style="margin-top: 55px;">
                                <div class="pcoded-wrapper">

                                    `+_navbarAble()+`

                                    <div class="pcoded-content">

                                        <div class="page-header" style="background-image:url(`+assert+"bgSupportCss/bgForm2.png"+`); height:`+navBar.heightLogo2+`;">
                                            <div class="page-block">
                                                <div class="row align-items-center">
                                                    <div class="col-md-8">
                                                        <div class="page-header-title">
                                                            <h5 class="m-b-10">`+navBar.page+`</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <ul class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="index.html"> <i class="fa fa-home"></i> </a>
                                                            </li>
                                                            <li class="breadcrumb-item"><a href="#!">`+navBar.page+`</a></li>
                                                            `+navBar.pageRight+`
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="pcoded-inner-content">
                                            <div class="main-body">
                                                <div class="page-wrapper">
                                                    <div class="page-body">

                                                        `+navBar.form+`

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }

        // <script src="`+assert+furl+`js/template.js"></script> onclick="_sideBarONOFF()"
        $('#footer').html(`
            <script type="text/javascript" src="`+assert+furl+`assets/js/jquery/jquery.min.js "></script>
            <script type="text/javascript" src="`+assert+furl+`assets/js/jquery-ui/jquery-ui.min.js "></script>
            <script type="text/javascript" src="`+assert+furl+`assets/js/popper.js/popper.min.js"></script>
            <script type="text/javascript" src="`+assert+furl+`assets/js/bootstrap/js/bootstrap.min.js "></script>
            <script src="`+assert+furl+`assets/pages/waves/js/waves.min.js"></script>
            <script type="text/javascript" src="`+assert+furl+`assets/js/jquery-slimscroll/jquery.slimscroll.js"></script>
            <script src="`+assert+furl+`assets/js/jquery.mCustomScrollbar.concat.min.js "></script>
            <script src="`+assert+furl+`assets/js/pcoded.min.js"></script>
            <script src="`+assert+furl+`assets/js/vertical/vertical-layout.min.js "></script>
            <script type="text/javascript" src="`+assert+furl+`assets/js/script.js "></script>
            `+_jsTabel()
            +_libTextEditor(false)
        );
        // _libTextEditor
    // $('.fixed-button').toggle();
}
function _installVarAble(pdata){
    //nav bar side left
    navBar.BG="style='background-color:none;'";
    navBar.Logo=judul.Logo;
    navBar.Logo1=assert+"bgSupportCss/bupatiWakil.png";
    navBar.bgLogo=assert+"bgSupportCss/kantorBupati.jpg";
    navBar.heightLogo2="150px";
    navBar.LogoWidth=judul.LogoSize;
    navBar.nama=judul.nama;
    navBar.menu=Array();
    navBar.page=pdata.page;
    navBar.pageRight=pdata.pageRight;
    navBar.form=pdata.form;

    menuSupport.push({nama:"Beranda",icon:'<i class="mdi mdi-home menu-icon"></i>',url:router+"control/dashboard/null",active:"",status:_jbt.allDis,subMenu:[]});
    navBar.menu.push({group:null,menu :menuSupport});

    menuSupport=[];
    menuSupport.push({nama:"Basis Data",icon:'<i class="mdi mdi-note-plus menu-icon"></i>',url:"#inp",active:"",status:_jbt.tapd,subMenu:[
        {
        //     url:router+"control/jabatan",
        //     menu:"Jabatan",
        //     // status:"active",
        //     status:""
        // },{
            url:router+"control/dinas/"+btoa(JSON.stringify({perkada:0,tahun:0})),
            menu:"Dinas",
            // status:"active",
            status:""
        },{
            url:router+"control/akun",
            menu:"Akun",
            status:""
        },{
            url:router+"control/renstra/"+btoa(JSON.stringify({perkada:0,tahun:0})),
            menu:"Renstra",
            status:""
        },{
            url:router+"control/apbd/"+btoa(JSON.stringify({perkada:0,pembahasan:0,tahun:0})),
            menu:"APBD",
            status:""
        },
    ]});
    navBar.menu.push({menu :menuSupport});

    // menuSupport=[];
    // menuSupport.push({nama:"Beranda",icon:'<i class="mdi mdi-note-plus menu-icon"></i>',url:"#inp",active:"",status:2,subMenu:[]});
    // navBar.menu.push({menu :menuSupport});

    menuSupport=[];
    menuSupport.push({nama:"Usulan",icon:'<i class="mdi mdi-note-plus menu-icon"></i>',url:router+"control/usulan",active:"",status:_jbt.usulan,subMenu:[]});
    navBar.menu.push({menu :menuSupport});

    menuSupport=[];
    menuSupport.push({nama:"Disposisi",icon:'<i class="mdi mdi-cart-outline menu-icon"></i>',url:router+"control/disposisi",active:"",status:_jbt.disposisi,subMenu:[]});    
    navBar.menu.push({group:null,menu :menuSupport});
    
    menuSupport=[];
    menuSupport.push({nama:"Kajian Teknis",icon:'<i class="mdi mdi-transcribe menu-icon"></i>',url:router+"control/kajianTeknis",active:"",status:_jbt.kajian,subMenu:[]});
    navBar.menu.push({group:null,menu :menuSupport});
    
    menuSupport=[];
    menuSupport.push({nama:"Forum TAPD",icon:'<i class="mdi mdi-book-open menu-icon"></i>',url:router+"control/forum",status:_jbt.tapd,active:"",subMenu:[]});
    navBar.menu.push({group:null,menu :menuSupport});

    menuSupport=[];
    menuSupport.push({nama:"Notulen",icon:'<i class="mdi mdi-settings-box menu-icon"></i>',url:router+"control/notulen",active:"",status:_jbt.tapd,subMenu:[]});
    navBar.menu.push({menu :menuSupport});
    

    menuSupport=[];
    menuSupport.push({nama:"Laporan",icon:'<i class="mdi mdi-note-plus menu-icon"></i>',url:"#inp",active:"",status:_jbt.tapd,subMenu:[
        {
            url:router+"control/lusulan/"+btoa(JSON.stringify({perkada:0,pembahasan:0,tahun:0}))+"/0",
            menu:"Usulan",
            // status:"active",
            status:""
        },{
            url:router+"control/ldisposisi/"+btoa(JSON.stringify({perkada:0,pembahasan:0,tahun:0}))+"/0",
            menu:"Disposisi",
            status:""
        },{
            url:router+"control/lstruktur/"+btoa(JSON.stringify({perkada:0,pembahasan:0,tahun:0}))+"/0",
            menu:"Struktur",
            status:""
        },{
            url:router+"control/lnotulen/"+btoa(JSON.stringify({perkada:0,pembahasan:0,tahun:0}))+"/0",
            menu:"Notulen",
            status:""
        },{
            url:router+"control/lperkada/"+btoa(JSON.stringify({perkada:0,tahun:0}))+"/0",
            menu:"Hasil Pembahasan",
            status:""
        },{
            url:router+"control/lpaguDinas/"+btoa(JSON.stringify({perkada:0,tahun:0}))+"/0",
            menu:"Pagu Dinas",
            status:""
        },
    ]});
    navBar.menu.push({menu :menuSupport});

    menuSupport=[];
    menuSupport.push({nama:"Referensi",icon:'<i class="mdi mdi-book-open menu-icon"></i>',url:router+"control/referensi",status:_jbt.kajiTapd,active:"",subMenu:[]});
    navBar.menu.push({group:null,menu :menuSupport});
    
    // list.push({url:"",bg:"bg-primary",icon:`<i class="mdi mdi-file-check"></i>`,textSmall:"Nama Sistem",text:"SIA DATANG !!! "});
    // list.push({url:"",bg:"bg-warning",icon:`<i class="mdi mdi-file-check"></i>`,textSmall:"Mei 25, 2021",text:"Dikembangkan oleh : Tim IT 2G18"});
    // list.push({url:"",bg:"bg-success",icon:`<i class="mdi mdi-file-check"></i>`,textSmall:"Mei 25, 2021",text:"Sistem di Luncurkan"});
    
    

    header.contentDropList=[];
    header.contentDropList.push({url:"",onclick:"",icon:`<i class="mdi mdi-face"></i>`,nama:"Profile"});
    header.contentDropList.push({url:"",onclick:"",icon:`<i class="mdi mdi-settings"></i>`,nama:"Settings"});
    header.contentDropList.push({url:router+"control/logout",icon:`<i class="mdi mdi-exit-to-app"></i>`,nama:"Logout"});

    header.gip=assert+"bgSupportCss/bismillah1.gif";
    // header user dan bg
    header.nama="Bagus H";
    if(_nama!=undefined && _nama.length!=0){
        header.nama=_nama;
    }
    header.iconPeople=assert+"bgSupportCss/boy.png";
    header.style="background-color: #3a4f5573;";
}
function _headerAble(){
   
    fdata=`
        <li class="bg-primary">
            <button type="button">
                <label class="badge badge-info btn-m" style="top: 5px;">
                    <h6> <i class="mdi mdi-information-outline"></i> Informasi System</h6>
                </label>
            </button
        </li>`;
    list.forEach(v => {
        fdata+=_contentDropCenterIcon(v);
    });
    if(_notif){
        fdata+=`
        <li class="bg-secondary">
            <button type="button" class="btn btn-sm btn-success" 
                onclick="_mengertiNotif()" title="Preview Document">
                    <i class="mdi mdi-comment-check-outline"></i>
                    Saya Mengerti
            </button>
        </li>`;
    }


    fdata1="";
    // header.contentDropList.push({url:"",icon:`<i class="mdi mdi-face"></i>`,nama:"Profile"});
    header.contentDropList.forEach(v=>{
        url="#";
        if(v.url!=""){
            url=v.url;
        }
        fdata1+=`
            <li class="waves-effect waves-light">
                <a href="`+url+`" `+v.onclick+`>
                    `+v.icon+v.nama+`
                </a>
            </li>
        `;
    })
    return `
    <nav class="navbar header-navbar pcoded-header" style="background: #2c2d2e;">
        <div class="navbar-wrapper">
            <div class="navbar-logo">
                <a class="mobile-menu waves-effect waves-light" id="mobile-collapse" href="#!">
                    <i class="ti-menu"></i>
                </a>
                <div class="mobile-search waves-effect waves-light">
                    <div class="header-search">
                        <div class="main-search morphsearch-search">
                            <div class="input-group">
                                <span class="input-group-prepend search-close"><i class="ti-close input-group-text"></i></span>
                                <input type="text" class="form-control" placeholder="Enter Keyword">
                                <span class="input-group-append search-btn"><i class="ti-search input-group-text"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="index.html">
                    <img src="`+navBar.Logo+`" style="width: `+navBar.LogoWidth+`px;" >
                </a>
                <div class="sidebar-brand-text mx-3 `+judul.namaColor+`">`+navBar.nama+`</div>
                <a class="mobile-options waves-effect waves-light">
                    <i class="ti-more"></i>
                </a>
            </div>
            <div class="navbar-container container-fluid">
                <ul class="nav-left">
                    <li>
                        <div class="sidebar_toggle"><a href="javascript:void(0)"><i class="ti-menu"></i></a></div>
                    </li>
                    <li>
                        <a href="#!" onclick="javascript:toggleFullScreen()" class="waves-effect waves-light">
                            <i class="ti-fullscreen"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#!" class="waves-effect waves-light animet1" style="">
                            Tata Administrasi Bangun Jalan Pikiran
                        </a>
                        
                    </li>
                </ul>
                <ul class="nav-right">
                    <li class="header-notification">
                        <a href="#!" class="waves-effect waves-light">
                            <i class="ti-bell"></i>
                            <span class="badge bg-c-red"></span>
                        </a>
                        <ul class="show-notification" id="shownotification" style="max-height: 450px;overflow: auto;">
                            `+fdata+`
                        </ul>
                    </li>
                    <li class="user-profile header-notification">
                        <a href="#!" class="waves-effect waves-light">
                            <img src="`+header.iconPeople+`" class="img-radius" alt="User-Profile-Image">
                            <span>`+header.nama.substring(0,7)+`</span>
                            <i class="ti-angle-down"></i>
                        </a>
                        <ul class="show-notification profile-notification">
                            `+fdata1+`
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
}
function _navbarAble(){
     fdata="";
    navBar.menu.forEach((v,i) => {
        // return console.log(x)
        faktifMenu=v.menu[0].active;
        ftamSubMenu="";
        v.menu[0].status.forEach(vx => {
            // _log(vx,v);
            if(_kdJabatan==vx){
                if(v.menu[0].subMenu.length>0){
                    ftamSubMenu=`<ul class="pcoded-submenu">`;
                }
                if(v.menu[0].subMenu.length>0){
                    fdata+=`
                        <ul class="pcoded-item pcoded-left-item">
                            <li class="pcoded-hasmenu `+faktifMenu+`">
                                <a href="javascript:void(0)" class="waves-effect waves-dark">
                                    <span class="pcoded-micon">`+v.menu[0].icon+`<b>A</b></span>
                                    <span class="pcoded-mtext">`+v.menu[0].nama+`</span>
                                    <span class="pcoded-mcaret"></span>
                                </a>`;
                                
                                v.menu[0].subMenu.forEach(vm => {
                                    ftamSubMenu+=`
                                    <li class="`+vm.status+`">
                                        <a href="`+vm.url+`" class="waves-effect waves-dark">
                                            <span class="pcoded-micon"><i class="ti-angle-right"></i></span>
                                            <span class="pcoded-mtext">`+vm.menu+`</span>
                                            <span class="pcoded-mcaret"></span>
                                        </a>
                                    </li>`;
                                });
                                if(ftamSubMenu!=""){
                                    fdata+=ftamSubMenu+"</ul>";
                                }
                        fdata+=`</li>
                        </ul>`;
                }else{
                    fdata+=`
                        <ul class="pcoded-item pcoded-left-item" item-border="true" item-border-style="none" subitem-border="true">
                            <li class="`+faktifMenu+` pcoded-trigger">
                                <a href="`+v.menu[0].url+`" class="waves-effect waves-dark">
                                    <span class="pcoded-micon">`+v.menu[0].icon+`<b>D</b></span>
                                    <span class="pcoded-mtext">`+v.menu[0].nama+`</span>
                                    <span class="pcoded-mcaret"></span>
                                </a>
                            </li>
                        </ul>
                    `;
                }
            }
        });
    });
    // return `
    // <ul class="navbar-nav sidebar sidebar-light accordion col" id="accordionSidebar" style="padding:0px;max-width:max-content;">
    //     <a class="sidebar-brand d-flex align-items-center justify-content-center" `+navBar.BG+` href="index.html">
    //         <div class="sidebar-brand-icon">
    //             <img src="`+navBar.Logo+`">
    //         </div>
    //         <div class="sidebar-brand-text mx-3">`+navBar.nama+`</div>
    //     </a>
    //     <hr class="sidebar-divider my-0">
    //     `+fdata+`
    //     <div class="version" id="version-ruangadmin">2G18/V1</div>
    // </ul>
    // `;
    return `
    <nav class="pcoded-navbar">
        <div class="sidebar_toggle"><a href="#"><i class="icon-close icons"></i></a></div>
        <div class="pcoded-inner-navbar main-menu">
            <div class="">
                <div class="main-menu-header" style="background-image:url(`+navBar.bgLogo+`); height:`+navBar.heightLogo2+`">
                    <img class="img-80 img-radius" src="`+navBar.Logo1+`" style="width:`+navBar.heightLogo2+`" alt="User-Profile-Image">
                </div>
                <div class="main-menu-content">
                    <ul>
                        <li class="more-details">
                            <a href="user-profile.html"><i class="ti-user"></i>View Profile</a>
                            <a href="#!"><i class="ti-settings"></i>Settings</a>
                            <a href="auth-normal-sign-in.html"><i class="ti-layout-sidebar-left"></i>Logout</a>
                        </li>
                    </ul>
                    `+fdata+`
                </div>
            </div>

        </div>
    </nav>`;
    
}
function _contentDropCenterIcon(alert){
    fdata="";
    if(alert==null){
        return ``;
    }

    // list.push({url:"",bg:"bg-primary",icon:`<i class="mdi mdi-file-check"></i>`,textSmall:"April 25, 2021",text:"Sistem di Rencanakan"});

    fdata+=`
        <li class="waves-effect waves-light">
            <a href="`+alert.url+`" class="waves-effect waves-light">
                <div class="media">
                    <img class="d-flex align-self-center img-radius" src="`+assert+`bgSupportCss/informasi.png" alt="Generic placeholder image">
                    <div class="media-body">
                        <h5 class="notification-user">`+alert.textSmall+`</h5>
                        <p class="notification-msg">`+alert.text+`</p>
                    </div>
                </div>
            </a>
        </li>`;
    return fdata;
}
function _loaderAlbe(){
    return `
        <div class="theme-loader">
            <div class="loader-track">
                <div class="preloader-wrapper">
                    <div class="spinner-layer spinner-blue">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="spinner-layer spinner-red">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>

                    <div class="spinner-layer spinner-yellow">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>

                    <div class="spinner-layer spinner-green">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function _formAlbe(v){
    fbtn="";
    if(v.btn!=undefined){
        fbtn=v.btn;
    }
    fsubJudul="";
    if(v.subJudul!=undefined){
        fsubJudul=`<span>`+v.subJudul+`</span>`
    }
    ffooter="";
    if(v.judulFooter!=undefined){
        ffooter=`
            <h5 class="col-sm-3 text-info">`+v.judulFooter+`</h5>
                <span>
                    `+v.deskripsiFooter+`
                </span>
            </div>
        `;
    }
    return `
        <div class="row">
            <div class="col-sm-12">
                <!-- Bootstrap tab card start -->
                <div class="card">
                    <div class="card-header" style="padding: 30px; padding-left:20px">
                        <h5 class="col-sm-8 text-info">`+v.judul+`</h5>
                        `+fsubJudul+`
                        <div class="card-header-right">
                            `+fbtn+`
                        </div>
                    </div>
                    <div class="card-block">
                        `+v.isi+`
                    </div>

                    <div class="card-header">
                    `+ffooter+`
                </div>
                <!-- Bootstrap tab card end -->
            </div>
        </div>
    `;
}