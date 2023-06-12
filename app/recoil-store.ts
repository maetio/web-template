import {
  atom,
} from 'recoil';

export const UserState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    email: '',
  },
});
