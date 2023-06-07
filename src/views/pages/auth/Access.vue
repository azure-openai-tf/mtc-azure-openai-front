<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div>
            <div>
                <div>
                    <div class="flex flex-column align-items-center">
                        <div class="flex justify-content-center align-items-center bg-orange-500 border-circle" style="width: 3.2rem; height: 3.2rem">
                            <i class="text-50 pi pi-fw pi-lock text-2xl"></i>
                        </div>
                        <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-5">접근 차단</h1>
                        <span class="text-600 mb-1 mr-2 ml-2">해당 페이지에 대한 접근 권한이 없습니다.</span>
                        <span class="text-600 mb-1 mr-2 ml-2">관리자에게 문의하시기 바랍니다.</span>
                        <div class="col-12 mt-1 text-center">
                            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align: center"></i>
                            <router-link to="/" class="text-blue-500">로그인 페이지로 이동</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
