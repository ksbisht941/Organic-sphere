varying vec3 vNormal;
varying float vPerlinStrength;
varying vec3 vColor;

void main()
{
    float test = dot(vNormal, vec3(0.0, - 1.0, 0.0));
    gl_FragColor = vec4(vColor, 1.0);
    // float temp = vPerlinStrength + 0.0;
    // temp *= 1.5;
    // gl_FragColor = vec4(temp, temp, temp, 1.0 );
}