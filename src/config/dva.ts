import {create, Model} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import models from '@/models/index';
import homeModel from '@/models/home';
import Toast from 'react-native-root-toast';

// 创建实例
const app = create({
  onError: (e) => {
    Toast.show('网络异常', {
      position: Toast.positions.CENTER,
      duration: Toast.durations.LONG,
      shadow: true,
      animation: true,
    });
  },
});

// 加载model对象
models.forEach(model => {
  app.model(model);
});
app.use(createLoading());

// 启动dva
app.start();

// 导出dva数据
export default app._store;

interface Cached {
  [key: string]: boolean;
}

const cached: Cached = {
  home: true,
};

function registerModel(model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, {namespace});
  registerModel(model);
}
