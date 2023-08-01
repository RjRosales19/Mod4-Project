import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const READ_SPOT = 'spots/READ_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/DELETE_SPOT';

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    payload: spots
})

export const readSpot = (spot) => ({
    type: READ_SPOT,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    payload: spotId
})

export const getSpots =  () => async (dispatch, getState) =>{
    const res = await csrfFetch('/api/spots')

    if(res.ok){
        const spots = await res.json()

        dispatch(loadSpots(spots))
    }else{
        const errors = await res.json()
        console.log(errors)
    }

}

export const getSingleSpot = (spotId) => async (dispatch, getState ) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if(res.ok){
        const spotInfo = await res.json()
        dispatch(readSpot(spotInfo))
    }else{
        const errors = await res.json()
        console.log(errors)
    }
}


const initialState = { allSpots: {}, singleSpot:{} }

export default function spotReducer( state = initialState , action){
    switch(action.type){
        case LOAD_SPOTS:
            const newState = { ...state };
            action.payload.Spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        case READ_SPOT:
            return { ...state, [action.payload.Spots.spot.id]: action.spot}
        case UPDATE_SPOT:
            return { ...state, [action.payload.Spots.spot.id]: action.spot}
        case REMOVE_SPOT:
            const  spotState = { ...state };
            delete spotState[action.spotId]
            return spotState
        default:
            return state
    }
}