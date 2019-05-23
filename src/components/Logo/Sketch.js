import LogoImageMobile from "../../assets/images/logo_sml.png";
import LogoImageDesktop from "../../assets/images/logo.png";

const Sketch = p => {
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // ------------------------------------------------------
  if (window.innerWidth < 415 && window.innerHeight < 1025) {
    var imgSrc = LogoImageMobile;
    var windowW = window.innerWidth / 1.4;
    var windowH = window.innerHeight / 1.8;

    p.setup = function() {
      p.background(0);
      p.rectMode(p.CENTER);
      p.createCanvas(windowW, windowH);
      p.loadImage(imgSrc, function(img) {
        glitch = new Glitch(img);
        isLoaded = true;
      });
    };
    console.log("Mobile Resolution Detected");
  }

  if (window.innerWidth > 415) {
    var imgSrc = LogoImageDesktop;
    var windowW = window.innerWidth / 2;
    var windowH = window.innerHeight / 1.8;

    p.setup = function() {
      p.background(0);
      p.rectMode(p.CENTER);
      p.createCanvas(windowW, windowH);
      p.loadImage(imgSrc, function(img) {
        glitch = new Glitch(img);
        isLoaded = true;
      });
    };
    console.log("Desktop Resolution Detected");
  }

  // ------------------------------------------------------

  var isLoaded = false;
  var glitch = void 0;

  p.draw = function() {
    p.clear();
    p.background(0);
    if (isLoaded) {
      glitch.show();
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(windowW, windowH);
  };

  const Glitch = (function() {
    function Glitch(img) {
      _classCallCheck(this, Glitch);
      this.channelLen = 4;
      this.imgOrigin = img;
      this.imgOrigin.loadPixels();
      this.copyData = [];
      this.flowLineImgs = [];
      this.shiftLineImgs = [];
      this.shiftRGBs = [];
      this.scatImgs = [];
      this.throughFlag = true;
      this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

      // flow line
      for (var i = 0; i < 1; i++) {
        var o = {
          pixels: null,
          t1: p.floor(p.random(0, 1000)),
          speed: p.floor(p.random(4, 24)),
          randX: p.floor(p.random(24, 80))
        };

        this.flowLineImgs.push(o);
      }

      // shift line
      for (var _i = 0; _i < 6; _i++) {
        var _o = null;
        this.shiftLineImgs.push(_o);
      }

      // shift RGB
      for (var _i2 = 0; _i2 < 1; _i2++) {
        var _o2 = null;
        this.shiftRGBs.push(_o2);
      }

      // scat imgs
      for (var _i3 = 0; _i3 < 3; _i3++) {
        var scatImg = {
          img: null,
          x: 0,
          y: 0
        };

        this.scatImgs.push(scatImg);
      }
    }
    _createClass(Glitch, [
      {
        key: "replaceData",
        value: function replaceData(destImg, srcPixels) {
          for (var y = 0; y < destImg.height; y++) {
            for (var x = 0; x < destImg.width; x++) {
              var r = void 0,
                g = void 0,
                b = void 0,
                a = void 0;
              var index = void 0;
              index = (y * destImg.width + x) * this.channelLen;
              r = index;
              g = index + 1;
              b = index + 2;
              a = index + 3;
              destImg.pixels[r] = srcPixels[r];
              destImg.pixels[g] = srcPixels[g];
              destImg.pixels[b] = srcPixels[b];
              destImg.pixels[a] = srcPixels[a];
            }
          }
          destImg.updatePixels();
        }
      },
      {
        key: "flowLine",
        value: function flowLine(srcImg, obj) {
          var destPixels = void 0,
            tempY = void 0;
          destPixels = new Uint8ClampedArray(srcImg.pixels);
          obj.t1 %= srcImg.height;
          obj.t1 += obj.speed;
          //tempY = p.floor(noise(obj.t1) * srcImg.height);
          tempY = p.floor(obj.t1);
          for (var y = 0; y < srcImg.height; y++) {
            if (tempY === y) {
              for (var x = 0; x < srcImg.width; x++) {
                var r = void 0,
                  g = void 0,
                  b = void 0,
                  a = void 0;
                var index = void 0;
                index = (y * srcImg.width + x) * this.channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                destPixels[r] = srcImg.pixels[r] + obj.randX;
                destPixels[g] = srcImg.pixels[g] + obj.randX;
                destPixels[b] = srcImg.pixels[b] + obj.randX;
                destPixels[a] = srcImg.pixels[a];
              }
            }
          }
          return destPixels;
        }
      },
      {
        key: "shiftLine",
        value: function shiftLine(srcImg) {
          var offsetX = void 0;
          var rangeMin = void 0,
            rangeMax = void 0;
          var destPixels = void 0;
          var rangeH = void 0;

          destPixels = new Uint8ClampedArray(srcImg.pixels);
          rangeH = srcImg.height;
          rangeMin = p.floor(p.random(0, rangeH));
          rangeMax = rangeMin + p.floor(p.random(1, rangeH - rangeMin));
          offsetX = this.channelLen * p.floor(p.random(-40, 40));

          for (var y = 0; y < srcImg.height; y++) {
            if (y > rangeMin && y < rangeMax) {
              for (var x = 0; x < srcImg.width; x++) {
                var r = void 0,
                  g = void 0,
                  b = void 0,
                  a = void 0;
                var r2 = void 0,
                  g2 = void 0,
                  b2 = void 0;
                // a2 = void 0;
                var index = void 0;

                index = (y * srcImg.width + x) * this.channelLen;
                r = index;
                g = index + 1;
                b = index + 2;
                a = index + 3;
                r2 = r + offsetX;
                g2 = g + offsetX;
                b2 = b + offsetX;
                destPixels[r] = srcImg.pixels[r2];
                destPixels[g] = srcImg.pixels[g2];
                destPixels[b] = srcImg.pixels[b2];
                destPixels[a] = srcImg.pixels[a];
              }
            }
          }
          return destPixels;
        }
      },
      {
        key: "shiftRGB",
        value: function shiftRGB(srcImg) {
          var randR = void 0,
            randG = void 0,
            randB = void 0;
          var destPixels = void 0;
          var range = void 0;

          range = 16;
          destPixels = new Uint8ClampedArray(srcImg.pixels);
          randR =
            (p.floor(p.random(-range, range)) * srcImg.width +
              p.floor(p.random(-range, range))) *
            this.channelLen;
          randG =
            (p.floor(p.random(-range, range)) * srcImg.width +
              p.floor(p.random(-range, range))) *
            this.channelLen;
          randB =
            (p.floor(p.random(-range, range)) * srcImg.width +
              p.floor(p.random(-range, range))) *
            this.channelLen;

          for (var y = 0; y < srcImg.height; y++) {
            for (var x = 0; x < srcImg.width; x++) {
              var r = void 0,
                g = void 0,
                b = void 0,
                a = void 0;
              var r2 = void 0,
                g2 = void 0,
                b2 = void 0;
              // a2 = void 0;
              var index = void 0;

              index = (y * srcImg.width + x) * this.channelLen;
              r = index;
              g = index + 1;
              b = index + 2;
              a = index + 3;
              r2 = (r + randR) % srcImg.pixels.length;
              g2 = (g + randG) % srcImg.pixels.length;
              b2 = (b + randB) % srcImg.pixels.length;
              destPixels[r] = srcImg.pixels[r2];
              destPixels[g] = srcImg.pixels[g2];
              destPixels[b] = srcImg.pixels[b2];
              destPixels[a] = srcImg.pixels[a];
            }
          }

          return destPixels;
        }
      },
      {
        key: "getrandomRectImg",
        value: function getrandomRectImg(srcImg) {
          var startX = void 0;
          var startY = void 0;
          var rectW = void 0;
          var rectH = void 0;
          var destImg = void 0;
          startX = p.floor(p.random(0, srcImg.width - 30));
          startY = p.floor(p.random(0, srcImg.height - 50));
          rectW = p.floor(p.random(30, srcImg.width - startX));
          rectH = p.floor(p.random(1, 50));
          destImg = srcImg.get(startX, startY, rectW, rectH);
          destImg.loadPixels();
          return destImg;
        }
      },
      {
        key: "show",
        value: function show() {
          var _this = this;

          // restore the original state
          this.replaceData(this.imgOrigin, this.copyData);

          // sometimes pass without effect processing
          var n = p.floor(p.random(100));
          if (n > 75 && this.throughFlag) {
            this.throughFlag = false;
            setTimeout(function() {
              _this.throughFlag = true;
            }, p.floor(p.random(40, 400)));
          }
          if (!this.throughFlag) {
            p.push();
            p.translate(
              (p.width - this.imgOrigin.width) / 2,
              (p.height - this.imgOrigin.height) / 2
            );
            p.image(this.imgOrigin, 0, 0);
            p.pop();
            return;
          }

          // flow line
          this.flowLineImgs.forEach(function(v, i, arr) {
            arr[i].pixels = _this.flowLine(_this.imgOrigin, v);
            if (arr[i].pixels) {
              _this.replaceData(_this.imgOrigin, arr[i].pixels);
            }
          });

          // shift line
          this.shiftLineImgs.forEach(function(v, i, arr) {
            if (p.floor(p.random(100)) > 50) {
              arr[i] = _this.shiftLine(_this.imgOrigin);
              _this.replaceData(_this.imgOrigin, arr[i]);
            } else {
              if (arr[i]) {
                _this.replaceData(_this.imgOrigin, arr[i]);
              }
            }
          });

          // shift rgb
          this.shiftRGBs.forEach(function(v, i, arr) {
            if (p.floor(p.random(100)) > 65) {
              arr[i] = _this.shiftRGB(_this.imgOrigin);
              _this.replaceData(_this.imgOrigin, arr[i]);
            }
          });

          p.push();
          p.translate(
            (p.width - this.imgOrigin.width) / 2,
            (p.height - this.imgOrigin.height) / 2
          );
          p.image(this.imgOrigin, 0, 0);
          p.pop();

          // scat image
          this.scatImgs.forEach(function(obj) {
            p.push();
            p.translate(
              (p.width - _this.imgOrigin.width) / 2,
              (p.height - _this.imgOrigin.height) / 2
            );
            if (p.floor(p.random(100)) > 80) {
              obj.x = p.floor(
                p.random(
                  -_this.imgOrigin.width * 0.3,
                  _this.imgOrigin.width * 0.7
                )
              );
              obj.y = p.floor(
                p.random(-_this.imgOrigin.height * 0.1, _this.imgOrigin.height)
              );
              obj.img = _this.getrandomRectImg(_this.imgOrigin);
            }
            if (obj.img) {
              p.image(obj.img, obj.x, obj.y);
            }
            p.pop();
          });
        }
      }
    ]);
    return Glitch;
  })();
};

export default Sketch;
