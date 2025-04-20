import { ref } from 'vue';

export function usePopup() {
  const isPopupVisible = ref(false);

  function togglePopup() {
    isPopupVisible.value = !isPopupVisible.value;
  }

  return {
    isPopupVisible,
    togglePopup,
  };
}

const message = ref('');
const chatMessages = ref<{ sender: string; message: string }[]>([]); // Store chat messages

export function test() {
    console.log('test');
}

