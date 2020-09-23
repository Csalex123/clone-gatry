import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import PagesPromotionSearch from 'pages/Promotion/Search';
import PagePromotionForm from 'pages/Promotion/Form';
import PageNotFound from 'pages/NotFound';

const Root = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" component={PagesPromotionSearch} exact />
                <Route path="/create" component={PagePromotionForm} />
                <Route path="/edit/:id" component={PagePromotionForm} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
};

export default Root;