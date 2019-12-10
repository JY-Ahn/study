import React from 'react';
import ReactDOM from 'react-dom';

let students = [
    { name : 'junyong', nation : 'korea'},
    { name : 'Kounmbo', nation : 'Greece'},
    { name : 'Alex', nation : 'America'},
    { name : 'Jordan', nation : 'Japan'},
    { name : 'curry', nation : 'America'}
];
class StudentIdentity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Hovered: true
        }
    }
    onHover(){

        console.log(this.state.Hovered) 
        this.setState({
            Hovered: !this.state.Hovered
        })
    }
    render(){
        const style = {
            fontWeight : this.state.Hovered ? 'bold' : 'normal',
            backgroundColor : this.state.Hovered ? 'yellow' :'blue'
        }
        return (
        <div style = {style} onMouseOver = {this.onHover.bind(this)}>
            <ul>
                <li>name: {this.props.personal.name}</li>
                <li>nation: {this.props.personal.nation}</li>
            </ul>
        </div>
        )
    }
}
// ES2015는 지정되지 않은 경우 기본 클래스 생성자를 제공합니다.
// 따라서 다음 예제와 같이 빈 생성자 또는 단순히 부모 클래스에 위임하는 생성자를 제공 할 필요가 없습니다.
class StudentList extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }
    render(){
        return (
            this.props.list.map( student =>
                <StudentIdentity personal = {student}/>
                )
        )
    }
}
class APP extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <StudentList list = {students} />
            </div>
        )
    }
}
ReactDOM.render(
    <APP />,
    document.getElementById('root')
)