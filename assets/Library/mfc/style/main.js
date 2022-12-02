
class Style_ extends LibMfcHtml{
    contentBetween=(v)=>{
        return `
        <div class="justify-content-between ${v.cls}">
            ${v.html}
        </div>
        `;
    }
    rowCol=(v)=>{
        // style_.rowCol({
        //     clsRow:" p-3",
        //     col:[
        //         {
        //             cls:"-4",
        //             html:""
        //         }
        //     ]
        // })
        let chtml=``;
        v.col.forEach((cv,ci) => {
            chtml+=`
                <div class="col${cv.cls}">
                    ${cv.html}
                </div>
            `;
        });
        return `
        <div class="row ${v.clsRow}"> 
            ${chtml}
        </div>
        `;
    }
}