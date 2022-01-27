<template>
  <div class="mobile-subsidebar is-activity">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Reports</h3>
      </div>

      <ul class="submenu">
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-customer'}">Customers Reports</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-branches'}">Branches Reports</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sidebar-layouts-reports-list-tests'}">Tests Reports</RouterLink>
        </li>

      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
