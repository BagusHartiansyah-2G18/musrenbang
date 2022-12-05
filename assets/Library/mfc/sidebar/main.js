
class Sidebar_ extends LibMfcHtml{
  ex1=(v)=>{
    return `
      <div class="${v.cls}" style="${v.style}">
        ${
          v.htmlJudul
          +v.htmlNav
          +v.footer
        }
      </div>
    `;
  }
}