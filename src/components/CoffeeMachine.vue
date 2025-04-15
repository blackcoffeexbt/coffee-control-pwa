<template>
    <div class="coffee-machine">

        <div class="button-container">
            <button class="coffee-button" @click="requestCoffee" :disabled="!isReady">
                Make Coffee
            </button>
            <div class="led" :class="{ 'led-on': isCoffeeReady }"></div>
        </div>

        <div class="status-box" :class="{ 'connected': isConnected }">
            <p><strong>Status: </strong>
                <span>{{ isConnected ? 'Ready' : 'Awaiting relay connection' }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { SimplePool, getPublicKey, finalizeEvent } from 'nostr-tools'
import { encrypt } from 'nostr-tools/nip04'

const store = useSettingsStore()
const isCoffeeReady = computed(() => store.isCoffeeReady)
const isConnected = computed(() => store.isConnected)

watch(isCoffeeReady, (newVal) => {
    console.log("isCoffeeReady changed to", newVal)
})

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

<style scoped lang="scss">
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
    background-color: cornflowerblue;
    border: 2px solid cornflowerblue;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.coffee-button:hover {
    background-color: white;
    color: cornflowerblue;
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

.status-box {
    margin-top: 1rem;
    font-weight: bold;

    .connected {
        background-color: #4CAF50;
    }
}
</style>