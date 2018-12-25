import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class KeyInput extends Component{
    
    componentDidMount() {
        let dom = ReactDOM.findDOMNode(this)
        dom.addEventListener('keydown', e=>{
            this.props.store.dispatch({
                type:'KEYDOWN',
                key:e.key,
                keyCode:e.which || e.keyCode
            })
        })
        dom.addEventListener('keyup', e=>{
            this.props.store.dispatch({
                type:'KEYUP',
                key: e.key,
                keyCode: e.which || e.keyCode
            })
        })
    }

    render(){
        let builder = this.props.simpleDrumNotationBuilder
        let notation = builder.notation.map(tempo=>tempo.toString(2)+" ")
        let i = builder.index
        return(            
            <div className="input" tabIndex="0">
                [ {[notation.slice(0,i),
                <span className='index'>{notation[i]}</span>,
                ...notation.slice(i+1)]} ]
            </div>
        )
    }
  
}

export default KeyInput;
