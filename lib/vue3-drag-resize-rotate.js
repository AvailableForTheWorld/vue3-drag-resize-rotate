var He = Object.defineProperty;
var je = (x, e, n) => e in x ? He(x, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : x[e] = n;
var de = (x, e, n) => (je(x, typeof e != "symbol" ? e + "" : e, n), n);
import { defineComponent as Ke, toRefs as Ze, ref as v, computed as G, onMounted as Fe, onBeforeUnmount as Ge, watch as z, openBlock as W, createElementBlock as J, normalizeClass as Ee, unref as R, normalizeStyle as Ye, renderSlot as We, Fragment as Je, renderList as Qe, withModifiers as Ve, createCommentVNode as et } from "vue";
class s {
  constructor(e, n) {
    de(this, "x");
    de(this, "y");
    if (typeof e != "number" || typeof n != "number")
      throw new Error("Must provide numeric parameters");
    this.x = e, this.y = n;
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
  static _equals(e, n, H = Number.EPSILON) {
    return Math.abs(e - n) < H;
  }
  equals(e, n = Number.EPSILON) {
    return e instanceof s ? s._equals(this.x, e.x, n) && s._equals(this.y, e.y, n) : !1;
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
const q = 8, Me = 20, Xe = {
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
let Se = (x = 21) => crypto.getRandomValues(new Uint8Array(x)).reduce((e, n) => (n &= 63, n < 36 ? e += n.toString(36) : n < 62 ? e += (n - 26).toString(36).toUpperCase() : n > 62 ? e += "-" : e += "_", e), "");
const tt = ["onMousedown"], at = {
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
      selectable: Q,
      draggable: Le,
      resizable: V,
      rotatable: xe,
      hasActiveContent: ze,
      aspectRatio: ee,
      dragHandle: te,
      dragCancel: ge,
      outerBound: o,
      innerBound: i,
      onDrag: ae,
      onResize: le
    } = Ze(n), Y = v(ye.value), ue = v(!1), g = v(H.value), p = v(he.value), B = v((C == null ? void 0 : C.value) || 0), _ = v((A == null ? void 0 : A.value) || 0), h = v(j == null ? void 0 : j.value), N = v(!1), D = v(!1), ne = v(!1), re = v(!1), se = v(!1), I = v([]), l = v({
      mouseX: 0,
      mouseY: 0,
      curX: 0,
      curY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0
    }), oe = v(!1), ie = v(!1), ve = v(!1), f = () => ({
      x: g.value,
      y: p.value,
      width: B.value,
      height: _.value,
      angle: h.value
    }), pe = (t) => {
      g.value = t.x, p.value = t.y, B.value = t.width, _.value = t.height, h.value = t.angle;
    }, $ = v(f()), Ae = G(() => {
      const t = [];
      return V.value && t.push("tl", "tr", "br", "bl"), xe.value && t.push("ro"), t;
    }), Be = G(() => ({
      active: Y.value,
      selectable: Q.value,
      dragging: D.value,
      contentActive: ue.value
    })), _e = G(() => ({
      left: g.value - B.value / 2 + "px",
      top: p.value - _.value / 2 + "px",
      width: B.value + "px",
      height: _.value + "px",
      transform: "rotate(" + h.value + "deg)"
    })), ke = () => {
      Q.value && e("content-active");
    }, Ce = G(() => (t) => {
      const u = {
        width: `${q}px`,
        height: `${q}px`
      };
      return t == "ro" ? (u.top = `${-q / 2 - Me}px`, u.marginLeft = `${-q / 2 + 1}px`) : (u[Xe.y[t[0]]] = `${-q / 2}px`, u[Xe.x[t[1]]] = `${-q / 2}px`), u;
    }), De = (t) => {
      ue.value = t, Y.value = !t;
    }, Ie = (t) => {
      const u = l.value, r = new s(t.pageX - u.mouseX, t.pageY - u.mouseY);
      if (I.value.includes("ro")) {
        let y = new s(0, -A.value / 2 - Me);
        const M = s.rad(u.rotation);
        y = y.rotate(M);
        const m = y.add(r);
        oe.value || (e("rotate-start", $.value), oe.value = !0), h.value = s.deg(m.angle()) + 90, se.value = !0, e("rotate", f());
      } else {
        const y = I.value.includes("r") ? 1 : -1, M = I.value.includes("b") ? 1 : -1, m = s.rad(l.value.rotation);
        let a;
        if (ee.value) {
          let E = new s(y * l.value.width / 2, M * l.value.height / 2);
          E = E.rotate(m).unit(), a = E.mul(E.mul(r));
        } else
          a = r;
        let w = a.rotate(-m), k = l.value.curX + a.x / 2, X = l.value.curY + a.y / 2, S = l.value.width + y * w.x, L = l.value.height + M * w.y, b = k - S / 2, K = X - L / 2, Z = k + S / 2, F = X + L / 2;
        if (o.value && h.value === 0) {
          let E = o.value.x - o.value.width / 2, O = o.value.y - o.value.height / 2, T = o.value.x + o.value.width / 2, U = o.value.y + o.value.height / 2, c = 0, d = 0;
          b < E && (c = E - b), Z > T && (c = T - Z), K < O && (d = O - K), F > U && (d = U - F), (c != 0 || d != 0) && (ee.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        if (i.value && h.value === 0) {
          let E = i.value.x - i.value.width / 2, O = i.value.y - i.value.height / 2, T = i.value.x + i.value.width / 2, U = i.value.y + i.value.height / 2, c = 0, d = 0;
          b > E && (c = E - b), Z < T && (c = T - Z), K > O && (d = O - K), F < U && (d = U - F), (c != 0 || d != 0) && (ee.value ? c / a.x < d / a.y ? (a.y += c * a.y / a.x, a.x += c) : (a.x += d * a.x / a.y, a.y += d) : (a.x += c, a.y += d));
        }
        g.value = l.value.curX + a.x / 2, p.value = l.value.curY + a.y / 2, w = a.rotate(-m), B.value = l.value.width + y * w.x, _.value = l.value.height + M * w.y, le && le.value && pe(le.value(f())), ie.value || (e("resize-start", $.value), ie.value = !0), re.value = !0, e("resize", f());
      }
    }, Pe = (t) => {
      const u = {
        mouseX: t.pageX,
        mouseY: t.pageY
      }, r = {
        x: u.mouseX - l.value.mouseX,
        y: u.mouseY - l.value.mouseY
      };
      let y = l.value.curX + r.x, M = l.value.curY + r.y, m = y - C.value / 2, a = M - A.value / 2, w = y + C.value / 2, k = M + A.value / 2;
      if (o.value && h.value === 0) {
        let X = o.value.x - o.value.width / 2, S = o.value.y - o.value.height / 2, L = o.value.x + o.value.width / 2, b = o.value.y + o.value.height / 2;
        m < X && (r.x -= m - X), w > L && (r.x -= w - L), a < S && (r.y -= a - S), k > b && (r.y -= k - b);
      }
      if (i.value && h.value === 0) {
        let X = i.value.x - i.value.width / 2, S = i.value.y - i.value.height / 2, L = i.value.x + i.value.width / 2, b = i.value.y + i.value.height / 2;
        m > X && (r.x -= m - X), w < L && (r.x -= w - L), a > S && (r.y -= a - S), k < b && (r.y -= k - b);
      }
      g.value = l.value.curX + r.x, p.value = l.value.curY + r.y, ae && ae.value && pe(ae.value(f())), ve.value || (e("drag-start", $), ve.value = !0), ne.value = !0, e("drag", f());
    }, Re = () => {
      N.value = !1, l.value = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        curX: g.value,
        curY: p.value,
        rotation: h.value
      }, re.value && (e("resize-stop", f()), e("change", f())), se.value && (e("rotate-stop", f()), e("change", f()));
    }, qe = (t, u) => {
      !V.value || !Y.value || (ie.value = !1, oe.value = !1, $.value = f(), N.value = !0, re.value = !1, se.value = !1, l.value = {
        mouseX: u.pageX,
        mouseY: u.pageY,
        x: t.x,
        y: t.y,
        width: B.value,
        height: _.value,
        curX: g.value,
        curY: p.value,
        rotation: h.value
      }, I.value = t);
    }, Ne = () => {
      D.value = !1, l.value = {
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
    }, me = (t) => {
      P() && (t.stopPropagation(), N.value && Ie(t), D.value && Pe(t));
    }, ce = () => {
      N.value && Re(), D.value && Ne();
    }, $e = () => {
      e("deselect"), Y.value = !1;
    }, we = () => {
      $e();
    }, Oe = (t) => {
      if (ue.value || !Q.value)
        return;
      t.preventDefault(), t.stopPropagation();
      const u = t.target;
      Y.value = !0, !(t.button && t.button !== 0) && (e("clicked", t), !(!Le.value || !Y.value) && (te.value && (u.getAttribute("data-drag-handle") !== "true" || u.getAttribute("data-drag-cancel") === null) || (D.value = !0, ne.value = !1, ve.value = !1, $.value = f(), l.value.mouseX = t.pageX, l.value.mouseY = t.pageY, l.value.curX = g.value, l.value.curY = p.value)));
    }, be = () => {
      ce();
    }, P = () => N.value || D.value, Te = () => {
      document.addEventListener("mousemove", me), document.addEventListener("mouseup", ce), document.addEventListener("mousedown", we), document.addEventListener("mouseleave", be);
    }, Ue = () => {
      document.removeEventListener("mousemove", me), document.removeEventListener("mouseup", ce), document.removeEventListener("mousedown", we), document.removeEventListener("mouseleave", be);
    };
    return Fe(() => {
      if (Te(), te.value) {
        const t = document.querySelectorAll(te.value);
        t && t.forEach((u) => {
          u.setAttribute("data-drag-handle", Se());
        });
      }
      if (ge.value) {
        const t = document.querySelectorAll(ge.value);
        t && t.forEach((u) => {
          u.setAttribute("data-drag-cancel", Se());
        });
      }
    }), Ge(() => {
      Ue();
    }), z(Y, (t) => {
      e(t ? "select" : "deselect");
    }), z(ye, (t) => {
      Y.value = t;
    }), z(ze, (t) => {
      De(t);
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
    }), (t, u) => (W(), J("div", {
      class: Ee(["drr", R(Be)]),
      style: Ye(R(_e)),
      onDblclick: ke,
      onMousedown: Oe
    }, [
      We(t.$slots, "default"),
      (W(!0), J(Je, null, Qe(R(Ae), (r) => (W(), J("div", {
        key: r,
        class: Ee(["drr-stick", ["drr-stick-" + r, R(V) ? "" : "not-resizable"]]),
        style: Ye(R(Ce)(r)),
        onMousedown: Ve((y) => qe(r, y), ["stop", "prevent"])
      }, null, 46, tt))), 128)),
      R(xe) ? (W(), J("div", at)) : et("", !0)
    ], 38));
  }
});
fe.install = (x) => {
  x.component(fe.__name, fe);
};
export {
  fe as default
};
