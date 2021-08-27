"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'");
      }

      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      var clone = function () {
        'use strict';
        /**
         * Clones (copies) an Object using deep copying.
         *
         * This function supports circular references by default, but if you are certain
         * there are no circular references in your object, you can save some CPU time
         * by calling clone(obj, false).
         *
         * Caution: if `circular` is false and `parent` contains circular references,
         * your program may enter an infinite loop and crash.
         *
         * @param `parent` - the object to be cloned
         * @param `circular` - set to true if the object to be cloned may contain
         *    circular references. (optional - true by default)
         * @param `depth` - set to a number if the object is only to be cloned to
         *    a particular depth. (optional - defaults to Infinity)
         * @param `prototype` - sets the prototype to be used when cloning an object.
         *    (optional - defaults to parent prototype).
        */

        function clone(parent, circular, depth, prototype) {
          var filter;

          if (_typeof(circular) === 'object') {
            depth = circular.depth;
            prototype = circular.prototype;
            filter = circular.filter;
            circular = circular.circular;
          } // maintain two arrays for circular references, where corresponding parents
          // and children have the same index


          var allParents = [];
          var allChildren = [];
          var useBuffer = typeof Buffer != 'undefined';
          if (typeof circular == 'undefined') circular = true;
          if (typeof depth == 'undefined') depth = Infinity; // recurse this function so we don't reset allParents and allChildren

          function _clone(parent, depth) {
            // cloning null always returns null
            if (parent === null) return null;
            if (depth == 0) return parent;
            var child;
            var proto;

            if (_typeof(parent) != 'object') {
              return parent;
            }

            if (clone.__isArray(parent)) {
              child = [];
            } else if (clone.__isRegExp(parent)) {
              child = new RegExp(parent.source, __getRegExpFlags(parent));
              if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (clone.__isDate(parent)) {
              child = new Date(parent.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent)) {
              if (Buffer.allocUnsafe) {
                // Node.js >= 4.5.0
                child = Buffer.allocUnsafe(parent.length);
              } else {
                // Older Node.js versions
                child = new Buffer(parent.length);
              }

              parent.copy(child);
              return child;
            } else {
              if (typeof prototype == 'undefined') {
                proto = Object.getPrototypeOf(parent);
                child = Object.create(proto);
              } else {
                child = Object.create(prototype);
                proto = prototype;
              }
            }

            if (circular) {
              var index = allParents.indexOf(parent);

              if (index != -1) {
                return allChildren[index];
              }

              allParents.push(parent);
              allChildren.push(child);
            }

            for (var i in parent) {
              var attrs;

              if (proto) {
                attrs = Object.getOwnPropertyDescriptor(proto, i);
              }

              if (attrs && attrs.set == null) {
                continue;
              }

              child[i] = _clone(parent[i], depth - 1);
            }

            return child;
          }

          return _clone(parent, depth);
        }
        /**
         * Simple flat clone using prototype, accepts only objects, usefull for property
         * override on FLAT configuration object (no nested props).
         *
         * USE WITH CAUTION! This may not behave as you wish if you do not know how this
         * works.
         */


        clone.clonePrototype = function clonePrototype(parent) {
          if (parent === null) return null;

          var c = function c() {};

          c.prototype = parent;
          return new c();
        }; // private utility functions


        function __objToStr(o) {
          return Object.prototype.toString.call(o);
        }

        ;
        clone.__objToStr = __objToStr;

        function __isDate(o) {
          return _typeof(o) === 'object' && __objToStr(o) === '[object Date]';
        }

        ;
        clone.__isDate = __isDate;

        function __isArray(o) {
          return _typeof(o) === 'object' && __objToStr(o) === '[object Array]';
        }

        ;
        clone.__isArray = __isArray;

        function __isRegExp(o) {
          return _typeof(o) === 'object' && __objToStr(o) === '[object RegExp]';
        }

        ;
        clone.__isRegExp = __isRegExp;

        function __getRegExpFlags(re) {
          var flags = '';
          if (re.global) flags += 'g';
          if (re.ignoreCase) flags += 'i';
          if (re.multiline) flags += 'm';
          return flags;
        }

        ;
        clone.__getRegExpFlags = __getRegExpFlags;
        return clone;
      }();

      if (_typeof(module) === 'object' && module.exports) {
        module.exports = clone;
      }
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/clone/clone.js", "/../../../node_modules/clone");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /* MIT license */
      var cssKeywords = require('color-name'); // NOTE: conversions should only return primitive values (i.e. arrays, or
      //       values that give correct `typeof` results).
      //       do not use box values types (i.e. Number(), String(), etc.)


      var reverseKeywords = {};

      for (var key in cssKeywords) {
        if (cssKeywords.hasOwnProperty(key)) {
          reverseKeywords[cssKeywords[key]] = key;
        }
      }

      var convert = module.exports = {
        rgb: {
          channels: 3,
          labels: 'rgb'
        },
        hsl: {
          channels: 3,
          labels: 'hsl'
        },
        hsv: {
          channels: 3,
          labels: 'hsv'
        },
        hwb: {
          channels: 3,
          labels: 'hwb'
        },
        cmyk: {
          channels: 4,
          labels: 'cmyk'
        },
        xyz: {
          channels: 3,
          labels: 'xyz'
        },
        lab: {
          channels: 3,
          labels: 'lab'
        },
        lch: {
          channels: 3,
          labels: 'lch'
        },
        hex: {
          channels: 1,
          labels: ['hex']
        },
        keyword: {
          channels: 1,
          labels: ['keyword']
        },
        ansi16: {
          channels: 1,
          labels: ['ansi16']
        },
        ansi256: {
          channels: 1,
          labels: ['ansi256']
        },
        hcg: {
          channels: 3,
          labels: ['h', 'c', 'g']
        },
        apple: {
          channels: 3,
          labels: ['r16', 'g16', 'b16']
        },
        gray: {
          channels: 1,
          labels: ['gray']
        }
      }; // hide .channels and .labels properties

      for (var model in convert) {
        if (convert.hasOwnProperty(model)) {
          if (!('channels' in convert[model])) {
            throw new Error('missing channels property: ' + model);
          }

          if (!('labels' in convert[model])) {
            throw new Error('missing channel labels property: ' + model);
          }

          if (convert[model].labels.length !== convert[model].channels) {
            throw new Error('channel and label counts mismatch: ' + model);
          }

          var channels = convert[model].channels;
          var labels = convert[model].labels;
          delete convert[model].channels;
          delete convert[model].labels;
          Object.defineProperty(convert[model], 'channels', {
            value: channels
          });
          Object.defineProperty(convert[model], 'labels', {
            value: labels
          });
        }
      }

      convert.rgb.hsl = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var h;
        var s;
        var l;

        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g - b) / delta;
        } else if (g === max) {
          h = 2 + (b - r) / delta;
        } else if (b === max) {
          h = 4 + (r - g) / delta;
        }

        h = Math.min(h * 60, 360);

        if (h < 0) {
          h += 360;
        }

        l = (min + max) / 2;

        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }

        return [h, s * 100, l * 100];
      };

      convert.rgb.hsv = function (rgb) {
        var rdif;
        var gdif;
        var bdif;
        var h;
        var s;
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var v = Math.max(r, g, b);
        var diff = v - Math.min(r, g, b);

        var diffc = function diffc(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };

        if (diff === 0) {
          h = s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g);
          bdif = diffc(b);

          if (r === v) {
            h = bdif - gdif;
          } else if (g === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b === v) {
            h = 2 / 3 + gdif - rdif;
          }

          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }

        return [h * 360, s * 100, v * 100];
      };

      convert.rgb.hwb = function (rgb) {
        var r = rgb[0];
        var g = rgb[1];
        var b = rgb[2];
        var h = convert.rgb.hsl(rgb)[0];
        var w = 1 / 255 * Math.min(r, Math.min(g, b));
        b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
        return [h, w * 100, b * 100];
      };

      convert.rgb.cmyk = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var c;
        var m;
        var y;
        var k;
        k = Math.min(1 - r, 1 - g, 1 - b);
        c = (1 - r - k) / (1 - k) || 0;
        m = (1 - g - k) / (1 - k) || 0;
        y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      };
      /**
       * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
       * */


      function comparativeDistance(x, y) {
        return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
      }

      convert.rgb.keyword = function (rgb) {
        var reversed = reverseKeywords[rgb];

        if (reversed) {
          return reversed;
        }

        var currentClosestDistance = Infinity;
        var currentClosestKeyword;

        for (var keyword in cssKeywords) {
          if (cssKeywords.hasOwnProperty(keyword)) {
            var value = cssKeywords[keyword]; // Compute comparative distance

            var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

            if (distance < currentClosestDistance) {
              currentClosestDistance = distance;
              currentClosestKeyword = keyword;
            }
          }
        }

        return currentClosestKeyword;
      };

      convert.keyword.rgb = function (keyword) {
        return cssKeywords[keyword];
      };

      convert.rgb.xyz = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255; // assume sRGB

        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        return [x * 100, y * 100, z * 100];
      };

      convert.rgb.lab = function (rgb) {
        var xyz = convert.rgb.xyz(rgb);
        var x = xyz[0];
        var y = xyz[1];
        var z = xyz[2];
        var l;
        var a;
        var b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
        l = 116 * y - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
      };

      convert.hsl.rgb = function (hsl) {
        var h = hsl[0] / 360;
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var t1;
        var t2;
        var t3;
        var rgb;
        var val;

        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }

        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }

        t1 = 2 * l - t2;
        rgb = [0, 0, 0];

        for (var i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);

          if (t3 < 0) {
            t3++;
          }

          if (t3 > 1) {
            t3--;
          }

          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }

          rgb[i] = val * 255;
        }

        return rgb;
      };

      convert.hsl.hsv = function (hsl) {
        var h = hsl[0];
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var smin = s;
        var lmin = Math.max(l, 0.01);
        var sv;
        var v;
        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        v = (l + s) / 2;
        sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
        return [h, sv * 100, v * 100];
      };

      convert.hsv.rgb = function (hsv) {
        var h = hsv[0] / 60;
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var hi = Math.floor(h) % 6;
        var f = h - Math.floor(h);
        var p = 255 * v * (1 - s);
        var q = 255 * v * (1 - s * f);
        var t = 255 * v * (1 - s * (1 - f));
        v *= 255;

        switch (hi) {
          case 0:
            return [v, t, p];

          case 1:
            return [q, v, p];

          case 2:
            return [p, v, t];

          case 3:
            return [p, q, v];

          case 4:
            return [t, p, v];

          case 5:
            return [v, p, q];
        }
      };

      convert.hsv.hsl = function (hsv) {
        var h = hsv[0];
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var vmin = Math.max(v, 0.01);
        var lmin;
        var sl;
        var l;
        l = (2 - s) * v;
        lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      }; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


      convert.hwb.rgb = function (hwb) {
        var h = hwb[0] / 360;
        var wh = hwb[1] / 100;
        var bl = hwb[2] / 100;
        var ratio = wh + bl;
        var i;
        var v;
        var f;
        var n; // wh + bl cant be > 1

        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }

        i = Math.floor(6 * h);
        v = 1 - bl;
        f = 6 * h - i;

        if ((i & 0x01) !== 0) {
          f = 1 - f;
        }

        n = wh + f * (v - wh); // linear interpolation

        var r;
        var g;
        var b;

        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b = wh;
            break;

          case 1:
            r = n;
            g = v;
            b = wh;
            break;

          case 2:
            r = wh;
            g = v;
            b = n;
            break;

          case 3:
            r = wh;
            g = n;
            b = v;
            break;

          case 4:
            r = n;
            g = wh;
            b = v;
            break;

          case 5:
            r = v;
            g = wh;
            b = n;
            break;
        }

        return [r * 255, g * 255, b * 255];
      };

      convert.cmyk.rgb = function (cmyk) {
        var c = cmyk[0] / 100;
        var m = cmyk[1] / 100;
        var y = cmyk[2] / 100;
        var k = cmyk[3] / 100;
        var r;
        var g;
        var b;
        r = 1 - Math.min(1, c * (1 - k) + k);
        g = 1 - Math.min(1, m * (1 - k) + k);
        b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b * 255];
      };

      convert.xyz.rgb = function (xyz) {
        var x = xyz[0] / 100;
        var y = xyz[1] / 100;
        var z = xyz[2] / 100;
        var r;
        var g;
        var b;
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

        r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
        g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
        b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g * 255, b * 255];
      };

      convert.xyz.lab = function (xyz) {
        var x = xyz[0];
        var y = xyz[1];
        var z = xyz[2];
        var l;
        var a;
        var b;
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
        l = 116 * y - 16;
        a = 500 * (x - y);
        b = 200 * (y - z);
        return [l, a, b];
      };

      convert.lab.xyz = function (lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var x;
        var y;
        var z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
        var y2 = Math.pow(y, 3);
        var x2 = Math.pow(x, 3);
        var z2 = Math.pow(z, 3);
        y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
      };

      convert.lab.lch = function (lab) {
        var l = lab[0];
        var a = lab[1];
        var b = lab[2];
        var hr;
        var h;
        var c;
        hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;

        if (h < 0) {
          h += 360;
        }

        c = Math.sqrt(a * a + b * b);
        return [l, c, h];
      };

      convert.lch.lab = function (lch) {
        var l = lch[0];
        var c = lch[1];
        var h = lch[2];
        var a;
        var b;
        var hr;
        hr = h / 360 * 2 * Math.PI;
        a = c * Math.cos(hr);
        b = c * Math.sin(hr);
        return [l, a, b];
      };

      convert.rgb.ansi16 = function (args) {
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

        value = Math.round(value / 50);

        if (value === 0) {
          return 30;
        }

        var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

        if (value === 2) {
          ansi += 60;
        }

        return ansi;
      };

      convert.hsv.ansi16 = function (args) {
        // optimization here; we already know the value and don't need to get
        // it converted for us.
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };

      convert.rgb.ansi256 = function (args) {
        var r = args[0];
        var g = args[1];
        var b = args[2]; // we use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.

        if (r === g && g === b) {
          if (r < 8) {
            return 16;
          }

          if (r > 248) {
            return 231;
          }

          return Math.round((r - 8) / 247 * 24) + 232;
        }

        var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
        return ansi;
      };

      convert.ansi16.rgb = function (args) {
        var color = args % 10; // handle greyscale

        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }

          color = color / 10.5 * 255;
          return [color, color, color];
        }

        var mult = (~~(args > 50) + 1) * 0.5;
        var r = (color & 1) * mult * 255;
        var g = (color >> 1 & 1) * mult * 255;
        var b = (color >> 2 & 1) * mult * 255;
        return [r, g, b];
      };

      convert.ansi256.rgb = function (args) {
        // handle greyscale
        if (args >= 232) {
          var c = (args - 232) * 10 + 8;
          return [c, c, c];
        }

        args -= 16;
        var rem;
        var r = Math.floor(args / 36) / 5 * 255;
        var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        var b = rem % 6 / 5 * 255;
        return [r, g, b];
      };

      convert.rgb.hex = function (args) {
        var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
        var string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
      };

      convert.hex.rgb = function (args) {
        var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

        if (!match) {
          return [0, 0, 0];
        }

        var colorString = match[0];

        if (match[0].length === 3) {
          colorString = colorString.split('').map(function (_char) {
            return _char + _char;
          }).join('');
        }

        var integer = parseInt(colorString, 16);
        var r = integer >> 16 & 0xFF;
        var g = integer >> 8 & 0xFF;
        var b = integer & 0xFF;
        return [r, g, b];
      };

      convert.rgb.hcg = function (rgb) {
        var r = rgb[0] / 255;
        var g = rgb[1] / 255;
        var b = rgb[2] / 255;
        var max = Math.max(Math.max(r, g), b);
        var min = Math.min(Math.min(r, g), b);
        var chroma = max - min;
        var grayscale;
        var hue;

        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }

        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = (g - b) / chroma % 6;
        } else if (max === g) {
          hue = 2 + (b - r) / chroma;
        } else {
          hue = 4 + (r - g) / chroma + 4;
        }

        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };

      convert.hsl.hcg = function (hsl) {
        var s = hsl[1] / 100;
        var l = hsl[2] / 100;
        var c = 1;
        var f = 0;

        if (l < 0.5) {
          c = 2.0 * s * l;
        } else {
          c = 2.0 * s * (1.0 - l);
        }

        if (c < 1.0) {
          f = (l - 0.5 * c) / (1.0 - c);
        }

        return [hsl[0], c * 100, f * 100];
      };

      convert.hsv.hcg = function (hsv) {
        var s = hsv[1] / 100;
        var v = hsv[2] / 100;
        var c = s * v;
        var f = 0;

        if (c < 1.0) {
          f = (v - c) / (1 - c);
        }

        return [hsv[0], c * 100, f * 100];
      };

      convert.hcg.rgb = function (hcg) {
        var h = hcg[0] / 360;
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;

        if (c === 0.0) {
          return [g * 255, g * 255, g * 255];
        }

        var pure = [0, 0, 0];
        var hi = h % 1 * 6;
        var v = hi % 1;
        var w = 1 - v;
        var mg = 0;

        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;

          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;

          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;

          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;

          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;

          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }

        mg = (1.0 - c) * g;
        return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
      };

      convert.hcg.hsv = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        var f = 0;

        if (v > 0.0) {
          f = c / v;
        }

        return [hcg[0], f * 100, v * 100];
      };

      convert.hcg.hsl = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var l = g * (1.0 - c) + 0.5 * c;
        var s = 0;

        if (l > 0.0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1.0) {
          s = c / (2 * (1 - l));
        }

        return [hcg[0], s * 100, l * 100];
      };

      convert.hcg.hwb = function (hcg) {
        var c = hcg[1] / 100;
        var g = hcg[2] / 100;
        var v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };

      convert.hwb.hcg = function (hwb) {
        var w = hwb[1] / 100;
        var b = hwb[2] / 100;
        var v = 1 - b;
        var c = v - w;
        var g = 0;

        if (c < 1) {
          g = (v - c) / (1 - c);
        }

        return [hwb[0], c * 100, g * 100];
      };

      convert.apple.rgb = function (apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };

      convert.rgb.apple = function (rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };

      convert.gray.rgb = function (args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };

      convert.gray.hsl = convert.gray.hsv = function (args) {
        return [0, 0, args[0]];
      };

      convert.gray.hwb = function (gray) {
        return [0, 100, gray[0]];
      };

      convert.gray.cmyk = function (gray) {
        return [0, 0, 0, gray[0]];
      };

      convert.gray.lab = function (gray) {
        return [gray[0], 0, 0];
      };

      convert.gray.hex = function (gray) {
        var val = Math.round(gray[0] / 100 * 255) & 0xFF;
        var integer = (val << 16) + (val << 8) + val;
        var string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
      };

      convert.rgb.gray = function (rgb) {
        var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color-convert/conversions.js", "/../../../node_modules/color-convert");
  }, {
    "buffer": 9,
    "color-name": 5,
    "km4Umf": 10
  }],
  3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      var conversions = require('./conversions');

      var route = require('./route');

      var convert = {};
      var models = Object.keys(conversions);

      function wrapRaw(fn) {
        var wrappedFn = function wrappedFn(args) {
          if (args === undefined || args === null) {
            return args;
          }

          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }

          return fn(args);
        }; // preserve .conversion property if there is one


        if ('conversion' in fn) {
          wrappedFn.conversion = fn.conversion;
        }

        return wrappedFn;
      }

      function wrapRounded(fn) {
        var wrappedFn = function wrappedFn(args) {
          if (args === undefined || args === null) {
            return args;
          }

          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }

          var result = fn(args); // we're assuming the result is an array here.
          // see notice in conversions.js; don't use box types
          // in conversion functions.

          if (_typeof(result) === 'object') {
            for (var len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }

          return result;
        }; // preserve .conversion property if there is one


        if ('conversion' in fn) {
          wrappedFn.conversion = fn.conversion;
        }

        return wrappedFn;
      }

      models.forEach(function (fromModel) {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], 'channels', {
          value: conversions[fromModel].channels
        });
        Object.defineProperty(convert[fromModel], 'labels', {
          value: conversions[fromModel].labels
        });
        var routes = route(fromModel);
        var routeModels = Object.keys(routes);
        routeModels.forEach(function (toModel) {
          var fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      module.exports = convert;
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color-convert/index.js", "/../../../node_modules/color-convert");
  }, {
    "./conversions": 2,
    "./route": 4,
    "buffer": 9,
    "km4Umf": 10
  }],
  4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      var conversions = require('./conversions');
      /*
      	this function routes a model to all other models.
      
      	all functions that are routed have a property `.conversion` attached
      	to the returned synthetic function. This property is an array
      	of strings, each with the steps in between the 'from' and 'to'
      	color models (inclusive).
      
      	conversions that are not possible simply are not included.
      */


      function buildGraph() {
        var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

        var models = Object.keys(conversions);

        for (var len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }

        return graph;
      } // https://en.wikipedia.org/wiki/Breadth-first_search


      function deriveBFS(fromModel) {
        var graph = buildGraph();
        var queue = [fromModel]; // unshift -> queue -> pop

        graph[fromModel].distance = 0;

        while (queue.length) {
          var current = queue.pop();
          var adjacents = Object.keys(conversions[current]);

          for (var len = adjacents.length, i = 0; i < len; i++) {
            var adjacent = adjacents[i];
            var node = graph[adjacent];

            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }

        return graph;
      }

      function link(from, to) {
        return function (args) {
          return to(from(args));
        };
      }

      function wrapConversion(toModel, graph) {
        var path = [graph[toModel].parent, toModel];
        var fn = conversions[graph[toModel].parent][toModel];
        var cur = graph[toModel].parent;

        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }

        fn.conversion = path;
        return fn;
      }

      module.exports = function (fromModel) {
        var graph = deriveBFS(fromModel);
        var conversion = {};
        var models = Object.keys(graph);

        for (var len = models.length, i = 0; i < len; i++) {
          var toModel = models[i];
          var node = graph[toModel];

          if (node.parent === null) {
            // no possible conversion, or this node is the source model.
            continue;
          }

          conversion[toModel] = wrapConversion(toModel, graph);
        }

        return conversion;
      };
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color-convert/route.js", "/../../../node_modules/color-convert");
  }, {
    "./conversions": 2,
    "buffer": 9,
    "km4Umf": 10
  }],
  5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color-name/index.js", "/../../../node_modules/color-name");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /* MIT license */
      var colorNames = require('color-name');

      module.exports = {
        getRgba: getRgba,
        getHsla: getHsla,
        getRgb: getRgb,
        getHsl: getHsl,
        getHwb: getHwb,
        getAlpha: getAlpha,
        hexString: hexString,
        rgbString: rgbString,
        rgbaString: rgbaString,
        percentString: percentString,
        percentaString: percentaString,
        hslString: hslString,
        hslaString: hslaString,
        hwbString: hwbString,
        keyword: keyword
      };

      function getRgba(string) {
        if (!string) {
          return;
        }

        var abbr = /^#([a-fA-F0-9]{3})$/,
            hex = /^#([a-fA-F0-9]{6})$/,
            rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
            keyword = /(\D+)/;
        var rgb = [0, 0, 0],
            a = 1,
            match = string.match(abbr);

        if (match) {
          match = match[1];

          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i] + match[i], 16);
          }
        } else if (match = string.match(hex)) {
          match = match[1];

          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
          }
        } else if (match = string.match(rgba)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(match[i + 1]);
          }

          a = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i = 0; i < rgb.length; i++) {
            rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
          }

          a = parseFloat(match[4]);
        } else if (match = string.match(keyword)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }

          rgb = colorNames[match[1]];

          if (!rgb) {
            return;
          }
        }

        for (var i = 0; i < rgb.length; i++) {
          rgb[i] = scale(rgb[i], 0, 255);
        }

        if (!a && a != 0) {
          a = 1;
        } else {
          a = scale(a, 0, 1);
        }

        rgb[3] = a;
        return rgb;
      }

      function getHsla(string) {
        if (!string) {
          return;
        }

        var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hsl);

        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360),
              s = scale(parseFloat(match[2]), 0, 100),
              l = scale(parseFloat(match[3]), 0, 100),
              a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, s, l, a];
        }
      }

      function getHwb(string) {
        if (!string) {
          return;
        }

        var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hwb);

        if (match) {
          var alpha = parseFloat(match[4]);
          var h = scale(parseInt(match[1]), 0, 360),
              w = scale(parseFloat(match[2]), 0, 100),
              b = scale(parseFloat(match[3]), 0, 100),
              a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h, w, b, a];
        }
      }

      function getRgb(string) {
        var rgba = getRgba(string);
        return rgba && rgba.slice(0, 3);
      }

      function getHsl(string) {
        var hsla = getHsla(string);
        return hsla && hsla.slice(0, 3);
      }

      function getAlpha(string) {
        var vals = getRgba(string);

        if (vals) {
          return vals[3];
        } else if (vals = getHsla(string)) {
          return vals[3];
        } else if (vals = getHwb(string)) {
          return vals[3];
        }
      } // generators


      function hexString(rgb) {
        return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
      }

      function rgbString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return rgbaString(rgba, alpha);
        }

        return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
      }

      function rgbaString(rgba, alpha) {
        if (alpha === undefined) {
          alpha = rgba[3] !== undefined ? rgba[3] : 1;
        }

        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
      }

      function percentString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return percentaString(rgba, alpha);
        }

        var r = Math.round(rgba[0] / 255 * 100),
            g = Math.round(rgba[1] / 255 * 100),
            b = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r + "%, " + g + "%, " + b + "%)";
      }

      function percentaString(rgba, alpha) {
        var r = Math.round(rgba[0] / 255 * 100),
            g = Math.round(rgba[1] / 255 * 100),
            b = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
      }

      function hslString(hsla, alpha) {
        if (alpha < 1 || hsla[3] && hsla[3] < 1) {
          return hslaString(hsla, alpha);
        }

        return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
      }

      function hslaString(hsla, alpha) {
        if (alpha === undefined) {
          alpha = hsla[3] !== undefined ? hsla[3] : 1;
        }

        return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
      } // hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
      // (hwb have alpha optional & 1 is default value)


      function hwbString(hwb, alpha) {
        if (alpha === undefined) {
          alpha = hwb[3] !== undefined ? hwb[3] : 1;
        }

        return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
      }

      function keyword(rgb) {
        return reverseNames[rgb.slice(0, 3)];
      } // helpers


      function scale(num, min, max) {
        return Math.min(Math.max(min, num), max);
      }

      function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return str.length < 2 ? "0" + str : str;
      } //create a list of reverse color names


      var reverseNames = {};

      for (var name in colorNames) {
        reverseNames[colorNames[name]] = name;
      }
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color-string/color-string.js", "/../../../node_modules/color-string");
  }, {
    "buffer": 9,
    "color-name": 5,
    "km4Umf": 10
  }],
  7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /* MIT license */
      var _clone2 = require('clone');

      var convert = require('color-convert');

      var string = require('color-string');

      var Color = function Color(obj) {
        if (obj instanceof Color) {
          return obj;
        }

        if (!(this instanceof Color)) {
          return new Color(obj);
        }

        this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1
        }; // parse Color() argument

        var vals;

        if (typeof obj === 'string') {
          vals = string.getRgba(obj);

          if (vals) {
            this.setValues('rgb', vals);
          } else if (vals = string.getHsla(obj)) {
            this.setValues('hsl', vals);
          } else if (vals = string.getHwb(obj)) {
            this.setValues('hwb', vals);
          } else {
            throw new Error('Unable to parse color from string "' + obj + '"');
          }
        } else if (_typeof(obj) === 'object') {
          vals = obj;

          if (vals.r !== undefined || vals.red !== undefined) {
            this.setValues('rgb', vals);
          } else if (vals.l !== undefined || vals.lightness !== undefined) {
            this.setValues('hsl', vals);
          } else if (vals.v !== undefined || vals.value !== undefined) {
            this.setValues('hsv', vals);
          } else if (vals.w !== undefined || vals.whiteness !== undefined) {
            this.setValues('hwb', vals);
          } else if (vals.c !== undefined || vals.cyan !== undefined) {
            this.setValues('cmyk', vals);
          } else {
            throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
          }
        }
      };

      Color.prototype = {
        rgb: function rgb() {
          return this.setSpace('rgb', arguments);
        },
        hsl: function hsl() {
          return this.setSpace('hsl', arguments);
        },
        hsv: function hsv() {
          return this.setSpace('hsv', arguments);
        },
        hwb: function hwb() {
          return this.setSpace('hwb', arguments);
        },
        cmyk: function cmyk() {
          return this.setSpace('cmyk', arguments);
        },
        rgbArray: function rgbArray() {
          return this.values.rgb;
        },
        hslArray: function hslArray() {
          return this.values.hsl;
        },
        hsvArray: function hsvArray() {
          return this.values.hsv;
        },
        hwbArray: function hwbArray() {
          if (this.values.alpha !== 1) {
            return this.values.hwb.concat([this.values.alpha]);
          }

          return this.values.hwb;
        },
        cmykArray: function cmykArray() {
          return this.values.cmyk;
        },
        rgbaArray: function rgbaArray() {
          var rgb = this.values.rgb;
          return rgb.concat([this.values.alpha]);
        },
        rgbaArrayNormalized: function rgbaArrayNormalized() {
          var rgb = this.values.rgb;
          var glRgba = [];

          for (var i = 0; i < 3; i++) {
            glRgba[i] = rgb[i] / 255;
          }

          glRgba.push(this.values.alpha);
          return glRgba;
        },
        hslaArray: function hslaArray() {
          var hsl = this.values.hsl;
          return hsl.concat([this.values.alpha]);
        },
        alpha: function alpha(val) {
          if (val === undefined) {
            return this.values.alpha;
          }

          this.setValues('alpha', val);
          return this;
        },
        red: function red(val) {
          return this.setChannel('rgb', 0, val);
        },
        green: function green(val) {
          return this.setChannel('rgb', 1, val);
        },
        blue: function blue(val) {
          return this.setChannel('rgb', 2, val);
        },
        hue: function hue(val) {
          if (val) {
            val %= 360;
            val = val < 0 ? 360 + val : val;
          }

          return this.setChannel('hsl', 0, val);
        },
        saturation: function saturation(val) {
          return this.setChannel('hsl', 1, val);
        },
        lightness: function lightness(val) {
          return this.setChannel('hsl', 2, val);
        },
        saturationv: function saturationv(val) {
          return this.setChannel('hsv', 1, val);
        },
        whiteness: function whiteness(val) {
          return this.setChannel('hwb', 1, val);
        },
        blackness: function blackness(val) {
          return this.setChannel('hwb', 2, val);
        },
        value: function value(val) {
          return this.setChannel('hsv', 2, val);
        },
        cyan: function cyan(val) {
          return this.setChannel('cmyk', 0, val);
        },
        magenta: function magenta(val) {
          return this.setChannel('cmyk', 1, val);
        },
        yellow: function yellow(val) {
          return this.setChannel('cmyk', 2, val);
        },
        black: function black(val) {
          return this.setChannel('cmyk', 3, val);
        },
        hexString: function hexString() {
          return string.hexString(this.values.rgb);
        },
        rgbString: function rgbString() {
          return string.rgbString(this.values.rgb, this.values.alpha);
        },
        rgbaString: function rgbaString() {
          return string.rgbaString(this.values.rgb, this.values.alpha);
        },
        percentString: function percentString() {
          return string.percentString(this.values.rgb, this.values.alpha);
        },
        hslString: function hslString() {
          return string.hslString(this.values.hsl, this.values.alpha);
        },
        hslaString: function hslaString() {
          return string.hslaString(this.values.hsl, this.values.alpha);
        },
        hwbString: function hwbString() {
          return string.hwbString(this.values.hwb, this.values.alpha);
        },
        keyword: function keyword() {
          return string.keyword(this.values.rgb, this.values.alpha);
        },
        rgbNumber: function rgbNumber() {
          return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2];
        },
        luminosity: function luminosity() {
          // http://www.w3.org/TR/WCAG20/#relativeluminancedef
          var rgb = this.values.rgb;
          var lum = [];

          for (var i = 0; i < rgb.length; i++) {
            var chan = rgb[i] / 255;
            lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
          }

          return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        },
        contrast: function contrast(color2) {
          // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
          var lum1 = this.luminosity();
          var lum2 = color2.luminosity();

          if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
          }

          return (lum2 + 0.05) / (lum1 + 0.05);
        },
        level: function level(color2) {
          var contrastRatio = this.contrast(color2);

          if (contrastRatio >= 7.1) {
            return 'AAA';
          }

          return contrastRatio >= 4.5 ? 'AA' : '';
        },
        dark: function dark() {
          // YIQ equation from http://24ways.org/2010/calculating-color-contrast
          var rgb = this.values.rgb;
          var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
          return yiq < 128;
        },
        light: function light() {
          return !this.dark();
        },
        negate: function negate() {
          var rgb = [];

          for (var i = 0; i < 3; i++) {
            rgb[i] = 255 - this.values.rgb[i];
          }

          this.setValues('rgb', rgb);
          return this;
        },
        lighten: function lighten(ratio) {
          this.values.hsl[2] += this.values.hsl[2] * ratio;
          this.setValues('hsl', this.values.hsl);
          return this;
        },
        darken: function darken(ratio) {
          this.values.hsl[2] -= this.values.hsl[2] * ratio;
          this.setValues('hsl', this.values.hsl);
          return this;
        },
        saturate: function saturate(ratio) {
          this.values.hsl[1] += this.values.hsl[1] * ratio;
          this.setValues('hsl', this.values.hsl);
          return this;
        },
        desaturate: function desaturate(ratio) {
          this.values.hsl[1] -= this.values.hsl[1] * ratio;
          this.setValues('hsl', this.values.hsl);
          return this;
        },
        whiten: function whiten(ratio) {
          this.values.hwb[1] += this.values.hwb[1] * ratio;
          this.setValues('hwb', this.values.hwb);
          return this;
        },
        blacken: function blacken(ratio) {
          this.values.hwb[2] += this.values.hwb[2] * ratio;
          this.setValues('hwb', this.values.hwb);
          return this;
        },
        greyscale: function greyscale() {
          var rgb = this.values.rgb; // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale

          var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
          this.setValues('rgb', [val, val, val]);
          return this;
        },
        clearer: function clearer(ratio) {
          this.setValues('alpha', this.values.alpha - this.values.alpha * ratio);
          return this;
        },
        opaquer: function opaquer(ratio) {
          this.setValues('alpha', this.values.alpha + this.values.alpha * ratio);
          return this;
        },
        rotate: function rotate(degrees) {
          var hue = this.values.hsl[0];
          hue = (hue + degrees) % 360;
          hue = hue < 0 ? 360 + hue : hue;
          this.values.hsl[0] = hue;
          this.setValues('hsl', this.values.hsl);
          return this;
        },

        /**
         * Ported from sass implementation in C
         * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
         */
        mix: function mix(mixinColor, weight) {
          var color1 = this;
          var color2 = mixinColor;
          var p = weight === undefined ? 0.5 : weight;
          var w = 2 * p - 1;
          var a = color1.alpha() - color2.alpha();
          var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
          var w2 = 1 - w1;
          return this.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue()).alpha(color1.alpha() * p + color2.alpha() * (1 - p));
        },
        toJSON: function toJSON() {
          return this.rgb();
        },
        clone: function clone() {
          var col = new Color();
          col.values = _clone2(this.values);
          return col;
        }
      };

      Color.prototype.getValues = function (space) {
        var vals = {};

        for (var i = 0; i < space.length; i++) {
          vals[space.charAt(i)] = this.values[space][i];
        }

        if (this.values.alpha !== 1) {
          vals.a = this.values.alpha;
        } // {r: 255, g: 255, b: 255, a: 0.4}


        return vals;
      };

      Color.prototype.setValues = function (space, vals) {
        var spaces = {
          rgb: ['red', 'green', 'blue'],
          hsl: ['hue', 'saturation', 'lightness'],
          hsv: ['hue', 'saturation', 'value'],
          hwb: ['hue', 'whiteness', 'blackness'],
          cmyk: ['cyan', 'magenta', 'yellow', 'black']
        };
        var maxes = {
          rgb: [255, 255, 255],
          hsl: [360, 100, 100],
          hsv: [360, 100, 100],
          hwb: [360, 100, 100],
          cmyk: [100, 100, 100, 100]
        };
        var i;
        var alpha = 1;

        if (space === 'alpha') {
          alpha = vals;
        } else if (vals.length) {
          // [10, 10, 10]
          this.values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== undefined) {
          // {r: 10, g: 10, b: 10}
          for (i = 0; i < space.length; i++) {
            this.values[space][i] = vals[space.charAt(i)];
          }

          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== undefined) {
          // {red: 10, green: 10, blue: 10}
          var chans = spaces[space];

          for (i = 0; i < space.length; i++) {
            this.values[space][i] = vals[chans[i]];
          }

          alpha = vals.alpha;
        }

        this.values.alpha = Math.max(0, Math.min(1, alpha === undefined ? this.values.alpha : alpha));

        if (space === 'alpha') {
          return false;
        }

        var capped; // cap values of the space prior converting all values

        for (i = 0; i < space.length; i++) {
          capped = Math.max(0, Math.min(maxes[space][i], this.values[space][i]));
          this.values[space][i] = Math.round(capped);
        } // convert to all the other color spaces


        for (var sname in spaces) {
          if (sname !== space) {
            this.values[sname] = convert[space][sname](this.values[space]);
          } // cap values


          for (i = 0; i < sname.length; i++) {
            capped = Math.max(0, Math.min(maxes[sname][i], this.values[sname][i]));
            this.values[sname][i] = Math.round(capped);
          }
        }

        return true;
      };

      Color.prototype.setSpace = function (space, args) {
        var vals = args[0];

        if (vals === undefined) {
          // color.rgb()
          return this.getValues(space);
        } // color.rgb(10, 10, 10)


        if (typeof vals === 'number') {
          vals = Array.prototype.slice.call(args);
        }

        this.setValues(space, vals);
        return this;
      };

      Color.prototype.setChannel = function (space, index, val) {
        if (val === undefined) {
          // color.red()
          return this.values[space][index];
        } else if (val === this.values[space][index]) {
          // color.red(color.red())
          return this;
        } // color.red(100)


        this.values[space][index] = val;
        this.setValues(space, this.values[space]);
        return this;
      };

      module.exports = Color;
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/color/index.js", "/../../../node_modules/color");
  }, {
    "buffer": 9,
    "clone": 1,
    "color-convert": 3,
    "color-string": 6,
    "km4Umf": 10
  }],
  8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      ;

      (function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'

          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'

          if (code < NUMBER) return -1; //no match

          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          } // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice


          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

          arr = new Arr(b64.length * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

          l = placeHolders > 0 ? b64.length - 4 : b64.length;
          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,
              // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          } // go through the array every three bytes, we'll deal with trailing stuff later


          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          } // pad the end with zeros, but make sure to not forget the extra bytes


          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;

            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? this.base64js = {} : exports);
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/../../../node_modules/gulp-browserify/node_modules/base64-js/lib");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var base64 = require('base64-js');

      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;
      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */

      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);

          arr.foo = function () {
            return 42;
          };

          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();
      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */


      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = _typeof(subject); // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.


        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);

          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        } // Find the length


        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');
        var buf;

        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;

        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      } // STATIC METHODS
      // ==============


      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;

          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';

        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;

          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;

          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;

          case 'base64':
            ret = base64ToBytes(str).length;
            break;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;

          default:
            throw new Error('Unknown encoding');
        }

        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;

        if (typeof totalLength !== 'number') {
          totalLength = 0;

          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;

        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }

        return buf;
      }; // BUFFER INSTANCE METHODS
      // =======================


      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;

        if (!length) {
          length = remaining;
        } else {
          length = Number(length);

          if (length > remaining) {
            length = remaining;
          }
        } // must be an even number of digits


        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }

        for (var i = 0; i < length; i++) {
          var _byte = parseInt(string.substr(i * 2, 2), 16);

          assert(!isNaN(_byte), 'Invalid hex string');
          buf[offset + i] = _byte;
        }

        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;

        if (!length) {
          length = remaining;
        } else {
          length = Number(length);

          if (length > remaining) {
            length = remaining;
          }
        }

        encoding = String(encoding || 'utf8').toLowerCase();
        var ret;

        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;

          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;

          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;

          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;

          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;

          default:
            throw new Error('Unknown encoding');
        }

        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;
        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length; // Fastpath empty strings

        if (end === start) return '';
        var ret;

        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;

          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;

          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;

          case 'binary':
            ret = _binarySlice(self, start, end);
            break;

          case 'base64':
            ret = _base64Slice(self, start, end);
            break;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;

          default:
            throw new Error('Unknown encoding');
        }

        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      }; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0; // Copy 0 bytes; we're done

        if (end === start) return;
        if (target.length === 0 || source.length === 0) return; // Fatal error conditions

        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds'); // Are we oob?

        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;
        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }

        return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        var out = '';

        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }

        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';

        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }

        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);

          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }

          return newBuf;
        }
      }; // `get` will be removed in Node 0.13+


      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      }; // `set` will be removed in Node 0.13+


      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;
        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;
        var val;

        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }

        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;
        var val;

        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }

        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;
        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);

        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);

        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;
        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;
        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;
        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;
        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      }; // fill(value, start=0, end=buffer.length)


      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start'); // Fill 0 bytes; we're done

        if (end === start) return;
        if (this.length === 0) return;
        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;

        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);

          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }

        return '<Buffer ' + out.join(' ') + '>';
      };
      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */


      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);

            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }

            return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      }; // HELPER FUNCTIONS
      // ================


      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;
      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */

      Buffer._augment = function (arr) {
        arr._isBuffer = true; // save reference to original Uint8Array get/set methods before overwriting

        arr._get = arr.get;
        arr._set = arr.set; // deprecated, will be removed in node 0.13+

        arr.get = BP.get;
        arr.set = BP.set;
        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;
        return arr;
      }; // slice(start, end)


      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.

        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && _typeof(subject) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];

        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');

            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }

        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];

        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }

        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];

        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;

        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }

        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }
      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */


      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/gulp-browserify/node_modules/buffer/index.js", "/../../../node_modules/gulp-browserify/node_modules/buffer");
  }, {
    "base64-js": 8,
    "buffer": 9,
    "ieee754": 11,
    "km4Umf": 10
  }],
  10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      // shim for using process in browser
      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;

            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();

              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);
          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      }; // TODO(shtylman)


      process.cwd = function () {
        return '/';
      };

      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/gulp-browserify/node_modules/process/browser.js", "/../../../node_modules/gulp-browserify/node_modules/process");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;

        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;

        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }

        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);

          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }

          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }

          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;

        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../../node_modules/ieee754/index.js", "/../../../node_modules/ieee754");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /**
       * Created by Sergey on 9/29/2016.
       * Написал в соответствии с http://www.alcula.com/calculators/statistics/dispersion/
       */
      'use strict'; // jshint ignore:line

      function Average() {
        this.reset();
      }

      Average.constructor = Average;

      Average.prototype.reset = function () {
        this.counter = 0;
        this.counter2 = 0;
        this.min = undefined;
        this.max = undefined;
        this.i = 0;
        this.values = [];
      };

      Average.prototype.deviation = function () {
        var counter = 0;
        var length = this.values.length;
        var values = this.values;

        for (var i = 0; i < length; i++) {
          var value = values[i] - this.mean();
          counter += value * value;
        }

        return this.i > 1 ? Math.sqrt(counter / this.i) : 0;
      };

      Average.prototype.increase = function (value) {
        this.values.push(value);
        this.counter += value;
        this.counter2 += value * value;

        if (this.min > value || this.min === undefined) {
          this.min = value;
        }

        if (this.max < value || this.max === undefined) {
          this.max = value;
        }

        this.i++;
      };

      Average.prototype.range = function () {
        return this.max - this.min;
      };

      Average.prototype.mean = function () {
        return this.counter / this.i;
      };

      Average.prototype.mean2 = function () {
        return this.counter2 / this.i;
      };

      Average.prototype.variance = function () {
        var mx = this.mean();
        var mx2 = this.mean2();
        return mx2 - mx * mx;
      };

      module.exports = Average; // jshint ignore:line
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/average.js", "/");
  }, {
    "buffer": 9,
    "km4Umf": 10
  }],
  13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /**
       * Created by Sergey on 8/5/2016.
       */
      'use strict'; // jshint ignore:line

      var Color = require('color');

      var Average = require('./average');

      function AverageColor() {
        this.reset();
      }

      AverageColor.constructor = AverageColor;

      AverageColor.prototype.reset = function () {
        this.r = new Average(0, 255);
        this.g = new Average(0, 255);
        this.b = new Average(0, 255);
        this.l = new Average(0, 100);
        this.i = 0;
      };

      AverageColor.prototype.increase = function (pixel) {
        this.r.increase(pixel.r);
        this.g.increase(pixel.g);
        this.b.increase(pixel.b);
        this.l.increase(pixel.l);
        this.i++;
      };

      AverageColor.prototype._componentToHex = function (c) {
        var hex = Math.floor(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };

      AverageColor.prototype._rgbToHex = function (r, g, b) {
        return this._componentToHex(r) + this._componentToHex(g) + this._componentToHex(b);
      };

      AverageColor.prototype.deviation = function () {
        return (2 * this.l.deviation() + 0.13 * (this.r.deviation() + this.g.deviation() + this.b.deviation())) / 3;
      }; // M[X]


      AverageColor.prototype.color = function () {
        var r = this.r.mean();
        var g = this.g.mean();
        var b = this.b.mean();
        return this._rgbToHex(r, g, b);
      };

      function ImageDataWrapper(data, width, height) {
        this.data = data;
        this.width = width;
        this.height = height;
        this.pixelSize = data.length / width / height; // console.log(data.length, width, height, this.pixelSize);
      }

      ImageDataWrapper.constructor = ImageDataWrapper;

      ImageDataWrapper.prototype.getPixel = function (x, y) {
        if (x > this.width || y > this.height) {
          return undefined;
        }

        var pixelOffset = y * this.pixelSize * this.width + x * this.pixelSize;
        var data = this.data;
        var result = {
          r: data[pixelOffset++],
          g: data[pixelOffset++],
          b: data[pixelOffset++]
        };
        var color = new Color(result);
        var hsl = color.hsl();
        result.l = hsl.l;
        result.a = this.data[pixelOffset];
        return result;
      };

      var isNull = function isNull(obj) {
        return obj === null;
      };

      var isUndefined = function isUndefined(obj) {
        return obj === void 0;
      };

      var has = function has(obj, key) {
        return obj !== null && obj.hasOwnProperty(key);
      };

      var mixColors = function mixColors() {
        var args = Array.prototype.slice.call(arguments);
        var counterRed = 0;
        var counterGreen = 0;
        var counterBlue = 0;

        for (var i = 0; i < args.length; i++) {
          var color = args[i];
          counterRed += color.red();
          counterGreen += color.green();
          counterBlue += color.blue();
        }

        counterRed /= args.length;
        counterGreen /= args.length;
        counterBlue /= args.length;
        return new Color({
          r: counterRed,
          g: counterGreen,
          b: counterBlue
        });
      };
      /**
       * Класс, который по картинке и, способу заливки и двум цветам вычисляет дополнительные цвета скина
       * Все параметры обязательны
      
       * @param {String} backgroundSize auto|cover|contain
       * @param {String}mainColor цвет панелей
       * @param {String}secondColor цвет фона
       * @param {Image} image - загруженная картинка
       * @param {Canvas} canvas
       * @constructor
       */


      function ColorsFromImage(Canvas) {
        if (Canvas) {
          this.canvas = new Canvas(1, 1);
        } else {
          this.canvas = document.createElement('canvas');
        }

        this.transparency = true;
      }

      ColorsFromImage.constructor = ColorsFromImage;

      ColorsFromImage.prototype.setProperty = function (property) {
        if (property) {
          if (has(property, 'second-color')) {
            this.secondColor = property['second-color'];

            if (!has(property, 'image')) {
              this._setImage(this.image);
            }
          }

          if (has(property, 'image')) {
            this._setImage(property.image);
          }

          if (has(property, 'main-color')) {
            this.mainColor = property['main-color'];
          }

          if (has(property, 'background-size')) {
            this.backgroundSize = property['background-size'];
          }

          if (has(property, 'image') || has(property, 'second-color') || has(property, 'background-size')) {
            this._calculateBackgroundColors();

            this._calculateMixedBackgroundColors();
          }

          this._calculateAdditionalColors();
        }
      };

      ColorsFromImage.prototype.setMainColor = function (mainColor) {
        this.mainColor = mainColor;

        this._calculateAdditionalColors();
      };

      ColorsFromImage.prototype.setSecondColor = function (secondColor) {
        this.secondColor = secondColor;

        this._calculateAll();
      };

      ColorsFromImage.prototype._calculateAll = function () {
        if (this.transparency) {
          this._calculateBackgroundColors();

          this._calculateMixedBackgroundColors();
        }

        this._calculateAdditionalColors();
      };
      /**
       * Расчитывает цвет легко контрастирующий с заданным цветом
       * @param {String} color
       * @private
       */


      ColorsFromImage.prototype._calculateLightContrastColor = function (color) {
        var c = new Color(color);
        var hsl = c.hsl(); // Меняем яркость на противоположную

        if (hsl.l > 80) {
          hsl.l -= 50 - (hsl.l - 50) / 10;
        } else if (hsl.l < 20) {
          hsl.s *= 1 / (20 - hsl.l);
          hsl.l += 50 - (hsl.l - 50) / 10;
        } else if (hsl.l >= 50) {
          hsl.l -= 30 - (hsl.l - 50) / 5;
        } else {
          hsl.l += 30 - (hsl.l - 50) / 5;
        }

        c = new Color(hsl);
        return c.hexString();
      };

      ColorsFromImage.prototype.setBackgroundSize = function (backgroundSize) {
        this.backgroundSize = backgroundSize;

        this._calculateAll();
      };

      ColorsFromImage.prototype._createContext = function (image) {
        var context = this.canvas.getContext('2d');
        this.height = image.height > 50 ? 50 : image.height;
        this.width = image.width > 30 ? 30 : image.width;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.fillStyle = this.secondColor;
        context.fill();
        context.drawImage(image, 0, 0, this.width, this.height);
        return context;
      };

      ColorsFromImage.prototype._setImage = function (image) {
        if (isUndefined(image) || isNull(image) || isUndefined(this.canvas) || isNull(this.canvas)) {
          delete this.image;

          this._setContext(null);
        } else if (!(image.height > 0) || !(image.width > 0)) {
          console.trace('image.height:', image.height, 'image.width:', image.width);
        } else {
          this.image = image;

          var context = this._createContext(this.image);

          this._setContext(context, this.width, this.height);
        }
      };

      ColorsFromImage.prototype.setImage = function (image) {
        this._setImage(image);

        this._calculateAll();
      };

      ColorsFromImage.prototype._setContext = function (context2d, width, height) {
        this.transparency = context2d !== null; // TODO get it from url

        this.context2d = context2d;
        this.width = width;
        this.height = height;
      };
      /**
       * Расчитывает средний цвет у картинки в прямоугольнике ограниченном параметрами:
       * @param {int} fromY
       * @param {int} toY
       * @param {int} fromX
       * @param {int} toX
       * @private
       */


      ColorsFromImage.prototype._calculateColor = function (fromY, toY, fromX, toX) {
        if (isUndefined(fromX) || isUndefined(toX)) {
          fromX = 0;
          toX = this.width - 1;
        }

        var counter = new AverageColor();
        var context2d = this.context2d;
        var width = toX - fromX + 1;
        var height = toY - fromY + 1;
        var tan = width / height;
        var data = context2d.getImageData(fromX, fromY, width, height).data;
        data = new ImageDataWrapper(data, width, height);

        for (var y = 0; y < height; y++) {
          var x = tan * y;
          var pixel = data.getPixel(Math.floor(x), y);
          counter.increase(pixel);
        }

        var hex = counter.color();
        return {
          hex: '#' + hex,
          deviation: counter.deviation()
        };
      };
      /**
       * Устанавливает цвета фона в единый цвет
       * @private
       */


      ColorsFromImage.prototype._setAllColors = function (color) {
        this.topLeftBackgroundColor = color.hex;
        this.topCenterBackgroundColor = color.hex;
        this.topRightBackgroundColor = color.hex;
        this.middleLeftBackgroundColor = color.hex;
        this.middleCenterBackgroundColor = color.hex;
        this.middleRightBackgroundColor = color.hex;
        this.bottomLeftBackgroundColor = color.hex;
        this.bottomCenterBackgroundColor = color.hex;
        this.bottomRightBackgroundColor = color.hex;
        this.topLeftBackgroundDeviation = color.deviation;
        this.topRightBackgroundDeviation = color.deviation;
        this.bottomCenterBackgroundDeviation = color.deviation;
      };
      /**
       * Расчитывает дополнительные цвета, на основе фоновых
       * @private
       */


      ColorsFromImage.prototype._calculateAdditionalColors = function () {
        this._calculateButtons();

        this._calculateTexts();

        this._calculateShadows();

        this.mobileProgressColor = this._calculateLightContrastColor(this.topBackgroundColor);
      }; // первая часть YIQ компонента цвета


      ColorsFromImage.prototype._calculateLuma = function (color) {
        var redWeight = 299;
        var greenWeight = 587 + 80; // сдвиг по зеленой фазе относительно стандартного алгоритма

        var blueWeight = 114;
        var luma = (color.red() * redWeight + color.green() * greenWeight + color.blue() * blueWeight) / (redWeight + greenWeight + blueWeight); // https://en.wikipedia.org/wiki/Luma_(video)

        return luma / 255;
      };

      ColorsFromImage.prototype._calculateContrast = function (luma) {
        return new Color(luma >= 0.54 ? 'black' : 'white');
      };
      /**
       * Расчитывает цвет текста, контрастные к
       * @param {String} color
       * @private
       */


      ColorsFromImage.prototype._calculateText = function (color) {
        if (color) {
          var c = new Color(color);

          var luma = this._calculateLuma(c);

          var contrast = this._calculateContrast(luma); // Подмешиваем немножко фона в зависимости от Luma


          var scaledLum = (luma < 0.5 ? -1 : 1) * 2 * (luma - 0.5);
          var independentPart = luma < 0.5 ? 0 : 0.1;
          var backgroundButtonAlpha = 1 - 0.2 * scaledLum - independentPart;
          contrast.mix(c, backgroundButtonAlpha);
          return contrast.hexString();
        }

        return '#ffffff';
      };
      /**
       * Расчитывает цвет Кнопок иконок, контрастные к
       * @param {String} color
       * @param {String} additionalColor - дополнительный цвет - если он похож на предыдущий, то контраст считается от среднего
       * @private
       */


      ColorsFromImage.prototype._calculateIconButton = function (color, additionalColor) {
        var c = new Color(color);

        var luma = this._calculateLuma(c);

        if (!isUndefined(additionalColor)) {
          var ac = new Color(additionalColor);

          var aluma = this._calculateLuma(ac);

          if (Math.abs(luma - aluma) < 0.1) {
            c = mixColors(ac, c);
            luma = this._calculateLuma(c);
          }
        }

        var contrast = this._calculateContrast(luma); // Подмешиваем цвет фона


        var backgroundButtonAlpha = 1;

        if (luma < 0.5) {
          // Для светлых кнопок
          backgroundButtonAlpha -= 0.1 + 0.28 * (1 - luma);
        } else {
          // для темных кнопок
          backgroundButtonAlpha -= 0.2 + 0.3 * luma;
        }

        contrast.mix(c, backgroundButtonAlpha);
        return contrast.hexString();
      };
      /**
       * Расчитывает цвет тени, контрастные к
       * @param {String} color
       * @private
       */


      ColorsFromImage.prototype._calculateShadowColor = function (color) {
        var c = new Color(color);
        var hsl = c.hsl();
        hsl.s = 0; // Меняем яркость на противоположную

        if (hsl.l > 50) {
          hsl.l -= 50 - (hsl.l - 50) / 10;
        } else {
          hsl.l += 30 - (hsl.l - 50) / 5;
        }

        c = new Color(hsl);
        return c.hexString();
      };
      /**
       * Расчитывает цвет текстовой кнопки, контрастные к
       * @param {String} color
       * @private
       */


      ColorsFromImage.prototype._calculateTextButton = function (color) {
        var c = new Color(color);
        var hsl = c.hsl(); // Если цвет фона темный, то уменьшаем насыщенность

        if (hsl.l < 20) {
          hsl.s *= 1 / (20 - hsl.l);
        } // Меняем яркость на противоположную


        if (hsl.l > 50) {
          hsl.l -= 50 - (hsl.l - 50) / 10;
        } else {
          hsl.l += 30 - (hsl.l - 50) / 5;
        }

        c = new Color(hsl);
        return c.hexString();
      };
      /**
       * Рекомендация сделать нижнюю панель непрозрачной
       * @returns {boolean}
       */


      ColorsFromImage.prototype.isBottomOpaque = function () {
        return this.bottomCenterBackgroundDeviation > 10;
      };
      /**
       * Рекомендация сделать верхнюю панель непрозрачной
       * @returns {boolean}
       */


      ColorsFromImage.prototype.isTopOpaque = function () {
        return Math.max(this.topLeftBackgroundDeviation, this.topRightBackgroundDeviation) > 10;
      };
      /**
       * Метод возвращает объект с вычисляемыми цветами
       */


      ColorsFromImage.prototype.getVars = function () {
        return {
          'main-color': this.mainColor,
          'main-text-color': this.mainTextColor,
          'main-button-color': this.mainButtonColor,
          'main-icon-color': this.mainIconColor,
          'second-color': this.secondColor,
          'second-text-color': this.secondTextColor,
          'second-icon-color': this.secondIconColor,
          'second-button-color': this.secondButtonColor,
          'background-color': this.backgroundColor,
          'background-shadow-color': this.backgroundShadowColor,
          'bottom-background-color': this.bottomBackgroundColor,
          'bottom-left-background-color': this.bottomLeftBackgroundColor,
          'bottom-right-background-color': this.bottomRightBackgroundColor,
          'bottom-center-background-color': this.bottomCenterBackgroundColor,
          'bottom-icon-color': this.bottomIconColor,
          'bottom-left-icon-color': this.bottomLeftIconColor,
          'bottom-right-icon-color': this.bottomRightIconColor,
          'middle-background-color': this.middleBackgroundColor,
          'middle-left-background-color': this.middleLeftBackgroundColor,
          'middle-right-background-color': this.middleRightBackgroundColor,
          'middle-right-icon-color': this.middleRightIconColor,
          'middle-left-icon-color': this.middleLeftIconColor,
          'top-background-color': this.topBackgroundColor,
          'top-left-background-color': this.topLeftBackgroundColor,
          'top-left-text-color': this.topLeftTextColor,
          'top-left-icon-color': this.topLeftIconColor,
          'top-right-background-color': this.topRightBackgroundColor,
          'top-right-text-color': this.topRightTextColor,
          'top-right-button-color': this.topRightButtonColor,
          'top-right-icon-color': this.topRightIconColor,
          'top-center-background-color': this.topCenterBackgroundColor,
          'bottom-right-background-text-color': this.bottomRightBackgroundTextColor,
          'bottom-left-background-text-color': this.bottomLeftBackgroundTextColor,
          'top-right-menu-icon-color': this.topRightIconColor,
          'top-right-menu-button-color': this.topRightButtonColor,
          'top-left-menu-text-color': this.topLeftTextColor,
          'mobile-progress-color': this.mobileProgressColor
        };
      };
      /**
       * Расчитывает цвета теней
       * @private
       */


      ColorsFromImage.prototype._calculateShadows = function () {
        this.backgroundShadowColor = this._calculateShadowColor(this.backgroundColor);
      };
      /**
       * Расчитывает цвета кнопок
       * @private
       */


      ColorsFromImage.prototype._calculateButtons = function () {
        this.secondButtonColor = this._calculateTextButton(this.secondColor);
        this.mainButtonColor = this._calculateTextButton(this.mainColor);
        this.topRightButtonColor = this._calculateTextButton(this.topRightBackgroundColor);
        this.mainIconColor = this._calculateIconButton(this.mainColor);
        this.secondIconColor = this._calculateIconButton(this.secondColor);
        this.bottomIconColor = this._calculateIconButton(this.bottomCenterBackgroundColor);
        this.topRightIconColor = this._calculateIconButton(this.topRightBackgroundColor);
        this.topLeftIconColor = this._calculateIconButton(this.topLeftBackgroundColor); // Next Prev Arrows

        this.middleRightIconColor = this._calculateIconButton(this.middleRightBackgroundColor, this.middleLeftBackgroundColor);
        this.middleLeftIconColor = this._calculateIconButton(this.middleLeftBackgroundColor, this.middleRightBackgroundColor); // Last First Arrows

        this.bottomRightIconColor = this._calculateIconButton(this.bottomRightBackgroundColor, this.bottomLeftBackgroundColor);
        this.bottomLeftIconColor = this._calculateIconButton(this.bottomLeftBackgroundColor, this.bottomRightBackgroundColor);
      };
      /**
       * Расчитывает цвета текстов
       * @private
       */


      ColorsFromImage.prototype._calculateTexts = function () {
        this.mainTextColor = this._calculateText(this.mainColor);
        this.secondTextColor = this._calculateText(this.secondColor);
        this.topLeftTextColor = this._calculateText(this.topLeftBackgroundColor);
        this.topRightTextColor = this._calculateText(this.topRightBackgroundColor);
        this.bottomRightBackgroundTextColor = this._calculateText(this.bottomRightBackgroundColor);
        this.bottomLeftBackgroundTextColor = this._calculateText(this.bottomLeftBackgroundColor);
      };
      /**
       * Расчитывает общие цвета для Background'ов (средний из кусочков)
       * @private
       */


      ColorsFromImage.prototype._calculateMixedBackgroundColors = function () {
        this.topBackgroundColor = mixColors(new Color(this.topLeftBackgroundColor), new Color(this.topCenterBackgroundColor), new Color(this.topRightBackgroundColor)).hexString();
        this.middleBackgroundColor = mixColors(new Color(this.middleLeftBackgroundColor), new Color(this.middleCenterBackgroundColor), new Color(this.middleRightBackgroundColor)).hexString();
        this.bottomBackgroundColor = mixColors(new Color(this.bottomLeftBackgroundColor), new Color(this.bottomCenterBackgroundColor), new Color(this.bottomRightBackgroundColor)).hexString();
        this.backgroundColor = mixColors(new Color(this.topBackgroundColor), new Color(this.middleBackgroundColor), new Color(this.bottomBackgroundColor)).hexString();
      };
      /**
       * Расчитывает основные цвета для Background'ов
       * Условно делим картинку на 3 части по горизонтали и 5 по вертикали
       * И считаем средние цвета для тех кусочков, которые отмечены 1
       * |1|1|1|
       * |0|0|0|
       * |1|1|1|
       * |0|0|0|
       * |1|1|1|
       * @private
       */


      ColorsFromImage.prototype._calculateBackgroundColors = function () {
        var averageColor;

        if (isNull(this.context2d) || isUndefined(this.context2d)) {
          this._setAllColors({
            hex: this.secondColor,
            deviation: 0
          });
        } else if (this.backgroundSize === 'auto') {
          averageColor = this._calculateColor(0, this.height - 1);

          this._setAllColors(averageColor);
        } else {
          var topY = Math.ceil(this.height / 5) - 1;
          var middleY = Math.floor(this.height / 5 * 2);
          var middleY2 = Math.ceil(this.height / 5 * 3) - 1;
          var bottomY = Math.floor(this.height / 5 * 4);
          var leftX = Math.ceil(this.width / 3) - 1;
          var leftX2 = Math.floor(this.width / 3);
          var rightX = Math.ceil(this.width / 3 * 2) - 1;
          var rightX2 = Math.floor(this.width / 3 * 2);
          averageColor = this._calculateColor(0, topY, 0, leftX);
          this.topLeftBackgroundColor = averageColor.hex;
          this.topLeftBackgroundDeviation = averageColor.deviation;
          this.topCenterBackgroundColor = this._calculateColor(0, topY, leftX2, rightX).hex;
          averageColor = this._calculateColor(0, topY, rightX2, this.width - 1);
          this.topRightBackgroundColor = averageColor.hex;
          this.topRightBackgroundDeviation = averageColor.deviation;
          this.middleLeftBackgroundColor = this._calculateColor(middleY, middleY2, 0, leftX).hex;
          this.middleCenterBackgroundColor = this._calculateColor(middleY, middleY2, leftX2, rightX).hex;
          this.middleRightBackgroundColor = this._calculateColor(middleY, middleY2, rightX2, this.width - 1).hex;
          averageColor = this._calculateColor(bottomY, this.height - 1, leftX2, rightX);
          this.bottomLeftBackgroundColor = this._calculateColor(bottomY, this.height - 1, 0, leftX).hex;
          this.bottomCenterBackgroundColor = averageColor.hex;
          this.bottomCenterBackgroundDeviation = averageColor.deviation;
          this.bottomRightBackgroundColor = this._calculateColor(bottomY, this.height - 1, rightX2, this.width - 1).hex;
        }
      };

      module.exports = ColorsFromImage; // jshint ignore:line
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/colors-from-image.js", "/");
  }, {
    "./average": 12,
    "buffer": 9,
    "color": 7,
    "km4Umf": 10
  }],
  14: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      /**
       * Created by Sergey on 9/26/2016.
       */
      global.ColorsFromImage = require('./colors-from-image');
    }).call(this, require("km4Umf"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_1b748478.js", "/");
  }, {
    "./colors-from-image": 13,
    "buffer": 9,
    "km4Umf": 10
  }]
}, {}, [14]);