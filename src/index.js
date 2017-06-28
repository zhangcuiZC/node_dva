import dva from 'dva';
import './index.css';
import movieList from './models/movieList';
import categoryList from './models/categoryList';
import userAdd from './models/userAdd';
import userList from './models/userList';
import login from './models/login';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(movieList);
app.model(categoryList);
app.model(userList);
app.model(userAdd);
app.model(login);

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
