function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.dt=[];
    _.dinas=data.dinas;
    viewWebsite=_chartTahapan()
                +_tabelKecamatan();
    $('#bodyTM').html(viewWebsite);
    $('#footer').html(data.tmFooter+data.footer);

    _startTabel("dt");
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
            color:"primary shadow",
            judul:"Donwload OPD",
            attr:"style='padding:5px;font-size:15px;' onclick='addData()'",
            // class:"btn btn-success btn-block"
        }),
        bgHeader:'bg-info',
        isi:`<div id='tabelShow' class="card">` // k kemaren
                +setTabel()
            +`</div>`,
        id:"form1",
        sizeCol:'12',
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
    _modalEx1({
        judul:"Form Login",
        icon:`<i class="mdi mdi-note-plus"></i>`,
        cform:`text-light`,
        bg:"bg-light",
        minWidth:"500px; ;",
        isi:_flogin(),
        footer:_btn({
                    color:"primary shadow",
                    judul:"Close",
                    attr:`style='float:right; padding:5px;;' onclick="_modalHide('modal')"`,
                    class:"btn btn-secondary"
                })
                +_btn({
                    color:"primary shadow",
                    judul:"Login",
                    attr:"style='float:right; padding:5px;;' onclick='_logined("+key+")'",
                    class:"btn btn-primary"
                })
    });
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