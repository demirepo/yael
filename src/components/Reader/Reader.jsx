import {useSelector} from 'react-redux';

import ContextModal from '../ContextModal/ContextModal';

import SettingsModal from '../SettingsModal/SettingsModal';

import style from './Reader.module.css';
import Martin from './Martin';

export default function Reader() {
  const showContextModal = useSelector((state) => state.modal.showContextModal);
  const showSettingsModal = useSelector((state) => state.modal.showSettingsModal);
  return (
    <main className={style.reader}>
      {showContextModal && <ContextModal />}
      {showSettingsModal && <SettingsModal />}
      <Martin />
    </main>
  );
}
