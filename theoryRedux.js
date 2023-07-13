//* 1 Каку проблем у решает Redux
//
//* Redux - Это хранилище данных
//*
//* есть приложение, в котором много компонентов, они вложены дрг  в друга и размножены - дерево комонентов
//* может произойи так, когда остояние из одного
//* компонента может понадобиться в другом компоненте
//* Да, можо вынести это состояние в родительскую компонету и ередавать через параметры
//* то есть, через пропсы
//* но в больших проектах это сильно сложно
//* Как справлется Redux - состояние выносится во внешнюю зависсимость 
//* и кажая компонента получает данные из этого состояния
//* хранить данные и логику, которая с ними ваимодейсвует, отдельно от компоненты - хорошая практика
//
//* Как это работает! 
//
//! Есть банк - это state
//! Actions - есть действия - мы хотим снять или положить деньги
//* Экшены определяют то, как мы изменяем данне
//* Но мы не можем прийти в банк, открыть ячейку и забрать деньги
//! для этого существует Dispatch - диспетчер
//* Мы должны обратитьс напрямую к нему и передать action
//
//* Но деспетчер тоже не может напряммую достать дньги из ячейки
//! Для этого существует система - Reducer !!
//* Диспетчер берет Экшн и идет к Редьюсеру и передает его туда
//* А вся логика по работе с данными в приложении находится внутри редьюсера
//
//* Редьюсер знает все возможные экны и внутри него опредлено чо деньги надо снять илбо добавить
//* Reducer сам напрямую изменяет сотояние - данные в банке
//
//! *** Код
//
//* В реакт приложние установим redux и react-redux
//* 
//* в index.js создаем const store - это объект, который содержит несколько методов
//* get state - получить состояние
//* dispatch - измнить состояние
//* подписаться на изенение состояния
//
//* создается store с помощью фцнкции createStore, первым параметром принимает reducer
//
//* и теперь. чтобы передать параметром этот reducer, его необходимо создать
//
//* Reducer - это прото функция (как стрелочная, так и обычная)
//* она принимает 2 параметра - state и action
//
//* action - это js объект, у которого обязательно поле type, по которому мы будем определять, как состояние будет изнятьс
//* так же в action можно предать любое кол-во данных
//* action = {type:"", payload: ""} - обект с типом и какими-то данными
//* эти данные мы можем вытащить также, как и тип
//
//* в редьюсере прописываем логику
//* вс логика строится на том, какой экшн был проброшен в функцию
//* ссоздаем switch case, в которой будем отслеживать тип проброшенногоэкшена
//* и по default эта конструкция обязательно должна возвращать состояние
//* defaut: return state
//* если к нам прилетел экшн с типо, который мы не обрабатываем ни в каком кейсе
//* то мы возвращаем неизмененное состояние
//
//* Сотояние - это некий объект или массив или примитивы, который хранит какие-то данные
//* Дефолтное состояние:
// const defaultState = {
//    cash: 0,
// }
//* Оно будет присваиваться в тот момент, когда пользователь открыл приложение!!
//
//* И каждый раз, когда мы будем в диспач прокидывать какой-то экшн
//* Оно удет хранитья в store, пока пользоватль не обновит страницу, либо не закроет приложение
//
//* у нас есть 2 экшена:
// case "ADD_CASH": - доавить деньги

//    case "GET_CASH": - снять деньги

//* когда мы в деспатч пробраываем экшн, он попадает в редьюсер 
//* и в зависимости от ипа отрабатывает тот или иной кейс
//
//* изначально состояни неизменяемое - то есть кажды   раз возвращаем новый объект
//* поэтом стоздаем новый объект, в него оазворачиваем старое состояние
//* и изменяем какое-то конкретное поле!
//
///* Изначально состояние в Redux является неизменямым
//* то есть, мы каждый раз должны возвращать новый объект!
//* Поэтому, мы создам новый объект, в него разворачиваем старое состояние
//* и изменем уже какое-то онкртное поле
//
//* добавляем деньги:
// return {...state, cash: state.cash + action.payload}
//* снимаем деньги:
// return {...state, cash: state.cash - action.payload}
//* то есть, изнаально на счету 0, мы что-то пердали в payload, состояние измнилось
//* и ы уже храним другое кол-во денег!
//
//* Reducer:
// const reducer = (state = defaultState, action) => {
//    switch (action.type) {
//     case "ADD_CASH":
//        return {...state, cash: state.cash + action.payload}
//     case "GET_CASH":
//        return {...state, cash: state.cash - action.payload}
//     default:
//        return state;
//    }
// }
//
//*теперь необходимо предать Редьюсер первым параметром в reateStore(reducer)
// const store = createStore(reducer)

