import publicClient from "../publicClient";
import uploadClient from "../uploadClient";

const userEndpoints = {
  /* addSubject: "courses", */
  getSubjects: "courses",
  addUserToSubject: ({ subjectId, id }) =>
    `courses/subjects/${subjectId}/assistances?userId=${id}`,
  addAssistance: ({ subjectId }) =>
    `/courses/${subjectId}/assistances/increaseListAssistanceNum`,
  getUserSubjects: ({ userId }) => `courses/user/${userId}`,
  getSubjectById: ({ subjectId }) => `courses/${subjectId}`,
  addNewPOst: ({ subjectId }) => `courses/${subjectId}/posts`,
  uploadFile: "courses/upload",
  getFiles: "courses/files",
  dowloadFile: ({ fileName }) => `courses/download/${fileName}`,
};

const subjectApi = {
  dowloadFile: async (fileName) => {
    try {
      const response = await publicClient.get(
        userEndpoints.dowloadFile({ fileName })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getFiles: async () => {
    try {
      const response = await publicClient.get(userEndpoints.getFiles);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  uploadFile: async (data) => {
    try {
      const response = await uploadClient.post(userEndpoints.uploadFile, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  addNewPOst: async (subjectId, data) => {
    try {
      const response = await publicClient.put(
        userEndpoints.addNewPOst({ subjectId }),
        data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getSubjectById: async (subjectId) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUserSubjects({ subjectId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getSubjects: async () => {
    try {
      const response = await publicClient.get(userEndpoints.getSubjects);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getUserSubjects: async (userId) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUserSubjects({ userId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  addUserToSubject: async (subjectId, id) => {
    try {
      const response = await publicClient.post(
        userEndpoints.addUserToSubject({ subjectId, id })
      );
      return { response };
    } catch (err) {
      console.log("err");
      return { err };
    }
  },

  addAssistance: async (subjectId, data) => {
    try {
      const response = await publicClient.put(
        userEndpoints.addAssistance({ subjectId }),
        data
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default subjectApi;
