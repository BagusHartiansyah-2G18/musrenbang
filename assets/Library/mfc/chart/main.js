
class Chart_ extends LibMfcHtml{
    ex1=(v)=>{
      // {id:'',h:'',w:''}
      return `<canvas id="${v.id}" 
                  style="display: block; width: ${v.w}; height: ${v.h};" 
                  width="${v.w}" height="${v.h}" 
                  class="chartjs-render-monitor">
              </canvas>`;
    }
    morirs=(v)=>{
      // {id:''}
      return `<div id="${v.id}" class="graph"></div>`;
    }
    js=(url,html,jquery)=>{
      if(jquery!=undefined){
        jquery=`<script src="`+url+`library/jquery.js"></script>`;
      }
      let fhtml=`
        <script src="`+url+`library/charts/charts-bundle/Chart.bundle.js"></script>

        <script src="`+url+`library/charts/c3charts/c3.min.js"></script>
        <script src="`+url+`library/charts/c3charts/d3-5.4.0.min.js"></script>
        
        <script src="`+url+`library/charts/charts-bundle/Chart.bundle.js"></script>
        <script src="`+url+`library/charts/charts-bundle/chartjs.js"></script>

        <script src="`+url+`library/charts/morris-bundle/morris.js"></script>
        <script src="`+url+`library/charts/morris-bundle/raphael.min.js"></script>

        <script src="`+url+`library/charts/sparkline/jquery.sparkline.js"></script>     
      `;
      if(html!=undefined){
        return this.delUndife(jquery)+fhtml;
      }
      return document.write(jquery+fhtml);
    }
}