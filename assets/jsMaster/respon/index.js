function _onload(data){
    _addHead(teditor_.lib(assert+"Library/mfc/library/",false));
    
    myCode=data.code;
    _.dt=[];
    _.data=data.data;
    _.ket=data.ket;
    _.nmKec=data.nmKec;
    _.kdDinas=data.kdDinas;
    _.nmPri=data.nmPri;
    _.modelON=false;
    _.key=data.key;
    _.tahun=data.tahun;
    _.tahapan=data.tahapan;

    const main=document.querySelector("main");
    viewWebsite=_themaDashboardNoMenu({
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
                                            text:_.tahapan,
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
                        })
    });
    viewWebsite+=_formData();
    main.innerHTML=viewWebsite;
    const footer=document.querySelector("footer");
    footer.innerHTML=`
        <div class="container-fluid bg-info text-light p-1 text-center">
            <p>BAPPEDA©2022,Kabupaten Sumbawa Barat</p>
        </div>
    `+modal_.ex1({
        cls:"modal-dialog-centered modal-dialog-scrollable mwidth750",
        clsHeader:"",
        clsBody:"",
    })
    +modal_.ex1({
        ind:2,
        cls:"modal-dialog-centered modal-dialog-scrollable mwidth650",
        clsHeader:"",
        clsBody:"",
    });
    $('#footer').html(teditor_.lib(assert+"Library/mfc/library/",true)+data.footer+startmfc.endBootstrapHTML(2));
    setTabel();
    _startTabel("dt");
}
function _formData() {
    return `<div class="container shadow p-0 mb-3">`
                +_formIcon({
                    icon:'<i class="mdi mdi-table" style="font-size: 20px;"></i>'
                    ,text:"<h7>Respon Usulan</h7>",
                    classJudul:'col-8',
                    id:"form1",
                    btn:(!Number(_.key.c)?
                            button_.ex2({
                                text:`<span class="mdi mdi-form-select "></span> Form Entri`,
                                cls:" btn-sm bg-info ",
                                attr:` onclick='_fadd()'`
                            })
                            :''
                        ),
                    sizeCol:undefined,
                    bgHeader:"bg-primary text-light shadow",
                    attrHeader:``,
                    bgForm:"",
                    isi:style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Prioritas'
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                        clsGroup:"",
                                        listBtn :[
                                        {
                                            text:`<span class="mdi mdi-greenhouse text-light"></span>`,
                                            cls:" btn-sm btn-dark",
                                            attr:""
                                        },{
                                            text:_.nmPri,
                                            cls:" btn-sm btn-warning ",
                                            attr:""
                                        }
                                        ],
                                    })
                                }
                            ]
                        })
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Desa & Kecamatan'
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                        clsGroup:"",
                                        listBtn :[
                                        {
                                            text:`<span class="mdi mdi-office-building text-light"></span>`,
                                            cls:" btn-sm btn-dark",
                                            attr:""
                                        },{
                                            text:_.ket.desa+" , "+_.nmKec,
                                            cls:" btn-sm btn-warning ",
                                            attr:""
                                        }
                                        ],
                                    })
                                }
                            ]
                        })
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Permasalahan'
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                        clsGroup:"",
                                        listBtn :[
                                        {
                                            text:`<span class="mdi mdi-close-network text-light"></span>`,
                                            cls:" btn-sm btn-dark",
                                            attr:""
                                        },{
                                            text:_.ket.masalah,
                                            cls:" btn-sm btn-warning ",
                                            attr:""
                                        }
                                        ],
                                    })
                                }
                            ]
                        }) 
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Uraian Pekerjaan'
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                        clsGroup:"",
                                        listBtn :[
                                        {
                                            text:`<span class="mdi mdi-check-network-outline text-light"></span>`,
                                            cls:" btn-sm btn-dark",
                                            attr:""
                                        },{
                                            text:_.ket.uraianPekerjaan,
                                            cls:" btn-sm btn-warning ",
                                            attr:""
                                        }
                                        ],
                                    })
                                }
                            ]
                        }) 
                        
                        
                        +_lines({})
                        +`<div id='tabelShow' style="margin: auto;">`
                        +`</div>`,
                })
            +`</div>`;
}
function setTabel(){
    infoSupport1=[];
    infoSupport1.push({ 
        clsBtn:`btn-outline-secondary`
        ,func:"_finfo()"
        ,icon:`<i class="mdi mdi-information-outline"></i>`
        ,title:"Informasi"
    });
    infoSupport1.push({ 
        clsBtn:`btn-outline-primary`
        ,func:"_goDokumen()"
        ,icon:`<i class="mdi mdi-file-chart-check-outline"></i>`
        ,title:"dokumen"
    });
    infoSupport1.push({ 
        clsBtn:`btn-outline-danger`
        ,func:"_fdel()"
        ,icon:`<i class="mdi mdi-delete"></i>`
        ,title:"delete"
    });
    
    return $('#tabelShow').html(
        _tabelResponsive({
            id:"dt", 
            class:'table-border',
            isi:_tabel(
                {
                    data:_.data
                    ,no:1
                    ,kolom:[
                        "nmDinas","uraian<tm5>"
                    ]
                    ,namaKolom:[
                        "Pengirim","Uraian"
                    ],
                    action:infoSupport1
                })
        })
    )
}
function _fadd() {
    if(!_.modelON){
        modal_.setMo({
            ex:1,
            header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Form Respon".toUpperCase()}</h1>`,
            body:_frespon("bg-info"),
            footer:modal_.btnClose("btn-secondary")
                +_btn({
                    color:"primary shadow",
                    judul:"simpan",
                    attr:"style='float:right; padding:5px;;' onclick='_fadded()'",
                    class:"btn btn-primary"
                })
        });
        _.modelON=true;
        $('#modalEx1').modal("show");
        _startEditorTiny(router)
        // return tinymce.get('isi').setContent('');
    }
    tinymce.get('isi').setContent('')
    return $('#modalEx1').modal("show");
}
function _fadded(){
    param={
        uraian:tinymce.get('isi').getContent(),
        id    :_.ket.id,
        kdKec    :_.ket.kdKec,
        tahun    :_.ket.tahun,
    }
    if(_isNull(param.uraian))return _toast({bg:'e',msg:'entri uraian !!!'});
    // if(_file.data.length==0)return _toast({bg:'e',msg:'Tambahkan Produk File !!!'});
    _postFile('proses/insResponUsulan',param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1');
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _respon(data) {
    if(data!=null){
        _.data=data.data;
    }
    setTabel();
    _startTabel("dt");
}
function _finfo(ind) {
    modal_.setMo({
        ex:2,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Informasi Usulan".toUpperCase()}</h1>`,
        body:style_.rowCol({
            clsRow:"",
            col:[
                {
                    cls:"-12",
                    html:card_.ex2({
                          clsCard: " mb-1",
                          clsHeader:" bg-info",
                          htmlHeader:"uraian",
                          clsBody:"",
                          htmlBody:_.data[ind].uraian,
                        })
                }
            ]
          }),
        footer:modal_.btnClose("btn-secondary")
    });
    $('#modalEx2').modal("show");
}
function _fdel(ind){
    if(_.data[ind].kdDinas!=_.kdDinas){
        return _toast({bg:'e',msg:'maaf, bukan tambahan anda !!!'})
    }
    modal_.setMo({
        ex:2,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Konfirmasi".toUpperCase()}</h1>`,
        body:"apakah anda ingin menghapus data ini ?",
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"Hapus",
                attr:"style='float:right; padding:5px;;' onclick='_fdeled("+ind+")'",
                class:"btn btn-danger"
            })
    });    
    $('#modalEx2').modal("show");
}
function _fdeled(ind){
    param={
        id    :_.ket.id,
        kdKec    :_.ket.kdKec,
        tahun    :_.ket.tahun,
        kdRespon :_.data[ind].kdRespon
    }
    
    _post('proses/delResponUsulan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx2'); 
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _goDokumen(ind) {
    if(_.data[ind].file.length==0){
        return _toast({bg:'e',msg:'Maaf, respon ini tidak memiliki dokumen !!!'})
    }
    _redirectOpen('laporan/previewFile/'+btoa(JSON.stringify({files:_.data[ind].file})));
}