export const useWelcomeMessageStore = defineStore("welcomeMessage", () => {
  const _message = ref("Hello World");
  const message = computed(() => _message.value);
  const updateMessage = (message: string) => {
    _message.value = message;
  };

  return { message, updateMessage };
});
