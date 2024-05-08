import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';

function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadUpcomingTasks();
        const handleStorageChange = (event) => {
            if (event.key.includes('_tasks2')) {
                loadUpcomingTasks();
            }
        };

        window.addEventListener('storage', handleStorageChange); 
        return () => {
            window.removeEventListener('storage', handleStorageChange); 
        };
    }, []);

    const loadUpcomingTasks = () => {
        let tasks = [];
        for (let i = 0; i < 7; i++) { 
            let currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + i);
            const dateString = currentDate.toISOString().slice(0, 10);
            const dayTasks = JSON.parse(localStorage.getItem(`${dateString}_tasks2`) || '[]');
            tasks = [...tasks, ...dayTasks.map(task => `${dateString} : ${task.activity}`)];
        }
        setUpcomingTasks(tasks);
    };

    const onChange = newDate => {
        setDate(newDate); 
        const dateString = newDate.toLocaleDateString('en-CA');
        navigate(`/day/${dateString}`); 
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
            />
            <div className="upcoming-tasks">
                <h3>Pārbaudes darbi drīzumā</h3>
                {upcomingTasks.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}

export default CalendarPage;