//
//* И в принципе с редаксом все и мы его ожем исользовать в реакт компоентах
//
//! index.js:
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createStore } from 'redux';
// import App from './App';

// //* состояние - чаще всего объект - хранит в себе поля(объеты, маивы, примитивы)
// const defaultState = {
//    cash: 0,
// }


// const reducer = (state = defaultState, action) => {
//      switch (action.type) {
//       case "ADD_CASH":
//          return {...state, cash: state.cash + action.payload}
//       case "GET_CASH":
//          return {...state, cash: state.cash - action.payload}
//       default:
//          return state;
//      }
// }

// const store = createStore(reducer)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provier store={store}>
//     <App />
//   </Provier>
// );
//
//! модуль React-redux
//* В самом начале урока утановили модуль react-redux
//* он и нужен, чтобы связать реакт компоненты с редаксом
//* Из этого модуля получаем компонент <Provider></Provider>
//* в который и оборачиваем наше приложение!
//* и параметром этот компонент как раз таки принимает store
//* то есть, он будет в компоненты прокидывать наше состояние
//
//*
//* повтор
// const defaultState = {
//    cash:0,
// }
// const reducer = (state = defaultState, action) => {
//     switch(action.type) {
//       case "ADD_CASH" :
//          разввернули состояние, получам текущее кол-во денег на счету, и добавили к ним то, что нам пилетело в экшене
//          return {...state, cash: state.cash + action.paylad}
//  
//       case "GET_CASH":
//          отняли
//          return {...state, cash: state.cash - action.payload}
//     }
// }

// const store = createStore(reducer)

// <Provider store={store} >
//    <App/>
// </Provider>
//
//
//! Что делатть, если редьюсеров несолько - Combain reducers
//
//* Создади еще один редьюсер - по доавлению клиентов и получению всех киентов
// 
// const customerReducer = (state = defauState, action) => {
//    switch(action.type) {
//       case "ADD_CUSTOMER":
//          return {...state, }
//       case "ADD_CUSTOMERS":
//          return {}
//       default: 
//       return state
//    }
// }

//
//* сделаем рефакторинг 
//* - создадим отдельную папку, которая будет хранить всю логику по работе с данными
//* папку store - внутри index.js - в него вынесем инициализацию store
//* const store = createStore(cashReducer, customerReducer)
//
//* в этой папке store деслаем деомпозицю - для аждого редьюсера создам по одноименному фалу
//* cashReducer.js и customerRducer.js
//
//* созданные редьюсеры вырезаем и переносим в соответствующий айл
//* с дефолным состонием для cash!
//
//* кэш редьюсер готов
//* 
//* создаем cusomerReduce
//* дефолтное сотояние
//* const defaultState = {
//      customers: []
//}
//


//* передаем редьюсер в store
//* store необходимо переать в компонент Provider чтобы связать состояние редакса с реактом
//* и так как мы store вынесли, тоесго надо импортиовать в src/index.js

//
//! store/index.js
// import { createStore } from "redux";
// import { cashReducer } from "./cashReducer";


// export const store = createStore(cashReducer)

//
//! src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import { store } from './store';


//    const root = ReactDOM.createRoot(document.getElementById('root'));
//    root.render(
//       <Provider store={store}>
//          <App />
//       </Provider>
//    );
//
//! ashReducer
//* состояние - чаще всего объект - хранит в себе поля(объеты, маивы, примитивы)
// const defaultState = {
//    cash: 5,
// }

// //* Добавление и удаление денег
// export const cashReducer = (state = defaultState, action) => {
//      switch (action.type) {
//       case "ADD_CASH":
//          return {...state, cash: state.cash + action.payload}
//       case "GET_CASH":
//          return {...state, cash: state.cash - action.payload}
//       default:
//          return state;
//      }
// }

//! cutomerReducer
// const defaultState = {
//    customers: []
// }

// //* Добавление и получение всех клиенотов
// const customerReducer = (state = defaultState, action) => {
//    switch (action.type) {
//     case "ADD_CUSTOMER":
//        return {...state, customer: state.customer + action.payload}
//     case "GET_CUSTOMERS":
//        return {...state, customer: state.customer - action.payload}
//     default:
//        return state;
//    }
// }

