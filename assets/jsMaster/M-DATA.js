function _themaDashboard(v){
    const active="text-primary", noactive="text-dark";

    dropdonw_.dmenu=[];
    dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="${router+"control/setting"}">pengaturan</a>`});
    dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="${router+"control/logout"}">logout</a>`});

    header_.hmenu=[];
    header_.hmenu.push({
        htmlLi:`<a href="${router+"control/dashboard/null"}" class="nav-link ${(v.menu==1?active:noactive)} text-center">
            <span class="mdi mdi-collage  d-block mdi-18px"></span>
                <b>Th. ${_.tahun}</b>
            </a>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="${router+"control/usulan/"+_.tahun}" class="nav-link ${(v.menu==2?active:noactive)} text-center">
            <span class="mdi mdi-collage  d-block mdi-18px"></span>
                <b>usulan</b>
            </a>`
    });
    header_.hmenu.push({
        htmlLi:`<a href="${router+"control/setting"}" class="nav-link ${(v.menu==3?active:noactive)} text-center">
            <span class="mdi mdi-cog d-block mdi-18px"></span>
                <b>pengaturan</b>
            </a>`
    });
    if(_kdJabatan==3){
      header_.hmenu.push({
        htmlLi:`<a href="${_urlMaster+"control/prioritas"}" class="nav-link ${(v.menu==3?active:noactive)} text-center" target="_blank">
            <span class="mdi mdi-shield-key-outline d-block mdi-18px"></span>
                <b>master</b>
            </a>`
      });
    }

   

    return header_.ex3({
        clsContainer:"container-fluid p-0 m-0 bgCAbs8",
        clsHeader:"nav-pills d-flex p-3 bwOpa8 shadow" ,
        // tukar:"Bagus H",
        htmlJudul:`
          <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="`+assert+`fs_css/logo/2.png" width="300">
          </a>
        `,
        clsKeterangan:"d-flex flex-column  align-items-center my-3 text-white  p-3",
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
        }),
        htmlMenu:header_.nav3({
                    clsUl:" d-flex col-7 justify-content-center",
                    clsLi:""
                })
                +`
                    <div class="col-md-3 align-self-center">
                      ${
                        dropdonw_.ex1({
                            clsDropdonw:"",
                            clsUl:" text-small",
                            clsLi:"",
                            htmlJudul:`
                              <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle judulFunc" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="${assert+"fs_css/boy.png"}" alt="mdo" width="32" height="32" class="rounded-circle">${_nama}
                              </a>`,
                        })
                      }
                    </div>
                `
    });
}
function _themaDashboardNoMenu(v){
  dropdonw_.dmenu=[];
    dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="#">pengaturan</a>`});
    dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="${router+"control/logout"}">logout</a>`});

    header_.hmenu=[];
    header_.hmenu.push({
        htmlLi:dropdonw_.ex1({
            clsDropdonw:"",
            clsUl:" text-small",
            clsLi:"",
            htmlJudul:`
              <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle judulFunc" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="${assert+"fs_css/boy.png"}" alt="mdo" width="32" height="32" class="rounded-circle">${_nama}
              </a>`,
        })
    });

   

    return header_.ex3({
        clsContainer:"container-fluid p-0 m-0 bgCAbs8",
        clsHeader:"nav-pills d-flex p-3 bwOpa8 shadow" ,
        // tukar:"Bagus H",
        htmlJudul:`
          <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="`+assert+`fs_css/logo/2.png" width="300">
          </a>
        `,
        clsKeterangan:"d-flex flex-column  align-items-center my-3 text-white  p-3",
        htmlKeterangan:v.htmlKeterangan,
        htmlMenu:`<div class="col-7 text-end">
                </div>
                `+header_.nav3({
                    clsUl:" d-flex align-items-center",
                    clsLi:""
                })
  });
}
function _flogin(){
    fsize="130px;";
    fcolor='text-dark';
    fbg="bg-secondary text-dark";
    return _inpDropdonwSelected({
            judul:"Dinas",
            id:"dinasc",
            idJudul:"dinas",
            idData:"msData",
            data:_.dinas,
            bgSearch:"#4e8fae"
        })
        +_inpGroupPrepend({
            id:"username",placeholder:"Username",
            cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-home '+fcolor+'"></i>',
            bg:'bg-info text-light'
        })
        +_inpGroupPrepend({
            id:"password",placeholder:"Password",
            cls:'',attr:";",type:"password",icon:'<i class="mdi mdi-key '+fcolor+'"></i>',
            bg:'bg-info text-light'
        })
}
function _fusulan($bg){
  fsize="130px;";
  fcolor='text-dark';
  fbg="bg-secondary text-dark";
  return _inpGroupPrepend({
          id:"masalah",placeholder:"Permasalahan",
          cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-progress-close '+fcolor+'"></i>',
          bg:$bg+' text-light'
      })
      +_inpGroupPrepend({
        id:"uraianPekerjaan",placeholder:"Uraian",
        cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-form-select '+fcolor+'"></i>',
        bg:$bg+' text-light'
      })
      +_inpGroupPrepend({
        placeholder:"Desa",
        icon:'<i class="mdi mdi-city '+fcolor+'"></i>',
        bg:fbg,
        attrSpan:`style="width: 100px;"`,
        isi:_inpComboBox({
            id:"desa",
            data:_.desa,
            change:"",
            bg:" border",
            getCombo:true
        })
      })
      
      +_inpGroupPrepend({
        id:"lokasi",placeholder:"Lokasi",
        cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-crosshairs-gps '+fcolor+'"></i>',
        bg:$bg+' text-light'
      })
      +style_.rowCol({
        clsRow:"",
        col:[
            {
                cls:"-6",
                html:_inpGroupPrepend({
                        id:"volume",placeholder:"Volume",
                        cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-scale '+fcolor+'"></i>',
                        bg:$bg+' text-light'
                    })
            },{
                cls:"-6 ",
                html:_inpGroupPrepend({
                      id:"satuan",placeholder:"Satuan",
                      cls:'',attr:";",type:"text",icon:'<i class="mdi mdi-seal '+fcolor+'"></i>',
                      bg:$bg+' text-light'
                    })
            }
        ]
      })  
      +`
        <div id='dpagu'>
        ${
          _inpGroupPrepend({
            id:"paguAnggaran",placeholder:"Pagu",
            cls:'',attr:" value='0'",type:"text",
            icon:'<i class="mdi mdi-currency-usd '+fcolor+'"></i>',
            bg:$bg+' text-light'
          })
        }
        </div>
      `
}
function _fInfoUsulan(v){
  return style_.rowCol({
          clsRow:"",
          col:[
              {
                  cls:"-12",
                  html:card_.ex2({
                        clsCard: " mb-1",
                        clsHeader:" bg-info",
                        htmlHeader:"Permasalahan",
                        clsBody:"",
                        htmlBody:v.masalah,
                      })
              }
          ]
        })
        +style_.rowCol({
          clsRow:"",
          col:[
              {
                  cls:"-12",
                  html:card_.ex2({
                        clsCard: "mb-1",
                        clsHeader:"bg-info",
                        htmlHeader:"Uraian Pekerjaan",
                        clsBody:"",
                        htmlBody:v.uraianPekerjaan,
                      })
              }
          ]
        })
        +style_.rowCol({
          clsRow:"",
          col:[
              {
                  cls:"-12",
                  html:card_.ex2({
                        clsCard: "mb-1",
                        clsHeader:"bg-info",
                        htmlHeader:"Desa & Lokasi",
                        clsBody:"",
                        htmlBody:v.desa+", "+v.lokasi,
                      })
              }
          ]
        })
        +style_.rowCol({
          clsRow:"",
          col:[
              {
                  cls:"-12",
                  html:card_.ex2({
                        clsCard: "mb-1",
                        clsHeader:"bg-info",
                        htmlHeader:"volume & Satuan",
                        clsBody:"",
                        htmlBody:v.volume+" ("+v.satuan+")",
                      })
              }
          ]
        })
        +style_.rowCol({
          clsRow:"",
          col:[
              {
                  cls:"-12",
                  html:card_.ex2({
                        clsCard: "mb-1",
                        clsHeader:"bg-info",
                        htmlHeader:"Pagu Anggaran",
                        clsBody:"",
                        htmlBody:"Rp. "+_$(v.paguAnggaran),
                      })
              }
          ]
        })
}
function _formchangeStatus(bg){
  fcolor='text-dark'
  return _inpGroupPrepend({
        placeholder:"",
        icon:'<i class="mdi mdi-lightbulb-question-outline '+fcolor+'"></i>',
        bg:bg,
        attrSpan:``,
        isi:_inpComboBox({
            id:"status",
            data:_getdataStaus(),
            change:"",
            bg:" border",
            getCombo:true
        })
      })
      +_inpGroupPrepend({
        placeholder:"",
        icon:'<i class="mdi mdi-form-select '+fcolor+'"></i>',
        bg:bg,
        attrSpan:`style="height: 100%;"`,
        isi:_textArea({
            hint:"Keterangan",
            id:"alasan",
            row:"3",
            text:'',
            attr:''
        })
      }) 
}
function _frespon(){
  fsize="130px;";
  fcolor='text-dark';
  fbg="bg-secondary text-dark";
  return input_.ex2({
          clsDiv:"mb-3",
          text:"File PDF",
          id:"text",
          tipe:"file",
          cls:"form-control",
          attr:` onchange='readFile(this)'`
        })
        +teditor_.ex1({
          cls:'',
          id:'isi',
          value:'',
          clsArea:''
        })
}
function _getdataStaus() {
  return [
    {
      value:'DIUSULKAN',
      valueName:'DIUSULKAN',
    },{
      value:'DITOLAK',
      valueName:'DITOLAK',
    },{
      value:'DITERIMA',
      valueName:'DITERIMA',
    },
  ]
}
function _filterData(data,kdKec) {
  let fresp=[];
  data.forEach((fv,fi) => {
    if(fv.kdKec==kdKec){
      fresp.push(fv);
    }
  });
  return fresp;
}
