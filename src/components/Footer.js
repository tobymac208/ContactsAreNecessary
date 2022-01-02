import React from 'react';

const Footer = () => {
    return (
        <div className="ui menu">
            <div className="ui container center">
                <footer>
                    <p>Contact Manager &copy; {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    )
}

export default Footer
