
class Teditor_ extends LibMfcHtml{
    ex1=(v)=>{
      // tinymce.get('id').getContent()
      // tinymce.get('id').setContent(_.member[_.ind].dt[ind].keteranganS);
      // teditor_.ex1({
      //   cls:'',
      //   id:'isi',
      //   value:'Bagus H',
      //   clsArea:''
      // })
      return `
      <div class="${v.cls}">
        <div class="kt-wizard-v3__content" data-ktwizard-type="step-content">
            <div class="kt-form__section kt-form__section--first">
                <div class="kt-wizard-v3__form">
                    <div class="form-group">
                        <textarea id="${v.id}" name="${v.id}">${v.value}</textarea>
                    </div>
                </div>
            </div>
        </div>
      </div>`;
    }
    lib=(assert,head)=>{
      if(Number(head)){
          return `
          <script src="${assert}textEditor/plugins/global/plugins.bundle.js" type="text/javascript"></script>
          <script src="${assert}textEditor/js/scripts.bundle.js" type="text/javascript"></script>
          `;
      }
      let fdata=[
          "textEditor/plugins/custom/tinymce/plugins/advlist/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/autolink/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/lists/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/link/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/image/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/charmap/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/print/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/preview/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/hr/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/anchor/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/pagebreak/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/searchreplace/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/wordcount/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/visualblocks/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/visualchars/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/code/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/fullscreen/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/insertdatetime/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/nonbreaking/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/save/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/table/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/directionality/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/emoticons/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/template/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/paste/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/textpattern/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/responsivefilemanager/plugin.js",
          "textEditor/plugins/custom/tinymce/plugins/emoticons/js/emojis.js"
      ];
      let fhasil="";
      fdata.forEach((key,v) => {
        fhasil+=`<script src="${assert+key}" type="text/javascript"></script>`;
      });
      return `
          <script src="${assert}textEditor/plugins/custom/tinymce/tinymce.bundle.js" type="text/javascript"></script>
          <script src="${assert}textEditor/plugins/custom/tinymce/tinymce.bundle.js" type="text/javascript"></script>
          <link rel="stylesheet" href="${assert}textEditor/plugins/custom/tinymce/skins/ui/oxide/skin.min.css" type="text/css" media="all">
      `+fhasil;
  }
}