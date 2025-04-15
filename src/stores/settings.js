import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateSecretKey, getPublicKey } from 'nostr-tools'

export const useSettingsStore = defineStore('settings', () => {
  // Load from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    const stored = localStorage.getItem(key)
    return stored ? stored : defaultValue
  }

  const microcontrollerNpub = ref(loadFromStorage('microcontrollerNpub', ''))
  const nsec = ref(loadFromStorage('nsec', ''))
  const relayUrl = ref(loadFromStorage('relayUrl', ''))
  const isCoffeeReady = ref(false)

  // Generate a new nsec if none exists
  if (!nsec.value) {
    try {
      const newKey = generateSecretKey()
      nsec.value = newKey
      localStorage.setItem('nsec', newKey)
    } catch (error) {
      console.error('Failed to generate secret key:', error)
    }
  }

  const npub = computed(() => {
    try {
      if (nsec.value) {
        return getPublicKey(nsec.value)
      }
      return ''
    } catch (error) {
      console.error('Failed to get public key:', error)
      return ''
    }
  })

  function setMicrocontrollerNpub(value) {
    microcontrollerNpub.value = value
    localStorage.setItem('microcontrollerNpub', value)
  }

  function setNsec(value) {
    try {
      // Validate the key format
      if (value && value.length === 64) {
        nsec.value = value
        localStorage.setItem('nsec', value)
      } else {
        console.error('Invalid private key format')
      }
    } catch (error) {
      console.error('Failed to set private key:', error)
    }
  }

  function setRelayUrl(value) {
    relayUrl.value = value
    localStorage.setItem('relayUrl', value)
  }

  function setCoffeeReady(value) {
    isCoffeeReady.value = value
  }

  return {
    microcontrollerNpub,
    nsec,
    relayUrl,
    npub,
    isCoffeeReady,
    setMicrocontrollerNpub,
    setNsec,
    setRelayUrl,
    setCoffeeReady
  }
}) 