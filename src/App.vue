<template>
    <RouterView v-slot="{ Component }">
        <KeepAlive include="IndexView">
            <component :is="Component" />
        </KeepAlive>
    </RouterView>
</template>

<script setup>
</script>
