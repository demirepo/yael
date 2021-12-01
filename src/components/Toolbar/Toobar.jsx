import React from "react";
import style from "./Toolbar.module.css";
import { dictLookup, toggleModal } from "../../store/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Toobar() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.ajax);

  const showModal = () => dispatch(toggleModal());

  const handleTrans = () => dispatch(dictLookup("splendid", session));

  return (
    <div className={style.toolbar}>
      <button onClick={showModal} className={style.button}>
        Настройки
      </button>
      <button onClick={handleTrans} className={style.button}>
        Запросить перевод слова boon
      </button>
    </div>
  );
}
