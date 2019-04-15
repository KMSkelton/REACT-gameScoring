import React from 'react';
import { Route } from 'react-router-dom';  // Route listens to BrowserRouter for which of the components to display in the content component
import routes from '../routes'

const Content = (props) => (
  <div className="content">
    {routes.map((route,index) => (
      <Route 
        key={index}
        path={route.path}
        exact={route.exact}
        render = { (routeProps) => (
          <route.content {...routeProps} {...props} />
        )}
      />
    ))}
  </div>
)

export default Content