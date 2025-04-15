<template>
    <div class="coffee-machine">
        <h1>Coffee Machine Controller</h1>
        <div class="button-container">
            <button class="coffee-button" @click="requestCoffee" :disabled="!isReady">
                Coffee Me!
            </button>
            <div class="led" :class="{ 'led-on': isCoffeeReady }"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { SimplePool, getPublicKey, finalizeEvent } from 'nostr-tools'
import { encrypt } from 'nostr-tools/nip04'

const store = useSettingsStore()
const isCoffeeReady = computed(() => store.isCoffeeReady)

const isReady = computed(() => {
    return store.microcontrollerNpub && store.nsec && store.relayUrl
})

async function requestCoffee() {
    if (!isReady.value) return

    const encrypted = encrypt(store.nsec, store.microcontrollerNpub, 'on')

    // send the event to the relay
    const event = {
        kind: 4,
        pubkey: getPublicKey(store.nsec),
        created_at: Math.floor(Date.now() / 1000),
        tags: [['p', store.microcontrollerNpub]],
        content: encrypted,
    }

    const signedEvent = finalizeEvent(event, store.nsec)
    console.log(signedEvent)
    const pool = new SimplePool()
    console.log(store.relayUrl)
    await pool.publish([store.relayUrl], signedEvent)
}
</script>

<style scoped>
.coffee-machine {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.coffee-button {
    padding: 1.5rem 3rem;
    font-size: 2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.coffee-button:hover {
    background-color: #45a049;
}

.coffee-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.led {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ccc;
    transition: background-color 0.3s;
}

.led-on {
    background-color: #4CAF50;
    box-shadow: 0 0 10px #4CAF50;
}
</style>