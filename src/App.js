import './App.css';
import react from 'react';
import React from 'react';
import * as calculate from './calculate.js';

class Butt extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <button onClick={() => this.props.handleClick(this.props.number)}  className={this.props.class} id={this.props.number}>{this.props.number}</button>
      </div>
    )
  }
}

class LiveNumbers extends react.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='display-row'>
        <p>{this.props.numbers}</p>
      </div>     
    )
  }
}

class App extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      equationArr : [],
      equation : '',
      numbersArr : [],
      numbersArrBack : [],
      number : '',
      equalBoolean : false
    }
    this.addNumber = this.addNumber.bind(this);
    this.equation = this.equation.bind(this);
    this.equalBegin = this.equalBegin.bind(this);
    this.clear = this.clear.bind(this);
    this.deleting = this.deleting.bind(this);
  }

  addNumber(val){
    console.log('addNumber: equationArr= ' + this.state.equationArr)
    if (this.state.equationArr[0] !== 'new') {

      this.setState({
        numbersArr : [...this.state.numbersArr,val],
        numbersArrBack : [...this.state.numbersArr, val]
      });
      this.setState(state => ({
        number : state.number + val
      }));

    }
    else {
      this.setState({
        numbersArr : [val],
        numbersArrBack : [val],
        number : val,
        equationArr : [],
        equation : ''
      })
    }
    document.getElementById('D').disabled = false;
  }

  equation(val){
    console.log('Before putting into equationArr: ' + this.state.number);
  
    this.setState({
      equationArr : this.state.equationArr.filter(i => i !== 'new')
    })

    if (this.state.number == '') {
      this.setState({
        number : 0
      })
    }

    this.setState(state => ({
      equationArr : [...state.equationArr, state.number, val]
    }));
    this.setState(state => ({
      equation : state.equationArr.join(' ')
    }));
  
    this.setState({number : '', numbersArr : []});
    
  }

  equalBegin () {
    this.setState({
      equationArr : [...this.state.equationArr, this.state.number],
      equation : [...this.state.equationArr, this.state.number].join(' '),
      equalBoolean : !this.state.equalBoolean
    });
    document.getElementById('D').disabled = true;
    console.log('Equation at beginning of equal: ' + this.state.eqationArr)
    console.log('This should only be seen once')
  }

  clear () {
    this.setState({
      equationArr : [],
      equation : '',
      numbersArr : [],
      number : '',  
    });
  }

  deleting () {
    let regexOp = /[0-9]/g
    if (this.state.numbersArr.length > 0) {
      console.log('Deleting number');
      this.setState({
        numbersArr : this.state.numbersArr.slice(0, -1)
      })
      this.setState(state => ({
        number : state.numbersArr.join(' ')
      }))
    }
    else if(!regexOp.test(this.state.equationArr[this.state.equationArr.length-1])) {
      console.log('Deleting operator');
      this.setState({
        equationArr : this.state.equationArr.slice(0, -2),
        numbersArr : this.state.numbersArrBack
      })
      this.setState(state =>({
        equation : state.equationArr.join(' '),
        number : state.numbersArr.join(' ')
      }))
    }
    else {
      console.log('Nothing to delete');
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log('Number: ' + this.state.number + ' NumbersArr: ' + this.state.numbersArr + ' Equation: ' + this.state.equation + ' EquationArr: ' + this.state.equationArr);
    if (this.state.equalBoolean !== prevState.equalBoolean){
      let answer = calculate.calc(this.state.equationArr);
      this.setState({
        number : answer,
        numbersArr : answer,
        numbersArrBack : answer,
        equationArr : ['new']
      })
    } 
  }

  render () {
    return(
      <div className='App'>
        <div className='display'>
          <LiveNumbers numbers={this.state.equation}/>
          <LiveNumbers numbers={this.state.number}/>
        </div>
        <div className='buttons'>
          <div className='row'>
          <Butt handleClick={this.equation} number={'+'}/>
          <Butt handleClick={this.equation} number={'-'}/>
          <Butt handleClick={this.equation} number={'X'}/>
          <Butt handleClick={this.equation} number={'÷'}/>
          </div>
          <div className='row'>
          <Butt handleClick={this.addNumber} number={1}/>
          <Butt handleClick={this.addNumber} number={2}/>
          <Butt handleClick={this.addNumber} number={3}/>
          <Butt handleClick={this.equation} number={'^'}/>
          </div>
          <div className='row'>
          <Butt handleClick={this.addNumber} number={4}/>
          <Butt handleClick={this.addNumber} number={5}/>
          <Butt handleClick={this.addNumber} number={6}/>
          <Butt handleClick={this.equation} number={'√'}/>
          </div>
          <div className='row'>
          <Butt handleClick={this.addNumber} number={4}/>
          <Butt handleClick={this.addNumber} number={5}/>
          <Butt handleClick={this.addNumber} number={6}/>
          <Butt handleClick={this.addNumber} number={0}/>
          </div>
          <div className='row'>
          <Butt handleClick={this.clear} number={'AC'} class={'red'}/>
          <Butt handleClick={this.deleting} number={'D'} class={'red'}/>
          <Butt handleClick={this.equalBegin} number={'='}/>
          <Butt handleClick={this.addNumber} number={'.'}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
