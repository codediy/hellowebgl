import {getContext,setShader} from './../lib/webgl';

export default function(){
    // 获取webgl
    const canvas = document.getElementById('webgl');
    const gl = getContext(canvas);

    

    // 着色器代码
    let v_shader_source = `
        attribute vec4 a_Position;
        attribute float a_PointSize;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = a_PointSize;
        }
    `;
    let f_shader_source =`
        void main() {
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;
    
    // 初始化gl
    setShader(gl,v_shader_source,f_shader_source);
    
    // 获取OpenGL ES点位置变量地址
    let a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position < 0) {
        console.error("获取点位置信息失败");
    }
    let a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    if (a_PointSize < 0) {
        console.error("获取点位置信息失败");
    }
    // 设置点的位置    
    // gl.vertexAttrib3f(a_Position,0.5,0.0,0.0);
    // gl.vertexAttrib1f(a_Position,-0.5);
    // gl.vertexAttrib2f(a_Position,0.5,0.0);
    gl.vertexAttrib4f(a_Position,-0.5,0.0,0.0,1.0);

    // 设置点的大小
    gl.vertexAttrib1f(a_PointSize,20.0);

    // 绘制点
    gl.drawArrays(gl.POINTS,0,1);
}