import { refreshToken} from '../redux/actions/userAction'
import jwt_decode from "jwt-decode";

export const handleTokenExpired = (access, dispatch, refresh) => {

  const {exp } = jwt_decode(access.token)
  console.log(exp)
  
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp*1000 - currentTime;
  console.log(timeLeft)

  expiredTimer = window.setTimeout(() => {
    console.log("refresh")
    dispatch(refreshToken(refresh.token))
  }, timeLeft);
};

// export const checkUserFromLocalStorage = () => {
//   const userinfo = localStorage.getItem('userInfo');
//   if (userinfo) {
//     return true
//   } else {
//     return false
//   }
// }