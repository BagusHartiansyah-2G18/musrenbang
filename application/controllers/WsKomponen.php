<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WsKomponen extends CI_Controller {
    function __construct(){
        parent::__construct();	
        // $this->load->helper('url','html_helper','mbgs_helper');

        $this->mbgs->_setBaseUrl(base_url());
        
        $_=array();
        $this->_['code']=$this->mbgs->_backCode($this->enc->encrypt($this->mbgs->_isCode()));
        $this->_=array_merge($this->_,$this->mbgs->_getBasisData());
        $this->_['footer']    =$this->mbgs->_getJs();

        $this->kdMember=$this->sess->kdMember;
        $this->nmMember=$this->sess->nmMember;
        $this->kdJabatan=$this->sess->kdJabatan;
        $this->kdDinas=$this->sess->kdDinas;
        $this->tahun=$this->sess->tahun;

        $this->qtbl=_getNKA("c-prod",true);
        // $username=$this->sess->username;
        // $password=$this->sess->password;
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
    function publicViewOld($page){
        $this->load->helper("tmAbleLite_helper");
        $this->_=array_merge(
            $this->_,
            [
                "pgStart"=>"Login",
                "pgEnd"=>"Dashboard",
                "user"=>"Public",
                "kdJab"=>3,
                "idBody"=>"bodyTM",
                "ind"=>0,
                "index"=>null,
                "flogin"=>true,
                "info"=>array(
                    [
                        "bg"=>"2.jpg",
                        "judul"=>"MUSRENBANG PRA KEC",
                        "keterangan"=>"10.300.900.000",
                        "btn"=>"100 Usulan",
                        "key"=>1
                    ],[
                        "bg"=>"11.jpeg",
                        "judul"=>"MUSRENBANG KECAMATAN",
                        "keterangan"=>"9.300.900.000",
                        "btn"=>"80 Usulan",
                        "key"=>2
                    ],[
                        "bg"=>"1.jpg",
                        "judul"=>"FORUM OPD",
                        "keterangan"=>"8.300.900.000",
                        "btn"=>"60 Usulan",
                        "key"=>3
                    ],[
                        "bg"=>"14.jpg",
                        "judul"=>"MUSRENBANG KABUPATEN",
                        "keterangan"=>"8.300.900.000",
                        "btn"=>"60 Usulan",
                        "key"=>4
                    ]
                )
            ]
        );
        $this->_=array_merge(
            $this->_
            ,
            _startTmx($this->_)
        );
        $this->_['head'].=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsChart();
        $this->_['dinas']      =array_merge(
            $this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' group by kdDinas")),
            $this->qexec->_func(_cbDinas(" where nmDinas like '%BADAN PERENCANAAN%' group by kdDinas"))
        );
        return print_r(json_encode($this->_));
    }
    function publicView($page){
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsChart();
        $this->_['dinas']      =array_merge(
            $this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' group by kdDinas")),
            $this->qexec->_func(_cbDinas(" where nmDinas like '%BADAN PERENCANAAN%' group by kdDinas"))
        );
        return print_r(json_encode($this->_));
    }
    function dashboard($page){
        $this->load->helper("tmAbleLite_helper");
        $this->_=array_merge(
            $this->_,
            [
                "pgStart"=>"Login",
                "pgEnd"=>"Dashboard",
                "user"=>$this->nmMember,
                "kdJab"=>3,
                "idBody"=>"bodyTM",
                "ind"=>0,
                "index"=>null,
                "flogin"=>false,
                "info"=>array(
                        [
                            "bg"=>"2.jpg",
                            "judul"=>"MUSRENBANG PRA KEC",
                            "keterangan"=>"10.300.900.000",
                            "btn"=>"100 Usulan",
                            "key"=>1
                        ],[
                            "bg"=>"11.jpeg",
                            "judul"=>"MUSRENBANG KECAMATAN",
                            "keterangan"=>"9.300.900.000",
                            "btn"=>"80 Usulan",
                            "key"=>2
                        ],[
                            "bg"=>"1.jpg",
                            "judul"=>"FORUM OPD",
                            "keterangan"=>"8.300.900.000",
                            "btn"=>"60 Usulan",
                            "key"=>3
                        ],[
                            "bg"=>"14.jpg",
                            "judul"=>"MUSRENBANG KABUPATEN",
                            "keterangan"=>"8.300.900.000",
                            "btn"=>"60 Usulan",
                            "key"=>4
                        ]
                    )
                ]
        );
        $this->_=array_merge(
            $this->_
            ,
            _startTmx($this->_)
        );
        $this->_['head'].=$this->mbgs->_getCss().$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsChart();
        $this->_['tahun']      =$this->qexec->_func(_tahunForOption(""));
        return print_r(json_encode($this->_));
    }
    function usulan($page){
        $this->load->helper("tmAbleLite_helper");
        $this->_=array_merge(
            $this->_,
            [
                "pgStart"=>"Login",
                "pgEnd"=>"Dashboard",
                "user"=>$this->nmMember,
                "kdJab"=>3,
                "idBody"=>"bodyTM",
                "ind"=>1,
                "index"=>null,
                "flogin"=>false,
                "info"=>array(
                        [
                            "bg"=>"2.jpg",
                            "judul"=>"MUSRENBANG PRA KEC",
                            "keterangan"=>"10.300.900.000",
                            "btn"=>"100 Usulan",
                            "key"=>1
                        ],[
                            "bg"=>"11.jpeg",
                            "judul"=>"MUSRENBANG KECAMATAN",
                            "keterangan"=>"9.300.900.000",
                            "btn"=>"80 Usulan",
                            "key"=>2
                        ],[
                            "bg"=>"1.jpg",
                            "judul"=>"FORUM OPD",
                            "keterangan"=>"8.300.900.000",
                            "btn"=>"60 Usulan",
                            "key"=>3
                        ],[
                            "bg"=>"14.jpg",
                            "judul"=>"MUSRENBANG KABUPATEN",
                            "keterangan"=>"8.300.900.000",
                            "btn"=>"60 Usulan",
                            "key"=>4
                        ]
                    )
                ]
        );
        $this->_=array_merge(
            $this->_
            ,
            _startTm($this->_)
        );
        $this->_['head'].=$this->mbgs->_getCss().$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsChart();
        if($this->kdJabatan==1){
            $this->_['dinas']=$this->qexec->_func(_cbDinas(" where kdDinas='".$this->kdDinas."' group by kdDinas"));
        }else{
            $this->_['dinas']=$this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' group by kdDinas"));
        }
        $this->_['priotitas']=$this->qexec->_func(_cbPrio(" where tahun='".$this->tahun."'"));
        return print_r(json_encode($this->_));
    }
    
}
