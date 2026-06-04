const R = globalThis, D = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, j = Symbol(), G = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== j) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (D && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = G.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ft = (e) => new at(typeof e == "string" ? e : e + "", void 0, j), _t = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new at(s, e, j);
}, bt = (e, t) => {
  if (D) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = s.cssText, e.appendChild(i);
  }
}, Q = D ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ft(s);
})(e) : e;
const { is: xt, defineProperty: yt, getOwnPropertyDescriptor: $t, getOwnPropertyNames: wt, getOwnPropertySymbols: At, getPrototypeOf: St } = Object, H = globalThis, K = H.trustedTypes, kt = K ? K.emptyScript : "", Ct = H.reactiveElementPolyfillSupport, k = (e, t) => e, U = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? kt : null;
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
} }, q = (e, t) => !xt(e, t), X = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: q };
Symbol.metadata ??= Symbol("metadata"), H.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let $ = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = X) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
      r !== void 0 && yt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: r, set: n } = $t(this.prototype, t) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? X;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = St(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const s = this.properties, i = [...wt(s), ...At(s)];
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
      for (const r of i) s.unshift(Q(r));
    } else t !== void 0 && s.push(Q(t));
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
    return bt(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : U).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : U;
      this._$Em = r;
      const c = o.fromAttribute(s, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? q)(n, s) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
