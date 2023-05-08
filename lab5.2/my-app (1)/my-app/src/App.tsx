import React, { useState, useEffect } from 'react';
import { useStore } from './MyStore';
import './index.css';

function App() {
    const store = useStore();

    const [localData, setLocalData] = useState<any>({ goals: '', deadline: '' });
    const myData = store.myData;

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleAddObject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!localData.goals || !localData.deadline ) {
            alert('Please write smth in all cells.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            store.addObject(localData);
            localStorage.setItem('myData', JSON.stringify(store.myData));
            setIsLoading(false);
        }, 2000);

    };


    const handleDeleteObject = (index: number) => {
        store.deleteObject(index);
        setLocalData({ goals: '', deadline: '' });
        localStorage.setItem('myData', JSON.stringify(store.myData));
    };

    const handleUpdateObject = (index: number, newData: any) => {
        store.updateObject(index, newData);
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('myData', JSON.stringify(store.myData));
            setIsLoading(false);
        }, 2000);

        // setează valorile din obiectul myData în starea localData
        const dataToUpdate = store.myData[index];
        setLocalData({goals: dataToUpdate.goals, deadline: dataToUpdate.deadline });
        setIsEditing(false);
        setEditingIndex(-1);
    };

    const handleEditObject = (index: number) => {
        const dataToUpdate = store.myData[index];
        setLocalData({ goals: dataToUpdate.goals, deadline: dataToUpdate.deadline });
        setIsEditing(true);
        setEditingIndex(index);
    };

    const handleSaveObject = () => {
        if (editingIndex >= 0) {
            handleUpdateObject(editingIndex, localData);
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('myData');
        if (data) {
            store.setMyData(JSON.parse(data));
        } else {
            localStorage.setItem('myData', JSON.stringify(store.myData));
        }
    }, [store]);

    useEffect(() => {
        if (!isLoading) {
            const data = localStorage.getItem('myData');
            if (data) {
                store.setMyData(JSON.parse(data));
            }
        }
    }, [isLoading, store]);

    return (

        <div className='main'>
            <h1 className="title">I wanna read this books!</h1>
            <header>
            
            </header>
            <form className="form" onSubmit={handleAddObject}>
                <input
                    className="input"  type="text" placeholder="Read new book!" defaultValue={localData.goals} onChange={(e) => setLocalData({ ...localData, goals: e.target.value })}
                />
                <input
                    className="input" type="text" placeholder="Author" defaultValue={localData.deadline} onChange={(e) => setLocalData({ ...localData, deadline: e.target.value })}
                />
                
                <button className="button" type="submit">{isLoading ? 'Loading...' : 'Add'}</button>

            </form>
            <ul className="timeline">
                {myData.map((item: any, index: number) => (
                    <li key={index}>
                        <div className="timeline-badge">{index + 1}</div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                 <h4 className="timeline-title">{item.deadline}</h4>
                                 <p>
                                    <small className="text-muted">
                                        <i className="glyphicon glyphicon-time"></i> {item.goals}
                                    </small>
                                </p>
                            </div>
                            <div className="timeline-body">
                                <p>{item.description}</p>
                            </div>
                            <div className="timeline-footer">
                                <button className="btn btn-primary" onClick={() => handleEditObject(index)}>
                                     Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteObject(index)}>
                                 Delete
                                </button>
                            </div>
                            </div>
    </li>
  ))}
</ul>
            {isEditing && (
                <div className="edit-form">
                    <h2>Editare</h2>
                    <form onSubmit={handleSaveObject}>
                        <input
                            className="input"
                            type="text"
                            placeholder="It's time to rewrite your goal"
                            value={localData.goals}
                            onChange={(e) => setLocalData({ ...localData, goals: e.target.value })}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Deadline"
                            value={localData.deadline}
                            onChange={(e) => setLocalData({ ...localData, deadline: e.target.value })}
                        />
                        <div className="edit-form-buttons">
                            <button className="button save" type="submit">
                                Save
                            </button>
                            <button className="button cancel" onClick={() => setIsEditing(false)}>
                              Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
      

        </div>
        
    );
}

export default App;