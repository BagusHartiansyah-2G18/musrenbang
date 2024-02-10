<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Control extends CI_Controller {
    function __construct(){
        parent::__construct();
    
        $this->mbgs->_setBaseUrl(base_url());
        $_=array();
        $this->dapp=$this->mbgs->_getBasisData();
        $this->_['assert']=$this->mbgs->_getAssetUrl();
        $this->_['code']=$this->mbgs->_backCode($this->enc->encrypt($this->mbgs->_isCode()));
        $this->_=array_merge($this->_,$this->dapp);
        $this->_['param']=null;
        $this->_['qlogin']=true;
        
    }
    public function index(){
        // if($this->sess->kdMember==null) {
        //     return $this->logout();
        // }
        $nama=$this->sess->nmMember;
        $this->_['page']="publicView";
        $this->load->view('indexMfc',$this->_);
		// $this->load->view('indexMfc',$this->_);
    }
    public function dashboard($val){
        // return print_r($val);
        if($val!=null && $val!="null"){
            $baseEND=json_decode((base64_decode($val)));
            // return print_r($baseEND);
            $username   =$baseEND->{'username'};
            $password   =$baseEND->{'password'};
            $kdDinas   =$baseEND->{'kdDinas'};
            $tahapan   =$baseEND->{'tahapan'};

            $q="select * from member where 
                kdDinas='".$kdDinas."' and UPPER(nmMember)=UPPER('".$username."') and 
                UPPER(password)=UPPER('".$password."') and kdApp='".$this->dapp['kd']."'
            ";
            $member=$this->qexec->_func($q);
            
            $sess=array(
                'kdMember'=>$member[0]['kdMember'],
                'kdMember1'=>$member[0]['kdMember1'],
                'nmMember'=>$member[0]['nmMember'],
                'password'=>$member[0]['password'],
                'kdDinas'=>$member[0]['kdDinas'],
                'email'=>$member[0]['email'],
                'kdJabatan'=>$member[0]['kdJabatan'],
                'tahun'=>0,
                'tahapan'=>$tahapan,
                // kebutuuhan e master 
                'keyTahapan'=>_getNKA("p-usu".$tahapan,false),
                'kdApp'=>$this->dapp['kd']
            );
            
            // $res=$this->mbgs->_getAllFile("/fs_sistem/session");
            // $this->mbgs->_removeFile($res,$this->mbgs->_getIpClient()."=");
            
            // // return print_r($_SERVER);
            // $this->mbgs->_expTxt($this->mbgs->_getIpClient()."=",json_encode($sess));
            // // sess
            $this->sess->set_userdata($sess);
            $nama=$member[0]['nmMember'];
        }else{
            // $this->_keamanan("Bagus H");
            if($this->sess->kdMember==null) {
                return $this->logout();
            }
            $nama=$this->sess->nmMember;
        }
        $this->_['page']="dashboard";
		$this->load->view('indexMfc',$this->_);
    }
    public function usulan($val){
        $this->sess->tahun=$val;
        $portal=$this->_keamanan(_getNKA("p-usu".$this->sess->tahapan,false));
        // return print_r($portal);
        if($portal['exec']){
            $this->_['page']="usulan";
            $this->_['param']=$val;
            $this->load->view('indexMfc',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        } 
    }
    public function usulanDetail($val){
        $portal=$this->_keamanan(_getNKA("p-usu".$this->sess->tahapan,false));
        if($portal['exec']){
            $this->_['page']="usulanDetail";
            $this->_['param']=$val;
            $this->load->view('indexMfc',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        } 
    }
    public function setting(){
        $portal=$this->_keamanan(_getNKA("p-sett",false));
        if($portal['exec']){
            $this->_['page']="setting";
		    $this->load->view('indexMfc',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        } 
    }
    public function respon($val){
        $portal=$this->_keamanan(_getNKA("p-resp",false));
        if($portal['exec']){
            $this->_['page']="respon";
            $this->_['param']=$val;
		    $this->load->view('indexMfc',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        } 
    }
    public function usulanPembahasan($val){
        $this->sess->tahun=$val;
        $portal=$this->_keamanan(_getNKA("p-usu".$this->sess->tahapan,false));
        if($portal['exec']){
            $this->_['page']="usulanPembahasan";
            $this->_['param']=$val;
            $this->load->view('indexMfc',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        } 
    }
    
    public function logout(){
        $this->sess->sess_destroy();
        // header("Location: https://bappedalitbangksb.com");
        return redirect(base_url());
    }

    // function cek keamanan sistem 
    function _checkKeyApp($keyForm,$kdMember){
        $kodeForm=false;
        $kodeForm=$keyForm;
        // return print_r(_cekKey($kodeForm,$kdMember,$this->sess->tahun,$this->dapp['kd']));
        $q=_cekKey($kodeForm,$kdMember,$this->sess->tahun,$this->dapp['kd']);
		// return print_r($q);
        $member=$this->qexec->_func($q);
        // hilangkan tanda / jika ada 
        $split=explode("/",$kodeForm)[0];
        $q=_groupKey($split,$kdMember,$this->sess->tahun,$this->dapp['kd']);
        $member1=$this->qexec->_func($q);
        if(count($member)==1){
            return true;
        }else if(count($member1)==0){

            $this->addKeySistem(base64_encode(json_encode(
                [
                    "kdMember"=>$kdMember,
                    "kdJabatan"=>$this->sess->kdJabatan,
                ]
            )));
        }
        return false;
    }
    function _keamanan($codeForm){
        // $portal=$this->_keamanan(_getNKA("p-usu".$this->sess->tahapan,false));
        // if($portal['exec']){
            
        // }else{
        //     if($portal['msg']=="session"){
        //         return $this->logout();
        //     }else{
        //         return $this->dashboard("null");
        //     }
        // } 

        // del jika dia dionline kan
        // $this->session->set_userdata($session);
        // $res=$this->mbgs->_getAllFile("/session");
        // $data="";
        // foreach ($res as $key => $value) {
        //     $exp=explode($this->mbgs->_getIpClient()."=",$value['nama']);
        //     if(count($exp)>1){
        //         $data=$this->mbgs->_readFileTxt($value['file']);
        //     }
        // }
        // if(strlen($data)==0){
        //     return $this->mbgs->resF("session");
        // }
        // $data=json_decode($data);
        // $data->{'kdMember'};
        // $session=array(
        //     'kdMember'=>$data->{'kdMember'},
        //     'nmMember'=>$data->{'nmMember'},
        //     'kdJabatan'=>$data->{'kdJabatan'},
        //     'kdDinas'=>$data->{'kdDinas'},
        //     'nmDinas'=>$data->{'nmDinas'},
        //     'username'=>$data->{'username'},
        //     'password'=>$data->{'password'},

        //     'tahun'=>$data->{'tahun'},
        //     'noPembahasan'=>$data->{'noPembahasan'},
        //     'progres'=>$data->{'progres'},
        //     'finals'=>$data->{'finals'},
        //     'files'=>$data->{'files'},
        //     'perkada'=>$data->{'perkada'},
        // );
        // $this->session->set_userdata($session);

        $kdMember=$this->sess->kdMember1;
        if($kdMember==null) {
            return $this->mbgs->resF("session");
        }
        if($this->_checkKeyApp($codeForm,$kdMember)==0){
            return $this->mbgs->resF("keyForm");
        }
        return $this->mbgs->resT("");
    }
    function addKeySistem($val){
        // $a=array();
        // $a['kdMember']="2G18-memb-1";
        // $a['kdJabatan']="6";
        // return print_r(base64_encode(json_encode($a)));
        // eyJrZE1lbWJlciI6IjJHMTgtbWVtYi0xIiwia2RKYWJhdGFuIjoiNiJ9
        $tahunAktif=$this->qexec->_func("select nama from tahun where selected=1")[0]['nama'];
        $baseEND=json_decode((base64_decode($val)));
        $kdMember=$baseEND->{'kdMember'};
        $kdJabatan=$baseEND->{'kdJabatan'};
        $nmApp=$this->qexec->_func("select * from app where kdApp='".$this->dapp['kd']."'");
        $q="";
        if(count($nmApp)==0){
            $q.=" INSERT INTO app(kdApp,nmApp) VALUES ('".$this->dapp['kd']."','".$this->dapp['nm']."');";
        }


        $fitur=$this->qexec->_func("select * from appfitur where kdApp='".$this->dapp['kd']."'");
        $fiturSystem=_getNKA("p-tahu",true);
        if(count($fitur)!=count($fiturSystem)){
            $q.=" delete from appfitur where kdApp='".$this->dapp['kd']."';";
            $q.=" INSERT INTO appfitur(kdApp, kdFitur, nmFitur) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                $q.="(
                        ".$this->mbgs->_valforQuery($this->dapp['kd']).",
                        ".$this->mbgs->_valforQuery($v['kd']).",
                        ".$this->mbgs->_valforQuery($v['page'])."
                    ),";
            }
        }
        if(strlen($q)>0){
            $q=substr($q,0,strlen($q)-1).";";
        }
        $kunci=$this->qexec->_func("select * from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember)." and kdApp='".$this->dapp['kd']."' and ta='".$this->sess->tahun."'");
        $fitur=$this->qexec->_func("select * from appfitur where kdApp='".$this->dapp['kd']."' and kdFitur! like '%/%'");
        
        $q.=" delete from appkey where kdMember=".$this->mbgs->_valforQuery($kdMember)." and kdApp='".$this->dapp['kd']."' and ta='".$this->sess->tahun."';";
        $q.=" INSERT INTO appkey(kdApp,kdMember, kdFitur, Kunci,ta) VALUES ";
        foreach ($fiturSystem as $key => $v) {
            foreach($v['kdJabatan'] as $key1 => $v1){
                if($v1==$kdJabatan){
                    if(count(explode("/",$v['kd']))==1){ // perijinan untuk halaman page
                        $q.="('".$this->dapp['kd']."',".$this->mbgs->_valforQuery($kdMember).",".$this->mbgs->_valforQuery($v['kd']).",'0','".$this->sess->tahun."'),";
                    }else{// perijinan untuk action page
                        $q.="('".$this->dapp['kd']."',".$this->mbgs->_valforQuery($kdMember).",".$this->mbgs->_valforQuery($v['kd']).",'".($tahunAktif==$this->sess->tahun?0:1)."','".$this->sess->tahun."'),";
                    }
                }
            }
        }
		// return print_r($q);
        $q=substr($q,0,strlen($q)-1);
        if(strlen($q)==0){
            // return print_r("Data Key Sudah Sesuai");
            return true;
        }
        
        return $this->qexec->_multiProc($q);
        
    }
}
