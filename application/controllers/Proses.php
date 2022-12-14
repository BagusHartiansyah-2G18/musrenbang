<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// sess enc mbgs lbgs qexec
class Proses extends CI_Controller {
    private $bgs;
    function __construct(){
        parent::__construct();
        $this->mbgs->_setBaseUrl(base_url());
        $this->_=array();
        $this->dapp=$this->mbgs->_getBasisData();
        $this->kd=$this->sess->kdMember;
        $this->nm=$this->sess->nama;
        $this->kdJabatan=$this->sess->kdJabatan;
        $this->kdDinas=$this->sess->kdDinas;
        $this->tahun=$this->sess->tahun;
        $this->tahapan=$this->sess->tahapan;
        
        $this->qtbl=_getNKA("c-prod",true);
        // $this->qtbl['p-kant']['nm']
    }
	public function checkUser(){
        $kondisi=false;
        if($this->sess->kode==null){
            $data=$_POST['data'];
            if(empty($_POST['data'])){
                return redirect("control");
            }
            
            $baseEND=json_decode((base64_decode($data)));

            $kdDinas   =$baseEND->{'kdDinas'};
            $password   =$baseEND->{'password'};
            $username   =$baseEND->{'username'};
            $kondisi=true;
        }else{
            $password   =$this->sess->password;
            $username   =$this->sess->nama;
            $kdDinas   =$this->sess->kdMemberDinas;
        }

        $q="select * from member where kdDinas='".$kdDinas."' and UPPER(nmMember)=UPPER('".$username."') and 
            UPPER(password)=UPPER('".$password."') and kdApp='".$this->mbgs->_getBasisData()['kd']."'
        ";
        // return print_r($this->_);
        $member=$this->qexec->_func($q);
        if(count($member)==1){
            return $this->mbgs->resTrue("Sukses");
        }else{
            if($kondisi){//for login awal no sess
                return $this->mbgs->resFalse("user tidak dapat ditemukan !!!");
            }
        }
        print_r(json_encode($this->_));
    }


