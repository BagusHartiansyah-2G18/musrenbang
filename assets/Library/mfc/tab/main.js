
class Tab_ extends LibMfcHtml{
    ex1=(v)=>{ //accordion
      return `
      <div class="accordion-item ${v.clsTab}">
        <h4 class="accordion-header ${v.clsHeader}" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${v.id}" aria-expanded="true" aria-controls="collapseOne">
            ${v.htmlHeader}
          </button>
        </h4>
        <div id="${v.id}" class="accordion-collapse collapse ${v.clsHBody}" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body ${v.clsBody}">
            ${v.htmlBody}
          </div>
        </div>
      </div>`;
    }
    ex2=(v)=>{
      let thtml=``,ttab=``;
      v.tab.forEach((cv,ci) => {
        ttab+=`<button class="nav-link ${this.delUndife(cv.active)}" 
                id="${v.id+"-"+ci}-btn" data-bs-toggle="tab" data-bs-target="#${v.id+"-"+ci}-tab" type="button" role="tab" 
                aria-controls="nav-home" aria-selected="${(cv.active!=undefined?true:false)}">${cv.text}</button>`;
        thtml+=`
          <div class="tab-pane fade ${this.delUndife(cv.active)} ${cv.cls}" id="${v.id+"-"+ci}-tab" role="tabpanel" aria-labelledby="nav-home-tab">
            ${cv.html}
          </div>
        `;
      });
      return `
        <nav>
          <div class="nav nav-tabs mb-3" id="${v.id}" role="tablist">
            ${ttab}
          </div>
        </nav>
        <div class="tab-content" id="${v.id}Content">
          ${thtml} 
        </div>
      `;
    }
}