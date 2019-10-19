import React, {Component} from 'react';
import {sortable} from 'react-sortable';
import {Icon} from 'antd';

@sortable
export default class OneSmallElement extends Component {
    render () {
        return (
            <div className='onesmallelement' {...this.props}>
                小元素{this.props.children}
                <b><Icon type="close" /></b>
            </div>
        );
    }
}
