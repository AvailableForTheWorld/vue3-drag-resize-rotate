export default class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static zero(): Vector;
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    neg(): Vector;
    mul(v: Vector | number): number | Vector;
    norm(): number;
    unit(): Vector;
    rotate(angle: number): Vector;
    angle(): number;
    static _equals(a: number, b: number, precision?: number): boolean;
    equals(v: Vector, precision?: number): boolean;
    clone(): Vector;
    static rad(deg: number): number;
    static deg(rad: number): number;
}
