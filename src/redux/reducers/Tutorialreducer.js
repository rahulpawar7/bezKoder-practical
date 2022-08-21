import { Tutorial } from "../actionsType/ActionType";

const block = {
    loading: false,
    error: '',
    success: false,
};
const initialState = {
    getAllTutorialList: {
        ...block, data: [],
    },
}

const Tutorialreducer = (state = initialState, action) => {
    switch (action.type) {
        case Tutorial.GETTUTORIAL_REQUEST:
            return {
                ...state,
                getAllTutorialList: {
                    ...state.getAllTutorialList,
                    loading: true,
                }
            }
        case Tutorial.GETTUTORIAL_SUCCESS:
            return {
                ...state,
                getAllTutorialList: {
                    ...state.getAllTutorialList,
                    data: [...action.payload],
                    loading: false,
                }
            }
        case Tutorial.GETTUTORIAL_FAILED:
            return {
                ...state,
                getAllTutorialList: {
                    data: action.payload,
                    loading: false,
                },
            }
        case Tutorial.ADDTUTORIAL_SUCCESS:
            return {
                ...state,
                getAllTutorialList: {
                    ...state.getAllTutorialList,
                    data: [
                        ...state.getAllTutorialList.data,
                        action.payload
                    ],
                }
            }
        case Tutorial.UPDATETUTORIAL_SUCCESS:
            return {
                ...state,
                getAllTutorialList: {
                    ...state.getAllTutorialList,
                    data: [
                        ...state.getAllTutorialList.data.map(item => {
                            if (item?.id === action?.payload?.id) {
                                return action?.payload
                            }
                            return item
                        }),
                    ],
                }
            }
        case Tutorial.DELETETUTORIAL_SUCCESS:
            // alert('calleds')
            return {
                ...state,
                getAllTutorialList: {
                    ...state.getAllTutorialList,
                    data: [...state.getAllTutorialList.data.filter(d => d.id !== action.payload)],
                }
            }
        default:
            return state
    }
}

export default Tutorialreducer