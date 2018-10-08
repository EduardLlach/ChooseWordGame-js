'use strict';

class EngineError extends Error {
	
}

class gameChooseEngine {	
	
	appendOption (statment,option) {
		if(!this.findOption(statment,option) ) this._options.push( {'statment': statment, 'option': option} );
	}
	
	/**
	 * By default we call the constructor without arguments
	 * We need and "object" as argument so we can do some magic with EVENTS (store the object in the Dataset)
	 */
	constructor(obj) {
		if(obj) {
			Object.assign(this,obj);
		}  else {		
			this._options = new Array();
			this._gameTypeRoundOf10 = 1; //A Constant
			this._gameTypeTimeAttack = 2;//Another Constant
		}
		return true;
	}
	
	clearPlayableArea() {
		let el = this.playableArea;
		
		while( el.firstChild ) el.removeChild( el.firstChild );
		
		return true;
	}
	
	clearWhiteBoard() {
		if(this.whiteBoardId=='') throw new Error('Whiteboard Id not set');
		let el = document.getElementById( this.whiteBoardId );
		if(!el) throw new Error('whiteboard object not found');
		
		while( el.firstChild ) el.removeChild(el.firstChild);
		
		return true;
	}
	
	drawMenuSelectGame() {
		let el = this.playableArea;
		
		let buttonRoundOf10 = document.createElement('button');
		buttonRoundOf10.id = 'gameChooseEngineButtonRoundOf10';
		buttonRoundOf10.innerText = 'Ronda de 10';
		buttonRoundOf10.dataset.gameEngine = this;
		buttonRoundOf10.addEventListener('click', function() {
			let clickEngine = new gameChooseEngine( this.dataset.gameEngine );
			clickEngine.gameStartRoundOf10();
		} );
		
		let buttonTimeAttack = document.createElement('button');
		buttonTimeAttack.id = 'gameChooseEngineButtonTimeAttack';
		buttonTimeAttack.innerText = 'Contrareloj';
		buttonTimeAttack.dataset.gameEngine = this;
		buttonTimeAttack.addEventListener('click', function() {
			let clickEngine = new gameChooseEngine( this.dataset.gameEngine )
			clickEngine.gameStartTimeAttack();
		} );
		
		el.appendChild(buttonRoundOf10);
		el.appendChild(buttonTimeAttack);
		
		return true;
	}
	
	drawOption( arrayOfOptions, whichOne ) {
		let wb = this.playableArea;
		
		this.clearPlayableArea();
		
		let statmentArea = document.createElement('p');
		statmentArea.id = "gameChooseEngineStatment";
		statmentArea.innerText = arrayOfOptions[whichOne]['statment'];
		
		let askingFor = document.createElement('div');
		askingFor.id = "gameChooseEngineAnswerArea";
		askingFor.innerHTML = this.transformString( arrayOfOptions[whichOne]['option']);
		
		let checkButtonArea = document.createElement('div');
		checkButtonArea.id = "gameChooseEngineButtonArea";
		
		let checkButtonOption = document.createElement('button');
		checkButtonOption.id = "gameChooseEngineButtonCheck";
		checkButtonOption.innerText = "Verificar";
		
		checkButtonArea.appendChild( checkButtonOption );
		wb.appendChild( statmentArea );
		wb.appendChild( askingFor );
		wb.appendChild( checkButtonArea );		
	}
	
	drawPlayableArea() {
		if( this.whiteBoardId == '' ) throw new Error('Whiteboard Id not set');
		let el = document.getElementById( this.whiteBoardId );
		if( !el ) throw new Error('whiteboard object not found');
		
		let playableArea = document.createElement('div');
		playableArea.id = 'gameChooseEnginePlayableArea';
		el.appendChild(playableArea);
	}
	
	drawScoreboardArea() {
		if( this.whiteBoardId == '' ) throw new Error('Whiteboard Id not set');
		let el = document.getElementById( this.whiteBoardId );
		if( !el ) throw new Error('whiteboard object not found');
		
		let scoreboardArea = document.createElement('div');
		scoreboardArea.id = 'gameChooseEngineScoreBoardArea';
		el.appendChild(scoreboardArea);
	}
	
