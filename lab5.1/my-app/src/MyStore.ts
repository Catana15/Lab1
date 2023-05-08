import { createContext, useContext } from 'react';
import { observable, action } from 'mobx';

export class MyStore {
    @observable myData: any = [];

    @action setMyData(data: any) {
        this.myData = data;
    }

    @action addObject(data: any) {
        this.myData.push(data);
    }


    @action deleteObject(index: number) {
        this.myData.splice(index, 1);
    }
}

const StoreContext = createContext(new MyStore());
export const useStore = () => useContext(StoreContext);
