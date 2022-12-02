class Modal_ extends LibMfcHtml{
    ex1=(v)=>{
      // cls : modal-fullscreen, modal-dialog-centered ,modal-dialog-scrollable 
      return this.mo1({
        id:"modalEx1",
        cls:v.cls,
        clsHeader:v.clsHeader,
        idHeader:"modalH1",
        clsBody:v.clsBody,
        idBody:"modalB1",
        idFooter:"modalF1"
      })
    }
    mo1=(v)=>{
      return `
      <div class="modal fade" id="${v.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ${v.cls}">
          <div class="modal-content">
            <div class="modal-header ${v.clsHeader}">
              <div id="${v.idHeader}">
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ${v.clsBody}" id="${v.idBody}">
            </div>
            <div class="modal-footer" id="${v.idFooter}">
              
            </div>
          </div>
        </div>
      </div>`;
    }
    setMo=(v)=>{
      const header=document.getElementById(`modalH${v.ex}`),
            body=document.getElementById(`modalB${v.ex}`),
            footer=document.getElementById(`modalF${v.ex}`);
      header.innerHTML=v.header;
      body.innerHTML=v.body;
      footer.innerHTML=v.footer;
    }

    btnClose=(cls)=>{
      return `
        <button type="button" class="btn ${cls}" data-bs-dismiss="modal">Close</button>
      `
    }

    toast=(v)=>{ 
      // active : fade show 
      return `
        <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"/></svg>
            <strong class="me-auto">Bootstrap</strong>
            <small class="text-muted">11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      `;
    }
}