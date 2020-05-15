const url = window.location.href;

const lastIndex = url.lastIndexOf("/");

const firstIndex = url.indexOf("/");
export const urlNoFile = url.substring(firstIndex+3,lastIndex+1);
export default url.substring(0,lastIndex+1);