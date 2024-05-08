import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DayPage.css';
import { useNavigate } from 'react-router-dom';

function DayPage() {
    const { date } = useParams();
    const loadTasks = (suffix) => JSON.parse(localStorage.getItem(`${date}_${suffix}`)) || [];
    const [leftTasks1, setLeftTasks1] = useState(loadTasks('left1'));
    const [leftTasks2, setLeftTasks2] = useState(loadTasks('left2'));
    const [leftTasks3, setLeftTasks3] = useState(loadTasks('left3'));
    const [rightTasks1, setRightTasks1] = useState(loadTasks('right1'));
    const [rightTasks2, setRightTasks2] = useState(loadTasks('right2'));
    const [activity1, setActivity1] = useState('');
    const [activity2, setActivity2] = useState('');
    const [activity3, setActivity3] = useState('');
    const [activity4, setActivity4] = useState('');
    const [activity5, setActivity5] = useState('');
    const [time4, setTime4] = useState('');
    const [time5, setTime5] = useState('');
    const [title1, setTitle1] = useState('Mājas darbi'); 
const [title2, setTitle2] = useState('Pārbaudes darbi'); 
const [title3, setTitle3] = useState('Personīgas lietas'); 
const [title4, setTitle4] = useState('Skolas aktivitātes');  
const [title5, setTitle5] = useState('Personīgas aktivitātes');  


    useEffect(() => {
        localStorage.setItem(`${date}_left1`, JSON.stringify(leftTasks1));
        localStorage.setItem(`${date}_left2`, JSON.stringify(leftTasks2));
        localStorage.setItem(`${date}_left3`, JSON.stringify(leftTasks3));
        localStorage.setItem(`${date}_right1`, JSON.stringify(rightTasks1));
        localStorage.setItem(`${date}_right2`, JSON.stringify(rightTasks2));
    }, [leftTasks1, leftTasks2, leftTasks3, rightTasks1, rightTasks2, date]);

    const addTask = (setTasks, tasks, activity, setActivity) => {
        const newTasks = [...tasks, { activity }];
        setTasks(newTasks);
        setActivity('');  // Очистка поля ввода активности
        const dateString = date;
        localStorage.setItem(`${dateString}_tasks2`, JSON.stringify(newTasks));
        window.dispatchEvent(new Event('storage'));
    };
    
    //localStorage.clear();

    const addTimeSensitiveTask = (setTasks, tasks, activity, time, setActivity, setTime) => {
        if (!time) {
            console.error("Time must be set for time-sensitive tasks.");
            return; // Прерываем выполнение функции, если время не задано
        }
        const newTask = { activity, time, completed: false };
        const newTasks = [...tasks, newTask];
        newTasks.sort((a, b) => (a.time && b.time) ? a.time.localeCompare(b.time) : 0);
        setTasks(newTasks);
        setActivity(''); // Очистка поля ввода активности
        setTime(''); // Очистка поля ввода времени
        const dateString = date; // используйте дату из контекста
        const tasksKey = `${dateString}_right${tasks.length % 2 + 1}`; // выбор ключа в зависимости от количества задач
        localStorage.setItem(tasksKey, JSON.stringify(newTasks));
        window.dispatchEvent(new Event('storage')); // для обновления состояния в других компонентах
    };
    
    
    //localStorage.clear();

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/calendar');
      };


    const toggleCompletion = (tasks, setTasks, index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    return (
        <div className="day-container">
            <header className="header">
        <button onClick={goBack} className="back-button">
          Atpakaļ
        </button>
        <div class="title">
            <b>ENVX Sistēma</b>
        </div>
      </header>
            <div className="day-plan">
    {[{tasks: leftTasks1, setTasks: setLeftTasks1, title: title1, activity: activity1, setActivity: setActivity1},
      {tasks: leftTasks2, setTasks: setLeftTasks2, title: title2, activity: activity2, setActivity: setActivity2},
      {tasks: leftTasks3, setTasks: setLeftTasks3, title: title3, activity: activity3, setActivity: setActivity3}].map((item, index) => (
        <div className="todo-list" key={index}>
            <h2>{item.title}</h2>
            <ul>
                {item.tasks.map((task, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(item.tasks, item.setTasks, idx)} />
                        {task.activity}
                    </li>
                ))}
            </ul>
            <div className="task-form">
                <input type="text" placeholder="Aktivitāte" value={item.activity} onChange={e => item.setActivity(e.target.value)} />
                <button onClick={() => addTask(item.setTasks, item.tasks, item.activity, item.setActivity)}>Pievienot</button>
            </div>
        </div>
    ))}
</div>

<div className="todo-container">
    {[{tasks: rightTasks1, setTasks: setRightTasks1, title: title4, activity: activity4, setActivity: setActivity4, time: time4, setTime: setTime4},
      {tasks: rightTasks2, setTasks: setRightTasks2, title: title5, activity: activity5, setActivity: setActivity5, time: time5, setTime: setTime5}].map((item, index) => (
        <div className="todo-list" key={index + 3}>
            <h2>{item.title}</h2>
            <ul>
                {item.tasks.map((task, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(item.tasks, item.setTasks, idx)} />
                        {task.time} - {task.activity}
                    </li>
                ))}
            </ul>
            <div className="task-form">
                <input type="time" value={item.time} onChange={e => item.setTime(e.target.value)} />
                <input type="text" placeholder="Aktivitāte" value={item.activity} onChange={e => item.setActivity(e.target.value)} />
                <button onClick={() => addTimeSensitiveTask(item.setTasks, item.tasks, item.activity, item.time, item.setActivity, item.setTime)}>Pievienot</button>
            </div>
        </div>
    ))}
</div>


        </div>
    );
}

export default DayPage;
