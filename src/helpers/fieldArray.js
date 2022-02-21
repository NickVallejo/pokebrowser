export const fieldArray = (sqrt) => {
    return Array.from({length: sqrt}, e => Array.from({length: sqrt}, e => 0))
}