import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import client from '../../config/axios'

import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECTS,
    FORM_VALIDATION,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';

const ProjectState = props => {

    const initialState = {
        PROJECTS: [],
        form: false,
        errorform: false,
        project: null,
        msg: null
    }

    //Dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(projectReducer, initialState)

    //Serie de funciones para el CRUD

    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    //Obtencion de proyectos

    const getProjects = async () => {
        try {
            const query = await client.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: query.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    //Añadir nuevo proyecto

    const addProject = async (project) => {
        try {
            const query = await client.post('/api/projects', project)
            dispatch({
                type: ADD_PROJECTS,
                payload: query.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    //Validacion del form mostrando error

    const showError = () => {
        dispatch({
            type: FORM_VALIDATION
        })
    }

    //Seleccionar el proyecto en el cual se dio click

    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    //Eliminar proyecto

    const deleteProject = async projectId => {
        try {
            await client.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                PROJECTS: state.PROJECTS,
                form: state.form,
                errorform: state.errorform,
                project: state.project,
                msg: state.msg,
                showForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState