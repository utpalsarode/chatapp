import React, { useState } from 'react'
import axios from 'axios';

const PickAvatar = () => {
    const [sprite, setSprite] = useState("adventurer");
    const [seed, setSeed] = useState(1000);

    // Function to set the current sprite type 
    function handleSprite(spritetype) {
        setSprite(spritetype);
    }

    // Function to generate random seeds for the API 
    function handleGenerate() {
        let x = Math.floor(Math.random() * 1000);
        setSeed(x);
    }

    // Function to download image and save it in our computer 
    function downloadImage() {
        axios({
            method: "get",
            url: `https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`,
            responseType: "arraybuffer"
        })
            .then((response) => {
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(
                    new Blob([response.data],
                        { type: "application/octet-stream" })
                );
                link.download = `${seed}.svg`;
                document.body.appendChild(link);
                link.click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(link);
                }, 200);
            })
            .catch((error) => { 'not generating' });
    }

    return (
        <>
            <div className="container text-center">
                <div className='m-5'><h6 className='fs-2'>Select an Avatar</h6></div>
                <div className="home">
                    <div className="btns m-2">
                        <button className='btn mx-2' onClick={() => {handleSprite("micah")}}>Human</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("big-smile")}}>Big-Smile</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("lorelei")}}>Lorelei</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("personas")}}>Personas</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("miniavs")}}>Miniavs</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("adventurer")}}>Adventurer</button>
                        <button className='btn mx-2' onClick={() => {handleSprite("avataaars")}}>Avatars</button>
                    </div>
                    <div className="avatar">
                        <img src=
                            {`https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`} width="250px" alt="Sprite" />
                    </div>
                    <div className="generate m-3">
                        <button className='btn mx-2' id="gen" onClick={() => {handleGenerate()}}>Next</button>
                        <button className='btn mx-2' id="down" onClick={() => {downloadImage()}}>Download</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PickAvatar