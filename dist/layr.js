const t$4 = globalThis, e$4 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e2;
  }
  get styleSheet() {
    let t = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t = o$5.get(s2)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t) => new n$4("string" == typeof t ? t : t + "", void 0, s$2), i$5 = (t, ...e2) => {
  const o2 = 1 === t.length ? t[0] : e2.reduce((e3, s2, o3) => e3 + ((t2) => {
    if (true === t2._$cssResult$) return t2.cssText;
    if ("number" == typeof t2) return t2;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t2 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t[o3 + 1], t[0]);
  return new n$4(o2, t, s$2);
}, S$1 = (s2, o2) => {
  if (e$4) s2.adoptedStyleSheets = o2.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$4.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$4 ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const s2 of t2.cssRules) e2 += s2.cssText;
  return r$5(e2);
})(t) : t;
const { is: i$4, defineProperty: e$3, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$4, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t, s2) => t, u$1 = { toAttribute(t, s2) {
  switch (s2) {
    case Boolean:
      t = t ? l$1 : null;
      break;
    case Object:
    case Array:
      t = null == t ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, s2) {
  let i4 = t;
  switch (s2) {
    case Boolean:
      i4 = null !== t;
      break;
    case Number:
      i4 = null === t ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t);
      } catch (t2) {
        i4 = null;
      }
  }
  return i4;
} }, f$1 = (t, s2) => !i$4(t, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y$1 = class y extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t, s2), !s2.noAccessor) {
      const i4 = Symbol(), h2 = this.getPropertyDescriptor(t, i4, s2);
      void 0 !== h2 && e$3(this.prototype, t, h2);
    }
  }
  static getPropertyDescriptor(t, s2, i4) {
    const { get: e2, set: r } = h$1(this.prototype, t) ?? { get() {
      return this[s2];
    }, set(t2) {
      this[s2] = t2;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r?.call(this, s3), this.requestUpdate(t, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t = n$3(this);
    t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t2 = this.properties, s2 = [...r$4(t2), ...o$4(t2)];
      for (const i4 of s2) this.createProperty(i4, t2[i4]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const s2 = litPropertyMetadata.get(t);
      if (void 0 !== s2) for (const [t2, i4] of s2) this.elementProperties.set(t2, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t2, s2] of this.elementProperties) {
      const i4 = this._$Eu(t2, s2);
      void 0 !== i4 && this._$Eh.set(i4, t2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i4.unshift(c$2(s3));
    } else void 0 !== s2 && i4.push(c$2(s2));
    return i4;
  }
  static _$Eu(t, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t.set(i4, this[i4]), delete this[i4]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s2, i4) {
    this._$AK(t, i4);
  }
  _$ET(t, s2) {
    const i4 = this.constructor.elementProperties.get(t), e2 = this.constructor._$Eu(t, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h2 = (void 0 !== i4.converter?.toAttribute ? i4.converter : u$1).toAttribute(s2, i4.type);
      this._$Em = t, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t, s2) {
    const i4 = this.constructor, e2 = i4._$Eh.get(t);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t2 = i4.getPropertyOptions(e2), h2 = "function" == typeof t2.converter ? { fromAttribute: t2.converter } : void 0 !== t2.converter?.fromAttribute ? t2.converter : u$1;
      this._$Em = e2;
      const r = h2.fromAttribute(s2, t2.type);
      this[e2] = r ?? this._$Ej?.get(e2) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, s2, i4, e2 = false, h2) {
    if (void 0 !== t) {
      const r = this.constructor;
      if (false === e2 && (h2 = this[t]), i4 ??= r.getPropertyOptions(t), !((i4.hasChanged ?? f$1)(h2, s2) || i4.useDefault && i4.reflect && h2 === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i4)))) return;
      this.C(t, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t, s2, { useDefault: i4, reflect: e2, wrapped: h2 }, r) {
    i4 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? s2 ?? this[t]), true !== h2 || void 0 !== r) || (this._$AL.has(t) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t, s2)), true === e2 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t = this.scheduleUpdate();
    return null != t && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t3, s3] of this._$Ep) this[t3] = s3;
        this._$Ep = void 0;
      }
      const t2 = this.constructor.elementProperties;
      if (t2.size > 0) for (const [s3, i4] of t2) {
        const { wrapped: t3 } = i4, e2 = this[s3];
        true !== t3 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t = false;
    const s2 = this._$AL;
    try {
      t = this.shouldUpdate(s2), t ? (this.willUpdate(s2), this._$EO?.forEach((t2) => t2.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t = false, this._$EM(), s3;
    }
    t && this._$AE(s2);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((t2) => t2.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((t2) => this._$ET(t2, this[t2])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ??= []).push("2.1.2");
const t$3 = globalThis, i$3 = (t) => t, s$1 = t$3.trustedTypes, e$2 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, h = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$3, r$3 = `<${n$2}>`, l = document, c = () => l.createComment(""), a = (t) => null === t || "object" != typeof t && "function" != typeof t, u = Array.isArray, d = (t) => u(t) || "function" == typeof t?.[Symbol.iterator], f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t) => (i4, ...s2) => ({ _$litType$: t, strings: i4, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t, i4) {
  if (!u(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$2 ? e$2.createHTML(i4) : i4;
}
const N = (t, i4) => {
  const s2 = t.length - 1, e2 = [];
  let n3, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = v;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t[i5];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$3 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i5 : x2);
  }
  return [V(t, l2 + (t[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t, _$litType$: i4 }, e2) {
    let r;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t.length - 1, d2 = this.parts, [f2, v2] = N(t, i4);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i4 || 3 === i4) {
      const t2 = this.el.content.firstChild;
      t2.replaceWith(...t2.childNodes);
    }
    for (; null !== (r = P.nextNode()) && d2.length < u2; ) {
      if (1 === r.nodeType) {
        if (r.hasAttributes()) for (const t2 of r.getAttributeNames()) if (t2.endsWith(h)) {
          const i5 = v2[a2++], s2 = r.getAttribute(t2).split(o$3), e3 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r.removeAttribute(t2);
        } else t2.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r.removeAttribute(t2));
        if (y2.test(r.tagName)) {
          const t2 = r.textContent.split(o$3), i5 = t2.length - 1;
          if (i5 > 0) {
            r.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i5; s2++) r.append(t2[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r.append(t2[i5], c());
          }
        }
      } else if (8 === r.nodeType) if (r.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t2 = -1;
        for (; -1 !== (t2 = r.data.indexOf(o$3, t2 + 1)); ) d2.push({ type: 7, index: l2 }), t2 += o$3.length - 1;
      }
      l2++;
    }
  }
  static createElement(t, i4) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t, s2;
  }
}
function M(t, i4, s2 = t, e2) {
  if (i4 === E) return i4;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a(i4) ? void 0 : i4._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t), h2._$AT(t, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = M(t, h2._$AS(t, i4.values), h2, e2)), i4;
}
class R {
  constructor(t, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = (t?.creationScope ?? l).importNode(i4, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r = s2[0];
    for (; void 0 !== r; ) {
      if (o2 === r.index) {
        let i5;
        2 === r.type ? i5 = new k(h2, h2.nextSibling, this, t) : 1 === r.type ? i5 = new r.ctor(h2, r.name, r.strings, this, t) : 6 === r.type && (i5 = new Z(h2, this, t)), this._$AV.push(i5), r = s2[++n3];
      }
      o2 !== r?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t[i4])), i4++;
  }
}
class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i4, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === t?.nodeType && (t = i4.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i4 = this) {
    t = M(this, t, i4), a(t) ? t === A || null == t || "" === t ? (this._$AH !== A && this._$AR(), this._$AH = A) : t !== this._$AH && t !== E && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : d(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t : this.T(l.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i4, _$litType$: s2 } = t, e2 = "number" == typeof s2 ? this._$AC(t) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i4);
    else {
      const t2 = new R(e2, this), s3 = t2.u(this.options);
      t2.p(i4), this.T(s3), this._$AH = t2;
    }
  }
  _$AC(t) {
    let i4 = C.get(t.strings);
    return void 0 === i4 && C.set(t.strings, i4 = new S(t)), i4;
  }
  k(t) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t) e2 === i4.length ? i4.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i4[e2], s2._$AI(h2), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t !== this._$AB; ) {
      const s3 = i$3(t).nextSibling;
      i$3(t).remove(), t = s3;
    }
  }
  setConnected(t) {
    void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i4, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = i4, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t, i4 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t = M(this, t, i4, 0), o2 = !a(t) || t !== this._$AH && t !== E, o2 && (this._$AH = t);
    else {
      const e3 = t;
      let n3, r;
      for (t = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r = M(this, e3[s2 + n3], i4, n3), r === E && (r = this._$AH[n3]), o2 ||= !a(r) || r !== this._$AH[n3], r === A ? t = A : t !== A && (t += (r ?? "") + h2[n3 + 1]), this._$AH[n3] = r;
    }
    o2 && !e2 && this.j(t);
  }
  j(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== A);
  }
}
class z extends H {
  constructor(t, i4, s2, e2, h2) {
    super(t, i4, s2, e2, h2), this.type = 5;
  }
  _$AI(t, i4 = this) {
    if ((t = M(this, t, i4, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t === A && s2 !== A || t.capture !== s2.capture || t.once !== s2.once || t.passive !== s2.passive, h2 = t !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Z {
  constructor(t, i4, s2) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const B = t$3.litHtmlPolyfillSupport;
B?.(S, k), (t$3.litHtmlVersions ??= []).push("3.3.3");
const D = (t, i4, s2) => {
  const e2 = s2?.renderBefore ?? i4;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t2 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new k(i4.insertBefore(c(), t2), t2, void 0, s2 ?? {});
  }
  return h2._$AI(t), h2;
};
const s = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = D(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i$2._$litElement$ = true, i$2["finalized"] = true, s.litElementHydrateSupport?.({ LitElement: i$2 });
const o$2 = s.litElementPolyfillSupport;
o$2?.({ LitElement: i$2 });
(s.litElementVersions ??= []).push("4.2.2");
const t$2 = (t) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t, e2);
  }) : customElements.define(t, e2);
};
const o$1 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$2 = (t = o$1, e2, r) => {
  const { kind: n3, metadata: i4 } = r;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t = Object.create(t)).wrapped = true), s2.set(r.name, t), "accessor" === n3) {
    const { name: o2 } = r;
    return { set(r2) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r2), this.requestUpdate(o2, n4, t, true, r2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r;
    return function(r2) {
      const n4 = this[o2];
      e2.call(this, r2), this.requestUpdate(o2, n4, t, true, r2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t) {
  return (e2, o2) => "object" == typeof o2 ? r$2(t, e2, o2) : ((t2, e3, o3) => {
    const r = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t2), r ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t, e2, o2);
}
function r$1(r) {
  return n$1({ ...r, state: true, attribute: false });
}
const t$1 = { ATTRIBUTE: 1 }, e$1 = (t) => (...e2) => ({ _$litDirective$: t, values: e2 });
let i$1 = class i2 {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e2, i4) {
    this._$Ct = t, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t, e2) {
    return this.update(t, e2);
  }
  update(t, e2) {
    return this.render(...e2);
  }
};
const e = e$1(class extends i$1 {
  constructor(t) {
    if (super(t), t.type !== t$1.ATTRIBUTE || "class" !== t.name || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((s2) => t[s2]).join(" ") + " ";
  }
  update(s2, [i4]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t) => "" !== t)));
      for (const t in i4) i4[t] && !this.nt?.has(t) && this.st.add(t);
      return this.render(i4);
    }
    const r = s2.element.classList;
    for (const t of this.st) t in i4 || (r.remove(t), this.st.delete(t));
    for (const t in i4) {
      const s3 = !!i4[t];
      s3 === this.st.has(t) || this.nt?.has(t) || (s3 ? (r.add(t), this.st.add(t)) : (r.remove(t), this.st.delete(t)));
    }
    return E;
  }
});
const n2 = "important", i3 = " !" + n2, o = e$1(class extends i$1 {
  constructor(t) {
    if (super(t), t.type !== t$1.ATTRIBUTE || "style" !== t.name || t.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e2, r) => {
      const s2 = t[r];
      return null == s2 ? e2 : e2 + `${r = r.includes("-") ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r)), this.render(r);
    for (const t of this.ft) null == r[t] && (this.ft.delete(t), t.includes("-") ? s2.removeProperty(t) : s2[t] = null);
    for (const t in r) {
      const e3 = r[t];
      if (null != e3) {
        this.ft.add(t);
        const r2 = "string" == typeof e3 && e3.endsWith(i3);
        t.includes("-") || r2 ? s2.setProperty(t, r2 ? e3.slice(0, -11) : e3, r2 ? n2 : "") : s2[t] = e3;
      }
    }
    return E;
  }
});
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
const ROOM_ICONS = {
  door: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <circle class="filled" cx="13.5" cy="12" r="0.9" />
    </svg>
  `,
  pot: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <line x1="3" y1="11" x2="21" y2="11" />
      <circle cx="12" cy="8" r="1.2" />
      <path d="M5 11v6.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-6.5" />
      <path d="M5 13.5h-1.7M19 13.5h1.7" />
    </svg>
  `,
  sofa: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M5 12c0-2 1.4-3.2 3.2-3.2h7.6c1.8 0 3.2 1.2 3.2 3.2" />
      <path d="M5 12v4M3.5 12.5v3.5" />
      <path d="M19 12v4M20.5 12.5v3.5" />
      <path d="M3.5 16h17v2.2H3.5z" />
      <line x1="12" y1="12.5" x2="12" y2="16" />
      <path d="M5 18.2v1.6M19 18.2v1.6" />
    </svg>
  `,
  bed: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 18v-7c0-1 1-2 2-2h14c1 0 2 1 2 2v7" />
      <path d="M3 14h18" />
      <path d="M6 11h4v3H6z" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  `,
  bath: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 12h18v3c0 1.5-1 3-3 3H6c-2 0-3-1.5-3-3v-3z" />
      <path d="M5 12V6.5a2.5 2.5 0 0 1 5 0" />
      <circle class="filled" cx="10" cy="8" r="0.9" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  `,
  desk: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 10h18v2H3z" />
      <path d="M5 12v9M19 12v9" />
      <path d="M5 17h14" />
      <path d="M9 7v3M9 7h4M13 7v-3" />
    </svg>
  `,
  toilet: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M6 4h12v6H6z" />
      <path d="M6 10c0 3 1 5 3 6h6c2-1 3-3 3-6" />
      <path d="M9 16v4M15 16v4" />
    </svg>
  `,
  garden: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M12 3v18" />
      <path d="M12 7c-2-2-5-2-7 0 0 3 3 5 7 5" />
      <path d="M12 11c-2-2-5-1-6 1 0 3 3 4 6 3" />
      <path d="M12 7c2-2 5-2 7 0 0 3-3 5-7 5" />
    </svg>
  `,
  garage: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-6 9 6v9H3z" />
      <path d="M3 14h18M3 17h18" />
    </svg>
  `,
  default: b`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-7 9 7v9c0 1-1 1-1 1H4s-1 0-1-1z" />
    </svg>
  `
};
const POWER_ICON_SVG = b`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
    />
  </svg>
`;
const COVER_UP_SVG = b`
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
`;
const COVER_STOP_SVG = b`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
`;
const COVER_DOWN_SVG = b`
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
`;
const formatGermanNumber = (n3, decimals = 1) => n3.toFixed(decimals).replace(".", ",");
const formatTemperature = (raw) => {
  if (raw === void 0 || raw === null || raw === "unknown" || raw === "unavailable") {
    return "—";
  }
  const n3 = typeof raw === "string" ? parseFloat(raw) : raw;
  if (isNaN(n3)) return "—";
  return `${formatGermanNumber(n3, 1)}°`;
};
const formatHumidity = (raw) => {
  if (raw === void 0 || raw === null || raw === "unknown" || raw === "unavailable") {
    return null;
  }
  const n3 = typeof raw === "string" ? parseFloat(raw) : raw;
  if (isNaN(n3)) return null;
  return `${Math.round(n3)}%`;
};
const formatCoverPosition = (pos) => {
  if (pos === 0) return "geschlossen";
  if (pos === 100) return "offen";
  return `${pos}% offen`;
};
let LayrRoomCard = class extends i$2 {
  constructor() {
    super(...arguments);
    this._expanded = false;
    this._isDraggingSlider = false;
    this._draftBrightness = null;
    this._activePointerId = null;
    this._toggleExpand = () => {
      this._expanded = !this._expanded;
    };
    this._toggleLight = () => {
      if (!this._config.light_entity) return;
      this.hass.callService("light", "toggle", {
        entity_id: this._config.light_entity
      });
    };
    this._onSliderPointerDown = (e2) => {
      e2.preventDefault();
      const slider = e2.currentTarget;
      this._activePointerId = e2.pointerId;
      slider.setPointerCapture(e2.pointerId);
      this._isDraggingSlider = true;
      this._updateBrightnessFromPointer(e2);
    };
    this._onSliderPointerMove = (e2) => {
      if (!this._isDraggingSlider) return;
      if (this._activePointerId !== e2.pointerId) return;
      this._updateBrightnessFromPointer(e2);
    };
    this._onSliderPointerUp = (e2) => {
      if (this._activePointerId !== e2.pointerId) return;
      const slider = e2.currentTarget;
      try {
        slider.releasePointerCapture(e2.pointerId);
      } catch {
      }
      this._isDraggingSlider = false;
      this._activePointerId = null;
      if (this._draftBrightness !== null) {
        this._commitBrightness(this._draftBrightness);
        this._draftBrightness = null;
      }
    };
    this._adjustSetpoint = (delta) => {
      if (!this._config.climate_entity || !this._climateState) return;
      const current = this._climateState.attributes.temperature ?? 20;
      const min = this._climateState.attributes.min_temp ?? 7;
      const max = this._climateState.attributes.max_temp ?? 35;
      const next = Math.max(min, Math.min(max, current + delta));
      if (next === current) return;
      this.hass.callService("climate", "set_temperature", {
        entity_id: this._config.climate_entity,
        temperature: next
      });
    };
    this._startLongPress = (delta) => {
      this._stopLongPress();
      this._longPressTimer = window.setTimeout(() => {
        this._longPressInterval = window.setInterval(() => {
          this._adjustSetpoint(delta);
        }, 140);
      }, 400);
    };
    this._stopLongPress = () => {
      if (this._longPressTimer) {
        clearTimeout(this._longPressTimer);
        this._longPressTimer = void 0;
      }
      if (this._longPressInterval) {
        clearInterval(this._longPressInterval);
        this._longPressInterval = void 0;
      }
    };
    this._coverOpen = () => {
      if (!this._config.cover_entity) return;
      this.hass.callService("cover", "open_cover", {
        entity_id: this._config.cover_entity
      });
    };
    this._coverClose = () => {
      if (!this._config.cover_entity) return;
      this.hass.callService("cover", "close_cover", {
        entity_id: this._config.cover_entity
      });
    };
    this._coverStop = () => {
      if (!this._config.cover_entity) return;
      this.hass.callService("cover", "stop_cover", {
        entity_id: this._config.cover_entity
      });
    };
    this._handleQuickAccess = () => {
      const qa = this._config.quick_access;
      if (!qa) return;
      const domain = qa.entity.split(".")[0];
      const action = qa.tap_action || "toggle";
      this.hass.callService(domain, action, { entity_id: qa.entity });
    };
  }
  // ---- Required Lovelace hooks ------------------------------------------
  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...config };
  }
  getCardSize() {
    return this._expanded ? 6 : 2;
  }
  shouldUpdate(changedProps) {
    if (!this._config) return false;
    if (changedProps.has("_config") || changedProps.has("_expanded") || changedProps.has("_isDraggingSlider") || changedProps.has("_draftBrightness")) {
      return true;
    }
    const oldHass = changedProps.get("hass");
    if (!oldHass) return true;
    const watchedEntities = this._getWatchedEntities();
    return watchedEntities.some((id) => oldHass.states[id] !== this.hass.states[id]);
  }
  _getWatchedEntities() {
    const ids = [];
    const c2 = this._config;
    if (c2.temperature_entity) ids.push(c2.temperature_entity);
    if (c2.humidity_entity) ids.push(c2.humidity_entity);
    if (c2.light_entity) ids.push(c2.light_entity);
    if (c2.climate_entity) ids.push(c2.climate_entity);
    if (c2.cover_entity) ids.push(c2.cover_entity);
    if (c2.quick_access?.entity) ids.push(c2.quick_access.entity);
    if (c2.switches) {
      for (const s2 of c2.switches) ids.push(s2.entity);
    }
    return ids;
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
    if (!this._lightState) return false;
    const modes = this._lightState.attributes.supported_color_modes;
    if (!modes || modes.length === 0) return false;
    return modes.some((m2) => m2 !== "onoff");
  }
  get _brightnessPct() {
    if (this._draftBrightness !== null) return this._draftBrightness;
    if (!this._lightOn) return 0;
    const b2 = this._lightState.attributes.brightness;
    if (b2 === void 0) return 100;
    return Math.round(b2 / 255 * 100);
  }
  get _coverPosition() {
    const pos = this._coverState?.attributes.current_position;
    if (pos === void 0) return 0;
    return Math.round(pos);
  }
  get _hasAnyControls() {
    return Boolean(this._lightState) || Boolean(this._climateState) || Boolean(this._coverState) || Boolean(this._config.switches?.length);
  }
  // ============================================================
  // RENDER
  // ============================================================
  render() {
    if (!this._config || !this.hass) return b``;
    const classes = {
      "layr-room": true,
      active: this._lightOn,
      expanded: this._expanded,
      "read-only": !this._hasAnyControls
    };
    const brightnessVar = (this._brightnessPct / 100).toFixed(2);
    return b`
      <ha-card class=${e(classes)} style=${o({ "--brightness": brightnessVar })}>
        ${this._renderTopRow()} ${this._renderStatsArea()}
        ${this._hasAnyControls ? b`
              <div
                class="expand-handle"
                @click=${this._toggleExpand}
                role="button"
                aria-label="Steuerelemente ein-/ausblenden"
                tabindex="0"
              ></div>
              ${this._renderControls()}
            ` : A}
      </ha-card>
    `;
  }
  // ---- Top row (icon + name) -------------------------------------------
  _renderTopRow() {
    const iconKey = this._config.icon || "default";
    const iconTpl = ROOM_ICONS[iconKey] ?? ROOM_ICONS.default;
    const name = this._config.name || "Raum";
    return b`
      <div class="row-top">
        <div class="room-header">
          <div class="icon">${iconTpl}</div>
          <div class="name-rest">${name}</div>
        </div>
        <div class="status-col"></div>
      </div>
    `;
  }
  // ---- Stats area (temp + humidity + quick-access) ----------------------
  _renderStatsArea() {
    const temp = formatTemperature(this._tempState?.state);
    const targetTemp = this._climateState?.attributes.temperature;
    const humidity = formatHumidity(this._humidityState?.state);
    return b`
      <div class="stats-area">
        <div class="stats">
          <div class="temp-block">
            <div class="value-primary">${temp}</div>
            ${targetTemp !== void 0 ? b`
                  <div class="value-secondary">
                    <span class="sec-label">Soll</span>
                    <span class="sec-num">${formatGermanNumber(targetTemp)}°</span>
                  </div>
                ` : A}
          </div>
          ${humidity !== null ? b`
                <div class="humidity-block">
                  <div class="humidity-value">${humidity}</div>
                  <div class="humidity-label">Luftfeuchte</div>
                </div>
              ` : A}
        </div>
        ${this._renderQuickAccess()}
      </div>
    `;
  }
  // ---- Quick-access button ---------------------------------------------
  _renderQuickAccess() {
    const qa = this._config.quick_access;
    if (!qa) return A;
    const state2 = this._quickAccessState;
    const isOn = state2?.state === "on";
    const label = qa.name || state2?.attributes.friendly_name || "Quick";
    return b`
      <div class="quick-access ${isOn ? "on" : ""}">
        <button
          class="quick-btn"
          type="button"
          @click=${this._handleQuickAccess}
          aria-label="${label} schalten"
        >
          ${POWER_ICON_SVG}
        </button>
        <span class="quick-label">${label}</span>
      </div>
    `;
  }
  // ---- Controls panel (expanded) ---------------------------------------
  _renderControls() {
    return b`
      <div class="controls">
        <div class="controls-inner">
          ${this._lightState ? this._renderLightControl() : A}
          ${this._climateState ? this._renderClimateControl() : A}
          ${this._coverState ? this._renderCoverControl() : A}
          ${this._config.switches?.length ? this._renderSwitches() : A}
        </div>
      </div>
    `;
  }
  // ---- Light control (slider + power) ----------------------------------
  _renderLightControl() {
    const pct = this._brightnessPct;
    const supportsDimming = this._supportsDimming;
    const isOn = this._lightOn || pct > 0;
    const cgClasses = { "control-group": true, "light-off": !isOn };
    return b`
      <div class=${e(cgClasses)}>
        <div class="control-label">
          <span class="key">Helligkeit</span>
          ${supportsDimming ? b`<span class="val">${isOn ? `${pct}%` : "aus"}</span>` : A}
        </div>
        <div class="light-toggle-row">
          <button
            class="power-btn ${isOn ? "on" : ""}"
            type="button"
            @click=${this._toggleLight}
            aria-label="Licht ein/aus"
          >
            ${POWER_ICON_SVG}
          </button>
          ${supportsDimming ? b`
                <div
                  class="slider ${this._isDraggingSlider ? "dragging" : ""}"
                  @pointerdown=${this._onSliderPointerDown}
                  @pointermove=${this._onSliderPointerMove}
                  @pointerup=${this._onSliderPointerUp}
                  @pointercancel=${this._onSliderPointerUp}
                >
                  <div class="slider-fill" style="width: ${pct}%"></div>
                  <div class="slider-thumb" style="left: ${pct}%"></div>
                </div>
              ` : A}
        </div>
      </div>
    `;
  }
  // ---- Climate control (stepper) ---------------------------------------
  _renderClimateControl() {
    const target = this._climateState.attributes.temperature ?? 0;
    const mode = this._climateState.attributes.preset_mode;
    const valLabel = mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : "";
    return b`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Heizung Soll</span>
          ${valLabel ? b`<span class="val">${valLabel}</span>` : A}
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
            <span class="num">${formatGermanNumber(target)}</span><span class="unit">°C</span>
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
    const pos = this._coverPosition;
    const posLabel = formatCoverPosition(pos);
    return b`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Rolladen</span>
          <span class="val">${posLabel}</span>
        </div>
        <div class="cover-controls">
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverOpen}
            aria-label="Rolladen hoch"
          >
            ${COVER_UP_SVG}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverStop}
            aria-label="Rolladen stop"
          >
            ${COVER_STOP_SVG}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverClose}
            aria-label="Rolladen runter"
          >
            ${COVER_DOWN_SVG}
          </button>
        </div>
      </div>
    `;
  }
  // ---- Switch list -----------------------------------------------------
  _renderSwitches() {
    return b`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Schalten</span>
        </div>
        <div class="switch-list">
          ${this._config.switches.map((sw) => {
      const state2 = this.hass.states[sw.entity];
      const isOn = state2?.state === "on";
      const label = sw.name || state2?.attributes.friendly_name || sw.entity;
      return b`
              <button
                class="switch-pill ${isOn ? "on" : ""}"
                type="button"
                @click=${() => this._toggleSwitch(sw.entity)}
              >
                <span class="switch-name">${label}</span>
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
  _updateBrightnessFromPointer(e2) {
    const slider = e2.currentTarget;
    const rect = slider.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, (e2.clientX - rect.left) / rect.width * 100));
    this._draftBrightness = Math.round(pct);
  }
  _commitBrightness(pct) {
    if (!this._config.light_entity) return;
    if (pct === 0) {
      this.hass.callService("light", "turn_off", {
        entity_id: this._config.light_entity
      });
      return;
    }
    const brightness = Math.round(pct / 100 * 255);
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.light_entity,
      brightness
    });
  }
  // ---- Switches & Quick-access -----------------------------------------
  _toggleSwitch(entityId) {
    const domain = entityId.split(".")[0];
    this.hass.callService(domain, "toggle", { entity_id: entityId });
  }
  // ---- Lifecycle cleanup -----------------------------------------------
  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopLongPress();
  }
};
LayrRoomCard.styles = i$5`
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
__decorateClass([
  n$1({ attribute: false })
], LayrRoomCard.prototype, "hass", 2);
__decorateClass([
  r$1()
], LayrRoomCard.prototype, "_config", 2);
__decorateClass([
  r$1()
], LayrRoomCard.prototype, "_expanded", 2);
__decorateClass([
  r$1()
], LayrRoomCard.prototype, "_isDraggingSlider", 2);
__decorateClass([
  r$1()
], LayrRoomCard.prototype, "_draftBrightness", 2);
LayrRoomCard = __decorateClass([
  t$2("layr-room-card")
], LayrRoomCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "layr-room-card",
  name: "Layr Room Card",
  description: "Premium room card with the Monolith design aesthetic",
  preview: true
});
console.info(
  "%c LAYR-ROOM-CARD %c v0.1.0 ",
  "color: white; background: #b8743a; font-weight: bold;",
  "color: #b8743a; background: white; font-weight: bold;"
);
export {
  LayrRoomCard
};
//# sourceMappingURL=layr.js.map
