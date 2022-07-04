import React from "react";
import style from "./Toolbar.module.css";
import {
  dictLookup,
  // toggleContextModal,
  toggleSettingsModal,
} from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "../Login/LogoutButton";

export default function Toobar({ isAuthed }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.ajax);
  // const showModal = () => dispatch(toggleContextModal());

  const handleTrans = () => dispatch(dictLookup("splendid", session));

  const toggleSettings = () => dispatch(toggleSettingsModal());

  return (
    <div className={style.toolbar}>
      <button className={style.button}>
        <Link style={{ textDecoration: "none", color: "inherited" }} to={"/"}>
          Главная
        </Link>
      </button>
      <button onClick={handleTrans} className={style.button}>
        Запросить перевод слова boon
      </button>
      <button onClick={toggleSettings} className={style.button}>
        Показать настройки
      </button>

      {isAuthed ? <LogoutButton /> : <Link to={"/signup"}>Signup</Link>}
    </div>
  );
}
