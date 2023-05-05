var He = Object.defineProperty;
var je = (f, e, l) => e in f ? He(f, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : f[e] = l;
var fe = (f, e, l) => (je(f, typeof e != "symbol" ? e + "" : e, l), l);
import { defineComponent as Ke, toRefs as Ze, ref as v, computed as W, onMounted as Fe, onBeforeUnmount as Ge, watch as L, openBlock as J, createElementBlock as Q, normalizeClass as Ee, unref as q, normalizeStyle as Ye, renderSlot as We, Fragment as Je, renderList as Qe, withModifiers as Ve, createCommentVNode as et } from "vue";
class s {
  constructor(e, l) {
    fe(this, "x");
    fe(this, "y");
    if (typeof e != "number" || typeof l != "number")
      throw new Error("Must provide numeric parameters");
    this.x = e, this.y = l;
  }
  static zero() {
    return new s(0, 0);
  }
  add(e) {
    return new s(this.x + e.x, this.y + e.y);
  }
  sub(e) {
    return new s(this.x - e.x, this.y - e.y);
  }
  neg() {
    return new s(-this.x, -this.y);
  }
  mul(e) {
    if (typeof e == "number")
      return new s(this.x * e, this.y * e);
    if (e instanceof s)
      return this.x * e.x + this.y * e.y;
    throw new Error("Parameter should be a number or a vector");
  }
  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  unit() {
    let e = this.norm();
    return new s(this.x / e, this.y / e);
  }
  rotate(e) {
    return new s(
      this.x * Math.cos(e) - this.y * Math.sin(e),
      this.x * Math.sin(e) + this.y * Math.cos(e)
    );
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  static _equals(e, l, C = Number.EPSILON) {
    return Math.abs(e - l) < C;
  }
  equals(e, l = Number.EPSILON) {
    return e instanceof s ? s._equals(this.x, e.x, l) && s._equals(this.y, e.y, l) : !1;
  }
  clone() {
    return new s(this.x, this.y);
  }
  static rad(e) {
    return e * Math.PI / 180;
  }
  static deg(e) {
    return e * 180 / Math.PI;
  }
}
const N = 8, Me = 20, Xe = {
  y: {
    t: "top",
    m: "marginTop",
    b: "bottom"
  },
  x: {
    l: "left",
    m: "marginLeft",
    r: "right"
  }
};
let _e = (f = 21) => crypto.getRandomValues(new Uint8Array(f)).reduce((e, l) => (l &= 63, l < 36 ? e += l.toString(36) : l < 62 ? e += (l - 26).toString(36).toUpperCase() : l > 62 ? e += "-" : e += "_", e), "");
const tt = ["onMousedown"], at = {
  key: 0,
  class: "ro-stick-handle"
}, lt = /* @__PURE__ */ Ke({
  __name: "drr",
  props: {
    x: { default: 0 },
    y: { default: 0 },
    width: { default: 0 },
    height: { default: 0 },
    angle: { default: 0 },
    selected: { type: Boolean, default: !1 },
    selectable: { type: Boolean, default: !0 },
    draggable: { type: Boolean, default: !0 },
    resizable: { type: Boolean, default: !0 },
    rotatable: { type: Boolean, default: !0 },
    hasActiveContent: { type: Boolean, default: !1 },
    aspectRatio: { type: Boolean, default: !1 },
    dragHandle: { default: "" },
    dragCancel: { default: "" },
    outerBound: { default: null },
    innerBound: { default: null },
    onDrag: null,
    onResize: null
  },
  emits: [
    "select",
    "deselect",
    "clicked",
    "drag",
    "resize",
    "rotate",
    "rotate-start",
    "rotate-stop",
    "drag-start",
    "drag-stop",
    "resize-start",
    "resize-stop",
    "change",
    "content-active"
  ],
  setup(f, { emit: e }) {
    const l = f, {
      x: C,
      y: j,
      width: I,
      height: z,
      angle: K,
      selected: ye,
      selectable: V,
      draggable: Se,
      resizable: ee,
      rotatable: xe,
      hasActiveContent: Le,
      aspectRatio: te,
      dragHandle: ae,
      dragCancel: ge,
      outerBound: o,
      innerBound: i,
      onDrag: le,
      onResize: ue
    } = Ze(l), Y = v(ye.value), ne = v(!1), g = v(C.value), p = v(j.value), k = v((I == null ? void 0 : I.value) || 0), A = v((z == null ? void 0 : z.value) || 0), y = v(K == null ? void 0 : K.value), O = v(!1), D = v(!1), re = v(!1), se = v(!1), oe = v(!1), P = v([]), u = v({
      mouseX: 0,
      mouseY: 0,
      curX: 0,
      curY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0
    }), ie = v(!1), ve = v(!1), ce = v(!1), h = () => ({
      x: g.value,
      y: p.value,
      width: k.value,
      height: A.value,
      angle: y.value
    }), pe = (t) => {
      g.value = t.x, p.value = t.y, k.value = t.width, A.value = t.height, y.value = t.angle;
    }, $ = v(h()), ze = W(() => {
      const t = [];
      return ee.value && t.push("tl", "tr", "br", "bl"), xe.value && t.push("ro"), t;
    }), ke = W(() => ({
      active: Y.value,
      selectable: V.value,
      dragging: D.value,
      contentActive: ne.value
    })), Ae = W(() => ({
      left: g.value - k.value / 2 + "px",
      top: p.value - A.value / 2 + "px",
      width: k.value + "px",
      height: A.value + "px",
      transform: "rotate(" + y.value + "deg)"
    })), Be = () => {
      V.value && e("content-active");
    }, Ce = W(() => (t) => {
      const n = {
        width: `${N}px`,
        height: `${N}px`
      };
      return t == "ro" ? (n.top = `${-N / 2 - Me}px`, n.marginLeft = `${-N / 2 + 1}px`) : (n[Xe.y[t[0]]] = `${-N / 2}px`, n[Xe.x[t[1]]] = `${-N / 2}px`), n;
    }), Ie = (t) => {
      ne.value = t, Y.value = !t;
    }, De = (t) => {
      const n = u.value, r = new s(t.pageX - n.mouseX, t.pageY - n.mouseY);
      if (P.value.includes("ro")) {
        let x = new s(0, -z.value / 2 - Me);
        const M = s.rad(n.rotation);
        x = x.rotate(M);
        const m = x.add(r);
        ie.value || (e("rotate-start", $.value), ie.value = !0), y.value = s.deg(m.angle()) + 90, oe.value = !0, e("rotate", h());
      } else {
        const x = P.value.includes("r") ? 1 : -1, M = P.value.includes("b") ? 1 : -1, m = s.rad(u.value.rotation);
        let a;
        if (te.value) {
          let E = new s(x * u.value.width / 2, M * u.value.height / 2);
          E = E.rotate(m).unit(), a = E.mul(E.mul(r));
        } else
          a = r;
        let w = a.rotate(-m), B = u.value.curX + a.x / 2, X = u.value.curY + a.y / 2, _ = u.value.width + x * w.x, S = u.value.height + M * w.y, b = B - _ / 2, Z = X - S / 2, F = B + _ / 2, G = X + S / 2;
        if (o.value && y.value === 0) {
          let E = o.value.x - o.value.width / 2, T = o.value.y - o.value.height / 2, U = o.value.x + o.value.width / 2, H = o.value.y + o.value.height / 2, c = 0, d = 0;
          b < E && (c = E - b), F > U && (c = U - F), Z < T && (d = T - Z), G > H && (d = H - G), (c != 0 || d != 0) && (te.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        if (i.value && y.value === 0) {
          let E = i.value.x - i.value.width / 2, T = i.value.y - i.value.height / 2, U = i.value.x + i.value.width / 2, H = i.value.y + i.value.height / 2, c = 0, d = 0;
          b > E && (c = E - b), F < U && (c = U - F), Z > T && (d = T - Z), G < H && (d = H - G), (c != 0 || d != 0) && (te.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        g.value = u.value.curX + a.x / 2, p.value = u.value.curY + a.y / 2, w = a.rotate(-m), k.value = u.value.width + x * w.x, A.value = u.value.height + M * w.y, ue && ue.value && pe(ue.value(h())), ve.value || (e("resize-start", $.value), ve.value = !0), se.value = !0, e("resize", h());
      }
    }, Pe = (t) => {
      const n = {
        mouseX: t.pageX,
        mouseY: t.pageY
      }, r = {
        x: n.mouseX - u.value.mouseX,
        y: n.mouseY - u.value.mouseY
      };
      let x = u.value.curX + r.x, M = u.value.curY + r.y, m = x - I.value / 2, a = M - z.value / 2, w = x + I.value / 2, B = M + z.value / 2;
      if (o.value && y.value === 0) {
        let X = o.value.x - o.value.width / 2, _ = o.value.y - o.value.height / 2, S = o.value.x + o.value.width / 2, b = o.value.y + o.value.height / 2;
        m < X && (r.x -= m - X), w > S && (r.x -= w - S), a < _ && (r.y -= a - _), B > b && (r.y -= B - b);
      }
      if (i.value && y.value === 0) {
        let X = i.value.x - i.value.width / 2, _ = i.value.y - i.value.height / 2, S = i.value.x + i.value.width / 2, b = i.value.y + i.value.height / 2;
        m > X && (r.x -= m - X), w < S && (r.x -= w - S), a > _ && (r.y -= a - _), B < b && (r.y -= B - b);
      }
      g.value = u.value.curX + r.x, p.value = u.value.curY + r.y, le && le.value && pe(le.value(h())), ce.value || (e("drag-start", $), ce.value = !0), re.value = !0, e("drag", h());
    }, Re = () => {
      O.value = !1, u.value = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        curX: g.value,
        curY: p.value,
        rotation: y.value
      }, se.value && (e("resize-stop", h()), e("change", h())), oe.value && (e("rotate-stop", h()), e("change", h()));
    }, qe = (t, n) => {
      !ee.value || !Y.value || (ve.value = !1, ie.value = !1, $.value = h(), O.value = !0, se.value = !1, oe.value = !1, u.value = {
        mouseX: n.pageX,
        mouseY: n.pageY,
        x: t.x,
        y: t.y,
        width: k.value,
        height: A.value,
        curX: g.value,
        curY: p.value,
        rotation: y.value
      }, P.value = t);
    }, Ne = () => {
      D.value = !1, u.value = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        curX: g.value,
        curY: p.value,
        rotation: y.value
      }, re.value && (e("drag-stop", h()), e("change", h()));
    }, me = (t) => {
      R() && (t.stopPropagation(), O.value && De(t), D.value && Pe(t));
    }, de = () => {
      O.value && Re(), D.value && Ne();
    }, Oe = () => {
      e("deselect"), Y.value = !1;
    }, we = () => {
      Oe();
    }, $e = (t) => {
      if (ne.value || !V.value)
        return;
      t.preventDefault(), t.stopPropagation();
      const n = t.target;
      Y.value = !0, !(t.button && t.button !== 0) && (e("clicked", t), !(!Se.value || !Y.value) && (ae.value && (n.getAttribute("data-drag-handle") !== "true" || n.getAttribute("data-drag-cancel") === null) || (D.value = !0, re.value = !1, ce.value = !1, $.value = h(), u.value.mouseX = t.pageX, u.value.mouseY = t.pageY, u.value.curX = g.value, u.value.curY = p.value)));
    }, be = () => {
      de();
    }, R = () => O.value || D.value, Te = () => {
      document.addEventListener("mousemove", me), document.addEventListener("mouseup", de), document.addEventListener("mousedown", we), document.addEventListener("mouseleave", be);
    }, Ue = () => {
      document.removeEventListener("mousemove", me), document.removeEventListener("mouseup", de), document.removeEventListener("mousedown", we), document.removeEventListener("mouseleave", be);
    };
    return Fe(() => {
      if (Te(), ae.value) {
        const t = document.querySelectorAll(ae.value);
        t && t.forEach((n) => {
          n.setAttribute("data-drag-handle", _e());
        });
      }
      if (ge.value) {
        const t = document.querySelectorAll(ge.value);
        t && t.forEach((n) => {
          n.setAttribute("data-drag-cancel", _e());
        });
      }
    }), Ge(() => {
      Ue();
    }), L(Y, (t) => {
      e(t ? "select" : "deselect");
    }), L(ye, (t) => {
      Y.value = t;
    }), L(Le, (t) => {
      Ie(t);
    }), L(C, (t) => {
      R() || (g.value = t);
    }), L(j, (t) => {
      R() || (p.value = t);
    }), L(I, (t) => {
      R() || (P.value = ["m", "r"], k.value = t);
    }), L(z, (t) => {
      R() || (P.value = ["b", "m"], A.value = t);
    }), L(K, (t) => {
      R() || (y.value = t);
    }), (t, n) => (J(), Q("div", {
      class: Ee(["drr", q(ke)]),
      style: Ye(q(Ae)),
      onDblclick: Be,
      onMousedown: $e
    }, [
      We(t.$slots, "default", {}, void 0, !0),
      (J(!0), Q(Je, null, Qe(q(ze), (r) => (J(), Q("div", {
        key: r,
        class: Ee(["drr-stick", ["drr-stick-" + r, q(ee) ? "" : "not-resizable"]]),
        style: Ye(q(Ce)(r)),
        onMousedown: Ve((x) => qe(r, x), ["stop", "prevent"])
      }, null, 46, tt))), 128)),
      q(xe) ? (J(), Q("div", at)) : et("", !0)
    ], 38));
  }
});
const ut = (f, e) => {
  const l = f.__vccOpts || f;
  for (const [C, j] of e)
    l[C] = j;
  return l;
}, he = /* @__PURE__ */ ut(lt, [["__scopeId", "data-v-dfd06ab1"]]);
he.install = (f) => {
  f.component(he.__name, he);
};
export {
  he as default
};
