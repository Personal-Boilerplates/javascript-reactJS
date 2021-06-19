export default function objectNavigator(object) {
    function createNavigator(parent, data) {
        const navigator = {
            parent,
            navigator: null,
            size: 0,
            value: data
        }

        if (Array.isArray(data)) {
            data.forEach((thisData, index) => {
                navigator.data[String(index)] = createNavigator(data, thisData)
            })
        } else if (typeof data === 'object') {
            for (const key in data) {
                navigator.data[key] = createNavigator(data, data[key])
            }
        }
        
        if (typeof navigator.navigator === 'object') {
            navigator.size = Object.keys(navigator.navigator).length;
        }
        return navigator;
    }

    return createNavigator(null, object)
}