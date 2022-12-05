function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    
    _.tahun=data.tahun;
    _.tahapan=data.tahapan;
    _.dinas=data.dinas;

    const main=document.querySelector("main");
    viewWebsite=_themaDashboard({menu:3});

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
  
    
}
function _formData() {
    return `<div class="container shadow p-0 mb-3">`
                +_formIcon({
                    icon:'<i class="mdi mdi-table" style="font-size: 20px;"></i>'
                    ,text:"<h7>Akun</h7>",
                    classJudul:'col-8',
                    id:"form1",
                    btn:'',
                    sizeCol:undefined,
                    bgHeader:"bg-primary text-light shadow",
                    attrHeader:``,
                    bgForm:"",
                    isi:style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Dinas / Kecamatan'
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
                                    html:'Nama pengguna'
                                },{
                                    cls:"-6 ",
                                    html:input_.ex4({
                                            clsDiv:"input-group",
                                            clsInput:"bg-dark",
                                            text:`<span class="mdi mdi-account-box text-light"></span>`,
                                            id:"nmMember",
                                            tipe:"text",
                                            cls:"form-control",
                                            attr:`placeholder="***" value='${_nama}'`,
                                        }) 
                                }
                            ]
                        }) 
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Password Lama'
                                },{
                                    cls:"-6 ",
                                    html:input_.ex4({
                                        clsDiv:"input-group",
                                        clsInput:"bg-dark",
                                        text:`<span class="mdi mdi-account-key text-light"></span>`,
                                        id:"password",
                                        tipe:"password",
                                        cls:"form-control",
                                        attr:`placeholder="***"`,
                                    })
                                }
                            ]
                        }) 
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:'Password Baru'
                                },{
                                    cls:"-6 ",
                                    html:input_.ex4({
                                            clsDiv:"input-group",
                                            clsInput:"bg-dark",
                                            text:`<span class="mdi mdi-account-key text-light"></span>`,
                                            id:"passwordNew",
                                            tipe:"password",
                                            cls:"form-control",
                                            attr:`placeholder="***"`,
                                        })  
                                }
                            ]
                        }) 
                        // +_lines({})
                        +style_.rowCol({
                            clsRow:" container p-2",
                            col:[
                                {
                                    cls:"-6",
                                    html:''
                                },{
                                    cls:"-6 ",
                                    html:button_.ex1({
                                            clsGroup:"",
                                            listBtn :[
                                            {
                                                text:`<span class="mdi mdi-file-chart-check text-light"></span>`,
                                                cls:" btn btn-success",
                                                attr:""
                                            },{
                                                text:"Perbarui Data",
                                                cls:" btn btn-dark ",
                                                attr:` onclick="_fupdMember()"`
                                            }
                                            ],
                                        })
                                }
                            ]
                        }) 
                })
            +`</div>`;
}
function _fupdMember() {
    modal_.setMo({
        ex:1,
        header:`<h1 class="modal-title fs-5" id="staticBackdropLiveLabel">${"Konfirmasi".toUpperCase()}</h1>`,
        body:"simpan perubahan data ?",
        footer:modal_.btnClose("btn-secondary")
            +_btn({
                judul:"Perbarui",
                attr:"style='float:right; padding:5px;;' onclick='_fupdMembered()'",
                class:"btn btn-warning"
            })
    });    
    $('#modalEx1').modal("show");
}
function _fupdMembered(ind){
    param={
        nmMember:$('#nmMember').val(),
        password:$('#password').val(),
        passwordNew:$('#passwordNew').val()
    }
    
    if(((param.nmMember).toUpperCase()==_nama.toUpperCase()) && param.passwordNew.length==0){
        return _toast({bg:'e',msg:'Nama pengguna tidak mengalami perubahan !!!'});
    }
    _post('proses/updMember',param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _modalHide('modalEx1');
            return _redirect("control/logout");
        }else{
            return _toast({bg:'e', msg:res.msg});
        }
    });
}