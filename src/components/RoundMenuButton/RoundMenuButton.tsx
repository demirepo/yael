import {useRef, useState} from 'react';

import style from './RoundMenuButton.module.css';

export default function RoundMenuButton() {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const menuActiveRef = useRef(false);
  menuActiveRef.current = menuActive;

  const handleClick = () => {
    return buttonPressed ? setButtonPressed(false) : setButtonPressed(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!menuActiveRef.current) {
        setButtonPressed(false);
      }
    }, 2000);
    setMenuActive(false);
  };

  const handleMouseEnter = () => {
    setMenuActive(true);
  };

  return (
    <div className={style.wrapper}>
      <button
        className={buttonPressed ? `${style.circle} ${style.move3}` : style.circle}
        data-menu-item
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        type='button'
      >
        Menu3
      </button>

      <button
        className={buttonPressed ? `${style.circle} ${style.move2}` : style.circle}
        data-menu-item
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        type='button'
      >
        Menu2
      </button>

      <button
        className={buttonPressed ? `${style.circle} ${style.move1}` : style.circle}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        data-menu-item
        type='button'
      >
        Menu1
      </button>

      <button
        className={style.circle}
        data-menu-item
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        type='button'
      >
        Menu
      </button>
    </div>
  );
}
