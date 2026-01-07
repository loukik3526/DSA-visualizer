async function visualizeInsertionSort() {
    const arrayInput = document.getElementById("arrayInput").value;
    const array = arrayInput.split(" ");
    let cont = document.getElementById("array-container");
    let arrayStateContainer = document.getElementById("array-state-container");
    cont.innerHTML = '';
    arrayStateContainer.innerHTML = '';
    
    for (let i = 0; i < array.length; i++) {
      array[i] = parseInt(array[i], 10);
    }
  
    let iarray = [...array];
    
    for (let i = 0; i < array.length; i++) {
      let box = document.createElement("div");
      box.style.display = "flex";
      box.className = "array-bar";
      box.style.width = "80px";
      box.classList.add("array-bar");
      box.style.height = `80px`;
      box.innerHTML = `${array[i]}`;
      box.style.color = "white";
      box.style.backgroundColor = "black";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.border = "2px solid white";
      cont.appendChild(box);
    }
    
    for (let i = 0; i < iarray.length; i++) {
      let boxi = document.createElement("div");
      boxi.style.display = "flex";
      boxi.className = "array-bar1";
      boxi.style.width = "80px";
      boxi.classList.add("array-bar1");
      boxi.style.height = `80px`;
      boxi.innerHTML = `${iarray[i]}`;
      boxi.style.color = "white";
      boxi.style.backgroundColor = "black";
      boxi.style.alignItems = "center";
      boxi.style.justifyContent = "center";
      boxi.style.border = "2px solid white";
      arrayStateContainer.appendChild(boxi);
    }
  
    insertionSortAnimation(array);
  }
  
  async function swapBars(bar1, bar2, value1, value2, i, j, time) {
    return new Promise(resolve => {
      bar1.style.transition = "transform 2s";
      bar2.style.transition = "transform 2s";
  
      bar1.style.transform = "translate(80px)";
      bar2.style.transform = "translate(-80px)";
  
      setTimeout(() => {
        const tempInnerHTML = bar1.innerHTML;
      bar1.innerHTML = bar2.innerHTML;
      bar2.innerHTML = tempInnerHTML;
  
        bar1.style.transform = "scale(1.0)";
        bar2.style.transform = "scale(1.0)";
        bar1.style.transition = "none";
        bar2.style.transition = "none";
        resolve();
      }, time);
    });
  }
  
  const codeExecutionContainer = document.querySelector(".c");
  
  async function insertionSortAnimation(array) {
    let ite = 0; // Initialize ite to 0
    let com = 0;
    const bars = document.querySelectorAll(".array-bar");
    let t1 = document.querySelector("#time").value;
  
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      bars[i].style.backgroundColor = "#e74c3c";
      codeExecutionContainer.innerHTML = `Selecting element ${key} at index ${i}`;
  
      await sleep(1000);
  
      while (j >= 0 && array[j] > key) {
        bars[j].style.backgroundColor = "#e74c3c";
        bars[j + 1].style.backgroundColor = "#e74c3c";
  
        codeExecutionContainer.innerHTML = `Shifting element ${array[j]} to the right and ${key} to the left.`;
  
        await sleep(1000);
        await swapBars(bars[j], bars[j + 1], array[j], array[j + 1], i, j, t1);
  
        array[j + 1] = array[j];
        j--;
  
        bars[j + 1].style.backgroundColor = "#3498db";
        com += 1; // Increment com when a comparison is made
      }
  
      array[j + 1] = key;
  
      await sleep(1000);
  
      bars.forEach((bar) => (bar.style.backgroundColor = "black"));
      ite += 1; // Increment ite after each iteration
    }
  
    bars.forEach((bar) => (bar.style.backgroundColor = "#2ecc71"));
    document.querySelector(".c").innerHTML = `1. Total iterations required were ${ite} <br>
    2. Total Shifts made were ${com} <br>
    3. The Time Complexity for Insertion Sort is O(n^2). `;

  }
  // Helper function for sleep
  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  