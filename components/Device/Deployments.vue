<template>
    <div class="flex flex-col gap-6">
        <n-result v-if="deployments?.length === 0" class="col-span-full my-5" title="You have no deployments">
            <template #icon>
                <img src="~/assets/images/no-results.png" alt="no-results" width="200">
            </template>
        </n-result>

        <DeploymentCard v-for="deployment of deployments" :deployment="deployment"></DeploymentCard>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{ device: Device }>()

const { find } = useDeployment(props.device.id)

const deployments = await find()
</script>