    // usulan
    public function changePrioritas(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdKec   =$baseEND->{'kdKec'};
            $kdPri   =$baseEND->{'kdPri'};
            $tahun   =$baseEND->{'tahun'};
            $this->_['data']=$this->qexec->_func(_dtsubMusrenbang($kdKec,$this->tahapan," b.idPri='".$kdPri."' and b.taSub='".$tahun."' "));
            return $this->mbgs->resTrue($this->_);
        }
    }
    public function insUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $masalah  =$baseEND->{'masalah'};
            $uraianPekerjaan    =$baseEND->{'uraianPekerjaan'};
            $desa  =$baseEND->{'desa'};
            $lokasi    =$baseEND->{'lokasi'};

            $volume  =$baseEND->{'volume'};
            $satuan    =$baseEND->{'satuan'};
            $paguAnggaran  =$baseEND->{'paguAnggaran'};
            $val    =json_decode((base64_decode($baseEND->{'val'})));

            
            $keyTabel="id";
            $kdTabel=$this->qexec->_func("select ".$keyTabel." from musrembang where kdKec='".$val->kdKec."'
                and tahun='".$val->tahun."' and tahapan='".$this->tahapan."'
                ORDER BY cast(".$keyTabel." as int) DESC limit 1
            ");
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $q="
                INSERT INTO `musrembang`(
                    `id`, `kdKec`, `kdDinas`, `kdSub`, 
                    `prioritas`, `masalah`, `uraianPekerjaan`, 
                    `desa`, `lokasi`, `volume`, 
                    `satuan`, `paguAnggaran`,
                    `tahapan`, `tahun`
                )values(
                    ".$this->mbgs->_valforQuery($kdTabel).",".$this->mbgs->_valforQuery($val->kdKec).",".$this->mbgs->_valforQuery($val->kdDinas).",
                        ".$this->mbgs->_valforQuery($val->kdSub).",
                    ".$this->mbgs->_valforQuery($val->kdPri).",".$this->mbgs->_valforQuery($masalah).",".$this->mbgs->_valforQuery($uraianPekerjaan).",
                    ".$this->mbgs->_valforQuery($desa).",".$this->mbgs->_valforQuery($lokasi).",".$this->mbgs->_valforQuery($volume).",
                    ".$this->mbgs->_valforQuery($satuan).",".$this->mbgs->_valforQuery($paguAnggaran).",
                    ".$this->mbgs->_valforQuery($this->tahapan).",".$this->mbgs->_valforQuery($val->tahun)."
                )
            ";
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']=$this->qexec->_func(
                    _dmusrenbang(" 
                        kdKec='".$val->kdKec."' and kdSub='".$val->kdSub."' and 
                        kdDinas='".$val->kdDinas."' and tahun='".$val->tahun."' and
                        prioritas='".$val->kdPri."' and tahapan='".$this->tahapan."'
                        GROUP BY id
                    ")
                );
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function updUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $masalah  =$baseEND->{'masalah'};
            $uraianPekerjaan    =$baseEND->{'uraianPekerjaan'};
            $desa  =$baseEND->{'desa'};
            $lokasi    =$baseEND->{'lokasi'};

            $volume  =$baseEND->{'volume'};
            $satuan    =$baseEND->{'satuan'};
            $paguAnggaran  =$baseEND->{'paguAnggaran'};
            $val    =json_decode((base64_decode($baseEND->{'val'})));
            $id     =$baseEND->{'id'};

            $q="
                update `musrembang` set
                    `masalah`=".$this->mbgs->_valforQuery($masalah).", `uraianPekerjaan`=".$this->mbgs->_valforQuery($uraianPekerjaan).", 
                    `desa`=".$this->mbgs->_valforQuery($desa).", `lokasi`=".$this->mbgs->_valforQuery($lokasi).", 
                    `volume`=".$this->mbgs->_valforQuery($volume).", `satuan`=".$this->mbgs->_valforQuery($satuan).", 
                    `paguAnggaran`=".$this->mbgs->_valforQuery($paguAnggaran)."
                    
                    where 
                    `id`=".$this->mbgs->_valforQuery($id)." and
                    `kdKec`=".$this->mbgs->_valforQuery($val->kdKec)." and
                    `kdDinas`=".$this->mbgs->_valforQuery($val->kdDinas)." and
                    `kdSub`=".$this->mbgs->_valforQuery($val->kdSub)." and
                    `prioritas`=".$this->mbgs->_valforQuery($val->kdPri)." and
                    `tahapan`=".$this->mbgs->_valforQuery($this->tahapan)." and
                    `tahun`=".$this->mbgs->_valforQuery($val->tahun)."
            ";
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']=$this->qexec->_func(
                    _dmusrenbang(" 
                        kdKec='".$val->kdKec."' and kdSub='".$val->kdSub."' and 
                        kdDinas='".$val->kdDinas."' and tahun='".$val->tahun."' and
                        prioritas='".$val->kdPri."' and tahapan='".$this->tahapan."'
                        GROUP BY id
                    ")
                );
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function updUsulanJoin(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $masalah  =$baseEND->{'masalah'};
            $uraianPekerjaan    =$baseEND->{'uraianPekerjaan'};
            $desa  =$baseEND->{'desa'};
            $lokasi    =$baseEND->{'lokasi'};

            $volume  =$baseEND->{'volume'};
            $satuan    =$baseEND->{'satuan'};
            $paguAnggaran  =$baseEND->{'paguAnggaran'};
            $val    =json_decode((base64_decode($baseEND->{'val'})));
            $id     =$baseEND->{'id'};

            $q="
                update `musrembang` set
                    `masalah`=".$this->mbgs->_valforQuery($masalah).", `uraianPekerjaan`=".$this->mbgs->_valforQuery($uraianPekerjaan).", 
                    `desa`=".$this->mbgs->_valforQuery($desa).", `lokasi`=".$this->mbgs->_valforQuery($lokasi).", 
                    `volume`=".$this->mbgs->_valforQuery($volume).", `satuan`=".$this->mbgs->_valforQuery($satuan).", 
                    `paguAnggaran`=".$this->mbgs->_valforQuery($paguAnggaran)."
                    
                    where 
                    `id`=".$this->mbgs->_valforQuery($id)." and
                    `kdKec`=".$this->mbgs->_valforQuery($val->kdKec)." and
                    `kdDinas`=".$this->mbgs->_valforQuery($val->kdDinas)." and
                    `kdSub`=".$this->mbgs->_valforQuery($val->kdSub)." and
                    `prioritas`=".$this->mbgs->_valforQuery($val->kdPri)." and
                    `tahapan`=".$this->mbgs->_valforQuery($this->tahapan)." and
                    `tahun`=".$this->mbgs->_valforQuery($val->tahun)."
            ";
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']=$this->qexec->_func(
                    _dmusrenbangJoin(" 
                        a.id=".$this->mbgs->_valforQuery($id)." and
                        a.kdKec='".$val->kdKec."' and a.kdSub='".$val->kdSub."' and 
                        a.kdDinas='".$val->kdDinas."' and a.tahun='".$val->tahun."' and
                        a.prioritas='".$val->kdPri."' and a.tahapan='".$this->tahapan."'
                        GROUP BY a.id,a.kdKec
                    ")
                );
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function updStatusUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $status  =$baseEND->{'status'};
            $alasan    =$baseEND->{'alasan'};
            $val    =json_decode((base64_decode($baseEND->{'val'})));
            $id     =$baseEND->{'id'};

            $q="
                update `musrembang` set
                    `status`=".$this->mbgs->_valforQuery($status).", 
                    `alasan`=".$this->mbgs->_valforQuery($alasan)."
                    where 
                    `id`=".$this->mbgs->_valforQuery($id)." and
                    `kdKec`=".$this->mbgs->_valforQuery($val->kdKec)." and
                    `kdDinas`=".$this->mbgs->_valforQuery($val->kdDinas)." and
                    `kdSub`=".$this->mbgs->_valforQuery($val->kdSub)." and
                    `prioritas`=".$this->mbgs->_valforQuery($val->kdPri)." and
                    `tahapan`=".$this->mbgs->_valforQuery($this->tahapan)." and
                    `tahun`=".$this->mbgs->_valforQuery($val->tahun)."
            ";
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']=$this->qexec->_func(
                    _dmusrenbangJoin(" 
                        a.id=".$this->mbgs->_valforQuery($id)." and
                        a.kdKec='".$val->kdKec."' and a.kdSub='".$val->kdSub."' and 
                        a.kdDinas='".$val->kdDinas."' and a.tahun='".$val->tahun."' and
                        a.prioritas='".$val->kdPri."' and a.tahapan='".$this->tahapan."'
                        GROUP BY a.id,a.kdKec
                    ")
                );
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function delUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $val    =json_decode((base64_decode($baseEND->{'val'})));
            $id     =$baseEND->{'id'};
            $q="
                delete from `musrembang` where 
                    `id`=".$this->mbgs->_valforQuery($id)." and
                    `kdKec`=".$this->mbgs->_valforQuery($val->kdKec)." and
                    `kdDinas`=".$this->mbgs->_valforQuery($val->kdDinas)." and
                    `kdSub`=".$this->mbgs->_valforQuery($val->kdSub)." and
                    `prioritas`=".$this->mbgs->_valforQuery($val->kdPri)." and
                    `tahapan`=".$this->mbgs->_valforQuery($this->tahapan)." and
                    `tahun`=".$this->mbgs->_valforQuery($val->tahun)."
            ";
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']=$this->qexec->_func(
                    _dmusrenbang(" 
                        kdKec='".$val->kdKec."' and kdSub='".$val->kdSub."' and 
                        kdDinas='".$val->kdDinas."' and tahun='".$val->tahun."' and
                        prioritas='".$val->kdPri."' and tahapan='".$this->tahapan."'
                        GROUP BY id
                    ")
                );
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function expTahapan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $kdkey=_getNKA("p-usu".$this->tahapan,false);

            $kdMemberx=$this->sess->kdMember1;
            if($this->kdJabatan>1){
                $kdMemberx=null;
            }
            $qeuryUpdKey=_qupdKeyGroup(
                1,
                strlen($kdkey),
                $kdkey,
                $kdMemberx,
                $this->sess->tahun,
                $this->dapp['kd']
            );

            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdKec    =$baseEND->{'kdKec'};

            $where=" and status='DITERIMA'";
            $qkdKec="";
            if($this->tahapan==1){ //DITERIMA DITOLAK DIUSULKAN
                if($this->kdJabatan==1){
                    $qkdKec=" and`kdKec`=".$this->mbgs->_valforQuery($kdKec)." ";
                    $where=" and status='DIUSULKAN'".$qkdKec; 
                }else{
                    $where='';
                }
            }
            $q="
                delete from `musrembang` where 
                    `tahapan`=".$this->mbgs->_valforQuery(($this->tahapan+1))." and
                    `tahun`=".$this->mbgs->_valforQuery($this->tahun)."
                    ".$qkdKec.";
                insert into musrembang (
                        id, kdKec, kdDinas, kdSub, prioritas, masalah, 
                        uraianPekerjaan, pengusul, desa, lokasi, volume, satuan, 
                        paguAnggaran,tahapan, status, 
                        alasan, date, tahun
                    )(
                    select 
                        id, kdKec, kdDinas, kdSub, prioritas, masalah, 
                        uraianPekerjaan, pengusul, desa, lokasi, volume, satuan, 
                        paguAnggaran,'".($this->tahapan+1)."','DIUSULKAN' as status, 
                        '', now(), tahun
                    from musrembang where
                    `tahapan`=".$this->mbgs->_valforQuery($this->tahapan)." and
                    `tahun`=".$this->mbgs->_valforQuery($this->tahun)."
                    ".$qkdKec."
                    ".$where."
                );
                ".$qeuryUpdKey."
            ";
            // return print_r($q);
            $check=$this->qexec->_multiProc($q);
            if($check){
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
    public function getDataPrioritas(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdPri   =$baseEND->{'kdPri'};
            $this->_['data']=$this->qexec->_func(_dmusrenbangJoin("
                a.tahun='".$this->tahun."' and
                a.prioritas='".$kdPri."' and a.tahapan='".$this->tahapan."'
                GROUP BY a.id,a.kdKec
            "));
            return $this->mbgs->resTrue($this->_);
        }
    }

    // fitur setting 
    public function updMember(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $nmMember       =$baseEND->{'nmMember'};
            $password       =$baseEND->{'password'};
            $passwordNew    =$baseEND->{'passwordNew'};
            if($password==$this->sess->password){
                if(strlen($passwordNew)==0){
                    $passwordNew=$password;
                }
                $q="
                    update member set 
                        nmMember=".$this->mbgs->_valforQuery($nmMember).",
                        password=".$this->mbgs->_valforQuery($passwordNew)."
                    where
                        kdMember=".$this->mbgs->_valforQuery($this->kd)." and
                        kdDinas=".$this->mbgs->_valforQuery($this->kdDinas)." and
                        kdApp=".$this->mbgs->_valforQuery($this->mbgs->_getBasisData()['kd'])."

                "; 
                $check=$this->qexec->_proc($q);
                if($check){
                    return $this->mbgs->resTrue($this->_);
                }else{
                    return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
                }
            }else{
                return $this->mbgs->resFalse(" Password yang anda tambahkan tidak sesuai !!!");
            }
            
        }
    }
    

    public function insResponUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $file=$_POST['file'];
            if(empty($file)){
                $file=[];
            }

            $baseEND=json_decode((base64_decode($_POST['data'])));
            $id         =$baseEND->{'id'};
            $kdKec      =$baseEND->{'kdKec'};
            $tahun      =$baseEND->{'tahun'};
            $uraian     =$baseEND->{'uraian'};

            $namaFile1='';
            foreach ($file as $key => $v) {
                // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                $namaFile1=$this->_uploadFiles($v['data'],"".$v['nama']);
            }
        
            $keyTabel="kdRespon";
            $kdTabel=$this->qexec->_func("select ".$keyTabel." from mus_respon where 
                id='".$id."'and 
                kdKec='".$kdKec."' and 
                tahun='".$tahun."'
                ORDER BY cast(".$keyTabel." as int) DESC limit 1
            ");
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }

            $check=$this->qexec->_proc("
                INSERT INTO mus_respon(kdRespon,id, kdKec, tahun, kdDinas, uraian, file) VALUES
                (
                    ".$this->mbgs->_valforQuery($kdTabel).",".$this->mbgs->_valforQuery($id).",
                    ".$this->mbgs->_valforQuery($kdKec).",".$this->mbgs->_valforQuery($tahun).",
                    ".$this->mbgs->_valforQuery($this->kdDinas).",".$this->mbgs->_valforQuery($uraian).",
                    ".$this->mbgs->_valforQuery($namaFile1)."
                )
            ");
            if($check){
                $this->_['data']     =$this->qexec->_func(_drespon(" a.id='".$id."' and a.kdKec='".$kdKec."' and a.tahun='".$tahun."' and a.qdel=0 "));
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }
    }
    public function delResponUsulan(){
        if($this->sess->kdMember==null){
            return $this->mbgs->resFalse("maaf, Pengguna tidak terdeteksi !!!");
        }else{
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $id         =$baseEND->{'id'};
            $kdKec      =$baseEND->{'kdKec'};
            $tahun      =$baseEND->{'tahun'};
            $kdRespon  =$baseEND->{'kdRespon'};
            
            $q="
                update mus_respon set qdel=1
                where id=".$this->mbgs->_valforQuery($id)." and 
                kdKec=".$this->mbgs->_valforQuery($kdKec)." and
                tahun=".$this->mbgs->_valforQuery($tahun)." and
                kdRespon=".$this->mbgs->_valforQuery($kdRespon)."
            ";
            // return print_r($q);
            $check=$this->qexec->_proc($q);
            if($check){
                $this->_['data']     =$this->qexec->_func(_drespon(" a.id='".$id."' and a.kdKec='".$kdKec."' and a.tahun='".$tahun."' and a.qdel=0 "));
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan dalam proses perubahan!!!");
            }
        }
    }
 
     
    // batas del
    function mengertiInfo(){
        $portal=$this->_keamanan($_POST['code'],$this->mbgs->_getNKA("p-usul"));
        if($portal['exec']){
            $check=$this->qexec->_proc($this->mbgs->_updDateInformasiDimengerti($this->kdMember,""));
            if($check){
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->mbgs->resFalse($portal['msg']);

    }

    function _settingKeyMember($member,$kodePage,$kunci){
        // $kodePage=;
        $q="";
        foreach ($member as $key => $v) {
            $q.=" update appkey set 
                    kunci=".$kunci."
                where kdMember=".$this->mbgs->_valforQuery($v['kdMember'])." and 
                    kdFitur!=".$this->mbgs->_valforQuery($kodePage)." and
                    kdFitur like '%".explode("/",$kodePage)[0]."%';";
        }
        return $q;
    }
    function exampleUpload(){
        // $file=$_POST['file'];
        // $img=$file['img'];
        // $file=$file['file'];

        // $baseEND=json_decode((base64_decode($_POST['data'])));
        // $keterangan =$baseEND->{'keterangan'};
        // $judul      =$baseEND->{'judul'};
        // $kdKate     =$baseEND->{'kdKate'};
        // $sumber     =$baseEND->{'sumberKate'};

        // $namaFile="";
        // foreach ($img as $key => $v) {
        //     $namaFile=$this->_uploadImage($v['src'],"fs_sistem/upload/image/".$v['nama']);
        // }

        // $namaFile1='';
        // foreach ($file as $key => $v) {
        //     // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
        //     $namaFile1=$this->_uploadFiles($v['data'],"".$v['nama']);
        // }
    }
    public function _uploadFiles($file,$nama){
        $pdf_decoded = base64_decode($file,true);
        $nama=explode(".",$nama);
        date_default_timezone_set("America/New_York");
        $namaFile=$nama[count($nama)-2]."-".date("Y-m-d-h-i-sa").".".$nama[count($nama)-1];
        $lokasiFile='./assets/fs_sistem/upload/files/'.$namaFile;
        file_put_contents($lokasiFile, $pdf_decoded);
        return substr($lokasiFile,2);
    }

    public function _setNotification($fitur,$info,$nmBtn,$tingkatJabatan){
        $keyTabel="kdNotif";
        $kdTabel=$this->qexec->_func("
            select ".$keyTabel." 
            from notif
            ORDER BY ".$keyTabel." DESC limit 1"
        );
        if(count($kdTabel)>0){
            $kdTabel=$kdTabel[0][$keyTabel]+1;
        }else{
            $kdTabel=1;
        }

        $qNotif=" INSERT INTO notif
                    (kdNotif,fitur, isiNotif, nmTombol, url)
                VALUES 
                    (
                        ".$this->mbgs->_valforQuery($kdTabel).",
                        ".$this->mbgs->_valforQuery($fitur).",
                        ".$this->mbgs->_valforQuery($info).",
                        ".$this->mbgs->_valforQuery($nmBtn).",
                        ".$this->mbgs->_valforQuery($this->mbgs->_getUrl($fitur))."
                    );";
        $qNotif.=" INSERT INTO notifuser(kdMember, kdNotif) (".$this->mbgs->_dmemberSetingkat($tingkatJabatan,$kdTabel).")"; // tingkat 3 bisa dicek di tabel jabatan kolom setingkat

        return $this->qexec->_multiProc($qNotif);
    }
    function refreshHakAkses(){
        $portal=$this->_keamanan($_POST['code'],_getNKA("d-memb",false));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdJabatan  =$baseEND->{'kdJabatan'};
            $kdMember   =$baseEND->{'kdMember'};
            $a=array();
            $a['kdMember']=$kdMember;
            $a['kdJabatan']=substr($kdJabatan,strlen($kdJabatan)-1);
            // return print_r($a);
            $check=$this->addKeySistemPaksa(base64_encode(json_encode($a)));
            if($check){
                return $this->mbgs->resTrue($this->_);
            }else{
                return $this->mbgs->resFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->mbgs->resFalse($portal['msg']);
    }
    public function _uploadImage($file,$nama){
        $split=explode("/",$nama); 
        $flokasi="fs_sistem/upload/image/";// default foldar jika ber ubah maka tambahakan dinamanya
        if(count($split)>1){
            $flokasi='';
            foreach ($split as $key => $v) {
                if($key==count($split)-1){
                    $nama=$v;
                }else{
                    $flokasi.=$v."/";
                }
            }
            // $flokasi.=$split[0]."/";
            // $nama=$split[count($split)-1];
        }
        $nama=explode(".",$nama);
        switch($nama[count($nama)-1]){
            case "png":$image=substr($file,22);break;
            case "PNG":$image=substr($file,22);break;
            case "pdf":$image=substr($file,22);break;
            default:$image=substr($file,23);break;
        }
        // $image=substr($file,23);
        // return print_r($nama[1]);
        date_default_timezone_set("America/New_York");
        $namaFile=$nama[count($nama)-2]."-".date("Y-m-d-h-i-sa").".".$nama[count($nama)-1];

        
        $delspace=explode(" ",$namaFile);
        $namaFile="";
        foreach ($delspace as $key => $value) {
            $namaFile.=$value;
        }
        $lokasiFile='./assets/'.$flokasi.$namaFile;
        write_file($lokasiFile,base64_decode($image));
        return $namaFile;
    }
    function _checkKeyApp($keyForm,$kdMember){
        $kodeForm=false;
        $kodeForm=$keyForm;
        // return print_r($this->mbgs->_qCekKey($kodeForm,$kdMember));
        $q=$this->mbgs->_qCekKey($kodeForm,$kdMember);
        $member=$this->qexec->_func($q);
        // return count($member);
        if(count($member)==1){
            return true;
        }
        return false;
    }
    function _keamanan($code,$codeForm){
        $res=$this->mbgs->_getAllFile("/fs_sistem/session");
        $data="";
        foreach ($res as $key => $value) {
            $exp=explode($this->mbgs->_getIpClient()."=",$value['nama']);
            if(count($exp)>1){
                $data=$this->mbgs->_readFileTxt($value['file']);
            }
        }
        if(strlen($data)==0){
            return $this->mbgs->resF("session");
        }
        $data=json_decode($data);
        $session=array(
            'kdMember'=>$data->{'kdMember'},
            'nmMember'=>$data->{'nmMember'},
            'kdJabatan'=>$data->{'kdJabatan'},
            'kdKantor'=>$data->{'kdKantor'},
            'nmKantor'=>$data->{'nmKantor'},
            'username'=>$data->{'username'},
            'password'=>$data->{'password'},
        );
        $this->sess->set_userdata($session);

        $this->kdMember=$this->sess->kdMemberMember;
        $this->kdMember1=$this->sess->kdMemberMember1;
        $this->nmMember=$this->sess->nmMember;
        $this->kdJabatan=$this->sess->kdMemberJabatan;
        $this->kdKantor=$this->sess->kdMemberKantor;
        $this->nmKantor=$this->sess->nmKantor;
        $kdMember=$this->sess->kdMemberMember;
        if($kdMember==null) {
            return $this->mbgs->resF("can't access !!!");
        }
        
        if(!$this->mbgs->_backCodes(base64_decode($code))){
            return $this->mbgs->resF("Tidak Sesuai Keamanan Sistem !!!");
        }
        if($this->_checkKeyApp($codeForm,$kdMember)==0){
            return $this->mbgs->resF("Anda tidak memiliki ijin !!!");
        }
        return $this->mbgs->resT("");
    }
    function addKeySistem($val){
        // $a=array();
        // $a['kdMember']="2G18-memb-1";
        // $a['kdJabatan']="6";
        // return print_r(base64_encode(json_encode($a)));
        // eyJrZE1lbWJlciI6IjJHMTgtbWVtYi0xIiwia2RKYWJhdGFuIjoiNiJ9

        $baseEND=json_decode((base64_decode($val)));
        // return print_r($baseEND);
        $kdMember=$baseEND->{'kdMember'};
        $kdJabatan=$baseEND->{'kdJabatan'};

        $nmApp=$this->qexec->_func("select * from app where kdApp='".$this->mbgs->app['kd']."'");
        $q="";
        if(count($nmApp)==0){
            $q.=" INSERT INTO app(kdApp,nmApp) VALUES ('".$this->mbgs->app['kd']."','".$this->mbgs->app['nm']."');";
        }


        $fitur=$this->qexec->_func("select * from appfitur where kdApp='".$this->mbgs->app['kd']."'");
        $fiturSystem=_getNKA("",true);
        // return $this->mbgs->_log($q);
        if(count($fitur)!=count($fiturSystem)){
            $q.=" delete from appfitur where kdApp='".$this->mbgs->app['kd']."';";
            $q.=" INSERT INTO appfitur(kdApp, kdFitur, nmFitur) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                $q.="(
                        ".$this->mbgs->_valforQuery($this->mbgs->app['kd']).",
                        ".$this->mbgs->_valforQuery($v['kd']).",
                        ".$this->mbgs->_valforQuery($v['page'])."
                    ),";
            }
        }
        if(strlen($q)>0){
            $q=substr($q,0,strlen($q)-1).";";
        }
        
        $kunci=$this->qexec->_func("select * from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember)."");
        if(count($kunci)!=count($fiturSystem)){
            $q.=" delete from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember).";";
            $q.=" INSERT INTO appkey(kdApp,kdMember, kdFitur, Kunci) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                foreach($v['kdJabatan'] as $key1 => $v1){
                    // print_r($v1."|".$kdJabatan."<br>");
                    if($v1==$kdJabatan){
                        $q.="('".$this->mbgs->app['kd']."',".$this->mbgs->_valforQuery($kdMember).",".$this->mbgs->_valforQuery($v['kd']).",'0'),";
                    }
                }
            }
            $q=substr($q,0,strlen($q)-1);
        }
        if(strlen($q)==0){
            return true;
        }
        // return $this->mbgs->_log($q);
        $check=$this->qexec->_multiProc($q);
        if($check){
            return true;
        }
        return false;
        // print_r("sukses");
    }
    function addKeySistemPaksa($val){
        // $a=array();
        // $a['kdMember']="2G18-memb-1";
        // $a['kdJabatan']="5";
        // return print_r(base64_encode(json_encode($a)));
        // eyJrZE1lbWJlciI6IjJHMTgtbWVtYi0xIiwia2RKYWJhdGFuIjoiNSJ9
        // eyJrZE1lbWJlciI6IjJHMTgtbWVtYi05Iiwia2RKYWJhdGFuIjoiMSJ9

        $baseEND=json_decode((base64_decode($val)));
        // return print_r($baseEND);
        $kdMember=$baseEND->{'kdMember'};
        $kdJabatan=$baseEND->{'kdJabatan'};

        $nmApp=$this->qexec->_func("select * from app where kdApp='".$this->mbgs->app['kd']."'");
        $q="";
        if(count($nmApp)==0){
            $q.=" INSERT INTO app(kdApp,nmApp) VALUES ('".$this->mbgs->app['kd']."','".$this->mbgs->app['nm']."');";
        }


        $fitur=$this->qexec->_func("select * from appfitur where kdApp='".$this->mbgs->app['kd']."'");
        $fiturSystem=_getNKA("",true);
        if(count($fitur)!=count($fiturSystem)){
            $q.=" delete from appfitur where kdApp='".$this->mbgs->app['kd']."';";
            $q.=" INSERT INTO appfitur(kdApp, kdFitur, nmFitur) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                $q.="(
                        ".$this->mbgs->_valforQuery($this->mbgs->app['kd']).",
                        ".$this->mbgs->_valforQuery($v['kd']).",
                        ".$this->mbgs->_valforQuery($v['page'])."
                    ),";
            }
        }
        if(strlen($q)>0){
            $q=substr($q,0,strlen($q)-1).";";
        }
        $kunci=$this->qexec->_func("select * from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember)."");
        $q.=" delete from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember).";";
        $q.=" INSERT INTO appkey(kdApp,kdMember, kdFitur, Kunci) VALUES ";
        foreach ($fiturSystem as $key => $v) {
            foreach($v['kdJabatan'] as $key1 => $v1){
                if($v1==$kdJabatan){
                    $q.="('".$this->mbgs->app['kd']."',".$this->mbgs->_valforQuery($kdMember).",".$this->mbgs->_valforQuery($v['kd']).",'0'),";
                }
            }
        }
        $q=substr($q,0,strlen($q)-1);
        return $this->qexec->_multiProc($q);
    }
}


