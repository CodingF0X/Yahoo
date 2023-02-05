import * as api from '../API'
import { SEARCH_FILTER } from '../constants/constants'


export const searchFilter = (arg)=> async (dispatch)=>{

    try{
        //console.log(arg)
        const res = await api.searchFilter(arg)
        dispatch({type:SEARCH_FILTER, payload:res.data})


    }catch(err){
        console.log(err)
    }
}