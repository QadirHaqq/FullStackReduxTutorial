import React from 'react';
import ReactDOM from 'react-dom';
import * as movie from '../../src/constants/movies';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import {List} from 'immutable';
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

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={[movie.TS, movie.DaysLater]}
                    hasVoted={movie.TS} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={[movie.TS, movie.DaysLater]} hasVoted=movie.TS />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain(movie.TS);
    });

    it('renders as a pure component', () => {
       const pair = [movie.TS, movie.DaysLater];
       const container = document.createElement('div');
       let component = ReactDOM.render(
           <Voting pair={pair} />,
           container
       );

       let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
       expect(firstButton.textContent).to.equal('Trainspotting');

       pair[0] = 'Sunshine';
       component = ReactDOM.render(
           <Voting pair={pair} />,
           container
       );

       firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
       expect(firstButton.textContent).to.equal(movie.TS);
    });

    it('does update DOM when prop changes', () => {
       const pair = List.of(movie.TS, movie.DaysLater);
       const container = document.createElement('div');

       let component = ReactDOM.render(
           <Voting pair={pair} />,
           container
       );

       let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
       expect(firstButton.textContent).to.equal(movie.TS);

       const newPair = pair.set(0, movie.sun);
       component = ReactDOM.render(
           <Voting pair={pair} />,
           container
       );

       firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
       expect(firstButton.textContent).to.equal(movie.sun);
    });


});

