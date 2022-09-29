<template>
<Buttons />
<ModalOrder />
<ModalRes />
</template>

<script>
import Buttons from './components/Buttons.vue';
import ModalOrder from './components/ModalOrder.vue';
import ModalRes from './components/ModalRes.vue';
export default {
  name: "App",
  components: {
    Buttons,
    ModalOrder,
    ModalRes
},
};
</script>

<style src="./assets/tailwind.css" />
