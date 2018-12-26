import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Letter from './Letter'

class KeyInput extends Component{
    
    componentDidMount() {
        let dom = ReactDOM.findDOMNode(this)
        dom.addEventListener('keydown', e=>{
            this.props.store.dispatch({
                type:'KEYDOWN',
                key:e.key,
                keyCode:e.which || e.keyCode,
                keyMap: this.props.keyMap
            })
        })
        dom.addEventListener('keyup', e=>{
            this.props.store.dispatch({
                type:'KEYUP',
                key: e.key,
                keyCode: e.which || e.keyCode,
                keyMap: this.props.keyMap
            })
        })
    }

    render(){
        let builder = this.props.simpleDrumNotationBuilder
        let notation = builder.notation
            .map((tempo,key)=><Letter notation={tempo} key={key}/>).reverse()
        let i = notation.length - 1 - builder.index
        return(            
            <div className="input" tabIndex="0">
                {[
                    notation.slice(0,i),
                    <span className='index'key={`index ${i}`}>{notation[i]}</span>,
                    ...notation.slice(i+1)
                ]}
            </div>
        )
    }
  
}

export default KeyInput;
