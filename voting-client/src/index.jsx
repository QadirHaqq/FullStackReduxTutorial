import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import * as movie from './constants/movies';

const pair = [movie.TS, movie.DaysLater];

ReactDOM.render(
    <Voting pair={pair} winner={movie.TS}/>,
    document.getElementById('app')
);