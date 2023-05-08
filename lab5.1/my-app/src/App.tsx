import React, { useState } from 'react';
import { useStore } from './MyStore';
import './index.css';

function App() {
    const store = useStore();

    const [localData, setLocalData] = useState<any>({ Genul : '', Limba: '', Tipografia: '', Autorul: ''});


    const myData = store.myData;

   
    const handleAddObject = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!localData.Genul  || !localData.Limba || !localData.Tipografia || ! localData.Autorul) {
            alert('Nu ați introdus toate datele despre carte:');
            return;
        }
        store.addObject(localData);
        setLocalData({ Genul : '', Limba: '', Tipografia: '', Autorul:''});
    };



    const handleDeleteObject = (index: number) => {
        store.deleteObject(index);
        setLocalData({ Genul : "", Limba: "", Tipografia: "", Autorul: ""});
    };


    return (

        <div className="container">
            <h1 className="title">Introduceti datele despre carte </h1>
            <form className="form" onSubmit={handleAddObject}>
                <input className="input" type="text" placeholder="Genul cărții" value={localData.Genul } onChange={e => setLocalData({ ...localData, Genul : e.target.value })} />
                <input className="input" type="text" placeholder="Limba in care a fost scrisa  " value={localData.Limba} onChange={e => setLocalData({ ...localData, Limba: e.target.value })} />
                <input className="input" type="text" placeholder="Tipografia un de a fost imprimata   " value={localData.Tipografia} onChange={e => setLocalData({ ...localData, Tipografia: e.target.value })} />
                <input className="input" type="text" placeholder="Autorul acestei cărți " value={localData.Autorul} onChange={e => setLocalData({ ...localData, Autorul: e.target.value })} />

                <button className="button" type="submit">Send</button>
            </form>
            <div>
                <div className="grid">
                    {myData.map((data: any, index: number) => (
                        <div key={index} className="object">
                            <p>Genul : {data.Genul }</p>
                            <p>Limba: {data.Limba}</p>
                            <p>Tipografia: {data.Tipografia}</p>
                            <p>Autorul : {data.Autorul}</p>

                   
                            <button onClick={() => handleDeleteObject(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App