import { SAVE_EMAIL } from '.';

const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export default saveEmailAction;
