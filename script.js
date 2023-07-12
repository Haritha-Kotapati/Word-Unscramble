// Object with word categories and corresponding words
const wordCategories = {
    animals: ["lion", "elephant", "giraffe", "tiger", "monkey"],
    fruits: ["apple", "banana", "cherry", "grape", "orange"],
    countries: ["canada", "france", "japan", "brazil", "germany"],
  };
  
  let category; // Selected word category
  let wordsInCategory; // Words in the selected category
  let scrambledWord; // The current scrambled word
  let timer; // Timer variable
  let timeLeft; // Remaining time in seconds
  
  // Function to initialize the game
  function initializeGame() {
    // Choose a random word category if not selected yet
    if (!category) {
      const categoryKeys = Object.keys(wordCategories);
      const randomCategoryIndex = Math.floor(Math.random() * categoryKeys.length);
      category = categoryKeys[randomCategoryIndex];
    }
    
    // Get the words in the selected category
    wordsInCategory = wordCategories[category];
  
    // Choose a random word from the category
    const randomIndex = Math.floor(Math.random() * wordsInCategory.length);
    const word = wordsInCategory[randomIndex];
  
    // Scramble the word
    scrambledWord = scrambleWord(word);
  
    // Display the scrambled word
    const scrambledWordElement = document.querySelector(".scrambled-word");
    scrambledWordElement.textContent = scrambledWord;
  
    // Clear the user's guess
    const userGuessInput = document.getElementById("user-guess");
    userGuessInput.value = "";
  
    // Clear the result message
    const resultMessage = document.getElementById("result-message");
    resultMessage.textContent = "";
  
    // Reset the timer
    timeLeft = 180; // 3 minutes
    updateTimer();
  
    // Enable the input and button
    userGuessInput.disabled = false;
    document.getElementById("submit-btn").disabled = false;
  
    // Start the countdown
    timer = setInterval(updateTimer, 1000);
  }
  
  // Function to scramble a word
  function scrambleWord(word) {
    // Convert the word to an array of characters
    const characters = word.split("");
  
    // Scramble the characters using Fisher-Yates algorithm
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
  
    // Convert the scrambled characters back to a string
    return characters.join("");
  }
  
  // Function to handle the user's guess submission
  function submitGuess() {
    // Get the user's guess
    const userGuessInput = document.getElementById("user-guess");
    const userGuess = userGuessInput.value.toLowerCase().trim();
  
    // Check if the guess is correct
    if (userGuess === wordsInCategory.find((word) => word === userGuess)) {
      // Display success message
      const resultMessage = document.getElementById("result-message");
      resultMessage.textContent = "Correct! You unscrambled the word.";
  
      // Disable the input and button
      userGuessInput.disabled = true;
      document.getElementById("submit-btn").disabled = true;
  
      // Stop the timer
      clearInterval(timer);
    } else {
      // Display error message
      const resultMessage = document.getElementById("result-message");
      resultMessage.textContent = "Incorrect guess. Try again.";
    }
  }
  
  // Function to update the timer display
  function updateTimer() {
    const timerElement = document.getElementById("timer");
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  
    if (timeLeft === 0) {
      // Time is up, stop the game
      clearInterval(timer);
  
      // Disable the input and button
      const userGuessInput = document.getElementById("user-guess");
      userGuessInput.disabled = true;
      document.getElementById("submit-btn").disabled = true;
  
      // Display time up message
      const resultMessage = document.getElementById("result-message");
      resultMessage.textContent = "Time's up! Try again.";
  
      // Reset the timer
      timeLeft = 180;
    } else {
      // Decrease the remaining time
      timeLeft--;
    }
  }
  
  // Add event listener to the submit button
  document.getElementById("submit-btn").addEventListener("click", submitGuess);
  
  // Add event listener to the category dropdown
  document.getElementById("category-select").addEventListener("change", function () {
    category = this.value;
    initializeGame();
  });
  
  // Initialize the game
  initializeGame();
  