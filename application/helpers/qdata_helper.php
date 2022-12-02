<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    function _cbDinas($where){
        return "select kdDInas as value, nmDinas as valueName from dinas ".$where;
    }
    function _cbDinasForAG($kdMember,$where){ // admin group
        return "select a.kdDInas as value, a.nmDinas as valueName,  
            (
                select case when count(kdDinas)=1 then 1 else 0 end from admingroup where kdDinas=a.kdDinas and kdMember='".$kdMember."'
            )as checked
            , 0 as upd
        from dinas a ".$where;
    }
    function _dinas($where){
        return "select * from dinas ".$where;
    }
    function _tahun($where){
        return 'SELECT *,selected as checked,
            case 
                when perubahan=0 then status
                else concat(status," ke- ", perubahan)
            end as keterangan
         FROM tahun order by cast(nama as int) desc';
    }
    function _cbTahun($where){
        return 'SELECT *,
            case 
                when perubahan=0 then concat(nama," ",status)
                else concat(nama," ",status," ke- ", perubahan)
            end as valueName,
            case 
                when perubahan=0 then nama
                else concat(nama,"-", perubahan)
            end as value
         FROM tahun order by cast(nama as int) desc';
    }
    function _tahunForOption($where){
        return 'SELECT nama as judul,perubahan,  
                    case 
                        when perubahan=0 then status
                        else concat(status," ke- ", perubahan)
                    end as keterangan,
                    case 
                        when perubahan=0 then nama
                        else concat(nama,"-", perubahan)
                    end as url
                FROM tahun order by cast(nama as int) asc ';
    }
    function _cbPrio($where){
        return "select id as value, nama as valueName from prioritas ".$where;
    }
    function _dtTamSub($where){
        return "select * from ptamsub ".$where;
    }
    function _getNKA($obj,$all){ //nama key Action crud-???
        $nmKeyTabel=array();
        $no=2;

        // $dev=[5];
        $super=[3];
        $admin=[2,3];
        $user=[1,2,3]; //no tingkat jabatan
        $unik="MFC2G18-";
        $nm="E Master";     //login sistem
        $nmKeyTabel['l-'.$nm]=array(  
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'Login Sistem '.$nm
        );
        
        $no+=1;
        $nm="jaba";     //dashboard sistem
        $nmPage="Jabatan"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$admin,
            'page'=>'Perbarui Data '.$nmPage
        );
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$admin,
            'page'=>'Perbarui Data '.$nmPage
        );
        $nmKeyTabel['d-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$admin,
            'page'=>'Perbarui Data '.$nmPage
        );

        $no+=1;
        $nm="memb";//inp 
        $nmPage="Member"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'Page PRA RKA'.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$admin,
            'nm'=>($nm."-"),
            'page'=>'Page RKA '.$nmPage
        ); 
        //Delete
        $nmKeyTabel['d-'.$nm]=array(
            'kd'=>$unik.$no."/4",
            'kdJabatan'=>$admin,
            'nm'=>($nm."-"),
            'page'=>'Page Final RKA '.$nmPage
        ); 


        $no+=1;
        $nm="dina";//inp 
        $nmPage="Dinas"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'All Action '.$nmPage
        );
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'All Action '.$nmPage
        );
        $nmKeyTabel['d-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'All Action '.$nmPage
        );

        $no+=1;
        $nm="agdi";//inp 
        $nmPage="Admin Group Dinas "; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$admin,
            'page'=>'OPD '.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$user,
            'nm'=>($nm."-"),
            'page'=>'Belanja '.$nmPage
        ); 
        $nmKeyTabel['d-'.$nm]=array( 
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$user,
            'nm'=>($nm."-"),
            'page'=>'Belanja '.$nmPage
        ); 



        if($all){
            return $nmKeyTabel;
        }{
            return $nmKeyTabel[$obj]['kd'];
        }
        
    }
?>