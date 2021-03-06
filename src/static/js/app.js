"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*! highlight.js v9.3.0 | BSD3 License | git.io/hljslicense */
!function (e) {
  var n = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self;"undefined" != typeof exports ? e(exports) : n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return n.hljs;
  }));
}(function (e) {
  function n(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
  }function t(e) {
    return e.nodeName.toLowerCase();
  }function r(e, n) {
    var t = e && e.exec(n);return t && 0 == t.index;
  }function a(e) {
    return (/^(no-?highlight|plain|text)$/i.test(e)
    );
  }function i(e) {
    var n,
        t,
        r,
        i = e.className + " ";if (i += e.parentNode ? e.parentNode.className : "", t = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)) return w(t[1]) ? t[1] : "no-highlight";for (i = i.split(/\s+/), n = 0, r = i.length; r > n; n++) {
      if (w(i[n]) || a(i[n])) return i[n];
    }
  }function o(e, n) {
    var t,
        r = {};for (t in e) {
      r[t] = e[t];
    }if (n) for (t in n) {
      r[t] = n[t];
    }return r;
  }function u(e) {
    var n = [];return function r(e, a) {
      for (var i = e.firstChild; i; i = i.nextSibling) {
        3 == i.nodeType ? a += i.nodeValue.length : 1 == i.nodeType && (n.push({ event: "start", offset: a, node: i }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: i }));
      }return a;
    }(e, 0), n;
  }function c(e, r, a) {
    function i() {
      return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
    }function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }f += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
    }function u(e) {
      f += "</" + t(e) + ">";
    }function c(e) {
      ("start" == e.event ? o : u)(e.node);
    }for (var s = 0, f = "", l = []; e.length || r.length;) {
      var g = i();if (f += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e) {
        l.reverse().forEach(u);do {
          c(g.splice(0, 1)[0]), g = i();
        } while (g == e && g.length && g[0].offset == s);l.reverse().forEach(o);
      } else "start" == g[0].event ? l.push(g[0].node) : l.pop(), c(g.splice(0, 1)[0]);
    }return f + n(a.substr(s));
  }function s(e) {
    function n(e) {
      return e && e.source || e;
    }function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }function r(a, i) {
      if (!a.compiled) {
        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
          var u = {},
              c = function c(n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };"string" == typeof a.k ? c("keyword", a.k) : Object.keys(a.k).forEach(function (e) {
            c(e, a.k[e]);
          }), a.k = u;
        }a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
          e.v ? e.v.forEach(function (n) {
            s.push(o(e, n));
          }) : s.push("self" == e ? a : e);
        }), a.c = s, a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);var f = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = f.length ? t(f.join("|"), !0) : { exec: function exec() {
            return null;
          } };
      }
    }r(e);
  }function f(e, t, a, i) {
    function o(e, n) {
      for (var t = 0; t < n.c.length; t++) {
        if (r(n.c[t].bR, e)) return n.c[t];
      }
    }function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent;) {
          e = e.parent;
        }return e;
      }return e.eW ? u(e.parent, n) : void 0;
    }function c(e, n) {
      return !a && r(n.iR, e);
    }function g(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
    }function p(e, n, t, r) {
      var a = r ? "" : E.classPrefix,
          i = '<span class="' + a,
          o = t ? "" : "</span>";return i += e + '">', i + n + o;
    }function h() {
      if (!k.k) return n(M);var e = "",
          t = 0;k.lR.lastIndex = 0;for (var r = k.lR.exec(M); r;) {
        e += n(M.substr(t, r.index - t));var a = g(k, r);a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = k.lR.lastIndex, r = k.lR.exec(M);
      }return e + n(M.substr(t));
    }function d() {
      var e = "string" == typeof k.sL;if (e && !R[k.sL]) return n(M);var t = e ? f(k.sL, M, !0, y[k.sL]) : l(M, k.sL.length ? k.sL : void 0);return k.r > 0 && (B += t.r), e && (y[k.sL] = t.top), p(t.language, t.value, !1, !0);
    }function b() {
      L += void 0 !== k.sL ? d() : h(), M = "";
    }function v(e, n) {
      L += e.cN ? p(e.cN, "", !0) : "", k = Object.create(e, { parent: { value: k } });
    }function m(e, n) {
      if (M += e, void 0 === n) return b(), 0;var t = o(n, k);if (t) return t.skip ? M += n : (t.eB && (M += n), b(), t.rB || t.eB || (M = n)), v(t, n), t.rB ? 0 : n.length;var r = u(k, n);if (r) {
        var a = k;a.skip ? M += n : (a.rE || a.eE || (M += n), b(), a.eE && (M = n));do {
          k.cN && (L += "</span>"), k.skip || (B += k.r), k = k.parent;
        } while (k != r.parent);return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
      }if (c(n, k)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (k.cN || "<unnamed>") + '"');return M += n, n.length || 1;
    }var N = w(e);if (!N) throw new Error('Unknown language: "' + e + '"');s(N);var x,
        k = i || N,
        y = {},
        L = "";for (x = k; x != N; x = x.parent) {
      x.cN && (L = p(x.cN, "", !0) + L);
    }var M = "",
        B = 0;try {
      for (var C, j, I = 0;;) {
        if (k.t.lastIndex = I, C = k.t.exec(t), !C) break;j = m(t.substr(I, C.index - I), C[0]), I = C.index + j;
      }for (m(t.substr(I)), x = k; x.parent; x = x.parent) {
        x.cN && (L += "</span>");
      }return { r: B, value: L, language: e, top: k };
    } catch (O) {
      if (-1 != O.message.indexOf("Illegal")) return { r: 0, value: n(t) };throw O;
    }
  }function l(e, t) {
    t = t || E.languages || Object.keys(R);var r = { r: 0, value: n(e) },
        a = r;return t.filter(w).forEach(function (n) {
      var t = f(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
    }), a.language && (r.second_best = a), r;
  }function g(e) {
    return E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
      return n.replace(/\t/g, E.tabReplace);
    })), E.useBR && (e = e.replace(/\n/g, "<br>")), e;
  }function p(e, n, t) {
    var r = n ? x[n] : t,
        a = [e.trim()];return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
  }function h(e) {
    var n = i(e);if (!a(n)) {
      var t;E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;var r = t.textContent,
          o = n ? f(n, r, !0) : l(r),
          s = u(t);if (s.length) {
        var h = document.createElementNS("http://www.w3.org/1999/xhtml", "div");h.innerHTML = o.value, o.value = c(s, u(h), r);
      }o.value = g(o.value), e.innerHTML = o.value, e.className = p(e.className, n, o.language), e.result = { language: o.language, re: o.r }, o.second_best && (e.second_best = { language: o.second_best.language, re: o.second_best.r });
    }
  }function d(e) {
    E = o(E, e);
  }function b() {
    if (!b.called) {
      b.called = !0;var e = document.querySelectorAll("pre code");Array.prototype.forEach.call(e, h);
    }
  }function v() {
    addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1);
  }function m(n, t) {
    var r = R[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
      x[e] = n;
    });
  }function N() {
    return Object.keys(R);
  }function w(e) {
    return e = (e || "").toLowerCase(), R[e] || R[x[e]];
  }var E = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
      R = {},
      x = {};return e.highlight = f, e.highlightAuto = l, e.fixMarkup = g, e.highlightBlock = h, e.configure = d, e.initHighlighting = b, e.initHighlightingOnLoad = v, e.registerLanguage = m, e.listLanguages = N, e.getLanguage = w, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function (n, t, r) {
    var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a;
  }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }, e;
});hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
      t = { eW: !0, i: /</, r: 0, c: [{ cN: "attr", b: e, r: 0 }, { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, s.C("<!--", "-->", { r: 10 }), { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } }, { cN: "meta", v: [{ b: /<\?xml/, e: /\?>/, r: 10 }, { b: /<\?\w+/, e: /\?>/ }] }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] }] };
});hljs.registerLanguage("go", function (e) {
  var t = { keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune", literal: "true false iota nil", built_in: "append cap close complex copy imag len make new panic print println real recover delete" };return { aliases: ["golang"], k: t, i: "</", c: [e.CLCM, e.CBCM, e.QSM, { cN: "string", b: "'", e: "[^\\\\]'" }, { cN: "string", b: "`", e: "`" }, { cN: "number", b: e.CNR + "[dflsi]?", r: 0 }, e.CNM] };
});hljs.registerLanguage("apache", function (e) {
  var r = { cN: "number", b: "[\\$%]\\d+" };return { aliases: ["apacheconf"], cI: !0, c: [e.HCM, { cN: "section", b: "</?", e: ">" }, { cN: "attribute", b: /\w+/, r: 0, k: { nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" }, starts: { e: /$/, r: 0, k: { literal: "on off all" }, c: [{ cN: "meta", b: "\\s\\[", e: "\\]$" }, { cN: "variable", b: "[\\$%]\\{", e: "\\}", c: ["self", r] }, r, e.QSM] } }], i: /\S/ };
});hljs.registerLanguage("rust", function (e) {
  var t = "([uif](8|16|32|64|size))?",
      r = e.inherit(e.CBCM);r.c.push("self");var n = "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield move int i8 i16 i32 i64 uint u8 u32 u64 float f32 f64 str char bool",
      i = "Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option Result SliceConcatExt String ToString Vec assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules!";return { aliases: ["rs"], k: { keyword: n, literal: "true false Some None Ok Err", built_in: i }, l: e.IR + "!?", i: "</", c: [e.CLCM, r, e.inherit(e.QSM, { b: /b?"/, i: null }), { cN: "string", v: [{ b: /r(#*)".*?"\1(?!#)/ }, { b: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }] }, { cN: "symbol", b: /'[a-zA-Z_][a-zA-Z0-9_]*/ }, { cN: "number", v: [{ b: "\\b0b([01_]+)" + t }, { b: "\\b0o([0-7_]+)" + t }, { b: "\\b0x([A-Fa-f0-9_]+)" + t }, { b: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t }], r: 0 }, { cN: "function", bK: "fn", e: "(\\(|<)", eE: !0, c: [e.UTM] }, { cN: "meta", b: "#\\!?\\[", e: "\\]", c: [{ cN: "meta-string", b: /"/, e: /"/ }] }, { cN: "class", bK: "type", e: ";", c: [e.inherit(e.UTM, { endsParent: !0 })], i: "\\S" }, { cN: "class", bK: "trait enum struct", e: "{", c: [e.inherit(e.UTM, { endsParent: !0 })], i: "[\\w\\d]" }, { b: e.IR + "::", k: { built_in: i } }, { cN: "params", b: /\|/, e: /\|/, k: n }, { b: "->" }] };
});hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      t = { b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { eW: !0, eE: !0, c: [{ b: /[\w-]+\(/, rB: !0, c: [{ cN: "built_in", b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }] }, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "number", b: "#[0-9A-Fa-f]+" }, { cN: "meta", b: "!important" }] } }] };return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ }, { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" }, { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ }, { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { b: "@", e: "[{;]", i: /:/, c: [{ cN: "keyword", b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }] }, { cN: "selector-tag", b: c, r: 0 }, { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] }] };
});hljs.registerLanguage("nginx", function (e) {
  var r = { cN: "variable", v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: "[\\$\\@]" + e.UIR }] },
      b = { eW: !0, l: "[a-z/_]+", k: { literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" }, r: 0, i: "=>", c: [e.HCM, { cN: "string", c: [e.BE, r], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] }, { b: "([a-z]+):/", e: "\\s", eW: !0, eE: !0, c: [r] }, { cN: "regexp", c: [e.BE, r], v: [{ b: "\\s\\^", e: "\\s|{|;", rE: !0 }, { b: "~\\*?\\s+", e: "\\s|{|;", rE: !0 }, { b: "\\*(\\.[a-z\\-]+)+" }, { b: "([a-z\\-]+\\.)+\\*" }] }, { cN: "number", b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b" }, { cN: "number", b: "\\b\\d+[kKmMgGdshdwy]*\\b", r: 0 }, r] };return { aliases: ["nginxconf"], c: [e.HCM, { b: e.UIR + "\\s+{", rB: !0, e: "{", c: [{ cN: "section", b: e.UIR }], r: 0 }, { b: e.UIR + "\\s", e: ";|{", rB: !0, c: [{ cN: "attribute", b: e.UIR, starts: b }], r: 0 }], i: "[^\\s\\}]" };
});hljs.registerLanguage("diff", function (e) {
  return { aliases: ["patch"], c: [{ cN: "meta", r: 10, v: [{ b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] }, { cN: "comment", v: [{ b: /Index: /, e: /$/ }, { b: /=====/, e: /=====$/ }, { b: /^\-\-\-/, e: /$/ }, { b: /^\*{3} /, e: /$/ }, { b: /^\+\+\+/, e: /$/ }, { b: /\*{5}/, e: /\*{5}$/ }] }, { cN: "addition", b: "^\\+", e: "$" }, { cN: "deletion", b: "^\\-", e: "$" }, { cN: "addition", b: "^\\!", e: "$" }] };
});hljs.registerLanguage("makefile", function (e) {
  var a = { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] };return { aliases: ["mk", "mak"], c: [e.HCM, { b: /^\w+\s*\W*=/, rB: !0, r: 0, starts: { e: /\s*\W*=/, eE: !0, starts: { e: /$/, r: 0, c: [a] } } }, { cN: "section", b: /^[\w]+:\s*$/ }, { cN: "meta", b: /^\.PHONY:/, e: /$/, k: { "meta-keyword": ".PHONY" }, l: /[\.\w]+/ }, { b: /^\t+/, e: /$/, r: 0, c: [e.QSM, a] }] };
});hljs.registerLanguage("cs", function (e) {
  var r = { keyword: "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield", literal: "null false true" },
      t = e.IR + "(<" + e.IR + ">)?(\\[\\])?";return { aliases: ["csharp"], k: r, i: /::/, c: [e.C("///", "$", { rB: !0, c: [{ cN: "doctag", v: [{ b: "///", r: 0 }, { b: "<!--|-->" }, { b: "</?", e: ">" }] }] }), e.CLCM, e.CBCM, { cN: "meta", b: "#", e: "$", k: { "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum" } }, { cN: "string", b: '@"', e: '"', c: [{ b: '""' }] }, e.ASM, e.QSM, e.CNM, { bK: "class interface", e: /[{;=]/, i: /[^\s:]/, c: [e.TM, e.CLCM, e.CBCM] }, { bK: "namespace", e: /[{;=]/, i: /[^\s:]/, c: [e.inherit(e.TM, { b: "[a-zA-Z](\\.?\\w)*" }), e.CLCM, e.CBCM] }, { bK: "new return throw await", r: 0 }, { cN: "function", b: "(" + t + "\\s+)+" + e.IR + "\\s*\\(", rB: !0, e: /[{;=]/, eE: !0, k: r, c: [{ b: e.IR + "\\s*\\(", rB: !0, c: [e.TM], r: 0 }, { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, k: r, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] }, e.CLCM, e.CBCM] }] };
});hljs.registerLanguage("dockerfile", function (e) {
  return { aliases: ["docker"], cI: !0, k: "from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env label", c: [e.HCM, { k: "run cmd entrypoint volume add copy workdir onbuild label", b: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir|label) +/, starts: { e: /[^\\]\n/, sL: "bash" } }, { k: "from maintainer expose env user onbuild", b: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/, e: /[^\\]\n/, c: [e.ASM, e.QSM, e.NM, e.HCM] }] };
});hljs.registerLanguage("markdown", function (e) {
  return { aliases: ["md", "mkdown", "mkd"], c: [{ cN: "section", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] }, { b: "<", e: ">", sL: "xml", r: 0 }, { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" }, { cN: "strong", b: "[*_]{2}.+?[*_]{2}" }, { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] }, { cN: "quote", b: "^>\\s+", e: "$" }, { cN: "code", v: [{ b: "^```w*s*$", e: "^```s*$" }, { b: "`.+?`" }, { b: "^( {4}|	)", e: "$", r: 0 }] }, { b: "^[-\\*]{3,}", e: "$" }, { b: "\\[.+?\\][\\(\\[].*?[\\)\\]]", rB: !0, c: [{ cN: "string", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0 }, { cN: "link", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 }, { cN: "symbol", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 }], r: 10 }, { b: "^\\[.+\\]:", rB: !0, c: [{ cN: "symbol", b: "\\[", e: "\\]:", eB: !0, eE: !0, starts: { cN: "link", e: "$" } }] }] };
});hljs.registerLanguage("python", function (e) {
  var r = { cN: "meta", b: /^(>>>|\.\.\.) / },
      b = { cN: "string", c: [e.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [r], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [r], r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, e.ASM, e.QSM] },
      a = { cN: "number", r: 0, v: [{ b: e.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: e.CNR + "[lLjJ]?" }] },
      l = { cN: "params", b: /\(/, e: /\)/, c: ["self", r, a, b] };return { aliases: ["py", "gyp"], k: { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" }, i: /(<\/|->|\?)/, c: [r, a, b, e.HCM, { v: [{ cN: "function", bK: "def", r: 10 }, { cN: "class", bK: "class" }], e: /:/, i: /[${=;\n,]/, c: [e.UTM, l, { b: /->/, eW: !0, k: "None" }] }, { cN: "meta", b: /^[\t ]*@/, e: /$/ }, { b: /\b(print|exec)\(/ }] };
});hljs.registerLanguage("json", function (e) {
  var i = { literal: "true false null" },
      n = [e.QSM, e.CNM],
      r = { e: ",", eW: !0, eE: !0, c: n, k: i },
      t = { b: "{", e: "}", c: [{ cN: "attr", b: /"/, e: /"/, c: [e.BE], i: "\\n" }, e.inherit(r, { b: /:/ })], i: "\\S" },
      c = { b: "\\[", e: "\\]", c: [e.inherit(r)], i: "\\S" };return n.splice(n.length, 0, t, c), { c: n, k: i, i: "\\S" };
});hljs.registerLanguage("javascript", function (e) {
  return { aliases: ["js", "jsx"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, { cN: "meta", b: /^#!/, e: /$/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: /(\/\w+|\w+\/)>/, sL: "xml", c: [{ b: /<\w+\s*\/>/, skip: !0 }, { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: ["self"] }] }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, e.METHOD_GUARD, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }, { bK: "constructor", e: /\{/, eE: !0 }], i: /#(?!!)/ };
});hljs.registerLanguage("bash", function (e) {
  var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
      s = { cN: "string", b: /"/, e: /"/, c: [e.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] }] },
      a = { cN: "string", b: /'/, e: /'/ };return { aliases: ["sh", "zsh"], l: /-?[a-z\.]+/, k: { keyword: "if then else elif fi for while in do done case esac function", literal: "true false", built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp", _: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "meta", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })], r: 0 }, e.HCM, s, a, t] };
});
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

hljs.initHighlightingOnLoad();
//# sourceMappingURL=app.js.map
"use strict";

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/*! highlight.js v9.3.0 | BSD3 License | git.io/hljslicense */
!function (e) {
  var n = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self;"undefined" != typeof exports ? e(exports) : n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return n.hljs;
  }));
}(function (e) {
  function n(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
  }function t(e) {
    return e.nodeName.toLowerCase();
  }function r(e, n) {
    var t = e && e.exec(n);return t && 0 == t.index;
  }function a(e) {
    return (/^(no-?highlight|plain|text)$/i.test(e)
    );
  }function i(e) {
    var n,
        t,
        r,
        i = e.className + " ";if (i += e.parentNode ? e.parentNode.className : "", t = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)) return w(t[1]) ? t[1] : "no-highlight";for (i = i.split(/\s+/), n = 0, r = i.length; r > n; n++) {
      if (w(i[n]) || a(i[n])) return i[n];
    }
  }function o(e, n) {
    var t,
        r = {};for (t in e) {
      r[t] = e[t];
    }if (n) for (t in n) {
      r[t] = n[t];
    }return r;
  }function u(e) {
    var n = [];return function r(e, a) {
      for (var i = e.firstChild; i; i = i.nextSibling) {
        3 == i.nodeType ? a += i.nodeValue.length : 1 == i.nodeType && (n.push({ event: "start", offset: a, node: i }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: i }));
      }return a;
    }(e, 0), n;
  }function c(e, r, a) {
    function i() {
      return e.length && r.length ? e[0].offset != r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" == r[0].event ? e : r : e.length ? e : r;
    }function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }f += "<" + t(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
    }function u(e) {
      f += "</" + t(e) + ">";
    }function c(e) {
      ("start" == e.event ? o : u)(e.node);
    }for (var s = 0, f = "", l = []; e.length || r.length;) {
      var g = i();if (f += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g == e) {
        l.reverse().forEach(u);do {
          c(g.splice(0, 1)[0]), g = i();
        } while (g == e && g.length && g[0].offset == s);l.reverse().forEach(o);
      } else "start" == g[0].event ? l.push(g[0].node) : l.pop(), c(g.splice(0, 1)[0]);
    }return f + n(a.substr(s));
  }function s(e) {
    function n(e) {
      return e && e.source || e;
    }function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }function r(a, i) {
      if (!a.compiled) {
        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
          var u = {},
              c = function c(n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };"string" == typeof a.k ? c("keyword", a.k) : Object.keys(a.k).forEach(function (e) {
            c(e, a.k[e]);
          }), a.k = u;
        }a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
          e.v ? e.v.forEach(function (n) {
            s.push(o(e, n));
          }) : s.push("self" == e ? a : e);
        }), a.c = s, a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);var f = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = f.length ? t(f.join("|"), !0) : { exec: function exec() {
            return null;
          } };
      }
    }r(e);
  }function f(e, t, a, i) {
    function o(e, n) {
      for (var t = 0; t < n.c.length; t++) {
        if (r(n.c[t].bR, e)) return n.c[t];
      }
    }function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent;) {
          e = e.parent;
        }return e;
      }return e.eW ? u(e.parent, n) : void 0;
    }function c(e, n) {
      return !a && r(n.iR, e);
    }function g(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
    }function p(e, n, t, r) {
      var a = r ? "" : E.classPrefix,
          i = '<span class="' + a,
          o = t ? "" : "</span>";return i += e + '">', i + n + o;
    }function h() {
      if (!k.k) return n(M);var e = "",
          t = 0;k.lR.lastIndex = 0;for (var r = k.lR.exec(M); r;) {
        e += n(M.substr(t, r.index - t));var a = g(k, r);a ? (B += a[1], e += p(a[0], n(r[0]))) : e += n(r[0]), t = k.lR.lastIndex, r = k.lR.exec(M);
      }return e + n(M.substr(t));
    }function d() {
      var e = "string" == typeof k.sL;if (e && !R[k.sL]) return n(M);var t = e ? f(k.sL, M, !0, y[k.sL]) : l(M, k.sL.length ? k.sL : void 0);return k.r > 0 && (B += t.r), e && (y[k.sL] = t.top), p(t.language, t.value, !1, !0);
    }function b() {
      L += void 0 !== k.sL ? d() : h(), M = "";
    }function v(e, n) {
      L += e.cN ? p(e.cN, "", !0) : "", k = Object.create(e, { parent: { value: k } });
    }function m(e, n) {
      if (M += e, void 0 === n) return b(), 0;var t = o(n, k);if (t) return t.skip ? M += n : (t.eB && (M += n), b(), t.rB || t.eB || (M = n)), v(t, n), t.rB ? 0 : n.length;var r = u(k, n);if (r) {
        var a = k;a.skip ? M += n : (a.rE || a.eE || (M += n), b(), a.eE && (M = n));do {
          k.cN && (L += "</span>"), k.skip || (B += k.r), k = k.parent;
        } while (k != r.parent);return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
      }if (c(n, k)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (k.cN || "<unnamed>") + '"');return M += n, n.length || 1;
    }var N = w(e);if (!N) throw new Error('Unknown language: "' + e + '"');s(N);var x,
        k = i || N,
        y = {},
        L = "";for (x = k; x != N; x = x.parent) {
      x.cN && (L = p(x.cN, "", !0) + L);
    }var M = "",
        B = 0;try {
      for (var C, j, I = 0;;) {
        if (k.t.lastIndex = I, C = k.t.exec(t), !C) break;j = m(t.substr(I, C.index - I), C[0]), I = C.index + j;
      }for (m(t.substr(I)), x = k; x.parent; x = x.parent) {
        x.cN && (L += "</span>");
      }return { r: B, value: L, language: e, top: k };
    } catch (O) {
      if (-1 != O.message.indexOf("Illegal")) return { r: 0, value: n(t) };throw O;
    }
  }function l(e, t) {
    t = t || E.languages || Object.keys(R);var r = { r: 0, value: n(e) },
        a = r;return t.filter(w).forEach(function (n) {
      var t = f(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
    }), a.language && (r.second_best = a), r;
  }function g(e) {
    return E.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function (e, n) {
      return n.replace(/\t/g, E.tabReplace);
    })), E.useBR && (e = e.replace(/\n/g, "<br>")), e;
  }function p(e, n, t) {
    var r = n ? x[n] : t,
        a = [e.trim()];return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
  }function h(e) {
    var n = i(e);if (!a(n)) {
      var t;E.useBR ? (t = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : t = e;var r = t.textContent,
          o = n ? f(n, r, !0) : l(r),
          s = u(t);if (s.length) {
        var h = document.createElementNS("http://www.w3.org/1999/xhtml", "div");h.innerHTML = o.value, o.value = c(s, u(h), r);
      }o.value = g(o.value), e.innerHTML = o.value, e.className = p(e.className, n, o.language), e.result = { language: o.language, re: o.r }, o.second_best && (e.second_best = { language: o.second_best.language, re: o.second_best.r });
    }
  }function d(e) {
    E = o(E, e);
  }function b() {
    if (!b.called) {
      b.called = !0;var e = document.querySelectorAll("pre code");Array.prototype.forEach.call(e, h);
    }
  }function v() {
    addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1);
  }function m(n, t) {
    var r = R[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
      x[e] = n;
    });
  }function N() {
    return Object.keys(R);
  }function w(e) {
    return e = (e || "").toLowerCase(), R[e] || R[x[e]];
  }var E = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
      R = {},
      x = {};return e.highlight = f, e.highlightAuto = l, e.fixMarkup = g, e.highlightBlock = h, e.configure = d, e.initHighlighting = b, e.initHighlightingOnLoad = v, e.registerLanguage = m, e.listLanguages = N, e.getLanguage = w, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function (n, t, r) {
    var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a;
  }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }, e;
});hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
      t = { eW: !0, i: /</, r: 0, c: [{ cN: "attr", b: e, r: 0 }, { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"], cI: !0, c: [{ cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, s.C("<!--", "-->", { r: 10 }), { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } }, { cN: "meta", v: [{ b: /<\?xml/, e: /\?>/, r: 10 }, { b: /<\?\w+/, e: /\?>/ }] }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] }] };
});hljs.registerLanguage("go", function (e) {
  var t = { keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune", literal: "true false iota nil", built_in: "append cap close complex copy imag len make new panic print println real recover delete" };return { aliases: ["golang"], k: t, i: "</", c: [e.CLCM, e.CBCM, e.QSM, { cN: "string", b: "'", e: "[^\\\\]'" }, { cN: "string", b: "`", e: "`" }, { cN: "number", b: e.CNR + "[dflsi]?", r: 0 }, e.CNM] };
});hljs.registerLanguage("apache", function (e) {
  var r = { cN: "number", b: "[\\$%]\\d+" };return { aliases: ["apacheconf"], cI: !0, c: [e.HCM, { cN: "section", b: "</?", e: ">" }, { cN: "attribute", b: /\w+/, r: 0, k: { nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername" }, starts: { e: /$/, r: 0, k: { literal: "on off all" }, c: [{ cN: "meta", b: "\\s\\[", e: "\\]$" }, { cN: "variable", b: "[\\$%]\\{", e: "\\}", c: ["self", r] }, r, e.QSM] } }], i: /\S/ };
});hljs.registerLanguage("rust", function (e) {
  var t = "([uif](8|16|32|64|size))?",
      r = e.inherit(e.CBCM);r.c.push("self");var n = "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield move int i8 i16 i32 i64 uint u8 u32 u64 float f32 f64 str char bool",
      i = "Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option Result SliceConcatExt String ToString Vec assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules!";return { aliases: ["rs"], k: { keyword: n, literal: "true false Some None Ok Err", built_in: i }, l: e.IR + "!?", i: "</", c: [e.CLCM, r, e.inherit(e.QSM, { b: /b?"/, i: null }), { cN: "string", v: [{ b: /r(#*)".*?"\1(?!#)/ }, { b: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }] }, { cN: "symbol", b: /'[a-zA-Z_][a-zA-Z0-9_]*/ }, { cN: "number", v: [{ b: "\\b0b([01_]+)" + t }, { b: "\\b0o([0-7_]+)" + t }, { b: "\\b0x([A-Fa-f0-9_]+)" + t }, { b: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t }], r: 0 }, { cN: "function", bK: "fn", e: "(\\(|<)", eE: !0, c: [e.UTM] }, { cN: "meta", b: "#\\!?\\[", e: "\\]", c: [{ cN: "meta-string", b: /"/, e: /"/ }] }, { cN: "class", bK: "type", e: ";", c: [e.inherit(e.UTM, { endsParent: !0 })], i: "\\S" }, { cN: "class", bK: "trait enum struct", e: "{", c: [e.inherit(e.UTM, { endsParent: !0 })], i: "[\\w\\d]" }, { b: e.IR + "::", k: { built_in: i } }, { cN: "params", b: /\|/, e: /\|/, k: n }, { b: "->" }] };
});hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      t = { b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { eW: !0, eE: !0, c: [{ b: /[\w-]+\(/, rB: !0, c: [{ cN: "built_in", b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }] }, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "number", b: "#[0-9A-Fa-f]+" }, { cN: "meta", b: "!important" }] } }] };return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ }, { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" }, { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ }, { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { b: "@", e: "[{;]", i: /:/, c: [{ cN: "keyword", b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }] }, { cN: "selector-tag", b: c, r: 0 }, { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] }] };
});hljs.registerLanguage("nginx", function (e) {
  var r = { cN: "variable", v: [{ b: /\$\d+/ }, { b: /\$\{/, e: /}/ }, { b: "[\\$\\@]" + e.UIR }] },
      b = { eW: !0, l: "[a-z/_]+", k: { literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll" }, r: 0, i: "=>", c: [e.HCM, { cN: "string", c: [e.BE, r], v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }] }, { b: "([a-z]+):/", e: "\\s", eW: !0, eE: !0, c: [r] }, { cN: "regexp", c: [e.BE, r], v: [{ b: "\\s\\^", e: "\\s|{|;", rE: !0 }, { b: "~\\*?\\s+", e: "\\s|{|;", rE: !0 }, { b: "\\*(\\.[a-z\\-]+)+" }, { b: "([a-z\\-]+\\.)+\\*" }] }, { cN: "number", b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b" }, { cN: "number", b: "\\b\\d+[kKmMgGdshdwy]*\\b", r: 0 }, r] };return { aliases: ["nginxconf"], c: [e.HCM, { b: e.UIR + "\\s+{", rB: !0, e: "{", c: [{ cN: "section", b: e.UIR }], r: 0 }, { b: e.UIR + "\\s", e: ";|{", rB: !0, c: [{ cN: "attribute", b: e.UIR, starts: b }], r: 0 }], i: "[^\\s\\}]" };
});hljs.registerLanguage("diff", function (e) {
  return { aliases: ["patch"], c: [{ cN: "meta", r: 10, v: [{ b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] }, { cN: "comment", v: [{ b: /Index: /, e: /$/ }, { b: /=====/, e: /=====$/ }, { b: /^\-\-\-/, e: /$/ }, { b: /^\*{3} /, e: /$/ }, { b: /^\+\+\+/, e: /$/ }, { b: /\*{5}/, e: /\*{5}$/ }] }, { cN: "addition", b: "^\\+", e: "$" }, { cN: "deletion", b: "^\\-", e: "$" }, { cN: "addition", b: "^\\!", e: "$" }] };
});hljs.registerLanguage("makefile", function (e) {
  var a = { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] };return { aliases: ["mk", "mak"], c: [e.HCM, { b: /^\w+\s*\W*=/, rB: !0, r: 0, starts: { e: /\s*\W*=/, eE: !0, starts: { e: /$/, r: 0, c: [a] } } }, { cN: "section", b: /^[\w]+:\s*$/ }, { cN: "meta", b: /^\.PHONY:/, e: /$/, k: { "meta-keyword": ".PHONY" }, l: /[\.\w]+/ }, { b: /^\t+/, e: /$/, r: 0, c: [e.QSM, a] }] };
});hljs.registerLanguage("cs", function (e) {
  var r = { keyword: "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield", literal: "null false true" },
      t = e.IR + "(<" + e.IR + ">)?(\\[\\])?";return { aliases: ["csharp"], k: r, i: /::/, c: [e.C("///", "$", { rB: !0, c: [{ cN: "doctag", v: [{ b: "///", r: 0 }, { b: "<!--|-->" }, { b: "</?", e: ">" }] }] }), e.CLCM, e.CBCM, { cN: "meta", b: "#", e: "$", k: { "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum" } }, { cN: "string", b: '@"', e: '"', c: [{ b: '""' }] }, e.ASM, e.QSM, e.CNM, { bK: "class interface", e: /[{;=]/, i: /[^\s:]/, c: [e.TM, e.CLCM, e.CBCM] }, { bK: "namespace", e: /[{;=]/, i: /[^\s:]/, c: [e.inherit(e.TM, { b: "[a-zA-Z](\\.?\\w)*" }), e.CLCM, e.CBCM] }, { bK: "new return throw await", r: 0 }, { cN: "function", b: "(" + t + "\\s+)+" + e.IR + "\\s*\\(", rB: !0, e: /[{;=]/, eE: !0, k: r, c: [{ b: e.IR + "\\s*\\(", rB: !0, c: [e.TM], r: 0 }, { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, k: r, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] }, e.CLCM, e.CBCM] }] };
});hljs.registerLanguage("dockerfile", function (e) {
  return { aliases: ["docker"], cI: !0, k: "from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env label", c: [e.HCM, { k: "run cmd entrypoint volume add copy workdir onbuild label", b: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir|label) +/, starts: { e: /[^\\]\n/, sL: "bash" } }, { k: "from maintainer expose env user onbuild", b: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/, e: /[^\\]\n/, c: [e.ASM, e.QSM, e.NM, e.HCM] }] };
});hljs.registerLanguage("markdown", function (e) {
  return { aliases: ["md", "mkdown", "mkd"], c: [{ cN: "section", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] }, { b: "<", e: ">", sL: "xml", r: 0 }, { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" }, { cN: "strong", b: "[*_]{2}.+?[*_]{2}" }, { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] }, { cN: "quote", b: "^>\\s+", e: "$" }, { cN: "code", v: [{ b: "^```w*s*$", e: "^```s*$" }, { b: "`.+?`" }, { b: "^( {4}|	)", e: "$", r: 0 }] }, { b: "^[-\\*]{3,}", e: "$" }, { b: "\\[.+?\\][\\(\\[].*?[\\)\\]]", rB: !0, c: [{ cN: "string", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0 }, { cN: "link", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 }, { cN: "symbol", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 }], r: 10 }, { b: "^\\[.+\\]:", rB: !0, c: [{ cN: "symbol", b: "\\[", e: "\\]:", eB: !0, eE: !0, starts: { cN: "link", e: "$" } }] }] };
});hljs.registerLanguage("python", function (e) {
  var r = { cN: "meta", b: /^(>>>|\.\.\.) / },
      b = { cN: "string", c: [e.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [r], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [r], r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, e.ASM, e.QSM] },
      a = { cN: "number", r: 0, v: [{ b: e.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: e.CNR + "[lLjJ]?" }] },
      l = { cN: "params", b: /\(/, e: /\)/, c: ["self", r, a, b] };return { aliases: ["py", "gyp"], k: { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" }, i: /(<\/|->|\?)/, c: [r, a, b, e.HCM, { v: [{ cN: "function", bK: "def", r: 10 }, { cN: "class", bK: "class" }], e: /:/, i: /[${=;\n,]/, c: [e.UTM, l, { b: /->/, eW: !0, k: "None" }] }, { cN: "meta", b: /^[\t ]*@/, e: /$/ }, { b: /\b(print|exec)\(/ }] };
});hljs.registerLanguage("json", function (e) {
  var i = { literal: "true false null" },
      n = [e.QSM, e.CNM],
      r = { e: ",", eW: !0, eE: !0, c: n, k: i },
      t = { b: "{", e: "}", c: [{ cN: "attr", b: /"/, e: /"/, c: [e.BE], i: "\\n" }, e.inherit(r, { b: /:/ })], i: "\\S" },
      c = { b: "\\[", e: "\\]", c: [e.inherit(r)], i: "\\S" };return n.splice(n.length, 0, t, c), { c: n, k: i, i: "\\S" };
});hljs.registerLanguage("javascript", function (e) {
  return { aliases: ["js", "jsx"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, { cN: "meta", b: /^#!/, e: /$/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: /(\/\w+|\w+\/)>/, sL: "xml", c: [{ b: /<\w+\s*\/>/, skip: !0 }, { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: ["self"] }] }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, e.METHOD_GUARD, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }, { bK: "constructor", e: /\{/, eE: !0 }], i: /#(?!!)/ };
});hljs.registerLanguage("bash", function (e) {
  var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
      s = { cN: "string", b: /"/, e: /"/, c: [e.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] }] },
      a = { cN: "string", b: /'/, e: /'/ };return { aliases: ["sh", "zsh"], l: /-?[a-z\.]+/, k: { keyword: "if then else elif fi for while in do done case esac function", literal: "true false", built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp", _: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "meta", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })], r: 0 }, e.HCM, s, a, t] };
});
"use strict";

hljs.initHighlightingOnLoad();
//# sourceMappingURL=app.js.map
"use strict";

hljs.initHighlightingOnLoad();
//# sourceMappingURL=app.js.map
