import React from 'react';
import releaseIcon from '../../../assets/img/release.svg'
import { useDispatch } from 'react-redux';
import { myPokemonActions } from '../../../store';

function Release({id}) {
    const dispatch = useDispatch()
    const release = () => {
        const releaseConfirm = window.confirm('Are you sure you want to release this Pokemon?')
        releaseConfirm && dispatch(myPokemonActions.removePokemon({id}))
    }
    return <img className="release-icon" onClick={release} src={releaseIcon} alt=""/>
}

export default Release;
