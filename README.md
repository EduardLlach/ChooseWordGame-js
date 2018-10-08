# ChooseWordGame-js
## Objectives
Create an Engine which allows simple games based in choose words.

## The statement
We sould be able to add a statment.
We allow HTML texts

```javacript
ChooseGameEngineObject.statement = "Choose de <i>correct</i> word";
```
## Adding texts
To make easy adding a text, the text should have the format:

``You have to choose [[this words]] but no any other.``

The function to append texts should be:

```javascript
ChooseGameEngineObject.append('The text [[chose words]]');
```

We can add as may text as we want and HTML would be allowed (but we assume that can cause problems)

This would be treated as a word as long as there are no spaces here

```html
[[H<sub>2</sub>SO<sub>4</sub>]]
```

As doesn't contains spaces, but this other HTML could not run as expected

```html
This is an <em>italic text [[composed]] of some words</em> and can cause problems
```

## Game dynamics
Just having a whiteboard

```javascript
ChooseGameEngineObject.whiteboard = 'aDivName';
```

We should be able to draw the whole game:

* The statment, on top
* The words to be choosen
* A "Next" button
* A Scoreboard
* Choose game variant
* Show "win" or "loose"


We should have also two small variants:

* Round of 10
* All available words

Texts should appear randomly.

Also we will have two  "internal" game options: Spacing the words or maintaining it togeher. It would depend on the game we want to get:

Example of game with spacing words:

>Choose the highest number:
>|     ONE        |        TWO    |

Example of game logical without spacing words

> Choose the articles
> The yellow submarine is a song

So we will need an option

```javascript
ChooseGameEngineObject.spacingWords = true; //false by default
```