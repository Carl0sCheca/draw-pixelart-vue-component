import { defineComponent as le, ref as ce, onMounted as pe, openBlock as ue, createElementBlock as de } from "vue";
class nt {
  constructor(t, s) {
    this.drawApp = t, this.toolType = s, this.name = this.toolType.toString(), this.event = new Event(this.name), this._dragging = !1, this.canRun = !0, t.canvas.addEventListener(this.name, () => this.onAction());
  }
  onAction() {
    this.canRun = this.drawApp.mouse.button !== d.RIGHT;
  }
}
function _(n, t) {
  return t.some((s) => s.x === n.x && s.y === n.y) ? !0 : (t.push(n), !1);
}
function D(n) {
  const t = new Blob([n], { type: "image/svg+xml" }), s = URL.createObjectURL(t), r = document.createElement("img");
  return r.src = s, r;
}
function ft(n, t, s) {
  if (X(n, { x: 0, y: 0 }, { x: t.settings.gridSize - 1, y: t.settings.gridSize - 1 })) {
    if (n.x + 1 < t.settings.gridSize && !s.some((r) => r.x - 1 === n.x && r.y === n.y)) {
      const r = { x: n.x + 1, y: n.y };
      _(r, s), ft(r, t, s);
    }
    if (n.x - 1 >= 0 && !s.some((r) => r.x + 1 === n.x && r.y === n.y)) {
      const r = { x: n.x - 1, y: n.y };
      _(r, s), ft(r, t, s);
    }
    if (n.y + 1 < t.settings.gridSize && !s.some((r) => r.x === n.x && r.y - 1 === n.y)) {
      const r = { x: n.x, y: n.y + 1 };
      _(r, s), ft(r, t, s);
    }
    if (n.y - 1 >= 0 && !s.some((r) => r.x === n.x && r.y + 1 === n.y)) {
      const r = { x: n.x, y: n.y - 1 };
      _(r, s), ft(r, t, s);
    }
  }
}
function vt(n, t, s, r) {
  if (X(n, { x: 0, y: 0 }, { x: t.settings.gridSize - 1, y: t.settings.gridSize - 1 })) {
    if (n.x + 1 < t.settings.gridSize && t.data.pixels[n.x + 1][n.y] === r && !s.some((a) => a.x - 1 === n.x && a.y === n.y)) {
      const a = { x: n.x + 1, y: n.y };
      _(a, s), vt(a, t, s, r);
    }
    if (n.x - 1 >= 0 && t.data.pixels[n.x - 1][n.y] === r && !s.some((a) => a.x + 1 === n.x && a.y === n.y)) {
      const a = { x: n.x - 1, y: n.y };
      _(a, s), vt(a, t, s, r);
    }
    if (n.y + 1 < t.settings.gridSize && t.data.pixels[n.x][n.y + 1] === r && !s.some((a) => a.x === n.x && a.y - 1 === n.y)) {
      const a = { x: n.x, y: n.y + 1 };
      _(a, s), vt(a, t, s, r);
    }
    if (n.y - 1 >= 0 && t.data.pixels[n.x][n.y - 1] === r && !s.some((a) => a.x === n.x && a.y + 1 === n.y)) {
      const a = { x: n.x, y: n.y - 1 };
      _(a, s), vt(a, t, s, r);
    }
  }
}
function fe(n) {
  return !(n.mouse.dataPosition.x < 0 || n.mouse.dataPosition.x >= n.settings.gridSize || n.mouse.dataPosition.y < 0 || n.mouse.dataPosition.y >= n.settings.gridSize || n.mouse.position.x < 0 || n.mouse.position.x >= n.canvas.width || n.mouse.position.y < 0 || n.mouse.position.y >= n.canvas.height);
}
function ve(n) {
  return {
    x: Math.trunc(-n.zoom.offset.x / n.zoom.level),
    y: Math.trunc(-n.zoom.offset.y / n.zoom.level)
  };
}
function ge(n) {
  return {
    x: Math.trunc((n.canvas.width - n.zoom.offset.x) / n.zoom.level),
    y: Math.trunc((n.canvas.height - n.zoom.offset.y) / n.zoom.level)
  };
}
function _i(n, t) {
  return n.x !== t.x || n.y !== t.y;
}
const Xt = { x: 0, y: 0 };
function mi(n, t) {
  return { x: n.x / t.x, y: n.y / t.x };
}
function Ai(n) {
  return { x: Math.abs(n.x), y: Math.abs(n.y) };
}
function we(n) {
  return { x: Math.trunc(n.x), y: Math.trunc(n.y) };
}
function xe(n) {
  return { x: Math.ceil(n.x), y: Math.ceil(n.y) };
}
function z(n, t, s) {
  return n < t ? t : n > s ? s : n;
}
function me(n, t, s) {
  return { x: z(n.x, t.x, s.x), y: z(n.y, t.y, s.y) };
}
function st(n, t) {
  return {
    x: n.x * t.settings.pixelSize,
    y: n.y * t.settings.pixelSize
  };
}
function ot(n, t) {
  return {
    x: z(Math.trunc(n.x / t.settings.pixelSize), 0, t.settings.gridSize - 1),
    y: z(Math.trunc(n.y / t.settings.pixelSize), 0, t.settings.gridSize - 1)
  };
}
function yi(n, t, s) {
  return (1 - s) * n + s * t;
}
function Ae(n, t, s, r) {
  if (!fe(n))
    return;
  const a = ot(t, n), c = ot(s, n), w = 1 / Math.max(Math.trunc(Math.abs(a.x - c.x)), Math.trunc(Math.abs(a.y - c.y)));
  for (let v = w; v <= 1; v += w) {
    const E = {
      x: Math.trunc(yi(c.x, a.x, v)),
      y: Math.trunc(yi(c.y, a.y, v))
    };
    r(E);
  }
}
function ye(n, t) {
  return Math.floor(Math.random() * (t - n + 1)) + n;
}
function X(n, t, s) {
  return n.x >= t.x && n.x <= s.x && n.y >= t.y && n.y <= s.y;
}
function Nt(n) {
  const t = { H: n.H, S: n.S / 100, V: n.V / 100 }, s = { H: t.H, S: void 0, L: void 0 };
  return s.L = t.V * (1 - t.S / 2), s.L === 0 || s.L === 1 ? s.S = 0 : s.S = (t.V - s.L) / Math.min(s.L, 1 - s.L), s.L = Math.ceil(s.L * 100), s.S = Math.ceil(s.S * 100), s;
}
function Mt(n) {
  return `hsl(${n.H}, ${n.S}%, ${n.L}%)`;
}
function _e(n) {
  let t = "#";
  for (let s = 0; s < 3; s++) {
    let r = n[s].toString(16);
    r.length === 1 && (r = "0" + r), t += r;
  }
  return t;
}
var b;
(function(n) {
  n[n.Vector = 0] = "Vector", n[n.Array = 1] = "Array";
})(b || (b = {}));
class Ei {
  constructor(t, s) {
    this._drawApp = t, this._gridSize = s, this._initData();
  }
  _initData(t = "ffffff") {
    let s = !1;
    if (typeof Storage !== void 0 && localStorage.pixels) {
      const r = JSON.parse(localStorage.pixels);
      r.length === parseInt(this._gridSize) && (this.pixels = r, s = !0);
    }
    if (!s) {
      this.pixels = [];
      for (let r = 0; r < this._gridSize; r++) {
        this.pixels[r] = [];
        for (let a = 0; a < this._gridSize; a++)
          this.pixels[r][a] = t;
      }
    }
    this.lastAction = [], this.lastActionIndex = -1;
  }
  saveLocalStorage() {
    typeof Storage !== void 0 && (localStorage.pixels = JSON.stringify(this.pixels));
  }
  clearData(t = "ffffff") {
    var s, r;
    const a = { positions: [], colors: [], type: b.Array };
    for (let c = 0; c < this._gridSize; c++)
      for (let u = 0; u < this._gridSize; u++)
        (s = a.positions) === null || s === void 0 || s.push({ x: c, y: u }), (r = a.colors) === null || r === void 0 || r.push(this.pixels[c][u]), this.pixels[c][u] = t;
    this._checkLastActionAndWrite(a), this.saveLocalStorage();
  }
  static FlushDuplicatedData(t, s) {
    var r;
    const a = [];
    for (let c = 0; c < s; c++)
      a[c] = [];
    (r = t.positions) === null || r === void 0 || r.forEach((c, u) => {
      X(c, { x: 0, y: 0 }, { x: s - 1, y: s - 1 }) && (a[c.x][c.y] = t.colors[u]);
    }), t.positions = [], t.colors = [];
    for (let c = 0; c < s; c++)
      for (let u = 0; u < s; u++)
        a[c][u] !== void 0 && (t.positions.push({ x: c, y: u }), t.colors.push(a[c][u]));
    return t;
  }
  _checkLastActionAndWrite(t) {
    this.lastActionIndex + 1 !== this.lastAction.length && this.lastAction.splice(this.lastActionIndex + 1), this.lastAction[this.lastActionIndex + 1] !== void 0 ? this.lastAction[this.lastActionIndex + 1] = t : this.lastAction.push(t), this.lastActionIndex++;
  }
  writeData(t) {
    var s, r;
    if (this.pixels !== void 0 || t !== void 0) {
      if (t.type === b.Vector)
        this._checkPixelAndPaint(t.position, t.color);
      else if (t.type === b.Array) {
        const a = { positions: [], colors: [], type: b.Array };
        (s = t.positions) === null || s === void 0 || s.forEach((c) => {
          var u, w;
          X(c, { x: 0, y: 0 }, { x: this._gridSize - 1, y: this._gridSize - 1 }) && ((u = a.positions) === null || u === void 0 || u.push({ x: c.x, y: c.y }), (w = a.colors) === null || w === void 0 || w.push(this.pixels[c.x][c.y]));
        }), this._checkLastActionAndWrite(a), (r = t.positions) === null || r === void 0 || r.forEach((c, u) => {
          if (c !== null) {
            const w = t.color ? t.color : t.colors[u];
            this._checkPixelAndPaint(c, w);
          }
        });
      }
      this.saveLocalStorage();
    }
  }
  _checkPixelAndPaint(t, s) {
    X(t, { x: 0, y: 0 }, { x: this._gridSize - 1, y: this._gridSize - 1 }) && (this._drawApp.ctx.fillStyle = s, this.pixels[z(t.x, 0, this._gridSize - 1)][z(t.y, 0, this._gridSize - 1)] = this._drawApp.ctx.fillStyle.substr(1));
  }
  canUndo() {
    return this.lastActionIndex >= 0;
  }
  undo() {
    var t;
    if (this.canUndo()) {
      const s = this.lastAction[this.lastActionIndex];
      this.lastActionIndex--;
      const r = [], a = [];
      (t = s.positions) === null || t === void 0 || t.forEach((c, u) => {
        r.push(c), a.push(this.pixels[c.x][c.y]), this.pixels[c.x][c.y] = s.colors[u];
      }), this.lastAction[this.lastActionIndex + 1] = { positions: r, colors: a, type: b.Array }, this.saveLocalStorage();
    }
  }
  canRedo() {
    return this.lastActionIndex + 1 < this.lastAction.length;
  }
  redo() {
    var t;
    if (this.canRedo()) {
      this.lastActionIndex++;
      const s = this.lastAction[this.lastActionIndex], r = [], a = [];
      (t = s.positions) === null || t === void 0 || t.forEach((c, u) => {
        r.push(c), a.push(this.pixels[c.x][c.y]), this.pixels[c.x][c.y] = s.colors[u];
      }), this.lastAction[this.lastActionIndex] = { positions: r, colors: a, type: b.Array }, this.saveLocalStorage();
    }
  }
}
class Ti extends nt {
  constructor(t, s) {
    super(t, s), this.rainbow = !1, this.size = 1, this._pixelPoints = { positions: [], colors: [], type: b.Array };
  }
  onAction() {
    super.onAction(), this.canRun && (this.drawApp.mouse.button === d.LEFT ? this._dragging ? _i(this.drawApp.mouse.position, this.drawApp.mouse.lastPosition) && Ae(this.drawApp, this.drawApp.mouse.position, this.drawApp.mouse.lastPosition, (t) => this._pencilTool(t)) : (this._dragging = !0, this._pencilTool(ot(this.drawApp.mouse.position, this.drawApp))) : (this._pixelPoints.positions.length > 0 && (this._pixelPoints = Ei.FlushDuplicatedData(this._pixelPoints, this.drawApp.settings.gridSize), this.drawApp.data.writeData(this._pixelPoints), this._pixelPoints = { positions: [], colors: [], type: b.Array }), this._dragging = !1));
  }
  _pencilTool(t) {
    var s, r;
    this.rainbowColor++, this.rainbowColor > this.drawApp.settings.numColors - 1 && (this.rainbowColor = 0);
    let a;
    this.rainbow ? a = Mt(Nt({ H: this.rainbowColor * 360 / this.drawApp.settings.numColors, S: 100, V: 100 })) : a = this.drawApp.toolSelector.colorSelected, this.drawApp.ctx.fillStyle = a, a = this.drawApp.ctx.fillStyle, this.size === 1 ? (this.drawApp.paintCanvas(st(t, this.drawApp), this.drawApp.settings.showGrid, a), (s = this._pixelPoints.positions) === null || s === void 0 || s.push(t), (r = this._pixelPoints.colors) === null || r === void 0 || r.push(a)) : [
      { x: t.x - 1, y: t.y },
      { x: t.x + 1, y: t.y },
      { x: t.x, y: t.y - 1 },
      { x: t.x, y: t.y + 1 },
      { x: t.x, y: t.y }
    ].forEach((u) => {
      var w, v;
      (w = this._pixelPoints.positions) === null || w === void 0 || w.push(u), (v = this._pixelPoints.colors) === null || v === void 0 || v.push(a), this.drawApp.paintCanvas(st(u, this.drawApp), this.drawApp.settings.showGrid, a);
    }), this.drawApp.gui.reloadRelativeGUI();
  }
}
class Ee extends nt {
  onAction() {
    var t;
    if (super.onAction(), !!this.canRun)
      if (this.drawApp.mouse.button === d.NONE) {
        if (this._dragging) {
          this._dragging = !1, this.drawApp.ctx.fillStyle = this.drawApp.toolSelector.colorSelected;
          const s = { positions: [], color: this.drawApp.ctx.fillStyle, type: b.Array }, r = this.drawApp.mouse.dataPosition;
          (t = s.positions) === null || t === void 0 || t.push(r), vt(r, this.drawApp, s.positions, this.drawApp.data.pixels[r.x][r.y]), this.drawApp.data.writeData(s), this.drawApp.reloadCanvas();
        }
      } else
        this.drawApp.mouse.button === d.LEFT && (this._dragging ? this._dragging : this._dragging = !0);
  }
}
class Te extends nt {
  onAction() {
    if (super.onAction(), !!this.canRun)
      if (this.drawApp.mouse.button === d.NONE) {
        if (this._dragging) {
          this._dragging = !1, this.drawApp.toolSelector.colorSelected = "#" + this.drawApp.data.pixels[this.drawApp.mouse.dataPosition.x][this.drawApp.mouse.dataPosition.y];
          const t = this.drawApp.toolSelector.tools.find((s) => s.toolType === g.PENCIL);
          t.rainbow = !1;
        }
      } else
        this.drawApp.mouse.button === d.LEFT && (this._dragging ? this._dragging : this._dragging = !0);
  }
}
class Se extends nt {
  onAction() {
    if (super.onAction(), !!this.canRun) {
      if (this.drawApp.mouse.button === d.NONE) {
        this._dragging = !1, this.drawApp.toolSelector.restoreTool();
        return;
      }
      if (!this._dragging)
        this._dragging = !0, this.firstPoint = this.drawApp.mouse.realPosition;
      else if (this._dragging && this.drawApp.zoom.level !== this.drawApp.zoom.minLevel) {
        const t = {
          x: this.drawApp.zoom.offset.x - (this.firstPoint.x - this.drawApp.mouse.realPosition.x),
          y: this.drawApp.zoom.offset.y - (this.firstPoint.y - this.drawApp.mouse.realPosition.y)
        };
        t.x <= 0 && this.drawApp.canvas.width < t.x + this.drawApp.canvas.width * this.drawApp.zoom.level && (this.drawApp.zoom.offset.x = t.x), t.y <= 0 && this.drawApp.canvas.height < t.y + this.drawApp.canvas.height * this.drawApp.zoom.level && (this.drawApp.zoom.offset.y = t.y), this.firstPoint = this.drawApp.mouse.realPosition, this.drawApp.reloadCanvas();
      }
    }
  }
}
class Pe extends nt {
  constructor(t, s, r) {
    super(t, s), this.level = r.level, this.maxLevel = r.maxLevel, this.minLevel = r.minLevel, this.offset = { x: 0, y: 0 }, this.position = { x: 0, y: 0 }, this.stepsMouseWheel = r.stepsMouseWheel;
  }
  zoomIn() {
    this._zoomScaled(this.drawApp.mouse.scrollStep);
  }
  zoomOut() {
    this._zoomScaled(-this.drawApp.mouse.scrollStep);
  }
  _zoomScaled(t) {
    const s = {
      x: this.drawApp.mouse.relativeRealPosition.x / this.drawApp.canvas.width,
      y: this.drawApp.mouse.relativeRealPosition.y / this.drawApp.canvas.height
    };
    this.level = z(Math.round((this.level + t) * 10) / 10, this.minLevel, this.maxLevel), this.offset = {
      x: -z(this.drawApp.canvas.width * this.level * s.x - this.drawApp.mouse.realPosition.x, 0, this.drawApp.canvas.width * this.level - this.drawApp.canvas.width),
      y: -z(this.drawApp.canvas.height * this.level * s.y - this.drawApp.mouse.realPosition.y, 0, this.drawApp.canvas.height * this.level - this.drawApp.canvas.height)
    }, this.drawApp.reloadCanvas();
  }
  onAction() {
    super.onAction(), this.canRun && this.drawApp.mouse.button === d.NONE && (this.drawApp.mouse.scroll === V.UP ? this.zoomIn() : this.drawApp.mouse.scroll === V.DOWN && this.drawApp.zoom.level !== this.drawApp.zoom.minLevel && this.zoomOut());
  }
}
class Ie extends nt {
  constructor(t, s) {
    super(t, s), this._circlePixels = [], this.fill = !1;
  }
  onAction() {
    var t;
    super.onAction(), this.canRun && (this.drawApp.mouse.button === d.NONE ? this._dragging && (this._circlePixels.length > 1 && (this.drawApp.ctx.fillStyle = this.drawApp.toolSelector.colorSelected, this.drawApp.data.writeData({
      positions: this._circlePixels,
      color: this.drawApp.ctx.fillStyle,
      type: b.Array
    })), this.drawApp.reloadCanvas(), this._dragging = !1) : this.drawApp.mouse.button === d.LEFT && (this._dragging ? this._dragging && (this.drawApp.mouse.position.x !== ((t = this.drawApp.mouse.lastPosition) === null || t === void 0 ? void 0 : t.x) || this.drawApp.mouse.position.y !== this.drawApp.mouse.lastPosition.y) && (this.drawApp.reloadCanvas(), this._circle()) : (this.centerCircle = this.drawApp.mouse.dataPosition, this._draw(this.centerCircle), this._dragging = !0)));
  }
  _circle() {
    if (!this._dragging)
      return;
    const t = Math.max(Math.abs(this.centerCircle.x - this.drawApp.mouse.dataPosition.x), Math.abs(this.centerCircle.y - this.drawApp.mouse.dataPosition.y));
    if (t < 1)
      this._draw(this.centerCircle);
    else {
      let s = (5 - t * 4) / 4, r = t;
      this._circlePixels = [];
      for (let a = 0; a <= r; a++)
        _({ x: this.centerCircle.x + a, y: this.centerCircle.y + r }, this._circlePixels), _({ x: this.centerCircle.x + a, y: this.centerCircle.y - r }, this._circlePixels), _({ x: this.centerCircle.x - a, y: this.centerCircle.y + r }, this._circlePixels), _({ x: this.centerCircle.x - a, y: this.centerCircle.y - r }, this._circlePixels), _({ x: this.centerCircle.x + r, y: this.centerCircle.y + a }, this._circlePixels), _({ x: this.centerCircle.x + r, y: this.centerCircle.y - a }, this._circlePixels), _({ x: this.centerCircle.x - r, y: this.centerCircle.y + a }, this._circlePixels), _({ x: this.centerCircle.x - r, y: this.centerCircle.y - a }, this._circlePixels), s < 0 ? s += 2 * a + 1 : (s += 2 * (a - r) + 1, r--);
      this.fill && (_(this.centerCircle, this._circlePixels), ft(this.centerCircle, this.drawApp, this._circlePixels)), this._circlePixels.forEach((a) => this._draw(a));
    }
  }
  _draw(t) {
    this.drawApp.paintCanvas(st(t, this.drawApp), this.drawApp.settings.showGrid), this.drawApp.gui.reloadRelativeGUI();
  }
}
var g;
(function(n) {
  n[n.NONE = -1] = "NONE", n[n.PENCIL = 0] = "PENCIL", n[n.BUCKET = 1] = "BUCKET", n[n.COLOUR_PICKER = 2] = "COLOUR_PICKER", n[n.MOVE = 3] = "MOVE", n[n.ZOOM = 4] = "ZOOM", n[n.CIRCLE = 5] = "CIRCLE", n[n.GRID = 6] = "GRID", n[n.CLEAR = 7] = "CLEAR";
})(g || (g = {}));
class Ce {
  constructor(t) {
    this.startTool = g.PENCIL, this.selected = -1, this.previousSelected = -1, this.colorSelected = "000000", this.tools = [], this.tools.push(new Ti(t, g.PENCIL)), this.tools.push(new Ee(t, g.BUCKET)), this.tools.push(new Te(t, g.COLOUR_PICKER)), this.tools.push(new Se(t, g.MOVE)), this.tools.push(new Pe(t, g.ZOOM, {
      level: 1,
      minLevel: 1,
      maxLevel: 8,
      stepsMouseWheel: 0.1
    })), this.tools.push(new Ie(t, g.CIRCLE));
  }
  get tool() {
    return this.selected >= 0 ? this.tools[this.selected] : void 0;
  }
  set selectTool(t) {
    this.selected !== t.valueOf() && (this.previousSelected = this.selected, this.selected = t.valueOf());
  }
  restoreTool() {
    this.previousSelected !== -1 && (this.selected = this.previousSelected, this.previousSelected = -1);
  }
}
var d;
(function(n) {
  n[n.NONE = -1] = "NONE", n[n.LEFT = 0] = "LEFT", n[n.MIDDLE = 1] = "MIDDLE", n[n.RIGHT = 2] = "RIGHT";
})(d || (d = {}));
var V;
(function(n) {
  n[n.NONE = -1] = "NONE", n[n.UP = 0] = "UP", n[n.DOWN = 1] = "DOWN";
})(V || (V = {}));
class ze {
  constructor(t) {
    this._drawApp = t, this.button = d.NONE, this.scroll = V.NONE, this.moving = !1, this.realPosition = { x: 0, y: 0 }, this.lastPosition = void 0, this.scrollStep = 0.1;
  }
  get position() {
    return st(this.dataPosition, this._drawApp);
  }
  get relativeRealPosition() {
    const t = { x: this.realPosition.x, y: this.realPosition.y };
    return t.x -= this._drawApp.zoom.offset.x, t.x /= this._drawApp.zoom.level, t.y -= this._drawApp.zoom.offset.y, t.y /= this._drawApp.zoom.level, t;
  }
  get dataPosition() {
    return ot(this.relativeRealPosition, this._drawApp);
  }
  mouseDownLeft() {
    this.button = d.LEFT;
  }
  mouseDownRight() {
    this.button = d.RIGHT, this._drawApp.gui.toolbox.toggle();
  }
  mouseUpLeft() {
    this.button = d.NONE;
  }
  mouseUpRight() {
    this.button = d.NONE;
  }
  mouseWheelButtonDown() {
    this.button = d.MIDDLE, this._drawApp.toolSelector.selectTool = g.MOVE;
  }
  mouseWheelButtonUp() {
    this.button = d.NONE;
  }
  mouseWheelDown() {
    this.button === d.NONE && (this.scroll = V.DOWN, this._drawApp.toolSelector.selectTool = g.ZOOM);
  }
  mouseWheelUp() {
    this.button === d.NONE && (this.scroll = V.UP, this._drawApp.toolSelector.selectTool = g.ZOOM);
  }
  mouseMove(t) {
    this.realPosition = t;
  }
  mouseLeave() {
    this.button = d.NONE;
  }
}
class Oe {
  constructor(t) {
    this._drawApp = t, window.addEventListener("resize", () => this.onResizeWindow(this._drawApp)), this._drawApp.canvas.addEventListener("mousedown", (s) => this.onMouseDown(s)), this._drawApp.canvas.addEventListener("mouseup", (s) => this.onMouseUp(s)), this._drawApp.canvas.addEventListener("wheel", (s) => this.onMouseWheel(s)), this._drawApp.canvas.addEventListener("mousemove", (s) => this.onMouseMove(s)), this._drawApp.canvas.addEventListener("mouseenter", (s) => this.onMouseEnter(s)), this._drawApp.canvas.addEventListener("contextmenu", (s) => this.onContextMenu(s)), this._drawApp.canvas.addEventListener("touchstart", (s) => s.cancelable ? s.preventDefault() : null), this._drawApp.canvas.addEventListener("touchmove", (s) => s.cancelable ? s.preventDefault() : null), this._drawApp.canvas.addEventListener("touchend", (s) => this.onTouchEnd(s)), this._drawApp.touch.mc.on("press", (s) => this.onTouchPress(s)), this._drawApp.touch.mc.on("move", (s) => this.onTouchMove(s)), this._drawApp.touch.mc.on("twofingerstap", (s) => this.onTwoFingersTap(s)), this._drawApp.touch.mc.on("twofingerspanmove twofingerspinchmove", (s) => this.onTwoFingersMove(s));
  }
  onTouchEnd(t) {
    t.cancelable && t.preventDefault(), this._drawApp.touch.touchEnd((s) => this.onButtonUp({
      button: this._drawApp.mouse.button,
      position: s
    }));
  }
  onTouchPress(t) {
    this._drawApp.touch.touchPress(t, (s) => this.onButtonDown({
      button: d.LEFT,
      position: s
    }));
  }
  onTouchMove(t) {
    this._drawApp.touch.touchMove(t, (s) => this.onMove({
      button: d.LEFT,
      position: s
    }));
  }
  onTwoFingersMove(t) {
    this._drawApp.touch.touchTwoFingers(t, (s) => this.onButtonDown({ button: d.MIDDLE, position: s }), (s, r) => this.onZoom({
      button: d.MIDDLE,
      position: s,
      scroll: r ? -1 : 1
    }));
  }
  onTwoFingersTap(t) {
    this._drawApp.touch.touchTwoFingersTap(t, () => this.onButtonDown({
      button: d.RIGHT,
      position: Xt
    }));
  }
  onMouseDown(t) {
    t.preventDefault(), this.onButtonDown({ button: t.button, position: { x: t.offsetX, y: t.offsetY } });
  }
  onButtonDown(t) {
    const s = this._drawApp.mouse;
    this._setupMousePosition(t.position), t.button === d.LEFT ? s.mouseDownLeft() : t.button === d.RIGHT ? s.mouseDownRight() : t.button === d.MIDDLE && s.mouseWheelButtonDown(), s.button !== d.NONE && this._dispatchEvent();
  }
  onMouseUp(t) {
    t.preventDefault(), this.onButtonUp({ button: t.button, position: { x: t.offsetX, y: t.offsetY } });
  }
  onButtonUp(t) {
    const s = this._drawApp.mouse;
    this._setupMousePosition(t.position), t.button === d.LEFT ? s.mouseUpLeft() : t.button === d.RIGHT ? (s.mouseUpRight(), this._drawApp.toolSelector.tool !== void 0 && this._drawApp.canvas.dispatchEvent(this._drawApp.toolSelector.tool.event)) : t.button === d.MIDDLE && s.mouseWheelButtonUp(), this._dispatchEvent();
  }
  onMouseWheel(t) {
    t.preventDefault(), this._drawApp.mouse.scrollStep = this._drawApp.zoom.stepsMouseWheel, this.onZoom({ scroll: t.deltaY, position: { x: t.offsetX, y: t.offsetY } });
  }
  onZoom(t) {
    const s = this._drawApp.mouse;
    this._setupMousePosition(t.position), t.scroll > 0 ? s.mouseWheelDown() : t.scroll < 0 && s.mouseWheelUp(), s.scroll !== V.NONE && (this._dispatchEvent(), s.scroll = V.NONE, this._drawApp.toolSelector.restoreTool());
  }
  onMouseMove(t) {
    t.preventDefault(), this.onMove({ button: t.button, position: { x: t.offsetX, y: t.offsetY } });
  }
  onMove(t) {
    const s = this._drawApp.mouse;
    s.moving = !0, this._setupMousePosition(t.position), s.button !== d.NONE ? this._dispatchEvent() : this._drawApp.gui.mouseCheck(), s.moving = !1;
  }
  onMouseEnter(t) {
    const s = this._drawApp.mouse;
    t.buttons === d.LEFT && (s.mouseLeave(), this._dispatchEvent()), s.button !== d.NONE && this._setupMousePosition({ x: t.offsetX, y: t.offsetY });
  }
  onContextMenu(t) {
    t.preventDefault();
  }
  onResizeWindow(t) {
    t.resizeWindow();
  }
  _setupMousePosition(t) {
    const s = this._drawApp.mouse;
    t === void 0 && (t = Xt), s.lastPosition === null ? (s.mouseMove({ x: t.x, y: t.y }), s.lastPosition = { x: s.position.x, y: s.position.y }) : (s.lastPosition = { x: s.position.x, y: s.position.y }, s.mouseMove({ x: t.x, y: t.y }));
  }
  _dispatchEvent() {
    this._drawApp.toolSelector.tool !== void 0 && (this._drawApp.gui.mouseCheck(), this._drawApp.canvas.dispatchEvent(this._drawApp.toolSelector.tool.event));
  }
}
class m {
  constructor(t, s) {
    this.drawApp = t, this.name = s, this.enabled = !1, this.clickIn = !0, this.child = [], this.active = !1, this.loaded = !1, this.selectable = !0, this.hoverable = !0;
  }
  set size(t) {
    this._size = t;
  }
  get size() {
    return this._size;
  }
  set position(t) {
    this._position = t;
  }
  get position() {
    return this._position;
  }
  hide() {
    this.enabled = !1;
  }
  show() {
    this.enabled = !0;
  }
  hover() {
    this.drawApp.ctx.filter = "hue-rotate(180deg)", this.ui(), this.drawApp.ctx.filter = "none";
  }
  static AddElement(t, s, r, a, c, u) {
    c !== void 0 ? r._position = c : r._position = { x: 0, y: 0 }, a !== null ? (u !== void 0 ? (a.width = u.x, a.height = u.y) : (a.width = 68, a.height = 68), r.size = { x: a.width, y: a.height }, r.img = a) : r.size = u, t.push(r);
  }
  setActive(t = this.img, s = 270) {
    this.img !== void 0 && (this.active = !0, this.drawApp.ctx.filter = `hue-rotate(${s}deg)`, this.drawApp.ctx.drawImage(t, this._position.x, this._position.y, this.size.x, this.size.y), this.drawApp.ctx.filter = "none");
  }
}
class Ne extends m {
  windowResize() {
    this.position = {
      x: this.parent.position.x + this.parent.size.x - this.size.x,
      y: this.parent.position.y + this.parent.size.y - this.size.y
    };
  }
  mouseUp() {
    const t = {
      x: z(this.drawApp.mouse.realPosition.x, 0, this.position.x + this.size.x - 1),
      y: z(this.drawApp.mouse.realPosition.y, 0, this.position.y + this.size.y - 1)
    };
    this.drawApp.toolSelector.colorSelected = _e(this.drawApp.ctx.getImageData(t.x, t.y, 1, 1).data);
    const s = this.drawApp.toolSelector.tools[g.PENCIL];
    s.rainbow = !1;
  }
  ui() {
    const t = this.parent;
    if (t.change) {
      t.change = !1;
      const s = 10;
      let r = 0, a = 0;
      const c = { x: this.size.x / 11, y: this.size.y / 11 };
      for (let u = 0; u <= this.size.y; u += this.pixelSize.y * s) {
        r = 0;
        for (let w = 0; w <= this.size.x; w += this.pixelSize.x * s)
          this.drawApp.ctx.fillStyle = Mt(Nt({
            H: t.hue,
            S: r,
            V: 100 - a
          })), this.drawApp.ctx.fillRect(Math.fround(this.position.x + r / s * c.x), Math.fround(this.position.y + a / s * c.y), c.x, c.y), r += s;
        a += s;
      }
      this._imageData = this.drawApp.ctx.getImageData(this.position.x, this.position.y, this.size.x, this.size.y);
    } else
      this.drawApp.ctx.putImageData(this._imageData, this.position.x, this.position.y);
  }
}
class Me extends m {
  _sizeHueSelector(t = 1) {
    return this.hueSelectorSize.x / this.drawApp.settings.numColors * t;
  }
  _hue(t) {
    return Math.trunc(360 / this.drawApp.settings.numColors * t);
  }
  init() {
    this.colorPickedSize = 50, this.hueSelectorSize = {
      x: this.size.x - this.colorPickedSize,
      y: this.size.y
    }, this.hueSelectorPosition = {
      x: this.position.x + this.size.x - this.hueSelectorSize.x,
      y: this.position.y
    };
    for (let t = 0; t < this.drawApp.settings.numColors; t++)
      this.drawApp.ctx.fillStyle = Mt(Nt({ H: this._hue(t), S: 100, V: 100 })), this.drawApp.ctx.fillRect(this.hueSelectorPosition.x + this._sizeHueSelector(t), this.hueSelectorPosition.y, this._sizeHueSelector(), this.hueSelectorSize.y);
    this.parent.hue = this._hue(ye(0, 19)), this.drawApp.toolSelector.colorSelected = Mt(Nt({
      H: this.parent.hue,
      S: 100,
      V: 100
    })), this._imageData = this.drawApp.ctx.getImageData(this.hueSelectorPosition.x, this.hueSelectorPosition.y, this.hueSelectorSize.x, this.hueSelectorSize.y), this.drawApp.reloadCanvas();
  }
  windowResize() {
    this.position = {
      x: this.parent.position.x,
      y: this.parent.position.y
    }, this.hueSelectorPosition = {
      x: this.position.x + this.size.x - this.hueSelectorSize.x,
      y: this.position.y
    };
  }
  mouseUp() {
    const t = this.drawApp.mouse.realPosition;
    X(t, this.position, {
      x: this.position.x + this.colorPickedSize,
      y: this.position.y + this.size.y
    }) || this.changeHue();
  }
  changeHue() {
    const t = this.drawApp.mouse.realPosition, s = this._hue(Math.floor(z(t.x - this.hueSelectorPosition.x, 0, this.hueSelectorSize.x) / this._sizeHueSelector())), r = this.parent;
    r.hue = s, r.change = !0;
  }
  ui() {
    this.drawApp.ctx.fillStyle = this.drawApp.toolSelector.colorSelected, this.drawApp.ctx.fillRect(this.position.x, this.position.y, this.colorPickedSize, this.hueSelectorSize.y), this.drawApp.ctx.putImageData(this._imageData, this.hueSelectorPosition.x, this.hueSelectorPosition.y);
  }
}
class Si extends m {
  windowResize() {
    this.position = {
      x: this.drawApp.canvas.width - this.size.x - 5,
      y: this.drawApp.canvas.height - this.size.y - 5
    }, this.child.forEach((t) => {
      t.windowResize && t.windowResize();
    });
  }
  init() {
    const t = new Ne(this.drawApp, "ColorSelectorMain");
    t.parent = this, t.hoverable = !1, t.selectable = !1, t.size = {
      x: this.size.x,
      y: 200
    }, t.position = {
      x: this.position.x + this.size.x - t.size.x,
      y: this.position.y + this.size.y - t.size.y
    }, t.pixelSize = { x: t.size.x / 100, y: t.size.y / 100 }, this.child.push(t);
    const s = new Me(this.drawApp, "ColorSelectorSecondary");
    s.parent = this, s.hoverable = !1, s.selectable = !1, s.size = {
      x: this.size.x,
      y: this.size.y - t.size.y
    }, s.position = {
      x: this.position.x,
      y: this.position.y
    }, s.init(), this.child.push(s);
  }
  mouseUp() {
    const t = {
      x: z(this.drawApp.mouse.realPosition.x, 0, this.position.x + this.size.x - 1),
      y: z(this.drawApp.mouse.realPosition.y, 0, this.position.y + this.size.y - 1)
    };
    this.child.forEach((s) => {
      X(t, s.position, {
        x: s.position.x + s.size.x,
        y: s.position.y + s.size.y
      }) && (s.mouseUp(), this.drawApp.reloadCanvas(), this.drawApp.gui.reloadGUI());
    });
  }
  ui() {
    this.child.forEach((t) => t.ui());
  }
}
class be extends m {
  constructor() {
    super(...arguments), this._rainbowSelectorTime = 1e3;
  }
  init() {
    this._pencilTool = this.drawApp.toolSelector.tools.find((t) => t.toolType === g.PENCIL);
  }
  mouseDown() {
    this._startTime = (/* @__PURE__ */ new Date()).getTime();
  }
  mouseUp() {
    this.drawApp.toolSelector.tool instanceof Ti ? (/* @__PURE__ */ new Date()).getTime() - this._startTime > this._rainbowSelectorTime ? (this._pencilTool.rainbowColor = this.parent.child.find((t) => t instanceof Si).hue / (360 / this.drawApp.settings.numColors) - 1, this._pencilTool.rainbow = !this._pencilTool.rainbow) : this._pencilTool.size = this._pencilTool.size === 1 ? 2 : 1 : this.drawApp.toolSelector.selectTool = g.PENCIL;
  }
  ui() {
    let t;
    this._pencilTool.size === 1 ? t = this.img : t = this.imgAlternative, this.active ? this._pencilTool.rainbow ? this.setActive(t, 120) : this.setActive(t) : this.drawApp.ctx.drawImage(t, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
class Le extends m {
  mouseUp() {
    this.drawApp.toolSelector.selectTool = g.CIRCLE;
    const t = this.drawApp.toolSelector.tools[g.CIRCLE];
    this.active && (t.fill = !t.fill);
  }
  ui() {
    const s = this.drawApp.toolSelector.tools[g.CIRCLE].fill ? this.imgFilled : this.img;
    this.active ? this.setActive(s) : this.drawApp.ctx.drawImage(s, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
class De extends m {
  mouseUp() {
    this.drawApp.toggleGrid();
  }
  ui() {
    const t = this.drawApp.settings.showGrid ? this.imgFilled : this.img;
    this.drawApp.ctx.drawImage(t, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
class Re extends m {
  windowResize() {
    this.position = {
      x: this.drawApp.canvas.width - this.size.x,
      y: 0
    };
  }
  ui() {
    this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
  mouseUp() {
    this.drawApp.data.clearData(), this.drawApp.reloadCanvas(), this.drawApp.gui.reloadGUI();
  }
}
class Ue extends m {
  mouseUp() {
    this.drawApp.toolSelector.selectTool = g.BUCKET;
  }
  ui() {
    this.active ? this.setActive() : this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
class ke extends m {
  mouseUp() {
    this.drawApp.toolSelector.selectTool = g.COLOUR_PICKER;
  }
  ui() {
    this.active ? this.setActive() : this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
class Fe extends m {
  mouseUp() {
    this.drawApp.data.undo(), this.drawApp.reloadCanvas(), this.drawApp.gui.reloadGUI();
  }
  hover() {
    this.drawApp.data.canUndo() && super.hover();
  }
  ui() {
    this.drawApp.data.canUndo() ? this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y) : (this.drawApp.ctx.filter = "grayscale(100%) hue-rotate(180deg)", this.drawApp.ctx.globalAlpha = 0.5, this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y), this.drawApp.ctx.globalAlpha = 1, this.drawApp.ctx.filter = "none");
  }
}
class He extends m {
  mouseUp() {
    this.drawApp.data.redo(), this.drawApp.reloadCanvas(), this.drawApp.gui.reloadGUI();
  }
  hover() {
    this.drawApp.data.canRedo() && super.hover();
  }
  ui() {
    this.drawApp.data.canRedo() ? this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y) : (this.drawApp.ctx.filter = "grayscale(100%) hue-rotate(180deg)", this.drawApp.ctx.globalAlpha = 0.5, this.drawApp.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y), this.drawApp.ctx.globalAlpha = 1, this.drawApp.ctx.filter = "none");
  }
}
const Ge = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M19 9l-2 9a2 2.5 0 0 1 -2 2h-6a2 2.5 0 0 1 -2 -2l-2 -9Z" /><path d="M7 9a5 5 0 0 1 10 0" /></svg>', Be = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /></svg>', We = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" fill="#03A9F4" /></svg>', Ve = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>', Ye = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="11" y1="7" x2="17" y2="13" /><path d="M5 19v-4l9.7 -9.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-9.7 9.7h-4" /></svg>', Xe = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>', Ze = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><rect x="4" y="4" width="16" height="16" rx="2" /></svg>', qe = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>', je = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M3 21v-4a4 4 0 1 1 4 4h-4" fill="#03A9F4"/><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>', Ke = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1" /></svg>', Je = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /></svg>';
var Qe = globalThis && globalThis.__awaiter || function(n, t, s, r) {
  function a(c) {
    return c instanceof s ? c : new s(function(u) {
      u(c);
    });
  }
  return new (s || (s = Promise))(function(c, u) {
    function w(T) {
      try {
        E(r.next(T));
      } catch (Z) {
        u(Z);
      }
    }
    function v(T) {
      try {
        E(r.throw(T));
      } catch (Z) {
        u(Z);
      }
    }
    function E(T) {
      T.done ? c(T.value) : a(T.value).then(w, v);
    }
    E((r = r.apply(n, t || [])).next());
  });
};
class $e extends m {
  windowResize() {
    this.size = { x: this.drawApp.canvas.width, y: this.drawApp.canvas.height }, this.child.forEach((t) => {
      t.windowResize && t.windowResize();
    });
  }
  init(t) {
    this.drawApp.setSizeCanvas(), this.size = { x: this.drawApp.canvas.width, y: this.drawApp.canvas.height }, this.position = {
      x: 0,
      y: 0
    }, this.loadImagesAndButtons().then(() => {
      t.push(this), setTimeout(() => {
        this.loaded = !0;
      }, 100);
    });
  }
  loadImagesAndButtons() {
    return Qe(this, void 0, void 0, function* () {
      const s = new be(this.drawApp, g.PENCIL.toString());
      s.parent = this, s.init(), m.AddElement(this.child, this.drawApp, s, D(qe), {
        x: this.position.x,
        y: this.position.y
      }), s.imgAlternative = D(je);
      const r = new Le(this.drawApp, g.CIRCLE.toString());
      m.AddElement(this.child, this.drawApp, r, D(Be), {
        x: this.position.x,
        y: this.position.y + 64 * this.child.length
      }), r.imgFilled = D(We), m.AddElement(this.child, this.drawApp, new Ue(this.drawApp, g.BUCKET.toString()), D(Ge), {
        x: this.position.x,
        y: this.position.y + 64 * this.child.length
      }), m.AddElement(this.child, this.drawApp, new ke(this.drawApp, g.COLOUR_PICKER.toString()), D(Ye), {
        x: this.position.x,
        y: this.position.y + 64 * this.child.length
      });
      const a = new De(this.drawApp, g.GRID.toString());
      a.selectable = !1, m.AddElement(this.child, this.drawApp, a, D(Xe), {
        x: this.position.x,
        y: this.position.y + 64 * this.child.length
      }), a.imgFilled = D(Ze);
      const c = new Re(this.drawApp, g.CLEAR.toString());
      c.selectable = !1, m.AddElement(this.child, this.drawApp, c, D(Ve), {
        x: this.drawApp.canvas.width - 64,
        y: 0
      });
      const u = new Fe(this.drawApp, "undoButton");
      u.selectable = !1, m.AddElement(this.child, this.drawApp, u, D(Je), {
        x: this.position.x + 64,
        y: this.position.y
      });
      const w = new He(this.drawApp, "redoButton");
      w.selectable = !1, m.AddElement(this.child, this.drawApp, w, D(Ke), {
        x: this.position.x + 64 * 2,
        y: this.position.y
      });
      const v = new Si(this.drawApp, "Color Selector");
      v.selectable = !1, v.change = !0, v.hoverable = !1, v.size = {
        x: 280,
        y: 250
      }, v.position = {
        x: this.drawApp.canvas.width - v.size.x - 5,
        y: this.drawApp.canvas.height - v.size.y - 5
      }, v.init(), this.child.push(v), this.drawApp.toolSelector.selectTool = this.drawApp.toolSelector.startTool, this.child.find((E) => {
        var T;
        return E.name === ((T = this.drawApp.toolSelector.tool) === null || T === void 0 ? void 0 : T.name);
      }).active = !0;
    });
  }
  toggle() {
    this.loaded && (this.enabled ? this.hide() : this.show());
  }
  show() {
    this.enabled = !0, this.child.forEach((t) => t.show()), this.ui();
  }
  hide() {
    this.enabled = !1, this.drawApp.gui.reloadGUI(), this.drawApp.reloadCanvas();
  }
  ui() {
    this.drawApp.ctx.fillStyle = "gray", this.drawApp.ctx.globalAlpha = 0.6, this.drawApp.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y), this.drawApp.ctx.globalAlpha = 1, this.child.forEach((t) => t.ui());
  }
  mouseUp() {
    this.child.forEach((t) => {
      if ($.CheckInsideGUIElement(this.drawApp, t)) {
        if (!t.selectable) {
          t.mouseUp && t.mouseUp();
          return;
        }
        this.child.filter((s) => s.name !== t.name).forEach((s) => {
          s.active = !1, s.ui();
        }), t.mouseUp(), t.setActive(), t.ui(), this.drawApp.reloadCanvas(), this.drawApp.gui.reloadGUI();
      }
    });
  }
  mouseDown() {
    this.child.forEach((t) => {
      $.CheckInsideGUIElement(this.drawApp, t) && t.mouseDown && t.mouseDown();
    });
  }
}
function ts(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Pi = { exports: {} };
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(n) {
  (function(t, s, r, a) {
    var c = ["", "webkit", "Moz", "MS", "ms", "o"], u = s.createElement("div"), w = "function", v = Math.round, E = Math.abs, T = Date.now;
    function Z(i, e, o) {
      return setTimeout(bt(i, o), e);
    }
    function tt(i, e, o) {
      return Array.isArray(i) ? (H(i, o[e], o), !0) : !1;
    }
    function H(i, e, o) {
      var h;
      if (i)
        if (i.forEach)
          i.forEach(e, o);
        else if (i.length !== a)
          for (h = 0; h < i.length; )
            e.call(o, i[h], h, i), h++;
        else
          for (h in i)
            i.hasOwnProperty(h) && e.call(o, i[h], h, i);
    }
    function Zt(i, e, o) {
      var h = "DEPRECATED METHOD: " + e + `
` + o + ` AT 
`;
      return function() {
        var l = new Error("get-stack-trace"), p = l && l.stack ? l.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = t.console && (t.console.warn || t.console.log);
        return f && f.call(t.console, h, p), i.apply(this, arguments);
      };
    }
    var R;
    typeof Object.assign != "function" ? R = function(e) {
      if (e === a || e === null)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var o = Object(e), h = 1; h < arguments.length; h++) {
        var l = arguments[h];
        if (l !== a && l !== null)
          for (var p in l)
            l.hasOwnProperty(p) && (o[p] = l[p]);
      }
      return o;
    } : R = Object.assign;
    var qt = Zt(function(e, o, h) {
      for (var l = Object.keys(o), p = 0; p < l.length; )
        (!h || h && e[l[p]] === a) && (e[l[p]] = o[l[p]]), p++;
      return e;
    }, "extend", "Use `assign`."), Ii = Zt(function(e, o) {
      return qt(e, o, !0);
    }, "merge", "Use `assign`.");
    function O(i, e, o) {
      var h = e.prototype, l;
      l = i.prototype = Object.create(h), l.constructor = i, l._super = h, o && R(l, o);
    }
    function bt(i, e) {
      return function() {
        return i.apply(e, arguments);
      };
    }
    function Lt(i, e) {
      return typeof i == w ? i.apply(e && e[0] || a, e) : i;
    }
    function jt(i, e) {
      return i === a ? e : i;
    }
    function gt(i, e, o) {
      H(xt(e), function(h) {
        i.addEventListener(h, o, !1);
      });
    }
    function wt(i, e, o) {
      H(xt(e), function(h) {
        i.removeEventListener(h, o, !1);
      });
    }
    function Kt(i, e) {
      for (; i; ) {
        if (i == e)
          return !0;
        i = i.parentNode;
      }
      return !1;
    }
    function q(i, e) {
      return i.indexOf(e) > -1;
    }
    function xt(i) {
      return i.trim().split(/\s+/g);
    }
    function it(i, e, o) {
      if (i.indexOf && !o)
        return i.indexOf(e);
      for (var h = 0; h < i.length; ) {
        if (o && i[h][o] == e || !o && i[h] === e)
          return h;
        h++;
      }
      return -1;
    }
    function mt(i) {
      return Array.prototype.slice.call(i, 0);
    }
    function Jt(i, e, o) {
      for (var h = [], l = [], p = 0; p < i.length; ) {
        var f = e ? i[p][e] : i[p];
        it(l, f) < 0 && h.push(i[p]), l[p] = f, p++;
      }
      return o && (e ? h = h.sort(function(y, P) {
        return y[e] > P[e];
      }) : h = h.sort()), h;
    }
    function At(i, e) {
      for (var o, h, l = e[0].toUpperCase() + e.slice(1), p = 0; p < c.length; ) {
        if (o = c[p], h = o ? o + l : e, h in i)
          return h;
        p++;
      }
      return a;
    }
    var Ci = 1;
    function zi() {
      return Ci++;
    }
    function Qt(i) {
      var e = i.ownerDocument || i;
      return e.defaultView || e.parentWindow || t;
    }
    var Oi = /mobile|tablet|ip(ad|hone|od)|android/i, $t = "ontouchstart" in t, Ni = At(t, "PointerEvent") !== a, Mi = $t && Oi.test(navigator.userAgent), rt = "touch", bi = "pen", Dt = "mouse", Li = "kinect", Di = 25, S = 1, j = 2, x = 4, C = 8, yt = 1, ht = 2, at = 4, lt = 8, ct = 16, U = ht | at, K = lt | ct, ti = U | K, ii = ["x", "y"], _t = ["clientX", "clientY"];
    function N(i, e) {
      var o = this;
      this.manager = i, this.callback = e, this.element = i.element, this.target = i.options.inputTarget, this.domHandler = function(h) {
        Lt(i.options.enable, [i]) && o.handler(h);
      }, this.init();
    }
    N.prototype = {
      /**
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */
      handler: function() {
      },
      /**
       * bind the events
       */
      init: function() {
        this.evEl && gt(this.element, this.evEl, this.domHandler), this.evTarget && gt(this.target, this.evTarget, this.domHandler), this.evWin && gt(Qt(this.element), this.evWin, this.domHandler);
      },
      /**
       * unbind the events
       */
      destroy: function() {
        this.evEl && wt(this.element, this.evEl, this.domHandler), this.evTarget && wt(this.target, this.evTarget, this.domHandler), this.evWin && wt(Qt(this.element), this.evWin, this.domHandler);
      }
    };
    function Ri(i) {
      var e, o = i.options.inputClass;
      return o ? e = o : Ni ? e = Ut : Mi ? e = St : $t ? e = kt : e = Tt, new e(i, Ui);
    }
    function Ui(i, e, o) {
      var h = o.pointers.length, l = o.changedPointers.length, p = e & S && h - l === 0, f = e & (x | C) && h - l === 0;
      o.isFirst = !!p, o.isFinal = !!f, p && (i.session = {}), o.eventType = e, ki(i, o), i.emit("hammer.input", o), i.recognize(o), i.session.prevInput = o;
    }
    function ki(i, e) {
      var o = i.session, h = e.pointers, l = h.length;
      o.firstInput || (o.firstInput = ei(e)), l > 1 && !o.firstMultiple ? o.firstMultiple = ei(e) : l === 1 && (o.firstMultiple = !1);
      var p = o.firstInput, f = o.firstMultiple, A = f ? f.center : p.center, y = e.center = si(h);
      e.timeStamp = T(), e.deltaTime = e.timeStamp - p.timeStamp, e.angle = Rt(A, y), e.distance = Et(A, y), Fi(o, e), e.offsetDirection = ni(e.deltaX, e.deltaY);
      var P = oi(e.deltaTime, e.deltaX, e.deltaY);
      e.overallVelocityX = P.x, e.overallVelocityY = P.y, e.overallVelocity = E(P.x) > E(P.y) ? P.x : P.y, e.scale = f ? Bi(f.pointers, h) : 1, e.rotation = f ? Gi(f.pointers, h) : 0, e.maxPointers = o.prevInput ? e.pointers.length > o.prevInput.maxPointers ? e.pointers.length : o.prevInput.maxPointers : e.pointers.length, Hi(o, e);
      var F = i.element;
      Kt(e.srcEvent.target, F) && (F = e.srcEvent.target), e.target = F;
    }
    function Fi(i, e) {
      var o = e.center, h = i.offsetDelta || {}, l = i.prevDelta || {}, p = i.prevInput || {};
      (e.eventType === S || p.eventType === x) && (l = i.prevDelta = {
        x: p.deltaX || 0,
        y: p.deltaY || 0
      }, h = i.offsetDelta = {
        x: o.x,
        y: o.y
      }), e.deltaX = l.x + (o.x - h.x), e.deltaY = l.y + (o.y - h.y);
    }
    function Hi(i, e) {
      var o = i.lastInterval || e, h = e.timeStamp - o.timeStamp, l, p, f, A;
      if (e.eventType != C && (h > Di || o.velocity === a)) {
        var y = e.deltaX - o.deltaX, P = e.deltaY - o.deltaY, F = oi(h, y, P);
        p = F.x, f = F.y, l = E(F.x) > E(F.y) ? F.x : F.y, A = ni(y, P), i.lastInterval = e;
      } else
        l = o.velocity, p = o.velocityX, f = o.velocityY, A = o.direction;
      e.velocity = l, e.velocityX = p, e.velocityY = f, e.direction = A;
    }
    function ei(i) {
      for (var e = [], o = 0; o < i.pointers.length; )
        e[o] = {
          clientX: v(i.pointers[o].clientX),
          clientY: v(i.pointers[o].clientY)
        }, o++;
      return {
        timeStamp: T(),
        pointers: e,
        center: si(e),
        deltaX: i.deltaX,
        deltaY: i.deltaY
      };
    }
    function si(i) {
      var e = i.length;
      if (e === 1)
        return {
          x: v(i[0].clientX),
          y: v(i[0].clientY)
        };
      for (var o = 0, h = 0, l = 0; l < e; )
        o += i[l].clientX, h += i[l].clientY, l++;
      return {
        x: v(o / e),
        y: v(h / e)
      };
    }
    function oi(i, e, o) {
      return {
        x: e / i || 0,
        y: o / i || 0
      };
    }
    function ni(i, e) {
      return i === e ? yt : E(i) >= E(e) ? i < 0 ? ht : at : e < 0 ? lt : ct;
    }
    function Et(i, e, o) {
      o || (o = ii);
      var h = e[o[0]] - i[o[0]], l = e[o[1]] - i[o[1]];
      return Math.sqrt(h * h + l * l);
    }
    function Rt(i, e, o) {
      o || (o = ii);
      var h = e[o[0]] - i[o[0]], l = e[o[1]] - i[o[1]];
      return Math.atan2(l, h) * 180 / Math.PI;
    }
    function Gi(i, e) {
      return Rt(e[1], e[0], _t) + Rt(i[1], i[0], _t);
    }
    function Bi(i, e) {
      return Et(e[0], e[1], _t) / Et(i[0], i[1], _t);
    }
    var Wi = {
      mousedown: S,
      mousemove: j,
      mouseup: x
    }, Vi = "mousedown", Yi = "mousemove mouseup";
    function Tt() {
      this.evEl = Vi, this.evWin = Yi, this.pressed = !1, N.apply(this, arguments);
    }
    O(Tt, N, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(e) {
        var o = Wi[e.type];
        o & S && e.button === 0 && (this.pressed = !0), o & j && e.which !== 1 && (o = x), this.pressed && (o & x && (this.pressed = !1), this.callback(this.manager, o, {
          pointers: [e],
          changedPointers: [e],
          pointerType: Dt,
          srcEvent: e
        }));
      }
    });
    var Xi = {
      pointerdown: S,
      pointermove: j,
      pointerup: x,
      pointercancel: C,
      pointerout: C
    }, Zi = {
      2: rt,
      3: bi,
      4: Dt,
      5: Li
      // see https://twitter.com/jacobrossi/status/480596438489890816
    }, ri = "pointerdown", hi = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && (ri = "MSPointerDown", hi = "MSPointerMove MSPointerUp MSPointerCancel");
    function Ut() {
      this.evEl = ri, this.evWin = hi, N.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    O(Ut, N, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(e) {
        var o = this.store, h = !1, l = e.type.toLowerCase().replace("ms", ""), p = Xi[l], f = Zi[e.pointerType] || e.pointerType, A = f == rt, y = it(o, e.pointerId, "pointerId");
        p & S && (e.button === 0 || A) ? y < 0 && (o.push(e), y = o.length - 1) : p & (x | C) && (h = !0), !(y < 0) && (o[y] = e, this.callback(this.manager, p, {
          pointers: o,
          changedPointers: [e],
          pointerType: f,
          srcEvent: e
        }), h && o.splice(y, 1));
      }
    });
    var qi = {
      touchstart: S,
      touchmove: j,
      touchend: x,
      touchcancel: C
    }, ji = "touchstart", Ki = "touchstart touchmove touchend touchcancel";
    function ai() {
      this.evTarget = ji, this.evWin = Ki, this.started = !1, N.apply(this, arguments);
    }
    O(ai, N, {
      handler: function(e) {
        var o = qi[e.type];
        if (o === S && (this.started = !0), !!this.started) {
          var h = Ji.call(this, e, o);
          o & (x | C) && h[0].length - h[1].length === 0 && (this.started = !1), this.callback(this.manager, o, {
            pointers: h[0],
            changedPointers: h[1],
            pointerType: rt,
            srcEvent: e
          });
        }
      }
    });
    function Ji(i, e) {
      var o = mt(i.touches), h = mt(i.changedTouches);
      return e & (x | C) && (o = Jt(o.concat(h), "identifier", !0)), [o, h];
    }
    var Qi = {
      touchstart: S,
      touchmove: j,
      touchend: x,
      touchcancel: C
    }, $i = "touchstart touchmove touchend touchcancel";
    function St() {
      this.evTarget = $i, this.targetIds = {}, N.apply(this, arguments);
    }
    O(St, N, {
      handler: function(e) {
        var o = Qi[e.type], h = te.call(this, e, o);
        h && this.callback(this.manager, o, {
          pointers: h[0],
          changedPointers: h[1],
          pointerType: rt,
          srcEvent: e
        });
      }
    });
    function te(i, e) {
      var o = mt(i.touches), h = this.targetIds;
      if (e & (S | j) && o.length === 1)
        return h[o[0].identifier] = !0, [o, o];
      var l, p, f = mt(i.changedTouches), A = [], y = this.target;
      if (p = o.filter(function(P) {
        return Kt(P.target, y);
      }), e === S)
        for (l = 0; l < p.length; )
          h[p[l].identifier] = !0, l++;
      for (l = 0; l < f.length; )
        h[f[l].identifier] && A.push(f[l]), e & (x | C) && delete h[f[l].identifier], l++;
      if (A.length)
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          Jt(p.concat(A), "identifier", !0),
          A
        ];
    }
    var ie = 2500, li = 25;
    function kt() {
      N.apply(this, arguments);
      var i = bt(this.handler, this);
      this.touch = new St(this.manager, i), this.mouse = new Tt(this.manager, i), this.primaryTouch = null, this.lastTouches = [];
    }
    O(kt, N, {
      /**
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */
      handler: function(e, o, h) {
        var l = h.pointerType == rt, p = h.pointerType == Dt;
        if (!(p && h.sourceCapabilities && h.sourceCapabilities.firesTouchEvents)) {
          if (l)
            ee.call(this, o, h);
          else if (p && se.call(this, h))
            return;
          this.callback(e, o, h);
        }
      },
      /**
       * remove the event listeners
       */
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function ee(i, e) {
      i & S ? (this.primaryTouch = e.changedPointers[0].identifier, ci.call(this, e)) : i & (x | C) && ci.call(this, e);
    }
    function ci(i) {
      var e = i.changedPointers[0];
      if (e.identifier === this.primaryTouch) {
        var o = { x: e.clientX, y: e.clientY };
        this.lastTouches.push(o);
        var h = this.lastTouches, l = function() {
          var p = h.indexOf(o);
          p > -1 && h.splice(p, 1);
        };
        setTimeout(l, ie);
      }
    }
    function se(i) {
      for (var e = i.srcEvent.clientX, o = i.srcEvent.clientY, h = 0; h < this.lastTouches.length; h++) {
        var l = this.lastTouches[h], p = Math.abs(e - l.x), f = Math.abs(o - l.y);
        if (p <= li && f <= li)
          return !0;
      }
      return !1;
    }
    var pi = At(u.style, "touchAction"), ui = pi !== a, di = "compute", fi = "auto", Ft = "manipulation", J = "none", pt = "pan-x", ut = "pan-y", Pt = ne();
    function Ht(i, e) {
      this.manager = i, this.set(e);
    }
    Ht.prototype = {
      /**
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */
      set: function(i) {
        i == di && (i = this.compute()), ui && this.manager.element.style && Pt[i] && (this.manager.element.style[pi] = i), this.actions = i.toLowerCase().trim();
      },
      /**
       * just re-set the touchAction value
       */
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      /**
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */
      compute: function() {
        var i = [];
        return H(this.manager.recognizers, function(e) {
          Lt(e.options.enable, [e]) && (i = i.concat(e.getTouchAction()));
        }), oe(i.join(" "));
      },
      /**
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */
      preventDefaults: function(i) {
        var e = i.srcEvent, o = i.offsetDirection;
        if (this.manager.session.prevented) {
          e.preventDefault();
          return;
        }
        var h = this.actions, l = q(h, J) && !Pt[J], p = q(h, ut) && !Pt[ut], f = q(h, pt) && !Pt[pt];
        if (l) {
          var A = i.pointers.length === 1, y = i.distance < 2, P = i.deltaTime < 250;
          if (A && y && P)
            return;
        }
        if (!(f && p) && (l || p && o & U || f && o & K))
          return this.preventSrc(e);
      },
      /**
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */
      preventSrc: function(i) {
        this.manager.session.prevented = !0, i.preventDefault();
      }
    };
    function oe(i) {
      if (q(i, J))
        return J;
      var e = q(i, pt), o = q(i, ut);
      return e && o ? J : e || o ? e ? pt : ut : q(i, Ft) ? Ft : fi;
    }
    function ne() {
      if (!ui)
        return !1;
      var i = {}, e = t.CSS && t.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(o) {
        i[o] = e ? t.CSS.supports("touch-action", o) : !0;
      }), i;
    }
    var It = 1, M = 2, et = 4, Y = 8, G = Y, dt = 16, k = 32;
    function B(i) {
      this.options = R({}, this.defaults, i || {}), this.id = zi(), this.manager = null, this.options.enable = jt(this.options.enable, !0), this.state = It, this.simultaneous = {}, this.requireFail = [];
    }
    B.prototype = {
      /**
       * @virtual
       * @type {Object}
       */
      defaults: {},
      /**
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */
      set: function(i) {
        return R(this.options, i), this.manager && this.manager.touchAction.update(), this;
      },
      /**
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      recognizeWith: function(i) {
        if (tt(i, "recognizeWith", this))
          return this;
        var e = this.simultaneous;
        return i = Ct(i, this), e[i.id] || (e[i.id] = i, i.recognizeWith(this)), this;
      },
      /**
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRecognizeWith: function(i) {
        return tt(i, "dropRecognizeWith", this) ? this : (i = Ct(i, this), delete this.simultaneous[i.id], this);
      },
      /**
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      requireFailure: function(i) {
        if (tt(i, "requireFailure", this))
          return this;
        var e = this.requireFail;
        return i = Ct(i, this), it(e, i) === -1 && (e.push(i), i.requireFailure(this)), this;
      },
      /**
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRequireFailure: function(i) {
        if (tt(i, "dropRequireFailure", this))
          return this;
        i = Ct(i, this);
        var e = it(this.requireFail, i);
        return e > -1 && this.requireFail.splice(e, 1), this;
      },
      /**
       * has require failures boolean
       * @returns {boolean}
       */
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      /**
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */
      canRecognizeWith: function(i) {
        return !!this.simultaneous[i.id];
      },
      /**
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */
      emit: function(i) {
        var e = this, o = this.state;
        function h(l) {
          e.manager.emit(l, i);
        }
        o < Y && h(e.options.event + vi(o)), h(e.options.event), i.additionalEvent && h(i.additionalEvent), o >= Y && h(e.options.event + vi(o));
      },
      /**
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */
      tryEmit: function(i) {
        if (this.canEmit())
          return this.emit(i);
        this.state = k;
      },
      /**
       * can we emit?
       * @returns {boolean}
       */
      canEmit: function() {
        for (var i = 0; i < this.requireFail.length; ) {
          if (!(this.requireFail[i].state & (k | It)))
            return !1;
          i++;
        }
        return !0;
      },
      /**
       * update the recognizer
       * @param {Object} inputData
       */
      recognize: function(i) {
        var e = R({}, i);
        if (!Lt(this.options.enable, [this, e])) {
          this.reset(), this.state = k;
          return;
        }
        this.state & (G | dt | k) && (this.state = It), this.state = this.process(e), this.state & (M | et | Y | dt) && this.tryEmit(e);
      },
      /**
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {Const} STATE
       */
      process: function(i) {
      },
      // jshint ignore:line
      /**
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */
      getTouchAction: function() {
      },
      /**
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */
      reset: function() {
      }
    };
    function vi(i) {
      return i & dt ? "cancel" : i & Y ? "end" : i & et ? "move" : i & M ? "start" : "";
    }
    function gi(i) {
      return i == ct ? "down" : i == lt ? "up" : i == ht ? "left" : i == at ? "right" : "";
    }
    function Ct(i, e) {
      var o = e.manager;
      return o ? o.get(i) : i;
    }
    function L() {
      B.apply(this, arguments);
    }
    O(L, B, {
      /**
       * @namespace
       * @memberof AttrRecognizer
       */
      defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
      },
      /**
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */
      attrTest: function(i) {
        var e = this.options.pointers;
        return e === 0 || i.pointers.length === e;
      },
      /**
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */
      process: function(i) {
        var e = this.state, o = i.eventType, h = e & (M | et), l = this.attrTest(i);
        return h && (o & C || !l) ? e | dt : h || l ? o & x ? e | Y : e & M ? e | et : M : k;
      }
    });
    function zt() {
      L.apply(this, arguments), this.pX = null, this.pY = null;
    }
    O(zt, L, {
      /**
       * @namespace
       * @memberof PanRecognizer
       */
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: ti
      },
      getTouchAction: function() {
        var i = this.options.direction, e = [];
        return i & U && e.push(ut), i & K && e.push(pt), e;
      },
      directionTest: function(i) {
        var e = this.options, o = !0, h = i.distance, l = i.direction, p = i.deltaX, f = i.deltaY;
        return l & e.direction || (e.direction & U ? (l = p === 0 ? yt : p < 0 ? ht : at, o = p != this.pX, h = Math.abs(i.deltaX)) : (l = f === 0 ? yt : f < 0 ? lt : ct, o = f != this.pY, h = Math.abs(i.deltaY))), i.direction = l, o && h > e.threshold && l & e.direction;
      },
      attrTest: function(i) {
        return L.prototype.attrTest.call(this, i) && (this.state & M || !(this.state & M) && this.directionTest(i));
      },
      emit: function(i) {
        this.pX = i.deltaX, this.pY = i.deltaY;
        var e = gi(i.direction);
        e && (i.additionalEvent = this.options.event + e), this._super.emit.call(this, i);
      }
    });
    function Gt() {
      L.apply(this, arguments);
    }
    O(Gt, L, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [J];
      },
      attrTest: function(i) {
        return this._super.attrTest.call(this, i) && (Math.abs(i.scale - 1) > this.options.threshold || this.state & M);
      },
      emit: function(i) {
        if (i.scale !== 1) {
          var e = i.scale < 1 ? "in" : "out";
          i.additionalEvent = this.options.event + e;
        }
        this._super.emit.call(this, i);
      }
    });
    function Bt() {
      B.apply(this, arguments), this._timer = null, this._input = null;
    }
    O(Bt, B, {
      /**
       * @namespace
       * @memberof PressRecognizer
       */
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        // minimal time of the pointer to be pressed
        threshold: 9
        // a minimal movement is ok, but keep it low
      },
      getTouchAction: function() {
        return [fi];
      },
      process: function(i) {
        var e = this.options, o = i.pointers.length === e.pointers, h = i.distance < e.threshold, l = i.deltaTime > e.time;
        if (this._input = i, !h || !o || i.eventType & (x | C) && !l)
          this.reset();
        else if (i.eventType & S)
          this.reset(), this._timer = Z(function() {
            this.state = G, this.tryEmit();
          }, e.time, this);
        else if (i.eventType & x)
          return G;
        return k;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(i) {
        this.state === G && (i && i.eventType & x ? this.manager.emit(this.options.event + "up", i) : (this._input.timeStamp = T(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Wt() {
      L.apply(this, arguments);
    }
    O(Wt, L, {
      /**
       * @namespace
       * @memberof RotateRecognizer
       */
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [J];
      },
      attrTest: function(i) {
        return this._super.attrTest.call(this, i) && (Math.abs(i.rotation) > this.options.threshold || this.state & M);
      }
    });
    function Vt() {
      L.apply(this, arguments);
    }
    O(Vt, L, {
      /**
       * @namespace
       * @memberof SwipeRecognizer
       */
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: U | K,
        pointers: 1
      },
      getTouchAction: function() {
        return zt.prototype.getTouchAction.call(this);
      },
      attrTest: function(i) {
        var e = this.options.direction, o;
        return e & (U | K) ? o = i.overallVelocity : e & U ? o = i.overallVelocityX : e & K && (o = i.overallVelocityY), this._super.attrTest.call(this, i) && e & i.offsetDirection && i.distance > this.options.threshold && i.maxPointers == this.options.pointers && E(o) > this.options.velocity && i.eventType & x;
      },
      emit: function(i) {
        var e = gi(i.offsetDirection);
        e && this.manager.emit(this.options.event + e, i), this.manager.emit(this.options.event, i);
      }
    });
    function Ot() {
      B.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    O(Ot, B, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        // max time between the multi-tap taps
        time: 250,
        // max time of the pointer to be down (like finger on the screen)
        threshold: 9,
        // a minimal movement is ok, but keep it low
        posThreshold: 10
        // a multi-tap can be a bit off the initial position
      },
      getTouchAction: function() {
        return [Ft];
      },
      process: function(i) {
        var e = this.options, o = i.pointers.length === e.pointers, h = i.distance < e.threshold, l = i.deltaTime < e.time;
        if (this.reset(), i.eventType & S && this.count === 0)
          return this.failTimeout();
        if (h && l && o) {
          if (i.eventType != x)
            return this.failTimeout();
          var p = this.pTime ? i.timeStamp - this.pTime < e.interval : !0, f = !this.pCenter || Et(this.pCenter, i.center) < e.posThreshold;
          this.pTime = i.timeStamp, this.pCenter = i.center, !f || !p ? this.count = 1 : this.count += 1, this._input = i;
          var A = this.count % e.taps;
          if (A === 0)
            return this.hasRequireFailures() ? (this._timer = Z(function() {
              this.state = G, this.tryEmit();
            }, e.interval, this), M) : G;
        }
        return k;
      },
      failTimeout: function() {
        return this._timer = Z(function() {
          this.state = k;
        }, this.options.interval, this), k;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == G && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function W(i, e) {
      return e = e || {}, e.recognizers = jt(e.recognizers, W.defaults.preset), new Yt(i, e);
    }
    W.VERSION = "2.0.7", W.defaults = {
      /**
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: !1,
      /**
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: di,
      /**
       * @type {Boolean}
       * @default true
       */
      enable: !0,
      /**
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,
      /**
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,
      /**
       * Default recognizer setup when calling `Hammer()`
       * When creating a new Manager these will be skipped.
       * @type {Array}
       */
      preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [Wt, { enable: !1 }],
        [Gt, { enable: !1 }, ["rotate"]],
        [Vt, { direction: U }],
        [zt, { direction: U }, ["swipe"]],
        [Ot],
        [Ot, { event: "doubletap", taps: 2 }, ["tap"]],
        [Bt]
      ],
      /**
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: "none",
        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: "none",
        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: "none",
        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: "none",
        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: "none",
        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var re = 1, wi = 2;
    function Yt(i, e) {
      this.options = R({}, W.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || i, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = i, this.input = Ri(this), this.touchAction = new Ht(this, this.options.touchAction), xi(this, !0), H(this.options.recognizers, function(o) {
        var h = this.add(new o[0](o[1]));
        o[2] && h.recognizeWith(o[2]), o[3] && h.requireFailure(o[3]);
      }, this);
    }
    Yt.prototype = {
      /**
       * set options
       * @param {Object} options
       * @returns {Manager}
       */
      set: function(i) {
        return R(this.options, i), i.touchAction && this.touchAction.update(), i.inputTarget && (this.input.destroy(), this.input.target = i.inputTarget, this.input.init()), this;
      },
      /**
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */
      stop: function(i) {
        this.session.stopped = i ? wi : re;
      },
      /**
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */
      recognize: function(i) {
        var e = this.session;
        if (!e.stopped) {
          this.touchAction.preventDefaults(i);
          var o, h = this.recognizers, l = e.curRecognizer;
          (!l || l && l.state & G) && (l = e.curRecognizer = null);
          for (var p = 0; p < h.length; )
            o = h[p], e.stopped !== wi && // 1
            (!l || o == l || // 2
            o.canRecognizeWith(l)) ? o.recognize(i) : o.reset(), !l && o.state & (M | et | Y) && (l = e.curRecognizer = o), p++;
        }
      },
      /**
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */
      get: function(i) {
        if (i instanceof B)
          return i;
        for (var e = this.recognizers, o = 0; o < e.length; o++)
          if (e[o].options.event == i)
            return e[o];
        return null;
      },
      /**
       * add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */
      add: function(i) {
        if (tt(i, "add", this))
          return this;
        var e = this.get(i.options.event);
        return e && this.remove(e), this.recognizers.push(i), i.manager = this, this.touchAction.update(), i;
      },
      /**
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */
      remove: function(i) {
        if (tt(i, "remove", this))
          return this;
        if (i = this.get(i), i) {
          var e = this.recognizers, o = it(e, i);
          o !== -1 && (e.splice(o, 1), this.touchAction.update());
        }
        return this;
      },
      /**
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */
      on: function(i, e) {
        if (i !== a && e !== a) {
          var o = this.handlers;
          return H(xt(i), function(h) {
            o[h] = o[h] || [], o[h].push(e);
          }), this;
        }
      },
      /**
       * unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */
      off: function(i, e) {
        if (i !== a) {
          var o = this.handlers;
          return H(xt(i), function(h) {
            e ? o[h] && o[h].splice(it(o[h], e), 1) : delete o[h];
          }), this;
        }
      },
      /**
       * emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */
      emit: function(i, e) {
        this.options.domEvents && he(i, e);
        var o = this.handlers[i] && this.handlers[i].slice();
        if (!(!o || !o.length)) {
          e.type = i, e.preventDefault = function() {
            e.srcEvent.preventDefault();
          };
          for (var h = 0; h < o.length; )
            o[h](e), h++;
        }
      },
      /**
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */
      destroy: function() {
        this.element && xi(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function xi(i, e) {
      var o = i.element;
      if (o.style) {
        var h;
        H(i.options.cssProps, function(l, p) {
          h = At(o.style, p), e ? (i.oldCssProps[h] = o.style[h], o.style[h] = l) : o.style[h] = i.oldCssProps[h] || "";
        }), e || (i.oldCssProps = {});
      }
    }
    function he(i, e) {
      var o = s.createEvent("Event");
      o.initEvent(i, !0, !0), o.gesture = e, e.target.dispatchEvent(o);
    }
    R(W, {
      INPUT_START: S,
      INPUT_MOVE: j,
      INPUT_END: x,
      INPUT_CANCEL: C,
      STATE_POSSIBLE: It,
      STATE_BEGAN: M,
      STATE_CHANGED: et,
      STATE_ENDED: Y,
      STATE_RECOGNIZED: G,
      STATE_CANCELLED: dt,
      STATE_FAILED: k,
      DIRECTION_NONE: yt,
      DIRECTION_LEFT: ht,
      DIRECTION_RIGHT: at,
      DIRECTION_UP: lt,
      DIRECTION_DOWN: ct,
      DIRECTION_HORIZONTAL: U,
      DIRECTION_VERTICAL: K,
      DIRECTION_ALL: ti,
      Manager: Yt,
      Input: N,
      TouchAction: Ht,
      TouchInput: St,
      MouseInput: Tt,
      PointerEventInput: Ut,
      TouchMouseInput: kt,
      SingleTouchInput: ai,
      Recognizer: B,
      AttrRecognizer: L,
      Tap: Ot,
      Pan: zt,
      Swipe: Vt,
      Pinch: Gt,
      Rotate: Wt,
      Press: Bt,
      on: gt,
      off: wt,
      each: H,
      merge: Ii,
      extend: qt,
      assign: R,
      inherit: O,
      bindFn: bt,
      prefixed: At
    });
    var ae = typeof t < "u" ? t : typeof self < "u" ? self : {};
    ae.Hammer = W, typeof a == "function" && a.amd ? a(function() {
      return W;
    }) : n.exports ? n.exports = W : t[r] = W;
  })(window, document, "Hammer");
})(Pi);
var is = Pi.exports;
const Q = /* @__PURE__ */ ts(is);
var I;
(function(n) {
  n[n.NONE = 0] = "NONE", n[n.LEFTBUTTON = 1] = "LEFTBUTTON", n[n.MOVEZOOM = 2] = "MOVEZOOM";
})(I || (I = {}));
class es {
  constructor(t) {
    this._drawApp = t, this.mc = new Q.Manager(t.canvas), this.touchAction = I.NONE, this.mc.add(new Q.Press({ time: 25 })), this.mc.add(new Q.Pan({ event: "move", pointers: 1 })), this.mc.add(new Q.Tap({ event: "singletap" })), this.mc.add(new Q.Tap({ event: "twofingerstap", pointers: 2 })), this.mc.add(new Q.Pan({ event: "twofingerspan", pointers: 2, threshold: 5 })), this.mc.add(new Q.Pinch({ event: "twofingerspinch", pointers: 2, threshold: 5 })), this.mc.get("twofingerspinch").recognizeWith("twofingerstap"), this.mc.get("twofingerspan").recognizeWith("twofingerstap");
  }
  _touchPosition(t) {
    const s = this._drawApp.canvas.getBoundingClientRect();
    return { x: t.x - s.left, y: t.y - s.top };
  }
  touchEnd(t) {
    this.mc.get("twofingerspan").set({ enable: !0 }), this.mc.get("twofingerspinch").set({ enable: !0 }), this.touchAction !== I.NONE && (t(this._touchLastPosition), this.touchAction = I.NONE, this._drawApp.mouse.button = d.NONE, this._drawApp.mouse.moving = !1);
  }
  touchPress(t, s) {
    if (t.pointerType === "touch")
      try {
        this._touchLastPosition = this._touchPosition({ x: t.pointers[0].x, y: t.pointers[0].y }), s(this._touchLastPosition), this.touchAction = I.LEFTBUTTON;
      } catch {
      }
  }
  touchMove(t, s) {
    if (t.pointerType === "touch" && this.touchAction === I.LEFTBUTTON && t.pointers !== null && t.pointers[0].x !== void 0 && t.pointers[0].y !== void 0) {
      const r = this._touchPosition({ x: t.pointers[0].x, y: t.pointers[0].y });
      _i(ot(r, this._drawApp), ot(this._touchLastPosition, this._drawApp)) && (this._touchLastPosition = r, s(this._touchLastPosition));
    }
  }
  touchTwoFingers(t, s, r) {
    if (t.pointerType === "touch" && this.touchAction === I.NONE || this.touchAction === I.MOVEZOOM) {
      if (this.touchAction === I.NONE)
        this._drawApp.mouse.moving = !0, this.touchAction = I.MOVEZOOM, this.limiting = 0, this.lastScale = t.scale;
      else if (this.touchAction === I.MOVEZOOM)
        if (this.limiting > 10) {
          const a = this.lastScale <= t.scale;
          this._touchLastPosition = this._touchPosition({ x: t.center.x, y: t.center.y });
          const c = Math.abs(this.lastScale - t.scale);
          c >= 0.08 ? (this._drawApp.mouse.scrollStep = a ? c : c * 2, r(this._touchLastPosition, a)) : s(this._touchLastPosition), this.lastScale = t.scale, this.limiting = 0;
        } else
          this.limiting++;
    }
  }
  touchTwoFingersTap(t, s) {
    t.pointerType === "touch" && this.touchAction === I.NONE && (this.mc.get("twofingerspan").set({ enable: !1 }), this.mc.get("twofingerspinch").set({ enable: !1 }), s());
  }
}
class $ {
  constructor(t) {
    this._drawApp = t, this._clickIn = !0, this.guiElements = [];
  }
  initToolBox() {
    this.toolbox = new $e(this._drawApp, "toolboxGUI"), this.toolbox.init(this.guiElements);
  }
  reloadGUI() {
    this.guiElements.filter((t) => t.enabled).forEach((t) => {
      t.enabled && t.ui();
    });
  }
  reloadRelativeGUI() {
    this._drawApp.settings.showGrid && (this._centerLines(), this._gridLines());
  }
  _gridLines() {
    if (this._drawApp.mouse.moving && (this._drawApp.mouse.button === d.MIDDLE || this._drawApp.touch.touchAction === I.MOVEZOOM)) {
      const t = this._drawApp.ctx;
      t.beginPath(), t.lineWidth = this._drawApp.zoom.level, t.moveTo(0, 0);
      for (let s = 1; s < this._drawApp.settings.gridSize; s++) {
        const r = st({ x: s, y: s }, this._drawApp), a = {
          x: r.x * this._drawApp.zoom.level + this._drawApp.zoom.offset.x,
          y: r.y * this._drawApp.zoom.level + this._drawApp.zoom.offset.y
        };
        t.moveTo(0, a.y), t.lineTo(this._drawApp.canvas.width, a.y), t.moveTo(a.x, 0), t.lineTo(a.x, this._drawApp.canvas.height);
      }
      t.stroke();
    }
  }
  _centerLines(t = 6) {
    this._drawApp.paintCanvas({ x: 0, y: this._drawApp.canvas.height / 2 - t / 2 }, !1, this._drawApp.settings.gridColor, this._drawApp.canvas.width, t), this._drawApp.paintCanvas({ x: this._drawApp.canvas.width / 2 - t / 2, y: 0 }, !1, this._drawApp.settings.gridColor, t, this._drawApp.canvas.height);
  }
  mouseCheck() {
    this.guiElements.forEach((t) => {
      t.enabled && (!t.clickIn && !this._drawApp.mouse.moving && (t.clickIn = !0, $.CheckInsideGUIElement(this._drawApp, t) && t.mouseUp && t.mouseUp()), this._drawApp.mouse.button === d.NONE && (this._drawApp.reloadCanvas(), this.reloadGUI(), t.child.forEach((s) => {
        s.hoverable && $.CheckInsideGUIElement(this._drawApp, s) && s.hover();
      })));
    }), this.guiElements.forEach((t) => {
      var s;
      if ($.CheckInsideGUIElement(this._drawApp, t)) {
        if (!t.enabled)
          return;
        (s = this._drawApp.toolSelector.tool) === null || s === void 0 || s.event.stopImmediatePropagation(), t.clickIn && this._drawApp.mouse.button === d.LEFT && !this._drawApp.mouse.moving && (t.clickIn = !1, t.mouseDown && t.mouseDown());
      }
    });
  }
  static CheckInsideGUIElement(t, s) {
    return s.enabled && X(t.mouse.realPosition, s.position, {
      x: s.position.x + s.size.x,
      y: s.position.y + s.size.y
    });
  }
}
class ss {
  constructor(t, s) {
    this.canvas = t, this.mouse = new ze(this), this.touch = new es(this), this.eventCanvas = new Oe(this), this.data = new Ei(this, s.gridSize), this.settings = s, this.settings.numColors = 20, this.ctx = t.getContext("2d", { alpha: !1 }), this.toolSelector = new Ce(this), this.zoom = this.toolSelector.tools[g.ZOOM], this.setSizeCanvas(), this.gui = new $(this), this.gui.initToolBox(), this.reloadCanvas();
  }
  getData() {
    return this.data.pixels;
  }
  loadData(t) {
    this.data.pixels = t, this.reloadCanvas();
  }
  saveImage() {
    let t = !1;
    this.settings.showGrid && (t = !0, this.toggleGrid());
    const s = this.canvas.toDataURL(), r = document.createElement("a");
    r.href = s, r.download = "image", r.click(), r.remove(), t && this.toggleGrid();
  }
  paintCanvas(t, s = !1, r = this.toolSelector.colorSelected, a = this.settings.pixelSize, c = this.settings.pixelSize) {
    const u = {
      x: t.x * this.zoom.level + this.zoom.offset.x,
      y: t.y * this.zoom.level + this.zoom.offset.y
    }, w = a * this.zoom.level, v = c * this.zoom.level;
    r.includes("hsl") ? (this.ctx.fillStyle = r, r = this.ctx.fillStyle.substr(1)) : r.includes("#") && (r = r.substr(1)), this.ctx.fillStyle = "#" + r, this.ctx.fillRect(u.x, u.y, w, v), s && this.mouse.button !== d.MIDDLE && this.touch.touchAction !== I.MOVEZOOM && (this.ctx.lineWidth = this.zoom.level, this.ctx.strokeStyle = this.settings.gridColor, this.ctx.strokeRect(u.x + 0.5, u.y + 0.5, w - 0.5, v - 0.5));
  }
  resizeWindow() {
    this.zoom.zoomIn(), this.zoom.zoomOut(), this.reloadCanvas(), this.gui.guiElements.forEach((t) => {
      t.windowResize && t.windowResize();
    }), this.gui.reloadGUI();
  }
  reloadCanvas() {
    this.setSizeCanvas(), this._redrawCanvas();
  }
  setSizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth, this.canvas.height = this.canvas.offsetHeight, this.settings.pixelSize = this.canvas.width / this.settings.gridSize;
  }
  toggleGrid() {
    this.settings.showGrid = !this.settings.showGrid, this.resizeWindow();
  }
  _redrawCanvas() {
    const t = we(Ai(mi(ve(this), {
      x: this.settings.pixelSize,
      y: this.settings.pixelSize
    }))), s = me(xe(Ai(mi(ge(this), {
      x: this.settings.pixelSize,
      y: this.settings.pixelSize
    }))), Xt, { x: this.settings.gridSize, y: this.settings.gridSize });
    this.paintCanvas({ x: 0, y: 0 }, !1, "white", this.canvas.width, this.canvas.height);
    for (let r = t.x; r < s.x; r++)
      for (let a = t.y; a < s.y; a++)
        this.paintCanvas(st({
          x: r,
          y: a
        }, this), this.settings.showGrid, this.data.pixels[r][a]);
    this.gui.reloadRelativeGUI();
  }
}
const os = ["id"], rs = /* @__PURE__ */ le({
  __name: "DrawApp",
  props: {
    id: { default: "drawApp" },
    gridSize: { default: 32 },
    gridColor: { default: "000" },
    showGrid: { type: Boolean, default: !0 }
  },
  setup(n, { expose: t }) {
    const s = n;
    let r = ce(void 0);
    return pe(() => {
      r.value = new ss(document.getElementById(s.id), {
        gridSize: s.gridSize,
        gridColor: s.gridColor,
        showGrid: s.showGrid
      });
    }), t({ drawApp: r }), (a, c) => (ue(), de("canvas", {
      class: "canvasDrawing",
      style: { width: "100%", height: "100%" },
      id: a.id
    }, null, 8, os));
  }
});
export {
  rs as DrawApp
};
