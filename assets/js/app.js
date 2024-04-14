var jsComponent = {};

var app = {
    'createElem' : (tag, classes) => {
        const elem = document.createElement(tag);
        if (classes) {
            if (Array.isArray(classes)) {
                for (i=0; i<classes.length; i++) {
                    elem.classList.add(classes[i])
                }
            } else {
                elem.classList.add(classes)
            }
        }
        return elem;
    },
    'getArrowDown' : () => {
        var _arrowDown = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 5.75L8 10.25L12.5 5.75" stroke="#202020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        _arrowDown = new DOMParser().parseFromString(_arrowDown, 'text/html');
        return _arrowDown.body.firstChild;
    },
    'getArrowRight' : () => {
        var _arrowRight = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        _arrowRight = new DOMParser().parseFromString(_arrowRight, 'text/html');
        return _arrowRight.body.firstChild;
    },
    'getPlusMinus' : () => {
        var _svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="_plus-minus"><path d="M10 4.16669V15.8334" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="vert"></path><path d="M4.16675 10H15.8334" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="hor"></path></svg>';
        _svg = new DOMParser().parseFromString(_svg, 'text/html');
        return _svg.body.firstChild;
    },
    'getSVG' : (svg) => {
        _svg = new DOMParser().parseFromString(svg, 'text/html');
        return _svg.body.firstChild;
    },
    'addSVG' : (svg, position, elem) => {

        if (position === 'before') {
            elem.insertBefore(svg, elem.firstChild);
        }

        if (position === 'after') {
            elem.appendChild(svg);
        }

    },
    'getNthParent' : (elem, n) => {
        return n === 0 ? elem : app.getNthParent(elem.parentNode, n - 1);
    },
    'getSiblings' : (e) => {
        let siblings = [];
        if(!e.parentNode) {
            return siblings;
        }
        let sibling  = e.parentNode.firstChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    },
    'toggleClass' : (elem, classname) => {
        if (elem.classList.contains(classname)) {
            elem.classList.remove(classname);
        } else {
            elem.classList.add(classname);
        }
    },
    'removeSibClass' : (elem, classname) => {
        for (var i=0; i<elem.length; i++) {
            elem[i].classList.remove(classname);
        }
    },
    'transferElement' : (elem, container) => {
        var _widget = document.querySelector(elem);
        var _container = document.querySelector(container);
        if (_widget && _container) _container.insertBefore(_widget, _container.firstChild);
    },
    'dropDown' : (element) => {
        var _dropdown = document.querySelectorAll(element);
        for (var i=0; i<_dropdown.length; i++) {
            var _elem = _dropdown[i];
            var _choice = _elem.children[0];
            _choice.onclick = (e) => {
                app.removeSibClass(_dropdown, '_active');
                var _target = e.currentTarget;
                var _parent = _target.parentElement;
                _parent.classList.contains('_active') ? _parent.classList.remove('_active') : _parent.classList.add('_active');
            }

            var _box = _elem.children[1];
            var _li = _box.children[0].children;
            for (var j=0; j<_li.length; j++) {
                var _child = _li[j].children[0];
                
                _child.onclick = (e) => {
                    var _target = e.currentTarget;
                    app.getNthParent(_target, 4).classList.remove('_active');
                    _target.parentElement.classList.add('_active')
                    var _sibs = app.getSiblings(_target.parentElement);
                    app.removeSibClass(_sibs, '_active');

                    var _node = _target.nodeName;
                    if (_node === 'SPAN') {
                        var _label = _target.innerText;
                        var _choicewrap = app.getNthParent(_target, 3).previousElementSibling;
                        _choicewrap.children[0].innerText = _label;
                    }
                }

                if (_li[j].classList.contains('_active')) {
                    var _label = _li[j].children[0].innerText;
                    _choice.children[0].innerText = _label;
                }

            }
        }

        $('body').click(function() {
            $('._dropdown').removeClass('_active');
        });

        $('._dropdown').click(function(e) {
            e.stopPropagation();
        });

    },
    'accordion' : (elem) => {

        var _widget = document.querySelectorAll(elem);

        for (var _a=0; _a<_widget.length;_a++) {

            var _istoggle = _widget[_a].dataset.toggle;
            var _items = _widget[_a].children;

            for (var i=0; i<_items.length; i++) {
                var _header = _items[i].children[0];
                var _svg = _widget[_a].dataset.icon;
                _svg = new DOMParser().parseFromString(_svg, 'text/html');
                app.addSVG( _svg.body.firstChild, 'after', _header );
                _header.onclick = (e) => {
                    var _parent = e.currentTarget.parentElement;
                    if (_istoggle === "true") {
    
                        var _siblings = app.getSiblings(_parent);
                        app.removeSibClass(_siblings, '_active');
    
                        var _parentClasses = _parent.classList;
                        _parentClasses.contains('_active') ? _parentClasses.remove('_active') : _parentClasses.add('_active');
    
                    } else {
                        app.toggleClass(_parent, '_active');
                    }
                }
            }
            
        }

    },
    'slidetoggle' : (elem) => {
        var _checkbox = document.querySelectorAll(elem);
        for( var i=0; i<_checkbox.length; i++ ) {
            var _input = _checkbox[i];
            var _value = _input.checked;
            var _widgetClass = _value ? ['_true-false-slider', 'active'] : '_true-false-slider';
            var _widget = app.createElem('div', _widgetClass);
            var _wrap = app.createElem('div', 'wrap');
            var _parent = _input.parentElement;
            var _label = _input.previousElementSibling;
            _input.style.display = "none";
            
            _widget.onclick = (e) => {
                var _this = e.currentTarget;
                var _target = _this.children[0].children[0];
                if (_target.checked) {
                    _target.removeAttribute('checked');
                    _this.classList.remove('active')
                } else {
                    _target.setAttribute('checked', 'checked');
                    _this.classList.add('active')
                }
            }
            _wrap.insertBefore(_input, _widget.firstChild);
            _widget.appendChild(_wrap);
            _widget.appendChild(_label);
            _parent.appendChild(_widget);
        }
    },
    'customradio' : (elem) => {
        var _element = document.querySelectorAll(elem);
        for( var i=0; i<_element.length; i++ ) {
            var _radio = _element[i];
            var _value = _radio.checked;
            var _parent = _radio.parentElement;
            var _widgetClass = _value ? ['_cradio', 'active'] : '_cradio';
            var _widget = app.createElem('div', _widgetClass);

            _widget.onclick = (e) => {
                var _name = e.currentTarget.children[0].attributes.name.nodeValue;
                var _radios = document.querySelectorAll('input[type="radio"][name='+_name+']');
                for (var j=0; j<_radios.length;j++) {
                    _radios[j].removeAttribute('checked');
                    _radios[j].parentElement.classList.remove('active');
                }
                e.currentTarget.children[0].setAttribute('checked', 'checked');
                e.currentTarget.classList.add('active');
                console.log(_radios)
            }

            _widget.insertBefore(_radio, _widget.firstChild);
            _parent.insertBefore(_widget, _parent.firstChild)
        }
    },
    'customcheckbox' : (elem) => {
        var _element = document.querySelectorAll(elem);
        for( var i=0; i<_element.length; i++ ) {
            var _iscustom = _element[i].dataset.custom;
            if (_iscustom) {
                var _checkbox = _element[i];
                var _value = _checkbox.checked;
                var _parent = _checkbox.parentElement;
                var _isdisabled = _checkbox.disabled;
                var _widgetClass = _value ? ['_ccheck', 'active'] : '_ccheck';
                var _widget = app.createElem('div', _widgetClass);
                if (_isdisabled) _widget.classList.add('_disabled')
                var _check = app.getSVG('<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>');
                _widget.appendChild(_check);
                if (!_isdisabled) {
                    _widget.onclick = (e) => {
                        var _this = e.currentTarget;
                        var _target = _this.children[0];
                        if (_target.checked) {
                            _target.removeAttribute('checked');
                            _this.classList.remove('active')
                        } else {
                            _target.setAttribute('checked', 'checked');
                            _this.classList.add('active')
                        }
                    }
                }

                _widget.insertBefore(_checkbox, _widget.firstChild);
                _parent.insertBefore(_widget, _parent.firstChild)
            }
        }
    },
    'agreeDisagree' : (elem) => {
        var elements = document.querySelectorAll(elem);
        for (var i=0; i<elements.length; i++) {
            var widget = elements[i];
            var input = widget.children[0];
            var value = input.checked;
            var widgetClass = value ? 'active' : '';
            var checkbox = app.createElem('div', widgetClass);
            var check = app.getSVG('<svg class="check" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>');
            var cross = app.getSVG('<svg class="cross" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="_plus-minus"><path d="M10 4.16669V15.8334" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="vert"></path><path d="M4.16675 10H15.8334" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="hor"></path></svg>');
            checkbox.appendChild(input);
            checkbox.appendChild(check);
            checkbox.appendChild(cross);

            checkbox.onclick = (e) => {
                var _this = e.currentTarget;
                var _target = _this.children[0];
                console.log(_target.checked)
                if (_target.checked) {
                    _target.removeAttribute('checked');
                    _this.classList.remove('active');
                } else {                    
                    _target.setAttribute('checked', 'checked');
                    _this.classList.add('active')
                }
            }

            widget.insertBefore(checkbox, widget.firstChild);
        }
    },
    'multiadd' : (elem) => {
        var _element = document.querySelectorAll(elem);
        for( var i=0; i<_element.length; i++ ) {
            var _trigger = app.createElem('div', '_ma-add');
            var _icon = app.createElem('i');
            var _text = app.createElem('span');
            _text.innerText = _element[i].dataset.addtext;
            _icon.appendChild(app.getPlusMinus());
            _trigger.appendChild(_icon)
            _trigger.appendChild(_text);
            var cntr = 1;
            _trigger.onclick = (e) => {
                cntr++;
                var _refelem = e.currentTarget.previousElementSibling;
                var _elemtoadd = _refelem.getElementsByClassName("_multi-add-element");
                var _elemtoaddHTML = new DOMParser().parseFromString(_elemtoadd[0].outerHTML, "text/html");
                var _parent = _elemtoadd[0].parentElement;
                var _toadd = _elemtoaddHTML.body.firstChild;
                _toadd.dataset.counter =  cntr;
                var _remove = app.createElem('span', '_ma-remove');
                _remove.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5H4.16667H17.5" stroke="#4F51FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5M6.66663 5V3.33333C6.66663 2.89131 6.84222 2.46738 7.15478 2.15482C7.46734 1.84226 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84226 12.8451 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5" stroke="#4F51FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.33337 9.16667V14.1667" stroke="#4F51FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6666 9.16667V14.1667" stroke="#4F51FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> <em>Delete</em>';
                _remove.onclick = (e) => {
                    e.currentTarget.parentElement.remove();
                    cntr--;
                }
                _toadd.appendChild(_remove)
                _parent.appendChild(_toadd);
            }

            _element[i].insertAdjacentElement('afterend', _trigger);
            
        }
    },
    'tabular' : (elem) => {
        var _tabulars = document.querySelectorAll('._tabular');
        if (_tabulars) {
            for( var i=0; i<_tabulars.length; i++ ) {
                var _active = parseInt(_tabulars[i].dataset.active);
                var _tabs = _tabulars[i].children[0];
                var _content = _tabulars[i].children[1];
                _content.children[_active - 1].style.display = 'block';

                var _ul = _tabs.children[0];
                for (var i = 0, len = _ul.children.length; i < len; i++) {
                    (function(index){
                        _ul.children[i].onclick = (e) => {
                            e.currentTarget.classList.add('_active')
                            var _lis = app.getSiblings(e.currentTarget);
                            for (var j=0; j<_lis.length;j++) {
                                _lis[j].classList.remove('_active')
                            }
                            _content.children[index].style.display = 'block';
                            var _siblings = app.getSiblings(_content.children[index]);
                            for (var j=0; j<_siblings.length;j++) {
                                _siblings[j].style.display = 'none';
                            }
                        }    
                    })(i);
                }

            }
        }
    },
    'passwordShowHide' : (element) => {
        var showpassword = document.querySelector(element);
        var showpasssvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.833374 10C0.833374 10 4.16671 3.33333 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C19.1667 10 15.8334 16.6667 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10Z" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        var hidepasssvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1742_8226)"><path d="M14.95 14.95C13.5255 16.0358 11.791 16.6374 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10C1.86995 8.06825 3.30765 6.38051 5.05004 5.05M8.25004 3.53333C8.82365 3.39907 9.41093 3.33195 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C18.6609 10.9463 18.0576 11.8373 17.3667 12.6583M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9552 12.3459C10.6485 12.4826 10.3175 12.556 9.98178 12.562C9.64611 12.5679 9.31268 12.5061 9.00138 12.3804C8.69009 12.2547 8.40731 12.0675 8.16991 11.8301C7.93252 11.5927 7.74537 11.31 7.61963 10.9987C7.4939 10.6874 7.43215 10.3539 7.43807 10.0183C7.44399 9.68258 7.51746 9.35154 7.6541 9.04487C7.79074 8.73821 7.98775 8.46221 8.23337 8.23333" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.833374 0.833344L19.1667 19.1667" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1742_8226"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>';

        if (showpassword) {
            showpassword.innerHTML = showpasssvg;;

            var isClicked = 0;
            showpassword.onclick = (e) => {
                var _this = e.currentTarget;
                var _input = _this.previousElementSibling;
                _this.innerHTML = '';
                _this.innerHTML = isClicked ? showpasssvg : hidepasssvg;
                _input.attributes.type.nodeValue = isClicked ? 'password' : 'text';
                isClicked ? isClicked = 0 : isClicked = 1;
            }
        }

    },
    'packageListItems' : (elem) => {
        var _items = document.querySelectorAll(elem + ' ._accordion-body > ul li > span');
        if (_items.length) {
            for (var i=0; i<_items.length; i++) {
                app.addSVG( app.getArrowRight(), 'before', _items[i] );
                _items[i].onclick = (e) => {
                    app.toggleClass(e.currentTarget.parentElement, '_active')
                }
            }

            var _headers = document.querySelectorAll(elem + ' ._accordion-header h6');
            for (var i=0; i<_headers.length; i++) {
                var _svg = _headers[i].dataset.icon;
                _svg = new DOMParser().parseFromString(_svg, 'text/html');
                if (_svg.body.firstChild.nodeName === 'svg') {
                    app.addSVG( _svg.body.firstChild, 'before', _headers[i] );
                    _headers[i].removeAttribute('data-icon')
                }
            }

            var _sort = document.querySelector('._sort');
            _sort.onclick = (e) => {
                var _mainParent = app.getNthParent(e.currentTarget, 3);
                if (_mainParent.classList.contains('_sort-desc')) {
                    _mainParent.classList.remove('_sort-desc')
                    _mainParent.classList.add('_sort-asc')
                } else {
                    _mainParent.classList.add('_sort-desc')
                    _mainParent.classList.remove('_sort-asc')
                }
            }
        }
    },
    'showhideFilters' : (elem) => {
        var _trigger = document.querySelector(elem);
        if (_trigger) {
            var _showsvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.833374 10C0.833374 10 4.16671 3.33333 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C19.1667 10 15.8334 16.6667 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10Z" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            var _hidesvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1742_8226)"><path d="M14.95 14.95C13.5255 16.0358 11.791 16.6374 10 16.6667C4.16671 16.6667 0.833374 10 0.833374 10C1.86995 8.06825 3.30765 6.38051 5.05004 5.05M8.25004 3.53333C8.82365 3.39907 9.41093 3.33195 10 3.33333C15.8334 3.33333 19.1667 10 19.1667 10C18.6609 10.9463 18.0576 11.8373 17.3667 12.6583M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9552 12.3459C10.6485 12.4826 10.3175 12.556 9.98178 12.562C9.64611 12.5679 9.31268 12.5061 9.00138 12.3804C8.69009 12.2547 8.40731 12.0675 8.16991 11.8301C7.93252 11.5927 7.74537 11.31 7.61963 10.9987C7.4939 10.6874 7.43215 10.3539 7.43807 10.0183C7.44399 9.68258 7.51746 9.35154 7.6541 9.04487C7.79074 8.73821 7.98775 8.46221 8.23337 8.23333" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.833374 0.833344L19.1667 19.1667" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1742_8226"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>';
            app.addSVG(app.getSVG(_showsvg), 'before', _trigger);
            _trigger.onclick = (e) => {
                var _parent = app.getNthParent(e.currentTarget, 4);
                var _text = e.currentTarget.innerText;
                e.currentTarget.children[0].remove();
                e.currentTarget.innerText = _text == "Show Advanced Filters" ? 'Hide Advanced Filters' : 'Show Advanced Filters';
                if (_parent.classList.contains('_active')) {
                    _parent.classList.remove('_active');
                    app.addSVG(app.getSVG(_showsvg), 'before', e.currentTarget);
                } else {
                    _parent.classList.add('_active');
                    app.addSVG(app.getSVG(_hidesvg), 'before', e.currentTarget);
                }
            }
        }
    },
    'init' : () => {
        app.dropDown('._dropdown');
        app.accordion('._accordion');
        app.slidetoggle('._slide-toggle');
        app.customradio('input[type="radio"]');
        app.customcheckbox('input[type="checkbox"]:not(._slide-toggle)');
        app.multiadd('._multi-add');
        app.tabular('._tabular');
        app.passwordShowHide('.show__password');
        app.packageListItems('sidebar ._package-list');
        app.showhideFilters('._show-advanced-filters');
        app.agreeDisagree('._agree-disagree');
    }
}

app.init();

jsComponent = app;

$( ".datepicker" ).datepicker();