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
    // 设置点的大小
    gl.vertexAttrib1f(a_PointSize,20.0);
    // 注册点击事件
    canvas.onmousedown = function(ev){
        click(ev,gl,canvas,a_Position);
    }  
}

// 所有已点击的点位置
let g_points = [];

function click(ev,gl,canvas,a_Position){
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    g_points.push([x,y]);

    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;

    for (let i = 0; i < len; i = i + 1) {
        let xy = g_points[i];
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
        
        gl.drawArrays(gl.POINTS,0,1);
    }
}
