class LibMfcHtml{
    divider=(cls)=>{
        return `<div class="b-example-divider ${cls}"></div>`;
    }
    lines=()=>{
        return "<hr>";
    }
    delUndife=(lv)=>{
        if(lv==undefined || lv==NaN){
            return '';
        }
        return lv;
    }
    ol=(cp)=>{
        let cr=`<ol class='${this.delUndife(cp.cls)}'>`; // class resppon
        cp.data.forEach((v) => {  
            cr+=`<li class='${this.delUndife(cp.clsLi)}'>${v}</li>`;
        });
        return cr+='</ol>';
    }
}