$.elementStyles = [], $.shadowRootOptions = { mode: "open" }, $[k("elementProperties")] = /* @__PURE__ */ new Map(), $[k("finalized")] = /* @__PURE__ */ new Map(), Ct?.({ ReactiveElement: $ }), (H.reactiveElementVersions ??= []).push("2.1.2");
const V = globalThis, Z = (e) => e, B = V.trustedTypes, Y = B ? B.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, lt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + v, Et = `<${ct}>`, y = document, E = () => y.createComment(""), P = (e) => e === null || typeof e != "object" && typeof e != "function", F = Array.isArray, Pt = (e) => F(e) || typeof e?.[Symbol.iterator] == "function", N = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, tt = />/g, b = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, ht = /^(?:script|style|textarea|title)$/i, Mt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = Mt(1), f = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), x = y.createTreeWalker(y, 129);
function dt(e, t) {
  if (!F(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Y !== void 0 ? Y.createHTML(t) : t;
}
const Ot = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let c = 0; c < s; c++) {
    const a = e[c];
    let p, u, d = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, u = o.exec(a), u !== null); ) g = o.lastIndex, o === S ? u[1] === "!--" ? o = J : u[1] !== void 0 ? o = tt : u[2] !== void 0 ? (ht.test(u[2]) && (r = RegExp("</" + u[2], "g")), o = b) : u[3] !== void 0 && (o = b) : o === b ? u[0] === ">" ? (o = r ?? S, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, p = u[1], o = u[3] === void 0 ? b : u[3] === '"' ? st : et) : o === st || o === et ? o = b : o === J || o === tt ? o = S : (o = b, r = void 0);
    const m = o === b && e[c + 1].startsWith("/>") ? " " : "";
    n += o === S ? a + Et : d >= 0 ? (i.push(p), a.slice(0, d) + lt + a.slice(d) + v + m) : a + v + (d === -2 ? c : m);
  }
  return [dt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [p, u] = Ot(t, s);
    if (this.el = M.createElement(p, i), x.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = x.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(lt)) {
          const g = u[o++], m = r.getAttribute(d).split(v), T = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: n, name: T[2], strings: m, ctor: T[1] === "." ? Rt : T[1] === "?" ? Ut : T[1] === "@" ? Bt : L }), r.removeAttribute(d);
        } else d.startsWith(v) && (a.push({ type: 6, index: n }), r.removeAttribute(d));
        if (ht.test(r.tagName)) {
          const d = r.textContent.split(v), g = d.length - 1;
          if (g > 0) {
            r.textContent = B ? B.emptyScript : "";
            for (let m = 0; m < g; m++) r.append(d[m], E()), x.nextNode(), a.push({ type: 2, index: ++n });
            r.append(d[g], E());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ct) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(v, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += v.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function w(e, t, s = e, i) {
  if (t === f) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = w(e, r._$AS(e, t.values), r, i)), t;
}
class Tt {
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
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? y).importNode(s, !0);
    x.currentNode = r;
    let n = x.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let p;
        a.type === 2 ? p = new O(n, n.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (p = new Ht(n, this, t)), this._$AV.push(p), a = i[++c];
      }
      o !== a?.index && (n = x.nextNode(), o++);
    }
    return x.currentNode = y, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class O {
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
    t = w(this, t, s), P(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== f && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(dt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new Tt(r, this), o = n.u(this.options);
      n.p(s), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = it.get(t.strings);
    return s === void 0 && it.set(t.strings, s = new M(t)), s;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new O(this.O(E()), this.O(E()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = Z(t).nextSibling;
      Z(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class L {
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
    if (n === void 0) t = w(this, t, s, 0), o = !P(t) || t !== this._$AH && t !== f, o && (this._$AH = t);
    else {
      const c = t;
      let a, p;
      for (t = n[0], a = 0; a < n.length - 1; a++) p = w(this, c[i + a], s, a), p === f && (p = this._$AH[a]), o ||= !P(p) || p !== this._$AH[a], p === h ? t = h : t !== h && (t += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Ut extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Bt extends L {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = w(this, t, s, 0) ?? h) === f) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ht {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const Lt = V.litHtmlPolyfillSupport;
Lt?.(M, O), (V.litHtmlVersions ??= []).push("3.3.3");
const zt = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = r = new O(t.insertBefore(E(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
const W = globalThis;
let C = class extends $ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return f;
  }
};
C._$litElement$ = !0, C.finalized = !0, W.litElementHydrateSupport?.({ LitElement: C });
const Nt = W.litElementPolyfillSupport;
Nt?.({ LitElement: C });
(W.litElementVersions ??= []).push("4.2.2");
const It = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Dt = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: q }, jt = (e = Dt, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: o } = s;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(o, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(o, void 0, e, c), c;
    } };
  }
  if (i === "setter") {
    const { name: o } = s;
    return function(c) {
      const a = this[o];
      t.call(this, c), this.requestUpdate(o, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function pt(e) {
  return (t, s) => typeof s == "object" ? jt(e, t, s) : ((i, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
function z(e) {
  return pt({ ...e, state: !0, attribute: !1 });
}
const ut = { ATTRIBUTE: 1 }, gt = (e) => (...t) => ({ _$litDirective$: e, values: t });
let mt = class {
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
const rt = gt(class extends mt {
  constructor(e) {
    if (super(e), e.type !== ut.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return f;
  }
});
const vt = "important", qt = " !" + vt, Vt = gt(class extends mt {
  constructor(e) {
    if (super(e), e.type !== ut.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const n = typeof r == "string" && r.endsWith(qt);
        i.includes("-") || n ? s.setProperty(i, n ? r.slice(0, -11) : r, n ? vt : "") : s[i] = r;
      }
    }
    return f;
  }
});
var Ft = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, A = (e, t, s, i) => {
  for (var r = i > 1 ? void 0 : i ? Wt(t, s) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (i ? o(t, s, r) : o(r)) || r);
  return i && r && Ft(t, s, r), r;
};
const nt = {
  door: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <circle class="filled" cx="13.5" cy="12" r="0.9" />
    </svg>
  `,
  pot: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <line x1="3" y1="11" x2="21" y2="11" />
      <circle cx="12" cy="8" r="1.2" />
      <path d="M5 11v6.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-6.5" />
      <path d="M5 13.5h-1.7M19 13.5h1.7" />
    </svg>
  `,
  sofa: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M5 12c0-2 1.4-3.2 3.2-3.2h7.6c1.8 0 3.2 1.2 3.2 3.2" />
      <path d="M5 12v4M3.5 12.5v3.5" />
      <path d="M19 12v4M20.5 12.5v3.5" />
      <path d="M3.5 16h17v2.2H3.5z" />
      <line x1="12" y1="12.5" x2="12" y2="16" />
      <path d="M5 18.2v1.6M19 18.2v1.6" />
    </svg>
  `,
  bed: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 18v-7c0-1 1-2 2-2h14c1 0 2 1 2 2v7" />
      <path d="M3 14h18" />
      <path d="M6 11h4v3H6z" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  `,
  bath: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 12h18v3c0 1.5-1 3-3 3H6c-2 0-3-1.5-3-3v-3z" />
      <path d="M5 12V6.5a2.5 2.5 0 0 1 5 0" />
      <circle class="filled" cx="10" cy="8" r="0.9" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  `,
  desk: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 10h18v2H3z" />
      <path d="M5 12v9M19 12v9" />
      <path d="M5 17h14" />
      <path d="M9 7v3M9 7h4M13 7v-3" />
    </svg>
  `,
  toilet: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M6 4h12v6H6z" />
      <path d="M6 10c0 3 1 5 3 6h6c2-1 3-3 3-6" />
      <path d="M9 16v4M15 16v4" />
    </svg>
  `,
  garden: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M12 3v18" />
      <path d="M12 7c-2-2-5-2-7 0 0 3 3 5 7 5" />
      <path d="M12 11c-2-2-5-1-6 1 0 3 3 4 6 3" />
      <path d="M12 7c2-2 5-2 7 0 0 3-3 5-7 5" />
    </svg>
  `,
  garage: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-6 9 6v9H3z" />
      <path d="M3 14h18M3 17h18" />
    </svg>
  `,
  default: l`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-7 9 7v9c0 1-1 1-1 1H4s-1 0-1-1z" />
    </svg>
  `
}, ot = l`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
    />
  </svg>
`, Gt = l`
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
`, Qt = l`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
`, Kt = l`
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
`, I = (e, t = 1) => e.toFixed(t).replace(".", ","), Xt = (e) => {
  if (e == null || e === "unknown" || e === "unavailable")
    return "—";
  const t = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(t) ? "—" : `${I(t, 1)}°`;
}, Zt = (e) => {
  if (e == null || e === "unknown" || e === "unavailable")
    return null;
  const t = typeof e == "string" ? parseFloat(e) : e;
  return isNaN(t) ? null : `${Math.round(t)}%`;
}, Yt = (e) => e === 0 ? "geschlossen" : e === 100 ? "offen" : `${e}% offen`;
let _ = class extends C {
  constructor() {
    super(...arguments), this._expanded = !1, this._isDraggingSlider = !1, this._draftBrightness = null, this._activePointerId = null, this._toggleExpand = () => {
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
      const t = e.entity.split(".")[0], s = e.tap_action || "toggle";
      this.hass.callService(t, s, { entity_id: e.entity });
    };
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
    if (!this._config || !this.hass) return l``;
    const e = {
      "layr-room": !0,
      active: this._lightOn,
      expanded: this._expanded,
      "read-only": !this._hasAnyControls
    }, t = (this._brightnessPct / 100).toFixed(2);
    return l`
      <ha-card class=${rt(e)} style=${Vt({ "--brightness": t })}>
        ${this._renderTopRow()} ${this._renderStatsArea()}
        ${this._hasAnyControls ? l`
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
    const e = this._config.icon || "default", t = nt[e] ?? nt.default, s = this._config.name || "Raum";
    return l`
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
    const e = Xt(this._tempState?.state), t = this._climateState?.attributes.temperature, s = Zt(this._humidityState?.state);
    return l`
      <div class="stats-area">
        <div class="stats">
          <div class="temp-block">
            <div class="value-primary">${e}</div>
            ${t !== void 0 ? l`
                  <div class="value-secondary">
                    <span class="sec-label">Soll</span>
                    <span class="sec-num">${I(t)}°</span>
                  </div>
                ` : h}
          </div>
          ${s !== null ? l`
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
    return l`
      <div class="quick-access ${s ? "on" : ""}">
        <button
          class="quick-btn"
          type="button"
          @click=${this._handleQuickAccess}
          aria-label="${i} schalten"
        >
          ${ot}
        </button>
        <span class="quick-label">${i}</span>
      </div>
    `;
  }
  // ---- Controls panel (expanded) ---------------------------------------
  _renderControls() {
    return l`
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
    return l`
      <div class=${rt({ "control-group": !0, "light-off": !s })}>
        <div class="control-label">
          <span class="key">Helligkeit</span>
          ${t ? l`<span class="val">${s ? `${e}%` : "aus"}</span>` : h}
        </div>
        <div class="light-toggle-row">
          <button
            class="power-btn ${s ? "on" : ""}"
            type="button"
            @click=${this._toggleLight}
            aria-label="Licht ein/aus"
          >
            ${ot}
          </button>
          ${t ? l`
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
    return l`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Heizung Soll</span>
          ${s ? l`<span class="val">${s}</span>` : h}
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
            <span class="num">${I(e)}</span><span class="unit">°C</span>
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
    const e = this._coverPosition, t = Yt(e);
    return l`
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
            ${Gt}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverStop}
            aria-label="Rolladen stop"
          >
            ${Qt}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverClose}
            aria-label="Rolladen runter"
          >
            ${Kt}
          </button>
        </div>
      </div>
    `;
  }
  // ---- Switch list -----------------------------------------------------
  _renderSwitches() {
    return l`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Schalten</span>
        </div>
        <div class="switch-list">
          ${this._config.switches.map((e) => {
      const t = this.hass.states[e.entity], s = t?.state === "on", i = e.name || t?.attributes.friendly_name || e.entity;
      return l`
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
    const t = e.split(".")[0];
    this.hass.callService(t, "toggle", { entity_id: e });
  }
  // ---- Lifecycle cleanup -----------------------------------------------
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopLongPress();
  }
};
_.styles = _t`
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
A([
  pt({ attribute: !1 })
], _.prototype, "hass", 2);
A([
  z()
], _.prototype, "_config", 2);
A([
  z()
], _.prototype, "_expanded", 2);
A([
  z()
], _.prototype, "_isDraggingSlider", 2);
A([
  z()
], _.prototype, "_draftBrightness", 2);
_ = A([
  It("layr-room-card")
], _);
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
export {
  _ as LayrRoomCard
};
//# sourceMappingURL=layr.js.map
