import React, {Component} from 'react';
import OneSmallElement from './OneSmallElement.js';

export default class modalInner extends Component {
    constructor () {
        super();
        this.state = {
            arr:['A', 'B', 'C', 'D', 'E', 'F']
        };
    }
    render () {
        return (
            <div>
                <p>当前显示的列(可以拖动改变位置):</p>
                <div className="onesmallelementbox">
                    {
                        this.state.arr.map((item, i) => {
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(arr)=>{
                                        this.setState({
                                            arr
                                        });
                                    }}
                                    items={this.state.arr}
                                    sortId={i}
                                >
                                    {item}
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <p>备选列:</p>
                <div className='beixuanbox'>
                    <span>发动机<b>+</b></span>
                    <span>公里数<b>+</b></span>
                    <span>价格<b>+</b></span>
                    <span>燃料<b>+</b></span>
                    <span>排放<b>+</b></span>
                </div>
            </div>
        );
    }
}
