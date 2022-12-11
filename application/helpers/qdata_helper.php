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
         FROM tahun '.$where.' order by cast(nama as int) desc';
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
    function _dtsubMusrenbang($kdkec,$tahapan,$where){
        $qwhere="";
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }
        return "
            select 
                b.nmSub,b.kdSub,b.kdDinas,c.nmDinas,
                (
                    select concat(count(id),' usulan') from musrembang 
                    where kdSub=b.kdSub and kdkec='".$kdkec."'  and 
                    prioritas=b.idPri and kdDinas=b.kdDinas and tahapan='".$tahapan."' and tahun=b.taSub
                ) as tusulan
            from psub b 
            join dinas c on
                b.kdDinas=c.kdDinas
            ".$qwhere."
            GROUP BY b.kdSub,b.kdDinas";
    }
    function _dsub($where){
        $qwhere="";
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }
        return "
            select 
                kdSub,nmSub
            from psub
            ".$qwhere;
    }
    function _cbDesa($where){
        $qwhere="";
        $qselect='';
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }else{
            $qselect=',kdKec';
        }
        return "
            select 
                nama as value, nama as valueName ".$qselect."
            from desa
            ".$qwhere;
    }
    function _dmusrenbang($where){
        $qwhere="";
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }
        return "
            select 
                *
            from musrembang
            ".$qwhere;
    }
    function _dmusrenbangJoin($where){
        $qwhere="";
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }
        return "
            select 
                a.*,
                (select nmDinas from dinas where kdDinas=a.kdKec and taDinas=a.tahun) as nmKec,
                (select nmDinas from dinas where kdDinas=a.kdDinas and taDinas=a.tahun) as nmDinas
            from musrembang a
            ".$qwhere;
    }
    function _drespon($where){
        $qwhere="";
        if(strlen($where)>0){
            $qwhere=" where ".$where;
        }
        return "
            SELECT a.*,b.nmDinas
            FROM mus_respon a
            join dinas b on 
                a.kdDinas=b.kdDinas and
                a.tahun=b.taDinas
            ".$qwhere;
    }

    // terkait keamanan
    function _getNKA($obj,$all){ //nama key Action crud-???
        $nmKeyTabel=array();
        $no=2;

        $dev=[4];
        $super=[3,4];
        $admin=[2,3,4];
        $user=[1,2,3,4]; //no tingkat jabatan
        $unik="MFC2G18-";
        $nm="E MUSRENBANG";     //login sistem
        $nmKeyTabel['l-'.$nm]=array(  
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'Login Sistem '.$nm
        );
        
        $no+=1; 
        $nm="tahu";     //dashboard sistem
        $nmPage="Tahun"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'page '.$nmPage
        );

        $no+=1;
        $nm="usu1";//inp 
        $nmPage="usulan tahapan 1"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'insert '.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'kdJabatan'=>$user,
            'nm'=>($nm."-"),
            'page'=>'update '.$nmPage
        ); 
        //Delete
        $nmKeyTabel['d-'.$nm]=array(
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$user,
            'nm'=>($nm."-"),
            'page'=>'delete '.$nmPage
        ); 
        // export to tahapan 2
        $nmKeyTabel['e-'.$nm]=array(
            'kd'=>$unik.$no."/4",
            'kdJabatan'=>$user,
            'nm'=>($nm."-"),
            'page'=>'export tahapan 2 musrenbang kec'.$nmPage
        ); 
        // memberikan ijin komentar respon opd
        $nmKeyTabel['r-'.$nm]=array(
            'kd'=>$unik.$no."/5",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'respon '.$nmPage
        );
        // pemberi keputusan status usulan
        $nmKeyTabel['k-'.$nm]=array(
            'kd'=>$unik.$no."/6",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'keputusan '.$nmPage
        );


        $no+=1; // 5
        $nm="usu2";//inp 
        $nmPage="usulan tahapan 2"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$dev,
            'page'=>'insert'.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'kdJabatan'=>$super, // untuk pergantian pagu anggaran oleh opd
            'nm'=>($nm."-"),
            'page'=>'update '.$nmPage
        ); 
        //Delete
        $nmKeyTabel['d-'.$nm]=array(
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'Delete '.$nmPage
        ); 
        // export to tahapan 3
        $nmKeyTabel['e-'.$nm]=array(
            'kd'=>$unik.$no."/4",
            'kdJabatan'=>$super,
            'nm'=>($nm."-"),
            'page'=>'export tahapan 3  forum OPD'.$nmPage
        );
        // memberikan ijin komentar respon opd
        $nmKeyTabel['r-'.$nm]=array(
            'kd'=>$unik.$no."/5",
            'kdJabatan'=>$admin,
            'nm'=>($nm."-"),
            'page'=>'respon '.$nmPage
        );
        // pemberi keputusan status usulan
        $nmKeyTabel['k-'.$nm]=array(
            'kd'=>$unik.$no."/6",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'keputusan '.$nmPage
        );

        $no+=1;
        $nm="usu3";//inp 
        $nmPage="usulan tahapan 3"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$dev,
            'page'=>'insert'.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'kdJabatan'=>$super, // untuk pergantian pagu anggaran oleh opd
            'nm'=>($nm."-"),
            'page'=>'update '.$nmPage
        ); 
        //Delete
        $nmKeyTabel['d-'.$nm]=array(
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'Delete '.$nmPage
        ); 
        // export to tahapan 3
        $nmKeyTabel['e-'.$nm]=array(
            'kd'=>$unik.$no."/4",
            'kdJabatan'=>$super,
            'nm'=>($nm."-"),
            'page'=>'export tahapan 4  Musrenbang KAB'.$nmPage
        );
        // memberikan ijin komentar respon opd
        $nmKeyTabel['r-'.$nm]=array(
            'kd'=>$unik.$no."/5",
            'kdJabatan'=>$admin,
            'nm'=>($nm."-"),
            'page'=>'respon '.$nmPage
        );
        // pemberi keputusan status usulan
        $nmKeyTabel['k-'.$nm]=array(
            'kd'=>$unik.$no."/6",
            'kdJabatan'=>$super,
            'nm'=>($nm."-"),
            'page'=>'keputusan '.$nmPage
        );
        

        $no+=1; //7
        $nm="usu4";//inp 
        $nmPage="usulan tahapan 4"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$dev,
            'page'=>'insert'.$nmPage
        );
        //update
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'kdJabatan'=>$dev, // untuk pergantian pagu anggaran oleh opd
            'nm'=>($nm."-"),
            'page'=>'update '.$nmPage
        ); 
        //Delete
        $nmKeyTabel['d-'.$nm]=array(
            'kd'=>$unik.$no."/3",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'Delete '.$nmPage
        ); 
        // export to tahapan 3
        $nmKeyTabel['e-'.$nm]=array(
            'kd'=>$unik.$no."/4",
            'kdJabatan'=>$super,
            'nm'=>($nm."-"),
            'page'=>'export tahapan 4  Musrenbang KAB'.$nmPage
        );
        // memberikan ijin komentar respon opd
        $nmKeyTabel['r-'.$nm]=array(
            'kd'=>$unik.$no."/5",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'respon '.$nmPage
        );
        // pemberi keputusan status usulan
        $nmKeyTabel['k-'.$nm]=array(
            'kd'=>$unik.$no."/6",
            'kdJabatan'=>$dev,
            'nm'=>($nm."-"),
            'page'=>'keputusan '.$nmPage
        );


        $no+=1;
        $nm="sett";//inp 
        $nmPage="pengaturan"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['u-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'update'.$nmPage
        );

        $no+=1;  //9
        $nm="resp";//inp 
        $nmPage="respon usulan"; 
        $nmKeyTabel['p-'.$nm]=array( 
            'kd'=>$unik.$no,
            'nm'=>($nm."-"),
            'kdJabatan'=>$user, //no tingkat jabatan
            'page'=>'Page '.$nmPage
        );
        $nmKeyTabel['c-'.$nm]=array( 
            'kd'=>$unik.$no."/1",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'create'.$nmPage
        );
        $nmKeyTabel['d-'.$nm]=array( 
            'kd'=>$unik.$no."/2",
            'nm'=>($nm."-"),
            'kdJabatan'=>$user,
            'page'=>'delete'.$nmPage
        );

        if($all){
            return $nmKeyTabel;
        }{
            return $nmKeyTabel[$obj]['kd'];
        }
        
    }
    function _cekKey($kodeForm,$kodeMember,$tahun,$kdApp){
        return "SELECT 
            * 
        FROM member a 
        JOIN appKey b on
            a.kdMember1 =b.kdMember  
        WHERE b.kdFitur='".$kodeForm."' AND b.kdMember='".$kodeMember."' AND b.kunci=0 and b.ta='".$tahun."' and a.kdApp='".$kdApp."'";
    }
    function _groupKey($kodeForm,$kodeMember,$tahun,$kdApp){
        return "SELECT 
            kdFitur,kunci
        FROM member a 
        JOIN appKey b on
            a.kdMember1 =b.kdMember  
        WHERE b.kdFitur like '%".$kodeForm."%' AND b.kdMember='".$kodeMember."' and b.ta='".$tahun."' and a.kdApp='".$kdApp."'";
    }
    function _qupdKeyGroup($onOff,$lengthKdPage,$kodeForm,$kodeMember,$tahun,$kdApp){
        return "update appkey set kunci=".$onOff."
                WHERE kdFitur like '%".$kodeForm."%' AND 
                length(kdFitur)!=".$lengthKdPage." and
                kdMember='".$kodeMember."' and 
                ta='".$tahun."' and 
                kdApp='".$kdApp."'
            ";
    }
?>