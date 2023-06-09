<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Report by webhook" path="webhookEnable" label-placement="left">
            <n-checkbox v-model:checked="model.webhookEnable"></n-checkbox>
        </n-form-item>

        <n-form-item label="Webhook URL" path="webhookUrl">
            <n-input v-model:value="model.webhookUrl"></n-input>
        </n-form-item>


        <n-form-item label="Report by email" path="emailEnable" label-placement="left">
            <n-checkbox v-model:checked="model.emailEnable"></n-checkbox>
        </n-form-item>

        <n-form-item label="Email" path="emailAddress">
            <n-input v-model:value="model.emailAddress"></n-input>
        </n-form-item>

        <FormButtons @reset="reset" :loading="pending" :disabled="!edited || pending"></FormButtons>

    </n-form>
</template>

<script setup lang="ts">

const { find } = useReport()

const report = await find()

const model = ref<Partial<Report>>({
    webhookEnable: report.value.webhookEnable,
    webhookUrl: report.value.webhookUrl,
    emailEnable: report.value.emailEnable,
    emailAddress: report.value.emailAddress
});

const { formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

rules.value = {
    webhookUrl: [
        {
            message: "Webhook URL required if enabled",
            validator: (rule, value) => model.value.webhookEnable ? !!value : true
        },
    ],
    emailAddress: [
        {
            type: "email",
            message: "Should be a valid email address"
        },
        {
            message: "Email address required if enabled",
            validator: (rule, value) => model.value.emailEnable ? !!value : true
        },
    ],
}

async function handleSubmit() {
    const { add, update } = useReport()

    if (report.value) {
        await update(model.value)
    }
    else {
        await add(model.value)
    }
}
</script>