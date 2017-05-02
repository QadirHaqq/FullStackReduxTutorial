/**
 * Created by qhaqq on 5/2/17.
 */
import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import * as clientActions from '../src/clientActions';
import reducer from '../src/reducer.js'
import * as movie from '../src/constants/movies';

describe('reducer', () => {

    it('handles SET_STATE', () => {
       const initialState = Map();
       const action = {
           type: clientActions.SET_STATE,
           state: Map({
               vote: Map({
                   pair: List.of(movie.TS, movie.DaysLater),
                   tally: Map({ [movie.TS]: 1}),
               })
           })
       };

       const nextState = reducer(initialState, action);

       expect(nextState).to.equal(fromJS({
           vote: {
               pair: [movie.TS, movie.DaysLater],
               tally: {[movie.TS]: 1},
           }
       }));
    });

    it('handles SET_STATE with plain JS payLoad', () => {
        const initialState = Map();
        const action = {
            type: clientActions.SET_STATE,
            state: {
                vote: {
                    pair: [movie.TS, movie.DaysLater],
                    tally: { [movie.TS] : 1},
                }
            },
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: [movie.TS, movie.DaysLater],
                tally: { [movie.TS]: 1},
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
       const action = {
           type: clientActions.SET_STATE,
           state: {
               vote: {
                   pair: [movie.TS, movie.DaysLater],
                   tally: { [movie.TS] : 1},
               }
           },
       };

       const nextState = reducer(undefined, action);

       expect(nextState).to.equal(fromJS({
           vote: {
               pair: [movie.TS, movie.DaysLater],
               tally: { [movie.TS] : 1},
           }
       }));
    });

    it('handles VOTE by setting hasVoted', () => {
       const state = fromJS({
           vote: {
               pair: [movie.TS, movie.DaysLater],
               tally: { [movie.TS]: 1},
           }
       });
       const action = {type: clientActions.VOTE, entry: movie.TS}
       const nextState = reducer(state, action);

       expect(nextState).to.equal(fromJS({
           vote: {
               pair: [movie.TS, movie.DaysLater],
               tally: { [movie.TS]: 1},
           },
           hasVoted: movie.TS
       }));
    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            },
            hasVoted: 'Trainspotting'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionaire']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Sunshine', 'Slumdog Millionaire']
            }
        }));
    });



});