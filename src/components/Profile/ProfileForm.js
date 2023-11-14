import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const API_KEY = process.env.REACT_APP_API_KEY;

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      alert("Password changed successfully!!");
      history.replace("/");
    } else {
      const data = await resp.json();
      console.log(data);
    }

    newPasswordInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
