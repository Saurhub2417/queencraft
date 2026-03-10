 **♛ QueenCraft – Interactive N-Queen Solver**

QueenCraft is a  web-based visualization tool for solving the N-Queen problem .
It allows users to place queens manually or watch an  AI solver automatically compute the solution using a backtracking algorithm .

This project helps students  understand algorithm visualization, recursion, and constraint satisfaction problems  through an interactive chessboard interface.

---

Live Features

* Interactive  N×N chessboard 
*  Manual solving mode 
*  AI automatic solver 
*  Conflict detection 
*  Real-time timer 
*  Dark / Light theme toggle 
*  Sound effects 
*  Responsive UI 

--------------------------------------------------------------------------------------------------------------------------------
 Screenshots

 # Main Interface

https://drive.google.com/file/d/1hM1dDaFREMef15_HOMRze2XWzs2wBYd8/view?usp=sharing

 # AI Solver in Action

https://drive.google.com/file/d/1SZS1lRO1r01w8JQjlTASBTPox5JUbT1d/view?usp=sharing

 # Light Theme

https://drive.google.com/file/d/1SZS1lRO1r01w8JQjlTASBTPox5JUbT1d/view?usp=sharing

 Problem Statement

The  N-Queen Problem  requires placing  N queens on an N×N chessboard  so that:

* No two queens share the same  row 
* No two queens share the same  column 
* No two queens share the same  diagonal 

---

 Algorithm Used

The AI solver uses the  Backtracking Algorithm .

Steps:

1. Place a queen in a row.
2. Check if the position is safe.
3. Move to the next row.
4. If conflict occurs → backtrack.
5. Continue until a solution is found.

Pseudo logic:

```
solve(row):
    if row == N
        return solution

    for each column:
        if safe(row, column):
            place queen
            solve(row + 1)
            remove queen
```

---

  🏗 Project Structure

```
www
│
├── index.html
├── script.js
├── style.css
│
├── assets
│   ├── queen.png
│   ├── move.mp3
│   ├── win.mp3
│   └── loose.mp3
│
└── screenshots
    ├── interface.png
    ├── ai_solver.png
    └── light_theme.png
```

---

 Technologies Used

* HTML5
* CSS3
* JavaScript
* Canvas API
* LocalStorage

---

 How to Run

1. Clone the repository

```
git clone https://github.com/Saurhub2417/queencraft.git
```

2. Open the project folder

3. Run

```
index.html
```

in your browser.

---

   Features Breakdown

| Feature          | Description                        |
| ---------------- | ---------------------------------- |
| Timer            | Tracks solving time                |
| Conflict Counter | Shows attacking queens             |
| AI Solver        | Automatically finds solution       |
| Canvas Board     | Draws chessboard dynamically       |
| Theme Toggle     | Switch between dark and light mode |

---

   Future Improvements

* Step-by-step AI visualization
* Multiplayer puzzle solving
* Leaderboard system
* Mobile optimization
* Algorithm comparison (Genetic / Hill Climbing)

---

 Author

Saurabh Sharma 
B.Tech CSE
Algorithm Visualization Project
