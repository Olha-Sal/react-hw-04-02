import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

// Кореневий компонент застосунку
const App = () => {
  // Оголошуємо стан застосунку з трьома властивостями: contacts, filter і name
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
  });

  // Додаємо useEffect для збереження контактів у локальному сховищі
  useEffect(() => {
    // Отримуємо контакти з локального сховища, якщо вони там є
    const savedContacts = localStorage.getItem('contacts');
    // Парсимо контакти у форматі JSON
    const parsedContacts = JSON.parse(savedContacts);
    // Оновлюємо стан застосунку, якщо контакти не порожні
    if (parsedContacts) {
      setState(prevState => ({
        ...prevState,
        contacts: parsedContacts,
      }));
    }
  }, []); // Передаємо порожній масив, щоб запустити useEffect тільки при першому рендері

  // Додаємо useEffect для оновлення локального сховища при зміні контактів
  useEffect(() => {
    // Серіалізуємо контакти у форматі JSON
    const stringifiedContacts = JSON.stringify(state.contacts);
    // Зберігаємо контакти у локальному сховищі
    localStorage.setItem('contacts', stringifiedContacts);
  }, [state.contacts]); // Передаємо масив з контактами, щоб запустити useEffect при зміні контактів

  // Функція для додавання нового контакту
  const addContact = contacts => {
    const { name, number } = contacts;
    // Перевіряємо, чи ім'я контакту вже присутнє у телефонній книзі
    const isNameExist = state.contacts.some(
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
    setState(prevState => {
      // console.log('prevState:', prevState);
      return { ...prevState, contacts: [...prevState.contacts, newContact] };
    });
  };

  // Функція для видалення контакту за ідентифікатором
  const deleteContact = id => {
    // Оновлюємо стан застосунку, видаляючи контакт з масиву contacts
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // Функція для обробки зміни значення поля пошуку
  const handleFilterChange = event => {
    setState(prevState => ({
      ...prevState,
      filter: event.target.value,
    }));
  };

  // Функція для фільтрації контактів за ім'ям
  const getFilteredContacts = () => {
    const { contacts, filter } = state;
    console.log(contacts);
    const normalizedFilter = filter.toLowerCase(); // Нормалізуємо значення поля пошуку до нижнього регістру
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizedFilter) // Перевіряємо, чи ім'я контакту містить значення поля пошуку
    );
  };

  return (
    <div className="App">
      <h1>Phone book</h1>
      <ContactForm setContacts={addContact} />
      <Filter value={state.filter} onChange={handleFilterChange} />
      <ContactList contacts={getFilteredContacts()} onDelete={deleteContact} />
    </div>
  );
};

export default App;