//
//! У нас 2 редьюсера - займемс объединением редьюсеров
//
//* Сделаем так, чтобы мы могли передать оба редьсера в стор
//
//* импортируем их redux функцию combineReducers
//* создадим новый объект в store/index.js - rootReducer
//* и вызовем у него эту функцию, которая парам етром принимает объект
//* в этот объект мы и будем добавлять все редьюсеры, которые имеютс в нашем приложении

//! sotre/ndex.js
// import { createStore, combineReducers } from "redux";
// import { cashReducer } from "./cashReducer";
// import {customerReducer} from "./customerReducer";


// const rootReducer = combineReducers({
//    cash: cashReducer,
//    customers: customerReducer,
// })

// export const store = createStore(rootReducer)

//
//* сейчас ошибки, потому что редьюсеров у нас несколько. а поле пытаемся получитьиз одного редьюсера
//* смотрим в APP.jsx
// import React from 'react';
// import './App.css';
// import {useDispatch, useSelector} from "react-redux";

// function App() {
// // чтобы как-то изменить состояние, нжен диспатч
//   const dispatch = useDispatch()
// // чтобы получить состояние - хук useSelector(state)
//!   const cash = useSelector(state => state.cash)  - изменяем вот эту строчку const cash = useSelector(state => state.cash.cash)

//   const addCash = (cash) => {
//       dispatch({type:"ADD_CASH", payload: cash})
//   }

//   const getCash = (cash) => {  
//       dispatch({type:"GET_CASH", payload: cash})
//   }

//   return (
//     <div className={'app'}>
//       <div style={{fontSize:'3rem'}}>{cash}</div>
//       <div style={{display: 'flex'}}>
//          <button onClick={() => addCash(Number(prompt()))} className='post'>Пополнить счет</button>
//          <button onClick={() => getCash(Number(prompt()))} className='post'>Снять со счета</button>
//       </div>
//     </div>
//   );
// }

// export default App;
//
//* теперь получаем поля из всех редьюсеров
//

//! неоходимо будет отслеживать изменение состояни
//* это можно сделать с помощью инструментов разработчика
//* и при создании store вторым параметром можно передать как midlevale, так и инструменты разработчика
//* для того, чтобы использовать applyMiddleware  вместе с инструентами разработчика
//!  установить модуль npm i redux-devtools-extension
// * все это на npmjs.com/package/redux-devtools-extension
// https://www.npmjs.com/package/redux-devtools-extension
//* в store импортируем функцию из этого модуля 
//* import { composeWithDevTools } from 'redux-devtools-extension'
//* и передадим ее вторым параметром в createStore
//
// import { createStore, combineReducers } from "redux";
// import { cashReducer } from "./cashReducer";
// import {customerReducer} from "./customerReducer";
//! import { composeWithDevTools } from 'redux-devtools-extension';


// const rootReducer = combineReducers({
//    cash: cashReducer,
//    customers: customerReducer,
// })

//! export const store = createStore(rootReducer, composeWithDevTools())
//
//* с кодом закончили, теперь неоходимо установить расширение для браузера
//* redux devtools и устанавливам в хром
//* затем F12 и открываем redux в инструментах
//* там можо посмотреть текущее состояние, поля, так и изменения
//
//*
//! 4 - Action creators. Работа с массивами. Рефакторинг
//
//* 1 - Внутри customer у нас есть массив - массив клиентов абстрактного банка
//* с помощью хука useSelector получаем  массив этих клиентов
//* const customers = useSelector(state => state.customers.customers)!!!
//
//* 2 - в return сделаем условие, в котором будем проверять
//* если массив пустой, то какая-то надпись клиенты отсутствуют - условие после :
//* если нет - будем его отрисовывать в div - отработает условие после ?

// {customers.length > 0 
//    ? 
//    <div>
//    {customers.map(customer => 
//    <div>{customer.name}</div>
//)}
//    </div>
//    :
//    <div style={{fontSize:'2rem'}}>
//       Клиенты отсутствуют!
//    </div>
// }

//* добавим еще две кнопки в app.jsx

//* вернемся в customerReducer

//* Добавление и получение всех клиенотов
// const customerReducer = (state = defaultState, action) => {
//    switch (action.type) {
//     case "ADD_CUSTOMER":
//!        return {...state, customers: [...state.customers, action.payload]}
//* здесь также мы возвращаем новый объект
//* в который разворачиваем старое состояние
//* и так ак это операця доавлени пользователя
//* мы присваиваем кастомерам новый массив, в который разворачиваем
//* уже сущестующий ммассив катомеров
//* и к нему в конец добавлям объект, который мы будем передавть через action!!
//
//!       return {...state, customers: state.customers.filter(customer => customer.id !== action.payload) }
//* здесь используем filter, который всегда возвращат новый массив
//* и туда попадают только те объекты, для коnорых колбэк вернет true!!
//* в нашем случае проверыем - если id клиента будет равяться айдишнику, 
//* который мы передаем в payload, 
//* то тогда этот клиент не попадет в новый массив!!

