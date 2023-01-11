import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// Function to show 3 dots signifying loading. Once it has reached 4 .s it will reset to 0

function loader(element) {
    element.textContent = '';

    loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContext === '....') {
            element.textContent = '';
        }
    }, 300)
}

// Function to make the output come out in a slow type form instead of just printing the whole string

function typeText(element, text) {
    let index = 0;

    let interval = setInterval(() => {
        if(index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            } else {
              clearInterval(interval);
            }
    }, 20)
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe (isAi, value, uniqueId) {
    return (
        `
          <div class="wrapper ${isAI && 'ai'}">
            <div class="chat>
              <div className="profile">
                <img
                  src="${isAi ? bot : user}"
                  alt="${isAi ? 'bot' : 'user'}"
                />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
            </div>
          </div>
        `
    )
}

const handleSubmit = async (e) => {
    //prevent reload on submit for browser
    e.preventDefault();

    //retrieve data entered in form
    const data = new FormData(form);

    // users chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    form.reset();

    //bot chat
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

    chatContainer.scrolltop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);
}

//call handle submit

form.addEventListener(`submit`, handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e);
    }
})