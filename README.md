# TUWebTechAss1

# Echte opdracht heet Yathzee
# dice is al eerste test om dobbelsteen te implementeren

# Boek vben zijn niet letterlijk uit het boek, maar stapsgewijs extra (foeilelijke) dingen toevoegen
# Niet verwijderd; kunnen handig zijn voor copy/pasten


# Class indeling:
            GAME
             ↓
           Player
      ↓               ↓
   Player 1        Player 2
      ↓               ↓
            Turn


GAME:
- Active games statistic
- increase times that yahtzee played by one
- keep track of the duration

PLAYER:
- Keep track of score board of this
- "locked" buttons

TURN:
- Initialize 5 dices.
- Throw dice 3x, dependent on the amount of selected dices 
- catogorie
- Add score of current turn to player
- Increase turn statistic 
- Potential scores

