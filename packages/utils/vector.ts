export default class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    if (typeof x !== 'number' || typeof y !== 'number') throw new Error('Must provide numeric parameters')

    this.x = x
    this.y = y
  }

  static zero() {
    return new Vector(0, 0)
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  sub(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  neg() {
    return new Vector(-this.x, -this.y)
  }

  mul(v: Vector | number) {
    if (typeof v === 'number') return new Vector(this.x * v, this.y * v)
    else if (v instanceof Vector) return this.x * v.x + this.y * v.y
    else throw new Error('Parameter should be a number or a vector')
  }

  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  unit() {
    let norm = this.norm()
    return new Vector(this.x / norm, this.y / norm)
  }

  rotate(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    )
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  static _equals(a: number, b: number, precision = Number.EPSILON) {
    return Math.abs(a - b) < precision
  }

  equals(v: Vector, precision = Number.EPSILON) {
    if (v instanceof Vector) return Vector._equals(this.x, v.x, precision) && Vector._equals(this.y, v.y, precision)
    else return false
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  static rad(deg: number) {
    return (deg * Math.PI) / 180
  }

  static deg(rad: number) {
    return (rad * 180) / Math.PI
  }
}
