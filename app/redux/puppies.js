import axios from 'axios';

const SET_PUPPIES = 'SET_PUPPIES';
// const ADD_PROJECT = 'ADD_PROJECT';
// const DELETE_PROJECT = 'DELETE_PROJECT';

export const setPuppies = (puppies) => {
  return {
    type: SET_PUPPIES,
    puppies,
  };
};

// export const addProject = (project) => {
//   return {
//     type: ADD_PROJECT,
//     project,
//   };
// };

// export const deleteProject = (projectId) => {
//   return {
//     type: DELETE_PROJECT,
//     projectId,
//   };
// };

export const fetchPuppies = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/puppies');
    const puppiesFromServer = response.data;
    dispatch(setPuppies(puppiesFromServer));
  };
};

// export const sendNewProject = (newProject) => {
//   return async (dispatch) => {
//     const response = await axios.post('/api/projects', newProject);
//     const projectCreated = response.data;
//     dispatch(addProject(projectCreated));
//   };
// };

// export const deleteOldProject = (projectId) => {
//   return async (dispatch) => {
//     await axios.delete(`/api/projects/${projectId}`);
//     dispatch(deleteProject(projectId));
//   };
// };

export default function puppiesReducer(puppies = [], action) {
  switch (action.type) {
    case SET_PUPPIES:
      return action.puppies;
    // case ADD_PROJECT:
    //   return [...projects, action.project];
    // case DELETE_PROJECT:
    //   return [...projects].filter((project) => project.id !== action.projectId);
    default:
      return puppies;
  }
}
