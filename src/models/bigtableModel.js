import axios from 'axios';

export default {
    namespace:'bigtable',
    state: {
        current:1,
        columnsArr:[]
    },
    reducers: {
        CHANGECOLUMNS (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
            };
        }
    },
    effects: {
        *GETCOLUMNSFROMLOCALSTORAGE (action, {put}) {
            //读取本地存储
            const columnsFromLocalStorage = JSON.parse(localStorage.getItem('columns'));
            //判断本地存储是否有数据,没有就给个默认显示的字段
            if (columnsFromLocalStorage === null){
                localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'series', 'color', 'price']));
            }
            //再次读取本地存储
            const columnsArr = JSON.parse(localStorage.getItem('columns'));
            console.log('123456788');
            yield put({'type': 'CHANGECOLUMNS', columnsArr});
        }
    }
};