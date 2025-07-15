import { useState } from 'react';

export const RemindersMenu = ({data}) => {
    const todayReminders = data.reminders.todayReminders;
    const lastContactReminders = data.reminders.lastContactReminders;
    const conflictReminders = data.reminders.conflictReminders
    const pendingReminders = data.reminders.pendingReminders;

    const displayReminders = (reminders) => {
        return reminders.map((entry, index) => (
            <article className="infoEntry" key={index}>
                <img src={ entry.icon } className="reminderEntryIcon" width="24px" height="24px"></img>
                <span className="reminderContent">{ entry.content }</span>
            </article>
        ))
    }

    return (
        <div className="reminderMenu contentWrap">
            <h1>Recordatorios</h1>
            <h2>Hoy</h2>
            <div className="infoSection">
                { displayReminders(todayReminders) }
            </div>
            <h2>Último contacto</h2>
            <div className="infoSection">
                { displayReminders(lastContactReminders) }
            </div>
            <h2>En conflicto</h2>
            <div className="infoSection">
                { displayReminders(conflictReminders) }
            </div>
            <h2>Pendiente</h2>
            <div className="infoSection">
                { displayReminders(pendingReminders) }
            </div>
        </div>
    )
}