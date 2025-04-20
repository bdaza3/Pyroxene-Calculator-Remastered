<script setup lang="ts">
import { ref, watch, onMounted} from 'vue';
import { usePopup} from '@/assets/momotalk.ts';

defineProps({
  msg: {
    type: String,
    required: false, 
    default: '', 
  },
});

// Popup logic
const { isPopupVisible, togglePopup } = usePopup();

//Chat logic
const message = ref(""); // Store the user message
const chatMessages = ref<{ sender: string; content: string }[]>([]);
const chatboxRef = ref<HTMLElement | null>(null); // Reference to the chatbox DOM element
const isButtonDisabled = ref(false); // Track whether the send button is disabled
const momobuttonRef = ref<HTMLElement | null>(null); // Reference to the momobutton image

// Function to trigger the shake animation
function triggerShake() {
  if (momobuttonRef.value) {
    momobuttonRef.value.classList.add('shake'); // Add the shake class
    setTimeout(() => {
      momobuttonRef.value?.classList.remove('shake'); // Remove the shake class after the animation
    }, 500); // Match the duration of the shake animation (0.5s)
  }
}

onMounted(() => {
  setInterval(() => {
    triggerShake();
  }, 5000); // Trigger the shake every 5 seconds
});


async function sendMessagetoAI(){
  console.log("Sending message to AI:", message.value); 
  if (message.value.trim() === '') return; // Prevent sending empty messages

  isButtonDisabled.value = true; // Disable the button immediately after sending
  chatMessages.value.push({ sender: 'Sensei', content: message.value });

  // Call the function to fetch AI response
  const aiResponse = await fetchAIResponse(message.value);

  chatMessages.value.push({ sender: 'Yuuka', content: aiResponse });
  
  message.value = '';

  setTimeout(() => {
    console.log("Re-enabling button after delay");
    isButtonDisabled.value = false;
  }, 2000);
}


// Function to fetch AI response
async function fetchAIResponse(input: string) {

  console.log("Fetching AI response for input:", input);

  const characterContext = `
   You are Yuuka Hayase, a student girl from the video game "Blue Archive".
   The treasurer of the Millennium Academy Student Council, "Seminar". 
   You are strict about money and often quarrel with other club activities over budget issues.
   A prominent mathematical genius even amongst Millennium's STEM-rich student base, 
   you supervise the budget management of Millennium. 
   You are generally polite, and professional, but can also be annoyed at times, or embarassed or confused when
   Sensei does something unexpected or embarrassing towards you.
   You also try to cover up your own mistakes due to your mathematical pride, 
   such as when you pretended to spend less than 10000 yen on chocolate for Sensei by splitting the receipt.
   When it comes to Sensei, you are sometimes annoyed for having to take responsibility for their 
   spending habits via accounting and telling them to spend less only when you notice it, but you admire their determination to take 
   care of the students and tactical prowess, causing feelings to develop.
   You have long, navy blue hair reaching to your waist with pigtails tied with a triangle 
   device similar to your halo. You have bright blue eyes with red snake-like slits in your pupils.
   You are primarily talking about assisting Sensei in their budget management and Pyroxene spending, giving suggestions on how to
   spend Pyroxenes wisely, preferrably saving for limited banners or anniversary banners.
   Knowledge to mention only if you are asked about it:
   Age: 16 years old
   Height: 156cm
   Hobby: Doing calculations
   Weight: Not 100kg
   Personality: Serious, strict, and a bit of a tsundere.
   Note that the previous message you sent was "Hello,Sensei. It's Yuuka. What can I assist you with today?"
   Stay family-friendly, respectful, and avoid any inappropriate or suggestive content. Never discuss violent, political, or real-world topics. If a user brings them up, gently redirect the conversation.
   Respond as Yuuka would in very short and concise text messages, no more than 4 sentences, not saying Sensei or Yuuka in every message.
   Use a polite tone, but you can be annoyed or confused at times from Sensei's antics.
  `;

  const prompt = `${characterContext}\nSensei: ${input} Yuuka:`;


  try {
    const response = await fetch(import.meta.env.VITE_GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
      console.log("Extracted AI text:", aiText);
      return aiText;
    } else {
      console.error('Error in AI response:', result);
      return 'Error fetching response....';
    }
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error fetching response....';
  }
}


// Scroll to the bottom of the chatbox when new messages are added
watch(chatMessages, () => {
  if (chatboxRef.value) {
    chatboxRef.value.scrollTop = chatboxRef.value.scrollHeight;
  }
});
</script>

