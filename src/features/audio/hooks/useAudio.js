import React from 'react';

export const useAudio = (audioRef) => {
    const [state, setState] = React.useState(false);

    const playAudio = () => {
        setState(true);
        audioRef.current.play();
    }
    const stopAudio = () => {
        setState(false)
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    const action = {
        playAudio, stopAudio
    }
    return [state, action]
}