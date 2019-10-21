import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';

import OneSmallElement from './OneSmallElement.js';
import columnsMap from './columnsMap.js';

@connect(
    ({bigtable})=>({
        ...bigtable
    })
)
export default class modalInner extends Component {
    constructor (props) {
        super();
        let beixuanArr = _.difference(Object.keys(columnsMap), props.columnsArr);
        this.state = {
            columnsArr:props.columnsArr.slice(),
            beixuanArr:beixuanArr
        };
    }

    deloneitem (english) {
        console.log(this.state.columnsArr);
        this.setState({
            columnsArr:this.state.columnsArr.filter(item=>item !== english),
            beixuanArr:[...this.state.beixuanArr, english]
        });
    }
    render () {
        return (
            <div>
                <p>当前显示的列(可以拖动改变位置):</p>
                <div className="onesmallelementbox">
                    {
                        this.state.columnsArr.map((item, i) => {
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(columnsArr)=>{
                                        this.setState({
                                            columnsArr
                                        });
                                    }}
                                    items={this.state.columnsArr}
                                    sortId={i}
                                    english={item}
                                    chinese={columnsMap[item].title}
                                    other={{
                                        deloneitem:this.deloneitem.bind(this)
                                    }}
                                >
                                    {item}
                                </OneSmallElement>
                            );
                        })
                    }
                </div>
                <p>备选列:</p>
                <div className='beixuanbox'>
                    {
                        this.state.beixuanArr.map((item, i) => <span key={i}>
                            {columnsMap[item].title}
                            <b onClick={()=>{
                                this.setState({
                                    beixuanArr:this.state.beixuanArr.filter(_item=>_item !== item),
                                    columnsArr:[...this.state.columnsArr, item]
                                });
                            }}><Icon type='plus' /></b>
                        </span>)
                    }
                </div>

                <div className="clearbox"></div>

                <div className='btnbox'>
                    <Button onClick={()=>{
                        this.props.cancelHandler(this.state.columnsArr);
                    }}>取消</Button>
                    <Button onClick={()=>{
                        this.props.okHandler(this.state.columnsArr);
                    }}>确定</Button>
                    <div className="clearbox"></div>
                </div>
            </div>
        );
    }
}
