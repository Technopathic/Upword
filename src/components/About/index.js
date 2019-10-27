import React from 'react';

import Style from './style.js';

class About extends React.PureComponent {
    render() {
        return(
            <div className={Style.detailContainer}>
                <div className={Style.detailImportant}>Upword</div>
                <p>
                    Upword is a Word Game written in ReactJS which use a concept based on a word game I learned in primary school, called "Knockout". In this game, the entire class would line up at the front and, going down the line, each would give a letter, spell a word, and challenge each other. If a student lost, they sat down until there was only one winner. This game can be played with any number of players, but my smartest classmate and I would play all the time, even going as far as playing across different days and having a middleman running letters back and forth between us.  
                </p>
                <div className={Style.detailImportant}>How does it Work?</div>
                <p>
                    Upword requires the word spelled to be 5 characters or more, cannot contain special characters, and must not be a proper noun. Challenging your opponent means that you have asked them to spell a word beginning with the letters already used. Generally, this is a good idea when you do not know the word being spelled. Keep in mind, the Com probably has a good idea of what word it wants to use.
                </p>
                <div className={Style.detailImportant}>How to Play?</div>
                <p>
                    As soon as you press New Game, You or the Com will begin the game with a first letter. Both of you will take turns selecting a letter to continue the word until one of you successfully spells a valid word and loses the game. Otherwise, you may challenge each other to complete the word and win the round. Scores are based on the length of the final word. Both of you have 30 seconds in your turn. Of course, you're free to look up words in this time, but that would definitely spoil the fun of the game. 
                </p>
            </div>
        )
    }
}

export default About;