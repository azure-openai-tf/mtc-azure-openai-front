<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const toast = useToast();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

// const logoUrl = computed(() => {
//     return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const settings = () => {
    topbarMenuActive.value = false;
    // router.push('/documentation');
    toast.add({ severity: 'info', summary: '알림', detail: '본 기능은 UI 구성 목적입니다. 빠른 시일 내에 서비스 될 예정입니다.' , life: 3000 });
};
const signOut = () => {
    toast.add({ severity: 'info', summary: '알림', detail: '본 기능은 UI 구성 목적입니다. 빠른 시일 내에 서비스 될 예정입니다.' , life: 3000 });
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <!-- <img :src="logoUrl" alt="logo" /> -->
            <span>MTC Azure OpenAI</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

       
        <Toast />           
        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="signOut()" class="p-link layout-topbar-button">
                <i class="pi pi-sign-out"></i>
                <span>Sign out</span>
            </button>
            <button @click="settings()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
