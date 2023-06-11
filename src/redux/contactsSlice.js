const { createSlice, nanoid } = require('@reduxjs/toolkit');
// get contacts
const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
  filter: '',
};

//createSlice
// При проектировании, структура состояния Redux делится на слайсы (slice, часть), за каждый из 
// которых отвечает отдельный редюсер. В нашем приложении планировщика задач есть два слайса - задачи
//  (tasks) и фильтры (filters).
// const appState = {
//   tasks: [],
//   filters: {},
// };

// Для каждого слайса создается стандартный набор сущностей: типы экшенов, генераторы экшенов и редюсер.
//  Редюсеры определяют начальное состояние слайса, список экшенов влияющих на него и операции обновления 
//  состояния.
// Функция createSlice() это надстройка над createAction() и createReducer(), которая стандартизирует и
//  еще больше упрощает объявление слайса. Она принимает параметр настроек, создает и возвращает типы экшенов, 
//  генераторы экшенов и редюсер.

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    add: (state, { payload }) => {
      return {
        ...state,
        contacts: [...state.contacts, { ...payload, id: nanoid() }],
      };
      // state.contacts.push(payload);
    },
    remove: (state, { payload }) => {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    filtered: (state, { payload }) => {
      state.filter =  payload;
    },
  },
});

export const { add, remove, filtered } = contactsSlice.actions;

export default contactsSlice.reducer;
