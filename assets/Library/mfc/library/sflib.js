// support function library 
// let _={};
function _getKeyRay(data) {
    // digunakan untuk mendapatkan key dan judul 1 array yang didalamnya terdapat array
    ftam={
        key:[],
        judul:[]
    };
    try {// jika non array
        data[0].forEach((v,i) => {
            ftam.key.push(i);
            ftam.judul.push(v);
        });
    } catch (error) {
        
    }
    return ftam;
}