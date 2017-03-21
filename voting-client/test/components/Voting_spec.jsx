import React from 'react';
import ReactDOM from 'react-dom';
import * as movie from '../../src/constants/movies';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={[movie.TS, movie.DaysLater]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal(movie.TS);
        expect(buttons[1].textContent).to.equal(movie.DaysLater);
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={[movie.TS, movie.DaysLater]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal(movie.TS);
    });


});