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
            cls:'mt-4',attr:";",type:"text",icon:'<i class="mdi mdi-home '+fcolor+'"></i>',
            bg:'bg-info text-light'
        })
        +_inpGroupPrepend({
            id:"password",placeholder:"Password",
            cls:'mt-4',attr:";",type:"password",icon:'<i class="mdi mdi-key '+fcolor+'"></i>',
            bg:'bg-info text-light'
        })
}