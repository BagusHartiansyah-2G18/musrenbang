function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.dt=[];
    _.priotitas=data.priotitas;
    _.dinas=data.dinas;
    _.tahun=data.tahun;
    _.tahapan=data.tahapan;

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
                    btn:'',
                    sizeCol:undefined,
                    bgHeader:"bg-primary text-light",
                    attrHeader:`"`,
                    bgForm:"",
                    isi:_inpComboBox({
                            judul:"Kecamatan",
                            id:"kdKec",
                            color:"black",  
                            data:_.dinas,
                            bg:"bg-warning m-2",
                            method:"sejajar",
                            change:"_changeKec(this)",
                        })
                        +_inpComboBox({
                            judul:"Prioritas",
                            id:"kdPrio",
                            color:"black",  
                            data:_.priotitas,
                            index:"Bagus  H",
                            bg:"bg-warning m-2",
                            method:"sejajar",
                            change:"_changePrio(this)",
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
        clsBtn:`btn-outline-primary`
        ,func:"_gousulanDetail()"
        ,icon:`<i class="mdi mdi-arrow-right-bold-box"></i> view`
        ,title:"view"
    });
    return $('#tabelShow').html(
        _tabelResponsive({
            id:"dt", 
            class:'table-border',
            isi:_tabel(
                {
                    data:_.dinas[_.indDinas].data[_.indPrio]
                    ,no:1
                    ,kolom:[
                        "nmDinas","nmSub","tusulan"
                    ]
                    ,namaKolom:[
                        "Dinas","Sub kegiatan","Total"
                    ],
                    action:infoSupport1
                })
        })
    )
}
function _changeKec(v) {
    _.indDinas=Number(v.value);
    if(_.dinas[_.indDinas].data[_.indPrio]==undefined){
        // proses pengecekan data dengan indek prio terpilih
        _.indPrio=0;

        if(_.dinas[_.indDinas].data[_.indPrio]==undefined){
            // setelah index 0 tetap undifine maka get data
            return getDataSubPrioritas();
        }
    }
    $('#kdPrio').val(_.indPrio); // baik tetap ataupun berubah
    setTabel();
}
function getDataSubPrioritas() {
    param={
        kdKec       :_.dinas[_.indDinas].value,
        kdPri       :_.priotitas[_.indPrio].value,
        tahun       :_.tahun
    }
    _post('proses/changePrioritas',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modal');
            _respon(res.data);
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}
function _respon(dt) {
    if (dt.data!=undefined && dt.data.length>0) {
        _.dinas[_.indDinas].data[_.indPrio]=dt.data;
    }else{
        _.dinas[_.indDinas].data[_.indPrio]=[];
    }
    setTabel();
}
function _changePrio(v) {
    _.indPrio=Number(v.value);
    if(_.dinas[_.indDinas].data[_.indPrio]==undefined){
        // jika undifine maka get data
        return getDataSubPrioritas();
    }
    return setTabel();
}
function _gousulanDetail(ind) {
    param={
        kdKec :_.dinas[_.indDinas].value,
        // nmKec :_.dinas[_.indDinas].valueName,

        kdPri :_.priotitas[_.indPrio].value,
        // nmPri :_.priotitas[_.indPrio].valueName,

        tahun :_.tahun,

        kdSub :_.dinas[_.indDinas].data[_.indPrio][ind]['kdSub'],
        // nmSub :_.dinas[_.indDinas].data[_.indPrio][ind]['nmSub'],
        kdDinas :_.dinas[_.indDinas].data[_.indPrio][ind]['kdDinas'],
    }
    _redirectOpen("control/usulanDetail/"+btoa(JSON.stringify(param)));
}