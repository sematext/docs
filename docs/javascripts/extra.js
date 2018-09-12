/* Close Modal on Esc Key */
(function(){
    window.onkeydown = function( event ) {
    if ( event.keyCode === 27 ) {
		document.getElementById('close').click();
    }
};
})();
/* begin olark code */
(function(o,l,a,r,k,y){if(o.olark)return; r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0]; y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r); y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)}; y.extend=function(i,j){y("extend",i,j)}; y.identify=function(i){y("identify",k.i=i)}; y.configure=function(i,j){y("configure",i,j);k.c[i]=j}; k=y._={s:[],t:[+new Date],c:{},l:a}; })(window,document,"static.olark.com/jsclient/loader.js");
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('3351-417-10-9450');
/* end olark code */

/* Begin Inspectlet Embed Code */
window.__insp = window.__insp || [];
__insp.push(['wid', 2042687382]);
(function() {
function ldinsp(){if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
setTimeout(ldinsp, 500); document.readyState != "complete" ? (window.attachEvent ? window.attachEvent('onload', ldinsp) : window.addEventListener('load', ldinsp, false)) : ldinsp();
})();
/* End Inspectlet Embed Code */

/* begin act-on code */
/*<![CDATA[*/(function(w,a,b,d,s){w[a]=w[a]||{};w[a][b]=w[a][b]||{q:[],track:function(r,e,t){this.q.push({r:r,e:e,t:t||+new Date});}};var e=d.createElement(s);var f=d.getElementsByTagName(s)[0];e.async=1;e.src='//marketing.sematext.com/cdnr/96/acton/bn/tracker/29440';f.parentNode.insertBefore(e,f);})(window,'ActOn','Beacon',document,'script');ActOn.Beacon.track();/*]]>*/
/* end act-on code */

/* begin GA code */
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-2365268-3', 'auto');
/* end GA code */


/* Google Material Design Lite JS -  https://getmdl.io  */

;(function() {
    "use strict";

    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * A component handler interface using the revealing module design pattern.
     * More details on this design pattern here:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @author Jason Mayes.
     */
    /* exported componentHandler */

    // Pre-defining the componentHandler interface, for closure documentation and
    // static verification.
    var componentHandler = {
      /**
       * Searches existing DOM for elements of our component type and upgrades them
       * if they have not already been upgraded.
       *
       * @param {string=} optJsClass the programatic name of the element class we
       * need to create a new instance of.
       * @param {string=} optCssClass the name of the CSS class elements of this
       * type will have.
       */
      upgradeDom: function(optJsClass, optCssClass) {},
      /**
       * Upgrades a specific element rather than all in the DOM.
       *
       * @param {!Element} element The element we wish to upgrade.
       * @param {string=} optJsClass Optional name of the class we want to upgrade
       * the element to.
       */
      upgradeElement: function(element, optJsClass) {},
      /**
       * Upgrades a specific list of elements rather than all in the DOM.
       *
       * @param {!Element|!Array<!Element>|!NodeList|!HTMLCollection} elements
       * The elements we wish to upgrade.
       */
      upgradeElements: function(elements) {},
      /**
       * Upgrades all registered components found in the current DOM. This is
       * automatically called on window load.
       */
      upgradeAllRegistered: function() {},
      /**
       * Allows user to be alerted to any upgrades that are performed for a given
       * component type
       *
       * @param {string} jsClass The class name of the MDL component we wish
       * to hook into for any upgrades performed.
       * @param {function(!HTMLElement)} callback The function to call upon an
       * upgrade. This function should expect 1 parameter - the HTMLElement which
       * got upgraded.
       */
      registerUpgradedCallback: function(jsClass, callback) {},
      /**
       * Registers a class for future use and attempts to upgrade existing DOM.
       *
       * @param {componentHandler.ComponentConfigPublic} config the registration configuration
       */
      register: function(config) {},
      /**
       * Downgrade either a given node, an array of nodes, or a NodeList.
       *
       * @param {!Node|!Array<!Node>|!NodeList} nodes
       */
      downgradeElements: function(nodes) {}
    };

    componentHandler = (function() {
      'use strict';

      /** @type {!Array<componentHandler.ComponentConfig>} */
      var registeredComponents_ = [];

      /** @type {!Array<componentHandler.Component>} */
      var createdComponents_ = [];

      var componentConfigProperty_ = 'mdlComponentConfigInternal_';

      /**
       * Searches registered components for a class we are interested in using.
       * Optionally replaces a match with passed object if specified.
       *
       * @param {string} name The name of a class we want to use.
       * @param {componentHandler.ComponentConfig=} optReplace Optional object to replace match with.
       * @return {!Object|boolean}
       * @private
       */
      function findRegisteredClass_(name, optReplace) {
        for (var i = 0; i < registeredComponents_.length; i++) {
          if (registeredComponents_[i].className === name) {
            if (typeof optReplace !== 'undefined') {
              registeredComponents_[i] = optReplace;
            }
            return registeredComponents_[i];
          }
        }
        return false;
      }

      /**
       * Returns an array of the classNames of the upgraded classes on the element.
       *
       * @param {!Element} element The element to fetch data from.
       * @return {!Array<string>}
       * @private
       */
      function getUpgradedListOfElement_(element) {
        var dataUpgraded = element.getAttribute('data-upgraded');
        // Use `['']` as default value to conform the `,name,name...` style.
        return dataUpgraded === null ? [''] : dataUpgraded.split(',');
      }

      /**
       * Returns true if the given element has already been upgraded for the given
       * class.
       *
       * @param {!Element} element The element we want to check.
       * @param {string} jsClass The class to check for.
       * @returns {boolean}
       * @private
       */
      function isElementUpgraded_(element, jsClass) {
        var upgradedList = getUpgradedListOfElement_(element);
        return upgradedList.indexOf(jsClass) !== -1;
      }

      /**
       * Create an event object.
       *
       * @param {string} eventType The type name of the event.
       * @param {boolean} bubbles Whether the event should bubble up the DOM.
       * @param {boolean} cancelable Whether the event can be canceled.
       * @returns {!Event}
       */
      function createEvent_(eventType, bubbles, cancelable) {
        if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
          return new CustomEvent(eventType, {
            bubbles: bubbles,
            cancelable: cancelable
          });
        } else {
          var ev = document.createEvent('Events');
          ev.initEvent(eventType, bubbles, cancelable);
          return ev;
        }
      }

      /**
       * Searches existing DOM for elements of our component type and upgrades them
       * if they have not already been upgraded.
       *
       * @param {string=} optJsClass the programatic name of the element class we
       * need to create a new instance of.
       * @param {string=} optCssClass the name of the CSS class elements of this
       * type will have.
       */
      function upgradeDomInternal(optJsClass, optCssClass) {
        if (typeof optJsClass === 'undefined' &&
            typeof optCssClass === 'undefined') {
          for (var i = 0; i < registeredComponents_.length; i++) {
            upgradeDomInternal(registeredComponents_[i].className,
                registeredComponents_[i].cssClass);
          }
        } else {
          var jsClass = /** @type {string} */ (optJsClass);
          if (typeof optCssClass === 'undefined') {
            var registeredClass = findRegisteredClass_(jsClass);
            if (registeredClass) {
              optCssClass = registeredClass.cssClass;
            }
          }

          var elements = document.querySelectorAll('.' + optCssClass);
          for (var n = 0; n < elements.length; n++) {
            upgradeElementInternal(elements[n], jsClass);
          }
        }
      }

      /**
       * Upgrades a specific element rather than all in the DOM.
       *
       * @param {!Element} element The element we wish to upgrade.
       * @param {string=} optJsClass Optional name of the class we want to upgrade
       * the element to.
       */
      function upgradeElementInternal(element, optJsClass) {
        // Verify argument type.
        if (!(typeof element === 'object' && element instanceof Element)) {
          throw new Error('Invalid argument provided to upgrade MDL element.');
        }
        // Allow upgrade to be canceled by canceling emitted event.
        var upgradingEv = createEvent_('mdl-componentupgrading', true, true);
        element.dispatchEvent(upgradingEv);
        if (upgradingEv.defaultPrevented) {
          return;
        }

        var upgradedList = getUpgradedListOfElement_(element);
        var classesToUpgrade = [];
        // If jsClass is not provided scan the registered components to find the
        // ones matching the element's CSS classList.
        if (!optJsClass) {
          var classList = element.classList;
          registeredComponents_.forEach(function(component) {
            // Match CSS & Not to be upgraded & Not upgraded.
            if (classList.contains(component.cssClass) &&
                classesToUpgrade.indexOf(component) === -1 &&
                !isElementUpgraded_(element, component.className)) {
              classesToUpgrade.push(component);
            }
          });
        } else if (!isElementUpgraded_(element, optJsClass)) {
          classesToUpgrade.push(findRegisteredClass_(optJsClass));
        }

        // Upgrade the element for each classes.
        for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
          registeredClass = classesToUpgrade[i];
          if (registeredClass) {
            // Mark element as upgraded.
            upgradedList.push(registeredClass.className);
            element.setAttribute('data-upgraded', upgradedList.join(','));
            var instance = new registeredClass.classConstructor(element);
            instance[componentConfigProperty_] = registeredClass;
            createdComponents_.push(instance);
            // Call any callbacks the user has registered with this component type.
            for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
              registeredClass.callbacks[j](element);
            }

            if (registeredClass.widget) {
              // Assign per element instance for control over API
              element[registeredClass.className] = instance;
            }
          } else {
            throw new Error(
              'Unable to find a registered component for the given class.');
          }

          var upgradedEv = createEvent_('mdl-componentupgraded', true, false);
          element.dispatchEvent(upgradedEv);
        }
      }

      /**
       * Upgrades a specific list of elements rather than all in the DOM.
       *
       * @param {!Element|!Array<!Element>|!NodeList|!HTMLCollection} elements
       * The elements we wish to upgrade.
       */
      function upgradeElementsInternal(elements) {
        if (!Array.isArray(elements)) {
          if (elements instanceof Element) {
            elements = [elements];
          } else {
            elements = Array.prototype.slice.call(elements);
          }
        }
        for (var i = 0, n = elements.length, element; i < n; i++) {
          element = elements[i];
          if (element instanceof HTMLElement) {
            upgradeElementInternal(element);
            if (element.children.length > 0) {
              upgradeElementsInternal(element.children);
            }
          }
        }
      }

      /**
       * Registers a class for future use and attempts to upgrade existing DOM.
       *
       * @param {componentHandler.ComponentConfigPublic} config
       */
      function registerInternal(config) {
        // In order to support both Closure-compiled and uncompiled code accessing
        // this method, we need to allow for both the dot and array syntax for
        // property access. You'll therefore see the `foo.bar || foo['bar']`
        // pattern repeated across this method.
        var widgetMissing = (typeof config.widget === 'undefined' &&
            typeof config['widget'] === 'undefined');
        var widget = true;

        if (!widgetMissing) {
          widget = config.widget || config['widget'];
        }

        var newConfig = /** @type {componentHandler.ComponentConfig} */ ({
          classConstructor: config.constructor || config['constructor'],
          className: config.classAsString || config['classAsString'],
          cssClass: config.cssClass || config['cssClass'],
          widget: widget,
          callbacks: []
        });

        registeredComponents_.forEach(function(item) {
          if (item.cssClass === newConfig.cssClass) {
            throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
          }
          if (item.className === newConfig.className) {
            throw new Error('The provided className has already been registered');
          }
        });

        if (config.constructor.prototype
            .hasOwnProperty(componentConfigProperty_)) {
          throw new Error(
              'MDL component classes must not have ' + componentConfigProperty_ +
              ' defined as a property.');
        }

        var found = findRegisteredClass_(config.classAsString, newConfig);

        if (!found) {
          registeredComponents_.push(newConfig);
        }
      }

      /**
       * Allows user to be alerted to any upgrades that are performed for a given
       * component type
       *
       * @param {string} jsClass The class name of the MDL component we wish
       * to hook into for any upgrades performed.
       * @param {function(!HTMLElement)} callback The function to call upon an
       * upgrade. This function should expect 1 parameter - the HTMLElement which
       * got upgraded.
       */
      function registerUpgradedCallbackInternal(jsClass, callback) {
        var regClass = findRegisteredClass_(jsClass);
        if (regClass) {
          regClass.callbacks.push(callback);
        }
      }

      /**
       * Upgrades all registered components found in the current DOM. This is
       * automatically called on window load.
       */
      function upgradeAllRegisteredInternal() {
        for (var n = 0; n < registeredComponents_.length; n++) {
          upgradeDomInternal(registeredComponents_[n].className);
        }
      }

      /**
       * Check the component for the downgrade method.
       * Execute if found.
       * Remove component from createdComponents list.
       *
       * @param {?componentHandler.Component} component
       */
      function deconstructComponentInternal(component) {
        if (component) {
          var componentIndex = createdComponents_.indexOf(component);
          createdComponents_.splice(componentIndex, 1);

          var upgrades = component.element_.getAttribute('data-upgraded').split(',');
          var componentPlace = upgrades.indexOf(component[componentConfigProperty_].classAsString);
          upgrades.splice(componentPlace, 1);
          component.element_.setAttribute('data-upgraded', upgrades.join(','));

          var ev = createEvent_('mdl-componentdowngraded', true, false);
          component.element_.dispatchEvent(ev);
        }
      }

      /**
       * Downgrade either a given node, an array of nodes, or a NodeList.
       *
       * @param {!Node|!Array<!Node>|!NodeList} nodes
       */
      function downgradeNodesInternal(nodes) {
        /**
         * Auxiliary function to downgrade a single node.
         * @param  {!Node} node the node to be downgraded
         */
        var downgradeNode = function(node) {
          createdComponents_.filter(function(item) {
            return item.element_ === node;
          }).forEach(deconstructComponentInternal);
        };
        if (nodes instanceof Array || nodes instanceof NodeList) {
          for (var n = 0; n < nodes.length; n++) {
            downgradeNode(nodes[n]);
          }
        } else if (nodes instanceof Node) {
          downgradeNode(nodes);
        } else {
          throw new Error('Invalid argument provided to downgrade MDL nodes.');
        }
      }

      // Now return the functions that should be made public with their publicly
      // facing names...
      return {
        upgradeDom: upgradeDomInternal,
        upgradeElement: upgradeElementInternal,
        upgradeElements: upgradeElementsInternal,
        upgradeAllRegistered: upgradeAllRegisteredInternal,
        registerUpgradedCallback: registerUpgradedCallbackInternal,
        register: registerInternal,
        downgradeElements: downgradeNodesInternal
      };
    })();

    /**
     * Describes the type of a registered component type managed by
     * componentHandler. Provided for benefit of the Closure compiler.
     *
     * @typedef {{
     *   constructor: Function,
     *   classAsString: string,
     *   cssClass: string,
     *   widget: (string|boolean|undefined)
     * }}
     */
    componentHandler.ComponentConfigPublic;  // jshint ignore:line

    /**
     * Describes the type of a registered component type managed by
     * componentHandler. Provided for benefit of the Closure compiler.
     *
     * @typedef {{
     *   constructor: !Function,
     *   className: string,
     *   cssClass: string,
     *   widget: (string|boolean),
     *   callbacks: !Array<function(!HTMLElement)>
     * }}
     */
    componentHandler.ComponentConfig;  // jshint ignore:line

    /**
     * Created component (i.e., upgraded element) type as managed by
     * componentHandler. Provided for benefit of the Closure compiler.
     *
     * @typedef {{
     *   element_: !HTMLElement,
     *   className: string,
     *   classAsString: string,
     *   cssClass: string,
     *   widget: string
     * }}
     */
    componentHandler.Component;  // jshint ignore:line

    // Export all symbols, for the benefit of Closure compiler.
    // No effect on uncompiled code.
    componentHandler['upgradeDom'] = componentHandler.upgradeDom;
    componentHandler['upgradeElement'] = componentHandler.upgradeElement;
    componentHandler['upgradeElements'] = componentHandler.upgradeElements;
    componentHandler['upgradeAllRegistered'] =
        componentHandler.upgradeAllRegistered;
    componentHandler['registerUpgradedCallback'] =
        componentHandler.registerUpgradedCallback;
    componentHandler['register'] = componentHandler.register;
    componentHandler['downgradeElements'] = componentHandler.downgradeElements;
    window.componentHandler = componentHandler;
    window['componentHandler'] = componentHandler;

    window.addEventListener('load', function() {
      'use strict';

      /**
       * Performs a "Cutting the mustard" test. If the browser supports the features
       * tested, adds a mdl-js class to the <html> element. It then upgrades all MDL
       * components requiring JavaScript.
       */
      if ('classList' in document.createElement('div') &&
          'querySelector' in document &&
          'addEventListener' in window && Array.prototype.forEach) {
        document.documentElement.classList.add('mdl-js');
        componentHandler.upgradeAllRegistered();
      } else {
        /**
         * Dummy function to avoid JS errors.
         */
        componentHandler.upgradeElement = function() {};
        /**
         * Dummy function to avoid JS errors.
         */
        componentHandler.register = function() {};
      }
    });

    // Source: https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
    // Adapted from https://gist.github.com/paulirish/1579671 which derived from
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller.
    // Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
    // MIT license
    if (!Date.now) {
        /**
         * Date.now polyfill.
         * @return {number} the current Date
         */
        Date.now = function () {
            return new Date().getTime();
        };
        Date['now'] = Date.now;
    }
    var vendors = [
        'webkit',
        'moz'
    ];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
        window['requestAnimationFrame'] = window.requestAnimationFrame;
        window['cancelAnimationFrame'] = window.cancelAnimationFrame;
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        /**
         * requestAnimationFrame polyfill.
         * @param  {!Function} callback the callback function.
         */
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
        window['requestAnimationFrame'] = window.requestAnimationFrame;
        window['cancelAnimationFrame'] = window.cancelAnimationFrame;
    }
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Button MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialButton = function MaterialButton(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialButton'] = MaterialButton;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialButton.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialButton.prototype.CssClasses_ = {
        RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_CONTAINER: 'mdl-button__ripple-container',
        RIPPLE: 'mdl-ripple'
    };
    /**
       * Handle blur of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialButton.prototype.blurHandler_ = function (event) {
        if (event) {
            this.element_.blur();
        }
    };
    // Public methods.
    /**
       * Disable button.
       *
       * @public
       */
    MaterialButton.prototype.disable = function () {
        this.element_.disabled = true;
    };
    MaterialButton.prototype['disable'] = MaterialButton.prototype.disable;
    /**
       * Enable button.
       *
       * @public
       */
    MaterialButton.prototype.enable = function () {
        this.element_.disabled = false;
    };
    MaterialButton.prototype['enable'] = MaterialButton.prototype.enable;
    /**
       * Initialize element.
       */
    MaterialButton.prototype.init = function () {
        if (this.element_) {
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                var rippleContainer = document.createElement('span');
                rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                this.rippleElement_ = document.createElement('span');
                this.rippleElement_.classList.add(this.CssClasses_.RIPPLE);
                rippleContainer.appendChild(this.rippleElement_);
                this.boundRippleBlurHandler = this.blurHandler_.bind(this);
                this.rippleElement_.addEventListener('mouseup', this.boundRippleBlurHandler);
                this.element_.appendChild(rippleContainer);
            }
            this.boundButtonBlurHandler = this.blurHandler_.bind(this);
            this.element_.addEventListener('mouseup', this.boundButtonBlurHandler);
            this.element_.addEventListener('mouseleave', this.boundButtonBlurHandler);
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialButton,
        classAsString: 'MaterialButton',
        cssClass: 'mdl-js-button',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Checkbox MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialCheckbox = function MaterialCheckbox(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialCheckbox'] = MaterialCheckbox;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialCheckbox.prototype.Constant_ = { TINY_TIMEOUT: 0.001 };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialCheckbox.prototype.CssClasses_ = {
        INPUT: 'mdl-checkbox__input',
        BOX_OUTLINE: 'mdl-checkbox__box-outline',
        FOCUS_HELPER: 'mdl-checkbox__focus-helper',
        TICK_OUTLINE: 'mdl-checkbox__tick-outline',
        RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE_CONTAINER: 'mdl-checkbox__ripple-container',
        RIPPLE_CENTER: 'mdl-ripple--center',
        RIPPLE: 'mdl-ripple',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked',
        IS_UPGRADED: 'is-upgraded'
    };
    /**
       * Handle change of state.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialCheckbox.prototype.onChange_ = function (event) {
        this.updateClasses_();
    };
    /**
       * Handle focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialCheckbox.prototype.onFocus_ = function (event) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle lost focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialCheckbox.prototype.onBlur_ = function (event) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle mouseup.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialCheckbox.prototype.onMouseUp_ = function (event) {
        this.blur_();
    };
    /**
       * Handle class updates.
       *
       * @private
       */
    MaterialCheckbox.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkToggleState();
    };
    /**
       * Add blur.
       *
       * @private
       */
    MaterialCheckbox.prototype.blur_ = function () {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this.inputElement_.blur();
        }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    // Public methods.
    /**
       * Check the inputs toggle state and update display.
       *
       * @public
       */
    MaterialCheckbox.prototype.checkToggleState = function () {
        if (this.inputElement_.checked) {
            this.element_.classList.add(this.CssClasses_.IS_CHECKED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
        }
    };
    MaterialCheckbox.prototype['checkToggleState'] = MaterialCheckbox.prototype.checkToggleState;
    /**
       * Check the inputs disabled state and update display.
       *
       * @public
       */
    MaterialCheckbox.prototype.checkDisabled = function () {
        if (this.inputElement_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialCheckbox.prototype['checkDisabled'] = MaterialCheckbox.prototype.checkDisabled;
    /**
       * Disable checkbox.
       *
       * @public
       */
    MaterialCheckbox.prototype.disable = function () {
        this.inputElement_.disabled = true;
        this.updateClasses_();
    };
    MaterialCheckbox.prototype['disable'] = MaterialCheckbox.prototype.disable;
    /**
       * Enable checkbox.
       *
       * @public
       */
    MaterialCheckbox.prototype.enable = function () {
        this.inputElement_.disabled = false;
        this.updateClasses_();
    };
    MaterialCheckbox.prototype['enable'] = MaterialCheckbox.prototype.enable;
    /**
       * Check checkbox.
       *
       * @public
       */
    MaterialCheckbox.prototype.check = function () {
        this.inputElement_.checked = true;
        this.updateClasses_();
    };
    MaterialCheckbox.prototype['check'] = MaterialCheckbox.prototype.check;
    /**
       * Uncheck checkbox.
       *
       * @public
       */
    MaterialCheckbox.prototype.uncheck = function () {
        this.inputElement_.checked = false;
        this.updateClasses_();
    };
    MaterialCheckbox.prototype['uncheck'] = MaterialCheckbox.prototype.uncheck;
    /**
       * Initialize element.
       */
    MaterialCheckbox.prototype.init = function () {
        if (this.element_) {
            this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
            var boxOutline = document.createElement('span');
            boxOutline.classList.add(this.CssClasses_.BOX_OUTLINE);
            var tickContainer = document.createElement('span');
            tickContainer.classList.add(this.CssClasses_.FOCUS_HELPER);
            var tickOutline = document.createElement('span');
            tickOutline.classList.add(this.CssClasses_.TICK_OUTLINE);
            boxOutline.appendChild(tickOutline);
            this.element_.appendChild(tickContainer);
            this.element_.appendChild(boxOutline);
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                this.rippleContainerElement_ = document.createElement('span');
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT);
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
                this.boundRippleMouseUp = this.onMouseUp_.bind(this);
                this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);
                var ripple = document.createElement('span');
                ripple.classList.add(this.CssClasses_.RIPPLE);
                this.rippleContainerElement_.appendChild(ripple);
                this.element_.appendChild(this.rippleContainerElement_);
            }
            this.boundInputOnChange = this.onChange_.bind(this);
            this.boundInputOnFocus = this.onFocus_.bind(this);
            this.boundInputOnBlur = this.onBlur_.bind(this);
            this.boundElementMouseUp = this.onMouseUp_.bind(this);
            this.inputElement_.addEventListener('change', this.boundInputOnChange);
            this.inputElement_.addEventListener('focus', this.boundInputOnFocus);
            this.inputElement_.addEventListener('blur', this.boundInputOnBlur);
            this.element_.addEventListener('mouseup', this.boundElementMouseUp);
            this.updateClasses_();
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialCheckbox,
        classAsString: 'MaterialCheckbox',
        cssClass: 'mdl-js-checkbox',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for icon toggle MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialIconToggle = function MaterialIconToggle(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialIconToggle'] = MaterialIconToggle;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialIconToggle.prototype.Constant_ = { TINY_TIMEOUT: 0.001 };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialIconToggle.prototype.CssClasses_ = {
        INPUT: 'mdl-icon-toggle__input',
        JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE_CONTAINER: 'mdl-icon-toggle__ripple-container',
        RIPPLE_CENTER: 'mdl-ripple--center',
        RIPPLE: 'mdl-ripple',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked'
    };
    /**
       * Handle change of state.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialIconToggle.prototype.onChange_ = function (event) {
        this.updateClasses_();
    };
    /**
       * Handle focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialIconToggle.prototype.onFocus_ = function (event) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle lost focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialIconToggle.prototype.onBlur_ = function (event) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle mouseup.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialIconToggle.prototype.onMouseUp_ = function (event) {
        this.blur_();
    };
    /**
       * Handle class updates.
       *
       * @private
       */
    MaterialIconToggle.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkToggleState();
    };
    /**
       * Add blur.
       *
       * @private
       */
    MaterialIconToggle.prototype.blur_ = function () {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this.inputElement_.blur();
        }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    // Public methods.
    /**
       * Check the inputs toggle state and update display.
       *
       * @public
       */
    MaterialIconToggle.prototype.checkToggleState = function () {
        if (this.inputElement_.checked) {
            this.element_.classList.add(this.CssClasses_.IS_CHECKED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
        }
    };
    MaterialIconToggle.prototype['checkToggleState'] = MaterialIconToggle.prototype.checkToggleState;
    /**
       * Check the inputs disabled state and update display.
       *
       * @public
       */
    MaterialIconToggle.prototype.checkDisabled = function () {
        if (this.inputElement_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialIconToggle.prototype['checkDisabled'] = MaterialIconToggle.prototype.checkDisabled;
    /**
       * Disable icon toggle.
       *
       * @public
       */
    MaterialIconToggle.prototype.disable = function () {
        this.inputElement_.disabled = true;
        this.updateClasses_();
    };
    MaterialIconToggle.prototype['disable'] = MaterialIconToggle.prototype.disable;
    /**
       * Enable icon toggle.
       *
       * @public
       */
    MaterialIconToggle.prototype.enable = function () {
        this.inputElement_.disabled = false;
        this.updateClasses_();
    };
    MaterialIconToggle.prototype['enable'] = MaterialIconToggle.prototype.enable;
    /**
       * Check icon toggle.
       *
       * @public
       */
    MaterialIconToggle.prototype.check = function () {
        this.inputElement_.checked = true;
        this.updateClasses_();
    };
    MaterialIconToggle.prototype['check'] = MaterialIconToggle.prototype.check;
    /**
       * Uncheck icon toggle.
       *
       * @public
       */
    MaterialIconToggle.prototype.uncheck = function () {
        this.inputElement_.checked = false;
        this.updateClasses_();
    };
    MaterialIconToggle.prototype['uncheck'] = MaterialIconToggle.prototype.uncheck;
    /**
       * Initialize element.
       */
    MaterialIconToggle.prototype.init = function () {
        if (this.element_) {
            this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
            if (this.element_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                this.rippleContainerElement_ = document.createElement('span');
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                this.rippleContainerElement_.classList.add(this.CssClasses_.JS_RIPPLE_EFFECT);
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
                this.boundRippleMouseUp = this.onMouseUp_.bind(this);
                this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);
                var ripple = document.createElement('span');
                ripple.classList.add(this.CssClasses_.RIPPLE);
                this.rippleContainerElement_.appendChild(ripple);
                this.element_.appendChild(this.rippleContainerElement_);
            }
            this.boundInputOnChange = this.onChange_.bind(this);
            this.boundInputOnFocus = this.onFocus_.bind(this);
            this.boundInputOnBlur = this.onBlur_.bind(this);
            this.boundElementOnMouseUp = this.onMouseUp_.bind(this);
            this.inputElement_.addEventListener('change', this.boundInputOnChange);
            this.inputElement_.addEventListener('focus', this.boundInputOnFocus);
            this.inputElement_.addEventListener('blur', this.boundInputOnBlur);
            this.element_.addEventListener('mouseup', this.boundElementOnMouseUp);
            this.updateClasses_();
            this.element_.classList.add('is-upgraded');
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialIconToggle,
        classAsString: 'MaterialIconToggle',
        cssClass: 'mdl-js-icon-toggle',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for dropdown MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialMenu = function MaterialMenu(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialMenu'] = MaterialMenu;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialMenu.prototype.Constant_ = {
        // Total duration of the menu animation.
        TRANSITION_DURATION_SECONDS: 0.3,
        // The fraction of the total duration we want to use for menu item animations.
        TRANSITION_DURATION_FRACTION: 0.8,
        // How long the menu stays open after choosing an option (so the user can see
        // the ripple).
        CLOSE_TIMEOUT: 150
    };
    /**
       * Keycodes, for code readability.
       *
       * @enum {number}
       * @private
       */
    MaterialMenu.prototype.Keycodes_ = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        UP_ARROW: 38,
        DOWN_ARROW: 40
    };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialMenu.prototype.CssClasses_ = {
        CONTAINER: 'mdl-menu__container',
        OUTLINE: 'mdl-menu__outline',
        ITEM: 'mdl-menu__item',
        ITEM_RIPPLE_CONTAINER: 'mdl-menu__item-ripple-container',
        RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE: 'mdl-ripple',
        // Statuses
        IS_UPGRADED: 'is-upgraded',
        IS_VISIBLE: 'is-visible',
        IS_ANIMATING: 'is-animating',
        // Alignment options
        BOTTOM_LEFT: 'mdl-menu--bottom-left',
        // This is the default.
        BOTTOM_RIGHT: 'mdl-menu--bottom-right',
        TOP_LEFT: 'mdl-menu--top-left',
        TOP_RIGHT: 'mdl-menu--top-right',
        UNALIGNED: 'mdl-menu--unaligned'
    };
    /**
       * Initialize element.
       */
    MaterialMenu.prototype.init = function () {
        if (this.element_) {
            // Create container for the menu.
            var container = document.createElement('div');
            container.classList.add(this.CssClasses_.CONTAINER);
            this.element_.parentElement.insertBefore(container, this.element_);
            this.element_.parentElement.removeChild(this.element_);
            container.appendChild(this.element_);
            this.container_ = container;
            // Create outline for the menu (shadow and background).
            var outline = document.createElement('div');
            outline.classList.add(this.CssClasses_.OUTLINE);
            this.outline_ = outline;
            container.insertBefore(outline, this.element_);
            // Find the "for" element and bind events to it.
            var forElId = this.element_.getAttribute('for') || this.element_.getAttribute('data-mdl-for');
            var forEl = null;
            if (forElId) {
                forEl = document.getElementById(forElId);
                if (forEl) {
                    this.forElement_ = forEl;
                    forEl.addEventListener('click', this.handleForClick_.bind(this));
                    forEl.addEventListener('keydown', this.handleForKeyboardEvent_.bind(this));
                }
            }
            var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
            this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this);
            this.boundItemClick_ = this.handleItemClick_.bind(this);
            for (var i = 0; i < items.length; i++) {
                // Add a listener to each menu item.
                items[i].addEventListener('click', this.boundItemClick_);
                // Add a tab index to each menu item.
                items[i].tabIndex = '-1';
                // Add a keyboard listener to each menu item.
                items[i].addEventListener('keydown', this.boundItemKeydown_);
            }
            // Add ripple classes to each item, if the user has enabled ripples.
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                for (i = 0; i < items.length; i++) {
                    var item = items[i];
                    var rippleContainer = document.createElement('span');
                    rippleContainer.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
                    var ripple = document.createElement('span');
                    ripple.classList.add(this.CssClasses_.RIPPLE);
                    rippleContainer.appendChild(ripple);
                    item.appendChild(rippleContainer);
                    item.classList.add(this.CssClasses_.RIPPLE_EFFECT);
                }
            }
            // Copy alignment classes to the container, so the outline can use them.
            if (this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT)) {
                this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT);
            }
            if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
                this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT);
            }
            if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
                this.outline_.classList.add(this.CssClasses_.TOP_LEFT);
            }
            if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
                this.outline_.classList.add(this.CssClasses_.TOP_RIGHT);
            }
            if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
                this.outline_.classList.add(this.CssClasses_.UNALIGNED);
            }
            container.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };
    /**
       * Handles a click on the "for" element, by positioning the menu and then
       * toggling it.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialMenu.prototype.handleForClick_ = function (evt) {
        if (this.element_ && this.forElement_) {
            var rect = this.forElement_.getBoundingClientRect();
            var forRect = this.forElement_.parentElement.getBoundingClientRect();
            if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
            } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
                // Position below the "for" element, aligned to its right.
                this.container_.style.right = forRect.right - rect.right + 'px';
                this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
            } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
                // Position above the "for" element, aligned to its left.
                this.container_.style.left = this.forElement_.offsetLeft + 'px';
                this.container_.style.bottom = forRect.bottom - rect.top + 'px';
            } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
                // Position above the "for" element, aligned to its right.
                this.container_.style.right = forRect.right - rect.right + 'px';
                this.container_.style.bottom = forRect.bottom - rect.top + 'px';
            } else {
                // Default: position below the "for" element, aligned to its left.
                this.container_.style.left = this.forElement_.offsetLeft + 'px';
                this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
            }
        }
        this.toggle(evt);
    };
    /**
       * Handles a keyboard event on the "for" element.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialMenu.prototype.handleForKeyboardEvent_ = function (evt) {
        if (this.element_ && this.container_ && this.forElement_) {
            var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
            if (items && items.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
                if (evt.keyCode === this.Keycodes_.UP_ARROW) {
                    evt.preventDefault();
                    items[items.length - 1].focus();
                } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
                    evt.preventDefault();
                    items[0].focus();
                }
            }
        }
    };
    /**
       * Handles a keyboard event on an item.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialMenu.prototype.handleItemKeyboardEvent_ = function (evt) {
        if (this.element_ && this.container_) {
            var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
            if (items && items.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
                var currentIndex = Array.prototype.slice.call(items).indexOf(evt.target);
                if (evt.keyCode === this.Keycodes_.UP_ARROW) {
                    evt.preventDefault();
                    if (currentIndex > 0) {
                        items[currentIndex - 1].focus();
                    } else {
                        items[items.length - 1].focus();
                    }
                } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
                    evt.preventDefault();
                    if (items.length > currentIndex + 1) {
                        items[currentIndex + 1].focus();
                    } else {
                        items[0].focus();
                    }
                } else if (evt.keyCode === this.Keycodes_.SPACE || evt.keyCode === this.Keycodes_.ENTER) {
                    evt.preventDefault();
                    // Send mousedown and mouseup to trigger ripple.
                    var e = new MouseEvent('mousedown');
                    evt.target.dispatchEvent(e);
                    e = new MouseEvent('mouseup');
                    evt.target.dispatchEvent(e);
                    // Send click.
                    evt.target.click();
                } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
                    evt.preventDefault();
                    this.hide();
                }
            }
        }
    };
    /**
       * Handles a click event on an item.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialMenu.prototype.handleItemClick_ = function (evt) {
        if (evt.target.hasAttribute('disabled')) {
            evt.stopPropagation();
        } else {
            // Wait some time before closing menu, so the user can see the ripple.
            this.closing_ = true;
            window.setTimeout(function (evt) {
                this.hide();
                this.closing_ = false;
            }.bind(this), this.Constant_.CLOSE_TIMEOUT);
        }
    };
    /**
       * Calculates the initial clip (for opening the menu) or final clip (for closing
       * it), and applies it. This allows us to animate from or to the correct point,
       * that is, the point it's aligned to in the "for" element.
       *
       * @param {number} height Height of the clip rectangle
       * @param {number} width Width of the clip rectangle
       * @private
       */
    MaterialMenu.prototype.applyClip_ = function (height, width) {
        if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
            // Do not clip.
            this.element_.style.clip = '';
        } else if (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)) {
            // Clip to the top right corner of the menu.
            this.element_.style.clip = 'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
        } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
            // Clip to the bottom left corner of the menu.
            this.element_.style.clip = 'rect(' + height + 'px 0 ' + height + 'px 0)';
        } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
            // Clip to the bottom right corner of the menu.
            this.element_.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
        } else {
            // Default: do not clip (same as clipping to the top left corner).
            this.element_.style.clip = '';
        }
    };
    /**
       * Cleanup function to remove animation listeners.
       *
       * @param {Event} evt
       * @private
       */
    MaterialMenu.prototype.removeAnimationEndListener_ = function (evt) {
        evt.target.classList.remove(MaterialMenu.prototype.CssClasses_.IS_ANIMATING);
    };
    /**
       * Adds an event listener to clean up after the animation ends.
       *
       * @private
       */
    MaterialMenu.prototype.addAnimationEndListener_ = function () {
        this.element_.addEventListener('transitionend', this.removeAnimationEndListener_);
        this.element_.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener_);
    };
    /**
       * Displays the menu.
       *
       * @public
       */
    MaterialMenu.prototype.show = function (evt) {
        if (this.element_ && this.container_ && this.outline_) {
            // Measure the inner element.
            var height = this.element_.getBoundingClientRect().height;
            var width = this.element_.getBoundingClientRect().width;
            // Apply the inner element's size to the container and outline.
            this.container_.style.width = width + 'px';
            this.container_.style.height = height + 'px';
            this.outline_.style.width = width + 'px';
            this.outline_.style.height = height + 'px';
            var transitionDuration = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION;
            // Calculate transition delays for individual menu items, so that they fade
            // in one at a time.
            var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
            for (var i = 0; i < items.length; i++) {
                var itemDelay = null;
                if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT) || this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
                    itemDelay = (height - items[i].offsetTop - items[i].offsetHeight) / height * transitionDuration + 's';
                } else {
                    itemDelay = items[i].offsetTop / height * transitionDuration + 's';
                }
                items[i].style.transitionDelay = itemDelay;
            }
            // Apply the initial clip to the text before we start animating.
            this.applyClip_(height, width);
            // Wait for the next frame, turn on animation, and apply the final clip.
            // Also make it visible. This triggers the transitions.
            window.requestAnimationFrame(function () {
                this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
                this.element_.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
                this.container_.classList.add(this.CssClasses_.IS_VISIBLE);
            }.bind(this));
            // Clean up after the animation is complete.
            this.addAnimationEndListener_();
            // Add a click listener to the document, to close the menu.
            var callback = function (e) {
                // Check to see if the document is processing the same event that
                // displayed the menu in the first place. If so, do nothing.
                // Also check to see if the menu is in the process of closing itself, and
                // do nothing in that case.
                // Also check if the clicked element is a menu item
                // if so, do nothing.
                if (e !== evt && !this.closing_ && e.target.parentNode !== this.element_) {
                    document.removeEventListener('click', callback);
                    this.hide();
                }
            }.bind(this);
            document.addEventListener('click', callback);
        }
    };
    MaterialMenu.prototype['show'] = MaterialMenu.prototype.show;
    /**
       * Hides the menu.
       *
       * @public
       */
    MaterialMenu.prototype.hide = function () {
        if (this.element_ && this.container_ && this.outline_) {
            var items = this.element_.querySelectorAll('.' + this.CssClasses_.ITEM);
            // Remove all transition delays; menu items fade out concurrently.
            for (var i = 0; i < items.length; i++) {
                items[i].style.removeProperty('transition-delay');
            }
            // Measure the inner element.
            var rect = this.element_.getBoundingClientRect();
            var height = rect.height;
            var width = rect.width;
            // Turn on animation, and apply the final clip. Also make invisible.
            // This triggers the transitions.
            this.element_.classList.add(this.CssClasses_.IS_ANIMATING);
            this.applyClip_(height, width);
            this.container_.classList.remove(this.CssClasses_.IS_VISIBLE);
            // Clean up after the animation is complete.
            this.addAnimationEndListener_();
        }
    };
    MaterialMenu.prototype['hide'] = MaterialMenu.prototype.hide;
    /**
       * Displays or hides the menu, depending on current state.
       *
       * @public
       */
    MaterialMenu.prototype.toggle = function (evt) {
        if (this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
            this.hide();
        } else {
            this.show(evt);
        }
    };
    MaterialMenu.prototype['toggle'] = MaterialMenu.prototype.toggle;
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialMenu,
        classAsString: 'MaterialMenu',
        cssClass: 'mdl-js-menu',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Progress MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialProgress = function MaterialProgress(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialProgress'] = MaterialProgress;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialProgress.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialProgress.prototype.CssClasses_ = { INDETERMINATE_CLASS: 'mdl-progress__indeterminate' };
    /**
       * Set the current progress of the progressbar.
       *
       * @param {number} p Percentage of the progress (0-100)
       * @public
       */
    MaterialProgress.prototype.setProgress = function (p) {
        if (this.element_.classList.contains(this.CssClasses_.INDETERMINATE_CLASS)) {
            return;
        }
        this.progressbar_.style.width = p + '%';
    };
    MaterialProgress.prototype['setProgress'] = MaterialProgress.prototype.setProgress;
    /**
       * Set the current progress of the buffer.
       *
       * @param {number} p Percentage of the buffer (0-100)
       * @public
       */
    MaterialProgress.prototype.setBuffer = function (p) {
        this.bufferbar_.style.width = p + '%';
        this.auxbar_.style.width = 100 - p + '%';
    };
    MaterialProgress.prototype['setBuffer'] = MaterialProgress.prototype.setBuffer;
    /**
       * Initialize element.
       */
    MaterialProgress.prototype.init = function () {
        if (this.element_) {
            var el = document.createElement('div');
            el.className = 'progressbar bar bar1';
            this.element_.appendChild(el);
            this.progressbar_ = el;
            el = document.createElement('div');
            el.className = 'bufferbar bar bar2';
            this.element_.appendChild(el);
            this.bufferbar_ = el;
            el = document.createElement('div');
            el.className = 'auxbar bar bar3';
            this.element_.appendChild(el);
            this.auxbar_ = el;
            this.progressbar_.style.width = '0%';
            this.bufferbar_.style.width = '100%';
            this.auxbar_.style.width = '0%';
            this.element_.classList.add('is-upgraded');
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialProgress,
        classAsString: 'MaterialProgress',
        cssClass: 'mdl-js-progress',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Radio MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialRadio = function MaterialRadio(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialRadio'] = MaterialRadio;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialRadio.prototype.Constant_ = { TINY_TIMEOUT: 0.001 };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialRadio.prototype.CssClasses_ = {
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked',
        IS_UPGRADED: 'is-upgraded',
        JS_RADIO: 'mdl-js-radio',
        RADIO_BTN: 'mdl-radio__button',
        RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
        RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle',
        RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE_CONTAINER: 'mdl-radio__ripple-container',
        RIPPLE_CENTER: 'mdl-ripple--center',
        RIPPLE: 'mdl-ripple'
    };
    /**
       * Handle change of state.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRadio.prototype.onChange_ = function (event) {
        // Since other radio buttons don't get change events, we need to look for
        // them to update their classes.
        var radios = document.getElementsByClassName(this.CssClasses_.JS_RADIO);
        for (var i = 0; i < radios.length; i++) {
            var button = radios[i].querySelector('.' + this.CssClasses_.RADIO_BTN);
            // Different name == different group, so no point updating those.
            if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
                if (typeof radios[i]['MaterialRadio'] !== 'undefined') {
                    radios[i]['MaterialRadio'].updateClasses_();
                }
            }
        }
    };
    /**
       * Handle focus.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRadio.prototype.onFocus_ = function (event) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle lost focus.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRadio.prototype.onBlur_ = function (event) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle mouseup.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRadio.prototype.onMouseup_ = function (event) {
        this.blur_();
    };
    /**
       * Update classes.
       *
       * @private
       */
    MaterialRadio.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkToggleState();
    };
    /**
       * Add blur.
       *
       * @private
       */
    MaterialRadio.prototype.blur_ = function () {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this.btnElement_.blur();
        }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    // Public methods.
    /**
       * Check the components disabled state.
       *
       * @public
       */
    MaterialRadio.prototype.checkDisabled = function () {
        if (this.btnElement_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialRadio.prototype['checkDisabled'] = MaterialRadio.prototype.checkDisabled;
    /**
       * Check the components toggled state.
       *
       * @public
       */
    MaterialRadio.prototype.checkToggleState = function () {
        if (this.btnElement_.checked) {
            this.element_.classList.add(this.CssClasses_.IS_CHECKED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
        }
    };
    MaterialRadio.prototype['checkToggleState'] = MaterialRadio.prototype.checkToggleState;
    /**
       * Disable radio.
       *
       * @public
       */
    MaterialRadio.prototype.disable = function () {
        this.btnElement_.disabled = true;
        this.updateClasses_();
    };
    MaterialRadio.prototype['disable'] = MaterialRadio.prototype.disable;
    /**
       * Enable radio.
       *
       * @public
       */
    MaterialRadio.prototype.enable = function () {
        this.btnElement_.disabled = false;
        this.updateClasses_();
    };
    MaterialRadio.prototype['enable'] = MaterialRadio.prototype.enable;
    /**
       * Check radio.
       *
       * @public
       */
    MaterialRadio.prototype.check = function () {
        this.btnElement_.checked = true;
        this.onChange_(null);
    };
    MaterialRadio.prototype['check'] = MaterialRadio.prototype.check;
    /**
       * Uncheck radio.
       *
       * @public
       */
    MaterialRadio.prototype.uncheck = function () {
        this.btnElement_.checked = false;
        this.onChange_(null);
    };
    MaterialRadio.prototype['uncheck'] = MaterialRadio.prototype.uncheck;
    /**
       * Initialize element.
       */
    MaterialRadio.prototype.init = function () {
        if (this.element_) {
            this.btnElement_ = this.element_.querySelector('.' + this.CssClasses_.RADIO_BTN);
            this.boundChangeHandler_ = this.onChange_.bind(this);
            this.boundFocusHandler_ = this.onChange_.bind(this);
            this.boundBlurHandler_ = this.onBlur_.bind(this);
            this.boundMouseUpHandler_ = this.onMouseup_.bind(this);
            var outerCircle = document.createElement('span');
            outerCircle.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);
            var innerCircle = document.createElement('span');
            innerCircle.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE);
            this.element_.appendChild(outerCircle);
            this.element_.appendChild(innerCircle);
            var rippleContainer;
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                rippleContainer = document.createElement('span');
                rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
                rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
                rippleContainer.addEventListener('mouseup', this.boundMouseUpHandler_);
                var ripple = document.createElement('span');
                ripple.classList.add(this.CssClasses_.RIPPLE);
                rippleContainer.appendChild(ripple);
                this.element_.appendChild(rippleContainer);
            }
            this.btnElement_.addEventListener('change', this.boundChangeHandler_);
            this.btnElement_.addEventListener('focus', this.boundFocusHandler_);
            this.btnElement_.addEventListener('blur', this.boundBlurHandler_);
            this.element_.addEventListener('mouseup', this.boundMouseUpHandler_);
            this.updateClasses_();
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialRadio,
        classAsString: 'MaterialRadio',
        cssClass: 'mdl-js-radio',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Slider MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialSlider = function MaterialSlider(element) {
        this.element_ = element;
        // Browser feature detection.
        this.isIE_ = window.navigator.msPointerEnabled;
        // Initialize instance.
        this.init();
    };
    window['MaterialSlider'] = MaterialSlider;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialSlider.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialSlider.prototype.CssClasses_ = {
        IE_CONTAINER: 'mdl-slider__ie-container',
        SLIDER_CONTAINER: 'mdl-slider__container',
        BACKGROUND_FLEX: 'mdl-slider__background-flex',
        BACKGROUND_LOWER: 'mdl-slider__background-lower',
        BACKGROUND_UPPER: 'mdl-slider__background-upper',
        IS_LOWEST_VALUE: 'is-lowest-value',
        IS_UPGRADED: 'is-upgraded'
    };
    /**
       * Handle input on element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSlider.prototype.onInput_ = function (event) {
        this.updateValueStyles_();
    };
    /**
       * Handle change on element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSlider.prototype.onChange_ = function (event) {
        this.updateValueStyles_();
    };
    /**
       * Handle mouseup on element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSlider.prototype.onMouseUp_ = function (event) {
        event.target.blur();
    };
    /**
       * Handle mousedown on container element.
       * This handler is purpose is to not require the use to click
       * exactly on the 2px slider element, as FireFox seems to be very
       * strict about this.
       *
       * @param {Event} event The event that fired.
       * @private
       * @suppress {missingProperties}
       */
    MaterialSlider.prototype.onContainerMouseDown_ = function (event) {
        // If this click is not on the parent element (but rather some child)
        // ignore. It may still bubble up.
        if (event.target !== this.element_.parentElement) {
            return;
        }
        // Discard the original event and create a new event that
        // is on the slider element.
        event.preventDefault();
        var newEvent = new MouseEvent('mousedown', {
            target: event.target,
            buttons: event.buttons,
            clientX: event.clientX,
            clientY: this.element_.getBoundingClientRect().y
        });
        this.element_.dispatchEvent(newEvent);
    };
    /**
       * Handle updating of values.
       *
       * @private
       */
    MaterialSlider.prototype.updateValueStyles_ = function () {
        // Calculate and apply percentages to div structure behind slider.
        var fraction = (this.element_.value - this.element_.min) / (this.element_.max - this.element_.min);
        if (fraction === 0) {
            this.element_.classList.add(this.CssClasses_.IS_LOWEST_VALUE);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_LOWEST_VALUE);
        }
        if (!this.isIE_) {
            this.backgroundLower_.style.flex = fraction;
            this.backgroundLower_.style.webkitFlex = fraction;
            this.backgroundUpper_.style.flex = 1 - fraction;
            this.backgroundUpper_.style.webkitFlex = 1 - fraction;
        }
    };
    // Public methods.
    /**
       * Disable slider.
       *
       * @public
       */
    MaterialSlider.prototype.disable = function () {
        this.element_.disabled = true;
    };
    MaterialSlider.prototype['disable'] = MaterialSlider.prototype.disable;
    /**
       * Enable slider.
       *
       * @public
       */
    MaterialSlider.prototype.enable = function () {
        this.element_.disabled = false;
    };
    MaterialSlider.prototype['enable'] = MaterialSlider.prototype.enable;
    /**
       * Update slider value.
       *
       * @param {number} value The value to which to set the control (optional).
       * @public
       */
    MaterialSlider.prototype.change = function (value) {
        if (typeof value !== 'undefined') {
            this.element_.value = value;
        }
        this.updateValueStyles_();
    };
    MaterialSlider.prototype['change'] = MaterialSlider.prototype.change;
    /**
       * Initialize element.
       */
    MaterialSlider.prototype.init = function () {
        if (this.element_) {
            if (this.isIE_) {
                // Since we need to specify a very large height in IE due to
                // implementation limitations, we add a parent here that trims it down to
                // a reasonable size.
                var containerIE = document.createElement('div');
                containerIE.classList.add(this.CssClasses_.IE_CONTAINER);
                this.element_.parentElement.insertBefore(containerIE, this.element_);
                this.element_.parentElement.removeChild(this.element_);
                containerIE.appendChild(this.element_);
            } else {
                // For non-IE browsers, we need a div structure that sits behind the
                // slider and allows us to style the left and right sides of it with
                // different colors.
                var container = document.createElement('div');
                container.classList.add(this.CssClasses_.SLIDER_CONTAINER);
                this.element_.parentElement.insertBefore(container, this.element_);
                this.element_.parentElement.removeChild(this.element_);
                container.appendChild(this.element_);
                var backgroundFlex = document.createElement('div');
                backgroundFlex.classList.add(this.CssClasses_.BACKGROUND_FLEX);
                container.appendChild(backgroundFlex);
                this.backgroundLower_ = document.createElement('div');
                this.backgroundLower_.classList.add(this.CssClasses_.BACKGROUND_LOWER);
                backgroundFlex.appendChild(this.backgroundLower_);
                this.backgroundUpper_ = document.createElement('div');
                this.backgroundUpper_.classList.add(this.CssClasses_.BACKGROUND_UPPER);
                backgroundFlex.appendChild(this.backgroundUpper_);
            }
            this.boundInputHandler = this.onInput_.bind(this);
            this.boundChangeHandler = this.onChange_.bind(this);
            this.boundMouseUpHandler = this.onMouseUp_.bind(this);
            this.boundContainerMouseDownHandler = this.onContainerMouseDown_.bind(this);
            this.element_.addEventListener('input', this.boundInputHandler);
            this.element_.addEventListener('change', this.boundChangeHandler);
            this.element_.addEventListener('mouseup', this.boundMouseUpHandler);
            this.element_.parentElement.addEventListener('mousedown', this.boundContainerMouseDownHandler);
            this.updateValueStyles_();
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialSlider,
        classAsString: 'MaterialSlider',
        cssClass: 'mdl-js-slider',
        widget: true
    });
    /**
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Snackbar MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialSnackbar = function MaterialSnackbar(element) {
        this.element_ = element;
        this.textElement_ = this.element_.querySelector('.' + this.cssClasses_.MESSAGE);
        this.actionElement_ = this.element_.querySelector('.' + this.cssClasses_.ACTION);
        if (!this.textElement_) {
            throw new Error('There must be a message element for a snackbar.');
        }
        if (!this.actionElement_) {
            throw new Error('There must be an action element for a snackbar.');
        }
        this.active = false;
        this.actionHandler_ = undefined;
        this.message_ = undefined;
        this.actionText_ = undefined;
        this.queuedNotifications_ = [];
        this.setActionHidden_(true);
    };
    window['MaterialSnackbar'] = MaterialSnackbar;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialSnackbar.prototype.Constant_ = {
        // The duration of the snackbar show/hide animation, in ms.
        ANIMATION_LENGTH: 250
    };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialSnackbar.prototype.cssClasses_ = {
        SNACKBAR: 'mdl-snackbar',
        MESSAGE: 'mdl-snackbar__text',
        ACTION: 'mdl-snackbar__action',
        ACTIVE: 'mdl-snackbar--active'
    };
    /**
       * Display the snackbar.
       *
       * @private
       */
    MaterialSnackbar.prototype.displaySnackbar_ = function () {
        this.element_.setAttribute('aria-hidden', 'true');
        if (this.actionHandler_) {
            this.actionElement_.textContent = this.actionText_;
            this.actionElement_.addEventListener('click', this.actionHandler_);
            this.setActionHidden_(false);
        }
        this.textElement_.textContent = this.message_;
        this.element_.classList.add(this.cssClasses_.ACTIVE);
        this.element_.setAttribute('aria-hidden', 'false');
        setTimeout(this.cleanup_.bind(this), this.timeout_);
    };
    /**
       * Show the snackbar.
       *
       * @param {Object} data The data for the notification.
       * @public
       */
    MaterialSnackbar.prototype.showSnackbar = function (data) {
        if (data === undefined) {
            throw new Error('Please provide a data object with at least a message to display.');
        }
        if (data['message'] === undefined) {
            throw new Error('Please provide a message to be displayed.');
        }
        if (data['actionHandler'] && !data['actionText']) {
            throw new Error('Please provide action text with the handler.');
        }
        if (this.active) {
            this.queuedNotifications_.push(data);
        } else {
            this.active = true;
            this.message_ = data['message'];
            if (data['timeout']) {
                this.timeout_ = data['timeout'];
            } else {
                this.timeout_ = 2750;
            }
            if (data['actionHandler']) {
                this.actionHandler_ = data['actionHandler'];
            }
            if (data['actionText']) {
                this.actionText_ = data['actionText'];
            }
            this.displaySnackbar_();
        }
    };
    MaterialSnackbar.prototype['showSnackbar'] = MaterialSnackbar.prototype.showSnackbar;
    /**
       * Check if the queue has items within it.
       * If it does, display the next entry.
       *
       * @private
       */
    MaterialSnackbar.prototype.checkQueue_ = function () {
        if (this.queuedNotifications_.length > 0) {
            this.showSnackbar(this.queuedNotifications_.shift());
        }
    };
    /**
       * Cleanup the snackbar event listeners and accessiblity attributes.
       *
       * @private
       */
    MaterialSnackbar.prototype.cleanup_ = function () {
        this.element_.classList.remove(this.cssClasses_.ACTIVE);
        setTimeout(function () {
            this.element_.setAttribute('aria-hidden', 'true');
            this.textElement_.textContent = '';
            if (!Boolean(this.actionElement_.getAttribute('aria-hidden'))) {
                this.setActionHidden_(true);
                this.actionElement_.textContent = '';
                this.actionElement_.removeEventListener('click', this.actionHandler_);
            }
            this.actionHandler_ = undefined;
            this.message_ = undefined;
            this.actionText_ = undefined;
            this.active = false;
            this.checkQueue_();
        }.bind(this), this.Constant_.ANIMATION_LENGTH);
    };
    /**
       * Set the action handler hidden state.
       *
       * @param {boolean} value
       * @private
       */
    MaterialSnackbar.prototype.setActionHidden_ = function (value) {
        if (value) {
            this.actionElement_.setAttribute('aria-hidden', 'true');
        } else {
            this.actionElement_.removeAttribute('aria-hidden');
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialSnackbar,
        classAsString: 'MaterialSnackbar',
        cssClass: 'mdl-js-snackbar',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Spinner MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @param {HTMLElement} element The element that will be upgraded.
       * @constructor
       */
    var MaterialSpinner = function MaterialSpinner(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialSpinner'] = MaterialSpinner;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialSpinner.prototype.Constant_ = { MDL_SPINNER_LAYER_COUNT: 4 };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialSpinner.prototype.CssClasses_ = {
        MDL_SPINNER_LAYER: 'mdl-spinner__layer',
        MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
        MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
        MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
        MDL_SPINNER_LEFT: 'mdl-spinner__left',
        MDL_SPINNER_RIGHT: 'mdl-spinner__right'
    };
    /**
       * Auxiliary method to create a spinner layer.
       *
       * @param {number} index Index of the layer to be created.
       * @public
       */
    MaterialSpinner.prototype.createLayer = function (index) {
        var layer = document.createElement('div');
        layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
        layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);
        var leftClipper = document.createElement('div');
        leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
        leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);
        var gapPatch = document.createElement('div');
        gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);
        var rightClipper = document.createElement('div');
        rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
        rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);
        var circleOwners = [
            leftClipper,
            gapPatch,
            rightClipper
        ];
        for (var i = 0; i < circleOwners.length; i++) {
            var circle = document.createElement('div');
            circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
            circleOwners[i].appendChild(circle);
        }
        layer.appendChild(leftClipper);
        layer.appendChild(gapPatch);
        layer.appendChild(rightClipper);
        this.element_.appendChild(layer);
    };
    MaterialSpinner.prototype['createLayer'] = MaterialSpinner.prototype.createLayer;
    /**
       * Stops the spinner animation.
       * Public method for users who need to stop the spinner for any reason.
       *
       * @public
       */
    MaterialSpinner.prototype.stop = function () {
        this.element_.classList.remove('is-active');
    };
    MaterialSpinner.prototype['stop'] = MaterialSpinner.prototype.stop;
    /**
       * Starts the spinner animation.
       * Public method for users who need to manually start the spinner for any reason
       * (instead of just adding the 'is-active' class to their markup).
       *
       * @public
       */
    MaterialSpinner.prototype.start = function () {
        this.element_.classList.add('is-active');
    };
    MaterialSpinner.prototype['start'] = MaterialSpinner.prototype.start;
    /**
       * Initialize element.
       */
    MaterialSpinner.prototype.init = function () {
        if (this.element_) {
            for (var i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) {
                this.createLayer(i);
            }
            this.element_.classList.add('is-upgraded');
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialSpinner,
        classAsString: 'MaterialSpinner',
        cssClass: 'mdl-js-spinner',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Checkbox MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialSwitch = function MaterialSwitch(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialSwitch'] = MaterialSwitch;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialSwitch.prototype.Constant_ = { TINY_TIMEOUT: 0.001 };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialSwitch.prototype.CssClasses_ = {
        INPUT: 'mdl-switch__input',
        TRACK: 'mdl-switch__track',
        THUMB: 'mdl-switch__thumb',
        FOCUS_HELPER: 'mdl-switch__focus-helper',
        RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE_CONTAINER: 'mdl-switch__ripple-container',
        RIPPLE_CENTER: 'mdl-ripple--center',
        RIPPLE: 'mdl-ripple',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked'
    };
    /**
       * Handle change of state.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSwitch.prototype.onChange_ = function (event) {
        this.updateClasses_();
    };
    /**
       * Handle focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSwitch.prototype.onFocus_ = function (event) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle lost focus of element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSwitch.prototype.onBlur_ = function (event) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle mouseup.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialSwitch.prototype.onMouseUp_ = function (event) {
        this.blur_();
    };
    /**
       * Handle class updates.
       *
       * @private
       */
    MaterialSwitch.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkToggleState();
    };
    /**
       * Add blur.
       *
       * @private
       */
    MaterialSwitch.prototype.blur_ = function () {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this.inputElement_.blur();
        }.bind(this), this.Constant_.TINY_TIMEOUT);
    };
    // Public methods.
    /**
       * Check the components disabled state.
       *
       * @public
       */
    MaterialSwitch.prototype.checkDisabled = function () {
        if (this.inputElement_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialSwitch.prototype['checkDisabled'] = MaterialSwitch.prototype.checkDisabled;
    /**
       * Check the components toggled state.
       *
       * @public
       */
    MaterialSwitch.prototype.checkToggleState = function () {
        if (this.inputElement_.checked) {
            this.element_.classList.add(this.CssClasses_.IS_CHECKED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
        }
    };
    MaterialSwitch.prototype['checkToggleState'] = MaterialSwitch.prototype.checkToggleState;
    /**
       * Disable switch.
       *
       * @public
       */
    MaterialSwitch.prototype.disable = function () {
        this.inputElement_.disabled = true;
        this.updateClasses_();
    };
    MaterialSwitch.prototype['disable'] = MaterialSwitch.prototype.disable;
    /**
       * Enable switch.
       *
       * @public
       */
    MaterialSwitch.prototype.enable = function () {
        this.inputElement_.disabled = false;
        this.updateClasses_();
    };
    MaterialSwitch.prototype['enable'] = MaterialSwitch.prototype.enable;
    /**
       * Activate switch.
       *
       * @public
       */
    MaterialSwitch.prototype.on = function () {
        this.inputElement_.checked = true;
        this.updateClasses_();
    };
    MaterialSwitch.prototype['on'] = MaterialSwitch.prototype.on;
    /**
       * Deactivate switch.
       *
       * @public
       */
    MaterialSwitch.prototype.off = function () {
        this.inputElement_.checked = false;
        this.updateClasses_();
    };
    MaterialSwitch.prototype['off'] = MaterialSwitch.prototype.off;
    /**
       * Initialize element.
       */
    MaterialSwitch.prototype.init = function () {
        if (this.element_) {
            this.inputElement_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
            var track = document.createElement('div');
            track.classList.add(this.CssClasses_.TRACK);
            var thumb = document.createElement('div');
            thumb.classList.add(this.CssClasses_.THUMB);
            var focusHelper = document.createElement('span');
            focusHelper.classList.add(this.CssClasses_.FOCUS_HELPER);
            thumb.appendChild(focusHelper);
            this.element_.appendChild(track);
            this.element_.appendChild(thumb);
            this.boundMouseUpHandler = this.onMouseUp_.bind(this);
            if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
                this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                this.rippleContainerElement_ = document.createElement('span');
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_EFFECT);
                this.rippleContainerElement_.classList.add(this.CssClasses_.RIPPLE_CENTER);
                this.rippleContainerElement_.addEventListener('mouseup', this.boundMouseUpHandler);
                var ripple = document.createElement('span');
                ripple.classList.add(this.CssClasses_.RIPPLE);
                this.rippleContainerElement_.appendChild(ripple);
                this.element_.appendChild(this.rippleContainerElement_);
            }
            this.boundChangeHandler = this.onChange_.bind(this);
            this.boundFocusHandler = this.onFocus_.bind(this);
            this.boundBlurHandler = this.onBlur_.bind(this);
            this.inputElement_.addEventListener('change', this.boundChangeHandler);
            this.inputElement_.addEventListener('focus', this.boundFocusHandler);
            this.inputElement_.addEventListener('blur', this.boundBlurHandler);
            this.element_.addEventListener('mouseup', this.boundMouseUpHandler);
            this.updateClasses_();
            this.element_.classList.add('is-upgraded');
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialSwitch,
        classAsString: 'MaterialSwitch',
        cssClass: 'mdl-js-switch',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Tabs MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {Element} element The element that will be upgraded.
       */
    var MaterialTabs = function MaterialTabs(element) {
        // Stores the HTML element.
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialTabs'] = MaterialTabs;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string}
       * @private
       */
    MaterialTabs.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialTabs.prototype.CssClasses_ = {
        TAB_CLASS: 'mdl-tabs__tab',
        PANEL_CLASS: 'mdl-tabs__panel',
        ACTIVE_CLASS: 'is-active',
        UPGRADED_CLASS: 'is-upgraded',
        MDL_JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        MDL_RIPPLE_CONTAINER: 'mdl-tabs__ripple-container',
        MDL_RIPPLE: 'mdl-ripple',
        MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events'
    };
    /**
       * Handle clicks to a tabs component
       *
       * @private
       */
    MaterialTabs.prototype.initTabs_ = function () {
        if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
            this.element_.classList.add(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
        }
        // Select element tabs, document panels
        this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
        this.panels_ = this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);
        // Create new tabs for each tab element
        for (var i = 0; i < this.tabs_.length; i++) {
            new MaterialTab(this.tabs_[i], this);
        }
        this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
    };
    /**
       * Reset tab state, dropping active classes
       *
       * @private
       */
    MaterialTabs.prototype.resetTabState_ = function () {
        for (var k = 0; k < this.tabs_.length; k++) {
            this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }
    };
    /**
       * Reset panel state, droping active classes
       *
       * @private
       */
    MaterialTabs.prototype.resetPanelState_ = function () {
        for (var j = 0; j < this.panels_.length; j++) {
            this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }
    };
    /**
       * Initialize element.
       */
    MaterialTabs.prototype.init = function () {
        if (this.element_) {
            this.initTabs_();
        }
    };
    /**
       * Constructor for an individual tab.
       *
       * @constructor
       * @param {Element} tab The HTML element for the tab.
       * @param {MaterialTabs} ctx The MaterialTabs object that owns the tab.
       */
    function MaterialTab(tab, ctx) {
        if (tab) {
            if (ctx.element_.classList.contains(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
                var rippleContainer = document.createElement('span');
                rippleContainer.classList.add(ctx.CssClasses_.MDL_RIPPLE_CONTAINER);
                rippleContainer.classList.add(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT);
                var ripple = document.createElement('span');
                ripple.classList.add(ctx.CssClasses_.MDL_RIPPLE);
                rippleContainer.appendChild(ripple);
                tab.appendChild(rippleContainer);
            }
            tab.addEventListener('click', function (e) {
                if (tab.getAttribute('href').charAt(0) === '#') {
                    e.preventDefault();
                    var href = tab.href.split('#')[1];
                    var panel = ctx.element_.querySelector('#' + href);
                    ctx.resetTabState_();
                    ctx.resetPanelState_();
                    tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
                    panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
                }
            });
        }
    }
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialTabs,
        classAsString: 'MaterialTabs',
        cssClass: 'mdl-js-tabs'
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Textfield MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialTextfield = function MaterialTextfield(element) {
        this.element_ = element;
        this.maxRows = this.Constant_.NO_MAX_ROWS;
        // Initialize instance.
        this.init();
    };
    window['MaterialTextfield'] = MaterialTextfield;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialTextfield.prototype.Constant_ = {
        NO_MAX_ROWS: -1,
        MAX_ROWS_ATTRIBUTE: 'maxrows'
    };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialTextfield.prototype.CssClasses_ = {
        LABEL: 'mdl-textfield__label',
        INPUT: 'mdl-textfield__input',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded',
        HAS_PLACEHOLDER: 'has-placeholder'
    };
    /**
       * Handle input being entered.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialTextfield.prototype.onKeyDown_ = function (event) {
        var currentRowCount = event.target.value.split('\n').length;
        if (event.keyCode === 13) {
            if (currentRowCount >= this.maxRows) {
                event.preventDefault();
            }
        }
    };
    /**
       * Handle focus.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialTextfield.prototype.onFocus_ = function (event) {
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle lost focus.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialTextfield.prototype.onBlur_ = function (event) {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };
    /**
       * Handle reset event from out side.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialTextfield.prototype.onReset_ = function (event) {
        this.updateClasses_();
    };
    /**
       * Handle class updates.
       *
       * @private
       */
    MaterialTextfield.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkValidity();
        this.checkDirty();
        this.checkFocus();
    };
    // Public methods.
    /**
       * Check the disabled state and update field accordingly.
       *
       * @public
       */
    MaterialTextfield.prototype.checkDisabled = function () {
        if (this.input_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialTextfield.prototype['checkDisabled'] = MaterialTextfield.prototype.checkDisabled;
    /**
      * Check the focus state and update field accordingly.
      *
      * @public
      */
    MaterialTextfield.prototype.checkFocus = function () {
        if (Boolean(this.element_.querySelector(':focus'))) {
            this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
        }
    };
    MaterialTextfield.prototype['checkFocus'] = MaterialTextfield.prototype.checkFocus;
    /**
       * Check the validity state and update field accordingly.
       *
       * @public
       */
    MaterialTextfield.prototype.checkValidity = function () {
        if (this.input_.validity) {
            if (this.input_.validity.valid) {
                this.element_.classList.remove(this.CssClasses_.IS_INVALID);
            } else {
                this.element_.classList.add(this.CssClasses_.IS_INVALID);
            }
        }
    };
    MaterialTextfield.prototype['checkValidity'] = MaterialTextfield.prototype.checkValidity;
    /**
       * Check the dirty state and update field accordingly.
       *
       * @public
       */
    MaterialTextfield.prototype.checkDirty = function () {
        if (this.input_.value && this.input_.value.length > 0) {
            this.element_.classList.add(this.CssClasses_.IS_DIRTY);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
        }
    };
    MaterialTextfield.prototype['checkDirty'] = MaterialTextfield.prototype.checkDirty;
    /**
       * Disable text field.
       *
       * @public
       */
    MaterialTextfield.prototype.disable = function () {
        this.input_.disabled = true;
        this.updateClasses_();
    };
    MaterialTextfield.prototype['disable'] = MaterialTextfield.prototype.disable;
    /**
       * Enable text field.
       *
       * @public
       */
    MaterialTextfield.prototype.enable = function () {
        this.input_.disabled = false;
        this.updateClasses_();
    };
    MaterialTextfield.prototype['enable'] = MaterialTextfield.prototype.enable;
    /**
       * Update text field value.
       *
       * @param {string} value The value to which to set the control (optional).
       * @public
       */
    MaterialTextfield.prototype.change = function (value) {
        this.input_.value = value || '';
        this.updateClasses_();
    };
    MaterialTextfield.prototype['change'] = MaterialTextfield.prototype.change;
    /**
       * Initialize element.
       */
    MaterialTextfield.prototype.init = function () {
        if (this.element_) {
            this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
            this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
            if (this.input_) {
                if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
                    this.maxRows = parseInt(this.input_.getAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
                    if (isNaN(this.maxRows)) {
                        this.maxRows = this.Constant_.NO_MAX_ROWS;
                    }
                }
                if (this.input_.hasAttribute('placeholder')) {
                    this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
                }
                this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
                this.boundFocusHandler = this.onFocus_.bind(this);
                this.boundBlurHandler = this.onBlur_.bind(this);
                this.boundResetHandler = this.onReset_.bind(this);
                this.input_.addEventListener('input', this.boundUpdateClassesHandler);
                this.input_.addEventListener('focus', this.boundFocusHandler);
                this.input_.addEventListener('blur', this.boundBlurHandler);
                this.input_.addEventListener('reset', this.boundResetHandler);
                if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
                    // TODO: This should handle pasting multi line text.
                    // Currently doesn't.
                    this.boundKeyDownHandler = this.onKeyDown_.bind(this);
                    this.input_.addEventListener('keydown', this.boundKeyDownHandler);
                }
                var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
                this.updateClasses_();
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
                if (invalid) {
                    this.element_.classList.add(this.CssClasses_.IS_INVALID);
                }
                if (this.input_.hasAttribute('autofocus')) {
                    this.element_.focus();
                    this.checkFocus();
                }
            }
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialTextfield,
        classAsString: 'MaterialTextfield',
        cssClass: 'mdl-js-textfield',
        widget: true
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Tooltip MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialTooltip = function MaterialTooltip(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialTooltip'] = MaterialTooltip;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialTooltip.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialTooltip.prototype.CssClasses_ = {
        IS_ACTIVE: 'is-active',
        BOTTOM: 'mdl-tooltip--bottom',
        LEFT: 'mdl-tooltip--left',
        RIGHT: 'mdl-tooltip--right',
        TOP: 'mdl-tooltip--top'
    };
    /**
       * Handle mouseenter for tooltip.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialTooltip.prototype.handleMouseEnter_ = function (event) {
        var props = event.target.getBoundingClientRect();
        var left = props.left + props.width / 2;
        var top = props.top + props.height / 2;
        var marginLeft = -1 * (this.element_.offsetWidth / 2);
        var marginTop = -1 * (this.element_.offsetHeight / 2);
        if (this.element_.classList.contains(this.CssClasses_.LEFT) || this.element_.classList.contains(this.CssClasses_.RIGHT)) {
            left = props.width / 2;
            if (top + marginTop < 0) {
                this.element_.style.top = '0';
                this.element_.style.marginTop = '0';
            } else {
                this.element_.style.top = top + 'px';
                this.element_.style.marginTop = marginTop + 'px';
            }
        } else {
            if (left + marginLeft < 0) {
                this.element_.style.left = '0';
                this.element_.style.marginLeft = '0';
            } else {
                this.element_.style.left = left + 'px';
                this.element_.style.marginLeft = marginLeft + 'px';
            }
        }
        if (this.element_.classList.contains(this.CssClasses_.TOP)) {
            this.element_.style.top = props.top - this.element_.offsetHeight - 10 + 'px';
        } else if (this.element_.classList.contains(this.CssClasses_.RIGHT)) {
            this.element_.style.left = props.left + props.width + 10 + 'px';
        } else if (this.element_.classList.contains(this.CssClasses_.LEFT)) {
            this.element_.style.left = props.left - this.element_.offsetWidth - 10 + 'px';
        } else {
            this.element_.style.top = props.top + props.height + 10 + 'px';
        }
        this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
    };
    /**
       * Hide tooltip on mouseleave or scroll
       *
       * @private
       */
    MaterialTooltip.prototype.hideTooltip_ = function () {
        this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
    };
    /**
       * Initialize element.
       */
    MaterialTooltip.prototype.init = function () {
        if (this.element_) {
            var forElId = this.element_.getAttribute('for') || this.element_.getAttribute('data-mdl-for');
            if (forElId) {
                this.forElement_ = document.getElementById(forElId);
            }
            if (this.forElement_) {
                // It's left here because it prevents accidental text selection on Android
                if (!this.forElement_.hasAttribute('tabindex')) {
                    this.forElement_.setAttribute('tabindex', '0');
                }
                this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this);
                this.boundMouseLeaveAndScrollHandler = this.hideTooltip_.bind(this);
                this.forElement_.addEventListener('mouseenter', this.boundMouseEnterHandler, false);
                this.forElement_.addEventListener('touchend', this.boundMouseEnterHandler, false);
                this.forElement_.addEventListener('mouseleave', this.boundMouseLeaveAndScrollHandler, false);
                window.addEventListener('scroll', this.boundMouseLeaveAndScrollHandler, true);
                window.addEventListener('touchstart', this.boundMouseLeaveAndScrollHandler);
            }
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialTooltip,
        classAsString: 'MaterialTooltip',
        cssClass: 'mdl-tooltip'
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Layout MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialLayout = function MaterialLayout(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialLayout'] = MaterialLayout;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialLayout.prototype.Constant_ = {
        MAX_WIDTH: '(max-width: 1024px)',
        TAB_SCROLL_PIXELS: 100,
        RESIZE_TIMEOUT: 100,
        MENU_ICON: '&#xE5D2;',
        CHEVRON_LEFT: 'chevron_left',
        CHEVRON_RIGHT: 'chevron_right'
    };
    /**
       * Keycodes, for code readability.
       *
       * @enum {number}
       * @private
       */
    MaterialLayout.prototype.Keycodes_ = {
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32
    };
    /**
       * Modes.
       *
       * @enum {number}
       * @private
       */
    MaterialLayout.prototype.Mode_ = {
        STANDARD: 0,
        SEAMED: 1,
        WATERFALL: 2,
        SCROLL: 3
    };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialLayout.prototype.CssClasses_ = {
        CONTAINER: 'mdl-layout__container',
        HEADER: 'mdl-layout__header',
        DRAWER: 'mdl-layout__drawer',
        CONTENT: 'mdl-layout__content',
        DRAWER_BTN: 'mdl-layout__drawer-button',
        ICON: 'material-icons',
        JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        RIPPLE_CONTAINER: 'mdl-layout__tab-ripple-container',
        RIPPLE: 'mdl-ripple',
        RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        HEADER_SEAMED: 'mdl-layout__header--seamed',
        HEADER_WATERFALL: 'mdl-layout__header--waterfall',
        HEADER_SCROLL: 'mdl-layout__header--scroll',
        FIXED_HEADER: 'mdl-layout--fixed-header',
        OBFUSCATOR: 'mdl-layout__obfuscator',
        TAB_BAR: 'mdl-layout__tab-bar',
        TAB_CONTAINER: 'mdl-layout__tab-bar-container',
        TAB: 'mdl-layout__tab',
        TAB_BAR_BUTTON: 'mdl-layout__tab-bar-button',
        TAB_BAR_LEFT_BUTTON: 'mdl-layout__tab-bar-left-button',
        TAB_BAR_RIGHT_BUTTON: 'mdl-layout__tab-bar-right-button',
        TAB_MANUAL_SWITCH: 'mdl-layout__tab-manual-switch',
        PANEL: 'mdl-layout__tab-panel',
        HAS_DRAWER: 'has-drawer',
        HAS_TABS: 'has-tabs',
        HAS_SCROLLING_HEADER: 'has-scrolling-header',
        CASTING_SHADOW: 'is-casting-shadow',
        IS_COMPACT: 'is-compact',
        IS_SMALL_SCREEN: 'is-small-screen',
        IS_DRAWER_OPEN: 'is-visible',
        IS_ACTIVE: 'is-active',
        IS_UPGRADED: 'is-upgraded',
        IS_ANIMATING: 'is-animating',
        ON_LARGE_SCREEN: 'mdl-layout--large-screen-only',
        ON_SMALL_SCREEN: 'mdl-layout--small-screen-only'
    };
    /**
       * Handles scrolling on the content.
       *
       * @private
       */
    MaterialLayout.prototype.contentScrollHandler_ = function () {
        if (this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
            return;
        }
        var headerVisible = !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) || this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);
        if (this.content_.scrollTop > 0 && !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
            this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
            this.header_.classList.add(this.CssClasses_.IS_COMPACT);
            if (headerVisible) {
                this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
            }
        } else if (this.content_.scrollTop <= 0 && this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
            this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
            this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
            if (headerVisible) {
                this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
            }
        }
    };
    /**
       * Handles a keyboard event on the drawer.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialLayout.prototype.keyboardEventHandler_ = function (evt) {
        // Only react when the drawer is open.
        if (evt.keyCode === this.Keycodes_.ESCAPE && this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
            this.toggleDrawer();
        }
    };
    /**
       * Handles changes in screen size.
       *
       * @private
       */
    MaterialLayout.prototype.screenSizeHandler_ = function () {
        if (this.screenSizeMediaQuery_.matches) {
            this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN);
            // Collapse drawer (if any) when moving to a large screen size.
            if (this.drawer_) {
                this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
                this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
            }
        }
    };
    /**
       * Handles events of drawer button.
       *
       * @param {Event} evt The event that fired.
       * @private
       */
    MaterialLayout.prototype.drawerToggleHandler_ = function (evt) {
        if (evt && evt.type === 'keydown') {
            if (evt.keyCode === this.Keycodes_.SPACE || evt.keyCode === this.Keycodes_.ENTER) {
                // prevent scrolling in drawer nav
                evt.preventDefault();
            } else {
                // prevent other keys
                return;
            }
        }
        this.toggleDrawer();
    };
    /**
       * Handles (un)setting the `is-animating` class
       *
       * @private
       */
    MaterialLayout.prototype.headerTransitionEndHandler_ = function () {
        this.header_.classList.remove(this.CssClasses_.IS_ANIMATING);
    };
    /**
       * Handles expanding the header on click
       *
       * @private
       */
    MaterialLayout.prototype.headerClickHandler_ = function () {
        if (this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
            this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
            this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
        }
    };
    /**
       * Reset tab state, dropping active classes
       *
       * @private
       */
    MaterialLayout.prototype.resetTabState_ = function (tabBar) {
        for (var k = 0; k < tabBar.length; k++) {
            tabBar[k].classList.remove(this.CssClasses_.IS_ACTIVE);
        }
    };
    /**
       * Reset panel state, droping active classes
       *
       * @private
       */
    MaterialLayout.prototype.resetPanelState_ = function (panels) {
        for (var j = 0; j < panels.length; j++) {
            panels[j].classList.remove(this.CssClasses_.IS_ACTIVE);
        }
    };
    /**
      * Toggle drawer state
      *
      * @public
      */
    MaterialLayout.prototype.toggleDrawer = function () {
        var drawerButton = this.element_.querySelector('.' + this.CssClasses_.DRAWER_BTN);
        this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
        this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
        // Set accessibility properties.
        if (this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
            this.drawer_.setAttribute('aria-hidden', 'false');
            drawerButton.setAttribute('aria-expanded', 'true');
        } else {
            this.drawer_.setAttribute('aria-hidden', 'true');
            drawerButton.setAttribute('aria-expanded', 'false');
        }
    };
    MaterialLayout.prototype['toggleDrawer'] = MaterialLayout.prototype.toggleDrawer;
    /**
       * Initialize element.
       */
    MaterialLayout.prototype.init = function () {
        if (this.element_) {
            var container = document.createElement('div');
            container.classList.add(this.CssClasses_.CONTAINER);
            var focusedElement = this.element_.querySelector(':focus');
            this.element_.parentElement.insertBefore(container, this.element_);
            this.element_.parentElement.removeChild(this.element_);
            container.appendChild(this.element_);
            if (focusedElement) {
                focusedElement.focus();
            }
            var directChildren = this.element_.childNodes;
            var numChildren = directChildren.length;
            for (var c = 0; c < numChildren; c++) {
                var child = directChildren[c];
                if (child.classList && child.classList.contains(this.CssClasses_.HEADER)) {
                    this.header_ = child;
                }
                if (child.classList && child.classList.contains(this.CssClasses_.DRAWER)) {
                    this.drawer_ = child;
                }
                if (child.classList && child.classList.contains(this.CssClasses_.CONTENT)) {
                    this.content_ = child;
                }
            }
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) {
                    // when page is loaded from back/forward cache
                    // trigger repaint to let layout scroll in safari
                    this.element_.style.overflowY = 'hidden';
                    requestAnimationFrame(function () {
                        this.element_.style.overflowY = '';
                    }.bind(this));
                }
            }.bind(this), false);
            if (this.header_) {
                this.tabBar_ = this.header_.querySelector('.' + this.CssClasses_.TAB_BAR);
            }
            var mode = this.Mode_.STANDARD;
            if (this.header_) {
                if (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)) {
                    mode = this.Mode_.SEAMED;
                } else if (this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)) {
                    mode = this.Mode_.WATERFALL;
                    this.header_.addEventListener('transitionend', this.headerTransitionEndHandler_.bind(this));
                    this.header_.addEventListener('click', this.headerClickHandler_.bind(this));
                } else if (this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL)) {
                    mode = this.Mode_.SCROLL;
                    container.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER);
                }
                if (mode === this.Mode_.STANDARD) {
                    this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
                    if (this.tabBar_) {
                        this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW);
                    }
                } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
                    this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
                    if (this.tabBar_) {
                        this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW);
                    }
                } else if (mode === this.Mode_.WATERFALL) {
                    // Add and remove shadows depending on scroll position.
                    // Also add/remove auxiliary class for styling of the compact version of
                    // the header.
                    this.content_.addEventListener('scroll', this.contentScrollHandler_.bind(this));
                    this.contentScrollHandler_();
                }
            }
            // Add drawer toggling button to our layout, if we have an openable drawer.
            if (this.drawer_) {
                var drawerButton = this.element_.querySelector('.' + this.CssClasses_.DRAWER_BTN);
                if (!drawerButton) {
                    drawerButton = document.createElement('div');
                    drawerButton.setAttribute('aria-expanded', 'false');
                    drawerButton.setAttribute('role', 'button');
                    drawerButton.setAttribute('tabindex', '0');
                    drawerButton.classList.add(this.CssClasses_.DRAWER_BTN);
                    var drawerButtonIcon = document.createElement('i');
                    drawerButtonIcon.classList.add(this.CssClasses_.ICON);
                    drawerButtonIcon.innerHTML = this.Constant_.MENU_ICON;
                    drawerButton.appendChild(drawerButtonIcon);
                }
                if (this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)) {
                    //If drawer has ON_LARGE_SCREEN class then add it to the drawer toggle button as well.
                    drawerButton.classList.add(this.CssClasses_.ON_LARGE_SCREEN);
                } else if (this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN)) {
                    //If drawer has ON_SMALL_SCREEN class then add it to the drawer toggle button as well.
                    drawerButton.classList.add(this.CssClasses_.ON_SMALL_SCREEN);
                }
                drawerButton.addEventListener('click', this.drawerToggleHandler_.bind(this));
                drawerButton.addEventListener('keydown', this.drawerToggleHandler_.bind(this));
                // Add a class if the layout has a drawer, for altering the left padding.
                // Adds the HAS_DRAWER to the elements since this.header_ may or may
                // not be present.
                this.element_.classList.add(this.CssClasses_.HAS_DRAWER);
                // If we have a fixed header, add the button to the header rather than
                // the layout.
                if (this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)) {
                    this.header_.insertBefore(drawerButton, this.header_.firstChild);
                } else {
                    this.element_.insertBefore(drawerButton, this.content_);
                }
                var obfuscator = document.createElement('div');
                obfuscator.classList.add(this.CssClasses_.OBFUSCATOR);
                this.element_.appendChild(obfuscator);
                obfuscator.addEventListener('click', this.drawerToggleHandler_.bind(this));
                this.obfuscator_ = obfuscator;
                this.drawer_.addEventListener('keydown', this.keyboardEventHandler_.bind(this));
                this.drawer_.setAttribute('aria-hidden', 'true');
            }
            // Keep an eye on screen size, and add/remove auxiliary class for styling
            // of small screens.
            this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH);
            this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this));
            this.screenSizeHandler_();
            // Initialize tabs, if any.
            if (this.header_ && this.tabBar_) {
                this.element_.classList.add(this.CssClasses_.HAS_TABS);
                var tabContainer = document.createElement('div');
                tabContainer.classList.add(this.CssClasses_.TAB_CONTAINER);
                this.header_.insertBefore(tabContainer, this.tabBar_);
                this.header_.removeChild(this.tabBar_);
                var leftButton = document.createElement('div');
                leftButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
                leftButton.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
                var leftButtonIcon = document.createElement('i');
                leftButtonIcon.classList.add(this.CssClasses_.ICON);
                leftButtonIcon.textContent = this.Constant_.CHEVRON_LEFT;
                leftButton.appendChild(leftButtonIcon);
                leftButton.addEventListener('click', function () {
                    this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS;
                }.bind(this));
                var rightButton = document.createElement('div');
                rightButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
                rightButton.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
                var rightButtonIcon = document.createElement('i');
                rightButtonIcon.classList.add(this.CssClasses_.ICON);
                rightButtonIcon.textContent = this.Constant_.CHEVRON_RIGHT;
                rightButton.appendChild(rightButtonIcon);
                rightButton.addEventListener('click', function () {
                    this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS;
                }.bind(this));
                tabContainer.appendChild(leftButton);
                tabContainer.appendChild(this.tabBar_);
                tabContainer.appendChild(rightButton);
                // Add and remove tab buttons depending on scroll position and total
                // window size.
                var tabUpdateHandler = function () {
                    if (this.tabBar_.scrollLeft > 0) {
                        leftButton.classList.add(this.CssClasses_.IS_ACTIVE);
                    } else {
                        leftButton.classList.remove(this.CssClasses_.IS_ACTIVE);
                    }
                    if (this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth) {
                        rightButton.classList.add(this.CssClasses_.IS_ACTIVE);
                    } else {
                        rightButton.classList.remove(this.CssClasses_.IS_ACTIVE);
                    }
                }.bind(this);
                this.tabBar_.addEventListener('scroll', tabUpdateHandler);
                tabUpdateHandler();
                // Update tabs when the window resizes.
                var windowResizeHandler = function () {
                    // Use timeouts to make sure it doesn't happen too often.
                    if (this.resizeTimeoutId_) {
                        clearTimeout(this.resizeTimeoutId_);
                    }
                    this.resizeTimeoutId_ = setTimeout(function () {
                        tabUpdateHandler();
                        this.resizeTimeoutId_ = null;
                    }.bind(this), this.Constant_.RESIZE_TIMEOUT);
                }.bind(this);
                window.addEventListener('resize', windowResizeHandler);
                if (this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
                    this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                }
                // Select element tabs, document panels
                var tabs = this.tabBar_.querySelectorAll('.' + this.CssClasses_.TAB);
                var panels = this.content_.querySelectorAll('.' + this.CssClasses_.PANEL);
                // Create new tabs for each tab element
                for (var i = 0; i < tabs.length; i++) {
                    new MaterialLayoutTab(tabs[i], tabs, panels, this);
                }
            }
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
        }
    };
    /**
       * Constructor for an individual tab.
       *
       * @constructor
       * @param {HTMLElement} tab The HTML element for the tab.
       * @param {!Array<HTMLElement>} tabs Array with HTML elements for all tabs.
       * @param {!Array<HTMLElement>} panels Array with HTML elements for all panels.
       * @param {MaterialLayout} layout The MaterialLayout object that owns the tab.
       */
    function MaterialLayoutTab(tab, tabs, panels, layout) {
        /**
         * Auxiliary method to programmatically select a tab in the UI.
         */
        function selectTab() {
            var href = tab.href.split('#')[1];
            var panel = layout.content_.querySelector('#' + href);
            layout.resetTabState_(tabs);
            layout.resetPanelState_(panels);
            tab.classList.add(layout.CssClasses_.IS_ACTIVE);
            panel.classList.add(layout.CssClasses_.IS_ACTIVE);
        }
        if (layout.tabBar_.classList.contains(layout.CssClasses_.JS_RIPPLE_EFFECT)) {
            var rippleContainer = document.createElement('span');
            rippleContainer.classList.add(layout.CssClasses_.RIPPLE_CONTAINER);
            rippleContainer.classList.add(layout.CssClasses_.JS_RIPPLE_EFFECT);
            var ripple = document.createElement('span');
            ripple.classList.add(layout.CssClasses_.RIPPLE);
            rippleContainer.appendChild(ripple);
            tab.appendChild(rippleContainer);
        }
        if (!layout.tabBar_.classList.contains(layout.CssClasses_.TAB_MANUAL_SWITCH)) {
            tab.addEventListener('click', function (e) {
                if (tab.getAttribute('href').charAt(0) === '#') {
                    e.preventDefault();
                    selectTab();
                }
            });
        }
        tab.show = selectTab;
    }
    window['MaterialLayoutTab'] = MaterialLayoutTab;
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialLayout,
        classAsString: 'MaterialLayout',
        cssClass: 'mdl-js-layout'
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Data Table Card MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {Element} element The element that will be upgraded.
       */
    var MaterialDataTable = function MaterialDataTable(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialDataTable'] = MaterialDataTable;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialDataTable.prototype.Constant_ = {};
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialDataTable.prototype.CssClasses_ = {
        DATA_TABLE: 'mdl-data-table',
        SELECTABLE: 'mdl-data-table--selectable',
        SELECT_ELEMENT: 'mdl-data-table__select',
        IS_SELECTED: 'is-selected',
        IS_UPGRADED: 'is-upgraded'
    };
    /**
       * Generates and returns a function that toggles the selection state of a
       * single row (or multiple rows).
       *
       * @param {Element} checkbox Checkbox that toggles the selection state.
       * @param {Element} row Row to toggle when checkbox changes.
       * @param {(Array<Object>|NodeList)=} opt_rows Rows to toggle when checkbox changes.
       * @private
       */
    MaterialDataTable.prototype.selectRow_ = function (checkbox, row, opt_rows) {
        if (row) {
            return function () {
                if (checkbox.checked) {
                    row.classList.add(this.CssClasses_.IS_SELECTED);
                } else {
                    row.classList.remove(this.CssClasses_.IS_SELECTED);
                }
            }.bind(this);
        }
        if (opt_rows) {
            return function () {
                var i;
                var el;
                if (checkbox.checked) {
                    for (i = 0; i < opt_rows.length; i++) {
                        el = opt_rows[i].querySelector('td').querySelector('.mdl-checkbox');
                        el['MaterialCheckbox'].check();
                        opt_rows[i].classList.add(this.CssClasses_.IS_SELECTED);
                    }
                } else {
                    for (i = 0; i < opt_rows.length; i++) {
                        el = opt_rows[i].querySelector('td').querySelector('.mdl-checkbox');
                        el['MaterialCheckbox'].uncheck();
                        opt_rows[i].classList.remove(this.CssClasses_.IS_SELECTED);
                    }
                }
            }.bind(this);
        }
    };
    /**
       * Creates a checkbox for a single or or multiple rows and hooks up the
       * event handling.
       *
       * @param {Element} row Row to toggle when checkbox changes.
       * @param {(Array<Object>|NodeList)=} opt_rows Rows to toggle when checkbox changes.
       * @private
       */
    MaterialDataTable.prototype.createCheckbox_ = function (row, opt_rows) {
        var label = document.createElement('label');
        var labelClasses = [
            'mdl-checkbox',
            'mdl-js-checkbox',
            'mdl-js-ripple-effect',
            this.CssClasses_.SELECT_ELEMENT
        ];
        label.className = labelClasses.join(' ');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mdl-checkbox__input');
        if (row) {
            checkbox.checked = row.classList.contains(this.CssClasses_.IS_SELECTED);
            checkbox.addEventListener('change', this.selectRow_(checkbox, row));
        } else if (opt_rows) {
            checkbox.addEventListener('change', this.selectRow_(checkbox, null, opt_rows));
        }
        label.appendChild(checkbox);
        componentHandler.upgradeElement(label, 'MaterialCheckbox');
        return label;
    };
    /**
       * Initialize element.
       */
    MaterialDataTable.prototype.init = function () {
        if (this.element_) {
            var firstHeader = this.element_.querySelector('th');
            var bodyRows = Array.prototype.slice.call(this.element_.querySelectorAll('tbody tr'));
            var footRows = Array.prototype.slice.call(this.element_.querySelectorAll('tfoot tr'));
            var rows = bodyRows.concat(footRows);
            if (this.element_.classList.contains(this.CssClasses_.SELECTABLE)) {
                var th = document.createElement('th');
                var headerCheckbox = this.createCheckbox_(null, rows);
                th.appendChild(headerCheckbox);
                firstHeader.parentElement.insertBefore(th, firstHeader);
                for (var i = 0; i < rows.length; i++) {
                    var firstCell = rows[i].querySelector('td');
                    if (firstCell) {
                        var td = document.createElement('td');
                        if (rows[i].parentNode.nodeName.toUpperCase() === 'TBODY') {
                            var rowCheckbox = this.createCheckbox_(rows[i]);
                            td.appendChild(rowCheckbox);
                        }
                        rows[i].insertBefore(td, firstCell);
                    }
                }
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
            }
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialDataTable,
        classAsString: 'MaterialDataTable',
        cssClass: 'mdl-js-data-table'
    });
    /**
     * @license
     * Copyright 2015 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
       * Class constructor for Ripple MDL component.
       * Implements MDL component design pattern defined at:
       * https://github.com/jasonmayes/mdl-component-design-pattern
       *
       * @constructor
       * @param {HTMLElement} element The element that will be upgraded.
       */
    var MaterialRipple = function MaterialRipple(element) {
        this.element_ = element;
        // Initialize instance.
        this.init();
    };
    window['MaterialRipple'] = MaterialRipple;
    /**
       * Store constants in one place so they can be updated easily.
       *
       * @enum {string | number}
       * @private
       */
    MaterialRipple.prototype.Constant_ = {
        INITIAL_SCALE: 'scale(0.0001, 0.0001)',
        INITIAL_SIZE: '1px',
        INITIAL_OPACITY: '0.4',
        FINAL_OPACITY: '0',
        FINAL_SCALE: ''
    };
    /**
       * Store strings for class names defined by this component that are used in
       * JavaScript. This allows us to simply change it in one place should we
       * decide to modify at a later date.
       *
       * @enum {string}
       * @private
       */
    MaterialRipple.prototype.CssClasses_ = {
        RIPPLE_CENTER: 'mdl-ripple--center',
        RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
        RIPPLE: 'mdl-ripple',
        IS_ANIMATING: 'is-animating',
        IS_VISIBLE: 'is-visible'
    };
    /**
       * Handle mouse / finger down on element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRipple.prototype.downHandler_ = function (event) {
        if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
            var rect = this.element_.getBoundingClientRect();
            this.boundHeight = rect.height;
            this.boundWidth = rect.width;
            this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
            this.rippleElement_.style.width = this.rippleSize_ + 'px';
            this.rippleElement_.style.height = this.rippleSize_ + 'px';
        }
        this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE);
        if (event.type === 'mousedown' && this.ignoringMouseDown_) {
            this.ignoringMouseDown_ = false;
        } else {
            if (event.type === 'touchstart') {
                this.ignoringMouseDown_ = true;
            }
            var frameCount = this.getFrameCount();
            if (frameCount > 0) {
                return;
            }
            this.setFrameCount(1);
            var bound = event.currentTarget.getBoundingClientRect();
            var x;
            var y;
            // Check if we are handling a keyboard click.
            if (event.clientX === 0 && event.clientY === 0) {
                x = Math.round(bound.width / 2);
                y = Math.round(bound.height / 2);
            } else {
                var clientX = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
                var clientY = event.clientY !== undefined ? event.clientY : event.touches[0].clientY;
                x = Math.round(clientX - bound.left);
                y = Math.round(clientY - bound.top);
            }
            this.setRippleXY(x, y);
            this.setRippleStyles(true);
            window.requestAnimationFrame(this.animFrameHandler.bind(this));
        }
    };
    /**
       * Handle mouse / finger up on element.
       *
       * @param {Event} event The event that fired.
       * @private
       */
    MaterialRipple.prototype.upHandler_ = function (event) {
        // Don't fire for the artificial "mouseup" generated by a double-click.
        if (event && event.detail !== 2) {
            // Allow a repaint to occur before removing this class, so the animation
            // shows for tap events, which seem to trigger a mouseup too soon after
            // mousedown.
            window.setTimeout(function () {
                this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE);
            }.bind(this), 0);
        }
    };
    /**
       * Initialize element.
       */
    MaterialRipple.prototype.init = function () {
        if (this.element_) {
            var recentering = this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
            if (!this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)) {
                this.rippleElement_ = this.element_.querySelector('.' + this.CssClasses_.RIPPLE);
                this.frameCount_ = 0;
                this.rippleSize_ = 0;
                this.x_ = 0;
                this.y_ = 0;
                // Touch start produces a compat mouse down event, which would cause a
                // second ripples. To avoid that, we use this property to ignore the first
                // mouse down after a touch start.
                this.ignoringMouseDown_ = false;
                this.boundDownHandler = this.downHandler_.bind(this);
                this.element_.addEventListener('mousedown', this.boundDownHandler);
                this.element_.addEventListener('touchstart', this.boundDownHandler);
                this.boundUpHandler = this.upHandler_.bind(this);
                this.element_.addEventListener('mouseup', this.boundUpHandler);
                this.element_.addEventListener('mouseleave', this.boundUpHandler);
                this.element_.addEventListener('touchend', this.boundUpHandler);
                this.element_.addEventListener('blur', this.boundUpHandler);
                /**
             * Getter for frameCount_.
             * @return {number} the frame count.
             */
                this.getFrameCount = function () {
                    return this.frameCount_;
                };
                /**
             * Setter for frameCount_.
             * @param {number} fC the frame count.
             */
                this.setFrameCount = function (fC) {
                    this.frameCount_ = fC;
                };
                /**
             * Getter for rippleElement_.
             * @return {Element} the ripple element.
             */
                this.getRippleElement = function () {
                    return this.rippleElement_;
                };
                /**
             * Sets the ripple X and Y coordinates.
             * @param  {number} newX the new X coordinate
             * @param  {number} newY the new Y coordinate
             */
                this.setRippleXY = function (newX, newY) {
                    this.x_ = newX;
                    this.y_ = newY;
                };
                /**
             * Sets the ripple styles.
             * @param  {boolean} start whether or not this is the start frame.
             */
                this.setRippleStyles = function (start) {
                    if (this.rippleElement_ !== null) {
                        var transformString;
                        var scale;
                        var size;
                        var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';
                        if (start) {
                            scale = this.Constant_.INITIAL_SCALE;
                            size = this.Constant_.INITIAL_SIZE;
                        } else {
                            scale = this.Constant_.FINAL_SCALE;
                            size = this.rippleSize_ + 'px';
                            if (recentering) {
                                offset = 'translate(' + this.boundWidth / 2 + 'px, ' + this.boundHeight / 2 + 'px)';
                            }
                        }
                        transformString = 'translate(-50%, -50%) ' + offset + scale;
                        this.rippleElement_.style.webkitTransform = transformString;
                        this.rippleElement_.style.msTransform = transformString;
                        this.rippleElement_.style.transform = transformString;
                        if (start) {
                            this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING);
                        } else {
                            this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING);
                        }
                    }
                };
                /**
             * Handles an animation frame.
             */
                this.animFrameHandler = function () {
                    if (this.frameCount_-- > 0) {
                        window.requestAnimationFrame(this.animFrameHandler.bind(this));
                    } else {
                        this.setRippleStyles(false);
                    }
                };
            }
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialRipple,
        classAsString: 'MaterialRipple',
        cssClass: 'mdl-js-ripple-effect',
        widget: false
    });
    }());

