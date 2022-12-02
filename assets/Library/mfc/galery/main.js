
class Galery_ extends LibMfcHtml{
    ex1=(v)=>{
        return `
        <div class="${v.clsCard}">
            ${v.htmlFile}
            <div class="${v.clsCardBody}">
                ${v.htmlBody}
            </div>
          </div>
        `;
    }
    ex2=(v)=>{
        return `
        `;
    }
}