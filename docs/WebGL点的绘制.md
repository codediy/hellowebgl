# 1 设置背景色

>src/index.html
>
>src/webgl/hello.js

## index.html
引入canvas标签。

## hello.js
~~~
const canvas = document.getElementById('webgl');
const gl = canvas.getContext('webgl');
~~~
获取Webgl上下文对象

~~~
gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
~~~
设置背景色
清空canvas

# 2 绘制点


>src/index.html
>
>src/webgl/point.js

## point.js

~~~
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
~~~
OpenGL ES的着色器代码保存在js的字符串中
~~~
let vshader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vshader,v_shader_source);
gl.compileShader(vshader);
~~~
gl.createShader()
gl.shaderSource()
gl.compileShader()
将js中的着色器代码进行编译处理生成着色器对象

~~~
let program = gl.createProgram();
gl.attachShader(program,vshader);
gl.attachShader(program,fshader);
~~~
创建程序对象，
将顶点着色器对象vshader和片元着色器对象添加到程序对象中

~~~
gl.linkProgram(program);
gl.useProgram(program);
~~~
使用创建的程序对象

~~~
gl.drawArrays(gl.POINTS,0,1);
~~~
绘制一个点

# 3 webgl函数封装


> src/lib/webgl.js
>
> src/webgl/point2.js

# 4 点的位置和大小修改

> src/webgl/point3.js

# 5 鼠标点击创建点

> src/webgl/point4.js

# 6 鼠标点击创建不同颜色的点

<<<<<<< HEAD
> src/webgl/point5.js

# 7 绘制多个点

> src/webgl/point6.js


# 8 绘制不同大小的多个点(多个缓冲区对象)

> src/webgl/point7.js

# 9 环志不同大小的多个点(单个缓冲区对象)

> src/webgl/point8.js

# 10 绘制不同颜色不同大小的多个点(单个缓冲区对象)

> src/webgl/point9.js

