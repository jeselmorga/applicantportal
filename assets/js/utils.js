var arrowDownSVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 5.75L8 10.25L12.5 5.75" stroke="#202020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const getDownArrow = () => {
    var _arrowDown = arrowDownSVG;
    _arrowDown = new DOMParser().parseFromString(_arrowDown, 'text/html');
    return _arrowDown.body.firstChild;
};

var arrowWTailRightSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path xmlns="http://www.w3.org/2000/svg" d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5L19 12L12 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const getRightArrowWTail = () => {
    var _arrowWTailRight = arrowWTailRightSVG;
    _arrowWTailRight = new DOMParser().parseFromString(_arrowWTailRight, 'text/html');
    return _arrowWTailRight.body.firstChild;
};

const createElem = (tag, classes) => {
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
};

const getSiblings = function (e) {
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
};

const getNthParent = (elem, n) => {
    return n === 0 ? elem : getNthParent(elem.parentNode, n - 1);
};