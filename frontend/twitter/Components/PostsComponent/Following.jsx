import React from 'react'
import './Following.css'
import postimg from '/logos/x-logo.png'

const Following = () => {
    return (
        <div className='post'>
            <div className="posted">
                <h3>This is a Following post 1</h3>
                <div className="buttons">
                    <button>like</button>
                    <button>Comment</button>
                    <button>share</button>
                </div>
            </div>

            <div className="posted">
                <h3>This is a  Following post 2</h3>
                <div className="buttons">
                    <button>like</button>
                    <button>Comment</button>
                    <button>share</button>
                </div>
            </div>

            <div className="posted">
                <h3>This is a Following post 3</h3>
                <img src={postimg} alt='image' />
                <div className="buttons">
                    <button>like</button>
                    <button>Comment</button>
                    <button>share</button>
                </div>
            </div>

            <div className="posted">
                <h3>This is a post 4 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum cum nulla debitis aperiam, sit voluptates a numquam, sunt omnis illum accusantium perferendis magnam ab vel quis, laborum sint dignissimos consequuntur!</h3>
                <div className="buttons">
                    <button>like</button>
                    <button>Comment</button>
                    <button>share</button>
                </div>
            </div>
        </div>
    )
}

export default Following