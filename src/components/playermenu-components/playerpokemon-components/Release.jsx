import React from 'react';
import releaseIcon from '../../../assets/img/release.svg'
import { useDispatch } from 'react-redux';
import { myPokemonActions } from '../../../store';
import audioField from '../../../helpers/audio-field';
import httpReq from '../../../helpers/requests/use-http';
const realeaseAudio = new Audio(audioField['pokePc'])

function Release({id}) {
    const dispatch = useDispatch()
    const release = async() => {
        const releaseConfirm = window.confirm('Are you sure you want to release this Pokemon?')
        if(releaseConfirm) {
            realeaseAudio.play()
            const releaseRes = await httpReq('http://localhost:4000/api/players/del-poke', 'DELETE', {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'true',
            }, {id})
            if(releaseRes.success) dispatch(myPokemonActions.removePokemon({id}))
        }
    }
    return <img className="release-icon" onClick={release} src={releaseIcon} alt=""/>
}

export default Release;
