import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import columnsMap from './columnsMap.js';
import './bigtable.less';
import ModalInner from './ModalInner.js';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor () {
        super();
        this.state = {
            isShowModal:false
        };
    }
    componentWillMount () {
        //组件即将上树
        this.props.dispatch({'type':'bigtable/GETCOLUMNSFROMLOCALSTORAGE'});
    }
    render () {
        return (
            <div>
                <Modal
                    title='调整列表'
                    visible = {this.state.isShowModal}
                    onCancel = {() => {
                        this.setState({
                            isShowModal:false
                        });
                    }}
                >
                    <ModalInner />
                </Modal>

                <div className="button_box">
                    <Button className="btn"
                        type='primary'
                        shape='circle'
                        icon='setting'
                        onClick={()=>{
                            this.setState({
                                isShowModal:true
                            });
                        }}></Button>
                </div>
                <Table
                    columns={
                        this.props.columnsArr.map(str => ({
                            'key':str,
                            'dataIndex':str,
                            ...columnsMap[str]
                        }))
                    }
                />
            </div>
        );
    }
}
