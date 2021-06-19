import isObject from "../isObject";

export default function mergeObjects(mainObject, ...objects) {
    function merge(main, obj) {
        if (Array.isArray(obj) && Array.isArray(main)) {
            main.push(...obj);
        } else if (isObject(obj) && isObject(main)) {
            for (const key in obj) {
                if (main?.[key]) {
                    merge(main[key], obj[key])
                } else {
                    main[key] = obj[key]
                }
            }
        } else {
            main = obj;
        }
    }

    for (const obj of objects) {
        merge(mainObject, obj)
    }

    return mainObject;
}