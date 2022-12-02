<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Control extends CI_Controller {
    function __construct(){
        parent::__construct();
    
        $this->mbgs->_setBaseUrl(base_url());
        $_=array();
        $this->_['assert']=$this->mbgs->_getAssetUrl();
        $this->_['code']=$this->mbgs->_backCode($this->enc->encrypt($this->mbgs->_isCode()));
        $this->_['param']=null;
        $this->_['qlogin']=true;
        
    }
    // public function index(){
    //     // if($this->sess->kdMember==null) {
    //     //     return $this->logout();
    //     // }
    //     $nama=$this->sess->nmMember;
    //     $this->_['page']="publicViewOld";
    //     $this->_['html']=$this->mbgs->_html($this->_);
    //     $this->load->view('index',$this->_);
	// 	// $this->load->view('indexMfc',$this->_);
    // }
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

            $q="select * from member where kdDinas='".$kdDinas."' and UPPER(nmMember)=UPPER('".$username."') and UPPER(password)=UPPER('".$password."')";
            $member=$this->qexec->_func($q);
            
            $sess=array(
                'kdMember'=>$member[0]['kdMember'],
                'nmMember'=>$member[0]['nmMember'],
                'password'=>$member[0]['password'],
                'kdDinas'=>$member[0]['kdDinas'],
                'email'=>$member[0]['email'],
                'kdJabatan'=>$member[0]['kdJabatan'],
                'tahun'=>0,
                'tahapan'=>$tahapan
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
        $this->_['html']=$this->mbgs->_html($this->_);
		$this->load->view('index',$this->_);
    }
    public function usulan($val){
        // return print_r($val);
        if($val!=null && $val!="null"){
            $this->sess->tahun=$val;
        }
        $this->_['page']="usulan";
        $this->_['html']=$this->mbgs->_html($this->_);
		$this->load->view('index',$this->_);
    }
    
    public function logout(){
        $this->sess->sess_destroy();
        // header("Location: https://bappedalitbangksb.com");
        return redirect("control");
    }
}
