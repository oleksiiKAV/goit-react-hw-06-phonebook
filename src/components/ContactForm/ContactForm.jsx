import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
  FormStyled,
  LabelStyled,
  InputStyled,
  BtnStyled,
} from './ContactForm.styled';
import { add } from 'redux/contactsSlice';

const ContactForm = () => {
  const contacts = useSelector(state => state.phoneBook.contacts);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = e => {
    const { name, number } = form; // instead of - const name = e.target.name.value;
    e.preventDefault();
    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(add(form));
    setForm({ name: '', number: '' });//instead of  -   e.target.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <LabelStyled>
        Name
        <InputStyled
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </LabelStyled>
      <LabelStyled>
        Number
        <InputStyled
          type="tel"
          name="number"
          pattern="^\+[1-9]{1}[0-9]{3,14}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <BtnStyled type="submit">Add contact</BtnStyled>
      </LabelStyled>
    </FormStyled>
  );
};

export default ContactForm;
