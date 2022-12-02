
class Text_ extends LibMfcHtml{
    small=(v)=>{
        return `<small class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</small>`;
    }
    p=(v)=>{
        return `<p class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</p>`;
    }
    span=(v)=>{
        return `<span class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</span>`;
    }
    mark=(v)=>{
        return `<mark class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</mark>`;
    }
    del=(v)=>{
        return `<del class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</del>`;
    }
    strong=(v)=>{
        return `<strong class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</strong>`;
    }
    em=(v)=>{
        return `<em class="${this.delUndife(v.cls)}">${this.delUndife(v.text)}</em>`;
    }
}