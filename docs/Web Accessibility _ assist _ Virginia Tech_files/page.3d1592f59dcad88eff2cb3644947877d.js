(function (window, undefined) {

    // this is dependency free

    window.Granite = window.Granite || {};
    window.Granite.author = window.Granite.author || {};

    // undocumented extension point
    window.Granite.author.command = window.Granite.author.command || {};

    // fix for location.origin (IE)
    window.location.origin = (window.location.origin ?
        window.location.origin :
        window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''));

    var self = window.Granite.author; // shortcut

    function sanitize(code) {
        try {
            eval(code);
        } catch (ex) {
            console.error(ex);
        }
    }

    function loadScript(scriptNode) {
        var newScript;

        if (scriptNode.parentNode) { // we need a parent for this
            newScript = document.createElement('script');
            newScript.setAttribute('src', scriptNode.src);

            // copy other prop
            newScript.setAttribute('type', scriptNode.getAttribute('type') || '');
            newScript.setAttribute('charset', scriptNode.getAttribute('charset') || '');
            newScript.setAttribute('onload', scriptNode.getAttribute('onload') || '');
            newScript.setAttribute('async', scriptNode.getAttribute('async') || false);
            newScript.setAttribute('defer', scriptNode.getAttribute('defer') || false);

            scriptNode.parentNode.replaceChild(newScript, scriptNode);
        }
    }

    function receiveMessage(event) {
        // Don't accept messages from other sources!
        // Twitter, for instances, broadcasts __ready__, which throws when trying to JSON.parse it.
        if (event.origin !== location.origin) {
            return;
        }

        var data = JSON.parse(event.data);

        if (data.cqauthor) { // just accept cq messages
            if (self.command[data.cmd]) { // command existing
                if (self.command[data.cmd].call(window, data.path, data) !== false) {
                    self.informSender(data.cqauthor, data.path, 'success', data.cmd);
                }
            }
        }
    }

    function manipulationEnd() {
        var elem = window;

        if ('createEvent' in document) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('resize', false, true);
            elem.dispatchEvent(evt);
        }
        else {
            elem.fireEvent('onresize');
        }
    }

    window.addEventListener('message', receiveMessage, false);

    /**
     * get config node for path <cq/>
     * @param path
     * @returns {*}
     */
    self.getEditableConfigNode = function (path) {
        var node = document.querySelectorAll('cq[data-path="' + path + '"]');
        return node.length ? node[0] : null;
    };

    /**
     * get the actual component node
     *
     * @param path
     * @returns {*}
     */
    self.getEditableNode = function (path) {
        var node = self.getEditableConfigNode(path);
        return node ? node.parentNode : null;
    };

    /**
     *
     * @param html
     * @returns {*}
     */
    self.htmlToNode = function (html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        return wrapper.firstElementChild;
    };


    /**
     *
     * @param html
     * @returns {*}
     */
    self.htmlToNodeArray = function (html) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        var newNodes = [],
            kids = wrapper.childNodes;

        // iterate over childNodes and pick only Elements and Comments
        for (var i=0; i < kids.length; i++) {
            if (kids[i].nodeType === 1 || kids[i] === 8) {  // use numbers because IE8 does not expose Node constants
                newNodes.push(kids[i]);
            }
        }

        return newNodes;
    };

    /**
     * execute the scripts in a node
     * @param node
     */
    self.executeScript = function (node) {
        if (node.nodeName === "SCRIPT") {
            sanitize(node.innerHTML);
        } else {
            var arr = node.getElementsByTagName('script');
            for (var n = 0; n < arr.length; n++) {
                if (arr[n].src && arr[n].src.length) { // external script
                    loadScript(arr[n]);
                } else { // inline script
                    sanitize(arr[n].innerHTML);
                }
            }
        }
    };

    /**
     * Allows to respond to the calling frame
     * Make sure you transport the proper message nr and
     * that your function returns false so that the default response is cancelled
     *
     * @param path
     * @param cmd
     * @param data
     */
    self.informSender = function (msgno, path, command, data) {
        var msg = JSON.stringify({
            'cqauthor': msgno, // indicate a cq authoring command
            'cmd': command,
            'path': path,
            'data': data
        });

        if (window.parent) {
            window.parent.postMessage(msg, '*');
        }
    };

    /**
     *
     * @param path
     * @param data
     */
    self.command['delete'] = function (path) {
        var node = self.getEditableNode(path),
            parent = node ? node.parentNode : null;

        if (parent) {
            parent.removeChild(node);
            manipulationEnd();
        }
    };

    /**
     *
     * @param path
     * @param msg
     */
    self.command['replace'] = function (path, msg) {
        var node = self.getEditableNode(path),
            parent = node ? node.parentNode : null,
            newNode = self.htmlToNode(msg.data);

        if (parent) {
            parent.replaceChild(newNode, node);
            self.executeScript(newNode);
            manipulationEnd();
        }
    };

    /**
     *
     * @param path
     * @param msg
     */
    self.command['replaceContent'] = function (path, msg) {
        var editableNode = self.getEditableNode(path),
            parent = editableNode ? editableNode.parentNode : null,
            contentNodes = self.htmlToNodeArray(msg.data),
            cfgNode = self.getEditableConfigNode(path);

        // save cfg node to append later
        cfgNode = editableNode.removeChild(cfgNode);

        // clean the rest of the inner Content
        editableNode.innerHTML = '';

        if (parent) {
            // append new content
            for (var i=0; i < contentNodes.length; i++) {
                var newNode = contentNodes[i];
                editableNode.appendChild(newNode);
                self.executeScript(newNode);
            }
            // append cfg node
            editableNode.appendChild(cfgNode);
            manipulationEnd();
        }
    };

    /**
     *
     * @param path
     * @param msg
     */
    self.command['insertBefore'] = function (path, msg) {
        var node = self.getEditableNode(path),
            parent = node ? node.parentNode : null,
            newNode = self.htmlToNode(msg.data);

        if (parent) {
            newNode = parent.insertBefore(newNode, node);
            self.executeScript(newNode);
            manipulationEnd();
        }
    };

    /**
     *
     * @param path
     * @param msg
     */
    self.command['insertAfter'] = function (path, msg) {
        var node = self.getEditableNode(path),
            nextNode = node.nextSibling,
            parent = node ? node.parentNode : null,
            newNode = self.htmlToNode(msg.data);

        if (parent && nextNode) {
            newNode = parent.insertBefore(newNode, nextNode);
            self.executeScript(newNode);
            manipulationEnd();
        } else {

        }
    };

    /**
     *
     * @param path
     * @param msg
     */
    self.command['insertLast'] = function (path, msg) {
        var node = self.getEditableNode(path),
            newNode = self.htmlToNode(msg.data);

        if (node) {
            newNode = node.appendChild(newNode);
            self.executeScript(newNode);
            manipulationEnd();
        }
    };

    var emulator;

    /**
     * emulate a device
     * @param path is ignored
     * @param config device configuration to emulate
     */
    self.command['emulate'] = function (path, msg) {
        var cfg = msg.data,
            w = cfg.width;

        if (!emulator) {
            emulator = new Granite.author.MediaEmulator(document);
        }

        if (cfg.rotated) {
            cfg.width = cfg.height;
            cfg.height = w;
        }

        cfg = emulator.prepareDevice(cfg);

        emulator.applyDevice(cfg);

        self.informSender(msg.cqauthor, path, 'success', cfg);

        return false; // block default inform response
    };

    /**
     *
     * restores the rendering to the native representation
     */
    self.command['resetEmulate'] = function () {

        if (!emulator) {
            emulator = new Granite.author.MediaEmulator(document);
        }

        emulator.restore();
    };

    /**
     * Toggles a class in the document
     * @param path ignored
     * @param msg {Object}
     * @param msg.className {String} css class to be applied/removed
     * @param [msg.condition] {Boolean} force a condition
     * @param [msg.selector] {String} selector string for a target element,
     *          if the selector returns multiple elements, just the first one will be used
     *          if not passed the document.documentElement will be used
     */
    self.command['toggleClass'] = function (path, msg) {

        var cmd = msg.data,
            target, appendClass, hasClass;

        if (path) {
            target = self.getEditableNode(path);
        } else {
            target =  cmd.selector ? document.querySelectorAll(cmd.selector)[0] : document.documentElement;
        }


        if (target) {
            hasClass = target.className.indexOf(cmd.className) !== -1;

            appendClass = cmd.condition === false ? false :
                cmd.condition === true ? true :
                    hasClass ? false : true;

            if (appendClass && !hasClass) {
                target.className += ' ' + cmd.className;
            } else if (!appendClass && hasClass) {
                target.className = target.className.replace(cmd.className, '');
            }
        }
    };

}(this));
