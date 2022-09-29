<template>
  <div>
    <transition name="modal">
      <div
        class="fixed flex flex-row justify-center items-center z-50 inset-0 w-full h-full bg-color6b7280bf transition-opacity ease duration-1000"
        v-if="getShowModal"
        @click.self="setShowModal(false)"
      >
        <form
          class="w-[793px] h-[492px] sm:h-[216px] p-[24px] m-[10px] bg-white rounded-lg shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_15px_-5px_rgba(0,0,0,0.04)] flex flex-col gap-[16px]"
        >
          <div class="text-left text-[24px] leading-[24px] font-medium">
            Заказать звонок
          </div>
          <div
            class="flex flex-col sm:flex-row sm:justify-between gap-[16px] text-left font-medium leading-[20px] text-[16px] sm:max-h-[62px]"
          >
            <div>
              <div>Имя*</div>
              <input
                v-model="state.name"
                type="text"
                class="form-input px-3 py-2 border w-full sm:w-[170px]"
              />
              <div
                v-if="!v$.name.required.$response && v$.name.$dirty"
                class="w-full sm:w-[170px] text-red-700 text-[12px]"
              >
                Обязательное поле
              </div>
            </div>
            <div>
              <div>Телефон*</div>
              <input
                v-model="state.phone"
                ref="el"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                class="form-input px-3 py-2 border w-full sm:w-[170px]"
              />
              <div
                v-if="
                  (!v$.phone.required.$response && v$.phone.$dirty) ||
                  (v$.phone.$invalid && v$.phone.$dirty)
                "
                class="w-full sm:w-[170px] text-red-700 text-[12px]"
              >
                Обязательное поле
              </div>
            </div>
            <div>
              <div>Email*</div>
              <input
                v-model="state.email"
                type="email"
                id="email"
                placeholder="you@example.com"
                class="form-input px-3 py-2 border w-full sm:w-[170px]"
              />
              <div
                v-if="
                  (!v$.email.required.$response && v$.email.$dirty) ||
                  (v$.email.$invalid && v$.email.$dirty)
                "
                class="w-full sm:w-[170px] text-red-700 text-[12px]"
              >
                Обязательное поле
              </div>
            </div>
            <div>
              <div>Город*</div>
              <select
                v-model="getCurrentCity"
                class="form-select border px-3 py-2 w-full sm:w-[170px]"
              >
                <option
                  v-for="city in getCitys"
                  :key="city.id"
                  :value="city.name"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
          </div>
          <button
            class="py-[11px] px-[42px] w-full sm:w-[170px] bg-[#16A34A] shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] rounded-[6px] text-white sm:self-end hover:bg-sky-700"
            @click.prevent="postRequest"
            type="submit"
          >
            Отправить
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import "@/assets/tailwind.css";
import { computed, reactive, ref } from "vue";
import store from "@/store";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useIMask } from "vue-imask";

export default {
  setup() {
    const { el } = useIMask({
      mask: "+70000000000",
    });

    const state = reactive({
      name: "",
      phone: "",
      email: "",
    });

    const rules = {
      name: { required },
      phone: { required, minLength: minLength(12) },
      email: { required, email },
    };

    const getCitys = computed({
      get() {
        return store.getters["form/getCitys"];
      },
    });

    const getShowModal = computed({
      get() {
        return store.getters["form/getShowModal"];
      },
    });

    const getCurrentCity = computed({
      get() {
        return store.getters["form/getCurrentCity"];
      },
      set(e) {
        store.commit("form/setCurrentCity", e);
      },
    });

    const setShowModal = (e) => {
      store.commit("form/setShowModal", e);
    };

    const postRequest = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }
      const info = {
        name: state.name,
        phone: state.phone,
        email: state.email,
        city_id: getCitys.value.find((c) => c.name === getCurrentCity.value).id,
      };
      store.commit("form/setInfo", info);

      try {
        const { data } = await axios.post(
          "http://hh.autodrive-agency.ru/test-tasks/front/task-7/",
          info
        );
        store.commit("form/setResponseMessage", data);
        store.commit("form/setShowModal", false);
      } catch (error) {
        console.log(error);
      }
      state.name = "";
      state.phone = "";
      state.email = "";
    };

    const v$ = useVuelidate(rules, state);

    return {
      v$,
      getCitys,
      getCurrentCity,
      getShowModal,
      setShowModal,
      postRequest,
      state,
      el,
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
