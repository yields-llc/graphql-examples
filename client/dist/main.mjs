var be = Object.defineProperty;
var Re = (e, t, n) => t in e ? be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var S = (e, t, n) => Re(e, typeof t != "symbol" ? t + "" : t, n);
class k extends Error {
  constructor(n, s) {
    const i = `${k.extractMessage(n)}: ${JSON.stringify({
      response: n,
      request: s
    })}`;
    super(i);
    S(this, "response");
    S(this, "request");
    Object.setPrototypeOf(this, k.prototype), this.response = n, this.request = s, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, k);
  }
  static extractMessage(n) {
    var s, i;
    return ((i = (s = n.errors) == null ? void 0 : s[0]) == null ? void 0 : i.message) ?? `GraphQL Error (Code: ${String(n.status)})`;
  }
}
const se = (e) => e.toUpperCase(), j = (e) => typeof e == "function" ? e() : e, Te = (e, t) => e.map((n, s) => [n, t[s]]), C = (e) => {
  let t = {};
  return e instanceof Headers ? t = Le(e) : Array.isArray(e) ? e.forEach(([n, s]) => {
    n && s !== void 0 && (t[n] = s);
  }) : e && (t = e), t;
}, Le = (e) => {
  const t = {};
  return e.forEach((n, s) => {
    t[s] = n;
  }), t;
}, we = (e) => {
  try {
    const t = e();
    return Fe(t) ? t.catch((n) => re(n)) : t;
  } catch (t) {
    return re(t);
  }
}, re = (e) => e instanceof Error ? e : new Error(String(e)), Fe = (e) => typeof e == "object" && e !== null && "then" in e && typeof e.then == "function" && "catch" in e && typeof e.catch == "function" && "finally" in e && typeof e.finally == "function", W = (e) => {
  throw new Error(`Unhandled case: ${String(e)}`);
}, F = (e) => typeof e == "object" && e !== null && !Array.isArray(e), Pe = (e, t) => e.documents ? e : {
  documents: e,
  requestHeaders: t,
  signal: void 0
}, Me = (e, t, n) => e.query ? e : {
  query: e,
  variables: t,
  requestHeaders: n,
  signal: void 0
};
function P(e, t) {
  if (!!!e)
    throw new Error(t);
}
function qe(e) {
  return typeof e == "object" && e !== null;
}
function Be(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Ue = /\r\n|[\n\r]/g;
function H(e, t) {
  let n = 0, s = 1;
  for (const i of e.body.matchAll(Ue)) {
    if (typeof i.index == "number" || Be(!1), i.index >= t)
      break;
    n = i.index + i[0].length, s += 1;
  }
  return {
    line: s,
    column: t + 1 - n
  };
}
function Ve(e) {
  return Ne(
    e.source,
    H(e.source, e.start)
  );
}
function Ne(e, t) {
  const n = e.locationOffset.column - 1, s = "".padStart(n) + e.body, i = t.line - 1, r = e.locationOffset.line - 1, a = t.line + r, h = t.line === 1 ? n : 0, p = t.column + h, u = `${e.name}:${a}:${p}
`, d = s.split(/\r\n|[\n\r]/g), m = d[i];
  if (m.length > 120) {
    const f = Math.floor(p / 80), I = p % 80, T = [];
    for (let N = 0; N < m.length; N += 80)
      T.push(m.slice(N, N + 80));
    return u + oe([
      [`${a} |`, T[0]],
      ...T.slice(1, f + 1).map((N) => ["|", N]),
      ["|", "^".padStart(I)],
      ["|", T[f + 1]]
    ]);
  }
  return u + oe([
    // Lines specified like this: ["prefix", "string"],
    [`${a - 1} |`, d[i - 1]],
    [`${a} |`, m],
    ["|", "^".padStart(p)],
    [`${a + 1} |`, d[i + 1]]
  ]);
}
function oe(e) {
  const t = e.filter(([s, i]) => i !== void 0), n = Math.max(...t.map(([s]) => s.length));
  return t.map(([s, i]) => s.padStart(n) + (i ? " " + i : "")).join(`
`);
}
function je(e) {
  const t = e[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: e[1],
    positions: e[2],
    path: e[3],
    originalError: e[4],
    extensions: e[5]
  } : t;
}
class Z extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(t, ...n) {
    var s, i, r;
    const { nodes: a, source: h, positions: p, path: u, originalError: d, extensions: m } = je(n);
    super(t), this.name = "GraphQLError", this.path = u ?? void 0, this.originalError = d ?? void 0, this.nodes = ae(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const f = ae(
      (s = this.nodes) === null || s === void 0 ? void 0 : s.map((T) => T.loc).filter((T) => T != null)
    );
    this.source = h ?? (f == null || (i = f[0]) === null || i === void 0 ? void 0 : i.source), this.positions = p ?? (f == null ? void 0 : f.map((T) => T.start)), this.locations = p && h ? p.map((T) => H(h, T)) : f == null ? void 0 : f.map((T) => H(T.source, T.start));
    const I = qe(
      d == null ? void 0 : d.extensions
    ) ? d == null ? void 0 : d.extensions : void 0;
    this.extensions = (r = m ?? I) !== null && r !== void 0 ? r : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), d != null && d.stack ? Object.defineProperty(this, "stack", {
      value: d.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Z) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let t = this.message;
    if (this.nodes)
      for (const n of this.nodes)
        n.loc && (t += `

` + Ve(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Ne(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function ae(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function x(e, t, n) {
  return new Z(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class $e {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(t, n, s) {
    this.start = t.start, this.end = n.end, this.startToken = t, this.endToken = n, this.source = s;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class ye {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(t, n, s, i, r, a) {
    this.kind = t, this.start = n, this.end = s, this.line = i, this.column = r, this.value = a, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const xe = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, Ge = new Set(Object.keys(xe));
function ce(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && Ge.has(t);
}
var _;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(_ || (_ = {}));
var J;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(J || (J = {}));
var l;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(l || (l = {}));
function z(e) {
  return e === 9 || e === 32;
}
function L(e) {
  return e >= 48 && e <= 57;
}
function Ie(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function Oe(e) {
  return Ie(e) || e === 95;
}
function Ye(e) {
  return Ie(e) || L(e) || e === 95;
}
function He(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, s = null, i = -1;
  for (let a = 0; a < e.length; ++a) {
    var r;
    const h = e[a], p = Je(h);
    p !== h.length && (s = (r = s) !== null && r !== void 0 ? r : a, i = a, a !== 0 && p < n && (n = p));
  }
  return e.map((a, h) => h === 0 ? a : a.slice(n)).slice(
    (t = s) !== null && t !== void 0 ? t : 0,
    i + 1
  );
}
function Je(e) {
  let t = 0;
  for (; t < e.length && z(e.charCodeAt(t)); )
    ++t;
  return t;
}
function ze(e, t) {
  const n = e.replace(/"""/g, '\\"""'), s = n.split(/\r\n|[\n\r]/g), i = s.length === 1, r = s.length > 1 && s.slice(1).every((I) => I.length === 0 || z(I.charCodeAt(0))), a = n.endsWith('\\"""'), h = e.endsWith('"') && !a, p = e.endsWith("\\"), u = h || p, d = (
    // add leading and trailing new lines only if it improves readability
    !i || e.length > 70 || u || r || a
  );
  let m = "";
  const f = i && z(e.charCodeAt(0));
  return (d && !f || r) && (m += `
`), m += n, (d || u) && (m += `
`), '"""' + m + '"""';
}
var o;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(o || (o = {}));
class Qe {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(t) {
    const n = new ye(o.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = n, this.token = n, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let t = this.token;
    if (t.kind !== o.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = We(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === o.COMMENT);
    return t;
  }
}
function Xe(e) {
  return e === o.BANG || e === o.DOLLAR || e === o.AMP || e === o.PAREN_L || e === o.PAREN_R || e === o.SPREAD || e === o.COLON || e === o.EQUALS || e === o.AT || e === o.BRACKET_L || e === o.BRACKET_R || e === o.BRACE_L || e === o.PIPE || e === o.BRACE_R;
}
function b(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function q(e, t) {
  return ge(e.charCodeAt(t)) && ve(e.charCodeAt(t + 1));
}
function ge(e) {
  return e >= 55296 && e <= 56319;
}
function ve(e) {
  return e >= 56320 && e <= 57343;
}
function D(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return o.EOF;
  if (n >= 32 && n <= 126) {
    const s = String.fromCodePoint(n);
    return s === '"' ? `'"'` : `"${s}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function y(e, t, n, s, i) {
  const r = e.line, a = 1 + n - e.lineStart;
  return new ye(t, n, s, r, a, i);
}
function We(e, t) {
  const n = e.source.body, s = n.length;
  let i = t;
  for (; i < s; ) {
    const r = n.charCodeAt(i);
    switch (r) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++i;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++i, ++e.line, e.lineStart = i;
        continue;
      case 13:
        n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++e.line, e.lineStart = i;
        continue;
      // Comment
      case 35:
        return Ze(e, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return y(e, o.BANG, i, i + 1);
      case 36:
        return y(e, o.DOLLAR, i, i + 1);
      case 38:
        return y(e, o.AMP, i, i + 1);
      case 40:
        return y(e, o.PAREN_L, i, i + 1);
      case 41:
        return y(e, o.PAREN_R, i, i + 1);
      case 46:
        if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46)
          return y(e, o.SPREAD, i, i + 3);
        break;
      case 58:
        return y(e, o.COLON, i, i + 1);
      case 61:
        return y(e, o.EQUALS, i, i + 1);
      case 64:
        return y(e, o.AT, i, i + 1);
      case 91:
        return y(e, o.BRACKET_L, i, i + 1);
      case 93:
        return y(e, o.BRACKET_R, i, i + 1);
      case 123:
        return y(e, o.BRACE_L, i, i + 1);
      case 124:
        return y(e, o.PIPE, i, i + 1);
      case 125:
        return y(e, o.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 ? st(e, i) : et(e, i);
    }
    if (L(r) || r === 45)
      return Ke(e, i, r);
    if (Oe(r))
      return rt(e, i);
    throw x(
      e.source,
      i,
      r === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : b(r) || q(n, i) ? `Unexpected character: ${D(e, i)}.` : `Invalid character: ${D(e, i)}.`
    );
  }
  return y(e, o.EOF, s, s);
}
function Ze(e, t) {
  const n = e.source.body, s = n.length;
  let i = t + 1;
  for (; i < s; ) {
    const r = n.charCodeAt(i);
    if (r === 10 || r === 13)
      break;
    if (b(r))
      ++i;
    else if (q(n, i))
      i += 2;
    else
      break;
  }
  return y(
    e,
    o.COMMENT,
    t,
    i,
    n.slice(t + 1, i)
  );
}
function Ke(e, t, n) {
  const s = e.source.body;
  let i = t, r = n, a = !1;
  if (r === 45 && (r = s.charCodeAt(++i)), r === 48) {
    if (r = s.charCodeAt(++i), L(r))
      throw x(
        e.source,
        i,
        `Invalid number, unexpected digit after 0: ${D(
          e,
          i
        )}.`
      );
  } else
    i = $(e, i, r), r = s.charCodeAt(i);
  if (r === 46 && (a = !0, r = s.charCodeAt(++i), i = $(e, i, r), r = s.charCodeAt(i)), (r === 69 || r === 101) && (a = !0, r = s.charCodeAt(++i), (r === 43 || r === 45) && (r = s.charCodeAt(++i)), i = $(e, i, r), r = s.charCodeAt(i)), r === 46 || Oe(r))
    throw x(
      e.source,
      i,
      `Invalid number, expected digit but got: ${D(
        e,
        i
      )}.`
    );
  return y(
    e,
    a ? o.FLOAT : o.INT,
    t,
    i,
    s.slice(t, i)
  );
}
function $(e, t, n) {
  if (!L(n))
    throw x(
      e.source,
      t,
      `Invalid number, expected digit but got: ${D(
        e,
        t
      )}.`
    );
  const s = e.source.body;
  let i = t + 1;
  for (; L(s.charCodeAt(i)); )
    ++i;
  return i;
}
function et(e, t) {
  const n = e.source.body, s = n.length;
  let i = t + 1, r = i, a = "";
  for (; i < s; ) {
    const h = n.charCodeAt(i);
    if (h === 34)
      return a += n.slice(r, i), y(e, o.STRING, t, i + 1, a);
    if (h === 92) {
      a += n.slice(r, i);
      const p = n.charCodeAt(i + 1) === 117 ? n.charCodeAt(i + 2) === 123 ? tt(e, i) : nt(e, i) : it(e, i);
      a += p.value, i += p.size, r = i;
      continue;
    }
    if (h === 10 || h === 13)
      break;
    if (b(h))
      ++i;
    else if (q(n, i))
      i += 2;
    else
      throw x(
        e.source,
        i,
        `Invalid character within String: ${D(
          e,
          i
        )}.`
      );
  }
  throw x(e.source, i, "Unterminated string.");
}
function tt(e, t) {
  const n = e.source.body;
  let s = 0, i = 3;
  for (; i < 12; ) {
    const r = n.charCodeAt(t + i++);
    if (r === 125) {
      if (i < 5 || !b(s))
        break;
      return {
        value: String.fromCodePoint(s),
        size: i
      };
    }
    if (s = s << 4 | R(r), s < 0)
      break;
  }
  throw x(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + i
    )}".`
  );
}
function nt(e, t) {
  const n = e.source.body, s = ue(n, t + 2);
  if (b(s))
    return {
      value: String.fromCodePoint(s),
      size: 6
    };
  if (ge(s) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const i = ue(n, t + 8);
    if (ve(i))
      return {
        value: String.fromCodePoint(s, i),
        size: 12
      };
  }
  throw x(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function ue(e, t) {
  return R(e.charCodeAt(t)) << 12 | R(e.charCodeAt(t + 1)) << 8 | R(e.charCodeAt(t + 2)) << 4 | R(e.charCodeAt(t + 3));
}
function R(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function it(e, t) {
  const n = e.source.body;
  switch (n.charCodeAt(t + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw x(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function st(e, t) {
  const n = e.source.body, s = n.length;
  let i = e.lineStart, r = t + 3, a = r, h = "";
  const p = [];
  for (; r < s; ) {
    const u = n.charCodeAt(r);
    if (u === 34 && n.charCodeAt(r + 1) === 34 && n.charCodeAt(r + 2) === 34) {
      h += n.slice(a, r), p.push(h);
      const d = y(
        e,
        o.BLOCK_STRING,
        t,
        r + 3,
        // Return a string of the lines joined with U+000A.
        He(p).join(`
`)
      );
      return e.line += p.length - 1, e.lineStart = i, d;
    }
    if (u === 92 && n.charCodeAt(r + 1) === 34 && n.charCodeAt(r + 2) === 34 && n.charCodeAt(r + 3) === 34) {
      h += n.slice(a, r), a = r + 1, r += 4;
      continue;
    }
    if (u === 10 || u === 13) {
      h += n.slice(a, r), p.push(h), u === 13 && n.charCodeAt(r + 1) === 10 ? r += 2 : ++r, h = "", a = r, i = r;
      continue;
    }
    if (b(u))
      ++r;
    else if (q(n, r))
      r += 2;
    else
      throw x(
        e.source,
        r,
        `Invalid character within String: ${D(
          e,
          r
        )}.`
      );
  }
  throw x(e.source, r, "Unterminated string.");
}
function rt(e, t) {
  const n = e.source.body, s = n.length;
  let i = t + 1;
  for (; i < s; ) {
    const r = n.charCodeAt(i);
    if (Ye(r))
      ++i;
    else
      break;
  }
  return y(
    e,
    o.NAME,
    t,
    i,
    n.slice(t, i)
  );
}
const ot = 10, Ae = 2;
function K(e) {
  return B(e, []);
}
function B(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return at(e, t);
    default:
      return String(e);
  }
}
function at(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (ct(e)) {
    const s = e.toJSON();
    if (s !== e)
      return typeof s == "string" ? s : B(s, n);
  } else if (Array.isArray(e))
    return lt(e, n);
  return ut(e, n);
}
function ct(e) {
  return typeof e.toJSON == "function";
}
function ut(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > Ae ? "[" + ht(e) + "]" : "{ " + n.map(
    ([i, r]) => i + ": " + B(r, t)
  ).join(", ") + " }";
}
function lt(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > Ae)
    return "[Array]";
  const n = Math.min(ot, e.length), s = e.length - n, i = [];
  for (let r = 0; r < n; ++r)
    i.push(B(e[r], t));
  return s === 1 ? i.push("... 1 more item") : s > 1 && i.push(`... ${s} more items`), "[" + i.join(", ") + "]";
}
function ht(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const pt = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", dt = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  pt ? function(t, n) {
    return t instanceof n;
  } : function(t, n) {
    if (t instanceof n)
      return !0;
    if (typeof t == "object" && t !== null) {
      var s;
      const i = n.prototype[Symbol.toStringTag], r = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (s = t.constructor) === null || s === void 0 ? void 0 : s.name
      );
      if (i === r) {
        const a = K(t);
        throw new Error(`Cannot use ${i} "${a}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class _e {
  constructor(t, n = "GraphQL request", s = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || P(!1, `Body must be a string. Received: ${K(t)}.`), this.body = t, this.name = n, this.locationOffset = s, this.locationOffset.line > 0 || P(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || P(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function ft(e) {
  return dt(e, _e);
}
function De(e, t) {
  const n = new Et(e, t), s = n.parseDocument();
  return Object.defineProperty(s, "tokenCount", {
    enumerable: !1,
    value: n.tokenCount
  }), s;
}
class Et {
  constructor(t, n = {}) {
    const s = ft(t) ? t : new _e(t);
    this._lexer = new Qe(s), this._options = n, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(o.NAME);
    return this.node(t, {
      kind: l.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: l.DOCUMENT,
      definitions: this.many(
        o.SOF,
        this.parseDefinition,
        o.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(o.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (n.kind === o.NAME) {
      switch (n.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (t)
        throw x(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (n.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(n);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(o.BRACE_L))
      return this.node(t, {
        kind: l.OPERATION_DEFINITION,
        operation: _.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseOperationType();
    let s;
    return this.peek(o.NAME) && (s = this.parseName()), this.node(t, {
      kind: l.OPERATION_DEFINITION,
      operation: n,
      name: s,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(o.NAME);
    switch (t.value) {
      case "query":
        return _.QUERY;
      case "mutation":
        return _.MUTATION;
      case "subscription":
        return _.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      o.PAREN_L,
      this.parseVariableDefinition,
      o.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: l.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(o.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(o.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(o.DOLLAR), this.node(t, {
      kind: l.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: l.SELECTION_SET,
      selections: this.many(
        o.BRACE_L,
        this.parseSelection,
        o.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(o.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let s, i;
    return this.expectOptionalToken(o.COLON) ? (s = n, i = this.parseName()) : i = n, this.node(t, {
      kind: l.FIELD,
      alias: s,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(o.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(o.PAREN_L, n, o.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, s = this.parseName();
    return this.expectToken(o.COLON), this.node(n, {
      kind: l.ARGUMENT,
      name: s,
      value: this.parseValueLiteral(t)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const t = this._lexer.token;
    this.expectToken(o.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(o.NAME) ? this.node(t, {
      kind: l.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: l.INLINE_FRAGMENT,
      typeCondition: n ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const t = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(t, {
      kind: l.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: l.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(t) {
    const n = this._lexer.token;
    switch (n.kind) {
      case o.BRACKET_L:
        return this.parseList(t);
      case o.BRACE_L:
        return this.parseObject(t);
      case o.INT:
        return this.advanceLexer(), this.node(n, {
          kind: l.INT,
          value: n.value
        });
      case o.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: l.FLOAT,
          value: n.value
        });
      case o.STRING:
      case o.BLOCK_STRING:
        return this.parseStringLiteral();
      case o.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: l.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: l.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: l.NULL
            });
          default:
            return this.node(n, {
              kind: l.ENUM,
              value: n.value
            });
        }
      case o.DOLLAR:
        if (t)
          if (this.expectToken(o.DOLLAR), this._lexer.token.kind === o.NAME) {
            const s = this._lexer.token.value;
            throw x(
              this._lexer.source,
              n.start,
              `Unexpected variable "$${s}" in constant value.`
            );
          } else
            throw this.unexpected(n);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const t = this._lexer.token;
    return this.advanceLexer(), this.node(t, {
      kind: l.STRING,
      value: t.value,
      block: t.kind === o.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const n = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: l.LIST,
      values: this.any(o.BRACKET_L, n, o.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(t) {
    const n = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: l.OBJECT,
      fields: this.any(o.BRACE_L, n, o.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, s = this.parseName();
    return this.expectToken(o.COLON), this.node(n, {
      kind: l.OBJECT_FIELD,
      name: s,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const n = [];
    for (; this.peek(o.AT); )
      n.push(this.parseDirective(t));
    return n;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(t) {
    const n = this._lexer.token;
    return this.expectToken(o.AT), this.node(n, {
      kind: l.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(t)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const t = this._lexer.token;
    let n;
    if (this.expectOptionalToken(o.BRACKET_L)) {
      const s = this.parseTypeReference();
      this.expectToken(o.BRACKET_R), n = this.node(t, {
        kind: l.LIST_TYPE,
        type: s
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(o.BANG) ? this.node(t, {
      kind: l.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: l.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(o.STRING) || this.peek(o.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("schema");
    const s = this.parseConstDirectives(), i = this.many(
      o.BRACE_L,
      this.parseOperationTypeDefinition,
      o.BRACE_R
    );
    return this.node(t, {
      kind: l.SCHEMA_DEFINITION,
      description: n,
      directives: s,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, n = this.parseOperationType();
    this.expectToken(o.COLON);
    const s = this.parseNamedType();
    return this.node(t, {
      kind: l.OPERATION_TYPE_DEFINITION,
      operation: n,
      type: s
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("scalar");
    const s = this.parseName(), i = this.parseConstDirectives();
    return this.node(t, {
      kind: l.SCALAR_TYPE_DEFINITION,
      description: n,
      name: s,
      directives: i
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("type");
    const s = this.parseName(), i = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: l.OBJECT_TYPE_DEFINITION,
      description: n,
      name: s,
      interfaces: i,
      directives: r,
      fields: a
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(o.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      o.BRACE_L,
      this.parseFieldDefinition,
      o.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), s = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(o.COLON);
    const r = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(t, {
      kind: l.FIELD_DEFINITION,
      description: n,
      name: s,
      arguments: i,
      type: r,
      directives: a
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      o.PAREN_L,
      this.parseInputValueDef,
      o.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), s = this.parseName();
    this.expectToken(o.COLON);
    const i = this.parseTypeReference();
    let r;
    this.expectOptionalToken(o.EQUALS) && (r = this.parseConstValueLiteral());
    const a = this.parseConstDirectives();
    return this.node(t, {
      kind: l.INPUT_VALUE_DEFINITION,
      description: n,
      name: s,
      type: i,
      defaultValue: r,
      directives: a
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("interface");
    const s = this.parseName(), i = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: l.INTERFACE_TYPE_DEFINITION,
      description: n,
      name: s,
      interfaces: i,
      directives: r,
      fields: a
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("union");
    const s = this.parseName(), i = this.parseConstDirectives(), r = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: l.UNION_TYPE_DEFINITION,
      description: n,
      name: s,
      directives: i,
      types: r
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(o.EQUALS) ? this.delimitedMany(o.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("enum");
    const s = this.parseName(), i = this.parseConstDirectives(), r = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: l.ENUM_TYPE_DEFINITION,
      description: n,
      name: s,
      directives: i,
      values: r
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      o.BRACE_L,
      this.parseEnumValueDefinition,
      o.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), s = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(t, {
      kind: l.ENUM_VALUE_DEFINITION,
      description: n,
      name: s,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw x(
        this._lexer.source,
        this._lexer.token.start,
        `${w(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("input");
    const s = this.parseName(), i = this.parseConstDirectives(), r = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: l.INPUT_OBJECT_TYPE_DEFINITION,
      description: n,
      name: s,
      directives: i,
      fields: r
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      o.BRACE_L,
      this.parseInputValueDef,
      o.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const t = this._lexer.lookahead();
    if (t.kind === o.NAME)
      switch (t.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(t);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const n = this.parseConstDirectives(), s = this.optionalMany(
      o.BRACE_L,
      this.parseOperationTypeDefinition,
      o.BRACE_R
    );
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.SCHEMA_EXTENSION,
      directives: n,
      operationTypes: s
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const n = this.parseName(), s = this.parseConstDirectives();
    if (s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.SCALAR_TYPE_EXTENSION,
      name: n,
      directives: s
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), r = this.parseFieldsDefinition();
    if (s.length === 0 && i.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.OBJECT_TYPE_EXTENSION,
      name: n,
      interfaces: s,
      directives: i,
      fields: r
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), r = this.parseFieldsDefinition();
    if (s.length === 0 && i.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.INTERFACE_TYPE_EXTENSION,
      name: n,
      interfaces: s,
      directives: i,
      fields: r
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.UNION_TYPE_EXTENSION,
      name: n,
      directives: s,
      types: i
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.ENUM_TYPE_EXTENSION,
      name: n,
      directives: s,
      values: i
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: l.INPUT_OBJECT_TYPE_EXTENSION,
      name: n,
      directives: s,
      fields: i
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(o.AT);
    const s = this.parseName(), i = this.parseArgumentDefs(), r = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const a = this.parseDirectiveLocations();
    return this.node(t, {
      kind: l.DIRECTIVE_DEFINITION,
      description: n,
      name: s,
      arguments: i,
      repeatable: r,
      locations: a
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(o.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const t = this._lexer.token, n = this.parseName();
    if (Object.prototype.hasOwnProperty.call(J, n.value))
      return n;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, n) {
    return this._options.noLocation !== !0 && (n.loc = new $e(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), n;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(t) {
    return this._lexer.token.kind === t;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(t) {
    const n = this._lexer.token;
    if (n.kind === t)
      return this.advanceLexer(), n;
    throw x(
      this._lexer.source,
      n.start,
      `Expected ${Se(t)}, found ${w(n)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(t) {
    return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(t) {
    const n = this._lexer.token;
    if (n.kind === o.NAME && n.value === t)
      this.advanceLexer();
    else
      throw x(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${w(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === o.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return x(
      this._lexer.source,
      n.start,
      `Unexpected ${w(n)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, n, s) {
    this.expectToken(t);
    const i = [];
    for (; !this.expectOptionalToken(s); )
      i.push(n.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, n, s) {
    if (this.expectOptionalToken(t)) {
      const i = [];
      do
        i.push(n.call(this));
      while (!this.expectOptionalToken(s));
      return i;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, n, s) {
    this.expectToken(t);
    const i = [];
    do
      i.push(n.call(this));
    while (!this.expectOptionalToken(s));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, n) {
    this.expectOptionalToken(t);
    const s = [];
    do
      s.push(n.call(this));
    while (this.expectOptionalToken(t));
    return s;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, n = this._lexer.advance();
    if (n.kind !== o.EOF && (++this._tokenCounter, t !== void 0 && this._tokenCounter > t))
      throw x(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function w(e) {
  const t = e.value;
  return Se(e.kind) + (t != null ? ` "${t}"` : "");
}
function Se(e) {
  return Xe(e) ? `"${e}"` : e;
}
function mt(e) {
  return `"${e.replace(Tt, Nt)}"`;
}
const Tt = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function Nt(e) {
  return yt[e.charCodeAt(0)];
}
const yt = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], xt = Object.freeze({});
function It(e, t, n = xe) {
  const s = /* @__PURE__ */ new Map();
  for (const g of Object.values(l))
    s.set(g, Ot(t, g));
  let i, r = Array.isArray(e), a = [e], h = -1, p = [], u = e, d, m;
  const f = [], I = [];
  do {
    h++;
    const g = h === a.length, te = g && p.length !== 0;
    if (g) {
      if (d = I.length === 0 ? void 0 : f[f.length - 1], u = m, m = I.pop(), te)
        if (r) {
          u = u.slice();
          let A = 0;
          for (const [V, ne] of p) {
            const ie = V - A;
            ne === null ? (u.splice(ie, 1), A++) : u[ie] = ne;
          }
        } else {
          u = { ...u };
          for (const [A, V] of p)
            u[A] = V;
        }
      h = i.index, a = i.keys, p = i.edits, r = i.inArray, i = i.prev;
    } else if (m) {
      if (d = r ? h : a[h], u = m[d], u == null)
        continue;
      f.push(d);
    }
    let v;
    if (!Array.isArray(u)) {
      var T, N;
      ce(u) || P(!1, `Invalid AST Node: ${K(u)}.`);
      const A = g ? (T = s.get(u.kind)) === null || T === void 0 ? void 0 : T.leave : (N = s.get(u.kind)) === null || N === void 0 ? void 0 : N.enter;
      if (v = A == null ? void 0 : A.call(t, u, d, m, f, I), v === xt)
        break;
      if (v === !1) {
        if (!g) {
          f.pop();
          continue;
        }
      } else if (v !== void 0 && (p.push([d, v]), !g))
        if (ce(v))
          u = v;
        else {
          f.pop();
          continue;
        }
    }
    if (v === void 0 && te && p.push([d, u]), g)
      f.pop();
    else {
      var U;
      i = {
        inArray: r,
        index: h,
        keys: a,
        edits: p,
        prev: i
      }, r = Array.isArray(u), a = r ? u : (U = n[u.kind]) !== null && U !== void 0 ? U : [], h = -1, p = [], m && I.push(m), m = u;
    }
  } while (i !== void 0);
  return p.length !== 0 ? p[p.length - 1][1] : e;
}
function Ot(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function gt(e) {
  return It(e, At);
}
const vt = 80, At = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => c(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = E("(", c(e.variableDefinitions, ", "), ")"), n = c(
        [
          e.operation,
          c([e.name, t]),
          c(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: s }) => e + ": " + t + E(" = ", n) + E(" ", c(s, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => O(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: s, selectionSet: i }) {
      const r = E("", e, ": ") + t;
      let a = r + E("(", c(n, ", "), ")");
      return a.length > vt && (a = r + E(`(
`, M(c(n, `
`)), `
)`)), c([a, c(s, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + E(" ", c(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => c(
      [
        "...",
        E("on ", e),
        c(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: s, selectionSet: i }) => (
      // or removed in the future.
      `fragment ${e}${E("(", c(n, ", "), ")")} on ${t} ${E("", c(s, " "), " ")}` + i
    )
  },
  // Value
  IntValue: {
    leave: ({ value: e }) => e
  },
  FloatValue: {
    leave: ({ value: e }) => e
  },
  StringValue: {
    leave: ({ value: e, block: t }) => t ? ze(e) : mt(e)
  },
  BooleanValue: {
    leave: ({ value: e }) => e ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: e }) => e
  },
  ListValue: {
    leave: ({ values: e }) => "[" + c(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + c(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + E("(", c(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: e }) => e
  },
  ListType: {
    leave: ({ type: e }) => "[" + e + "]"
  },
  NonNullType: {
    leave: ({ type: e }) => e + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: e, directives: t, operationTypes: n }) => E("", e, `
`) + c(["schema", c(t, " "), O(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => E("", e, `
`) + c(["scalar", t, c(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: s, fields: i }) => E("", e, `
`) + c(
      [
        "type",
        t,
        E("implements ", c(n, " & ")),
        c(s, " "),
        O(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: s, directives: i }) => E("", e, `
`) + t + (le(n) ? E(`(
`, M(c(n, `
`)), `
)`) : E("(", c(n, ", "), ")")) + ": " + s + E(" ", c(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: s, directives: i }) => E("", e, `
`) + c(
      [t + ": " + n, E("= ", s), c(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: s, fields: i }) => E("", e, `
`) + c(
      [
        "interface",
        t,
        E("implements ", c(n, " & ")),
        c(s, " "),
        O(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: s }) => E("", e, `
`) + c(
      ["union", t, c(n, " "), E("= ", c(s, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: s }) => E("", e, `
`) + c(["enum", t, c(n, " "), O(s)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => E("", e, `
`) + c([t, c(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: s }) => E("", e, `
`) + c(["input", t, c(n, " "), O(s)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: s, locations: i }) => E("", e, `
`) + "directive @" + t + (le(n) ? E(`(
`, M(c(n, `
`)), `
)`) : E("(", c(n, ", "), ")")) + (s ? " repeatable" : "") + " on " + c(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => c(
      ["extend schema", c(e, " "), O(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => c(["extend scalar", e, c(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: s }) => c(
      [
        "extend type",
        e,
        E("implements ", c(t, " & ")),
        c(n, " "),
        O(s)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: s }) => c(
      [
        "extend interface",
        e,
        E("implements ", c(t, " & ")),
        c(n, " "),
        O(s)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => c(
      [
        "extend union",
        e,
        c(t, " "),
        E("= ", c(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => c(["extend enum", e, c(t, " "), O(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => c(["extend input", e, c(t, " "), O(n)], " ")
  }
};
function c(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((s) => s).join(t)) !== null && n !== void 0 ? n : "";
}
function O(e) {
  return E(`{
`, M(c(e, `
`)), `
}`);
}
function E(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function M(e) {
  return E("  ", e.replace(/\n/g, `
  `));
}
function le(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const he = "Accept", Q = "Content-Type", X = "application/json", Ce = "application/graphql-response+json", pe = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), _t = (e) => {
  const t = e.toLowerCase();
  return t.includes(Ce) || t.includes(X);
}, de = (e) => {
  try {
    if (Array.isArray(e))
      return {
        _tag: "Batch",
        executionResults: e.map(fe)
      };
    if (F(e))
      return {
        _tag: "Single",
        executionResult: fe(e)
      };
    throw new Error(`Invalid execution result: result is not object or array. 
Got:
${String(e)}`);
  } catch (t) {
    return t;
  }
}, fe = (e) => {
  if (typeof e != "object" || e === null)
    throw new Error("Invalid execution result: result is not object");
  let t, n, s;
  if ("errors" in e) {
    if (!F(e.errors) && !Array.isArray(e.errors))
      throw new Error("Invalid execution result: errors is not plain object OR array");
    t = e.errors;
  }
  if ("data" in e) {
    if (!F(e.data) && e.data !== null)
      throw new Error("Invalid execution result: data is not plain object");
    n = e.data;
  }
  if ("extensions" in e) {
    if (!F(e.extensions))
      throw new Error("Invalid execution result: extensions is not plain object");
    s = e.extensions;
  }
  return {
    data: n,
    errors: t,
    extensions: s
  };
}, Dt = (e) => e._tag === "Batch" ? e.executionResults.some(Ee) : Ee(e.executionResult), Ee = (e) => Array.isArray(e.errors) ? e.errors.length > 0 : !!e.errors, ke = (e) => typeof e == "object" && e !== null && "kind" in e && e.kind === l.OPERATION_DEFINITION, St = (e) => {
  var s;
  let t;
  const n = e.definitions.filter(ke);
  return n.length === 1 && (t = (s = n[0].name) == null ? void 0 : s.value), t;
}, Ct = (e) => {
  let t = !1;
  const n = e.definitions.filter(ke);
  return n.length === 1 && (t = n[0].operation === _.MUTATION), t;
}, G = (e, t) => {
  const n = typeof e == "string" ? e : gt(e);
  let s = !1, i;
  if (t)
    return { expression: n, isMutation: s, operationName: i };
  const r = we(() => typeof e == "string" ? De(e) : e);
  return r instanceof Error ? { expression: n, isMutation: s, operationName: i } : (i = St(r), s = Ct(r), { expression: n, operationName: i, isMutation: s });
}, ee = JSON, Y = async (e) => {
  const t = {
    ...e,
    method: e.request._tag === "Single" ? e.request.document.isMutation ? "POST" : se(e.method ?? "post") : e.request.hasMutations ? "POST" : se(e.method ?? "post"),
    fetchOptions: {
      ...e.fetchOptions,
      errorPolicy: e.fetchOptions.errorPolicy ?? "none"
    }
  }, s = await bt(t.method)(t);
  if (!s.ok)
    return new k({ status: s.status, headers: s.headers }, {
      query: e.request._tag === "Single" ? e.request.document.expression : e.request.query,
      variables: e.request.variables
    });
  const i = await kt(s, e.fetchOptions.jsonSerializer ?? ee);
  if (i instanceof Error)
    throw i;
  const r = {
    status: s.status,
    headers: s.headers
  };
  if (Dt(i) && t.fetchOptions.errorPolicy === "none") {
    const a = i._tag === "Batch" ? { ...i.executionResults, ...r } : {
      ...i.executionResult,
      ...r
    };
    return new k(a, {
      query: e.request._tag === "Single" ? e.request.document.expression : e.request.query,
      variables: e.request.variables
    });
  }
  switch (i._tag) {
    case "Single":
      return {
        ...r,
        ...me(t)(i.executionResult)
      };
    case "Batch":
      return {
        ...r,
        data: i.executionResults.map(me(t))
      };
    default:
      W(i);
  }
}, me = (e) => (t) => ({
  extensions: t.extensions,
  data: t.data,
  errors: e.fetchOptions.errorPolicy === "all" ? t.errors : void 0
}), kt = async (e, t) => {
  const n = e.headers.get(Q), s = await e.text();
  return n && _t(n) ? de(t.parse(s)) : de(s);
}, bt = (e) => async (t) => {
  const n = new Headers(t.headers);
  let s = null, i;
  n.has(he) || n.set(he, [Ce, X].join(", ")), e === "POST" ? (i = (t.fetchOptions.jsonSerializer ?? ee).stringify(Rt(t)), typeof i == "string" && !n.has(Q) && n.set(Q, X)) : s = Lt(t);
  const r = { method: e, headers: n, body: i, ...t.fetchOptions };
  let a = new URL(t.url), h = r;
  if (t.middleware) {
    const u = await Promise.resolve(t.middleware({
      ...r,
      url: t.url,
      operationName: t.request._tag === "Single" ? t.request.document.operationName : void 0,
      variables: t.request.variables
    })), { url: d, ...m } = u;
    a = new URL(d), h = m;
  }
  return s && s.forEach((u, d) => {
    a.searchParams.append(d, u);
  }), await (t.fetch ?? fetch)(a, h);
}, Rt = (e) => {
  switch (e.request._tag) {
    case "Single":
      return {
        query: e.request.document.expression,
        variables: e.request.variables,
        operationName: e.request.document.operationName
      };
    case "Batch":
      return Te(e.request.query, e.request.variables ?? []).map(([t, n]) => ({
        query: t,
        variables: n
      }));
    default:
      throw W(e.request);
  }
}, Lt = (e) => {
  var s;
  const t = e.fetchOptions.jsonSerializer ?? ee, n = new URLSearchParams();
  switch (e.request._tag) {
    case "Single":
      return n.append("query", pe(e.request.document.expression)), e.request.variables && n.append("variables", t.stringify(e.request.variables)), e.request.document.operationName && n.append("operationName", e.request.document.operationName), n;
    case "Batch": {
      const i = ((s = e.request.variables) == null ? void 0 : s.map((h) => t.stringify(h))) ?? [], r = e.request.query.map(pe), a = Te(r, i).map(([h, p]) => ({
        query: h,
        variables: p
      }));
      return n.append("query", t.stringify(a)), n;
    }
    default:
      throw W(e.request);
  }
};
class wt {
  constructor(t, n = {}) {
    S(this, "url");
    S(this, "requestConfig");
    /**
     * Send a GraphQL query to the server.
     */
    S(this, "rawRequest", async (...t) => {
      const [n, s, i] = t, r = Me(n, s, i), { headers: a, fetch: h = globalThis.fetch, method: p = "POST", requestMiddleware: u, responseMiddleware: d, excludeOperationName: m, ...f } = this.requestConfig, { url: I } = this;
      r.signal !== void 0 && (f.signal = r.signal);
      const T = G(r.query, m), N = await Y({
        url: I,
        request: {
          _tag: "Single",
          document: T,
          variables: r.variables
        },
        headers: {
          ...C(j(a)),
          ...C(r.requestHeaders)
        },
        fetch: h,
        method: p,
        fetchOptions: f,
        middleware: u
      });
      if (d && await d(N, {
        operationName: T.operationName,
        variables: s,
        url: this.url
      }), N instanceof Error)
        throw N;
      return N;
    });
    this.url = t, this.requestConfig = n;
  }
  async request(t, ...n) {
    const [s, i] = n, r = Ft(t, s, i), { headers: a, fetch: h = globalThis.fetch, method: p = "POST", requestMiddleware: u, responseMiddleware: d, excludeOperationName: m, ...f } = this.requestConfig, { url: I } = this;
    r.signal !== void 0 && (f.signal = r.signal);
    const T = G(r.document, m), N = await Y({
      url: I,
      request: {
        _tag: "Single",
        document: T,
        variables: r.variables
      },
      headers: {
        ...C(j(a)),
        ...C(r.requestHeaders)
      },
      fetch: h,
      method: p,
      fetchOptions: f,
      middleware: u
    });
    if (d && await d(N, {
      operationName: T.operationName,
      variables: r.variables,
      url: this.url
    }), N instanceof Error)
      throw N;
    return N.data;
  }
  async batchRequests(t, n) {
    const s = Pe(t, n), { headers: i, excludeOperationName: r, ...a } = this.requestConfig;
    s.signal !== void 0 && (a.signal = s.signal);
    const h = s.documents.map(({ document: f }) => G(f, r)), p = h.map(({ expression: f }) => f), u = h.some(({ isMutation: f }) => f), d = s.documents.map(({ variables: f }) => f), m = await Y({
      url: this.url,
      request: {
        _tag: "Batch",
        operationName: void 0,
        query: p,
        hasMutations: u,
        variables: d
      },
      headers: {
        ...C(j(i)),
        ...C(s.requestHeaders)
      },
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || "POST",
      fetchOptions: a,
      middleware: this.requestConfig.requestMiddleware
    });
    if (this.requestConfig.responseMiddleware && await this.requestConfig.responseMiddleware(m, {
      operationName: void 0,
      variables: d,
      url: this.url
    }), m instanceof Error)
      throw m;
    return m.data;
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, n) {
    const { headers: s } = this.requestConfig;
    return s ? s[t] = n : this.requestConfig.headers = { [t]: n }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const Ft = (e, t, n) => e.document ? e : {
  document: e,
  variables: t,
  requestHeaders: n,
  signal: void 0
}, Pt = (e, ...t) => e.reduce((n, s, i) => `${n}${s}${i in t ? String(t[i]) : ""}`, ""), Mt = new wt(process.env.GRAPHQL_ENDPOINT || "");
async function Bt() {
  const e = De(Pt`
    query Query {
      listProjects {
        id
        name
        owner {
          id
          username
        }
      }
    }
  `);
  try {
    return (await Mt.request(e)).listProjects;
  } catch (t) {
    throw console.error(t), t;
  }
}
export {
  Bt as listProjects
};