//! App сейчаа
// import React from 'react';
// import './App.css';
// import {useDispatch, useSelector} from "react-redux";

// function App() {
// // чтобы как-то изменить состояние, нжен диспатч
//   const dispatch = useDispatch()
// // чтобы получить состояние - хук useSelector(state)
//   const cash = useSelector(state => state.cash.cash)
//   const customers = useSelector(state => state.customers.customers)

//   const addCash = (cash) => {
//       dispatch({type:"ADD_CASH", payload: cash})
//   }

//   const getCash = (cash) => {  
//       dispatch({type:"GET_CASH", payload: cash})
//   }

// //* пишем функции. которая при нажатии на кнопку будет добавлять пользователя

//   const addCustomer = (name) => {
//       const customer = {
//          name,
//          id: Date.now(),
//       }
//       dispatch({type:"ADD_CUSTOMER", payload: customer})
//   }

//   const removeCustomer = (customer) => {
//       dispatch({type: "REMOVE_CUSTOMERS", payload: customer.id})
//   }

//   return (
//     <div className={'app'}>
//       <div style={{fontSize:'3rem'}}>Баланс: {cash}</div>
//       <div style={{display: 'flex'}}>
//          <button onClick={() => addCash(Number(prompt()))} className='post'>Пополнить счет</button>
//          <button onClick={() => getCash(Number(prompt()))} className='post'>Снять со счета</button>
//          <button onClick={() => addCustomer(prompt())} className='post'>Добавить клиента</button>
//          {/* <button onClick={() => removeCustomer(prompt())} className='post'>Удалить клиента</button> */}
//       </div>
//       {customers.length > 0 
//          ?
//          <div>
//             {customers.map(customer => 
//                 <div onClick={() => removeCustomer(customer)} style={{fontSize:'2rem', border:'1px solid black', padding: "10px", marginTop: 20}}>{customer.name}</div>
//             )}
//          </div>
//          :
//          <div style={{fontSize:'2rem', marginTop:20}}>
//             Клиенты отсутствуют!
//          </div>
//       }
//     </div>
//   );
// }

// export default App;
//
//* итак, экшены, которые мы передае в dispatch, явл объектами с типом и какии-то данными
//* повтор:
// const stateDefault = {
//    customers: []
// }
// export const customerReducer=(state = stateDefault, action)=> {
//    switch (action.type) {
//      case "ADD_CUSTOMER":
//      return {...state, customers: [...state.customers, action.payload]}
//      case "REMOVE_CUSTOMERS":
//       return {...state, customers: customes.state.filter(customer => customer.id !== action.payload)}

//       default:
//          return state;

//    }
// }
//* вернемся в компонент и напишем функцию, которая будет добавлять пользователя
//
// const addCustomer = (name) => {
//     const customer = {
//        name,
//        id: Date.now(),
//     }
//     dispatch({type: "ADD_CUSTOMER", payload: customer})
// }
//
//* и остается эту функцию добавить на кнопку - добавлять клиента!
//* параметром в эту функцию передаем вызов функции промт
//
//! Отрефакторим наш код
//
//* экшены, которые мы передае в диспатч, являются однотипными объектами с типами и какими-то данными
//*
//* типы выносить в константы - чтобы не ошибиться
//* и передавать в диспатч уже константы:
//* const ADD_CUSTOMEER = "ADD_CUSTOMER"
//
//* action тоже выносить в функцию
//
// export const addCustomerAction = (payload) => ({type: ADD_CUSTOMER, payload})
// export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMER, payload})
//
//* мы просто вызываем функцию и параметром передвем в нее данные
//
//* возвращаемся в компоненту Арр и сделаем сдесь рефакторинг
//* теперь в диспатч мы передаем не обект
//* а функцию - вызываем тот самый addCustomerActiion(customer)
//* а функцию - вызываем тот самый removeCustomersActiion(customer.id)
//
//! App
// import React from 'react';
// import './App.css';
// import {useDispatch, useSelector} from "react-redux";
// import { addCustomerAction, removeCustomersAction } from './store/customerReducer';

