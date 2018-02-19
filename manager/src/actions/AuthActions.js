import Auth0 from 'react-native-auth0';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import * as types from './types';

export const updateEmail = (text) => {
  return {
    type: types.UPDATE_EMAIL,
    email: text
  };
};

export const updatePassword = (text) => {
  return {
    type: types.UPDATE_PASSWORD,
    password: text
  };
};

const onUserLoggedIn = (dispatch, credentials) => {
  processUserCredentials(credentials)
    .then(userInfo => {
      dispatch({
        type: types.USER_LOGGED_IN,
        user: userInfo,
      });

      Actions.main();
    })
    .catch(error => console.log(error));
};

const onUserLoginFailed = (dispatch) => {
  dispatch({
    type: types.USER_LOGIN_FAILED,
  });
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_STARTED
    });

    const auth0 = new Auth0({
      domain: types.CREDENTIAL_DOMAIN,
      clientId: types.AUTH0_CLIENT_ID
    });

    auth0.auth
      .passwordRealm({
          username: email,
          password,
          realm: 'Username-Password-Authentication',
          scope: 'openid profile email offline_access',
      })
      .then(credentials => {
        onUserLoggedIn(dispatch, credentials);
      })
      .catch((error) => {
        console.log(error);
        onUserLoginFailed(dispatch);
      });
  };
};

export const socialLoginUser = ({ connection }) => {
  return (dispatch) => {
    dispatch({
      type: types.USER_LOGIN_STARTED
    });

    const auth0 = new Auth0({
      domain: types.CREDENTIAL_DOMAIN,
      clientId: types.AUTH0_CLIENT_ID
    });

    auth0
      .webAuth
      .authorize({
        scope: 'openid profile email offline_access',
        connection,
        audience: `https://${types.CREDENTIAL_DOMAIN}/userinfo`
      })
      .then(credentials => {
        onUserLoggedIn(dispatch, { ...credentials, connection });
      })
      .catch(() => onUserLoginFailed(dispatch));
  };
};

export const logoutUser = () => {
  return {
    type: types.USER_LOGGED_OUT
  };
};

const getAuth0ManagementAPIAccessInfo = (clientId, clientSecret) => {
  return new Promise((resolve, reject) => {
    const url = `https://${types.CREDENTIAL_DOMAIN}/oauth/token`;

    axios({
      method: 'post',
      url,
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        audience: `https://${types.CREDENTIAL_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const getAuth0UserId = (accessToken) => {
  const auth0 = new Auth0({
    domain: types.CREDENTIAL_DOMAIN,
    clientId: types.AUTH0_CLIENT_ID
  });

  return new Promise((resolve, reject) => {
    auth0
      .auth
      .userInfo({ token: accessToken })
      .then(profile => {
        resolve(profile);
      })
      .catch(error => reject(error));
  });
};

const getAuth0UserInfo = (auth0UserId, auth0AccessToken) => {
  return new Promise((resolve, reject) => {
    const url = `https://${types.CREDENTIAL_DOMAIN}/api/v2/users/${auth0UserId}`;
    axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${auth0AccessToken}`
      }
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => reject(error));
  });
};

const processUserCredentials = (credentials) => {
  return new Promise((resolve, reject) => {
    getAuth0UserId(credentials.accessToken)
      .then(profile => {
        const userId = profile.sub;
        getAuth0ManagementAPIAccessInfo(
          types.AUTH0_MANAGEMENT_CLIENT_ID,
          types.AUTH0_MANAGEMENT_CLIENT_SECRET)
          .then((userInfo) => {
            getAuth0UserInfo(userId, userInfo.access_token)
              .then(auth0UserInfo => {
                resolve(auth0UserInfo);
              })
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
};
