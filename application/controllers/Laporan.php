<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan extends CI_Controller {
    var $assert="";
    private $bgs;
    function __construct(){
        parent::__construct();
        $lbgs=new LibBGS();
        $this->mbgs->_setBaseUrl(base_url());
        $_=array();
        $this->_['assert']=$this->mbgs->_getAssetUrl();
        // $this->_['logo']=$this->mbgs->app['logo'];
        // $this->startLokal();
    }
    function startLokal(){
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
        $this->kdMember=$this->sess->kdMember;
        $this->kdMember1=$this->sess->kdMember1;
        $this->nmMember=$this->sess->nmMember;
        $this->kdJabatan=$this->sess->kdJabatan;
        $this->kdKantor=$this->sess->kdKantor;
        $this->nmKantor=$this->sess->nmKantor;
    }
    function previewFile($val){
        $baseEND=json_decode((base64_decode($val)));
        $files   =$baseEND->{'files'};
        // return print_r($files);
        $this->lbgs->previewPdf(base_url().$files);
    }
    function listUsulan($val){
        $baseEND=json_decode((base64_decode($val)));
        $kdKec      =$baseEND->{'kdKec'};
        $nmKec      =$baseEND->{'nmKec'};
        $tahapan    =$baseEND->{'tahapan'};
        $terima     =$baseEND->{'terima'};
        
        $status='';
        switch ($terima) {
            case 2: $status='DIUSULKAN'; break;
            case 1: $status='DITERIMA';  break;        
            case 0:$status='DITOLAK'; break;
        }
        if($terima==2 && $tahapan>1){
            $terima="";
        }else{
            $terima=" a.status='".$status."' and";
        }
        
        

        if($kdKec=='0'){
            $kdKec=" ";
        }else{
            $kdKec=" a.kdKec='".$kdKec."' and ";
        }

        $tahun=$this->qexec->_func(_tahun("where selected=1"))[0]['nama'];
        $dt=$this->qexec->_func(_dmusrenbangJoinFull(" 
            a.tahun='".$tahun."' and
            ".$terima."
            ".$kdKec."
            a.tahapan='".$tahapan."'
            GROUP BY a.id,a.kdKec
        "));
        // return _log($dt);
        $header=[
            "nmKec"=>$nmKec,
            "tahun"=>$tahun,
            "assert"=>base_url(),
            "status"=>$status,
            "tahapan"=>$this->getTahapan($tahapan),
        ];
        
        if(false){ // untuk export exccell
            $file="listSubKegiatan";
            header("Content-type: application/vnd-ms-excel");
            header("Content-Disposition: attachment; filename=".$file.".xls");
            $html=_header($header)
            ._tblMusrenbang($dt);
            return print_r($html);
        }

        $dlaporan=array();
        array_push($dlaporan,[
            "ORIENTATION"	=>"L",
            "FORMAT"		=>"legal",
            "name"			=>$this->getTahapan($tahapan),
            // "preview"       =>true,
            // "preview"       =>false,
            "html"          =>_header($header)
                                ._tblMusrenbang($dt)
                            // ._informasiRenstra($this->_)
                            // ._informasiIndikator($this->_)
                            // ._tabelRincianBelanja($this->_)
                            // .$renstra
                            // .$tabel
        ]);
        return $this->lbgs->cetakTC($dlaporan);
    }
    function lapoOpd($val){
        $baseEND=json_decode((base64_decode($val)));
        $kdDinas    =$baseEND->{'kdDinas'};
        $nmDinas    =$baseEND->{'nmDinas'};
        $pdf        =$baseEND->{'pdf'};
        $tahun      =$this->sess->tahun;


        
        $drenstra=$this->qexec->_func(_renstraOpd($kdDinas,$tahun,""));

        if(!$pdf){ // untuk export exccell
            $file="LaporanKegiatanOpd";
            header("Content-type: application/vnd-ms-excel");
            header("Content-Disposition: attachment; filename=".$file.".xls");
            $html=_lapoBelanjaOpd($drenstra,$kdDinas,$nmDinas);
            return print_r($html);
        }

        $dlaporan=array();
        array_push($dlaporan,[
            "ORIENTATION"	=>"L",
            "FORMAT"		=>"legal",
            "name"			=>"rese",
            // "preview"       =>true,
            "preview"       =>false,
            "html"          =>_lapoBelanjaOpd($drenstra,$kdDinas,$nmDinas)
        ]);
        return $this->lbgs->cetakTC($dlaporan);
    }
    function getTahapan($ind){
        switch ($ind) {
            case 1: return 'PRA MUSRENBANG';
            case 2: return 'MUSRENBANG KEC';
            case 3: return 'FORUM OPD';
            case 4: return 'MUSRENBANG KAB';
        }
    }
}