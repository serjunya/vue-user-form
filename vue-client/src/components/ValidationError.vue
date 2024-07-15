<template>
    <div class="ui-field-validation-error">
        <IconExclamationCircle />
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
import IconExclamationCircle from "./icons/IconExclamationCircle.vue";
</script>

<style>
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
