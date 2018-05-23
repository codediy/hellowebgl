function getContext(canvas,type='webgl',bgcolor=[0.0,0.0,0.0,1.0]){
    let gl = canvas.getContext(type);
    if (!gl) {
        console.error("获取webgl失败");
        return false;
    }
    // 设置背景色
    gl.clearColor(...bgcolor);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return gl;
}

function setShader(gl,vsource,fsource){
    let program = createProgram(gl,vsource,fsource);
    if (!program) {
        console.error("创建程序对象失败");
        return false;
    }

    gl.useProgram(program);
    // 保存program到gl
    gl.program = program;

    return true;
}
function createProgram(gl,vsource,fsource){
    let vshader = loadShader(gl,gl.VERTEX_SHADER,vsource);
    let fshader = loadShader(gl,gl.FRAGMENT_SHADER,fsource);

    if (!vshader || !fshader) {
        return false;
    }

    let program = gl.createProgram();
    if (!program) {
        console.error("创建Program对象失败");
        return false;
    }

    gl.attachShader(program,vshader);
    gl.attachShader(program,fshader);

    gl.linkProgram(program);

    let linked = gl.getProgramParameter(program,gl.LINK_STATUS);
    if (!linked) {
        let error = gl.getProgramInfoLog(program);
        console.error("链接程序对象失败:"+error);
        gl.deleteProgram(program);
        gl.deleteShader(fshader);
        gl.deleteShader(vshader);
        return false;
    }
    return program;
}
function loadShader(gl,type,source){
    let shader = gl.createShader(type);
    if (shader == null) {
        console.error("创建Shader对象失败");
        return false;
    }

    gl.shaderSource(shader,source);
    gl.compileShader(shader);

    let compiled = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if (!compiled) {
        let error = gl.getShaderInfoLog(shader);
        console.error("编译着色器代码失败"+error);
        gl.deleteShader(shader);
        return false;
    }
    return shader;
}



export {
    getContext,
    setShader
}