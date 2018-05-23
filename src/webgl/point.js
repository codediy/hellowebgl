export default function(){
    const canvas = document.getElementById('webgl');

    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.error("获取webgl失败");
        return false;
    }

    // 着色器代码
    let v_shader_source = `
        void main() {
            gl_Position = vec4(0.0,0.0,0.0,1.0);
            gl_PointSize = 10.0;
        }
    `;
    let f_shader_source =`
        void main() {
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;
    
    // 编译着色器代码
    let vshader = gl.createShader(gl.VERTEX_SHADER);
    if (vshader == null) {
        console.error("创建shader对象失败");
        return false;
    }
    gl.shaderSource(vshader,v_shader_source);
    gl.compileShader(vshader);
    let vcompiled = gl.getShaderParameter(vshader,gl.COMPILE_STATUS);
    if (!vcompiled) {
        let error = gl.getShaderInfoLog(vshader);
        console.error("编译着色器代码失败:"+error);
        return false;
    }

    let fshader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fshader == null) {
        console.error("创建shader对象失败");
        return false;
    }

    gl.shaderSource(fshader,f_shader_source);
    gl.compileShader(fshader);
    let fcompiled = gl.getShaderParameter(fshader,gl.COMPILE_STATUS);
    if (!fcompiled) {
        let error = gl.getShaderInfoLog(fshader);
        console.error("编译着色器代码失败:"+error);
        return false;
    }

    // 创建程序对象
    let program = gl.createProgram();
    if (!program) {
        return false;
    }

    gl.attachShader(program,vshader);
    gl.attachShader(program,fshader);
    gl.linkProgram(program);

    let linked = gl.getProgramParameter(program,gl.LINK_STATUS);
    if (!linked) {
        let error = gl.getProgramInfoLog(program);
        console.error("链接程序对象失败:"+ error);

        gl.deleteProgram(program);
        gl.deleteShader(fshader);
        gl.deleteShader(vshader);
        return false;
    }

    gl.useProgram(program);

    // 清空canvas
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制点
    gl.drawArrays(gl.POINTS,0,1);
}