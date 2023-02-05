

export const modeReducer = (state={ mode:'dark'},action)=>{
    switch(action.type){

        case 'DARK_MODE':
            return{
                
                mode:state.mode === "dark" ? "light" : "dark"

            }
        
        default:
            return state
    }
}