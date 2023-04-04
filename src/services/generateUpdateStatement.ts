import { performOperation } from "./performOperation";

export const generateUpdateStatement = (
    document: { [key: string]: any },
    mutation: { [key: string]: any },
  ): { [key: string]: any } => {
    const statement = {};
  
    const keys = Object.keys(mutation);
    for (let i = 0; i < keys.length; i += 1) {
      for (let j = 0; j < mutation[keys[i]].length; j += 1) {
        performOperation(document, mutation[keys[i]][j], keys[i], statement);
      }
    }
    return statement;
  };
  export default generateUpdateStatement;