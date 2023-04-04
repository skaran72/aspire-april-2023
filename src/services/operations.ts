import _ from "lodash";
import { findObjectIndex } from "./utils";

const ADD = '$add';
const UPDATE = '$update';
const REMOVE = '$remove';

export const removeDocument = (
    document: { [key: string]: any },
    mutationObject: { [key: string]: any },
    parentKey: string,
    statement: { [key: string]: any },
    mutationKey?: string,
): { [key: string]: any } => {
    const index = findObjectIndex(document[parentKey], mutationObject);
    const mKey = mutationKey ? `${mutationKey}.${parentKey}.${index}` : `${parentKey}.${index}`;

    const operation: { [key: string]: any } = {};
    operation[mKey] = true;
    statement[REMOVE] = operation;
    return statement;
};

export const updateDocument = (
    document: { [key: string]: any },
    mutationObject: { [key: string]: any },
    parentKey: string,
    statement: { [key: string]: any },
    mutationKey?: string,
): { [key: string]: any } => {
    const index = findObjectIndex(document[parentKey], mutationObject);
    let mKey = mutationKey ? `${mutationKey}.${parentKey}.${index}` : `${parentKey}.${index}`;

    // The mutation object here will always be of type { _id: number, key: value }
    // We get the key that isn't _id and construct the update operation
    const keys = Object.keys(mutationObject);
    const updateKey = keys.find((key: string) => key !== '_id');
    mKey += `.${updateKey}`;

    const operation: { [key: string]: any } = {};
    operation[mKey] = mutationObject[updateKey!];
    statement[UPDATE] = operation;
    return statement;
};

export const addDocument = (
    document: { [key: string]: any },
    mutationObject: { [key: string]: any },
    parentKey: string,
    statement: { [key: string]: any },
    mutationKey?: string,
): { [key: string]: any } => {
    const mKey = mutationKey ? `${mutationKey}.${parentKey}` : `${parentKey}`;
    const operation: { [key: string]: any } = {};
    // Mutation object will always be of type { key: value }
    operation[mKey] = [mutationObject];
    statement[ADD] = operation;
    return statement;
};

