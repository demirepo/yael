import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../store/ajaxSlice";
import style from "./Settings.module.css";

export default function Settings() {
  const session = useSelector((state) => state.ajax);
  const dispatch = useDispatch();

  const updateSession = (e) => {
    const sessionUpdated = { ...session, [e.target.name]: e.target.value };
    dispatch(setSession(sessionUpdated));
  };

  return (
    <div className={style.settings}>
      <input
        onChange={updateSession}
        type="text"
        placeholder="sid"
        value={session.sid}
        name="sid"
      />
      <input
        onChange={updateSession}
        type="text"
        placeholder="yu"
        value={session.yu}
        name="yu"
      />
      <input
        onChange={updateSession}
        type="text"
        placeholder="yum"
        value={session.yum}
        name="yum"
      />
    </div>
  );
}
