import publicClient from "../publicClient";

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
};

const subjectApi = {
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
