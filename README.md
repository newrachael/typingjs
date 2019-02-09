# typingjs
Javascript typing effect / animation library
한글 타이핑(초성,중성,종성별)을 구현한 자바스크립트 라이브러리 입니다.

## usage
#### react
~~~~javascript
import typing from './Typing.js'

componentDidMount() {
    //select dom object
    const myElement = document.querySelector('#myElement');
    typing(myElement,{txt: "안녕하세요. 환영합니다!", delayedStart: 200});
}

render() {
    return(<div id="myElement"></div>);
}
~~~~

#### Options
~~~~
delayedStart: Time before typing starts, default value is 250 ms

showCursor: show Cursor( if you set "false", cursor does not show ), default value is true

txt: Typing text

typeSpeed: Typing speed, Input time interval between characters, default value is 250ms
~~~~
