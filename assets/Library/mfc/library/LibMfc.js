class LibMFC{
    constructor(path){
        // this.pathFBootstrap="../Library/bootstrap-5.2.2/bootstrap-5.2.2/dist/"; //fileBootstrap;
        this.pathFBootstrap=path+"assets/Library/mfc/library/bootstrap-5.2.2/bootstrap-5.2.2/dist/"; //fileBootstrap;
        this.fileBootstrap=[
            "js/bootstrap.bundle.js","js/bootstrap.bundle.js.map", // 1
            "js/bootstrap.bundle.min.js","js/bootstrap.bundle.min.js.map", // 3
            "js/bootstrap.esm.js","js/bootstrap.esm.js.map", // 5
            "js/bootstrap.esm.min.js","js/bootstrap.esm.min.js.map", // 7
            "js/bootstrap.js","js/bootstrap.js.map", // 9
            "js/bootstrap.min.js","js/bootstrap.min.js.map", // 11
        ];

        // this.pathFMfc="../"; //fileBootstrap;
        this.pathFMfc=path+"assets/Library/mfc/"; //fileBootstrap;
        this.fileMfc=[
            "library/LibMfcHtml.js","loader/main.js", // 1
            "header/main.js","dropdonw/main.js", // 3
            "button/main.js","galery/main.js",  // 5
            "style/main.js","text/main.js", // 7
            "input/main.js","tab/main.js", // 9
            "card/main.js","slider/main.js", // 11
            "modal/main.js","sidebar/main.js",
            "teditor/main.js",//"js/main.js",
            //"js/main.js",//"js/main.js",
            //"js/main.js",//"js/main.js",
            
        ];
        this.objMfc=[
            "const header_=new Header_();","const dropdonw_=new Dropdonw_();",
            "const loader_=new Loader_();","const button_=new Button_();",
            "const galery_=new Galery_();","const style_=new Style_();",
            "const text_=new Text_();","const input_=new Input_();",
            "const tab_=new Tab_();","const card_=new Card_();",
            "const slider_=new Slider_();","const modal_=new Modal_();",
            "const sidebar_=new Sidebar_();","const teditor_=new Teditor_();",
            // "const header_=new Header_();","const header_=new Header_();",
            // "const header_=new Header_();","const header_=new Header_();",
        ];
        this.declarationMfc="";

        this.hmenu=[];
        this.dmenu=[];
    }
    endBootstrap=(start,end)=>{
        let ckon=false;
        this.fileBootstrap.forEach((cv,ci) => {
            let ckon=false;
            if (start!=undefined && start==ci) {
                ckon=true;
            }
            if (end!=undefined && start>=ci && end<=ci || ckon) {
                ckon=true;
            }
            if (ckon || (start==undefined)) {
                document.write(`<script src='`+this.pathFBootstrap+cv+`'></script>`);   
            }
        });
    }
    endBootstrapHTML=(start,end)=>{
        let ckon=false;
        let resp='';
        this.fileBootstrap.forEach((cv,ci) => {
            let ckon=false;
            if (start!=undefined && start==ci) {
                ckon=true;
            }
            if (end!=undefined && start>=ci && end<=ci || ckon) {
                ckon=true;
            }
            if (ckon || (start==undefined)) {
                resp+=`<script src='`+this.pathFBootstrap+cv+`'></script>`;   
            }
        });
        return resp;
    }
    startMfc=()=>{
        try {
            // const docfileMfc=document.getElementById("fileMfc");
            let chtml="";
            this.declarationMfc="<script>";
            this.fileMfc.forEach((cv,ci)=>{
                chtml+=`<script src='`+this.pathFMfc+cv+`'></script>`;
                if(ci>0){
                    this.declarationMfc+=this.objMfc[--ci];
                }
            })
            this.declarationMfc+="</script>";
            this.declarationMfc=chtml+this.declarationMfc;
            // docfileMfc.innerHTML=chtml;
        } catch (error) {
            console.log("div dengan id fileMfc tidak di tambahkan !!!");
        }
    }
}