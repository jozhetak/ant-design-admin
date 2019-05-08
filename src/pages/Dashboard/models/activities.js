import { queryActivities } from '@/services/api';
export default {
  namespace: 'activities',//命名空间
  state: {
    list: [],
  },
  effects: { //相当于action
    *fetchList(_, { call, put }) {
      const response = yield call(queryActivities); //相当于一个等待异步结果过程
      yield put({ // 这里相当于action
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: { //
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
