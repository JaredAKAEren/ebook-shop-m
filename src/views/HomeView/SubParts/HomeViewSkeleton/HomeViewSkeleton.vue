<template>
    <div class="flex-1">
        <div class="flex">
            <van-skeleton-image class="flex-1 py-20" />
        </div>
        <div class="flex justify-evenly pt-4">
            <van-skeleton-image :image-size="'20%'" class="py-6" />
            <van-skeleton-image :image-size="'20%'" class="py-6" />
            <van-skeleton-image :image-size="'20%'" class="py-6" />
            <van-skeleton-image :image-size="'20%'" class="py-6" />
        </div>
        <div class="pt-4 px-4">
            <van-skeleton-paragraph />
        </div>
        <div class="flex justify-evenly pt-12">
            <van-skeleton-image :image-size="'40%'" class="py-12" />
            <van-skeleton-image :image-size="'40%'" class="py-12" />
        </div>
        <div class="flex justify-evenly pt-12">
            <van-skeleton-image :image-size="'40%'" class="py-12" />
            <van-skeleton-image :image-size="'40%'" class="py-12" />
        </div>
    </div>
</template>

<script setup>

</script>
