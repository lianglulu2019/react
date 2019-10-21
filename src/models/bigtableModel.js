import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace:'bigtable',
    state: {
        current:1,
        columnsArr:[],
        color:'红'
    },
    reducers: {
        CHANGECOLUMNS (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
            };
        },
        CHANGERESULTS (state, {results}) {
            return {
                ...state,
                results
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
            console.log(columnsArr);
        },
        *SETCOLUMNSTOLOCALSTORAGE ({columns}, {put}) {
            localStorage.setItem('columns', JSON.stringify(columns));
            yield put({'type':'GETCOLUMNSFROMLOCALSTORAGE'});
        },
        *INIT (action, {put}) {
            const {results, total} = yield axios.get('/api/car').then(data => data.data);
            yield put({'type':'CHANGERESULTS', results});
        }
    }
};