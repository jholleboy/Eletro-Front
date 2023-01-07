<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/Eletro">
        <i class="nc-icon nc-tv-2"></i>
        <p>Eletrodomesticos</p>
      </sidebar-link>
      <sidebar-link to="/Marca">
        <i class="nc-icon nc-circle-09"></i>
        <p>Marcas</p>
      </sidebar-link>
      <sidebar-link to="/Tensao">
        <i class="nc-icon nc-bulb-63"></i>
        <p>Tensão</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
