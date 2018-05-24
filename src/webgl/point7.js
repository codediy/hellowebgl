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

    // 绘制多个点
    gl.drawArrays(gl.POINTS,0,n);

    // 绘制一个点
    // gl.drawArrays(gl.POINTS,0,1);

    // 绘制第二个点
    // gl.drawArrays(gl.POINTS,1,1);
}

function initVertexBuffers(gl){
    /***************点位置****************************/
    // 点的位置数据
    let vertices = new Float32Array([
        0.0,0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    let n = 3;

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
    // 绑定到顶顶缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    // 将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_Position);

    /***************点尺寸****************************/
    // 点的尺寸数据
    let sizes = new Float32Array([
        10.0,20.0,30.0
    ]);
    // 点位置变量
    let a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    if (a_PointSize < 0) {
        console.error("a_PointSize获取失败");
        return -1;
    }
    
    // 创建缓冲区对象
    let sizeBuffer = gl.createBuffer();
    if (!sizeBuffer) {
        console.error("创建缓存对象失败");
        return -1;
    }
    
    // 绑定到尺寸缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);

    // 将数据写入到缓冲区
    gl.bufferData(gl.ARRAY_BUFFER,sizes,gl.STATIC_DRAW);

    // 将缓冲区对象分配给a_PointSize 
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,0,0);

    // 开启缓存对象到变量
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}