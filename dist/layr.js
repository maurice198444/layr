const I = globalThis, Z = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), lt = /* @__PURE__ */ new WeakMap();
let St = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== J) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (Z && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = lt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Nt = (e) => new St(typeof e == "string" ? e : e + "", void 0, J), q = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new St(s, e, J);
}, Lt = (e, t) => {
  if (Z) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = I.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, ct = Z ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return Nt(s);
})(e) : e;
const { is: Bt, defineProperty: Ut, getOwnPropertyDescriptor: It, getOwnPropertyNames: Dt, getOwnPropertySymbols: Ft, getPrototypeOf: jt } = Object, W = globalThis, ht = W.trustedTypes, qt = ht ? ht.emptyScript : "", Wt = W.reactiveElementPolyfillSupport, z = (e, t) => e, D = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, tt = (e, t) => !Bt(e, t), dt = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ??= Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = dt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && Ut(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = It(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const s = this.properties, i = [...Dt(s), ...Ft(s)];
      for (const r of i) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, r] of s) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const r = this._$Eu(s, i);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) s.unshift(ct(r));
    } else t !== void 0 && s.push(ct(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Lt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : D).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : D;
      this._$Em = r;
      const l = o.fromAttribute(s, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? tt)(n, s) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? s ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[z("elementProperties")] = /* @__PURE__ */ new Map(), A[z("finalized")] = /* @__PURE__ */ new Map(), Wt?.({ ReactiveElement: A }), (W.reactiveElementVersions ??= []).push("2.1.2");
const et = globalThis, pt = (e) => e, F = et.trustedTypes, ut = F ? F.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, At = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, Ct = "?" + m, Vt = `<${Ct}>`, k = document, R = () => k.createComment(""), H = (e) => e === null || typeof e != "object" && typeof e != "function", st = Array.isArray, Gt = (e) => st(e) || typeof e?.[Symbol.iterator] == "function", Q = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, vt = />/g, b = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, mt = /"/g, Et = /^(?:script|style|textarea|title)$/i, Mt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), a = Mt(1), O = Mt(2), x = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), _t = /* @__PURE__ */ new WeakMap(), w = k.createTreeWalker(k, 129);
function Pt(e, t) {
  if (!st(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Kt = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
  for (let l = 0; l < s; l++) {
    const c = e[l];
    let p, u, d = -1, v = 0;
    for (; v < c.length && (o.lastIndex = v, u = o.exec(c), u !== null); ) v = o.lastIndex, o === P ? u[1] === "!--" ? o = gt : u[1] !== void 0 ? o = vt : u[2] !== void 0 ? (Et.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = b) : u[3] !== void 0 && (o = b) : o === b ? u[0] === ">" ? (o = r ?? P, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, p = u[1], o = u[3] === void 0 ? b : u[3] === '"' ? mt : ft) : o === mt || o === ft ? o = b : o === gt || o === vt ? o = P : (o = b, r = void 0);
    const f = o === b && e[l + 1].startsWith("/>") ? " " : "";
    n += o === P ? c + Vt : d >= 0 ? (i.push(p), c.slice(0, d) + At + c.slice(d) + m + f) : c + m + (d === -2 ? l : f);
  }
  return [Pt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class N {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, c = this.parts, [p, u] = Kt(t, s);
    if (this.el = N.createElement(p, i), w.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = w.nextNode()) !== null && c.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(At)) {
          const v = u[o++], f = r.getAttribute(d).split(m), U = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: n, name: U[2], strings: f, ctor: U[1] === "." ? Qt : U[1] === "?" ? Xt : U[1] === "@" ? Zt : V }), r.removeAttribute(d);
        } else d.startsWith(m) && (c.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Et.test(r.tagName)) {
          const d = r.textContent.split(m), v = d.length - 1;
          if (v > 0) {
            r.textContent = F ? F.emptyScript : "";
            for (let f = 0; f < v; f++) r.append(d[f], R()), w.nextNode(), c.push({ type: 2, index: ++n });
            r.append(d[v], R());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ct) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(m, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += m.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(e, t, s = e, i) {
  if (t === x) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = H(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = C(e, r._$AS(e, t.values), r, i)), t;
}
class Yt {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? k).importNode(s, !0);
    w.currentNode = r;
    let n = w.nextNode(), o = 0, l = 0, c = i[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let p;
        c.type === 2 ? p = new B(n, n.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (p = new Jt(n, this, t)), this._$AV.push(p), c = i[++l];
      }
      o !== c?.index && (n = w.nextNode(), o++);
    }
    return w.currentNode = k, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class B {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = C(this, t, s), H(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = N.createElement(Pt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new Yt(r, this), o = n.u(this.options);
      n.p(s), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = _t.get(t.strings);
    return s === void 0 && _t.set(t.strings, s = new N(t)), s;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new B(this.O(R()), this.O(R()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = pt(t).nextSibling;
      pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = C(this, t, s, 0), o = !H(t) || t !== this._$AH && t !== x, o && (this._$AH = t);
    else {
      const l = t;
      let c, p;
      for (t = n[0], c = 0; c < n.length - 1; c++) p = C(this, l[i + c], s, c), p === x && (p = this._$AH[c]), o ||= !H(p) || p !== this._$AH[c], p === h ? t = h : t !== h && (t += (p ?? "") + n[c + 1]), this._$AH[c] = p;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Qt extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Xt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Zt extends V {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = C(this, t, s, 0) ?? h) === x) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const te = et.litHtmlPolyfillSupport;
te?.(N, B), (et.litHtmlVersions ??= []).push("3.3.3");
const ee = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = r = new B(t.insertBefore(R(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
const it = globalThis;
let $ = class extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ee(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
};
$._$litElement$ = !0, $.finalized = !0, it.litElementHydrateSupport?.({ LitElement: $ });
const se = it.litElementPolyfillSupport;
se?.({ LitElement: $ });
(it.litElementVersions ??= []).push("4.2.2");
const rt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const ie = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: tt }, re = (e = ie, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(l) {
      const c = this[o];
      t.call(this, l), this.requestUpdate(o, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function G(e) {
  return (t, s) => typeof s == "object" ? re(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
function S(e) {
  return G({ ...e, state: !0, attribute: !1 });
}
const Ot = { ATTRIBUTE: 1 }, zt = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Tt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
};
const T = zt(class extends Tt {
  constructor(e) {
    if (super(e), e.type !== Ot.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
  }
  update(e, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const s = e.element.classList;
    for (const i of this.st) i in t || (s.remove(i), this.st.delete(i));
    for (const i in t) {
      const r = !!t[i];
      r === this.st.has(i) || this.nt?.has(i) || (r ? (s.add(i), this.st.add(i)) : (s.remove(i), this.st.delete(i)));
    }
    return x;
  }
});
const Rt = "important", ne = " !" + Rt, oe = zt(class extends Tt {
  constructor(e) {
    if (super(e), e.type !== Ot.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, s) => {
      const i = e[s];
      return i == null ? t : t + `${s = s.includes("-") ? s : s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(e, [t]) {
    const { style: s } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? s.removeProperty(i) : s[i] = null);
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const n = typeof r == "string" && r.endsWith(ne);
        i.includes("-") || n ? s.setProperty(i, n ? r.slice(0, -11) : r, n ? Rt : "") : s[i] = r;
      }
    }
    return x;
  }
}), xt = "layr-fonts", ae = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Geist:wght@400;500;600&display=swap", nt = () => {
  if (typeof document > "u" || document.getElementById(xt)) return;
  const e = document.createElement("link");
  e.id = xt, e.rel = "stylesheet", e.href = ae, document.head.appendChild(e);
}, le = ["unknown", "unavailable"], K = (e) => e == null || e === "" || le.includes(String(e)), _ = (e, t = 1) => e.toFixed(t).replace(".", ","), X = (e) => {
  if (K(e)) return null;
  const t = typeof e == "string" ? parseFloat(e) : e;
  return Number.isFinite(t) ? t : null;
}, yt = (e) => e.split(".")[0], Ht = (e, t) => {
  const s = new CustomEvent("hass-more-info", {
    detail: { entityId: t },
    bubbles: !0,
    composed: !0
  });
  e.dispatchEvent(s);
}, ce = async (e, t, s) => {
  const r = `history/period/${new Date(Date.now() - s * 36e5).toISOString()}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only`;
  try {
    const o = (await e.callApi("GET", r))?.[0] ?? [], l = [];
    for (const c of o) {
      const p = parseFloat(c.state);
      Number.isFinite(p) && l.push(p);
    }
    return l;
  } catch {
    return [];
  }
}, bt = {
  door: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <circle class="filled" cx="13.5" cy="12" r="0.9" />
    </svg>
  `,
  pot: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <line x1="3" y1="11" x2="21" y2="11" />
      <circle cx="12" cy="8" r="1.2" />
      <path d="M5 11v6.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-6.5" />
      <path d="M5 13.5h-1.7M19 13.5h1.7" />
    </svg>
  `,
  sofa: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M5 12c0-2 1.4-3.2 3.2-3.2h7.6c1.8 0 3.2 1.2 3.2 3.2" />
      <path d="M5 12v4M3.5 12.5v3.5" />
      <path d="M19 12v4M20.5 12.5v3.5" />
      <path d="M3.5 16h17v2.2H3.5z" />
      <line x1="12" y1="12.5" x2="12" y2="16" />
      <path d="M5 18.2v1.6M19 18.2v1.6" />
    </svg>
  `,
  bed: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 18v-7c0-1 1-2 2-2h14c1 0 2 1 2 2v7" />
      <path d="M3 14h18" />
      <path d="M6 11h4v3H6z" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  `,
  bath: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 12h18v3c0 1.5-1 3-3 3H6c-2 0-3-1.5-3-3v-3z" />
      <path d="M5 12V6.5a2.5 2.5 0 0 1 5 0" />
      <circle class="filled" cx="10" cy="8" r="0.9" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  `,
  desk: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 10h18v2H3z" />
      <path d="M5 12v9M19 12v9" />
      <path d="M5 17h14" />
      <path d="M9 7v3M9 7h4M13 7v-3" />
    </svg>
  `,
  toilet: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M6 4h12v6H6z" />
      <path d="M6 10c0 3 1 5 3 6h6c2-1 3-3 3-6" />
      <path d="M9 16v4M15 16v4" />
    </svg>
  `,
  garden: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M12 3v18" />
      <path d="M12 7c-2-2-5-2-7 0 0 3 3 5 7 5" />
      <path d="M12 11c-2-2-5-1-6 1 0 3 3 4 6 3" />
      <path d="M12 7c2-2 5-2 7 0 0 3-3 5-7 5" />
    </svg>
  `,
  garage: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-6 9 6v9H3z" />
      <path d="M3 14h18M3 17h18" />
    </svg>
  `,
  default: a`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-7 9 7v9c0 1-1 1-1 1H4s-1 0-1-1z" />
    </svg>
  `
}, j = {
  bolt: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path class="filled" d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  `,
  drop: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
    </svg>
  `,
  thermometer: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M12 4a2 2 0 0 1 2 2v7.5a4 4 0 1 1-4 0V6a2 2 0 0 1 2-2z" />
      <circle class="filled" cx="12" cy="17" r="2.2" />
    </svg>
  `,
  gauge: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M12 16l4-4" />
      <circle class="filled" cx="12" cy="16" r="1.2" />
    </svg>
  `,
  leaf: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13z" />
      <path d="M8 16c3-4 6-6 9-7" />
    </svg>
  `,
  sun: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <circle class="filled" cx="12" cy="12" r="3.5" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  `,
  drops: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M8 4c2.5 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1.5-4 4-7z" />
      <path class="filled" d="M17 12c1.4 1.7 2 2.8 2 3.8a2 2 0 0 1-4 0c0-1 .6-2.1 2-3.8z" />
    </svg>
  `,
  default: a`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  `
}, ot = q`
  :host {
    --mn-bg: #e6e1d8;
    --mn-bg-light: #f3eee5;
    --mn-bg-dark: #cdc5b8;
    --mn-text: #2d2820;
    --mn-text-mid: #6d6759;
    --mn-text-dim: #a39d8f;
    --mn-text-off: #c0b8a8;
    --mn-accent: #b8743a;
    --mn-accent-light: #d6904b;
    --mn-accent-glow: rgba(184, 116, 58, 0.5);

    --mn-shadow-out: -7px -7px 16px var(--mn-bg-light), 7px 7px 16px var(--mn-bg-dark);
    --mn-shadow-out-sm: -3px -3px 8px var(--mn-bg-light), 3px 3px 8px var(--mn-bg-dark);
    --mn-shadow-in: inset -4px -4px 10px var(--mn-bg-light), inset 4px 4px 10px var(--mn-bg-dark);

    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

    display: block;
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
  }
`;
var he = Object.defineProperty, de = Object.getOwnPropertyDescriptor, M = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? de(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && he(t, s, r), r;
};
const wt = a`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
    />
  </svg>
`, pe = a`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="7 14 12 9 17 14" />
  </svg>
`, ue = a`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
`, ge = a`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="7 10 12 15 17 10" />
  </svg>
`, ve = (e) => {
  if (K(e)) return "—";
  const t = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(t) ? "—" : `${_(t, 1)}°`;
}, fe = (e) => {
  if (K(e)) return null;
  const t = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(t) ? null : `${Math.round(t)}%`;
}, me = (e) => e === 0 ? "geschlossen" : e === 100 ? "offen" : `${e}% offen`;
let y = class extends $ {
  constructor() {
    super(), this._expanded = !1, this._isDraggingSlider = !1, this._draftBrightness = null, this._activePointerId = null, this._toggleExpand = () => {
      this._expanded = !this._expanded;
    }, this._toggleLight = () => {
      this._config.light_entity && this.hass.callService("light", "toggle", {
        entity_id: this._config.light_entity
      });
    }, this._onSliderPointerDown = (e) => {
      e.preventDefault();
      const t = e.currentTarget;
      this._activePointerId = e.pointerId, t.setPointerCapture(e.pointerId), this._isDraggingSlider = !0, this._updateBrightnessFromPointer(e);
    }, this._onSliderPointerMove = (e) => {
      this._isDraggingSlider && this._activePointerId === e.pointerId && this._updateBrightnessFromPointer(e);
    }, this._onSliderPointerUp = (e) => {
      if (this._activePointerId !== e.pointerId) return;
      const t = e.currentTarget;
      try {
        t.releasePointerCapture(e.pointerId);
      } catch {
      }
      this._isDraggingSlider = !1, this._activePointerId = null, this._draftBrightness !== null && (this._commitBrightness(this._draftBrightness), this._draftBrightness = null);
    }, this._adjustSetpoint = (e) => {
      if (!this._config.climate_entity || !this._climateState) return;
      const t = this._climateState.attributes.temperature ?? 20, s = this._climateState.attributes.min_temp ?? 7, i = this._climateState.attributes.max_temp ?? 35, r = Math.max(s, Math.min(i, t + e));
      r !== t && this.hass.callService("climate", "set_temperature", {
        entity_id: this._config.climate_entity,
        temperature: r
      });
    }, this._startLongPress = (e) => {
      this._stopLongPress(), this._longPressTimer = window.setTimeout(() => {
        this._longPressInterval = window.setInterval(() => {
          this._adjustSetpoint(e);
        }, 140);
      }, 400);
    }, this._stopLongPress = () => {
      this._longPressTimer && (clearTimeout(this._longPressTimer), this._longPressTimer = void 0), this._longPressInterval && (clearInterval(this._longPressInterval), this._longPressInterval = void 0);
    }, this._coverOpen = () => {
      this._config.cover_entity && this.hass.callService("cover", "open_cover", {
        entity_id: this._config.cover_entity
      });
    }, this._coverClose = () => {
      this._config.cover_entity && this.hass.callService("cover", "close_cover", {
        entity_id: this._config.cover_entity
      });
    }, this._coverStop = () => {
      this._config.cover_entity && this.hass.callService("cover", "stop_cover", {
        entity_id: this._config.cover_entity
      });
    }, this._handleQuickAccess = () => {
      const e = this._config.quick_access;
      if (!e) return;
      const t = yt(e.entity), s = e.tap_action || "toggle";
      this.hass.callService(t, s, { entity_id: e.entity });
    }, nt();
  }
  // ---- Required Lovelace hooks ------------------------------------------
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this._config = { ...e };
  }
  getCardSize() {
    return this._expanded ? 6 : 2;
  }
  shouldUpdate(e) {
    if (!this._config) return !1;
    if (e.has("_config") || e.has("_expanded") || e.has("_isDraggingSlider") || e.has("_draftBrightness"))
      return !0;
    const t = e.get("hass");
    return t ? this._getWatchedEntities().some((i) => t.states[i] !== this.hass.states[i]) : !0;
  }
  _getWatchedEntities() {
    const e = [], t = this._config;
    if (t.temperature_entity && e.push(t.temperature_entity), t.humidity_entity && e.push(t.humidity_entity), t.light_entity && e.push(t.light_entity), t.climate_entity && e.push(t.climate_entity), t.cover_entity && e.push(t.cover_entity), t.quick_access?.entity && e.push(t.quick_access.entity), t.switches)
      for (const s of t.switches) e.push(s.entity);
    return e;
  }
  // ---- Entity getters ---------------------------------------------------
  get _tempState() {
    return this._config.temperature_entity ? this.hass?.states[this._config.temperature_entity] : void 0;
  }
  get _humidityState() {
    return this._config.humidity_entity ? this.hass?.states[this._config.humidity_entity] : void 0;
  }
  get _lightState() {
    return this._config.light_entity ? this.hass?.states[this._config.light_entity] : void 0;
  }
  get _climateState() {
    return this._config.climate_entity ? this.hass?.states[this._config.climate_entity] : void 0;
  }
  get _coverState() {
    return this._config.cover_entity ? this.hass?.states[this._config.cover_entity] : void 0;
  }
  get _quickAccessState() {
    return this._config.quick_access?.entity ? this.hass?.states[this._config.quick_access.entity] : void 0;
  }
  // ---- Derived properties -----------------------------------------------
  get _lightOn() {
    return this._lightState?.state === "on";
  }
  get _supportsDimming() {
    if (!this._lightState) return !1;
    const e = this._lightState.attributes.supported_color_modes;
    return !e || e.length === 0 ? !1 : e.some((t) => t !== "onoff");
  }
  get _brightnessPct() {
    if (this._draftBrightness !== null) return this._draftBrightness;
    if (!this._lightOn) return 0;
    const e = this._lightState.attributes.brightness;
    return e === void 0 ? 100 : Math.round(e / 255 * 100);
  }
  get _coverPosition() {
    const e = this._coverState?.attributes.current_position;
    return e === void 0 ? 0 : Math.round(e);
  }
  get _hasAnyControls() {
    return !!this._lightState || !!this._climateState || !!this._coverState || !!this._config.switches?.length;
  }
  // ============================================================
  // RENDER
  // ============================================================
  render() {
    if (!this._config || !this.hass) return a``;
    const e = {
      "layr-room": !0,
      active: this._lightOn,
      expanded: this._expanded,
      "read-only": !this._hasAnyControls
    }, t = (this._brightnessPct / 100).toFixed(2);
    return a`
      <ha-card class=${T(e)} style=${oe({ "--brightness": t })}>
        ${this._renderTopRow()} ${this._renderStatsArea()}
        ${this._hasAnyControls ? a`
              <div
                class="expand-handle"
                @click=${this._toggleExpand}
                role="button"
                aria-label="Steuerelemente ein-/ausblenden"
                tabindex="0"
              ></div>
              ${this._renderControls()}
            ` : h}
      </ha-card>
    `;
  }
  // ---- Top row (icon + name) -------------------------------------------
  _renderTopRow() {
    const e = this._config.icon || "default", t = bt[e] ?? bt.default, s = this._config.name || "Raum";
    return a`
      <div class="row-top">
        <div class="room-header">
          <div class="icon">${t}</div>
          <div class="name-rest">${s}</div>
        </div>
        <div class="status-col"></div>
      </div>
    `;
  }
  // ---- Stats area (temp + humidity + quick-access) ----------------------
  _renderStatsArea() {
    const e = ve(this._tempState?.state), t = this._climateState?.attributes.temperature, s = fe(this._humidityState?.state);
    return a`
      <div class="stats-area">
        <div class="stats">
          <div class="temp-block">
            <div class="value-primary">${e}</div>
            ${t !== void 0 ? a`
                  <div class="value-secondary">
                    <span class="sec-label">Soll</span>
                    <span class="sec-num">${_(t)}°</span>
                  </div>
                ` : h}
          </div>
          ${s !== null ? a`
                <div class="humidity-block">
                  <div class="humidity-value">${s}</div>
                  <div class="humidity-label">Luftfeuchte</div>
                </div>
              ` : h}
        </div>
        ${this._renderQuickAccess()}
      </div>
    `;
  }
  // ---- Quick-access button ---------------------------------------------
  _renderQuickAccess() {
    const e = this._config.quick_access;
    if (!e) return h;
    const t = this._quickAccessState, s = t?.state === "on", i = e.name || t?.attributes.friendly_name || "Quick";
    return a`
      <div class="quick-access ${s ? "on" : ""}">
        <button
          class="quick-btn"
          type="button"
          @click=${this._handleQuickAccess}
          aria-label="${i} schalten"
        >
          ${wt}
        </button>
        <span class="quick-label">${i}</span>
      </div>
    `;
  }
  // ---- Controls panel (expanded) ---------------------------------------
  _renderControls() {
    return a`
      <div class="controls">
        <div class="controls-inner">
          ${this._lightState ? this._renderLightControl() : h}
          ${this._climateState ? this._renderClimateControl() : h}
          ${this._coverState ? this._renderCoverControl() : h}
          ${this._config.switches?.length ? this._renderSwitches() : h}
        </div>
      </div>
    `;
  }
  // ---- Light control (slider + power) ----------------------------------
  _renderLightControl() {
    const e = this._brightnessPct, t = this._supportsDimming, s = this._lightOn || e > 0;
    return a`
      <div class=${T({ "control-group": !0, "light-off": !s })}>
        <div class="control-label">
          <span class="key">Helligkeit</span>
          ${t ? a`<span class="val">${s ? `${e}%` : "aus"}</span>` : h}
        </div>
        <div class="light-toggle-row">
          <button
            class="power-btn ${s ? "on" : ""}"
            type="button"
            @click=${this._toggleLight}
            aria-label="Licht ein/aus"
          >
            ${wt}
          </button>
          ${t ? a`
                <div
                  class="slider ${this._isDraggingSlider ? "dragging" : ""}"
                  @pointerdown=${this._onSliderPointerDown}
                  @pointermove=${this._onSliderPointerMove}
                  @pointerup=${this._onSliderPointerUp}
                  @pointercancel=${this._onSliderPointerUp}
                >
                  <div class="slider-fill" style="width: ${e}%"></div>
                  <div class="slider-thumb" style="left: ${e}%"></div>
                </div>
              ` : h}
        </div>
      </div>
    `;
  }
  // ---- Climate control (stepper) ---------------------------------------
  _renderClimateControl() {
    const e = this._climateState.attributes.temperature ?? 0, t = this._climateState.attributes.preset_mode, s = t ? t.charAt(0).toUpperCase() + t.slice(1) : "";
    return a`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Heizung Soll</span>
          ${s ? a`<span class="val">${s}</span>` : h}
        </div>
        <div class="stepper">
          <button
            class="step-btn"
            type="button"
            @click=${() => this._adjustSetpoint(-0.5)}
            @pointerdown=${() => this._startLongPress(-0.5)}
            @pointerup=${this._stopLongPress}
            @pointerleave=${this._stopLongPress}
            @pointercancel=${this._stopLongPress}
            aria-label="Setpoint verringern"
          >
            −
          </button>
          <div class="step-display">
            <span class="num">${_(e)}</span><span class="unit">°C</span>
          </div>
          <button
            class="step-btn"
            type="button"
            @click=${() => this._adjustSetpoint(0.5)}
            @pointerdown=${() => this._startLongPress(0.5)}
            @pointerup=${this._stopLongPress}
            @pointerleave=${this._stopLongPress}
            @pointercancel=${this._stopLongPress}
            aria-label="Setpoint erhöhen"
          >
            +
          </button>
        </div>
      </div>
    `;
  }
  // ---- Cover control (up / stop / down) --------------------------------
  _renderCoverControl() {
    const e = this._coverPosition, t = me(e);
    return a`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Rolladen</span>
          <span class="val">${t}</span>
        </div>
        <div class="cover-controls">
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverOpen}
            aria-label="Rolladen hoch"
          >
            ${pe}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverStop}
            aria-label="Rolladen stop"
          >
            ${ue}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverClose}
            aria-label="Rolladen runter"
          >
            ${ge}
          </button>
        </div>
      </div>
    `;
  }
  // ---- Switch list -----------------------------------------------------
  _renderSwitches() {
    return a`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Schalten</span>
        </div>
        <div class="switch-list">
          ${this._config.switches.map((e) => {
      const t = this.hass.states[e.entity], s = t?.state === "on", i = e.name || t?.attributes.friendly_name || e.entity;
      return a`
              <button
                class="switch-pill ${s ? "on" : ""}"
                type="button"
                @click=${() => this._toggleSwitch(e.entity)}
              >
                <span class="switch-name">${i}</span>
                <svg class="switch-power-ico" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
                  />
                </svg>
              </button>
            `;
    })}
        </div>
      </div>
    `;
  }
  _updateBrightnessFromPointer(e) {
    const s = e.currentTarget.getBoundingClientRect(), i = Math.max(0, Math.min(100, (e.clientX - s.left) / s.width * 100));
    this._draftBrightness = Math.round(i);
  }
  _commitBrightness(e) {
    if (!this._config.light_entity) return;
    if (e === 0) {
      this.hass.callService("light", "turn_off", {
        entity_id: this._config.light_entity
      });
      return;
    }
    const t = Math.round(e / 100 * 255);
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.light_entity,
      brightness: t
    });
  }
  // ---- Switches & Quick-access -----------------------------------------
  _toggleSwitch(e) {
    this.hass.callService(yt(e), "toggle", { entity_id: e });
  }
  // ---- Lifecycle cleanup -----------------------------------------------
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopLongPress();
  }
};
y.styles = q`
    ${ot}

    .layr-room {
      background: var(--mn-bg);
      border-radius: 22px;
      box-shadow: var(--mn-shadow-out);
      padding: 22px;
      transition: box-shadow 0.3s var(--ease);
      overflow: hidden;
      position: relative;
      color: var(--mn-text);
      border: none;
    }

    .layr-room.active {
      box-shadow: var(--mn-shadow-in);
    }

    .layr-room.read-only {
      padding-bottom: 26px;
    }

    .layr-room.read-only::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 4px;
      background:
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px),
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px),
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px);
      background-size: 5px 5px;
      background-position:
        0 0,
        5px 0,
        10px 0;
      background-repeat: no-repeat;
      opacity: 0.4;
    }

    /* ===== TOP ROW ===== */
    .row-top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 20px;
    }

    .room-header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      transition: box-shadow 0.5s var(--ease);
      flex-shrink: 0;
    }

    .room-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition:
        stroke 0.4s var(--ease),
        filter 0.4s var(--ease);
    }

    .room-svg .filled {
      fill: currentColor;
      stroke: none;
    }

    .layr-room.active .icon {
      box-shadow:
        0 0 calc(var(--brightness, 0.8) * 12px) var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .layr-room.active .room-svg {
      stroke: var(--mn-accent);
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }

    .name-rest {
      font-family: 'Fraunces', serif;
      font-size: 22px;
      font-weight: 500;
      color: var(--mn-text);
      letter-spacing: -0.005em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
      line-height: 1.05;
    }

    .status-col {
      flex-shrink: 0;
    }

    /* ===== STATS AREA ===== */
    .stats-area {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
      position: relative;
      z-index: 1;
    }

    .stats {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 0;
    }

    .temp-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .humidity-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 36px;
      padding-bottom: 1px;
    }

    .value-primary {
      font-family: 'Fraunces', serif;
      font-size: 26px;
      font-weight: 300;
      color: var(--mn-text);
      letter-spacing: -0.02em;
      line-height: 1.05;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .value-secondary {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      margin-top: 4px;
      line-height: 1;
    }

    .value-secondary .sec-label {
      opacity: 0.7;
      margin-right: 3px;
    }

    .humidity-value {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      font-weight: 400;
      color: var(--mn-text);
      line-height: 1;
      letter-spacing: -0.01em;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .humidity-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      margin-top: 4px;
      line-height: 1;
      opacity: 0.85;
    }

    /* ===== QUICK ACCESS ===== */
    .quick-access {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .quick-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transition:
        background 0.3s var(--ease),
        color 0.3s var(--ease),
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
      -webkit-tap-highlight-color: transparent;
      padding: 0;
    }

    .quick-btn:active {
      transform: scale(0.94);
    }

    .quick-btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .quick-access.on .quick-btn {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      box-shadow:
        0 0 14px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .quick-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      transition: color 0.3s var(--ease);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
      text-align: center;
      line-height: 1;
    }

    .quick-access.on .quick-label {
      color: var(--mn-accent);
    }

    /* ===== EXPAND HANDLE ===== */
    .expand-handle {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 4px;
      border-radius: 2px;
      background: var(--mn-bg-dark);
      box-shadow: 0 1px 0 var(--mn-bg-light);
      opacity: 0.4;
      cursor: pointer;
      transition:
        opacity 0.2s,
        background 0.2s,
        width 0.3s var(--ease);
    }

    .layr-room:hover .expand-handle {
      opacity: 0.7;
      width: 44px;
    }

    .layr-room.expanded .expand-handle {
      background: var(--mn-accent);
      opacity: 0.6;
      width: 44px;
    }

    /* ===== CONTROLS ===== */
    .controls {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s var(--ease);
    }

    .layr-room.expanded .controls {
      max-height: 900px;
    }

    .controls-inner {
      padding-top: 18px;
      margin-top: 16px;
      box-shadow: 0 -1px 0 var(--mn-bg-dark);
      opacity: 0;
      transform: translateY(-6px);
      transition:
        opacity 0.3s var(--ease) 0.1s,
        transform 0.3s var(--ease) 0.1s;
    }

    .layr-room.expanded .controls-inner {
      opacity: 1;
      transform: translateY(0);
    }

    .control-group {
      margin-bottom: 18px;
    }

    .control-group:last-child {
      margin-bottom: 6px;
    }

    .control-label {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;
    }

    .control-label .key {
      font-size: 9px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
    }

    .control-label .val {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      color: var(--mn-text);
      font-weight: 400;
      letter-spacing: -0.02em;
    }

    /* ===== SLIDER ===== */
    .slider {
      position: relative;
      height: 12px;
      background: var(--mn-bg);
      border-radius: 6px;
      box-shadow: var(--mn-shadow-in);
      cursor: pointer;
      touch-action: none;
      flex: 1;
    }

    .slider-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(90deg, var(--mn-accent), var(--mn-accent-light));
      border-radius: 6px;
      box-shadow: 0 0 8px var(--mn-accent-glow);
      transition: width 0.15s var(--ease-out);
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, var(--mn-bg-light), var(--mn-bg));
      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.15),
        -1px -1px 3px var(--mn-bg-light),
        1px 1px 3px var(--mn-bg-dark);
      transform: translate(-50%, -50%);
      transition:
        left 0.15s var(--ease-out),
        transform 0.15s var(--ease-out);
      cursor: grab;
    }

    .slider-thumb::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--mn-accent);
      transform: translate(-50%, -50%);
      box-shadow: 0 0 4px var(--mn-accent-glow);
    }

    .slider.dragging .slider-thumb {
      transform: translate(-50%, -50%) scale(1.15);
      cursor: grabbing;
    }

    .slider.dragging .slider-fill,
    .slider.dragging .slider-thumb {
      transition: none;
    }

    .control-group.light-off .slider-fill {
      background: var(--mn-bg-dark);
      box-shadow: none;
    }

    .light-toggle-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* ===== POWER BUTTON ===== */
    .power-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transition: all 0.2s var(--ease);
      flex-shrink: 0;
    }

    .power-btn:active {
      transform: scale(0.94);
    }

    .power-btn.on {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      box-shadow:
        0 0 12px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .power-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    /* ===== STEPPER ===== */
    .stepper {
      display: grid;
      grid-template-columns: 48px 1fr 48px;
      align-items: center;
      gap: 14px;
    }

    .step-btn {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      font-family: 'Fraunces', serif;
      font-size: 24px;
      font-weight: 300;
      transition: all 0.15s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .step-btn:hover {
      color: var(--mn-accent);
    }

    .step-btn:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.96);
    }

    .step-display {
      text-align: center;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-in);
      border-radius: 14px;
      padding: 12px 0;
    }

    .step-display .num {
      font-family: 'Fraunces', serif;
      font-size: 28px;
      font-weight: 400;
      color: var(--mn-text);
      letter-spacing: -0.02em;
      line-height: 1;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
    }

    .step-display .unit {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 13px;
      color: var(--mn-text-mid);
      margin-left: 2px;
    }

    /* ===== COVER CONTROLS ===== */
    .cover-controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    .cover-btn {
      height: 44px;
      border-radius: 14px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      transition: all 0.15s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .cover-btn:hover {
      color: var(--mn-accent);
    }

    .cover-btn:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.97);
      color: var(--mn-accent);
    }

    .cover-btn svg {
      width: 18px;
      height: 18px;
    }

    /* ===== SWITCH PILLS ===== */
    .switch-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .switch-pill {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 44px;
      padding: 0 18px 0 20px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border-radius: 14px;
      border: none;
      cursor: pointer;
      font-family: 'Geist', 'Inter', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
      transition:
        background 0.3s var(--ease),
        color 0.3s var(--ease),
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .switch-pill:active {
      transform: scale(0.98);
    }

    .switch-name {
      text-align: left;
      letter-spacing: -0.005em;
    }

    .switch-power-ico {
      width: 14px;
      height: 14px;
      fill: var(--mn-text-dim);
      flex-shrink: 0;
      transition: fill 0.3s var(--ease);
    }

    .switch-pill.on {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      box-shadow:
        0 0 14px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .switch-pill.on .switch-power-ico {
      fill: var(--mn-bg-light);
    }
  `;
M([
  G({ attribute: !1 })
], y.prototype, "hass", 2);
M([
  S()
], y.prototype, "_config", 2);
M([
  S()
], y.prototype, "_expanded", 2);
M([
  S()
], y.prototype, "_isDraggingSlider", 2);
M([
  S()
], y.prototype, "_draftBrightness", 2);
y = M([
  rt("layr-room-card")
], y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "layr-room-card",
  name: "Layr Room Card",
  description: "Premium room card with the Monolith design aesthetic",
  preview: !0
});
console.info(
  "%c LAYR-ROOM-CARD %c v0.1.0 ",
  "color: white; background: #b8743a; font-weight: bold;",
  "color: #b8743a; background: white; font-weight: bold;"
);
var _e = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, Y = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? xe(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && _e(t, s, r), r;
};
const ye = 12e4, be = 24, $t = (e, t) => {
  if (K(e)) return "—";
  const s = X(e);
  if (s === null) return e;
  const i = t ?? (Number.isInteger(s) ? 0 : 1);
  return _(s, i);
}, we = (e, t = 100, s = 32, i = 2) => {
  if (e.length < 2) return "";
  const r = Math.min(...e), o = Math.max(...e) - r || 1, l = s - i * 2;
  return e.map((c, p) => {
    const u = p / (e.length - 1) * t, d = s - i - (c - r) / o * l;
    return `${u.toFixed(2)},${d.toFixed(2)}`;
  }).join(" ");
};
let E = class extends $ {
  constructor() {
    super(), this._history = [], this._handleTap = () => {
      this._config.tap_action !== "none" && Ht(this, this._config.entity);
    }, this._onKeydown = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._handleTap());
    }, nt();
  }
  // ---- Lovelace hooks ---------------------------------------------------
  setConfig(e) {
    if (!e || !e.entity)
      throw new Error('Layr Hero Card: "entity" is required');
    this._config = { ...e }, this._lastFetchedEntity = void 0;
  }
  getCardSize() {
    return this._config?.sparkline ? 3 : 2;
  }
  static getStubConfig() {
    return { entity: "", sparkline: !0 };
  }
  // ---- Lifecycle --------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this._config?.sparkline && (this._refreshTimer = window.setInterval(
      () => this._loadHistory(!0),
      ye
    ));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._refreshTimer && (clearInterval(this._refreshTimer), this._refreshTimer = void 0);
  }
  updated() {
    !this.hass || !this._config?.sparkline || this._lastFetchedEntity !== this._config.entity && this._loadHistory(!1);
  }
  async _loadHistory(e) {
    if (!this.hass || !this._config?.sparkline) return;
    const t = this._config.entity;
    if (!e && this._lastFetchedEntity === t) return;
    this._lastFetchedEntity = t;
    const s = this._config.hours ?? be;
    this._history = await ce(this.hass, t, s);
  }
  // ---- Derived state ----------------------------------------------------
  get _entity() {
    return this.hass?.states[this._config.entity];
  }
  get _unit() {
    return this._config.unit ?? this._entity?.attributes.unit_of_measurement ?? "";
  }
  get _label() {
    return this._config.name ?? this._entity?.attributes.friendly_name ?? this._config.entity;
  }
  // ============================================================
  // RENDER
  // ============================================================
  render() {
    if (!this._config || !this.hass) return a``;
    const e = this._config.icon || "default", t = j[e] ?? j.default, s = this._config.tap_action !== "none", i = $t(this._entity?.state, this._config.decimals), r = this._unit;
    return a`
      <ha-card
        class="layr-hero ${s ? "interactive" : ""}"
        @click=${this._handleTap}
        role=${s ? "button" : h}
        tabindex=${s ? "0" : h}
        @keydown=${this._onKeydown}
      >
        <div class="hero-head">
          <div class="icon">${t}</div>
          <div class="label">${this._label}</div>
        </div>

        <div class="hero-value">
          <span class="num">${i}</span>
          ${r ? a`<span class="unit">${r}</span>` : h}
        </div>

        ${this._renderSecondary()} ${this._renderSparkline()}
      </ha-card>
    `;
  }
  _renderSecondary() {
    const e = this._config.secondary_entity;
    if (!e) return h;
    const t = this.hass.states[e], s = $t(t?.state), i = t?.attributes.unit_of_measurement ?? "", r = this._config.secondary_name ?? t?.attributes.friendly_name ?? "";
    return a`
      <div class="hero-secondary">
        ${r ? a`<span class="sec-label">${r}</span>` : h}
        <span class="sec-num">${s}${i ? a` ${i}` : h}</span>
      </div>
    `;
  }
  _renderSparkline() {
    if (!this._config.sparkline) return h;
    const e = we(this._history);
    return e ? a`
      <div class="hero-spark">
        <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
          <polyline points=${e} />
        </svg>
      </div>
    ` : h;
  }
};
E.styles = q`
    ${ot}

    .layr-hero {
      background: var(--mn-bg);
      border: none;
      border-radius: 22px;
      box-shadow: var(--mn-shadow-out);
      padding: 22px;
      color: var(--mn-text);
      overflow: hidden;
      transition:
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
    }

    .layr-hero.interactive {
      cursor: pointer;
    }

    .layr-hero.interactive:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.995);
    }

    .layr-hero:focus-visible {
      outline: 2px solid var(--mn-accent);
      outline-offset: 3px;
    }

    /* ===== HEAD ===== */
    .hero-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }

    .icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-accent);
      flex-shrink: 0;
    }

    .glyph-svg {
      width: 21px;
      height: 21px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .glyph-svg .filled {
      fill: currentColor;
      stroke: none;
    }

    .label {
      font-family: 'Geist', 'Inter', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ===== VALUE ===== */
    .hero-value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      line-height: 1;
    }

    .hero-value .num {
      font-family: 'Fraunces', serif;
      font-size: 52px;
      font-weight: 300;
      letter-spacing: -0.02em;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .hero-value .unit {
      font-family: 'Fraunces', serif;
      font-size: 20px;
      font-weight: 400;
      color: var(--mn-text-mid);
    }

    /* ===== SECONDARY ===== */
    .hero-secondary {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 10px;
    }

    .hero-secondary .sec-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      color: var(--mn-text-dim);
      letter-spacing: 0.01em;
    }

    .hero-secondary .sec-num {
      font-family: 'Fraunces', serif;
      font-size: 14px;
      color: var(--mn-text-mid);
    }

    /* ===== SPARKLINE ===== */
    .hero-spark {
      margin-top: 18px;
      height: 40px;
    }

    .hero-spark svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .hero-spark polyline {
      fill: none;
      stroke: var(--mn-accent);
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }
  `;
Y([
  G({ attribute: !1 })
], E.prototype, "hass", 2);
Y([
  S()
], E.prototype, "_config", 2);
Y([
  S()
], E.prototype, "_history", 2);
E = Y([
  rt("layr-hero-card")
], E);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "layr-hero-card",
  name: "Layr Hero Card",
  description: "Featured value display with optional sparkline, in the Monolith aesthetic",
  preview: !0
});
console.info(
  "%c LAYR-HERO-CARD %c v0.1.0 ",
  "color: white; background: #b8743a; font-weight: bold;",
  "color: #b8743a; background: white; font-weight: bold;"
);
var $e = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, at = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? ke(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && $e(t, s, r), r;
};
const Se = {
  solar: O`<circle class="f" cx="12" cy="12" r="3.2"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>`,
  haus: O`<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>`,
  speicher: O`<rect x="4" y="8" width="14" height="9" rx="2"/><path d="M20 11v3"/><rect class="f" x="6" y="10" width="5" height="5" rx="1"/>`,
  netz: O`<path d="M12 3l-4 18M12 3l4 18M9 9h6M8 15h8"/>`
}, kt = {
  solar: { x: 28, y: 54 },
  haus: { x: 172, y: 54 },
  speicher: { x: 316, y: 28 },
  netz: { x: 316, y: 80 }
}, g = {
  solarHaus: "M28 54 L172 54",
  hausSpeicher: "M172 54 C232 54 252 28 316 28",
  hausNetz: "M172 54 C232 54 252 80 316 80",
  speicherHaus: "M316 28 C252 28 232 54 172 54",
  netzHaus: "M316 80 C252 80 232 54 172 54"
};
let L = class extends $ {
  constructor() {
    super(), this._tap = () => {
      if (this._config.tap_action === "none") return;
      const e = this._config.solar_entity || this._config.grid_entity || this._config.battery_entity;
      e && Ht(this, e);
    }, this._onKeydown = (e) => {
      (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._tap());
    }, nt();
  }
  setConfig(e) {
    if (!e) throw new Error("Invalid configuration");
    if (!e.solar_entity && !e.grid_entity && !e.battery_entity)
      throw new Error("Layr Energy Card: configure at least one of solar_entity, grid_entity, battery_entity");
    this._config = { ...e };
  }
  getCardSize() {
    return 4;
  }
  static getStubConfig() {
    return { solar_entity: "", grid_entity: "", battery_entity: "" };
  }
  // ---- Data --------------------------------------------------------------
  _num(e) {
    return e ? X(this.hass.states[e]?.state) : null;
  }
  get _flow() {
    const e = this._config, t = e.threshold ?? 20, s = Math.max(0, this._num(e.solar_entity) ?? 0), i = this._num(e.house_entity) ?? 0, r = this._num(e.battery_level_entity), n = this._num(e.grid_entity) ?? 0, o = e.grid_export_positive ? -n : n, l = Math.max(0, o), c = Math.max(0, -o), p = this._num(e.battery_entity) ?? 0, u = e.battery_charge_positive ?? !0 ? p : -p, d = Math.max(0, u), v = Math.max(0, -u);
    let f = "solar";
    return l > t ? f = "grid" : v > t && (f = "storage"), { mode: f, solar: s, house: i, importW: l, exportW: c, charge: d, discharge: v, soc: r };
  }
  // ============================================================
  // RENDER
  // ============================================================
  render() {
    if (!this._config || !this.hass) return a``;
    const e = this._flow, t = this._config.tap_action !== "none", s = this._config.icon || "sun", i = j[s] ?? j.sun, r = {
      "layr-energy": !0,
      "mode-solar": e.mode === "solar",
      "mode-storage": e.mode === "storage",
      "mode-grid": e.mode === "grid",
      interactive: t
    }, { value: n, unit: o } = this._headline(e), l = this._split(e);
    return a`
      <ha-card
        class=${T(r)}
        @click=${this._tap}
        @keydown=${this._onKeydown}
        role=${t ? "button" : h}
        tabindex=${t ? "0" : h}
      >
        <div class="main">
          <div class="head">
            <div class="icon">${i}</div>
            <div class="label">${this._config.name ?? "Energie"}</div>
            <div class="live"><span class="dot"></span></div>
          </div>

          <div class="value">
            <span class="num">${n}</span>${o ? a`<span class="unit">${o}</span>` : h}
          </div>

          <div class="split">
            <div class="seg src">
              <span class="t">${l.a.label}</span><span class="n">${l.a.value}</span>
            </div>
            ${l.b ? a`<div class="seg ${l.b.accent ? "acc" : ""}">
                  <span class="t">${l.b.label}</span><span class="n">${l.b.value}</span>
                </div>` : h}
          </div>

          ${this._renderFlow(e)}
        </div>

        ${this._renderRail()}
      </ha-card>
    `;
  }
  _headline(e) {
    const t = (s) => _(s, 0);
    return e.mode === "grid" ? { value: t(e.importW), unit: "W" } : e.mode === "storage" ? { value: t(e.discharge), unit: "W" } : { value: t(e.solar), unit: "W" };
  }
  _split(e) {
    const t = (i) => `${_(i, 0)} W`;
    if (e.mode === "grid")
      return {
        a: { label: "Netzbezug", value: t(e.importW) },
        b: { label: "Hausverbrauch", value: t(e.house) }
      };
    if (e.mode === "storage")
      return {
        a: { label: "Speicherstand", value: e.soc !== null ? `${_(e.soc, 0)} %` : "—" },
        b: { label: "Hausverbrauch", value: t(e.house) }
      };
    const s = Math.max(0, e.solar - e.exportW);
    return {
      a: { label: "Eigenverbrauch", value: t(s) },
      b: { label: "Einspeisung", value: t(e.exportW), accent: !0 }
    };
  }
  // ---- Flow diagram ------------------------------------------------------
  _renderFlow(e) {
    const t = [], s = /* @__PURE__ */ new Set(["haus"]);
    let i = null;
    const r = this._config.threshold ?? 20;
    e.mode === "solar" ? (t.push({ path: g.solarHaus, pulse: g.solarHaus, tone: "status", reverse: !1 }), s.add("solar"), e.exportW > r && (t.push({ path: g.hausNetz, pulse: g.hausNetz, tone: "accent", reverse: !1 }), i = "netz"), e.charge > r && (t.push({ path: g.hausSpeicher, pulse: g.hausSpeicher, tone: "status", reverse: !1 }), s.add("speicher"))) : e.mode === "storage" ? (t.push({ path: g.hausSpeicher, pulse: g.speicherHaus, tone: "status", reverse: !0 }), s.add("speicher")) : (t.push({ path: g.hausNetz, pulse: g.netzHaus, tone: "status", reverse: !0 }), s.add("netz"));
    const n = (o) => {
      const l = t.find((c) => c.path === o);
      return {
        wire: !0,
        on: l?.tone === "status",
        "on-acc": l?.tone === "accent",
        rev: !!l?.reverse
      };
    };
    return a`
      <div class="flow">
        <svg class="wires" viewBox="0 0 344 120" preserveAspectRatio="none">
          ${this._wire(g.solarHaus, n(g.solarHaus))}
          ${this._wire(g.hausSpeicher, n(g.hausSpeicher))}
          ${this._wire(g.hausNetz, n(g.hausNetz))}
        </svg>
        ${t.flatMap((o) => [
      this._pulse(o.pulse, o.tone, 0),
      this._pulse(o.pulse, o.tone, -1.5)
    ])}
        ${this._node("solar", s.has("solar"), !1)}
        ${this._node("haus", s.has("haus"), !1)}
        ${this._node("speicher", s.has("speicher"), !1)}
        ${this._node("netz", s.has("netz"), i === "netz")}
        ${this._cap("solar", "Solar", 76)} ${this._cap("haus", "Haus", 76)}
        ${this._cap("speicher", "Speicher", 48)} ${this._cap("netz", "Netz", 100)}
      </div>
    `;
  }
  _wire(e, t) {
    return O`<path class=${T(t)} d=${e} />`;
  }
  _pulse(e, t, s) {
    const i = `offset-path:path('${e}');${s ? `animation-delay:${s}s` : ""}`;
    return a`<span class="pulse ${t === "accent" ? "acc" : ""}" style=${i}></span>`;
  }
  _node(e, t, s) {
    const i = kt[e];
    return a`<div class=${T({ node: !0, on: t && !s, "on-acc": s })} style="left:${i.x}px;top:${i.y}px">
      <svg viewBox="0 0 24 24">${Se[e]}</svg>
    </div>`;
  }
  _cap(e, t, s) {
    return a`<span class="cap" style="left:${kt[e].x}px;top:${s}px">${t}</span>`;
  }
  // ---- Stat rail ---------------------------------------------------------
  _renderRail() {
    const e = (this._config.stats ?? []).slice(0, 4);
    return e.length ? a`<div class="rail">
      ${e.map((t) => {
      const s = this.hass.states[t.entity], i = X(s?.state), r = t.unit ?? s?.attributes.unit_of_measurement ?? "", n = i === null ? "—" : `${_(i, Number.isInteger(i) ? 0 : 2)}${r ? ` ${r}` : ""}`, o = i === null ? 0 : t.max ? Math.min(100, i / t.max * 100) : r === "%" ? Math.min(100, i) : 0, l = t.name ?? s?.attributes.friendly_name ?? t.entity;
      return a`<div class="stat">
          <span class="k">${l}</span><span class="vv">${n}</span>
          ${o > 0 ? a`<div class="bar"><i class=${t.tone === "green" ? "g" : ""} style="width:${o}%"></i></div>` : h}
        </div>`;
    })}
    </div>` : h;
  }
};
L.styles = q`
    ${ot}

    .mode-solar {
      --status: #6f8a3e;
      --status-glow: rgba(111, 138, 62, 0.55);
    }
    .mode-storage {
      --status: #c2992b;
      --status-glow: rgba(194, 153, 43, 0.55);
    }
    .mode-grid {
      --status: #a83f33;
      --status-glow: rgba(168, 63, 51, 0.55);
    }

    .layr-energy {
      position: relative;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: stretch;
      gap: 24px;
      padding: 24px 26px;
      border-radius: 26px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out);
      color: var(--mn-text);
      border: none;
      overflow: hidden;
    }
    .layr-energy.interactive {
      cursor: pointer;
    }
    .layr-energy:focus-visible {
      outline: 2px solid var(--status);
      outline-offset: 3px;
    }
    .layr-energy::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.35;
      background-image: radial-gradient(circle, var(--mn-bg-dark) 1px, transparent 1.4px);
      background-size: 7px 7px;
    }
    .main {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-accent);
      flex-shrink: 0;
    }
    .icon .glyph-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .icon .glyph-svg .filled {
      fill: currentColor;
      stroke: none;
    }
    .label {
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
    }
    .live {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--status);
      box-shadow: 0 0 8px var(--status-glow);
      animation: breathe 3s ease-in-out infinite;
    }
    @keyframes breathe {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.25);
      }
    }

    .value {
      display: flex;
      align-items: baseline;
      gap: 7px;
      line-height: 0.92;
      margin-top: 2px;
    }
    .value .num {
      font-family: 'Fraunces', Georgia, serif;
      font-weight: 300;
      font-size: 58px;
      letter-spacing: -0.02em;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.35);
    }
    .value .unit {
      font-family: 'Fraunces', Georgia, serif;
      font-weight: 400;
      font-size: 22px;
      color: var(--mn-text-mid);
    }

    .split {
      display: flex;
      gap: 18px;
      margin-top: 11px;
    }
    .split .seg {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .split .seg .t {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
    }
    .split .seg .n {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 16px;
      color: var(--mn-text);
    }
    .split .seg.src .n {
      color: var(--status);
    }
    .split .seg.acc .n {
      color: var(--mn-accent);
    }

    /* ===== ENERGY FLOW ===== */
    .flow {
      position: relative;
      width: 344px;
      height: 120px;
      margin-top: 18px;
    }
    .wires {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .wire {
      fill: none;
      stroke: var(--mn-bg-dark);
      stroke-width: 2.2;
      stroke-linecap: round;
      opacity: 0.45;
    }
    .wire.on {
      stroke: var(--status);
      opacity: 0.8;
      stroke-dasharray: 4 10;
      animation: dash 1.5s linear infinite;
      filter: drop-shadow(0 0 2px var(--status-glow));
    }
    .wire.on-acc {
      stroke: var(--mn-accent);
      opacity: 0.8;
      stroke-dasharray: 4 10;
      animation: dash 1.5s linear infinite;
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }
    @keyframes dash {
      to {
        stroke-dashoffset: -14;
      }
    }
    .wire.rev {
      animation-direction: reverse;
    }
    .pulse {
      position: absolute;
      left: 0;
      top: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--status);
      box-shadow: 0 0 6px 1px var(--status-glow);
      offset-rotate: 0deg;
      animation: travel 3s linear infinite;
      opacity: 0;
    }
    .pulse.acc {
      background: var(--mn-accent);
      box-shadow: 0 0 6px 1px var(--mn-accent-glow);
    }
    @keyframes travel {
      0% {
        offset-distance: 0%;
        opacity: 0;
      }
      16% {
        opacity: 1;
      }
      84% {
        opacity: 1;
      }
      100% {
        offset-distance: 100%;
        opacity: 0;
      }
    }
    .node {
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transform: translate(-50%, -50%);
      z-index: 2;
    }
    .node svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .node svg .f {
      fill: currentColor;
      stroke: none;
    }
    .node.on {
      color: var(--status);
      animation: nodeglow 3s ease-in-out infinite;
    }
    .node.on-acc {
      color: var(--mn-accent);
      box-shadow: var(--mn-shadow-out-sm), 0 0 13px var(--mn-accent-glow);
    }
    @keyframes nodeglow {
      0%,
      100% {
        box-shadow: var(--mn-shadow-out-sm), 0 0 8px var(--status-glow);
      }
      50% {
        box-shadow: var(--mn-shadow-out-sm), 0 0 17px var(--status-glow);
      }
    }
    .cap {
      position: absolute;
      transform: translate(-50%, 0);
      font-size: 8.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
      z-index: 2;
      white-space: nowrap;
    }

    /* ===== STAT RAIL ===== */
    .rail {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 24px;
      flex-shrink: 0;
    }
    .rail::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 2px;
      border-radius: 2px;
      background: linear-gradient(var(--mn-bg-dark), var(--mn-bg-light));
      box-shadow: 1px 0 0 rgba(255, 255, 255, 0.5);
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 104px;
    }
    .stat + .stat {
      margin-top: 13px;
    }
    .stat .k {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
    }
    .stat .vv {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 19px;
      color: var(--mn-text);
    }
    .stat .bar {
      height: 4px;
      border-radius: 4px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-in);
      overflow: hidden;
      margin-top: 4px;
    }
    .stat .bar i {
      display: block;
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--mn-accent-light), var(--mn-accent));
      box-shadow: 0 0 8px var(--mn-accent-glow);
    }
    .stat .bar i.g {
      background: linear-gradient(90deg, #9aa86a, #6f8a3e);
      box-shadow: 0 0 8px rgba(111, 138, 62, 0.5);
    }
  `;
at([
  G({ attribute: !1 })
], L.prototype, "hass", 2);
at([
  S()
], L.prototype, "_config", 2);
L = at([
  rt("layr-energy-card")
], L);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "layr-energy-card",
  name: "Layr Energy Card",
  description: "Live energy-flow card for solar + battery setups, in the Monolith aesthetic",
  preview: !0
});
console.info(
  "%c LAYR-ENERGY-CARD %c v0.1.0 ",
  "color: white; background: #b8743a; font-weight: bold;",
  "color: #b8743a; background: white; font-weight: bold;"
);
export {
  L as LayrEnergyCard,
  E as LayrHeroCard,
  y as LayrRoomCard
};
//# sourceMappingURL=layr.js.map
