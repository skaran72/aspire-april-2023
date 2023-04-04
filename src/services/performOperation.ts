import _ from "lodash";
import { addDocument, removeDocument, updateDocument } from "./operations";
import { doesMutationContainArray, findObjectIndex } from "./utils";

export const performOperation = (
    document: { [key: string]: any },
    mutationObject: { [key: string]: any },
    parentKey: string,
    statement: { [key: string]: any },
    mutationKey?: string,
  ): { [key: string]: any } => {
    const keys = Object.keys(mutationObject);

    if (
      _.includes(keys, '_id')
      && _.includes(keys, '_delete')
      && doesMutationContainArray(mutationObject) === false
    ) {
      return removeDocument(document, mutationObject, parentKey, statement, mutationKey);
    }
  
    if (
      _.includes(keys, '_id')
      && !_.includes(keys, '_delete')
      && doesMutationContainArray(mutationObject) === false
    ) {
      return updateDocument(document, mutationObject, parentKey, statement, mutationKey);
    }
  
    if (
      !_.includes(keys, '_id')
      && !_.includes(keys, '_delete')
      && doesMutationContainArray(mutationObject) === false
    ) {
      return addDocument(document, mutationObject, parentKey, statement, mutationKey);
    }
  
    // For the sake of being generic, we're assumming that there may be more than one array
    // that requires mutation
    for (let i = 0; i < keys.length; i += 1) {
      if (_.isArray(mutationObject[keys[i]])) {
        const index = findObjectIndex(document[parentKey], mutationObject);
        const mKey = mutationKey ? `${mutationKey}.${parentKey}.${index}` : `${parentKey}.${index}`;
  
        for (let j = 0; j < mutationObject[keys[i]].length; j += 1) {
          performOperation(
            document[parentKey][index],
            mutationObject[keys[i]][j],
            keys[i],
            statement,
            mKey,
          );
        }
      }
    }
    return statement;
};