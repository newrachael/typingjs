export default function Typing(element, txt) {
  let index = 0, container;
  function _CSSStyle() {
    var style = '';
    style += '@keyframes blink{';
    style += '0%{opacity: 0;} 50%{opacity: .5;} 100%{opacity: 1;}';
    style += '}';
    style += '.typingcursor {';
    style += 'color:#888; opacity: 1; -webkit-animation : blink 0.3s infinite; animation : blink 0.3s infinite;  -moz-animation : blink 0.3s infinite; animation-direction : alternate';
    style += '}';
    return style;
  }
  function init() {
    let cursor = document.createElement('span'), cursorStyleString = _CSSStyle(),
        cursorCSS = document.createElement('style');

    cursorCSS.type = 'text/css';
    cursorCSS.innerHTML = cursorStyleString;
    document.getElementsByTagName('head')[0].appendChild(cursorCSS);

    cursor.textContent = '|';
    cursor.classList.add('typingcursor');

    element.insertAdjacentElement('afterend', cursor);

    container = document.createElement('span');
    element.insertAdjacentElement('afterend', container);

  }
  function type() {
    if (index < txt.length) {
      container.textContent += txt[index];
      index++;
      setTimeout(type, 250);
    }
  }
  function start() {
    init();
    type();
  }
  return start();
}
