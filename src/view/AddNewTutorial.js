import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewTurorials, updateTurorials } from '../redux/actions/TutorialAction';

const AddNewTutorial = () => {
    const { state } = useLocation();
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({
        NAME: state?.editData?.NAME || '',
        DESCRIPTIOM: state?.editData?.DESCRIPTIOM || '',
        STATUS: state?.editData?.STATUS || 'Pending',
    });

    const onInputChange = (event) => {
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const submitHandler = () => {
        if (state?.isEditable) {
            dispatch(updateTurorials(state?.editData, inputs, navigate))
        } else {
            dispatch(createNewTurorials(inputs, navigate))
        }
    }

    const onPublishStatus = (getStaus) => {
        if (getStaus === 'Publish') {
            inputs.STATUS = 'Publish';
        } else if (getStaus === 'UnPublish') {
            inputs.STATUS = 'UnPublish';
        } else {
            inputs.STATUS = 'Pending';
        }
        setInputs({ ...inputs })
    }

    return (
        <div className='container'>
            <div className="mb-3 mt-5">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" className="form-control"
                    placeholder="Enter Title"
                    name="NAME"
                    value={inputs.NAME}
                    onChange={(e) => { onInputChange(e) }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                <input type="text" className="form-control"
                    placeholder="Enter Desciption"
                    name="DESCRIPTIOM"
                    value={inputs.DESCRIPTIOM}
                    onChange={(e) => { onInputChange(e) }}
                />
            </div>
            {state?.isEditable && (<div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Status : </label>
                <label htmlFor="exampleFormControlInput1" className="form-label margin-left"> {inputs.STATUS}</label>
            </div>)}
            <div className="mb-3">
                {
                    state?.isEditable ?
                        inputs?.STATUS === 'Pending' ? <button type="button" className="btn btn-primary" onClick={() => onPublishStatus('Publish')}>Publish</button>
                            : inputs?.STATUS === 'Publish' ? <button type="button" className="btn btn-primary" onClick={() => onPublishStatus('UnPublish')}>UnPublish</button> : <button type="button" className="btn btn-primary" onClick={() => onPublishStatus('Publish')}>Publish</button>
                        : null
                }
                {
                    state?.isEditable ? <button type="button" onClick={() => submitHandler()} className="btn btn-success margin-left">Update</button> : <button type="button" onClick={() => submitHandler()} className="btn btn-success">Submit</button>
                }
            </div>
        </div>
    )
}

export default AddNewTutorial