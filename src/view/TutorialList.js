import React, { useEffect, useState } from 'react'
import { deleteTurorials, getAllTurorialsList } from '../redux/actions/TutorialAction'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const TutorialList = () => {

    const [getSingleData, setSingleData] = useState({})
    const [activeRow, setActiveRow] = useState(0)
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const { state } = useLocation();
    const [getTutorialsData, setTutorialData] = useState([])
    let { loading, data } = useSelector(state => state?.Tutorialreducer?.getAllTutorialList);

    useEffect(() => {
        window.onbeforeunload = function (event) {
            console.log('Page Refreshed');
            navigate('/', { state: { isUpdatable: false } })
        };
        if (!state?.isUpdatable) {
            dispatch(getAllTurorialsList())
        }
    }, [state?.isUpdatable])

    useEffect(() => {
        if (data) {
            setSingleData(data[0])
            setTutorialData(data)
        }
    }, [data])

    const showrecordDesc = (getItems, index) => {
        setSingleData(getItems)
        setActiveRow(index)
    }

    const onEditData = (geEditeData) => {
        navigate('/TutorialList', { state: { editData: geEditeData, isEditable: true } });
    }

    const onDelete = (getDeleted) => {
        dispatch(deleteTurorials(getDeleted, setTutorialData, getTutorialsData))
        const getNewData = getTutorialsData.filter(d => d.id !== data.id)
        setTutorialData(getNewData)
    }

    return (
        <div className="container overflow-hidden mt-4">
            <div className="row gx-5">
                <div className="col">
                    <h3>Tutorial List</h3>
                    {
                        loading ? (<>Loading...</>) :
                            <>
                                {
                                    getTutorialsData?.length <= 0 ? (
                                        <h4>data not found!</h4>
                                    )
                                        :
                                        <>
                                            {getTutorialsData?.map((item, index) => {
                                                return (
                                                    <div className="accordion-item" key={index}>
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button shadow-none" type="button" onClick={() => showrecordDesc(item, index)} style={{ background: activeRow === index ? '#0d6efd' : 'white', color: 'black' }}>
                                                                {item.NAME}
                                                            </button>
                                                        </h2>
                                                    </div>
                                                )
                                            })}

                                        </>

                                }
                            </>
                    }
                </div>
                <div className="col">
                    <h3>Tutorial</h3>
                    {
                        loading ? (<>Loading...</>) :
                            (
                                getSingleData === undefined ? (
                                    <h4>data not found!</h4>
                                ) :
                                    <>
                                        <div className="p-3 border bg-light">
                                            <div className="mb-3 row">
                                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10 col-form-label">
                                                    {getSingleData?.NAME}
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                                <div className="col-sm-10 col-form-label">
                                                    {getSingleData?.DESCRIPTIOM}
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Status</label>
                                                <div className="col-sm-10 col-form-label">
                                                    {getSingleData?.STATUS}
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-warning" onClick={() => onEditData(getSingleData)}>Edit</button>
                                            <button type="button" className="btn btn-danger margin-left" onClick={() => onDelete(getSingleData)}>Delete</button>
                                        </div>
                                    </>
                            )
                    }
                </div>
            </div>
        </div >
    )
}

export default TutorialList