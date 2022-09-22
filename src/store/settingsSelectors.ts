import {RootState} from './store';

export const getServerAddress = (state: RootState) => state.settings.serverAddress;
