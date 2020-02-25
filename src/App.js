import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import { HomePage } from './components/home/HomePage';
import { NotFound } from './components/notfound/NotFound';
import { NavBar } from './components/navbar/NavBar';

class App extends Component {
  constructor(props) {
      super(props);
  }

    render() {
        return (
            
            <div>
                
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="wrapper">
                        <NavBar />         
                        <Switch>                        
                            <Route path="/" exact component={HomePage} />                                                    
                            <Route path="*" component={NotFound} />
                        </Switch>
                        </div>
                </Router>
                </div>
        );
  }
}

export default App;