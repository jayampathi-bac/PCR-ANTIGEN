<template>
  <div class="mobile-subsidebar is-activity">
    <div class="inner">
      <div class="sidebar-title">
        <h3>レポート</h3>
      </div>

      <ul class="submenu">
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-customer'}">顧客情報レポート</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-branches'}">薬局者情報レポート</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-tests'}">検査情報レポートを</RouterLink>
        </li>

      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
