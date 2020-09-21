/*!
 * WebCodeCamJS 2.1.0 javascript Bar code and QR code decoder 
 * Author: Tóth András
 * Web: http://atandrastoth.co.uk
 * email: atandrastoth@gmail.com
 * Licensed under the MIT license
 */
 (function(undefined) {
    "use strict";

    function Q(el) {
        if (typeof el === "string") {
            var els = document.querySelectorAll(el);
            return typeof els === "undefined" ? undefined : els.length > 1 ? els : els[0];
        }
        return el;
    }
    var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
    var scannerLaser = Q(".scanner-laser"),
    decodeLocal = Q("#decode-img"),
    flipHorizontalValue = Q("#flipHorizontal-value");
    var args = {
        autoBrightnessValue: 100,
        resultFunction: function(res) {
            // [].forEach.call(scannerLaser, function(el) {
            //     fadeOut(el, 0.5);
            //     setTimeout(function() {
            //         fadeIn(el, 0.5);
            //     }, 300);
            // });
            // scannedImg.src = res.imgData;
            // scannedQR[txt] = res.format + ": " + res.code;
            alert(res.code);
        },
        getDevicesError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            for (p in error) {
                message += p + ": " + error[p] + "\n";
            }
            alert(message);
        },
        getUserMediaError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            for (p in error) {
                message += p + ": " + error[p] + "\n";
            }
            alert(message);
        },
        cameraError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            if (error.name == "NotSupportedError") {
                var ans = confirm("Your browser does not support getUserMedia via HTTP!\n(see: https:goo.gl/Y0ZkNV).\n You want to see github demo page in a new window?");
                if (ans) {
                    window.open("https://andrastoth.github.io/webcodecamjs/");
                }
            } else {
                for (p in error) {
                    message += p + ": " + error[p] + "\n";
                }
                alert(message);
            }
        }
    };
    var decoder = new WebCodeCamJS("#webcodecam-canvas").buildSelectMenu("#camera-select", 0).init(args);
    decodeLocal.addEventListener("click", function() {
        // Page.decodeLocalImage();

        decoder.buildSelectMenu("#camera-select", 0);
        decoder.play();

        // $('#camera-select').on('change', function(){
        //     decoder.stop().play();
        // });
    }, false);
    decoder.play();
}).call(window.Page = window.Page || {});