// function App() {
//   const dispatch = useDispatch()
//   const cash = useSelector(state => state.cash.cash)
//   const customers = useSelector(state => state.customers.customers)
  
//   const addCash = (cash) => {
//       dispatch({type:"ADD_CASH", payload: cash})
//   }

//   const getCash = (cash) => {  
//       dispatch({type:"GET_CASH", payload: cash})
//   }

//   const addCustomer = (name) => {
//       const customer = {
//          name,
//          id: Date.now(),
//       }
//!       dispatch(addCustomerAction(customer))
//   }

//   const removeCustomer = (customer) => {
//!       dispatch(removeCustomersAction(customer.id))
//   }

//   return (
//     <div className={'app'}>
//       <div style={{fontSize:'3rem'}}>Баланс: {cash}</div>
//       <div style={{display: 'flex'}}>
//          <button onClick={() => addCash(Number(prompt()))} className='post'>Пополнить счет</button>
//          <button onClick={() => getCash(Number(prompt()))} className='post'>Снять со счета</button>
//          <button onClick={() => addCustomer(prompt())} className='post'>Добавить клиента</button>
//          <button onClick={() => removeCustomer(prompt())} className='post'>Удалить клиента</button>
//       </div>
//       {customers.length > 0 
//          ?
//          <div>
//             {customers.map(customer => 
//                 <div id={customer.id} onClick={() => removeCustomer(customer)} style={{fontSize:'2rem', border:'1px solid black', padding: "10px", marginTop: 20}}>{customer.name}</div>
//             )}
//          </div>
//          :
//          <div style={{fontSize:'2rem', marginTop:20}}>
//             Клиенты отсутствуют!
//          </div>
//       }
//     </div>
//   );
// }

// export default App;
//
//! customerReducer
// const defaultState = {
//    customers: [],
// }

//! const ADD_CUSTOMER = "ADD_CUSTOMER";
//! const REMOVE_CUSTOMERS = "REMOVE_CUSTOMERS"


// export const customerReducer = (state = defaultState, action) => {
//    switch (action.type) {
//     case ADD_CUSTOMER:
//        return {...state, customers: [...state.customers, action.payload]}
//     case REMOVE_CUSTOMERS:
//        return {...state, customers: state.customers.filter(customer => customer.id !== action.payload) }
//     default:
//        return state;
//    }
// }

//! export const addCustomerAction = (payload) => ({type: ADD_CUSTOMER, payload})
//! export const removeCustomersAction = (payload) => ({type: REMOVE_CUSTOMERS, payload})
//
//
//! 5 - Работа с асинхронным кодом в Redux
//*Action creators. Redux thunk и асинхронные действия
//
//* npm i redux-thunk
//
//* идем в store/index.js
//* и здесь redux-thunk надо подключить
//
//* redux-thunk явл applyMiddleware
//
//* export const store = createStoe(rootReducer, composeWithDevTols(applyMiddleware(thunk)))
//
//
//* идем в customerreducer - создаем новый экшн
//
//* const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS"
//
//* case ADD_MANY_CUSTOMERS:
//* return {...state, customers: [...state.customers, ...action.payload]}
//* кастомерам присваиваем новый масив, в который разворачиваем старый массив и присаиваем тот, который прилетит от срвера(...state.payload)
//
//* Далее создадим Action Creator: - функция, котора принимает какие-то данные и возвращает нам объкт экшена
//* Экшн - это обыный js объект, у коорого обязательно должен быть тип
//
//* export const addManyCustomersAction = (payload) => ({type: ADD_MANY_CUSTOMERS, payload})
//
//* Создадим в src новую папку - asyncActions - здесь будем создавать вссе асинхронные запроы внешнему API
//* в ней создаем customers.js
//* и чтобы эту функцию использовали как экшн, то есть. прокидыватьее в диспатч
//* мы из этой функции должны вернуть новую функцию, которая парамтром принимает диспатч
//* export const fetchCustomers = () => {
//*   return function(dispatch) {
//*      fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => response.json())
// после того. как данные с сервера получены, вызываем тот диспатч, который прокину через 
// и в него прокинуть action creator и в него передаем json - в данном случае это массив пользователей
//         .then(json => dispatch(addManyCustomersAction(json))) 
//*   }
//* }
//* 
//* идем в jsonplaceholder и скопируем запрос
//* исправим на users

//* далее добавим нопку - Получить клиентов из базы
//* клик 
//* button onClick ={() => dispatch(fetchCustomers())}> Полуить клиентов из базы</button>
//* 

