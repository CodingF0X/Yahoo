import { SEARCH_FILTER } from "../constants/constants";

export const FilterSearch = (state={},action)=>{
    switch(action.type){
        case SEARCH_FILTER:
            return action?.payload    
            

        default:
            return state
    }
}