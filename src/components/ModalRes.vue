<template>
    <div>
      <transition name="modal">
        <div
          class="fixed flex flex-row justify-center items-center z-50 inset-0 w-full h-full bg-color6b7280bf transition-opacity ease duration-1000"
          v-if="getResponseMessage"
          @click.self="setResponseMessage('')"
        >
          <div
            class="w-[793px] h-[492px] sm:h-[216px] p-[24px] m-[10px] bg-white rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_15px_-5px_rgba(0,0,0,0.04)] flex flex-col gap-[16px]"
            v-html="getResponseMessage"
          ></div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import "@/assets/tailwind.css";
  import { computed } from "vue";
  import store from "@/store";
  export default {
    setup() {
      const getResponseMessage = computed({
        get() {
          return store.getters["form/getResponseMessage"];
        },
      });
      const setResponseMessage = (e) => {
        store.commit("form/setResponseMessage", e);
      };
      return {
        getResponseMessage,
        setResponseMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  </style>
  