function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.dt=[];
    _.priotitas=data.priotitas;
    _.dinas=data.dinas;
    
    viewWebsite=_formData();
    $('#bodyTM').html(viewWebsite);
    $('#footer').html(data.tmFooter+data.footer);

    // _startTabel("dt");
}
function _formData() {
    return `<div class="row shadow">`
                +_formIcon({
                    icon:'<i class="mdi mdi-ladder" style="font-size: 20px;"></i>'
                    ,text:"<h7>Daftar Usulan</h7>",
                    classJudul:'col-8',
                    id:"form1",
                    btn:_btnGroup([
                        { 
                            clsBtn:`btn-secondary shadow btn-block fzMfc`
                            ,func:"_dlistExcell()"
                            ,icon:`<i class="mdi mdi-file-lock"></i>Sub Kegiatan`
                            ,title:"Donwload List Sub Kegiatan"
                        },
                        { 
                            clsBtn:`btn-primary shadow m-0 btn-block fzMfc`
                            ,func:"onOffForm(this)"
                            ,icon:`<i class="mdi mdi-file-lock"></i>Entri Usulan`
                            ,title:"Entri Usulan"
                        }
                    ],0),
                    sizeCol:undefined,
                    bgHeader:"bg-info text-light",
                    attrHeader:`style="height: max-content;"`,
                    bgForm:"#fff; font-size:15px;",
                    isi:_lines({})
                        +_inpComboBox({
                            judul:"Kecamatan",
                            id:"kdprio",
                            color:"black",  
                            data:_.dinas,
                            bg:"bg-info m-2",
                            method:"sejajar",
                            change:"_changePrio(this)",
                        })
                        +_inpComboBox({
                            judul:"Prioritas",
                            id:"kdprio",
                            color:"black",  
                            data:_.priotitas,
                            bg:"bg-info m-2",
                            method:"sejajar",
                            change:"_changePrio(this)",
                        })
                        +_lines({})
                        +`<div id='tabelShow' style="margin: auto;">`
                           +setTabel()
                        +`</div>`,
                })
            +`</div>`;
}
function setTabel(){
    infoSupport1=[];
    infoSupport1.push({ 
        clsBtn:`btn-outline-danger fzMfc`
        ,func:"delData()"
        ,icon:`<i class="mdi mdi-delete-forever"></i>`
        ,title:"Hapus"
    });
    return _tabelResponsive(
        {
            id:"dt"
            ,isi:_tabel(
                {
                    data:[]
                    ,no:1
                    ,kolom:[
                        "nama","keterangan","checkbox"
                    ]
                    ,namaKolom:[
                        "Tahun","Keterangan","Selected"
                    ],
                    action:infoSupport1,
                    func:"_setSelecter()"
                })
        });;
}
function _changePrio(v) {
    
}
function _dlistExcell(ind) {
    _redirectOpen("laporan/listSubKegiatan");
}