<template>
    <div class="flex flex-col gap-6">
        <div v-if="releases?.length" class="col-span-full flex gap-4">
            <n-input v-model:value="versionSearch">
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>

            <n-button type="primary" @click="createModalVisible = true">
                Create release
            </n-button>
        </div>

        <n-result v-else class="col-span-full my-5" title="You have no releases">
            <template #icon>
                <img src="~/assets/images/no-results.png" alt="no-results" width="200">
            </template>
            <template #footer>
                <n-button type="primary" @click="createModalVisible = true">Create first release</n-button>
            </template>
        </n-result>

        <ReleaseCard v-for="release of versionSearch ? filteredReleases : releases" :release="release"
            :projectId="project.id"></ReleaseCard>

        <n-modal preset="card" v-model:show="createModalVisible" :closable="false" :mask-closable="false"
            class="max-w-sm w-full">
            <ReleaseCreate @cancel="createModalVisible = false" @done="onCreate" :project="project" />
        </n-modal>
    </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { find } = useRelease(props.project.id)

const versionSearch = ref("")

const releases = await find()

const filteredReleases = computed(() => releases.value.filter(release => release.version.includes(versionSearch.value)))

function onCreate() {
    createModalVisible.value = false
}
</script>