<template>
    <n-form ref="formRef" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">

        <n-dynamic-input v-model:value="model.commands" #="{ index }" :on-create="() => ({ key: '', value: '' })"
            class="mb-4">
            <div class="flex gap-4 flex-1">
                <n-form-item class="flex-1" ignore-path-change :show-label="false" :path="`commands[${index}].key`"
                    :rule="rules.key">
                    <n-input v-model:value="model.commands[index].key" placeholder="Name" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item class="flex-1" ignore-path-change :show-label="false" :path="`commands[${index}].value`"
                    :rule="rules.value">
                    <n-input v-model:value="model.commands[index].value" placeholder="Value" @keydown.enter.prevent />
                </n-form-item>
            </div>
        </n-dynamic-input>

        <FormButtons v-if="model.commands?.length" @reset="reset" :loading="pending" :disabled="!edited || pending">
        </FormButtons>
    </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const model = ref({
    commands: props.project.commands as { key: string, value: string }[]
});

const { formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

rules.value = {
    key: [
        {
            required: true,
            message: "Please set the name"
        },
        {
            trigger: 'input',
            message: "Should not contain spaces",
            validator: (rule, value) => !/\s/.test(value)
        }
    ],
    value:
        [
            {
                trigger: 'input',
                message: "Should be a valid JSON",
                validator(rule, value) {
                    try {
                        JSON.parse(value)
                        return true
                    } catch (error) {
                        return false
                    }
                }
            }
        ]
}

async function handleSubmit() {
    const { update } = useProject()

    await update(props.project.id, model.value)
}
</script>