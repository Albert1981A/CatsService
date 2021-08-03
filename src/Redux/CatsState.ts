import CatModel from '../Models/CatModel';


// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CatsAppState {
    public cats: CatModel[] = [];
}

// Step 2 - Define ActionType using enum for all required operations
// export enum CatsActionType {
//     CatsDownloaded,
//     CatAdded,
//     CatUpdated,
//     CatDeleted
// }
export enum CatsActionType {
    CatsDownloaded = "CatsDownloaded",
    CatAdded = "CatAdded",
    CatUpdated = "CatUpdated",
    CatDeleted = "CatDeleted"
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CatAction {
    type: CatsActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function catsDownloadedAction(cats: CatModel[]): CatAction {
    return { type: CatsActionType.CatsDownloaded, payload: cats };
}

export function catsAddedAction(cat: CatModel): CatAction {
    return { type: CatsActionType.CatAdded, payload: cat };
}

export function catsUpdatedAction(cat: CatModel): CatAction {
    return { type: CatsActionType.CatUpdated, payload: cat };
}

export function catsDeletedAction(id:number): CatAction {
    return { type: CatsActionType.CatDeleted, payload: id };
}

// Step 5 - Reducer function perform the required action
export function catsReducer(currentState: CatsAppState = new CatsAppState(), action: CatAction): CatsAppState {
    
    // const newState = new CatsAppState();
    // newState.cats = currentState.cats;
    const newState = {...currentState} //Spread Operator

    switch (action.type) {
        case CatsActionType.CatsDownloaded:
            newState.cats = action.payload;
            break;
        case CatsActionType.CatAdded:
            newState.cats.push(action.payload);
            break;
        case CatsActionType.CatUpdated:
            //  const idx = newState.cats.filter(c => c.id === action.payload.id);
            //  newState.cats[idx]=action.payload;   
            break;
        case CatsActionType.CatDeleted:
            newState.cats = newState.cats.filter(c => c.id !== action.payload);
            break;
    }
    return newState;
}

