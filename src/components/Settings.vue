<template>
    <div class="settings">
        <h2>Settings</h2>
        <div class="settings-form">
            <div class="form-group">
                <label for="microcontroller-npub">Coffee Machine Npub (Hex format)</label>
                <input id="microcontroller-npub" v-model="microcontrollerNpub" type="text"
                    placeholder="Enter microcontroller's npub in hex format" />
            </div>

            <div class="form-group">
                <label for="nsec">Your Nsec (Hex format)</label>
                <input id="nsec" v-model="nsec" type="password" placeholder="Enter your nsec in hex format"
                    :class="{ 'error': nsecError }" />
                <div v-if="nsecError" class="error-message">{{ nsecError }}</div>
            </div>

            <div class="form-group">
                <label for="relay-url">Nostr Relay URL</label>
                <input id="relay-url" v-model="relayUrl" type="text"
                    placeholder="Enter relay URL (e.g., wss://nos.lol)" />
            </div>

            <div class="form-group">
                <label>Your npub</label>
                <input :value="npub" type="text" readonly class="readonly" />
            </div>

            <button class="save-button" @click="saveSettings">Save Settings</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'

const store = useSettingsStore()
const nsecError = ref('')

const microcontrollerNpub = ref(store.microcontrollerNpub)
const nsec = ref(store.nsec)
const relayUrl = ref(store.relayUrl)
const npub = computed(() => store.npub)

function validateNsec(value) {
    if (!value) return 'Private key is required'
    // if (value.length !== 64) return 'Private key must be 64 characters long'
    return ''
}

function saveSettings() {
    nsecError.value = validateNsec(nsec.value)
    if (!nsecError.value) {
        store.setMicrocontrollerNpub(microcontrollerNpub.value)
        store.setNsec(nsec.value)
        store.setRelayUrl(relayUrl.value)
    }
}
</script>

<style scoped>
.settings {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.settings-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    font-weight: bold;
}

input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

input.error {
    border-color: #ff4444;
}

.error-message {
    color: #ff4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.readonly {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.save-button {
    padding: 0.75rem;
    background-color: cornflowerblue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
}

.save-button:hover {
    background-color: cornflowerblue;
}
</style>