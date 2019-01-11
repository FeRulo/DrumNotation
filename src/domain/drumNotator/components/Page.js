import React, { Component } from 'react';
import Letter from './Letter'

class Page extends Component{
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

export default Page;
