<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    // print data for array
    function _log($msg){
        echo "<pre>";
        print_r($msg);
    }
    function _header($v){
        // return _log($v);
        $CI =& get_instance();
        $w1="70%;";
        $w2="7%;";
        $w3="23%;";
        // <td style="width:90%; font-size:15px;">
        //                 <b>Pemerintah Kabupaten Sumbawa Barat <br>Tahun Anggaran '.$v['tahun'].'</b><br>
        //             </td>
        return '
            <table cellspacing="0" cellpadding="0" border="0" style="text-align: center; width:100%;" border="2">
                <tr>
                    <td style="width:10%;">
                        <img src="'.$v['assert'].'/assets/fs_css/logo/'.$CI->mbgs->app['logo'].'" class="img-circle" width="50">
                    </td>
                    <td width="90%" style=" margin-left:110px; font-size:13px;">
                        <br><br><b>'.$v['nmKec'].' <br>'.$v['tahapan'].'
                        ('.$v['status'].')</b><br>
                    </td>
                </tr> 
            </table>
        ';
    }
    function _tblMusrenbang($dt){
        $CI =& get_instance();
        $w1="10%;";$w4="40%;";$w15="15%;";$w25="25%;";$w03="3%;";
        $w2="20%;";$w5="50%;";$w07="7%;";
        $w2="20%;";$w6="60%;";
        $html='
            <table cellspacing="0" cellpadding="0" border="0" style="text-align: center; width:100%;  font-size:10px;" border="1">
                <thead>
                    <tr>
                        <th width="'.$w03.'">No</th>
                        <th width="'.$w1.'">Prioritas</th>
                        <th width="'.$w1.'">Kecamatan</th>
                        <th width="'.$w1.'">Dinas</th>
                        <th width="'.$w1.'">Sub Kegiatan</th>

                        <th width="'.$w1.'">Permasalahan</th>
                        <th width="'.$w1.'">Uraian Pekerjaan</th>
                        <th width="'.$w1.'">Desa</th>
                        <th width="'.$w07.'">volume</th>
                        <th width="'.$w1.'">Pagu</th>

                        <th width="'.$w1.'">Keterangan</th>
                    </tr>
                </thead>
                <tbody>';
        // return print_r($dt);
        foreach ($dt as $i => $v) {
            $html.='
                <tr >
                    <td width="'.$w03.'" >'.($i+1).'</td>
                    <td width="'.$w1.'">'.$v['nmPri'].'</td>
                    <td width="'.$w1.'">'.$v['nmKec'].'</td>
                    <td width="'.$w1.'">'.$v['nmDinas'].'</td>
                    <td width="'.$w1.'">'.$v['nmSub'].'</td>
                
                    <td width="'.$w1.'">'.$v['masalah'].'</td>
                    <td width="'.$w1.'">'.$v['uraianPekerjaan'].'</td>
                    <td width="'.$w1.'">'.$v['desa'].' , '.$v['lokasi'].'</td>
                    <td width="'.$w07.'">'.$v['volume'].' ('.$v['satuan'].')</td>
                    <td width="'.$w1.'">Rp.'.$CI->mbgs->_uang($v['paguAnggaran']).'</td>
                
                    <td width="'.$w1.'">'.$v['alasan'].'</td>
                </tr>
            ';
        }
        return $html.='</tbody>
            </table>
        ';
    }
    
?>