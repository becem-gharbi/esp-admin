<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Identifier">
            <n-input v-model:value="device.id" disabled></n-input>
        </n-form-item>

        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <n-form-item label="API key" path="apiKey">
            <n-input v-model:value="model.apiKey" type="password" show-password-on="mousedown"></n-input>
        </n-form-item>

        <n-form-item label="Description" path="description">
            <n-input type="textarea" autosize v-model:value="model.description"></n-input>
        </n-form-item>

        <FormButtons @reset="reset" :loading="pending" :disabled="!edited || pending"></FormButtons>
    </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device }>()

const model = ref({
    name: props.device.name,
    apiKey: props.device.apiKey,
    description: props.device.description
});

const { apiErrors, formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

apiErrors.value = {
    nameAlreadyExists: false,
}

rules.value = {
    name: [
        {
            required: true,
            message: "Please input project name",
            trigger: "blur",
        },
        {
            message: "Name already used",
            validator: () => !apiErrors.value.nameAlreadyExists
        },
        {
            validator: (rule, value) => !/^\s|\s$/.test(value),
            message: "Should not start or end with a whitespace",
            trigger: "blur"
        }
    ],
    apiKey: [
        {
            required: true,
            message: "Please input API key",
            trigger: "blur",
        },
        {
            validator: (rule, value) => /(?=.*[a-z])(?=.*[0-9])(?=.{6,})/.test(value),
            message: "At least 6 characters, 1 lowercase, 1 number",
            trigger: "blur"
        }
    ],
}

async function handleSubmit() {
    const { update } = useDevice()

    await update(props.device.id, model.value)
}
</script>