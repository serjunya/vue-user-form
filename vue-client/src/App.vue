<template>
    <div>
        <div>
            <form class="ui-form" @submit.prevent.stop="onSubmit">
                <div class="ui-form-content">
                    <FormInput
                        v-model="email"
                        label="Почта"
                        type="email"
                        required
                    />
                    <FormInput
                        ref="numberInput"
                        v-model="phoneNumber"
                        label="Номер"
                        mask="##-##-##"
                    />
                    <button class="ui-form-submit-btn" type="submit">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
        <div class="ui-under-form">
            <div class="ui-under-form-content">
                <div v-if="isLoading">
                    <div class="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <p v-else>{{ users }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormInput from "./components/FormInput.vue";
import { getUsersByFilter } from "./api/users";
import { ref } from "vue";

const email = ref("");
const phoneNumber = ref("");
const numberInput = ref(null);
const serverValidationError = ref(false);
const isLoading = ref(false);
const users = ref("[]");
let controller;

const onSubmit = async () => {
    serverValidationError.value = false;
    isLoading.value = true;
    controller?.abort();
    controller = new AbortController();
    await getUsersByFilter(
        controller,
        email.value,
        numberInput.value.unmaskedValue,
    )
        .then((filteredUsers) => {
            users.value = JSON.stringify(filteredUsers, null, 2);
            isLoading.value = false;
        })
        .catch(() => {});
};
</script>

<style>
.ui-under-form,
.ui-form-content {
    display: flex;
    align-self: center;
    flex-direction: column;
    background: white;
    color: black;
    padding: 25px;
    border-radius: 7px;
}
.ui-under-form {
    margin-top: 20px;
    white-space: pre-wrap;
}
.ui-under-form-content {
    background-color: var(--color-controls-background);
    border-radius: 2px;
    padding-left: 10px;
}
.ui-form-submit-btn {
    margin-top: 10px;
    padding: 5px;
}

.lds-facebook {
    /* change color here */
    color: black;
}
.lds-facebook,
.lds-facebook div {
    box-sizing: border-box;
}
.lds-facebook {
    display: inline-block;
    position: relative;
    width: 32px;
    height: 32px;
}
.lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 8px;
    background: currentColor;
    animation: lds-facebook 0.6s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
    left: 24px;
    animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
    left: 40px;
    animation-delay: 0s;
}
@keyframes lds-facebook {
    0% {
        top: 4px;
        height: 32px;
    }
    50%,
    100% {
        top: 12px;
        height: 16px;
    }
}
</style>
