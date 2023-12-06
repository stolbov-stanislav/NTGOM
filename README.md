# NTGOM

Nontransitive game of general form with one move.

To run the game, go to the project directory, install the dependencies:

```sh
npm install
```

And then run the program by entering your arguments into the console:

```sh
npm start *list of your options*
```

## Rules of the game

Half of the next ones in the circle win.
Half of the previous ones in the circle lose.
(the semantics of the lines is not important)

For example, if you enter

```sh
npm start water rock scissors paper bird
```

and choose "**rock**" and the computer chooses "**water**", you win.

*During the game, you can refer to the tooltip, in which the win/lose/draw table will be drawn for the arguments you passed.*
