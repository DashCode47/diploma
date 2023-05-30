import publicClient from "../publicClient";

const userEndpoints = {
  signin: "auth/authenticate",
  signup: "auth/signup",
  logout: "auth/logout",
  getUser: ({ userId }) => `auth//users/${userId}`,
  addSubjectB: ({ userId }) => `auth/subjects/${userId}`,
  getSubects: ({ userId }) => `auth/subjects/${userId}`,
  updateUser: ({ userId }) => `auth/${userId}`,
};

const userApi = {
  getUser: async (userId) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUser({ userId })
      );
      return { response };
    } catch (err) {
      return err;
    }
  },

  updateUser: async (userId, updatedUser) => {
    try {
      const response = await publicClient.put(
        userEndpoints.updateUser({ userId }),
        updatedUser
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  signin: async (data) => {
    try {
      console.log("send request");
      const response = await publicClient.post(userEndpoints.signin, data);
      return { response };
    } catch (err) {
      console.log("err");
      return { err };
    }
  },
  signup: async (data) => {
    try {
      console.log(data);
      const response = await publicClient.post(userEndpoints.signup, data);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  logout: async () => {
    try {
      const response = await publicClient.post(userEndpoints.logout);
      return { response };
    } catch (err) {
      return { err };
    }
  },
  addSubjectB: async (userId, data) => {
    try {
      const response = await publicClient.post(
        userEndpoints.addSubjectB({ userId }),
        data
      );
      return { response };
    } catch (err) {
      return err;
    }
  },

  getSubects: async (userId) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getSubects({ userId })
      );
      return { response };
    } catch (err) {
      return err;
    }
  },
};

export default userApi;
