import { getQueryKeys } from "../../helper";

const namespace = 'auth';

const keys = {
  ...getQueryKeys(namespace),
  login: `${namespace}/login`,
  logout: `${namespace}/logout`,
};

export default keys;
