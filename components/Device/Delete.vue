<template>
    <n-h1 class="text-xl">Delete Device</n-h1>

    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Confirm" path="confirm">
            <n-input v-model:value="model.confirm" placeholder="Write <delete> to confirm"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending || !edited" :loading="pending">
                Delete
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ device: Device }>()

const model = ref({
    confirm: ""
});

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
    confirm: [
        {
            message: "Please write <delete>",
            validator: (rule, value) => value === "delete",
            trigger: "blur"
        },
    ],
}

async function handleSubmit() {
    const { remove } = useDevice()

    await remove(props.device.id)
        .then(device => emits("done", device))
}

</script>