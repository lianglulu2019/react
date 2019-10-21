import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal, Row, Col} from 'antd';

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
        this.props.dispatch({'type':'bigtable/INIT'});
    }
    render () {
        return (
            <div>
                <div className="shaixuan">
                    <div className="tiaojian">
                        <Row>
                            <Col span={3}>颜色</Col>
                            <Col span={18}>
                                {
                                    ['红', '黄', '蓝', '黑', '白', '绿', '灰'].map((item, i)=><p key={i}>{item}</p>)
                                }
                            </Col>
                            <Col span={3}>
                                <Button size='small'>多选</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='tiaojian'>
                        <Row>
                            <Col span={3}>尾气</Col>
                            <Col span={18}>
                                {
                                    ['国一', '国二', '国三', '国四', '国五'].map((item, i)=><p key={i}>{item}</p>)
                                }
                            </Col>
                            <Col span={3}>
                                <Button size='small'>多选</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='tiaojian'>
                        <Row>
                            <Col span={3}>品牌</Col>
                            <Col span={18}>
                                {
                                    ['大众', '奥迪', '宝马', '奔驰', '标致', 'MINI', '日产', '丰田'].map((item, i)=><p key={i}>{item}</p>)
                                }
                            </Col>
                            <Col span={3}>
                                <Button size='small'>多选</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className='tiaojian'>
                        <Row>
                            <Col span={3}>燃料</Col>
                            <Col span={18}>
                                {
                                    ['汽油', '柴油', '纯电动', '油电混合'].map((item, i)=><p key={i}>{item}</p>)
                                }
                            </Col>
                            <Col span={3}>
                                <Button size='small'>多选</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Modal
                    title='调整列表'
                    visible = {this.state.isShowModal}
                    footer = {null}
                    onCancel = {()=>{
                        this.setState({
                            isShowModal:false
                        });
                    }}
                >
                    <ModalInner ref='modalinner' okHandler={(columns)=>{
                        console.log(columns);
                        this.props.dispatch({'type':'bigtable/SETCOLUMNSTOLOCALSTORAGE', columns});
                        this.setState({
                            isShowModal:false
                        });
                    }}
                    cancelHandler={(columns)=>{
                        this.setState({
                            isShowModal:false
                        });
                    }}
                    />
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
                    rowKey='id'
                    columns={
                        this.props.columnsArr.map(str => ({
                            'key':str,
                            'dataIndex':str,
                            ...columnsMap[str]
                        }))
                    }
                    dataSource={this.props.results}
                />
            </div>
        );
    }
}
