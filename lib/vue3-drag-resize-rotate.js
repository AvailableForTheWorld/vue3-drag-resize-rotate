var He = Object.defineProperty;
var je = (x, e, n) => e in x ? He(x, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : x[e] = n;
var de = (x, e, n) => (je(x, typeof e != "symbol" ? e + "" : e, n), n);
import { defineComponent as Ke, toRefs as Ze, ref as v, computed as J, onMounted as Fe, onBeforeUnmount as Ge, watch as z, openBlock as Q, createElementBlock as V, normalizeClass as Ee, unref as D, normalizeStyle as Ye, renderSlot as We, Fragment as Je, renderList as Qe, withModifiers as Ve, createCommentVNode as et } from "vue";
let Me = (x = 21) => crypto.getRandomValues(new Uint8Array(x)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
class o {
  constructor(e, n) {
    de(this, "x");
    de(this, "y");
    if (typeof e != "number" || typeof n != "number")
      throw new Error("Must provide numeric parameters");
    this.x = e, this.y = n;
  }
  static zero() {
    return new o(0, 0);
  }
  add(e) {
    return new o(this.x + e.x, this.y + e.y);
  }
  sub(e) {
    return new o(this.x - e.x, this.y - e.y);
  }
  neg() {
    return new o(-this.x, -this.y);
  }
  mul(e) {
    if (typeof e == "number")
      return new o(this.x * e, this.y * e);
    if (e instanceof o)
      return this.x * e.x + this.y * e.y;
    throw new Error("Parameter should be a number or a vector");
  }
  norm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  unit() {
    let e = this.norm();
    return new o(this.x / e, this.y / e);
  }
  rotate(e) {
    return new o(
      this.x * Math.cos(e) - this.y * Math.sin(e),
      this.x * Math.sin(e) + this.y * Math.cos(e)
    );
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  static _equals(e, n, H = Number.EPSILON) {
    return Math.abs(e - n) < H;
  }
  equals(e, n = Number.EPSILON) {
    return e instanceof o ? o._equals(this.x, e.x, n) && o._equals(this.y, e.y, n) : !1;
  }
  clone() {
    return new o(this.x, this.y);
  }
  static rad(e) {
    return e * Math.PI / 180;
  }
  static deg(e) {
    return e * 180 / Math.PI;
  }
}
const R = 8, Xe = 20, Se = {
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
}, tt = ["onMousedown"], at = {
  key: 0,
  class: "ro-stick-handle"
}, fe = /* @__PURE__ */ Ke({
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
  setup(x, { emit: e }) {
    const n = x, {
      x: H,
      y: he,
      width: C,
      height: A,
      angle: j,
      selected: ye,
      selectable: ee,
      draggable: Le,
      resizable: te,
      rotatable: xe,
      hasActiveContent: ze,
      aspectRatio: ae,
      dragHandle: ue,
      dragCancel: ge,
      outerBound: r,
      innerBound: i,
      onDrag: K,
      onResize: Z
    } = Ze(n), Y = v(ye.value), le = v(!1), g = v(H.value), p = v(he.value), B = v((C == null ? void 0 : C.value) || 0), _ = v((A == null ? void 0 : A.value) || 0), h = v(j == null ? void 0 : j.value), q = v(!1), $ = v(!1), ne = v(!1), se = v(!1), oe = v(!1), I = v([]), u = v({
      mouseX: 0,
      mouseY: 0,
      curX: 0,
      curY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0
    }), re = v(!1), ie = v(!1), ve = v(!1), f = () => ({
      x: g.value,
      y: p.value,
      width: B.value,
      height: _.value,
      angle: h.value
    }), pe = (t) => {
      g.value = t.x, p.value = t.y, B.value = t.width, _.value = t.height, h.value = t.angle;
    }, N = v(f()), Ae = J(() => {
      const t = [];
      return te.value && t.push("tl", "tr", "br", "bl"), xe.value && t.push("ro"), t;
    }), Be = J(() => ({
      active: Y.value,
      selectable: ee.value,
      dragging: $.value,
      contentActive: le.value
    })), _e = J(() => ({
      left: `${g.value - B.value / 2}px`,
      top: `${p.value - _.value / 2}px`,
      width: `${B.value}px`,
      height: `${_.value}px`,
      transform: `rotate(${h.value}deg)`
    })), ke = () => {
      ee.value && e("content-active");
    }, Ce = J(() => (t) => {
      const l = {
        width: `${R}px`,
        height: `${R}px`
      };
      return t === "ro" ? (l.top = `${-R / 2 - Xe}px`, l.marginLeft = `${-R / 2 + 1}px`) : (l[Se.y[t[0]]] = `${-R / 2}px`, l[Se.x[t[1]]] = `${-R / 2}px`), l;
    }), $e = (t) => {
      le.value = t, Y.value = !t;
    }, Ie = (t) => {
      const l = u.value, s = new o(t.pageX - l.mouseX, t.pageY - l.mouseY);
      if (I.value.includes("ro")) {
        let y = new o(0, -A.value / 2 - Xe);
        const M = o.rad(l.rotation);
        y = y.rotate(M);
        const m = y.add(s);
        re.value || (e("rotate-start", N.value), re.value = !0), h.value = o.deg(m.angle()) + 90, oe.value = !0, e("rotate", f());
      } else {
        const y = I.value.includes("r") ? 1 : -1, M = I.value.includes("b") ? 1 : -1, m = o.rad(u.value.rotation);
        let a;
        if (ae.value) {
          let E = new o(y * u.value.width / 2, M * u.value.height / 2);
          E = E.rotate(m).unit(), a = E.mul(E.mul(s));
        } else
          a = s;
        let w = a.rotate(-m);
        const k = u.value.curX + a.x / 2, X = u.value.curY + a.y / 2, S = u.value.width + y * w.x, L = u.value.height + M * w.y, b = k - S / 2, F = X - L / 2, G = k + S / 2, W = X + L / 2;
        if (r.value && h.value === 0) {
          const E = r.value.x - r.value.width / 2, O = r.value.y - r.value.height / 2, T = r.value.x + r.value.width / 2, U = r.value.y + r.value.height / 2;
          let c = 0, d = 0;
          b < E && (c = E - b), G > T && (c = T - G), F < O && (d = O - F), W > U && (d = U - W), (c !== 0 || d !== 0) && (ae.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        if (i.value && h.value === 0) {
          const E = i.value.x - i.value.width / 2, O = i.value.y - i.value.height / 2, T = i.value.x + i.value.width / 2, U = i.value.y + i.value.height / 2;
          let c = 0, d = 0;
          b > E && (c = E - b), G < T && (c = T - G), F > O && (d = O - F), W < U && (d = U - W), (c !== 0 || d !== 0) && (ae.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        g.value = u.value.curX + a.x / 2, p.value = u.value.curY + a.y / 2, w = a.rotate(-m), B.value = u.value.width + y * w.x, _.value = u.value.height + M * w.y, Z != null && Z.value && pe(Z.value(f())), ie.value || (e("resize-start", N.value), ie.value = !0), se.value = !0, e("resize", f());
      }
    }, Pe = (t) => {
      const l = {
        mouseX: t.pageX,
        mouseY: t.pageY
      }, s = {
        x: l.mouseX - u.value.mouseX,
        y: l.mouseY - u.value.mouseY
      }, y = u.value.curX + s.x, M = u.value.curY + s.y, m = y - C.value / 2, a = M - A.value / 2, w = y + C.value / 2, k = M + A.value / 2;
      if (r.value && h.value === 0) {
        const X = r.value.x - r.value.width / 2, S = r.value.y - r.value.height / 2, L = r.value.x + r.value.width / 2, b = r.value.y + r.value.height / 2;
        m < X && (s.x -= m - X), w > L && (s.x -= w - L), a < S && (s.y -= a - S), k > b && (s.y -= k - b);
      }
      if (i.value && h.value === 0) {
        const X = i.value.x - i.value.width / 2, S = i.value.y - i.value.height / 2, L = i.value.x + i.value.width / 2, b = i.value.y + i.value.height / 2;
        m > X && (s.x -= m - X), w < L && (s.x -= w - L), a > S && (s.y -= a - S), k < b && (s.y -= k - b);
      }
      g.value = u.value.curX + s.x, p.value = u.value.curY + s.y, K != null && K.value && pe(K.value(f())), ve.value || (e("drag-start", N), ve.value = !0), ne.value = !0, e("drag", f());
    }, De = () => {
      q.value = !1, u.value = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        curX: g.value,
        curY: p.value,
        rotation: h.value
      }, se.value && (e("resize-stop", f()), e("change", f())), oe.value && (e("rotate-stop", f()), e("change", f()));
    }, Re = (t, l) => {
      !te.value || !Y.value || (ie.value = !1, re.value = !1, N.value = f(), q.value = !0, se.value = !1, oe.value = !1, u.value = {
        mouseX: l.pageX,
        mouseY: l.pageY,
        x: t.x,
        y: t.y,
        width: B.value,
        height: _.value,
        curX: g.value,
        curY: p.value,
        rotation: h.value
      }, I.value = t);
    }, qe = () => {
      $.value = !1, u.value = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        curX: g.value,
        curY: p.value,
        rotation: h.value
      }, ne.value && (e("drag-stop", f()), e("change", f()));
    }, P = () => q.value || $.value, me = (t) => {
      P() && (t.stopPropagation(), q.value && Ie(t), $.value && Pe(t));
    }, ce = () => {
      q.value && De(), $.value && qe();
    }, Ne = () => {
      e("deselect"), Y.value = !1;
    }, we = () => {
      Ne();
    }, Oe = (t) => {
      if (le.value || !ee.value)
        return;
      t.preventDefault(), t.stopPropagation();
      const l = t.target;
      Y.value = !0, !(t.button && t.button !== 0) && (e("clicked", t), !(!Le.value || !Y.value) && (ue.value && (l.getAttribute("data-drag-handle") !== "true" || l.getAttribute("data-drag-cancel") === null) || ($.value = !0, ne.value = !1, ve.value = !1, N.value = f(), u.value.mouseX = t.pageX, u.value.mouseY = t.pageY, u.value.curX = g.value, u.value.curY = p.value)));
    }, be = () => {
      ce();
    }, Te = () => {
      document.addEventListener("mousemove", me), document.addEventListener("mouseup", ce), document.addEventListener("mousedown", we), document.addEventListener("mouseleave", be);
    }, Ue = () => {
      document.removeEventListener("mousemove", me), document.removeEventListener("mouseup", ce), document.removeEventListener("mousedown", we), document.removeEventListener("mouseleave", be);
    };
    return Fe(() => {
      if (Te(), ue.value) {
        const t = document.querySelectorAll(ue.value);
        t && t.forEach((l) => {
          l.setAttribute("data-drag-handle", Me());
        });
      }
      if (ge.value) {
        const t = document.querySelectorAll(ge.value);
        t && t.forEach((l) => {
          l.setAttribute("data-drag-cancel", Me());
        });
      }
    }), Ge(() => {
      Ue();
    }), z(Y, (t) => {
      e(t ? "select" : "deselect");
    }), z(ye, (t) => {
      Y.value = t;
    }), z(ze, (t) => {
      $e(t);
    }), z(H, (t) => {
      P() || (g.value = t);
    }), z(he, (t) => {
      P() || (p.value = t);
    }), z(C, (t) => {
      P() || (I.value = ["m", "r"], B.value = t);
    }), z(A, (t) => {
      P() || (I.value = ["b", "m"], _.value = t);
    }), z(j, (t) => {
      P() || (h.value = t);
    }), (t, l) => (Q(), V("div", {
      class: Ee(["drr", D(Be)]),
      style: Ye(D(_e)),
      onDblclick: ke,
      onMousedown: Oe
    }, [
      We(t.$slots, "default"),
      (Q(!0), V(Je, null, Qe(D(Ae), (s) => (Q(), V("div", {
        key: s,
        class: Ee(["drr-stick", [`drr-stick-${s}`, D(te) ? "" : "not-resizable"]]),
        style: Ye(D(Ce)(s)),
        onMousedown: Ve((y) => Re(s, y), ["stop", "prevent"])
      }, null, 46, tt))), 128)),
      D(xe) ? (Q(), V("div", at)) : et("", !0)
    ], 38));
  }
});
fe.install = (x) => {
  x.component(fe.__name, fe);
};
export {
  fe as default
};
