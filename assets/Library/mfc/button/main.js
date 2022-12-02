
class Button_ extends LibMfcHtml{
    ex1=(v)=>{
      // button_.ex1(
      //   {
      //     clsGroup:"",
      //     listBtn :[
      //       {
      //         text:`<span class="mdi mdi-web"></span>`,
      //         cls:" btn-sm btn-primary",
      //         attr:""
      //       },{
      //         text:"Btn Group",
      //         cls:" btn-sm btn-secondary",
      //         attr:""
      //       },{
      //         text:"Ex1",
      //         cls:" btn-sm btn-success",
      //         attr:""
      //       }
            
      //     ],
      //   }
      // )
      let chtml=``;
      v.listBtn.forEach((cv,ci) => {
        chtml+=this.ex2(cv);
      });
      return `
      <div class="btn-group ${this.delUndife(v.clsGroup)}">
        ${chtml}
      </div>`;
    }
    ex2=(v)=>{
      // {
      //   text:`<span class="mdi mdi-web"></span>`,
      //   cls:" btn-sm btn-primary",
      //   attr:""
      // }
      return `<button type="button" class="btn ${v.cls}" ${this.delUndife(v.cls)}>${this.delUndife(v.text)}</button>`;
    }
    ex3=(v)=>{ //Popover 
      // posisi : top right bottom left
      return ` <button type="button" class="btn ${v.cls}" 
                  data-bs-container="body" 
                  data-bs-toggle="popover" 
                  data-bs-placement="${v.posisi}" 
                  data-bs-content="${v.msg}">
                ${v.text}
              </button>`;
    }
}