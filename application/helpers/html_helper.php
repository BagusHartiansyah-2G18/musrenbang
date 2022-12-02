<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

    // print data for array
    function _log($msg){
        echo "<pre>";
        print_r($msg);
    }
    function _tblSubKeg($dt){
        $CI =& get_instance();
        $w1="70%;";
        $w2="7%;";
        $w3="23%;";
        $html='
            <table cellspacing="0" cellpadding="0" border="0" style="text-align: center; width:100%;" border="2">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Nama</th>
                    </tr>
                </thead>
                <tbody>';
        foreach ($dt as $key => $v) {
            $html.='
                <tr>
                    <td >'.$v['kdSub'].'</td>
                    <td >'.$v['nmSub'].'</td>
                </tr>
            ';
        }
        return $html.='</tbody>
            </table>
        ';
    }
    
?>