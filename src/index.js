import dva from 'dva';
import './index.css';
import movie from './models/movie';
import category from './models/category';
import user from './models/user';
import login from './models/login';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(movie);
app.model(category);
app.model(user);
app.model(login);

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