// Begin cookieconsent.js https://cookieconsent.insites.com/

    (function(cc) {
  // stop from running again, if accidently included more than once.
  if (cc.hasInitialised) return;

  var util = {
    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    escapeRegExp: function(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },

    hasClass: function(element, selector) {
      var s = ' ';
      return element.nodeType === 1 &&
        (s + element.className + s).replace(/[\n\t]/g, s).indexOf(s + selector + s) >= 0;
    },

    addClass: function(element, className) {
      element.className += ' ' + className;
    },

    removeClass: function(element, className) {
      var regex = new RegExp('\\b' + this.escapeRegExp(className) + '\\b');
      element.className = element.className.replace(regex, '');
    },

    interpolateString: function(str, callback) {
      var marker = /{{([a-z][a-z0-9\-_]*)}}/ig;
      return str.replace(marker, function(matches) {
        return callback(arguments[1]) || '';
      })
    },

    getCookie: function(name) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      return parts.length != 2 ?
        undefined : parts.pop().split(';').shift();
    },

    setCookie: function(name, value, expiryDays, domain, path) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + (expiryDays || 365));

      var cookie = [
        name + '=' + value,
        'expires=' + exdate.toUTCString(),
        'path=' + (path || '/')
      ];

      if (domain) {
        cookie.push('domain=' + domain);
      }
      document.cookie = cookie.join(';');
    },

    // only used for extending the initial options
    deepExtend: function(target, source) {
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          if (prop in target && this.isPlainObject(target[prop]) && this.isPlainObject(source[prop])) {
            this.deepExtend(target[prop], source[prop]);
          } else {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    },

    // only used for throttling the 'mousemove' event (used for animating the revoke button when `animateRevokable` is true)
    throttle: function(callback, limit) {
      var wait = false;
      return function() {
        if (!wait) {
          callback.apply(this, arguments);
          wait = true;
          setTimeout(function() {
            wait = false;
          }, limit);
        }
      }
    },

    // only used for hashing json objects (used for hash mapping palette objects, used when custom colours are passed through JavaScript)
    hash: function(str) {
      var hash = 0,
        i, chr, len;
      if (str.length === 0) return hash;
      for (i = 0, len = str.length; i < len; ++i) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
      }
      return hash;
    },

    normaliseHex: function(hex) {
      if (hex[0] == '#') {
        hex = hex.substr(1);
      }
      if (hex.length == 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      return hex;
    },

    // used to get text colors if not set
    getContrast: function(hex) {
      hex = this.normaliseHex(hex);
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#000' : '#fff';
    },

    // used to change color on highlight
    getLuminance: function(hex) {
      var num = parseInt(this.normaliseHex(hex), 16),
          amt = 38,
          R = (num >> 16) + amt,
          B = (num >> 8 & 0x00FF) + amt,
          G = (num & 0x0000FF) + amt;
      var newColour = (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
      return '#'+newColour;
    },

    isMobile: function() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    isPlainObject: function(obj) {
      // The code "typeof obj === 'object' && obj !== null" allows Array objects
      return typeof obj === 'object' && obj !== null && obj.constructor == Object;
    },
  };

  // valid cookie values
  cc.status = {
    deny: 'deny',
    allow: 'allow',
    dismiss: 'dismiss'
  };

  // detects the `transitionend` event name
  cc.transitionEnd = (function() {
    var el = document.createElement('div');
    var trans = {
      t: "transitionend",
      OT: "oTransitionEnd",
      msT: "MSTransitionEnd",
      MozT: "transitionend",
      WebkitT: "webkitTransitionEnd",
    };

    for (var prefix in trans) {
      if (trans.hasOwnProperty(prefix) && typeof el.style[prefix + 'ransition'] != 'undefined') {
        return trans[prefix];
      }
    }
    return '';
  }());

  cc.hasTransition = !!cc.transitionEnd;

  // array of valid regexp escaped statuses
  var __allowedStatuses = Object.keys(cc.status).map(util.escapeRegExp);

  // contains references to the custom <style> tags
  cc.customStyles = {};

  cc.Popup = (function() {

    var defaultOptions = {

      // if false, this prevents the popup from showing (useful for giving to control to another piece of code)
      enabled: true,

      // optional (expecting a HTML element) if passed, the popup is appended to this element. default is `document.body`
      container: null,

      // defaults cookie options - it is RECOMMENDED to set these values to correspond with your server
      cookie: {
        // This is the name of this cookie - you can ignore this
        name: 'cookieconsent_status',

        // This is the url path that the cookie 'name' belongs to. The cookie can only be read at this location
        path: '/',

        // This is the domain that the cookie 'name' belongs to. The cookie can only be read on this domain.
        //  - Guide to cookie domains - http://erik.io/blog/2014/03/04/definitive-guide-to-cookie-domains/
        domain: '',

        // The cookies expire date, specified in days (specify -1 for no expiry)
        expiryDays: 365,
      },

      // these callback hooks are called at certain points in the program execution
      onPopupOpen: function() {},
      onPopupClose: function() {},
      onInitialise: function(status) {},
      onStatusChange: function(status, chosenBefore) {},
      onRevokeChoice: function() {},

      // each item defines the inner text for the element that it references
      content: {
        header: 'Cookies used on the website!',
        message: 'This website uses cookies to ensure you get the best experience on our website.',
        dismiss: 'Got it!',
        allow: 'Allow cookies',
        deny: 'Decline',
        link: 'Learn more',
        href: 'http://cookiesandyou.com',
        close: '&#x274c;',
      },

      // This is the HTML for the elements above. The string {{header}} will be replaced with the equivalent text below.
      // You can remove "{{header}}" and write the content directly inside the HTML if you want.
      //
      //  - ARIA rules suggest to ensure controls are tabbable (so the browser can find the first control),
      //    and to set the focus to the first interactive control (http://w3c.github.io/aria-in-html/)
      elements: {
        header: '<span class="cc-header">{{header}}</span>&nbsp;',
        message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
        messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="_blank">{{link}}</a></span>',
        dismiss: '<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
        allow: '<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',
        deny: '<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
        link: '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
        close: '<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>',

        //compliance: compliance is also an element, but it is generated by the application, depending on `type` below
      },

      // The placeholders {{classes}} and {{children}} both get replaced during initialisation:
      //  - {{classes}} is where additional classes get added
      //  - {{children}} is where the HTML children are placed
      window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',

      // This is the html for the revoke button. This only shows up after the user has selected their level of consent
      // It can be enabled of disabled using the `revokable` option
      revokeBtn: '<div class="cc-revoke {{classes}}">Cookie Policy</div>',

      // define types of 'compliance' here. '{{value}}' strings in here are linked to `elements`
      compliance: {
        'info': '<div class="cc-compliance">{{dismiss}}</div>',
        'opt-in': '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
        'opt-out': '<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>',
      },

      // select your type of popup here
      type: 'info', // refers to `compliance` (in other words, the buttons that are displayed)

      // define layout layouts here
      layouts: {
        // the 'block' layout tend to be for square floating popups
        'basic': '{{messagelink}}{{compliance}}',
        'basic-close': '{{messagelink}}{{compliance}}{{close}}',
        'basic-header': '{{header}}{{message}}{{link}}{{compliance}}',

        // add a custom layout here, then add some new css with the class '.cc-layout-my-cool-layout'
        //'my-cool-layout': '<div class="my-special-layout">{{message}}{{compliance}}</div>{{close}}',
      },

      // default layout (see above)
      layout: 'basic',

      // this refers to the popup windows position. we currently support:
      //  - banner positions: top, bottom
      //  - floating positions: top-left, top-right, bottom-left, bottom-right
      //
      // adds a class `cc-floating` or `cc-banner` which helps when styling
      position: 'bottom', // default position is 'bottom'

      // Available styles
      //    -block (default, no extra classes)
      //    -edgeless
      //    -classic
      // use your own style name and use `.cc-theme-STYLENAME` class in CSS to edit.
      // Note: style "wire" is used for the configurator, but has no CSS styles of its own, only palette is used.
      theme: 'block',

      // The popup is `fixed` by default, but if you want it to be static (inline with the page content), set this to false
      // Note: by default, we animate the height of the popup from 0 to full size
      static: false,

      // if you want custom colours, pass them in here. this object should look like this.
      // ideally, any custom colours/themes should be created in a separate style sheet, as this is more efficient.
      //   {
      //     popup: {background: '#000000', text: '#fff', link: '#fff'},
      //     button: {background: 'transparent', border: '#f8e71c', text: '#f8e71c'},
      //     highlight: {background: '#f8e71c', border: '#f8e71c', text: '#000000'},
      //   }
      // `highlight` is optional and extends `button`. if it exists, it will apply to the first button
      // only background needs to be defined for every element. if not set, other colors can be calculated from it
      palette: null,

      // Some countries REQUIRE that a user can change their mind. You can configure this yourself.
      // Most of the time this should be false, but the `cookieconsent.law` can change this to `true` if it detects that it should
      revokable: false,

      // if true, the revokable button will tranlate in and out
      animateRevokable: true,

      // used to disable link on existing layouts
      // replaces element messagelink with message and removes content of link
      showLink: true,

      // set value as scroll range to enable
      dismissOnScroll: false,

      // set value as time in milliseconds to autodismiss after set time
      dismissOnTimeout: false,

      // The application automatically decide whether the popup should open.
      // Set this to false to prevent this from happening and to allow you to control the behaviour yourself
      autoOpen: true,

      // By default the created HTML is automatically appended to the container (which defaults to <body>). You can prevent this behaviour
      // by setting this to false, but if you do, you must attach the `element` yourself, which is a public property of the popup instance:
      //
      //     var instance = cookieconsent.factory(options);
      //     document.body.appendChild(instance.element);
      //
      autoAttach: true,

      // simple whitelist/blacklist for pages. specify page by:
      //   - using a string : '/index.html'           (matches '/index.html' exactly) OR
      //   - using RegExp   : /\/page_[\d]+\.html/    (matched '/page_1.html' and '/page_2.html' etc)
      whitelistPage: [],
      blacklistPage: [],

      // If this is defined, then it is used as the inner html instead of layout. This allows for ultimate customisation.
      // Be sure to use the classes `cc-btn` and `cc-allow`, `cc-deny` or `cc-dismiss`. They enable the app to register click
      // handlers. You can use other pre-existing classes too. See `src/styles` folder.
      overrideHTML: null,
    };

    function CookiePopup() {
      this.initialise.apply(this, arguments);
    }

    CookiePopup.prototype.initialise = function(options) {
      if (this.options) {
        this.destroy(); // already rendered
      }

      // set options back to default options
      util.deepExtend(this.options = {}, defaultOptions);

      // merge in user options
      if (util.isPlainObject(options)) {
        util.deepExtend(this.options, options);
      }

      // returns true if `onComplete` was called
      if (checkCallbackHooks.call(this)) {
        // user has already answered
        this.options.enabled = false;
      }

      // apply blacklist / whitelist
      if (arrayContainsMatches(this.options.blacklistPage, location.pathname)) {
        this.options.enabled = false;
      }
      if (arrayContainsMatches(this.options.whitelistPage, location.pathname)) {
        this.options.enabled = true;
      }

      // the full markup either contains the wrapper or it does not (for multiple instances)
      var cookiePopup = this.options.window
        .replace('{{classes}}', getPopupClasses.call(this).join(' '))
        .replace('{{children}}', getPopupInnerMarkup.call(this));

      // if user passes html, use it instead
      var customHTML = this.options.overrideHTML;
      if (typeof customHTML == 'string' && customHTML.length) {
        cookiePopup = customHTML;
      }

      // if static, we need to grow the element from 0 height so it doesn't jump the page
      // content. we wrap an element around it which will mask the hidden content
      if (this.options.static) {
        // `grower` is a wrapper div with a hidden overflow whose height is animated
        var wrapper = appendMarkup.call(this, '<div class="cc-grower">' + cookiePopup + '</div>');

        wrapper.style.display = ''; // set it to visible (because appendMarkup hides it)
        this.element = wrapper.firstChild; // get the `element` reference from the wrapper
        this.element.style.display = 'none';
        util.addClass(this.element, 'cc-invisible');
      } else {
        this.element = appendMarkup.call(this, cookiePopup);
      }

      applyAutoDismiss.call(this);

      applyRevokeButton.call(this);

      if (this.options.autoOpen) {
        this.autoOpen();
      }
    };

    CookiePopup.prototype.destroy = function() {
      if (this.onButtonClick && this.element) {
        this.element.removeEventListener('click', this.onButtonClick);
        this.onButtonClick = null;
      }

      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout);
        this.dismissTimeout = null;
      }

      if (this.onWindowScroll) {
        window.removeEventListener('scroll', this.onWindowScroll);
        this.onWindowScroll = null;
      }

      if (this.onMouseMove) {
        window.removeEventListener('mousemove', this.onMouseMove);
        this.onMouseMove = null;
      }

      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;

      if (this.revokeBtn && this.revokeBtn.parentNode) {
        this.revokeBtn.parentNode.removeChild(this.revokeBtn);
      }
      this.revokeBtn = null;

      removeCustomStyle(this.options.palette);
      this.options = null;
    };

    CookiePopup.prototype.open = function(callback) {
      if (!this.element) return;

      if (!this.isOpen()) {
        if (cc.hasTransition) {
          this.fadeIn();
        } else {
          this.element.style.display = '';
        }

        if (this.options.revokable) {
          this.toggleRevokeButton();
        }
        this.options.onPopupOpen.call(this);
      }

      return this;
    };

    CookiePopup.prototype.close = function(showRevoke) {
      if (!this.element) return;

      if (this.isOpen()) {
        if (cc.hasTransition) {
          this.fadeOut();
        } else {
          this.element.style.display = 'none';
        }

        if (showRevoke && this.options.revokable) {
          this.toggleRevokeButton(true);
        }
        this.options.onPopupClose.call(this);
      }

      return this;
    };

    CookiePopup.prototype.fadeIn = function() {
      var el = this.element;

      if (!cc.hasTransition || !el)
        return;

      // This should always be called AFTER fadeOut (which is governed by the 'transitionend' event).
      // 'transitionend' isn't all that reliable, so, if we try and fadeIn before 'transitionend' has
      // has a chance to run, then we run it ourselves
      if (this.afterTransition) {
        afterFadeOut.call(this, el)
      }

      if (util.hasClass(el, 'cc-invisible')) {
        el.style.display = '';

        if (this.options.static) {
          var height = this.element.clientHeight;
          this.element.parentNode.style.maxHeight = height + 'px';
        }

        var fadeInTimeout = 20; // (ms) DO NOT MAKE THIS VALUE SMALLER. See below

        // Although most browsers can handle values less than 20ms, it should remain above this value.
        // This is because we are waiting for a "browser redraw" before we remove the 'cc-invisible' class.
        // If the class is remvoed before a redraw could happen, then the fadeIn effect WILL NOT work, and
        // the popup will appear from nothing. Therefore we MUST allow enough time for the browser to do
        // its thing. The actually difference between using 0 and 20 in a set timeout is neglegible anyway
        this.openingTimeout = setTimeout(afterFadeIn.bind(this, el), fadeInTimeout);
      }
    };

    CookiePopup.prototype.fadeOut = function() {
      var el = this.element;

      if (!cc.hasTransition || !el)
        return;

      if (this.openingTimeout) {
        clearTimeout(this.openingTimeout);
        afterFadeIn.bind(this, el);
      }

      if (!util.hasClass(el, 'cc-invisible')) {
        if (this.options.static) {
          this.element.parentNode.style.maxHeight = '';
        }

        this.afterTransition = afterFadeOut.bind(this, el);
        el.addEventListener(cc.transitionEnd, this.afterTransition);

        util.addClass(el, 'cc-invisible');
      }
    };

    CookiePopup.prototype.isOpen = function() {
      return this.element && this.element.style.display == '' && (cc.hasTransition ? !util.hasClass(this.element, 'cc-invisible') : true);
    };

    CookiePopup.prototype.toggleRevokeButton = function(show) {
      if (this.revokeBtn) this.revokeBtn.style.display = show ? '' : 'none';
    };

    CookiePopup.prototype.revokeChoice = function(preventOpen) {
      this.options.enabled = true;
      this.clearStatus();

      this.options.onRevokeChoice.call(this);

      if (!preventOpen) {
        this.autoOpen();
      }
    };

    // returns true if the cookie has a valid value
    CookiePopup.prototype.hasAnswered = function(options) {
      return Object.keys(cc.status).indexOf(this.getStatus()) >= 0;
    };

    // returns true if the cookie indicates that consent has been given
    CookiePopup.prototype.hasConsented = function(options) {
      var val = this.getStatus();
      return val == cc.status.allow || val == cc.status.dismiss;
    };

    // opens the popup if no answer has been given
    CookiePopup.prototype.autoOpen = function(options) {
      !this.hasAnswered() && this.options.enabled && this.open();
    };

    CookiePopup.prototype.setStatus = function(status) {
      var c = this.options.cookie;
      var value = util.getCookie(c.name);
      var chosenBefore = Object.keys(cc.status).indexOf(value) >= 0;

      // if `status` is valid
      if (Object.keys(cc.status).indexOf(status) >= 0) {
        util.setCookie(c.name, status, c.expiryDays, c.domain, c.path);

        this.options.onStatusChange.call(this, status, chosenBefore);
      } else {
        this.clearStatus();
      }
    };

    CookiePopup.prototype.getStatus = function() {
      return util.getCookie(this.options.cookie.name);
    };

    CookiePopup.prototype.clearStatus = function() {
      var c = this.options.cookie;
      util.setCookie(c.name, '', -1, c.domain, c.path);
    };

    // This needs to be called after 'fadeIn'. This is the code that actually causes the fadeIn to work
    // There is a good reason why it's called in a timeout. Read 'fadeIn';
    function afterFadeIn(el) {
      this.openingTimeout = null;
      util.removeClass(el, 'cc-invisible');
    }

    // This is called on 'transitionend' (only on the transition of the fadeOut). That's because after we've faded out, we need to
    // set the display to 'none' (so there aren't annoying invisible popups all over the page). If for whenever reason this function
    // is not called (lack of support), the open/close mechanism will still work.
    function afterFadeOut(el) {
      el.style.display = 'none'; // after close and before open, the display should be none
      el.removeEventListener(cc.transitionEnd, this.afterTransition);
      this.afterTransition = null;
    }

    // this function calls the `onComplete` hook and returns true (if needed) and returns false otherwise
    function checkCallbackHooks() {
      var complete = this.options.onInitialise.bind(this);

      if (!window.navigator.cookieEnabled) {
        complete(cc.status.deny);
        return true;
      }

      if (window.CookiesOK || window.navigator.CookiesOK) {
        complete(cc.status.allow);
        return true;
      }

      var allowed = Object.keys(cc.status);
      var answer = this.getStatus();
      var match = allowed.indexOf(answer) >= 0;

      if (match) {
        complete(answer);
      }
      return match;
    }

    function getPositionClasses() {
      var positions = this.options.position.split('-'); // top, bottom, left, right
      var classes = [];

      // top, left, right, bottom
      positions.forEach(function(cur) {
        classes.push('cc-' + cur);
      });

      return classes;
    }

    function getPopupClasses() {
      var opts = this.options;
      var positionStyle = (opts.position == 'top' || opts.position == 'bottom') ? 'banner' : 'floating';

      if (util.isMobile()) {
        positionStyle = 'floating';
      }

      var classes = [
        'cc-' + positionStyle, // floating or banner
        'cc-type-' + opts.type, // add the compliance type
        'cc-theme-' + opts.theme, // add the theme
      ];

      if (opts.static) {
        classes.push('cc-static');
      }

      classes.push.apply(classes, getPositionClasses.call(this));

      // we only add extra styles if `palette` has been set to a valid value
      var didAttach = attachCustomPalette.call(this, this.options.palette);

      // if we override the palette, add the class that enables this
      if (this.customStyleSelector) {
        classes.push(this.customStyleSelector);
      }

      return classes;
    }

    function getPopupInnerMarkup() {
      var interpolated = {};
      var opts = this.options;

      // removes link if showLink is false
      if (!opts.showLink) {
        opts.elements.link = '';
        opts.elements.messagelink = opts.elements.message;
      }

      Object.keys(opts.elements).forEach(function(prop) {
        interpolated[prop] = util.interpolateString(opts.elements[prop], function(name) {
          var str = opts.content[name];
          return (name && typeof str == 'string' && str.length) ? str : '';
        })
      });

      // checks if the type is valid and defaults to info if it's not
      var complianceType = opts.compliance[opts.type];
      if (!complianceType) {
        complianceType = opts.compliance.info;
      }

      // build the compliance types from the already interpolated `elements`
      interpolated.compliance = util.interpolateString(complianceType, function(name) {
        return interpolated[name];
      });

      // checks if the layout is valid and defaults to basic if it's not
      var layout = opts.layouts[opts.layout];
      if (!layout) {
        layout = opts.layouts.basic;
      }

      return util.interpolateString(layout, function(match) {
        return interpolated[match];
      });
    }

    function appendMarkup(markup) {
      var opts = this.options;
      var div = document.createElement('div');
      var cont = (opts.container && opts.container.nodeType === 1) ? opts.container : document.body;

      div.innerHTML = markup;

      var el = div.children[0];

      el.style.display = 'none';

      if (util.hasClass(el, 'cc-window') && cc.hasTransition) {
        util.addClass(el, 'cc-invisible');
      }

      // save ref to the function handle so we can unbind it later
      this.onButtonClick = handleButtonClick.bind(this);

      el.addEventListener('click', this.onButtonClick);

      if (opts.autoAttach) {
        if (!cont.firstChild) {
          cont.appendChild(el);
        } else {
          cont.insertBefore(el, cont.firstChild)
        }
      }

      return el;
    }

    function handleButtonClick(event) {
      var targ = event.target;
      if (util.hasClass(targ, 'cc-btn')) {

        var matches = targ.className.match(new RegExp("\\bcc-(" + __allowedStatuses.join('|') + ")\\b"));
        var match = (matches && matches[1]) || false;

        if (match) {
          this.setStatus(match);
          this.close(true);
        }
      }
      if (util.hasClass(targ, 'cc-close')) {
        this.setStatus(cc.status.dismiss);
        this.close(true);
      }
      if (util.hasClass(targ, 'cc-revoke')) {
        this.revokeChoice();
      }
    }

    // I might change this function to use inline styles. I originally chose a stylesheet because I could select many elements with a
    // single rule (something that happened a lot), the apps has changed slightly now though, so inline styles might be more applicable.
    function attachCustomPalette(palette) {
      var hash = util.hash(JSON.stringify(palette));
      var selector = 'cc-color-override-' + hash;
      var isValid = util.isPlainObject(palette);

      this.customStyleSelector = isValid ? selector : null;

      if (isValid) {
        addCustomStyle(hash, palette, '.' + selector);
      }
      return isValid;
    }

    function addCustomStyle(hash, palette, prefix) {

      // only add this if a style like it doesn't exist
      if (cc.customStyles[hash]) {
        // custom style already exists, so increment the reference count
        ++cc.customStyles[hash].references;
        return;
      }

      var colorStyles = {};
      var popup = palette.popup;
      var button = palette.button;
      var highlight = palette.highlight;

      // needs background colour, text and link will be set to black/white if not specified
      if (popup) {
        // assumes popup.background is set
        popup.text = popup.text ? popup.text : util.getContrast(popup.background);
        popup.link = popup.link ? popup.link : popup.text;
        colorStyles[prefix + '.cc-window'] = [
          'color: ' + popup.text,
          'background-color: ' + popup.background
        ];
        colorStyles[prefix + '.cc-revoke'] = [
          'color: ' + popup.text,
          'background-color: ' + popup.background
        ];
        colorStyles[prefix + ' .cc-link,' + prefix + ' .cc-link:active,' + prefix + ' .cc-link:visited'] = [
          'color: ' + popup.link
        ];

        if (button) {
          // assumes button.background is set
          button.text = button.text ? button.text : util.getContrast(button.background);
          button.border = button.border ? button.border : 'transparent';
          colorStyles[prefix + ' .cc-btn'] = [
            'color: ' + button.text,
            'border-color: ' + button.border,
            'background-color: ' + button.background
          ];

          if(button.background != 'transparent')
            colorStyles[prefix + ' .cc-btn:hover, ' + prefix + ' .cc-btn:focus'] = [
              'background-color: ' + getHoverColour(button.background)
            ];

          if (highlight) {
            //assumes highlight.background is set
            highlight.text = highlight.text ? highlight.text : util.getContrast(highlight.background);
            highlight.border = highlight.border ? highlight.border : 'transparent';
            colorStyles[prefix + ' .cc-highlight .cc-btn:first-child'] = [
              'color: ' + highlight.text,
              'border-color: ' + highlight.border,
              'background-color: ' + highlight.background
            ];
          } else {
            // sets highlight text color to popup text. background and border are transparent by default.
            colorStyles[prefix + ' .cc-highlight .cc-btn:first-child'] = [
              'color: ' + popup.text
            ];
          }
        }

      }

      // this will be interpretted as CSS. the key is the selector, and each array element is a rule
      var style = document.createElement('style');
      document.head.appendChild(style);

      // custom style doesn't exist, so we create it
      cc.customStyles[hash] = {
        references: 1,
        element: style.sheet
      };

      var ruleIndex = -1;
      for (var prop in colorStyles) {
        if (colorStyles.hasOwnProperty(prop)) {
          style.sheet.insertRule(prop + '{' + colorStyles[prop].join(';') + '}', ++ruleIndex);
        }
      }
    }

    function getHoverColour(hex) {
      hex = util.normaliseHex(hex);
      // for black buttons
      if (hex == '000000') {
        return '#222';
      }
      return util.getLuminance(hex);
    }

    function removeCustomStyle(palette) {
      if (util.isPlainObject(palette)) {
        var hash = util.hash(JSON.stringify(palette));
        var customStyle = cc.customStyles[hash];
        if (customStyle && !--customStyle.references) {
          var styleNode = customStyle.element.ownerNode;
          if (styleNode && styleNode.parentNode) {
            styleNode.parentNode.removeChild(styleNode);
          }
          cc.customStyles[hash] = null;
        }
      }
    }

    function arrayContainsMatches(array, search) {
      for (var i = 0, l = array.length; i < l; ++i) {
        var str = array[i];
        // if regex matches or string is equal, return true
        if ((str instanceof RegExp && str.test(search)) ||
          (typeof str == 'string' && str.length && str === search)) {
          return true;
        }
      }
      return false;
    }

    function applyAutoDismiss() {
      var setStatus = this.setStatus.bind(this);

      var delay = this.options.dismissOnTimeout;
      if (typeof delay == 'number' && delay >= 0) {
        this.dismissTimeout = window.setTimeout(function() {
          setStatus(cc.status.dismiss);
        }, Math.floor(delay));
      }

      var scrollRange = this.options.dismissOnScroll;
      if (typeof scrollRange == 'number' && scrollRange >= 0) {
        var onWindowScroll = function(evt) {
          if (window.pageYOffset > Math.floor(scrollRange)) {
            setStatus(cc.status.dismiss);

            window.removeEventListener('scroll', onWindowScroll);
            this.onWindowScroll = null;
          }
        };

        this.onWindowScroll = onWindowScroll;
        window.addEventListener('scroll', onWindowScroll);
      }
    }

    function applyRevokeButton() {
      // revokable is true if advanced compliance is selected
      if (this.options.type != 'info') this.options.revokable = true;
      // animateRevokable false for mobile devices
      if (util.isMobile()) this.options.animateRevokable = false;

      if (this.options.revokable) {
        var classes = getPositionClasses.call(this);
        if (this.options.animateRevokable) {
          classes.push('cc-animate');
        }
        if (this.customStyleSelector) {
          classes.push(this.customStyleSelector)
        }
        var revokeBtn = this.options.revokeBtn.replace('{{classes}}', classes.join(' '));
        this.revokeBtn = appendMarkup.call(this, revokeBtn);

        var btn = this.revokeBtn;
        if (this.options.animateRevokable) {
          var wait = false;
          var onMouseMove = util.throttle(function(evt) {
            var active = false;
            var minY = 20;
            var maxY = (window.innerHeight - 20);

            if (util.hasClass(btn, 'cc-top') && evt.clientY < minY) active = true;
            if (util.hasClass(btn, 'cc-bottom') && evt.clientY > maxY) active = true;

            if (active) {
              if (!util.hasClass(btn, 'cc-active')) {
                util.addClass(btn, 'cc-active');
              }
            } else {
              if (util.hasClass(btn, 'cc-active')) {
                util.removeClass(btn, 'cc-active');
              }
            }
          }, 200);

          this.onMouseMove = onMouseMove;
          window.addEventListener('mousemove', onMouseMove);
        }
      }
    }

    return CookiePopup
  }());

  cc.Location = (function() {

    // An object containing all the location services we have already set up.
    // When using a service, it could either return a data structure in plain text (like a JSON object) or an executable script
    // When the response needs to be executed by the browser, then `isScript` must be set to true, otherwise it won't work.

    // When the service uses a script, the chances are that you'll have to use the script to make additional requests. In these
    // cases, the services `callback` property is called with a `done` function. When performing async operations, this must be called
    // with the data (or Error), and `cookieconsent.locate` will take care of the rest
    var defaultOptions = {

      // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
      // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
      // app will take `timeout` milliseconds to react to a JSONP network error.
      timeout: 5000,

      // the order that services will be attempted in
      services: [
        'freegeoip',
        'ipinfo',
        'maxmind'

        /*
        // 'ipinfodb' requires some options, so we define it using an object
        // this object will be passed to the function that defines the service
        {
          name: 'ipinfodb',
          interpolateUrl: {
            // obviously, this is a fake key
            api_key: 'vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld'
          },
        },
        // as well as defining an object, you can define a function that returns an object
        function () {
          return {name: 'ipinfodb'};
        },
        */
      ],

      serviceDefinitions: {

        freegeoip: function() {
          return {
            // This service responds with JSON, but they do not have CORS set, so we must use JSONP and provide a callback
            // The `{callback}` is automatically rewritten by the tool
            url: '//freegeoip.net/json/?callback={callback}',
            isScript: true, // this is JSONP, therefore we must set it to run as a script
            callback: function(done, response) {
              try{
                var json = JSON.parse(response);
                return json.error ? toError(json) : {
                  code: json.country_code
                };
              } catch (err) {
                return toError({error: 'Invalid response ('+err+')'});
              }
            }
          }
        },

        ipinfo: function() {
          return {
            // This service responds with JSON, so we simply need to parse it and return the country code
            url: '//ipinfo.io',
            headers: ['Accept: application/json'],
            callback: function(done, response) {
              try{
                var json = JSON.parse(response);
                return json.error ? toError(json) : {
                  code: json.country
                };
              } catch (err) {
                return toError({error: 'Invalid response ('+err+')'});
              }
            }
          }
        },

        // This service requires an option to define `key`. Options are proived using objects or functions
        ipinfodb: function(options) {
          return {
            // This service responds with JSON, so we simply need to parse it and return the country code
            url: '//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}',
            isScript: true, // this is JSONP, therefore we must set it to run as a script
            callback: function(done, response) {
              try{
                var json = JSON.parse(response);
                return json.statusCode == 'ERROR' ? toError({error: json.statusMessage}) : {
                  code: json.countryCode
                };
              } catch (err) {
                return toError({error: 'Invalid response ('+err+')'});
              }
            }
          }
        },

        maxmind: function() {
          return {
            // This service responds with a JavaScript file which defines additional functionality. Once loaded, we must
            // make an additional AJAX call. Therefore we provide a `done` callback that can be called asynchronously
            url: '//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js',
            isScript: true, // this service responds with a JavaScript file, so it must be run as a script
            callback: function(done) {
              // if everything went okay then `geoip2` WILL be defined
              if (!window.geoip2) {
                done(new Error('Unexpected response format. The downloaded script should have exported `geoip2` to the global scope'));
                return;
              }

              geoip2.country(function(location) {
                try {
                  done({
                    code: location.country.iso_code
                  });
                } catch (err) {
                  done(toError(err));
                }
              }, function(err) {
                done(toError(err));
              });

              // We can't return anything, because we need to wait for the second AJAX call to return.
              // Then we can 'complete' the service by passing data or an error to the `done` callback.
            }
          }
        },
      },
    };

    function Location(options) {
      // Set up options
      util.deepExtend(this.options = {}, defaultOptions);

      if (util.isPlainObject(options)) {
        util.deepExtend(this.options, options);
      }

      this.currentServiceIndex = -1; // the index (in options) of the service we're currently using
    }

    Location.prototype.getNextService = function() {
      var service;

      do {
        service = this.getServiceByIdx(++this.currentServiceIndex);
      } while (this.currentServiceIndex < this.options.services.length && !service);

      return service;
    };

    Location.prototype.getServiceByIdx = function(idx) {
      // This can either be the name of a default locationService, or a function.
      var serviceOption = this.options.services[idx];

      // If it's a string, use one of the location services.
      if (typeof serviceOption === 'function') {
        var dynamicOpts = serviceOption();
        if (dynamicOpts.name) {
          util.deepExtend(dynamicOpts, this.options.serviceDefinitions[dynamicOpts.name](dynamicOpts));
        }
        return dynamicOpts;
      }

      // If it's a string, use one of the location services.
      if (typeof serviceOption === 'string') {
        return this.options.serviceDefinitions[serviceOption]();
      }

      // If it's an object, assume {name: 'ipinfo', ...otherOptions}
      // Allows user to pass in API keys etc.
      if (util.isPlainObject(serviceOption)) {
        return this.options.serviceDefinitions[serviceOption.name](serviceOption);
      }

      return null;
    };

    // This runs the service located at index `currentServiceIndex`.
    // If the service fails, `runNextServiceOnError` will continue trying each service until all fail, or one completes successfully
    Location.prototype.locate = function(complete, error) {
      var service = this.getNextService();

      if (!service) {
        error(new Error('No services to run'));
        return;
      }

      this.callbackComplete = complete;
      this.callbackError = error;

      this.runService(service, this.runNextServiceOnError.bind(this));
    };

    // Potentially adds a callback to a url for jsonp.
    Location.prototype.setupUrl = function(service) {
      var serviceOpts = this.getCurrentServiceOpts();
      return service.url.replace(/\{(.*?)\}/g, function(_, param) {
        if (param === 'callback') {
          var tempName = 'callback' + Date.now();
          window[tempName] = function(res) {
            service.__JSONP_DATA = JSON.stringify(res);
          }
          return tempName;
        }
        if (param in serviceOpts.interpolateUrl) {
          return serviceOpts.interpolateUrl[param];
        }
      });
    };

    // requires a `service` object that defines at least a `url` and `callback`
    Location.prototype.runService = function(service, complete) {
      var self = this;

      // basic check to ensure it resembles a `service`
      if (!service || !service.url || !service.callback) {
        return;
      }

      // we call either `getScript` or `makeAsyncRequest` depending on the type of resource
      var requestFunction = service.isScript ? getScript : makeAsyncRequest;

      var url = this.setupUrl(service);

      // both functions have similar signatures so we can pass the same arguments to both
      requestFunction(url, function(xhr) {
        // if `!xhr`, then `getScript` function was used, so there is no response text
        var responseText = xhr ? xhr.responseText : '';

        // if the resource is a script, then this function is called after the script has been run.
        // if the script is JSONP, then a time defined function `callback_{Date.now}` has already
        // been called (as the JSONP callback). This callback sets the __JSONP_DATA property
        if (service.__JSONP_DATA) {
          responseText = service.__JSONP_DATA;
          delete service.__JSONP_DATA;
        }

        // call the service callback with the response text (so it can parse the response)
        self.runServiceCallback.call(self, complete, service, responseText);

      }, this.options.timeout, service.data, service.headers);

      // `service.data` and `service.headers` are optional (they only count if `!service.isScript` anyway)
    };

    // The service request has run (and possibly has a `responseText`) [no `responseText` if `isScript`]
    // We need to run its callback which determines if its successful or not
    // `complete` is called on success or failure
    Location.prototype.runServiceCallback = function(complete, service, responseText) {
      var self = this;
      // this is the function that is called if the service uses the async callback in its handler method
      var serviceResultHandler = function (asyncResult) {
        // if `result` is a valid value, then this function shouldn't really run
        // even if it is called by `service.callback`
        if (!result) {
          self.onServiceResult.call(self, complete, asyncResult)
        }
      };

      // the function `service.callback` will either extract a country code from `responseText` and return it (in `result`)
      // or (if it has to make additional requests) it will call a `done` callback with the country code when it is ready
      var result = service.callback(serviceResultHandler, responseText);

      if (result) {
        this.onServiceResult.call(this, complete, result);
      }
    };

    // This is called with the `result` from `service.callback` regardless of how it provided that result (sync or async).
    // `result` will be whatever is returned from `service.callback`. A service callback should provide an object with data
    Location.prototype.onServiceResult = function(complete, result) {
      // convert result to nodejs style async callback
      if (result instanceof Error || (result && result.error)) {
        complete.call(this, result, null);
      } else {
        complete.call(this, null, result);
      }
    };

    // if `err` is set, the next service handler is called
    // if `err` is null, the `onComplete` handler is called with `data`
    Location.prototype.runNextServiceOnError = function(err, data) {
      if (err) {
        this.logError(err);

        var nextService = this.getNextService();

        if (nextService) {
          this.runService(nextService, this.runNextServiceOnError.bind(this));
        } else {
          this.completeService.call(this, this.callbackError, new Error('All services failed'));
        }
      } else {
        this.completeService.call(this, this.callbackComplete, data);
      }
    };

    Location.prototype.getCurrentServiceOpts = function() {
      var val = this.options.services[this.currentServiceIndex];

      if (typeof val == 'string') {
        return {name: val};
      }

      if (typeof val == 'function') {
        return val();
      }

      if (util.isPlainObject(val)) {
        return val;
      }

      return {};
    };

    // calls the `onComplete` callback after resetting the `currentServiceIndex`
    Location.prototype.completeService = function(fn, data) {
      this.currentServiceIndex = -1;

      fn && fn(data);
    };

    Location.prototype.logError = function (err) {
      var idx = this.currentServiceIndex;
      var service = this.getServiceByIdx(idx);

      console.error('The service[' + idx + '] (' + service.url + ') responded with the following error', err);
    };

    function getScript(url, callback, timeout) {
      var timeoutIdx, s = document.createElement('script');

      s.type = 'text/' + (url.type || 'javascript');
      s.src = url.src || url;
      s.async = false;

      s.onreadystatechange = s.onload = function() {
        // this code handles two scenarios, whether called by onload or onreadystatechange
        var state = s.readyState;

        clearTimeout(timeoutIdx);

        if (!callback.done && (!state || /loaded|complete/.test(state))) {
          callback.done = true;
          callback();
          s.onreadystatechange = s.onload = null;
        }
      };

      document.body.appendChild(s);

      // You can't catch JSONP Errors, because it's handled by the script tag
      // one way is to use a timeout
      timeoutIdx = setTimeout(function () {
        callback.done = true;
        callback();
        s.onreadystatechange = s.onload = null;
      }, timeout);
    }

    function makeAsyncRequest(url, onComplete, timeout, postData, requestHeaders) {
      var xhr = new(window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0');

      xhr.open(postData ? 'POST' : 'GET', url, 1);

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      if (Array.isArray(requestHeaders)) {
        for (var i = 0, l = requestHeaders.length; i < l; ++i) {
          var split = requestHeaders[i].split(':', 2)
          xhr.setRequestHeader(split[0].replace(/^\s+|\s+$/g, ''), split[1].replace(/^\s+|\s+$/g, ''));
        }
      }

      if (typeof onComplete == 'function') {
        xhr.onreadystatechange = function() {
          if (xhr.readyState > 3) {
            onComplete(xhr);
          }
        };
      }

      xhr.send(postData);
    }

    function toError(obj) {
      return new Error('Error [' + (obj.code || 'UNKNOWN') + ']: ' + obj.error);
    }

    return Location;
  }());

  cc.Law = (function() {

    var defaultOptions = {
      // Make this false if you want to disable all regional overrides for settings.
      // If true, options can differ by country, depending on their cookie law.
      // It does not affect hiding the popup for countries that do not have cookie law.
      regionalLaw: true,

      // countries that enforce some version of a cookie law
      hasLaw: ['AT', 'BE', 'BG', 'HR', 'CZ', 'CY', 'DK', 'EE', 'FI', 'FR', 'DE', 'EL', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'GB', 'UK'],

      // countries that say that all cookie consent choices must be revokable (a user must be able too change their mind)
      revokable: ['HR', 'CY', 'DK', 'EE', 'FR', 'DE', 'LV', 'LT', 'NL', 'PT', 'ES'],

      // countries that say that a person can only "consent" if the explicitly click on "I agree".
      // in these countries, consent cannot be implied via a timeout or by scrolling down the page
      explicitAction: ['HR', 'IT', 'ES'],
    };

    function Law(options) {
      this.initialise.apply(this, arguments);
    }

    Law.prototype.initialise = function(options) {
      // set options back to default options
      util.deepExtend(this.options = {}, defaultOptions);

      // merge in user options
      if (util.isPlainObject(options)) {
        util.deepExtend(this.options, options);
      }
    };

    Law.prototype.get = function(countryCode) {
      var opts = this.options;
      return {
        hasLaw: opts.hasLaw.indexOf(countryCode) >= 0,
        revokable: opts.revokable.indexOf(countryCode) >= 0,
        explicitAction: opts.explicitAction.indexOf(countryCode) >= 0,
      };
    };

    Law.prototype.applyLaw = function(options, countryCode) {
      var country = this.get(countryCode);

      if (!country.hasLaw) {
        // The country has no cookie law
        options.enabled = false;
      }

      if (this.options.regionalLaw) {
        if (country.revokable) {
          // We must provide an option to revoke consent at a later time
          options.revokable = true;
        }

        if (country.explicitAction) {
          // The user must explicitly click the consent button
          options.dismissOnScroll = false;
          options.dismissOnTimeout = false;
        }
      }
      return options;
    };

    return Law;
  }());

  // This function initialises the app by combining the use of the Popup, Locator and Law modules
  // You can string together these three modules yourself however you want, by writing a new function.
  cc.initialise = function(options, complete, error) {
    var law = new cc.Law(options.law);

    if (!complete) complete = function() {};
    if (!error) error = function() {};

    cc.getCountryCode(options, function(result) {
      // don't need the law or location options anymore
      delete options.law;
      delete options.location;

      if (result.code) {
        options = law.applyLaw(options, result.code);
      }

      complete(new cc.Popup(options));
    }, function(err) {
      // don't need the law or location options anymore
      delete options.law;
      delete options.location;

      error(err, new cc.Popup(options));
    });
  };

  // This function tries to find your current location. It either grabs it from a hardcoded option in
  // `options.law.countryCode`, or attempts to make a location service request. This function accepts
  // options (which can configure the `law` and `location` modules) and fires a callback with which
  // passes an object `{code: countryCode}` as the first argument (which can have undefined properties)
  cc.getCountryCode = function(options, complete, error) {
    if (options.law && options.law.countryCode) {
      complete({
        code: options.law.countryCode
      });
      return;
    }
    if (options.location) {
      var locator = new cc.Location(options.location);
      locator.locate(function(serviceResult) {
        complete(serviceResult || {});
      }, error);
      return;
    }
    complete({});
  };

  // export utils (no point in hiding them, so we may as well expose them)
  cc.utils = util;

  // prevent this code from being run twice
  cc.hasInitialised = true;

  window.cookieconsent = cc;

}(window.cookieconsent || {}));

// End cookieconsent.js https://cookieconsent.insites.com/
