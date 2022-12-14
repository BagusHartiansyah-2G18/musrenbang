function _onload(data){
    myCode=data.code;
    _.dt=data.data;
    _.dinas=data.dinas;
    _.tahun=data.tahun;

    _.u1=data.u1;
    _.u2=data.u2;
    _.u3=data.u3;
    _.u4=data.u4;
 
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
                        (${_.u1.u} usulan)
                    </span>
                </a>
                <hr>`
    });

    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(2)" class="nav-link text-primary p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        MUSRENBANG KECAMATAN <br>
                        (${_.u2.u} usulan)
                    </span>
                </a>
                <hr>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(3)" class="nav-link text-info p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        FORUM OPD <br>
                        (${_.u3.u} usulan)
                    </span>
                </a>
                <hr>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="#" onclick="_login(4)" class="nav-link text-success p-1 text-center">
                    <span class="mdi mdi-collage d-block mdi-18px"></span>
                    <span>
                        MUSRENBANG KABUPATEN<br>
                        (${_.u4.u} usulan)
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
                cls:"-2 p-0 position-sticky d-inline-block shadow",
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
    $('#sfooter').html(chart_.js(assert+"Library/mfc/","Bagus H"));
    chart({
        id:'bar',
        type:'bar',
        fz:14,
        fc:'#71748d',
        label:["PRA", "KEC", "FORUM", "KAB"],
        data :[
                {
                    label: 'usulan',
                    data:[_.u1.u,_.u2.u,_.u3.u,_.u4.u],
                    backgroundColor: "cyan",
                    borderColor: "#212121",
                    borderWidth: 2
                },{
                    label: 'diterima',
                    data:[_.u1.tr,_.u2.tr,_.u3.tr,_.u4.tr],
                    backgroundColor: "green",
                    borderColor: "#212121",
                    borderWidth: 2
                }, {
                    label: 'ditolak',
                    data:[_.u1.tl,_.u2.tl,_.u3.tl,_.u4.tl],
                    backgroundColor: "red",
                    borderColor: "#ff6d00",
                    borderWidth: 2
                }
            ]
    });

    chart({
        id:'line',
        type:'line',
        fz:14,
        fc:'#71748d',
        label:["PRA", "KEC", "FORUM", "KAB"],
        data :[
                {
                    label: 'usulan',
                    data:[_.u1.u,_.u2.u,_.u3.u,_.u4.u],
                    backgroundColor: "rgba(0, 231, 255, 0.3)",
                    borderColor: "#212121",
                    borderWidth: 2
                },{
                    label: 'diterima',
                    data:[_.u1.tr,_.u2.tr,_.u3.tr,_.u4.tr],
                    backgroundColor: "rgba(44, 255, 0, 0.3)",
                    borderColor: "#212121",
                    borderWidth: 2
                }, {
                    label: 'ditolak',
                    data:[_.u1.tl,_.u2.tl,_.u3.tl,_.u4.tl],
                    backgroundColor: "rgba(255, 0, 0, 0.3)",
                    borderColor: "#ff6d00",
                    borderWidth: 2
                }
            ]
    });
}
function _chartTahapan() {
    return _formNoHeader({
        shadow:true,
        // style:'background-color:rgba(100,100,100,05)',
        kolom:[
            {
                size:"6 p-3 text-center",
                form:chart_.ex1({id:'bar',w:'150px',h:'100px'})
            },{
                form:chart_.ex1({id:'line',w:'150px',h:'100px'})
            }
        ]
    })
}
function _tabelKecamatan() {
    return _formNoHeader({
        shadow:true,
        cls:'mt-2',
        // style:'background-color:rgba(100,100,100,05)',
        kolom:[
            {
                size:"12 p-3 text-center",
                form:`<div id='tabelShow' class="card">` // k kemaren
                        +setTabel()
                    +`</div>`
            }
        ]
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
    let fhtml=`
        <thead>
            <tr style="text-align:center">
                <th width="3%">No</th>
                <th width="27%">Kecamatan</th>
                <th width="15%">Usulan PRA Kec</th>
                <th width="15%">Usulan Kecamatan</th>
                <th width="15%">Usulan Forum OPD</th>
                <th width="15%">Usulan Kabupaten</th>
            </tr>
        </thead>
        <tbody>
    `;
    let u1=0,tr1=0,tl1=0,
        u2=0,tr2=0,tl2=0,
        u3=0,tr3=0,tl3=0,
        u4=0,tr4=0,tl4=0;
    _.dt.forEach((v,i) => {
        u1+=Number(v.tr1.u);
        tr1+=Number(v.tr1.tr);
        tl1+=Number(v.tr1.tl);

        u2+=Number(v.tr2.u);
        tr2+=Number(v.tr2.tr);
        tl2+=Number(v.tr2.tl);

        u3+=Number(v.tr3.u);
        tr3+=Number(v.tr3.tr);
        tl3+=Number(v.tr3.tl);

        u4+=Number(v.tr4.u);
        tr4+=Number(v.tr4.tr);
        tl4+=Number(v.tr4.tl);
        fhtml+=`
            <tr style="text-align:left">
                <td widtd="5%">${i+1}</td>
                <td widtd="15%">${v.valueName}</td>
                <td>
                    ${button_.ex1(
                        {
                          clsGroup:"",
                          listBtn :[
                            {
                              text:`<span class="mdi mdi-cloud-download-outline"></span>  `+v.tr1.u,
                              cls:" btn-sm btn-info",
                              attr:`onclick="goLaporan(${i},${1},${2})"`
                            },{
                              text:`<span class="mdi mdi-check-all"></span>  `+v.tr1.tr,
                              cls:" btn-sm btn-success",
                              attr:`onclick="goLaporan(${i},${1},${1})"`
                            },{
                              text:`<span class="mdi mdi-close-box"></span>  `+v.tr1.tl,
                              cls:" btn-sm btn-danger",
                              attr:`onclick="goLaporan(${i},${1},${0})"`
                            }
                          ],
                        }
                      )
                    }
                </td>

                <td>
                    ${button_.ex1(
                        {
                        clsGroup:"",
                        listBtn :[
                            {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+v.tr2.u,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${i},${2},${2})"`
                            },{
                            text:`<span class="mdi mdi-check-all"></span>  `+v.tr2.tr,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${i},${2},${1})"`
                            },{
                            text:`<span class="mdi mdi-close-box"></span>  `+v.tr2.tl,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${i},${2},${0})"`
                            }
                        ],
                        }
                    )}
                </td>
                <td>
                    ${button_.ex1(
                        {
                        clsGroup:"",
                        listBtn :[
                            {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+v.tr3.u,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${i},${3},${2})"`
                            },{
                            text:`<span class="mdi mdi-check-all"></span>  `+v.tr3.tr,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${i},${3},${1})"`
                            },{
                            text:`<span class="mdi mdi-close-box"></span>  `+v.tr3.tl,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${i},${3},${0})"`
                            }
                        ],
                        }
                    )}
                </td>

                <td>
                    ${button_.ex1(
                        {
                        clsGroup:"",
                        listBtn :[
                            {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+v.tr4.u,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${i},${4},${2})"`
                            },{
                            text:`<span class="mdi mdi-check-all"></span>  `+v.tr4.tr,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${i},${4},${1})"`
                            },{
                            text:`<span class="mdi mdi-close-box"></span>  `+v.tr4.tl,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${i},${4},${0})"`
                            }
                        ],
                        }
                    )}
                </td>
            </tr>
        `;
    });
    fhtml+=`
        <tr style="text-align:left">
            <td widtd="5%">9</td>
            <td widtd="15%"><b>Keseluruhan</b></td>
            <td>
                ${button_.ex1(
                    {
                        clsGroup:"",
                        listBtn :[
                        {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+u1,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${9},${1},${2})"`
                        },{
                            text:`<span class="mdi mdi-check-all"></span>  `+tr1,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${9},${1},${1})"`
                        },{
                            text:`<span class="mdi mdi-close-box"></span>  `+tl1,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${9},${1},${0})"`
                        }
                        ],
                    }
                    )
                }
            </td>

            <td>
                ${button_.ex1(
                    {
                    clsGroup:"",
                    listBtn :[
                        {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+u2,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${9},${2},${2})"`
                        },{
                            text:`<span class="mdi mdi-check-all"></span>  `+tr2,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${9},${2},${1})"`
                        },{
                            text:`<span class="mdi mdi-close-box"></span>  `+tl2,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${9},${2},${0})"`
                        }
                    ],
                    }
                )}
            </td>
            <td>
                ${button_.ex1(
                    {
                    clsGroup:"",
                    listBtn :[
                        {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+u3,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${9},${3},${2})"`
                        },{
                            text:`<span class="mdi mdi-check-all"></span>  `+tr3,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${9},${3},${1})"`
                        },{
                            text:`<span class="mdi mdi-close-box"></span>  `+tl3,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${9},${3},${0})"`
                        }
                    ],
                    }
                )}
            </td>

            <td>
                ${button_.ex1(
                    {
                    clsGroup:"",
                    listBtn :[
                        {
                            text:`<span class="mdi mdi-cloud-download-outline"></span>  `+u4,
                            cls:" btn-sm btn-info",
                            attr:`onclick="goLaporan(${9},${4},${2})"`
                        },{
                            text:`<span class="mdi mdi-check-all"></span>  `+tr4,
                            cls:" btn-sm btn-success",
                            attr:`onclick="goLaporan(${9},${4},${1})"`
                        },{
                            text:`<span class="mdi mdi-close-box"></span>  `+tl4,
                            cls:" btn-sm btn-danger",
                            attr:`onclick="goLaporan(${9},${4},${0})"`
                        }
                    ],
                    }
                )}
            </td>
        </tr>
    `;
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
function goLaporan(ind,tahapan,terima) {
    param={
        kdKec       :(ind==9?'0':_.dt[ind].value),
        nmKec       :(ind==9?'All Kecamatan':_.dt[ind].valueName),
        tahapan     :tahapan,
        terima      :terima,
    }
    _redirectOpen("laporan/listUsulan/"+btoa(JSON.stringify(param)));
}