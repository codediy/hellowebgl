import {getContext,setShader} from './../lib/webgl';

export default function(){
    // 获取webgl
    const canvas = document.getElementById('webgl');
    const gl = getContext(canvas);

    

    // 着色器代码
    let v_shader_source = `
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
        }
    `;
    let f_shader_source =`
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;
    
    // 初始化gl
    setShader(gl,v_shader_source,f_shader_source);
    
    // 设置订单位置
    let n = initVertexBuffers(gl);
    if (n < 0) {
        console.error("设置顶点失败");
        return false;
    }

    // 绘制多个线段
    // gl.drawArrays(gl.LINES,0,n);

    // 绘制多个连续线段
    // gl.drawArrays(gl.LINE_STRIP,0,n);

    // 绘制连续的线段
    // gl.drawArrays(gl.LINE_LOOP,0,n);

    // 绘制三角形
    // gl.drawArrays(gl.TRIANGLES,0,n);

    // 绘制连续的三角形
    /**
     * (v0 v1 v2) 
     * (v2 v1 v3)
     */
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
    
    // 绘制带状三角形
    /**
     * (v0 v1 v2)
     * (v0 v2 v3)
     */
    // gl.drawArrays(gl.TRIANGLE_FAN,0,n);

}

function initVertexBuffers(gl){
    // 点的位置数据
    /**  
     *    v0               v2
     *  -0.5 0.5          0.5 0.5
     * 
     * 
     *    v1               v3
     * -0.5 -0.5          0.5 -0.5
     *  
     */

    let vertices = new Float32Array([
        -0.5, 0.5, 
        -0.5,-0.5,
         0.5, 0.5,
         0.5,-0.5
    ]);
    let n = 4;

    // 点位置变量
    let  a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position < 0) {
        console.error("获取a_Position失败");
        return -1;
    }

    // 创建缓冲区对象
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.error("创建缓存对象失败");
        return -1;
    }
    
    // 绑定缓存区对象到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    // 将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_Position);

    return n;
}