import { Tutorial } from "../actionsType/ActionType"
import { toast } from 'react-toastify';
import { Axios } from "../../utils/utils";

// for add get all tutorials 
export const getAllTurorialsList = () => async dispatch => {
    dispatch({ type: Tutorial.GETTUTORIAL_REQUEST });
    try {
        const headers = {
            "Content-Type": "application/json",
        }
        await Axios.get(`/tutorialDataList`, {
            headers: headers
        }).then((res) => {
            dispatch({
                type: Tutorial.GETTUTORIAL_SUCCESS,
                payload: res.data,
            })
        });
    } catch (error) {
        let getError = JSON.stringify(error)
        let getErrorMsg = JSON.parse(getError)
        dispatch({
            type: Tutorial.GETTUTORIAL_FAILED,
            payload: getErrorMsg.message
        })
    }
};

// for add new 
export const createNewTurorials = (data, navigate) => async dispatch => {
    dispatch({ type: Tutorial.ADDTUTORIAL_REQUEST });
    try {
        const headers = {
            "Content-Type": "application/json",
        }
        await Axios.post(`/tutorialDataList`, data, {
            headers: headers
        }).then((res) => {
            dispatch({
                type: Tutorial.ADDTUTORIAL_SUCCESS,
                payload: res.data,
            })
            toast.dark("Inserted successfully")
            setTimeout(() => {
                navigate('/', { state: { isUpdatable: true } })
            }, 500);
        });
    } catch (error) {
        let getError = JSON.stringify(error)
        let getErrorMsg = JSON.parse(getError)
        dispatch({
            type: Tutorial.ADDTUTORIAL_FAILED,
            payload: getErrorMsg.message
        })
    }
};

// for update new 
export const updateTurorials = (data, newData, navigate) => async dispatch => {
    dispatch({ type: Tutorial.UPDATETUTORIAL_REQUEST });
    try {
        const headers = {
            "Content-Type": "application/json",
        }
        await Axios.put(`/tutorialDataList/${data.id}`, newData, {
            headers: headers
        }).then((res) => {
            dispatch({
                type: Tutorial.UPDATETUTORIAL_SUCCESS,
                payload: res.data,
            })
            toast.dark("Update successfully")
            navigate('/', { state: { isUpdatable: true } })
        });
    } catch (error) {
        let getError = JSON.stringify(error)
        let getErrorMsg = JSON.parse(getError)
        dispatch({
            type: Tutorial.UPDATETUTORIAL_FAILED,
            payload: getErrorMsg.message
        })
    }
};
// for delete new 
export const deleteTurorials = (data) => async dispatch => {
    dispatch({ type: Tutorial.DELETETUTORIAL_REQUEST });
    try {
        const headers = {
            "Content-Type": "application/json",
        }
        await Axios.delete(`/tutorialDataList/${data.id}`, {
            headers: headers
        }).then((res) => {
            dispatch({
                type: Tutorial.DELETETUTORIAL_SUCCESS,
                payload: data.id,
            })
            toast.dark("Delete successfully")
        });
    } catch (error) {
        let getError = JSON.stringify(error)
        let getErrorMsg = JSON.parse(getError)
        dispatch({
            type: Tutorial.DELETETUTORIAL_FAILED,
            payload: getErrorMsg.message
        })
    }
};