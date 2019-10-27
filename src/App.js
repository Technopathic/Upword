import React from 'react';
import Loadable from 'react-loadable';

import Style from './style.js';

const Privacy = Loadable({
  loader: () => import('./components/Privacy'),
  loading() {
    return <div></div>
  }
});

const About = Loadable({
  loader: () => import('./components/About'),
  loading() {
    return <div></div>
  }
});

const Share = Loadable({
  loader: () => import('./components/Share'),
  loading() {
    return <div></div>
  }
});

const AsyncLoader = Loadable({
  loader: () => import('./components/AsyncLoader'),
  loading() {
    return <div></div>
  }
});

class App extends React.PureComponent {
  state = {
    gameMode:0,
    time: 30,
    timer: null,
    best: 0,
    score: 0,
    currentWord:"",
    success: false,
    danger: false,
    message: "",
    next: false,
    turn: false,
    lettersRowOne: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    lettersRowTwo: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    lettersRowThree: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    evenWords:[],
    oddWords:[],
    lettersEnabled:false,
    renderDetails: 0,
    challengeEnabled:false,
    randomWord:"",
    isLoading:false,
    winner:0,
    checkingWord:false
  };

  componentDidMount() {
    if(localStorage.getItem('best') !== null) {
      this.setState({
        best:localStorage.getItem('best')
      })
    }

    this.setState({
      isLoading:true
    }, () => {
      fetch('./data/evenWords.json', {
        method:'GET'
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          evenWords:json
        }, () => {
          fetch('./data/oddWords.json', {
            method:'GET'
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            this.setState({
              oddWords:json
            }, () => {
              this.getRandomWord();
            })
          });
        })
      }); 
    });
  }

  getRandomWord = () => {
    let turn = Math.random();
    let words = [];
    let randomWord = "";

    if(turn >= 0.5) {
      words = this.state.evenWords;
    } else {
      words = this.state.oddWords;
    }

    randomWord = words[Math.floor(Math.random()*words.length)];
    this.setState({
      randomWord: randomWord.word
    }, () => {
      this.setState({
        isLoading:false
      })
    })
  }

  handleDetails = (num) => {
    this.setState({
      renderDetails: num
    })
  };

  handlePlayer = (l) => {
    if(this.state.challengeEnabled === true) {
      this.handleChallenge(l);
    } else {
      if(this.state.lettersEnabled === true) {
        this.joinLetter(l);
      };
    }
  }

  updateTime = () => {
    let i = this.state.time;
    i--;
    if (i < 0) { 
      this.stopTime(); 
      this.setState({
        lettersEnabled:false,
        challengeEnabled:false,
        winner: 0,
        gameMode: 2
      })
    }
    else {
      this.setState({ time: i });
      this.startTime();
    }
  };

  startTime = () => {
    this.setState({
      timer: setTimeout(this.updateTime, 1000)
    });
  };

  stopTime = () => {
    clearTimeout(this.state.timer);
    this.setState({ timer: null });
  };

  setNotification = (type, message) => {
    if (type === "Success") {
      this.setState({
        success: true,
        message: message
      });
    }
    else if ( type === "Danger" ) {
      this.setState({
        danger: true,
        message: message
      });
    }
  };

  showNotification = () => {

  };

  hideNotification = () => {
    this.setState({
      success: false,
      danger: false,
      message: ""
    });
  };

  updateScore = () => {
    let newScore = this.state.score + this.state.currentWord.length;
    this.setState({ score: newScore });

    if (newScore > this.state.best) {
      this.setState({
        best: newScore
      }, () => {
        localStorage.setItem('best', this.state.best);
      });
    }
  };

  newGame = () => {
    let turn = Math.random();

    if(turn >= 0.5) {
      this.setState({
        turn: true,
        score:0,
        currentWord:"",
        gameMode:1,
        next:false,
        challengeEnabled:false
      }, () => {
        this.startRound();
      })
    } else {
      this.setState({
        turn: false,
        score:0,
        currentWord:"",
        gameMode:1,
        next:false,
        challengeEnabled:false
      }, () => {
        this.startRound();
      })
    }
  };

  nextGame = () => {
    let turn = Math.random();

    if(turn >= 0.5) {
      this.setState({
        turn: true,
        gameMode:1,
        next:false,
        challengeEnabled:false,
        currentWord:""
      }, () => {
        this.startRound();
      })
    } else {
      this.setState({
        turn: false,
        gameMode:1,
        next:false,
        challengeEnabled:false,
        currentWord:""
      }, () => {
        this.startRound();
      })
    }
  }

  startRound = () => {
    this.stopTime();
    if (this.state.gameMode === 1) {
      this.setState({
        time: 30
      }, () => {
        if(this.state.turn === false) {
          this.setState({
            isLoading:true
          }, () => {
            let time = Math.floor(Math.random() * 2000) + 300;
            setTimeout(this.comRound, time);
          })
        }
        else {
          this.enableLetters();
          this.startTime();
        }
      })
    }
  };

  enableLetters = () => {
    this.setState({
      lettersEnabled: true
    })
  };

  disableLetters = () => {
    this.setState({
      lettersEnabled: false
    })
  };

  comRound = () => {
    this.setState({
      isLoading:true
    })

    let currentWord = this.state.currentWord;
    let words = [];
    let wordChoices = [];
    let oneWord = [];

    let initialIndex = 0;
    let predictWord = "";

    if(currentWord.length === 0) {
      let drawPool = Math.random();
      if(drawPool >= 0.5) {
        initialIndex = Math.floor(Math.random() * this.state.evenWords.length) + 1;
        predictWord = this.state.evenWords[initialIndex].word;
      } else {
        initialIndex = Math.floor(Math.random() * this.state.oddWords.length) + 1;
        predictWord = this.state.oddWords[initialIndex].word;
      }
      this.setState({
        predictWord: predictWord
      }, () => {
        this.joinLetter(predictWord.charAt(0));
      })
    } else {
      if(currentWord.length % 2 === 0) {
        words = this.state.oddWords;
      }
      else {
        words = this.state.evenWords;
      }
  
      words.forEach((word) => {
        if(word.word.startsWith(currentWord) && word.word !== word) {
          if(word.word.length === currentWord.length + 1) {
            oneWord.push(word.word);
          } else {
            wordChoices.push(word.word);
          }
        }
      })
      
      let difficulty = this.state.currentWord.length / 10;
      if(this.state.currentWord.length > 8) {
        difficulty = 8 / 10;
      }
      
      let randomInt =  Math.floor(Math.random() * 10) + 1;
      randomInt = randomInt / 10;

      let challengeInt =  Math.floor(Math.random() * 10) + 1;
      if(challengeInt < 6) {
        let diff = 6 - challengeInt;
        challengeInt = challengeInt + diff;
      }
      challengeInt = challengeInt / 10;
      
      if(wordChoices.length === 0) {
        if(oneWord.length > 0) {
          if(challengeInt > difficulty) {
            let wordItem = oneWord[Math.floor(Math.random() * oneWord.length)];
            this.joinLetter(wordItem.charAt(currentWord.length));
          } else {
            this.challenge();
          }
        } else {
          this.challenge();
        }
      } else if(wordChoices.length >= 1) {
        if(challengeInt < difficulty) {
          this.challenge();
        } else {
          if(oneWord.length > 0) {
            if(randomInt > difficulty) {
              let wordItem = wordChoices[Math.floor(Math.random() * wordChoices.length)];
              this.joinLetter(wordItem.charAt(currentWord.length));
            } else {
              let wordItem = oneWord[Math.floor(Math.random() * oneWord.length)];
              this.joinLetter(wordItem.charAt(currentWord.length));
            }
          } else {
            let wordItem = wordChoices[Math.floor(Math.random() * wordChoices.length)];
            this.joinLetter(wordItem.charAt(currentWord.length));
          }
        }
      }
    }
  };

  comChallenge = () => {
    
  }

  challenge = () => {

    let currentWord = this.state.currentWord;
    let words = [];
    let wordChoices = [];

    this.setState({
      turn:!this.state.turn
    }, () => {
      if(this.state.turn === false) {
        this.setState({
          isLoading:true
        }, () => {
          let time = Math.floor(Math.random() * 2000) + 300;
          setTimeout(() => {
            if(currentWord.length % 2 === 0) {
              words = this.state.evenWords;
            }
            else {
              words = this.state.oddWords;
            }
      
            words.forEach((word) => {
              if(word.word.startsWith(currentWord) && word.word !== word) {
                wordChoices.push(word.word);
              }
            })
      
            if(wordChoices.length > 0) {
              let wordItem = wordChoices[Math.floor(Math.random() * wordChoices.length)];
              this.setState({
                currentWord:wordItem
              });
              this.setState({
                winner:0
              })
            }
            else {
              this.setState({
                winner:1,
                next: true
              }, () => {
                this.updateScore();
              })
            }
      
            this.setState({
              isLoading:false,
              lettersEnabled:false,
              challengeEnabled:false,
              gameMode:2
            }, () => {
              this.stopTime();
            })
          }, time);
        })  
      } else {
        this.setState({
          challengeEnabled:true,
          lettersEnabled: true
        }, () => {
          this.startTime();
        })
      }
    })  
  };

  giveUp = () => {
    this.setState({
      winner:0,
      gameMode:2,
      lettersEnabled:false,
      challengeEnabled:false
    }, () => {
      this.stopTime();
    })
  }

  handleChallenge = (l) => {
    if(this.state.lettersEnabled === true) {
      this.joinLetter(l);
    };
  };

  joinLetter = (l) => {
    let currentWord = this.state.currentWord;

    this.setState({
      currentWord: currentWord.concat(l)
    }, () => {
      if(this.state.challengeEnabled === false) {
        if(this.state.currentWord.length > 4) {
          this.checkWord();
        } else {
          this.turnEnd();
        }
      }
    })
  };

  turnEnd = () => {
    this.setState({
      turn: !this.state.turn
    }, () => {
      if(this.state.turn === false) {
        this.disableLetters();
        this.setState({
          isLoading: true
        })
      } else {
        this.setState({
          isLoading: false
        })
      }
      this.startRound();
    })
  }

  checkWord = () => {
    let currentWord = this.state.currentWord;
    let words = [];

    if(currentWord.length % 2 === 0) {
      words = this.state.evenWords;
    }
    else {
      words = this.state.oddWords;
    }

    if(this.state.challengeEnabled === false && this.state.gameMode === 1) {
      words.forEach((word) => {
        if(word.word === currentWord) {
          if(this.state.turn === false) {
            this.setState({
              winner:1,
              next: true
            }, () => {
              this.updateScore();
            })
          } else {
            this.setState({
              winner:0
            })
          }
          this.setState({
            gameMode:2
          }, () => {
            this.stopTime();
          })
        }
      })
      this.turnEnd();
    }
    else if(this.state.challengeEnabled === true && this.state.gameMode === 1) {
      this.stopTime();
      this.setState({
        checkingWord:true,
        isLoading:true,
      }, () => {
        setTimeout(() => {
          words.forEach((word) => {
            if(word.length === currentWord.length) {
              if(word.word === currentWord) {
                this.setState({
                  winner:1,
                  next: true
                }, () => {
                  this.updateScore();
                })
              } else {
                this.setState({
                  winner:0
                })
              }
              this.setState({
                gameMode:2,
                checkingWord:false,
                isLoading:false
              })
            }
          })
        }, 0);
      })
    }
  };

  renderNew = () => {
    if (this.state.gameMode === 0) {
      return (`${Style.optionBlock} ${Style.newGameFlash}`);
    }
    else if (this.state.gameMode === 2 && this.state.winner === 0) {
      return (`${Style.optionBlock} ${Style.newGameFlash}`);
    }
    else {
      return Style.optionBlock;
    }
  };

  renderNext = () => {
    if (this.state.next === true && this.state.time !== 0 && this.state.gameMode === 2) {
      return (
        <div className={`${Style.optionBlock} ${Style.newGameFlash}`} onClick={this.nextGame}>Next</div>
      );
    }
    else if(this.state.next === false && this.state.challengeEnabled === true && this.state.time !== 0 && this.state.gameMode === 1) {
      return(
        <div className={`${Style.optionBlock}`} onClick={this.checkWord}>Check</div>
      )
    }
    else if (this.state.next === false && this.state.time !== 0 && this.state.challengeEnabled === false && this.state.gameMode === 1) {
      return (
        <div className={`${Style.optionBlock} ${Style.inactiveButton}`}>Check</div>
      );
    }
    else if (this.state.next === false && this.state.time !== 0 && this.state.gameMode === 2 && this.state.winner === 0) {
      return (
        <div className={`${Style.optionBlock} ${Style.inactiveButton}`}>Check</div>
      );
    }
    else if (this.state.time === 0 || this.state.gameMode === 0) {
      return (
        <div className={`${Style.optionBlock} ${Style.inactiveButton}`}>Check</div>
      );
    }
    else if (this.state.gameMode === 3) {
      return (
        <div className={`${Style.optionBlock} ${Style.inactiveButton}`}>Check</div>
      );
    }
  };

  setTimerFlash = () => {
    if (this.state.time > 10) {
      return Style.statBlock;
    } 
    else if (this.state.time <= 10 && this.state.time > 0) {
      return (`${Style.statBlock} ${Style.dangerFlash}`);
    }
    else if (this.state.time === 0) {
      return (`${Style.statBlock} ${Style.danger}`);
    }
  };

  renderChallenge = () => {
    if(this.state.challengeEnabled === false && this.state.gameMode === 1 && this.state.turn === true) {
      return(
        <div className={Style.challengeButton} onClick={this.challenge}>Challenge</div>
      )
    } else if(this.state.challengeEnabled === true && this.state.turn === true) {
      return(
        <div className={`${Style.challengeButton} ${Style.challengeButtonActive}`} onClick={this.giveUp}>Give Up</div>
      )
    } else {
      return(
        <div className={`${Style.challengeButton} ${Style.inactiveButton}`}>Challenge</div>
      )
    }
  }

  renderDetails = () => {
    if(this.state.renderDetails === 1) {
      return(
        <About/>
      )
    }
    else if(this.state.renderDetails === 2) {
      return(
        <Privacy/>
      )
    }
  }

  renderDetailButtons = () => {
    if (this.state.renderDetails === 0) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://mathica.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Mathica</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(1)}>About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(2)}>Privacy</div>
        </div>
      )
    } else if (this.state.renderDetails === 1) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://mathica.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Mathica</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(0)}>Hide About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(2)}>Privacy</div>
        </div>
      )
    } else if (this.state.renderDetails === 2) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://mathica.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Mathica</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(1)}>About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(0)}>Hide Privacy</div>
        </div>
      )
    }
  }

  renderRandomWord = () => {
    if(this.state.randomWord === "") {
      return(
        this.renderLoading()
      )
    } else {
      return (
        <div className={Style.headerNoticeWoD}>{this.state.randomWord}</div>
      )
    }
  }

  renderNotice = () => {
    if(this.state.gameMode === 0) {
      return(
        <div className={Style.headerNotice}>
          <div className={Style.headerNoticeSub}>Word of the Day</div>
          {this.renderRandomWord()}
          <div className={Style.headerNoticeSm}>(Reload for a New One)</div>
        </div>
      )
    } else if(this.state.gameMode === 1) {
      if(this.state.challengeEnabled === true) {
        if(this.state.turn === false) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>Com Challenge</div>
              <div className={Style.headerNoticeTitle}>{this.renderLoading()}</div>
              <div className={Style.headerNoticeSm}></div>
            </div>
          );
        } else if(this.state.turn === true && this.state.checkingWord === true) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>Checking Word</div>
              <div className={Style.headerNoticeTitle}>{this.renderLoading()}</div>
              <div className={Style.headerNoticeSm}></div>
            </div>
          )
        } else if(this.state.turn === true && this.state.checkingWord === false) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>You've been</div>
              <div className={Style.headerNoticeTitle}>Challenged</div>
              <div className={Style.headerNoticeSm}>Finish the Word</div>
            </div>
          )
        } 
      } else {
        if(this.state.turn === false) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>Com's Turn</div>
              <div className={Style.headerNoticeTitle}>{this.renderLoading()}</div>
              <div className={Style.headerNoticeSm}></div>
            </div>
          )
        } else if(this.state.turn === true) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>Turn</div>
              <div className={Style.headerNoticeTitle}>You</div>
              <div className={Style.headerNoticeSm}>Choose a Letter or Challenge</div>
            </div>
          )
        }
      }
    } else if(this.state.gameMode === 2) {
      if(this.state.winner === 0) {
        return(
          <div className={Style.headerNotice}>
            <div className={Style.headerNoticeSub}>You</div>
            <div className={Style.headerNoticeTitle}>Lost</div>
            <div className={Style.headerNoticeSm}></div>
          </div>
        )
      } else {
        if(this.state.winner === 1) {
          return(
            <div className={Style.headerNotice}>
              <div className={Style.headerNoticeSub}>You</div>
              <div className={Style.headerNoticeTitle}>Won</div>
              <div className={Style.headerNoticeSm}></div>
            </div>
          )
        }
      }
    } else if(this.state.gameMode === 3) {
      return(
        <div className={Style.headerNotice}>
          <div className={Style.headerNoticeSub}>You</div>
          <div className={Style.headerNoticeTitle}>Lost</div>
          <div className={Style.headerNoticeSm}>{`${this.state.currentWord} is not a valid word`}</div>
        </div>
      )
    }
  };

  renderLoading = () => {
    if(this.state.isLoading === true) {
      return(
        <AsyncLoader/>
      )
    }
  }

  renderKey = (letter, i) => {
    if(this.state.gameMode === 2 || this.state.turn === false || this.state.lettersEnabled === false) {
      return(
        <div className={`${Style.lettersBlock} ${Style.inactiveButton}`} key={i}>{letter}</div>
      )
    } else {
      return(
        <div className={Style.lettersBlock} key={i} onClick={() => this.handlePlayer(letter)}>{letter}</div>
      )
    }
  }

  render() {
    return (
      <div className={Style.container}>
       <div className={Style.logoContainer}>Upword</div>
          <div className={Style.wrapperContainer}>
          <header className={Style.headerContainer}>
            <div className={Style.headerContent}>
              <div className={Style.headerColumn}>
                {this.renderNotice()}
              </div>
              <div className={Style.headerColumn}>
                <div className={Style.statContainer}>
                  <div className={this.setTimerFlash()}>
                    Time
                    <span className={Style.statContent}>{this.state.time}</span>
                  </div>
                  <div className={Style.statBlock}>
                    Score
                    <span className={Style.statContent}>{this.state.score}</span>
                  </div>
                  <div className={Style.statBlock}>
                    Best
                    <span className={Style.statContent}>{this.state.best}</span>
                  </div>
                </div>
                <div className={Style.optionContainer}>
                  <div className={this.renderNew()} onClick={this.newGame}>New Game</div>
                  {this.renderNext()}
                </div>
              </div>
            </div>
          </header>

          <main className={Style.mainContainer}>
            <div className={Style.containerSlant}></div>
            <div className={Style.wordContainer}>{this.state.currentWord}</div>
            <div className={Style.lettersContainer}>
              {this.state.lettersRowOne.map((letter, i) => (
                this.renderKey(letter, i)
              ))}
            </div>
            <div className={Style.lettersContainer}>
              {this.state.lettersRowTwo.map((letter, i) => (
                this.renderKey(letter, i)
              ))}
            </div>
            <div className={Style.lettersContainer}>
              {this.state.lettersRowThree.map((letter, i) => (
                this.renderKey(letter, i)
              ))}
            </div>
            {this.renderChallenge()}
          </main>

          <footer>
            <div className={Style.infoContainer}></div>
          </footer>
        </div>
        <div className={Style.wrapperContainer}>
          <div className={Style.infoContainer}>
            <span className={Style.infoImportant}>How to Play: </span>
            Take turns picking letters with the AI. First one to create a valid word loses. Words must be 5 characters or more and must only contain letters. Words cannot be names or places. You can Challenge each other to find a word which begins with all of the letters played so far. 
          </div>
        </div>
        <div className={Style.infoBlock}>
          Made with ❤ in Helsinki. Created by <span className={Style.infoImportant}><a className={Style.infoLink} href="https://twitter.com/Technopathic"  target="_blank" rel="noopener noreferrer">Technopathic</a></span>.
        </div>
        <Share/>
        {this.renderDetailButtons()}
        {this.renderDetails()}
      </div>
    );
  }
}

export default App;
