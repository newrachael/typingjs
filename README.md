# typingjs
Javascript typing effect / animation library
한글 타이핑(초성,중성,종성별)을 구현한 자바스크립트 라이브러리 입니다.

## usage
#### react
~~~~
import typing from './Typing.js'

componentDidMount() {
    //select dom object
    const myElement = document.querySelector('#myElement');
    typing(myElement,"안녕하세요.");
}

render() {
    return(<div id="myElement"></div>);
}
~~~~
