import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TutorialList from '../view/TutorialList';
import AddNewTutorial from '../view/AddNewTutorial';

const Router = () => {
    return (
        <>
            <ToastContainer autoClose={1200} />
            <Routes>
                <Route path="/" state={{ isUpdatable: false }} element={<TutorialList />} />
                <Route path="TutorialList" element={<AddNewTutorial />} />
            </Routes>
        </>
    )
}

export default Router