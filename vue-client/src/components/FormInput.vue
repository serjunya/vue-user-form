<template>
    <div class="ui-field">
        <label>
            <p class="ui-field-label-text">
                {{ label }}
            </p>
            <input
                v-model="inputValue"
                v-maska:unmaskedValue.unmasked="mask"
                :required="required"
                :pattern="patternString"
                @input="clearError"
                @blur="validateField"
                @invalid.prevent=""
            />
        </label>
        <ValidationError v-if="displayError">
            {{ displayErrorMessage }}
        </ValidationError>
    </div>
</template>

<script setup>
import ValidationError from "./ValidationError.vue";
import { vMaska } from "maska/vue";
import { ref } from "vue";

const props = defineProps({
    required: Boolean,
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    mask: {
        type: String,
        default: "",
    },
});

const inputValue = defineModel(String);

const unmaskedValue = ref("");
defineExpose({ unmaskedValue });

const displayError = ref(false);
const displayErrorMessage = ref("");
const patternString = ref(".*");
let patternRegExp = /.*/;
let errorMessage = "";

if (props.type) {
    switch (props.type) {
        case "email":
            patternString.value =
                "(\\w+[\\-\\.])*[\\w]+@([\\w]+[\\.\\-])*[\\w]+\\.[a-z]{2,4}";
            patternRegExp = /^(\w+[-.])*[\w]+@([\w]+[.-])*[\w]+\.[a-z]{2,4}$/;
            errorMessage = "Невалидный email";
            break;
        //  case <другие типы инпута>:
    }
} else if (props.mask) {
    let regExpFromMask = "";
    for (let i = 0; i < props.mask.length; i++) {
        if (
            props.mask[i] === "#" &&
            (i === 0 || (i > 0 && props.mask[i - 1] !== "!"))
        ) {
            regExpFromMask += "[0-9]";
        } else if (props.mask[i] === "!") {
            continue;
        } else {
            regExpFromMask += props.mask[i];
        }
    }
    patternString.value = regExpFromMask;
    patternRegExp = new RegExp(regExpFromMask);
    errorMessage = "Неверный формат";
}

const clearError = () => {
    displayError.value = false;
    displayErrorMessage.value = "";
};
const setError = (message) => {
    displayError.value = true;
    displayErrorMessage.value = message;
};

const validateField = () => {
    if (props.required && !inputValue.value) {
        setError("Поле должно быть заполнено");
    } else if (inputValue.value && !patternRegExp.test(inputValue.value)) {
        setError(errorMessage);
    }
};
</script>

<style lang="scss" scoped>
input {
    border: none;
    border-bottom: 1px solid;
    padding: 10px;
    padding-bottom: 5px;
    background-color: var(--color-controls-background);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:focus {
        outline: none;
    }
}
.ui-field {
    margin-bottom: 20px;
}
.ui-field-label-text {
    margin: 0;
    font-size: 0.8em;
}
.ui-field-validation-error {
    display: flex;
    align-items: center;
    color: var(--color-negative);
    font-size: 0.8em;
    span {
        margin-left: 5px;
    }
}
</style>
