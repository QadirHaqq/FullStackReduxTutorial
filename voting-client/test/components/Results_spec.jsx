import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import { Results } from '../../src/components/Results';
import {expect} from 'chai';
import * as movie from '../../src/constants/movies';

const ts = 'TrainsSpotting';

describe('Results', () => {

    it('renders entries with vote counts or zero', () => {
       const pair = List.of(movie.TS, movie.DaysLater);
       const tally = Map({'TrainsSpotting': 5});
       const component = renderIntoDocument(
           <Results pair={pair} tally={tally} />
       );
       const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
       const [train, days] = entries.map(e => e.textContent);

       expect(entries.length).to.equal(2);
       expect(train).to.contain(movie.TS);
       expect(train).to.contain('5');
       expect(days).to.contain(movie.DaysLater);
       expect(days).to.contain('0');
    });

    it('invokes the next callback when next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;

        const pair = List.of(movie.TS, movie.DaysLater);
        const component = renderIntoDocument(
            <Results
                pair={pair}
                tally={Map()}
                next={next}/>
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results
                winner={movie.TS}
                pair={[movie.TS, movie.DaysLater]}
                tally={Map()}
            />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain(movie.TS);
    });



});