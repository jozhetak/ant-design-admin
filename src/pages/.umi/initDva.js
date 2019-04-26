import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Volumes/Data/githubStore/react-admin-template/src/models/user.js').default) });
