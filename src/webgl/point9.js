import {getContext,setShader} from './../lib/webgl';

export default function(){
    // 获取webgl
    const canvas = document.getElementById('webgl');
    const gl = getContext(canvas);

    

    // 着色器代码
    let v_shader_source = `
        attribute vec4 a_Position;
        // 接受js数据
        attribute vec4 a_Color;
        // 传递到片元数据
        varying vec4 v_Color; 

        void main() {
            gl_Position = a_Position;
            gl_PointSize = 10.0;
            v_Color = a_Color;
        }
    `;
    let f_shader_source =`
        
        precision mediump float;
        // 读取顶点数据
        varying vec4 v_Color;

        void main() {
            // 设置片元数据
            gl_FragColor = v_Color;
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

    // 绘制多个点
    // gl.drawArrays(gl.POINTS,0,n);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
}

function initVertexBuffers(gl){
    
    // 点的位置与颜色数据
    let verticesColors = new Float32Array([
         0.0,   0.5,  1.0, 0.0, 0.0,
        -0.5,  -0.5,  0.0, 1.0, 0.0,
         0.5,  -0.5,  0.0, 0.0, 1.0
    ]);
    let n = 3;
    // 每个元素的大小
    let FSIZE = verticesColors.BYTES_PER_ELEMENT;
   
    // 创建缓冲区对象
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.error("创建缓存对象失败");
        return -1;
    }
    // 绑定到顶顶缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

    let  a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position < 0) {
        console.error("获取a_Position失败");
        return -1;
    }
    let  a_Color = gl.getAttribLocation(gl.program,'a_Color');
    if (a_Color < 0) {
        console.error("获取a_Color失败");
        return -1;
    }

    // 读取a_Position数据 每隔5个读取其中开始2个
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 5,0);
    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_Position);

    // 读取a_PointSize数据 每隔3个读取其中末尾3个
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 5,FSIZE * 2);
    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_Color);
   
    return n;
}