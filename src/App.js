import {Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Contacts from './components/Contacts'
import Charts from './components/Charts'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Contacts} />
      <Route exact path="/charts&maps" component={Charts} />
    </Switch>
  </>
)

export default App
