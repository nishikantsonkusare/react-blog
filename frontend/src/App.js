import Layout from "./components/Layout";
import Home from "./components/Home";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Category from "./components/Category";
import ViewPost from "./components/ViewPost";

const App = () => {
  return (
    <>
    <Router>
    <Layout>
      <Switch>
      <Route exact path='/view-post/:id' component={ViewPost} />
        <Route exact path='/:cateogry' component={Category} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Layout>
    </Router>
    </>
  )
}

export default App;