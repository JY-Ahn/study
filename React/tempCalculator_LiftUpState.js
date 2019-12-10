import React from 'react';
import ReactDOM from 'react-dom';

function BoilingVerdict(props){
    if(props.celsius >= 100){
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil</p>
}
class Calculator extends React.Component{
    constructor(props){
        super(props);
        // class 의 메서드들은 this 바인딩이 자동으로 되지 않기 때문에 직접 해줘야 한다.
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.state = {
            temperature :'',
            scale : 'c'
        }
    }
    // 이벤트 핸들러 함수는 클래스 안에 작성한다
    handleCelsiusChange(temperature){
        this.setState({scale: 'c', temperature: temperature});
    }
    handleFahrenheitChange(temperature){
        this.setState({scale: 'f', temperature: temperature});
    }

    render(){
        // 컴포넌트의 스케일과 온도 저장
        // 비동기로 이루어질 수 있어서 this를 사용하나?
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) :temperature;
        return (
            <div>
                {/* scale, temperature, function */}
                {/* 
                onTemperatureChange 는 자식 컴포넌트의 state 를 부모 컴포넌트로 끌어올리기 위해서
                props로 함수를 전달해주는 행위이다.
                
                자식 컴포넌트는 전달 받은 props의 함수를 이용하여 부모 혹은 형제 컴포넌트와 통신한다.
                 */}
                <TemperatureInput
                    scale = 'c'
                    temperature = {celsius}
                    onTemperatureChange = {this.handleCelsiusChange}/>
                <TemperatureInput
                    scale = 'f'
                    temperature = {fahrenheit}
                    onTemperatureChange = {this.handleFahrenheitChange}/>
                <BoilingVerdict
                    celsius = {parseFloat(celsius)}/>
            </div>
        )
    }
}
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.state = { temperature : '' };
    }
    handleChange(e){
        // this.setState({ temperature : e.target.value });
        // Lifting State Up
        this.props.onTemperatureChange(e.target.value);
    }
    render(){
        // 데이터를 부모 컴포넌트로 끌어 올리기 위해 수정
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value = {temperature} onChange = {this.handleChange} />
            </fieldset>
        )
    }
}

function toCelsius (fahrenheit){
    return (fahrenheit - 32) * 5 / 9 ;
}
function toFahrenheit(celsius){
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output*1000) / 1000;
    return rounded.toString();
}


ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
)
// nested의 개념
// HelloWorld는 다른 JSX안에 nested되거나 위로 nest를 할 수 있다는 개념