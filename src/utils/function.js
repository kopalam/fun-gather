/**
 * User: vickyzhe@outlook.com
 * Date: 2018/10/11
 * Time: 下午12:10
 *
 */
function dataURLtoBlob(urlData){

  var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob( [ab] , {type : 'image/png'});
}

function readFileAsDataURL(file, callback) {
  var a = new FileReader()
  a.onload = e => {
    callback(dataURLtoBlob(e.target.result))
  }
  a.readAsDataURL(file)
}



export default {
  readFileAsDataURL
}
