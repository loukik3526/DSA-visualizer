const queue = [];
const queueElement = document.querySelector('.queue-representation');
const valueInput = document.getElementById('value-input');
const enqueueButton = document.getElementById('enqueue-btn');
const dequeueButton = document.getElementById('dequeue-btn');
const messageBox = document.getElementById('message');
const speedControl = document.getElementById("speedControl");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let animationSpeed = 2;

function updateQueueDisplay() {
  queueElement.innerHTML = '';
  for (let i = 0; i < queue.length; i++) {
    const element = document.createElement('div');
    element.classList.add('queue-element');
    element.textContent = queue[i];
    queueElement.appendChild(element);
  }
}

async function enqueueElement(element) {
  element.classList.add('enqueue-animation');
  await sleep(animationSpeed * 1000);
  element.classList.remove('enqueue-animation');
}

function enqueue(value) {
  if (typeof value === 'string') {
    // Handle space-separated integers
    const values = value.trim().split(' ');
    for (const item of values) {
      if (item) {
        queue.push(item);
        updateQueueDisplay();
        const element = queueElement.querySelector(':last-child');
        valueInput.value = '';
        enqueueElement(element);
      }
    }
  } else {
    // Handle single value
    queue.push(value);
    updateQueueDisplay();
    const element = queueElement.querySelector(':last-child');
    valueInput.value = '';
    enqueueElement(element);
  }
  dequeueButton.disabled = false;
  messageBox.textContent = ''; // Clear any previous messages
  document.querySelector("#message1").innerHTML = `Front = ${queue[0]}`;
}

function dequeueElementWithAnimation() {
  if (queue.length === 0) {
    messageBox.textContent = 'Queue is empty!';
    return;
  }
  const element = queueElement.querySelector(':first-child');
  element.classList.add('dequeue-animation'); // Apply animation class
}

function dequeue() {
  dequeueElementWithAnimation();
  setTimeout(() => {
    const value = queue.shift(); // FIFO - remove from front
    updateQueueDisplay();
    if (queue.length === 0) {
      dequeueButton.disabled = true;
    }
    messageBox.textContent = `Dequeued element: ${value}`;
    document.querySelector("#message1").innerHTML = `Front = ${queue[0]}`;
  }, 500); // Delay removal by animation duration
}

enqueueButton.addEventListener('click', () => {
    const value = valueInput.value.trim();
    if (value) {
      enqueue(value);
    } else {
      messageBox.textContent = 'Please enter a value to enqueue.';
    }
  });
  
  dequeueButton.addEventListener('click', dequeue);
  
  speedControl.addEventListener("input", () => {
    animationSpeed = 6 - speedControl.value;
  });
  