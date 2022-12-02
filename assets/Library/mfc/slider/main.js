class Slider_ extends LibMfcHtml{
    ex1=(v)=>{
      let cbtn=``,cslider=``,caktif='';
      v.list.forEach((cv,ci) => {
        caktif='';
        if(ci==0){
          caktif="active";
        }
        cbtn+=`<button type="button" data-bs-target="#${v.id}" data-bs-slide-to="${ci}" class="${caktif}"></button>`;
        cslider+=`
          <div class="carousel-item ${caktif}">
            ${cv.file}
            <div class="carousel-caption ${cv.cls}" ${cv.attr}>
              ${cv.html}
            </div>
          </div>
        `;
      });
      return `
      <div id="${v.id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          ${cbtn}
        </div>
        <div class="carousel-inner">
          ${cslider}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${v.id}"  data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${v.id}"  data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;
    }
    getFileH=(v)=>{ // height
      return `
        <div style="height:${v.height}; background-color:${v.color};opacity: ${v.opacityDiv};">
          <img style="opacity:${v.opacityImg};" src="${v.url}" width="100%" height="100%">
        </div>
      `;
    }
}