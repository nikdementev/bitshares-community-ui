<template>
  <div class="backup">
    <svgicon
      v-if="currentStep > 1"
      class="backup-paginator"
      name="arrowDown"
      @click="goBack"
    />
    <div
      class="backup-close"
      @click="updateBackupFlag"
    >
      <svgicon
        width="12"
        height="12"
        color="rgba(255,255,255,0.5)"
        name="cancel"
      />
    </div>
    <BackupStep1
      v-if="currentStep === stepConfig['BACKUP_STEP_1']"
      @change="onChangeStep"
    />
    <BackupStep2
      v-if="currentStep === stepConfig['BACKUP_STEP_2']"
      @change="onChangeStep"
    />
    <BackupUnlockWallet v-if="currentStep === stepConfig['BACKUP_PHRASE'] && isLocked"/>
    <BackupPhrase
      v-if="currentStep === stepConfig['BACKUP_PHRASE'] && !isLocked"
      :backup-phrase="phrase"
      @change="onChangeStep"
    />
    <BackupVerify
      v-if="currentStep === stepConfig['BACKUP_VERIFY']"
      :backup-phrase="phrase"
      @change="onChangeStep"
    />
    <BackupFinish
      v-if="currentStep === stepConfig['BACKUP_FINISH']"
      :backup-phrase="backupPhrase"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import BackupStep1 from './BackupStep1'
import BackupStep2 from './BackupStep2'
import BackupPhrase from './BackupPhrase'
import BackupVerify from './BackupVerify'
import BackupFinish from './BackupFinish'
import BackupUnlockWallet from './BackupUnlockWallet'

export default {
  components: {
    BackupStep1,
    BackupStep2,
    BackupPhrase,
    BackupVerify,
    BackupFinish,
    BackupUnlockWallet
  },
  data() {
    return {
      currentStep: 1,
      stepConfig: {
        'BACKUP_STEP_1': 1,
        'BACKUP_STEP_2': 2,
        'BACKUP_PHRASE': 3,
        'BACKUP_VERIFY': 4,
        'BACKUP_FINISH': 5
      }
    }
  },
  computed: {
    ...mapGetters({
      backupPhrase: 'acc/getBrainkey',
      isLocked: 'acc/isLocked'
    }),
    phrase() {
      return this.backupPhrase.split(' ')
    }
  },
  methods: {
    ...mapActions('backup', ['setBackupFlag']),

    updateBackupFlag() {
      this.$nextTick(() => {
        this.setBackupFlag(false)
      })
    },
    onChangeStep(step) {
      this.currentStep = step
    },
    goBack() {
      this.currentStep--
    }
  }
}
</script>
<style lang="scss">
  .backup {
    cursor: default;
    position: relative;
    color: config('colors.white');
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: config('colors.bg-base');
    width: 30rem;
    height: 30.4375rem;
    border: 0.0625rem solid config('colors.white');

    .backup-close {
      position: absolute;
      right: 0.625rem;
      top: 0.625rem;
      z-index: 11;
      cursor: pointer;
    }

    .backup-paginator {
      position: absolute;
      left: 15px;
      top: 15px;
      transform: rotate(90deg);
      z-index: 10;
      cursor: pointer;
    }
  }

  @media (max-width: 800px) {
    .backup {
      border: none;
      width: auto;
    }
  }
</style>