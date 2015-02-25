a = new Float32Array(44100);
function tt(){
for (i = 0; i<a.length; i++)
{
    q = i%6;
    x = i/6|0;
    if (q==0 || q==1 || q==2)
        a[i] = -1+2*Math.random();
    else
    {
        if (x%3==1)
            a[i] = 0.3;
        else
            a[i] = 0.4;
    }
}
}
tt();
function mx(){
    tt();
    g.bufferData(g.ARRAY_BUFFER, a, g.DYNAMIC_DRAW);
    g.drawArrays(g.TRIANGLES,0,3300);
}
b = g.createBuffer();
g.bindBuffer(g.ARRAY_BUFFER, b);
g.bufferData(g.ARRAY_BUFFER, a, g.DYNAMIC_DRAW);
g.vertexAttribPointer(0, 3, g.FLOAT, false, 6*4, 0);
g.vertexAttribPointer(1, 3, g.FLOAT, false, 6*4, 3*4);
p = g.createProgram();
function z(t, s){
    t = g.createShader(t);
    g.shaderSource(t, s);
    g.compileShader(t);
    g.attachShader(p, t);
}
z(g.VERTEX_SHADER, 'attribute vec3 p; attribute vec3 pc; varying lowp vec4 c; void main(void){gl_Position = vec4(p, 1.0); c = vec4(pc, 1.0);}');
z(g.FRAGMENT_SHADER, 'varying lowp vec4 c; void main(void){gl_FragColor=c;}');
g.linkProgram(p);
g.useProgram(p);
g.enable(g.DEPTH_TEST);
g.enableVertexAttribArray(0);
g.enableVertexAttribArray(1);
g.drawArrays(g.TRIANGLES,0,3300);
m = new AudioContext();
s = m.createScriptProcessor(2048, 0, 1);
y = 0;
s.onaudioprocess = function(e){
    var d = e.outputBuffer.getChannelData(0);
    console.log('x');
    for (var j=0; j<d.length; j++)
        d[j] = a[((y+j)/96)%a.length]*0.2;
    y += d.length;
}
s.connect(m.destination);
requestAnimationFrame(function z(){
    mx();
    requestAnimationFrame(z);
});
