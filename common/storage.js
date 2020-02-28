

export const writeToStorage = (name, score) => {
    let currentValue = getStorage();

    currentValue.push({
        name: name,
        score: score
    });
    currentValue.sort((a, b) => {
        return b.score - a.score;
    })
    localStorage.setItem("cannon", JSON.stringify(currentValue));
}

export const getStorage = () => {
    const stringValue = localStorage.getItem("cannon");
    let currentValue;
    if (stringValue === null) {
        currentValue = [];
    }
    else {
        currentValue = JSON.parse(stringValue);
    }

    return currentValue;
}