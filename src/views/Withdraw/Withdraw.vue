<template>
  <div class="withdraw-list">
    <div class="withdraw-sub-title">Choose token</div>
    <div class="withdraw-form">
      <ScrollingContainer
        :shadower-height="12"
      >
        <div class="withdraw-content">
          <Button
            v-for="(asset, index) in coinsList"
            :key="index"
            :text="getAssetName(asset)"
            type="secondary"
            width="full"
            class="withdraw-item"
            @click="selectAsset(asset)"
          />
        </div>
      </ScrollingContainer>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ScrollingContainer from '@/components/ScrollingContainer'
import Button from '@/components/Button'

export default {
  components: {
    ScrollingContainer,
    Button
  },
  computed: {
    ...mapGetters({
      coins: 'portfolio/getItems',
      getAssetBySymbol: 'assets/getAssetBySymbol',
      type: 'withdraw/getWithdrawType'
    }),
    coinsList() {
      const list = this.coins.filter(coin => coin.tokens)
      const withdrawList = list.filter(coin => this.getAssetBySymbol(coin.tiker).issuer === '1.2.96397')
      return this.type === 'transfer' ? list : withdrawList
    }
  },
  methods: {
    ...mapActions({
      setWithdrawAsset: 'withdraw/setWithdrawAsset',
      setWithdrawStep: 'withdraw/setWithdrawStep'
    }),
    getAssetName(asset) {
      return asset.fullname ? `${asset.tiker} (${asset.fullname})` : asset.tiker
    },
    selectAsset(asset) {
      this.setWithdrawAsset({ asset })
      this.setWithdrawStep('withdrawConfirmAmount')
    }
  }
}
</script>
<style lang="scss">
  .withdraw-list {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .withdraw-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .withdraw-loader-wrapper {
    height: 100%;
    padding: 1rem 0;
  }
  .withdraw-content {
    height: 19.375rem;
    padding: 1rem;
    padding-bottom: 1rem;
  }
  .withdraw-sub-title {
    font-size: config('textSizes.lg');
    text-align: center;
  }
  .withdraw-item {
    margin-top: 0.9375rem;
    min-height: 3.125rem;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      position: relative;
      z-index: 10;
      margin-bottom: 1rem;
    }
  }
</style>
