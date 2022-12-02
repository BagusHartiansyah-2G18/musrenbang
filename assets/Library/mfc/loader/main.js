class Loader_{
    ex1=()=>{
        return `
            <div class="loader_bg1">
                <div class="loader1"><img src="./file/loading.gif" alt="#" /></div>
            </div>
        `;
    }
    ex2=(cls)=>{
        // cls :spinner-grow text-primary | spinner-border text-info 
        return `
            <div class="${cls}" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
    }
}