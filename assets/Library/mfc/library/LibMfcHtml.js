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
}