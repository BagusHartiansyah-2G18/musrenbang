<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WsKomponen extends CI_Controller {
    function __construct(){
        parent::__construct();	
        // $this->load->helper('url','html_helper','mbgs_helper');

        $this->mbgs->_setBaseUrl(base_url());
        
        $_=array();
        $this->dapp=$this->mbgs->_getBasisData();
        $this->_['code']=$this->mbgs->_backCode($this->enc->encrypt($this->mbgs->_isCode()));
        $this->_=array_merge($this->_,$this->dapp);
        $this->_['footer']    =$this->mbgs->_getJs();

        $this->kdMember=$this->sess->kdMember;
        $this->nmMember=$this->sess->nmMember;
        $this->kdJabatan=$this->sess->kdJabatan;
        $this->kdDinas=$this->sess->kdDinas;
        $this->tahun=$this->sess->tahun;
        $this->tahapan=$this->sess->tahapan;

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
    function publicView($page){
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsChart();
        $this->_['tahun']=$this->qexec->_func(_tahun("where selected=1"))[0]['nama'];
        $this->_['u1']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],1))[0];
        $this->_['u2']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],2))[0];
        $this->_['u3']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],3))[0];
        $this->_['u4']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],4))[0];
        $this->_['data']=$this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' and taDinas='".$this->_['tahun']."'"));
        $this->_['dinas']      =array_merge(
            $this->_['data'],
            $this->qexec->_func(_cbDinas(" where nmDinas like '%BADAN PERENCANAAN%' and taDinas='".$this->_['tahun']."'"))
        );

        foreach ($this->_['data'] as $i => $v) {
            $this->_['data'][$i]['tr1']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],"1 and kdKec='".$v['value']."'"))[0];
            $this->_['data'][$i]['tr2']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],"2 and kdKec='".$v['value']."'"))[0];
            $this->_['data'][$i]['tr3']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],"3 and kdKec='".$v['value']."'"))[0];
            $this->_['data'][$i]['tr4']=$this->qexec->_func(_dtotalUsulan($this->_['tahun'],"4 and kdKec='".$v['value']."'"))[0];
        }
        return print_r(json_encode($this->_));
    }
    function dashboard($page){
        
        $this->_['head']    =$this->mbgs->_getJsMaster($page);
        $this->_['tahapan']   =$this->tahapan;
        $this->_['tahun']=$this->qexec->_func(_tahun("where selected=1"))[0]['nama'];
        return print_r(json_encode($this->_));
    }
    function usulan($page){
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsTabel();
        $this->_['tahun']=$this->tahun;
        $this->_['tahapan']=$this->getTahapan($this->tahapan);

        $this->_['key']=$this->getKeyAct(
            "p-usu".$this->sess->tahapan,
            [
                "e"=>_getNKA("e-usu".$this->sess->tahapan,false), 
            ]
        ); 
        
        if($this->kdJabatan==1){
            $this->_['dinas']=$this->qexec->_func(_cbDinas(" where kdDinas='".$this->kdDinas."' group by kdDinas"));
        }else{
            $this->_['dinas']=$this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' group by kdDinas"));
        }

        $this->_['priotitas']=$this->qexec->_func(_cbPrio(" where tahun='".$this->tahun."'"));
        
		// return print_r(_dtsubMusrenbang($this->_['dinas'][0]['value'],$this->tahapan," b.idPri=1 and b.taSub='".$this->tahun."' "));
        //ketika pra kecamatan, maka data sub kegiatan
        $this->_['dinas'][0]['data'][0]=$this->qexec->_func(_dtsubMusrenbang($this->_['dinas'][0]['value'],$this->tahapan," b.idPri=1 and b.taSub='".$this->tahun."' "));

        return print_r(json_encode($this->_));
    }
    function usulanDetail($page,$val){
        $this->_['val']=$val;
        $val=json_decode(base64_decode($val)); 
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsTabel();
        $this->_['tahun']=$val->tahun;
        
        $this->_['key']=$this->getKeyAct(
            "p-usu".$this->sess->tahapan,
            [
                "p"=>_getNKA("p-usu".$this->sess->tahapan,false),
                "c"=>_getNKA("c-usu".$this->sess->tahapan,false),
                "u"=>_getNKA("u-usu".$this->sess->tahapan,false),
                "d"=>_getNKA("d-usu".$this->sess->tahapan,false),
                
                "e"=>_getNKA("e-usu".$this->sess->tahapan,false),
                "r"=>_getNKA("r-usu".$this->sess->tahapan,false),
                "k"=>_getNKA("k-usu".$this->sess->tahapan,false),
            ]
        ); 


        $this->_['tahapan']=$this->getTahapan($this->tahapan);
        $this->_['dinas']=$this->qexec->_func(_cbDinas(" where kdDinas='".$val->kdKec."' and taDinas='".$val->tahun."'"))[0];
        $this->_['priotitas']=$this->qexec->_func(_cbPrio(" where tahun='".$val->tahun."' and id='".$val->kdPri."'"))[0];
        $this->_['sub']=$this->qexec->_func(_dsub(" kdDinas='".$val->kdDinas."' and taSub='".$val->tahun."' and kdSub='".$val->kdSub."'"))[0];
        $this->_['desa']=$this->qexec->_func(_cbDesa(" kdKec='".$val->kdKec."'"));

        $this->_['kdJabatan']=$this->kdJabatan; 

        //ketika pra kecamatan, maka data sub kegiatan
        $this->_['data']=$this->qexec->_func(_dmusrenbang(" 
            kdKec='".$val->kdKec."' and kdSub='".$val->kdSub."' and 
            kdDinas='".$val->kdDinas."' and tahun='".$val->tahun."' and
            prioritas='".$val->kdPri."' and tahapan='".$this->tahapan."'
            GROUP BY id
        "));

        return print_r(json_encode($this->_));
    }
    function setting($page){
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        // $this->_['footer']=$this->mbgs->_getJsTabel(); 

        $this->_['tahun']=$this->sess->tahun;
        $this->_['tahapan']=$this->getTahapan($this->tahapan);
        $this->_['dinas']=$this->qexec->_func(_cbDinas(" where kdDinas='".$this->kdDinas."' and taDinas='".$this->tahun."'"));
        if(count($this->_['dinas'])>0){
            $this->_['dinas']=$this->_['dinas'][0];
        }
        return print_r(json_encode($this->_));
    }
    function respon($page,$val){
        $val=json_decode(base64_decode($val)); 
        $this->_['head']    =$this->mbgs->_getJsMaster($page);
        $this->_['footer']  .=$this->mbgs->_getJsTabel();

        $this->_['tahapan']=$this->getTahapan($this->tahapan);
        $this->_['tahun']=$this->tahun;
        $this->_['nmKec']=$val->nmKec;
        $this->_['kdDinas']=$this->kdDinas;
        $this->_['nmPri']=$val->nmPri;
        $this->_['key']=$this->getKeyAct(
            "p-resp",
            [
                "p"=>_getNKA("p-resp",false),
                "c"=>_getNKA("c-resp",false),
                "d"=>_getNKA("d-resp",false),
            ]
        ); 
        $this->_['ket']=$this->qexec->_func(_dmusrenbang(" id='".$val->id."' and kdKec='".$val->kdKec."' and tahun='".$val->tahun."' "))[0];
        $this->_['data']=$this->qexec->_func(_drespon(" a.id='".$val->id."' and a.kdKec='".$val->kdKec."' and a.tahun='".$val->tahun."' and a.qdel=0 "));
        return print_r(json_encode($this->_));
    }
    function usulanPembahasan($page){
        $this->_['head']=$this->mbgs->_getJsMaster($page);
        $this->_['footer'].=$this->mbgs->_getJsTabel();
        $this->_['tahun']=$this->tahun;
        $this->_['tahapan']=$this->getTahapan($this->tahapan);

        $this->_['key']=$this->getKeyAct(
            "p-usu".$this->sess->tahapan,
            [
                "p"=>_getNKA("p-usu".$this->sess->tahapan,false),
                "c"=>_getNKA("c-usu".$this->sess->tahapan,false),
                "u"=>_getNKA("u-usu".$this->sess->tahapan,false),
                "d"=>_getNKA("d-usu".$this->sess->tahapan,false),
                
                "e"=>_getNKA("e-usu".$this->sess->tahapan,false),
                "r"=>_getNKA("r-usu".$this->sess->tahapan,false),
                "k"=>_getNKA("k-usu".$this->sess->tahapan,false),
            ]
        );  
        
        $this->_['tahapan']=$this->getTahapan($this->tahapan);
        $this->_['priotitas']=$this->qexec->_func(_cbPrio(" where tahun='".$this->tahun."'"));
        
        if($this->kdJabatan==1){
            $this->_['kec']=$this->qexec->_func(_cbDinas(" where kdDinas='".$this->kdDinas."' and taDinas='".$this->tahun."'"));
        }else{
            $this->_['kec']=$this->qexec->_func(_cbDinas(" where nmDinas like '%KECAMATAN%' and taDinas='".$this->tahun."'"));
        }

        $this->_['priotitas'][0]['data']=$this->qexec->_func(_dmusrenbangJoin(" 
            a.tahun='".$this->tahun."' and
            a.prioritas='".$this->_['priotitas'][0]['value']."' and a.tahapan='".$this->tahapan."'
            GROUP BY a.id,a.kdKec
        "));
        $this->_['desa']=$this->qexec->_func(_cbDesa(""));
        
        return print_r(json_encode($this->_));
    }
    
    function getTahapan($ind){
        switch ($ind) {
            case 1: return 'PRA MUSRENBANG';
            case 2: return 'MUSRENBANG KEC';
            case 3: return 'FORUM OPD';
            case 4: return 'MUSRENBANG KAB';
        }
    }
    
    function getKeyAct($obj,$dkey){
        $key=$this->qexec->_func(
            _groupKey(
                _getNKA($obj,false),
                $this->sess->kdMember1,
                $this->sess->tahun,
                $this->dapp['kd']
            )
        );
        foreach ($dkey as $i => $v) {
            foreach ($key as $i1 => $v1) {
                if($v==$v1['kdFitur']){
                    $dkey[$i]=$v1['kunci'];
                }
            }
            if(strlen($dkey[$i])>1){ // jika tidak berubah berarti tidak memiliki akses
                $dkey[$i]=1;
            }
        }
        return $dkey;
    }
}
