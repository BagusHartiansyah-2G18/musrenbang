function _onload(data){
    $('#body').html(data.tmBody);
    myCode=data.code;
    _.dt=[];
    _.tahun=data.tahun;
    viewWebsite=_daftarTahun();
    $('#bodyTM').html(viewWebsite);
    $('#footer').html(data.tmFooter+data.footer);

    // _startTabel("dt");
}
function _daftarTahun() {
    return `
    <div class="" style="margin: auto;padding: 30px; min-height:600px; background: rgba(255, 255, 255, 0.30);">`
        +`<div class="menu" style="color:black;padding:5px;">`
            +_galeryx3({
                style:'background-color:rgba(135, 166, 160, 0.4);',
                row:7,
                url:router+"control/usulan/",
                data:_.tahun,
                img:`<span class="mdi mdi-database" style="font-size: 40px;color: blue;"></span>`
            })
        +`</div>
    </div>`;
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