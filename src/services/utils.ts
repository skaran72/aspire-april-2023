import _ from "lodash"
export const doesMutationContainArray = (mutationObject: { [key: string]: any }): boolean => {
    const keys = Object.keys(mutationObject);
    for (let i = 0; i < keys.length; i += 1) {
      if (_.isArray(mutationObject[keys[i]])) {
        return true;
      }
    }
    return false;
  };

  export const findObjectIndex = (
    arr: { [key: string]: any }[],
    obj: { [key: string]: any },
  ): number => arr.findIndex((item: { [key: string]: any }) => item._id === obj._id);
