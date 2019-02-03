const krsplit = function (txt) {
  const _chosung = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];
  const _jungsung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];
  const _jongsung = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ];
  let length = txt.length;
  var result = [];
  for ( var i = 0 ; i < length ; i++ ) {
    var charCode = txt.charCodeAt(i), chosung, jungsung, jongsung;

    // For korean
    if (charCode < 0xAC00 || charCode > 0xD7A3 ) {
      result.push(
        {isKorean:false , value:charCode, order: 0}
      );
    } else {
      charCode = charCode - 0xAC00;
      jongsung = charCode % 28; // 종성
      jungsung = ((charCode - jongsung) / 28 ) % 21; // 중성
      chosung = (((charCode - jongsung) / 28 ) - jungsung ) / 21; // 초성
      result.push(
        {isKorean: true, value: _chosung[chosung], order: 1, index: chosung},
        {isKorean: true, value: _jungsung[jungsung], order: 2, index: jungsung}
      );
      if (_jongsung[jongsung] !== '') {
        result.push({isKorean: true, value: _jongsung[jongsung], order: 3, index: jongsung});
      }
    }
  }
  return result;
}

export default function Typing(element, txt) {
  let index = 0, container, charArray, printedString = '';
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
  function setCharAt(str,index,chr) {
    if(index > str.length-1) { return str };
    return str.substr(0,index) + chr + str.substr(index+1);
  }
  function type() {
    var charCode;
    if (index < charArray.length) {
      if ( !charArray[index].isKorean || charArray[index].order == 1) {
        printedString += String.fromCharCode(charArray[index].value);
      } else {
        if ( charArray[index].order == 2 ) {
          charCode = 44032 + ( charArray[index-1].index  * 588 ) + (charArray[index].index*28);
        } else if ( charArray[index].order == 3 ){
          charCode = 44032 + ( charArray[index-2].index  * 588 ) + (charArray[index-1].index*28) + charArray[index].index;
        }
        printedString = setCharAt(printedString, printedString.length - 1, String.fromCharCode(charCode));
      }
      container.textContent = printedString;
      index++;
      setTimeout(type, 250);
    }
  }
  function start() {
    charArray = krsplit(txt);

    init();
    type();
  }
  return start();
}
