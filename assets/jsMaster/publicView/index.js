function _onload(data){
    myCode=data.code;
    _.dt=[];
    _.dinas=data.dinas;
    _.tahun=data.tahun;

    const main=document.querySelector("main");

    header_.hmenu=[];
    header_.hmenu.push({
        htmlLi:`<a href="#" class="nav-link text-dark text-center">
            <span class="mdi mdi-rhombus-split d-block mdi-18px"></span>
                <b>TAHAPAN</b>
            </a>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" class="nav-link text-primary text-center">
            <span class="mdi mdi-chart-waterfall  d-block mdi-18px"></span>
                <b>GRAFIK</b>
            </a>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" class="nav-link text-success text-center">
            <span class="mdi mdi-collage  d-block mdi-18px"></span>
                <b>DATA</b>
            </a>`
    });
    viewWebsite=header_.ex3({
        clsContainer:"container-fluid p-0 m-0 bgCAbs8",
        clsHeader:"nav-pills d-flex p-3 bwOpa6 shadow" ,
        // tukar:"Bagus H",
        htmlJudul:`
          <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="`+assert+`fs_css/logo/2.png" width="300">
          </a>
        `,
        clsKeterangan:"d-flex align-items-center my-3 text-white  p-3",
        htmlKeterangan:style_.rowCol({
            clsRow:" container-fluid",
            col:[
                {
                    cls:"-9",
                    html:''
                },{
                    cls:"-3 text-end",
                    html:button_.ex1({
                          clsGroup:"float-right",
                          listBtn :[
                            {
                              text:`<span class="mdi mdi-web text-light mdi-spin"></span>`,
                              cls:" btn-sm btn-dark",
                              attr:""
                            },{
                              text:"E-MUSRENBANG",
                              cls:" btn-sm btn-info ",
                              attr:""
                            },{
                                text:"Th. "+_.tahun,
                                cls:" btn-sm btn-success ",
                                attr:""
                              }
                          ],
                        })
                }
            ]
        }),
        htmlMenu:header_.nav3({
                  clsUl:"",
                  clsLi:""
                })
    });


    header_.hmenu=[];
    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(1)" class="nav-link text-warning p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        PRA MUSRENBANG <br>
                        (100 usulan)
                    </span>
                </a>
                <hr>`
    });

    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(2)" class="nav-link text-primary p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        MUSRENBANG KECAMATAN <br>
                        (100 usulan)
                    </span>
                </a>
                <hr>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(3)" class="nav-link text-info p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        FORUM OPD <br>
                        (100 usulan)
                    </span>
                </a>
                <hr>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(4)" class="nav-link text-success p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        MUSRENBANG KABUPATEN<br>
                        (100 usulan)
                    </span>
                </a>
                <hr>`
    });

    let menu=header_.nav3({
        clsUl:" d-flex flex-column p-2",
        clsLi:""
    })

    viewWebsite+=style_.rowCol({
        clsRow:" container-fluid",
        col:[{
                cls:"-2 p-0 position-sticky h-100 d-inline-block shadow",
                html:menu
            },{
                cls:"-10",
                html:_chartTahapan()
                    +_tabelKecamatan()
            }
        ]
    })

    main.innerHTML=viewWebsite;
    const footer=document.querySelector("footer");
    footer.innerHTML=`
        <div class="container-fluid bg-info text-light p-1 text-center">
            <p>BAPPEDA©2022,Kabupaten Sumbawa Barat</p>
        </div>
    `+modal_.ex1({
        cls:"modal-dialog-centered modal-dialog-scrollable",
        clsHeader:"",
        clsBody:"",
    });
    $('#footer').html(data.footer+startmfc.endBootstrapHTML(2));
}
function _chartTahapan() {
    return _formNoHeader({
        shadow:true,
        // style:'background-color:rgba(100,100,100,05)',
        kolom:[
            {
                size:"6 p-2",
                form:`<canvas id="chartjs_bar" 
                        style="display: block; width: 458px; height: 229px;" 
                        width="458" height="229" 
                        class="chartjs-render-monitor">
                    </canvas>`
            },{
                form:`<canvas id="chartjs_line" 
                        style="display: block; width: 458px; height: 229px;" 
                        width="458" height="229" 
                        class="chartjs-render-monitor">
                    </canvas>`
            }
        ]
    })
}
function _tabelKecamatan() {
    return _formIcon({
        icon:'<i class="mdi mdi-file-check"></i>',
        text:"Data Musrenbang",
        classJudul:'',
        btn:_btn({
            color:"success",
            judul:"Donwload OPD",
            attr:"style='padding:5px;font-size:15px;' onclick='addData()'",
            // class:"btn btn-success btn-block"
        }),
        bgHeader:'bg-primary text-light mt-3',
        isi:`<div id='tabelShow' class="card">` // k kemaren
                +setTabel()
            +`</div>`,
        id:"form1",
        sizeCol:'12 shadow',
    })
}
function setTabel(){
    infoSupport1=[];
    infoSupport1.push({ 
        clsBtn:`btn-outline-danger fzMfc`
        ,func:"delData()"
        ,icon:`<i class="mdi mdi-delete-forever"></i>`
        ,title:"Hapus"
    });
    fhtml=`
        <thead>
            <tr style="text-align:center">
                <th rowspan="2" width="10%">No</th>
                <th rowspan="2" width="25%">Kecamatan</th>
                <th colspan="2" width="15%">Musrenbang Pra Kec</th>
                <th colspan="2" width="15%">Musrenbang Kec</th>
                <th colspan="2" width="15%">Forum OPD</th>
                <th colspan="2" width="15%">Musrenbang Final</th>
                <th rowspan="2" width="10%">Action</th>
            </tr>
            <tr style="text-align:center">
                <th width="10%">Diterima</th>
                <th width="10%">Ditolak</th>
                <th width="10%">Diterima</th>
                <th width="10%">Ditolak</th>
                <th width="10%">Diterima</th>
                <th width="10%">Ditolak</th>
                <th width="10%">Diterima</th>
                <th width="10%">Ditolak</th>
            </tr>
        </thead>
        <tbody>
    `;
    _.dt.forEach(element => {
        
    });
    fhtml+=`</tbody>`;
    return _tabelResponsive(
        {
            id:"dt"
            ,isi:fhtml
        });;
}
function _login(key) {
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Form Login".toUpperCase()}</h1>`,
        body:_flogin(),
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                color:"primary shadow",
                judul:"Login",
                attr:"style='float:right; padding:5px;;' onclick='_logined("+key+")'",
                class:"btn btn-primary"
            })
    })
    $('#modalEx1').modal("show");
}
function _logined(key) {
    param={
        username    :$('#username').val(),
        password    :$('#password').val(),
        tahapan     :key,
        kdDinas     :_tamp1
    }
    if(_isNull(param.kdDinas))return _toast({bg:'e',msg:'Tentukan dinas anda !!!'});
    if(_isNull(param.username))return _toast({bg:'e',msg:'Tambahkan username !!!'});
    if(_isNull(param.password))return _toast({bg:'e',msg:'Tambahkan password !!!'});

    _post('proses/checkUser',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modal');
            _redirect("control/dashboard/"+btoa(JSON.stringify(param)));
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}