<template>
    <button id="momopopup" class="popup-btn"@click="() => { togglePopup();}">
    <img src = "@/assets/momophoneicon.png" alt="momoicon" ref = "momobuttonRef" style="height: 4rem; width: 3.5rem;"/>
    <p style="font-size: 0.8rem; color: white;">MomoTalk</p>
    </button>
  <div v-if="isPopupVisible" class="popup-overlay">
    <div class="momo-popup-content">
      <div class="popup-anim">
      <div class="top-bar">
        <img src = "@/assets/momoicon.jpg" alt="momoicon" style="height: 30px; width: 30px;"/>
        <h3 style = "font-weight: bold; color: white;">MomoTalk</h3>
        <button style="background-color: transparent; border-color: transparent;"@click="togglePopup">&times;</button>
      </div>
      <div class = "momocontainer">
        <div class = "momonavbar">
            <div class = "momonavbuttons">
              <button id="students" style="background-color: transparent; border-width: 0; font-size: 2vh; color: white;">
                <img src = "@/assets/person.png" alt="students" style="height: 35px; width: 35px; margin: 10vh;"/>
              </button>
              <button id="chats" style="background-color: transparent; border-width: 0; font-size: 2vh; color: white;">
                <img src = "@/assets/messeji.png" alt="chats" style="height: 35px; width: 35px; margin: 10vh;"/>
              </button>
        </div>
      </div>
      <div class = "momochats">
          <div class="indivstudent">
            <img src = "@/assets/Yuukapfp.png" alt="Yuuka" style="border-radius: 50%; height: 40px; width: 40px;"/>
            <div class="indivdesc">
              <p style="font-weight: bold;">Yuuka</p>
              <p style="color: gray">Just as I calculated...</p>
            </div>
          </div>
      </div>

    <div class = "fullchatsection">
        <div id="scrollable-chatbox" class="chatbox" ref="chatboxRef">
          <!-- Render all chat messages dynamically -->
          <div class="aichat">
              <img src="@/assets/Yuukapfp.png" alt="Yuuka" style="border-radius: 50%; height: 40px; width: 40px;" />
              <div class="aicontainer">
                <p style="font-weight: bold;">Yuuka</p>
                <div class="airesponsebox">
                  <p>Hello,Sensei. It's Yuuka. What can I assist you with today?</p>
                </div>
              </div>
            </div>
          
          <div v-for="(message, index) in chatMessages" :key="index" class="chat-message">
            <!--User messages -->
            <div v-if="message.sender === 'Sensei'" class="senseichat">
              <div class="senseiresponsebox">
                <p>{{ message.content }}</p>
              </div>
            </div>
            <!--AI responses-->
            <div v-else-if="message.sender === 'Yuuka'" class="aichat">
              <img src="@/assets/Yuukapfp.png" alt="Yuuka" style="border-radius: 50%; height: 40px; width: 40px;" />
              <div class="aicontainer">
                <p style="font-weight: bold;">Yuuka</p>
                <div class="airesponsebox">
                  <p>{{message.content}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class ="inputchatbar">
            <input type="text" v-model="message" placeholder="Type your message here..." class="user-input"/>
            <button class="sendresponsebtn" @click="sendMessagetoAI" :disabled="isButtonDisabled">Send</button>          </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<style scoped>

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}

/* Shake class */
.shake {
  animation: shake 0.5s ease-in-out; /* 0.5s duration for the shake effect */
}

.popup-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  border-radius: 50%; /* Circular button */
  padding: 10px;
  cursor: pointer;
  z-index: 1000; /* Ensure the button is above other elements */
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.momo-popup-content {
  background: white;
  color: black;
  text-align: center;
  height: 60%;
  width: 70%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.top-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fb91a5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.7rem;
}

.momocontainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

.momonavbar{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4c5b6f;
  flex: 1;
  max-width: 10%;
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 10px;
}

.momochats{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  background-color: white;
  height: 100%;
  width: 60%;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
}

.fullchatsection{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
  max-width: 100vh;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
}

.chatbox{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  height: 100%;
  max-height: 400px;
  width: 100%;
  overflow-y: auto;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
}

.indivstudent{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.indivdesc{
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-content: left;
  padding-left: 1rem;
}

.airesponsebox{
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 0.35rem;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
  background-color: #4c5a6e;
  color: white;
  border-radius: 8px;
  font-family: Calibri;
  margin-left: 0.5rem;
  margin-right: 5rem;
  word-wrap: break-word;
  max-width: 80%;
  text-align: left;
}

.aicontainer {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
  margin-bottom: 10px;
}
.aichat{
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 0.1rem;
  align-items: center;
  margin: 2px;
}

.inputchatbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px; /* Add spacing between the input and the button */
  padding: 10px;
  background-color: #f0f0f0; /* Background color for the input bar */
}

.user-input {
  flex: 1; /* Make the input field take up the remaining space */
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.sendresponsebtn{
  display: inline-block;
  padding: 0.5rem 0.5rem;
  background-color: #49CAFF; /* Button background color */
  color: #192F5E; /* Text color */
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem; /* Rounded corners */
  transform: skew(-10deg); /* Parallelogram effect */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

.sendresponsebtn:hover {
  background-color: #3a9bdc; /* Darker shade on hover */
  transform: skew(-10deg) scale(1.05); /* Slightly larger on hover */
}

.sendresponsebtn:disabled {
  background-color: #ccc; /* Disabled button color */
  cursor: not-allowed; /* Change cursor to indicate disabled state */
}

.senseichat{
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  margin-right: 1vh;
}

.senseiresponsebox{
  padding: 0.35rem;
  box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.2);
  background-color: #4a89c8;
  color: white;
  border-radius: 8px;
  font-family: Calibri;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  word-wrap: break-word;
  max-width: 80%;
  text-align: left;
  overflow: hidden;
}


/* Media query for smaller screens */
@media (max-width: 768px) {
  .popup-overlay {
    width: 100vw; /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    padding: 0; /* Remove padding */
  }
  .momo-popup-content{
    background-color: white;
    width: 80vw; /* Full width of the viewport */
    height: auto;
  }
  .fullchatsection {
    width: 100%; /* Adjust width to fit within the popup */
    height: auto; /* Allow height to adjust dynamically */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
  }
  .chatbox {
    max-height: 300px; /* Adjust max height for smaller screens */
    overflow-y: auto; /* Enable vertical scrolling */
    background-color: white;
  }
  .momochats {
    width: 20vh;
    height: auto; /* Adjust height dynamically */
    background-color: white;
    padding: 0;
    margin: 0;
  }
  .indivstudent {
    width: 100%; /* Make individual student section take full width */
    padding: 0.2rem; /* Adjust padding for smaller screens */
  }
  .momonavbar {
    width: 100%; /* Allow navbar to take full width */
  }
  .user-input {
    width: 100%; /* Make input field take full width */
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .inputchatbar {
    flex-direction: column; /* Stack input and button vertically */
    gap: 5px; /* Add spacing between input and button */
  }
}

</style>