	/**
	 * Draws the title header
	 * TODO: Append a logo
	 */
	drawTitleHeader() {
		if( this.whiteBoardId == '' ) throw new Error('Whiteboard Id not set');
		let el = document.getElementById( this.whiteBoardId );
		if( !el ) throw new Error('whiteboard object not found');
		
		let title = document.createElement('h1');
		title.innerHTML = `<span id="gameChooseEngineTitleText">${this.mainTitle}</span>`;
		el.appendChild(title);
		
		return true;
	}
		
	/**
	 * Returns an option if found. NULL otherwise.
	 * @param String statment
	 * @param String option 
	 */
	findOption (statment,option) {
		for( let anOption of this._options ) {
			if( (anOption.statment===statment) && (anOption.option === option) ) {
				return anOption;
			}
		}
		
		return null;
	}
	
	//draws the whiteBoard and allows you to choose the type of game
	gameStart() {
		if( this.optionCount == 0 ) throw new Error('Game started without options');
		if( this.mainTitle == '' ) throw new Error('Game started without a Title');
		if( this.whiteBoardId == '' ) throw new Error('Game started without a whiteboard Id');
		
		this.clearWhiteBoard();
		this.drawTitleHeader();
		this.drawPlayableArea();
		this.drawScoreboardArea();
		
		this.drawMenuSelectGame();
	}
	
	gameStartRoundOf10() {
		this.clearPlayableArea();
		
		this.gameType = this._gameTypeRoundOf10; //1 - ROUND OF 10
		this.roundOf10Options = this.selectRandomOptions(10);
		this.roundOf10Current = 0;
		
		this.drawOption( this.roundOf10Options, this.roundOf10Current );
	}
	
	gameStartTimeAttack() {
		this.clearPlayableArea();
		this.gameType = this._gameTypeTimeAttack; // 2- Time Attack
		this.timeAttackOptions = this.selectRandomOptions(0); //All of them, sorted randomly
		this.timeAttackCurrent = 0;
		
		this.drawOption( this.timeAttackOptions, this.timeAttackCurrent );
	}
	
	get mainTitle() {
		return this._mainTitle;
	}
	
	set mainTitle(value) {
		this._mainTitle = value;
	}
	
	get optionCount() {
		return this._options.length;
	}
	
	get playableArea() {
		let el = document.getElementById('gameChooseEnginePlayableArea');
		if(!el) throw new Error('Playable area not exists. Something is not initialized');
		
		return el;
	}
	
	/**
	 * Selects a number of options
	 * @param Number howMany how many options I have to chooose
	 * @return Array
	 */
	selectRandomOptions(howMany) {
		if( isNaN(howMany) ) throw new EngineError("Select Random is not a number");
		howMany = Math.floor(howMany); //convert to an Integer
		if( howMany < 0) throw new EngineError("Select random accepts a parameter between 0 and Number of options");
		if( howMany > this._options.length ) throw new EngineError(`Not enough items to choose ${howMany} requested, but ${this.optionCount} available`);
		if( howMany === 0 ) howMany = this._options.length;
		
		let copyOptions = this._options.slice(); //we make a copy of the array
		let result = new Array();
		
		while(result.length<howMany) {
			let num = Math.floor( Math.random() * copyOptions.length ); //choose One
			result.push( copyOptions[num] ); //copy it in the result
			copyOptions.splice(num,1); //remove from the possibilities to have
		}
		
		return result;
	}
	
	/**
	 * Transforms an string so it can be clicable and part of the game
	 */
	transformString(AString) {
		let stringArray = AString.split(" ");
		let result = "";
		let dataMustBeMarked = 0;
		for( let i=0; i<stringArray.length; i++ ) {
			if(stringArray[i].trim()!="") {
				if( stringArray[i].indexOf('[[') >= 0 ) {
					dataMustBeMarked = 1;					
				}
				let addedWord = stringArray[i].replace('[[','').replace(']]','');
				result = result + `<span class='choose-game-word' data-mark="${dataMustBeMarked}">${addedWord}</span> `;
				if( stringArray[i].indexOf(']]') >= 0 ) {
					dataMustBeMarked = 0;
				}
			}
		}
		return result;
	}
	
	get whiteBoardId() {
		return this._whiteBoardId;
	}
	
	set whiteBoardId(value) {
		this._whiteBoardId = value;
	}
}