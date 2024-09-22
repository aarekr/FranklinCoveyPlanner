/* eslint-disable react/prop-types */

const OldCompletedTasks = ({ tasks }) => {
    const now = new Date()
    const dateSplit = now.toString().split(" ")
    const dateToday = `${dateSplit[1]} ${dateSplit[2]}`
    
    return (
        <div>OLD COMPLETED
            <p>Tasks of earlier days:</p>
            {tasks
                .filter(task => task.done != false && task.dateCreated != dateToday)
                .map(task => <li key={task.id}>{task.name} - {task.dateCreated} - {task.dateCompleted}</li>)}
            <hr />
        </div>
    )
}

export default OldCompletedTasks
