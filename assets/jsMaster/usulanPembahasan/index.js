function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.priotitas=data.priotitas;
    _.indPrio=0;

    _.kec=data.kec;
    _.kec[0].selected=1;

    _.desax=data.desa;
    _.desa=[];

    _.tahun=data.tahun;
    _.tahapan=data.tahapan;
    _.key=data.key;

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
    _searchTabel();
}
function _formData() {
    return `<div class="container mb-2">`
                +_formIcon({
                    icon:'<i class="mdi mdi-table"></i>'
                    ,text:"<h7>Daftar Usulan</h7>",
                    classJudul:'col-8',
                    id:"form1",
                    btn:(!Number(_.key.e)?
                            button_.ex2({
                                text:`<span class="mdi mdi-database-export "></span> export`,
                                cls:" btn-sm bg-info ",
                                attr:` onclick='_fexp()' title="pengiriman data"`
                            })
                            :''
                        ),
                    sizeCol:'12 shadow',
                    bgHeader:"bg-primary text-light ",
                    attrHeader:`"`,
                    bgForm:"",
                    isi:
                        _inpComboBox({
                            judul:"Prioritas",
                            id:"kdPrio",
                            color:"black",  
                            data:_.priotitas,
                            index:"Bagus  H",
                            bg:"bg-warning m-2",
                            method:"sejajar",
                            change:"_changePrio(this)",
                        })
                        +
                        _inpComboBox({
                            judul:"Kecamatan",
                            id:"kdKec",
                            color:"black",  
                            data:_.kec,
                            bg:"bg-warning m-2",
                            method:"sejajar",
                            // index:"Bagus  H",
                            change:"_changeKec(this)",
                        })
                        +_lines({})
                        +`<div id='tabelShow' style="margin: auto;">`
                        +`</div>`,
                })
            +`</div>`;
}
function _searchTabel() {
    let kondisi=false,
        kdKec=$('#kdKec').val(),
        fhasil=[],
        splitDinas=[];
    _.priotitas[_.indPrio].data.forEach((fv,fi) => {
        kondisi=true;
        if(kdKec!='0' && kdKec!=fv.kdKec){
            kondisi=false;
        }
        if(kondisi){
            splitDinas=fv.nmDinas.toUpperCase().split("DINAS ");
            if(splitDinas.length==2){
                fv.nmDinas=splitDinas[1];
            }else{
                splitDinas=fv.nmDinas.toUpperCase().split("BADAN ");
                if(splitDinas.length==2){
                    fv.nmDinas=splitDinas[1];
                }
            }
            fv.ind=fi;
            fhasil.push(fv);
        }
    });
    return setTabel(fhasil);
}
function setTabel(data){ 
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
            ,func:"_fchangeStatus()"
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
    _pageLength=data.length;
    _judulExpJS=_.tahapan+"-"+_.tahun;
    $('#tabelShow').html(
        _tabelResponsive({
            id:"dt", 
            class:'table-border',
            isi:_tabel(
                {
                    data:data,
                    no:1,
                    id:"Bagus H"
                    ,kolom:[
                        "nmDinas","desa","uraianPekerjaan","volume&satuan","paguAnggaran$","status"
                    ]
                    ,namaKolom:[
                        "Dinas / Badan ","Desa","Usulan","Vol Satuan","Pagu","Status"
                    ],
                    action:infoSupport1
                })
        })
    )
    return _startTabel("dt",true);
}
function _changePrio(v) {
    _.indPrio=Number(v.value);
    if(_.priotitas[_.indPrio].data==undefined){
        // jika undifine maka get data
        return getDataSubPrioritas();
    }
    return _searchTabel();
}
function getDataSubPrioritas() {
    param={
        kdPri       :_.priotitas[_.indPrio].value,
    }
    _post('proses/getDataPrioritas',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _respon(dt) {
    if (dt.data!=undefined && dt.data.length>0) {
        _.priotitas[_.indPrio].data=dt.data;
    }else{
        _.priotitas[_.indPrio].data=[];
    }
    _searchTabel();
}
function _changeKec(v) {
    _searchTabel();
}

// action
function _fexp() {
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Konfirmasi".toUpperCase()}</h1>`,
        body:"mengexport / mengirimkan data menuju tahapan selanjutnya akan beraksi seperti ini :<br>"+
            modal_.ol({
                cls:'',
                clsLi:'',
                data:[
                    "mengunci aksi pada tahapan ini",
                    "data pada tahapan ini akan diajukan menuju tahapan berikutnya",
                    "sistem akan menghapus data pada tahapan berikutnya jika terdapat data"],
            })+`
                lakukan export data ???
            `,
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"export",
                attr:"style='float:right; padding:5px;;' onclick='_fexped()'",
                class:"btn btn-info"
            })
    });    
    $('#modalEx1').modal("show");
}
function _fexped(){
    param={
        kdKec :"",
    }
    _post('proses/expTahapan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _fupd(ind){
    let data=_.priotitas[_.indPrio].data; 
    _.desa=_filterData(_.desax,$('#kdKec').val());
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Perbarui Data".toUpperCase()}</h1>`,
        body:_fusulan("bg-warning"),
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"perbarui",
                attr:"style='float:right; padding:5px;;' onclick='_fupded("+ind+")'",
                class:"btn btn-warning"
            })
    });
    
    $('#masalah').val(data[ind].masalah)
    $('#uraianPekerjaan').val(data[ind].uraianPekerjaan)
    $('#desa').val(data[ind].desa)
    $('#lokasi').val(data[ind].lokasi)
    $('#volume').val(data[ind].volume)
    $('#satuan').val(data[ind].satuan)
    $('#paguAnggaran').val(data[ind].paguAnggaran)
    $('#modalEx1').modal("show");
}
function _fupded(ind){
    let data=_.priotitas[_.indPrio].data; 
    param={
        masalah     :$('#masalah').val(),
        uraianPekerjaan    :$('#uraianPekerjaan').val(),
        desa        :$('#desa').val(),
        lokasi      :$('#lokasi').val(),
        volume      :$('#volume').val(),
        satuan      :$('#satuan').val(),
        paguAnggaran:$('#paguAnggaran').val(),
        id          :data[ind].id,
        val:btoa(JSON.stringify({
            kdKec:data[ind].kdKec,
            kdSub:data[ind].kdSub,
            kdDinas:data[ind].kdDinas,
            kdPri:data[ind].prioritas,
            tahun:_.tahun
        }))
    }
     
    if(_isNull(param.masalah))return _toast({bg:'e',msg:'entri permasalah !!!'});
    if(_isNull(param.uraianPekerjaan))return _toast({bg:'e',msg:'entri uraian pekerjaan !!!'});
    if(_isNull(param.lokasi))return _toast({bg:'e',msg:'entri lokasi !!!'});
    if(_isNull(param.volume))return _toast({bg:'e',msg:'entri volume !!!'});
    if(_isNull(param.satuan))return _toast({bg:'e',msg:'entri satuan !!!'});
    
    _post('proses/updUsulanJoin',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1');
            _responSub(res.data,ind);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _responSub(dt,ind) {
    _.priotitas[_.indPrio].data[ind]=dt.data[0];
    let data=_.priotitas[_.indPrio].data[ind]; 
    $('#col'+ind+"_2").html(data.desa);
    $('#col'+ind+"_3").html(data.uraianPekerjaan);
    $('#col'+ind+"_4").html(data.volume+" "+data.satuan);
    $('#col'+ind+"_5").html(_$(data.paguAnggaran));
    $('#col'+ind+"_6").html(data.status);
}
// function _fdel(ind){
//     modal_.setMo({
//         ex:1,
//         header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Konfirmasi".toUpperCase()}</h1>`,
//         body:"apakah anda ingin menghapus data ini ?",
//         footer:modal_.btnClose("btn-secondary")
//             +_btn({
//                 judul:"Hapus",
//                 attr:"style='float:right; padding:5px;;' onclick='_fdeled("+ind+")'",
//                 class:"btn btn-danger"
//             })
//     });    
//     $('#modalEx1').modal("show");
// }
// function _fdeled(ind){
//     param={
//         val:_.val,
//         id:_.data[ind].id
//     }
    
//     _post('proses/delUsulan',param).then(res=>{
//         res=JSON.parse(res);
//         if(res.exec){
//             _modalHide('modalEx1'); 
//             _respon(res.data);
//         }else{
//             return _toast({bg:'e', msg:res.msg});
//         }
//     });
// }
function _finfo(ind) {
    modal_.setMo({
        ex:2,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Informasi Usulan".toUpperCase()}</h1>`,
        body:_fInfoUsulan(_.priotitas[_.indPrio].data[ind]),
        footer:modal_.btnClose("btn-secondary")
    });
    $('#modalEx2').modal("show");
}
function _goRespon(ind) {
    let param={
        id      :_.priotitas[_.indPrio].data[ind].id,
        kdKec   :_.priotitas[_.indPrio].data[ind].kdKec,
        nmKec   :_.priotitas[_.indPrio].data[ind].nmKec,
        tahun   :_.priotitas[_.indPrio].data[ind].tahun,
        nmPri   :_.priotitas[_.indPrio].valueName
    }
    _redirectOpen("control/respon/"+btoa(JSON.stringify(param)));
}
function _fchangeStatus(ind) {
    let data=_.priotitas[_.indPrio].data[ind]; 
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Status Usulan".toUpperCase()}</h1>`,
        body:_formchangeStatus("bg-info"),
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"simpan",
                attr:"style='float:right; padding:5px;;' onclick='_fchangeStatused("+ind+")'",
                class:"btn btn-info"
            })
    });
    $('#status').val(data.status);
    $('#alasan').val(data.alasan);
    $('#modalEx1').modal("show");
}
function _fchangeStatused(ind) {
    let data=_.priotitas[_.indPrio].data; 
    param={
        status     :$('#status').val(),
        alasan    :$('#alasan').val(),
        id          :data[ind].id,
        val:btoa(JSON.stringify({
            kdKec:data[ind].kdKec,
            kdSub:data[ind].kdSub,
            kdDinas:data[ind].kdDinas,
            kdPri:data[ind].prioritas,
            tahun:_.tahun
        }))
    }
     
    if(_isNull(param.alasan))return _toast({bg:'e',msg:'tambahkan keterangannya !!!'});
    
    _post('proses/updStatusUsulan',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1');
            _responSub(res.data,ind);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}