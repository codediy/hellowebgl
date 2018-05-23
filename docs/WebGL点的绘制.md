# 设置背景色

## 主要代码文件
src/index.html
src/webgl/hello.js

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

# 绘制点

主要代码
src/index.html
src/webgl/point.js

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