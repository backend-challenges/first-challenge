import * as fs from 'fs';
import Logger from "../lib/logger";

const readFile = () => {
    const fileData = fs.readFileSync('./src/tempDb/items.json');
    return JSON.parse(fileData.toString());
}

const writeFile = (items: any) => {
    fs.writeFileSync('./src/tempDb/items.json', JSON.stringify(items));
}

export const findAll = () => {
    const existentItems = readFile();
    return existentItems;
}

export const findById = (id: any) => {
    const existentItems = readFile();

    return existentItems.filter((item: any) => item.id === id);
}

export const insert = (newItem: any) => {
    const existentItems = readFile();

    if (existentItems.filter((item: any) => item.id === newItem.id).length === 0) {
        Logger.debug('New item added');
        existentItems.push(newItem);
    }

    writeFile(existentItems);
    return newItem;
}

export const update = (id: any, updates: any) => {
    const existentItems = readFile();
    const itemWithGivenId = existentItems.filter((item: any) => item.id === id)[0];

    console.log(itemWithGivenId);
    if (itemWithGivenId === undefined) {
        return null;
    }

    const updatedItem = { ...itemWithGivenId, ...updates };
    const filteredItems = existentItems.filter((item: any) => item.id !== id);
    filteredItems.push(updatedItem);
    writeFile(filteredItems);
    return updatedItem
}
