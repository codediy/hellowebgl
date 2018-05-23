export default function(){
    const canvas = document.getElementById('webgl');

    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.error("获取webgl失败");
        return false;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}