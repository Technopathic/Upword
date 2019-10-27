import React from 'react';

import Style from './style.js';

class AsyncLoader extends React.PureComponent {
    render() {
        return(
            <div className={Style.loaderContainer}>
                <div className={Style.dotBlock}></div>
                <div className={Style.dotBlock}></div>
                <div className={Style.dotBlock}></div>
                <div className={Style.dotBlock}></div>
                <div className={Style.dotBlock}></div>
            </div>
        )
    }
}

export default AsyncLoader;