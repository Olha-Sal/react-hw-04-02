import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  // Оголошуємо стан застосунку з трьома властивостями: good, neutral і bad
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  // Функція для додавання нового контакту
  addContact = contacts => {
    const { name, number } = contacts;
    // Перевіряємо, чи ім'я контакту вже присутнє у телефонній книзі
    const isNameExist = this.state.contacts.some(
      contact => contact.name.toUpperCase() === name.toUpperCase()
    );

    //  Якщо так, виводимо попередження і не додаємо контакт
    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    // Якщо ні, створюємо новий об'єкт контакту з властивостями name, number і id
    const newContact = {
      id: nanoid(), // Генеруємо унікальний ідентифікатор
      name: name,
      number: number,
    };

    // Оновлюємо стан застосунку, додаючи новий контакт до масиву contacts
    this.setState(prevState => {
      // console.log('prevState:', prevState);
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  //   const { name } = data;

  //   const isExist = this.state.contacts.some(
  //     contact => contact.name.toUpperCase() === name.toUpperCase()
  //   );

  //   if (isExist) {
  //     alert(`${name} is already in contacts.`);
  //     return;
  //   }
  //   this.setState(prevState => {
  //     return {
  //       contacts: [...prevState.contacts, { id: nanoid(), ...data }],
  //     };
  //   });
  // };
  // Функція для видалення контакту за ідентифікатором
  deleteContact = id => {
    // Оновлюємо стан застосунку, видаляючи контакт з масиву contacts
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // Функція для обробки зміни значення поля пошуку
  handleFilterChange = event => {
    this.setState(prevState => ({
      ...prevState,
      filter: event.target.value,
    }));
  };

  // Функція для фільтрації контактів за ім'ям
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    console.log(contacts);
    const normalizedFilter = filter.toLowerCase(); // Нормалізуємо значення поля пошуку до нижнього регістру
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizedFilter) // Перевіряємо, чи ім'я контакту містить значення поля пошуку
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Phone book</h1>
        <ContactForm setContacts={this.addContact} />
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
