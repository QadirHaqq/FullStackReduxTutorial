import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();


export function setEntries(state, entries){
    return state.set('entries', List(entries));
}



function getWinners(vote) {
    if (!vote) return [];
    const [a,b] = vote.get('pair');
    const aVotes = vote.getIn(['tally',a],0);
    const bVotes = vote.getIn(['tally',b],0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}

export function next(state){
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if(entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({ pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
}

export function vote(voteState, entry){
    return voteState.updateIn(
            [ 'tally' , entry ],
            0,
            tally => tally + 1
            );
}
/*
export const setEntries = (state, entries) => {
    return {..state, entries};
};

export const getWinners = (state) => {
    const [a,b] = vote.pair;
    const aVotes = vote.
};

export const next = (state) => {
    const vote = state.vote;
    const entries = state.entries;
    if(entries.length == 1){
        return {...state, winner: entries[0]};
    } else {
        return {...state, 
            vote: { [entries[0]]: 0, [entries[1]]: 0},
            entries: entries.slice(0,2), 
        }
    }
};

export const vote = (state, entry) {
    return {...state, 
            [entry]: state[entry] + 1,
    };
};

*/

