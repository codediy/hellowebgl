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
        precision mediump float;
        uniform float u_Width;
        uniform float u_Height;

        void main() {
            // 设置片元数据
            gl_FragColor = vec4(
                    gl_FragCoord.x/u_Width,0.0,
                    gl_FragCoord.y/u_Height,1.0
                );
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

    
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl){
    
    // 点的位置与颜色数据
    let vertices = new Float32Array([
         0.0,   0.5,
        -0.5,  -0.5,
         0.5,  -0.5,
    ]);
    let n = 3;
   
    // 创建缓冲区对象
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.error("创建缓存对象失败");
        return -1;
    }
    // 绑定到顶顶缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    let  a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position < 0) {
        console.error("获取a_Position失败");
        return -1;
    }
    // 读取a_Position数据 每隔5个读取其中开始2个
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_Position);

    // 读取位置信息

    let u_Width = gl.getUniformLocation(gl.program,'u_Width');
    if (u_Width < 0) {
        console.error("获取u_Width失败");
        return -1;
    }
    let u_Height = gl.getUniformLocation(gl.program,'u_Height');
    if (u_Height < 0) {
        console.error("获取u_Height失败");
        return -1;
    }

    gl.uniform1f(u_Width,gl.drawingBufferWidth);
    gl.uniform1f(u_Height,gl.drawingBufferHeight);
    
    

    return n;
}