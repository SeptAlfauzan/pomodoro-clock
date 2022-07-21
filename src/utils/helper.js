export const formatTime = (timer) => {
    const minute = Math.floor(timer / 60);
    const second = Math.floor(timer % 60);
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}