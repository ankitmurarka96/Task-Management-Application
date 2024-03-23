import React, { useState } from 'react';
import './addtask.scss';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddTask = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;
    const [state, setState] = useState({
        task: '',
        errorMessage: '',
        //successMessage: 'Please add your task' // Add successMessage state
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            errorMessage: '',
            //successMessage: 'Task added successfully' // Reset successMessage when input changes
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addTask(state.task, currentUser.id));
            setState({
                task: '',
                errorMessage: '',
                successMessage: 'Task added successfully' // Set successMessage on successful submission
            });
        } catch (error) {
            setState({
                ...state,
                errorMessage: 'Add minimum of 10 characters',
                //successMessage: 'Add minimum of 10 characters' // Reset successMessage if an error occurs
            });
        }
    };

    return (
        <div>
            <div className='addtask'>
                {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
                {state.successMessage && <p className='success-message'>{state.successMessage}</p>}
                <form action='' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='task'
                        placeholder='Add your task'
                        onChange={handleChange}
                        value={state.task}
                    />
                    <button className='button'>Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;

