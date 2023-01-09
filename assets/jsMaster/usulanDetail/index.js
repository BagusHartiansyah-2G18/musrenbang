function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.dt=[];
    _.priotitas=data.priotitas;
    _.dinas=data.dinas;
    _.tahun=data.tahun;
    _.key=data.key;
    _.sub=data.sub;
    _.tahapan=data.tahapan;
    _.data=data.data;
    _.desa=data.desa;
    _.kdJabatan=data.kdJabatan;
    _.val=data.val;

    _.indDinas=0;
    _.indPrio=0;
    
    const main=document.querySelector("main");
    viewWebsite=_themaDashboard({menu:2});

    viewWebsite+=_formData();

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
    })
    +modal_.ex1({
        ind:2,
        cls:"modal-dialog-centered modal-dialog-scrollable mwidth650",
        clsHeader:"",
        clsBody:"",
    });
    $('#footer').html(data.footer+startmfc.endBootstrapHTML(2));
    setTabel();
    _startTabel("dt");
}
function _formData() {
    return `<div class="container shadow p-0 mb-3">`
                +_formIcon({
                    icon:'<i class="mdi mdi-table" style="font-size: 20px;"></i>'
                    ,text:"<h7>Sub Kegiatan</h7>",
                    classJudul:'col-8',
                    id:"form1",
                    btn:(_.kdJabatan!=2 && !Number(_.key.c)?
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
                                    html:'Kecamatan'
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
                                            text:_.dinas.valueName,
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
                                    html:'Prioritas'
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                        clsGroup:"",
                                        listBtn :[
                                        {
                                            text:`<span class="mdi mdi-chart-bar-stacked text-light"></span>`,
                                            cls:" btn-sm btn-dark",
                                            attr:""
                                        },{
                                            text:_.priotitas.valueName,
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
                                    html:'Sub kegiatan'
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
                                            text:_.sub.nmSub,
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
    if(!Number(_.key.u)){
        infoSupport1.push({ 
            clsBtn:`btn-outline-warning`
            ,func:"_fupd()"
            ,icon:`<i class="mdi mdi-grease-pencil"></i>`
            ,title:"edit"
        });
    }else{
        infoSupport1.push({ 
            clsBtn:`btn-outline-secondary`
            ,func:"_finfo()"
            ,icon:`<i class="mdi mdi-information-outline"></i>`
            ,title:"Informasi"
        });
    }
    if(!Number(_.key.d)){
        infoSupport1.push({ 
            clsBtn:`btn-outline-danger`
            ,func:"_fdel()"
            ,icon:`<i class="mdi mdi-delete"></i>`
            ,title:"delete"
        });
    }
    if(!Number(_.key.k)){
        infoSupport1.push({ 
            clsBtn:`btn-outline-info`
            ,func:"_fdel()"
            ,icon:`<i class="mdi mdi-lightbulb-question-outline"></i> Status`
            ,title:"change status"
        });
    }
    if(!Number(_.key.p)){
        infoSupport1.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_goRespon()"
            ,icon:`<i class="mdi mdi-text-box-search"></i> Respon`
            ,title:"Komentari usulan"
        });
    }
     
     
    return $('#tabelShow').html(
        _tabelResponsive({
            id:"dt", 
            class:'table-border',
            isi:_tabel(
                {
                    data:_.data
                    ,no:1
                    ,kolom:[
                        "desa","uraianPekerjaan","volume&satuan","paguAnggaran$","status"
                    ]
                    ,namaKolom:[
                        "Desa","Usulan","Vol Satuan","Pagu","Status"
                    ],
                    action:infoSupport1
                })
        })
    )
}
function _fadd(){
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Form Login".toUpperCase()}</h1>`,
        body:_fusulan("bg-info"),
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                color:"primary shadow",
                judul:"simpan",
                attr:"style='float:right; padding:5px;;' onclick='_fadded()'",
                class:"btn btn-primary"
            })
    });
    
    if(_.kdJabatan==1){ // jika dev maka dapat entri 
        $('#dpagu').css({display:"none"});
    }
    
    $('#modalEx1').modal("show");
}
function _fadded(){
    param={
        masalah     :$('#masalah').val(),
        uraianPekerjaan    :$('#uraianPekerjaan').val(),
        desa        :$('#desa').val(),
        lokasi      :$('#lokasi').val(),
        volume      :$('#volume').val(),
        satuan      :$('#satuan').val(),
        paguAnggaran      :Number($('#paguAnggaran').val()),
        val:_.val
    }
     
    if(_isNull(param.masalah))return _toast({bg:'e',msg:'entri permasalah !!!'});
    if(_isNull(param.uraianPekerjaan))return _toast({bg:'e',msg:'entri uraian pekerjaan !!!'});
    if(_isNull(param.lokasi))return _toast({bg:'e',msg:'entri lokasi !!!'});
    if(_isNull(param.volume))return _toast({bg:'e',msg:'entri volume !!!'});
    if(_isNull(param.satuan))return _toast({bg:'e',msg:'entri satuan !!!'});
    
    _post('proses/insUsulan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1'); 
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _respon(dt) {
    _.data=dt.data;
    setTabel();
    _startTabel("dt");
}
function _fupd(ind){
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Perbarui Data".toUpperCase()}</h1>`,
        body:_fusulan("bg-info"),
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"perbarui",
                attr:"style='float:right; padding:5px;;' onclick='_fupded("+ind+")'",
                class:"btn btn-warning"
            })
    });
    
    if(_.kdJabatan==1){ // jika dev maka dapat entri 
        $('#dpagu').css({display:"none"});
    }
    $('#masalah').val(_.data[ind].masalah)
    $('#uraianPekerjaan').val(_.data[ind].uraianPekerjaan)
    $('#desa').val(_.data[ind].desa)
    $('#lokasi').val(_.data[ind].lokasi)
    $('#volume').val(_.data[ind].volume)
    $('#satuan').val(_.data[ind].satuan)
    $('#paguAnggaran').val(_.data[ind].paguAnggaran)
    $('#modalEx1').modal("show");
}
function _fupded(ind){
    param={
        masalah     :$('#masalah').val(),
        uraianPekerjaan    :$('#uraianPekerjaan').val(),
        desa        :$('#desa').val(),
        lokasi      :$('#lokasi').val(),
        volume      :$('#volume').val(),
        satuan      :$('#satuan').val(),
        paguAnggaran      :Number($('#paguAnggaran').val()),
        val:_.val,  
        id:_.data[ind].id
    }
     
    if(_isNull(param.masalah))return _toast({bg:'e',msg:'entri permasalah !!!'});
    if(_isNull(param.uraianPekerjaan))return _toast({bg:'e',msg:'entri uraian pekerjaan !!!'});
    if(_isNull(param.lokasi))return _toast({bg:'e',msg:'entri lokasi !!!'});
    if(_isNull(param.volume))return _toast({bg:'e',msg:'entri volume !!!'});
    if(_isNull(param.satuan))return _toast({bg:'e',msg:'entri satuan !!!'});
    
    _post('proses/updUsulan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1'); 
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _fdel(ind){
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Konfirmasi".toUpperCase()}</h1>`,
        body:"apakah anda ingin menghapus data ini ?",
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"Hapus",
                attr:"style='float:right; padding:5px;;' onclick='_fdeled("+ind+")'",
                class:"btn btn-danger"
            })
    });    
    $('#modalEx1').modal("show");
}
function _fdeled(ind){
    param={
        val:_.val,
        id:_.data[ind].id
    }
    
    _post('proses/delUsulan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1'); 
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _finfo(ind) {
    modal_.setMo({
        ex:2,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Informasi Usulan".toUpperCase()}</h1>`,
        body:_fInfoUsulan(_.data[ind]),
        footer:modal_.btnClose("btn-secondary")
    });
    $('#modalEx2').modal("show");
}
function _goRespon(ind) {
    let param={
        id      :_.data[ind].id,
        kdKec   :_.data[ind].kdKec,
        nmKec   :_.dinas.valueName,
        tahun   :_.data[ind].tahun,
        nmPri   :_.priotitas.valueName
    }
    _redirectOpen("control/respon/"+btoa(JSON.stringify(param)));
}
