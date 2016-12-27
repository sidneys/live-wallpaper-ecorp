'use strict';


/**
 * Modules
 * Node
 * @constant
 */
const path = require('path');

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path');
const html2canvas = require('html2canvas');
require(path.join(appRootPath.path, 'app', 'vendor', 'glitch'));
const glitch = window.glitch;

/**
 * Modules
 * Internal
 * @constant
 */
const logger = require(path.join(appRootPath.path, 'lib', 'logger'))({ write: true });
const domHelper = require(path.join(appRootPath.path, 'lib', 'dom-helper'));

/**
 * @constant
 * @default
 */
const defaultCanvasCount = 5;
const defaultGlitchIntervalMinimum = 3000;
const defaultGlitchIntervalMaximum = 10000;

/**
 * DOM
 */
let elementLogo = document.querySelector('.logo__container');
let elementText = elementLogo.querySelector('.logo__text');
let elementCanvas;

/**
 * Text
 */
let textNormal = elementText.dataset.textNormal;
let textGlitched = elementText.dataset.textGlitched;


/**
 * @instance
 */
let canvasCount = 0;
let canvasList = [];

/**
 * @constant
 * @default
 */
const defaultTimeout = 60;


/**
 * Generate random integer
 * @param {Number} min - Minimum
 * @param {Number} max - Maximum
 * @returns {Number} Integer
 */
let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Render
 */
let render = () => {
    logger.debug('render');

    if (elementCanvas != null) {
        document.body.removeChild(elementCanvas);
    }

    if ((canvasList.length > 0) && (canvasList.length > canvasCount)) {
        elementCanvas = canvasList[canvasCount];
        document.body.insertBefore(elementCanvas, document.body.firstChild);
        canvasCount++;
        elementText.innerHTML = textGlitched;

        let timeout = setTimeout(() => {
            render();

            clearTimeout(timeout);
        }, defaultTimeout);
    } else {
        if (canvasCount >= canvasList.length) {
            canvasCount = 0;
        }

        elementCanvas = null;
        elementText.innerText = textNormal;

        let timeout = setTimeout(() => {
            render();

            clearTimeout(timeout);
        }, getRandomInt(defaultGlitchIntervalMinimum, defaultGlitchIntervalMaximum));
    }
}


/**
 * @listens window:Event#load
 */
window.addEventListener('load', () => {
    logger.debug('window#load');

    for (var i = 0; i < defaultCanvasCount; ++i) {
        glitch(document.body, {
            amount: i,
            complete(canvas) {
                canvas.style.position = 'absolute';
                canvas.style.top = canvas.style.right = canvas.style.bottom = canvas.style.left = 0;
                canvasList.push(canvas);
            }
        });
    }

    render();
});
