import {getContext,setShader} from './../lib/webgl';

export default function(){
    // 获取webgl
    const canvas = document.getElementById('webgl');
    const gl = getContext(canvas);

    

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
    
    // 初始化gl
    setShader(gl,v_shader_source,f_shader_source);
   

    // 绘制点
    gl.drawArrays(gl.POINTS,0,1);
}