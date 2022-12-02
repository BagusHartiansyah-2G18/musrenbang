
class Dropdonw_ extends LibMfcHtml{
    ex1=(v)=>{
        // dropdonw_.dmenu=[];
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item judulFunc" href="#">dropdon ex1</a>`});
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="#">Settings</a>`});

        // dropdonw_.ex1({
        //     clsDropdonw:"",
        //     clsUl:" text-small",
        //     clsLi:"",
        //     htmlJudul:`
        //       <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        //         <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
        //       </a>`,
        // })
        let hhtml=`
            <div class="dropdown ${v.clsDropdonw}">
                ${v.htmlJudul}
                <ul class="dropdown-menu text-small">
            `;
        this.dmenu.forEach((cv,ci) => {
            hhtml+=`
                <li>${cv.htmlLi}</li>
            `;
        });
        return hhtml+=`</ul>
        </div>`;
    }
    ex2=(v)=>{
        // clsGroup : btn-group  (arah bawah), dropend kanan  Dropup atas dropstart kiri

        // dropdonw_.dmenu=[];
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item judulFunc" href="#">dropdon ex1</a>`});
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="#">Settings</a>`});
        // dropdonw_.ex2({
        //     clsGroup:"",
        //     cls:" text-small",
        //     text:"",
        //     attr:""
        // })
        let dhtml="";
        this.dmenu.forEach((cv,ci) => {
            dhtml+=`
                <li>${cv.htmlLi}</li>
            `;
        });
        return `
        <div class="btn-group ${v.clsGroup}">
          <button type="button" class="btn ${v.cls}" ${v.attr}>${v.text}</button>
          <button type="button" class="btn ${v.cls} dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            ${dhtml}
          </ul>
        </div>
        `;
    }
    ex3=(v)=>{
        // clsGroup : btn-group  (arah bawah), dropend kanan  Dropup atas dropstart kiri

        // dropdonw_.dmenu=[];
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item judulFunc" href="#">dropdon ex1</a>`});
        // dropdonw_.dmenu.push({htmlLi:`<a class="dropdown-item" href="#">Settings</a>`});
        // dropdonw_.ex2({
        //     clsGroup:"",
        //     cls:" text-small",
        //     text:"",
        //     attr:""
        // })
        let dhtml="";
        this.dmenu.forEach((cv,ci) => {
            dhtml+=`
                <li>${cv.htmlLi}</li>
            `;
        });
        return `
        <div class="btn-group ${v.clsGroup}">
          <button type="button" class="btn dropdown-toggle ${v.cls}" ${v.attr} data-bs-toggle="dropdown" aria-expanded="false">${v.text}</button>
          <ul class="dropdown-menu">
            ${dhtml}
          </ul>
        </div>
        `;
    }
}