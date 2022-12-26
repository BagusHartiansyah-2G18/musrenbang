class LibMFC{
    constructor(path){
        this.pathBTabel="../library/bootstrap/"; //js Tabel Bootstrap;
        this.pathFBootstrap=this.pathBTabel+"bootstrap-5.2.2/dist/"; //fileBootstrap;
        this.pathFBootstrap=path+"assets/Library/mfc/library/bootstrap/bootstrap-5.2.2/dist/";
        this.fileBootstrap=[
            "js/bootstrap.bundle.js","js/bootstrap.bundle.js.map", // 1
            "js/bootstrap.bundle.min.js","js/bootstrap.bundle.min.js.map", // 3
            "js/bootstrap.esm.js","js/bootstrap.esm.js.map", // 5
            "js/bootstrap.esm.min.js","js/bootstrap.esm.min.js.map", // 7
            "js/bootstrap.js","js/bootstrap.js.map", // 9
            "js/bootstrap.min.js","js/bootstrap.min.js.map", // 11
        ];

        
        this.pathFMfc="../"; //file MFC;
        this.pathFMfc=path+"assets/Library/mfc/";
        this.fileMfc=[
            "library/LibMfcHtml.js","loader/main.js", // 1
            "header/main.js","dropdonw/main.js", // 3
            "button/main.js","galery/main.js",  // 5
            "style/main.js","text/main.js", // 7
            "input/main.js","tab/main.js", // 9
            "card/main.js","slider/main.js", // 11
            "modal/main.js","sidebar/main.js",
            "teditor/main.js","chart/main.js",
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
            "const chart_=new Chart_();",//"const header_=new Header_();",
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
        document.write(`<script src='`+this.pathFMfc+`library/sflib.js'></script>`);
    }
    endBootstrapHTML=(start,end,tabel)=>{
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
        if(this.pathFMfc.length==3){
            resp+=`<script src='`+this.pathFMfc+`library/jquery.js'></script>`;
        }
        if(tabel!=undefined){
            let plugin=this.pathBTabel+'plugins/';
            let bower=this.pathBTabel+'bower_components/datatables.net-bs/';
            resp+=`
                <script src="`+plugin+`datatables/jquery.dataTables.min.js"></script>
                <script src="`+plugin+`datatables/jquery.dataTables.js"></script>

                <link rel="stylesheet" type="text/css" href="`+plugin+`datatables-bs4/css/dataTables.bootstrap4.min.css">
                <script src="`+plugin+`datatables-bs4/js/dataTables.bootstrap4.js"></script>

                <script src="`+plugin+`datatables-buttons/js/dataTables.buttons.min.js"></script>
                

                <script src="`+plugin+`datatables-buttons/js/buttons.html5.min.js"></script>

                <script src="`+plugin+`datatables-buttons/js/buttons.print.min.js"></script>

                <script src="`+plugin+`datatables-buttons/js/buttons.colVis.min.js"></script>

                <script src="`+bower+`plugins/JSZip-2.5.0/jszip.min.js"></script>
                <script src="`+bower+`plugins/pdfmake-0.1.36/pdfmake.min.js"></script>
                <script src="`+bower+`plugins/pdfmake-0.1.36/vfs_fonts.js"></script>
            `;
        }
        resp+=`
            <script src='`+this.pathFMfc+`library/excel/lib/xlsx.js'></script>
            <script src='`+this.pathFMfc+`library/sflib.js'></script>
            <script src='`+this.pathFMfc+`library/sfTabel.js'></script>
        `;
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