<script setup lang="ts">
import { useReqres } from "./composables/reqres";

const welcomeMessageStore = useWelcomeMessageStore();

const text = ref("");
const message = computed(() => welcomeMessageStore.message);

const handleClickUpdate = () => {
  welcomeMessageStore.updateMessage(text.value);
};

const reqres = useReqres();
onMounted(async () => {
  const { res, error } = await reqres.getUsers();
  if (error) {
    console.error(error);
    return;
  }

  text.value = res?.data?.map((x) => x.first_name).join(" / ") ?? "undefined";
});
</script>

<template>
  <h1 class="text-4xl font-bold text-center p-5">{{ message }}</h1>

  <div class="flex justify-center">
    <div class="flex flex-col w-96 gap-4">
      <Textarea
        v-model="text"
        placeholder="Write your favorite welcome message!"
      />
      <Button variant="destructive" @click="handleClickUpdate">Update</Button>
    </div>
  </div>
</template>
